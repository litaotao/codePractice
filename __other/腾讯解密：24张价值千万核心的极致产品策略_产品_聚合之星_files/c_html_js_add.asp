
var bloghost="http://www.mergestar.com/";
var cookiespath="/";
var str00="http://www.mergestar.com/";
var str01="名称不能为空";
var str02="名称或邮箱,网址格式不对";
var str03="留言不能为空或过长";
var str06="显示UBB表情>>";
var intMaxLen="1000";
var strFaceName="neutral|grin|happy|slim|smile|tongue|wink|surprised|confuse|cool|cry|evilgrin|fat|mad|red|roll|unhappy|waii|yell";
var strFaceSize="16";
var strFaceType="png";
var strBatchView="";
var strBatchInculde="";
var strBatchCount="";

$(document).ready(function(){ 
	$("img[src*='zb_system/function/c_validcode.asp?name=commentvalid']").css("cursor","pointer").click( function(){$(this).attr("src","http://www.mergestar.com/zb_system/function/c_validcode.asp?name=commentvalid"+"&amp;random="+Math.random());});
	sidebarloaded.add(function(){
		if(GetCookie("username")!=""&&GetCookie("password")!=""){$.getScript("http://www.mergestar.com/zb_system/function/c_html_js.asp?act=autoinfo",function(){AutoinfoComplete();})}else{AutoinfoComplete();}
	});
	$.getScript("http://www.mergestar.com/zb_system/function/c_html_js.asp?act=batch"+unescape("%26")+"view=" + escape(strBatchView)+unescape("%26")+"inculde=" + escape(strBatchInculde)+unescape("%26")+"count=" + escape(strBatchCount),function(){BatchComplete();});
	
});

