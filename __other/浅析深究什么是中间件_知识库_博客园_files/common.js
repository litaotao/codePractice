$.ajaxSetup({
    type: 'post',
    dataType: 'json',
    contentType: 'application/json; charset=utf8'
});

function getHostPostfix() {
    var hostname = location.hostname;
    hostname = hostname.substring(hostname.lastIndexOf("."), hostname.length);
    return hostname;
}

function cnblogs$(id) { return document.getElementById(id); }

function questioin_enter(event) {
    if (event.keyCode == 13) {
        doQuestion();
        return false;
    }
}

function movepic(img_name, img_src) {
    document[img_name].src = img_src;
}


function doQuestion() {
    /*var question = document.getElementById("question").value;*/
    window.open("http://space.cnblogs.com/question/publish.aspx");
}
function zzk_go(id) {

    var keystr = encodeURIComponent(document.getElementById(id).value);

    window.open("http://zzk.cnblogs.com/s?w=" + keystr);
}
function zzk_go_enter(event, id) {
    if (event.keyCode == 13) {
        zzk_go(id);
        return false;
    }
}

function setTab(name, cursel, n) {
    var executionTimer;
    if (executionTimer) {
        clearTimeout(executionTimer);
    }
    executionTimer = window.setTimeout("Switch('" + name + "','" + cursel + "','" + n + "')", 180);
}

function Switch(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "current" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}

function login() {
    location.href = "http://passport.cnblogs.com/login.aspx?ReturnUrl=" + location.href;
    return false;
}
function register() {
    location.href = "http://passport.cnblogs.com/register.aspx?ReturnUrl=" + location.href;
    return false;
}
function logout() {
    location.href = "http://passport.cnblogs.com/logout.aspx?ReturnUrl=" + location.href;
    return false;
}

function GetUserInfo() {
    var prefixUrl = 'http://passport.cnblogs' + getHostPostfix();
    $.ajax({
        url: prefixUrl + '/user/LoginInfo',
        dataType: 'jsonp',
        success: function (data) {
            $("#login_area").html(data);
            var spacerUserId = parseInt($("#current_spaceId").html());
            if (spacerUserId > 0) {
                $.ajax({
                    url: prefixUrl + '/user/NewMsgCount',
                    data: 'spaceUserId=' + spacerUserId,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data) {
                            $("#msg_count").html('(' + data + ')').show();
                        }
                    }
                });
            }
        }
    }); 
}

function google_search() {
    location.href = "http://zzk.cnblogs.com/s?t=k&w=" + encodeURIComponent(document.getElementById('google_search_q').value);
    return false;
}
function google_search_enter(event) {
    if (event.keyCode == 13) {
        google_search();
        return false;
    }
}


$(function () {
    GetUserInfo();
});


