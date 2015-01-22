/**
* 通用的 JavaScript 函数
* @author zepeng 2012.03.21
*/
var urlset = 'com';
if(urlset == 'lc') {
	var HTTP_BLOG_ROOT = "http://blog-lc.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-lc.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-lc.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile-lc.ifeng.com/';
}
if(urlset == 'de') {
	var HTTP_BLOG_ROOT = "http://blog-de.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-de.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-de.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile-de.ifeng.com/';
}
if(urlset == 'com') {
	var HTTP_BLOG_ROOT = "http://blog.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile.ifeng.com/uploadfiles/';
}
function gEBId(id) {
	return document.getElementById(id);
}
function exist(s){	// 区域存在性检查
	return gEBId(s)!=null;
}
function isset(variable) {	// 变量检查存在性
	return (typeof variable != 'undefined');
}
function empty(variable) {	//去除两端空格
	if (!variable || variable == '') {return true;} else {return false;}
}
function trim(str){
	var localstr=new String(str);
	var pattern=/^\s+|\s+$/g;
	localstr=localstr.replace(pattern,"");
	return(localstr);
}
//计算字符串长度,双字节字符长度计2，ASCII字符计1
function len(str){
	return str.replace(/[^\x00-\xff]/g,"aa").length;
}
//将字符串编码成16进制
function bin2hex(bin){
	var result = "";
	var temp = "";
	for(var i=0;i<bin.length;i++){
		var chr = bin.charCodeAt(i);
		if(chr>127){
			chr = encodeURIComponent(bin.charAt(i));
		}else{
			chr = chr.toString(16);
			if(chr.length == 1){
				chr = "0" + chr;
			}
		}
		result += chr;
	}
	for(var i=0;i<result.length;i++){
		var chr = result.charAt(i);
		if(chr!='%'){
			temp+=chr;
		}
	}
	return temp.toLowerCase();
}
//将字符串16进制变2进制
function hex2bin(hex){
	var result = "";
	if(hex && hex.length && hex.length % 2 == 0){
		for(var i = 0 ;i<hex.length;i+=2){
			result += "%";
			result += hex.substr(i, 2);
		}
		result = decodeURIComponent(result);
	}
	return result;
}
//显示隐藏
function displayReply(objID) {
	$("#"+objID).toggle();
}
//获取元素横坐标
function getTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
	return offset;
}
//获取元素的横坐标
function getLeft(e){
	var offset=e.offsetLeft;
	if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
	return offset;
}
//通用弹出消息
function messagebox(msg, url, refresh){
	var oLayer = new Layer("l_alert");
	oLayer.Src = msg;
	oLayer.Model = 2;
	oLayer.AutoRiszeAble = 0;
	oLayer.Location.width = 300;
	oLayer.Location.height = 90;
	//oLayer.Button = 1;
	oLayer.Caption="信息";
	oLayer.createLayer();
	showDialog(oLayer);
	if(url=='' && refresh==1){
		window.setTimeout("top.location.reload();",2000);
	}else if(url!='' && refresh==1){
		window.setTimeout("top.location.href='"+url+"';",2000);
	}
}
//登录框
function l_login(){
	var oLayer = new Layer("l_login");
	oLayer.Caption="欢迎您登录凤凰博客";
	oLayer.Src = "/login_layer.php";
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 398;
	oLayer.Location.height = 162;
	oLayer.createLayer();
	showDialog(oLayer);
}
//验证码
function changeCaptcha() {
	var captcha_src = $("#img_captcha").attr("src");
	$("#img_captcha").attr("src", captcha_src + '&r=' + Math.random());
	return false;
}
// Add the url to nagivator's bookmark
function addBookmark(site, url){
	if(navigator.userAgent.toLowerCase().indexOf('ie') > -1) {
		window.external.addFavorite(url,site);
	} else if (navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
		alert ("请使用Ctrl+T将本页加入收藏夹");
	} else {
		alert ("请使用Ctrl+D将本页加入收藏夹");
	}
}
// Copy text content to the Clip Board
copyToClipboard = function(txt,msg) {
	if(window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
	} else if(navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if(window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch(e) {
			alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试");
			return false;
		}

		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if(!clip) {
			return;
		}
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if(!trans) {
			return;
		}
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid = Components.interfaces.nsIClipboard;
		if(!clip) {
			return false;
		}
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}

	msg = msg ? msg : '内容已复制到您的剪贴板。';
	alert(msg);
}

// 外部接口：弹出浮动提示框
function ajaxMessageBox(message, title)	{
	try	{
		var ajaxdv = document.getElementsByClassName('blog_error')[0];
		ajaxdv.tagName;
	}
	catch(e)	{
		_createMSGBox();
		var ajaxdv = document.getElementsByClassName('blog_error')[0];
	}

	title = (title.length!='undefined' && title.length) ? title : '系统提示';
	// 弹出框
	var msgbox = document.getElementsByClassName('error_text')[0];
	var msgtle = document.getElementsByClassName('ML_But1')[0].firstChild;
	msgbox.innerHTML = '';
	msgbox.appendChild(document.createTextNode(message));
	msgtle.innerHTML = '';
	msgtle.appendChild(document.createTextNode(title));

	ajaxdv.style.margin = 0;
	ajaxdv.style.position = 'absolute';
	ajaxdv.style.top = '0px';
	ajaxdv.style.left = '0px';
	ajaxdv.style.zIndex = 999;
	// 浮动层弹出框的高为：220px
	ajaxdv.style.top = ((window.screen.availHeight - 220 - 300) / 2) + 'px';
	// 浮动层弹出框的宽慰：400px
	ajaxdv.style.left = ((window.screen.availWidth - 400) / 2) + 'px';
	if(Prototype.Browser.IE)	{
		ajaxdv.style.filter = 'alpha(opacity=100)';
	}
	else	{
		ajaxdv.style.opacity = 1;
	}
	ajaxdv.style.display = 'block';
}

// 内部函数：关闭浮动层
function _clsDiv() {
	document.getElementsByClassName('blog_error')[0].style.display = 'none';
}

// 内部函数：创建浮动层
function _createMSGBox() {
	var divs = [];
	var h = [];
	var p = [];
	var span = [];
	var a = [];
	var img = [];
	divs[0] = document.createElement('div');
	divs[0].className = 'blog_error';
	divs[0].style.display = 'none';
	divs[1] = document.createElement('div');
	divs.className = 'error_title';
	h[0] = document.createElement('h1');
	h[0].className = 'ML_But';
	h[1] = document.createElement('h2');
	h[1].className = 'ML_But1';
	p[0] = document.createElement('p');
	p[0].appendChild(document.createTextNode('系统提示'));
	span[0] = document.createElement('span');
	span[0].onclick= function()	{
		_clsDiv();
	}
	h[2] = document.createElement('h3');
	h[2].className = 'ML_But2';
	divs[2] = document.createElement('div');
	divs[2].className = 'error_content';
	divs[3] = document.createElement('div');
	divs[3].className = 'error_text';
	divs[3].appendChild(document.createTextNode('正在加载消息...'));
	divs[4] = document.createElement('div');
	divs[4].className = 'error_button';
	a[0] = document.createElement('a');
	a[0].style.cursor = 'pointer';
	a[0].onclick = function()	{
		_clsDiv();
	}
	img[0] = document.createElement('img');
	img[0].src = 'images/error_button01.gif';
	img[0].style.border = '0px';
	divs[5] = document.createElement('div');
	divs[5].className = 'error_padding_bottom';

	// 链接 CSS 文件
	// <link href="css/blog_error.css" rel="stylesheet" type="text/css" />
	var link = [];
	link[0] = document.createElement('link');
	link[0].href = '/css/blog_error.css';
	link[0].rel = 'stylesheet';
	link[0].type = 'text/css';
	link[0].id = 'msgbox_css';
	document.body.previousSibling.appendChild(link[0]);

	// 元素插入
	h[1].appendChild(p[0]);
	h[1].appendChild(span[0]);
	divs[1].appendChild(h[0]);
	divs[1].appendChild(h[1]);
	divs[1].appendChild(h[2]);

	a[0].appendChild(img[0]);
	divs[4].appendChild(a[0]);
	divs[2].appendChild(divs[3]);
	divs[2].appendChild(divs[4]);
	divs[2].appendChild(divs[5]);

	divs[0].appendChild(divs[1]);
	divs[0].appendChild(divs[2]);
	document.body.appendChild(divs[0]);
}

var BLOG_PIC_PREVIEW_WIDTH = 400;
var BLOG_PIC_PREVIEW_HEIGHT = 300;

// 内部函数
// 适用对象：风格选择页面的风格预览层
function _createFloatDiv()	{
	var divs = [];
	divs[0] = document.createElement('div');
	divs[0].id = 'floatingDivContainer';
	divs[0].style.backgroundColor = '#FFFFDD';
	divs[0].style.position = 'absolute';
	divs[0].style.zIndex = '997';
	divs[0].style.top = '0px';
	divs[0].style.left = '0px';
	divs[0].style.width = BLOG_PIC_PREVIEW_WIDTH + 'px';
	divs[0].style.height = BLOG_PIC_PREVIEW_HEIGHT + 'px';
	divs[0].style.border = '1px solid #000';
	divs[1] = document.createElement('div');
	divs[1].id = 'floatDivHead';
	divs[1].style.height = '24px';
	divs[1].style.lineHeight = '24px';
	divs[1].style.borderBottom = '1px solid #000';
	divs[2] = document.createElement('div');
	divs[2].id = 'floatDivContent';
	divs[2].style.padding = '12px';
	divs[3] = document.createElement('div');
	divs[3].id = 'floatDivTitle';
	divs[3].style.textAlign = 'left';
	divs[3].style.paddingLeft = '12px';
	divs[3].style.fontSize = '12px';
	divs[3].style.color = '#888';
	/* TEST */divs[3].appendChild(document.createTextNode('哈哈的图片哈哈的图片哈哈的图片哈哈的图片哈哈的图片哈哈的图片'));
	var imgs = [];
	imgs[0] = document.createElement('img');
	imgs[0].src = '/image/error_delet_hover.gif';
	imgs[0].style.border = '0px';
	imgs[0].style.width = imgs[0].style.height;
	imgs[0].style.marginRight = '0px';
	imgs[0].style.cursor = 'pointer';

	imgs[0].style.position = 'absolute';
	imgs[0].style.right = '10px';
	imgs[0].style.top = '4px';
	imgs[0].onclick=function(){
		//divs[0].style.display="none";
		new Effect.Puff(divs[0]);
	};

	divs[1].appendChild(divs[3]);
	divs[1].appendChild(imgs[0]);

	divs[0].appendChild(divs[1]);
	divs[0].appendChild(divs[2]);

	document.body.appendChild(divs[0]);

	return divs;
}

// 外部接口：显示风格页面预览
function ajaxFloatDiv(imgsrc, title , width , height)	{
	try	{
		var floatdv = $('floatingDivContainer');
		floatdv.offsetWidth;
		var titledv = $('floatDivTitle');
		var preview = $('floatDivContent');
	}
	catch(e)	{
		var divs = _createFloatDiv( width , height);
		var floatdv = divs[0];
		var titledv = divs[3];
		var preview = divs[2];
	}

	try	{
		var previewPic = $('previewPic');
		previewPic.style.width = width + "px";
		previewPic.style.height = height+ "px";
	}
	catch(e)	{
		var previewPic = document.createElement('img');
		previewPic.id = 'previewPic';
		previewPic.style.width = width+ "px";
		previewPic.style.height = height+ "px";
	}
	previewPic.src = imgsrc;
	previewPic.style.border = '0px';
	preview.appendChild(previewPic);

	titledv.innerText = title;

	floatdv.style.width = (width + 20) + 'px';
	floatdv.style.height = (height + 44) + 'px';
try{
	floatdv.style.top = ((window.screen.availHeight - height - 300) / 2) + "px";
	floatdv.style.left = ((window.screen.availWidth - width - 350) / 2) + "px" ;
}catch(e){
	alert(e.message);
}
	floatdv.style.display ="none";
	new Effect.Grow(floatdv);
}

//Create iframe style layer
function ajaxIframeLayer(src,posX,posY,_width,_height,_iFlg,_autoResize){
	if(!_iFlg){
		_iFlg = 0;
	}
	if(!_autoResize){
		_autoResize = 0;
	}
	try{
		var oLayer = $('IfrmContainerDiv');
		oLayer.offsetWidth;
		var oFrm = $('iframeLayer');
	}
	catch(e){
		var el = _CreateIframeLayer(src,_iFlg,_autoResize);
		var oLayer = el[0];
		var oFrm = el[1];
	}

	with(oLayer.style){
		//top = ((window.screen.availHeight - _height) / 2 + event.clientY) + "px";
		//left = ((window.screen.availWidth - _width - 350) / 2) + "px" ;
		top = (posY+15) + "px";
		left = (posX - 150) + "px";
		width = _width;
		height = _height;
	}
	oFrm.src = src;
	new Effect.BlindDown(oLayer);
}

function _CreateIframeLayer(_src,iFlg,_autoResize){
	var el = [];
	el[0] = document.createElement("DIV");
	with(el[0]){
		id = "IfrmContainerDiv";
		with(style){
			display = "none";
			position = "absolute";
			left = "0px";
			top = "0px";
			width = "0px";
			height = "0px";
			zindex = "999";
			border = "1px";
			backgroundColor = '#FFFFDD';
		}
	};

	var divs = [];
	divs[0] = document.createElement('div');
	divs[0].id = 'floatDivHead';
	divs[0].style.height = '24px';
	divs[0].style.lineHeight = '24px';
	divs[0].style.borderBottom = '1px solid #000';
	divs[1] = document.createElement('div');
	divs[1].id = 'floatDivTitle';
	divs[1].style.textAlign = 'left';
	divs[1].style.paddingLeft = '12px';
	divs[1].style.fontSize = '12px';
	divs[1].style.color = '#888';
	/* TEST */divs[1].appendChild(document.createTextNode('Test'));
	var imgs = [];
	imgs[0] = document.createElement('img');
	imgs[0].src = '/image/error_delet_hover.gif';
	imgs[0].style.border = '0px';
	imgs[0].style.width = imgs[0].style.height;
	imgs[0].style.marginRight = '0px';
	imgs[0].style.cursor = 'pointer';

	imgs[0].style.position = 'absolute';
	imgs[0].style.right = '10px';
	imgs[0].style.top = '4px';
	imgs[0].onclick=function(){
		//divs[0].style.display="none";
		new Effect.Puff(el[0]);
	};


	el[1] = document.createElement("IFRAME");
	with(el[1]){
		id = "iframeLayer";
		src = _src;
		with(style){
			position = "relative";
		//	scrolling = "no";
			hspace = "0";
			vspace = "0";
			//frameborder = "no";
			framespacing = "0";
			width = "100%";
			height = "100%";
		}
		alert(frameBorder);
		frameBorder = "0";
	};
	el[1].onresize = function(){
		if (_autoResize == 1){
			try{
				el[1].style.width = el[0].style.width = el[1].contentWindow.document.body.scrollWidth;
				el[1].style.height = el[0].style.height = el[1].contentWindow.document.body.scrollHeight;
			}catch(e){
				;
			}
		}
	};

	if (iFlg==0){
		divs[0].appendChild(divs[1]);
		divs[0].appendChild(imgs[0]);
		el[0].appendChild(divs[0]);
	}
	el[0].appendChild(el[1]);
	document.body.appendChild(el[0]);
	return el;
}

// 旷淇元 2007-11-21 添加
// 取得 32 位的随机 hash
function hash(hashLength)	{
	hashLength = hashLength && typeof hashLength == 'number' ? hashLength : 32;
	var oriStr = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var hash = '';
	var randNum = 0;
	for(var i = 0; i < hashLength; i++)	{
		randNum = Math.round(Math.random()*oriStr.length);
		hash += oriStr.substr(randNum, 1);
	}
	return hash;
}

// 让用户确认删除博文的提示
function confirmDeleteBlog(itemid, deltype)	{
	var confirm_str = '你确定要删除此博文及其所有评论吗？';
	if(deltype == 2) {
		confirm_str = '你确定要删除此草稿吗？';
	}
	if(confirm(confirm_str)) {
		location.href = "/usercp/index.php?op=blogdel&itemid=" + itemid + '&_t=' + deltype;
	}
}
// 检查输入框输入的字符长度，超过限制不让输入
function syncchecklength(objName, limit, lastright)	{
	lastright = "undefined" == typeof lastright || !lastirght ? "" : lastright;
	var lastright = '';
	var objInput = $(objName);
	if(len(objInput.value) > limit)	{
		objInput.value = lastright;
	}
	else	{
		lastright = objInput.value;
	}

	setTimeout("syncchecklength(\""+objName+"\", "+limit+", \""+lastright+"\");", 100);
}


//显示隐藏媒体
function addMediaAction(div) {
	var medias = $('div[name=kbd]');//$(div).getElementsByTagName('kbd');
	for (i=0;i<medias.length;i++) {
		if(medias.get(i).className=='showvideo' || medias.get(i).className=='showflash'|| medias.get(i).className=='showreal') {
			medias.get(i).onclick = function() {showmedia(this,400,400)};
		}
	}
}
function showmedia(Obj, mWidth, mHeight) {
	var mediaStr, smFile;
	if ( Obj.tagName.toLowerCase()=='a' ) { smFile = Obj.href; } else { smFile = Obj.title; }
	var smFileType = Obj.className.toLowerCase();

	switch(smFileType){
		case "showflash":
			mediaStr="<p style='text-align: right; margin: 0.3em 0; width: 400px;'>[<a href='"+smFile+"' target='_blank'>全屏观看</a>]</p><object codeBase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='400' height='260'><param name='movie' value='"+smFile+"'><param name='quality' value='high'><param name='AllowScriptAccess' value='never'><embed src='"+smFile+"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='400' height='260'></embed></OBJECT>";
			break;
		case "showvideo":
			mediaStr="<object width='400' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6'><param name='url' value='"+smFile+"' /><embed width='400' type='application/x-mplayer2' src='"+smFile+"'></embed></object>";
			break;
		case "showreal":
			mediaStr="<object classid='clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA' width='400' height='400' id='RealMoviePlayer' border='0'><param name='_ExtentX' value='13229'><param name='_ExtentY' value='1058'><param name='controls' value='ImageWindow'><param name='AUTOSTART' value='1'><param name='CONSOLE' value='_master'><param name='SRC' value='"+smFile+"'></object><object classid='clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA' width='400' height='30' id='RealMoviePlayerCtrl' border='0'><param name='_ExtentX' value='13229'><param name='_ExtentY' value='1058'><param name='AUTOSTART' value='1'><param name='CONTROLS' value='controlpanel'><param name='CONSOLE' value='_master'><param name='SRC' value='"+smFile+"'></object>";
	}

	var mediaDiv = document.getElementById(escape(smFile.toLowerCase()));

	if (mediaDiv) {
		Obj.parentNode.removeChild(mediaDiv);
	} else {
		mediaDiv = document.createElement("div");
		mediaDiv.id = escape(smFile.toLowerCase());
		mediaDiv.innerHTML = mediaStr;
		Obj.parentNode.insertBefore(mediaDiv,Obj.nextSibling);
	}
	return false;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+" : this.getMonth()+1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S" : this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt))
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}

function CopyText(id) {
	$(id).select();
	copy($(id).value);
//	alert('已成功复制选中内容。');
}

function copy(text2copy) {
	if (window.clipboardData) {
		window.clipboardData.setData("Text",text2copy);
	} else {
		var flashcopier = 'flashcopier';
		if(!$(flashcopier)) {
			var divholder = document.createElement('div');
			divholder.id = flashcopier;
			document.body.appendChild(divholder);
		}
		$(flashcopier).innerHTML = '';
		var divinfo = '<embed src="' + HTTP_FILES_ROOT + 'js/common/clipboard.swf" FlashVars="clipboard='+escape(text2copy)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';//这里是关键
		$(flashcopier).innerHTML = divinfo;
	}
}


var userAgent = navigator.userAgent.toLowerCase();
function get_browser() {
	var b;
	if (window.ActiveXObject) {
		v = userAgent.substr(userAgent.indexOf('msie') + 5, 3);
		b = 'ie';
	} else if (userAgent.indexOf("firefox") != - 1) {
		v = userAgent.substr(userAgent.indexOf('gecko/') + 6, 8);
		b = 'firefox';
	} else if (userAgent.indexOf("safari") != - 1) {
		v = -1;
		b = 'safari';
	} else if (userAgent.indexOf("opera") != - 1) {
		v = opera.version();
		b = 'opera';
	} else {
		v = -1;
		b = -1;
	}
	return {
		name : b,
		version: v
	};
}
var browser = get_browser();

function resizeme() {
	//补旧版本转换过来博文调用不存在函数的问题。
 	if(obj.offsetWidth > 650) {
 		var srcW = obj.offsetWidth;
 		var srcH = obj.offsetHeight;
 		obj.style.width = "650px";
 		dstH = srcH * 650 / srcW;
 		obj.style.height = dstH+"px";
 	}
}