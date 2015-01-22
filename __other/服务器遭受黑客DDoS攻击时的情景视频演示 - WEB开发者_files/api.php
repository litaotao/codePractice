(function(){	//原型部分img
	var tuiFloat = new Function();
	tuiFloat.prototype = {
		init : function (){
			//外容器
			this.oBox		=	this.oBox || document.body;
			//tui 尺寸
			this["width"]	=	Number(this["set"]["style"]["style_width"]);
			this["height"]	=	Number(this["set"]["style"]["style_length"]);
			//doctype
			this.mode =	document.compatMode;
			//是否支持fixed
			if (Sys().ie=="6.0" || (Sys().ie && this.mode=="BackCompat")) {
				this.fix=false;
			}else {
				this.fix=true;
			};
			//用户行为
			this.userOpen=false;
			this.userClose=false;
			this.closeOnce=true;
			this.userScroll = 0;
			this.timer = "";
			
			//创建iframe
			var iframe=document.createElement("iframe");
			iframe.setAttribute("allowTransparency","true");
			iframe.setAttribute("frameBorder","0");
			iframe.setAttribute("scrolling","no");
			iframe.style.cssText="float:none;position:absolute;display:none;overflow:hidden;z-index:2147483646;margin:0;padding:0;border:0 none;background:none;";
			this.oBox.appendChild(iframe);
			if (/msie/i.test(navigator.userAgent)) {
				var that=this;
				try {
					setTimeout(function(){
						iframe.contentWindow.document;
						that.o = iframe;
						that.createHtml();
					},0);
				} catch (e) {
					var base = document.getElementsByTagName("base");
					if (base && base.length > 0) {
						var baseTarget = {};
						for (var i=0;i<base.length;i++) {
							baseTarget[base[i]] = base[i].target;
							if (base[i].target == "_self") {
								continue;
							};
							base[i].target = "_self";
						};
					};
					
					iframe.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close()})())";
					if (!window.XMLHttpRequest) {
						setTimeout(function(){
							that.o = iframe;
							that.createHtml();
						},0);
					}else {
						this.o = iframe;
						//创建内容
						this.createHtml();
					};
					
					if (base && base.length > 0) {
						for (var i=0;i<base.length;i++) {
							if (base[i].target != "_self") {
								continue;
							};
							base[i].target = baseTarget[base[i]];
						};
					};
				}
			}else{
				this.o = iframe;
				//创建内容
				this.createHtml();
			};
		},
		createHtml : function () {
			var that=this;
			this.oDoc = this.o.contentWindow.document;
			this.oDoc.open();
			this.oDoc.write('<!doctype html><html><head><meta charset="utf-8"><title>云推荐</title><style type="text/css">body,div,ul,li,em,span,a,p{padding:0;margin:0;}img{border:0 none;display:block;}em{font-weight:normal;font-style:normal;}ol,ul{list-style:none;}table{border-collapse:collapse;border-spacing:0;}body,input,textarea{font-family:simsun;}#tui{overflow:hidden;border-width:1px;border-style:solid;float:left;}#img{overflow:hidden;*zoom:1;padding:0 10px;}#img li{float:left;overflow:hidden;margin-top:10px;display:inline;}#img li.i_0{margin-left:0;}#img img{display:block;overflow:hidden;}#img a strong{display:block;overflow:hidden;cursor:pointer;font-weight:400;}#img a{display:block;width:100%;}#img a span{display:block;overflow:hidden;padding-top:5px;cursor:pointer;}#txt{overflow:hidden;*zoom:1;}#txt li{display:inline;float:left;overflow:hidden;padding:0 10px;}.mt{margin-top:10px;}#hot{overflow:hidden;margin-left:10px;margin-right:10px;}#hot ul{overflow:hidden;*zoom:1;}#hot li{float:left;word-wrap:normal;word-break:keep-all;padding-left:10px;}#foot{padding:5px 0;height:18px;line-height:18px;text-align:right;padding-right:10px;font-size:12px;}#foot a{color:#969696;}#r,#l{float:left;overflow:hidden;display:none;}#r b,#l b{display:block;overflow:hidden;cursor:pointer;background-image:url('+this.imgDir+'float/icon_24.png);background-repeat:no-repeat;_background-image:url('+this.imgDir+'float/icon.png);}#l b.hide_0{width:24px;height:104px;overflow:hidden;background-position:0 -380px;}#l b.show_0{width:24px;height:104px;overflow:hidden;background-position:0 -270px;}#l b.hide_1{width:40px;height:30px;overflow:hidden;background-position:0 -40px;}#l b.show_1{width:28px;height:81px;overflow:hidden;background-position:0 -80px;}#l b.hide_2{width:24px;height:104px;overflow:hidden;background-position:-50px -380px;}#l b.show_2{width:24px;height:104px;overflow:hidden;background-position:-50px -270px;}#l b.hide_3{width:40px;height:30px;overflow:hidden;background-position:-50px -40px;}#l b.show_3{width:28px;height:81px;overflow:hidden;background-position:-50px -80px;}#l b.hide_4{width:24px;height:104px;overflow:hidden;background-position:-100px -380px;}#l b.show_4{width:24px;height:104px;overflow:hidden;background-position:-100px -270px;}#l b.hide_5{width:40px;height:30px;overflow:hidden;background-position:-100px -40px;}#l b.show_5{width:28px;height:81px;overflow:hidden;background-position:-100px -80px;}#l b.hide_6{width:24px;height:104px;overflow:hidden;background-position:-150px -380px;}#l b.show_6{width:24px;height:104px;overflow:hidden;background-position:-150px -270px;}#l b.hide_7{width:40px;height:30px;overflow:hidden;background-position:-150px -40px;}#l b.show_7{width:28px;height:81px;overflow:hidden;background-position:-150px -80px;}#l b.hide_8{width:24px;height:104px;overflow:hidden;background-position:-200px -380px;}#l b.show_8{width:24px;height:104px;overflow:hidden;background-position:-200px -270px;}#l b.hide_9{width:40px;height:30px;overflow:hidden;background-position:-200px -40px;}#l b.show_9{width:28px;height:81px;overflow:hidden;background-position:-200px -80px;}#r b.hide_0{width:24px;height:104px;overflow:hidden;background-position:0 -270px;}#r b.show_0{width:24px;height:104px;overflow:hidden;background-position:0 -380px;}#r b.hide_1{width:40px;height:30px;overflow:hidden;background-position:0 -530px;}#r b.show_1{width:28px;height:81px;overflow:hidden;background-position:0 -180px;}#r b.hide_2{width:24px;height:104px;overflow:hidden;background-position:-50px -270px;}#r b.show_2{width:24px;height:104px;overflow:hidden;background-position:-50px -380px;}#r b.hide_3{width:40px;height:30px;overflow:hidden;background-position:-50px -530px;}#r b.show_3{width:28px;height:81px;overflow:hidden;background-position:-50px -180px;}#r b.hide_4{width:24px;height:104px;overflow:hidden;background-position:-100px -270px;}#r b.show_4{width:24px;height:104px;overflow:hidden;background-position:-100px -380px;}#r b.hide_5{width:40px;height:30px;overflow:hidden;background-position:-100px -530px;}#r b.show_5{width:28px;height:81px;overflow:hidden;background-position:-100px -180px;}#r b.hide_6{width:24px;height:104px;overflow:hidden;background-position:-150px -270px;}#r b.show_6{width:24px;height:104px;overflow:hidden;background-position:-150px -380px;}#r b.hide_7{width:40px;height:30px;overflow:hidden;background-position:-150px -530px;}#r b.show_7{width:28px;height:81px;overflow:hidden;background-position:-150px -180px;}#r b.hide_8{width:24px;height:104px;overflow:hidden;background-position:-200px -270px;}#r b.show_8{width:24px;height:104px;overflow:hidden;background-position:-200px -380px;}#r b.hide_9{width:40px;height:30px;overflow:hidden;background-position:-200px -530px;}#r b.show_9{width:28px;height:81px;overflow:hidden;background-position:-200px -180px;}#l p,#r p{cursor:pointer;width:22px;padding:3px 1px;overflow:hidden;font-size:12px;line-height:16px;}#l p s,#r p s{display:block;text-indent:-999em;width:22px;height:35px;overflow:hidden;}#l p.show_0 s,#r p.hide_0 s{background:url('+this.imgDir+'float/10_0_0.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src="'+this.imgDir+'float/10_0_0.png");_background:none;}#l p.hide_0 s,#r p.show_0 s{background:url('+this.imgDir+'float/10_0_1.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src="'+this.imgDir+'float/10_0_1.png");_background:none;}#l p.show_1 s,#r p.hide_1 s{background:url('+this.imgDir+'float/10_1_0.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src="'+this.imgDir+'float/10_1_0.png");_background:none;}#l p.hide_1 s,#r p.show_1 s{background:url('+this.imgDir+'float/10_1_1.png) 0 0 no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=noscale,src="'+this.imgDir+'float/10_1_1.png");_background:none;}#l p span,#r p span{text-align:center;display:block;width:22px;margin-top:3px;}</style></head><body><div id="r"><b></b></div><div id="tui"><div id="img"></div><div id="txt" class="mt"></div><div id="hot" class="mt"></div><div id="foot"><a href="'+this.tuiUrl+'?pd=PowerBy" target="_blank" title="云推荐">云推荐</a></div></div><div id="l"><b></b></div>'+this.funcStyle()+'</body></html>');
			this.oDoc.close();
			//定义容器
			this.oTui	=	this.oDoc.getElementById("tui");
			this.oImg	=	this.oDoc.getElementById("img");
			this.oTxt	=	this.oDoc.getElementById("txt");
			this.oHot	=	this.oDoc.getElementById("hot");
			this.oFoot	=	this.oDoc.getElementById("foot");
            
			var target = "_blank";
			if (this["set"]["txt"]["txt_link_target"] == 1 && !this.demo) {
				target = "_parent";
			};
			
			var trueimg = 0,defaultimg = 0,itelimg = 0,totalimg = 0;
			
			//图片
			//显示图片数量
			var imgLength=Math.min(this["set"]["style"]["style_pic_col"]*this["set"]["style"]["style_pic_row"],this["data"].length);
			//图片容器内容
			if (this["set"]["base"]["data_type"] != 0) {
				var ihtml = "<ul>";
				for (var i = 0; i < imgLength; i++) {
					if(!this["data"][i]["title"]){continue;}
					if (i % this["set"]["style"]["style_pic_col"] != 0) {
						ihtml += "<li>";
					} else {
						ihtml += '<li class="i_0">';
					};
					var has_thumb = this["data"][i]["has_thumb"] || "false";
					var is_smart_thumb =  this["data"][i]["is_smart_thumb"] || "false";
					var title = this["data"][i]["title"].replace(/<em>/ig,"").replace(/<\/em>/ig,"");
					ihtml += '<a href="' + this["data"][i]["url"] + '" target="' + target + '" title="' + title + '"><strong><img src="' + this["imgLoad"] + '" alt="' + this["data"][i]["thumbnail"] + '" title="' + title + '" hidefocus="true" jsdata="' + has_thumb + '" userimg="'+ this["data"][i]["algId"] +'" data-img="' + is_smart_thumb + '"></strong>';
					if (this["set"]["pic"]["pic_summary"] == "1") {
						if (this["data"][i]["title"]) {
							ihtml += '<span>' + this["data"][i]["title"] + '</span>';
						} else {
							ihtml += '<span></span>';
						};
					};
					ihtml += '</a></li>';
				};
				ihtml += "</ul>";
				this.oImg.innerHTML = ihtml;
				
				
				//load图片
				var Img = this.oImg.getElementsByTagName("img");
				
				//yahoo
				if (window.location.href.indexOf("yahoo.com") != -1) {
					this["set"]["pic"]["pic_scale"] = 2;
				};
				function loadImg(oBj) {
					function Sys(){
						var Sys={};
						var ua = navigator.userAgent.toLowerCase();
						var s;
						(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
						(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
						(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
						(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
						(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
						return Sys;
					};
					if (Sys().ie == "6.0" || Sys().ie == "7.0") {
						var a = oBj.parentNode.parentNode;
						a.onclick = function(){
							if (that["set"]["txt"]["txt_link_target"] == 1 && !that.demo) {
								window.location.href = a.href;
							}else {
								window.open (a.href);
							};
							return false;
						};
					};
					tryImg(oBj,0)
				};
				function tryImg(oBj,index) {
					var src = oBj.getAttribute("alt");
					var jsdata = oBj.getAttribute("jsdata");
					var userimg = oBj.getAttribute("userimg"); //stick
					var is_smart_thumb = oBj.getAttribute("data-img");
					var size = Math.max(Number(that["set"]["pic"]["pic_width"]),Number(that["set"]["pic"]["pic_length"]));
					var img = new Image();
					var ErrorNum = that.errorNum || 7;
					
					if (jsdata == 'false') {
						userimg = 'false';
					};
					
					if (userimg == "stick") {
						if (index == 1) {
							index = 2;
							src = that.errorDir + Math.ceil(Math.random() * ErrorNum) + ".jpg";
						};
					}else {
						if ((jsdata == "false" || index >= 2) && !that.demo) {
							src = that.errorDir + Math.ceil(Math.random() * ErrorNum) + ".jpg";
						}else if (index == 0) {
							 if (size > 96) {
								src = src + "_b";
							 };
						}else if (index == 1) {
							if (size <= 96) {
								src = src + "_b";
							};
						};
					};
					
					img.onload = function () {
						totalimg ++
						if (jsdata == "false" || index >= 2) {
							defaultimg ++;
						}else if (is_smart_thumb != "false") {
							itelimg ++;
						}else {
							trueimg ++;
						};
						imgStatus();
						loadFunc(this,oBj,that["set"]["pic"]["pic_scale"],src);
					};
					img.onerror = img.onabort = function () {
						if (index < 2) {
							index ++
							tryImg(oBj,index)
						};
					};
					img.src = src;
				};
				function imgStatus(){
					if (totalimg == Img.length && !that.demo) {
						var url = "&" + encodeURIComponent(String.fromCharCode(1)) + "&ch=wpr_pop&l=img&hid=" + that["request"]["hid"] + "&trueimg=" + trueimg + "&defaultimg=" + defaultimg + "&itelimg=" + itelimg;
						questImg(url);
					};
				};
				for (var i = 0; i < Img.length; i++) {
					loadImg(Img[i]);
				};
				function loadFunc(img,oBj,type,src){
					var w = img.width;
					var h = img.height;
					var w0 = Number(that["set"]["pic"]["pic_width"]);
					var h0 = Number(that["set"]["pic"]["pic_length"]);
					if (!type || type == 0) {
						if (oBj) {
							oBj.style.height = h0 +"px";
							oBj.style.width = w0 + "px";
						};
					}else if (type == 1) {
						if (w * h0 >= w0 * h) {
							var h1 = Math.ceil(w0 * h / w);
							if (oBj) {
								oBj.style.width = w0 + "px";
								oBj.style.height = h1 + "px";
								oBj.style.marginTop = (h0-h1)/2 + "px";
							};
						}else {
							var w1 = Math.ceil(w * h0 / h);
							if (oBj) {
								oBj.style.width = w1 + "px";
								oBj.style.height = h0 + "px";
								oBj.style.marginLeft = (w0-w1)/2 + "px";
							};
						};
					}else if (type == 2) {
						if (w * h0 >= w0 * h) {
							var w1 = Math.ceil(w * h0 / h);
							if (oBj) {
								oBj.style.height = h0 +"px";
								oBj.style.width = w1 + "px";
							};
						}else {
							var h1 = Math.ceil(w0 * h / w);
							if (oBj) {
								oBj.style.width = w0 + "px";
								oBj.style.height = h1 + "px";
							};
						};
					};
					if (oBj) oBj.setAttribute("src", src);
				};
			} else {
				imgLength = 0;
				this.oImg.style.display = "none";
			};
			//文字
				//剩余数据量
				var dataLeft=(this["data"].length-imgLength) || 0;
				//文字显示数量
				var txtLength=Math.min(this["set"]["style"]["style_txt_col"]*this["set"]["style"]["style_txt_row"],dataLeft);
				//文字容器内容
				if (this["set"]["base"]["data_type"]!="2" && dataLeft >= 1) {
					var thtml="<ul>";
					for (var i=imgLength;i<imgLength+txtLength;i++) {
						if (this["data"][i]["title"]) {
							if (this["set"]["txt"]["txt_focus"] == 1) {
								thtml += '<li>&bull;&nbsp;';
							} else if (this["set"]["txt"]["txt_focus"] == 2) {
								thtml += '<li>▪&nbsp;';
							}else {
								thtml+='<li>';
							};
							var title = this["data"][i]["title"].replace(/<em>/ig,"").replace(/<\/em>/ig,"");
							thtml+='<a href="'+this["data"][i]["url"]+'" target="' + target + '" title="'+ title +'" hidefocus="true">'+this["data"][i]["title"]+'</a></li>';
						};
					};
					thtml+="</ul>";
					this.oTxt.innerHTML=thtml;
				}else {
					this.oTxt.style.display="none";
				};
			if (this['set']['hot']['data_hot'] != 0 && this['set']['hot']['data_hot_txt'] != '') {
				var hhtml = '<ul>';
				var hotLength = this['set']['hot']['data_hot_num'];
				var hotList = this['set']['hot']['data_hot_txt'].split(',');
				
				if (hotLength == 0) {
					hotLength = Math.max(5, hotList.length)
				};
				
				//标签热词
				var hotReco = [];
				if (typeof(aliyun_recommend_opts) == 'object' && aliyun_recommend_opts['tags']) {
					var hotRecoTmp = aliyun_recommend_opts['tags'].split(',');
					for (var i=0;i<hotRecoTmp.length;i++) {
						if (!hotRecoTmp[i]) {
							continue;
						};
						hotReco.push(hotRecoTmp[i]);
					};
				};
				//用户热词
				var hotUserNum = this['set']['hot']['data_hot_txt_user'] || 0;
				if (hotUserNum == 0) {
					hotLength = Math.min(hotLength, hotList.length + hotReco.length);
					if (hotReco[0]) {
						for (var i = 0; i < Math.min(hotReco.length,hotLength); i++) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotReco[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotReco[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotReco[i] + "' hidefocus='true'>" + hotReco[i] + "</a></li>";
						};
					};
					hotList.sort(function () {
						return 0.5 > Math.random();
					});
					for (var i = 0; i < hotLength - Math.min(hotReco.length, hotLength); i++) {
						if (hotList[i]) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotList[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotList[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotList[i] + "' hidefocus='true'>" + hotList[i] + "</a></li>";
						};
					};
				} else {
					var hotUser = [];
					var hotAgg = [];
					for (var i = 0; i < hotLength; i++) {
						if (i < hotUserNum) {
							hotUser.push(hotList[i]);
						} else {
							hotAgg.push(hotList[i])
						};
					};
					hotList = hotReco.concat(hotAgg);
					if (hotUser[0]) {
						for (var i = 0; i < Math.min(hotUser.length,hotLength); i++) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotUser[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotUser[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotUser[i] + "' hidefocus='true'>" + hotUser[i] + "</a></li>";
						};
					};
					hotList.sort(function () {
						return 0.5 > Math.random();
					});
					for (var i = 0; i < (hotLength - Math.min(hotUser.length, hotLength)); i++) {
						if (hotList[i]) {
							hhtml += "<li><a href='" + this.searchUrl + "?kw=" + encodeURIComponent(hotList[i]) + "&site=" + (this.request.sid || '') + "&ip=" + (this.ip || '') + "&pui=czb&cok=" + (this.Rcookie || '') + "&vr=1&hid=" + (this.request.hid || '') + "&bkt=" + (this.request.bkt || '') + "&ch=kwrdc&l=click&ft=" + this['ft'] + "&ps=" + i + "&wd=" + encodeURIComponent(hotList[i]) + "&aid=" + this['request']['aid'] + "&sid=" + this['request']['aid'] + "' target='_blank' title='" + hotList[i] + "' hidefocus='true'>" + hotList[i] + "</a></li>";
						};
					};
				};
				
				hhtml += '</ul>';
				this.oHot.innerHTML = hhtml;
			} else {
				this.oHot.style.display = 'none';
			};
			//左右标识
				var btn;
				if (this["set"]["locat"]["locat_left_right"]%2!=0) {
					btn=this.oDoc.getElementById("r");
				}else {
					btn=this.oDoc.getElementById("l");
				};
				btn.style.display="block";
				if (this["set"]["locat"]["locat_mark"]==10) {
					var tmp=this["set"]["locat"]["locat_txt"].split("");
					var txt="";
					for (var i=0;i<tmp.length;i++) {
						txt+=tmp[i]+"<br>";	
					};
					btn.innerHTML="<p><s></s><span>"+txt+"</span></p>";
					this.oBtn=btn.getElementsByTagName("p")[0];
					this.oBtn.style.height=(tmp.length*16+35+3)+"px";
				}else {
					this.oBtn=btn.getElementsByTagName("b")[0];
				};
			//点击事件
				var that=this;
				//关闭
				this.oBtn.onclick=function(){
					that.userClose=true;
					that.funcHide();
				};
				//展开
				this.oBtn.onmouseover=function(){
					if (that.oTui.style.display=="none") {
						that.userOpen=true;
						that.funcShow();
					};
				};
				if (this["set"]["locat"]["locat_float_hide"] == 1) {
					this.o.onmouseout = function (){
						//console.log (that.userScroll,that["set"]["locat"]["locat_float"])
						if (!that.userScroll || that.userClose || that["set"]["locat"]["locat_float"] == 3) {
							that.funcHide();
						};
					};
				};
			//计算尺寸;
			this.funcSize();
			//显示模式
			if (this["set"]["locat"]["locat_float"]!=1) {
				this.funcHide();
			}else {
				this.funcShow();
			};
			//不支持fixed情况下绑定
			if (!this.fix) {
				window.attachEvent("onscroll",function(){
					that.funcPos();
				});
			};
			//滚动
			if ((this["set"]["locat"]["locat_float"] ==0 || this["set"]["locat"]["locat_float"] == 2) && !this.demo) {
				this.funcScroll();
			};
			//显示主容器
			this.o.style.display="block";
			
			//请求
			if (!this.demo) {
				this.funcQuery();
			};
			this.showOnce=true;
			if (this["set"]["txt"]["txt_border"] == 1) {
				var bor = this.oDoc.createElement("div");
				bor.style.cssText = "margin:4px 10px 0;height:0px;overflow:hidden;border-top:1px dashed #000;";
				this.oTxt.style.marginTop = "5px";
				this.oTui.insertBefore(bor,this.oTxt);
			};
		},
		funcSize:function(){
			if (this["set"]["locat"]["locat_mark"]==10) {
				this["show_width"]=Number(this["set"]["style"]["style_width"])+24;
				this["hide_width"]=24;
				var h=parseInt(this.oBtn.style.height) + 6;
				this["show_height"]=Math.max(h,this["set"]["style"]["style_length"]);
				this["hide_height"]=h;
			}else if (this["set"]["locat"]["locat_mark"]%2!=0) {
				this["show_width"]=Number(this["set"]["style"]["style_width"])+28;
				this["hide_width"]=40;
				this["show_height"]=Math.max(81,this["set"]["style"]["style_length"]);
				this["hide_height"]=30;
			}else {
				this["show_width"]=Number(this["set"]["style"]["style_width"])+24;
				this["hide_width"]=24;
				this["show_height"]=Math.max(104,this["set"]["style"]["style_length"]);
				this["hide_height"]=104;
			};
		},
		funcShow:function(){
			this.o.style.width=this["show_width"]+"px";
			this.o.style.height=this["show_height"]+"px";
			this.oTui.style.display="block";
			if (this["set"]["locat"]["locat_mark"]==10){
				this.oBtn.className="show_"+this["set"]["locat"]["locat_color"];
			}else {
				this.oBtn.className="show_"+this["set"]["locat"]["locat_mark"];
			};
			//第一次展现
			if (this["set"]["locat"]["locat_float"]!=1 && this.showOnce && !this.demo) {
				var hid		= this["request"]["hid"];
				var bkt		= this["request"]["bkt"];
				var la		= encodeURIComponent(String.fromCharCode(1));
				var lb		= encodeURIComponent(String.fromCharCode(2));
				var dspsize = 0;
				if (this["set"]["base"]["data_type"] == 0) {
					dspsize = this["set"]["style"]["style_txt_col"] * this["set"]["style"]["style_txt_row"];
				} else if (this["set"]["base"]["data_type"] == 2) {
					dspsize = this["set"]["style"]["style_pic_col"] * this["set"]["style"]["style_pic_row"];
				} else {
					dspsize = this["set"]["style"]["style_pic_col"] * this["set"]["style"]["style_pic_row"] + this["set"]["style"]["style_txt_col"] * this["set"]["style"]["style_txt_row"];
				};
				dspsize = Math.min(dspsize,this.data.length);
				url="&"+la+"&ch=wpr_pop&l=view&hid="+hid+"&bkt="+bkt + "&dspsize=" + dspsize;
				//热词
				if (this["set"]["hot"]["data_hot"]!=0 && this["set"]["hot"]["data_hot_txt"]!="") {
					url+="&"+lb+"&has=true&ch=hkwrdsp&l=view&hid="+hid+"&bkt="+bkt
				}else {
					url+="&"+lb+"&has=false&ch=hkwrdsp&l=view&hid="+hid+"&bkt="+bkt	
				};
				questImg(url);
				this.showOnce=false;
			};
			//计算位置
			this.funcPos();
		},
		funcHide:function(){
			this.o.style.width=this["hide_width"]+"px";
			this.o.style.height=this["hide_height"]+"px";
			if (this["set"]["locat"]["locat_mark"]==10){
				this.oBtn.className="hide_"+this["set"]["locat"]["locat_color"];
			}else {
				this.oBtn.className="hide_"+this["set"]["locat"]["locat_mark"];
			};
			this.oTui.style.display="none";
			//计算位置
			this.funcPos();
		},
		funcPos:function(){
				var that=this;
				//左 右
				if (this["set"]["locat"]["locat_left_right"]%2!=0) {
					this.o.style.right=0;
				}else {
					this.o.style.left=0;
				};
			if (!this.demo) {
				var h1=parseInt(this.o.style.height);
				var h2;
				if (this.mode=="BackCompat") {
					h2=document.body.clientHeight;
				}else {
					h2=document.documentElement.clientHeight;
				};
				var t1=(h2-h1)/2;
				t1=Math.max(t1,0);
				//位置形式
				//不支持fixed
				if (!this.fix) {
					this.o.style.position="absolute";
					var t2=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
					if (this["set"]["locat"]["locat_left_right"]>1) {
						this.o.style.top=(t2+h2-h1)+"px";
					}else {
						this.o.style.top=(t2+t1)+"px";
					};
				//支持fixed
				}else {
					this.o.style.position="fixed";
					if (this["set"]["locat"]["locat_left_right"]>1) {
						this.o.style.bottom=0;
					}else {
						this.o.style.top=t1+"px";
					};
				};
			};
		},
		funcScroll:function(){
			var h3=Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);
			var that=this;
			addEvent(window,"scroll",function(){
				clearTimeout(that.timer);
				that.timer=setTimeout(function(){
						var h1=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
						var h2;
						if (that.mode=="BackCompat") {
							h2=document.body.clientHeight;
						}else {
							h2=document.documentElement.clientHeight;
						};
						var h3=Math.max(document.body.offsetHeight,document.documentElement.offsetHeight,document.body.scrollHeight);
						var h4;
						if (that["set"]["locat"]["locat_float"]==0) {
							h4=(h3-h2)*2/3
						}else {
							h4=h3-h2-10
						};
						if (h1>=h4) {
							if (!that.userClose) {
								that.userScroll = 1;
								that.funcShow();
							};
						}else {
							if (!that.userOpen) {
								that.userScroll = 0;
								that.funcHide();
							};
						};
					},10					
				);
			});
		},
		funcStyle:function(){
			//计算图片间距 MM=( W - (MW+4)*COL - 22) / (COL-1)
				var W		= Number(this["width"]);
				var MW		= Number(this["set"]["pic"]["pic_width"]);
				var MH		= Number(this["set"]["pic"]["pic_length"]);
				var MCOL	= Number(this["set"]["style"]["style_pic_col"]);
				var MROW	= Number(this["set"]["style"]["style_pic_row"]);
				var MM 		= Math.floor(( W - MW*MCOL - 4*MCOL - 22) / (MCOL-1));
			//文字宽度 TW=(W - COL*20 +18 )/COL
				var TCOL	= Number(this["set"]["style"]["style_txt_col"]);
				var TW		= Math.floor((W-TCOL*20-2)/TCOL);
			//热词行高
				var HLH		= Number(this["set"]["hot"]["hot_body_margin"]);
			//文字行高
				var BLH		= Number(this["set"]["txt"]["txt_body_margin"])
			//各种配置
			var style='<style type="text/css">';
				//计算的数据
			if (MCOL!=1) {
				style 	+= "#img li {margin-left:" + MM + "px;}";
			}else {
				style 	+= "#img li.i_0 {margin-right:" + (W - MW * MCOL - 4 * MCOL - 22) + "px;}";
			};
				style	+=	"#txt li {width:"+TW+"px;}";
				//style
			if (this["set"]["base"]["r_radius"]==1) {
				style	+=	"#tui {border-radius:5px;}";	//是否圆角
			};
				style	+=	"#tui {height:"+(this["height"]-2)+"px}";
				style	+=	"#tui {width:"+(this["width"]-2)+"px;}";
				style	+=	"#tui {background-color:#"+this["set"]["style"]["style_background_color"]+";}";
				style	+=	"#img a:hover {background-color:#"+this["set"]["style"]["style_hover_color"]+";}";
				style	+=	"#tui {border-color:#"+this["set"]["style"]["style_border_color"]+";}";
				//pic
				style	+=	"#img li {width:"+(MW+4)+"px;}";
				style	+=	"#img a strong {height:"+MH+"px;}";
				style	+=	"#img a strong {width:"+MW+"px;}";
				//hot
				style	+=	"#hot {background-color:#"+this["set"]["hot"]["hot_body_background"]+";}";
				style	+=	"#hot {font-size:"+this["set"]["hot"]["hot_body_size"]+"px;}";
			if (this["set"]["hot"]["hot_body_bold"]==1) {
				style	+=	"#hot {font-weight:700;}";	
			}else {
				style	+=	"#hot {font-weight:400;}";	
			};
				style	+=	"#hot {height:"+HLH+"px;line-height:"+HLH+"px;}";
				style 	+=	"#hot li a:link {color:#"+this["set"]["hot"]["hot_default_color"]+";}"
			if (this["set"]["hot"]["hot_default_underline"]==1) {
				style 	+=	"#hot li a:link {text-decoration:underline;}";
			}else {
				style 	+=	"#hot li a:link {text-decoration:none;}";
			};
				style 	+=	"#hot li a:visited {color:#"+this["set"]["hot"]["hot_clicked_color"]+";}"
			if (this["set"]["hot"]["hot_clicked_underline"]==1) {
				style 	+=	"#hot li a:visited {text-decoration:underline;}";
			}else {
				style 	+=	"#hot li a:visited {text-decoration:none;}";
			};
				style 	+=	"#hot li a:hover {color:#"+this["set"]["hot"]["hot_hover_color"]+";}"
			if (this["set"]["hot"]["hot_hover_underline"]==1) {
				style 	+=	"#hot li a:hover {text-decoration:underline;}";
			}else {
				style 	+=	"#hot li a:hover {text-decoration:none;}";
			};
				style 	+=	"#hot li a:active {color:#"+this["set"]["hot"]["hot_click_color"]+";}"
			if (this["set"]["hot"]["hot_click_underline"]==1) {
				style 	+=	"#hot li a:active {text-decoration:underline;}";
			}else {
				style 	+=	"#hot li a:active {text-decoration:none;}";
			};
				//txt
				style	+=	"body {font-size:"+this["set"]["txt"]["txt_body_size"]+"px;}";
			if (this["set"]["txt"]["txt_body_bold"]==1) {
				style	+=	"body {font-weight:700;}";	
			}else {
				style	+=	"body {font-weight:400;}";	
			};
				style	+=	"#txt li {height:"+BLH+"px;line-height:"+BLH+"px;}";
				style	+=	"#img a span {height:"+BLH*2+"px;line-height:"+BLH+"px;}";
				if (this["set"]["pic"]["pic_summary_row"] == 1) {
					style += "#img a span {height:" + BLH + "px;line-height:" + BLH + "px;text-align:center;}";
				}else {
					style += "#img a span {height:" + BLH * 2 + "px;line-height:" + BLH + "px;}";
				};
				style 	+=	"a:link,#txt li {color:#"+this["set"]["txt"]["txt_default_color"]+";}"
			if (this["set"]["txt"]["txt_default_underline"]==1) {
				style 	+=	"a:link {text-decoration:underline;}";
			}else {
				style 	+=	"a:link {text-decoration:none;}";
			};
				style 	+=	"a:visited {color:#"+this["set"]["txt"]["txt_clicked_color"]+";}"
			if (this["set"]["txt"]["txt_clicked_underline"]==1) {
				style 	+=	"a:visited {text-decoration:underline;}";
			}else {
				style 	+=	"a:visited {text-decoration:none;}";
			};
				style 	+=	"a:hover {color:#"+this["set"]["txt"]["txt_hover_color"]+";}"
			if (this["set"]["txt"]["txt_hover_underline"]==1) {
				style 	+=	"a:hover {text-decoration:underline;}";
			}else {
				style 	+=	"a:hover {text-decoration:none;}";
			};
				style 	+=	"a:active {color:#"+this["set"]["txt"]["txt_click_color"]+";}"
			if (this["set"]["txt"]["txt_click_underline"]==1) {
				style 	+=	"a:active {text-decoration:underline;}";
			}else {
				style 	+=	"a:active {text-decoration:none;}";
			};
			if (this["set"]["locat"]["locat_mark"]==10) {
				var c1 = this["set"]["locat"]["locat_background"] || "81bcff";
				var c2 = this["set"]["locat"]["locat_txt_color"] || "ffffff";
				style 	+=	"#l p,#r p {background-color:#"+c1+";color:#"+c2+";}";
			};
			
			var font_family = ["arial","tahoma","sans-serif","SimSun","SimHei","Microsoft YaHei"];
			style += "#title {font-family:" + font_family[this["set"]["txt"]["txt_title_family"]] + "}";
			style += "#img,#txt {font-family:" + font_family[this["set"]["txt"]["txt_body_family"]] + "}";
			style += "#hot {font-family:" + font_family[this["set"]["hot"]["hot_body_family"]] + "}";
			if (this["set"]["search"] && this["set"]["search"]["search_high"] == 1) {
				style += "#img em,#txt em {color:#"+ this["set"]["search"]["search_high_color"] +";}"
			};
			if (this["set"]["pic"]["pic_border"] == 1) {
				style += "#img a strong {border:1px solid #ddd;}";
			} else {
				style += "#img a strong {padding:1px;}";
			};
				style	+=	"</style>";
			return (style);
		},
		funcQuery:function(){
			var that	= this;
			var hid		= this["request"]["hid"];
			var bkt		= this["request"]["bkt"];
			var la		= encodeURIComponent(String.fromCharCode(1));
			var lb		= encodeURIComponent(String.fromCharCode(2));
			var l;
			this["set"]["locat"]["locat_float"]==1 ? l="view" : l="hide";
			//打开页面
			var url="";
			if (this["set"]["locat"]["locat_float"]==1) {
				url="&"+la+"&ch=wpr_pop&l=view&hid="+hid+"&bkt="+bkt;
			}else {
				url="&"+la+"&ch=wpr_pop&l="+l+"&hid="+hid+"&bkt="+bkt;	
			};
			if (this["set"]["hot"]["data_hot"]!=0) {
				if (this["set"]["hot"]["data_hot_txt"]!=""){
					url+="&"+lb+"&has=true&ch=hkwrdsp&l="+l+"&hid="+hid+"&bkt="+bkt
				}else {
					url+="&"+lb+"&has=false&ch=hkwrdsp&l="+l+"&hid="+hid+"&bkt="+bkt	
				};
			};
			questImg(url);
			
			// 点击热词
			var a=this.oHot.getElementsByTagName("a");
			for (var i=0;i<a.length;i++) {
				a[i].index=i;
				a[i].onclick=function(){
					var url="";
					url="&"+la+"&ch=kwrdc&l=click&ps="+this.index+"&wd="+encodeURIComponent(this.innerHTML)+"&hid="+hid+"&bkt="+bkt;
					questImg(url);
				};
			};
			var jumpUrl = this.jumpUrl;
			var jumpAid = this.request.aid;
			var jumpFt = 0;
			var jumpRef = window.location.href || parent.location.href;
			//链接
			var a = this.oImg.getElementsByTagName("a");
			for (var i = 0; i < a.length; i++) {
				a[i].index = i;
				a[i].onclick = function () {
					var urltemp = "&"+ la +"&ch=wpr_pop&l=click&ps="+ this.index +"&hid="+ hid +"&bkt="+ bkt +"&isimg=1&curl="+ encodeURIComponent(this.href);
					questImg(urltemp);
					if (jumpUrl) {
						if (that["set"]["txt"]["txt_link_target"] == 1) {
							window.location.href = jumpUrl + "&url=" + encodeURIComponent(this.href) + "&ref=" + encodeURIComponent(jumpRef) + "&aid=" + jumpAid + "&ft=" + jumpFt;
						} else {
							window.open(jumpUrl + "&url=" + encodeURIComponent(this.href) + "&ref=" + encodeURIComponent(jumpRef) + "&aid=" + jumpAid + "&ft=" + jumpFt);
						};
						return false;
					};
				};
			};
			var a = this.oTxt.getElementsByTagName("a");
			for (var i = 0; i < a.length; i++) {
				a[i].index = i;
				a[i].onclick = function () {
					var urltemp = "&"+ la +"&ch=wpr_pop&l=click&ps="+ this.index +"&hid="+ hid +"&bkt="+ bkt +"&isimg=0&curl="+ encodeURIComponent(this.href);
					questImg(urltemp);
					if (jumpUrl) {
						if (that["set"]["txt"]["txt_link_target"] == 1) {
							window.location.href = jumpUrl + "&url=" + encodeURIComponent(this.href) + "&ref=" + encodeURIComponent(jumpRef) + "&aid=" + jumpAid + "&ft=" + jumpFt;
						} else {
							window.open(jumpUrl + "&url=" + encodeURIComponent(this.href) + "&ref=" + encodeURIComponent(jumpRef) + "&aid=" + jumpAid + "&ft=" + jumpFt);
						};
						return false;
					};
				};
			};
		}
	};
	//原型结束
		//*********配置参数***************************
	var tuiFloatRun = new tuiFloat();
	tuiFloatRun.demo = false;
	tuiFloatRun.set = {"logo":{"logo_background_user":"1","logo_background_img":"","logo_position":0},"style":{"style_length":"276","style_width":"260","style_pic_col":"5","style_pic_row":"1","style_txt_col":"1","style_txt_row":"10","style_background_color":"ffffff","style_hover_color":"ffffff","style_border_color":"81bcff"},"pic":{"pic_length":"96","pic_width":"96","pic_scale":null,"pic_summary":"1","pic_summary_row":null},"hot":{"data_hot":"1","data_hot_num":"0","data_hot_txt":"","hot_body_background":"f7f7f7","hot_body_size":"12","hot_body_bold":"0","hot_body_margin":"26","hot_body_family":"0","hot_default_color":"222222","hot_default_underline":"0","hot_hover_color":"ff6600","hot_hover_underline":"1","hot_click_color":"222222","hot_click_underline":"0","hot_clicked_color":"222222","hot_clicked_underline":"0"},"txt":{"txt_title_icon":"1","txt_title_txt":"\u731c\u4f60\u559c\u6b22","txt_title":"1","txt_title_size":"14","txt_title_bold":"0","txt_title_margin":"31","txt_title_background":"1","txt_title_bgcolor":"ffffff","txt_title_bgimage":"http:\/\/tui.cnzz.net\/templates\/images\/fix_txt_img\/1\/title.png","txt_title_color":"222222","txt_title_family":"undefined","txt_body_size":"12","txt_body_bold":"0","txt_body_margin":"20","txt_body_family":"0","txt_default_color":"222222","txt_hover_color":"ff6600","txt_click_color":"222222","txt_clicked_color":"222222","txt_default_underline":"0","txt_hover_underline":"1","txt_click_underline":"0","txt_clicked_underline":"0","txt_focus":"2","txt_border":null},"locat":{"locat_left_right":"3","locat_float":"1","locat_mark":"10","locat_color":0,"locat_txt_color":"ffffff","locat_txt":"\u731c\u4f60\u559c\u6b22","locat_background":"C9B69B"},"base":{"cloud_id":"10009967","r_name":"admin10000","r_type":"2","r_style_id":"6","r_style_name":"\u84dd\u8272\u7b80\u7ea6\u7ad6\u7248","r_status":"1","data_type":"0","nyn_host":"0","domain_source":null,"r_radius":"0","img_type":"1","cnzz_code_id":"0","sf_deploy":0,"yn_host":"0"}};
	tuiFloatRun.set.hot.data_hot_txt = "把jpg改成rar,android架构,css参考手册chm,jquery中文手册,dhtml中文手册";
	tuiFloatRun.set.hot.data_hot_txt_user = 0;
	//列表数据
	tuiFloatRun.data = [{"url":"http:\/\/www.admin10000.com\/document\/5229.html?from=androidqq&originuin=153113167&uin=565320222","title":"\u4e2d\u56fd\u6700\u5c0f\u9ed1\u5ba2\u73b0\u8eab: \u4ec512\u5c81","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/4921.html","title":"\u4e3a\u4ec0\u4e48\u7a0b\u5e8f\u5458\u603b\u662f\u88ab\u8f7b\u89c6\uff1f","algId":"3-cv","cluster_name":"cnzzfull"},{"url":"http:\/\/www.admin10000.com\/document\/4676.html","title":"\u76d6\u8328\u9c8d\u5c14\u9ed8\u66fe\u6f14\u9ed1\u5ba2\u5e1d\u56fd\u75af\u72c2\u5632\u8bbdLinux","algId":"1","cluster_name":"cnzzfull"},{"url":"http:\/\/www.admin10000.com\/document\/5324.html","title":"31\u90e8\u9ed1\u5ba2\u7535\u5f71 \u4f60\u770b\u8fc7\u54ea\u51e0\u90e8\uff1f","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/5369.html","title":"\u4f60\u4e5f\u53ef\u4ee5\u8fd9\u6837\u5c4c\u5230\u7206\u7684\u6572\u4ee3\u7801\u5f53\u9ed1\u5ba2","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/5387.html","title":"\u8ba9\u7f8e\u56fd\u4eba\u7761\u4e0d\u7740\u89c9\u7684\u4e09\u5927\u9ed1\u5ba2\u7ec4\u7ec7","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/5207.html","title":"\u9ed1\u5ba2\u653b\u51fb\u6211\u4eec\u768411\u6b65\u8be6\u89e3\u53ca\u9632\u5fa1\u5efa\u8bae","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/5331.html","title":"\u8fd9\u6837\u8bbe\u7f6e\u8def\u7531: 99.9%\u7684\u9ed1\u5ba2\u90fd\u653b\u4e0d\u7834","algId":"1","cluster_name":"cnzz_inc"},{"url":"http:\/\/www.admin10000.com\/document\/4410.html","title":"\u9ed1\u5ba2\u83b7\u53d6\u6570\u636e\u4fe1\u606f\u7684\u76ee\u7684\u548c\u8fdb\u653b\u624b\u6bb5","algId":"1","cluster_name":"cnzzfull"},{"url":"http:\/\/www.admin10000.com\/document\/4919.html","title":"\u4e0d\u52305\u5206\u949f\uff01\u4e16\u754c\u6700\u5b89\u5168 Android \u624b\u673a\u88ab\u9ed1\u5ba2\u653b\u7834","algId":"3-cv","cluster_name":"cnzzfull"}];
	//图片loading
	tuiFloatRun.imgLoad = "http://img.cnzz.net/adt/cnzz_tui/vip/loading.gif";
	//错误图片
	tuiFloatRun.errorDir = "http://img.cnzz.net/adt/cnzz_tui/vip/error/error_";
	tuiFloatRun.errorNum = 35;
	//logo 点击地址
	tuiFloatRun.tuiUrl = "http://tui.cnzz.com";
	//统计地址
	tuiFloatRun.tongjiUrl = "http://log.so.cnzz.net/stat.php?";
	//搜索地址
	tuiFloatRun.searchUrl = "http://s.cnzz.net/";
	//图片路径
	tuiFloatRun.imgDir = "http://img.cnzz.net/adt/cnzz_tui/vip/";
	//jumpUrl
	tuiFloatRun.jumpUrl = "http://tui.cnzz.net/redirect.php?pf=t";
	//公用方法
	function Sys(){
		var Sys={};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
		return Sys;
	};
	function addEvent(Elem, type, handle) {
		if (Elem.addEventListener) {
			Elem.addEventListener(type, handle, false);
		} else if (Elem.attachEvent) {
			Elem.attachEvent("on" + type, handle);
		};
	};
	function getElemPos(obj) {
		var pos = {
			"top" : 0,
			"left" : 0
		};
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				pos.top += obj.offsetTop;
				pos.left += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		} else if (obj.x) {
			pos.left += obj.x;
		} else if (obj.x) {
			pos.top += obj.y;
		}
		return {
			x : pos.left,
			y : pos.top
		};
	};
	
	if (tuiFloatRun["set"]["locat"]["locat_left_right"]==0 || tuiFloatRun["set"]["locat"]["locat_left_right"]==2) {
		tuiFloatRun.ft = "pop_l";
	} else {
		tuiFloatRun.ft = "pop_r";
	};
tuiFloatRun.request = {
		"common" : tuiFloatRun.tongjiUrl+"ip=222.44.84.1&pui=czb&cok=6df4dbf59423f6298ee2b0423a8fb37a&vr=1&aid=1000004008&sid=admin10000.com&img=" + tuiFloatRun["set"]["base"]["data_type"] + "&so=t&ft=" + tuiFloatRun.ft + "",
		"sid" : "admin10000.com",
		"aid" : "1000004008",
		"hid" : "7b6bc149d68ca8664c8c4dfb16b69de2",
		"bkt" : "0",
		"so" : "t"
	};
	
	function questImg(url) {
		var Img=new Image();
		var d=new Date();
		Img.onload = Img.onabort = Img.onerror= function(){
			Img=null;
		};
		Img.src = tuiFloatRun.request.common + url + "&"+ encodeURIComponent(String.fromCharCode(1)) + "&oref=" + encodeURIComponent(document.referrer) + "&purl=" + encodeURIComponent(window.location.href) +"&_rnd=" + (Date.parse(d) + "." + d.getMilliseconds());
	};
	function checkData() {
		return true;
		var t = 0;		//总数
		var dt = 0;		//总需
		var r = false;	//结果
		var n = 0.6;	//良品率
		var set = tuiFloatRun.set;
		if (set.base.data_type == 0) {
			dt = Number(set.style.style_txt_col) * Number(set.style.style_txt_row);
		}else if (set.base.data_type == 2) {
			dt = Number(set.style.style_pic_col) * Number(set.style.style_pic_row);
		}else {
			dt = Number(set.style.style_pic_col) * Number(set.style.style_pic_row) + Number(set.style.style_txt_col) * Number(set.style.style_txt_row);
		};
		//计算总需
		if (tuiFloatRun.data.length < dt * n){
			return false;
		}else {
			//计算良好数据
			for (var i=0;i<tuiFloatRun.data.length;i++) {
				if (tuiFloatRun.data[i].title) {
					t++;
				};
			};
			var l = t / dt;
			l < n ? r = false : r = true;
			return r;
		};
	};
	//*********************************
	if (!tuiFloatRun.demo) {
		//运行之
		if (tuiFloatRun.data && tuiFloatRun.data[0]) {
			if (checkData()) {
				tuiFloatRun.init();
			}else {
				var url =  "&" + encodeURIComponent(String.fromCharCode(1)) + "&has=false&ch=wprdsp&l=view&good=false";
				questImg(url)
			};
		} else {
			var url =  "&" + encodeURIComponent(String.fromCharCode(1)) + "&has=false&ch=wprdsp&l=view";
			questImg(url)
		};
	};
	//*********demo***************************
	
(function(){
	function setMyAcookie(){
		var taobaoImg = new Image(), id = "img" + +new Date;
		window.loog = window.loog || {};
		taobaoImg.id = id;
		window.loog[id] = taobaoImg;
		taobaoImg.onload = taobaoImg.onerror = taobaoImg.onabort = function () {
			window.loog[id] = undefined;
		}
		window.loog[id] = taobaoImg;
		taobaoImg.src = "http://cnzz.mmstat.com/9a.gif";
	}		
	window.setTimeout(setMyAcookie,0);	
})();
})();