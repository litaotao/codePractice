var t = 10;
var sendCode = true;
//var _jm_ppt_id = $.cookie('_jm_ppt_id');
var addCommentUrl = "/index.php?m=comment&a=apiAdd";
var addCommentReplyUrl = "/index.php?m=comment&a=apiAddReply";
var delCommentUrl = "/index.php?m=comment&a=delCommentAjax";
var addPraiseUrl = "/index.php?m=comment&a=addPraiseDo";
var addCollectUrl = "/index.php?m=Collect&a=addCollect";
var getCommentReplyUrl = "/index.php?m=comment&a=getCommentReply";
var industryUrl = "/index.php?m=comment&a=industryDo";
var checkLoginUrl = "/index.php?m=comment&a=newIsLogin";
var getCommentUrl = "/index.php?m=comment&a=getlistComment";
//添加评论
function addComment(id) {
    var content = $('#content').val();
    if (id == '') {
        mbox.msg('文章id不能为空！', 2, 3);
        return false;
    }
    if (content == '' || content == '发表评论') {
        mbox.msg('评论内容不能为空！', 2, 3);
        return false;
    }
    if (getLength(content) < 5) {
        mbox.msg('评论内容不能小于5个字符！', 2, 3);
        return false;
    }
    if (sendCode == false) {
        mbox.msg('你发表评论太快，稍后再发！', 2, 3);
        return false;
    }
    if (t == 10) {
        $.ajax({
            type: "POST",
            url: addCommentUrl,
            data: {aid: id, content: content},
            success: function (result) {
                sendCode = true;
                sendCodeAgain();
                $('#content').val('').attr("style", '');
                if (result == '[object Object]') {
                    var obj = eval(result);
                    var rs = obj.data.data;
                    if (obj.data.code == 0) {
                        //alert('评论发表成功');
                    } else {
                        mbox.msg(obj.data.message, 2, -1);
                    }
                } else {
                    $(".result-tips").html('您至少需输入<span>5</span>个字').children().addClass('error-tips');
                    $(".btn-lock").attr("disabled", true).addClass('locked');
                    $('#content').attr("style", '');
                    $(".jm-comments").prepend(result);
                    var comment_count = parseInt($('.comment_count').html());
                    comment_count = comment_count + 1;
                    $('.comment_count').html(comment_count)
                }
            }
        })
    }
}
//添加评论回复
function addCommentReply(id, aid, comment_id) {
    var reply_comment = $('#reply_comment' + id).val();
    if (reply_comment == '') {
        mbox.msg('回复内容不能为空！', 2, 3);
        return false;
    }
    $.ajax({
        type: "POST",
        url: addCommentReplyUrl,
        data: {reply_id: id, aid: aid, reply_comment: reply_comment, default_type: 2},
        success: function (result) {
            if (result == '[object Object]') {
                var obj = eval(result);
                var rs = obj.data.data;
                if (obj.data.code == 0) {
                    //alert('评论发表成功');
                } else {
                    mbox.msg(obj.data.message, 2, -1);
                }
            } else {
                //$('#reply_comment'+id).val('').limit();
                if (id == comment_id) {//如果是回复的评论就放到最前面
                    $("#reply-view" + id).prepend(result);
                } else {//如果回复的是回复，就放到该回复的下面
                    $('#comment_' + id).after(result);
                }
                //隐藏回复框
                $('#showReply_' + id).hide();
                //重置评论回复数
                var reply_count = parseInt($('#reply_count_hidden' + comment_id).val());
                reply_count = reply_count + 1;
                $('#reply_count' + comment_id).html("(" + reply_count + ")");
                $('#reply_count_hidden' + comment_id).val(reply_count);
                //清空回复框内容
                $('#reply_comment' + id).val('').attr('style', '');
                //重置文章评论数
                var comment_count = parseInt($('.comment_count').html());
                comment_count = comment_count + 1;
                $('.comment_count').html(comment_count)
            }
        }
    })
}
//收起.展开回复列表功能
function allReply(id) {
    var ishide = $('#allReply' + id).attr('ishide');
    if (ishide == 1) {
        $('#report-view-' + id).hide();
        $('#allReply' + id).attr('ishide', 0);
        $('#allReply' + id).addClass('hide-arrow').removeClass('show-arrow');
    } else {
        $('#report-view-' + id).show();
        $('#allReply' + id).attr('ishide', 1);

        $('#allReply' + id).addClass('show-arrow').removeClass('hide-arrow');
    }
}
//收起.显示评论回复框
function showCommentReply(id, reply_count) {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    } else {
        $('#report-view-' + id).show();
        var showtype = $('#showtype_' + id).attr('showtype');
        if (showtype == 1) {
            $('#showReply_' + id).show();
            $('#showtype_' + id).attr('showtype', 0);
            //显示回复评论的箭头改变
            $('#allReply' + id).addClass('show-arrow').removeClass('hide-arrow');
        } else {
            $('#showReply_' + id).hide();
            if (reply_count == 0) {
                $('#report-view-' + id).hide();
            }
            $('#showtype_' + id).attr('showtype', 1);
            //$('#allReply'+id).addClass('hide-arrow').removeClass('show-arrow');
        }
    }
}
//收起.显示回复的回复框
function showReply(cid, aid) {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    } else {
        $('.report-box').hide();
        $('#showReply_' + cid).toggle();
    }
//	$.ajax({
//		type	:	"GET",
//		url		:	checkLoginUrl,
//		success	:	function (result) {
//			var obj = eval(result);
//			var rs = obj.data;
//			if(rs.code == 0){
//				$('#showReply_'+cid).toggle();
//			}else{
//				login(8,'comment_id-'+cid+'*article_id-'+aid);
//			}
//		}
//	})
}
function getAllCommentReply(id, all) {
    getCommentReply(id, all);
}
function getCommentReply(id, showall) {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    var showtype = $('#showtype_' + id).attr('showtype');
    if (showall == 0) {
        if (showtype == 0) {
            if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
//                        $('#addCommentButton'+id).hide()
                $('#reply_comment' + id).attr('placeholder', '请登录');
            }
            $('#showtype_' + id).attr('showtype', 1);
//                    $('#more-reply'+id).hide();
        } else if (showtype == 1) {
//                    $('#showReply_'+id).hide()
            //$(".reply-view").html('');
            $("#reply-view" + id).html(' ');
            $('#report-view-' + id).hide();
            $('#showtype_' + id).attr('showtype', 0);
            //$('#more-reply'+id).slideDown();
            return false;
        }
    }
    //$("#reply-view"+id).html('正在努力加载中...');
    $.ajax({
        type: "GET",
        url: getCommentReplyUrl,
        data: {id: id, showall: showall},
        success: function (result) {
            if (showall == 0) {

                $("#reply-view" + id).html(result);
//                        $('#showReply_'+id).slideDown()
                $('#report-view-' + id).show();
            } else {
                //追加最后的评论
                $('#after').before(result);
                $('#showallbuttonid').hide();
            }
            //todo 平滑 ok
            //todo 重复发请求
            //
        }
    })
}
function zhupinghuifu() {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    }
}
//删除评论
function delComment(id) {
    $.mbox({
        shade: [0],
        area: ['250px', 'auto'],
        border: [1, 1, "#666"],
        dialog: {
            msg: '确认删除吗？',
            btns: 2,
            type: 2,
            btn: ['确定', '取消'],
            yes: function () {
                $.ajax({
                    type: "GET",
                    url: delCommentUrl,
                    data: {id: id},
                    success: function (result) {
                        var obj = eval(result);
                        var rs = obj.data;
                        if (rs.code == 0) {
                            $('#comment_' + id).remove();
                            mbox.msg('删除成功！', 2, 1);
                            $('.comment_count').html(rs.count)
                        }
                    }
                })
            }, no: function () {
                return false;
            }
        }
    });
}
//显示举报
$('.show_ju-bao-btn').on('click', function () {
    var id = $(this).attr('cid');
    $.ajax({
        type: "GET",
        url: '/index.php?m=comment&a=check_ju_bao',
        data: {id: id},
        success: function (result) {
            var obj = eval(result);
            var rs = obj.data;
            if (rs.code == 0) {
                $('.ju-bao-box').hide();
                $('#ju-bao-box' + id).show();
            } else if (rs.code == 1000) {
                login();
            } else {
                mbox.msg('对不起，你已经举报过了！', 2, 3);
            }
        }
    })
})
//执行举报
$('.addindustry').on('click', function () {
    var comment_id = $(this).attr('cid');
    var industryname = "industry" + comment_id;
    var industry = $("input[name='" + industryname + "']:checked").val();
    $.ajax({
        type: "GET",
        url: industryUrl,
        data: {comment_id: comment_id, industry: industry},
        success: function (result) {
            var obj = eval(result);
            var rs = obj.data;
            mbox.msg(rs.message, 2, -1);
            $('.ju-bao-box').hide();
        }
    })
});
$(".report").click(function (event) {
    event = event || window.event;
    event.stopPropagation();
});
$(document).click(function (e) {
    $(".ju-bao-box").fadeOut(300);
});
//点攒
function addPraise(id) {
    $.ajax({
        type: "GET",
        url: addPraiseUrl,
        data: {id: id},
        success: function (result) {
            if (result.success == false) {
                var obj = eval(result);

                var rs = obj.data;
                mbox.msg(rs.message, 2, -1);
            } else {
                var obj = eval(result);
                var rs = obj.data;
                if (rs.code == 0) {
                    $('#zhan').remove();
                    $("#jia-" + id).append('<div id=\"zhan\"><b>+1<\/b><\/div>');
                    $('#zhan').css({'margin-top': '-10px', 'display': 'block', 'position': 'absolute', 'left': '0'})

                        .animate({"margin-top": "-35px"}, 'slow', function () {
                            $(this).fadeIn('fast').remove();
                        })
                    $("#praise" + id).html("(" + rs.praise + ")");
                } else if (rs.code == 2) {
//                    $('#zhan').remove();
//
//					$("#jia-"+id).append('<div id=\"zhan\"><b>-1<\/b><\/div>');
//					$('#zhan').css({'margin-top':'-10px','display':'block','position':'absolute','left':'0'})
//
//					.animate({"margin-top":"-35px"},'slow',function(){
//						$(this).fadeIn('fast').remove();
//					})
                    $("#praise" + id).html("(" + rs.praise + ")");
                } else if (rs.code == 1000) {
                    login();
                } else {
                    mbox.msg(rs.message, 2, -1);
                }
            }
        }
    })
}
function contentIsLogin() {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    }
}
//评论猫点
//$('.comment-num').click(function(){
//    $.scrollTo('.re-article',500);
//})
//获取评论内容
function getListComment(page) {
    //$('.jm-comments').html('<dd><img src="__PUBLIC__/image/loader.gif" alt=""/></dd>');
    if (window.location.href.indexOf('#page') != -1) {
        var strs = new Array();
        strs = window.location.href.split("#");
        var strs2 = new Array();
        strs2 = strs[1].split("_");
        page = strs2[1];
    }
    $.ajax({
        type: "get",
        url: getCommentUrl,
        data: {aid: aid, page: page},
        success: function (result) {
            //alert(result);
            $('.jm-comments').html(result);
            //设置文章评论数
            //var commentCount = $('#commentCount').val();
            //$('.comment_count').html(commentCount);
            //分页跳的第一页效果
            if (page != undefined) {
                $.scrollTo('#pl', 500);
            }
        }
    })
}
//添加收藏
function addCollect(id) {
    $.ajax({
        type: "GET",
        url: addCollectUrl,
        data: {aid: id},
        success: function (result) {
            var obj = eval(result);
            var rs = obj.data;
            if (rs.code == 1000) {
                login();
            } else {
                mbox.msg(rs.message, 2, -1);
                if (rs.code == 0) {
                    //收藏数加一
                    var collect_count = parseInt($('#collect_count').html());
                    collect_count = collect_count + 1;
                    $("#collect_count").html(collect_count);
                    //收藏数加一
                    $(".jm-collection").addClass("clicked");
                }
            }

        }
    })
}
//顶
function ding() {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    } else {
        $.ajax({
            type: "GET",
            url: '/index.php?m=dingcai&a=ding',
            data: {aid: aid},
            success: function (result) {
                var obj = eval(result);
                var rs = obj.data;
                mbox.msg(rs.message, 2, -1);
                if (rs.code == 0) {
                    //顶数加一
                    var ding_count = parseInt($('#ding_count').html());
                    ding_count = ding_count + 1;
                    $('#ding_count').html(ding_count);
                    //顶数加样式
                    $(".jm_like").addClass("clicked");
                }
            }
        })
    }
}
//踩
function cai() {
    var _jm_ppt_id = $.cookie('_jm_ppt_id');
    if (typeof(_jm_ppt_id) == "null" || _jm_ppt_id == '' || _jm_ppt_id == null) {
        login();
    } else {
        $.ajax({
            type: "GET",
            url: '/index.php?m=dingcai&a=cai',
            data: {aid: aid},
            success: function (result) {
                var obj = eval(result);
                var rs = obj.data;
                mbox.msg(rs.message, 2, -1);
                if (rs.code == 0) {
                    //踩数加一
                    var cai_count = parseInt($('#cai_count').html());
                    cai_count = cai_count + 1;
                    $('#cai_count').html(cai_count);
                    //踩数加样式
                    $(".jm_unlike").addClass("clicked");
                }
            }
        })
    }
}
/**
 * 重新发送评论状态
 */
function sendCodeAgain() {
    t--;
    $("#sendcomment").attr("disabled", "disabled");
    if (t == 0) {
        $("#sendcomment").removeAttr("disabled");
        t = 10;
        sendCode = true;
        return false;
    } else {
        sendCode = false;
        setTimeout("sendCodeAgain();", 1000);
    }
}
/**
 * 取字符串字节长度
 */
function getLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
//获取文章信息
function getArticle() {
    $.ajax({
        type: "GET",
        url: '/index.php?m=article&a=getArticle',
        data: {aid: aid},
        success: function (result) {
            var obj = eval(result);
            var rs = obj.data;
            if (rs.code == 0) {
                $('#collect_count').html(rs.info.collect);//收藏数
                $('#ding_count').html(rs.info.ding);//顶数
                $('#cai_count').html(rs.info.cai);//踩数
                $('.comment_count').html(rs.info.comment);//踩数
                if (rs.info.type == 1) {//顶加样式
                    $(".jm_like").addClass("clicked");
                } else if (rs.info.type == 2) {//踩加样式
                    $(".jm_unlike").addClass("clicked");
                }
                //收藏加样式
                if (rs.info.colectType == 1) {
                    $(".jm-collection").addClass("clicked");
                }
                $.each(rs.info.is_sub,function(j,n){
                    if(n == 2){ //已订阅
                        $('#sub'+j).hide();
                        $('#sub2'+j).show();
                    }else if(n == 0){
                        $('#sub'+j).show();
                        $('#sub2'+j).hide();
                    }else{
                        $('#sub'+j).hide();
                        $('#sub2'+j).hide();
                    }
		})
            }
        }
    })
}

