(function() {
    function isFlashEnabled() {
        try {
            //IE
            var swf1 = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            return true;
        } catch (e) {
            try {
                //FireFox,Chrome
                var swf2 = navigator.plugins["Shockwave Flash"];
                if (swf2 == undefined) {
                    return false;
                } else {
                    return true;
                }
            } catch (ee) {
                return false;
            }
        }
    }
    var urlDomain = function() {
        var url = window.location.href;
        var urlAbsolute;

        if (url.indexOf('localhost') > -1 || url.indexOf('127.0.0.1') > -1) {
            urlAbsolute = 'http://127.0.0.1:12688/aliyun/plugins/0.2.9/';
        } else if (url.indexOf('aliyun.test') > -1) {
            urlAbsolute = 'http://g.assets.daily.taobao.net/aliyun/plugins/0.2.9/';
        } else if (url.indexOf('aliyun.com') > -1) {
            urlAbsolute = 'http://g.tbcdn.cn/aliyun/plugins/0.2.9/';
        } else {
            urlAbsolute = '';
        }
        return urlAbsolute;
    };
    var appendFlash = function(jq, swfHtml, url, dataGA) {
        var swfDom = jq('<div id="J_Logo_Swf"></div>');
        var isIE6 = /msie 6/i.test(navigator.userAgent);
        if (!isIE6) {

            swfDom.html(swfHtml);
            var logo = jq('#J_logo');
            logo.after(swfDom);
            logo.attr('href', url);
            logo.attr('target', '_blank');
            logo.attr('data-ga', dataGA);
            logo.css('display', "inline-block");
            logo.css('width', 230);
            logo.css('z-index', 3000);
            logo.html('');
            swfDom.css('display', "block");
            swfDom.css('position', 'absolute');
            swfDom.css('left', '0');
            swfDom.css('top', '0');
        }
    };
    var showFlash = function(url, width, height, dataGA) {
        if (!isFlashEnabled()) {
            return;
        }
        var swfUrl = urlDomain() + "js/logo/logo-0yg.swf";
        var swfHtml = '<object style="position:absolute;left:0;right:0;" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + width + '" height="' + height + '">' + '<param name="movie" value="' + swfUrl + '">' + '<param name="quality" value="high">' + '<param name="wmode" value="transparent"><param name="scale" value="noscale">' + '<embed src="' + swfUrl + '" width="' + width + '" height="' + height + '" scale="noscale" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"></embed>' + '</object>';

        if (window.KISSY) {
            KISSY.ready(function(S) {
                KISSY.use('dom', function(S, DOM) {
                    appendFlash(S.all, swfHtml, url, dataGA);
                });
            });
        } else if (window.jQuery) {
            jQuery(document).ready(function() {
                appendFlash(jQuery, swfHtml, url, dataGA);
            });
        }
    };

    var location = window.location;
    if (location.host + location.pathname == 'www.aliyun.com/') {
        showFlash('http://free.aliyun.com', '230', '62', '0元购.首页.flash');
    }
})();