/**
 * Created by shao on 2014-9-3.
 */
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['jquery', 'userlogin', 'usermanager', 'moment', 'moment.zh-cn', 'jquery.comments'], factory);
    } else {
        //
        factory(root.jQuery, root.UserLogin, root.UserManager, root.moment);
    }
})(this, function($, UserLogin, UserManager, moment){

    moment.locale('zh-cn');

    $(function () {

        var loginUI = UserLogin.getInstance().getLoginUI();
        var usrManager = UserManager.getInstance();

        $(document).on('wscn_cm_load_thread', function () {
            //初始化用户数据
            usrManager.onceLogin(function (user) {
                var user = usrManager.getUser();
                $(".wscn-cm-reply-box .wscn-cm-avatar img").each(function () {
                    var img = $(this);
                    img.attr("src", user.avatar+'!wscn.avatar.m');
                    img.attr("alt", user.username);
                });
                wscn.comments.loadUserVoteData();
                //判断哪些是当前用户发的信息
                $('.wscn-cm-thread .wscn-cm-comments .wscn-cm-comment').each(function() {
                    var userId=user.id;
                    var dataUserType=$(this).attr('data-user-type');
                    var dataUserId=$(this).attr('data-user-id');
                    if(dataUserType=='wscn'){
                        if(dataUserId==userId){
                            $(this).find('.wscn-cm-comment-delete ').show();
                        }
                    }
                });
            });


            //将标准时间格式改为用户更友好的方式
            $(".wscn-cm-comment-time").each(function () {
                var time = $(this);
                time.html(moment(time.data().time, "YYYY-MM-DDTHH:mm:ss ZZ").fromNow());
            });

        })

        $(document).on('wscn_cm_new_comment', function () {
            $(".wscn-cm-comment-time").each(function () {
                var time = $(this);
                time.html(moment(time.data().time, "YYYY-MM-DDTHH:mm:ss ZZ").fromNow());
            });
        })


        $(document).on("click", "body[data-logon=false] .wscn-cm-reply-box", function (e) {
            loginUI.showModal();
            loginUI.showMessage('', '请登录后评论哦。<br/>新人请猛点右下角“注册”加入我们。', 'warning');
            return false;
        });

        $(document).on("click", "body[data-logon=false] .wscn-cm-comment-vote", function (e) {
            loginUI.showModal();
            loginUI.showMessage('', '请登录后评论哦。<br/>新人请猛点右下角“注册”加入我们。', 'warning');
            return false;
        });
    });

});


