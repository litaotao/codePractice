function GACookie(c_name)
{
	if(document.cookie.length>0){
	   c_start=document.cookie.indexOf(c_name + "=")
	   if(c_start!=-1){ 
	     c_start=c_start + c_name.length+1 
	     c_end=document.cookie.indexOf(";",c_start)
	     if(c_end==-1) c_end=document.cookie.length
	     return unescape(document.cookie.substring(c_start,c_end))
	   }
	}
	return ""
}

var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-6310276-1']);
	_gaq.push(['_addOrganic', 'baidu', 'wd']);
	_gaq.push(['_addOrganic', 'm.baidu', 'word']);
	_gaq.push(['_addOrganic', 'image.baidu', 'word']);
	_gaq.push(['_addOrganic', 'm5.baidu', 'word']);
	_gaq.push(['_addOrganic', 'wap.baidu', 'word']);
	_gaq.push(['_addOrganic', 'soso', 'w']);
	_gaq.push(['_addOrganic', 'wap.soso', 'key']);
	_gaq.push(['_addOrganic', 'vnet', 'kw']);
	_gaq.push(['_addOrganic', 'uc', 'keyword']);
	_gaq.push(['_addOrganic', 'sm', 'q']);
	_gaq.push(['_addOrganic', 'sogou', 'query']);
	_gaq.push(['_addOrganic', 'so', 'q']);
	_gaq.push(['_addOrganic', 'ly.so', 'q']);
	_gaq.push(['_addOrganic', 'youdao', 'q']);
	_gaq.push(['_setDomainName', 'cyzone.cn']);
	_gaq.push(['_setAllowAnchor', true]);

var _gaq_usertype = GACookie("utype");  
if(_gaq_usertype !=null&&_gaq_usertype !="")
{
	_gaq.push(['_setCustomVar',1,'utype',_gaq_usertype ,1]);
}

if(document.getElementById("GAcust_url")){
	_gaq.push(['_trackPageview',document.getElementById("GAcust_url").value]);
}else{
	_gaq.push(['_trackPageview']);
}

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.onerror = function(message, file, line) {
	var sFormattedMessage = '[' + file + ' (' + line + ')] ' + message;
	_gaq.push(['_trackEvent', 'Errors', 'Browser', sFormattedMessage, null, true]);
}