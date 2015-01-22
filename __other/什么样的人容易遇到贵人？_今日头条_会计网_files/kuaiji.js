var city_str = getCookie('city_str');
var city_arr = (decodeURI(city_str)).split('|');
var city_id = city_arr[0];
var city_name = city_arr[1];
var city_py = city_arr[2];

$(function() {
    if (!city_id || !city_name || !city_py) {
        $.getJSON(getDomain('action') + 'city/city_info?jsoncallback=?', function(r) {
            if (r.result == 1) {
                city_arr = (r.data).split('|');
                city_id = city_arr[0];
                city_name = city_arr[1];
                city_py = city_arr[2];
                if ($(".CurCcity").length > 0) {
                    $(".CurCcity").html(city_name);
                }
            }
        });
    }

    var now_url = location.href;

    if (now_url == 'http://video'+BASE_DOMAIN+'/') {
        $('.mod_nav .mod_nav_li').eq(2).find('a').addClass('currentLi')
    }
    if (now_url == 'http://www'+BASE_DOMAIN+'/sale/class.html') {
        $('.mod_nav .mod_nav_li').eq(1).find('a').addClass('currentLi')
    }
    if (now_url == 'http://www'+BASE_DOMAIN+'/sale/docs.html') {
        $('.mod_nav .mod_nav_li').eq(4).find('a').addClass('currentLi')
    }
});

function getDomain(n) {
    return 'http://' + n + BASE_DOMAIN + '/';
}

function getCookie(n, p) {
    p = p || 'KJ_';
    n = p + '' + n;
    var d = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
    return d != null ? d[2] : '';
}

function kjsetcookie(name, value, day){
    var Days = day ? day : 30;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";domain="+BASE_DOMAIN+";path=/";
}

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function getLogin() {
    var d = {
        auth: getCookie('auth'),
        uid: getCookie('uid'),
        username: decodeURI(getCookie('username')),
        isAgency: parseInt(getCookie('is_agency')),
        isSeller: parseInt(getCookie('is_seller')),
        status: 0
    }
    if (d.auth)
        d.status = 1;
    else if (d.username)
        d.status = 2;
    return d;
}

// 添加培训课购买购物车
function courses_cart(order) {
    var type = $("input[name='type']").val();
    var school_id = $("input[name='school_id']").val();
    var course_time_id = $("input[name='course_time_id']").val();
    var agency_id = $("input[name='agency_id']").val();
    var product_id = $("input[name='product_id']").val();
    var v_time = $("input[name='v_time']").val();
    var m_num = $("input[name='m_num']").val();

    var url = getDomain('item') + 'carts/add';
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: "type=" + type + "&school_id=" + school_id + "&course_time_id=" + course_time_id + "&agency_id=" + agency_id + "&product_id=" + product_id + "&v_time=" + v_time + "&m_num=" + m_num,
        success: function(msg) {
            if (msg.result == 0) {
                alert("错误提示：" + msg.error);
            } else {
                if (order && msg.data) {
                    go_order(msg.data);
                } else {
                    parent.location.href = getDomain('cart');
                }
            }
        }
    });
}

// 添加资料购买购物车
function materials_cart(order) {
    var type = $("input[name='type']").val();
    var agency_id = $("input[name='agency_id']").val();
    var product_id = $("input[name='product_id']").val();
    var m_num = $("input[name='m_num']").val();

    var url = getDomain('item') + 'carts/add';
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: "type=" + type + "&product_id=" + product_id + "&agency_id=" + agency_id + "&m_num=" + m_num,
        success: function(msg) {
            if (msg.result == 0) {
                alert("错误提示：" + msg.error);
            } else {
                if (order && msg.data) {
                    go_order(msg.data);
                } else {
                    parent.location.href = getDomain('cart');
                }
            }
        }
    });
}

// 立即购买
function go_order(cart_id) {
    if (cart_id) {
        var M = getLogin();
        if (M.status) {
            $("input[name='post_cart']").val(cart_id);
            $("#post_cart").submit();
        } else {
            alert("您还没登陆，请先登录！");
            var url = getDomain('cart') + 'index';
            parent.location.href = getDomain('passport') + 'login?redirect=' + encodeURIComponent(url);
        }
    } else {
        alert("加入购物车错误！");
    }
}

/**
 *  检查活动页面登录
 * @param obj
 */
function act_login(obj) {
    var M = getLogin();
    if (!M.status) {
        alert("您还没登陆，请先登录！");
        var url = window.location.href;
        location.href = getDomain('passport') + 'login?redirect=' + encodeURIComponent(url);
    } else {
        $(obj).addClass('j-goto');
    }
}

/**
 *  提交活动报名
 */
function act_submit() {
    var url = getDomain('action') + 'activitys/baoming';
    $.getJSON(url + "?jsoncallback=?", {realname: $("input[name='realname']").val(), mobile: $("input[name='mobile']").val(), act_id: $("input[name='act_id']").val(), m_num: $("select[name='m_num']").val()}, function(r) {
        $('#iss').val(0);
        if (r.result == 0) {
            alert("错误提示：" + r.error);
        } else {
            $('#mobile_back').html(r.mobile);
            $('#baoming_num').html(r.persons);
            $('#reduceCount').attr('aid', r.id);
            $.dialogClose();
            bmText();
        }
    });
}

/**
 *  发送活动报名短信
 */
function act_sms() {
    var url = getDomain('action') + 'activitys/sms';
    if ($('#reduceCount').text() == 0) {
        $.getJSON(url + "?jsoncallback=?", {id: $('#reduceCount').attr('aid')}, function(r) {
            $('#iss').val(0);
            if (r.result == 0) {
                alert("错误提示：" + r.error);
            }
        });
    }
}

/**
 * 添加收藏，1培训课，2资料
 */
function add_favorite(id, type) {
    var M = getLogin();
    if (!M.status) {
        if (confirm("您还没登陆，请先登录！")) {
            var url = window.location.href;
            location.href = getDomain('passport') + 'login?redirect=' + encodeURIComponent(url);
        }
    } else {
        if (id && type) {
            var url = getDomain('action') + 'favorite/add';
            $.getJSON(url + "?jsoncallback=?", {relation_id: id, type: type}, function(r) {
                if (r.result == '1') {
                    alert("收藏成功!");
                } else {
                    alert("错误提示：" + r.error);
                }
            });
        }
    }
}

//全站右下角弹窗一
$(function(){
    $("body").after("<div id='fc_1' style='position:fixed; bottom:0; right:0;z-index:1111;'><div id='fc_2' style='background-image:url(http://static.kuaiji.com/images/tc/pop_up_icon1.png);background-repeat:no-repeat; position:absolute; cursor:pointer; width:20px; height:20px; top:13px; right:12px;  background-color:#f0f0f0;'  onclick='hiddenme()'></div><iframe name='iframeT' id='iframeT' allowtransparency='true' src='"+getDomain('zt')+"quanzhan/tc.html' width='333' height='225' scrolling='no'  frameborder='0'></iframe></div>");
})

function hiddenme(){
    var fc_1 = $("#fc_1").height();
    if(fc_1>45){
        $("#fc_1").animate({height:"45px"});
        $("#fc_2").css("background-position","50% 100%");
        seTcook("hayden","1","d3");
    }else{
        $("#fc_1").animate({height:"225px"});
        $("#fc_2").css("background-position","0 0");
        seTcook("hayden","2","d3");
    }
}

$(document).ready(function(){

        var url = window.location.href;
        if(url.indexOf("vip.") >= 0 || url.indexOf("zt.") >= 0 || url.indexOf("/sale/") >= 0 || url.indexOf("bbs.") >= 0 || url.indexOf("/xuexiao/") >= 0 || url.indexOf("/ziliao/") >= 0 || url.indexOf("/kecheng/") >= 0 || url.indexOf("/ban/") >= 0 || url.indexOf("item.") >= 0 || url.indexOf("/shop") >= 0 || url.indexOf("e.") >= 0 || url.indexOf("order.") >= 0 || url.indexOf("/about/") >= 0) {
          $("#fc_1").hide();
            return;
        }
        
        if(/hayden=1/.test(document.cookie)){
            //若 cookie 存在 
            $("#fc_1").height(45);
            $("#fc_2").css("background-position","50% 100%");
        }else{
            $("#fc_1").height(225);
            $("#fc_2").css("background-position","0 0");
        }
});
//全站右下角弹窗一结束
/*
//全站右下角弹窗二开始
$(function(){
    var url = window.location.href;
    if(url.indexOf("video.") >= 0 || url.indexOf("vip.") >= 0 || url.indexOf("zt.") >= 0 || url.indexOf("/sale/") >= 0 || url.indexOf("bbs.") >= 0 || url.indexOf("/xuexiao/") >= 0 || url.indexOf("/ziliao/") >= 0 || url.indexOf("/kecheng/") >= 0 || url.indexOf("/ban/") >= 0 || url.indexOf("item.") >= 0 || url.indexOf("/shop") >= 0 || url.indexOf("e.") >= 0 || url.indexOf("order.") >= 0 || url.indexOf("/about/") >= 0) {
        $("#fc_1").hide();
        return;
    }

    //跨域
    document.domain = "kuaiji.com";

    var win_width = $(window).width();
    $("body").after("<div id='fc_1' style='display:none;position:fixed; bottom:0; right:0;z-index:1111;'><div id='fc_3' style='width:100%; height:33px; position:absolute; top:39px; margin:0 auto;'><div id='fc_4' style='width:1201px; height:33px; margin:0 auto; position:relative;'><span style='width:290px; height:44px; display:inline-block; overflow:hidden;'></span><div class='fc_small' style='width:33px; height:33px; position:absolute; right:6px; cursor:pointer; top:18px;' onclick='f_big()'></div></div><div class='fc_big' style='background:url("+getDomain('static')+"images/tc/fc04.png) no-repeat; width:33px; height:33px; position:absolute; right:8px; top:6px; display:none; cursor:pointer;' onclick='f_small()'></div></div><iframe name='iframeT' id='iframeT' allowtransparency='true' height='217' src='"+getDomain('zt')+"quanzhan/tc.html' scrolling='no'  frameborder='0' onload='if_load()'></iframe></div>");

    $("#iframeT").width(win_width);

})
window.onresize = function(){
    var url = window.location.href;
    if(url.indexOf("video.") >= 0 || url.indexOf("vip.") >= 0 || url.indexOf("zt.") >= 0 || url.indexOf("/sale/") >= 0 || url.indexOf("bbs.") >= 0 || url.indexOf("/xuexiao/") >= 0 || url.indexOf("/ziliao/") >= 0 || url.indexOf("/kecheng/") >= 0 || url.indexOf("/ban/") >= 0 || url.indexOf("item.") >= 0 || url.indexOf("/shop") >= 0 || url.indexOf("e.") >= 0 || url.indexOf("order.") >= 0 || url.indexOf("/about/") >= 0) {
        $("#fc_1").hide();
        return;
    }

    if(/hayden=1/.test(document.cookie)){
    }
    else if(/hayden=2/.test(document.cookie)){
        f_small1();
    }
    else{
        f_small1();
    }
}
function f_big(){
        document.getElementById('iframeT').contentWindow.p1out();
        $("#iframeT").animate({
            height:'44px',
            width:'165px',
        },300,function(){
            $(".fc_big").show();
            var p2_text = document.getElementById('iframeT').contentWindow.p2_text();
            $("#fc_4 span").text("今日推荐").css({"color":"#FFF","font-size":"26px","font-family":"微软雅黑","margin-left":"10px","line-height":"44px","cursor":"pointer"});            
            seTcook("hayden","1","d3");
            $("#fc_3").attr("onclick","f_small()");
        });
        $("#fc_3").css({"background":"#e45959","top":"0","position":"absolute","height":"44px","font-family":"微软雅黑"});
    }
function f_big1(){
        document.getElementById('iframeT').contentWindow.p1out();
        $("#iframeT").animate({
            height:'44px',
            width:'165px',
        },300,function(){
            $(".fc_big").show();
            var p2_text = document.getElementById('iframeT').contentWindow.p2_text();
            $("#fc_4 span").text("今日推荐").css({"color":"#FFF","font-size":"26px","font-family":"微软雅黑","margin-left":"10px","line-height":"44px","cursor":"pointer"});            
            seTcook("hayden","1","d3");
            $("#fc_3").attr("onclick","f_small()");
            $("#fc_3").css({"background":"#e45959","top":"0","position":"absolute","height":"44px","font-family":"微软雅黑"});
            $("#fc_1").show();
        });
        
    }
function f_small(){
    var win_width = $(window).width();
    document.getElementById('iframeT').contentWindow.p1in();
    $(".fc_big").hide();
    $("#iframeT").animate({
        height:'217px',
        width:win_width,
    },300,function(){
        $("#fc_3").attr("onclick","");
        seTcook("hayden","2","d3");
    });
    $("#fc_3").css({"background":"none","top":"39px","position":"absolute","height":"33px"});
    $("#fc_4 span").text("").css({"font-size":"10px"});
}
function f_small1(){
    var win_width = $(window).width();
    document.getElementById('iframeT').contentWindow.p1in();
    $(".fc_big").hide();
    $("#iframeT").height(217);
    $("#iframeT").width(win_width);
    $("#fc_3").attr("onclick","");
    seTcook("hayden","2","d3");
    $("#fc_3").css({"background":"none","top":"39px","position":"absolute","height":"33px"});
    $("#fc_4 span").text("").css({"font-size":"10px"});
}
function if_load(){
    if(/hayden=2/.test(document.cookie)){
        //若 cookie 存在
        $("#fc_1").show();
    }
    else if(/hayden=1/.test(document.cookie)){
        f_big1()
    }
    else{
        $("#fc_1").show();
    }
}
//全站右下角弹窗二结束
*/
function seTcook(name,value,time){
    var strsec = getseco(time);
    var exp = new Date()
    var timer=exp.getTime()+strsec*1
    var ex=new Date(timer);
    document.cookie=name+'='+value+";expires="+ex.toGMTString()+ ";domain="+BASE_DOMAIN+";path=/";
}
function getseco(str){
    var str1=str.substring(1,str.length)*1; 
    var str2=str.substring(0,1); 
    if (str2=="s"){
    return str1*1000;
    }else if (str2=="h"){
    return str1*60*60*1000;
    }else if (str2=="d"){
    return str1*24*60*60*1000;
    }
}

//全站右下角弹窗

