/// <reference path="jquery-vsdoc.js" />


// 获取DOM元素
function getE(id) {
    return document.getElementById(id);
}


// 滚动至底端
function goBottom() {
    //window.scrollTo(0, document.body.scrollHeight);
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
    $body.animate({ scrollTop: $('#bottom').offset().top }, 1000);

}

// 滚动至顶端
function goTop() {
    // window.scrollTo(0,0);
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
    $body.animate({ scrollTop: $('#top').offset().top }, 1000);

}


// 刷新左栏
function reloadLeftFrame() {
    window.parent.frames['leftFrame'].location.reload();
}


// 复制到内存
function copyToMemory(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("您的firefox安全限制限制您进行剪贴板操作，请在新窗口的地址栏里输入'about:config'然后找到'signed.applets.codebase_principal_support'设置为true'");
            return false;
        }
        var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
    }
}



// 打开对话框(IE/FF)
function openDialog(url, width, height) {
    if (width == null) width = screen.availWidth - 50;
    if (height == null) height = screen.availHeight - 50;
    var dialogLeft = (screen.availWidth - width) / 2;
    var dialogTop = (screen.availHeight - height) / 2;
    var ch = "?";
    if (url.indexOf("?") >= 0) ch = "&";
    var randStr = Math.random().toString().replace(/\./, "");
    var returnValue = window.showModalDialog(url + ch + "tmp=" + randStr, window, "dialogWidth:" + width + "px; dialogHeight:" + height + "px; dialogLeft:" + dialogLeft + "px; dialogTop:" + dialogTop + "px; center:yes; resizable:no; scroll:yes; status:no; help:no");
    return returnValue;
}

// 打开窗口
function openWindow(url, width, height) {
    if (width == null) width = screen.availWidth - 50;
    if (height == null) height = screen.availHeight - 50;
    var left = (screen.availWidth - width) / 2;
    var top = (screen.availHeight - height) / 2;
    return window.open(url, 'myWindow', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',scrollbars=1,status=0,resizable=yes,titlebar=0');
}


// 在打开的对话框或窗体中刷新父页面
function reloadParent() {
    if (document.all) {
        if (window.dialogArguments) {
            window.dialogArguments.location = window.dialogArguments.location;
        }
        else {
            window.opener.location.reload();
        }
    }
    else {
        window.opener.location.reload();
    }
}


/************ AJAX  操作 ********/
function getXMLHttpRequest() {
    var request = false;
    try {
        request = new XMLHttpRequest();
    } catch (trymicrosoft) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = false;
            }
        }
    }
    return request;
}


function getServerMessage(pageUrl, id) {
    var ch = "?";
    if (pageUrl.indexOf("?") >= 0) ch = "&";
    var xmlhttp = getXMLHttpRequest();
    if (!xmlhttp) return;
    var randStr = Math.random().toString().replace(/\./, "");
    xmlhttp.open("GET", "" + pageUrl + ch + "tmp=" + randStr, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById(id).innerHTML = xmlhttp.responseText;
            parseScript(xmlhttp.responseText);
        }
    };
    xmlhttp.send(null);
}


function getServerMessageWithLoop(pageUrl, id, interval) {
    var ch = "?";
    if (pageUrl.indexOf("?") >= 0) ch = "&";
    var xmlhttp = getXMLHttpRequest();
    if (!xmlhttp) return;
    var randStr = Math.random().toString().replace(/\./, "");
    xmlhttp.open("GET", "" + pageUrl + ch + "tmp=" + randStr, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById(id).innerHTML = xmlhttp.responseText;
            parseScript(xmlhttp.responseText);
            setTimeout("getServerMessageWithLoop('" + pageUrl + "','" + id + "'," + interval + ")", interval);
        }
    };
    xmlhttp.send(null);
}


// 分离并执行所有JS脚本
function parseScript(responseText) {
    var reg = /<script[^>]+\bsrc\s*=\s*(([\"][^\"]+[\"])|([\'][^\']+[\'])|([^\'\"\s]\S*))[^>]*>/ig;
    var arr = [];
    responseText.replace(reg, function(a, b) { return arr.push(b) });

    for (var i = 0; i < arr.length; i++) {
        try {
            loadJS(arr[i].replace(/(^\'*)|(\'*$)/g, "").replace(/(^\"*)|(\"*$)/g, ""))
        }
        catch (e) { }
    }

    reg = /<script[^>]*>((.|\n|\r)*?)<\/script>/ig;
    arr = [];
    responseText.replace(reg, function(a, b) { return arr.push(b) });

    for (var i = 0; i < arr.length; i++) {
        try {
            if (!!(window.attachEvent && !window.opera)) {
                window.execScript(arr[i]);
            }
            else if (navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1) {
                window.eval(arr[i]);
            }
            else {
                eval(arr[i]);
            }
        }
        catch (e) { }
    }
}

// 载入JS
function loadJS(fileUrl) {
    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = fileUrl;
    head.appendChild(script);
}

// 载入CSS
function loadCSS(fileUrl) {
    var head = document.getElementsByTagName('HEAD')[0];
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = fileUrl;
    head.appendChild(style);
}


// 加入收藏
// addFavorite(document.title,window.location)
function addFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("加入收藏失败,请手动添加.");
        }
    }
}



// 设为首页
function setHomePage(url) {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(window.location.href);
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config ,然后将项 signed.applets.codebase_principal_support 值该为true");
                history.go(-1);
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', window.location.href);
    }
}




/* 获取URL查询参数值 */
/* example:
$.yulinGetUrlParam("category");  // 获取本页的URL参数
$.yulinGetUrlParam("category",parent);  获取父窗口的URL参数
$.yulinGetUrlParem("category",window.dialogArguments); 
*/
function getUrlParam(paramName, win) {
    var queryString = "";
    if (win) queryString = win.document.location.search;
    else queryString = document.location.search;
    if (queryString != null && queryString != '') {
        var field = paramName + "=";
        var index = queryString.indexOf(field);
        if (index != -1) {
            var paramValue = queryString.substring(index + field.length);
            index = paramValue.indexOf('&');
            if (index != -1) {
                return paramValue.substring(0, index);
            }
            else {
                return paramValue;
            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}
