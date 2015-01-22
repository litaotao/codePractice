var _footerShareTop = -1;

$(document).ready(function () {
    _hmt.push(['_trackEvent', 'articleheader', 'show', 'header']);

    if ($("#article-inner .page-content").height() > 2500) {
        $("#article-inner .page-content").css("cssText", "height: 2000px; overflow: hidden;");
        $("#read_all").show();

        $("#read_all").bind("click", function () {
            $("#article-inner .page-content").css("cssText", "");
            $("#read_all").hide();
        });
    }

    $("img[data-src]").each(function(i, e) {
        if ($(e).attr("src") == undefined || $(e).attr("src") == '') {
            if ($(e).attr("data-src").indexOf("photo.store.qq.com") < 0) {
                $(e).attr("src", $(e).attr("data-src"));
            }
        }
    }); 
    
//    $("img[original]").each(function (i, e) {
//        if ($(e).attr("data-s") != undefined || $(e).attr("data-ratio") != undefined) {
//            $(e).attr("style", null);
//        }
//    });

    $(".page-content .innertext img").bind('load', function () {
        if ($(this).width() < 150) {
            $(this).css("margin-bottom", "0");
            $(this).css("display", "inline-block");
        } else {
            if ($(this).height() > 0 && $(this).width() > 300 && $(this).width() / $(this).height() >= 5) {
                $(this).css("cssText", "width:100%;max-width:100% !important;");
            }

            $(this).css("margin", "15px auto");
            $(this).css("display", "block");
            $(this).css("float", "none");
        }
    }).each(function () {
        if (this.complete) $(this).load();
    });

    $(window).bind("scroll", function () {

        if ($(".sub .left").height() < $(".sub .right").height() + 300) {
            $(".sub .left").height($(".sub .right").height() + 300);
        }

        if ($("#right_other_list").length > 0 && $("#right_other_list").height() < 10) {
            var offsetSide0 = $(document).scrollTop() - $(".side-fixed").position().top;

            if ($(".msg-main .side-fixed").length > 0) {
                offsetSide0 = offsetSide0 - $(".msg-main").position().top;
            }

            if (offsetSide0 > 0) {
                $("#right_other_list").animate({ height: $("#right_other_list .right-side").height() + 15 }, "slow");
            }
        }

        if ($(".right-side .user-head .clear").length > 0) {
            var offsetSide = $(document).scrollTop() - $(".right-side .user-head .clear").position().top;

            var $article_left_userinfo = $(".article-side-userinfo");
            if (offsetSide > 0) {
                if ($article_left_userinfo.is(":hidden") && $(window).width() >= 1260) {
                    $article_left_userinfo.show();
                }
            } else {
                if (!$article_left_userinfo.is(":hidden")) {
                    $article_left_userinfo.hide();
                }
            }
        }

        if (_footerShareTop <= 0) {

            _footerShareTop = $(document).scrollTop() + $(window).height() - $("#footer_comment").position().top;

            if (_footerShareTop > 0) {
                _hmt.push(['_trackEvent', 'articlefooter', 'show', 'footer']);
            }
        }
    });

    $(".vote_iframe").attr("src", "http://mp.weixin.qq.com" + $(".vote_iframe").attr("data-display-src"));

    if ($(".video_iframe").length > 0) {
        $(".video_iframe").each(function (i, v) {
            var src = $(v).attr("src");

            if (src == undefined || src == "") {
                var org = $(v).attr("original") || $(v).attr("data-src");

                if (org != null) {
                    $(v).attr("src", org);
                }
            }
        });
    }

    viewplaceholder("footer_panel");
});

var viewplaceholder = function (placeholderId) {
    var placeholder = document.getElementById(placeholderId);

    if (!placeholder) return;

    var url = placeholder.getAttribute("src");

    if (!url || url == "") {
        return;
    }

    placeholder.innerHTML = '<br/><br/><iframe src="' + url + '" width="100%" height="2px" frameborder="0" scrolling="no" marginheight="0"/>';
};