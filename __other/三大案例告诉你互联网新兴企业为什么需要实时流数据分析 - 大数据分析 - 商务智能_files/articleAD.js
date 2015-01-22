function toxmlObj(str, tag) {
    var items = $(str);
    if ((-[1, ])) items = tag ? items.find(tag) : items;
    else {
        var xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = false;
        xml.loadXML(str);
        items = tag ? $(xml).find(tag) : $(xml);
    }
    return items;
}
function ShowArticleAD(callback) {//读取关于画中画广告的配置，并显示相应广告内容
    $.ajax({
        url: "http://img.techtarget.com.cn/common/ajax.ashx",
        dataType: "jsonp",
        data: "xmlurl=http://img.techtarget.com.cn/xml/articleadconfig.xml",
        type: "GET",
        success: function (response) {
            toxmlObj(response, "SiteConfig").each(function () {
                if (location.href.indexOf($(this).find("Url").text().trim()) == 0) {
                    if ($(this).find("Available").text().toLowerCase() == "true")
                        ShowAD(parseInt($(this).find("ID").text()), parseInt($(this).find("ADCount").text()),callback);
                    return false;
                }
            });
        },
        error: function (a, b, c) {
            var s = b;
        }
    });
}
function ShowAD(siteid, adcount,callback) {//读取投放中的广告，并显示在文章页
    $.ajax({
        url: "http://img.techtarget.com.cn/common/ajax.ashx",
        dataType: "jsonp",
        data: "xmlurl=http://img.techtarget.com.cn/xml/articlead.xml",
        type: "GET",
        success: function (response) {
            var ads = [];
            var res = toxmlObj(response);
            res.find("Table").each(function (i) {
                var ad = {};
                ad.id = res.find("ID:eq(" + i + ")").text();
                ad.key = res.find("KeyWord:eq(" + i + ")").text();
                ad.desc = res.find("Description:eq(" + i + ")").text();
                ad.content = unescape(res.find("Content:eq(" + i + ")").text());
                ad.position = parseInt(res.find("PositionType:eq(" + i + ")").text());
                ad.match = parseInt(res.find("MatchType:eq(" + i + ")").text());
                ad.state = parseInt(res.find("State:eq(" + i + ")").text());
                ad.orderid = parseInt(res.find("OrderID:eq(" + i + ")").text());
                ad.start = res.find("StartDate:eq(" + i + ")").text();
                ad.end = res.find("EndDate:eq(" + i + ")").text();
                ad.sites = res.find("SiteIDStr:eq(" + i + ")").text();
                ads.push(ad);
            });
            if (ads.length > 0) {
                try {
                    $("#maintext").articleAd({ ads: ads, cursite: siteid, adCount: adcount });
                }
                catch (ex) { }
            }
            if (callback) callback();
        }
    });
}
var container;
var dw = document.write;
function finishWrite() {
    document.write = dw;
}
function loadScript(url, callback) {
    url = url.replace(/\$(.*)/, "http://img.techtarget.com.cn/template/js/$1");
    callback = callback || function () { };
    if (typeof callback != "function") {
        var urls = url.split('/');
        var dataParam = callback;
        callback = function () { eval(urls[urls.length - 1].replace(".js?", "_") + '(dataParam);'); };
    }
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = url;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    var ieLoadBugFix = function (scriptElement, callback) {
        if (scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete') {
            callback();
        } else {
            setTimeout(function () { ieLoadBugFix(scriptElement, callback); }, 100);
        }
    }
    if (typeof ga.addEventListener !== "undefined")
        ga.onload = callback;
    else { ieLoadBugFix(ga, callback); }
}
var matchids = false;
$.fn.articleAd = function (p) {//在this范围内按配置插入广告
    document.write = function (str) {
        if ($("div[class^='ad_middle_']:eq(0)").size() <= 0) container.append(str);
        else $("div[class^='ad_middle_']:eq(0)").append(str);
        $("div[class^='ad_middle_']:eq(0) div").css({ margin: "0 auto" });
    }
    var params = $.extend(true, {
        ads: [{
            id: 1,
            key: "ad", desc: "",
            content: "This is ad content",
            position: 0, //插入广告的位置：0下一段文字之前；1上一段文字之后；2全文之后；3全文之前；4匹配文字之后；5匹配文字之前；6替换匹配文字；7鼠标经过浮动显示;8右一；9有二；10右三；11搜索页
            match: 0//匹配类型：0正文；1主题；2时间；3文章ID
        }],
        cursite: "",
        show: true,
        adCount: 1 //匹配到多个广告时插入广告的数量
    }, p);
    var allkeys = "";
    var adCount = 0;
    var adIndexShow = 0;
    for (var i = 0; i < params.ads.length; i++) {
        matchids = false;
        if (location.pathname.toLowerCase() == "/search.aspx" && params.ads[i].position < 11) continue;
        if (params.show) {
            if (params.ads[i].sites.indexOf("|" + params.cursite + "|") < 0) continue;
            if (new Date(params.ads[i].end) < new Date()) continue;
            if (new Date(params.ads[i].start) > new Date()) continue;
        }
        var content = $(this).html() || $("body").html();
        var keyIndex = 0;
        var afterKeyIndex = 0;
        if (params.ads[i].match == 0) {
            if (params.show)
                allkeys = allkeys || getAllKeys(params.ads, params.cursite);
            if (params.ads[i].position >= 8) { content = $(".ctleft h1,.ctleft .article,.disarticle").text(); }
            var keys = allkeys.split(','); // params.ads[i].key.replace(/，/g, ',').split(',');
            for (var j in keys) {
                var curkey = $.trim(keys[j] || "");
                if (curkey) {
                    keyIndex = content.indexOf(curkey.split('|')[0]);
                    afterKeyIndex = keyIndex + curkey.length;
                    if (keyIndex > -1) {
                        eval("var re = /," + curkey.split('|')[0] + "\\|\\d+\\|" + curkey.split('|')[2] + ",/g;");
                        var res = keys.toString().match(re);
                        if (res.length > 0) {
                            adIndexShow = res[parseInt(res.length * Math.random())].split('|')[1];
                            break;
                        }
                        // adIndexShow = curkey.split('|')[1] - 0;
                        // break;
                    }
                }
            }
        }
        else if (params.ads[i].match == 1) {
            if (params.show && $("p.posit a:eq(1)").text().trim() != params.ads[i].key) continue;
        }
        else if (params.ads[i].match == 3) {
            if (params.show && params.ads[i].desc.indexOf(location.pathname.replace(/[^\d]*showcontent_([\d]*)\.htm.*/, ",$1,")) < 0) continue;
            matchids = true;
        }
        else if (params.ads[i].match == 2) {
            keyIndex = content.indexOf("</p>");
            if (keyIndex < 0) keyIndex = content.indexOf("</P>");
            afterKeyIndex = keyIndex + 4;
            if (keyIndex < 0) { keyIndex = 0; if (params.ads[i].position < 8) params.ads[i].position = 3; }
            switch (params.ads[i].position) {
                case 4:
                case 5:
                case 6:
                case 7: params.ads[i].position = 0; break;
            }
        }
        else keyIndex = -1;
        if (keyIndex > -1) {
            if (matchids) { $("#maintext div[class*='ad_middle_']").remove(); }
            adCount++;
            var $divAD = $("<div class='ad_middle_" + adCount + "'></div>");
            container = $divAD;
            if (!params.ads[i].position) params.ads[i].position = 0;
            /*temp*/
            if (params.show) {
                if (typeof specificArticle == "object" && specificArticle.test(curpathname)) {//replace ads for dell for a moment
                    for (var x in params.ads) {
                        if (params.ads[x].id == 30) { params.ads[i] = params.ads[x]; break; }
                    }
                }
                function getid() {
                    var idd = 0;
                    switch (parseInt(location.pathname.match(/_(\d+).htm/)[1])) {
                        case 84738: case 84724: case 85011: idd = 46; break; //eis
                        case 85010: case 84889: case 84847: idd = 44; break; //mobility
                        case 85017: case 84916: case 84757: idd = 43; break; //ics
                        case 85022: case 85014: case 84859: idd = 45; break; //security
                        case 85077: case 84036: case 84400: idd = 42; break; //bcrs
                        case 84884: case 84821: case 84819: idd = 41; break; //cloud
                    } return idd;
                }
                var tempid = getid();
                if (tempid > 0) {//replace ads for IBM for a moment
                    for (var x in params.ads) {
                        if (params.ads[x].id == tempid) { params.ads[i] = params.ads[x]; break; }
                    }
                }
            }
            /*temp end*/
            if (params.ads[i].content.indexOf("<iframe") >= 0) { //deal iframe banner popup
                params.ads[i].content = params.ads[i].content.replace(/img\.techtarget\.com\.cn\/ad\/infocenter\/([^\?"']*)/,
                "img.techtarget.com.cn/ad/infocenter/$1?domainame=" + location.host);
            }
            switch (params.ads[i].position) {
                case 0:
                    $(this).html(content.substr(0, keyIndex) + content.substr(keyIndex).replace(/<\/[p,P]>/, "</p><div class='ad_middle_" + adCount + "'></div>"));
                    container = $(this).find("div.ad_middle_" + adCount);
                    $(this).find("div.ad_middle_" + adCount).append(params.ads[i].content);
                    break;
                case 1:
                    var temp = content.substr(0, keyIndex).lastIndexOf("<p");
                    if (temp < 0) temp = content.substr(0, keyIndex).lastIndexOf("<P");
                    $(this).html(content.substr(0, temp) + "<div class='ad_middle_" + adCount + "'></div>" + content.substr(temp));
                    container = $(this).find("div.ad_middle_" + adCount);
                    $(this).find("div.ad_middle_" + adCount).append(params.ads[i].content);
                    break;
                case 2:
                    $(this).append($divAD.append(params.ads[i].content));
                    break;
                case 3: $(this).prepend($divAD.append(params.ads[i].content)); break;
                case 4: $(this).html(content.substr(0, afterKeyIndex) + params.ads[i].content + content.substr(afterKeyIndex)); break;
                case 5: $(this).html(content.substr(0, keyIndex) + params.ads[i].content + content.substr(keyIndex)); break;
                case 6: $(this).html(content.substr(0, keyIndex) + params.ads[i].content + content.substr(afterKeyIndex)); break;
                case 7:
                    $(this).html(content.substr(0, keyIndex) + "<span class='ad_hover_" + adCount + "'>" + params.ads[i].key + "</span>" + content.substr(afterKeyIndex));
                    var withHover = $(this).find("span.ad_hover_" + adCount);
                    withHover.css({ background: "#aaa", cursor: "pointer" });
                    $divAD.css({ display: "none", position: "absolute", background: "#fff", border: "1px solid red",
                        top: withHover.offset().top + withHover.height(), left: withHover.offset().left
                    });
                    withHover.append($divAD.append(params.ads[i].content));
                    withHover.hover(function () {
                        $divAD.show();
                    }, function () {
                        $divAD.hide();
                    });
                    break;
                case 8: $(".ctright .rightop").after($divAD.append(params.ads[adIndexShow || i].content));
                    $(".ctright .rightop").remove();
                    break;
                case 9: $(".ctright .downprogram:eq(0)").before($divAD.append(params.ads[i].content));
                    break;
                case 10: $(".ctright .downprogram:eq(0)").after($divAD.append(params.ads[i].content));
                    break;
                case 11:
                    if (location.pathname.toLowerCase() != "/search.aspx") continue;
                    if (params.ads[i].match != 2 && params.ads[i].key.indexOf(decodeURI(QueryString("q"))) < 0) continue;
                    $(".searchAD").append($divAD.append(params.ads[i].content));
                    break;
            }
            $divAD = $(this).find("div.ad_middle_" + adCount);
            $divAD.attr("adid", i);
            if (params.show && window._gaq) {
                window._gaq.push(['_trackEvent', 'ArticleAD_Load', params.ads[i].id + '_' + params.ads[i].key, location.href, parseInt(params.ads[i].id)]);
                if (window._hmt) {
                    window._hmt.push(['_trackEvent', 'ArticleAD_Load', params.ads[i].id + '_' + params.ads[i].key, location.href, parseInt(params.ads[i].id)]);
                }
                $divAD.find("a,div.video").live("click", function () {
                    var adid = parseInt($divAD.attr("adid"));
                    window._gaq.push(['_trackEvent', 'ArticleAD_Click', params.ads[adid].id + '_' + params.ads[adid].key, location.href, parseInt(params.ads[adid].id)]);
                    if (window._hmt) {
                        window._hmt.push(['_trackEvent', 'ArticleAD_Click', params.ads[adid].id + '_' + params.ads[adid].key, location.href, parseInt(params.ads[adid].id)]);
                    }
                });
            }
            container.css({ textAlign: "center" });
            var adtag = $("<div>Recommend</div>");
            adtag.css({ fontSize: "10px", color: "#999", lineHeight: "12px" });
            if (params.ads[i].position < 8 && params.ads[i].key.indexOf("屏蔽") < 0 && params.ads[i].desc.indexOf("不占位") < 0) container.prepend(adtag);
            if (params.ads[i].desc.indexOf("屏蔽") >= 0) params.adCount = 0;
            else if (params.ads[i].desc.indexOf("不计数") >= 0) params.adCount++;
            if (adCount >= params.adCount) break;
        }
    }
    if (typeof (tb_init) == "function") {
        $('a.thickbox, area.thickbox, input.thickbox').unbind("click");
        tb_init('a.thickbox, area.thickbox, input.thickbox');
    }
};

function getAllKeys(ads, cursite) {
    cursite = cursite || "1";
    function getObj(arrs, k) {
        for (var o in arrs) {
            if (arrs[o][k]) return arrs[o][k];
        }
        return "";
    }
    var keys = [];
    var oid = '';
    for (var i in ads) {
        if (ads[i].match != 0) continue;
        if (location.pathname.toLowerCase() == "/search.aspx" && ads[i].position < 11) continue;
        if (ads[i].sites.indexOf("|" + cursite + "|") < 0) continue;
        if (new Date(ads[i].end) < new Date()) continue;
        if (new Date(ads[i].start) > new Date()) continue;
        if (oid != ads[i].orderid) { oid = ads[i].orderid; keys.push(eval('({' + oid + ': [] })')); }
        var tem = getObj(keys, oid);
        if (tem) {
            var te = ads[i].key.replace(/，/g, ',').split(',');
            te.push(i);
            tem.push(te);
        }
    }
    var allKeys = ',';
    for (var j in keys) {
        if (keys[j]) {
            var tk = '';
            for (var x in keys[j])
            { tk = x; break; }
            if (!tk) continue;
            var len = keys[j][tk][0].length;
            for (var m = 0; m < len; m++) {
                for (var n in keys[j][tk]) {
                    if (len <= keys[j][tk][n].length) len = keys[j][tk][n].length;
                    if (m >= keys[j][tk][n].length - 1) break;
                    //if (keys[j][tk][n][m] && allKeys.indexOf($.trim(keys[j][tk][n][m]) + "|") < 0)
                    allKeys += $.trim(keys[j][tk][n][m]) + "|" + keys[j][tk][n][keys[j][tk][n].length - 1] + "|" + tk + ",";
                }
            }
        }
    }
    //    for (var j in keys) {
    //        if (keys[j]) {
    //            var tk = '';
    //            for (var x in keys[j])
    //            { tk = x; break; }
    //            if (!tk) continue;
    //            var len = keys[j][tk][0].length;
    //            for (var m = 0; m < len; m++) {
    //                for (var n in keys[j][tk]) {
    //                    if (len <= keys[j][tk][n].length) len = keys[j][tk][n].length;
    //                    if (m >= keys[j][tk][n].length - 1) break;
    //                    if (keys[j][tk][n][m] && allKeys.indexOf($.trim(keys[j][tk][n][m]) + "|") < 0)
    //                        allKeys += $.trim(keys[j][tk][n][m]) + "|" + keys[j][tk][n][keys[j][tk][n].length - 1] + ",";
    //                }
    //            }
    //        }
    //    }
    return allKeys;
}