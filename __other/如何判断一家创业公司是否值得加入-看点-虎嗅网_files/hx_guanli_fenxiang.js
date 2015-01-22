define(function(require, exports){
	/**
	*	浮动的分享与管理
	**/
	jQ('.share-box-num').on('click',function(){
		var box = jQ(this).siblings();
		if(box.height() == '28'){
			box.height('auto')
		}else{
			box.height('28')
		}
	})
	jQ('.box-guanli-span').on('click',function(){
		var box = jQ(this).siblings();
		if(box.is(':hidden')){
			box.show()
		}else{
			box.hide()
		}
	})
		
	jQ('#gl_fx').css({'position':'absolute'});
	var menuYloc = jQ('#content').offset().top; 
	jQ(window).scroll(function (){ 
		var offsetTop = jQ(window).scrollTop() 
			,wrapHeight = jQ('.entry-content').height()-jQ('#neirong_pl').height()
			,boxHeight = jQ('#gl_fx').height();
		if(offsetTop > 100 && offsetTop < (wrapHeight-boxHeight) ){
			jQ('#gl_fx').animate({top : offsetTop-100+'px' },{ duration:600 , queue:false });
		}else if (offsetTop <= 100){
			jQ('#gl_fx').animate({top : 100+'px' },{ duration:600 , queue:false });
		}
		
	});
})