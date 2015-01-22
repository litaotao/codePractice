var flag = jQuery.cookie('flag');
fontChoose();
$(".set-size-btn").click(function(){
    fontChoose();
});
function fontChoose() {
	if(flag==1){
        //执行方法;

        $('.article-content').css("fontFamily","'SimSun',宋体");
        $(".set-size-btn").children().html('黑');
		jQuery.cookie('flag', 1);
        flag=0;
    }else{
        //执行方法;
        $('.article-content').css("fontFamily","'Microsoft YaHei','黑体'");
        $(".set-size-btn").children().html('宋');
		jQuery.cookie('flag', 2);
        flag=1;
    }
}
/*!
 Autosize 1.18.13
 license: MIT
 http://www.jacklmoore.com/autosize
 */
(function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):!1;o?(t=u.getBoundingClientRect().width,(0===t||"number"!=typeof t)&&(t=parseInt(o.width,10)),e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseInt(o[i],10)})):t=p.width(),s.style.width=Math.max(t,0)+"px"}function a(){var a={};if(t=u,s.className=i.className,s.id=i.id,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=!u.value&&i.placeholder?p.attr("placeholder")||"":u.value,s.value+=i.append||"",s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u),p.trigger("autosize.resized"))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(jQuery||$);


// initialize all expanding textareas
$(function() {
    $("textarea[class*=textarea]").autosize({append: false});
    $('.jm-comments').on('click',function(){
        $("textarea[class*=textarea]").autosize({append: false});
    })


});
$.fn.limit = function (a) {
    var self = $(this),
        f = $.extend({ max_num: 1000,min_num:5}, a);
    self.on('change input propertychange',(function () {
        var content_limit = $(this).val().length;
        var max_limit = f.max_num;
        var min_limit = f.min_num;
        var in_limit = max_limit - content_limit;
        var in_limi2 = Math.abs(in_limit);
        var to_limit = min_limit - content_limit;
        if(content_limit < min_limit){
            self.parent().siblings().children(".result-tips").html('您至少还要输入<span>'+to_limit+'</span>个字').children().addClass('error-tips');
            self.parent().siblings().children(".btn-lock").attr("disabled",true).addClass('locked');
        }else if(( min_limit <= content_limit ) && ( content_limit <= max_limit )){
            self.parent().siblings().children(".result-tips").html('您还可以输入<span>'+in_limit+'</span>个字');
            self.parent().siblings().children(".btn-lock").attr("disabled",false).removeClass('locked');
        }else{
            self.parent().siblings().children(".result-tips").html('已经超出<span>'+in_limi2+'</span>个字').children().addClass('error-tips');
            self.parent().siblings().children(".btn-lock").attr("disabled",true).addClass('locked');
        };
//        $(".btn-lock").click(function(){
//            self.parent().siblings().children(".result-tips").html('您至少需输入<span>'+min_limit+'</span>个字').children().addClass('error-tips');
//            self.parent().siblings().children(".btn-lock").attr("disabled",true).addClass('locked');
//        })
    }))

}