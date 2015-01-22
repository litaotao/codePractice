!function(){
var e={},o={},n={};
e.COMBO_UNLOAD=0,e.COMBO_LOADING=1,e.COMBO_LOADED=2;
var t=function(e,n,t){
if(!o[e]){
o[e]=t;
for(var r=3;r--;)try{
moon.setItem(moon.prefix+e,t.toString()),moon.setItem(moon.prefix+e+"_ver",moon_map[e]);
break;
}catch(a){
moon.clear();
}
}
},r=function(e){
if(!e||!o[e])return null;
var t=o[e];
return"function"!=typeof t||n[e]||(t=o[e]=t(r),n[e]=!0),t;
};
e.combo_status=e.COMBO_UNLOAD,e.run=function(){
var o=e.run.info,n=o&&o[0],t=o&&o[1];
if(n&&e.combo_status==e.COMBO_LOADED){
var a=r(n);
t&&t(a);
}
},e.use=function(o,n){
e.run.info=[o,n],e.run();
},window.define=t,window.seajs=e;
}(),function(e){
function o(e,o,t){
if("object"==typeof e){
var r=Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1");
if(t=t||e,"Array"==r){
for(var a=0,i=e.length;i>a;++a)if(o.call(t,e[a],a,e)===!1)return;
}else{
if("Object"!==r&&n!=e)throw"unsupport type";
if(n==e){
for(var a=e.length-1;a>=0;a--){
var c=n.key(a),s=n.getItem(c);
if(o.call(t,s,c,e)===!1)return;
}
return;
}
for(var a in e)if(e.hasOwnProperty(a)&&o.call(t,e[a],a,e)===!1)return;
}
}
}
var n=e.localStorage,t=document.head||document.getElementsByTagName("head")[0],r={
prefix:"__MOON__",
loaded:[],
unload:[],
hit_num:0,
mod_num:0,
init:function(){
r.loaded=[],r.unload=[];
var t,a,i;
-1!=location.search.indexOf("no_moon=1")&&r.clear(),o(moon_map,function(o,c){
if(a=r.prefix+c,i=o,t=!!n&&n.getItem(a),r.mod_num++,t&&i==n.getItem(a+"_ver"))try{
var s="//# sourceURL="+c+"\n//@ sourceURL="+c;
e.eval.call(e,'define("'+c+'",[],'+t+")"+s),r.hit_num++;
}catch(u){
r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}else r.unload.push(i.replace(/^http(s)?:\/\/res.wx.qq.com/,""));
}),r.load(r.genUrl());
},
genUrl:function(){
var e=r.unload;
if(!e||e.length<=0)return[];
for(var o,n,t="",a=[],i={},c=0,s=e.length;s>c;++c)/^\/(.*?)\//.test(e[c]),RegExp.$1&&(n=RegExp.$1,
t=i[n],t?(o=t+","+e[c],o.length>1024?(a.push(t),t=location.protocol+"//res.wx.qq.com"+e[c],
i[n]=t):(t=o,i[n]=t)):(t=location.protocol+"//res.wx.qq.com"+e[c],i[n]=t));
for(var u in i)i.hasOwnProperty(u)&&a.push(i[u]);
return a;
},
load:function(e){
if(!e||e.length<=0)return seajs.combo_status=seajs.COMBO_LOADED,void seajs.run();
seajs.combo_status=seajs.COMBO_LOADING;
var n=0;
o(e,function(o){
var r=document.createElement("script");
r.src=o,r.type="text/javascript",r.async=!0,"undefined"!=typeof moon_crossorigin&&moon_crossorigin&&r.setAttribute("crossorigin",!0),
r.onload=r.onreadystatechange=function(){
!r||r.readyState&&!/loaded|complete/.test(r.readyState)||(n++,r.onload=r.onreadystatechange=null,
n==e.length&&(seajs.combo_status=seajs.COMBO_LOADED,seajs.run()));
},t.appendChild(r);
});
},
setItem:function(e,o){
!!n&&n.setItem(e,o);
},
clear:function(){
n&&o(n,function(e,o){
~o.indexOf(r.prefix)&&n.removeItem(o);
});
}
};
window.moon=r;
}(window),window.moon.init();