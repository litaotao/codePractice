//tt监控依赖jquery
(function () {
    window.track_all = window.track_all || 1;
    if (track_all != 1) return;
    track_all = 2;
    window._gaq = window._gaq || [];
    window.tt_track_config = window.tt_track_config || window.tt_config || {};
    tt_track_config = $.extend({ tt: true, ga: true, bd: true, bdShare: true }, tt_track_config);

    var tt_gaid, tt_bdid;
    var ttdomain = location.host.toLowerCase().match(/w*.?(search[a-zA-Z]*).com.cn/);
    switch (ttdomain && ttdomain.length > 1 ? ttdomain[1] : "") {
        case "searchbi": tt_gaid = "UA-30148136-1"; tt_bdid = "40a4417e2ab9a7e93b304ec8f1f22ba1"; break;
        case "searchcio": tt_gaid = "UA-4227801-1"; tt_bdid = "76200e5feb8bef20b6f03960f583d87a"; break;
        case "searchcloudcomputing": tt_gaid = "UA-11204877-1"; tt_bdid = "afe7678b73293167567c7581f1b3a806"; break;
        case "searchdatabase": tt_gaid = "UA-4783561-1"; tt_bdid = "2c0b172cf7b4e1722c1b7559106fc49d"; break;
        case "searchdatacenter": tt_gaid = "UA-4783595-1"; tt_bdid = "ab6a1cd58feec37dac792a9ccdbeae70"; break;
        case "searchnetworking": tt_gaid = "UA-4783577-1"; tt_bdid = "53a3cb8eb17b0e0fb59d80a4735ed88f"; break;
        case "searchsecurity": tt_gaid = "UA-3431777-1"; tt_bdid = "8d54b1bd612403361db7d1918b98780e"; break;
        case "searchsmb": tt_gaid = "UA-16408122-1"; tt_bdid = "64869e7f7d47d719a4136da707bae9c6"; break;
        case "searchsoa": tt_gaid = "UA-3431778-1"; tt_bdid = "eaee1fccf41e86a987664a9b2d44d3d0"; break;
        case "searchstorage": tt_gaid = "UA-3397522-1"; tt_bdid = "7a50e0b0aa385bf70d51e38f4739f3cf"; break;
        case "searchsv": tt_gaid = "UA-3943252-1"; tt_bdid = "e7ba68ac5709d08d96213ad96646504c"; break;
        case "searchvirtual": tt_gaid = "UA-9032874-1"; tt_bdid = "36295087b8a622602c38ee81a25b1379"; break;
    }
    if (!tt_gaid) return;
    var exceptions = /proxy.html|port.aspx|\/tar\/|\/default.aspx|\/default.htm/;
    if (exceptions.test(location.pathname.toLowerCase())) return;
    var ismicrosite = (location.pathname.toLowerCase().indexOf("/microsites/") >= 0 && location.pathname.split('/').length > 3) ||
       (location.pathname.split('/').length == 3 && /^\/2\d{3}.*/.test(location.pathname.toLowerCase()));
    var micrositename = "";
    if (ismicrosite) {
        var mch = location.pathname.match(/\/(\d{4}[^\/]*)\//);
        if (mch && mch.length == 2) micrositename = mch[1];
    }
    //techtarget.com
    if (tt_track_config.tt && document.cookie.match(/tt_ud=(\d*)/)) {
        var contentType = "article";
        var regCID = location.pathname.match(/showcontent_(\d*)/);
        if (location.pathname.toLowerCase().indexOf("whitepaper") >= 0) {
            contentType = "whitepaper";
            regCID = location.pathname.match(/whitepaper\/content_(\d*)/i);
        }
        else if (location.pathname.toLowerCase().indexOf("/guide/") >= 0) {
            contentType = "guide";
            regCID = decodeURIComponent($("a[href*='download.aspx']").attr("href")).match(/fileid=(\d*)/i);
        }
        else if (location.pathname.toLowerCase().indexOf("/topic/") >= 0) {
            contentType = "topicpage";
            regCID = $("iframe[src*='topicid=']").attr("src").match(/topicid=(\d*)/i);
        }
        else if (location.pathname.toLowerCase().indexOf("/ezine/") >= 0) {
            contentType = "ezine";
            regCID = location.pathname.match(/_(\d*)/i);
        }
        else if (location.pathname.toLowerCase().indexOf("/software/") >= 0) {
            contentType = "software";
            regCID = location.pathname.match(/_(\d*)/i);
        }
        else if (location.pathname.toLowerCase().indexOf("/book/ex") >= 0) {
            contentType = "book";
            regCID = location.pathname.match(/book\/excerpt_(\d*)/i);
        }
        else if (ismicrosite) {
            contentType = "microsite";
            regCID = $("img[src*='promotionstat']").size() > 0 ? ($("img[src*='promotionstat']").attr("src").toLowerCase() || "").match(/info=([^&]*)[&|$]?/) :
            ($("img[src*='cookies.aspx']").size() > 0 ? ($("img[src*='cookies.aspx']").attr("src").toLowerCase() || "").match(/title=([^&]*)[&|$]?/) : []);
        }
        var contentID = '';
        if (regCID && regCID.length > 1) {
            contentID = regCID[1];
            if (typeof jQuery == "function")
                $.ajax({ url: "http://img.techtarget.com.cn/jsonhandler/gettopicid.ashx",
                    data: "contentType=" + contentType + "&contentID=" + contentID,
                    dataType: "jsonp",
                    success: function (r) {
                        if (r && /t[1-9]/.test(r)) {
                            var aiImg = $('<img alt="" src="http://go.techtarget.com/activity/activity.gif?activityTypeId=26' + r + '&u=' + document.cookie.match(/\w*tt_ud=(\d*)\w*/)[1] + '&type=' + contentType + '&r=' + new Date().getTime() + '"/>');
                            $("body").append(aiImg);
                        }
                    }
                });
        }
    }
    //add bdshare sider
    function getwbid() {
        var wbid = "1684793947";
        var ak = '';
        if (site && site.length == 2)
            switch (site[1].toLowerCase()) {
            case "cloudcomputing": wbid = 1679416922; ak = "2274670749"; break;
            case "virtual": wbid = 1679379971; ak = "227782863"; break;
            case "bi": wbid = 2685263633; break;
            case "cio": wbid = 1679402765; ak = "1416725727"; break;
            case "database": wbid = 1679367883; ak = "2314511217"; break;
            case "storage": wbid = 1679374001; ak = "3046610063"; break;
            case "sv": wbid = 1679373257; ak = "1255846622"; break;
            case "datacenter": wbid = 1679418382; ak = "3036348463"; break;
            case "networking": wbid = 1679363973; break;
            case "security": wbid = 1679366863; ak = "1208116543"; break;
            case "soa": wbid = 1679362424; break;
            case "smb": wbid = 1809476093; break;
        }
        return { wbid: wbid, ak: ak };
    }
    if (location.pathname.toLowerCase().indexOf("/guide/") >= 0 || location.pathname.toLowerCase().indexOf("/qa/question_") >= 0 || ismicrosite) {
        if (tt_track_config.bdShare) {
            var site = location.host.match(/search([a-z]*).com.cn/i);
            var conf = getwbid(site);
            window._bd_share_config = { "common": { "bdSnsKey": { "tsina": conf.ak || "424519446", "tqq": "101030480" }, "bdText": "", "bdMini": "1", "bdMiniList": false, "bdPic": "", "bdStyle": "0", "bdSize": "16" }, "slide": { "type": "slide", "bdImg": "8", "bdPos": "right", "bdTop": "200" }}; with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
        }
        if (ismicrosite) {
            $("a[href!='#']").click(function () { _gaq.push(['_trackEvent', 'MicrositesClicks_' + micrositename, $(this).attr("href"), $.trim($(this).text()), 1]); });
            $("div.video").each(function (i) {
                $(this).click(function () {
                    if (window._hmt) {
                        window._hmt.push(['_trackEvent', 'VideoClick_' + micrositename, micrositename + "_" + (i + 1), location.href, i]);
                    }
                });
            });
        }
    }
    if ($("script[src*='google.js']").size() > 0) return;
    //google
    if (tt_track_config.ga) {
        _gaq.push(['_setAccount', tt_gaid]);
        if (document.cookie.match(/\w*tt_ud=(\d*)\w*/))
            _gaq.push(['_setCustomVar', 2, document.cookie.match(/\w*tt_ud=(\d*)\w*/)[1], "tt_ud", 3]);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }
    //img_focus/text_link click
    $(".ctleft .leadStory ul li a,.ctright .rightad2 ul li a").click(function () {
        _gaq.push(['_trackEvent', 'IndexClicks_' + ($(this).parents(".ctleft").size() > 0 ? "Img_Focus" : "Text_Link"), $.trim($(this).text()) || $(this).attr("title"), $(this).attr("href"),1]);
    });
    if (contentType == "whitepaper" && contentID - 0 > 0) {//WhitePaper download button click
        $(".downall a").click(function () {
            _gaq.push(['_trackEvent', 'WpDownloadClick', document.title, contentID]);
        });
    }
    //baidu
    if (tt_track_config.bd) {
        var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = _bdhmProtocol + "hm.baidu.com/h.js?" + tt_bdid;
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }
})();