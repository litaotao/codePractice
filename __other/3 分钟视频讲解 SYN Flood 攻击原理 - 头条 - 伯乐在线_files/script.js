$(document).ready(function(){

    $(".refresh-captcha-code").click(function() {
        var sourceUrl = $(this).attr("data-source-url");
        $(".captcha-code").attr("src",sourceUrl+"?r=" + Math.random());
    });

    $('.submit-link').click(function(){
        $('#submit-modal').modal('show');
    });

	$('.btn-login').click(function(){
		$('#login-modal').modal('show');
	});

	$('.btn-register').click(function(){
		$('#register-modal').modal('show');
	});

    $('#close-notification-bar').click(function(){
        $notification_id = $(this).attr("data-notification-id");
        $notification_path = $(this).attr("data-notificatioin-path");
        $notification_expired_days = $(this).attr("data-notification-expired-days");

        $.cookie($notification_id,'close',{path: $notification_path, expires: $notification_expired_days});
    });

    $('.register-user-only').click(function(){
        $('#login-modal').modal('show');
    });

    $('.list-posts .media').hover(function(){
        $(".show-when-hover").hide();
        $(this).find(".show-when-hover").show();
    });

    $('.pb-share').hide();

    $('#social-share-link').click(function(){
        $('.pb-share').toggle();
    });

    $('#show-hide-weixin').click(function(){
        $('.weixin').toggle(200);
    });

    $('.reply-comment-btn').click(function(){

        var curr_box_id = $(this).attr("data-comment-box-id");
        var curr_post_id = $(this).attr("data-post-id");
        var curr_comment_id = $(this).attr("data-comment-id");

        reply_comment(curr_box_id, curr_post_id, curr_comment_id);
    });

    $('#submit_form_source_article_title').tooltip({'trigger':'focus', 'title': ''});
    $('#submit_form_source_article_url').tooltip({'trigger':'focus', 'title': ''});
    $('#submit_form_source_article_excerpt').tooltip({'trigger':'focus', 'title': ''});

    $('#article-captcha-input').keyup(function(){
        check_captcha_code($(this).val(), 'article-');
    });

    $('#comment-captcha-input').keyup(function(){
        check_captcha_code($(this).val(), 'comment-');
    });

    $('#comment-submit-btn').click(ajax_comment_form);

    $('.follow-topic').click(function(){
        var follow_topic = $(this).attr("data-topic-id");
        ajax_follow_topic(follow_topic);
    });

    $('.unfollow-topic').click(function(){
        var follow_topic = $(this).attr("data-topic-id");
        ajax_unfollow_topic(follow_topic);
    });

	modal_pos();

    back_to_top();

    $('input, textarea').placeholder();


    $(".favorite-post").bind("click",favorite_post);

    $(".cancel-favorite-post").bind("click", cancel_favorite_post);

//    $('.list-posts').infinitescroll({
//        navSelector  : "ul.pagination",
//        nextSelector : "ul.pagination #pagination-next-page a",
//        itemSelector : ".left-content li.media",
//        loading: {
//            img: templateUrl+"/images/loading.gif",
//            msgText: "努力加载中…",
//            finishedMsg: "好吧，都在这了。加载完毕！"
//        },
//        animate      : true
//    },function(){});

});

$(window).resize(function(){
	modal_pos();
});



function ajax_comment_form(){

    if($('#comment').val() == ""){
        alert("评论不能为空");
        return false;
    }
    var commentform=$('#comment-form');
    var formdata=commentform.serialize();
    var formurl=commentform.attr('action');

    $('#comment-submit-btn').text("正在提交…");
    $('#comment-submit-btn').attr('disabled','disabled');
    $('#comment-submit-loading').show();

    //Post Form with data
    $.ajax({
        type: 'post',
        url: formurl,
        data: formdata,
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $('#comment-submit-tips').show();
            //$('#comment-submit-tips').text("提交评论失败，请稍后重试或联系我们。");
            $('#comment-submit-tips').text(errorThrown);
            $('#comment-submit-btn').text("重新提交");
            $('#comment-submit-btn').removeAttr('disabled');
            $('#comment-submit-loading').hide();
        },
        success: function(data, textStatus){
            if(data.status == "failed"){
                var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
                $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());
                $("#comment-captcha-input").val('');

                $('#comment-submit-tips').show();
                $('#comment-submit-tips').text(data.message);
                $('#comment-submit-btn').text("重新提交");
                $('#comment-submit-btn').removeAttr('disabled');
                $('#comment-submit-loading').hide();
            }else{
                var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
                $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());

                commentform.find('textarea[name=comment]').val('');
                $("#comment-captcha-input").val('');

                $('#comment-submit-tips').show();
                $('#comment-submit-tips').text("评论已提交，我们将尽快审核并发布。");
                $('#comment-submit-btn').text("再次评论");
                $('#comment-submit-btn').removeAttr('disabled');
                $('#comment-submit-loading').hide();
            }
        }
        /*success: function(data, textStatus){
            if(data == "success" || textStatus == "success"){

                var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
                $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());

                commentform.find('textarea[name=comment]').val('');
                $("#comment-captcha-input").val('');

                $('#comment-submit-tips').show();
                $('#comment-submit-tips').text("评论已提交，我们将尽快审核并发布。");
                $('#comment-submit-btn').text("再次评论");
                $('#comment-submit-btn').removeAttr('disabled');
                $('#comment-submit-loading').hide();
            }else{

                var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
                $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());
                $("#comment-captcha-input").val('');

                $('#comment-submit-tips').show();
                //$('#comment-submit-tips').text("提交评论失败，请稍后重试或联系我们。");
                $('#comment-submit-tips').text(data+'  '+textStatus);
                $('#comment-submit-btn').text("重新提交");
                $('#comment-submit-btn').removeAttr('disabled');
                $('#comment-submit-loading').hide();
            }
        }*/
    });
    return false;
}

function check_captcha_code(captcha_code, prefix){

    var submit_btn_id = $('.'+prefix+'captcha-input').attr("data-submit-btn-id");

    if(captcha_code.length != 4){
        $('#'+prefix+'captcha-green-flag').hide();
        $('#'+prefix+'captcha-red-flag').hide();
        $('#'+prefix+'checking-captcha-code').hide();
        $('#'+submit_btn_id).attr('disabled','disabled');

        return false;
    }

    $('#'+prefix+'checking-captcha-code').show();

    var captchaData = {
        action: "verify_captcha",
        captcha_code: captcha_code,
        prefix: prefix
    };

    var ajaxCaptchaReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: captchaData,
        dataType: "json"
    });

    ajaxCaptchaReq.done(function (callbackData) {
        var verify_result = callbackData.verify_result;
        var captcha_code = callbackData.captcha_code;
        var prefix = callbackData.prefix;
        var curr_captcha_code = $('#'+prefix+'captcha-input').val();
        var submit_btn_id = $('#'+prefix+'captcha-input').attr("data-submit-btn-id");

        //alert("backend code is:"+captcha_code+" , frontend code is:"+curr_captcha_code+", verify result is:"+verify_result);

        if(verify_result == 1 && captcha_code == curr_captcha_code){
            $('#'+prefix+'captcha-green-flag').show();
            $('#'+prefix+'captcha-red-flag').hide();
            $('#'+prefix+'checking-captcha-code').hide();
            $('#'+submit_btn_id).removeAttr('disabled');
        }
        else{
            $('#'+prefix+'captcha-green-flag').hide();
            $('#'+prefix+'captcha-red-flag').show();
            $('#'+prefix+'checking-captcha-code').hide();
            $('#'+submit_btn_id).attr('disabled','disabled');
        }
    });

    ajaxCaptchaReq.fail(function (d, c) {
    });

    return true;
}

function modal_pos(){
	$('.modal').on('shown.bs.modal', function (e) {
		var md = $(this).find('.modal-dialog');
		var h = -(md.outerHeight()/2);
		var b = $(this).outerHeight()/2;
		md.addClass('md-pos');
		md.css({
		   'margin-top' : h+'px',
		   'top' : b+'px'
		});
	});
}

function reply_comment(curr_box_id, curr_post_id, curr_comment_id){
    $("#comment_form_id").appendTo("#"+curr_box_id);
    $('#comment_post_ID').val(curr_post_id);
    $('#comment_parent').val(curr_comment_id);
}


