var r=0;
var listScroll=function(){
	var speed=20; //数字越大速度越慢
	var t=$("#listScroll"),
	    t1=$(".j-hd1"),
	    t2=$(".j-hd2");
	t2.html(t1.html());	
	function Marquee(){
		if(t2.outerWidth()-t.scrollLeft()<=0){
			r=0;
			t.scrollLeft(r);
			
		}else{
			t.scrollLeft(r++);
		}
	}
	var s=setInterval(Marquee,speed);
	t.hover(
		function(){clearInterval(s);},
		function(){s=setInterval(Marquee,speed)}
	);
}
//收藏
function AddToFavorite(url,urlname){
	var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
		if (document.all){
			window.external.addFavorite(url,urlname);
		}else if(window.sidebar){
			window.sidebar.addPanel(urlname, url,'');
		}else{
			alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹!');
		}
}

//锚点
function maodian(d){
	  $("html, body").animate({scrollTop: $("a[name='"+ d +"']").offset().top-15}, 150);
	//$(window).scrollTop($("a[name='"+ d +"']").offset().top-60);
}
//回到顶部
function GoTop() {
    $(".goToTop").click(function() {
        $("html, body").animate({scrollTop: 0}, 120);
    });
}
 function contHeight(){
    var mH =$('.inner-Cont-wrap .wid680').outerHeight(),
        lH =$('.inner-Cont-wrap .wid320').outerHeight();
    if(lH > mH ) {
        $('.inner-Cont-wrap .wid680').height(lH) ;
    }
}


(function($) {
    $.fn.extend({
        returntop: function() {
            if (this[0]){
                var b = this.click(function() {
                    $("html, body").animate({
                        scrollTop: 0
                    },500),
					b.animate({bottom:$(window).height()+$(document).scrollTop()+200}, 800);

                }),
                c = null;
                $(window).bind("scroll",
                function() {
					window.k='';
                    var d = $(document).scrollTop(),
                    e = $(window).height();
                    0 < d ? b.css("bottom", "50px") : b.css("bottom", "-200px");
					clearTimeout(c),
					c = setTimeout(function(){
                        b.show();
                    },500);

                })
            }
        }

    })

})(jQuery);


function data_lshow(){
    var index=0;
    var length=$(".j-time-bd ul").length;
    var length2=$(".j-time-bd2 ul").length;

    var w = $(".j-time-bd ul").outerWidth();
    $('.j-time-bd').width(length*w);

    var w2 = $(".j-time-bd2 ul").outerWidth();
    $('.j-time-bd2').width(length2*w2);



    function showImg(i){
        var p = w*i;
        $(".j-time-bd").animate(
            { marginLeft: -p },
            300
        );

    }
    function showImg2(i){
        var p = w2*i;
        $(".j-time-bd2").animate(
            { marginLeft: -p },
            300
        );
    }
    function slideNext(){
        if(index >=0 && index < length-1){
            index++;
            $('.j-r').removeClass('enddata').addClass('btn-nxt');
            $('.j-l').removeClass('fstdata').addClass('btn-pre');
            if(index==length-1){
                $('.j-r').removeClass('btn-nxt').addClass('enddata');
                $('.j-l').removeClass('fstdata').addClass('btn-pre');
            }
            showImg(index);

        }else{
            $('.j-r').removeClass('btn-pre').addClass('enddata');
            $('.j-l').removeClass('fstdata').addClass('btn-pre');
            return false;
        }


    }

    function slideNext2(){
        if(index >=0 && index < length2-1){
            index++;
            $('.j-r2').removeClass('enddata2').addClass('btn-nxt2');
            $('.j-2').removeClass('fstdata2').addClass('btn-pre2');
            if(index==length2-1){
                $('.j-r2').removeClass('btn-nxt2').addClass('enddata2');
                $('.j-2').removeClass('fstdata2').addClass('btn-pre2');
            }
            showImg2(index);

        }else{
            $('.j-r2').removeClass('btn-pre2').addClass('enddata2');
            $('.j-2').removeClass('fstdata2').addClass('btn-pre2');
            return false;
        }


    }

    function slidepre(){

        if(index >=1 ) {
            --index;
            showImg(index);
            $('.j-l').removeClass('fstdata').addClass('btn-pre');
            $('.j-r').removeClass('enddata').addClass('btn-nxt');
            if(index==0){
                $('.j-r').removeClass('enddata').addClass('btn-nxt');
                $('.j-l').removeClass('btn-pre').addClass('fstdata');
            }
        }else{
            $('.j-r').removeClass('enddata').addClass('btn-nxt');
            $('.j-l').removeClass('btn-pre').addClass('fstdata');

        }
    }

    function slidepre2(){

        if(index >=1 ) {
            --index;
            showImg2(index);
            $('.j-2').removeClass('fstdata2').addClass('btn-pre2');
            $('.j-r2').removeClass('enddata2').addClass('btn-nxt2');
            if(index==0){
                $('.j-r2').removeClass('enddata2').addClass('btn-nxt2');
                $('.j-2').removeClass('btn-pre2').addClass('fstdata2');
            }
        }else{
            $('.j-r2').removeClass('enddata2').addClass('btn-nxt2');
            $('.j-2').removeClass('btn-pre2').addClass('fstdata2');

        }
    }

    $('.ils-bd').hover(function(){$('.pn-mod-hd').show();},function(){$('.pn-mod-hd').hide();})
    $('.ils-bd').hover(function(){$('.pn-mod-hd2').show();},function(){$('.pn-mod-hd2').hide();})

    $(".j-r").click(function(){
        slideNext();
    })
    $(".j-l").click(function(){
        slidepre();
    })
    $(".j-r2").click(function(){
        slideNext2();
    })
    $(".j-2").click(function(){
        slidepre2();
    })


}
$(function(){
    if(/((MIDP)|(WAP)|(UP\.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU\.Browser)|(wxd\.Mms)|(WxdB\.Browser)|(CLDC)|(UP\.Link)|(KM\.Browser)|(UCWEB)|(SEMC\-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT)|(SonyEricsson)|(NEC)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900\/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC)|(SED)|(EMOL)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Window\sCE)|(Wget)|(Java)|(curl)|(Opera))/i.test(navigator.userAgent) || isWeiXin()){
        var lo = window.location.href;
        /([0-9]+)/.test(lo)
         var id = parseInt(RegExp.$1);
         if(id > 0) {
             window.location.href = 'http://m'+BASE_DOMAIN+'/?app=wap&controller=news&action=show&contentid=' + id;
         } else {
             window.location.href = 'http://m'+BASE_DOMAIN+'/?app=wap&controller=news&action=lists&catid=15000';
         }
    }
})