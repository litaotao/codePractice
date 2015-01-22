/**
 * @author Silen <silenme@vip.qq.com>
 * @created 2014-02-18 11:27
 */
var domain = BASE_DOMAIN + '/';
//app url
var appUrl = 'http://app' + domain;

//ucenter url
var ucenterUrl = 'http://uc' + domain;

//static url
var staticUrl = 'http://static' + domain;

//评论框的显示文字
var tips = '\u6587\u660e\u4e0a\u7f51\uff0c\u767b\u5f55\u53d1\u8d34';


var auth = getCookie('auth');

var userid = getCookie('uid');

var username = decodeURI(getCookie('username'));

var CommentJs = {
    pagenum : 0,
    thisUrl : location.href,
    _initBox : function(setting){
        var that = this;
        that.setting = setting;
        //扩展控制
        if (!that.setting.extend)return false;
        
        if ( !that.setting.comment || !that.setting.topicid) return false;
        var commentHtml = '<link href="'+staticUrl+'css/comment/comment.css" rel="stylesheet" type="text/css" /><div id="commentBox"><div class="art_plang art_box_bor mb20">';
        if ( that.setting.form)commentHtml += that.template_form();
        if ( that.setting.list)commentHtml += that.template_list();
        commentHtml += '</div></div>';
        that.setting.inbox ? $(that.setting.box).html(commentHtml) : $(that.setting.box).after(commentHtml);
        that.setting.tips = that.setting.tips ? that.setting.tips : tips;

        that._initJs();
        if ( that.setting.list)that.page(1)
        $('#commentForm').submit(function() {
            var p = {
                topicid: that.setting.topicid,
                type_to_id: typeof(that.setting.type_to_id) == 'undefined' ? '' : that.setting.type_to_id,
                content: $.trim($('#commentContent').val()),
                star: $.trim($('#commentStar').val()),
                seccode: $.trim($('#commentSeccode').val()),
                isseccode  : that.setting.isSeccode
            };
            if (!auth) {
                that.login();
                return false;
            }
            if (!$.trim(p.content)) {
                alert('评论内容不能为空！');
                return false;
            }
            if (that.setting.isSeccode && !(p.seccode = $.trim($('#commentSeccode').val()))) {
                alert('验证码不能为空！');
                return false;
            }
            $.getJSON(appUrl + '?app=comment&controller=comment&action=kj_comment&jsoncallback=?', p, function(r) {
                if (r.state) {
                    if(that.setting.share)$.getJSON(appUrl+'?app=comment&controller=comment&action=kj_share&jsoncallback=?', {to: 'bbs', url: that.thisUrl, topicid: that.setting.topicid, content: p.content, star: p.star});
                    that.setting.ischeck ? alert('发表成功，评论审核中') : $('#commentList').prepend(that.view(r.data));
                    that.close(true);
                } else {
                    that.setting.isSeccode && CommentJs.seccode();
                    alert(r.error);
                }
            }, 'json');
            return false;
        });
        $('#subReply').live('click', function() {
            var p = {
                topicid: that.setting.topicid,
                type_to_id: typeof(that.setting.type_to_id) == 'undefined' ? '' : that.setting.type_to_id,
                followid: $('#replyContent').attr('commentid'),
                content: $.trim($('#replyContent').val()),
                seccode: $.trim($('#replySeccode').val()),
                isseccode  : that.setting.isSeccode
            };
            if (!auth) {
                that.login();
                return false;
            }
            if (!$.trim(p.content)) {
                alert('回复内容不能为空！');
                return false;
            }
            if (that.setting.isSeccode && !(p.seccode = $.trim($('#commentSeccode').val()))) {
                alert('验证码不能为空！');
                return false;
            }
            $.getJSON(appUrl + '?app=comment&controller=comment&action=kj_reply&jsoncallback=?', p, function(r) {
                if (r.state) {
                    if(that.setting.share)$.getJSON(appUrl+'?app=comment&controller=comment&action=kj_share&jsoncallback=?', {to: 'bbs', url: that.thisUrl, topicid: that.setting.topicid, content: p.content});
                    if (that.setting.ischeck){
                        alert('发表成功，回复审核中')
                    } else{
                        var reply_html = ' <li>'+
                            '<div class="art_plg clearfix">'+
                            '<div class="fn-fl art_plg_l"><img src="'+ucenterUrl+'avatar.php?uid=' + userid + '&size=middle" width="40" height="40" alt="" /></div>'+
                            '<div class="fn-fl ml10 art_plg_r">'+
                            ' <div class="art_plg_txt mb5">'+
                            '<span class="art_plg_name mr10 f-detc fts14">' + username + '</span>'+
                            '<span class="art_plg_time f-more">刚刚</span>'+
                            '</div>'+
                            '<div class="art_plg_cont fts14">' + p.content + ' </div>'+
                            '</div>'+
                            ' </div>'+
                            '  </li>';
                        $('.reply-list-grid_'+ p.followid +' .art_plang_list_gird').prepend(reply_html);

                    }
                    $('.j-reply-btn').parent().parent().removeClass('reply-show');
                    $('.reply-grid').remove();
                    that.close(true);
                } else {
                    that.setting.isSeccode && CommentJs.seccode();
                    alert(r.error);
                }
            }, 'json');
            return false;
        })
        $('#subReply').ajaxSend(function() {
            $(this).prop('disabled', true);
        }).ajaxSuccess(function() {
            $(this).prop('disabled', false);
        });
        $('#commentBtn').ajaxSend(function() {
            $(this).prop('disabled', true);
        }).ajaxSuccess(function() {
            $(this).prop('disabled', false);
        });

    },
    _initJs : function(){
        var that = this;
        $('#commentContent').live('focus', function() {
            if ($.trim($(this).val()) == that.setting.tips) {
                $(this).val('');
                !$('#commentSite').hasClass('art_plang_bd_active') && $('#commentSite').addClass('art_plang_bd_active').animate({height: username ? '175px' : '125px'}, 500);
            }
        });

        /* $('#commentContent').live('blur', function() {
         that.close();
         });*/
        $(document).click(function() {
            that.close();
        });

        $('#commentContent').val(that.setting.tips);
        $('#commentSite').click(function(e) {
            e.stopPropagation();
        });

        $('#commentMore').live('click', function() {

            that.page(++that.pagenum);
        });

        $('.j-reply-btn').live('click', function(){
            if(!$(this).parent().parent().hasClass('reply-show')){
                $('.j-reply-btn').parent().parent().removeClass('reply-show');
                $('.reply-grid').remove();
                $(this).parent().parent().addClass('reply-show').append(that.template_reply($(this).attr('commentid')));
            } else {
                $('.j-reply-btn').parent().parent().removeClass('reply-show');
                $('.reply-grid').remove();
            }
        })

        $('.j-reply-txt').live('click',function(){
            if($(this).val() ==  that.setting.tips)$(this).val('');
        })
        $('.j-reply-txt').live('blur',function(){
            if($(this).val()==''){
                $(this).val(tips);
            }
        })
        /*$('.j-sub').live('click',function(){
            $('.reply-grid').remove();
            $('.reply').removeClass('reply-show');
        })*/
    },
    close: function(ignore) {
        var that = this;
        var OS = $('#commentSite');
        var OC = $('#commentContent');
        if (ignore || (OS.hasClass('art_plang_bd_active') && !$.trim(OC.val()))) {
            OC.val(that.setting.tips);
            $('#commentStar').val('');
            OS.removeClass('art_plang_bd_active').animate({height: '70px'}, 500, function() {
                if (that.setting.isSeccode) {
                    that.seccode();
                    $('#commentSeccode').val('');
                    $('#replySeccode').val('');
                }
            });
        }
    },
    login: function() {
        var that = this;
        var r = '?redirect=' + encodeURIComponent(that.thisUrl + '#commentBox');
        window.location.href = 'http://passport' + domain + 'login' + r;
    },
    seccode: function() {
        $('#commentSeccodeImg').attr('src', appUrl + '?app=system&controller=seccode&action=image&r=' + Math.random() * 5);
        $('#replySeccodeImg').attr('src', appUrl + '?app=system&controller=seccode&action=image&r=' + Math.random() * 5);
    },
    page: function(index) {
        var that = this;
        $.getJSON(appUrl+'?app=comment&controller=comment&action=kj_page&jsoncallback=?', {topicid: that.setting.topicid, page: index, type_to_id: that.setting.type_to_id}, function(r) {
            var t = r.data.length > 0;
            if (t) {
                for (var i in r.data)
                    $('#commentList').append(that.view(r.data[i]));
            }
            that.pagenum = index;
            if (r.count > (index*r.pagesize)) {
                if(that.setting.morelist)$('.grt_plg_more').html('<a id="commentMore" href="javascript:void(0)">加载更多</a>');
            } else {
                $('.grt_plg_more').html('');
            }
        });
    },
    reply_html : function(data,commentid)
    {
        if (!data)return '';
        reply_html = '<div class="reply-list-grid_'+commentid+'">'+//此为第二级回复
            '<ul class="art_plang_list_gird">';
        for (var i in data) {
            reply_html += ' <li>'+
                '<div class="art_plg clearfix">'+
                '<div class="fn-fl art_plg_l"><img src="'+ucenterUrl+'avatar.php?uid=' + data[i].createdby + '&size=middle" width="40" height="40" alt="" /></div>'+
                '<div class="fn-fl ml10 art_plg_r">'+
                ' <div class="art_plg_txt mb5">'+
                '<span class="art_plg_name mr10 f-detc fts14">' + data[i].nickname + '</span>'+
                '<span class="art_plg_time f-more">'+data[i].date+'</span>'+
                '</div>'+
                '<div class="art_plg_cont fts14">' + data[i].content + ' </div>'+
                '<div class="reply clearfix">' +
                '<div class="reply-hd"><a href="javascript:;" commentid="'+ commentid +'" class="f-aec j-reply-btn">回复</a></div>'+
                '</div>'+
                '</div>'+
                ' </div>'+
                '  </li>';


        }
        reply_html += '</ul></div>';
        return reply_html;
    },
    view: function(data) {
        var that = this;
        return '<li>' +
            '<div class="art_plg clearfix">' +
            '<div class="fn-fl art_plg_l"><img src="'+ucenterUrl+'avatar.php?uid=' + data.createdby + '&size=middle" width="40" height="40" /></div>' +
            '<div class="fn-fl ml10 art_plg_r">' +
            '<div class="art_plg_txt mb5">' +
            '<span class="art_plg_name mr10 f-detc fts14">' + data.nickname + '</span>' +
            '<span class="art_plg_time f-more">' + data.date + '</span>' +
            '</div>' +
            '<div class="art_plg_cont fts14">' + data.content + '</div>' +
            '<div class="reply clearfix">' +
            '<div class="reply-hd"><a href="javascript:;" commentid="'+ data.commentid +'" class="f-aec j-reply-btn">回复</a></div>'+
            '</div>'+
            that.reply_html(data.reply, data.commentid) +
            '</div>' +
            '</div>' +
            '</li>';
    },
    template_form : function() {
        var that = this;
        var codeHtml = '<div class="fn-fr codeBox mr15"><span class="codeTit">验证码：</span><input id="commentSeccode" type="text" class="codeTxt mr5" /><img id="commentSeccodeImg" style="cursor:pointer; margin-top:1px;" src="'+appUrl+'?app=system&controller=seccode&action=image&r=' + Math.random() * 5+'" width="52" height="24" onclick="CommentJs.seccode()" /></div>';
        var commentForm = '<h2 class="art_plang_hd f-yh">网友评论</h2>';
        var commentForm = '<div id="commentSite" class="art_plang_bd j-plang-box">'
            + '<form id="commentForm">'
            + '<div class="art_p_grid">'
            +     '<textarea id="commentContent" class="top_textarea j-plang" style="width:100%; height:50px;">文明上网，登录发贴</textarea>'
            + '</div>'
            + (username ? '<div class="art_p_grid">评分：<input type="text" id="commentStar">0.0 ~ 5.0</div>' : '')
            + '<div class="art_p_login clearfix">'
            + (username ? '<div class="ap_login fn-fl">'
            +     '<img width="35" height="35" class="ap_avatar" src="'+ucenterUrl+'avatar.php?uid='+userid+'&size=middle" data-bd-imgshare-binded="1">'
            +     '<span class="ap_user">' + username + '</span>'
            +     '</div>' : '')
            +     '<div class="submitBtn fn-fr">'
            +           '<input id="commentBtn" class="fn-fr ap_btn" type="submit" value="' + (username ? '发表评论' : '登录') + '">';
        commentForm    += that.setting.isSeccode ?  codeHtml : '';
        commentForm    += '</div></div></form></div>';
        return commentForm;
    },
    template_list : function() {

        var commentList = '<div class="art_plang_list">'
            + '<h3 class="f-yh fn-fwn fts16">全部评论</h3>'
            + '<ul id="commentList" class="art_plang_list_gird"></ul><div class="grt_plg_more">'
            + '</div></div>'
        return commentList;
    },
    template_reply : function(commentid) {
        var that = this;
        var codeHtml = '<div class="fn-fr codeBox mr15"><span class="codeTit">验证码：</span><input id="replySeccode" type="text" class="codeTxt mr5" /><img id="replySeccodeImg" style="cursor:pointer; margin-top:1px;" src="'+appUrl+'?app=system&controller=seccode&action=image&r=' + Math.random() * 5+'" width="52" height="24" onclick="CommentJs.seccode()" /></div>';
        var html='<div class="reply-grid">'+
            '<div class="reply-grid-box">'+
            '<i></i>'+
            '<div class="art_p_grid">'+
            '<textarea tabindex="1" autocomplete="off" id="replyContent" commentid="'+commentid+'" name="content" accesskey="u" class="top_textarea j-reply-txt" style="width: 100%; height:50px;">'+tips+'</textarea>'+
            '</div>'+
            '<div class="art_p_login clearfix">'+
            '<div class="ap_login fn-fl">'+
            '<img width="35" height="35" class="ap_avatar" src="'+ucenterUrl+'avatar.php?uid='+userid+'&size=middle" data-bd-imgshare-binded="1">'+
            '<span class="ap_user">' + username + '</span>'+
            '</div>'+
            '<div class="submitBtn fn-fr">';
            html += that.setting.isSeccode ?  codeHtml : '';
            html +='<input type="submit" class="fn-fr ap_btn j-sub" id="subReply" value="发表回复" name="plgSub">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>	';
        return html;
    }
}
function getCookie(n, p) {
    p = p || 'KJ_';
    n = p + '' + n;
    var d = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
    return d != null ? d[2] : '';
}


