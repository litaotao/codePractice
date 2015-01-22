/**
 * Created by huangyuliang on 14-5-5.
 */
jQuery(document).ready(function ($) {

    $(".vote-post-up").bind("click", function () {

        var curr_post_id = $(this).attr("data-post-id");
        if($(this).hasClass("register-user-only")){
            return false;
        }

        if($('#'+curr_post_id+"voteflag").hasClass('voted')){
            show_info_modal("友情提示","别贪心，顶一次就可以了 :)  ","确定");
            return false;
        }

        var voteData = {
            action: "vote_post",
            post_id: curr_post_id
        };

        var ajaxVoteReq = $.ajax({
            url: JobboleAjax.ajaxurl,
            type: "POST",
            data: voteData,
            dataType: "json"
        });

        ajaxVoteReq.done(function (callbackData) {
            var voted_post_id = callbackData.post_id;
            var vote_total = callbackData.vote_total;

            $('#'+voted_post_id+"votetotal").text(vote_total);
            $('#'+voted_post_id+"voteflag").addClass("voted");

            $('.vote-post-up-single').text(vote_total);
            $('.vote-post-up-single-class').addClass("voted");

            if(callbackData.vote_msg != "1"){
                show_info_modal("友情提示",callbackData.vote_msg,"确定");
            }
        });

        ajaxVoteReq.fail(function (d, c) {
            show_info_modal("友情提示","系统没有响应，请稍后重试或联系我们。","确定");
        });

        return true
    });

    $(".vote-comment-up").bind("click",function(){

        var curr_comment_id = $(this).attr("data-comment-id");

        if($(this).hasClass("register-user-only")){
            return false;
        }

        if($('.'+curr_comment_id+"voteflag").hasClass('voted')){
            show_info_modal("友情提示","您已经对这条评论投过票。","确定");
            return false;
        }

        vote_comment_ajax(curr_comment_id,1);
    });

    $(".vote-comment-down").bind("click",function(){

        var curr_comment_id = $(this).attr("data-comment-id");

        if($(this).hasClass("register-user-only")){
            return false;
        }

        if($('.'+curr_comment_id+"voteflag").hasClass('voted')){
            show_info_modal("友情提示","您已经对这条评论投过票。","确定");
            return false;
        }

        vote_comment_ajax(curr_comment_id,2);
    });

    $("#article-submit-btn").bind("click",function(){

        var article_title = $('#submit_form_source_article_title').val();
        var article_url = $('#submit_form_source_article_url').val();
        var article_excerpt = $('#submit_form_source_article_excerpt').val();
        var captcha_code = $('#article-captcha-input').val();

        submit_article(article_title,article_url,article_excerpt, captcha_code);
    });

    $("#start-to-translate-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $('#start-to-translate-btn').attr("data-post-id");

        handle_translation(post_id,'start_to_translate',$('#start-to-translate-btn'));
    });

    $("#finish-translation-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $('#finish-translation-btn').attr("data-post-id");

        handle_translation(post_id,'finish_translation',$('#finish-translation-btn'));
    });

    $("#re-translate-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $('#re-translate-btn').attr("data-post-id");

        handle_translation(post_id,'re_translate',$('#re-translate-btn'));
    });

    $("#start-to-review-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $('#start-to-review-btn').attr("data-post-id");

        handle_translation(post_id,'start_to_review_translation',$('#start-to-review-btn'));
    });

    $("#finish-review-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $('#finish-review-btn').attr("data-post-id");

        handle_translation(post_id,'finish_translation_review',$('#finish-review-btn'));
    });


    $("#publish-to-jobbole-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $(this).attr("data-post-id");

        handle_publish_to_site(post_id,'jobbole',$(this));
    });

    $("#publish-to-importnew-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $(this).attr("data-post-id");

        handle_publish_to_site(post_id,'importnew',$(this));
    });

    $("#publish-to-geekfan-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $(this).attr("data-post-id");

        handle_publish_to_site(post_id,'geekfan',$(this));
    });


    $("#recommend-to-top-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $(this).attr("data-post-id");

        handle_publish_to_site(post_id,'jobboletop',$(this));
    });

    $("#recommend-to-trans-btn").bind("click",function(){

        if($(this).hasClass("register-user-only")){
            return false;
        }

        var post_id = $(this).attr("data-post-id");

        handle_publish_to_site(post_id,'jobbolefanyi',$(this));
    });

});

function handle_publish_to_site(post_id, target_site, btn){

    var articleData = {
        action: 'publish_to_site',
        post_id: post_id,
        target_site: target_site
    }

    var original_content = btn.html();
    btn.text("正在发布…");
    btn.attr('disabled','disabled');

    var ajaxSubmitReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: articleData,
        dataType: "json"
    });

    ajaxSubmitReq.done(function (callbackData) {

        if(callbackData.submit_msg == 'success'){
            btn.text("成功提交");
            location.reload();
        }else{
            if(callbackData.submit_msg != ""){
                alert(callbackData.submit_msg);
            }
            btn.html(original_content);
            btn.removeAttr('disabled');
        }
    });

    ajaxSubmitReq.fail(function (d, c) {
        alert('系统错误');

        btn.html(original_content);
        btn.removeAttr('disabled');
    });
}

function handle_translation(post_id, action_name, btn){
    var articleData = {
        action: action_name,
        post_id: post_id
    }

    var original_content = btn.html();
    btn.text("正在提交…");
    btn.attr('disabled','disabled');

    var ajaxSubmitReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: articleData,
        dataType: "json"
    });

    ajaxSubmitReq.done(function (callbackData) {

        if(callbackData.translation_msg == 'success'){
            btn.text("成功提交");
            location.reload();
        }else{
            if(callbackData.translation_msg != ""){
                alert(callbackData.translation_msg);
            }
            btn.html(original_content);
            btn.removeAttr('disabled');
        }
    });

    ajaxSubmitReq.fail(function (d, c) {
        alert('系统错误');

        btn.html(original_content);
        btn.removeAttr('disabled');
    });
}

function create_new_user(username, useremail, password, confirmPassword){
    if(username==='' || useremail === ''){
        alert("请填写标题和摘要");
    }
}

function submit_article(title, url, excerpt, captcha_code){
    if(title==='' || excerpt === ''){
        alert("请填写标题和摘要");

    }else if(title.length>200 || url.length>200 || excerpt.length>10000){
        alert("标题、摘要或者地址超长");
    }else{
        var articleData = {
            action: "submit_article",
            article_title: title,
            article_url: url,
            article_excerpt: excerpt,
            captcha_code: captcha_code
        }

        $('#article-submit-btn').text("正在提交…");
        $('#article-submit-btn').attr('disabled','disabled');
        $('#article-submit-loading').show();

        var ajaxSubmitReq = $.ajax({
            url: JobboleAjax.ajaxurl,
            type: "POST",
            data: articleData,
            dataType: "json"
        });

        ajaxSubmitReq.done(function (callbackData) {

            if(callbackData.new_post_id > 0){
                $('#submit_form_source_article_title').val('');
                $('#submit_form_source_article_url').val('');
                $('#submit_form_source_article_excerpt').val('');
            }

            $('#article-captcha-input').val('');
            $('#article-captcha-green-flag').hide();
            $('#article-captcha-red-flag').hide();
            var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
            $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());

            $('#article-submit-tips').show();
            $('#article-submit-tips').html(callbackData.submit_msg);
            $('#article-submit-btn').text("再次投递");
            $('#article-submit-btn').removeAttr('disabled');
            $('#article-submit-loading').hide();

        });

        ajaxSubmitReq.fail(function (d, c) {

            $('#article-captcha-input').val('');
            $('#article-captcha-green-flag').hide();
            $('#article-captcha-red-flag').hide();

            var captcha_image_base_src =  $(".captcha-code").attr("data-base-src");
            $(".captcha-code").attr("src",captcha_image_base_src+"?r=" + Math.random());

            $('#article-submit-btn').text("重新提交");
            $('#article-submit-btn').removeAttr('disabled');
            $('#article-submit-loading').hide();
        });
    }
}

function vote_comment_ajax(comment_id,up_or_down){

    var voteData = {
        action: "vote_comment",
        comment_id: comment_id,
        up_or_down: up_or_down
    };

    var ajaxVoteReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: voteData,
        dataType: "json"
    });

    ajaxVoteReq.done(function (callbackData) {
        var voted_comment_id = callbackData.comment_id;
        var vote_up_total = callbackData.vote_up_total;
        var vote_down_total = callbackData.vote_down_total;

        $('#'+voted_comment_id+"voteuptotal").text(vote_up_total);
        $('#'+voted_comment_id+"voteuptotal").parent().removeClass("t-up");

        $('#'+voted_comment_id+"votedowntotal").text(vote_down_total);
        $('#'+voted_comment_id+"votedowntotal").parent().removeClass("t-down");

        $('.'+voted_comment_id+"voteflag").addClass("voted");

        if(callbackData.vote_msg != 1){
            show_info_modal("友情提示",callbackData.vote_msg,"确定");
        }
    });

    ajaxVoteReq.fail(function (d, c) {
        show_info_modal("友情提示","系统没有响应，请稍后重试或联系我们。","确定");
    });

    return true

}


function favorite_post(){
    var curr_post_id = $(this).attr("data-post-id");

    if($(this).hasClass("register-user-only")){
        return false;
    }

    $(this).find(".loading-flag").show();

    ajax_favorite_post(curr_post_id, "favorite_post");
}

function cancel_favorite_post(){
    var curr_post_id = $(this).attr("data-post-id");

    if($(this).hasClass("register-user-only")){
        return false;
    }

    $(this).find(".loading-flag").show();

    ajax_favorite_post(curr_post_id, "cancel_favorite_post");
}

function ajax_favorite_post(postID, actionName){
    if(postID == "" || postID < 1){
        return false;
    }

    var postData = {
        action: actionName,
        post_id: postID
    };

    var ajaxFavoriteReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: postData,
        dataType: "json"
    });

    ajaxFavoriteReq.done(function (callbackData) {
        if(callbackData.favorite_msg == 1){

            if(actionName == "cancel_favorite_post"){

                if($("#my_favorite_"+callbackData.post_id)){
                    $("#my_favorite_"+callbackData.post_id).hide(500);
                }

                if($("#favorite_post_link_"+callbackData.post_id)){
                    var favorite_post_link = $("#favorite_post_link_"+callbackData.post_id);
                    favorite_post_link.find(".loading-flag").hide();
                    favorite_post_link.removeClass("cancel-favorite-post");
                    favorite_post_link.addClass("favorite-post");

                    var loadingImageSrc = favorite_post_link.find(".loading-flag").attr('src');
                    favorite_post_link.html("<i class='glyphicon glyphicon-star-empty'></i>收藏  <img class='loading-flag' src='"+loadingImageSrc+"' />");

                    favorite_post_link.unbind("click");
                    favorite_post_link.bind("click",favorite_post);
                }

            }else{

                if($("#favorite_post_link_"+callbackData.post_id)){
                    var favorite_post_link = $("#favorite_post_link_"+callbackData.post_id);
                    favorite_post_link.find(".loading-flag").hide();
                    favorite_post_link.removeClass("favorite-post");
                    favorite_post_link.addClass("cancel-favorite-post");

                    var loadingImageSrc = favorite_post_link.find(".loading-flag").attr('src');
                    favorite_post_link.html("<i class='glyphicon glyphicon-star'></i>已收藏  <img class='loading-flag' src='"+loadingImageSrc+"' />");

                    favorite_post_link.unbind("click");
                    favorite_post_link.bind("click",cancel_favorite_post);
                }

            }
        }
        else{
            alert(callbackData.favorite_msg);
        }
    });

    ajaxFavoriteReq.fail(function (d, c) {
    });

    return true;
}

function ajax_unfollow_topic(topic_slug){
    if(topic_slug==""){
        return false;
    }

    var topicData = {
        action: "unfollow_topic",
        topic_id: topic_slug
    };

    var ajaxFollowTopicReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: topicData,
        dataType: "json"
    });

    ajaxFollowTopicReq.done(function (callbackData) {
        if(callbackData.result == 1){
            $('.unfollow-topic').hide();
            $('.follow-topic').show();

            $('.follow-topic-btn').show();
            $('.submit-link-btn').hide();
        }
        else{
            alert(callbackData.result);
        }
    });

    ajaxFollowTopicReq.fail(function (d, c) {
    });

    return true;
}

function ajax_follow_topic(topic_slug){
    if(topic_slug==""){
        return false;
    }

    var topicData = {
        action: "follow_topic",
        topic_id: topic_slug
    };

    var ajaxFollowTopicReq = $.ajax({
        url: JobboleAjax.ajaxurl,
        type: "POST",
        data: topicData,
        dataType: "json"
    });

    ajaxFollowTopicReq.done(function (callbackData) {
        if(callbackData.result == 1){
            $('.unfollow-topic').show();
            $('.follow-topic').hide();

            $('.follow-topic-btn').hide();
            $('.submit-link-btn').show();

        }
        else{
            alert(callbackData.result);
        }
    });

    ajaxFollowTopicReq.fail(function (d, c) {
    });

    return true;
}

function show_info_modal(title,content,button){
    $('#info-modal-title').text(title);
    $('#info-modal-content').text(content);
    $('#info-modal-button').text(button);

    $('#info-modal').modal('show');
}

function back_to_top(){
    // fade in #back-top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#back-top').fadeIn(1000);
        } else {
            $('#back-top').fadeOut(1000);
        }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
}