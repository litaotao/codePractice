/*文章页面，用户提交评论，弹出登录框*/
var isAtriclePostCommentAndShowLoginPanel = false;
var currentArticleId = 0;

function updateArticleClickCount(articleId) {
    $.ajax({
        type: "post",
        async: true,
        timeout: 2000,
        data: { id: articleId },
        url: "/Articles/Handlers/UpdateArticleClickCount.ashx",
        dataType: "json",
        cache: false//缓存
    });
}

function updateArticleShareCount(articleId) {
    $.ajax({
        type: "post",
        async: true,
        timeout: 2000,
        data: { id: articleId },
        url: "/Articles/Handlers/UpdateArticleShareCount.ashx",
        dataType: "json",
        cache: false,
        success: function (count) {
            if (!count) {
                return;
            }
            $(".shareCount").attr({ "title": "累计分享" + count + "次" }).text(count);
        }//缓存
    });
}

function getArticleAttribute(articleId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Articles/Handlers/GetArticleAttribute.ashx",
        data: { id: articleId },
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            var $click = $(".article_click_count").text(0);
            var $comment = $(".article_comment_count").text(0);
            var $top = $(".article_top_count").text(0);
            var $down = $(".article_down_count").text(0);
            var $shareCount = $(".shareCount").text(0);

            if (!result) {
                return;
            }
            $click.text(result.ClickCount);
            $comment.text(result.CommentCount);
            $top.text(result.Top);
            $down.text(result.Down);
            $shareCount.text(result.ShareCount);
        }
    });
}

function getArticleProducts(articleId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Articles/Handlers/GetRelationProduct.ashx",
        data: { id: articleId },
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            var binder = $("#article-products");
            if (!result || result.length == 0) {
                return;
            }

            var ul = "<div class='panel-heading'><b>相关产品</b></div>" +
                "<div class='panel-body'>" +
                "<ul class='evList'>";
            for (var index = 0; index < result.length; index++) {
                ul += "<li><a target='_brank' title='" + result[index].Name + "' href='" + result[index].Url + "'>" + result[index].Name + "</a></li>";
            }

            ul += "</ul></div>";
            binder.empty().append($(ul));

            binder.css({ "display": "block" });
        },
        error: function () {

        }
    });
}

function getHotArticles() {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Articles/Handlers/GetHotArticle.ashx",
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            var binder = $("#article-hot");
            if (!result || result.length == 0) {
                return;
            }

            var ul = "<div class='panel-heading'><b>热门文章</b></div>" +
                "<div class='panel-body'>" +
                "<ul class='evList'>";
            for (var index = 0; index < result.length; index++) {
                ul += "<li><span class='pull-right'>" + result[index].CreateTime + "</span>" +
                "<a title='" + result[index].Name + "' class='blue' target='_black' href='" + result[index].Url + "'>" + result[index].Name + "</a>" +
                "</li>";
            }
            ul += "</ul></div>";

            binder.empty().append($(ul));
            binder.css({ "display": "block" });
        },
        error: function () {

        }
    });
}
function getNewArticle() {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Articles/Handlers/GetNewArticle.ashx",
        dataType: "json",
        cache: true,//缓存
        success: function (result) {
            var binder = $("#article-new");
            if (!result || result.length == 0) {
                return;
            }
            var ul = "  <div class='panel-heading'><b>最新文章</b></div>\
                    <div class='panel-body'>\
                        <ul class='evList'>";
            for (var index = 0; index < result.length; index++) {
                ul += "<li ><a title='" + result[index].Name + "' target='_brank' href='" + result[index].Url + "'>" + result[index].Name + "</a></li>";
            }
            ul += "</ul> </div> </div>";

            binder.empty().append($(ul));
            binder.css({ "display": "block" });
        },
        error: function () {

        }
    });
}

function showCommentUserInfoPanel(id) {
    var currentUser = getCurrentUser();
    $(id).empty();
    if (currentUser == null) {
        $(id).prepend($("<span>您的宝贵经验，能为更多人带来帮助，登录后评论还能获得</span><a href='/UserCenter/Passport/UserLogin.aspx?url=" + document.location.href + "' class='red'>慧都积分</a>"));
    }
}

function postArticleComment(articleId) {
    //要求用户登录才能评论
    //var currentUser = getCurrentUser();
    //if (currentUser == null) {
    //    isAtriclePostCommentAndShowLoginPanel = true;
    //    showLogin();
    //    return;
    //}
    //var content = $.trim($("#Content").val());
    //var userId = currentUser.Id;

    //不要求用户登录就能评论
    var currentUser = getCurrentUser();
    if (currentUser == null) {
        isAtriclePostCommentAndShowLoginPanel = true;
        //showLogin();
        //return;
    }
    var content = $.trim($("#Content").val());
    var userId = currentUser == null ? 0 : currentUser.Id;

    $.ajax({
        type: "post",
        async: false,
        timeout: 10000,
        url: "/Handlers/SaveComment.ashx",
        data: { Content: content, UserId: userId, TargetId: articleId, ModuleType: 3 },
        dataType: "json",
        cache: false,
        beforeSend: function () {
            $("#submitting").css("display", "block");
        },
        complete: function () {
            $("#submitting").css("display", "none");
        },
        success: function (result) {
            if (!result) {
                alert("服务器正忙...");
                return;
            }

            if (!result.success) {
                alert(result.message);
                return;
            }
            alert("评论成功,等待审核");
            location.reload();
        },
        error: function () {
            alert("服务器正忙...");
            $("#submitting").css("display", "none");
        }
    });
}

function ensureArticleCommentContentIsValid() {
    var content = $.trim($("#Content").val());
    if (content == '') {
        $("#errorinfo").text("评论内容不能为空！");
        return false;
    }
    $("#errorinfo").text('');
    return true;
}

function changeColor(name, type) {

    if (type == 1) {
        document.getElementById(name).style.backgroundColor = "#00aeff";
    }
    if (type == 2) {

        document.getElementById(name).style.backgroundColor = "#d3d3d3";
    }
}

function getArticleGroup(articleId, groupId) {
    if (groupId == 0 || groupId == null || groupId == '') {
        return;
    }

    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Articles/Handlers/GetArticleGroup.ashx",
        data: { gid: groupId },
        dataType: "json",
        cache: true,
        success: function (result) {
            var $binder = $("#article_group").empty();
            if (!result || result.length == 0) {
                return;
            }

            var content = '<ul>';
            for (var index = 0; index < result.length; index++) {
                var article = result[index];

                if (article.Id == articleId) {
                    content += "<li><b>" + article.Title + "</b></li>";
                } else {
                    content += "<li><a title='" + article.Title + "' href='" + article.Url + "'>" + article.Title + "</a></li>";
                }
            }
            content += '</ul>';
            $binder.css({ "display": "block" }).append($(content));
        }
    });
}

function articleCommentPost(articleId) {
    if (ensureArticleCommentContentIsValid()) {
        postArticleComment(articleId);
        return true;
    }
    return false;
}

function getSyntaxHighlighter() {
    var args = arguments,
        result = [];

    for (var i = 0; i < args.length; i++)
        result.push(args[i].replace('@', '/assets/Syntaxhighlighter/scripts/'));

    return result;
};
function changeArticleHot(articleId, $attribute, type) {
    if (arrayContains(tryGetCookieValue("articleIds", '').split(','), articleId)) {
        alert("您已投票！");
        return;
    }

    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        data: { id: articleId, t: type },
        url: "/Articles/Handlers/ChangeArticleHot.ashx",
        dataType: "json",
        cache: true,
        success: function (result) {
            if (!result) {
                alert("服务器正忙...");
                location.reload();
                return;
            }

            var currentCount = parseInt($attribute.first().text());
            $attribute.text(currentCount + 1);
            setCommentCookie(articleId, "articleIds");
        },
        error: function () {
            alert("服务器正忙...");
            location.reload();
        }
    });
}

function getArticleByColumn(columnId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        data: { cid: columnId },
        url: "/Articles/Handlers/GetArticleByColumn.ashx",
        dataType: "json",
        cache: true,
        success: function (result) {
            if (!result || result.length == 0) {
                return;
            }
            var $binder = $("#recommend_articles").css({ "display": "block" });
            var ul = "  <div class='panel-heading'><b>推荐阅读</b></div>\
                    <div class='panel-body'>\
                        <ul class='list-unstyled' style='margin-bottom: 0; line-height: 24px;'>";
            for (var index = 0; index < result.length; index++) {
                var article = result[index];
                ul += "<li class='line24 h24 overflow'> <a style='" + article.Css + "' href='" + article.Url + "' class='linkbluenew' title='" + article.Summary + "'>" + article.Title + "</a></li>";
            }
            ul += "</ul></div>";
            $binder.empty().append($(ul));
        }
    });
}
//占位
function Container(articleId) {
    currentArticleId = articleId;
    getArticleTags(articleId);
    getArticleByColumn(7);
    hightLightMainNav(7);
    //if (checkIsAddArticle(articleId)) {
    //    $("#articleIsAdded").empty();
    //    $("#articleIsAdded").append("<i class='icon-star'>已收藏</i>");
    //}
}

function getArticleTags(articleId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: "/Tag/TagOperationHandler.ashx",
        data: { action: "GetArticleTagsByArticleId", id: articleId },
        dataType: "json",
        cache: true,//缓存
        success: function (info) {
            var $container = $("#tags").empty();
            if (isNullOrEmpty(info)) {
                return;
            }

            var content = "<span style='color:red'><b>标签：</b></span>";
            for (var index = 0; index < info.length; index++) {
                content += "<span class='badge badge-default-leve'><a href='/tag/category/" + info[index].Id + "'>" + info[index].Name + "</a></span> ";
            }
            $container.append($(content));
        }
    });

}

function article_comment_load(pageIndex, articleId) {
    $.ajax({
        type: "get",
        async: true,
        timeout: 10000,
        url: '/Handlers/OutputComment.ashx',
        data: { p: pageIndex, t: 3, targetId: articleId },
        dataType: "json",
        cache: true,
        beforeSend: function () {
            $("#alert-warning").css("display", "block");
        },
        complete: function () {
            $("#alert-warning").css("display", "none");
        },
        success: function (jsonResult) {
            article_comments_bind(jsonResult, articleId);
        },
        error: function () {
            alert("数据加载失败");
        }
    });
}

function article_comments_bind(jsonResult, articleId) {
    //currentComments = jsonResult;
    var $content = $("#comments").empty();
    if (!jsonResult || jsonResult.Comments == null || jsonResult.Comments.length == 0) {
        $content.append($("<div class='cm_i'>暂无评论！</div>"));
        return;
    }

    var content = '';
    for (var index = 0; index < jsonResult.Comments.length; index++) {
        var comment = jsonResult.Comments[index];
        if (comment == null) {
            continue;
        }
        var replayNamePanl = comment.UserId == null ? ("<a target='_blank' class='pull-left gray thumbnail' href=''>") : ("<a target='_blank' class='pull-left thumbnail gray' href='/u/" + comment.UserId + "'>");
        var userImage = comment.UserImage;
        var imagePanel = userImage == null || userImage == "" ? replayNamePanl +
            "<i class='fa fa-user fa-3x'></i></a>" : "" + replayNamePanl +
            "<img class='media-object' data-src='holder.js/50x50' alt='32x32' style='width: 50px; height: 50px;' src='" + userImage + "'></a>";
        content += "<div class='media'>" + imagePanel +
            "<div class='media-body'><h5>" + comment.AuthorName + "<small>" + comment.CreateTime.split('T')[0] + "</small></h5>" + comment.Content + "<br>" +
            "<a  class='fa fa-reply' id='reply_btn_" + comment.Id + "' cid='" + comment.Id + "'  href='javascript:article_comment_replay(" + comment.Id + "," + articleId + ");'> 回复</a>" +
            "<div class='reply_n' id='reply_area_" + comment.Id + "'></div>";
        if (comment.Replies != null) {
            for (var index1 = 0; index1 < comment.Replies.length; index1++) {
                var replay = comment.Replies[index1];
                if (replay == null) {
                    continue;
                }
                replayNamePanl = replay.UserId == null ? ("<a target='_blank' class='pull-left gray thumbnail' href=''>") : ("<a target='_blank' class='pull-left gray thumbnail' href='/u/" + replay.UserId + "'>");
                userImage = replay.UserImage;
                imagePanel = userImage == null || userImage == "" ? replayNamePanl +
                    "<i class='fa fa-user fa-3x'></i></a>" : "" + replayNamePanl +
                    "<img class='media-object' data-src='holder.js/50x50' alt='32x32' style='width: 50px; height: 50px;' src='" + userImage + "'></a>";
                content += "<div class='media'>" + imagePanel +
                    "<div class='media-body'><h5>" + replay.AuthorName + "<small>" + replay.CreateTime.split('T')[0] + "</small></h5>" + replay.Content + "<br></div></div>";
            }
        }
        content += "</div></div><hr/>";
        //var userName = comment.AuthorName;
        //var userImage = comment.UserImage;
        //var showUserNamePanl = comment.UserId == null ? ("<p>" + userName + "</p>") : ("<a target='_blank' href='/u/" + comment.UserId + "'>" + userName + "</a>");
        //content += "<div class='cm_i' id='comment_" + comment.Id + "'>\
        //          <div class='avatar_s'><img alt='" + userName + "' src='" + userImage + "'></div>\
        //            <div class='cm_t'> \
        //                <div><strong>" + showUserNamePanl + "</strong>" + (comment.UserId == null ? "<span class='cm_d'>(未注册用户)</span>" : '') + "</div>\
        //                <span class='cm_r r0'>\
        //                <span><a class='span_vote_up' cid='" + comment.Id + "' href='javascript:void(0);'><img src='/zh-CN/img/niceface.gif' style='vertical-align: middle;'>有用(<span id='up_" + comment.Id + "'>" + comment.UpVote + "</span>)</a></span>\
        //                    &nbsp;<span><a class='span_vote_down' cid='" + comment.Id + "' href='javascript:void(0);'><img src='/zh-CN/img/badface.gif' style='vertical-align: middle'>没用(<span id='down_" + comment.Id + "'>" + comment.DownVote + "</span>)</a></span>\
        //                </span>\
        //            <div class='cm_b' id='reply_items_" + comment.Id + "' style='word-wrap:break-word;'>" + comment.Content;
        //if (comment.Replies != null) {
        //    for (var index1 = 0; index1 < comment.Replies.length; index1++) {
        //        var replay = comment.Replies[index1];
        //        if (replay == null) {
        //            continue;
        //        }

        //        var replayNamePanl = replay.UserId == null ? ("<p>" + replay.AuthorName + "</p>") : ("<a target='_blank' href='/u/" + replay.UserId + "'>" + replay.AuthorName + "</a>");
        //        content += "<blockquote id='comment_" + replay.Id + "'> <strong>" + replayNamePanl + "</strong>对<strong>" + showUserNamePanl + "</strong>的评论:<br>" + replay.Content + "</blockquote>";
        //    }
        //}

        //content += "</div>\
        //            <div class='cm_a'><a id='reply_btn_" + comment.Id + "' cid='" + comment.Id + "'  href='javascript:article_comment_replay(" + comment.Id + "," + articleId + ");' class='blue comment_replay_btn'>回复这条评论</a> </div>\
        //            </div>\
        //            <div class='reply_n' id='reply_area_" + comment.Id + "'></div>\
        //            </div>";
    }

    $content.append($(content));

    var $paging = $("#ul_comments");
    pagingUrlBind(jsonResult, $paging);
    $paging.children("li").children("a").bind("click", function () {
        var currentIndex = $(this).attr("index");
        if (!currentIndex) {
            return;
        }
        article_comment_load(currentIndex, articleId);

    });
    //$(".span_vote_up").click(function () {
    //    comment_vote($(this).attr("cid"), 'up');
    //});

    //$(".span_vote_down").click(function () {
    //    comment_vote($(this).attr("cid"), 'down');
    //});
}

function article_comment_replay(commentId, articleId) {
    article_comment_replay_close(articleId);
    $("#reply_btn_" + commentId).text("关闭回复").attr("href", "javascript:article_comment_replay_close(" + articleId + ");");

    //用户必须登录才能回复评论
    //var currentUser = getCurrentUser();
    //if (currentUser == null) {
    //    showLogin();
    //    return;
    //}

    //用户不需登录就可回复评论
    var area = " <div class='rebox'><h4 class='page-header'>回复评论 </h4><div class='form-group'><label for='exampleInputEmail1'>评论</label>" +
        "<textarea  id='replay_content_" + commentId + "' class='form-control' rows='3'></textarea></div>" +
        "<button onclick='article_comment_replay_save(" + commentId + "," + articleId + ")' class='btn btn-primary'>回复评论</button></div>";

    $("#reply_area_" + commentId).empty().append($(area));
    //var area = "<div class='rebox'>\
    //                <div class='title'> <img src='/zh-cn/img/pl_t2.gif' style='vertical-align: middle' alt=''> &nbsp;&nbsp;<span style='color:#777'> 写下您的宝贵经验，分享也是一种快乐</span></div>\
    //                <p><textarea id='replay_content_" + commentId + "' maxlength='2000' style='width: 450px;' rows='5' cols='60'></textarea><span style='color:red;' id='content_error_" + commentId + "'></span></p>\
    //                <p style='color: #999'><button class='btn btn-info' onclick='article_comment_replay_save(" + commentId + "," + articleId + ")'>回复评论</button><span class='font12 gray'>&nbsp;文明上网，理性发言</span> <br></p>\
    //                <p style='display:none'><img src='/zh-cn/img/loadingCom.gif' style='height: 20px; width: 20px;' alt=''>提交中...</p>\
    //            </div>";

    //$("#reply_area_" + commentId).empty().append($(area));
}

function article_comment_replay_save(commentId, articleId) {
    //用户必须登录才能回复评论
    var currentUser = getCurrentUser();
    //if (currentUser == null) {
    //    showLogin();
    //    return;
    //}

    var content = $.trim($("#replay_content_" + commentId).val());
    if (!envalidReplayContent(commentId)) {
        return;
    }

    $.ajax({
        type: "post",
        async: false,
        timeout: 10000,
        url: "/Handlers/Comments/SaveArticleCommentReply.ashx",
        data: { t: 3, pid: articleId, content: content, cid: commentId },
        dataType: "json",
        cache: false,
        success: function (result) {
            if (!result) {
                location.reload();
                return;
            }

            if (!result.success) {
                alert(result.message);
                return;
            }

            var comment = null;
            //if (currentComments != null && currentComments.Comments != null) {
            //    for (var index = 0; index < currentComments.Comments.length; index++) {
            //        if (currentComments.Comments[index].Id == commentId) {
            //            comment = currentComments.Comments[index];
            //            break;
            //        }
            //    }
            //}
            if (comment == null) {
                if (currentUser == null) {
                    alert("回复成功，等待审核！");
                }
                location.reload();
                return;
            }

            var replayName = HTMLEncode(currentUser.NickName == null || ($.trim(currentUser.NickName)).length == 0 ? currentUser.Username : currentUser.NickName);
            var showUserNamePanl = comment.UserId == null ? ("<p>" + comment.AuthorName + "</p>") : ("<a target='_blank' href='/u/" + comment.UserId + "'>" + comment.AuthorName + "</a>");

            var _reply = "<blockquote> <strong><a target='_blank' href='/u/" + currentUser.Id + "'>" + replayName + "</a></strong>对<strong>" + showUserNamePanl + "</strong>的评论:<br>" + content + "</blockquote>";
            $("#reply_items_" + commentId).append($(_reply));
            article_comment_replay_close(articleId);
        },
        error: function () {
            alert("数据提交过程中发生异常！");
            location.reload();
        }
    });
}

function article_comment_replay_close(articleId) {
    $(".fa-reply").text("回复").each(function () {
        $(this).attr("href", "javascript:article_comment_replay(" + $(this).attr("cid") + "," + articleId + ");");
    });

    $(".reply_n").empty();
}
