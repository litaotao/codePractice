$(document).ready(function () {
    if ($("#bdshare").size() > 0) replaceShare();
});
function replaceShare() {//替换分享到微博按钮
    if ($(".wpright_inner .col2:eq(1)").size() > 0 && $(".wpright_inner .col2:eq(1)").text().indexOf("视频") > 0 && $(".downall a").text() == "下载完整版") {
        $(".downall a").text("").css({ background: "url('/template/new/images/download3.gif') no-repeat scroll 0 0 transparent", height: "40px" });
    }
    $("#bdshare a.bds_tsina").remove();
    var ttshare = $('<iframe frameborder="0" height="37" width="37" scrolling="no"></iframe>');
    ttshare.css({ float: "left", marginRight: "3px" });
    var pics = '';
    var imgCount = 0;
    $("#maintext img").each(function () {
        if (imgCount > 9) return false;
        if (this.src && $(this).width() > 60 && $(this).height() > 60)
        { pics += this.src + "||"; imgCount++; }
    });
    if (pics) pics = pics.substr(0, pics.length - 2);
    var tit = "【" + ($.trim($(".ctleft h2,.ctleft h1,.wpleft h2,.ezinectleft h2").eq(0).text().replace(/\\n/g, '')) || document.title) + "】";
    //if ($(".article .intro p").size() == 2) tit += $.trim($(".article .intro p:eq(0)").text().replace(/\\n/g, ''));
    ttshare.attr("src", "http://img.techtarget.com.cn/weibo/share0.html?url=" + escape(location.href) + "&title=" + escape(tit) + "&pic=" + escape(pics) + "&t=" + new Date().getTime());
    $("#bdshare").prepend(ttshare);
    getQr("#bdshare");
}
function getQr(container) {
    var addLeft = true; //  $(container).parents(".wpinfo").size() > 0;
    var qrarea = $("<div title='二维码分享'></div>");
    qrarea.css({ cursor: "pointer", margin: "5px", float: "left", height: "32px", width: "32px" });
    var qrimg = $("<img height='32' src='http://img.techtarget.com.cn/template/images/component/wx.png'/>");
    qrarea.append(qrimg);
    var qrcontainer = $("<div id='qrContainer'></div>");
    qrcontainer.css({ margin: "0 auto", border: "6px solid #00a498", borderRadius: "5px" }).hide();
    var qrshow = $("<div></div>");
    qrshow.css({ textAlign: "center", paddingTop: "5px" });
    qrcontainer.append(qrshow);
    var description = $("<div style='padding-top:5px;text-align:center'>微信->发现->扫一扫->分享</div>");
    //    var description = $("<ul><li>打开微信</li><li>打开发现，点“扫一扫”</li><li>扫描左侧二维码并打开</li><li>选择分享到朋友圈</li></ul>");
    //    description.css({ float: "right", background: "url(http://img.techtarget.com.cn/template/images/component/weixin.png) no-repeat top right" });
    //    description.find("li").css({ lineHeight: "2.5em", fontSize: "14px" });
    qrcontainer.append(description);
    qrarea.append(qrcontainer);
    var shareUrl = convertUrl() || (location.href + (location.search ? "&" : "?") + "share=qr");
    if (!qrshow.html())
        loadScript("http://img.techtarget.com.cn/template/js/jquery.qrcode.min.js", function () {
            try {
                qrshow.qrcode({
                    render: "canvas",
                    size: 160,
                    text: shareUrl
                });
            }
            catch (e) {
                var lowver = $.browser.msie && parseInt($.browser.version) <= 8;
                if (lowver) {
                    qrshow.css({ margin: "0px" });
                    var img = $("<img src='https://chart.googleapis.com/chart?cht=qr&chs=160x160&choe=UTF-8&chld=L|4&chl=" + shareUrl + "' />");
                    qrshow.empty().append(img);
                    img.bind("error", function () {
                        qrarea.remove();
                    });
                }
                else {
                    qrshow.qrcode({
                        render: "table",
                        size: 160,
                        text: shareUrl
                    });
                }
            }
        });
    function QR_Click() {
        if (typeof (tb_init) != "function") { loadScript("$thickbox.js", QR_Click); return; }
        if (_gaq) _gaq.push(["_trackEvent", "QR_share", document.title, location.href]);
        tb_show("分享到微信朋友圈", "?TB_inline&inlineId=qrContainer&border=green&width=200&height=200", false);
    }
    qrarea.bind("click", QR_Click);
    addLeft ? $(container).prepend(qrarea) : $(container).append(qrarea);
}
function convertUrl(url) {
    //if ((location.host + location.pathname).toLowerCase().indexOf("www.searchbi.com.cn/showcontent") == 0) return "";
    var reg = /.*\/showcontent_([0-9]+)\.htm.*/;

    var match = location.href.toLowerCase().match(reg);
    if (match) {
        return "http://img.techtarget.com.cn/app/article.html?device=wx&duid=web&cid=" + match[1];
    }
    return "";
}
function addShare(container, share, types) {
    share = $.extend({ height: "37px", css: {}, url: "http://www.techtarget.com.cn/", title: "来自TechTarget中国的优质内容", pic: "", icon: "", summary: "" }, share);
    types = types || ["s", "q", "t"];
    for (var i in types) {
        var url;
        switch (types[i]) {
            case "s": url = "http://img.techtarget.com.cn/weibo/share0.html"; break;
            case "q": url = "http://img.techtarget.com.cn/qq/share.html"; break;
            case "t": url = "http://img.techtarget.com.cn/qq/sharet.html"; break;
        }
        var newshare = $('<iframe frameborder="0" height="' + share.height + '" width="' + share.height + '" scrolling="no"></iframe>');
        newshare.css(share.css);
        newshare.attr("src", url + "?url=" + escape(share.url) + "&title=" + escape(share.title) + "&pic=" + escape(share.pic) + "&summary=" + escape(share.summary) + "&icon=" + share.icon);
        $(container).append(newshare);
    }
}
//for ibm banner
if (QueryString("pop") == "1") {
    tb_show("", "http://img.techtarget.com.cn/ad/infocenter/ttc201407026_article.html?TB_iframe=1&border=green&width=945&height=480&article=" + location.pathname.match(/_(\d+).htm/)[1], false);
}