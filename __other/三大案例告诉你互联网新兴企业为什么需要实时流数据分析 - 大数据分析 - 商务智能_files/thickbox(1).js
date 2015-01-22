/*
* Thickbox 3.1 - One Box To Rule Them All.
* By Cody Lindley (http://www.codylindley.com)
* Copyright (c) 2007 cody lindley
* Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
var thickbox_baseurl = "http://img.techtarget.com.cn/template";
var tb_pathToImage = thickbox_baseurl + "/images/component/loadingAnimation.gif";

var options = {};
/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/
var imgLoader = new Image(); // preload image
imgLoader.src = tb_pathToImage;
//on page load call tb_init
$(document).ready(function () {
    tb_init('a.thickbox, area.thickbox, input.thickbox'); //pass where to apply thickbox    
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk) {
    $(domChunk).bind("click", function () {
        var t = this.title || this.name || null;
        var a = this.href || this.alt;
        var g = this.rel || false;
        options = $.extend(options, eval("(" + $(this).attr("option") + ")") || {});
        if (options.clear) options = {};
        tb_show(t, a, g);
        this.blur();
        return false;
    });
}
function tbwin_option() {
    if (options.target) {
        var tartop = options.target.offset().top;
        var tarleft = options.target.offset().left;
        var tarheight = options.target.height();
        var tarwidth = options.target.width();
        var tbwintop = $("#TB_window").css("top");
        var tbwinleft = $("#TB_window").css("left");
        var tbwinheight = $("#TB_window").height();
        var tbwinwidth = $("#TB_window").width();
        if (options.position) {
            switch (options.position) {
                case "down":
                    tbwintop = tartop + tarheight + 3;
                    tbwinleft = tarleft;
                    break;
                case "right":
                    tbwintop = tartop;
                    tbwinleft = tarleft + tarwidth + 3;
                    break;
            }
            if (tbwintop + tbwinheight > $(document).height())
                if (tbwintop > tbwinheight)
                    tbwintop -= (options.position == "down" ? tarheight : 0) + 10 + tbwinheight;
                else tbwintop = $(document).height() - tbwinheight - 10;
            if (tbwinleft + tbwinwidth > $(document).width())
                tbwinleft = $(document).width() - tbwinwidth - 10;

            $("#TB_window").css({ position: "absolute", top: tbwintop, left: tbwinleft, marginLeft: "0px", marginTop: "0px" });
        }
        $("#TB_window " + options.closeAndReturn).bind("click", function () {
            options.target.val($(this).attr("val"));
            $("#TB_closeWindowButton").trigger("click");
        });
    }

}
function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link
    try {
        if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
            $("body", "html").css({ height: "100%", width: "100%" });
            $("html").css("overflow", "hidden");
            if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
                $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").bind("click", tb_remove);
            }
        } else {//all others
            if (document.getElementById("TB_overlay") === null) {
                $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
                $("#TB_overlay").bind("click", tb_remove);
            }
        }
        if (options.disoverlay) $("#TB_overlay").remove();
        if (tb_detectMacXFF()) {
            $("#TB_overlay").addClass("TB_overlayMacFFBGHack"); //use png overlay so hide flash
        } else {
            $("#TB_overlay").addClass("TB_overlayBG"); //use background and opacity
        }

        if (caption === null) { caption = ""; }
        $("body").append("<div id='TB_load'><img src='" + imgLoader.src + "' /></div>"); //add loader to the page
        if (!options.noloading) $('#TB_load').show(); //show loader

        var queryString = url.replace(/^[^\?]+\??/, '');
        var params = tb_parseQuery(queryString);
        if (params["border"] == "green" || (options.border && options.border == "green")) {//border参数为green时显示绿色边框
            $('#TB_window').css({ borderRadius: '5px', border: '6px solid #00A498' });
        }
        url = url.replace(/(\d+;\w)\?/, "$1###");
        var baseURL;
        if (url.indexOf("?") !== -1) { //ff there is a query string involved
            baseURL = url.substr(0, url.indexOf("?"));
        } else {
            baseURL = url;
        }
        if (baseURL.indexOf("###") > 0) options.noquery = true;
        var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
        var urlType = baseURL.toLowerCase().match(urlString);
        if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') {//code to show images
            TB_PrevCaption = "";
            TB_PrevURL = "";
            TB_PrevHTML = "";
            TB_NextCaption = "";
            TB_NextURL = "";
            TB_NextHTML = "";
            TB_imageCount = "";
            TB_FoundURL = false;
            if (imageGroup) {
                TB_TempArray = $("a[rel=" + imageGroup + "]").get();
                for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
                    var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
                    if (!(TB_TempArray[TB_Counter].href == url)) {
                        if (TB_FoundURL) {
                            TB_NextCaption = TB_TempArray[TB_Counter].title;
                            TB_NextURL = TB_TempArray[TB_Counter].href;
                            TB_NextHTML = "<span id='TB_next'><img src='" + thickbox_baseurl + "/images/component/right.png' height='13' title='下一个'/></span>";
                        } else {
                            TB_PrevCaption = TB_TempArray[TB_Counter].title;
                            TB_PrevURL = TB_TempArray[TB_Counter].href;
                            TB_PrevHTML = "<span id='TB_prev'><img src='" + thickbox_baseurl + "/images/component/left.png' height='13' title='上一个'/></span>";
                        }
                    } else {
                        TB_FoundURL = true;
                        TB_imageCount = (TB_Counter + 1) + " / " + (TB_TempArray.length);
                    }
                }
            }

            imgPreloader = new Image();
            imgPreloader.onload = function () {
                imgPreloader.onload = null;

                // Resizing large images - orginal by Christian Montoya edited by me.
                var pagesize = tb_getPageSize();
                var x = pagesize[0] - 150;
                var y = pagesize[1] - 150;
                var imageWidth = imgPreloader.width;
                var imageHeight = imgPreloader.height;
                if (imageWidth > x) {
                    imageHeight = imageHeight * (x / imageWidth);
                    imageWidth = x;
                    if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y;
                    }
                } else if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                    }
                }
                var appendIMG = "<a href='' id='TB_ImageOff' title='关闭'><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + caption + "'/></a>";
                if ((imageHeight != imgPreloader.height || imageWidth != imgPreloader.width) && (options.size && options.size == "full")) {
                    if (imgPreloader.width > x) imageWidth = x;
                    if (imgPreloader.height > y) imageHeight = y;
                    appendIMG = "<div style='width:" + (x + 30) + "px;height:" + (y + 30) + "px;overflow:auto'><img id='TB_Image' src='" + url + "' width='" + imgPreloader.width + "' height='" + imgPreloader.height + "' alt='" + caption + "'/></div>";
                }
                // End Resizing

                TB_WIDTH = imageWidth + 30;
                TB_HEIGHT = imageHeight + 60;
                if (caption + TB_imageCount + TB_PrevHTML + TB_NextHTML) {
                    $("#TB_window").append("<div id='TB_title'><div id='TB_caption'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title=''><img src='" + thickbox_baseurl + "/images/component/close.gif' alt='关闭'/></a></div><div id='TB_secondLine'>" + TB_PrevHTML + TB_imageCount + TB_NextHTML + "</div></div>");
                } else { TB_HEIGHT -= 27; }
                $("#TB_window").append(appendIMG);

                $("#TB_closeWindowButton").click(tb_remove);

                if (!(TB_PrevHTML === "")) {
                    function goPrev() {
                        if ($(document).unbind("click", goPrev)) { $(document).unbind("click", goPrev); }
                        $("#TB_window").remove();
                        $("body").append("<div id='TB_window'></div>");
                        tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
                        return false;
                    }
                    $("#TB_prev").click(goPrev);
                }

                if (!(TB_NextHTML === "")) {
                    function goNext() {
                        $("#TB_window").remove();
                        $("body").append("<div id='TB_window'></div>");
                        tb_show(TB_NextCaption, TB_NextURL, imageGroup);
                        return false;
                    }
                    $("#TB_next").click(goNext);

                }

                document.onkeydown = function (e) {
                    if (e == null) { // ie
                        keycode = event.keyCode;
                    } else { // mozilla
                        keycode = e.which;
                    }
                    if (keycode == 27) { // close
                        tb_remove();
                    } else if (keycode == 39) { // display previous image
                        if (!(TB_NextHTML == "")) {
                            document.onkeydown = "";
                            goNext();
                        }
                    } else if (keycode == 37) { // display next image
                        if (!(TB_PrevHTML == "")) {
                            document.onkeydown = "";
                            goPrev();
                        }
                    }
                };

                tb_position();
                $("#TB_load").remove();
                $("#TB_ImageOff").click(tb_remove);
                $("#TB_window").css({ display: "block" }); //for safari using css instead of show
            };

            imgPreloader.src = url;
        } else {//code to show html

            TB_WIDTH = (params['width'] * 1) + 30 || options.width || 428; //defaults to 630 if no paramaters were added to URL
            TB_HEIGHT = (params['height'] * 1) + 40 || options.height || 306; //defaults to 440 if no paramaters were added to URL
            if ($(window).width() < TB_WIDTH) TB_WIDTH = $(window).width() - 40;
            ajaxContentW = TB_WIDTH - 30;
            ajaxContentH = TB_HEIGHT - 45;
            if (url.indexOf('TB_iframe') != -1) {// either iframe or ajax window		
                urlNoQuery = url.split('TB_');
                $("#TB_iframeContent,#TB_title").remove();
                if (params['modal'] != "true") {//iframe no modal
                    //原$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' > </iframe>");
                    //xiejh改,通过此方法传递参数
                    $("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='关闭'><img src='" + thickbox_baseurl + "/images/component/close.gif' alt='Close'></a></div></div><iframe frameborder='0' hspace='0' src='" + (options.noquery ? baseURL.replace("###", "?") : url) + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' > </iframe>");

                } else {//iframe modal
                    $("#TB_overlay").unbind();
                    //原 $("#TB_window").append("<iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;'> </iframe>");
                    $("#TB_window").append("<iframe frameborder='0' hspace='0' src='" + url + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;'> </iframe>");
                }
                if (options.allowOpen || params['allowOpen'] == "true") {//是否允许在新窗口打开
                    var openIcon = $("<a style='cursor:pointer;margin-right:5px;line-height:11px' title='在新窗口打开'><img src='" + thickbox_baseurl + "/images/component/newopen.png'/></a>");
                    openIcon.click(function () {
                        window.open(url);
                        tb_remove();
                    });
                    $("#TB_closeAjaxWindow").prepend(openIcon);
                }
                if (options.allowFull || params['allowFull'] == "true") {//是否允许放大缩小
                    var openIcon = $("<a style='cursor:pointer;margin-right:5px;line-height:11px' title='放大'><img src='" + thickbox_baseurl + "/images/component/bigsize.png'/></a>");
                    var temww, temwh, temiw, temih;
                    openIcon.click(function () {
                        temww = TB_WIDTH, temwh = TB_HEIGHT, temiw = $("#TB_window iframe").width(), temih = $("#TB_window iframe").height();
                        TB_WIDTH = $(window).width() - 40;
                        TB_HEIGHT = $(window).height() - 40;
                        $("#TB_window iframe").css({ height: "96%", width: "100%" });
                        tb_position();
                        openIcon.hide();
                        backIcon.show();
                    });
                    var backIcon = $("<a style='cursor:pointer;margin-right:5px;display:none' title='还原'><img src='" + thickbox_baseurl + "/images/component/backsize.png'/></a>");
                    backIcon.click(function () {
                        TB_WIDTH = temww;
                        TB_HEIGHT = temwh;
                        $("#TB_window iframe").css({ height: temih + "px", width: temiw + "px" });
                        tb_position();
                        backIcon.hide(); openIcon.show();
                    });
                    $("#TB_closeAjaxWindow").prepend(openIcon).prepend(backIcon);
                }
            } else {// not an iframe, ajax
                if ($("#TB_window").css("display") != "block") {
                    if (params['modal'] != "true") {//ajax no modal
                        //$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='position:relative;width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
                        $("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='" + thickbox_baseurl + "/images/component/close.gif' alt='Close'></a></div></div><div id='TB_ajaxContent' style='position:relative;width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
                    } else {//ajax modal
                        $("#TB_overlay").unbind();
                        $("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>");
                    }
                } else {//this means the window is already up, we are just loading new content via ajax
                    $("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
                    $("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
                    $("#TB_ajaxContent")[0].scrollTop = 0;
                    $("#TB_ajaxWindowTitle").html(caption);
                }
            }

            $("#TB_closeWindowButton").click(tb_remove);

            if (url.indexOf('TB_inline') != -1) {
                $("#TB_ajaxContent").append($('#' + params['inlineId']).children());
                $("#TB_window").unload(function () {
                    $('#' + params['inlineId']).append($("#TB_ajaxContent").children()); // move elements back when you're finished
                });
                tb_position();
                $("#TB_load").remove();
                $("#TB_window").css({ display: "block" });
            } else if (url.indexOf('TB_iframe') != -1) {
                tb_position();
                if ($.browser.safari) {//safari needs help because it will not fire iframe onload
                    $("#TB_load").remove();
                    $("#TB_window").css({ display: "block" });
                }
            } else {
                tb_position(true);
                if (url)//加载url，不能跨域
                    $("#TB_ajaxContent").load(url += (url.indexOf("?") > 0 ? "&" : "?") + "random=" + (new Date().getTime()), function () {//to do a post change this load method
                        tb_position();
                        tb_init("#TB_ajaxContent a.thickbox");
                        $("#TB_window").css({ display: "block" });
                    });
            }

        }
        if (options.func) {//执行自定义函数
            options.func();
        }
        params = params || {};
        if (!params['modal']) {
            document.onkeyup = function (e) {
                if (e == null) { // ie
                    keycode = event.keyCode;
                } else { // mozilla
                    keycode = e.which;
                }
                if (keycode == 27) { // close
                    tb_remove();
                }
            };
        }

    } catch (e) {
        //nothing here
        //alert(e.toString());
    }
}

//helper functions below
function tb_showIframe() {
    $("#TB_load").remove();
    $("#TB_window").css({ display: "block" });
}

function tb_remove() {
    $("#TB_iframeContent").attr("src", "");
    $("#TB_imageOff").unbind("click");
    $("#TB_closeWindowButton").unbind("click");
    $("#TB_window").fadeOut("fast", function () { $('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove(); });
    $("#TB_load").remove();
    if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
        $("body", "html").css({ height: "auto", width: "auto" });
        $("html").css("overflow", "");
    }
    document.onkeydown = "";
    document.onkeyup = "";
    return false;
}

function tb_position(loading) {
    $("#TB_window").css({ display: "block", marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px', width: TB_WIDTH + 'px' });
    if (loading) {
        $("#TB_window").css({ height: "60px" });
        $("#TB_load").remove();
        $("#TB_ajaxContent").append("<img id='img_loading' style='margin:0 auto;display:block;' src='" + tb_pathToImage + "'/>");
    }
    else {
        $("#img_loading").remove();
        $("#TB_window").css({ height: TB_HEIGHT + 'px' });
    }
    if (!(jQuery.browser && jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
        $("#TB_window").css({ marginTop: '-' + parseInt((TB_HEIGHT / 2), 10) + 'px' });
    }
    tbwin_option();
}

function tb_parseQuery(query) {
    var Params = {};
    if (!query) { return Params; } // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) { continue; }
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

function tb_getPageSize() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w, h];
    return arrayPageSize;
}

function tb_detectMacXFF() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
        return true;
    }
}
(function (url) {
    if ($("link[href='" + url + "']").size() > 0) return;
    var css = document.createElement("link");
    css.setAttribute("type", "text/css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(css);
})(thickbox_baseurl + "/css/logintab.css");