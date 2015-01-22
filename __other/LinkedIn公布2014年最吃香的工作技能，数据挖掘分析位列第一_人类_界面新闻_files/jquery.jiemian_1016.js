/**
 * Created by 鑫 on 2014/8/26.
 */
(function () {
    if (!/*@cc_on!@*/0)return;
    var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,figcaption,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','), i = e.length;
    while (i--) {
        document.createElement(e[i])
    }
})()
//back
var scrolltotop = {
    setting: {
        startline: 100,
        scrollto: 0,
        scrollduration: 1e3,
        fadeduration: [500, 100]
    },
    controlHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAIAAAC1w6d9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGOTFEMzVDMzI0NUMxMUU0ODQ1QUQ2QzFDOTkxMkU2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGOTFEMzVDNDI0NUMxMUU0ODQ1QUQ2QzFDOTkxMkU2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY4QjhBQzJBMjQ1QzExRTQ4NDVBRDZDMUM5OTEyRTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY4QjhBQzJCMjQ1QzExRTQ4NDVBRDZDMUM5OTEyRTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+F3zuqAAAAcpJREFUeNrs2NtugkAQBuDlYD0XL1iaqCja93+Q+hJFUYN6pyAQEPoL1rZpUw9oy8VsYhwN4pd/ZtdE4WU0YoVcIivqIhnJSEYykpGMZCQjWbGWfJO7PJRKKuca5+v1ejyZ7Ha7QsjK5XK/12u1WqhVVY2TxLKs/Li8sgpY/b6iKMd3kBwDbjrNics1Z5VKxTCMjOUHgW3bcRyj5pzr3a4kSf+TWcZ6bDZRB0FgmqbjOPChs4IgAMcEwcLMpda/k1WrVbCajUbGejVNzD7q1WoFVk/X9zhVzdNW+TrWwDAa31hYSZIsl0sUBxznCWPTq3ByHpbv+2BtNpvPFwC3WCzwpOu6KIpPmiYwdkVyl8lqtRpY9Xod9dbzstn68cpFmlyG0zQNyc1msyiK7rI3wRoOBgfWdvsL64hDH7PdiuS6nc5Fu/XczABCWsB9sFz35KdstJWxDk6QNDl2SVtPy9AOTBXOAkwYXrqua47H7hmsL7g0sAw3n8/DKMI45u0mQM/DYcYKw3BiWeezjjicJodfCE1rt9slWb5BZtj84fvk7s9S37/ioNk4juJ5kiwL6Q3xOP299P8ZyUhGMpKRjGQkIxnJSHan9SbAAAqT5edW01qPAAAAAElFTkSuQmCC" />',
    controlattrs: {
        offsetx: 10,
        offsety: 120
    },
    anchorkeyword: "#top",
    state: {
        isvisible: !1,
        shouldvisible: !1
    },
    scrollup: function() {
        this.cssfixedsupport || this.$control.css({
            opacity: 0
        });
        var a = isNaN(this.setting.scrollto) ? this.setting.scrollto: parseInt(this.setting.scrollto);
        a = "string" == typeof a && 1 == jQuery("#" + a).length ? jQuery("#" + a).offset().top: 0,
            this.$body.animate({
                    scrollTop: a
                },
                this.setting.scrollduration)
    },
    keepfixed: function() {
        var a = jQuery(window),
            b = a.scrollLeft() + a.width() - this.$control.width() - this.controlattrs.offsetx,
            c = a.scrollTop() + a.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({
            left: b + "px",
            top: c + "px"
        })
    },
    togglecontrol: function() {
        var a = jQuery(window).scrollTop();
        this.cssfixedsupport || this.keepfixed(),
            this.state.shouldvisible = a >= this.setting.startline ? !0 : !1,
            this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().animate({
                    opacity: 1
                },
                this.setting.fadeduration[0]), this.state.isvisible = !0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().animate({
                    opacity: 0
                },
                this.setting.fadeduration[1]), this.state.isvisible = !1)
    },
    init: function() {
        jQuery(document).ready(function(a) {
            var b = scrolltotop,
                c = document.all;
            w = $('.content-inner').width()/2;
            w2 = $(window).width()/2;
            if( w2 - w < 50){
                w = w -50
            }
            b.cssfixedsupport = !c || c && "CSS1Compat" == document.compatMode && window.XMLHttpRequest,
                b.$body = window.opera ? "CSS1Compat" == document.compatMode ? a("html") : a("body") : a("html,body"),
                b.$control = a('<div id="topcontrol">' + b.controlHTML + "</div>").css({
                    position: b.cssfixedsupport ? "fixed": "absolute",
                    bottom: b.controlattrs.offsety,
                    left: '50%',
                    marginLeft:w,
                    opacity: 0,
                    cursor: "pointer",
                    "z-index": 9
                }).attr({
                    title: "\u8fd4\u56de\u9876\u90e8"
                }).click(function() {
                    return b.scrollup(),
                        !1
//                    $('body,html').animate({scrollTop:0},0)
                }).appendTo("body"),
            document.all && !window.XMLHttpRequest && "" != b.$control.text() && b.$control.css({
                width: b.$control.width()
            }),
                b.togglecontrol(),
                a('a[href="' + b.anchorkeyword + '"]').click(function() {
                    return b.scrollup(),
                        !1
                }),
                a(window).bind("scroll resize",
                    function() {
                        b.togglecontrol()
                    })
        })
    }
};
scrolltotop.init();
//插入
function include_js(path)
{
    var sobj = document.createElement('script');
    sobj.type = "text/javascript";
//    sobj.src = 'http://img1.jm.lan/static/jmw/js/'+path;
    sobj.src = 'http://img.jiemian.com/static/jmw/js/'+path;
    var headobj = document.getElementsByTagName('head')[0];
    headobj.appendChild(sobj);
}
function include_plugins(path)
{
    var sobj = document.createElement('script');
    sobj.type = "text/javascript";
//    sobj.src = 'http://img1.jm.lan/static/jmw/plugins/'+path;
    sobj.src = 'http://img.jiemian.com/static/jmw/plugins/'+path;
    var headobj = document.getElementsByTagName('head')[0];
    headobj.appendChild(sobj);
}
function include_css(path)
{
    var fileref=document.createElement("link")
    fileref.rel = "stylesheet";
    fileref.type = "text/css";
//    fileref.href = 'http://img1.jm.lan/static/jmw'+path;
    fileref.href = 'http://img.jiemian.com/static/jmw'+path;
    var headobj = document.getElementsByTagName('head')[0];
    headobj.appendChild(fileref);
}
//


