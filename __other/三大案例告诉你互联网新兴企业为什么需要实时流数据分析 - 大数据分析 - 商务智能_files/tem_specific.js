var wpids = { 2248: "", 2249: "", 2167: "", 2169: "", 2102: "", 2103: "PV-Wh003", 2341: "PV-Wh004", 2339: "PV-Wh005",
    2342: "PV-Wh006", 2340: "PV-Wh007", 2039: "PV-Wh008", 2042: "PV-Wh009", 2043: "PV-Wh00-", 2040: "PV-Wh00A",
    2041: "PV-Wh00B", 2044: "PV-Wh00C", 2038: "PV-Wh00D", 2037: "PV-Wh00E", 2028: "PV-Wh00F", 2031: "PV-Wh00G",
    2029: "PV-Wh00H", 1946: "PV-Wh00I", 1944: "PV-Wh00J", 2033: "PV-Wh00K", 2045: "PV-Wh00L", 2048: "PV-Wh00M",
    2104: "PV-Wh00N", 2101: "PV-Wh00O", 2093: "PV-Wh00P", 2092: "PV-Wh00Q", 2091: "PV-Wh00R", 2090: "PV-Wh00S",
    2111: "PV-Wh00T", 2358: "PV-Wh00U", 2359: "PV-Wh00V", 2360: "PV-Wh00W", 2361: "PV-Wh00X", 2362: "PV-Wh00Y",
    2363: "PV-Wh00Z", 2388: "PV-Wh00_", 2389: "PV-Wh00a", 2434: "PV-Wh00b", 2435: "PV-Wh00c", 2436: "PV-Wh00d"
};
var wpbuttons = { 2248: "PV-Wh00e", 2249: "PV-Wh00f", 2167: "PV-Wh00g", 2169: "PV-Wh00h", 2102: "PV-Wh00i",
    2103: "PV-Wh00j", 2341: "PV-Wh00k", 2339: "PV-Wh00l",
    2342: "PV-Wh00m", 2340: "PV-Wh00n", 2039: "PV-Wh00o", 2042: "PV-Wh00p", 2043: "PV-Wh00q", 2040: "PV-Wh00r",
    2041: "PV-Wh00s", 2044: "PV-Wh00t", 2038: "PV-Wh00u", 2037: "PV-Wh00v", 2028: "PV-Wh00w", 2031: "PV-Wh00x",
    2029: "PV-Wh00y", 1946: "PV-Wh00z", 1944: "PV-Wh01", 2033: "PV-Wh010", 2045: "PV-Wh011", 2048: "PV-Wh012",
    2104: "PV-Wh013", 2101: "PV-Wh014", 2093: "PV-Wh015", 2092: "PV-Wh016", 2091: "PV-Wh017", 2090: "PV-Wh018",
    2111: "PV-Wh019", 2358: "PV-Wh01-", 2359: "PV-Wh01A", 2360: "PV-Wh01B", 2361: "PV-Wh01C", 2362: "PV-Wh01D",
    2363: "PV-Wh01E", 2388: "PV-Wh01F", 2389: "PV-Wh01G", 2434: "PV-Wh01H", 2435: "PV-Wh01I", 2436: "PV-Wh01J"
};
var specificData = /^\/whitepaper\/content_(2248|2249|2167|2169|2102|2103|2341|2339|2342|2340|2039|2042|2043|2040|2041|2044|2038|2037|2028|2031|2029|1946|1944|2033|2045|2048|2104|2101|2093|2092|2091|2090|2111|2358|2359|2360|2361|2362|2363|2388|2389|2434|2435|2436)\.htm/;
var specificArticle = /^\/whitepaper\/content_(2053|1422|1423|2078|2078|2056|2052|2618|2077|2077|1420|2617)\.htm/;
//var specificGuid = /guide\/switchconfiguration\.htm/;
var curpathname = location.pathname.toLowerCase();
if (specificArticle.test(curpathname)) {//for dellsb    
    $(".wptext").append('<div><img src="http://www.searchsmb.com.cn/microsites/2014dellsbgrow/images/calltoactionpic.jpg" style="margin:0 auto;display:block" usemap="#dell_banner"><map id="dell_banner" name="dell_banner">\
  <area coords="367,45,438,77" shape="rect" href="http://adfarm.mediaplex.com/ad/ck/10592-189096-2304-2" target="_blank">\
  <area coords="452,45,576,77" shape="rect" href="http://www.dell-brand.com/advisor" target="_blank">\
</map></div>');
}
else if (specificData.test(curpathname)) {//for hp2013 security
    var thisid = curpathname.match(specificData)[1];
    $("body").append('<img src="http://ad.doubleclick.net/activity;src=2314522;type=CN_Q40;cat=' + wpids[thisid] + ';ord=' + getR() + '?" width="1" height="1" alt=""/>');
    $(".downall a").click(function () {
        $("body").append('<img src="http://ad.doubleclick.net/activity;src=2314522;type=CN_Q40;cat=' + wpbuttons[thisid] + ';ord=' + getR() + '?" width="1" height="1" alt=""/>');
    });
}
function getR() { return (Math.random() + "") * 10000000000000; }
var specificPage = /\/excerpt_\d+.htm/;
if (specificPage.test(curpathname)) {//for 书摘
    var flag = $(".guideinner .detailpic a");
    if (flag.attr("href") == "no") $(".guideinner .detbtn").remove();
    if (!flag.find("img").attr("src")) flag.remove();
}
var autopen;
if (/.*search[a-z]*.com.cn\/whitepaper\/content.*/i.test(location.href)) {//for netapp
    var downA = $(".downall a");
    if (downA.hasClass("thickbox") && downA.attr("examid") == 338)
        downA.bind("click", function () { showTip(false); });
    else if (downA.attr("href").indexOf("?ExamID=338&") > 0) {
        var wpid = downA.attr("href").toString().getQuery("ContentID");
        downA.attr("href", "javascript:void(0);").removeAttr("target");
        downA.bind("click", function () { showTip(wpid); });
    }
    function showTip(lg) {
        var tip = $("<img src='http://img.techtarget.com.cn/template/images/netapp2.png' alt='NetApp公司可能会与您联系或向您发送介绍其产品和服务的信息'/>");
        if (lg) {
            tip = $("<a title='点击立刻下载' href='/whitepaper/download.aspx?fileid=" + lg + "' target='_blank'><img src='http://img.techtarget.com.cn/template/images/netapp1.png' alt='NetApp公司可能会与您联系或向您发送介绍其产品和服务的信息'/></a>");
            tip.css({ cursor: "pointer" });
        }
        tip.css({ position: lg ? "absolute" : "fixed", textAlign: "center", lineHeight: "1.5em", borderRadius: "5px", zIndex: "101", color: "#fff", fontSize: "16px", padding: "8px" });
        $("body").append(tip);
        tip.css({ marginLeft: lg ? $(".wpleft").offset().left + 110 : ($(window).width() - tip.width()) / 2, top: lg ? $("div.downall").offset().top - 45 : ($(window).height() - 470) / 2 });
        autopen = setTimeout(function () { tip.fadeOut();}, 5000);
        tip.find("a").css({ color: "#00a49b" });
    }
}