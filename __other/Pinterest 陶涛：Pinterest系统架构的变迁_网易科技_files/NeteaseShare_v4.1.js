var _ntshare = window._ntshare || {};
(function () {
	var WIN = window,
	DOC = document,
	LOCATION = DOC.location;
	URL = LOCATION.protocol + '//' + LOCATION.host + LOCATION.pathname,
	SITES_URL = {
		// http://open.weibo.com/sharebutton
		SINA : 'http://service.weibo.com/share/share.php?',
		// http://dev.renren.com/website/?widget=rrshare&content=use
		RENREN : 'http://widget.renren.com/dialog/share?',
		// http://connect.qq.com/intro/share/
		QZONE : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
		YOUDAO : 'http://note.youdao.com/memory?'
	},
	SITES_PARAM = {
		SINA : {
			url : URL + '#sns_weibo',
			appkey : '',
			/**您申请的应用appkey,显示分享来源(可选)*/
			title : '',
			/**分享的文字内容(可选，默认为所在页面的title)*/
			language : 'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
			ralateUid : '', /**关联用户的UID，分享微博会@该用户(可选)*/
			searchPic : 'false', /**关闭自动抓取网页中图片功能*/
			pic : ''
			/**分享图片的路径(可选)*/
		},
		RENREN : {
			resourceUrl : URL + '?sns_renren', //分享的资源Url
			pic : '', //分享的主题图片Url
			title : '', //分享的标题
			description : '' //分享的详细描述
		},
		QZONE : {
			url : URL + '#sns_qzone',
			desc : '',
			/*默认分享理由(可选)*/
			summary : '',
			/*分享摘要(可选)*/
			title : '',
			/*分享标题(可选)*/
			site : '网易门户',
			/*分享来源 如：腾讯网(可选)*/
			pics : '' /*分享图片的路径(可选)*/
		},
		YOUDAO : {
			url : URL + '#sns_youdao',
			title : '',
			summary : '',
			product:'网易163门户'
		}
	};
	function serializeParam(paramObj) {
		var aParam = [];
		for (var item in paramObj) {
			if (paramObj.hasOwnProperty(item)) {
				aParam.push(item + '=' + encodeURIComponent(paramObj[item] || ''));
			}
		}
		return aParam.join('&');
	}
	function bindEvent(elm, evt, handle) {
		elm.addEventListener ? elm.addEventListener(evt, handle, false) : elm.attachEvent('on' + evt, handle);
	}
	function mix(source, target) {
		for (var item in source) {
			if (source.hasOwnProperty(item) && target[item] !== undefined) {
				target[item] = source[item];
			}
		}
	}
	function getElem(tag, className) {
		if (DOC.querySelectorAll) {
			return DOC.querySelectorAll(tag + '.' + className);
		} else {
			var tagElems = DOC.getElementsByTagName(tag),
			returnArray = [],
			classReg = new RegExp(className);
			
			for (var i = 0; i < tagElems.length; i++) {
				if (tagElems[i].className.search(classReg) != -1) {
					returnArray.push(tagElems[i]);
				}
			}
			return returnArray;
		}
	}
	function getPicFromSet(num) {
		var textareas = $("textarea[id^=photoList]"),
        	imgs = [];
    	for(var j = 0; j < textareas.length; j++) {
        	var tmp = document.createElement("div");
        	tmp.innerHTML = textareas[j].value;
        	var list = $(tmp).$('> li');
        	for(var i = 0; i < list.length && i < num; i++){
                imgs.push($(list[i]).$('> i[title=img]').attr("innerHTML"));
        	}
    	}
    	return imgs;
	}
	function getPics(num) {
		var container = DOC.getElementById('endText') || DOC.getElementById('photoView') || getElem('div', 'top-head')[0],
		imgNodes = container && container.getElementsByTagName('img'),
		picSrc = [];
		if (imgNodes && imgNodes.length && imgNodes[0].className != 'icon') {
			for(var i = 0; i < num && i < imgNodes.length; i++) {
				picSrc.push(imgNodes[i].src);
			}
		}
		if(picSrc.length < num) {
			picSrc = picSrc.concat(getPicFromSet(num - picSrc.length));
		}
		return picSrc;
	}
	function strlen(str) {
		return str.replace(/[^\x00-\xff]/g, 'aa').length;
	}
	function subSummary(summary, len) {
		return (summary.length > len ? summary.substring(0, len) + '...' : summary);
	}
	function filterHtml(str) {
		var container = DOC.createElement('div'),
		filteredStr;
		container.innerHTML = str;
		filteredStr = container.innerText || container.textContent;
		container = null;
		return filteredStr;
	}
	if (!_ntshare.fn) {
		_ntshare.fn = {};
		_ntshare.fn.isInit = false;
		_ntshare.fn.init = function (param) {
			var param = param || {},
			shareWraps = getElem('div', 'ntshare-wrap'),
			clickTarget,
			clickSymbol,
			firstPic,
			nurl,
			ntit,
			nxkey,
			tjurl,
			img,
			parent;
			for (var i = 0; i < shareWraps.length; i++) {
				bindEvent(shareWraps[i], 'click', function (e) {
					e = e || WIN.event;
					if ( e && e.preventDefault ){ 
						e.preventDefault();
					} else { 
						e.returnValue = false;
					} 
					clickTarget = e.target || e.srcElement;
					while(clickTarget.nodeName != 'A') {
						try { parent = clickTarget.parentNode; }
                    	catch(e) { parent = this; }
                    	clickTarget = parent;
					}
					if (clickTarget.nodeName == 'A' && clickTarget.className.indexOf('ntshare') >= 0) {
						clickSymbol = clickTarget.className.split('ntshare-')[1].split(' ')[0].toUpperCase();
						if (clickSymbol == 'SINA') {
							firstPic = getPics(30).join('||');
						} else {
							firstPic = getPics(1).join('');
						}
						if(clickSymbol == 'SINA'){
							nurl=escape(window.location.protocol + '//snstj.' + window.location.host + window.location.pathname+'?snstj_weibo');
						}
						else{
							nurl=escape(window.location.protocol + '//snstj.' + window.location.host + window.location.pathname+'?snstj_'+clickTarget.className.substring(8));
						}
						ntit=escape(DOC.title);
						nxkey=Math.random().toString().substr(2,6);
						tjurl='http://analytics.163.com/ntes?_nacc=snstj&_nvid=VISITOR_CLIENT_NO_COOKIE_SUPPORT&_nvtm=0&_nvsf=0&_nvfi=0&_nlag=&_nlmf=0&_nres=&_nscd=&_nstm=0&_nurl='+nurl+'&_ntit='+ntit+'&_nref=&_nfla=&_nssn=&_nxkey='+nxkey+'&_end1';
						img = new Image();
						img.src = tjurl;
						mix({
							pic : firstPic,
							pics : firstPic
						}, SITES_PARAM[clickSymbol]);
						mix(param, SITES_PARAM[clickSymbol]);
						if (clickSymbol == 'SINA' && param['summary']) {
							SITES_PARAM[clickSymbol]['title'] = '【' + SITES_PARAM[clickSymbol]['title'] + '】' + subSummary(param['summary'], 90);							
						}
						if (clickSymbol == 'SINA' && param['title_s']) {
							SITES_PARAM[clickSymbol]['title'] = param['title_s'];							
						}
						WIN.open(SITES_URL[clickSymbol] + serializeParam(SITES_PARAM[clickSymbol]), 'ntshare');
					}
				});
			}
			_ntshare.fn.isInit = true;
		}
	}
})();

