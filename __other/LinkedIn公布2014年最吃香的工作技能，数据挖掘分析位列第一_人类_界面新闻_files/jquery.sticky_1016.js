$.fn.stickyfloat = function(a){
    var timer,
        c = this,
        d = parseInt(c.parent().css("padding-top"))+parseInt(c.parent().css("padding-bottom")),
        f = $.extend({ duration: 200,startOffset: 62}, a);
        $(window).scroll(function(){
            c.stop();
                clearInterval(timer);
                var t = getScroll();
                var tp = c.parent().height() + d;
                var tt = c.parent().offset().top;
                var top = t - parseInt(tt) + f.startOffset;
                if ($(window).scrollTop()<(tt- f.startOffset)){
                    top = 0
                }

                if(t < (tp + tt -c.height())){
                    // timer=setInterval(function(){
                    //    c.animate({"top":top},f.duration);
                    //},100)
                    c.css({"top":top});
                }

        });
        function getScroll(){
            var bodyTop = 0;
            if (typeof window.pageYOffset != 'undefined') {
                bodyTop = window.pageYOffset;
                //alert(1)
            } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                bodyTop = document.documentElement.scrollTop;
                //alert(2)
            }
            else if (typeof document.body != 'undefined') {
                bodyTop = document.body.scrollTop;
                //alert(3)
            }
            return bodyTop
        }
}
