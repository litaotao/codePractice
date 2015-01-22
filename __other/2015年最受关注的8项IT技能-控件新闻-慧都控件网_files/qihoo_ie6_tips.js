    (function(){	
	var bg_img = 'http://p7.qhimg.com/d/360browser/20130322/ie6bye_0322.jpg';
	var frame_css = ' style="font-family:SimSun; background:#F8EFB4; border-bottom:1px solid #EED64D; clear:both; color:#503708; height:42px; line-height:42px; padding-top:7px; text-align:center; width:100%; font-size:12px;"';
	var wrap_css = ' style="width:990px;"';
	var img_btn = 'background:url(' + bg_img + ');display:inline-block;height:32px;vertical-align:middle;margin:0 5px 2px;';
	var close_css = ' style="' + img_btn + 'width:17px;height:17px;background-position:-112px -65px;float:right;cursor:pointer; margin:8px 12px 0;"';
	var ie8_css = ' style="' + img_btn + 'width:50px;background-position:-152px 0;"';
	var se_css = ' style="' + img_btn + 'width:110px;background-position:0 -33px;"';
	var cse_css = ' style="' + img_btn + 'width:112px;background-position:-40px 0;"';
	var update_css = ' style="' + img_btn + 'width:112px;background-position:0 -65px;"';
	var excl_css = ' style="' + img_btn + 'width:40px;height:33px;"';
	var detail_css = 'color:#2078D2; text-decoration:none;';
	var ie6bye_css = ' style="font-weight:bold; color:#353C8F;text-decoration:none;"';

	var src = location.hostname;//query('src');
	var win2003 = (/Windows NT 5.2/.test(navigator.userAgent));
	var ie6 = (/MSIE 6/i.test(navigator.userAgent) && !/MSIE [^6]/i.test(navigator.userAgent));
	if (!win2003 && ie6) {
		window.onerror = function(){return true};
		if ('none' == document.body.currentStyle.backgroundImage) {
			css('* html,* html body{background-image:url(about:blank);background-attachment:fixed}');
		}
		css('* html .ie6fixedTL{position:absolute;z-index:2147483647;left:0;top:expression(eval(document.documentElement.scrollTop))};* html body{margin:0}');
		document.body.insertAdjacentHTML("afterBegin", '\
			<!--[if lt IE 7 ]><div' + frame_css + ' style="" id="qihoo_ie6_tips_block"></div><![endif]-->');
		if (is360se()) {
			document.body.insertAdjacentHTML("afterBegin", '\
			<!--[if lt IE 7 ]><div' + frame_css + ' class="ie6fixedTL" id="qihoo_ie6_tips"><span' + close_css + ' id="qihoo_ie6_tips_close"></span><div' + wrap_css + '>\
				<em' + excl_css + '></em>\u60A8\u7535\u8111\u4E0A\u4ECD\u5B58\u5728\u4E0D\u5B89\u5168\u7684\u0049\u0045\u0036\uFF0C\u63A8\u8350\u5347\u7EA7\u5230\u81EA\u5E26\u0049\u0045\u0038\u5185\u6838\u7248\u7684\u0033\u0036\u0030\u5B89\u5168\u6D4F\u89C8\u5668\uFF0C\u5B89\u5168\u7CFB\u6570\u63D0\u5347\u767E\u5206\u767E<a href="http://down.360safe.com/se/360se6_setup.exe" id="qihoo_ie6_tips_se" ' + update_css + '></a>   <a href="http://app.browser.360.cn/ie6bye/" target="_blank" ' + ie6bye_css + '>\u4E86\u89E3\u201C\u544A\u522B\u0049\u0045\u0036\u8054\u76DF\u201D>></a><!--<a href="" target="_blank" ' + detail_css + '>\u4E86\u89E3\u8BE6\u60C5\u300B</a>--></div></div><![endif]-->');
		} else {
			document.body.insertAdjacentHTML("afterBegin", '\
			<!--[if lt IE 7 ]><div' + frame_css + ' class="ie6fixedTL" id="qihoo_ie6_tips"><span' + close_css + ' id="qihoo_ie6_tips_close"></span><div' + wrap_css + '>\
				<em' + excl_css + '></em>\u60A8\u4F7F\u7528\u7684\u6D4F\u89C8\u5668\u5185\u6838\u4E3A\u0049\u0045\u0036\uFF0C\u843D\u540E\u4E8E\u5168\u7403\u0037\u0036\u002E\u0032\u0025\u7528\u6237\uFF01\u63A8\u8350\u60A8\uFF1A\u5B89\u88C5<a href="http://down.360safe.com/se/360se6_setup.exe" id="qihoo_ie6_tips_se" ' + se_css + '></a>\u6216\u76F4\u63A5\u5347\u7EA7\u5230<a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8" id="qihoo_ie6_tips_ie8" ' + ie8_css + '></a>   <a href="http://app.browser.360.cn/ie6bye/" target="_blank" ' + ie6bye_css + '>\u4E86\u89E3\u201C\u544A\u522B\u0049\u0045\u0036\u8054\u76DF\u201D>></a><!--<a href="" target="_blank" ' + detail_css + '>\u4E86\u89E3\u8BE6\u60C5\u300B</a>--></div></div><![endif]-->');
			if (gel('qihoo_ie6_tips')) {
				gel('qihoo_ie6_tips_ie8').onmouseup = function(){
					statSeAdClick_qihoo(src + '_ie8');
				};
			}
		}
		if (gel('qihoo_ie6_tips')) {
			gel('qihoo_ie6_tips_close').onclick = function(){
				gel('qihoo_ie6_tips').style.display = 'none';
				gel('qihoo_ie6_tips_block').style.display = 'none';
				document.body
			};
			gel('qihoo_ie6_tips_se').onmouseup = function(){
				statSeAdClick_qihoo(src + '_se');
			};
			function resize() {
				if ((document.documentElement.clientWidth||document.body.clientWidth) < 1035) {
					gel('qihoo_ie6_tips').style.width = '1035px';
				} else {
					gel('qihoo_ie6_tips').style.width = '100%';
				}
			}
			resize();
			window.attachEvent('onresize', resize);
			statSeAdPv_qihoo(src);
		}
	}
	function query(key) {
		var scripts = document.getElementsByTagName('script');
		var url;
		each(scripts, function(){
			if (this.src.indexOf('qihoo_ie6_tips.js') > -1) {
				url = this.src;
				return false;
			}
		});
		var match, re = /(?:\?|&)(.+?)=(.*?)(?=\?|&|$)/g;
		var str = url.substr(url.indexOf('?'));
		while(match = re.exec(str)) {
			if (match[1].toLowerCase() == key.toLowerCase()) {
				try {
					return decodeURIComponent(match[2]);
				} catch (e) {
					return match[2];
				}
			}
		}
	}
	function gel(id) {return document.getElementById(id)}
	function each(object, callback) {
		var i = 0,
			length = object.length;
		for (var value = object[0];
			i < length && callback.call( value, i, value ) !== false; value = object[++i]) {}
	}
	function statSeAdPv_qihoo(s){
		var n=Math.ceil(Math.random()*1000);
		if(n<11){
			window.qihoo_ie6_tips_stat = new Image(1, 1);
			qihoo_ie6_tips_stat.src = "http://click.stat.hao.360.cn/110629A.gif?t=" + +new Date + "&type=show&s=ie6_tips_" + s;
		}
	}
	function statSeAdClick_qihoo(s){
		window.qihoo_ie6_tips_stat = new Image(1, 1);
		qihoo_ie6_tips_stat.src = "http://click.stat.hao.360.cn/110629A.gif?t=" + +new Date + "&type=click&s=ie6_tips_" + s;
	}
	function is360se() {
		var ret = false;
		ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("chrome") > -1) {
			ret = (ua.indexOf("qqbrowser") > -1 || ua.indexOf(" se ") > -1 || ua.indexOf("360ee") == -1) ? false : true
		}
		try {
			if (window.external && window.external.twGetRunPath) {                
				var r = external.twGetRunPath();
				if (r && (r.toLowerCase().indexOf("360se") > -1 )) {
					ret = true;
				}
			}
		} catch (ign) {
			ret = false;
		}
		return ret;
	}
	function css(cssText) {
		var style = document.createElement('style');
		document.getElementsByTagName("head")[0].appendChild(style);
		style.styleSheet.cssText = cssText;
	}
})();