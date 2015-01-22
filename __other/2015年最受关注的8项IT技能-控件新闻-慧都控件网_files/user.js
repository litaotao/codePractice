var checkFlag = true;
var count = 0;
//检查用户名+邮箱
function checkUserNameOrEmail_login() {
    var EUN = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var CUN = /^((?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+){3,}$/;
    var userNameOrEmail = $("#userNameOrEmail").val();
    if (userNameOrEmail == "") {
        $("#useroremailDiv").removeClass("success");
        $("#useroremailDiv").addClass("error");
        $("#useroremailError").attr("style", "display:inline");
        $("#useroremailError").text("请输入用户名或者Email!");
        checkFlag = false;
        return false;

    }
    else if (!EUN.test(userNameOrEmail) && !CUN.test(userNameOrEmail)) {
        $("#useroremailDiv").removeClass("success");
        $("#useroremailDiv").addClass("error");
        $("#useroremailError").attr("style", "display:inline");
        $("#useroremailError").text("用户名或者Email格式不正确!");
        checkFlag = false;
        return false;

    } else {
        $("#useroremailDiv").removeClass("error");
        $("#useroremailDiv").addClass("success");
        $("#useroremailError").attr("style", "display:none");
        $("#useroremailError").text("");
        return true;
    }

}

//检查用户名
function checkUserName() {

    var CUN = /^((?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+){3,}$/;
    var userName = $("#userName").val();
    //空
    if (userName == "") {
        //添加错误
        $("#userNameDiv").removeClass("success");
        $("#userNameDiv").addClass("error");
        $("#userNameError").attr("style", "display:inline");
        $("#userNameError").text("用户名不能为空");
        checkFlag = false;
        return false;
    }
    //不符合
    if (!CUN.test(userName)) {
        $("#userNameDiv").removeClass("success");
        $("#userNameDiv").addClass("error");
        $("#userNameError").attr("style", "display:inline");
        $("#userNameError").text("请填写3位以上字母或汉字作为用户名");
        checkFlag = false;
        return false;
    }
    else {
        $.ajax({
            type: "POST",
            async: false,
            url: "/UserCenter/DataHandlers/DataExchange.ashx",
            data: { action: "checkUser", userName: userName }
        }).done(function (data) {

            if (data != 'True') {
                $("#userNameDiv").removeClass("success");
                $("#userNameDiv").addClass("error");
                $("#userNameError").attr("style", "display:inline");
                $("#userNameError").text("用户名已经存在");
                checkFlag = false;
                return false;
            } else {
                $("#userNameDiv").removeClass("error");
                $("#userNameDiv").addClass("success");
                $("#userNameError").attr("style", "display:none");
                $("#userNameError").text("");
                return true;
            }
        });
    }
    //check pass
}

//检查邮箱
function checkEmail() {
    var EUN = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var email = $("#emailAddress").val();
    if (email == "") {
        $("#emailDiv").removeClass("success");
        $("#emailDiv").addClass("error");
        $("#emailError").attr("style", "display:inline");
        $("#emailError").text("邮箱地址不能为空");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(email)) {
        $("#emailDiv").removeClass("success");
        $("#emailDiv").addClass("error");
        $("#emailError").attr("style", "display:inline");
        $("#emailError").text("邮箱地址格式不正确");
        checkFlag = false;
        return false;
    } else {
        $.ajax({
            type: "POST",
            async: false,
            url: "/UserCenter/DataHandlers/DataExchange.ashx",
            data: { action: "checkEmail", email: email }
        }).done(function (data) {

            if (data != 'True') {
                $("#emailDiv").removeClass("success");
                $("#emailDiv").addClass("error");
                $("#emailError").attr("style", "display:inline");
                $("#emailError").text("填写的邮箱地址已被使用");
                checkFlag = false;
                return false;
            } else {
                $("#emailDiv").removeClass("error");
                $("#emailDiv").addClass("success");
                $("#emailError").attr("style", "display:none");
                $("#emailError").text("");
                return true;
            }
        });
    }
}

// 旧密码检查
function checkOldPassWord() {
    //密码规则6到20位任意可见字符
    var password = $("#oldpassword").val();
    if (password == "") {
        $("#oldpasswordDiv").removeClass("success");
        $("#oldpasswordDiv").addClass("error");
        $("#oldpasswordError").attr("style", "display:inline");
        $("#oldpasswordError").text("当前密码不能为空");
        checkFlag = false;
        return false;
    }
    if (password.length < 6 || password.length > 20) {

        $("#oldpasswordDiv").removeClass("success");
        $("#oldpasswordDiv").addClass("error");
        $("#oldpasswordError").attr("style", "display:inline");
        $("#oldpasswordError").text("密码长度必须在6-20位之间!");

        checkFlag = false;
        return false;
    } else {
        $("#oldpasswordDiv").removeClass("error");
        $("#oldpasswordDiv").addClass("success");
        $("#oldpasswordError").attr("style", "display:none");
        $("#oldpasswordError").text("");
        return true;
    }
}

//检查密码
function checkPassword_login() {
    //密码规则6到20位任意可见字符
    var password = $("#password").val();
    if (password == "") {
        $("#passwordDiv").removeClass("success");
        $("#passwordDiv").addClass("error");
        $("#passwordError").attr("style", "display:inline");
        $("#passwordError").text("密码不能为空");
        checkFlag = false;
        return false;
    }
    if (password.length < 6 || password.length > 20) {

        $("#passwordDiv").removeClass("success");
        $("#passwordDiv").addClass("error");
        $("#passwordError").attr("style", "display:inline");
        $("#passwordError").text("密码长度必须在6-20位之间!");

        checkFlag = false;
        return false;
    } else {
        $("#passwordDiv").removeClass("error");
        $("#passwordDiv").addClass("success");
        $("#passwordError").attr("style", "display:none");
        $("#passwordError").text("");
        return true;
    }
}
//重复密码检查
function CheckRePassWord() {
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();

    if (rePassword == "") {
        $("#rePasswordDiv").removeClass("success");
        $("#rePasswordDiv").addClass("error");
        $("#rePasswordError").attr("style", "display:inline");
        $("#rePasswordError").text("确认密码不能为空！");
        checkFlag = false;
        return false;
    } else if (password != rePassword) {
        $("#rePasswordDiv").removeClass("success");
        $("#rePasswordDiv").addClass("error");
        $("#rePasswordError").attr("style", "display:inline");
        $("#rePasswordError").text("两次输入密码不一致!");
        checkFlag = false;
        return false;
    } else {
        $("#rePasswordDiv").removeClass("error");
        $("#rePasswordDiv").addClass("success");
        $("#rePasswordError").attr("style", "display:none");
        $("#rePasswordError").text("");
        return true;
    }

}
//注册提交
function registSubmit() {
    //异步提交，失败提示
    checkFlag = true;
    var userName = $("#userName").val();
    var email = $("#emailAddress").val();
    var password = $("#password").val();
    var protocol = $("#protocol").attr("checked");
    checkEmail();
    checkPassword_login();
    CheckRePassWord();
    checkUserName();
    if (count != 0) return false;
    if ((checkFlag) && (protocol == "checked")) {
        count++;
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
             { action: "regist", userName: userName, email: email, password: password },
                     function (data) {
                         if (data == "True") {
                             var emailAddress = GetEmailAddress(email);
                             window.location.href = '/UserCenter/Passport/Profile.aspx?mailAddress=' + emailAddress;
                         }
                         else {
                             $('#errorDiv').css('display', 'block');
                         }
                     });//function end


    }

}
//检查昵称 
function checkNickname(str) {

    var EUN = /^[\u4E00-\u9FA5A-Za-z0-9._-]+$/;
    if (str == "") {

        $("#NicknameDiv").removeClass("success");
        $("#NicknameDiv").addClass("error");
        $("#NicknameError").attr("style", "display:inline");
        $("#NicknameError").text("昵称不能为空！");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#NicknameDiv").removeClass("success");
        $("#NicknameDiv").addClass("error");
        $("#NicknameError").attr("style", "display:inline");
        $("#NicknameError").text("昵称格式错误!");
        checkFlag = false;
        return false;
    }
    else {
        $("#NicknameDiv").removeClass("error");
        $("#NicknameDiv").addClass("success");
        $("#NicknameError").attr("style", "display:none");
        $("#NicknameError").text("");
        return true;
    }
}
//检查真实姓名 
function checkTrueName(str) {

    var EUN = /^[A-Za-z\u4e00-\u9fa5]+$/;
    //alert(str);
    if (str == "") {
        $("#trueNameDiv").removeClass("success");
        $("#trueNameDiv").addClass("error");
        $("#trueNameError").attr("style", "display:inline");
        $("#trueNameError").text("姓名不能为空！");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#trueNameDiv").removeClass("success");
        $("#trueNameDiv").addClass("error");
        $("#trueNameError").attr("style", "display:inline");
        $("#trueNameError").text("真实姓名格式错误!例如：张三");
        checkFlag = false;
        return false;
    }
    else {
        $("#trueNameDiv").removeClass("error");
        $("#trueNameDiv").addClass("success");
        $("#trueNameError").attr("style", "display:none");
        $("#trueNameError").text("");
        return true;
    }
}
//检查公司名称 
function checkCompanyName(str) {

    var EUN = /^[\u4E00-\u9FA5A-Za-z0-9._-]+$/;
    if (str == "") {
        $("#companyNameDiv").removeClass("success");
        $("#companyNameDiv").addClass("error");
        $("#companyError").attr("style", "display:inline");
        $("#companyError").text("公司名称不能为空!");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#companyNameDiv").removeClass("success");
        $("#companyNameDiv").addClass("error");
        $("#companyError").attr("style", "display:inline");
        $("#companyError").text("公司名称格式错误!例如：重庆慧都科技");
        checkFlag = false;
        return false;
    }
    else {
        $("#companyNameDiv").removeClass("error");
        $("#companyNameDiv").addClass("success");
        $("#companyError").attr("style", "display:none");
        $("#companyError").text("");
        return true;
    }
}
//检查电话号码 
function checkTel(str) {
    var EUN = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    if (str == "") {
        $("#telDiv").removeClass("success");
        $("#telDiv").addClass("error");
        $("#telError").attr("style", "display:inline");
        $("#telError").text("电话不能为空!");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#telDiv").removeClass("success");
        $("#telDiv").addClass("error");
        $("#telError").attr("style", "display:inline");
        $("#telError").text("电话格式错误! 例如：13888888888或010-66666666");
        checkFlag = false;
        return false;
    }
    else {
        $("#telDiv").removeClass("error");
        $("#telDiv").addClass("success");
        $("#telError").attr("style", "display:none");
        $("#telError").text("");
        return true;
    }
}

//检查通信地址
function checkAddress(str) {
    var EUN = /^[\u4E00-\u9FA5A-Za-z0-9._-]+$/;
    if (str == "") {
        $("#AddressDiv").removeClass("success");
        $("#AddressDiv").addClass("error");
        $("#AddressError").attr("style", "display:inline");
        $("#AddressError").text("通讯地址不能为空!");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#AddressDiv").removeClass("success");
        $("#AddressDiv").addClass("error");
        $("#AddressError").attr("style", "display:inline");
        $("#AddressError").text("通讯地址格式错误!");
        checkFlag = false;
        return false;
    }
    else {
        $("#AddressDiv").removeClass("error");
        $("#AddressDiv").addClass("success");
        $("#AddressError").attr("style", "display:none");
        $("#AddressError").text("");
        return true;
    }

}
//检查微信/QQ 
function checkQQ(str) {

    var EUN = /^[1-9]{1}[0-9]{4,10}$/;
    if (str == "") {
        $("#qqDiv").removeClass("success");
        $("#qqDiv").addClass("error");
        $("#qqError").attr("style", "display:inline");
        $("#qqError").text("QQ/微信不能为空!");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#qqDiv").removeClass("success");
        $("#qqDiv").addClass("error");
        $("#qqError").attr("style", "display:inline");
        $("#qqError").text("QQ格式错误！例如：66666");
        checkFlag = false;
        return false;
    }
    else {
        $("#qqDiv").removeClass("error");
        $("#qqDiv").addClass("success");
        $("#qqError").attr("style", "display:none");
        $("#qqError").text("");
        return true;
    }
}
function CheckTelphone() {
    var str = $("#txtTel").val();
    var EUN = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
    if (str == "") {
        $("#telDiv").removeClass("success");
        $("#telDiv").addClass("error");
        $("#telError").attr("style", "display:inline");
        $("#telError").text("电话不能为空!");
        checkFlag = false;
        return false;
    }
    if (!EUN.test(str)) {
        $("#telDiv").removeClass("success");
        $("#telDiv").addClass("error");
        $("#telError").attr("style", "display:inline");
        $("#telError").text("电话格式错误! 例如：13888888888或010-66666666");
        checkFlag = false;
        return false;
    }
    else {
        $("#telDiv").removeClass("error");
        $("#telDiv").addClass("success");
        $("#telError").attr("style", "display:none");
        $("#telError").text("");
        return true;
    }
}
function Reg2Submit() {
    //&& checkCompanyNameOrRealName() && checkQQ() && checkAddress()
    if (checkUserRealName() && CheckTelphone()) {
        var trueName = $("#txtTrueName").val();
        var companyName = $("#txtCompanyName").val();
        var tel = $("#txtTel").val();
        var qq = $("#txtQQ").val();
        var address = $("#address").val();
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
                { action: "infoProfile", TrueName: trueName, CompanyName: companyName, Tel: tel, QQ: qq, address: address },
                 function (data) {
                     if (data == "True") {
                         var ea = getArgs("mailAddress");
                         window.location.href = '/UserCenter/Passport/Message.aspx?m=SignUp&mailAddress=' + ea;
                     }
                     else {
                         $('#errorDiv').css('display', 'block');
                     }
                 })
        return true;
    }
    return false;
}

//完成注册提交
function ProfileSubmit() {
    checkFlag = true;
    var trueName = $("#txtTrueName").val();
    var companyName = $("#txtCompanyName").val();
    var tel = $("#txtTel").val();
    var qq = $("#txtQQ").val();
    checkTrueName(trueName);
    checkTel(tel);
    checkCompanyName(companyName);
    checkQQ(qq);
    if (count != 0) return false;
    if (checkFlag) {
        count++;
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { action: "profile", TrueName: trueName, CompanyName: companyName, Tel: tel, QQ: qq },
                    function (data) {
                        if (data == "True") {
                            var ea = getArgs("mailAddress");
                            window.location.href = '/UserCenter/Passport/Message.aspx?m=SignUp&mailAddress=' + ea;
                        }
                        else {
                            $('#errorDiv').css('display', 'block');
                        }
                    });//function end


    }
}

// 找回密码提交 
function ResetPassword() {
    checkFlag = true;
    var userNameOrEmail = $("#userNameOrEmail").val();
    checkUserNameOrEmail_login();
    if (checkFlag) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { userNameOrEmail: userNameOrEmail, action: "ResetPwd" },
                function (data) {
                    if (data == "True") {
                        window.location.href = '/UserCenter/Passport/Message.aspx?m=ResetPassword';
                    } else {
                        $('#errorDiv').css('display', 'block');
                    }
                });

    }

}
function checkCode() {
    var oldCode = $("#oldCode").val();
    //密码规则6到20位任意可见字符    
    if (oldCode == "") {
        $("#oldpasswordDiv").removeClass("success");
        $("#oldpasswordDiv").addClass("error");
        $("#oldpasswordError").attr("style", "display:inline");
        $("#oldpasswordError").text("验证码不能为空！");
        checkFlag = false;
        return false;
    } else {
        $("#oldpasswordDiv").removeClass("error");
        $("#oldpasswordDiv").addClass("success");
        $("#oldpasswordError").attr("style", "display:none");
        $("#oldpasswordError").text("");
        return true;
    }
}
//通过邮箱修改密码
function PwdChangeByCode(username) {
    checkFlag = true;
    var NewPwd = $("#password").val();
    var oldCode = $("#oldCode").val();
    checkCode();
    checkPassword_login();
    CheckRePassWord();
    if (username == undefined) { username = "" }

    if (checkFlag) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
           { UserNameOrEmail: username, OldCode: oldCode, NewPwd: NewPwd, action: "ChangePasswordByCode" },
           function (data) {
               if (data == "success") {
                   window.location.href = '/UserCenter/Passport/Message.aspx?m=PwdChange';
               } else {
                   alert(data);
               }
           });
    }
}

// 修改密码1  
function PwdChange(username) {
    checkFlag = true;
    var NewPwd = $("#password").val();
    var OldPwd = $("#oldpassword").val();
    checkOldPassWord();
    checkPassword_login();
    CheckRePassWord();
    if (username == undefined) { username = "" }

    if (checkFlag) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
           { UserNameOrEmail: username, OldPwd: OldPwd, NewPwd: NewPwd, action: "ChangePassword_Post" },
           function (data) {
               if (data == "success") {
                   window.location.href = '/UserCenter/Passport/Message.aspx?m=PwdChange';
               } else {
                   alert(data);
               }
           });
    }
}

function getArgs(strParame) {
    var args = new Object();
    var query = location.search.substring(1); // Get query string
    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); // Look for "name=value"
        if (pos == -1) continue; // If not found, skip
        var argname = pairs[i].substring(0, pos); // Extract the name
        var value = pairs[i].substring(pos + 1); // Extract the value
        value = decodeURIComponent(value); // Decode it, if needed
        args[argname] = value; // Store as a property
    }
    return args[strParame]; // Return the object
}
//获取邮箱服务器
function GetEmailAddress(email) {
    var emailAddress = "";
    var emailServe = email.split("@")[1];
    if (emailServe == '163.com' || emailServe == 'qq.com' || emailServe == '126.com'
        || emailServe == 'sina.com' || emailServe == '188.com' || emailServe == 'yeah.net') {
        emailAddress = "http://mail." + emailServe;
    } else if (emailServe == 'gmail.com') {
        emailAddress = emailServe;
    } else if (emailServe == 'vip.163.com' || emailServe == 'vip.126.com') {
        emailAddress = emailServe;
    } else if (emailServe == '139.com') {
        emailAddress = "http://mail.10086.cn/";
    } else {
        emailAddress += "mailto:" + email;
    }
    return emailAddress;
}


function checkVCodeValue() {
    checkFlag = true;
    //var VCodeValue = $("#VCodeValue").val();
    //$.ajax({
    //    type: "POST",
    //    async: false,
    //    url: "/UserCenter/DataHandlers/DataExchange.ashx",
    //    data: { action: "checkVCodeValue", VCodeValue: VCodeValue }
    //}).done(function (data) {

    //    if (data == "error") {
    //        $("#VCodeDiv").removeClass("success");
    //        $("#VCodeDiv").addClass("error");
    //        $("#VCodeError").attr("style", "display:inline");
    //        $("#VCodeError").text("验证码输入错误!");
    //        $("#imgVerify").click();
    //        checkFlag = false;
    //        return false;
    //    } else {
    //        $("#VCodeDiv").removeClass("error");
    //        $("#VCodeDiv").addClass("success");
    //        $("#VCodeError").attr("style", "display:none");
    //        $("#VCodeError").text("");
    //        return true;
    //    }
    //});
    return true;
}

//登录提交
function loginSubmit(type) {
    //异步提交，失败提示
    checkFlag = true;
    var userNameOrEmail = $("#userNameOrEmail").val();
    var password = $("#password").val();
    var rememberMe = $("#rememberMe").val();
   // var VCodeValue = $("#VCodeValue").val();
    checkUserNameOrEmail_login();
    checkPassword_login();
   // checkVCodeValue();
    if (checkFlag) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { userNameOrEmail: userNameOrEmail, password: password, rememberMe: rememberMe, action: "login_Post" },
                function (data) {
                   
                    if (data == "Logined") {
                        if (type == 0) {
                            //刷新当前页面
                            window.location.reload();
                        } else {
                            var url = $("#txtUrl").val();
                            if (url == undefined || url == "" || (url == "/UserCenter/Passport/UserLogin.aspx")) {
                                GotoUserHome();
                            } else {
                                location.href = url;
                            }
                        }
                        //    
                        //} else if (getArgs("url") == null) {
                        //    //进入用户认证页面
                        //    GotoUserHome();
                        //} else {
                        //    //兼容旧逻辑，返回来的URL
                        //    location.href = $("#txtUrl").val();
                        //}
                    } else {
                       
                        $('#errorDiv').css('display', 'block');
                        $('#errSpan').html(data);
                       // $("#VCodeValue").val('');
                        $("#imgVerify").click();
                    }
                });
    }
}
// 修改邮箱 
function MailSetting() {
    var email = $("#emailAddress").val();
    checkEmail();
    if (checkFlag) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { Email: email, action: "ChangeEmail_Post" },
                        (function (data) {
                            if (data == "True") {
                                var emailAddress = GetEmailAddress(email);
                                window.location.href = '/UserCenter/Passport/Message.aspx?m=MailSetting&mailAddress=' + emailAddress;

                            } else {
                                alert("保存失败，请稍后再试。");
                            }
                        })
                    );
    }
}

//修改基本信息 

function changeUserinfo(tel, nname, cname, addr, tname, qq, jobVal, workYearVal, description, workState) {
    checkFlag = true;

    checkNickname(nname);
    checkTrueName(tname);
    checkTel(tel);
    checkCompanyName(cname);
    checkQQ(qq);
    checkAddress(addr);
    if (count != 0) return false;
    if (checkFlag) {
        count++;
        // 提交


        var languageVal = GetCheckboxGroupVal('language');
        var platformVal = GetCheckboxGroupVal('platform');

        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            {
                TrueName: tname, Nickname: nname, CompanyName: cname, Tel: tel, Address: addr, QQ: qq, Description: description,
                Job: jobVal, WorkYear: workYearVal, WorkState: workState, Language: languageVal, Platform: platformVal,
                action: "ChangeUserinfo_Post"
            },
            (
                function (data) {
                    if (data == "success") {
                        GotoUserHome();
                    } else {
                        alert(data);
                    }
                }
            ));
    }
    return false;
}

function LoginOut() {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "logout" },
        function (data) {
            window.location.href = "/UserCenter/Passport/UserLogin.aspx";
        })
}

function GetCheckboxGroupVal(data) {
    var text = "";
    $('input[type="checkbox"][itemid="' + data + '"]:checked').each(
                  function () {
                      text += "|" + $(this).val();
                  }
              );
    return text;
};

function GetCheckboxGroupObj(data) {
    var text = "";
    $('input[type="checkbox"][itemid="' + data + '"]:checked').each(
                  function () {
                      text += "|" + $(this).val();
                  }
              );
    return text;
};
// 返回用户首页
function GotoUserHome() {
    $.post('/UserCenter/DataHandlers/DataExchange.ashx',
        { action: "get-name" },
        function (data) {
            if (data != null) {
                window.location.href = '/u/' + data;
            } else {
                 window.location.href = '/';
            }
        }
        );
}

function takAttention(uid) {
    if (uid == "" || uid == undefined) {
        uid = $("#uid").val();
    }
    $.post('/UserCenter/DataHandlers/DataExchange.ashx',
        { action: "takeAttenntion", uid: uid },
        function(data) {
            if (data == 'null') {
                showLogin();
            } else if (data == 'True') {
                alert("关注成功");
                location.reload();
            } else {
                alert("关注失败，请重试");
                location.reload();
            }
        });
}
function Authentication() {
    $.post('/UserCenter/DataHandlers/DataExchange.ashx',
        { action: "checkAuthentication" },
        function(data) {
            if (data == 'True') {
                showAuthenticationAgreement();
            } else if (data == "Authenticationed") {
                alert("你已经通过了认证");
            } else if (data == 'Authenticationing') {
                alert("你已经提交了认证申请，请耐心等待审核");
            } else {
                showLogin();
            }
        });
}


//取消关注
function unAttention(id) {
    $.post('/UserCenter/DataHandlers/DataExchange.ashx',
        { action: "unAttenntion", rid: id },
        function(data) {
            //alert(data);
            if (data == 'true') {
                alert("取消成功");
            } else {
                alert("取消失败");
            }
            location.reload();
        });
}
//显示个人说明修改框
function showDes() {
    $("#DesModal").modal('show');
}
function updateDes() {
    var des = $("#userDescription").val();
    if (des.length <= 50) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "updateDes", description: des },
        function (data) {
            if (data == 'True') {
                alert("修改成功");
            } else {
                alert("修改失败，请重试");
            }
            location.reload();
        })
    } else {
        alert("个人说明不能超过50个汉字");
    }

}
function UnSubscribe(d) {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "UnSubscribe", id: d },
        function (data) {
            if (data == 'True') {
                alert("取消订阅成功");
            } else {
                alert("取消订阅失败，请重试");
            }
            location.reload();
        });
}
function ReplyNote(id) {
    $('#replyField_' + id).attr('style', "");
}
function CancleReply(id) {
    $('#replyField_' + id).attr('style', "display:none");
}
function ReplyNoteSave(fid, nid) {
    //alert(fid + ":" + nid);
    var info = $('#reply_' + nid).val();
    //某些原因不能获取返回值进行提醒
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "replyNote", fid: fid, tid: nid, info: info })
}
function deleteNote(id) {
    if (confirm("确定要删除该留言")) {
        $.post("/UserCenter/DataHandlers/DataExchange.ashx",
            { action: "deleteNote", id: id },
            function(data) {
                if (data == 'True') {
                    location.reload();
                } else {
                    alert("删除留言失败，请重试！");
                }
            });
    }
}

function showLogin() {
    $('#modal-sign-in').modal('show');
}

function checkUserNameOrEmail() {
    var EUN = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var CUN = /^((?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+){3,}$/;
    var userName = $('#UserName').val();
    if (userName == "" || userName == "请输入用户名/邮箱地址") {
        $("#errorMsg").text("用户名不能为空！");
        $('#userNameDiv').addClass('control-group error');
        //$("#errorPanel").attr('style', 'display:inline;height:25px');
        return false;
    }
    if (!EUN.test(userName) && !CUN.test(userName)) {
        $("#errorMsg").text("用户名不符合规范！");
        $('#userNameDiv').addClass('control-group error');
        //$("#errorPanel").attr('style', '');
        return false;
    } else {
        $("#errorMsg").html("&nbsp");
        //$("#errorPanel").attr('style', 'display:none');
        //更改input样式
        //$("#userNameError").text("checked ok！");
        $('#userNameDiv').addClass('control-group success');
        return true;
    }
}
function checkPassword() {
    var PWD_REG = /^[\w\W]{6,20}$/;
    var pwd = $('#Password').val();
    if (pwd == "" || pwd == "请输入您的密码") {
        $("#errorMsg").text("密码不能为空！");
        $('#PasswordDiv').addClass('control-group error');
        //$("#errorPanel").attr('style', 'display:inline;height:25px');
        return false;
    }
    if (!PWD_REG.test(pwd)) {
        $("#errorMsg").text("请输入6到20位的密码进行登录");
        $('#PasswordDiv').addClass('control-group error');
        //$("#errorPanel").attr('style', '');
        return false;
    } else {
        $("#errorMsg").html("&nbsp");
        //$("#errorPanel").attr('style', 'display:none');
        //更改input样式
        //$("#userNameError").text("checked ok！");
        $('#PasswordDiv').addClass('control-group success');
        return true;
    }
}
function doLogin() {
    //var flag = false;
    //用户名和密码验证均通过的时候进行提交
    //var url = $('#url').val();
    //if (url == "" || url == undefined) {
    //    url = location.href;
    //}
    if (!checkUserNameOrEmail() || !checkPassword())
        return; //访问登录
    
    var userName = $('#UserName').val();
    var pwd = $('#Password').val();

    //访问登录并更新Dom
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "login", userName: userName, password: pwd },
        function (data) {
            if (data == 'True') {
                location.href=location.href;
                
                $('#modal-sign-in').modal('hide');
                //location.href = url;
                return;
            }

            $("#errorMsg").text("登录失败，请检查您的用户名和密码");
            //$("#errorPanel").attr('style', ''); 
        }); //return flag;
}
function ExchangeShowState(id) {
    //IE8中 设置attr("style","")的时候再次获取attr("style")为undefined
    //设置attr("style","display:none")的时候获取attr("style")的字符串为DISPLAY:none 但是不能进行字符串比对
    //使用indexOf("none")>0可以判定为隐藏效果
    var style = $("#replies_" + id).attr('style');
    var info = $("#click_" + id).text();
    //alert(style.indexOf("none")>0);
    if (style != undefined && (style == "display:none" || style.indexOf("none") > 0)) {
        //alert("aa");
        $("#replies_" + id).attr('style', '');
        $("#click_" + id).text('点击隐藏');
    } else {
        $("#replies_" + id).attr('style', 'display:none');
        $("#click_" + id).text('点击展开');
    }
}

function UserUnlogin() {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "logout" },
        function(data) {
            location.reload();
        });
}
function HightLightCurr() {
    var url = location.href;
    var type;
    if (url.indexOf("type=") > 0) {
        type = url.substring(url.lastIndexOf("type=") + 5, url.lastIndexOf("&id="));
        if (type == 1) {
            type = "recom";
        } if (type == 2) {
            type = "question";
        } if (type == 3) {
            type = "message";
        } if (type == 4) {
            type = "download";
        } if (type == 5) {
            type = "subscribe";
        } if (type == 6) {
            type = "publish";
        }

    } else {
        type = "recom";
    }
    var navs = $("a[id$='tab']");
   
    for (var i = 0 ; i < navs.length ; i++) {
        var item = $(navs[i]);        
        if (item.attr("id") == type+"tab" ) {
            item.attr('class', 'link1');
        } else {
            item.attr('class', 'link2');
        }
    }
}
function currentUserIsLogin() {
    var isLogin = false;
    $.ajax({
        type: "post",
        async: false,
        timeout: 5000,
        url: "/Handlers/Users/CheckUserLogin.ashx",
        dataType: "json",
        cache: false,
        success: function (result) {
            isLogin = result;
        },
        error: function () {
            return false;
        }
    });

    return isLogin;
}
function InitInfoPanel(data, page) {
    //初始化页码
    if (page == "" || page == undefined) {
        page = 1;
    }
    showTypeInfo(page, data);
}

// 显示首页的 查询分页等
function showTypeInfo(page,type) {
    var url = location.href;
    if (url.indexOf('#') > 0) {
        url = url.substring(0, url.lastIndexOf('#'));
    }
    var id;
    if (url.indexOf("id=") > 0) {
        id = url.substring(url.lastIndexOf("id=") + 3);
    } else if (url.indexOf("/u/") > 0) {
        id = url.substring(url.lastIndexOf("/u/") + 3);
    }
    else {
        id = url.substring(url.lastIndexOf("/U/") + 3);
    }
    location.href = "/UserCenter/Blog/Default.aspx?page=" + page + "&type="+type +"&id=" + id;
}

function ChangeInfo(d) {
    if (d == '1') {
        $("#attentionDiv").attr('style', '');
        $("#fansDiv").attr('style', 'display:none');
    }
    if (d == '2') {
        $("#attentionDiv").attr('style', 'display:none');
        $("#fansDiv").attr('style', '');
    }
}
function checkUserRealName() {
    //2-5位汉字，3-15位英文字母姓氏和名字可以用.隔开
    var name = $("#txtTrueName").val();
    var ENU = /^[\u4E00-\u9FA5]{2,5}$|^[a-zA-Z.]{3,15}$/;
    if (name == "") {
        $("#trueNameDiv").removeClass("success");
        $("#trueNameDiv").addClass("error");
        $("#trueNameError").attr("style", "display:inline");
        $("#trueNameError").text("用户名不能为空");
        return false;
    } else if (!ENU.test(name)) {
        $("#trueNameDiv").removeClass("success");
        $("#trueNameDiv").addClass("error");
        $("#trueNameError").attr("style", "display:inline");
        $("#trueNameError").text("请输入正确的用户名");
        return false;
    } else {
        $("#trueNameDiv").removeClass("error");
        $("#trueNameDiv").addClass("success");
        $("#trueNameError").attr("style", "display:none");
        $("#trueNameError").text("");
        return true;
    }

}
function checkCompanyNameOrRealName() {
    //公司名包含中英文字符和数字，3位以上
    var str = $("#txtCompanyName").val();
    var EUN = /^[\u4E00-\u9FA5]{2,5}$|^[a-zA-Z.]{3,15}$|[a-zA-Z0-9\u4E00-\u9FA5]{3,}/;
    if (str == "") {
        $("#companyNameDiv").removeClass("success");
        $("#companyNameDiv").addClass("error");
        $("#companyError").attr("style", "display:inline");
        $("#companyError").text("公司名称不能为空");
        return false;
    }
    if (!EUN.test(str)) {
        $("#companyNameDiv").removeClass("success");
        $("#companyNameDiv").addClass("error");
        $("#companyError").attr("style", "display:inline");
        $("#companyError").text("公司名称格式错误!例如：重庆慧都科技");
        return false;
    }
    else {
        $("#companyNameDiv").removeClass("error");
        $("#companyNameDiv").addClass("success");
        $("#companyError").attr("style", "display:none");
        $("#companyError").text("");
        return true;
    }
}
function Subscribe(d) {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "Subscribe", id: d },
        function (data) {
            if (data == "null") {
                showLogin();
            } else if ("Subscribed" == data) {
                alert("你已经订阅了该产品，请在个人用户中心查看");
            } else {
                ShowSubscribePanel(d);
            }
        });
}
function DeleteNotice(d) {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: 'DeleteNotice', id: d },
        function (data) {
            if (data == "True") {
                alert("删除成功");
            } else {
                alert("删除失败，请稍后重试");
            }
            location.reload();
        });
}

//回车提交登录框
document.onkeydown = function () {
    if (event.keyCode == "13") {
        doLogin();
    }
};
//add @10.28 解决导航高亮
$(function () {
    HightLightCurr();

    function ReplaceUrl() {
        var url = location.href;
        if (url.indexOf("UserCenter") > 0) {
            url = url.replace("UserCenter", "UserCenter");
            location.replace(url);
        }
    }

    //ReplaceUrl();
});


function Sign() {
    $.post("/UserCenter/DataHandlers/DataExchange.ashx",
        { action: "sign" },
        function (data) {
            if (data == "null") {
                showLogin();
            } else if (data == "True") {
                alert("签到成功");
                location.reload();
            } else {
                alert("签到失败，请稍后重试");
                location.reload();
            }
        });
}

function getUserState() {
    //-1未登录
    //0表示未认证的状态
    //1表示认证待审核
    //2表示认证用户未签到
    //3表示认证用户已签到
    var state = -1;
    $.ajax({
        type: "get",
        async: false,
        timeout: 10000,
        url: "/Handlers/Users/CheckHasCurrentUserSignIn.ashx",
        dataType: "json",
        cache: false,//缓存
        success: function (result) {
            state = result;
        },
        error: function () {
            state = -99;
        }
    });

    return state;
}

function getSignCount() {
    var signInCount = 0;
    $.ajax({
        type: "get",
        async: false,
        timeout: 10000,
        url: "/Handlers/Users/GetSignInCount.ashx",
        dataType: "json",
        cache: false,//缓存
        success: function (result) {
            signInCount = result;
        },
        error: function () {
            signInCount = 0;
        }
    });

    return signInCount;
}

function getCurrentUserSort() {
    var sort = 0;
    $.ajax({
        type: "get",
        async: false,
        timeout: 10000,
        url: "/Handlers/Users/GetCurrentUserSort.ashx",
        dataType: "json",
        cache: false,//缓存
        success: function (result) {
            sort = result;
        },
        error: function () {
            sort = 0;
        }
    });

    return sort;
}


function loadSignInPanel() {
//    var state = getUserState();
//    if (state == -99) {
//        return;
//    }

//    var signInCount = 0;
//    if (state == 3) {
//        signInCount = getSignCount();
//    }

//    var sort = 0;
//    if (state >= 2) {
//        sort = getCurrentUserSort();
//    }

//    var content = "<script type=\"text/javascript\" src=\"/scripts/kefu.js\"></script>\
//<div class=\"qiandao clear\" id=\"floatTools\">\
//    <div class=\"qdbtn\">\
//        <a id=\"aFloatTools_Show\" class=\"btnopen\"\
//            title=\"签到\"\
//            onclick=\"javascript:$('#divFloatToolsView').animate({width: 'show', opacity: 'show'}, 'normal',function(){ $('#divFloatToolsView').show();kf_setCookie('RightFloatShown', 0, '', '/', 'www.evget.com'); });$('#aFloatTools_Show').attr('style','display:none');$('#aFloatTools_Hide').attr('style','display:block');\"\
//            href=\"javascript:void(0);\"></a><a style=\"DISPLAY: none\" id=\"aFloatTools_Hide\" class=\"btnclose\"\
//                title=\"签到\"\
//                onclick=\"javascript:$('#divFloatToolsView').animate({width: 'hide', opacity: 'hide'}, 'normal',function(){ $('#divFloatToolsView').hide();kf_setCookie('RightFloatShown', 1, '', '/', 'www.evget.com'); });$('#aFloatTools_Show').attr('style','display:block');$('#aFloatTools_Hide').attr('style','display:none');\"\
//                href=\"javascript:void(0);\"></a>\
//    </div>\
//    <div class=\"cons\" id=\"divFloatToolsView\" style=\"display: none;\">\
//        <div class='top text-center'>\
//        <div id='sign' " + (state == 3 ? "style=\"display:none\"" : "") + ">\
//            <p class='line32 fontYH white pT10' style='font-size: 28px;'><a href='javascript:;' onclick='" + (state == -1 ? "showLogin();" : (state == 2 ? "Sign();" : (state == 0 ? "Authentication();" : "alert(\"请等待审核通过之后再试\");"))) + "'>签到</a></p>\
//            <p class='line20 fontYH white font18 mT10'>送汉化资源</p>\
//        </div>\
//        <div id='signed' " + (state != 3 ? "style=\"display:none\"" : "") + ">\
//            <p class='line32 fontYH white pT10' style='font-size: 28px;'>今日已签</p>\
//            <p class='line20 fontYH white font18 mT10'>已连续签到<span class='yellow'>" + signInCount + "</span>天</p>\
//         </div>\
//    </div>\
//    <div class='bottom text-center'>\
//        <p id='NonAuthenticationEd' class='pT10 font16 fontYH'  " + (state != 0 && state != -1 ? "style=\"display:none\"" : "") + "><a href='javascript:;' onclick='Authentication();'>立即申请认证用户</a></p>\
//        <p id='AuthenticationEd' class='pT10 w92auto yellow line18' " + (state < 2 ? "style=\"display:none\"" : "") + ">\
//            你已领先" + (sort) + "%的<br>连续签到用户\
//        </p>\
//        <p id='Authenticationing' class='pT10 w92auto yellow line18' " + (state != 1 ? "style=\"display:none\"" : "") + ">\
//            认证审核中<br>\
//            请稍后再来签到\
//        </p>\
//        <hr>\
//        <ul class='w95auto mT10 line18'>\
//            <li>认证用户才能参与活动</li>\
//            <li>连续签到15天送汉化</li>\
//            <li>汉化资源请查看详情</li>\
//        </ul>\
//        <a href='http://www.evget.com/article/2013/11/18/20070.html' class='btn mT10 btn-warning'>查看活动详情</a>\
//    </div>";

//    $("#right_center_ad_panel").empty().append($(content));
}


//修改企业基本信息 

function ChangeEnterpriseinfo(EnterpriseId, tel, CompanyName, Address, HomePage, description, Country, EEmail) {
    checkFlag = true;
    checkTel(tel);
    checkCompanyName(CompanyName);
    checkAddress(Address);

    if (count != 0) return false;
    if (checkFlag) {
        count++;

        $.post("/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
            {
                EnterpriseId: EnterpriseId, CompanyName: CompanyName, Tel: tel, Address: Address, HomePage: HomePage, Description: description, Country: Country, EEmail: EEmail,
                action: "ChangeEnterpriseinfo_Post"
            },
            (
                function (data) {
                    if (data == "True") {
                        alert("修改成功！");
                        location.reload();
                    } else {
                        alert("修改失败，请稍后重试！");
                        location.reload();
                    }
                }
            ));
    }
    return false;
}

//设置企业用户
function SetEnterpriseUser(UserId, EnterpriseId, userName, emial, pwd) {
    if (EnterpriseId == "" || EnterpriseId == undefined) { return false; }

    $.post("/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
           {
               UserId: UserId, EnterpriseId: EnterpriseId, userName: userName, email: emial, pwd: pwd, action: "SetEnterpriseUser"
           },
           (
                function (data) {
                    if (data == "success") {
                        alert("邀请邮件发送成功，请等待对方确认！");
                        location.reload();
                    } else {
                        alert(data);
                        location.reload();
                    }
                }
           ));
}

//设置企业管理员
function SetEnterpriseAdministrator(UsernameOrEmail, EnterpriseId) {
    if (EnterpriseId == "" || EnterpriseId == undefined) { return false; }
    if (count != 0) return false;
    count++;
    $.post("/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
           {
               EnterpriseId: EnterpriseId, UsernameOrEmail: UsernameOrEmail, action: "SetEnterpriseAdministrator"
           },
           (
               function (data) {
                   if (data == "success") {
                       alert("邀请邮件发送成功，请等待对方确认！");
                       location.reload();
                   } else {
                       alert(data);
                       location.reload();
                   }
               }
           ));
}
// 踢出企业管理员
function DeleteEnterpriseAdministrator(Id, EnterpriseId) {
    if (EnterpriseId == "" || EnterpriseId == undefined) { return false; }
    if (count != 0) return false;
    if (confirm("确定要踢出企业管理员么？")) {
        count++;
        $.post("/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
               {
                   EnterpriseId: EnterpriseId, Id: Id, action: "DeleteEnterpriseAdministrator"
               },
               (
                    function (data) {
                        if (data == "True") {
                            alert("踢出成功！");
                            location.reload();
                        } else {
                            alert("踢出失败，请稍后重试！");
                            location.reload();
                        }
                    }
               ));
    }
}

function SetenterpriseUserPower(userId, enterpriseid, username, powerid) {

    $.post("/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
        { action: "SetEnterpriseUserPower", enterpriseid: enterpriseid, username: username, powerid: powerid, userId: userId },
        function(data) {
            if (data == "True") {
                alert("授权成功");
                window.close();
            } else {
                alert("授权失败，请稍后重试！");
                window.close();
            }
        });
}


function UserSignUp() {
    $.post("/UserCenter/Catalog/DataExchange.ashx",
            { t: "Logout_Post" },
            (
            function (data) {
                if (data == "success") {
                    location.reload(); //刷新导航页面
                } else {
                    alert(data);
                }
            }
   ));
}

function GotoUserHome1() {
    $.post("/UserCenter/WebHandlers/UserControlHandler.ashx", { t: "get-name" },
                   function (d) {
                       if (d) {
                           window.location.href = '/u/' + d;
                       } else {
                           window.location.href = '/';
                       }
                   }
               );
}

function redirectToLogin(returnUrl) {
    //此处导致退出跳转处问题
    location.href = "/UserCenter/Passport/UserLogin.aspx?url=" + returnUrl;
}

function currentUserIsLogin() {
    var isLogin = false;
    $.ajax({
        type: "post",
        async: false,
        timeout: 5000,
        url: "/Handlers/Users/CheckUserLogin.ashx",
        dataType: "json",
        cache: false,
        success: function (result) {
            isLogin = result;
        },
        error: function () {
            return false;
        }
    });

    return isLogin;
}

function getCurrentUser() {
    var user = null;
    $.ajax({
        type: "post",
        async: false,
        timeout: 5000,
        url: "/Handlers/Users/GetCurrentUser.ashx",
        dataType: "json",
        cache: false,
        success: function (result) {
            user = result;
        },
        error: function () {
            return null;
        }
    });

    return user;
}

/*--userinfo end--*/


function CheckEnterpriseEmail(email) {

    var REG = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (email == undefined || email.trim() == "") {
        $("#EEmailDiv").removeClass("success");
        $("#EEmailDiv").addClass("error");
        $("#EEmailError").attr("style", "display:inline");
        $("#EEmailError").text("邮箱地址不能为空");
        checkFlag = false;
        return false;
    }
    if (!REG.test(email)) {
        $("#EEmailDiv").removeClass("success");
        $("#EEmailDiv").addClass("error");
        $("#EEmailError").attr("style", "display:inline");
        $("#EEmailError").text("邮箱地址格式不正确");
        checkFlag = false;
        return false;
    } else {
        $.ajax({
            type: "POST",
            async: false,
            url: "/UserCenter/DataHandlers/EnterpriseDataHandler.ashx",
            data: { action: "CheckEnterpriseEmail", email: email }
        }).done(function (data) {

            if (data != 'True') {
                $("#EEmailDiv").removeClass("success");
                $("#EEmailDiv").addClass("error");
                $("#EEmailError").attr("style", "display:inline");
                $("#EEmailError").text("填写的邮箱地址已被使用");
                checkFlag = false;
                return false;
            } else {
                $("#EEmailDiv").removeClass("error");
                $("#EEmailDiv").addClass("success");
                $("#EEmailError").attr("style", "display:none");
                $("#EEmailError").text("");
                return true;
            }
        });

    }
    return true;
}

//用户中心收藏tab切换效果
function favoriteChange(i) {
    $("#favoriteUl").children("li:eq(" + i + ")").addClass("active");
}
//取消课程收藏
function cancelAttentionCourse(courseId) {
    $.ajax({
        type: "post",
        async: false,
        timeout: 10000,
        url: "/Handlers/Users/DeleteCollectCourses.ashx",
        dataType: "json",
        data: { cid: courseId },
        cache: false,//缓存
        success: function (result) {
            if (!result) {
                alert("请求错误！");
                return;
            }
            if (result.success) {
                location.reload();
                return;
            }

            alert(result.message);
        },
        error: function () {

        }
    });
}
function saveAttentionCourse(courseId) {
    $.ajax({
        type: "post",
        async: false,
        timeout: 10000,
        url: "/Handlers/Users/SaveCollectCourses.ashx",
        dataType: "json",
        data: { cid: courseId },
        cache: false,//缓存
        success: function (result) {
            if (!result) {
                alert("请求错误！");
                return;
            }
            if (result.success) {
                location.reload();
                return;
            }
            alert(result.message);
        },
        error: function () {
        }
    });
}
