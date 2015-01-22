$(function () {
    $.widgetManager();
});

$(window).load(function () {
    var drt = $("div.returnTop");
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop(),
            winHeight = 0;
        scrollTop > 0 ? drt.fadeIn("fast") : drt.fadeOut("fast");
        // HACK IE6
        if (!-[1, ] && !window.XMLHttpRequest) {
            winHeight = $(window).height();
            $("div.returnTop").css("top", scrollTopNum + winHeight - 200);
        }
    });

    drt.click(function () {
        $("html, body").animate({ scrollTop: 0 }, 100);
    });

    var ci = 1;
    $('.luacode').each(function () {
        var eid = "luacode_" + ci;
        $(this).attr("id", eid);
        var ebid = eid + "_btn";
        var erid = eid + "_ret";
        $(this).append("<div class='luacode_action'><button action='0' ci='" + ci + "' id='" + ebid + "' type='button'>运行代码</button><span class='luacode_ret' id='" + erid + "'></span></div>");
        $('#' + eid + ' .container .line').each(function () {
            $(this).attr("contentEditable", "true");
        });
        $('#' + ebid).click(function () {
            if ($(this).attr("action") == 1) {
                return;
            }
            $(this).attr("action", "1");
            $(this).css("background-color", "#EEEEEE");
            var ci = $(this).attr("ci");
            var erlstr = [];
            $('#luacode_' + ci + ' .container .line').each(function () {
                erlstr.push($.trim($(this).text()));
            });
            var data = { "lua_str": erlstr.join(" ") };
            $.ajax({
                type: "get",
                async: false,
                url: "http://genfsm.herokuapp.com/lua/",
                dataType: "jsonp",
                jsonp: "callback",
                data: data,
                success: function (rs) {
                    var erid = "#luacode_" + ci + "_ret";
                    var ebid = "#luacode_" + ci + "_btn";
                    var erl_ret = rs.result == 1 ? rs.value : "Parse Error!";
                    $(erid).html(erl_ret);
                    $(ebid).css("background-color", "#FFFFFF");
                    $(ebid).attr("action", "0");
                }
            });
        });
        ci++;
    });

    $('.luacode .syntaxhighlighter').each(function () {
        $(this).attr("title", "代码可编辑");
    });
});
