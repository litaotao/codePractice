//点击统计
(function() {
var u='http://www.jiemian.com/analytics/index.php';
var timestamp = Date.parse(new Date()) / 1000;
var refer=encodeURIComponent(document.referrer);
var link=encodeURIComponent(window.location.href);
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
var browser;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
if (Sys.ie) browser = 'ie' + Sys.ie;
if (Sys.firefox) browser = 'firfox' + Sys.firefox;
if (Sys.chrome) browser = 'chrome' + Sys.chrome;
if (Sys.opera) browser = 'opera' + Sys.opera;
if (Sys.safari) browser = 'safari' + Sys.safari;
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
g.defer=true; g.async=true; g.src=u+"?aid="+aid+"&cid="+cid+"&refer="+refer+"&link="+link+"&time="+timestamp+"&browser="+browser; s.parentNode.insertBefore(g,s);
})();
//收藏回调
if($('.jm-collection').length > 0 && window.location.href.indexOf('action|collect') != -1){
    $('.jm-collection').trigger('click').attr('onclick','');
}
//顶回调
if($('#ding').length > 0 && window.location.href.indexOf('action|ding') != -1){
    $('#ding').trigger('click').attr('onclick','');
}
//踩回调
if($('.jm_unlike').length > 0 && window.location.href.indexOf('action|cai') != -1){
    $('.jm_unlike').trigger('click').attr('onclick','');
}

