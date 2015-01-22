$(document).ready(function () {

    $("img[original]").lazyload({
        effect: "fadeIn",
        placeholder: "http://as0.static.imtuan.com/images/loading.gif",
        threshold: 500
    });

    $(".Search .type-tab a").bind("click", function () {
        $(".Search .type-tab a.on").removeClass("on");
        $(this).addClass("on");

        var type = $(this).attr("data-type");

        if (type == "biaoqing") {
            $(".Search form").attr("action", "/biaoqing/s");
            //$(".Search form").attr("target", null);
            $(".Search form .inpus").attr("placeholder", "请输入表情名称或分类");
        } else if (type == "mp") {
            $(".Search form").attr("action", "/home/s");
            //$(".Search form").attr("target", null);
            $(".Search form .inpus").attr("placeholder", "请输入微信号或微信名称");
        } else {
            $(".Search form").attr("action", "/yuedu/s"); //"http://www.baidu.com/s");
            //$(".Search form").attr("target", "_blank");
            $(".Search form .inpus").attr("placeholder", "请输入关键字或作者名字");
        }
    });

    $("#sort_type_select").change(function () {
        location.href = $("#sort_type_select").attr("data-curhref") + "&sort=" + $("#sort_type_select option:selected").val();
    });

    $(window).bind("scroll", function () {
        if ($(".side-fixed").length > 0) {
            var offsetSide = $(document).scrollTop() - $(".side-fixed").position().top;

            if ($(".msg-main .side-fixed").length > 0) {
                offsetSide = offsetSide - $(".msg-main").position().top;
            }

            if (offsetSide < 0) {
                $(".side-fixed>div").css("position", "static");

                if ($("#delayblock").length > 0 && !$("#delayblock").is(":hidden")) {
                    $("#delayblock").animate({ height: 1 }, "fast", function () {
                        $("#delayblock").hide();
                    });
                }
            } else {
                $(".side-fixed").height($(".side-fixed>div").height());
                $(".side-fixed>div").css("position", "fixed");

                if ($("#delayblock").length > 0 && $("#delayblock").is(":hidden")) {
                    $("#delayblock").show();
                    $("#delayblock").animate({ height: $("#delayblock .iBOX").height() + 15 }, "fast");
                }

                var baseHeight = $("body>div.footer").length > 0 ? ($("body>div.footer").position().top - $(document).scrollTop()) : ($("body").height() - $(document).scrollTop());
                var footerTop = baseHeight - $(".side-fixed>div").height() - 110;

                if (footerTop < 0) {
                    $(".side-fixed>div").css("top", footerTop + "px");
                } else {
                    $(".side-fixed>div").css("top", "0");
                }
            }
        }

        var $rightbutton = $(".righ_button_goto");
        if ($rightbutton.length > 0) {
            if ($(document).scrollTop() > 200) {
                if ($rightbutton.is(":hidden")) {
                    $rightbutton.show();
                }
            } else {
                if (!$rightbutton.is(":hidden")) {
                    $rightbutton.hide();
                }
            }
        }
    });

    $(".subuser").bind("click", function () {
        UserSubscribe("false", this);
    });

    function UserSubscribe(iscancel, obj) {
        var userid = $("a", obj).attr("data-userid");
        var url = "http://www.aiweibang.com/asyn/usersubscribe?userid=" + userid + "&iscancel=" + iscancel;

        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                if (data.Status == 200) {
                    if (iscancel == "true") {
                        $(".subuser", $(obj).parent()).removeClass("undis");
                        $(".subcancel", $(obj).parent()).addClass("undis");
                    } else {
                        $(".subuser", $(obj).parent()).addClass("undis");
                        $(".subcancel", $(obj).parent()).removeClass("undis");
                    }
                } else {
                    alert(data.Message);

                    if (data.Status == 403) {
                        location.href = "http://u.aiweibang.com/account/login";
                    }
                }
            }
        }).fail(function () {
            alert("获取信息失败");
        });
    }

    $(".favarticle").bind("click", function () {
        ArticleFav("false", this);
    });

    function ArticleFav(iscancel, obj) {
        var articleid = $(obj).attr("data-articleid") ? $(obj).attr("data-articleid") : $("a", obj).attr("data-articleid");
        var url = "http://www.aiweibang.com/asyn/articlefav?articleid=" + articleid + "&iscancel=" + iscancel;

        $.ajax({
            url: url,
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                if (data.Status == 200) {
                    if (iscancel == "true") {
                        $(".favarticle", $(obj).parent()).removeClass("undis");
                        $(".unfavarticle", $(obj).parent()).addClass("undis");
                    } else {
                        $(".favarticle", $(obj).parent()).addClass("undis");
                        $(".unfavarticle", $(obj).parent()).removeClass("undis");
                    }
                } else {
                    alert(data.Message);

                    if (data.Status == 403) {
                        location.href = "http://u.aiweibang.com/account/login";
                    }
                }
            }
        }).fail(function () {
            alert("获取信息失败");
        });
    }
});