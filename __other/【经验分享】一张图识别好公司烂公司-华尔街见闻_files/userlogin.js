(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery"),
                UserManager = require("usermanager"),
                LoginUI = require("login-ui");
            root.UserLogin = factory(root, exports, $, UserManager, LoginUI);
            return root.UserLogin;
        });
    } else {
        root.UserLogin = factory(root, {}, root.jQuery, root.UserManager, root.LoginUI);
    }

}(this, function(root, UserLogin, $, UserManager, LoginUI) {
    "use strict";
    var instance = null,
        defaultOptions = {
        },
        user,
        oauthUser,
        oauthSuccess,
        oauthError;
    var userMessages = {
            "ERR_USER_PASSWORD_WRONG" : "密码不匹配，请重试",
            "ERR_USER_PASSWORD_WRONG_MAX_TIMES" : "密码输入错误次数太多，用户已经被锁定，请稍后重试",
            "ERR_USER_NOT_EXIST" : "该账号不存在",
            "ERR_USER_NOT_ACTIVED" : "用户未激活<span class='inactive-handle'></span>",
            "ERR_USER_EMAIL_NOT_ACTIVED" : "邮箱未激活，已向你的注册邮箱发送激活邮件<span class='inactive-handle'></span>",
            "ERR_USER_PASSWORD_EMPTY" : "密码未设置，请使用社交帐号登录",
            "ERR_USER_RESET_CODE_NOT_MATCH" : "验证码不匹配",
            "ERR_USER_RESET_CODE_EXPIRED" : "验证码已过期",
            "ERR_USER_USERNAME_ALREADY_TAKEN" : "这个名字已经有人用了，请换一个吧",
            "ERR_USER_EMAIL_ALREADY_TAKEN" : "用户邮箱已存在",
            "ERR_USER_CREATE_FAILED" : "创建用户失败",
            "ERR_USER_BE_BANNED" : "用户已被屏蔽",
            "ERR_OAUTH_AUTHORIZATION_FAILED" : "连接服务器失败，请稍后重试",
            "SUCCESS_USER_ACTIVE_MAIL_SENT" : "激活邮件已发送",
            "SUCCESS_USER_REGISTERED_ACTIVE_MAIL_SENT" : "一封验证邮件已发到注册邮箱，请验证后登录",
            "SUCCESS_USER_RESET_MAIL_SENT" : "一封包含密码信息的邮件已经发送到注册邮箱",
            "SUCCESS_USER_PASSWORD_RESET" : "新密码已设置，请重新登录",
            "SUCCESS_OAUTH_USER_REGISTERED" : "注册成功",
            "SUCCESS_OAUTH_USER_CONNECTED" : "绑定第三方帐号成功",
            "SUCCESS_OAUTH_AUTO_CONNECT_EXIST_EMAIL" : "登录成功"
    };
    var usrManager = UserManager.getInstance();
    var loginUI = new LoginUI();

    //Debug shortcut
    function p(){
        if(typeof console === "undefined" || typeof console.info !== 'function') {
            return false;
        }
        console.info.apply(console, arguments);
    }

    /************************************
      Constructors
     ************************************/
    UserLogin = function(options){
        this.options = {};
        this.initialize(options);
    };

    /************************************
      Constants
     ************************************/
    var defaultEvents = {
    
    }

    var defaultErrorHandle = function(error, callback){
        loginUI.hideLoading();
        var messages = error.responseJSON.errors;
        var i = 0;
        if(!messages || messages.length < 1) {
            loginUI.showMessage("ERR_UNKNOW", "连接服务器失败，请稍候重试");
        }
        for(i in messages) {
            var message = messages[i],
                messageCode = message.message,
                errorMsg = userMessages[messageCode] || messageCode;
            loginUI.showMessage(messageCode, errorMsg);
        }
    };

    var register = function (url, data, successCallback, errorCallback) {
        $.ajax({
            url : url,
            dataType : "json",
            data : data,
            type : "POST"
        }).then(function(response){
            loginUI.hideLoading();
            successCallback ? successCallback() : null;
            loginUI.showMessage("SUCCESS_USER_REGISTERED_ACTIVE_MAIL_SENT", userMessages.SUCCESS_USER_REGISTERED_ACTIVE_MAIL_SENT, "success");
        }).fail(defaultErrorHandle);
    };

    var resetPassword = function(url, data) {
        $.ajax({
            url : url,
            dataType : "json",
            data : data,
            type : "POST"
        }).then(function(response){
            loginUI.hideLoading();
            loginUI.hideModal();
            loginUI.showMessage("SUCCESS_USER_RESET_MAIL_SENT", userMessages.SUCCESS_USER_RESET_MAIL_SENT, "success");
        }).fail(function(error) {
            defaultErrorHandle(error);
            initInactive();
        });
    };

    var loginByOAuth = function(url, data) {
        var deferred = $.ajax({
            url : url,
            dataType : "json",
            data : data,
            type : "POST"
        }).then(function(response) {
            loginUI.hideMessage();
            loginUI.hideModal();
            usrManager.setUser(response);
            usrManager.trigger("login");
            p("triggered login by post & connect oauth");
        }).fail(function(error) {
            defaultErrorHandle(error);
            initInactive();
        });
        return deferred;
    };

    var registerByOAuth = function(url, data) {
        var deferred = $.ajax({
            url : url,
            dataType : "json",
            data : data,
            type : "POST"
        }).then(function(response) {
            loginUI.hideMessage();
            loginUI.hideModal();
            usrManager.setUser(response);
            usrManager.trigger("login");
            p("triggered login by post");
        }).fail(defaultErrorHandle);
        return deferred;
    };

    var loginByPassword = function (url, data) {
        var loginDeferred = $.ajax({
            url : url,
            dataType : "json",
            data : data,
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            type : "POST"
        }).then(function(response) {
            loginUI.hideMessage();
            loginUI.hideModal();
            loginUI.hideLoading();
            usrManager.setUser(response);
            usrManager.trigger("login");
            p("triggered login by post");
        }).fail(function(error) {
            defaultErrorHandle(error);
            initInactive();
        });
        return loginDeferred;
    };

    var initInactive =  function(){
        var handler = $(".inactive-handle");
        if(!$(".inactive-handle")[0]) {
            return;
        }
        var username = handler.closest('form').find("input[name=identify]").val();
        handler.html("，如未收到激活邮件，请<a href='/login/reactive?identify=" + username + "' target='blank' class='text-primary'>点击重发</a>");
    };

    var notLoginFunctions = {
        initForm : function () {
            $(function(){
                $("#user-modal-register").on("submit", "form", function() {
                    var form = $(this);
                    loginUI.showLoading();
                    register(form.attr("action"), form.serialize());
                    return false;
                });
                $("#user-modal-reset").on("submit", "form", function() {
                    var form = $(this);
                    loginUI.showLoading();
                    resetPassword(form.attr("action"), form.serialize());
                    return false;
                });
                $("#user-modal-login").on("submit", "form", function(){
                    var form = $(this);
                    loginUI.showLoading();
                    loginByPassword(form.attr("action"), form.serialize());
                    return false;
                });
                $("#user-modal-connect-register").on("submit", "form", function() {
                    var form = $(this);
                    registerByOAuth(form.attr("action"), form.serialize());
                    return false;
                });
                $("#user-modal-connect-login").on("submit", "form", function() {
                    var form = $(this);
                    loginByOAuth(form.attr("action"), form.serialize());
                    return false;
                });
            });
        },
        initModal : function () {
            $(document).on("click", "body[data-logon=false] [data-action=login]", function(e){
                loginUI.showModal();
                return false;
            });      
        }
    };

    var loginFunctions = {
        replaceViews : function() {
            var user = usrManager.getUser();
            $("#leftbar .avatar").attr("src", user.avatar);
            $("#leftbar [data-action=login]").attr("href", "/mine/dashboard");
            $("#leftbar [data-action=login]:not(:has(img))").html("个人中心");
            $(".user-control").addClass(("login"));
            $(".user-control img").attr("src", user.avatar + '!wscn.avatar.xs');

            var path = window.location.pathname;
            if($.inArray(path, ["/login", "/register", "reset"]) !== -1) {
                window.location.href = "/mine/dashboard";
            }
            if(user.badges) {
                for(var badge in user.badges) {
                    var badgeTarget = $('[data-badge=' + badge + ']');
                    badgeTarget.append('<span class="badge-danger"></span>');
                }
                $('#navbar-right .avatar').append('<span class="badge-danger"></span>');
            }
        }
    };

    var initSocialBtn = function(){
        $(document).on("click", ".login-social-btn", function(){
            window.open($(this).attr("href"), "_blank");
            return false;
        });
    };


    /************************************
      Public Methods
     ************************************/
    UserLogin.prototype = {
        getOptions : function(){
            return this.options;
        }

        , setOAuthResponse : function(token, user, error, exception) {
            console.log(token, user, error, exception);
            //Direct login
            if(user) {
                if(usrManager.isLogin()) {
                    window.location.reload();
                } else {
                    usrManager.setUser(user);
                    usrManager.trigger("login");
                    loginUI.hideModal();
                    loginUI.hideMessage();                
                }
                return;
            }
            if(token) {
                loginUI.showUser(token.remoteUserName, token.remoteImageUrl, token.adapter);
                loginUI.showModal("register-connect");
            }
        }

        , getLoginUI : function() {
            return loginUI;
        }

        , loginByPassword : loginByPassword

        , loginByOAuth : loginByOAuth

        , resetPassword : resetPassword

        , register : register

        , registerByOAuth : registerByOAuth

        , initInactive : initInactive

        , initialize: function(opts){
            this.options = $.extend({}, defaultOptions, opts);
            initSocialBtn();
            var i;
            for(i in notLoginFunctions) {
                usrManager.onceNotLogin(notLoginFunctions[i]);
            }
            for(i in loginFunctions) {
                usrManager.onceLogin(loginFunctions[i]);
            }
        }
    };

    UserLogin.getInstance  = function(options){
        if(instance === null){
            instance = new UserLogin(options);
        }
        return instance;
    };
    return UserLogin;
}));

