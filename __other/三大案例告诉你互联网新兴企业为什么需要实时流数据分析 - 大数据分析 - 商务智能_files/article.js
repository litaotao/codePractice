//Thickbox 自动弹出窗口(检查注册信息完整性)
//var iState = "<%=state %>";
//if (iState == "Old") {
//    window.onload = function () {
//        //新增页面的方法，注意modal=false（可以退出界面）与modal=true（不能退出）
//        tb_show("请完善个人信息", "/member/perfect.aspx?TB_iframe=true&width=770&height=500&modal=true&theurl=/showcontent_<%=articleid %>.htm", null);
//    }
//}

//复制加出处信息
document.body.oncopy = function () {
    setTimeout(function () { var text = clipboardData.getData("text"); if (text) { text = text + "\r\nTechTarget中国原创内容，原文链接：" + location.href; clipboardData.setData("text", text); } }, 100)
}
//打印
function PrintArticle(id) {
    window.open("print.aspx?id=" + id);
}
//功能：投稿
function WriteEditor() {
    window.location = 'mailto:info@techtarget.com.cn?subject=%b6%c1%d5%df%b7%b4%c0%a1&body=%b1%e0%bc%ad%c4%fa%ba%c3%2c%0d%20%20%ce%d2%cf%eb%be%cd%b1%be%c6%aa%ce%c4%d5%c2%b7%a2%b1%ed%c8%e7%cf%c2%c6%c0%c2%db%a3%ac(' + window.location.href + ')%cf%a3%cd%fb%d3%d0%bb%fa%bb%e1%bf%af%b5%c7%a1%a3';
}


/************************图片以弹出层形式显示**************************/
//关闭层
function hidden_div(obj) { gid(obj).style.display = 'none'; }
//显示层
function show_div(obj) { gid(obj).style.display = 'block'; }
//显示关闭层
function display_div(obj) { var s = gid(obj).style; if (s.display == "none") { s.display = "block"; } else { s.display = "none"; } }
//自定义层
function showdiv(obj, content, width, height, mode) {
    //检测ID是否存在
    if (gid(obj)) {
        //存在直接调用
        var oDiv = gid(obj);
    }
    else {
        //不存在生成一个并设置默认属性
        var oDiv = document.createElement("DIV");
        oDiv.id = obj;
        oDiv.className = obj;
        document.body.appendChild(oDiv);
    }
    //填充内容
    oDiv.innerHTML = content;
    //定义默认样式
    oDiv.style.width = width + "px";
    oDiv.style.display = "block";
    //该模式完全自定义方式
    if (mode == 1) {
        //设置高度
        oDiv.style.height = height + "px";
    } else {
        //获取高度
        if (height == 0) { height = gid(obj).offsetHeight; }
        //获取可视宽高
        var bt = document.documentElement.clientHeight - height;
        var bl = document.documentElement.clientWidth - width;
        //初始化
        var top, left;
        //非IE6及以下
        if (window.XMLHttpRequest) {
            //计算位置
            top = (bt / 2) - 10;
            left = (bl / 2);
            //使用决对定位
            oDiv.style.position = 'fixed';
        } else {

            //获取浏览器上卷和左卷
            var st = window.pageYOffset || document.documentElement.scrollTop;
            var sl = window.pageXOffset || document.documentElement.scrollLeft;

            //计算位置
            top = (bt / 2) + st - 10;
            left = (bl / 2) + sl;
            //使用相对定位
            oDiv.style.position = 'absolute';
        }
        //设置位置
        oDiv.style.top = top + "px";
        oDiv.style.left = left + "px";
    }
}
function showbgdiv(obj, content, width, height, mode) {
    //检测ID是否存在
    if (gid(obj)) {
        //存在直接调用
        var oDiv = gid(obj);
        oDiv.className = "over";
    }
    else {
        //不存在生成一个并设置默认属性
        var oDiv = document.createElement("DIV");
        oDiv.id = obj;
        oDiv.className = obj;
        document.body.appendChild(oDiv);
    }
    //填充内容
    //oDiv.innerHTML=content;
    //定义默认样式
    oDiv.style.width = width + "px";
    oDiv.style.display = "block";
    //该模式完全自定义方式
    if (mode == 1) {
        //设置高度
        oDiv.style.height = height + "px";
    } else {
        //获取高度
        if (height == 0) { height = gid(obj).offsetHeight; }

        //获取可视宽高
        var bt = document.documentElement.clientHeight - height;
        var bl = document.documentElement.clientWidth - width;
        //初始化
        var top, left;
        //非IE6及以下
        if (window.XMLHttpRequest) {
            //计算位置
            top = (bt / 2) - 10;
            left = (bl / 2);
            //使用决对定位
            oDiv.style.position = 'fixed';
        } else {

            //获取浏览器上卷和左卷
            var st = window.pageYOffset || document.documentElement.scrollTop;
            var sl = window.pageXOffset || document.documentElement.scrollLeft;

            //计算位置
            top = (bt / 2) + st - 10;
            left = (bl / 2) + sl;
            //使用相对定位
            oDiv.style.position = 'absolute';
        }
        //设置位置
        oDiv.style.top = top + "px";
        oDiv.style.left = left + "px";
    }
}
//透明层
function showmask() {
    showbgdiv("over", "", document.documentElement.scrollWidth, document.documentElement.scrollHeight, 1)
}
/*********************************************************
简单图片显示，兼容所有浏览器
*********************************************************/
function showimg(url) {
    tb_show("", url, null); //采用thickbox.js
    return;

    //显示进度
    showdiv("imgline", "图片加载中……", 200, 30);
    //替换为原图网址
    var wx = document.documentElement.clientWidth - 40
    var hx = document.documentElement.clientHeight - 40
    var width, height, openw, openstr; openw = false; openstr = ""
    //初始化
    var img = new Image();
    img.src = url;
    //检测是否存在缓存
    img.complete ? ImgOK() : img.onload = ImgOK;
    function ImgOK() {
        //透明层
        width = img.width;
        height = img.height;
        //检测宽高度
        if (width > wx) { height = (wx / width) * height; width = wx; openw = true; }
        if (height > hx) { width = (hx / height) * width; height = hx; openw = true; }
        //隐藏进度
        hidden_div("imgline");
        showmask()
        //是否显示原图连接
        openstr = "<div id=\"imgshow\" class=\"imgshow_box\"><div class=\"imgshow_prompt\"><span class=\"img_close\"><img src=\"http://img.techtarget.com.cn/template/images/component/newwindow.gif\" alt=\"在新窗口中打开\" onclick=\"ShowTruePic();\" style=\" cursor:pointer;\">&nbsp;&nbsp;<img src=\"http://img.techtarget.com.cn/template/images/component/close.gif\" alt=\"关闭\" onclick=\"HideShowPicWindow();\" style=\" cursor:pointer;\"/></span>";
        outdivstr = "</div>";
        //显示图片
        showdiv("imgshow", openstr + "<img id=\"img_showpic\" src=" + url + " class=\"img_showpic\" onclick=\"HideShowPicWindow();\" style=\"cursor:pointer;width:" + width + "px;height:" + height + "px;\" title=\"点击关闭\">" + outdivstr, width, height); return false;
    }
}
function ShowTruePic() {
    var url = document.getElementById("img_showpic").src;
    window.open(url);
}
function HideShowPicWindow() {
    //隐藏登录窗口
    hidden_div('imgshow');

    //取消灰化
    gid("over").className = "overo";
}
/*******************图片以弹出层形式显示****结束********************/
if (QueryString("ses")) {//加载测试广告
    $.ajax({ url: "http://img.techtarget.com.cn/common/ajax.ashx",
        data: "xmlurl=http://img.techtarget.com.cn/ad/infocenter/" + QueryString("ses") + ".html",
        dataType: "jsonp",
        type: "GET", async: false,
        success: function (response) {
            var dw = document.write;
            document.write = function (str) {
                $(".ibm_wrap").append(str);
            }
            $(".ctright .downprogram:eq(0)").before(response);
            //document.write = dw;
        }
    });
}
$("#maintext table p span[style='color:#FFFFFF;']").removeAttr("style");
$(document).ready(function () {
    //画中画功能脚本
    loadScript("$articleAD.js", function () { ShowArticleAD(function () {if ($(".imgs").size() > 0) loadScript("$imgs.js"); });  })
    //替换文章中的媒体元素
    var tt_script_config = tt_script_config || [];
    var mediadata = [];
    $("#maintext embed[type='audio/x-pn-realaudio-plugin']").each(function (i) {
        $(this).after("<div class='mediadata_" + i + "' style='text-indent: initial;padding:8px;'></div>");
        mediadata.push({ container: ".mediadata_" + i, autostart: false, loop: $(this).attr("loop") == "true", video: $(this).attr("src"), width: $(this).attr("width"), height: $(this).attr("height") });
    }).remove();
    if (mediadata.length > 0) loadScript("$video.js?20140807", mediadata);
    //替换媒体元素结束
});