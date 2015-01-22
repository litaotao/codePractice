/* iframe cross domain*/
$(document).ready(function () {
    $.cookie("LoginState", "");
    var url = decodeURIComponent(QueryString("url"));
    if (url && url != "null") {
        window.top.document.location.href = url;
    }
    if (QueryString("reload") == "1")
        window.top.location.reload();
    if (QueryString("login") == "1") {
        $.cookie("ActivationState", "yes", { path: "/" });
        GetLogin(true);
    }
    if (QueryString("logout") == "1") {
        $("body").append("<iframe width='0' height='0' frameborder='0' src='/member/logout.aspx'></iframe>");
    }
    $(window.top.document).find("#" + QueryString("frame")).attr("height", QueryString("height")).css({ height: QueryString("height") + "px" });

    if (QueryString("wbname")) {
        var pwin = window.parent.parent;
        pwin.wbname = decodeURI(QueryString("wbname"));
        if (pwin.wbname) {
            $(pwin.document).find("#wb_pub").attr("checked", "checked");
            $(pwin.document).find("#wb_checkbox").show();
            if (!$(pwin.document).find("#CurUser").text()) $(pwin.document).find("#useCur").show();
            $(pwin.document).find("#p_Logion").slideUp(pwin.AutoHeight);
        }
        else {
            $(pwin.document).find("#wb_checkbox").hide();
            $(pwin.document).find("#useCur").hide();
            $(pwin.document).find("#p_Logion").slideDown(pwin.AutoHeight);
        }
    }
    if (QueryString("content")) {
        $("body").html("<pre>" + decodeURIComponent(QueryString("content")) + "</pre>");
    }
    if (QueryString("article")) {
        window.parent.parent.tb_show("", "http://img.techtarget.com.cn/ad/infocenter/ttc201407026_article.html?TB_iframe=1&border=green&width=945&height=480&article=" + QueryString("article"), false);
    }
    //    var func = QueryString("func");
    //    if (func && func != "null") {
    //        $.cookie("TechTarget", "CookiesTicket=" + QueryString("uid") + ",");
    //        window.top.myfunc(QueryString("pa"));
    //    }
});