/**
 * TODO: 筛选缩放的图片，小于特定规格的图片不做处理
 * @param  {[type]} img_array [要处理的图片组]
 * @param  {[type]} max_width [最大宽度]
 */
function grab_img_zoom(img_array, max_width)
{
	$.each(img_array, function( i, item_img ) 
	{
		var image     = new Image();   
	 	 	image.src = this.src;
	 	 	image.i = i;
	 	 	if(image.complete) 
	 	 	{
	 	 		if(image.width <= max_width) 
				{
					img_array.eq(image.i).css('width','auto');
				}
				else 
				{
					if(img_array.eq(image.i).parent().get(0).nodeName.toLocaleLowerCase() == 'a') 
					{
						var _parent = img_array.eq(image.i).parent();
						$('<div style="padding: 3px 0;"><a class="view-origin" href="'+img_array.eq(this.i).attr('src')+'" >查看原图</a></div>').insertAfter($(_parent));
						return;
					}
					zoomImage.add(img_array.eq(this.i));
				}
				img_array.eq(image.i).css('visibility','visible').animate({
					'opacity': 1
				},500);
	 	 	}
	 	 	image.onload = function()
	 	 	{
				if(image.width <= max_width) 
				{
					img_array.eq(this.i).css('width','auto');
				} 
				else 
				{
					if(img_array.eq(this.i).parent().get(0).nodeName.toLocaleLowerCase() == 'a') 
					{
						var _parent = img_array.eq(this.i).parent();
						$('<div style="padding: 3px 0;"><a class="view-origin" href="'+img_array.eq(this.i).attr('src')+'" >查看原图</a></div>').insertAfter($(_parent));
						return;
					}
					zoomImage.add(img_array.eq(this.i));
				}
				img_array.eq(this.i).css('visibility','visible').animate({
					'opacity': 1
				},500);
	 	 	}
	});
}
/**
 * TODO: 缩略图放大缩小并且居中显示
 * @param  {[type]} host [window对象]
 */
(function(host) {

	var image_array    = [],
		ev_click       = 'click',
		ev_hover       = 'mouseover';

	var cur_in         = _IMG_URL ? 'url('+_IMG_URL+'/css/cursor/zoomin.cur),pointer': 'url(cursor/zoomin.cur), pointer!important',
		cur_out        =  _IMG_URL ? 'url('+_IMG_URL+'/css/cursor/zoomout.cur),pointer!important' : 'url(cursor/zoomout.cur), pointer!important',
		cur_out_cls    = 'out_cursor';

	var container_elem = null,
		origin_img     = null,
		doc            = null,
		container_id   = 'img_zoom_container',
		container_cls  = 'image_zoom';

	var inner_cls      = 'image_zoom_inner',
		img_cls        = 'origin_image';

	var win_width      = $(window).width(),
		win_height     = $(window).height();


	function add( elem )
	{
		image_array[image_array.length] = elem;
		elem.bind(ev_click, function() 
		{
			if(container_elem == null) 
			{
				create_container();
			} 
			else 
			{
				container_elem.show();
			}
			zoom_in($(this));
		});
		elem.bind(ev_hover, function()
		{
			$(this).css('cursor',cur_in);
		});
	}
	function zoom_in(elem)
	{
		create_origin_img( elem.attr('src') );
		pos();
	}
	function zoom_out()
	{
		container_elem.empty();
		container_elem.hide();
	}
	function create_container()
	{
		container_elem = $('<div id="'+container_id+'" class="'+container_cls+'"></div>').appendTo(document.body);
		container_elem.bind(ev_click,function(){
			zoom_out();
			origin_img = null;
		})
	}
	function create_origin_img( src )
	{
		if(origin_img != null) 
		{
			container_elem.empty();
		}
		var div = $('<div class="'+inner_cls+'"></div>');
		origin_img = $('<img class="'+img_cls+" "+cur_out_cls+'" style="cursor: '+cur_out+';" src="'+src+'" />');
		container_elem.append(div);
		div.append(origin_img);
	}
	function pos()
	{
		doc = doc || $(document);
		var	width = origin_img.width(), 
			height = origin_img.height();

		var x = doc.scrollLeft() + (win_width - width)/2, 
			y = doc.scrollTop() + (win_height - height)/2;

		container_elem.css({
			'position': 'absolute',
			'top': y - 10  + 'px',
			'left': x - 10+ 'px',
			'width' : width + 'px',
			'height' : height + 'px'
		});
	}
	host.zoomImage = {
		add: add,
		zoom_in: zoom_in,
		zoom_out: zoom_out
	}
})(window);



