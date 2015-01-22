define(function(require, exports){
	jQ(function(){
		addExtraRead('#extra_read_title','#extra_read_box')
	})
	function addExtraRead(t,id){
		var num = '0';
		var h = '600';
		var w = '600';
		var aid = jQ(t).attr('aid');
		var n = '0';
		var myDate = new Date();
		jQ(t+',#extra_read_close').on('click',function(){
			if(jQ(t).attr('flag')=='1'){
				toggleDiv(t,id,num,h);
				num == '0' ? num = '1' : num = '0';
			}else{
				//ajax
				var postUrl = '/tools/article.html?aid='+aid+'&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
		        	,random = parseInt(Math.random()*100000)
		        	,formUrl = postUrl+random
		        	;
				jQ.get(formUrl,function(data){
					if(data==''){console.log('内容为空')}
					var data = eval('('+data+')')
						,time = data.dateline
						,msg = ''
						,page = ''
						;
					msg = msg+'<div class="extra-msg"><h3>'+data.title+'</h3><div class="msg-box">'+data.content+'</div></div></div>';
					jQ('#extra_read_box .extra-wrap-msg').html(msg);
					jQ(t).attr('flag','1');
					toggleDiv(t,id,num,h);
					num == '0' ? num = '1' : num = '0';
					//如果翻页
					if(n > '1'){
						jQ('#extra_read_box .extra-wrap').append('<div class="extra-page">'+page+'</div>');
						extraPage('.extra-wrap-msg','.extra-msg','.extra-page span',n,w);
					}
				})
			}
		})
	}
	function toggleDiv(t,id,num,h){
		if(num=='0'){
				jQ(id).css({'border':'1px solid #69f',visibility:'visible'}).animate({
					width:'100%'
				}, 200 , function(){
					jQ(this).delay(200).css({'border':'2px solid #ebebeb'}).animate({
						height:h
					},200,function(){
						jQ('.extra-title-span i').addClass('ico_s');
					})
				})
		}else if(num=='1'){
				jQ(id).css({width:'0',height:'0',visibility:'hidden'});
				jQ('.extra-title-span i').removeClass('ico_s');
		}
	}
	function extraPage(c,cbox,page,n,w){
		jQ(c).width(w*n);
		jQ(cbox).width(w);
		jQ(page).on('click',function(){
			jQ(this).addClass('line').siblings().removeClass('line');
			var i = jQ(this).index();
			jQ(cbox).eq(i).fadeIn().siblings().fadeOut();
		})
	}
})