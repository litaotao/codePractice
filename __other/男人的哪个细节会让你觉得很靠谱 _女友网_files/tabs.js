$(document).ready(function(){
	var defaultOpts = { interval: 4000, fadeInTime: 300, fadeOutTime: 200 };
	var _titles = $(".mode-flash-1 .thumb ul li");
	var _bodies = $(".mode-flash-1 .big-pic a");
	var _count = _titles.length;
	var _current = 0;
	var _intervalID = null;
var stop = function() { window.clearInterval(_intervalID); };
var slide = function(opts) {
	if (opts) {
		_current = opts.current || 0;
	} else {
		_current = (_current >= (_count - 1)) ? 0 : (++_current);
	};
	_bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime, function() {
		_bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
		_bodies.removeClass("cur").eq(_current).addClass("cur");
	});
	_titles.removeClass("cur").eq(_current).addClass("cur");
};
var go = function() {
	stop();
	_intervalID = window.setInterval(function() { slide(); }, defaultOpts.interval);
}; 
var itemMouseOver = function(target, items) {
	stop();
	var i = $.inArray(target, items);
	slide({ current: i });
}; 
_titles.hover(function() { if($(this).attr('class')!='cur'){itemMouseOver(this, _titles); }else{stop();}}, go);
_bodies.hover(stop, go);
go();
});

function pos( o ){
	var p = o.offset();
	return { l: p.left, t: p.top}
}
/* 菜单效果 */
 function menuEffect( wrap,classname ){
 	var lis = $(wrap).find('li');
		lis.hover(function(){
			$(this).addClass(classname);
		},function(){
			$(this).removeClass(classname);
		})
 }
 menuEffect("#common-menu",'nav-cur')
/* 一般切换	*/
 function cmstopTabs( o ){
 	var tit = $(o['title']), cont = $(o['cont']),tabsty = o['tabStyle'];
	var tits = tit.find('li a'), conts = cont.find('>div');
		tits.mouseover(function( ){
			 var t = this;
			 var index = tits.index($(t));
			 setTimeout(function(){
			 $(t).addClass(tabsty).parent().siblings().find('a').removeClass(tabsty);
			 $(conts[index]).show().siblings().hide();
			 },60);
		});
 }
 // 内容页面
 cmstopTabs({tabStyle:'tabs-focus',title: '#tab-title-1',cont: "#tab-cont-1"});
 // 首页 阅读排行榜
 cmstopTabs({tabStyle:'tabs-focus',title: '#tab-title-2',cont: "#tab-cont-2"});
 // 报纸页面-杂志期目切换
 cmstopTabs({tabStyle:'maga-curr',title: '#tab-title-3',cont: "#tab-cont-3"});
 // 文章评论页面调用
 cmstopTabs({tabStyle:'tabs-focus',title: '#tab-title-4',cont: "#tab-cont-4"});
