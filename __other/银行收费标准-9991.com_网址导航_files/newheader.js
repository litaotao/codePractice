document.write('<div class="header"><div class="logo"><a id="logo1" href="/index.htm?logo" target="_self"><img alt="返回2345.com首页" title="返回2345.com首页" src="http://www.2345.com/i/toplogo.gif"/></a></div><div class="ss"><form target="_blank" action="http://www.baidu.com/s?" method="get" name="gform"><a target="_blank" href="http://www.baidu.com/index.php?tn=site888_pg"><img height="23" border="0" align="absmiddle" width="75" src="http://www.2345.com/pic/common/logo_baidu.gif" /></a>　<input type="text"  style=" height:19px;line-height:19px;" onfocus="this.select()" size="35" class="topgg" name="w"><input type="hidden" value="site888_pg" name="tn"><input type="hidden" value="-1" name="lm"><input style=" height:26px;" type="submit" value="搜  索" class="tops" name=""></form></div><div class="clear"></div></div>');
var timeout;
function showTips(){
	var sts = arguments[0]||false;
	var delay = arguments[1]||300;
	clearTimeout(timeout);
	timeout = sts?setTimeout(function(){tips(sts,true);},delay):setTimeout(function(){tips(sts);},delay);
}
function tips(){
	var sts = arguments[0]||false;
	document.getElementById("tips").style.display = sts?"":"none";
}



