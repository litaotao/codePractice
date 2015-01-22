var istargetBlank = true;
var isProductPostCommentAndShowLoginPanel = false;
var lastProductSearchInterval;
var isVideoPostCommentAndShowLoginPanel = false;

$(function () {
    product_search_func();
    article_search_func();
});



function productkeyWords_input() {
    $("#product-keyWords").typeahead({
        source: function (e) {
            e = $.trim(e);
            var result = [];

            if (e.length < 2) {
                return result;
            }
            $.ajax({
                type: "get",
                async: false,
                timeout: 5000,
                url: "/Handlers/Catalog/GetProductsByKey.ashx",
                data: { k: e },
                dataType: "json",
                cache: true,
                success: function (products) {
                    result = isNullOrEmpty(products) ? [] : products;
                }
            });

            return result;
        }
    }).keyup(function (e) {
        if (e.keyCode == 13) {
            $("#product-btn-search").click();
        }
    });
}

function product_search_func() {
    $("#product-btn-search").click(function () {
        var keyWords = $.trim($("#product-keyWords").val());
        if (keyWords == '') {
            return;
        }
        AddKeywords(keyWords, "product");
        if (istargetBlank) {
            window.open("/product/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/product/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/product/search?k=" + encodeURIComponent(keyWords);
        }
    });

        }
function searchType_func() {

    var keyWords = $.trim($("#product-keyWords").val());
    if (keyWords == '') {
        return;
    }
    var searchtype = $.trim($("#dp_searchType").val());
   
    if (searchtype == "") searchtype = "product";
    AddKeywords(keyWords, searchtype);
    if (searchtype == "product") {
        if (istargetBlank) {
            window.open("/product/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/product/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/product/search?k=" + encodeURIComponent(keyWords);
        }
    }
    if (searchtype == "article") {
        if (istargetBlank) {
            window.open("/article/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/article/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/article/search?k=" + encodeURIComponent(keyWords);
        }
    }
    
    if (searchtype == "question") {
        if (istargetBlank) {
            window.open("/question/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/question/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/question/search?k=" + encodeURIComponent(keyWords);
        }
    }
    if (searchtype == "video") {
        if (istargetBlank) {
            window.open("/video/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/video/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/video/search?k=" + encodeURIComponent(keyWords);
        }
    }
    
    if (searchtype == "demoOrSample") {
        if (istargetBlank) {
            window.open("/demo-sample/search?k=" + encodeURIComponent(keyWords));
        } else {
            if (window.parent) {
                window.parent.location.href = "/demo-sample/search?k=" + encodeURIComponent(keyWords);
                return;
            }
            location.href = "/demo-sample/search?k=" + encodeURIComponent(keyWords);
        }
    }
}


function AddKeywords(key, type) {
    $.ajax({
        type: "post",
        async: false,
        timeout: 10000,
        data: { keywords: key, type: type},
        url: "/Handlers/Users/AddKeywordSearchRecords.ashx",
        dataType: "json",
        cache: false,
        success: function (result) {

        },
        error: function () {
          
        }
    });
}

function question_search_func() {
    
    var keywords = $.trim($("#question-keywords").val());
    if (keywords == '') {
        return false;
    }
    AddKeywords(keywords, "question");
    window.open('/question/search?k=' + keywords);
    return true; 
}

function demoOrSample_search_func() {

    var keywords = $.trim($("#demoOrSample-keywords").val());
    if (keywords == '') {
        return false;
    }
    AddKeywords(keywords, "demoOrSample");
    window.open('/demo-sample/search?k=' + keywords);
    return true;
}


function article_search_func() {
    $("#article-search").click(function () {
        var keywords = $.trim($("#article-keywords").val());
        if (keywords == '') {
            return false;
        }

        window.open('/article/search?k=' + keywords);
        return true;
    });
}

function loadProduct(productId) {
    if (window.parent) {
        window.parent.location.href = '/product/' + productId;
    } else {
        location.href = '/product/' + productId;
    }
}

function clearProductSearchResults() {
    if (lastProductSearchInterval != 'undefined')
    clearTimeout(lastProductSearchInterval);
}

/*--product search end--*/
function setOldHeaderNavHightLight() {
    var menuArry = ["default", "product", "software", "trains", "questions", "consultation", "videos", "article", "about"];
    var menuid = $("#menuId").text();
    var cansearchProduct = false;
    if (menuid != "" && menuid != "info") {
        for (var index = 0; index < menuArry.length; index++) {
            if (menuArry[index] == menuid) {
                cansearchProduct = true;
                hightLightMainNav(index);
                break;
            }
        }
    }
    if (!cansearchProduct) {
        hightLightMainNav(0);
    }
}

function hightLightMainNav(index) {
    if (index == '') {
        index = 0;
    }

    $("#main-nav li:eq(" + index + ")").children("a").addClass("select").siblings().removeClass("select");
}


/*
    func_callback 
    @param pageIndex
*/
function pagingUrlBind(jsonResult, $bind) {
    if (!jsonResult || jsonResult.Comments == null || jsonResult.Comments.length == 0) {
        return;
    }
    var li = '';
    if (jsonResult.IsFirstPage) {
        li += "<li><span style='color:gainsboro;'>&laquo;</span></li>";
    } else {
        li += "<li><a href='javascript:void(0);' index='" + (jsonResult.PageIndex - 1) + "'>&laquo;</a></li>";
    }
    if (jsonResult.StartPageIndex > 1) {
        li += "<li><a href='javascript:void(0);' index='1'>1</a></li>";
        if (jsonResult.StartPageIndex > 2) {
            li += "<li><a>...</a></li>";
        }
    }

    for (var index = jsonResult.StartPageIndex; index <= jsonResult.EndPageIndex; index++) {
        if (index == jsonResult.PageIndex) {
            li += "<li><a style='color:white;background-color:#3276b1;' href='javascript:void(0);' index='" + index + "'>" + index + "</a></li>";
        } else {
            li += "<li><a  href='javascript:void(0);' index='" + index + "'>" + index + "</a></li>";
        }
    }

    if (jsonResult.EndPageIndex < jsonResult.PageCount) {
        if (jsonResult.EndPageIndex < jsonResult.PageCount - 1) {
            li += "<li><a>...</a></li>";
        }
        li += "<li><a  href='javascript:void(0);' index='" + jsonResult.PageCount + "'>" + jsonResult.PageCount + "</a></li>";
    }

    if (jsonResult.IsLastPage) {
        li += "<li><span style='color:gainsboro;'>&raquo;</span></li>";
    } else {
        li += "<li><a href='javascript:void(0);' index='" + (jsonResult.PageIndex + 1) + "'>&raquo;</a></li>";
    }

    $bind.empty().append($(li));
}

function setCookie(name, value, time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


function addVoteCount($span) {
    var text = $span.text();
    var reg = /^\d{1,99999}$/;
    if (!text || !reg.test(text)) {
        $span.text(0);
    }

    $span.text(parseInt(text) + 1);
}
/*--app panel--*/

function productRelationScrollMove(m) {
    var pic = document.getElementById("pic");
    if (pic == null) {
        return;
    }
    var p = pic.getElementsByTagName("li");
    var srl = pic.scrollLeft;
    var dsrl = Math.floor((p[0].clientWidth * (m - 1) - srl) / 5);
    var xsrl = Math.ceil((p[0].clientWidth * (m - 1) - srl) / 5);

    if (srl > p[0].clientWidth * (m - 1)) {
        pic.scrollLeft = srl + dsrl;
        return;
    }
    if (srl < p[0].clientWidth * (m - 1)) {
        pic.scrollLeft = srl + xsrl;
        return;
    }

    clearInterval(productRelationScrollMove);
}
/*--app panel end--*/

$.fn.imgtransition = function (o) {
    var defaults = {
        speed: 5000,
        animate: 1000
    };
    o = $.extend(defaults, o);

    return this.each(function () {
        var arr_e = $("li", this);
        arr_e.css({ position: "absolute" });
        arr_e.parent().css({ margin: "0", padding: "0", "list-style": "none", overflow: "hidden" });

        function shownext() {
            var active = arr_e.filter(".active").length ? arr_e.filter(".active") : arr_e.first();
            var next = active.next().length ? active.next() : arr_e.first();
            active.css({ "z-index": 9 });
            next.css({ opacity: 0.0, "z-index": 10 }).addClass('active').animate({ opacity: 1.0 }, o.animate, function () {
                active.removeClass('active').css({ "z-index": 8 });
            });
        }

        arr_e.first().css({ "z-index": 9 });
        setInterval(function () {
            shownext();
        }, o.speed);

    });
};

function setTab_f2(area, id) {
    $("#" + id).css({ "display": "block" }).siblings(".tabfContent2").css("display", "none");
    var tabs = document.getElementById(area + 'tabs').getElementsByTagName('a');
    for (var i1 = 0; i1 < tabs.length; i1++) {
        tabs[i1].className = 'link2';
    }

    $("#" + id + "tab").removeClass().addClass("link1").blur();
}


function SetMouseOver(area, id) {
    $("#" + id).css({ "display": "block" }).siblings(".p10,.ptnews").css("display", "none");
    var tabs = document.getElementById(area + "Tab").getElementsByTagName('a');
    for (var i1 = 0; i1 < tabs.length; i1++) {
        tabs[i1].className = 'pagelabel fLeft';
    }

    $("#" + id + "tab").removeClass().addClass("pagelabeselct fLeft").blur();
}

/*home page current promotions*/
function getCurrentPromotions() {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: '/Handlers/Catalog/GetPromotionsByRandom.ashx',
        dataType: "json",
        cache: true,
        success: function (promotions) {
            if (!promotions || promotions.length == 0) {
                setTab_f2('cxbox', 'pinglun');
                return;
            }

            $("#cxboxtabs li:eq(0)").css("display", "block");
            setTab_f2('cxbox', 'cx');
            var content = '';
            for (var index = 0; index < promotions.length; index++) {
                var promotion = promotions[index];
                content += "<div class='fLeft textCenter w150 mL10'><a target='_blank' href='/product/" + promotion.ProductId + "'><img title='" + promotion.PromotionTitle + "' src='" + promotion.ImagePath + "'  width='125'  class='lineBorder3 p1'/></a><br />\
                              <p class='w150 overflowH h16 line16 red'><a target='_blank' href='/product/" + promotion.ProductId + "' title='" + promotion.PromotionTitle + "' class='linkbluenew'>" + promotion.ProductName + "</a></p>\
                              <p class='w150 overflowH h14 line14 gray font12'> 截止日期：" + promotion.MaxEndTime + "</p>\
                          </div>";
            }

            $("#current_pros").empty().append($(content));
        },
        error: function () {
            setTab_f2('cxbox', 'pinglun');
        }
    });
}

function getQuestions() {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: '/Handlers/Comments/GetQuestions.ashx',
        dataType: "json",
        cache: true,
        success: function (questions) {
            var $tw = $("#tw").empty();
            if (!questions || questions.length == 0) {
                $tw.append("暂无提问.");
                return;
            }

            var content = '';
            for (var index = 0; index < questions.length; index++) {
                content += " <div class='p10' id='question" + (index + 1) + "' " + (index > 0 ? "style='display:none;'" : "") + ">";

                for (var itemIndex = 0; itemIndex < questions[index].length; itemIndex++) {
                    var question = questions[index][itemIndex].Value;
                    content += "<div class='clear mT5 pB5'>\
                                <h4 class='font12 line18 h18 linkbluenew fontnormal overflowH'><a href='/zh-cn/evquestions/viewinfo.aspx?qid=" + question.Id + "' title='" + question.Question + "'>" + question.Question + "</a></h4>\
                                <p class='gray font12'>" + (question.UserId == null ? "慧都网友" : ("<a href='/u/" + question.UserId + "' class='linkblue mR10'>" + (isNullOrEmpty(question.Nickname) ? (isNullOrEmpty(question.UserName) ? "慧都网友" : question.UserName) : question.Nickname) + "</a>")) + "&nbsp&nbsp;&nbsp&nbsp;<span class='mR10'>" + question.AskDate + "</span></p>\
                            </div>";
                }

                content += "</div>";
            }

            $tw.append($(content));
        },
        error: function () {
            $("#tw").empty().append("暂无提问.");
        }
    });
}


function loadSuppliers(binder) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: '/Handlers/Catalog/GetAllSupplier.ashx',
        dataType: "json",
        cache: true,
        success: function (suppliers) {
            var $binder = $("#" + binder);
            if (!suppliers || suppliers.length == 0) {
                return;
            }

            var content = '';
            for (var index = 0; index < suppliers.length; index++) {
                var supplier = suppliers[index];
                if (supplier == null) {
                    continue;
                }
                content += " <option value='" + supplier.Id + "'>" + supplier.Name + "</option>";
            }

            $binder.append($(content)).change(function () {
                var supplierId = this.options[this.selectedIndex].value;
                if (supplierId == 0) {
                    return;
                }

                var supplierUrl = '/supplier/99';
                location.href = supplierUrl.replace('99', supplierId);
            });
        }
    });
}

function getRecommendProductsByProductSubcategory(subcategoryId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Catalog/Category/Handlers/GetRecommendedProductByCategoryWithRandom.ashx",
        data: { scid: subcategoryId },
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            if (!result || result.length == 0) {
                return;
            }

            var content = '';
            for (var index = 0; index < result.length; index++) {
                var product = result[index];
                
                content += '<dt class="mT10"><a href="' + product.ProductUrl + '">' + product.ProductName + '  ' + product.Version + '</a></dt>\
                        <dd>' + product.DescriptionWord + '</dd>';
            }

            $("#products_recommed").empty().append($(content));
        },
        error: function () {

        }
    });
}

function GetProductCommentsByCategoryWithRandom(subcategoryId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Catalog/Category/Handlers/GetProductCommentsByCategoryWithRandom.ashx",
        data: { scid: subcategoryId },
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            if (!result || result.length == 0) {
                return;
            }

            var content = '';
            for (var index = 0; index < result.length; index++) {
                var comment = result[index];

                content += "<div class='clear pTB5 border-d-b'>\
                            <div class='fLeft w45 p1 lineBorder3'><a href='" + comment.UserUrl + "'><img src='" + comment.UserImage + "' width='45' /></a></div><div class='fRight' style='width: 320px;'>\
                            <p class='line16 overflow M0'><a href='" + comment.UserUrl + "'>" + comment.UserName + "</a> 对产品 <a href='" + comment.ProductUrl + "'>" + comment.ProductName + "</a></p>\
                            <p class='mT5 line16 h32 overflowH M0'>" + comment.Content + "</p> </div></div>";
            }

            $("#category_comments").empty().append($(content));
        },
        error: function () {

        }
    });
}


function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-25px"
    }, 500, function () {
        $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
    });
}

function setHightLight(classMenu, classItem) {
    $("#" + classMenu).children("a").mouseover(function () {
        $(this).addClass("pagelabeselct").removeClass("pagelabel").siblings().removeClass("pagelabeselct").addClass("pagelabel");

        var index = $(this).attr("data-index");
        $("." + classItem + "[data-index=" + index + "]").css("display", "block").siblings().css("display", "none");
    });
}
function productPostAnswer(questionId,content) {
    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        url: "/ComponentQuestions/Handler/SavaAnswer.ashx",
        data: { questionId: questionId, answerContent: content },
        dataType: "json",
        cache: false,
        success: function (result) {
            if (!result.success && result.needLogin) {
                window.accountApi.account.redirect_sign_in(location.href);
                return;
            }
            if (!result.success) {
                alert(result.message);
                return;
            }
            alert("回复成功");
            location.reload();
        },
        error: function () {
            alert("服务器正忙...");
            return false;
        }
    });
}

function SearchTypeMaster(type) {
    if (type == "product") {
        getPublishedProductCount();
    } else {
        $("#product-keyWords").attr("placeholder", "");
    }
    $('#searchliebiao').text($("#" + type).html());
    $("#dp_searchType").val(type);
}