define("a/gotoappdetail.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function a(t){
"undefined"!=typeof l&&l.log&&l.log(t);
}
function n(t,a){
i("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+a.report_param);
}
function e(t){
var e=t.btn;
if(!e)return!1;
var i={},_=t.adData,u="",f="";
if("104"==_.pt){
var v=_.androiddownurl;
if(v&&v.match){
var g=/&channelid\=([^&]*)/,b=v.match(g);
b&&b[1]&&(u="&channelid="+b[1],_.androiddownurl=v.replace(g,""));
}
t.via&&(f=["&via=ANDROIDWX.YYB.WX.ADVERTISE",t.via].join("."));
}
l.ready(function(){
"104"==_.pt&&(l.invoke("getInstallState",{
packageName:s
},function(t){
var n=t.err_msg;
a("getInstallState @yingyongbao : "+n);
var e=n.lastIndexOf("_")+1,o=n.substring(e);
1*o>=m&&n.indexOf("get_install_state:yes")>-1&&(c=!0);
}),l.invoke("getInstallState",{
packageName:_.pkgname
},function(t){
var n=t.err_msg;
a("getInstallState @"+_.pkgname+" : "+n);
var o=n.lastIndexOf("_")+1,i=n.substring(o);
1*i>=_.versioncode&&n.indexOf("get_install_state:yes")>-1&&(d=!0,e.innerHTML="已安装",
p.removeClass(e,"btn_download"),p.addClass(e,"btn_installed"));
})),o.on(e,"click",function(){
if(a("click @js_app_action"),d&&"104"==_.pt)return!1;
var e=function(){
if("104"==_.pt)return c?(n(24,t),void(location.href="tmast://download?oplist=1;2&pname="+_.pkgname+u+f)):(n(25,t),
void(location.href="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+_.app_id+(t.appdetail_params||"")+"&auto=1#wechat_redirect"));
if("103"==_.pt){
n(23,t);
var a="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(_.appinfo_url);
l.invoke("downloadAppInternal",{
appUrl:_.appinfo_url
},function(){
location.href=a;
});
}
};
return _.rl&&_.traceid?i[_.traceid]||(i[_.traceid]=!0,r({
url:"/mp/advertisement_report?report_type=2&type="+_.type+"&url="+encodeURIComponent(_.androiddownurl)+"&tid="+_.traceid+"&rl="+encodeURIComponent(_.rl)+"&__biz="+biz+"&pt="+_.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
i[_.traceid]=!1,e();
},
async:!0
})):e(),!1;
});
});
}
var o=t("biz_common/dom/event.js"),i=t("biz_common/utils/report.js"),r=t("biz_wap/utils/ajax.js"),p=t("biz_common/dom/class.js"),d=!1,l=t("biz_wap/jsapi/core.js"),c=!1,s="com.tencent.android.qqdownloader",m=1060125;
return e;
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(o){
"use strict";
function t(o){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(o);
}
function e(o,t){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+o+t.report_param);
}
function i(o){
var i=o.btn;
if(!i)return!1;
var n=o.adData,c=!1,d={};
o.report_param=o.report_param||"";
var l="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(n.appinfo_url);
r.on(i,"click",function(){
if(t("click @js_app_action"),c)return t("is_app_installed"),e(n.is_appmsg?17:13,o),
void(location.href=n.app_id+"://");
var i=function(){
t("download"),e(n.is_appmsg?15:11,o),t("go : "+l),a.invoke("downloadAppInternal",{
appUrl:n.appinfo_url
},function(){
location.href=l;
});
};
return t("download"),n.rl&&n.traceid?d[n.traceid]||(d[n.traceid]=!0,p({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+o.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),d[n.traceid]=!1,i();
},
async:!0
})):i(),!1;
});
}
var r=o("biz_common/dom/event.js"),n=o("biz_common/utils/report.js"),p=o("biz_wap/utils/ajax.js"),a=o("biz_wap/jsapi/core.js");
return i;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(n){
"use strict";
function a(n){
"undefined"!=typeof d&&d.log&&d.log(n);
}
function e(n,a){
o("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+a.report_param);
}
function t(n){
function t(){
d.invoke("getInstallState",{
packageName:s.pkgname
},function(n){
var a=n.err_msg;
a.indexOf("get_install_state:yes")>-1&&(window.clearInterval(y),g=!0,r.innerHTML=T.installed);
});
}
function o(){
j&&d.invoke("queryDownloadTask",{
download_id:j
},function(t){
if(t&&t.state){
if("download_succ"==t.state){
a("download_succ"),e(s.is_appmsg?18:14,n),window.clearInterval(b),k=!1,I=!0,r.innerHTML=T.downloaded;
var o=document.createEvent("MouseEvents");
o.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),r.dispatchEvent(o);
}
if("downloading"==t.state)return;
("download_fail"==t.state||"default"==t.state)&&(a("fail, download_state : "+t.state),
window.clearInterval(b),k=!1,alert("下载失败"),r.innerHTML=T.download);
}
});
}
var r=n.btn;
if(!r)return!1;
var l={},s=n.adData,c="",u="",m=s.androiddownurl;
if(m&&m.match){
var _=/&channelid\=([^&]*)/,p=m.match(_);
p&&p[1]&&(c="&channelid="+p[1],s.androiddownurl=m.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,w="com.tencent.android.qqdownloader",v=1060125,g=!1,k=!1,I=!1,j=0,b=null,y=null,T={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
r.innerHTML=T.download,d.ready(function(){
d.invoke("getInstallState",{
packageName:w
},function(n){
var e=n.err_msg;
a("getInstallState @yingyongbao : "+e);
var t=e.lastIndexOf("_")+1,o=e.substring(t);
1*o>=v&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),d.invoke("getInstallState",{
packageName:s.pkgname
},function(n){
var e=n.err_msg;
a("getInstallState @"+s.pkgname+" : "+e);
var t=e.lastIndexOf("_")+1,o=e.substring(t);
1*o>=s.versioncode&&e.indexOf("get_install_state:yes")>-1&&(g=!0,r.innerHTML=T.installed);
}),r.addEventListener("click",function(){
if(a("click @js_app_action"),!k){
if(g)return!1;
if(I)return d.invoke("installDownloadTask",{
download_id:j,
file_md5:s.md5sum
},function(n){
var e=n.err_msg;
a("installDownloadTask : "+e),e.indexOf("install_download_task:ok")>-1?y=setInterval(t,1e3):alert("安装失败！");
}),!1;
var m=function(){
return f?(e(s.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+s.pkgname+c+u)):void d.invoke("addDownloadTask",{
task_name:s.appname,
task_url:s.androiddownurl,
extInfo:n.task_ext_info,
file_md5:s.md5sum
},function(t){
var i=t.err_msg;
a("addDownloadTask : "+i),i.indexOf("add_download_task:ok")>-1?(e(s.is_appmsg?15:11,n),
k=!0,j=t.download_id,a("download_id : "+j),r.innerHTML=T.downloading,b=setInterval(o,1e3)):alert("调用下载器失败！");
});
};
return s.rl&&s.traceid?l[s.traceid]||(l[s.traceid]=!0,i({
url:"/mp/advertisement_report?report_type=2&type="+s.type+"&url="+encodeURIComponent(s.androiddownurl)+"&tid="+s.traceid+"&rl="+encodeURIComponent(s.rl)+"&__biz="+biz+"&pt="+s.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[s.traceid]=!1,m();
},
async:!0
})):m(),!1;
}
});
});
}
var o=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),i=n("biz_wap/utils/ajax.js"),d=n("biz_wap/jsapi/core.js");
return t;
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var n=r.length,s=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?n:t,s=-1==s?t:s;
var e=r.substr(0,s),u=r.substr(s+1,t-s-1),o=r.substr(t+1);
return{
host:e,
query_str:u,
hash:o
};
}
function n(n,s){
var t=r(n),e=t.query_str,u=[];
for(var o in s)s.hasOwnProperty(o)&&u.push(o+"="+encodeURIComponent(s[o]));
return u.length>0&&(e+=(""!=e?"&":"")+u.join("&")),t.host+(""!=e?"?"+e:"")+(""!=t.hash?"#"+t.hash:"");
}
return{
parseUrl:r,
join:n
};
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t){
var n=new Date;
n.setDate(n.getDate()+1);
var r=n.toGMTString();
return document.cookie=e+"="+t+";expires="+r,!0;
}
};
return e;
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js"],function(require,exports,module){
"use strict";
function like_report(e){
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0;
ajax({
url:"/mp/appmsg_like?__biz="+biz+"&mid="+mid+"&idx="+idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
type:"GET",
timeout:2e3,
success:function(res){
var data=eval("("+res+")");
0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,"praised"),el_like.setAttribute("like",0),
likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,"praised"),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),el_like=document.getElementById("like"),el_likeNum=document.getElementById("likeNum"),el_readNum=document.getElementById("readNum");
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
});define("appmsg/a.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","a/android.js","a/ios.js","a/gotoappdetail.js"],function(require,exports,module){
"use strict";
function get_url(a,e){
e=e||"";
var t=a.split("?")[1]||"";
if(t=t.split("#")[0],""!=t){
var i=[t];
return""!=e&&i.push(e),t=i.join("&"),a.split("?")[0]+"?"+t+"#"+(a.split("#")[1]||"");
}
}
function ad_click(a,e,t,i,d,n,o,r,p){
if(!has_click[d]){
has_click[d]=!0;
var _=document.getElementById("loading_"+d);
_&&(_.style.display="inline"),ajax({
url:"/mp/advertisement_report?report_type=2&type="+a+"&url="+encodeURIComponent(e)+"&tid="+d+"&rl="+encodeURIComponent(t)+"&__biz="+biz+"&pos_type="+window.pos_type+"&pt="+p+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
if(has_click[d]=!1,_&&(_.style.display="none"),"5"==a)location.href="/mp/profile?source=from_ad&tousername="+e+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+d;else{
if(-1==e.indexOf("mp.weixin.qq.com"))e="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e);else if(-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var t="source=4&tid="+d+"&idx="+idx+"&mid="+mid+"&appuin="+biz+"&pt="+p+"&aid="+r+"&ad_engine="+ad_engine+"&pos_type="+pos_type;
if("104"==p&&adData){
var i=adData.pkgname&&adData.pkgname.replace(/\./g,"_");
t="source=4&traceid="+d+"&idx="+idx+"&mid="+mid+"&appuin="+biz+"&pt="+p+"&aid="+r+"&engine="+ad_engine+"&pos_type="+pos_type+"&pkgname="+i;
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
for(var e=a.getElementsByClassName("js_ad_link")||[],t=0,i=e.length;i>t;++t)!function(a){
var t=e[a],i=t.dataset,d=i.type,n=i.url,o=i.rl,r=i.apurl,p=i.tid,_=i.ticket,s=i.group_id,l=i.aid,c=i.pt;
DomEvent.on(t,"click",function(a){
var e=!!a&&a.target;
return e&&e.className&&-1!=e.className.indexOf("js_ad_btn")?void 0:(ad_click(d,n,o,r,p,_,s,l,c),
!1);
},!0);
}(t);
}(),adData){
adData.adid=window.adid||adData.adid;
var report_param="&tid="+adData.traceid+"&uin="+uin+"&key="+key+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+adData.adid+"&ad_engine="+ad_engine+"&pos_type="+pos_type+"&r="+Math.random();
if("100"==adData.pt,"102"==adData.pt){
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
});define("biz_common/tmpl.js",[],function(){
"use strict";
var n=function(n,t){
var r=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return r(t);
},t=function(t,r){
return n(document.getElementById(t).innerHTML,r);
};
return{
render:t,
tmpl:n
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(s(a,e)){
var n=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(n," ");
}
}
function n(n,c){
s(n,c)?e(n,c):a(n,c);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:n
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),o.join(e,t);
}
function n(e){
var n=(e.type||"GET").toUpperCase(),o=t(e.url),r="undefined"==typeof e.async?!0:e.async,s=new XMLHttpRequest,u=null,a=null;
if("object"==typeof e.data){
var i=e.data;
a=[];
for(var c in i)i.hasOwnProperty(c)&&a.push(c+"="+encodeURIComponent(i[c]));
a=a.join("&");
}else a="string"==typeof e.data?e.data:null;
s.open(n,o,r),s.onreadystatechange=function(){
3==s.readyState&&e.received&&e.received(s),4==s.readyState&&(s.status>=200&&s.status<400?e.success&&e.success(s.responseText):e.error&&e.error(s),
clearTimeout(u),e.complete&&e.complete(),e.complete=null);
},"POST"==n&&s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
s.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(u=setTimeout(function(){
s.abort("timeout"),e.complete&&e.complete(),e.complete=null;
},e.timeout));
try{
s.send(a);
}catch(p){
e.error&&e.error();
}
}
var o=e("biz_common/utils/url/parse.js");
return n;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&","&yen;","¥"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
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
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module){
"use strict";
function report_arcticle(){
var e=""==sourceurl?location.href:sourceurl,r=[nickname,location.href,title,e].join("|WXM|");
return location.href="/mp/readtemplate?t=wxm-appmsg-inform&__biz="+biz+"&info="+encodeURIComponent(r)+"#wechat_redirect",
!1;
}
function viewSource(){
var redirectUrl=sourceurl.indexOf("://")<0?"http://"+sourceurl:sourceurl;
redirectUrl="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(sourceurl);
var opt={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(sourceurl)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
async:!1
};
return tid?opt.success=function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0==res.ret?location.href=redirectUrl:viewSource();
}:(opt.timeout=2e3,opt.complete=function(){
location.href=redirectUrl;
}),ajax(opt),!1;
}
require("biz_common/utils/string/html.js");
var DomEvent=require("biz_common/dom/event.js"),ajax=require("biz_wap/utils/ajax.js"),title=msg_title.htmlDecode(),sourceurl=msg_source_url.htmlDecode(),js_report_article=document.getElementById("js_report_article"),JSAPI=require("biz_wap/jsapi/core.js");
DomEvent.on(js_report_article,"click",function(){
JSAPI.invoke("openSpecificView",{
specificview:"expose"
},function(e){
var r=e.err_msg;
-1==r.indexOf("ok")&&report_arcticle();
});
});
var js_view_source=document.getElementById("js_view_source");
DomEvent.on(js_view_source,"click",function(){
return viewSource(),!1;
});
});define("appmsg/share.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(i){
"use strict";
function e(i,e){
var t="";
""!=tid&&(t="tid="+tid+"&aid=54");
var n=i.split("?")[1]||"";
if(n=n.split("#")[0],""!=n){
var s=[n,"scene="+e];
return""!=t&&s.push(t),n=s.join("&"),i.split("?")[0]+"?"+n+"#"+(i.split("#")[1]||"");
}
}
function t(i,e,t){
var s=i.split("?").pop();
if(s=s.split("#").shift(),""!=s){
var a=[s,"action_type="+t,"uin="+e].join("&");
n({
url:"/mp/appmsg/show",
type:"POST",
timeout:2e3,
data:a
});
}
}
i("biz_common/utils/string/html.js");
var n=(i("biz_common/dom/event.js"),i("biz_wap/utils/ajax.js")),s=i("biz_wap/jsapi/core.js");
s.call("hideToolbar");
var a=msg_title.htmlDecode(),o=(msg_source_url.htmlDecode(),""),m=msg_cdn_url,l=msg_link.htmlDecode(),a=msg_title.htmlDecode(),r=msg_desc.htmlDecode();
r=r||l,"1"==is_limit_user&&s.call("hideOptionMenu"),s.on("menu:share:appmessage",function(i){
var n=1;
i&&"favorite"==i.scene&&(n=4),s.invoke("sendAppMessage",{
appid:o,
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,n),
desc:r,
title:a
},function(){
t(l,fakeid,n);
});
}),s.on("menu:share:timeline",function(){
t(l,fakeid,2),s.invoke("shareTimeline",{
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,2),
desc:r,
title:a
},function(){});
});
s.on("menu:share:weibo",function(){
s.invoke("shareWeibo",{
content:a+e(l,3),
url:e(l,3)
},function(){
t(l,fakeid,3);
});
}),s.on("menu:share:facebook",function(){
t(l,fakeid,4),s.invoke("shareFB",{
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,4),
desc:r,
title:a
},function(){});
}),s.on("menu:general:share",function(i){
var n=0;
switch(i.shareTo){
case"friend":
n=1;
break;

case"timeline":
n=2;
break;

case"weibo":
n=3;
}
i.generalShare({
appid:o,
img_url:m,
img_width:"640",
img_height:"640",
link:e(l,n),
desc:r,
title:a
},function(){
t(l,fakeid,n);
});
});
});