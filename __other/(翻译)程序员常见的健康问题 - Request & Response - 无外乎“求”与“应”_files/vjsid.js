function get_browser_info()
{
	var ua = navigator.userAgent.toLowerCase();
	var browser = '';
	var version = 0;
	if(ua.indexOf('msie')>-1){
		browser = 'msie';
		version = ua.match(/msie ([\d.]+)/)[1];
	}else if(ua.indexOf('firefox')>-1){
	    browser = 'firefox';
		version = ua.match(/firefox\/([\d.]+)/)[1];
	}else if(ua.indexOf('chrome')>-1){
	    browser = 'chrome';
		version = ua.match(/chrome\/([\d.]+)/)[1];
	}else if(ua.indexOf('opera')>-1){
	    browser = 'opera';
		version = ua.match(/opera.([d.]+)/)[1];
	}else if(ua.indexOf('safari')>-1){
	    browser = 'safari';
		version = ua.match(/version\/([d.]+).*safari/)[1];
	}else{
		browser = 'other';
	}
	return browser+' '+version;
}

var sense = window.screen.width+'x'+window.screen.height;
var lang=(navigator.browserLanguage||navigator.language).toLowerCase();
var browser_info = get_browser_info();
jQuery.noConflict();
var vjsid = jQuery.cookie('vjsid');
if(!vjsid){
		jQuery.ajax({
			url: "http://techweb.com.cn/tongji/vjsid.php?callback=?",
			dataType: 'jsonp',
			data: {browser:browser_info,lang:lang,sense:sense}, 
			success: function(json){
			    var editor1 = (editor!='')?editor:'techweb';
				var title1 = jQuery('.title h1').text();
				var title3 = (title1=='')?title:title1;
				jQuery.getJSON("http://tongji.techweb.com.cn/tj.php?callback=?",
					{id:contentid,
					slot:json.id,
					title:title3,
					url:document.location.href,
					editor:editor1,
					refer:document.referrer
					},
					function(json){}
				);
			}
		});
	
}else{
var editor1 = (editor!='')?editor:'techweb';
var title1 = jQuery('.title h1').text();

	var title3 = (title1=='')?title:title1;

	jQuery.getJSON("http://tongji.techweb.com.cn/tj.php?callback=?",
		{id:contentid,
		slot:vjsid,
		title:title3,
		url:document.location.href,
		editor:editor1,
		refer:document.referrer
		},
		function(json){
		}
	);

}

