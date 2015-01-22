function ShowTagAddPanel(action, modal, body, id, type) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        data: { action: action, id: id },
        url: "/Tag/TagOperationHandler.ashx",
        dataType: "json",
        cache: true,
        success: function (info) {
            $(modal).modal('show');
            $(body).empty();
            $(body).append("<input type='hidden' id='panelId' value='" + id + "'>");

            if (action != 'GetArticleTags') {
                var checked = tryGetCookieValue("_product.subscribe", 1);
                $(body).append("<h5>订阅邮件:&nbsp;<input id='isSubscribe' type='checkbox' " + (checked == 1 ? "checked='checked'" : '') + "/><hr/>");
            }

            if (info != null && info.length > 0) {
                $(body).append("<h5>选择标签&nbsp;<span class='font12 gray fontnormal'>选择系统中已有的标签来标记您感兴趣的内容</span></h5><hr><input type='hidden' id='pid' value='" + id + "'><input type='hidden' id='typeid' value='" + type + "'>");
                var showlistring = Showlistring(info);
                $(body).append(" <ul class='list-inline clearfix'>" + showlistring + "      <li class='col-lg-3 col-md-3 col-sm-4 col-xs-4'><input type='checkbox' id='tag_else' name='tag_else' onclick='AddNewTags()' ><a>自定义标签<i class='fa fa-arrow-circle-o-down'></i></a> </li></ul>");

                $(body).append(" <div class='input-group mT20' style='display:none;' id='tagInfoDiv'><span class='input-group-addon'>标签</span> <span  id='singleFieldTags' ></span> <input id='tagInfo' type='text' class='form-control' placeholder='多个标签用,英文逗号隔开' data-provide='typeahead' /></div> ");
            }

            if (info == null || info.length == 0) {
                $(body).append("<p>&nbsp;</p><h5>添加标签&nbsp;<span class='font12 gray fontnormal'>添加您自己的专属标签</span></h5> <hr> ");
                $(body).append(" <div class='input-group mT20'  id='tagInfoDiv'><span class='input-group-addon'>标签</span><span  id='singleFieldTags' ></span><input id='tagInfo' type='text' class='form-control' placeholder='多个标签用,英文逗号隔开' data-provide='typeahead'   /></div> ");

            }
            //是否显示?
            SelectMytag(body);
            //是否显示
        },
        error: function () {
            alert("服务器正忙,请稍候重试...");
        }
    });

}
function ShowTagUdatePanel(action, body, id, type) {
    window.accountApi.account.isAuthenticated(function (isCallSuccess, result) {
        if (!result) {
            window.accountApi.account.redirect_sign_in(location.href);
            return;
        }

        $.getJSON("/Tag/TagOperationHandler.ashx",
            { action: action, id: id },
            function (info) {

                $("#UpdateTagModal").modal('show');
                $(body).empty();
                $(body).append("<input type='hidden' id='pid' value='" + id + "'><input type='hidden' id='typeid' value='" + type + "'>");
                if (info.length > 0) {
                    $(body).append("<h5>选择标签&nbsp;<span class='font12 gray fontnormal'>选择系统中已有的标签来标记您感兴趣的内容</span></h5><hr>");
                    var showlistring = Showlistring(info);
                    $(body).append(" <ul class='list-inline clearfix'>" + showlistring + "      <li class='col-lg-3 col-md-3 col-sm-4 col-xs-4'><input type='checkbox' id='tag_else' name='tag_else' onclick='AddNewTags()' ><a>自定义标签<i class='fa fa-arrow-circle-o-down'></i></a> </li></ul>");

                    $(body).append(" <div class='input-group mT20' style='display:none;' id='tagInfoDiv'><span class='input-group-addon'>标签</span><input id='tagInfo' type='text' class='form-control' placeholder='多个标签用,英文逗号隔开' data-provide='typeahead'  onblur='CheckTagInfoLength();' /></div> ");
                }
                GetOidTagInfo(id,type);
                if (info.length == 0) {
                    $(body).append("<p>&nbsp;</p><h5>添加标签&nbsp;<span class='font12 gray fontnormal'>添加您自己的专属标签</span></h5> <hr> ");
                    $(body).append(" <div class='input-group mT20'  id='tagInfoDiv'><span class='input-group-addon'>标签</span><input id='tagInfo' type='text' class='form-control' placeholder='多个标签用,英文逗号隔开' data-provide='typeahead'  onblur='CheckTagInfoLength();' /></div> ");

                }
                //是否显示?
                SelectMytag(body);
                //是否显示
            });
    });
}
function Showlistring(info) {
    var stringli = "";
    for (var i = 0; i < info.length; i++) {
        var value = $("#tag_" + info[i].Id).val();
        if (value != info[i].Id) {
            stringli += "<li class='col-lg-3 col-md-3 col-sm-4 col-xs-4'> <input type='checkbox' id='tag_" + info[i].Id + "' name='tagIds' value='" + info[i].Id + "' onclick='CheckTag(\"" + info[i].Id + "\")'> <a>" + info[i].Name + "</a></li>";
        }

    }
    return stringli;
}
function SelectMytag(body) {

    $.getJSON("/Tag/TagOperationHandler.ashx",
        { action: "getMyTags" },
        function (info) {
            if (info.length > 0) {
                var showlistring = Showlistring(info);
                $(body).append("<a id='selecttagid' href='javascript:SelectTags();' class='pull-right  gray fontnormal'>选取标签↓</a>");
                $(body).append("<div id='TagsSwitcher' style='display:none;'> ");
                $("#TagsSwitcher").append("<hr/>");
                $("#TagsSwitcher").append("<h5  class='font12 gray fontnormal'>我的专属标签</h5>");
                $("#TagsSwitcher").append(" <ul class='list-inline clearfix'>" + showlistring + "</ul>");

                $(body).append("</div>");
            }
        });


}

function SelectTags() {

    if ($("#TagsSwitcher").attr("style") != null) {

        $("#TagsSwitcher").removeAttr("style");
        $("#selecttagid").empty().append("收起标签↑");
    } else {
        $("#TagsSwitcher").attr("style", "display:none");
        $("#selecttagid").empty().append("选取标签↓");
    }
}

function AddNewTags() {

    var checked = $('input[name=tag_else]').is(':checked');
    if (checked) {
        $("#tagInfoDiv").removeAttr("style", "display:none");
    } else {
        $("#tagInfoDiv").attr("style", "display:none");
        $("#tagInfo").removeAttr("value");
    }
}

function CheckTag(id) {
    //选择和取消标签的时候触发的各种状态保存和长度检查

    var checked = $('input[id=tag_' + id + ']').is(':checked');
    if (!checked) {

        $("#tag_" + id).attr('checked', false);
    } else {
        //确定数量之后更改检查长度参数
        if (checkLength(6, "tagIds")) {

            $("#tag_" + id).attr('checked', true);
        }
        else {

            $("#tag_" + id).attr('checked', false);
            alert("最多可以选择5个标签");
        }
    }
}


// 收藏文章方法
function AttentionArticle(articleId) {
    
    window.accountApi.news.tag.is_collected(articleId, function (isCallSuccess, isAuth, aid, isCollected) {
        if(!isAuth) {
            window.accountApi.account.redirect_sign_in(location.href);
        }
        if (isCollected) {
            alert("您已经收藏过该文章了，不需要重复收藏哟！");
            $("#item-collect").html("<i class='fa fa-star'></i>已收藏");
            return;
        }

       
    });
}

function checkLength(i, type) {
    var count = 0;
    $('input[type="checkbox"][name="' + type + '"]:checked').each(
                  function () {
                      count++;
                  }
              );


    return count < i;
}
function Cancle() {
    $("#TagModal").modal('hide');
}

function CheckTagInfoLength() {
    //检查填写标签的长度
    var regS = new RegExp("，", "g");
    var info = $("#tagInfo").val().replace(regS, ",").split(',');
    var lengths = info.length;
    var ok = lengths <= 3;
    if (!ok) {
        alert("最多添加3个标签");
    }
    for (var i = 0; i < lengths; i++) {
        ok = info[i].length < 50;
        if (!ok) {
            alert("每个标签字数不超过50！");
        }
    }
    return ok;
}

function SetTag(keyword, value) {
    // 未完成
    var regS = new RegExp("，", "g");
    var info = $("#tagInfo").val().replace(regS, ",").split(',');
    var lengths = info.length;
    var old = $("#tagInfo").val();
    $("#tagInfo").val(old.replace(info[lengths - 1], value));

}

function GetCheckedTag() {
    var checkboxs = $("input[name='tagIds']");
    var info = "";
    for (var i = 0; i < checkboxs.length; i++) {
        if ($(checkboxs[i]).attr("checked") == "checked") {
            info += $(checkboxs[i]).val() + ",";
        }
    }
    return info;
}
function taged() {
    return $(".label-warning").length > 0 || $("#tagInfo").val() != "";
}

function AttentionUser() {
    if (CheckTagInfoLength() && checkLength(6, "tagIds")) {
        var id = $("#panelId").val();
        var checkedTags = GetCheckedTag();
        //新加的标签
        var regS = new RegExp("，", "g");
        var addTags = $("#tagInfo").val().replace(regS, ",");
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { action: "AttentionUser", checkedTags: checkedTags, addTags: addTags, id: id },
            function (info) {
                if (info == "bad") {
                    alert("您的输入含有非法字符，请确认后再提交！");
                } else {
                    alert("True" == info ? "关注用户成功" : "关注用户失败，请稍后重试");
                    location.reload();
                }

            });
    } else {
        alert("请选择或者添加一个以上的标签");
    }
}


function saveTag(id, name) {
    $.post("/Tag/TagOperationHandler.ashx",
    { action: "saveTag", id: id, name: name },
    function (info) {
        alert("True" == info ? "标签修改成功！" : "标签修改失败，请稍后重试！");
        location.reload();
    });
}


function deleteTag(id, name) {

    $.post("/Tag/TagOperationHandler.ashx",
    { action: "deleteTag", id: id, name: name },
    function (info) {
        alert("True" == info ? "删除标签成功" : "删除标签失败，请稍后重试");
        location.reload();
    });
}


function GetOidTagInfo(id,type) {
    $.getJSON("/Tag/TagOperationHandler.ashx",
    { action: "getTagInfo", oid: id, type: type },
    function (info) {
        for (var i = 0; i < info.length; i++) {


            $("#tag_" + info[i].Id).attr('checked', true);
        }



    });
}

function ShowMyTagPanel(id, type) {
    //从后台提取数据，返回json用此json数据渲染界面
    $.getJSON("/Tag/TagOperationHandler.ashx",
        { action: "getMyTags" },
        function (info) {
            $("#TagModal").modal('show');
            $("#tag-modal-body").empty();
            $("#tag-modal-body").append("<h5>选择标签&nbsp;<span class='font12 gray fontnormal'>选择系统中已有的标签来标记您感兴趣的内容</span></h5><hr><input type='hidden' id='pid' value='" + id + "'><input type='hidden' id='typeid' value='" + type + "'>");
            for (var i = 0; i < info.length; i++) {
                $("#tag-modal-body").append("<label class='checkbox inline'> <input type='checkbox' id='tag_" + info[i].Id + "' name='tagIds' value='" + info[i].Id + "' onclick='CheckTag(\"" + info[i].Id + "\")'> <span class='label label-info' id='tag_class" + info[i].Id + "' onclick='CheckTag(\"" + info[i].Id + "\")'>" + info[i].Name + "</span></label>");
            }
            $("#tag-modal-body").append("<label class='checkbox inline'><input type='checkbox' id='tag_else' name='tag_else' onclick='AddNewTags()' ><span id='tagclasselse'onclick='AddNewTags()'>自定义标签</span></label>");
            $("#tag-modal-body").append(" <div class='input-group mT20' style='display:none;' id='tagInfoDiv'><span class='input-group-addon'>标签</span><input id='tagInfo' type='text' class='form-control' placeholder='多个标签用,英文逗号隔开' data-provide='typeahead'  onblur='CheckTagInfoLength();' /></div> ");

            GetOidTagInfo(id, type);
        });
}

function DeleteTORelation(id, type) {
    if (confirm("确定删除该信息么？")) {

        $.post("/Tag/TagOperationHandler.ashx",
        { action: "DeleteTORelation", id: id, type: type },
           function (info) {
               alert("True" == info ? "删除成功" : "删除失败，请稍后重试");
               location.reload();
           });
    }
}

function EditTagsPanel() {

    //确定数量之后更改检查长度参数
    if (CheckTagInfoLength() && checkLength(6)) {
        var id = $("#pid").val();
        var type = $("#typeid").val();
        //选中的标签
        var checkedTags = GetCheckedTag();
        //新加的标签
        var regS = new RegExp("，", "g");
        var addTags = $("#tagInfo").val().replace(regS, ",");
        $.post("/Tag/TagOperationHandler.ashx",
            { action: "EditTagsPanel", checkedTags: checkedTags, addTags: addTags, id: id, type: type },
            function (info) {
                if (info == "bad") {
                    alert("您的输入含有非法字符，请确认后再提交！");

                } else {
                    alert("True" == info ? "修改成功" : "修改失败，请稍后重试~~~~~");
                    location.reload();
                }


            });
    } else {
        alert("请选择或者添加一个以上的标签");
    }
}


function ShowMyTagsListByTargetType(targetType) {

    if (targetType == 1) {
        $("#producttagsDiv").removeAttr("style");
        $("#products-body").attr("class", "active");
        $("#user-body").removeAttr("class");
        $("#article-body").removeAttr("class");
        $("#UserTagsDiv").attr("style", "display:none");
        $("#ArticleTagsDiv").attr("style", "display:none");
        $("#supplier-body").removeAttr("class");
        $("#SupplierTagDiv").attr("style", "display:none");
        $("#question-body").removeAttr("class");
        $("#QuestionTagDiv").attr("style", "display:none");
    }
    if (targetType == 2) {
        $("#UserTagsDiv").removeAttr("style");
        $("#user-body").attr("class", "active");
        $("#article-body").removeAttr("class");
        $("#products-body").removeAttr("class");
        $("#ArticleTagsDiv").attr("style", "display:none");
        $("#producttagsDiv").attr("style", "display:none");
        $("#supplier-body").removeAttr("class");
        $("#SupplierTagDiv").attr("style", "display:none");
        $("#question-body").removeAttr("class");
        $("#QuestionTagDiv").attr("style", "display:none");
    }
    if (targetType == 3) {
        $("#ArticleTagsDiv").removeAttr("style");
        $("#article-body").attr("class", "active");
        $("#user-body").removeAttr("class");
        $("#products-body").removeAttr("class");
        $("#producttagsDiv").attr("style", "display:none");
        $("#supplier-body").removeAttr("class");
        $("#SupplierTagDiv").attr("style", "display:none");
        $("#UserTagsDiv").attr("style", "display:none");
        $("#question-body").removeAttr("class");
        $("#QuestionTagDiv").attr("style", "display:none");
    }
    if (targetType == 4) {
        $("#SupplierTagDiv").removeAttr("style");
        $("#supplier-body").attr("class", "active");

        $("#user-body").removeAttr("class");
        $("#products-body").removeAttr("class");
        $("#article-body").removeAttr("class");
        $("#question-body").removeAttr("class");
        $("#QuestionTagDiv").attr("style", "display:none");
        $("#producttagsDiv").attr("style", "display:none");
        $("#UserTagsDiv").attr("style", "display:none");
        $("#ArticleTagsDiv").attr("style", "display:none");
    }
    if (targetType == 4) {
        $("#QuestionTagDiv").removeAttr("style");
        $("#question-body").attr("class", "active");

        $("#user-body").removeAttr("class");
        $("#products-body").removeAttr("class");
        $("#article-body").removeAttr("class");
        $("#supplier-body").removeAttr("class");
        $("#SupplierTagDiv").attr("style", "display:none");
        $("#producttagsDiv").attr("style", "display:none");
        $("#UserTagsDiv").attr("style", "display:none");
        $("#ArticleTagsDiv").attr("style", "display:none");
    }
}

function AbstractSelectionModel(id) {
    var subitem = document.getElementById("Modelbox" + id);
    if (subitem.style.display == 'none') {

        $("#Modelbox" + id).removeAttr("style");
        $("#iconimg" + id).attr("src", "/images/icon_up.gif");
        $("#iconimg" + id).attr("title", "折叠");
    } else {
        $("#Modelbox" + id).attr("style", "display:none");
        $("#iconimg" + id).attr("src", "/images/icon_down.gif");
        $("#iconimg" + id).attr("title", "展开");
    }

}

function CancelArticle(articleid) {
    if (confirm("确定取消订阅该文章么？")) {

        $.post("/Tag/TagOperationHandler.ashx",
        { action: "CancelArticle", articleid: articleid },
           function (info) {
               alert("True" == info ? "取消订阅成功" : "取消订阅失败，请稍后重试");
               location.reload();
           });
    }

}

function SubscribeSupplier() {
    //确定数量之后更改检查长度参数
    if (CheckTagInfoLength() && checkLength(6, "tagIds")) {
        //选中的标签
        var id = $("#panelId").val();

        var checkedTags = GetCheckedTag();
        //新加的标签
        var regS = new RegExp("，", "g");
        var addTags = $("#tagInfo").val().replace(regS, ",");
        $.post("/Tag/TagOperationHandler.ashx",
            { action: "AttentionSupplier", checkedTags: checkedTags, addTags: addTags, id: id },
            function (info) {
                if (info == "bad") {
                    alert("您的输入含有非法字符，请确认后再提交！");

                } else {
                    alert("True" == info ? "商家订阅成功" : "商家订阅失败，请稍后重试");
                    location.reload();
                }
            });
    } else {
        alert("请选择或者添加一个以上的标签");
    }
}
function CancelSupplier(supplierid) {
    if (confirm("确定取消订阅该商家么？")) {

        $.post("/Tag/TagOperationHandler.ashx",
        { action: "CancelSupplier", supplierid: supplierid },
           function (info) {
               alert("True" == info ? "取消订阅成功" : "取消订阅失败，请稍后重试");
               location.reload();
           });
    }

}



