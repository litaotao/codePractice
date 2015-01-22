define("appmsg/a.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","a/profile.js","a/android.js","a/ios.js","a/gotoappdetail.js"],function(require,exports,module){
"use strict";
function get_url(a,e){
e=e||"";
var t=a.split("?")[1]||"";
if(t=t.split("#")[0],""!=t){
var d=[t];
return""!=e&&d.push(e),t=d.join("&"),a.split("?")[0]+"?"+t+"#"+(a.split("#")[1]||"");
}
}
function ad_click(a,e,t,d,i,n,o,r,p){
if(!has_click[i]){
has_click[i]=!0;
var _=document.getElementById("loading_"+i);
_&&(_.style.display="inline"),ajax({
url:"/mp/advertisement_report?report_type=2&type="+a+"&url="+encodeURIComponent(e)+"&tid="+i+"&rl="+encodeURIComponent(t)+"&__biz="+biz+"&pos_type="+window.pos_type+"&pt="+p+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
if(has_click[i]=!1,_&&(_.style.display="none"),"5"==a)location.href="/mp/profile?source=from_ad&tousername="+e+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+i;else{
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t="source=4&tid="+i+"&idx="+idx+"&mid="+mid+"&appuin="+biz+"&pt="+p+"&aid="+r+"&ad_engine="+ad_engine+"&pos_type="+pos_type;
if("104"==p&&adData){
var d=adData.pkgname&&adData.pkgname.replace(/\./g,"_");
t="source=4&traceid="+i+"&idx="+idx+"&mid="+mid+"&appuin="+biz+"&pt="+p+"&aid="+r+"&engine="+ad_engine+"&pos_type="+pos_type+"&pkgname="+d;
}
e=get_url(e,t);
}
location.href=e;
}
},
async:!0
});
}
}
var js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),pos_type=window.pos_type||0,el_gdt_area=1==pos_type?js_top_ad_area:js_bottom_ad_area;
if(!el_gdt_area||!document.getElementsByClassName)return!1;
var gdt_a=el_gdt_area.getElementsByClassName("js_ad_link");
if(-1==navigator.userAgent.indexOf("MicroMessenger")||gdt_a.length<=0)return el_gdt_area.style.display="none",
!1;
var adData=window.adData,has_click={},DomEvent=require("biz_common/dom/event.js"),ajax=require("biz_wap/utils/ajax.js"),ping_apurl=!1,innerHeight=window.innerHeight||document.documentElement.clientHeight;
gdt_a=gdt_a[0];
var ad_engine=0;
if(gdt_a.dataset&&gdt_a.dataset.apurl&&!function(){
function onScroll(){
if(!ping_apurl){
var gdt_area=el_gdt_area,scrollTop=window.pageYOffset||document.documentElement.scrollTop,offsetTop=gdt_area.offsetTop;
(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop))&&(ping_apurl=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl=!1:DomEvent.off(window,"scroll",onScroll);
},
async:!0
}));
}
}
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl;
-1!=apurl.indexOf("ad.wx.com")&&(ad_engine=1),DomEvent.on(window,"scroll",onScroll),
onScroll();
}(),window.ad_engine=ad_engine,function(){
var a=el_gdt_area;
if(!a.getElementsByClassName)return a.style.display="none",!1;
for(var e=a.getElementsByClassName("js_ad_link")||[],t=0,d=e.length;d>t;++t)!function(a){
var t=e[a],d=t.dataset,i=d.type,n=d.url,o=d.rl,r=d.apurl,p=d.tid,_=d.ticket,s=d.group_id,l=d.aid,c=d.pt;
DomEvent.on(t,"click",function(a){
var e=!!a&&a.target;
return e&&e.className&&-1!=e.className.indexOf("js_ad_btn")?void 0:(ad_click(i,n,o,r,p,_,s,l,c),
!1);
},!0);
}(t);
}(),adData){
adData.adid=window.adid||adData.adid;
var report_param="&tid="+adData.traceid+"&uin="+uin+"&key="+key+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+adData.adid+"&ad_engine="+ad_engine+"&pos_type="+pos_type+"&r="+Math.random();
if("100"==adData.pt){
var AdProfile=require("a/profile.js");
return void new AdProfile({
btnViewProfile:document.getElementById("viewProfile"),
btnAddContact:document.getElementById("addContact"),
adData:adData,
report_param:report_param
});
}
if("102"==adData.pt){
var AdAndroid=require("a/android.js"),_yyb_type=15,_pkgname=adData.pkgname&&adData.pkgname.replace(/\./g,"_");
return void new AdAndroid({
btn:document.getElementById("js_app_action"),
adData:adData,
report_param:report_param,
task_ext_info:[adData.adid,adData.traceid,_pkgname,source,_yyb_type,ad_engine].join("."),
via:[adData.traceid,adData.adid,_pkgname,source,_yyb_type,ad_engine].join(".")
});
}
if("101"==adData.pt){
var AdIos=require("a/ios.js");
return void new AdIos({
btn:document.getElementById("js_app_action"),
adData:adData,
report_param:report_param
});
}
if("103"==adData.pt||"104"==adData.pt){
var GotoAppdetail=require("a/gotoappdetail.js"),_yyb_type=15,_pkgname=adData.pkgname&&adData.pkgname.replace(/\./g,"_");
return void new GotoAppdetail({
btn:document.getElementById("js_appdetail_action"),
adData:adData,
report_param:report_param,
via:[adData.traceid,adData.adid,_pkgname,source,_yyb_type,ad_engine].join("."),
appdetail_params:["&aid="+adData.adid,"traceid="+adData.traceid,"pkgname="+_pkgname,"source="+source,"type="+_yyb_type,"engine="+ad_engine,"appuin="+biz,"pos_type="+pos_type,"ticket="+adData.ticket,"scene="+scene].join("&")
});
}
}
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js"],function(e){
"use strict";
function t(){
var t=e("biz_wap/utils/mmversion.js"),o=e("biz_common/utils/report.js"),r=!1,a=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
if(Math.random()<.1){
var e=window.webp?2e3:1e3,n=[];
n.push("1="+e),t.isIOS&&n.push("2="+e),t.isAndroid&&n.push("3="+e);
var i=window.logs.pageinfo.content_length;
if(i&&n.push("4="+i),e=a?2e3:1e3,n.push("5="+e),t.isIOS&&n.push("6="+e),t.isAndroid&&n.push("7="+e),
a){
if(a.memory){
var r=a.memory;
!!r.jsHeapSizeLimit&&n.push("8="+r.jsHeapSizeLimit/1e3),!!r.totalJSHeapSize&&n.push("9="+r.totalJSHeapSize/1e3),
!!r.usedJSHeapSize&&n.push("10="+r.usedJSHeapSize/1e3);
}
if(a.timing){
var s=a.timing,p=s.navigationStart,d=s.responseEnd,g=d-p,m=s.connectEnd==s.fetchStart;
n.push("11="+(m?2e3:1e3)),n.push("12="+g),"wifi"==networkType?n.push("13="+g):"2g/3g"==networkType&&n.push("14="+g);
}
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=8&"+n.join("&"));
}
}(),a&&a.timing?(r=a.timing.navigationStart,function(){
if(!(Math.random()>.5)&&a.getEntries){
for(var e=[],t=a.getEntries(),n=[],i=0,r=t.length;r>i;++i){
var s=t[i],p=s.name;
if(p&&"script"==s.initiatorType&&/^.*(res\.wx\.qq\.com)(.*)\.js$/g.test(p)){
{
var d=s.duration;
s.startTime,s.responseEnd;
}
-1!=p.indexOf("/js/biz_wap/moon")?(d=Math.round(d),e.push("1="+d),"wifi"==networkType?e.push("2="+d):"2g/3g"==networkType&&e.push("3="+d),
e.push("4="+(10>=d?2e3:1e3))):n.push({
s:s.startTime,
e:s.responseEnd,
t:s.duration
});
}else;
}
if(n=n.sort(function(e){
return e.s<e.s?-1:1;
}),n&&n.length>0){
for(var g=0,m=0,f=0,i=0,u=n.length;u>i;++i){
var s=n[i],h=m-s.s;
h>0&&(s.t-=h),h>0&&s.e>m&&(f+=h),g=s.s,m=s.e;
}
f=Math.round(f),e.push("5="+f),"wifi"==networkType?e.push("6="+f):"2g/3g"==networkType&&e.push("7="+f);
}
if("undefined"!=typeof moon){
var c=moon.hit_num,w=moon.mod_num;
e.push("8="+Math.round(1e3+1e3*(c/w)));
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=11&"+e.join("&"));
}
}(),function(){
function e(){
if(-1==i.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,n=e.length;n>t;++t)if(-1!=i.indexOf(e[t]))return!0;
return!1;
}
var t=write_sceen_time-r,n=first_sceen__time-r,a=page_endtime-r;
if(window.logs.pagetime={
wtime:t,
ftime:n,
ptime:a
},!(Math.random()>.5)){
var s=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd","secureConnectionStart"],p=[],d=[];
p.push("flag1=7839&flag2=7&flag3=9"),d.push(e()?"flag1=7839&flag2=7&flag3=12":"wifi"==networkType?"flag1=7839&flag2=7&flag3=5":"2g/3g"==networkType?"flag1=7839&flag2=7&flag3=6":"flag1=7839&flag2=7&flag3=7");
for(var g=0,m=s.length;m>g;++g){
s[g]=window.performance.timing[s[g]];
var f=s[g]-s[0];
f>0&&(p.push(g+"="+f),d.push(g+"="+f));
}
-1!=i.indexOf("MicroMessenger")?(p.push("21="+t+"&22="+n+"&23="+a),d.push("21="+t+"&22="+n+"&23="+a)):(p.push("24="+t+"&25="+n+"&26="+a),
d.push("24="+t+"&25="+n+"&26="+a)),p.push("27="+t+"&28="+n+"&29="+a),d.push("27="+t+"&28="+n+"&29="+a),
o("http://isdspeed.qq.com/cgi-bin/r.cgi?"+p.join("&")),o("http://isdspeed.qq.com/cgi-bin/r.cgi?"+d.join("&"));
}
}(),void function(){
var e=document.getElementById("js_toobar"),t=document.getElementById("page-content"),i=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var r=function(){
var s=window.pageYOffset||document.documentElement.scrollTop,p=e.offsetTop;
if(s+i>=p){
for(var d,g,m=t.getElementsByTagName("img"),f={},u=[],h=0,c=0,w=0,l=0,v=m.length;v>l;++l){
var E=m[l];
d=E.getAttribute("data-src")||E.getAttribute("src"),g=E.getAttribute("src"),d&&(0==d.indexOf("http://mmbiz.qpic.cn")?c++:w++,
h++,f[g]={});
}
if(u.push("1="+1e3*h),u.push("2="+1e3*c),u.push("3="+1e3*w),a.getEntries){
var y=a.getEntries(),S=window.logs.img.download,T=[0,0,0],k=[0,0,0];
h=c=0;
for(var l=0,_=y.length;_>l;++l){
var b=y[l],M=b.name;
M&&"img"==b.initiatorType&&f[M]&&(0==M.indexOf("http://mmbiz.qpic.cn")&&(k[0]+=b.duration,
c++),T[0]+=b.duration,h++,f[M]={
startTime:b.startTime,
responseEnd:b.responseEnd
});
}
T[0]>0&&h>0&&(T[2]=T[0]/h),k[0]>0&&c>0&&(k[2]=k[0]/c);
for(var l in S)if(S.hasOwnProperty(l)){
for(var j=S[l],q=0,z=0,O=0,x=0,H=0,v=j.length;v>H;++H){
var d=j[H];
if(f[d]&&f[d].startTime&&f[d].responseEnd){
var A=f[d].startTime,L=f[d].responseEnd;
q=Math.max(q,L),z=z?Math.min(z,A):A,0==d.indexOf("http://mmbiz.qpic.cn")&&(O=Math.max(q,L),
x=z?Math.min(z,A):A);
}
}
T[1]+=Math.round(q-z),k[1]+=Math.round(O-x);
}
for(var I=4,J=7,l=0;3>l;l++)T[l]=Math.round(T[l]),k[l]=Math.round(k[l]),T[l]>0&&(u.push(I+l+"="+T[l]),
"wifi"==networkType?u.push(I+l+6+"="+T[l]):"2g/3g"==networkType&&u.push(I+l+12+"="+T[l])),
k[l]>0&&(u.push(J+l+"="+k[l]),"wifi"==networkType?u.push(J+l+6+"="+k[l]):"2g/3g"==networkType&&u.push(J+l+12+"="+k[l]));
}
o("http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=7&flag3=10&"+u.join("&")),
n.off(window,"scroll",r,!1);
}
};
n.on(window,"scroll",r,!1);
}
}()):!1;
}
var n=e("biz_common/dom/event.js"),i=navigator.userAgent;
n.on(window,"load",function(){
if(""==networkType&&-1!=i.indexOf("MicroMessenger")){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(n){
networkType=e[n.err_msg],t();
});
}else t();
},!1);
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
-1!=f&&s>f&&(s=f);
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
"wifi"==window.networkType&&(n=Math.max(e,n));
for(var s=+new Date,a=[],l=this.sw,c=0,d=t.length;d>c;c++){
var u=t[c],w=u.el.offsetTop;
if(!u.show&&(i>=w&&i<=w+u.height+n||w>i&&i+o+n>w)){
var p=u.src,f=this;
this.inImgRead&&(i>=w&&i<=w+u.height||w>i&&i+o>w)&&this.inImgRead(p,networkType),
this.changeSrc&&(p=this.changeSrc(u.el,p)),u.el.onerror=function(){
!!f.onerror&&f.onerror(p);
},u.el.onload=function(){
var t=this;
h(t,"height","auto","important"),t.getAttribute("_width")?h(t,"width",t.getAttribute("_width"),"important"):h(t,"width","auto","important");
},m(u.el,"src",p),a.push(p),u.show=!0,h(u.el,"visibility","visible","important");
}
r.isWp&&1*u.el.width>l&&(u.el.width=l);
}
a.length>0&&this.detect&&this.detect({
time:s,
loadList:a,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",r=o.offsetWidth,s=0;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var a=0,c=t.length;c>a;a++){
var d=t.item(a),u=m(d,n);
if(u){
var w=100;
if(d.dataset&&d.dataset.ratio){
var p=1*d.dataset.ratio,f=1*d.dataset.w||r;
"number"==typeof p&&p>0?(f=r>=f?f:r,w=f*p,d.style.width&&d.setAttribute("_width",d.style.width),
h(d,"width",f+"px","important"),h(d,"visibility","visible","important"),d.setAttribute("src",l)):h(d,"visibility","hidden","important");
}else h(d,"visibility","hidden","important");
h(d,"height",w+"px","important"),e.push({
el:d,
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
var r=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),a=t("biz_common/dom/attr.js"),m=a.attr,h=a.setProperty,l=t("biz_common/ui/imgonepx.js");
return n;
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
!function(){
var e=document.getElementById("js_iframetest");
e&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&Math.random()<.001&&(e.innerHTML='<iframe src="http://mp.weixin.qq.com/mp/iframetest#wechat_redirect"></iframe>');
}();
var n=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==";
},i=function(e){
var t=new Image;
t.onerror=function(){
e(!1);
},t.onload=function(){
e(1==t.width);
},t.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==";
},o=function(e){
n(function(t){
t?i(e):!!e&&e(!1);
});
};
window.webp=!1,o(function(t){
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var n=document.getElementById("js_cover");
if(n){
var i=n.getAttribute("data-src");
if(i){
if(0==i.indexOf("http://mmbiz.qpic.cn")){
for(;-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
t&&(i+="?tp=webp");
}
n.setAttribute("src",i),window.logs.img.read[i]=!0,window.logs.img.load[i]=!0,n.removeAttribute("data-src");
}
}
var o=e("biz_wap/ui/lazyload_img.js");
new o({
attrKey:"data-src",
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
for(var n=t;-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
0==t.indexOf("http://mmbiz.qpic.cn")&&(e.dataset&&e.dataset.s&&(n=n.replace(/\/0$/,"/640")),
window.webp&&(n+="?tp=webp"));
var i=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return n=n.replace(i,"http://m.qpic.cn"),window.logs.img.load[n]=!0,n;
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
var r=e("biz_common/dom/event.js"),a=e("biz_wap/utils/mmversion.js"),s=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user");
e&&(r.on(e,"click",function(){
return s.invoke("profile",{
username:user_name,
scene:"57"
}),!1;
}),a.isWp&&e&&e.setAttribute("href","weixin://profile/"+user_name));
}(),function(){
location.href.match(/fontScale=\d+/)&&a.isIOS&&s.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var m=e("appmsg/outer_link.js");
new m({
container:document.getElementById("js_content"),
changeHref:function(e,t){
return e&&0==e.indexOf("http://mp.weixin.qq.com/s")&&(e=e.replace(/#rd\s*$/,"#wechat_redirect")),
0!=e.indexOf("http://mp.weixin.qq.com/mp/redirect")?"http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0":e;
}
});
var p=e("appmsg/review_image.js");
new p({
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