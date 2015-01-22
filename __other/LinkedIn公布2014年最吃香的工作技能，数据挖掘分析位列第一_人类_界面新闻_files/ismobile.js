// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

var webParam = getUrlParam('web');
var mobile_url = 'm.jiemian.com';
var type = navigator.userAgent.match(/(Mobile|Android|iPhone)/) ? true : false;

if (type) {
	var referrer = document.referrer;
	if ((webParam == 1 || referrer.indexOf(mobile_url) != '-1') && jQuery.cookie('web') == null) {
		jQuery.cookie('web', 1, 0);
	}
	var host = document.location.host;
	var cur_url = document.location.href;
	var mobile_url = cur_url.replace(host, mobile_url);
	var web = jQuery.cookie('web');

	if (web == null) {
		document.location.href = mobile_url;
	}
}