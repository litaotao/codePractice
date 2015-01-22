<!--
var DedeXHTTP=null;var DedeXDOM=null;var DedeContainer=null;var DedeShowError=false;var DedeShowWait=false;var DedeErrCon="";var DedeErrDisplay="下载数据失败";var DedeWaitDisplay="正在下载数据...";function $DE(id){return document.getElementById(id);}
function DedeAjax(gcontainer,mShowError,mShowWait,mErrCon,mErrDisplay,mWaitDisplay)
{DedeContainer=gcontainer;DedeShowError=mShowError;DedeShowWait=mShowWait;if(mErrCon!="")DedeErrCon=mErrCon;if(mErrDisplay!="")DedeErrDisplay=mErrDisplay;if(mErrDisplay=="x")DedeErrDisplay="";if(mWaitDisplay!="")DedeWaitDisplay=mWaitDisplay;this.keys=Array();this.values=Array();this.keyCount=-1;this.sendlang='gb2312';this.rtype='text';if(window.ActiveXObject){try{DedeXHTTP=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){}
if(DedeXHTTP==null)try{DedeXHTTP=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}
else{DedeXHTTP=new XMLHttpRequest();}
this.AddKeyN=function(skey,svalue){if(this.sendlang=='utf-8')this.AddKeyUtf8(skey,svalue);else this.AddKey(skey,svalue);};this.AddKey=function(skey,svalue){this.keyCount++;this.keys[this.keyCount]=skey;svalue=svalue+'';if(svalue!='')svalue=svalue.replace(/\+/g,'$#$');this.values[this.keyCount]=escape(svalue);};this.AddKeyUtf8=function(skey,svalue){this.keyCount++;this.keys[this.keyCount]=skey;svalue=svalue+'';if(svalue!='')svalue=svalue.replace(/\+/g,'$#$');this.values[this.keyCount]=encodeURI(svalue);};this.AddHead=function(skey,svalue){this.rkeyCount++;this.rkeys[this.rkeyCount]=skey;this.rvalues[this.rkeyCount]=svalue;};this.ClearSet=function(){this.keyCount=-1;this.keys=Array();this.values=Array();this.rkeyCount=-1;this.rkeys=Array();this.rvalues=Array();};DedeXHTTP.onreadystatechange=function(){if(DedeXHTTP.readyState==4){if(DedeXHTTP.status==200)
{if(DedeXHTTP.responseText!=DedeErrCon){DedeContainer.innerHTML=DedeXHTTP.responseText;}
else{if(DedeShowError)DedeContainer.innerHTML=DedeErrDisplay;}
DedeXHTTP=null;}
else{if(DedeShowError)DedeContainer.innerHTML=DedeErrDisplay;}}
else{if(DedeShowWait)DedeContainer.innerHTML=DedeWaitDisplay;}};this.BarrageStat=function(){if(DedeXHTTP==null)return;if(typeof(DedeXHTTP.status)!=undefined&&DedeXHTTP.status==200)
{if(DedeXHTTP.responseText!=DedeErrCon){DedeContainer.innerHTML=DedeXHTTP.responseText;}
else{if(DedeShowError)DedeContainer.innerHTML=DedeErrDisplay;}}};this.SendHead=function()
{if(this.rkeyCount!=-1)
{for(var i=0;i<=this.rkeyCount;i++)
{DedeXHTTP.setRequestHeader(this.rkeys[i],this.rvalues[i]);}}
　if(this.rtype=='binary'){　DedeXHTTP.setRequestHeader("Content-Type","multipart/form-data");}else{DedeXHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}};this.SendPost=function(purl){var pdata="";var i=0;this.state=0;DedeXHTTP.open("POST",purl,true);this.SendHead();if(this.keyCount!=-1)
{for(;i<=this.keyCount;i++)
{if(pdata=="")pdata=this.keys[i]+'='+this.values[i];else pdata+="&"+this.keys[i]+'='+this.values[i];}}
DedeXHTTP.send(pdata);};this.SendGet=function(purl){var gkey="";var i=0;this.state=0;if(this.keyCount!=-1)
{for(;i<=this.keyCount;i++)
{if(gkey=="")gkey=this.keys[i]+'='+this.values[i];else gkey+="&"+this.keys[i]+'='+this.values[i];}
if(purl.indexOf('?')==-1)purl=purl+'?'+gkey;else purl=purl+'&'+gkey;}
DedeXHTTP.open("GET",purl,true);this.SendHead();DedeXHTTP.send(null);};this.SendGet2=function(purl){var gkey="";var i=0;this.state=0;if(this.keyCount!=-1)
{for(;i<=this.keyCount;i++)
{if(gkey=="")gkey=this.keys[i]+'='+this.values[i];else gkey+="&"+this.keys[i]+'='+this.values[i];}
if(purl.indexOf('?')==-1)purl=purl+'?'+gkey;else purl=purl+'&'+gkey;}
DedeXHTTP.open("GET",purl,false);this.SendHead();DedeXHTTP.send(null);this.BarrageStat();};this.SendPost2=function(purl){var pdata="";var i=0;this.state=0;DedeXHTTP.open("POST",purl,false);this.SendHead();if(this.keyCount!=-1)
{for(;i<=this.keyCount;i++)
{if(pdata=="")pdata=this.keys[i]+'='+this.values[i];else pdata+="&"+this.keys[i]+'='+this.values[i];}}
DedeXHTTP.send(pdata);this.BarrageStat();};}
function InitXDom(){if(DedeXDOM!=null)return;var obj=null;if(typeof(DOMParser)!="undefined"){var parser=new DOMParser();obj=parser.parseFromString(xmlText,"text/xml");}
else{try{obj=new ActiveXObject("MSXML2.DOMDocument");}catch(e){}
if(obj==null)try{obj=new ActiveXObject("Microsoft.XMLDOM");}catch(e){}}
DedeXDOM=obj;};function GetCookie(c_name)
{if(document.cookie.length>0)
{c_start=document.cookie.indexOf(c_name+"=")
if(c_start!=-1)
{c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)
{c_end=document.cookie.length;}
return unescape(document.cookie.substring(c_start,c_end));}}
return null}
function SetCookie(c_name,value,expiredays)
{var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);document.cookie=c_name+"="+escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString());}
-->