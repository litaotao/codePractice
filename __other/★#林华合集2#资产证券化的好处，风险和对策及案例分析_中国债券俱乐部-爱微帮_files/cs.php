(function () {
	var doc = document,
	win = window,
	nav = navigator,
	loc = location,
	funcs = function () {};
	funcs.prototype = {
		run	 : function(){
			this.init();
		},
		init : function () {
			var client_referer = doc.referrer,
			keyword = "",
			url = this.settings.host,
			ispc = this.ispc(),
			surl = window.location.href,anchorid="aliyun_cnzz_tui_"+this.settings.id,box,pl,pr,cw;
			if(!ispc){
				url = url + "&ispc="+ispc;
			}
			if(!!surl){
				url = url + "&surl="+encodeURIComponent(surl);
			}
			if (!!client_referer) {
				keyword = this.getkeyword(client_referer);
				url = url + "&keyword=" + keyword;
			}
			if (doc.title) {
				url = url + "&title=" + encodeURIComponent(doc.title);
			}
			doc.write('<div id="'+anchorid+'" style="display:block;float:none;border:0 none;margin:0;padding:0;visibility:visible;overflow:visible;*zoom:1;position:relative;z-index:1;"></div>');
			box = document.getElementById(anchorid)||'';
			pl = parseInt(getStyle(box,'paddingLeft')) || 0;
			pr = parseInt(getStyle(box,'paddingRight')) || 0;
			cw = parseInt(box.offsetWidth) - pl - pr;
			url += "&cw="+cw;
			this.loadScript(url);
			function getStyle(obj,styleName){
				if(obj.currentStyle){
				   return obj.currentStyle[styleName];
				}else{
				   var arr=window.getComputedStyle(obj, null)[styleName];
				   return arr;
				}
			}
		},
		getQueryString : function (name, urls) {
			var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(urls))
				return RegExp.$2.replace(/\+/g, " ");
			return "";
		},
		getkeyword : function (referer) {
			var keyword = "";
			keyword = this.getQueryString("wd", referer);
			if (keyword == "") {
				keyword = this.getQueryString("q", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("word", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("query", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("search", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("keyword", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("kw", referer);
			}
			if (keyword == "") {
				keyword = this.getQueryString("w", referer);
			}
			if (keyword) {
				keyword = encodeURIComponent(keyword);
			}
			return keyword;
		},
		addEvent : function (Elem, type, handle) {
			if (Elem.addEventListener) {
				Elem.addEventListener(type, handle, false);
			} else if (Elem.attachEvent) {
				Elem.attachEvent("on" + type, handle);
			};
		},
		loadScript : function (url) {
			var dtime = new Date().getMilliseconds(),
			rtime = +new Date + "" + dtime,isiniframe = this.iniframe();
			url = url + "&iniframe=" + isiniframe+ "&ts=" + rtime;
			if(document.body){
				var s = document.createElement("script");
				s.charset = "utf-8";
				s.async = !0;
				s.src = url;
				document.body.insertBefore(s, document.body.firstChild);	
			}else {
				this.addEvent(window,"load",function(){
					var s = document.createElement("script");
					s.charset = "utf-8";
					s.async = !0;
					s.src = url;
					document.body.insertBefore(s, document.body.firstChild);
				});
			}
		},
		iniframe : function(){
			return (top.location!==self.location);
		},
		ispc : function(){
			var ua = nav.userAgent.toLocaleLowerCase(),ispc=true;
			ispc = ua.match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|windows phone|win ce)/i) == null;
			return ispc;
		}
	};
	var doit = new funcs();
	doit.settings = {
		"host":"http://tui.cnzz.net/api.php?id=1000074377",
		"id":"1000074377"
	};
	doit.run();
})();
(function () {
	if (typeof(aliyun_recommend_opts) == "object") {
		var key = [];
		for (var i in aliyun_recommend_opts) {
			key.push(i)
		};
		var img = new Image();
		var d = new Date();
		img.onload = function () {
			img = null;
		};
		img.onerror = function () {
			img = null;
		};
		var Src = "http://rc.so.cnzz.net/stat.gif?url=" + encodeURIComponent(window.location.href) + "&ts=" + d;
		for (var i = 0; i < key.length; i++) {
			if (aliyun_recommend_opts[key[i]]) {
				Src += "&" + key[i] + "=" + encodeURIComponent(aliyun_recommend_opts[key[i]]);
			};
		};
		if (key[0]) {
			aliyun_recommend_opts = ""
				img.src = Src;
		}
	};
})();