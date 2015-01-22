function getCookie(name) {
    var r = document.cookie.match('\\b' + name + '=([^;]*)\\b');
    return r ? r[1] : undefined;
}
function isWxid(wxid) {
    if (wxid.length <= 5) {
        return false;
    }
    var filter = /^([a-zA-Z0-9_-])+$/;
    if (filter.test(wxid)) return true;
    else return false;
}
function checkWeiboImage(url) {
    return(url.match(/^http:\/\/ww[0-9]\.sinaimg\.cn\/.*\.(jpg|gif)$/) != null);
}

function checkEssayLink(link) {
    return(link.match(/^http:\/\/mp\.weixin\.qq\.com\/.*/) != null || link.match(/^http:\/\/admin\.wechat\.com\/.*/) != null);
}
function recordOutboundLink(link, category, action) {
    try {
        var pageTracker=_gat._getTracker("UA-40292976-1");
        pageTracker._trackEvent(category, action);
    } catch(err) {}
}
