(function(){var h={},mt={},c={id:"21ca6e5eab8630cb8ea8a19089468fd6",dm:["emanu.cn"],js:"tongji.baidu.com/hm-web/js/",etrk:[],icon:'/hmt/icon/21|gif|20|20',ctrk:false,align:-1,nv:-1,vdur:1800000,age:31536000000,rec:0,rp:[],trust:0,vcard:0,qiao:0,lxb:0,conv:0,apps:''};var p=!0,s=null,t=!1;mt.h={};mt.h.xa=/msie (\d+\.\d+)/i.test(navigator.userAgent);mt.h.cookieEnabled=navigator.cookieEnabled;mt.h.javaEnabled=navigator.javaEnabled();mt.h.language=navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage||"";mt.h.la=(window.screen.width||0)+"x"+(window.screen.height||0);mt.h.colorDepth=window.screen.colorDepth||0;mt.cookie={};
mt.cookie.set=function(a,b,e){var d;e.B&&(d=new Date,d.setTime(d.getTime()+e.B));document.cookie=a+"="+b+(e.domain?"; domain="+e.domain:"")+(e.path?"; path="+e.path:"")+(d?"; expires="+d.toGMTString():"")+(e.Ba?"; secure":"")};mt.cookie.get=function(a){return(a=RegExp("(^| )"+a+"=([^;]*)(;|$)").exec(document.cookie))?a[2]:s};mt.event={};mt.event.d=function(a,b,e){a.attachEvent?a.attachEvent("on"+b,function(d){e.call(a,d)}):a.addEventListener&&a.addEventListener(b,e,t)};
mt.event.preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=t};mt.m={};mt.m.parse=function(){return(new Function('return (" + source + ")'))()};
mt.m.stringify=function(){function a(a){/["\\\x00-\x1f]/.test(a)&&(a=a.replace(/["\\\x00-\x1f]/g,function(a){var d=e[a];if(d)return d;d=a.charCodeAt();return"\\u00"+Math.floor(d/16).toString(16)+(d%16).toString(16)}));return'"'+a+'"'}function b(a){return 10>a?"0"+a:a}var e={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return function(d){switch(typeof d){case "undefined":return"undefined";case "number":return isFinite(d)?String(d):"null";case "string":return a(d);case "boolean":return String(d);
default:if(d===s)return"null";if(d instanceof Array){var e=["["],n=d.length,l,f,m;for(f=0;f<n;f++)switch(m=d[f],typeof m){case "undefined":case "function":case "unknown":break;default:l&&e.push(","),e.push(mt.m.stringify(m)),l=1}e.push("]");return e.join("")}if(d instanceof Date)return'"'+d.getFullYear()+"-"+b(d.getMonth()+1)+"-"+b(d.getDate())+"T"+b(d.getHours())+":"+b(d.getMinutes())+":"+b(d.getSeconds())+'"';l=["{"];f=mt.m.stringify;for(n in d)if(Object.prototype.hasOwnProperty.call(d,n))switch(m=
d[n],typeof m){case "undefined":case "unknown":case "function":break;default:e&&l.push(","),e=1,l.push(f(n)+":"+f(m))}l.push("}");return l.join("")}}}();mt.lang={};mt.lang.e=function(a,b){return"[object "+b+"]"==={}.toString.call(a)};mt.lang.ya=function(a){return mt.lang.e(a,"Number")&&isFinite(a)};mt.lang.Aa=function(a){return mt.lang.e(a,"String")};mt.localStorage={};
mt.localStorage.w=function(){if(!mt.localStorage.f)try{mt.localStorage.f=document.createElement("input"),mt.localStorage.f.type="hidden",mt.localStorage.f.style.display="none",mt.localStorage.f.addBehavior("#default#userData"),document.getElementsByTagName("head")[0].appendChild(mt.localStorage.f)}catch(a){return t}return p};
mt.localStorage.set=function(a,b,e){var d=new Date;d.setTime(d.getTime()+e||31536E6);try{window.localStorage?(b=d.getTime()+"|"+b,window.localStorage.setItem(a,b)):mt.localStorage.w()&&(mt.localStorage.f.expires=d.toUTCString(),mt.localStorage.f.load(document.location.hostname),mt.localStorage.f.setAttribute(a,b),mt.localStorage.f.save(document.location.hostname))}catch(k){}};
mt.localStorage.get=function(a){if(window.localStorage){if(a=window.localStorage.getItem(a)){var b=a.indexOf("|"),e=a.substring(0,b)-0;if(e&&e>(new Date).getTime())return a.substring(b+1)}}else if(mt.localStorage.w())try{return mt.localStorage.f.load(document.location.hostname),mt.localStorage.f.getAttribute(a)}catch(d){}return s};
mt.localStorage.remove=function(a){if(window.localStorage)window.localStorage.removeItem(a);else if(mt.localStorage.w())try{mt.localStorage.f.load(document.location.hostname),mt.localStorage.f.removeAttribute(a),mt.localStorage.f.save(document.location.hostname)}catch(b){}};mt.sessionStorage={};mt.sessionStorage.set=function(a,b){if(window.sessionStorage)try{window.sessionStorage.setItem(a,b)}catch(e){}};
mt.sessionStorage.get=function(a){return window.sessionStorage?window.sessionStorage.getItem(a):s};mt.sessionStorage.remove=function(a){window.sessionStorage&&window.sessionStorage.removeItem(a)};mt.I={};mt.I.log=function(a,b){var e=new Image,d="mini_tangram_log_"+Math.floor(2147483648*Math.random()).toString(36);window[d]=e;e.onload=e.onerror=e.onabort=function(){e.onload=e.onerror=e.onabort=s;e=window[d]=s;b&&b(a)};e.src=a};mt.t={};
mt.t.ca=function(){var a="";if(navigator.plugins&&navigator.mimeTypes.length){var b=navigator.plugins["Shockwave Flash"];b&&b.description&&(a=b.description.replace(/^.*\s+(\S+)\s+\S+$/,"$1"))}else if(window.ActiveXObject)try{if(b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a=b.GetVariable("$version"))&&(a=a.replace(/^.*\s+(\d+),(\d+).*$/,"$1.$2"))}catch(e){}return a};
mt.t.V=function(a,b,e,d,k){return'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="'+a+'" width="'+e+'" height="'+d+'"><param name="movie" value="'+b+'" /><param name="flashvars" value="'+(k||"")+'" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="'+a+'" width="'+e+'" height="'+d+'" src="'+b+'" flashvars="'+(k||"")+'" allowscriptaccess="always" /></object>'};mt.url={};
mt.url.k=function(a,b){var e=a.match(RegExp("(^|&|\\?|#)("+b+")=([^&#]*)(&|$|#)",""));return e?e[3]:s};mt.url.wa=function(a){return(a=a.match(/^(https?:)\/\//))?a[1]:s};mt.url.$=function(a){return(a=a.match(/^(https?:\/\/)?([^\/\?#]*)/))?a[2].replace(/.*@/,""):s};mt.url.K=function(a){return(a=mt.url.$(a))?a.replace(/:\d+$/,""):a};mt.url.va=function(a){return(a=a.match(/^(https?:\/\/)?[^\/]*(.*)/))?a[2].replace(/[\?#].*/,"").replace(/^$/,"/"):s};
h.z={ia:"http://tongji.baidu.com/hm-web/welcome/ico",P:"hm.baidu.com/hm.gif",S:"baidu.com",fa:"hmmd",ga:"hmpl",ea:"hmkw",da:"hmci",ha:"hmsr",l:0,g:Math.round(+new Date/1E3),protocol:"https:"==document.location.protocol?"https:":"http:",za:0,sa:6E5,ta:10,ua:1024,ra:1,r:2147483647,Q:"cc cf ci ck cl cm cp cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ")};
(function(){var a={i:{},d:function(a,e){this.i[a]=this.i[a]||[];this.i[a].push(e)},o:function(a,e){this.i[a]=this.i[a]||[];for(var d=this.i[a].length,k=0;k<d;k++)this.i[a][k](e)}};return h.p=a})();
(function(){function a(a,d){var k=document.createElement("script");k.charset="utf-8";b.e(d,"Function")&&(k.readyState?k.onreadystatechange=function(){if("loaded"===k.readyState||"complete"===k.readyState)k.onreadystatechange=s,d()}:k.onload=function(){d()});k.src=a;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(k,n)}var b=mt.lang;return h.load=a})();
(function(){var a=h.z,b=mt.t,e={init:function(){if(""!==c.icon){var d;d=c.icon.split("|");var e=a.ia+"?s="+c.id,n=("http:"==a.protocol?"http://eiv":"https://bs")+".baidu.com"+d[0]+"."+d[1];switch(d[1]){case "swf":d=b.V("HolmesIcon"+a.g,n,d[2],d[3],"s="+e);break;case "gif":d='<a href="'+e+'" target="_blank"><img border="0" src="'+n+'" width="'+d[2]+'" height="'+d[3]+'"></a>';break;default:d='<a href="'+e+'" target="_blank">'+d[0]+"</a>"}document.write(d)}}};h.p.d("pv-b",e.init);return e})();
(function(){function a(){return function(){h.b.a.nv=0;h.b.a.st=4;h.b.a.et=3;h.b.a.ep=h.A.aa()+","+h.A.Z();h.b.j()}}function b(){clearTimeout(x);var a;w&&(a="visible"==document[w]);y&&(a=!document[y]);f="undefined"==typeof a?p:a;if((!l||!m)&&f&&g)u=p,r=+new Date;else if(l&&m&&(!f||!g))u=t,q+=+new Date-r;l=f;m=g;x=setTimeout(b,100)}function e(a){var m=document,r="";if(a in m)r=a;else for(var d=["webkit","ms","moz","o"],q=0;q<d.length;q++){var g=d[q]+a.charAt(0).toUpperCase()+a.slice(1);if(g in m){r=
g;break}}return r}function d(a){if(!("focus"==a.type||"blur"==a.type)||!(a.target&&a.target!=window))g="focus"==a.type||"focusin"==a.type?p:t,b()}var k=mt.event,n=h.p,l=p,f=p,m=p,g=p,v=+new Date,r=v,q=0,u=p,w=e("visibilityState"),y=e("hidden"),x;b();(function(){var a=w.replace(/[vV]isibilityState/,"visibilitychange");k.d(document,a,b);k.d(window,"pageshow",b);k.d(window,"pagehide",b);"object"==typeof document.onfocusin?(k.d(document,"focusin",d),k.d(document,"focusout",d)):(k.d(window,"focus",d),
k.d(window,"blur",d))})();h.A={aa:function(){return+new Date-v},Z:function(){return u?+new Date-r+q:q}};n.d("pv-b",function(){k.d(window,"unload",a())});return h.A})();
(function(){function a(m){for(var g in m)if({}.hasOwnProperty.call(m,g)){var f=m[g];d.e(f,"Object")||d.e(f,"Array")?a(f):m[g]=String(f)}}function b(a){return a.replace?a.replace(/'/g,"'0").replace(/\*/g,"'1").replace(/!/g,"'2"):a}var e=mt.I,d=mt.lang,k=mt.m,n=h.z,l=h.p,f={L:s,n:[],s:0,M:t,init:function(){f.c=0;f.L={push:function(){f.G.apply(f,arguments)}};l.d("pv-b",function(){f.W();f.X()});l.d("pv-d",f.Y);l.d("stag-b",function(){h.b.a.api=f.c||f.s?f.c+"_"+f.s:""});l.d("stag-d",function(){h.b.a.api=
0;f.c=0;f.s=0})},W:function(){var a=window._hmt;if(a&&a.length)for(var d=0;d<a.length;d++){var b=a[d];switch(b[0]){case "_setAccount":1<b.length&&/^[0-9a-z]{32}$/.test(b[1])&&(f.c|=1,window._bdhm_account=b[1]);break;case "_setAutoPageview":if(1<b.length&&(b=b[1],t===b||p===b))f.c|=2,window._bdhm_autoPageview=b}}},X:function(){if("undefined"===typeof window._bdhm_account||window._bdhm_account===c.id){window._bdhm_account=c.id;var a=window._hmt;if(a&&a.length)for(var b=0,e=a.length;b<e;b++)d.e(a[b],
"Array")&&"_trackEvent"!==a[b][0]&&"_trackRTEvent"!==a[b][0]?f.G(a[b]):f.n.push(a[b]);window._hmt=f.L}},Y:function(){if(0<f.n.length)for(var a=0,d=f.n.length;a<d;a++)f.G(f.n[a]);f.n=s},G:function(a){if(d.e(a,"Array")){var b=a[0];if(f.hasOwnProperty(b)&&d.e(f[b],"Function"))f[b](a)}},_trackPageview:function(a){if(1<a.length&&a[1].charAt&&"/"==a[1].charAt(0)){f.c|=4;h.b.a.et=0;h.b.a.ep="";h.b.D?(h.b.a.nv=0,h.b.a.st=4):h.b.D=p;var d=h.b.a.u,b=h.b.a.su;h.b.a.u=n.protocol+"//"+document.location.host+a[1];
f.M||(h.b.a.su=document.location.href);h.b.j();h.b.a.u=d;h.b.a.su=b}},_trackEvent:function(a){2<a.length&&(f.c|=8,h.b.a.nv=0,h.b.a.st=4,h.b.a.et=4,h.b.a.ep=b(a[1])+"*"+b(a[2])+(a[3]?"*"+b(a[3]):"")+(a[4]?"*"+b(a[4]):""),h.b.j())},_setCustomVar:function(a){if(!(4>a.length)){var d=a[1],e=a[4]||3;if(0<d&&6>d&&0<e&&4>e){f.s++;for(var r=(h.b.a.cv||"*").split("!"),q=r.length;q<d-1;q++)r.push("*");r[d-1]=e+"*"+b(a[2])+"*"+b(a[3]);h.b.a.cv=r.join("!");a=h.b.a.cv.replace(/[^1](\*[^!]*){2}/g,"*").replace(/((^|!)\*)+$/g,
"");""!==a?h.b.setData("Hm_cv_"+c.id,encodeURIComponent(a),c.age):h.b.ka("Hm_cv_"+c.id)}}},_setReferrerOverride:function(a){1<a.length&&(h.b.a.su=a[1].charAt&&"/"==a[1].charAt(0)?n.protocol+"//"+window.location.host+a[1]:a[1],f.M=p)},_trackOrder:function(b){b=b[1];d.e(b,"Object")&&(a(b),f.c|=16,h.b.a.nv=0,h.b.a.st=4,h.b.a.et=94,h.b.a.ep=k.stringify(b),h.b.j())},_trackMobConv:function(a){if(a={webim:1,tel:2,map:3,sms:4,callback:5,share:6}[a[1]])f.c|=32,h.b.a.et=93,h.b.a.ep=a,h.b.j()},_trackRTPageview:function(b){b=
b[1];d.e(b,"Object")&&(a(b),b=k.stringify(b),512>=encodeURIComponent(b).length&&(f.c|=64,h.b.a.rt=b))},_trackRTEvent:function(b){b=b[1];if(d.e(b,"Object")){a(b);b=encodeURIComponent(k.stringify(b));var e=function(a){var b=h.b.a.rt;f.c|=128;h.b.a.et=90;h.b.a.rt=a;h.b.j();h.b.a.rt=b},l=b.length;if(900>=l)e.call(this,b);else for(var l=Math.ceil(l/900),r="block|"+Math.round(Math.random()*n.r).toString(16)+"|"+l+"|",q=[],u=0;u<l;u++)q.push(u),q.push(b.substring(900*u,900*u+900)),e.call(this,r+q.join("|")),
q=[]}},_setUserId:function(a){a=a[1];if(d.e(a,"String")||d.e(a,"Number")){var b=h.b.C(),k="hm-"+h.b.a.v;f.O=f.O||Math.round(Math.random()*n.r);e.log("//datax.baidu.com/x.gif?si="+c.id+"&dm="+encodeURIComponent(b)+"&ac="+encodeURIComponent(a)+"&v="+k+"&li="+f.O+"&rnd="+Math.round(Math.random()*n.r))}}};f.init();h.T=f;return h.T})();
(function(){function a(){"undefined"==typeof window["_bdhm_loaded_"+c.id]&&(window["_bdhm_loaded_"+c.id]=p,this.a={},this.D=t,this.init())}var b=mt.url,e=mt.I,d=mt.t,k=mt.lang,n=mt.cookie,l=mt.h,f=mt.localStorage,m=mt.sessionStorage,g=h.z,v=h.p;a.prototype={F:function(a,b){a="."+a.replace(/:\d+/,"");b="."+b.replace(/:\d+/,"");var d=a.indexOf(b);return-1<d&&d+b.length==a.length},N:function(a,b){a=a.replace(/^https?:\/\//,"");return 0===a.indexOf(b)},q:function(a){for(var d=0;d<c.dm.length;d++)if(-1<
c.dm[d].indexOf("/")){if(this.N(a,c.dm[d]))return p}else{var e=b.K(a);if(e&&this.F(e,c.dm[d]))return p}return t},C:function(){for(var a=document.location.hostname,b=0,d=c.dm.length;b<d;b++)if(this.F(a,c.dm[b]))return c.dm[b].replace(/(:\d+)?[\/\?#].*/,"");return a},J:function(){for(var a=0,b=c.dm.length;a<b;a++){var d=c.dm[a];if(-1<d.indexOf("/")&&this.N(document.location.href,d))return d.replace(/^[^\/]+(\/.*)/,"$1")+"/"}return"/"},ba:function(){if(!document.referrer)return g.g-g.l>c.vdur?1:4;var a=
t;this.q(document.referrer)&&this.q(document.location.href)?a=p:(a=b.K(document.referrer),a=this.F(a||"",document.location.hostname));return a?g.g-g.l>c.vdur?1:4:3},getData:function(a){try{return n.get(a)||m.get(a)||f.get(a)}catch(b){}},setData:function(a,b,d){try{n.set(a,b,{domain:this.C(),path:this.J(),B:d}),d?f.set(a,b,d):m.set(a,b)}catch(e){}},ka:function(a){try{n.set(a,"",{domain:this.C(),path:this.J(),B:-1}),m.remove(a),f.remove(a)}catch(b){}},pa:function(){var a,b,d,e,f;g.l=this.getData("Hm_lpvt_"+
c.id)||0;13==g.l.length&&(g.l=Math.round(g.l/1E3));b=this.ba();a=4!=b?1:0;if(d=this.getData("Hm_lvt_"+c.id)){e=d.split(",");for(f=e.length-1;0<=f;f--)13==e[f].length&&(e[f]=""+Math.round(e[f]/1E3));for(;2592E3<g.g-e[0];)e.shift();f=4>e.length?2:3;for(1===a&&e.push(g.g);4<e.length;)e.shift();d=e.join(",");e=e[e.length-1]}else d=g.g,e="",f=1;this.setData("Hm_lvt_"+c.id,d,c.age);this.setData("Hm_lpvt_"+c.id,g.g);d=g.g==this.getData("Hm_lpvt_"+c.id)?"1":"0";if(0===c.nv&&this.q(document.location.href)&&
(""===document.referrer||this.q(document.referrer)))a=0,b=4;this.a.nv=a;this.a.st=b;this.a.cc=d;this.a.lt=e;this.a.lv=f},oa:function(){for(var a=[],b=0,d=g.Q.length;b<d;b++){var e=g.Q[b],f=this.a[e];"undefined"!=typeof f&&""!==f&&a.push(e+"="+encodeURIComponent(f))}b=this.a.et;this.a.rt&&(0===b?a.push("rt="+encodeURIComponent(this.a.rt)):90===b&&a.push("rt="+this.a.rt));return a.join("&")},qa:function(){this.pa();this.a.si=c.id;this.a.su=document.referrer;this.a.ds=l.la;this.a.cl=l.colorDepth+"-bit";
this.a.ln=l.language;this.a.ja=l.javaEnabled?1:0;this.a.ck=l.cookieEnabled?1:0;this.a.lo="number"==typeof _bdhm_top?1:0;this.a.fl=d.ca();this.a.v="1.0.70";this.a.cv=decodeURIComponent(this.getData("Hm_cv_"+c.id)||"");1==this.a.nv&&(this.a.tt=document.title||"");var a=document.location.href;this.a.cm=b.k(a,g.fa)||"";this.a.cp=b.k(a,g.ga)||"";this.a.cw=b.k(a,g.ea)||"";this.a.ci=b.k(a,g.da)||"";this.a.cf=b.k(a,g.ha)||""},init:function(){try{this.qa(),0===this.a.nv?this.na():this.H(".*"),h.b=this,this.U(),
v.o("pv-b"),this.ma()}catch(a){var b=[];b.push("si="+c.id);b.push("n="+encodeURIComponent(a.name));b.push("m="+encodeURIComponent(a.message));b.push("r="+encodeURIComponent(document.referrer));e.log(g.protocol+"//"+g.P+"?"+b.join("&"))}},ma:function(){function a(){v.o("pv-d")}"undefined"===typeof window._bdhm_autoPageview||window._bdhm_autoPageview===p?(this.D=p,this.a.et=0,this.a.ep="",this.j(a)):a()},j:function(a){var b=this;b.a.rnd=Math.round(Math.random()*g.r);v.o("stag-b");var d=g.protocol+"//"+
g.P+"?"+b.oa();v.o("stag-d");b.R(d);e.log(d,function(d){b.H(d);k.e(a,"Function")&&a.call(b)})},U:function(){var a=document.location.hash.substring(1),d=RegExp(c.id),e=-1<document.referrer.indexOf(g.S)?p:t,f=b.k(a,"jn"),k=/^heatlink$|^select$/.test(f);a&&(d.test(a)&&e&&k)&&(a=document.createElement("script"),a.setAttribute("type","text/javascript"),a.setAttribute("charset","utf-8"),a.setAttribute("src",g.protocol+"//"+c.js+f+".js?"+this.a.rnd),f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(a,
f))},R:function(a){var b=m.get("Hm_unsent_"+c.id)||"",d=this.a.u?"":"&u="+encodeURIComponent(document.location.href),b=encodeURIComponent(a.replace(/^https?:\/\//,"")+d)+(b?","+b:"");m.set("Hm_unsent_"+c.id,b)},H:function(a){var b=m.get("Hm_unsent_"+c.id)||"";b&&((b=b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//,"")).replace(/([\*\(\)])/g,"\\$1")+"(%26u%3D[^,]*)?,?","g"),"").replace(/,$/,""))?m.set("Hm_unsent_"+c.id,b):m.remove("Hm_unsent_"+c.id))},na:function(){var a=this,b=m.get("Hm_unsent_"+
c.id);if(b)for(var b=b.split(","),d=function(b){e.log(g.protocol+"//"+decodeURIComponent(b).replace(/^https?:\/\//,""),function(b){a.H(b)})},f=0,k=b.length;f<k;f++)d(b[f])}};return new a})();})();
