$.extend({
    InitCss: function(options, o) {
        var defaults = { "z-index": "6666", top: "50%", left: "50%", position: "fixed", "margin-left": "-100px", "margin-top": "-50px" }
        var settings = $.extend(defaults, options); $("#" + o).css(settings);
        if (document.all) {
            $("#" + o).css("position", "absolute"); location.href = location.href.search(/\?/) > 0 ? location.href.substring(0, location.href.indexOf('#')) : location.href + "#";
        }
    },
    IninBox: function(o, x) {
        var _box = $('#' + o), $w = -_box.width() / 2 + "px", $h = -_box.height() / 2 + "px";
        $.InitCss({ "margin-left": $w, "margin-top": $h }, o)
        if (x != undefined && $("body").find("#WindowBg").html() == null) {
            var boxBgDom = "<div id=\"WindowBg\" style=\"position:absolute;background:#000;filter:alpha(opacity=10);opacity:0.2;width:100%;left:0;top:0;z-index:222;border:none\"><iframe src=\"about:blank\" style=\"width:100%;height:" + $(document).height() + "px;filter:alpha(opacity=10);opacity:0.2;scrolling=no;z-index:333;border:none\"></iframe></div>"
            $("body").append(boxBgDom);
        }
    },
    closeBox: function(o, x) { $('#' + o).fadeOut(); if (x != undefined) { $("#WindowBg").hide("450").remove(); }; },
    openBox: function(o, x) { $.IninBox(o, x); $('#' + o).fadeIn(); }
});