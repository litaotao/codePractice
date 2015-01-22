/**
 * Created by shao on 2014-9-3.
 * wscn_cm => wallstreetcn comment module
 *
 */

(function (window, $, easyXDM) {
    "use strict";

    var WSCN_CM = {
        loadUserVoteData: function () {
            var commentIds = [];
            $('.wscn-cm-comment').each(function (i, elem) {
                commentIds.push($(elem).data('commentId'));
            })

            WSCN_CM.get(
                WSCN_CM.load_user_vote_data_url,
                {commentIds: commentIds},
                // success
                function (data) {
                    // easyXdm doesn't always serialize
                    if (typeof data != "object") {
                        data = jQuery.parseJSON(data);
                    }

                    $.each(data.up, function (i, commentId) {
                        var elem = $('.wscn-cm-comment-' + commentId + ' .wscn-cm-comment-up');
                        WSCN_CM.setCommentVote(elem);
                    });

                    $.each(data.down, function (i, commentId) {
                        var elem = $('.wscn-cm-comment-' + commentId + ' .wscn-cm-comment-down');
                        WSCN_CM.setCommentVote(elem);
                    });

                }
            );
        },

        /**
         * easyXdm doesn't seem to pick up 'normal' serialized forms yet in the
         * data property, so use this for now.
         * http://stackoverflow.com/questions/1184624/serialize-form-to-json-with-jquery#1186309
         */
        serializeObject: function (obj) {
            var o = {};
            var a = $(obj).serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },

        /**
         * Shorcut post method.
         *
         * @param string url The url of the page to post.
         * @param object data The data to be posted.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        post: function (url, data, success, error, complete) {
            // Wrap the error callback to match return data between jQuery and easyXDM
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.responseText, response.status);
                }
            };
            var wrappedCompleteCallback = function (response) {
                if ('undefined' !== typeof complete) {
                    complete(response.responseText, response.status);
                }
            };
            if (WSCN_CM.cors) {

                $.ajax({
                    url: url,
                    dataType: "html",
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    type: "POST"
                }).done(success).then(wrappedCompleteCallback).fail(wrappedErrorCallback);

            } else {
                $.post(url, data, success).error(wrappedErrorCallback).complete(wrappedCompleteCallback);
            }

        },

        /**
         * Shorcut delete method.
         *
         * @param string url The url of the page to delete.
         * @param object data The data to be deleted.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        delete: function (url, data, success, error, complete) {
            // Wrap the error callback to match return data between jQuery and easyXDM
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.responseText, response.status);
                }
            };
            var wrappedCompleteCallback = function (response) {
                if ('undefined' !== typeof complete) {
                    complete(response.responseText, response.status);
                }
            };
            if (WSCN_CM.cors) {

                $.ajax({
                    url: url,
                    dataType: "html",
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    type: "DELETE"
                }).done(success).then(wrappedCompleteCallback).fail(wrappedErrorCallback);

            } else {
                 $.ajax({
                    url: url,
                    dataType: "html",
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    type: "DELETE"
                }).done(success).then(wrappedCompleteCallback).fail(wrappedErrorCallback);
            }

        },

        /**
         * Shorcut get method.
         *
         * @param string url The url of the page to get.
         * @param object data The query data.
         * @param function success Optional callback function to use in case of succes.
         * @param function error Optional callback function to use in case of error.
         */
        get: function (url, data, success, error) {
            // Wrap the error callback to match return data between jQuery and easyXDM
            var wrappedErrorCallback = function (response) {
                if ('undefined' !== typeof error) {
                    error(response.responseText, response.status);
                }
            };
            if (WSCN_CM.cors) {

                $.ajax({
                    url: url,
                    dataType: "html",
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    type: "GET"
                }).then(success).fail(wrappedErrorCallback);

            } else {
                $.get(url, data, success).error(wrappedErrorCallback);
            }
        },


        loadCommentCounts: function () {
            var threadIds = [];
            var commentCountElements = $(WSCN_CM.commentCountElements);

            commentCountElements.each(function (i, elem) {
                var threadId = $(elem).data('wsThread') || WSCN_CM.threadId;
                if (threadId) {
                    threadIds.push(threadId);
                }
            });

            WSCN_CM.get(
                WSCN_CM.comment_counter_url,
                {ids: threadIds},
                function (data) {
                    // easyXdm doesn't always serialize
                    if (typeof data != "object") {
                        data = jQuery.parseJSON(data);
                    }

                    var threadData = {};

                    for (var i in data.threads) {
                        threadData[data.threads[i].uniqueKey] = data.threads[i];
                    }

                    commentCountElements.each(function (i, elem) {
                        var threadId = $(elem).data('wsThread') || WSCN_CM.threadId;
                        if (threadId) {
                            WSCN_CM.setCommentCount(elem, threadData[threadId]);
                        }
                    });
                    $('#wscn-cm-disqus_thread').hide();
                }
            );

        },

        setCommentCount: function (elem, threadObject) {
            if (threadObject == undefined) {
                $(elem).html('0');

                return;
            }

            $(elem).html(threadObject.numComments);
            $(elem).parent('span').show();
        },


        setCommentVote: function (elem) {
            elem.addClass('wscn-cm-comment-voted');
        }

    };


    function Thread(options) {
        this.thread_container = options.$target;
        var identifier = this.threadId = this.thread_container.data('wsThread') || options.threadId;

//        WSCN_CM.threadId = identifier;

        this.full_url = options.base_url + '/' + encodeURIComponent(identifier) + '/comments';

        this.getThreadComments(identifier);

        this.initializeListeners();


    }

    Thread.prototype = {
        constructor: Thread,

        /**
         * Gets the comments of a thread and places them in the thread holder.
         *
         * @param string identifier Unique identifier url for the thread comments.
         * @param string url Optional url for the thread. Defaults to current location.
         */
        getThreadComments: function (identifier, params, permalink) {
            var root = this;
            var event = jQuery.Event('wscn_cm_before_load_thread');

            event.identifier = identifier;

            event.params = params || {};
            event.params.permalink = encodeURIComponent(permalink || window.location.href);

            root.thread_container.trigger(event);
            WSCN_CM.get(
                this.full_url,
                event.params,
                // success
                function (data) {
                    root.thread_container.html(data);
                    root.thread_container.attr('data-thread', event.identifier);
                    root.thread_container.trigger('wscn_cm_load_thread', event.identifier);
                }
            );
        },

        /**
         * Initialize the event listeners.
         */
        initializeListeners: function () {
            var root = this;
            //时间判断
            var evTimeStamp = 0;
            this.thread_container.on('submit',
                'form.wscn-cm-comment-new-form',
                function (e) {
                    //限制短时间内重复按键提交
                    var now = +new Date();
                    if (now - evTimeStamp < 1000) {
                        return false;
                    }
                    evTimeStamp = now;

                    var that = $(this);
                    var content = that.find('textarea[name="content"]').val();
                    content = $.trim(content);
                    if(content.length < 1) {
                        return false;
                    }
                    var serializedData = WSCN_CM.serializeObject(this);

                    e.preventDefault();

                    var event = $.Event('wscn_cm_submitting_form');
                    that.trigger(event);

                    if (event.isDefaultPrevented()) {
                        return;
                    }
                    //验证(通过判断是否含有class判断验证时候正确)
                    if(that.find('.captcha-box').hasClass('error-captcha')){
                        // that.find('.wscn-cm-loading').hide();
                        // that.find('.submit').val('回复');
                        that.find('.captcha').focus();
                        return false;
                    }
                    //修改提交按钮value值
                    that.find('.submit').val('');
                    //显示loading界面
                    that.find('.wscn-cm-loading').show();

                    WSCN_CM.post(
                        this.action,
                        serializedData,
                        // success
                        function (data, statusCode) {
                            root.appendComment(data, that);
                            that.trigger('wscn_cm_new_comment', data);
                            that.find('.wscn-cm-loading').hide();
                            //显示提交按钮value值
                            that.find('.submit').val('回复');
                            //更新验证码
                            var randomNum=Math.floor(Math.random()*1000);
                            that.find('.captcha-img').attr('src', '/thread/captcha'+'?'+'randomNum'); 
                            that.find('.captcha').next().addClass('hide');
                        },
                        // error
                        function (data, statusCode) {
                            if (typeof data != "object") {
                                var dataCode = jQuery.parseJSON(data).errors[0].code;
                                //101代表需要验证码
                                //102代表验证码错误
                                if(dataCode == 101){
                                    //聚焦验证码输入框
                                    that.find('.submit').val('回复');
                                    that.find('.wscn-cm-loading').hide();
                                    that.find('.captcha').focus();
                                    //显示验证码
                                    that.find('.captcha-box').show(400);
                                    that.find('.wscn-cm-loading').hide();
                                    //添加class表明吗，没有输入正确验证码
                                    that.find('.captcha-box').addClass('error-captcha');
                                    that.find('.captcha').next()
                                    .removeClass('hide')
                                    .removeClass('fa-check-circle')
                                    .addClass('fa-times-circle');
                                }
                                return false;
                            }
                            var parent = that.parent();
                            parent.after(data);
                            parent.remove();
                            //提示重新发送
                            that.find('.submit').val('重新回复');
                        },
                        // complete
                        function (data, statusCode) {
                            that.trigger('wscn_cm_submitted_form', statusCode);
                        }
                    );
                    e.preventDefault();
                }
            );

            this.thread_container.on('click',
                '.wscn-cm-comment-reply',
                function (e) {
                    var form_data = $(this).data();
                    var that = $(this);
                    var current_comment_body = $(this).parents('.wscn-cm-comment-body');
                    if (that.hasClass('wscn-cm-comment-replying')) {
                        var current = current_comment_body.find('.wscn-cm-reply-box');

                        if (current.is(':hidden')) {
                            $('.wscn-cm-comment-body .wscn-cm-reply-box').hide();
                            current.show();
                        } else {
                            //todo动画
                            current.hide();
                        }
                        return that;
                    } else {
                        $('.wscn-cm-comment-body .wscn-cm-reply-box').hide()
                    }

                    that.addClass('wscn-cm-comment-replying');

                    var reply_box = root.thread_container.find('.wscn-cm-first-reply-box').clone();
                    reply_box.removeClass('wscn-cm-first-reply-box');
                    reply_box.children('form.wscn-cm-comment-new-form').data('parentId', form_data.id)
                    reply_box.find('input[name="parentId"]').val(form_data.id);
                    reply_box.appendTo(current_comment_body);

//                    this.get(
//                        form_data.url,
//                        {parentId: form_data.id},
//                        function(data) {
//                            that.addClass('wscn-cm-comment-replying');
//                            current_comment_body.append(data);
////                            that.trigger('wscn_cm_show_form', data);
//                        }
//                    );
                }
            );

            this.thread_container.on('click',
                '.wscn_cm_comment_reply_cancel',
                function (e) {
                    var form_holder = $(this).closest('.wscn_cm_comment_form_holder');

                    var event = $.Event('wscn_cm_cancel_form');
                    form_holder.trigger(event);

                    if (event.isDefaultPrevented()) {
                        return;
                    }

                    form_holder.closest('.wscn_cm_comment_reply').removeClass('wscn-cm-comment-replying');
                    form_holder.remove();
                }
            );

            this.thread_container.on('click',
                '.wscn_cm_comment_edit_show_form',
                function (e) {
                    var form_data = $(this).data();
                    var that = $(this);

                    WSCN_CM.get(
                        form_data.url,
                        {},
                        function (data) {
                            var commentBody = $(form_data.container);

                            // save the old comment for the cancel function
                            commentBody.data('original', commentBody.html());

                            // show the edit form
                            commentBody.html(data);

                            that.trigger('wscn_cm_show_edit_form', data);
                        }
                    );
                }
            );

            this.thread_container.on('submit',
                'form.wscn_cm_comment_edit_form',
                function (e) {
                    var that = $(this);

                    WSCN_CM.post(
                        this.action,
                        WSCN_CM.serializeObject(this),
                        // success
                        function (data) {
                            root.editComment(data);
                            that.trigger('wscn_cm_edit_comment', data);
                        },

                        // error
                        function (data, statusCode) {
                            var parent = that.parent();
                            parent.after(data);
                            parent.remove();
                        }
                    );
                    e.preventDefault();
                }
            );

            this.thread_container.on('click',
                '.wscn_cm_comment_edit_cancel',
                function (e) {
                    root.cancelEditComment($(this).parents('.wscn_cm_comment_body'));
                }
            );

            this.thread_container.on('click',
                '.wscn-cm-comment-vote',
                function (e) {
                    var that = $(this);

                    if (that.hasClass('wscn-cm-comment-voted')) {
                        return false;
                    }
                    var form_data = that.data();

                    // Get the form
                    WSCN_CM.post(
                        form_data.url,
                        {},
                        function (data) {
                            if (typeof data != "object") {
                                data = jQuery.parseJSON(data);
                            }
                            that.addClass('wscn-cm-comment-voted');
                            that.children('.num').html('('+data.total+')').show();
//                            $('#' + form_data.scoreHolder).html(data);
                            that.trigger('wscn_cm_vote_comment', data);
                        }
                    );
                }
            );
            
            //失去焦点验证
            this.thread_container.on('blur',
                '.captcha',
                function (e) {
                    var that = $(this);
                    var root=that.closest('.wscn-cm-thread');
                    var inputCaptcha=root.find('.captcha').val();
                    var form_data_url = that.data().url+inputCaptcha;
                    that.closest('.wscn-cm-reply-box').find('.captcha').next().removeClass('hide');
                        // Get the form
                        WSCN_CM.post(
                            form_data_url,
                            {},
                            //success
                            function (data) {
                                //显示正确图标
                               root.find('.captcha').next()
                               .removeClass('fa-times-circle')
                               .addClass('fa-check-circle');
                               //移除class
                               that.closest('.wscn-cm-reply-box').find('.captcha-box').removeClass('error-captcha');
                            },
                            // error
                            function (data) {
                                //显示错误图标
                                root.find('.captcha').next()
                               .removeClass('fa-check-circle')
                               .addClass('fa-times-circle');
                                //验证错误 addclass
                               that.closest('.wscn-cm-reply-box').find('.captcha-box').addClass('error-captcha');
                            }
                        );
                    }
            );
            // 按键验证
            // this.thread_container.on('keyup',
            //     '.captcha',
            //     function (e) {
            //         var that = $(this);
            //         var root=that.closest('.wscn-cm-thread');
            //         var inputCaptcha=root.find('.captcha').val();
            //         alert(inputCaptcha.length);
            //         if(inputCaptcha.length==3){
            //             var form_dataUrl = that.data().url+inputCaptcha;
            //             console.log(form_dataUrl);
            //             // Get the form
            //             WSCN_CM.post(
            //                 form_dataUrl,
            //                 {},
            //                 //success
            //                 function (data) {
            //                    // root.find('.captcha').next()
            //                    // .removeClass('fa-times-circle')
            //                    // .addClass('fa-check-circle');
            //                    // root.find('.submit').val('回复');
            //                    // root.find('.cannot-submit').hide();
            //                    alert('suc')
            //                 },
            //                 // error
            //                 function (data) {
            //                     alert('fil')
            //                 }
            //             );
            //         }
            //     }
            // );
            
            // 举报
            this.thread_container.on('click',
                '.wscn-cm-comment-report',
                function (e) {
                    var that = $(this);
                    var root=that.closest('.wscn-cm-thread');
                        if (that.hasClass('wscn-cm-comment-reported')) {
                            return false;
                        }
                        var form_data = that.data();

                        // Get the form
                        WSCN_CM.post(
                            form_data.url,
                            {},
                            function (data) {
                                if (typeof data != "object") {
                                    data = jQuery.parseJSON(data);
                                }
                                that.addClass('wscn-cm-comment-reported');
                                that.trigger('wscn_cm_report_comment', data);
                                //显示已举报
                                that.html('已举报');
                                that.css('visibility', 'visible');
                            }
                        );
                    }
            );
            //删除
            this.thread_container.on('click',
                '.wscn-cm-comment-delete',
                function (e) {
                    var that = $(this);
                    var root=that.closest('.wscn-cm-thread');
                    //确认删除
                    confirmSureDelete(root,reportPost);

                    function reportPost(){
                        if (that.hasClass('wscn-cm-comment-deleted')) {
                            return false;
                        }
                        var form_data = that.data();

                        // Get the form
                        WSCN_CM.delete(
                            form_data.url,
                            {},
                            function (data) {
                                that.closest('.wscn-cm-comment').find('.wscn-cm-comment-content').text('该条评论已删除')
                                .addClass('wscn-cm-comment-content-deleted');
                                that.closest('.wscn-cm-comment').find('.wscn-cm-comment-actions').hide();
                            }
                        );
                    }
                }
            );

            this.thread_container.on('click',
                '.wscn_cm_comment_remove',
                function (e) {
                    var form_data = $(this).data();

                    var event = $.Event('wscn_cm_removing_comment');
                    $(this).trigger(event);

                    if (event.isDefaultPrevented()) {
                        return
                    }

                    // Get the form
                    WSCN_CM.get(
                        form_data.url,
                        {},
                        function (data) {
                            // Post it
                            var form = $($.trim(data)).children('form')[0];

                            WSCN_CM.post(
                                form.action,
                                WSCN_CM.serializeObject(form),
                                function (data) {
                                    var commentHtml = $($.trim(data));

                                    var originalComment = $('#' + commentHtml.attr('id'));

                                    originalComment.replaceWith(commentHtml);
                                }
                            );
                        }
                    );
                }
            );

            this.thread_container.on('click',
                '.wscn_cm_thread_commentable_action',
                function (e) {
                    var form_data = $(this).data();

                    // Get the form
                    WSCN_CM.get(
                        form_data.url,
                        {},
                        function (data) {
                            // Post it
                            var form = $($.trim(data)).children('form')[0];

                            WSCN_CM.post(
                                form.action,
                                WSCN_CM.serializeObject(form),
                                function (data) {
                                    var form = $($.trim(data)).children('form')[0];
                                    var threadId = $(form).data().wsCommentThreadId;

                                    // reload the intire thread
                                    root.getThreadComments(threadId);
                                }
                            );
                        }
                    );
                }
            );

            //验证码换一张
            this.thread_container.on('click',
                '.change-captcha',
                function (e) {
                    var that = $(this);
                    var root = that.closest('.wscn-cm-thread');
                    var changeImgSrc=root.find('.captcha-img').attr('src');
                    var randomNum=Math.floor(Math.random()*1000);
                    root.find('.captcha-img').attr('src', '/thread/captcha'+'?'+randomNum);
                }
            );

            this.thread_container.on('click',
                '.wscn-cm-paginator a',
                function (e) {
                    var data = $(this).data();
                    var that = $(this);
                    var identifier = root.threadId;

                    var params = {
                        page: data.page || 1,
                        sorter: $('.wscn-cm-sort .wscn-cm-current').data('sort')
                    };

                    root.getThreadComments(identifier, params);
                    //定位comment
                    locateComment(that);
                }
            );

            this.thread_container.on('click',
                '.wscn-cm-sort a',
                function (e) {
                    var data = $(this).data();

                    var identifier = root.threadId;

                    var params = {
                        sorter: data.sort
                    };

                    root.getThreadComments(identifier, params);
                }
            );

            root.thread_container.on('wscn_cm_new_comment', function (e) {
                WSCN_CM.loadCommentCounts();
            })
        },

        appendComment: function (commentHtml, form) {
            var root = this;
            var form_data = form.data();
            var parentId = form_data.parentId;
            //判断是回复文章还是回复用户
            if (parentId) {
                var reply_box = form.parent();
                reply_box.parents('.wscn-cm-comment').after(commentHtml);
                reply_box.hide();
//                form.next().prepend(commentHtml);
//                $('#wscn-cm-comment-'+form_data.parent).after(commentHtml);
//                var form_parent = form.closest('.wscn_cm_comment_form_holder');
//
//                // reply button holder
//                var reply_button_holder = form.closest('.wscn_cm_comment_reply');
//
//                var comment_element = form.closest('.wscn_cm_comment_show')
//                    .children('.wscn_cm_comment_replies');
//
//                reply_button_holder.removeClass('wscn-cm-comment-replying');
//
//                comment_element.prepend(commentHtml);
//                comment_element.trigger('wscn_cm_add_comment', commentHtml);
//
//                // Remove the form
//                form_parent.remove();
            } else {
                // Insert the comment 评论文章
                var comment_element = root.thread_container.find('.wscn-cm-comments');
                comment_element.prepend(commentHtml);
                //定位到评论
                locateComment(form);
                //评论动画
                showCommentAnimation(form);
                //todo
                $('.wscn-cm-title').show();
            }
            form.trigger('wscn_cm_add_comment', commentHtml);

            // "reset" the form
            form = $(form[0]);
            form[0].reset();
            form.children('.wscn_cm_form_errors').remove();
        },

        editComment: function (commentHtml) {
            var commentHtml = $($.trim(commentHtml));
            var originalCommentBody = $('#' + commentHtml.attr('id')).children('.wscn_cm_comment_body');

            originalCommentBody.html(commentHtml.children('.wscn_cm_comment_body').html());
        },

        cancelEditComment: function (commentBody) {
            commentBody.html(commentBody.data('original'));
        }
    };


    $.fn.wscn_comments = function (ops) {

        var options = $.extend({}, $.fn.wscn_comments.defaults, ops);

        WSCN_CM.threadId = options.threadId;
        WSCN_CM.base_url = options.base_url;
        WSCN_CM.cors = options.cors;
        WSCN_CM.commentCountElements = options.counter;
        WSCN_CM.comment_counter_url = WSCN_CM.base_url + '/counter';
        WSCN_CM.load_user_vote_data_url = WSCN_CM.base_url + '/user/votes';

        window.wscn = window.wscn || {};
        window.wscn.comments = WSCN_CM;

        if (WSCN_CM.commentCountElements.length > 0) {
            WSCN_CM.loadCommentCounts();
        }

        return this.each(function () {
            options.$target = $(this);
            new Thread(options);
        })

    }

    $.fn.wscn_comments.defaults = {
        base_url: 'http://wallstreetcn.com/thread',
        counter: 'span.wscn-cm-counter',
        threadId: 'test',
        cors: false
    };

    //发布评论动画效果
    function showCommentAnimation(that) {
        var root=that.closest('.user-comments');
        var showComment=root.find('.wscn-cm-comments').find('.wscn-cm-comment').eq(0);
        showComment.addClass('wscn-cm-show');
        showComment.prepend("<div class='wscn-cm-newpost'></div>");
        showComment.find('.wscn-cm-newpost').animate({ 
          opacity:'0' 
           },5000,function(){
               showComment.find('.wscn-cm-avatar').css('left', '0');
       }); 
    };

    // 定位到评论
    function locateComment(that) {
        var root=that.closest('.user-comments');
            var commentsTop=root.find('.wscn-cm-comments').position().top;
            $("html,body").animate({scrollTop:commentsTop},600);  
        
    };
    //确定删除
    function confirmSureDelete(root,clickFn){
        root.find('.modal').show();
        $('#wscn-cm-confirm-report').click(function(event) {
            clickFn&&clickFn();
            root.find('.modal').hide();
        });
        $('#wscn-cm-cancel-report').click(function(event) {
            root.find('.modal').hide();
        });
        $('#wscn-cm-hide-report').click(function(event) {
            root.find('.modal').hide();
        });
    }
})(window, window.jQuery, window.easyXDM);


