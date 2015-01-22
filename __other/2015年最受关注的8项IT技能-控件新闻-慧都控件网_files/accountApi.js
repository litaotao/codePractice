/**
 * 用户注册页面的功能
 *------------------------------------------------------
 * 使用当前库方法：
 *      window.accountApi.apiReady(function (customer) {
 *           //To do yours...
 *      });
 *------------------------------------------------------
 *
 *
 * @author ranj,739521119@qq.com
 * @time 2014-06-13 10:04:57
 */
(function (window, document, $) {
    var extend = {
        /**
         * 异步获取用户信息
         *
         * @parame callback:回调函数
         */
        load_account: function (callbacks) {
            if (callbacks == null) {
                return;
            }
            $.ajax({
                type: "post",
                async: true,
                timeout: 5000,
                url: "/Account/Handler/Account.ashx",
                dataType: "json",
                cache: true,
                success: function (result) {
                    for (var index = 0; index < callbacks.length; index++) {
                        var callback = callbacks[index];
                        if (typeof callback == "function") {
                            try {
                                callback(true, result);
                            } catch (e) {
                                console.log("func:'" + callback + "' error:", e);
                            }
                        }
                    }
                },
                error: function () {
                    for (var index = 0; index < callbacks.length; index++) {
                        var callback = callbacks[index];
                        if (typeof callback == "function") {
                            try {
                                callback(false, null);
                            } catch (e) {

                            }
                        }
                    }
                }
            });
        },
        booststrap: {
            button: {
                loading: function ($self) {
                    $self.button('loading');
                },
                complete: function ($self) {
                    $self.button('complete');
                }
            }
        }
    };

    /**
     * 获取用户信息，并加载到window 中
     *
     */
    var accountApi = {
        initEventBind: {
            apiReady: {
                ev: document.createEvent('HTMLEvents'),

                initEvent: function () {
                    this.ev.initEvent('apiReady', false, false);
                }
            },

            init: function () {
                //页面init事件注册
                this.apiReady.initEvent();

                //jquery load 
                $(this.onReady);
            },
            onReady: function () {
                accountApi.init();
            }
        },
        // 需要在页面加载前执行的代码
        init: function () {
            document.dispatchEvent(accountApi.initEventBind.apiReady.ev);
        },
        apiReady: function (callback) {
            if (typeof callback == "function") {
                if (this._apiReady == null) {
                    this._apiReady = [];
                }
                this._apiReady.push(callback);
            }
        },
        extend: extend
    };

    accountApi.initEventBind.init();
    document.addEventListener("apiReady", function () {
        if (typeof accountApi._apiReady != null) {
            extend.load_account(accountApi._apiReady);
        }
    }, false);

    window.accountApi = accountApi;

})(window, document, $);

/**
 *
 */
(function (window, document, $) {
    window.accountApi.account = {
        isAuthenticated: function (callback) {
            $.ajax({
                type: "post",
                async: true,
                timeout: 10000,
                url: "/Account/Handler/IsAuthenticated.ashx",
                dataType: "json",
                cache: true,//缓存
                success: function (result) {
                    callback(true, result);
                },
                error: function () {
                    callback(false, false);
                }
            });
        },
        GetAccount: function (callback) {
            $.ajax({
                type: "post",
                async: true,
                timeout: 5000,
                url: "/Account/Handler/Account.ashx",
                dataType: "json",
                cache: true,
                success: function (result) {
                    callback(result);
                },
                error: function () {
                    callback(null);
                }
            });
        },
        redirect_sign_in: function (returnUrl) {
            location.href = '/sign-in?returnUrl=' + returnUrl;
        },
        note: {
            take_note: function () {
                window.accountApi.account.isAuthenticated(function (isCallSuccess, isAuth) {
                    if (!isAuth) {
                        window.accountApi.account.redirect_sign_in(location.href);
                    }

                    $('#NoteModal').modal('show');
                });
            },
            save_note: function (callback) {
                var editorId = $("#note_id").val();
                var messageinfo = $.trim($("#noteArea").val());
                var objectname = $("#objectname").val();
                var objectId = $("#objectId").val();
                var objecttype = $("#objecttype").val();
                //if (!validate(editorId, messageinfo)) {
                //    return;
                //}
                if (messageinfo == "") {
                    alert("留言内容不能为空");
                    return;
                }
                $.ajax({
                    type: "post",
                    async: true,
                    timeout: 10000,
                    url: "/Handlers/Users/takeNoteExchange.ashx",
                    dataType: "json",
                    data: {
                        action: "LeaveMessageToEditor", editorId: editorId, messageinfo: messageinfo,
                        objectname: objectname, objectId: objectId, objecttype: objecttype
                    },
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, null);
                    }
                });
            },
            saveCustomerMessage: function (accepterAccountId, targetId, content,callback) {
                var postDatas = {
                    'aId': accepterAccountId,
                    'tId': targetId,
                    'content': content
                };
                $.ajax({
                    type: "post",
                    async: true,
                    timeout: 100000,
                    url: "/Handlers/CustomerMessage/SaveCustomerMessage.ashx",
                    data: postDatas,
                    dataType: "json",
                    cache: false,
                    success: function (result) {
                        callback(result);
                    },
                    error: function (ex) {
                        personAjax.visitFailure(ex, function (result) {
                            callback(result);
                        });
                    }
                });
            }
        },
        address: {
            update_address: function (address, validate, callback) {
                if(!validate(address)) {
                    return;
                }
                
                $.ajax({
                    type: "post",
                    async: true,
                    timeout: 10000,
                    data:address,
                    url: "/Account/Handler/UpdateCustomerAddress.ashx",
                    dataType: "json",
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, false);
                    }
                });
            },
            get_address: function (callback) {
                $.ajax({
                    type: "post",
                    async: true,
                    timeout: 10000,
                    url: "/Account/Handler/GetCustomerAddress.ashx",
                    dataType: "json",
                    cache: true,//缓存
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function () {
                        callback(false, false);
                    }
                });
            }
        }
    };
    window.accountApi.account.enterprise = {};
})(window, document, $);


function EnterpriseActivityApply(activityId, sourse, activityname) {
    
    window.accountApi.account.GetAccount(function (customer) {
        if (customer == null) {
            window.accountApi.account.redirect_sign_in(location.href);
            return;
        }
        if (customer.AccountType != "enterprise") {
            location.href = 'http://training.evget.com/open/detail/{0}#ActivityApply'.StringFormat(activityId);
            return;
        }
        var CrmCompany = $.trim($("#CrmCompany").val());
        var CrmName = $.trim($("#CrmName").val());
        var CrmPhone = $.trim($("#CrmPhone").val());
        var CrmEmail = $.trim($("#CrmEmail").val());
        if (CrmCompany == "" || CrmName == "" || CrmPhone == "" || CrmEmail == "") {
            alert("您的基本信息【公司名称、姓名、联系方式、邮箱地址】未添加完成，不能快捷报名哟！请确认信息无误后再进行报名");
            return;
        }
        $.ajax({
            type: "post",
            async: true,
            timeout: 10000,
            url: "/Account/Enterprises/Handlers/EnterpriseDataHandler.ashx",
            data: {
                action: "EnterpriseActivityApply", activityId: activityId,
                activitysourse: sourse
            },
            dataType: "json",
            cache: true,
            success: function (result) {
                if (result.success) {
                    $("#CrmActivityName").val(activityname);
                    alert("活动报名成功！");
                    document.WebToLeads835001000003335156.submit();
                   
                } else {
                    alert(result.message);
                }

            }, error: function () {
                alert("系统异常，请稍候重试");

            }
        });
    });
   
}