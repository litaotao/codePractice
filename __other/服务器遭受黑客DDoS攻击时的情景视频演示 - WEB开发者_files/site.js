
$(function() {
    $("#search .searchButton").click(function(event) {

        var keyword = $("#search .searchKeyword").val();

        if ($.trim(keyword) == '') {
            var url = "/search.aspx";
        }
        else {
            var url = "/search.aspx?keyword=" + encodeURIComponent(keyword) + "&field=" + encodeURIComponent("title") + "";

        }
        window.open(url, '_self', '');
        event.preventDefault();
    })

    $("#search .searchKeyword").keypress(function(event) {

        if (event.which == 13) {
            $("#search .searchButton").click();
            event.preventDefault();
        }
    })
    
})

$.fn.yulinSlideShow = function(options) {
    options = $.extend({
        width: 300,
        height: 266,
        intervalTime: 3000,
        changeTime: 300,
        changeStyle: "right",
        mouseEvent: "click",
        isTitleBar: true,
        titleBarStyle: { height: 48, bgColor: "#000", alpha: 0.4 },
        isTitle: true,
        titleStyle: { size: 12, color: "#FFF", family: "Verdana", weight: "bold", alpha: 0.8 },
        isButton: true,
        buttonStyle: { width: 18, height: 18, space: 3, bgColor: "#666", bgHoverColor: "#C00", fontSize: 12, fontColor: "#ccc", fontHoverColor: "#000", fontFamily: "Verdana", borderWidth: 1, borderColor: "#999", borderHoverColor: "#F00", bgAlpha: 0.7 }
    }, options);

    this.css({ visibility: "hidden" });
    this.each(function() {
        var $slideShow = $(this);
        $slideShow.wrapInner("<div class=\"showBox\"><div class=\"moveBox\"></div></div>");
        $slideShow.append("<div class=\"titleBar\"></div>");
        var $showBox = $("div.showBox", $slideShow).eq(0);
        var $moveBox = $("div.moveBox", $slideShow).eq(0);
        var $titleBar = $("div.titleBar", $slideShow);
        var imgCount = $("img", $moveBox).length;
        var arrTitle = [];
        $("img", $moveBox).each(function() { arrTitle.push($(this).attr("alt")); });
        var scrollLeftMax = options.width * (imgCount - 1);
        var scrollTopMax = options.height * (imgCount - 1);
        var currIndex = 0;
        var timer;

        $slideShow.css({ width: options.width, height: options.height, position: "relative" });
        $showBox.css({ width: options.width, height: options.height, overflow: "hidden" });
        $moveBox.css({ width: options.width * imgCount, height: options.height * imgCount });
        $titleBar.css({ position: "absolute", left: "0px", bottom: "0px", height: options.titleBarStyle.height, width: "100%" });
        $("a", $moveBox).css({ "display": "block", "width": options.width, "height": options.height });
        $("img", $moveBox).css({ "border": "0px", "width": options.width, "height": options.height });
        if (options.changeStyle == 'left' || options.changeStyle == 'right') {
            $("a", $moveBox).css({ "float": "left" });
        }
        if (options.changeStyle == 'right' || options.changeStyle == 'down') {
            $("a", $moveBox).each(function() { $moveBox.prepend($(this)); });
            if (options.changeStyle == 'right') {
                $showBox.scrollLeft(scrollLeftMax);
            }
            else if (options.changeStyle == 'down') {
                $showBox.scrollTop(scrollTopMax);
            }
        }


        if (options.isTitleBar) {
            $titleBar.css({ background: options.titleBarStyle.bgColor, opacity: options.titleBarStyle.alpha });
        }

        if (options.isTitle) {
            $slideShow.append("<h3 class=\"title\" style=\"margin:5px 0 0 6px; padding:0; position:absolute; left:" + $titleBar.position().left + "px; top:" + $titleBar.position().top + "px; \"></h3>");
            $("h3.title", $slideShow).css({
                fontSize: options.titleStyle.size,
                color: options.titleStyle.color,
                fontFamily: options.titleStyle.family,
                fontWeight: options.titleStyle.weight,
                opacity: options.titleStyle.alpha
            });
        }

        if (options.isButton && imgCount >= 2) {
            var buttonList = "";
            for (var i = 1; i <= imgCount; i++) {
                buttonList += "<li>" + i + "</li>";
            }
            buttonList = "<ul class=\"buttonList\" style=\"margin:0; padding:0; list-style:none; position:absolute; right:10px; bottom:5px; z-index:100;\">" + buttonList + "</ul>";
            $slideShow.append(buttonList);
            $("ul.buttonList li", $slideShow).css({
                float: "left",
                width: options.buttonStyle.width,
                height: options.buttonStyle.height,
                marginLeft: options.buttonStyle.space,
                background: options.buttonStyle.bgColor,
                fontSize: options.buttonStyle.fontSize,
                color: options.buttonStyle.fontColor,
                fontFamily: options.buttonStyle.fontFamily,
                borderWidth: options.buttonStyle.borderWidth,
                borderColor: options.buttonStyle.borderColor,
                borderStyle: "solid",
                textAlign: "center",
                cursor: "pointer",
                lineHeight: parseInt(options.buttonStyle.height) + "px",
                opacity: options.buttonStyle.bgAlpha
            });

            $("ul.buttonList li", $slideShow).bind(options.mouseEvent, function() {
                clearTimeout(timer);
                currIndex = parseInt($(this).html()) - 1;
                if (options.changeStyle == 'left') {
                    $showBox.animate({ scrollLeft: currIndex * options.width }, options.changeTime);
                }
                else if (options.changeStyle == 'right') {
                    $showBox.animate({ scrollLeft: scrollLeftMax - currIndex * options.width }, options.changeTime);
                }
                else if (options.changeStyle == 'up') {
                    $showBox.animate({ scrollTop: currIndex * options.height }, options.changeTime);
                }
                else if (options.changeStyle == 'down') {
                    $showBox.animate({ scrollTop: scrollTopMax - currIndex * options.height }, options.changeTime);
                }

                setCurrentShow(currIndex);
            })

            $("ul.buttonList li", $slideShow).bind("mouseout", function() {
                clearTimeout(timer);
                timer = setTimeout(play, options.intervalTime);
            })
        }

        setCurrentShow(0);

        timer = setTimeout(play, options.intervalTime);
        var pos;
        function play() {
            if (options.changeStyle == 'left') {
                if (currIndex < (imgCount - 1)) {
                    pos = (currIndex + 1) * options.width;
                }
                else {
                    pos = 0;
                }
                $showBox.animate({ scrollLeft: pos }, options.changeTime);
            }
            else if (options.changeStyle == 'right') {
                if (currIndex < (imgCount - 1)) {
                    pos = scrollLeftMax - (currIndex + 1) * options.width;
                }
                else {
                    pos = scrollLeftMax;
                }
                $showBox.animate({ scrollLeft: pos }, options.changeTime);
            }
            else if (options.changeStyle == 'up') {
                if (currIndex < (imgCount - 1)) {
                    pos = (currIndex + 1) * options.height;
                }
                else {
                    pos = 0;
                }
                $showBox.animate({ scrollTop: pos }, options.changeTime);
            }
            else if (options.changeStyle == 'down') {
                if (currIndex < (imgCount - 1)) {
                    pos = scrollTopMax - (currIndex + 1) * options.height;
                }
                else {
                    pos = scrollTopMax;
                }
                $showBox.animate({ scrollTop: pos }, options.changeTime);
            }

            currIndex++;
            if (currIndex == imgCount) currIndex = 0;
            setCurrentShow(currIndex);
            timer = setTimeout(play, options.intervalTime);
        }


        function setCurrentShow(index) {
            if (options.isTitle) {
                $("h3.title", $slideShow).html(arrTitle[index]);
            }
            if (options.isButton && imgCount >= 2) {
                $("ul.buttonList li", $slideShow).each(function(i) {
                    if (index == i) {
                        $(this).css({ background: options.buttonStyle.bgHoverColor, borderColor: options.buttonStyle.borderHoverColor, color: options.buttonStyle.fontHoverColor });
                    }
                    else {
                        $(this).css({ background: options.buttonStyle.bgColor, borderColor: options.buttonStyle.borderColor, color: options.buttonStyle.fontColor });
                    }
                });
            }
        }
    })

    this.css({ visibility: "visible" });
    return this;
};

// 会员收藏
function addMemberFavorite() {
    var title = encodeURIComponent(document.title);
    var url = encodeURIComponent(location.href);
    var favoriteUrl = "/Member/Favorite/Add.aspx?title=" + title + "&url=" + url + "";
    var width = 670;
    var height = 400;
    window.open(favoriteUrl, 'favoriteWindow', 'width=' + width + ',height=' + height + ',scrollbars=1,status=0,resizable=no,titlebar=0');
}


// 打印文档
function print(documentId) {

    window.open('/Common/Print.aspx?DocumentId='+documentId+'', 'printWindow', '');
}


function updateClickTotal(contentId, model,pageIndex) {
    $.get("/Common/ClickTotal.ashx", { "ContentId": contentId, "Model": model, "PageIndex": pageIndex, "rand": Math.random() }, function (data, status) {
        $("span#spanClickTotal").html(data);
    });

}

function memberAuthenticate() {
    randStr = Math.random().toString().replace(/\./, "");
    $.get("/Common/MemberAuthenticate.ashx?randStr="+randStr+"", {}, function(data, status) {
        $("span.memberAuthenticate").html(data);
    });

}



function getCommentList(contentId, model, pageIndex) {

    $(".commentBox .list").html("");
    $.get("/Common/CommentList.ashx", { "ContentId": contentId, "Model": model, "PageIndex": pageIndex, "rand": Math.random() }, function(data, status) {

        data = eval("(" + data + ")");
       
        if (data.data.length > 0) {
            $(".commentBox .list").append("<ul></ul>");
            var str = "";
            $.each(data.data, function(idx, item) {
                str = "<li><div class=\"l\"><img src=\"" + item.avatar + "\" alt=\"\"></div><div class=\"r\"><div class=\"commInfo\">" + item.memberName + " - " + item.addTime + "</div><div class=\"commBody\">" + item.body + "</div></div></li>";
                $(".commentBox .list > ul").append(str);
            });
            $(".commentBox .pageBar .pageBox").html(data.pager);
        }
        $("span.commLoading").hide();
    });
}


// 直接转到指定分页
function goPage(pageUrl, pageIndex) {
    if (isNaN(pageIndex)) {
        pageIndex = 1;
    }
    location = pageUrl + pageIndex;
}
