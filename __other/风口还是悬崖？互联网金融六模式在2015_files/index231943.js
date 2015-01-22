define("appmsg/comment.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js"],function(e){
"use strict";
function t(e,t){
e.style.display=t?t:"block";
}
function n(e){
e.style.display="none";
}
function m(){
t(B.toast),setTimeout(function(){
n(B.toast);
},1500);
}
function o(e){
return e.replace(/^\s+|\s+$/g,"");
}
function i(){
clearTimeout(w),w=setTimeout(function(){
if(!j&&-1!=h&&(0==h||"#more"==location.hash)){
var e=window.innerHeight||document.documentElement.clientHeight,m=window.pageYOffset||document.documentElement.scrollTop,o=document.documentElement.scrollHeight;
if(!(o-m-e>200)){
j=!0,n(B.tips),t(B.loading);
var i="/mp/appmsg_comment?action=getcomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id+"&offset="+h+"&limit="+b;
g({
url:i,
type:"get",
success:function(e){
var t={};
try{
t=window.eval.call(window,"("+e+")");
}catch(n){}
var m=t.base_resp&&t.base_resp.ret;
0==m?c(t):y.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(i)+";ret="+m+"&r="+Math.random();
},
error:function(){
y.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(i)+"&r="+Math.random();
},
complete:function(){
j=!1,n(B.loading);
}
});
}
}
},100);
}
function c(e){
var m,o=document.createDocumentFragment();
0==h?(E=e.logo_url,I=e.nick_name,m=e.elected_comment,m.length?(d(m,o,"elected"),
B.list.appendChild(o),d(m,o,"elected"),B.morelist.appendChild(o),t(B.main),1!=e.is_fans?(t(document.getElementById("js_cmt_nofans1"),"inline"),
t(document.getElementById("js_cmt_nofans3"),"inline")):(t(document.getElementById("js_cmt_addbtn1")),
t(document.getElementById("js_cmt_addbtn3"))),t(e.elected_comment_total_cnt>10?document.getElementById("js_cmt_morebtn"):document.getElementById("js_cmt_statement"))):(n(B.main),
t(1!=e.is_fans?document.getElementById("js_cmt_nofans2"):document.getElementById("js_cmt_addbtn2"))),
m=e.my_comment,m.length&&(d(m,o),B.mylist.appendChild(o),t(B.mylist.parentNode))):(m=e.elected_comment,
m.length&&(d(m,o,"elected"),B.morelist.appendChild(o))),h+b>=e.elected_comment_total_cnt?(h=-1,
_.off(window,"scroll",i),n(document.getElementById("js_cmt_more_loading")),t(document.getElementById("js_cmt_more_end"))):h+=e.elected_comment.length;
}
function l(){
var e=o(B.input.value);
if(!p.hasClass(B.submit,"btn_disabled")){
if(e.length<1)return a("评论不能为空");
if(e.length>600)return a("字数不能多于600个");
p.addClass(B.submit,"btn_disabled");
var n=document.getElementById("activity-name"),i="/mp/appmsg_comment?action=addcomment&comment_id="+comment_id+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
g({
url:i,
data:{
content:e,
title:n&&n.innerText,
head_img:E,
nickname:I
},
type:"POST",
success:function(n){
var o={},c=document.createDocumentFragment();
try{
o=window.eval.call(window,"("+n+")");
}catch(l){}
switch(+o.ret){
case 0:
m(),d([{
content:e,
nick_name:I,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:E
}],c),B.mylist.insertBefore(c,B.mylist.firstChild),t(B.mylist.parentNode),B.input.value="";
break;

case-6:
a("你评论的太频繁了，休息一下吧");
break;

case-7:
a("你还未关注该公众号，不能参与评论");
break;

case-10:
a("字数不能多于600个");
break;

case-15:
a("评论已关闭");
break;

default:
a("系统错误，请重试");
}
0!=o.ret&&(y.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:resperr;url:"+encodeURIComponent(i)+";ret="+o.ret+"&r="+Math.random());
},
error:function(){
y.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:ajaxerr;url:"+encodeURIComponent(i)+"&r="+Math.random();
},
complete:function(){
p.removeClass(B.submit,"btn_disabled");
}
});
}
}
function s(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var m=t/1e3-e,o=n/1e3-e;
return 3600>m?Math.ceil(m/60)+"分钟前":86400>o?Math.floor(m/60/60)+"小时前":172800>o?"昨天":Math.floor(o/24/60/60)+"天前";
}
function d(e,t){
for(var n,m,o="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",l=0;m=e[l];++l)m.time=s(m.create_time),
m.status="",m.logo_url=m.logo_url||c,m.logo_url=-1!=m.logo_url.indexOf("wx.qlogo.cn")?m.logo_url.replace(/\/132$/,"/96"):m.logo_url,
m.content=m.content.htmlDecode().htmlEncode(),m.nick_name=m.nick_name.htmlDecode().htmlEncode(),
o+=f.render("t_cmt",m);
for(i.innerHTML=o;n=i.children.item(0);)t.appendChild(n);
}
function a(e){
return setTimeout(function(){
alert(e);
});
}
function r(){
if("#comment"==location.hash)n(B.article),n(B.more),t(B.mine),window.scrollTo(0,0);else if("#more"==location.hash){
var e=B.list.children.item(9).getBoundingClientRect().top;
n(B.article),n(B.mine),t(B.more),i(),window.scrollTo(0,(window.pageYOffset||document.documentElement.scrollTop)+B.morelist.children.item(9).getBoundingClientRect().top-e);
}else n(B.mine),n(B.more),t(B.article),window.scrollTo(0,document.documentElement.scrollHeight);
B.input.blur();
}
var u=document.getElementById("js_cmt_area");
if(0!=comment_id&&1==comment_enabled&&uin&&key){
if(-1==navigator.userAgent.indexOf("MicroMessenger"))return void(u&&(u.style.display="none"));
u&&(u.style.display="block");
var _=e("biz_common/dom/event.js"),p=e("biz_common/dom/class.js"),g=e("biz_wap/utils/ajax.js"),f=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),y=new Image,h=0,b=10,j=!1,w=null,E="",I="我",B={
article:document.getElementById("js_article"),
more:document.getElementById("js_cmt_more"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading")
};
!function(){
i(),r();
}(),_.on(window,"scroll",i),_.on(window,"hashchange",r),_.on(B.input,"input",function(){
var e=o(B.input.value);
e.length<1?p.addClass(B.submit,"btn_disabled"):p.removeClass(B.submit,"btn_disabled");
}),_.on(B.submit,"touchend",l);
}
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js"],function(e){
"use strict";
function t(e){
for(var t=5381,n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n),t&=2147483647;
return t;
}
function n(e,t){
if(e&&!(e.length<=0))for(var n,i,o,a=/http(s)?\:\/\/([^\/]*)(\?|\/)?/,m=0,d=e.length;d>m;++m)n=e[m],
n&&(i=n.getAttribute(t),i&&(o=i.match(a),o&&o[2]&&(c[o[2]]=!0)));
}
function i(){
c={},n(document.getElementsByTagName("a"),"href"),n(document.getElementsByTagName("link"),"href"),
n(document.getElementsByTagName("iframe"),"src"),n(document.getElementsByTagName("script"),"src"),
n(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in c)c.hasOwnProperty(t)&&e.push(t);
return c={},e.join(",");
}
function o(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,n=document.getElementById("js_content"),o=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight,c=Math.ceil(a/o),l=(window.logs.read_height||t)+o,g=document.getElementById("js_toobar").offsetTop,r=n.getElementsByTagName("img")||[],s=Math.ceil(l/o)||1,_=document.getElementById("media"),w=50,f=0,u=0,h=0,p=0,v=l+w>g?1:0;
s>c&&(s=c);
var T=function(t){
if(t)for(var n=0,i=t.length;i>n;++n){
var o=t[n];
if(o){
f++;
var a=o.getAttribute("src"),m=o.getAttribute("data-type");
a&&0==a.indexOf("http")&&(u++,0==a.indexOf("http://mmbiz.qpic.cn")&&(h++,-1!=a.indexOf("?tp=webp")&&p++),
m&&(e["img_"+m+"_cnt"]=e["img_"+m+"_cnt"]||0,e["img_"+m+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=p||0,e.download_img_cnt=u||0,e.download_cdn_img_cnt=h||0;
},y=window.appmsgstat||{},b=window.logs.img||{},x=window.logs.pagetime||{},O=b.load||{},E=b.read||{},j=[],z=[],B=0,N=0,k=0;
for(var D in E)D&&0==D.indexOf("http")&&E.hasOwnProperty(D)&&z.push(D);
for(var D in O)D&&0==D.indexOf("http")&&O.hasOwnProperty(D)&&j.push(D);
for(var I=0,S=j.length;S>I;++I){
var M=j[I];
M&&0==M.indexOf("http://mmbiz.qpic.cn")&&(-1!=M.indexOf("/0")&&B++,-1!=M.indexOf("/640")&&N++,
-1!=M.indexOf("/300")&&k++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:y.read_num||0,
like_cnt:y.like_num||0,
screen_height:o,
screen_num:c,
video_cnt:window.logs.video_cnt||0,
img_cnt:f||0,
read_screen_num:s||0,
is_finished_read:v,
scene:source,
content_len:d.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:N,
img_0_cnt:B,
img_300_cnt:k,
wtime:x.wtime||0,
ftime:x.ftime||0,
ptime:x.ptime||0
};
window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=j.length,e.wifi_read_imgs_cnt=z.length),
T(!!_&&_.getElementsByTagName("img")),T(r);
var Y=(new Date).getDay();
0!==user_uin&&Math.floor(user_uin/100)%7==Y&&(e.domain_list=i()),m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
var a=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js"),d=(e("biz_common/utils/cookie.js"),
{});
!function(){
var e=document.getElementsByTagName("html");
if(e&&1==!!e.length){
e=e[0].innerHTML;
var t=e.replace(/[\x00-\xff]/g,""),n=e.replace(/[^\x00-\xff]/g,"");
d.content_length=1*n.length+3*t.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=d;
}();
var c={},l=null,g=0,r=msg_link.split("?").pop(),s=t(r);
window.localStorage&&(a.on(window,"load",function(){
g=1*localStorage.getItem(s),window.scrollTo(0,g);
}),a.on(window,"unload",function(){
if(localStorage.setItem(n,g),window._adRenderData){
var e=JSON.stringify(window._adRenderData),t=+new Date,n=[biz,sn,mid,idx].join("_");
localStorage.setItem("adinfo_"+n,e),localStorage.setItem("adinfo_time_"+n,t);
}
o();
}),window.logs.read_height=0,a.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(l),l=setTimeout(function(){
g=window.pageYOffset;
},500);
}),a.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(l),l=setTimeout(function(){
g=window.pageYOffset;
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),_=0;_<c.length;_++)if(f=c[_],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration)
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/iframe.js",[],function(){
"use strict";
function e(e){
var t=0;
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var n=e.parentElement;
if(n&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}
for(var t,n=document.getElementsByTagName("iframe"),o=0,i=n.length;i>o;++o){
t=n[o];
var c=t.getAttribute("data-src"),r=t.className||"";
c&&(0==c.indexOf("http://mp.weixin.qq.com/mp/appmsgvote")&&r.indexOf("js_editor_vote_card")>=0||0==c.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&r.indexOf("card_iframe")>=0)&&(c=c.replace(/^http:/,location.protocol),
r.indexOf("card_iframe")>=0?t.setAttribute("src",c.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||""].join(""))):t.setAttribute("src",c.replace("#wechat_redirect",["&uin=",uin,"&key=",key].join(""))),
function(t){
t.onload=function(){
e(t);
};
}(t),t.appmsg_idx=o);
}
if(window.iframe_reload=function(){
for(var o=0,i=n.length;i>o;++o){
t=n[o];
var c=t.getAttribute("src");
c&&0==c.indexOf("http://mp.weixin.qq.com/mp/appmsgvote")&&e(t);
}
},"getElementsByClassName"in document)for(var d,m=document.getElementsByClassName("video_iframe"),o=0;d=m.item(o++);)d.setAttribute("scrolling","no"),
d.style.overflow="hidden";
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e,t){
r.invoke("imagePreview",{
current:e,
urls:t
});
}
function i(e){
var i=[],r=e.container;
r=r?r.getElementsByTagName("img"):[];
for(var a=0,c=r.length;c>a;a++){
var o=r.item(a),s=o.getAttribute("data-src")||o.getAttribute("src");
if(s){
for(;-1!=s.indexOf("?tp=webp");)s=s.replace("?tp=webp","");
o.dataset&&o.dataset.s&&0==s.indexOf("http://mmbiz.qpic.cn")&&(s=s.replace(/\/640$/,"/0")),
i.push(s),function(e){
n.on(o,"click",function(){
return t(e,i),!1;
});
}(s);
}
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js");
return i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var i=n.getElementsByTagName("a")||[],r=0,o=i.length;o>r;++r)!function(n){
var r=i[n],o=r.getAttribute("href");
if(!o)return!1;
0!=o.indexOf("http://mp.weixin.qq.com")&&0!=o.indexOf("http://mp.weixin.qq.com");
var c=0,f=r.innerHTML;
/^[^<>]+$/.test(f)?c=1:/^<img[^>]*>$/.test(f)&&(c=2),!!e.changeHref&&(o=e.changeHref(o,c)),
t.on(r,"click",function(){
return location.href=o,!1;
},!0);
}(r);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
var e={
ready:function(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.invoke?e():document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e),
document.attachEvent("onWeixinJSBridgeReady",e));
},
invoke:function(e,i,n){
this.ready(function(){
return"object"!=typeof WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void WeixinJSBridge.invoke(e,i,n);
});
},
call:function(e){
this.ready(function(){
return"object"!=typeof WeixinJSBridge?!1:void WeixinJSBridge.call(e);
});
},
on:function(e,i){
this.ready(function(){
return"object"==typeof WeixinJSBridge&&WeixinJSBridge.on?void WeixinJSBridge.on(e,i):!1;
});
}
};
return e;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
if(e){
if(e==window&&"load"==t&&/complete|loaded/.test(document.readyState))return void n({
type:"load"
});
var r=function(e){
var t=n(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
};
return n[t+"_handler"]=r,e.addEventListener?void e.addEventListener(t,r,!!o):e.attachEvent?void e.attachEvent("on"+t,r,!!o):void 0;
}
}
function t(e,t,n,o){
if(e){
var r=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,r,!!o):e.detachEvent?void e.detachEvent("on"+t,r,!!o):void 0;
}
}
return{
on:e,
off:t
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","appmsg/a.js","appmsg/like.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var a={};
for(var t in e)if(e.hasOwnProperty(t)){
var i=e[t],n=typeof i;
i="string"==n?i.htmlDecode():i,"object"==n&&(i=saveCopy(i)),a[t]=i;
}
return a;
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var a,t,i,n=0,o=vedio_iframes.length;o>n;++n)a=vedio_iframes[n],
t=a.iframe,i=a.src,e&&(i=i+"&encryptVer=6.0&platform=61001&cKey="+e),t.setAttribute("src",i);
}
function fillData(e){
var a=e.adRenderData;
if(a.biz_info=a.biz_info||{},a.app_info=a.app_info||{},!a.flag&&a.advertisement_num>0){
if(a.pos_type=a.pos_type||0,window.pos_type=a.pos_type,100==a.pt)window.adData={
usename:a.biz_info.user_name,
pt:a.pt,
traceid:a.traceid,
adid:a.aid,
is_appmsg:!0
};else if(102==a.pt)window.adData={
appname:a.app_info.app_name,
versioncode:a.app_info.version_code,
pkgname:a.app_info.apk_name,
androiddownurl:a.app_info.apk_url,
md5sum:a.app_info.app_md5,
signature:a.app_info.version_code,
rl:a.rl,
traceid:a.traceid,
pt:a.pt,
type:a.type,
adid:a.aid,
is_appmsg:!0
};else if(101==a.pt)window.adData={
appname:a.app_info.app_name,
app_id:a.app_info.app_id,
icon_url:a.app_info.icon_url,
appinfo_url:a.app_info.appinfo_url,
rl:a.rl,
traceid:a.traceid,
pt:a.pt,
type:a.type,
adid:a.aid,
is_appmsg:!0
};else if(103==a.pt||104==a.pt){
var t=a.app_info.down_count||0,i=a.app_info.app_size||0,n=a.app_info.app_name||"",o=a.app_info.category,r=["万","百万","亿"];
if(t>=1e4){
t/=1e4;
for(var d=0;t>=10&&2>d;)t/=100,d++;
t=t.toFixed(1)+r[d]+"次";
}else t=t.toFixed(1)+"次";
i>=1024?(i/=1024,i=i>=1024?(i/1024).toFixed(2)+"MB":i.toFixed(2)+"KB"):i=i.toFixed(2)+"B",
o=o?o[0]||"其他":"其他";
for(var p=["-","(",":",'"',"'","：","（","—","“","‘"],s=-1,m=0,l=p.length;l>m;++m){
var _=p[m],f=n.indexOf(_);
-1!=f&&(-1==s||s>f)&&(s=f);
}
-1!=s&&(n=n.substring(0,s)),a.app_info._down_count=t,a.app_info._app_size=i,a.app_info._category=o,
a.app_info.app_name=n,window.adData={
appname:a.app_info.app_name,
app_id:a.app_info.app_id,
rl:a.rl,
pkgname:a.app_info.apk_name,
androiddownurl:a.app_info.apk_url,
versioncode:a.app_info.version_code,
appinfo_url:a.app_info.appinfo_url,
traceid:a.traceid,
pt:a.pt,
ticket:a.ticket,
type:a.type,
adid:a.aid,
is_appmsg:!0
};
}
var c=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(document.getElementById("js_top_ad_area").innerHTML=TMPL.render("t_ad",a),
require("appmsg/a.js"),DomEvent.off(window,"scroll",c));
};
if(0==a.pos_type)document.getElementById("js_bottom_ad_area").innerHTML=TMPL.render("t_ad",a),
require("appmsg/a.js");else if(1==a.pos_type){
DomEvent.on(window,"scroll",c);
var u=0;
window.localStorage&&(u=1*localStorage.getItem(key)||0),window.scrollTo(0,u),c(u);
}
}
var g=e.appmsgstat;
window.appmsgstat||(window.appmsgstat=g),g.show&&(!function(){
var e=document.getElementById("js_read_area"),a=document.getElementById("like");
e.style.display="block",a.style.display="inline",g.liked&&Class.addClass(a,"praised"),
a.setAttribute("like",g.liked?"1":"0");
var t=document.getElementById("likeNum"),i=document.getElementById("readNum"),n=g.read_num,o=g.like_num;
n||(n=1),o||(o="赞"),parseInt(n)>1e5?n="100000+":"",parseInt(o)>1e5?o="100000+":"",
i&&(i.innerHTML=n),t&&(t.innerHTML=o);
}(),require("appmsg/like.js"));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage){
var key=[biz,sn,mid,idx].join("_");
_adInfo=localStorage.getItem("adinfo_"+key);
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=1*localStorage.getItem("adinfo_time_"+key),_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:(localStorage.removeItem("adinfo_"+key),
localStorage.removeItem("adinfo_time_"+key));
}
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad,
type:"GET",
async:!1,
success:function(ret){
if(ret)try{
if(ret=eval("("+ret+")"),fillVedio(ret.appmsgticket?ret.appmsgticket.ticket:""),
ret.ret)return;
var adRenderData={};
if(0==is_need_ad)adRenderData=_adInfo,adRenderData||(adRenderData={
advertisement_num:0
});else{
if(ret.advertisement_num>0&&ret.advertisement_info){
var d=ret.advertisement_info[0];
adRenderData=saveCopy(d);
}
adRenderData.advertisement_num=ret.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=adRenderData),fillData({
adRenderData:adRenderData,
appmsgstat:ret.appmsgstat
});
}catch(e){
return;
}
}
});
}
require("biz_common/utils/string/html.js");
var iswifi=!1,ua=navigator.userAgent,DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src"),realsrc=iframe.getAttribute("src")||src;
!realsrc||0!=realsrc.indexOf("http://v.qq.com/iframe/player.html")&&0!=realsrc.indexOf("http://z.weishi.com/weixin/player.html")||(realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),0==realsrc.indexOf("http://v.qq.com/iframe/player.html")?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.logs.video_cnt++);
}
if(window.adRenderData||window.appmsgstat)fillVedio(window.appmsgticket),fillData({
adRenderData:saveCopy(window.adRenderData||{
flag:!0
}),
appmsgstat:window.appmsgstat||{
flag:!0
}
});else{
var js_toobar=document.getElementById("js_toobar"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,a=js_toobar.offsetTop;
e+innerHeight+offset>=a&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
}
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20;
if("wifi"==window.networkType){
var s=1;
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),n=Math.max(s*e,n);
}
for(var a=+new Date,m=[],d=this.sw,c=0,u=t.length;u>c;c++){
var w=t[c],f=w.el.offsetTop;
if(!w.show&&(i>=f&&i<=f+w.height+n||f>i&&i+o+n>f)){
var p=w.src,g=this;
this.inImgRead&&(i>=f&&i<=f+w.height||f>i&&i+o>f)&&this.inImgRead(p,networkType),
this.changeSrc&&(p=this.changeSrc(w.el,p)),w.el.onerror=function(){
!!g.onerror&&g.onerror(p);
},w.el.onload=function(){
var t=this;
l(t,"height","auto","important"),t.getAttribute("_width")?l(t,"width",t.getAttribute("_width"),"important"):l(t,"width","auto","important");
},h(w.el,"src",p),m.push(p),w.show=!0,l(w.el,"visibility","visible","important");
}
r.isWp&&1*w.el.width>d&&(w.el.width=d);
}
m.length>0&&this.detect&&this.detect({
time:a,
loadList:m,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",r=o.offsetWidth,s=0;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var a=0,d=t.length;d>a;a++){
var c=t.item(a),u=h(c,n);
if(u){
var w=100;
if(c.dataset&&c.dataset.ratio){
var f=1*c.dataset.ratio,p=1*c.dataset.w||r;
"number"==typeof f&&f>0?(p=r>=p?p:r,w=p*f,c.style.width&&c.setAttribute("_width",c.style.width),
l(c,"width",p+"px","important"),l(c,"visibility","visible","important"),c.setAttribute("src",m)):l(c,"visibility","hidden","important");
}else l(c,"visibility","hidden","important");
l(c,"height",w+"px","important"),e.push({
el:c,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),s.on(window,"load",function(i){
e.call(t,i);
}),s.on(document,"touchmove",function(i){
o.call(t,i);
});
}
var r=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),a=t("biz_common/dom/attr.js"),h=a.attr,l=a.setProperty,m=t("biz_common/ui/imgonepx.js");
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:(setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0),!0):!0;
},function(e){
r=e;
};
});define("appmsg/index.js",["biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/comment.js","appmsg/share.js","appmsg/report_and_source.js","appmsg/report.js"],function(e){
"use strict";
if(window.page_endtime=+new Date,window.logs={},"mp.weixin.qq.com"==location.host){
var t=e("biz_common/log/jserr.js");
t({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
var n=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==";
},o=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==";
},i=function(e){
n(function(t){
t?o(e):!!e&&e(!1);
});
};
window.webp=!1,i(function(t){
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var n=document.getElementById("js_cover");
if(n){
var o=n.getAttribute("data-src");
if(o){
if(0==o.indexOf("http://mmbiz.qpic.cn")){
for(;-1!=o.indexOf("?tp=webp");)o=o.replace("?tp=webp","");
t&&(o+="?tp=webp");
}
n.setAttribute("src",o),window.logs.img.read[o]=!0,window.logs.img.load[o]=!0,n.removeAttribute("data-src");
}
}
var i=e("biz_wap/ui/lazyload_img.js");
new i({
attrKey:"data-src",
lazyloadHeightWhenWifi:function(){
var e;
e=window.svr_time?new Date:new Date(1e3*window.svr_time);
var t=e.getHours();
return t>=20&&23>t?.5:1;
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
for(var n=t;-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
0==t.indexOf("http://mmbiz.qpic.cn")&&(e.dataset&&e.dataset.s&&(n=n.replace(/\/0$/,"/640")),
window.webp&&(n+="?tp=webp"));
var o=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return n=n.replace(o,"http://m.qpic.cn"),window.logs.img.load[n]=!0,n;
},
onerror:function(e){
if(e&&0==e.indexOf("http://mmbiz.qpic.cn")){
var t=10;
/\?tp\=webp$/.test(e)&&(t=11);
var n=new Image;
n.src="http://mp.weixin.qq.com/mp/jsreport?key="+t+"&content="+encodeURIComponent(e)+"&r="+Math.random();
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,n=e.loadList;
window.logs.img.download[t]=n;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js");
var a=e("biz_common/dom/event.js"),r=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user");
e&&(a.on(e,"click",function(){
return s.invoke("profile",{
username:user_name,
scene:"57"
}),!1;
}),r.isWp&&e&&e.setAttribute("href","weixin://profile/"+user_name));
}(),function(){
location.href.match(/fontScale=\d+/)&&r.isIOS&&s.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var p=e("appmsg/outer_link.js");
new p({
container:document.getElementById("js_content"),
changeHref:function(e,t){
return e&&0==e.indexOf("http://mp.weixin.qq.com/s")&&(e=e.replace(/#rd\s*$/,"#wechat_redirect")),
0!=e.indexOf("http://mp.weixin.qq.com/mp/redirect")?"http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0":e;
}
});
var m=e("appmsg/review_image.js");
new m({
container:document.getElementById("img-content")
}),e("appmsg/iframe.js"),e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),
e("appmsg/comment.js"),setTimeout(function(){
e("appmsg/share.js"),e("appmsg/report_and_source.js"),function(){
var e=document.getElementById("js_pc_qr_code_img");
if(e&&-1==navigator.userAgent.indexOf("MicroMessenger")){
var t=10000004,n=document.referrer;
0==n.indexOf("http://weixin.sogou.com")?t=10000001:0==n.indexOf("https://wx.qq.com")&&(t=10000003),
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
}
}(),e("appmsg/report.js");
},1e3);
});