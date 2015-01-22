/**
 * 新闻相关的功能
 *------------------------------------------------------
 * 获取新闻信息，更新新闻状态
 *------------------------------------------------------
 *
 *
 * @author ranj,739521119@qq.com
 * @time 2014-06-13 10:04:57
 */
(function (window, document, $) {
    var extend = {
        user_info: function (isCallSuccess, account) {
            var ispostrequest = '0';
            var url = ispostrequest == "0" && location.href.indexOf('?returnUrl=') <= 0 ? location.href : "";
            var param = url == "" ? "" : "?returnUrl=" + url;

            var signinurl = '/sign-in' + param;
            var signupurl = '/customer/sign-up';
            //var passwordurl = '/account/forget-password';
            var signOutUrl = '/sign-out' + param;

            var $loginInfo = $("#user-login-info").empty();

            if (account == null) {
                $loginInfo.append($("<i class='fa fa-desktop'></i>\
                                    <a href='" + signinurl + "' title='登录' class='mR10' target='_parent'>登录</a>\
                                    <i class='fa fa-user'></i>\
                                    <a href='" + signupurl + "' title='注册' class='mR10' target='_parent'>注册</a>"));
                return;
            }

            var accounturl = account.Url;
            $loginInfo.append($("<span><img src='" + account.Logo + "' style='width:20px;height:20px;margin-right:10px;'/>" + account.Name + "  </span>\
                <i class='fa fa-home'></i>\
                <a href='" + accounturl + "' title='个人主页' class='mR10' target='_parent'>个人主页</a> \
                 <i class='fa fa-sign-out'></i>\
                <a href='" + signOutUrl + "' title='注销' class='mR10' target='_parent'>注销</a>"));
        },
        product_summary: function (isCallSuccess, result) {
            if (result) {
                $("#product-keyWords").attr("placeholder", "产品总数：" + result);
            }
        }
    };

    window.accountApi.news = {
        extend: extend,
        syntax_high_lighter: function () {
            function getSyntaxHighlighter() {
                var args = arguments,
                    result = [];

                for (var i = 0; i < args.length; i++) {
                    result.push(args[i].replace('@', '/assets/Syntaxhighlighter/scripts/'));
                }
                return result;
            };

            SyntaxHighlighter.autoloader.apply(null, getSyntaxHighlighter(
                'applescript            @shBrushAppleScript.js',
                'actionscript3 as3      @shBrushAS3.js',
                'bash shell             @shBrushBash.js',
                'coldfusion cf          @shBrushColdFusion.js',
                'cpp c                  @shBrushCpp.js',
                'c# c-sharp csharp      @shBrushCSharp.js',
                'css                    @shBrushCss.js',
                'delphi pascal          @shBrushDelphi.js',
                'diff patch pas         @shBrushDiff.js',
                'erl erlang             @shBrushErlang.js',
                'groovy                 @shBrushGroovy.js',
                'java                   @shBrushJava.js',
                'jfx javafx             @shBrushJavaFX.js',
                'js jscript javascript  @shBrushJScript.js',
                'perl pl                @shBrushPerl.js',
                'php                    @shBrushPhp.js',
                'text plain             @shBrushPlain.js',
                'py python              @shBrushPython.js',
                'ruby rails ror rb      @shBrushRuby.js',
                'sass scss              @shBrushSass.js',
                'scala                  @shBrushScala.js',
                'sql                    @shBrushSql.js',
                'vb vbnet               @shBrushVb.js',
                'xml xhtml xslt html    @shBrushXml.js'
            ));
            SyntaxHighlighter.all();
        },
        comment: {
            init: function (pageIndex, articleId, callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: '/Handlers/OutputComment.ashx',
                    data: { p: pageIndex, t: 3, targetId: articleId },
                    dataType: "json",
                    cache: true,
                    success: function (result) {
                        if (typeof callback == 'function') {
                            callback(true, result, articleId);
                        }
                    },
                    error: function () {
                        callback(false, null, articleId);
                    }
                });
            },
            data_bind: function (isCallSuccess, result, articleId) {
                var $content = $("#comments").empty();
                $("#alert-warning").remove();

                if (result == null || isNullOrEmpty(result.Comments)) {
                    $content.append($("<div class='cm_i'>暂无评论！</div>"));
                    return;
                }

                var content = '';
                for (var index = 0; index < result.Comments.length; index++) {
                    var comment = result.Comments[index];
                    if (comment == null) {
                        continue;
                    }

                    var authorInfo = "<a target='_blank' class='pull-left thumbnail gray' href='" + comment.UserUrl + "' ><img class='media-object' data-src='holder.js/50x50' alt='32x32' style='width: 50px; height: 50px;' src='" + comment.UserImage + "'></a>";

                    content += "<div class='media'>" + authorInfo +
                        "<div class='media-body'><h5>" + comment.AuthorName + "<small>" + comment.ShowCreateTime + "</small></h5>" + comment.Content + "<br>" +
                        "<a  class='fa fa-reply' id='reply_btn_" + comment.Id + "' cid='" + comment.Id + "'  href='javascript:window.accountApi.news.comment.reply.reply_comment(" + comment.Id + "," + articleId + ");'> 回复</a>" +
                        "<div class='reply_n' id='reply_area_" + comment.Id + "'></div>";

                    if (!isNullOrEmpty(comment.Replies)) {
                        for (var index1 = 0; index1 < comment.Replies.length; index1++) {
                            var replay = comment.Replies[index1];
                            if (replay == null) {
                                continue;
                            }

                            var replayInfo = "<a target='_blank' class='pull-left thumbnail gray' href='" + replay.UserUrl + "' ><img class='media-object' data-src='holder.js/50x50' alt='32x32' style='width: 50px; height: 50px;' src='" + replay.UserImage + "'></a>";
                            content += "<div class='media'>" + replayInfo +
                                "<div class='media-body'><h5>" + replay.AuthorName + "<small>" + replay.ShowCreateTime + "</small></h5>" + replay.Content + "<br></div></div>";
                        }
                    }
                    content += "</div></div><hr/>";

                }

                $content.append($(content));

                var $paging = $("#ul_comments").empty();
                $paging.append($(window.accountApi.news.comment.paging(result)));

                $paging.children("li").children("a").bind("click", function () {
                    var currentIndex = $(this).attr("index");
                    if (!currentIndex) {
                        return;
                    }

                    window.accountApi.news.comment.init(currentIndex, articleId, window.accountApi.news.comment.data_bind);
                });
            },
            reply: {
                reply_comment_close: function (articleId) {
                    $(".fa-reply").text("回复").each(function () {
                        $(this).attr("href", "javascript:window.accountApi.news.comment.reply.reply_comment(" + $(this).attr("cid") + "," + articleId + ");");
                    });

                    $(".reply_n").empty();
                },
                save_reply_comment: function (commentId, articleId) {
                    var postDatas = {
                        'articleId': articleId,
                        'commentId': commentId,
                        'content': $.trim($("#replay_content_" + commentId).val())
                    };

                    if (isNullOrEmpty(postDatas.content)) {
                        alert("内容不能为空哦！");
                        return;
                    }

                    $.ajax({
                        type: "post",
                        async: true,
                        timeout: 10000,
                        url: "/Handlers/Comments/SaveArticleCommentReply.ashx",
                        data: postDatas,
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

                            window.accountApi.account.isAuthenticated(function (isCallSuccess, isAuth) {
                                //未登录，评论不能立即显示
                                if (!isAuth) {
                                    alert("评论提交成功！谢谢您的评论,审核通过后立即显示!");
                                    return;
                                }

                                //已登录，评论立即显示
                                alert("评论提交成功！谢谢您的评论!");
                                location.reload();
                            });
                        },
                        error: function () {
                            alert("服务器正忙,请稍候重试...");
                        }
                    });
                },
                reply_comment: function (commentId, articleId) {
                    window.accountApi.news.comment.reply.reply_comment_close(articleId);

                    $("#reply_btn_" + commentId).text("关闭回复").attr("href", "javascript:window.accountApi.news.comment.reply.reply_comment_close(" + articleId + ");");

                    //用户必须登录才能回复评论
                    //var currentUser = getCurrentUser();
                    //if (currentUser == null) {
                    //    showLogin();
                    //    return;
                    //}

                    //用户不需登录就可回复评论
                    var area = " <div class='rebox'><h4 class='page-header'>回复评论 </h4><div class='form-group'><label>评论</label>" +
                        "<textarea  id='replay_content_" + commentId + "' class='form-control' rows='3'></textarea></div>" +
                        "<button onclick='window.accountApi.news.comment.reply.save_reply_comment(" + commentId + "," + articleId + ")' class='btn btn-primary'>回复评论</button></div>";

                    $("#reply_area_" + commentId).empty().append($(area));
                },
            },
            paging: function (jsonResult) {
                var li = '';

                if (jsonResult == null || isNullOrEmpty(jsonResult.Comments)) {
                    return li;
                }

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

                return li;
            },
            post: {
                post_comment: function (postDatas, validate, callback) {
                    if (!validate(postDatas)) {
                        return;
                    }

                    $.ajax({
                        type: "post",
                        async: true,
                        timeout: 10000,
                        url: "/Handlers/SaveComment.ashx",
                        data: postDatas,
                        dataType: "json",
                        cache: false,
                        success: function (result) {
                            callback(true, result);
                        },
                        error: function () {
                            callback(false, result);
                        }
                    });
                },
                post_comment_validate: function (comment) {
                    if (comment.articleId == 0) {
                        alert('数据加载异常，请刷新页面后重试!');
                        return false;
                    }

                    if (isNullOrEmpty(comment.content)) {
                        alert("您的评论内容为空哦！");
                        return false;
                    }
                    return true;
                },
                post_comment_callback: function (isCallSuccess, result) {
                    if (!isCallSuccess) {
                        alert("服务器正忙,请稍候重试...");
                        return;
                    }

                    if (!result) {
                        alert("服务器正忙,请稍候重试...");
                        return;
                    }

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    window.accountApi.account.isAuthenticated(function (isCall, isAuth) {
                        //未登录，评论不能立即显示
                        if (!isAuth) {
                            alert("评论提交成功！谢谢您的评论,审核通过后立即显示!");
                            return;
                        }

                        //已登录，评论立即显示
                        alert("评论提交成功！谢谢您的评论!");
                        location.reload();
                    });
                }
            }
        },
        popular: {
            change_popular: function (articleId, isUp, callback) {
                if (arrayContains(tryGetCookieValue("articleIds", '').split(','), articleId)) {
                    alert("您已投票！");
                    return;
                }

                $.ajax({
                    type: "post",
                    async: true,
                    timeout: 10000,
                    data: { id: articleId, t: isUp },
                    url: "/Articles/Handlers/ChangeArticleHot.ashx",
                    dataType: "json",
                    cache: true,
                    success: function (result) {
                        callback(true, articleId, result);
                    },
                    error: function () {
                        callback(false, articleId, null);
                    }
                });
            },
            change_popular_callback: function (isCallSuccess, articleId, result) {
                if (!isCallSuccess) {
                    alert("服务器正忙,请稍候重试...");
                    return;
                }

                if (!result) {
                    alert("服务器正忙,请稍候重试...");
                    return;
                }

                var $attribute = $("#up_attribute,#left_top_attribute");
                var currentCount = parseInt($attribute.first().text());
                $attribute.text(currentCount + 1);

                var articleIds = tryGetCookieValue('articleIds');
                if (articleIds == '') {
                    setCookie('articleIds', articleId, 24 * 1000 * 60 * 60 * 7);
                } else {
                    setCookie('articleIds', (articleIds + "," + articleId), 24 * 1000 * 60 * 60 * 7);
                }
            }
        },
        tag: {
            is_collected: function (articleId, callback) {
                window.accountApi.account.isAuthenticated(function (isCallSuccess, isAuth) {
                    if (!isAuth) {
                        callback(true, false, articleId, null);
                        return;
                    }

                    $.ajax({
                        type: "post",
                        async: true,
                        timeout: 10000,
                        data: { action: "checkIsAddArticle", id: articleId },
                        url: "/Tag/TagOperationHandler.ashx",
                        dataType: "json",
                        cache: true,
                        success: function (result) {
                            callback(true, true, articleId, result);
                        },
                        error: function () {
                            callback(false, true, articleId, false);
                        }
                    });
                });
            },
            is_collected_callback: function (isCallSuccess, isAuth, articleId, result) {
                var $collect = $("#item-collect").empty();
                if (result) {
                    $collect.html('<i class="fa fa-star"></i> 已收藏');
                    return;
                }

                $collect.html('<i class="fa fa-star"></i> 点击收藏').click(function () {
                    window.accountApi.news.tag.collect(articleId);
                });

                return;
            },
            collect: function (articleId) {
                window.accountApi.news.tag.is_collected(articleId, function (isCall, isSignIn, aid, result) {
                    if (!isSignIn) {
                        window.accountApi.account.redirect_sign_in(location.href);
                        return;
                    }
                    if (result) {
                        alert("您已收藏！");
                        return;
                    }

                    ShowTagAddPanel('GetArticleTags', '#ArticleTagModal', '#article-modal-body', articleId, 'wz');
                });
            },
            get_tags: function (articleId, callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: "/Tag/TagOperationHandler.ashx",
                    data: { action: "GetArticleTagsByArticleId", id: articleId },
                    dataType: "json",
                    cache: true,
                    success: function (info) {
                        callback(true, info);
                    },
                    error: function () {
                        callback(false, null);
                    }
                });
            },
            get_tags_callback: function (isCallSuccess, info) {
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
        },
        attribute: {
            get_attribute: function (articleId, callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: "/Articles/Handlers/GetArticleAttribute.ashx",
                    data: { id: articleId },
                    dataType: "json",
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, null);
                    }
                });
            },
            get_attribute_callback: function (isCallSuccess, result) {
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
        },
        columns: {
            get_columns: function (columnId, callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    data: { cid: columnId },
                    url: "/Articles/Handlers/GetArticleByColumn.ashx",
                    dataType: "json",
                    cache: true,
                    success: function (result) {
                        callback(true, result);
                    }, error: function () {
                        callback(false, null);
                    }
                });
            },
            get_columns_callback: function (isCallSuccess, result) {
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
        },
        newest_news: {
            get_newest_news: function (callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: "/Articles/Handlers/GetNewArticle.ashx",
                    dataType: "json",
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, result);
                    }
                });
            },
            get_newest_news_callback: function (isCallSuccess, result) {
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
            }
        },
        hot_news: {
            get_hot_news: function (callback) {
                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: "/Articles/Handlers/GetHotArticle.ashx",
                    dataType: "json",
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, result);
                    }
                });
            },
            get_hot_news_callback: function (isCallSuccess, result) {
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
            }
        },
        group: {
            get_siblings: function (articleId, groupId, callback) {
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
                        callback(true, articleId, result);
                    },
                    error: function () {
                        callback(false, articleId, result);
                    }
                });
            },
            get_siblings_callback: function (isCallSuccess, articleId, result) {
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
        },
        update_view_count: function (articleId) {
            $.ajax({
                type: "post",
                async: true,
                timeout: 2000,
                data: { id: articleId },
                url: "/Articles/Handlers/UpdateArticleClickCount.ashx",
                dataType: "json",
                cache: false//缓存
            });
        },
        features: function (articleId, groupId) {
            window.accountApi.apiReady(window.accountApi.news.extend.user_info);
            window.accountApi.news.comment.init(1, articleId, window.accountApi.news.comment.data_bind);
            window.accountApi.product.get_published_product_count(window.accountApi.news.extend.product_summary);
            window.accountApi.news.tag.is_collected(articleId, window.accountApi.news.tag.is_collected_callback);
            window.accountApi.news.attribute.get_attribute(articleId, window.accountApi.news.attribute.get_attribute_callback);
            window.accountApi.news.tag.get_tags(articleId, window.accountApi.news.tag.get_tags_callback);
            window.accountApi.news.columns.get_columns(7, window.accountApi.news.columns.get_columns_callback);
            window.accountApi.news.hot_news.get_hot_news(window.accountApi.news.hot_news.get_hot_news_callback);
            window.accountApi.news.newest_news.get_newest_news(window.accountApi.news.newest_news.get_newest_news_callback);
            window.accountApi.news.group.get_siblings(articleId, groupId, window.accountApi.news.group.get_siblings_callback);

            $("#postComment").click(function () {
                var postDatas = {
                    'targetId': articleId,
                    'content': $.trim($("#comment-content").val()),
                    'moduleType': 3
                };

                window.accountApi.news.comment.post.post_comment(postDatas, window.accountApi.news.comment.post.post_comment_validate, window.accountApi.news.comment.post.post_comment_callback);
            });

            $("#article_top,#left_top_article").click(function () {
                window.accountApi.news.popular.change_popular(articleId, 1, window.accountApi.news.popular.change_popular_callback);
            });

            $("#article_down").click(function () {
                window.accountApi.news.popular.change_popular(articleId, 0, window.accountApi.news.popular.change_popular_callback);
            });

            $("#article-attention-save-tags").click(function () {
                var $self = $(this);
                window.accountApi.account.isAuthenticated(function (isCallSuccess, isAuth) {
                    if (!isAuth) {
                        window.accountApi.account.redirect_sign_in(location.href);
                        return;
                    }
                    if (!CheckTagInfoLength() || !checkLength(6, "tagIds")) {
                        alert("请选择或者添加一个以上的标签");
                        return;
                    }

                    //选中的标签
                    var checkedTags = GetCheckedTag();
                    //新加的标签
                    var regS = new RegExp("，", "g");
                    var addTags = $("#tagInfo").val().replace(regS, ",");

                    $.ajax({
                        type: "post",
                        async: true,
                        timeout: 10000,
                        data: { action: "AttentionArticle", checkedTags: checkedTags, addTags: addTags, id: articleId },
                        url: "/Tag/TagOperationHandler.ashx",
                        dataType: "json",
                        beforeSend: function () {
                            window.accountApi.extend.booststrap.button.loading($self);
                        },
                        complete: function () {
                            window.accountApi.extend.booststrap.button.complete($self);
                        },
                        cache: true,
                        success: function (result) {
                            if (!result.success) {
                                alert(result.message);
                                return;
                            }

                            alert("文章收藏成功");
                            location.reload();
                        },
                        error: function () {
                            alert("服务器正忙,请稍候重试...");
                        }
                    });
                });
            });

            window.accountApi.news.syntax_high_lighter();
            setTimeout(function () {
                $(".toolbar").css("display", "none");
                window.accountApi.news.update_view_count(articleId);
            }, 2000);
            
            //广告////////////////////////////////////////////////////////////////////////////
            (function () {
                var adarray = [];
                $("div[data-mode=ad]").each(function () {
                    var key = $(this).attr('data-key');
                    if (!isNullOrEmpty(key) && !arrayContains(adarray, key)) {
                        adarray.push(key);
                    }
                });

                if (adarray.length == 0) {
                    return;
                }

                function bindAds($this, ad) {
                    if (!isNullOrEmpty(ad.Contents)) {
                        $this.empty().append($(ad.Contents[0].Value));
                        $this.click(function () {
                            $.ajax({
                                type: "post",
                                async: true,
                                timeout: 10000,
                                data: { id: ad.Contents[0].Key },
                                url: '/Handlers/Ads/RecordAdState.ashx'
                            });
                        });
                    }
                }

                $.ajax({
                    type: "get",
                    async: true,
                    timeout: 10000,
                    url: '/Handlers/Ads/GetAds.ashx',
                    data: { k: adarray, language: 0 },
                    traditional: true,
                    dataType: "json",
                    cache: true,
                    success: function (ads) {
                        if (!ads || ads.length == 0) {
                            return;
                        }

                        $("div[data-mode=ad]").each(function () {
                            var key = $(this).attr('data-key');
                            if (!isNullOrEmpty(key)) {
                                for (var index = 0; index < ads.length; index++) {
                                    var ad = ads[index];
                                    if (ad.Key == key) {
                                        bindAds($(this), ad);
                                        break;
                                    }
                                }
                            }
                        });
                    }
                });

            })();
        }
    };

})(window, document, $);
