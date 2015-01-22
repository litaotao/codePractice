var DoCookies = DoCookies || 0; //是否执行js代码
var mydomain = /www\.search[a-z]*\.com\.cn/;
var curhost = location.host.toLowerCase();
var isRightSite = mydomain.test(curhost) || curhost == "www.techtarget.com.cn"; //判断是否是search开头的站点
var tt_script_config = tt_script_config || [];
var tt_sv_host = "http://img.techtarget.com.cn";
//动态加载css文件
function loadCss(url) {
    if (url.indexOf("$") == 0) url = url.replace(/\$(.*)/, tt_sv_host + "/template/css/$1");
    if ($("link[href='" + url + "']").size() > 0) return;
    var css = document.createElement("link");
    css.setAttribute("type", "text/css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(css);
}
//动态加载js文件
function loadScript(url, callback) {
    if (typeof url == "function") return;
    url = url.replace(/\$(.*)/, tt_sv_host + "/template/js/$1");
    callback = callback || function () { };
    if (typeof callback != "function") {
        var urls = url.split('/');
        var dataParam = callback;
        callback = function () { eval(urls[urls.length - 1].replace(".js?", "_") + '(dataParam);'); };
    }
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = url;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    var ieLoadBugFix = function (scriptElement, callback) {
        if (scriptElement.readyState == 'loaded' || scriptElement.readyState == 'complete') {
            callback();
        } else {
            setTimeout(function () { ieLoadBugFix(scriptElement, callback); }, 100);
        }
    }
    if (typeof ga.addEventListener !== "undefined")
        ga.onload = callback;
    else { ieLoadBugFix(ga, callback); }
}

function beginEverything() {
    if (DoCookies == 0) {
        //读写cookie
        OperatingCookies();
        var exceptions = /proxy.html|port.aspx|\/tar\/|\/default.aspx|\/default.htm/;
        if (!isRightSite || exceptions.test(location.pathname.toLowerCase())) return;
        if ((curhost=="www.searchbi.com.cn"||QueryString("device")=="mobi")&&location.pathname.indexOf("/201")<0) {
            loadScript("$ismobile.js?LoadMobi",true);
        }
        if (location.pathname.toLowerCase() == "/search.aspx") loadScript("$search.js");
        $(document).ready(function () {
            //标记已执行，防止异步重复执行
            DoCookies = 1;
            //登录状态
            GetLogin();
            //replace sina share and add qrcode share
            if ($("#bdshare").size() > 0) loadScript("$share.js");
            //add track code(ga/bd/tt)
            loadScript("$track.js");
            /*采用append方式输出右侧浮动广告 */
            GetConfig();
            //deal with other things on pages
            OtherThings();
            /*底部半透明浮动层广告位*/
            CheckPalyBottomAD();
        });
    }
}
//操作cookies
function OperatingCookies() {
    /*Jquery.cookie.js开始*/
    /*!
    * jQuery Cookie Plugin v1.3.1
    * https://github.com/carhartl/jquery-cookie
    *
    * Copyright 2013 Klaus Hartl
    * Released under the MIT license
    */
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as anonymous module.
            define(['jquery'], factory);
        } else {
            // Browser globals.
            factory(jQuery);
        }
    } (function ($) {

        var pluses = /\+/g;

        function raw(s) {
            return s;
        }

        function decoded(s) {
            try { return decodeURIComponent(s.replace(pluses, ' ')); } catch (ex) { return s; }
        }

        function converted(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                return config.json ? JSON.parse(s) : s;
            } catch (er) { }
        }

        var config = $.cookie = function (key, value, options) {

            // write
            if (value !== undefined) {
                options = $.extend({}, config.defaults, options);

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }

                value = config.json ? JSON.stringify(value) : String(value);

                return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
            }

            // read
            var decode = config.raw ? raw : decoded;
            var cookies = document.cookie.split('; ');
            var result = key ? undefined : {};
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = decode(parts.join('='));

                if (key && key === name) {
                    result = converted(cookie);
                    break;
                }

                if (!key) {
                    result[name] = converted(cookie);
                }
            }

            return result;
        };

        config.defaults = {};

        $.removeCookie = function (key, options) {
            if ($.cookie(key) !== undefined) {
                // Must not alter options, thus extending a fresh object...
                $.cookie(key, '', $.extend({}, options, { expires: -1 }));
                return true;
            }
            return false;
        };

    }));
    /*Jquery.cookie.js结束*/
}

//获取登录状态
function GetLogin(absolute) {
    isRightSite = isRightSite && document.body && document.body.children.length > 0;
    if (absolute) isRightSite = true;
    if (!isRightSite) return;

    if ($("iframe#ifm_plun[params]").size() > 0) { //对评论的统一处理
        $("iframe#ifm_plun[params]").each(function () {
            $(this).attr("src", tt_sv_host + "/common/commentpost.html?" + $(this).attr("params") + "&pagepath=" + encodeURIComponent(location.href) + "&title=" + encodeURIComponent(document.title));
            $(this).removeAttr("params");
        });
    }
    loadCss("$logintab.css");
    if ($("ul.login a[title='登录']").size() > 0 || !$.cookie("TechTarget")) {
        try { $.removeCookie("ActivationState", { path: "/" }); } catch (e) { }
        $("ul.login a[title='登录']").removeAttr("href").css({ cursor: "pointer" }).click(showLogin);
        if (!$.cookie("LoginState") || absolute)
            $.ajax({
                url: tt_sv_host + "/member/getuser.ashx?" + new Date().getTime(),
                type: "GET",
                dataType: "jsonp",
                success: function (response) {
                    if (response) {
                        var res = eval("(" + response + ")");
                        $.cookie("LoginState", res.islogin, { path: "/" });
                        if (res.islogin) {
                            if (res.industry <= 0) $.cookie("tt_info", "yes", { path: "/" });
                            var durl = "/common/port.aspx?deal=10&uid=";
                            $("body").append("<iframe width='0' height='0' frameborder='0' src='" + durl + res.uid + "&uname=" + res.uname + "&code=" + res.code + "&t=" + res.t + "&page=" + encodeURIComponent(location.href) + "'></iframe>")
                        }
                        else if (res.tt_ut && res.tt_ud && !$.cookie("tt_ut") && !$.cookie("tt_ud")) {
                            $.cookie("tt_ut", res.tt_ut, { path: "/" });
                            $.cookie("tt_ud", res.tt_ud, { path: "/" });
                            document.reload();
                        }
                    }
                },
                error: function (a, b) { //alert(b);
                }
            });
    }
    else {
        var infomenu = $("<ul style='display:none;'><li cmd='cpwd'>修改密码</li><li cmd='cemail'>更改邮箱</li><li cmd='cinfo'>更新资料</li></ul>");
        //infomenu.css({ position: "absolute", display: "none" });
        infomenu.find("li").click(function () {
            document.location.href = '/member/editinfo.htm?cmd=' + $(this).attr("cmd");
        });
        $("ul.login a[title='资料修改']").parent().append(infomenu).hover(function () {
            infomenu.slideDown();
        }, function () { infomenu.slideUp(); });
        CheckActivation();
    }
}
//从全局角度处理页面上的某些细节
function OtherThings() {
    $("#main .rightadlast .lastadpic").css({ background: "none" });
    //fix the search keydown event
    if ($("#q").size() > 0) {
        document.getElementById("q").onkeydown = function (event) { KeyDownSearch(event, 'q'); };
    }
    //关闭浮动层广告
    try { $("div.offbtn a").live("click", function () { CloseAD(); }); } catch (e) { }
    //hide the imgs that can't be seen
    $("img.pvstat").css({ display: "none" });
    if (QueryString("uid") && QueryString("info")) {//open file for fastpass
        var downBtn = $("a[title='下载']:eq(0),a.red[href*='download']:eq(0)");
        if (downBtn.size() > 0) {
            var url = downBtn.attr("href");
            if (url.indexOf("&border=green") < 0) url += "&TB_iframe=1&allowOpen=true&border=green&width=800&height=500";
            tb_show(document.title, url, false);
        }
    }
    for (var i in tt_script_config) { loadScript(tt_script_config[i].url || tt_script_config[i], tt_script_config[i].data); }
}

//控制浮动层广告的投放
function GetConfig() {
    if (!isRightSite) return;
    var pagename = window.location.pathname.toLowerCase(); //获取虚拟路径
    //过滤后缀
    pagename = pagename.substring(1, pagename.lastIndexOf('.')); //去除前面的/及后缀

    var sitename = window.location.hostname.toLowerCase();
    sitename = sitename.replace("www.search", "").replace(".com.cn", "");

    //false时指浏览器没有开启Cookie功能
    if (navigator.cookieEnabled == true) {
        $.ajax({
            type: "get",            //发送请求的方式
            url: tt_sv_host + "/common/ajax.ashx", //XML文件相对路径
            data: { random: new Date().getTime() },
            dataType: "jsonp",
            timeout: 1000,           //超时设置，单位为毫秒 
            //jsonp: "callback", 
            //complete: function () { alert("完成请求") }, //AJAX请求完成时隐藏loading提示
            error: function (XMLHttpRequest, textStatus, errorThrown) {    //解析XML文件错误时的处理
                //alert("加载xml错误" + XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                //alert(textStatus);
            },
            success: function (data) {
                //var val = $(data).find("site[id=14]").text();
                $(data).find("site[id='" + sitename + "']").each(function () {
                    var v_open = $(this).find("open").text();   //获取子节点open的值
                    var v_url = $(this).find("url").text();     //获取子节点url的值
                    var v_repeat = $(this).find("RepeatPlay").text();  //是否重复播放(1重复投放/2关闭后不投/3仅投放一次)
                    if (v_open == "1") {
                        //页面设置条件
                        if (v_url == "all" || isADPage(pagename, v_url)) {
                            //是否重复投放(cookie:PlayerAD不为空表示请求过关闭操作)
                            var CookieValue = $.cookie("PlayerAD");
                            if (v_repeat == "1") {
                                //alert("执行投放");
                                loadScript("/tar/ad.js");
                                if (CookieValue != null) $.cookie("PlayerAD", null);
                            }
                            else if (v_repeat == "2" && CookieValue == null) {
                                loadScript("/tar/ad.js");
                            }
                            else if (v_repeat == "3" && CookieValue != "One") {
                                loadScript("/tar/ad.js");
                                $.cookie("PlayerAD", "One");
                            }
                        }
                    }
                });
            }
        });

    }
}

//判断是否需投放广告的页面
//pagename为当前页面weburl
//url为定义好投放广告的页面 格式：index,software/,guide
function isADPage(pagename, url) {
    if (pagename == null || pagename == "") {
        pagename = window.location.pathname.toLowerCase(); //获取虚拟路径
        pagename = ".cn" + pagename.substring(0, pagename.lastIndexOf('.')); //过滤后缀
    }
    if (pagename == "/") pagename = ".cn/index";
    var arry = url.split(",");
    for (var i = 0; i < arry.length; i++) {
        if (pagename.indexOf(arry[i]) > -1) return true;
    }
    return false;
}
//关闭右侧浮动广告层
function CloseAD() {
    var titWidth = $("#RightAD").width();
    $("#RightAD").animate({ width: titWidth - 50 }, 1000, function () {
        $("#RightAD").hide();
    });
    //记录cookie,用于下次是否再次呈现广告
    $.cookie("PlayerAD", "Close");
}
//右侧浮动广告层-结束

//下拉滚动条右侧显示浮动层小图标回到顶部
//$(function () {
//    $(window).scroll(function () {
//        var topvlaue = $(window).scrollTop(); //document.documentElement.scrollTop;
//        var distanceTop = 200;
//        if (topvlaue > distanceTop) {
//            $('.scrolltop').css('display', 'block');
//        }
//        else {
//            $('.scrolltop').css('display', 'none');
//        }
//    });
//});


//js接收地址栏统计代码
function QueryFooter(item) {
    var value = "";
    var temp = window.location.href;
    if (temp.indexOf(item) > -1)
        value = temp.substr(temp.indexOf(item) + 1);

    if (value == "") value = QueryString("info");
    if (value == "") value = document.referrer;
    return value;
}

//js接收地址栏参数
//var Url = window.location.href;
//var value = Url.getQuery();
String.prototype.getQuery = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = this.substr(this.indexOf("\?") + 1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//js接收地址栏参数
function QueryString(item) {
    var sValue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"))
    return sValue ? sValue[1] : sValue
}

function gid(id) {
    return document.getElementById ? document.getElementById(id) : null;
}
function gname(name) {
    return document.getElementsByTagName ? document.getElementsByTagName(name) : new Array()
}
function SetObjContent(objID, content) {
    if (gid(objID)) gid(objID).innerHTML = content;
}
function GetObjContent(objID) {
    return gid(objID).innerHTML;
}
function Clear(objname) {
    if (gid(objname)) {
        gid(objname).className = "";
        gid(objname).innerHTML = "";
    }
}
function ClearObjContent(objID) {
    if (gid(objID)) SetObjContent(objID, "");
}
function SetObjStyleName(objID, sname) {
    if (gid(objID)) gid(objID).className = sname;
}
function HideObj(objID) {
    if (gid(objID).style.display != "none") {
        gid(objID).style.display = "none";
    }
}
function ShowObj(objID) {
    if (gid(objID).style.display != "block") {
        gid(objID).style.display = "block";
    }
}
//改变当前显示状态
function ShowHideObj(objID) {
    if (!gid(objID)) return;
    if (gid(objID).style.display == "none") {
        gid(objID).style.display = "block";
    }
    else {
        gid(objID).style.display = "none";
    }
}

//取当前时间，格式为,yyyy-mm-dd hh:mm:ss
function GetDateT() {
    var d, s;
    d = new Date();
    s = d.getYear() + "-";             //取年份
    s = s + (d.getMonth() + 1) + "-"; //取月份
    s += d.getDate() + " ";         //取日期
    s += d.getHours() + ":";       //取小时
    s += d.getMinutes() + ":";    //取分
    s += d.getSeconds();         //取秒
    return (s);
}

function enterkey(m) { if (event.keyCode == 13) { eval(m); } }

//添加收藏夹
function addfavorite(Furl, Fstr) {
    if (document.all) {
        window.external.addFavorite(Furl, Fstr);
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(Fstr, Furl, "");
    }
}
//获取客户端浏览器
function Browser() {
    var ua, s;
    this.isIE = false;
    this.isNS = false;
    this.isOP = false;
    this.isSF = false;
    this.isFF = false;
    ua = navigator.userAgent.toLowerCase();
    s = "opera";
    this.isOP = ua.indexOf(s) != -1;
    s = "msie";
    this.isIE = ua.indexOf(s) != -1;
    s = "netscape";
    this.isNS = ua.indexOf(s) != -1;
    s = "gecko";
    this.isNS = ua.indexOf(s) != -1;
    s = "safari";
    this.isSF = ua.indexOf(s) != -1;
    s = "firefox"
    this.isFF = ua.indexOf(s) != -1;
}


//调用图片
function writeImgUrl() {
    var Img = document.getElementsByTagName("img");
    var countImg = Img.length;
    for (var i = 0; i < countImg; i++) {
        //alert(Img[i].src.split('/')[3]);
        if (Img[i].src.split('/')[3] == 'upload')
        //alert(Img[i].src.split('/')[2]);
        {
            Img[i].src = Img[i].src.replace(Img[i].src.split('/')[2], 'www.techtarget.com.cn');
        }
    }
}

//打印函数，传进 要打印块的ID
function CatePrint(divID) {
    if (window.print) {
        var Div1 = gid(divID).innerHTML;
        var css = '<style type="text/css" media=all>' +
        'p { line-height: 120%}' +
        '.ftitle { line-height: 100%; font-size: 18px; color: #000000}' +
        'td { font-size: 10px; color: #000000}' +
        '</style>';

        var body = '<div style="line-height:20px">　</div><table width="640" border="0" cellspacing="0" cellpadding="2">' +
        ' <tr> ' +
        ' <td class="fbody"> ' +
        ' <div class=ftitle>' + Div1 + '</div>' +
        ' </td>' +
        ' </tr>' +
        '</table>';

        document.body.innerHTML = css + body;
        window.print();
        window.history.go(0);
    }
}
//改变字体大小
function setFontsize(_size, _this) {
    //var _now;
    //if (_now !== null) { $(_now).css({ 'background-color': '#fff' }) }
    $('#maintext,#maintext span,#maintext p span,#maintext p em, #maintext ul li span,#maintext p,.Title_blue,#maintext h6, #maintext p a,#maintext a font, #maintext ul li,#maintext ol li, #maintext strong').css('font-size', _size);
    $('.Copyright').css('font-size', '12px')
    var arry = new Array("#font16", "#font14", "#font12");
    for (var i = 0; i < arry.length; i++) {
        if (_this == arry[i])
            $(arry[i]).css({ 'background-color': '#d3d3d3' })
        else
            $(arry[i]).css({ 'background-color': '#fff' })
    }
    //_now = $(_this)
}
//改变字体大小
function SetFont(obj, si) {
    gid(obj).style.fontSize = si;
}
function SetFont(obj, si, myobj) {
    gid(obj).style.fontSize = si;

    if (myobj == "font16") {
        SetObjStyleName("font16", "font16Bg");
        SetObjStyleName("font14", "font14");
        SetObjStyleName("font12", "font12");
    }
    else if (myobj == "font14") {
        SetObjStyleName("font16", "font16");
        SetObjStyleName("font14", "font14Bg");
        SetObjStyleName("font12", "font12");
    }
    else if (myobj == "font12") {
        SetObjStyleName("font16", "font16");
        SetObjStyleName("font14", "font14");
        SetObjStyleName("font12", "font12Bg");
    }
}

//站内搜索回车提交
function KeyDownSearch(event, objName) {
    if (event.keyCode == 13) {
        return CheckSearch(objName);
        //CheckSearch("header_q");
    }
}
//站内搜索关键字检查
function CheckSearch(objName) {
    var obj = gid(objName);
    if (obj.value == null || obj.value == "" || obj.value == "请输入关键字") {
        alert("请输入搜索关键字");
        gid(objName).focus();
        gid(objName).value = "";
        return false;
    }
    else {
        window.location.replace("/search.aspx?q=" + encodeURI(obj.value));
        return true;
    }
}
//将str(xml格式)转换为jquery对象,tag为选择器,兼容IE
function toxmlObj(str, tag) {
    var items = $(str);
    if ((-[1, ])) items = tag ? items.find(tag) : items;
    else {
        var xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = false;
        xml.loadXML(str);
        items = tag ? $(xml).find(tag) : $(xml);
    }
    return items;
}
//弹出完善信息框
function completeInfo() {
    if ($(window).width() < 700) return;
    if (typeof (tb_init) != "function") {
        loadScript("$thickbox.js", completeInfo);
        return;
    }
    imgLoader = new Image(); // preload image
    imgLoader.src = tb_pathToImage;
    tb_show("请完善个人信息", tt_sv_host + "/member/editinfo.aspx?box=1&domainame=" + encodeURI(location.host) + "&TB_iframe=true&width=700&height=540", null);
    $("#TB_window").css({ background: "transparent", border: "none" });
    $("#TB_title").remove();
    $.removeCookie("tt_info", { path: "/" });
}
//未激活提示
function CheckActivation() {
    if ($.cookie("ActivationState") == "no") {
        setTimeout(function () {
            loadScript("$fdcontrol.js", function () {
                fd_msg($("ul.login li:eq(0)"), "<a style='color:#c00;line-height:2em;' href='/member/editinfo.aspx' target='_blank'>帐号未激活</a>", null, null, { backgroundColor: "#fff", borderColor: "#ccc", left: $("ul.login li:eq(0)").offset().left + 42 + "px" });
            });
        }, 3000);
        $("a[href*='download.aspx']").each(function () {
            if ($(this).attr("href").indexOf("login.aspx") < 0)
                $(this).click(function () {
                    tb_show("请激活账户", tt_sv_host + "/member/login.aspx?newopen=1&TB_iframe=1&border=green&domainame=" + location.host + "&url=" + encodeURIComponent($(this).attr("href")), false);
                    return false;
                });
        });
    }
    if ($.cookie("tt_info") == "yes") completeInfo();
}
var loadExam = false;
//调查问卷弹出框：examid,标题，框宽度，框高度，绑定白皮书id，每页几道题，每道题选项是几列
function showExam(id, title, width, height, wpid, ps, cc) {
    if (loadExam) return;
    if (typeof (tb_init) != "function") { loadScript("$thickbox.js", function () { showExam(id, title, width, height, wpid, ps, cc); }); return; }
    loadExam = true;
    ps = ps || 2; cc = cc || 1;
    imgLoader = new Image(); // preload image
    imgLoader.src = tb_pathToImage;
    options.width = width || 520;
    options.height = height || 560;
    if (id == 334) {
        options.height = 480;
        ps = 3; cc = 2;
    }
    if ($("body").width() < options.width) { options.width = $("body").width() - 40; cc = 1; }
    tb_show(title, tt_sv_host + "/common/exam.aspx?ps=" + ps + "&cc=" + cc + "&domainame=" + encodeURIComponent(location.host) + "&examid=" + id + "&wpid=" + (wpid || "0") + "&TB_iframe=1&modal=true&border=green&TechTarget=" + $.cookie("TechTarget"), false);
    options.width = ''; options.height = '';
}
//弹出登录框
function showLogin() {
    imgLoader = new Image(); // preload image
    if (typeof (tb_init) != "function") { loadScript("$thickbox.js", showLogin); return; }
    imgLoader.src = tb_pathToImage;
    var logW = $(window).width() < 450 ? $(window).width() - 60 : 398;
    var logH = $(window).height() < 350 ? $(window).height() - 60 : 266;
    tb_show("登录", tt_sv_host + "/member/login.aspx?TB_iframe=1&border=green&width=" + logW + "&height=" + logH + "&domainame=" + location.host + "&url=" + encodeURIComponent(location.pathname + location.search), false);
}
function afterLogin() { location.reload(); } //登录成功默认刷新当前页面

if (typeof (jQuery) == "undefined") {
    loadScript("$jquery.min.js", beginEverything);
}
else beginEverything();

loadScript("$tem_specific.js"); //特定内容的临时操作


/*底部半透明广告代码 开始*/
function CheckPalyBottomAD() {
    //读取配置文件信息
    $.ajax({
        url: tt_sv_host + "/common/ajax.ashx?xmlurl=" + tt_sv_host + "/xml/BottomAD.xml",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            $(data).find("item").each(function () {
                var _open = $(this).children("open").text();
                var _site = $(this).children("site").text();
                var _page = $(this).children("page").text();
                var _time = $(this).children("time").text();
                var _RepeatPlay = $(this).children("RepeatPlay").text();
                var _UserClose = $(this).children("UserClose").text();
                if (_open == "1") {
                    isPlayBottomAD(_site, _page, _time, _RepeatPlay, _UserClose); //open为1时投放/0关闭
                }
            })
        },
        error: function (a, b) { //alert(b);
        }
    });
}
//是否投放网站
function isPlaySite(siteids) {
    sitehost = window.location.host.toLowerCase().replace("www.search", "").replace(".com.cn", ""); //获取域名
    if (siteids == null || siteids == "") return false;
    siteids = "," + siteids + ",";
    var snames = { "none": 0, "security": 1, "storage": 2, "cio": 3, "soa": 4, "database": 5, "virtual": 6, "networking": 7, "smb": 9, "sv": 11, "datacenter": 12, "cloudcomputing": 13, "bi": 14 };
    return siteids.indexOf("," + snames[sitehost || "none"] + ",") > -1;
}
//根据条件决定是否投放底部浮动层广告位
function isPlayBottomAD(site, PalyPage, time, RepeatPlay, UserClose) {
    var isClose = $.cookie("CloseBottomAD"); //读取用户是否主动关闭
    isClose = 0;
    if (isClose != null && isClose == 1) {
        return; //设置为关闭后不再投放
    }

    //检查网站
    if (isPlaySite(site) == false) {
        return; //alert("本站不符全投放条件"); 
    }

    var CookieValue = $.cookie("BottomAD");
    if (CookieValue == "" || CookieValue == "undefined" || CookieValue == null) CookieValue = 0;
    if (PalyPage == "all" || isADPage('', PalyPage + ",ad")) {
        if (RepeatPlay > 0) {
            //检查cookie，如果为空投放。已经投放过不再投放            
            if (CookieValue < RepeatPlay) {
                PlayBottomAD();
                CookieValue += 1;
                $.cookie("PlayerAD", CookieValue);
            }
        }
        else {
            PlayBottomAD(); //0为直接投放 
        }

        //如设定了定时关闭功能(输出此段代码)
        if (time > 0) {
            var _time = time * 1000;
            setTimeout(CloseBottomAD, _time);
        }
    }
}
//请求投放底部半透明广告位
function PlayBottomAD() {
    //google广告代码
    var ord = Math.random() * 10000000000000000;
    //loadScript("http://ad.doubleclick.net/N3618/adj/CN_sCIO/;sz=970x90;CNpos=Leaderboard2;ord=" + ord);
    $("body").append("<div class=\"qyer_layer_fix\"><div class=\"qyer_layer_main\"><iframe id=\"bottomad\" allowtransparency=\"true\" width=\"100%\" height=\"100%\" src=\"/tar/BottomAD.html\" frameBorder=\"0\" scrolling=\"no\"></iframe></div><div class=\"qyer_layer_close\" flag=\"1\">关闭</div></div>")
    //此为仅用户行为请求关闭底部半透明广告位
    jQuery(".qyer_layer_close").live("click", function () {
        CloseBottomAD();
        $.cookie("CloseBottomAD", "1"); //记录用户主动关闭行为
    });
}
//关闭代码请求
function CloseBottomAD() {
    var flag = jQuery(this).attr("flag");
    if (flag) {
        jQuery(".qyer_layer_fix").slideUp(500, function () {
            jQuery(".qyer_layer_fix").hide();
        });
    }
    else {
        jQuery(".qyer_layer_fix").fadeOut(3000);
    }
}
/*底部半透明广告代码 结束*/

window.onload = function () {
    //$(".qyer_layer_fix").show(); //以下操作必须在iframe加载完后才可进行
    $(".qyer_layer_fix").fadeIn(2000); //淡显底部半透明广告
}