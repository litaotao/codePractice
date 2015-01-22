(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(function (require, exports, module) {
            var $ = require("jquery");
            //Export to global anyway
            root.UserManager = factory(root, exports, $);
            return root.UserManager;
        });
    } else if (typeof exports !== "undefined") {
        var $ = require("jquery");
        factory(root, exports, $);
    } else {
        root.UserManager = factory(root, {}, root.jQuery);
    }

}(this, function(root, UserManager, $) {
    "use strict";
    //Debug shortcut
    function p(){
        if(typeof console === "undefined" || typeof console.info !== 'function') {
            return false;
        }
        console.info.apply(console, arguments);
    }

    /************************************
      Constants
     ************************************/
    var instance = null
        , options = {
        }
        , defaultOptions = {
            debug : true,
            dataType : "json",
            userUrl : "/me",
            cookieDomain : null,
            cookieRememberKey : "realm",
            cookieKey : "PHPSESSID"
        }
        , VERSION = "1.0.0"
        , status = {
            checked : 0,
            login : false
        }
        , debug = true
        , user = null
        , loginFunc = []
        , notLoginFunc = [];

    var defautEvents = {
        "login" : function(event, user)  {
            p("login triggered, loginFunc : %o", loginFunc);
            status.checked++;
            status.login = true;
            $("body").attr("data-logon", true);
            var i = 0;
            for(i in loginFunc) {
                var func = loginFunc[i];
                func(this, user);
            }
            //clear all
            loginFunc = [];
        },

        "notlogin" : function(event) {
            status.checked = true;
            status.login = false;

            $("body").attr("data-logon", false);
            var i = 0;
            for(i in notLoginFunc) {
                var func = notLoginFunc[i];
                func(this, user);
            }
            notLoginFunc = [];
        }
    }


    /************************************
      Constructors
     ************************************/
    UserManager = function(options){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one Singleton, use UserManager.getInstance()");
        }
        this.initialize(options);
    };

    /************************************
      Private Methods
     ************************************/
    function cookie (name, value, options) {
        if (typeof value != "undefined") { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = "";
                options.expires = -1;
            }
            var expires = "";
            if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == "number") {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = "; expires=" + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? "; path=" + (options.path) : "";
            var domain = options.domain ? "; domain=" + (options.domain) : "";
            var secure = options.secure ? "; secure" : "";
            document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != "") {
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + "=")) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    /************************************
      Public Methods
     ************************************/
    UserManager.prototype = {
        getOptions : function(){
            return options;
        }

        , setOption : function(key, value) {
            options[key] = value;
            return this;
        }

        , isLogin : function() {
            return status.login;
        }

        , start : function() {
            var root = this;
            if(null === cookie(options.cookieKey) && null === cookie(options.cookieRememberKey)) {
                root.trigger("notlogin");
                p("triggered notlogin by no cookie");
            } else {
                $.ajax({
                    url : options.userUrl,
                    dataType : 'jsonp'
                }).then(function(response) {
                    if(response && response.id > 0) {
                        user = response;
                        status.login = true;
                        root.trigger("login", [user]);
                        p("triggered login by session");
                    } else {
                        root.trigger("notlogin");
                        p("triggered notlogin by empty response");
                    }              
                }).fail(function(error) {
                    root.trigger("notlogin");
                    p("triggered notlogin by error response");
                });
            }
        }

        , getUser : function() {
            return user;
        }

        , setUser : function(usr) {
            user = usr;
        }

        //Run only once
        , onceNotLogin : function(func) {
            if (typeof func !== "function") {
                return false;
            } 

            if(false === status.login) {
                func(this, null);
            } else {
                notLoginFunc.push(func);
            }
            return this;
        }

        , getLoginFunctions : function() {
            return loginFunc;
        }

        , getNotLoginFunctions : function() {
            return notLoginFunc;
        }

        //Run only once
        , onceLogin : function(func) {
            if (typeof func !== "function") {
                return false;
            } 

            if(true === status.login) {
                func(this, user);
                p("run loginFunc : %o", func);
            } else {
                loginFunc.push(func);
                p("added loginFunc : %o", func);
            }
            return this;
        }
        
        , trigger : function(eventName, params) {
            $(document).trigger(eventName, params);
            return this;
        }

        , on : function(eventName, callback) {
            $(document).on(eventName, $.proxy(callback, this));
            return this;
        }

        , off : function(eventName) {
            $(document).off(eventName);
            return this;
        }

        , initialize: function(opts){
            options = $.extend({}, defaultOptions, opts);
            var events = $.extend(defautEvents, options.events);
            var key = 0;
            for(key in events) {
                this.on(key, events[key]);
            }
        }
    };

    UserManager.getInstance  = function(options){
        if(instance === null){
            instance = new UserManager(options);
        }
        return instance;
    }
    return UserManager;
}));
