var tracker_url = 'http://data.hicloud.com:8880';
var site_id = 'cn.club.vmall.com';

var _paq = _paq || [];
_paq.push(['setTrackerUrl', tracker_url + '/webv1']);
// 分配的site id。被跟踪网站ID：网站域名
_paq.push(['setSiteId', site_id]);
// 加载服务端JS
var _doc = document.getElementsByTagName('head')[0];
var js = document.createElement('script');
js.setAttribute('type', 'text/javascript');
js.setAttribute('src', tracker_url + '/hianalytics.js');
_doc.appendChild(js);