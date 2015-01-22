$(document).ready(function () {

    $('.an').hover(
		function () { t = setTimeout(function () { $('.nav-item-1').addClass('ni1-bg');$('.nl').slideDown(50); }, 50); },
		function () { clearTimeout(t); $('.nl').slideUp(150,function(){$('.nav-item-1').removeClass('ni1-bg');}); }
	);

    /* 顶部菜单 */
    $('.dm').hover(
		function () { var e = $(this);t = setTimeout(function () { e.find('.menu').stop().slideDown(50); }, 50); $(this).find('.item-link').addClass('dm_hover'); },
		function () {  clearTimeout(t);$(this).find('.menu').stop().slideUp(150); $(this).find('.item-link').removeClass('dm_hover'); }
	);

    /* 搜索菜单 */
    $('.item-link-4').click(function () {
        $('.view_search').stop().slideToggle(300, function () { $('.sc').fadeIn(); $('#searchTextbox').focus(); $('.item-link-4').addClass('il_4'); });
    });
	
	/* 高级搜索 */
	$('#searchTextbox').click(function(){
		$('.sc').css({'background':'#9e0021'});
		$('.extra_sc').slideDown(300);
		 $('.sc button').addClass('on');
		 clearTimeout(t);
	});
	
	$('.sc').mouseleave(function(){
		t = setTimeout(function () { 
		$('.sc').css({'background':'none'});
		$('.extra_sc').slideUp(300);
		$('.sc button').removeClass('on');
		},500);
	});

    /* 设置菜单 */
	$(".item-link-5").click(function(e){
		e.stopPropagation();
		var o = $(this);
		o.addClass('il5-bg');
		$(".view_setting").slideToggle(300,function(){ 
			if( $(".view_setting").is(":hidden") ){ o.removeClass('il5-bg'); } 
		});
	});
		
	$(document).click(function(){
		$(".view_setting").slideUp(300,function(){$('.item-link-5').removeClass('il5-bg');});
	});
	
	$(".view_setting").click(function(e){e.stopPropagation();});
	
	/* 首页新闻标题 */
    var HOMENL = $('.rt .nlst .new-list ul li');
    HOMENL.hover(
    	function(){$(this).addClass('mnow');$(this).find('.date').hide();},
    	function(){$(this).removeClass('mnow');$(this).find('.date').show();}
    );

    /* 新闻分类切换 */
    var CTULA = $('.ct ul li a');
    CTULA.click(function () {
        CTULA.removeClass('current');
        $(this).addClass('current');
        var NUMB = $(this).parent().index() + 1;
        //alert(String(NUMB));
        if ($(this).attr('class') == 'current') {
            $('.lst').css({ 'display': 'none' });
            $('.lst-' + String(NUMB)).css({ 'display': 'block' });
        } else {
            $('.lst').css({ 'display': 'none' });
        }
    });

    /* 页码切换 */
    var NLNUM = $('.index .page_num a');
    NLNUM.click(function () {
        NLNUM.removeClass('current');
        $(this).addClass('current');
        var NUMB = $(this).index() + 1;
        //alert(String(NUMB));
        if ($(this).attr('class') == 'current') {
            $('.new-list .block').css({ 'display': 'none' });
            $('.new-list-' + String(NUMB)).css({ 'display': 'block' });
        } else {
            $('.new-list .block').css({ 'display': 'none' });
        }
    });

    /* 浮动内容 */
    $(window).scroll(function () {
        var bodyTop = 0,
        //bodyHeight = $(window).height(),
			 sideTop = $('.sidebar ul').eq(0).height() + 142;
        if (typeof window.pageYOffset != 'undefined') {
            bodyTop = window.pageYOffset;
        } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            bodyTop = document.documentElement.scrollTop;
        } else if (typeof document.body != 'undefined') {
            bodyTop = document.body.scrollTop;
        }
        if (bodyTop > sideTop) {
            $('#crf1').css({ 'position': 'fixed', 'top': '53px' });
        } else {
            $('#crf1').css({ 'position': 'relative', 'top': '0px' });
        }
    });
	
	/* 侧边分享按钮 */
    $('#goshare').mouseleave(function(){
		clearTimeout(hideTimer);
		$('#bdshare_s').removeAttr('te');
		hideTimer = setTimeout(function(){
			if ($('#bdshare_s').attr('te') != 'displayed') {
				$('#bdshare_l').fadeOut(200,function(){$('#bdshare_s').prependTo('body');}); 
			}
		}, 100); //鼠标移除元素区域子元素消失
	}).mouseenter(function(){
		$('#bdshare_s').attr('te', 'displayed');
        hideTimer = setTimeout(function(){
			$('#bdshare_s').appendTo('#side_func');
            $('#bdshare_l').addClass('show_bds').fadeIn(200);
        }, 500); //鼠标滑过元素1秒钟显示子元素
        $('#bdshare_l').mouseenter(function(){
				$('#bdshare_s').attr('te', 'displayed');
			}).mouseleave(function(){
			hideTimer = setTimeout(function(){
				$('#bdshare_l').fadeOut(200,function(){$('#bdshare_s').prependTo('body');$('#bdshare_s').removeAttr('te');});
			}, 100); //鼠标移除元素区域子元素消失
		});
	});
	
	//广告屏蔽
    //var ADHGT = $('.bx-recom4').height();
    //if(ADHGT == 0){
	//    $('body').addClass('a' + ADHGT);
	//    $('.bx-recom4').css({'height':'90px','background':'#dbdbdb'});
    //}
    
    //首页头条位置屏蔽
    var HHL = $('#hl960').height();
    if(HHL == 0){ $('#hl').css({'height':'60px'}); }
    
    $('.related_post a').hover(
    	function(){$(this).parent().find('span').addClass('rp_span');},
    	function(){$(this).parent().find('span').removeClass('rp_span');}
    );

});/* jQuery Document End */

/* 侧边浮动内容 */
lastScrollY=0;
function gotop(){
	var diffY;
	if (document.documentElement && document.documentElement.scrollTop)
		diffY = document.documentElement.scrollTop;
	else if (document.body)
		diffY = document.body.scrollTop;
	else
		{/*Netscape stuff*/}
	percent=.1*(diffY-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	lastScrollY=lastScrollY+percent;
	if(lastScrollY<100){ $("#gotop").fadeOut('fast');} else {$("#gotop").fadeIn('fast');}
}
gotopcode=" \
	<div id=\"side_func\"> \
	<a class=\"sfa block1 joinus\" href=\"http://shop.ithome.com/?f=shortcut\" title=\"IT之家商城\"><span class=\"text1\">之家<br />商城</span><span class=\"text2\" style=\"display:none;\">之家<br />商城</span></a> \
	<a class=\"sfa block1\" href=\"http://www.ithome.com/tougao.htm\" target=\"_blank\"><span>投稿<br />反馈</span></a> \
	<a class=\"sfa block2\" id=\"gocomm\" href=\"#commentDiv\">评论</a> \
	<a class=\"sfa block3\" id=\"gotop\" href=\"javascript:;\" title=\"返回顶部\" onfocus=\"this.blur()\" style=\"display:none\"><span>返回<br />顶部</span></a> \
	</div>"
document.write(gotopcode);
$('#side_func').prependTo('body');
window.setInterval("gotop()",1);

$('#side_func a.joinus').hover(
	function(){ $(this).find('span.text1').css({'display':'none'});$(this).find('span.text2').css({'display':'block'});},
	function(){ $(this).find('span.text2').css({'display':'none'});$(this).find('span.text1').css({'display':'block'});}
);

$("#gotop").click(function(){
    $("html,body").animate({scrollTop: 0}, 200);
    return false;
});

$('#gocomm,.pti_comm').click(function(){
	var href = $(this).attr("href");
    var pos = $(href).offset().top - 35;
    $("html,body").animate({scrollTop: pos}, 200);
    return false;
});

/* IT之家客户端二维码 */
qrcode=" \
	<div id=\"qrcode\"><a class=\"close\" href=\"javascript:;\"></a><a class=\"qr-img\" href=\"http://m.ithome.com/ithome/\" target=\"_blank\"><a class=\"qr-img wc\" href=\"http://m.ithome.com/ithome/\" target=\"_blank\"></a></div> \
"
document.write(qrcode);
$('#qrcode').prependTo('body');

/* 活动浮动广告 */
hd_float="<div id=\"hd_float\" style=\"position:fixed;left:50%;bottom:190px;margin-left:-690px;width:166px;\"><a class=\"close\" href=\"http://www.ithome.com/html/soft/114446.htm\" target=\"_blank\" style=\"display:block;width:166px;height:199px;background:url(http://img.ithome.com/images/v2.1/166x199_xzs.gif) no-repeat;\"></a></div>"
document.write(hd_float);
$('#hd_float').prependTo('body');

/*function QRC(){
	if($.cookie('qrclose') == 'hide' || $(window).width() < 1390){
		$('#qrcode').css({'display':'none'});
	}else{
		$('#qrcode').css({'display':'block'});
	}
}
window.setInterval("QRC()",1);

$('#qrcode a.close').click(function(){
	$('#qrcode').hide();
	$.cookie('qrclose', 'hide',{expires: 7,path:'/',domain:"ithome.com"});
});*/

function QRC(){
	if($.cookie('qrclose') == 'hide'){
		$('#qrcode').css({'display':'none'});
	}else{
		$('#qrcode').css({'display':'block'});
	}
}
window.setInterval("QRC()",1);

$('#qrcode a.close').click(function(){
	$('#qrcode').hide();
	$.cookie('qrclose', 'hide',{expires: 7,path:'/',domain:"ithome.com"});
});

/* 修复Flash遮挡 */
$('embed').attr('wmode','transparent');

if ((navigator.userAgent.match(/(iPhone|iPod|Android|Windows Phone)/i))) {
	app_recom = $('<a href="http://wap.ithome.com" class="go_wap">进入WAP版</a>');
	app_recom .prependTo('#hd');
	$('body').css({'padding-top':'86px'});
}



function connectLogin(type) {
    var url = "",
        name = "",
        width = "",
        height = "";
    var clienttime = parseInt((new Date).getTime()/1000)
    
    switch (type) {
        case "Sina":
            url = "http://www.ithome.com/ithome/openplat/sina/login.aspx";
            name = "SinaLogin";
            width = 562;
            height = 380;
            break;

    }
    if(url){
        url +="?clienttime="+clienttime
        var l = (window.screen.width - width) / 2,
            t = (window.screen.height - height) / 2;
        window.open(url, name, "width="+ width +",height="+ height +",left="+ l +",top="+ t +",menubar=0,scrollbars=0,resizable=0,status=0,titlebar=0,toolbar=0,location=1"); 
    }
    
}
