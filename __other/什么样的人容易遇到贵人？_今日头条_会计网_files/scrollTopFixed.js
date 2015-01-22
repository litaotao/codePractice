/*
 * 这是一个当前选中的元素，当窗口在向上滚动到，这个元素时位于窗口顶部时，将其固定在窗口顶部，
 * 当窗口在向下滚，滚到当前这个元素所在的原先位置时，会位于之前的位置 同时随文档向下滚，只能单独用于方法调用
 * 
 * @method scrollTopFixed
 * @namespace jQuery
 * @param {string} FixedClass 如果当前元素已向下滚超过自己的位置时，增加这个class(样式)，当已向上滚超过自己的位置时，删除这个class(样式)，如果没有传入为空字符
 * @param {boolean} isFollowWindow 如果当前元素是需要跟随窗口的宽度需变化其宽度的，则设为true
 * */
jQuery.fn.extend({scrollTopFixed: function(FixedClass, isFollowWindow){
	//标志值，  如果当前的浏览器为IE6则为true, 否则为false
	var isIE6 = /MSIE 6/.test(window.navigator.userAgent);
	
	this.each(function(){
		//取得当前元素的jQuery包含的引用
		var $target = jQuery(this);
		
		//取得当前元素的原始高度
		var targetHeight = $target.height();
		
		//取得当前元素的原始宽度
		var targetWidth = $target.width();
		
		//取得当前元素的原始位置（相对于文档）对象{left:value, top:value}
		var targetOffset = $target.offset();
		
		//取得当前元素的原始位置上面（相对于文档）
		var targetTop = targetOffset.top;
		
		//创建一个与当前元素的一样工的元素
		var $targetWrap = jQuery($target.get(0).cloneNode(false));
		
		//将克隆的元素的内容删除，并放在原元素的前面，并将克隆的元素去掉id（避免冲突）
		var $temp = $targetWrap.insertAfter($target).removeAttr("id").hide();
		
		//标志值，当前元素是否已经进入悬浮在窗口的顶部了（如果是则为true, 否为false, 开始时为false）
		var isHasDone = false;
		
		//用于在元素悬浮时增加，在原位时删除除，做开始时处理，以确定是否为undefined，如果是则为"";
		FixedClass = FixedClass ? FixedClass : "";
		
		//用于在窗口改变大小时，元素是否要跟随，做开始处理
		isFollowWindow = isFollowWindow ? isFollowWindow : false;
		
		var parentPosition = $target.css("position").toLowerCase(); 
		var isParentRA =  ( parentPosition === "relative" || parentPosition === "absolute" )? true : false;
		
		//当窗口发生滚动时，增加事件
		jQuery(window).scroll(function(){
			//取得当前窗口的jQuery引用
			var $this = jQuery(this);
			
			//取得当前窗口滚动了的高度
			var scrollTop = $this.scrollTop();
			//如果当前元素是滚动到窗口的顶部了，则将其悬浮到窗口顶部
			if(scrollTop > targetTop){
				//标志值，如果已经悬浮了，则不处理悬浮，否则执行悬浮
				if(!isHasDone){
					//标志值设为true
					isHasDone = true;
					
					//将克隆的元素显示出来，做原元素的占位
					$temp.show().css({"visibility":"hidden","height":targetHeight+"px"});
					
					//将元素悬浮
					$target.css({"position":"fixed", "top":0, "left":"auto", "width":targetWidth+"px", "z-index":99}).addClass(FixedClass);
					
				}
				//如果是IE6则，重设top，以适应滚动（目的是解决了IE6不支持position:fixed）
				if(isIE6){
					if(isParentRA){
						$target.css({"position":"absolute", "top":scrollTop-targetTop+"px", "left":"auto"});
					}else{
						$target.css({"position":"absolute", "top":scrollTop+"px", "left":"auto"});
					}
				}
			//如果当前元素没有滚动到窗口的顶部，则将其放回原来的位置
			}else{
				//标志值，如果已经处在悬浮状态，则将其去掉悬浮状态
				if(isHasDone){
					//标志值设为false
					isHasDone = false;
					
					//将克隆元素隐藏
					$temp.hide();
					
					//将元素去掉悬浮，并且放回到原来的位置
					$target.removeAttr("style").removeClass(FixedClass);
				}
			}
		//当窗口发生大小时，增加事件
		}).resize(function(){
			//标志值， 如果为true，则会设置其宽度根据当前的窗口大小
			if(isFollowWindow){
				//取得当前窗口的宽度
				targetWidth = jQuery(this).width();
				
				//设置元素的宽度
				$target.css({"width":targetWidth+"px"});
			}
		});
	});
}});
