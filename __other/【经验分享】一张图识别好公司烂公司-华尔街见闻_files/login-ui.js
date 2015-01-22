(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery");
            //Export to global anyway
            root.LoginUI = factory(root, exports, $);
            return root.LoginUI;
        });
    } else if (typeof exports !== "undefined") {
        var $ = require("jquery");
        factory(root, exports, $);
    } else {
        root.LoginUI = factory(root, {}, root.jQuery);
    }

}(this, function(root, LoginUI, $) {
    "use strict";
    var defaultOptions = {
        "rootSelector" : "#user-modal",
        "carouselSelector" : "#user-modal-carousel"
    };

    //Debug shortcut
    function p(){
        if(typeof console === "undefined") {
            return false;
        }
        console.info.apply(console, arguments);
    }

    /************************************
      Constructors
     ************************************/
    LoginUI = function(options){
        this.options = {};
        this.initialize(options);
        this.rootUI = $(this.options.rootSelector);
        this.carousel = $(this.options.carouselSelector);
        var root = this;
        $(function(){
            root.rootUI = $(root.options.rootSelector);
            root.carousel = $(root.options.carouselSelector);
        });
    };

    /************************************
      Constants
     ************************************/

    /************************************
      Public Methods
     ************************************/
    LoginUI.prototype = {
        getOptions : function(){
            return this.options;
        }

        , getRootUI : function() {
            return this.rootUI;
        }

        , showModal : function(name) {
           var judgeHost=window.location.href;
           if(judgeHost.indexOf('live')>=0){
            this.rootUI.find('.br-title').hide().next().hide();
           }
            this.rootUI.addClass("active");
            this.carousel.find(".item.active").removeClass("active");
            switch(name) {
                case "register" :
                    this.carousel.find(".item:eq(2)").addClass("active");
                    break;
                case "reset" :
                    this.carousel.find(".item:eq(0)").addClass("active");
                    break;
                case "login-connect" :
                    this.carousel.find(".item:eq(3)").addClass("active");
                    break;
                case "register-connect" :
                    this.carousel.find(".item:eq(4)").addClass("active");
                    break;
                case "login" :
                default:
                    this.carousel.find(".item:eq(1)").addClass("active");
                    break;
            }      
        }

        , hideModal : function() {
            this.rootUI.removeClass("active");
        } 
        ,showLoading :function(){
            this.rootUI.find('.loader').show();
        }
         ,hideLoading :function(){
            this.rootUI.find('.loader').hide();
        }    
        , showMessage : function(messageCode, message, messageType) {
            var uiClass = "alert-danger";
            if (messageType === "success") {
                uiClass = "alert-success";
            } else if (messageType === "info") {
                uiClass = "alert-info";
            } else if (messageType === "warning") {
                uiClass = "alert-warning";
            }
            var form = this.rootUI.find(".item.active form");
            form.find(".alert").remove();
            form.prepend(
                "<div data-raw-message='" + messageCode + "' class='alert " + uiClass + " alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>" +
                "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" +
                message + "</div>");
        }

        , hideMessage : function() {
            this.rootUI.find(".item.active .alert").remove();
        }

        , showUser : function(username, avatar, site) {
            var sites = {
                "weibo" : "微博",
                "tencent" : "QQ"
            };
            this.rootUI.find("[data-auth-avatar]").attr("src", avatar);
            this.rootUI.find("[data-auth-user]").html(username);
            this.rootUI.find("[data-auth-site]").html(sites[site]);
        }

        , initialize: function(opts){
            this.options = $.extend({}, defaultOptions, opts);
        }
    };

    return LoginUI;
}));
