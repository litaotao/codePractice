/*
 * TODO: 回到顶部
 */
 (function(scope){
 	var d = document,
		txt,
		ele = null,
		dir = '',
		dom = '',
		relEle = null;
	
	//初始化
 	function init(c){
		relEle = c.rel;
		dir = c.dir;
		dom = c.dom;
		create_ele();
		isTop();
		_fixed(dir);
		bindScroll();
		bindClick();
	}
	// 页面初始化时，滚动条处于顶部时的处理
	function isTop(){
		var t = $(document).scrollTop();
		if(t==0) ele.hide();
	}
	// 创建gotop元素
	function create_ele(){
		ele = $(dom);
		$(document.body).append(ele);
		if($.browser.msie && ($.browser.version == "6.0")){
			ele.css('position','absolute');
		}
	}
	// 定位gotop元素
	function _fixed(dir){
		var offset = $(relEle).offset();
		if(dir == 'left'){
			ele.css('left',offset.left - ele.outerWidth());
		}else{
			ele.css('left',offset.left+$(relEle).innerWidth());
		}
	}
	// window绑定scroll事件
	function bindScroll(){
		$(window).scroll(function(){
			var st = $(document).scrollTop(), winh = $(window).height();
			if($.browser.msie && ($.browser.version == "6.0")){
				ele.css('top',st);
			}
			(st > 0) ? ele.fadeIn(): ele.fadeOut();
			if (!window.XMLHttpRequest) ele.css("top", st + winh - 166);
		});
	}
	//向上滚动动画
	function bindClick(){
		ele.click(function(){
			$("html, body").animate({ scrollTop: 0 }, 120);
		});
	}
	
	if(!scope['GoTop']) scope['GoTop'] = {init: init};
	
 	return GoTop;
	
 })(window);

/*
 * TODO: 切换
 */
 (function(host){
		
	// easytab的快捷方式
	var Easytab = function( options ){
		return new easytab.prototype.init(options);
	}
	
	var breaker = {};
	
	var ArrayProto 			= Array.prototype,
		nativeForEach       = ArrayProto.forEach
		hasOwnProperty   	= Object.prototype.hasOwnProperty;
		
	var each = function(obj, iterator, context) {
	    if (obj == null) return;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } else if (obj.length === +obj.length) {
	      for (var i = 0, l = obj.length; i < l; i++) {
	        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
	      }
	    } else {
	      for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) {
	          if (iterator.call(context, obj[key], key, obj) === breaker) return;
	        }
	      }
	    }
	}
	
	var getElement = function(elem,value){
        var arr = [], elems;
        if (elem) {
            elems = elem.getElementsByTagName('*');
            each(elems,function(current,i){
                if(current.getAttribute(value) == 'tab'){
                    arr[arr.length] = current;
                }
            })
        }
        return arr;
	}
	
	var addHandler = function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
	}
	var preventDefault = function( ev )
	{
		if (ev.preventDefault){
        	ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
	}
	var stop = function( timer ){
		clearInterval(timer);
	}
	var easytab = function(){}
	
	easytab.prototype = {
		// 当前项序号
		currTab: 0,
		// 启动函数
		init: function( options ){
			var self = this;
			this.setOptions( options );
			this.startPos();
			
			each(this.menus,function(c,i){
				var self = this;
				this.conts[i].setAttribute('title','');
				addHandler(c,this.eventType, function( ev ){
					if(self.timer) stop(self.timer);
					self.currTab = i;
					self.tab(i);
					if(self.eventType === 'click' && c.nodeName =='A') {
						preventDefault(window.event || ev);
					}
				});
				if(this.isauto !== true) return;
				addHandler(c,'mouseout', function(){
					if(self.isauto === true) self.auto();
				});
				addHandler(this.conts[i],'mouseover', function(){
					if(self.timer) stop(self.timer);
				});
				addHandler(this.conts[i],'mouseout', function(){
					if(self.isauto === true) self.auto();
				});
			},this);
			
			if(this.isauto === true) this.auto();
		},
		// 第一次定位
		startPos: function(){
			this.currTab = this.active_tab;
			this.tab(this.currTab);
		},
		// 初始化设置
		setOptions: function( options ){
			this.menu 		= document.getElementById(options['menu']);
			this.cont 		= document.getElementById(options['content']);
			this.active_css	= options['active_css'];
			this.menus 		= getElement(this.menu,'rel');
			this.conts 		= getElement(this.cont,'title');
			this.len 		= this.menus.length;
			this.active_tab = options['active_tab'];
			this.isauto 	= options['auto']  === true ? true : false;
			this.duration	= typeof options['duration'] == 'number' ? options['duration'] : false;
			this.eventType = options['eventType'] === undefined ? 'mouseover' : options['eventType'];
		},
		// 切换函数
		tab: function( current ){
			each(this.conts,function( value,i,list){
				this.menus[i].className = '';
				list[i].style['display'] = 'none';
			},this);
            this.menus[current] && (this.menus[current].className = this.active_css);
            this.conts[current] && (this.conts[current].style['display'] = 'block');
		},
		// 自动切换函数
		auto: function(){
			var _ = this;
			this.timer = window.setInterval(function(){
				var c = _.currTab++;
				if(c == _.len-1) _.reStart();
				_.tab(c);
			},this.duration*1000);
		},
		// 回到初始位置
		reStart: function(){
			stop(this.timer);
			this.currTab = 0;
			this.auto();
		}
	}
	easytab.prototype.init.prototype = easytab.prototype;
	
	host.TAB = Easytab;
		
})(window);

/*
 * TODO: 倒计时
 */
// 调用方法
// target[target.length]=new Date(年,月-1,日,时,分,秒).getTime() 
// countdown.target[countdown.target.length] = new Date(2012,06,19,18,00,00).getTime(); 
// 设定倒计时显示地址(数组元素) 
// countdown.outputElement[countdown.outputElement.length] = document.getElementById('show');
// countdown();
 function countdown() 
{ 
    setTimeout(function()
    {
        countdown();
    }, 60 * 1000 );

    for (var i = 0, j = countdown.target.length; i < j; i++ )
    { 
        today      = new Date(); 
        timeold    = countdown.target[i] - today.getTime(); 
        sectimeold = timeold/1000; 
        secondsold = Math.floor(sectimeold); 
        msPerDay   = 24*60*60*1000; 
        e_daysold  = timeold/msPerDay; 
        daysold    = Math.floor(e_daysold); 
        e_hrsold   = (e_daysold - daysold) * 24; 
        hrsold     = Math.floor(e_hrsold); 
        e_minsold  = (e_hrsold - hrsold) * 60; 
        minsold    = Math.floor((e_hrsold - hrsold) * 60); 
        seconds    = Math.floor((e_minsold - minsold) * 60); 
        if (daysold < 0) { 
           countdown.outputElement[i].innerHTML = "已经结束"; 
        }  
        else { 
            if (daysold < 100) { daysold   =  "0"  + daysold} 
            if (hrsold  < 10)  { hrsold    =  "0" + hrsold} 
            if (minsold < 10)  { minsold   =  "0"  + minsold} 
            if (seconds < 10)  { seconds   =  "0"  + seconds} 
            countdown.outputElement[i].innerHTML = daysold+"天"+hrsold+"时"+minsold+"分";
        } 
    } 
} 
countdown.target = [];
countdown.outputElement = [];

/*
 * TODO: 图片排行效果
 */
function accordion( elem ){
	var lis = elem.find('.item');
	var Tag = lis.eq(0).get(0).nodeName;
	lis.hover(function( ev ){
		$(this).find('.summary').show().parent().siblings().find('.summary').hide();
	},function( ev ){
		if(ev.relatedTarget.nodeName != Tag ){
			$(this).find('.summary').show().parent().siblings().find('.summary').hide();
		} else{
			$(this).find('.summary').hide();
		}
	});
}
/*
 * TODO: 跑马灯效果
 */
function marquee_to_left( wrapid, copyid, pasteid ){
	var speed 		= 30;
	var scrollWrap  = document.getElementById(wrapid),
		copy 		= document.getElementById(copyid),
		paste 		= document.getElementById(pasteid);
	
	if(copy.getElementsByTagName('td').length < 3) 
	{
		return;
	}
	paste.innerHTML 	= copy.innerHTML;
	
	function Marqueeleft()
	{
		if(paste.offsetWidth - scrollWrap.scrollLeft <= 0 )
			scrollWrap.scrollLeft -= copy.offsetWidth
		else
			scrollWrap.scrollLeft++
	}

	var MyMar = setInterval(Marqueeleft,speed);

	scrollWrap.onmouseover = function() 
	{
		clearInterval(MyMar);
	}
	scrollWrap.onmouseout = function() 
	{
		MyMar = setInterval(Marqueeleft,speed);
	};
}
	