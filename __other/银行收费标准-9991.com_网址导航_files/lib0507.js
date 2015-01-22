var ready_=false,isIE = /*@cc_on!@*/!1,main = domain();
document.domain=main.replace("www.","");
function $(_id){
	return document.getElementById(_id);
}
function $c(_tag){
	return document.createElement(_tag);
}
function $t(_tag){var _doc = arguments[1]||document;return _doc.getElementsByTagName(_tag)}
function domain(){search_=location.search;var _host=location.host,_pos=_host.indexOf(":");return(_pos==-1)?_host:_host.substring(0,_pos)}
em=$;
function get_skin() {//	 hd('mu')
//cook=GetCookie('skin')
cook = g_cookie('skin');
if(cook!=null) em('sklink').href="/css/sk_"+cook+".css"
else em('sklink').href="/css/sk_1.css"
}
function hd(e) { em(e).style.display='none' }
function ssk(a) {
	em('sklink').href="/css/sk_"+a+".css"
	exp=new Date();
	exp.setTime(exp.getTime()+5184000000);
	SetCookie('skin',a,exp,'/','2345.com')
}
function GetCookieVal(offset)
{
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}
function SetCookie(name, value)
{
var expdate = new Date();
var argv = SetCookie.arguments;
var argc = SetCookie.arguments.length;
var expires = (argc > 2) ? argv[2] : null;
var path = (argc > 3) ? argv[3] : null;
var domain = (argc > 4) ? argv[4] : null;
var secure = (argc > 5) ? argv[5] : false;
if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 1000 ))
document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
+((secure == true) ? "; secure" : "");
}
function GetCookie(name)
{var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen)
{var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return GetCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}return null;}

function g_cookie(_name){
	var returnVal = storeUtil.get(_name,arguments[1]);
	if(returnVal||returnVal==""){
		return returnVal;
	}else{
		return cookieStore.get(_name);
	}
}
//store
var storeUtil = {
	_init:false,
	init:function(){
			var _force = arguments[0],_store;
			if(!_force){
				if(isIE){
					_store = ieStore;
				}else if(window.globalStorage){
					_store = mozillaStore;
				}else{
					_store = cookieStore;
				}
			}else{
				switch(_force){
					case "ie":
						_store = ieStore;
						break;
					case "ff":
						_store = mozillaStore;
						break;
					case "cookie":
					default:
						_store = cookieStore;
				}
			}
			//alert(_store);
			this.store = _store.init();
			this._init=this.store.isInit()?true:false;
			return this.isInit();
		},
	get:function(_name){
			var _store = arguments[1]||this.store;
			return _store.get(_name);
		},
	set:function(_para){
			var _store = _para.store||this.store;
			_store.set(_para);
		},
	del:function(_name){
			var _store = arguments[1]||this.store;
			_store.del(_name);
		},
	isInit:function(){return this._init;}
},ieStore={
	exps:180,//days
	_init:false,
	init:function(){
			if(!this.isInit()&&!$("_ieStore")){
				this.store = $c("INPUT"),
				this.store.type = "hidden",
				this.store.id = "_ieStore",
				this.store.addBehavior("#default#userData");
				document.body.appendChild(this.store);
				this._init = true;
			}else if($("_ieStore")){
				this.store = $("_ieStore");
				this._init = true;
			}
			return this;
		},
	get:function(_name){
			this.store.load(_name);
			return this.store.getAttribute("__store__")||null;
		},
	set:function(_para){
			var _name = _para.name,_val = _para.val,_exps = typeof(_para.exps)!="undefined"?_para.exps:this.exps;
			var _last = new Date();
			//alert(_exps);
			_last.setDate(_last.getDate()+_exps);
			this.store.load(_name);
			//alert(_last);
			this.store.expires = _last.toUTCString();
			this.store.setAttribute("__store__",_val);
			this.store.save(_name);
		},
	del:function(_name){
			this.set({name:_name},false,-1);
		},
	isInit:function(){return this._init;}
},mozillaStore={
	_init:false,
	init:function(){this._domain=main.replace("www.","");this._init=true;return this;},
	get:function(_name){return window.globalStorage[this._domain].getItem(_name)||null},
	set:function(_para){window.globalStorage[this._domain].setItem(_para.name,_para.val)},
	del:function(){window.globalStorage[this._domain].removeItem(_name)},
	isInit:function(){return this._init;}
},cookieStore={
	_init:false,
	_exps:180,//days
	_secure:"",//secure val:";secure"
	init:function(){if(!this.isInit()){this._domain=main.replace("www.","");this._init=true;};return this;},
	get:function(_name){
		var _cookies=document.cookie.split("; "),_name=_name+"=";
		for(var _i=0,_len=_cookies.length;_i<_len;_i++){
			if(_cookies[_i].indexOf(_name)!="-1"){
				try{
					return decodeURIComponent(_cookies[_i].replace(_name,""));
				}catch(e){
					return unescape(_cookies[_i].replace(_name,""));
				}
			}
		}
		return null;
	},
	set:function(_para){
		var _last = new Date();
		var _name = _para.name,_val = _para.val,_exps = typeof(_para.exps)!="undefined"?_para.exps:this._exps,_domain = _para.domain||this._domain,_path = _para.path||"/",_secure=_para.secure||this._secure;
		_last.setDate(_last.getDate()+_exps);
		var _cookieVal = _name+"="+escape(_val)+(_exps?";expires="+_last.toUTCString():"")+(_path?";path="+_path:"")+(_domain?";domain="+_domain:"")+(_secure?";secure=":"");
		document.cookie = _cookieVal;
	},
	del:function(_para){
		if(String.prototype.toLowerCase.apply(typeof(_para)) == "string"){
			_name = _para;
			_para = {name:_name,val:""}
		}
		_para.exps = -1;
		_para.secure = "";
		this.set(_para);
	},
	isInit:function(){return this._init;}
};
document.onready=function(){if(ready_){return};ready_=true;storeUtil.init();get_skin()/*alert(g_cookie("sts"))*/};
function bindReady(){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",function(){document.removeEventListener( "DOMContentLoaded",arguments.callee,false);document.onready()},false);
 	}else if(document.attachEvent){
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState === "complete"){
    			document.detachEvent("onreadystatechange",arguments.callee);
    			document.onready();
			}
		});
  		if(document.documentElement.doScroll && window == window.top)(function(){if(ready_)return;
   			try{
    			document.documentElement.doScroll("left");
   			}catch(e){
				setTimeout(arguments.callee,0);
    			return;
			}
			document.onready();
		})();
	}
}
bindReady();
document.writeln("<base target=\"_blank\">");
//document.writeln("<script language=\"javascript\">get_skin()<\/script>")