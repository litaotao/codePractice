var sitevisitlen=0,maxvisit=8;
document.onclick = function(e)//兼容IE,FF,OPERA
{
	e = window.event || e;
	sE = e.srcElement || e.target;
	var isNotImg = true;
	var inner = "";
	var linkWithImg = false;
	if(sE.tagName=="IMG"||sE.tagName=="A"||sE.tagName=="AREA")
	{
		if(sE.tagName=="IMG" && sE.src != "")
		{
			sE = sE.parentNode;
			isNotImg = false;
			inner = sE.innerHTML;
			
			inner = inner.replace(/<.*?>/g,"");
			inner = inner.replace(/(^\s*)|(\s*$)/g, "");
			if(inner.length > 0)
			{
				linkWithImg = true;
			}
		}
		if(sE.tagName=="A" && sE.href != "")
		{
			inner = sE.innerHTML;
			inner = inner.replace(/<.*?>/g,"")
			inner = inner.replace(/(^\s*)|(\s*$)/g, "");
			if(inner.length > 0 && inner != sE.innerHtml)
			{
				linkWithImg = true;
			}
		}
		if( (sE.tagName == "A"||sE.tagName == "AREA") && sE.href != "" )
		{
			clickCount(sE.href);
			if(linkWithImg)
			{
				visit(sE.href,inner,sE.name); return;
			}
			if(isNotImg)visit(sE.href,sE.innerHTML,sE.name);
			//alert(sE.href);
		}
	}
}
//获取通用对象
function getObj(id)
{
	if(document.getElementById)
	{
		return document.getElementById(id);
	}
	else if(document.all)
	{
		return document.all[id];
	}
	else if(document.layers)
	{
		return document.layers[id];
	}
}
//统计
function clickCount( vUrl )
{
	//唯一访客检查
	var a2;
	i1=document.cookie.indexOf('uUiD=');
	if(i1!=-1)
	{
		i2=document.cookie.indexOf(';',i1);
		if(i2!=-1)
		{
			a2=document.cookie.substring(i1+5,i2);
		}
		else
		{
			a2=document.cookie.substr(i1+5);
		}
	}
	if(a2 == undefined)
	{
		a2 = Math.floor(Math.random()*100000)+''+new Date().getTime()+Math.floor(Math.random()*100000);
		document.cookie = 'uUiD='+a2+';expires=Thu, 21 Sep 2096 10:37:29 GMT; path=/';
	}
	//url组合
	var url = 'http://union2.50bang.org/web/ajax4?uId2=SPTNPQRLSX&uId='+a2+'&agt='+navigator.userAgent+'&r='+encodeURIComponent(document.referrer)+'&aN='+navigator.appName+'&lg='+navigator.systemLanguage+'&OS='+navigator.platform+'&aV='+navigator.appVersion+'&fBL='+screen.width+'*'+screen.height+'&lO='+encodeURIComponent(vUrl)+'?nytjsplit='+encodeURIComponent(location.href);
  var _dh = document.createElement('script');
  _dh.setAttribute('type','text/javascript');
  _dh.setAttribute('src',url);
  document.getElementsByTagName('head')[0].appendChild(_dh);
	return true;
}
function ss(arrs){var str='';for(i in arrs)str +=arrs[i]+",";return str}
function visit(url,txt,v)
{
	return false;
    if(typeof window.localStorage == 'undefined')return;
    if(v)return;
	if(sitevisitlen>=maxvisit)return;
	if(g_cookie('siteon'))
	{
		if(g_cookie('siteon').toString())return;
	}
	regz = /^javascript.*/i;
	regz2 = /.*2345.com.*/i;
    regz3 = /\bhttps?:\/\/.*/i;
	if(txt==''||regz.test(url)||regz2.test(url)||!regz3.test(url))return;
    site_visit = localStorage.getItem('site_str');
    if(!site_visit){
        site_visit=g_cookie('site_str',cookieStore);
        if(site_visit&&site_visit!='false'){
            localStorage.setItem('site_str', site_visit);
        }
    }
    if(g_cookie("site_str",cookieStore)!=null){
        s_cookie("site_str",'');
        s_cookie({store:"cookie"},"site_str",'',-1);
    }
	sitearay=[];
	sitearay_new=[];
	site_v_c=0;
	site_xh=null;
	var nowDate=new Date();
	var nowDate2=new Date();
	var newExpiresTime = nowDate.setDate(nowDate.getDate()+3);
	var minExpTime = nowDate2.setDate(nowDate2.getDate()+0);
	var thNO = null;
	if(site_visit&&site_visit!="null")
	{
		sitearay = site_visit.split(",");
		site_v_c = sitearay.length-1;

		for(i=0;i<site_v_c;i++)
		{
			rowd=sitearay[i].split("^^");
            if(rowd[0]==url){
               if(rowd[4]==1){
			   sitearay[i] = rowd[0]+'^^'+rowd[1]+'^^'+rowd[2]+'^^'+newExpiresTime+'^^'+1;
               }else{
			   sitearay[i] = rowd[0]+'^^'+rowd[1]+'^^'+rowd[2];
               }
			   sitearay.pop();
               localStorage.setItem('site_str', ss(sitearay));
	           mysetNeedFlush = true;
			   return;
			}
		}
		site_xh = parseInt(rowd[2]);
		if (site_v_c >= maxvisit) {
			for(i=0;i<site_v_c;i++)
		    {
			   row_exp=sitearay[i].split("^^");
               if(row_exp[4]==1 && row_exp[3]<=minExpTime){
			      minExpTime = row_exp[3];
				  thNO = i;
			   }
			}
			if(thNO!=null){
			    sitearay.splice(thNO,1);
			}else{
			   return;
			}
		}
	}
	if(site_xh==null)
	{
		site_xh=0;
	}
	txt = txt.replace(/ |　/g,'');
	txt = subs(txt,12);
	ssturl = url+'^^'+txt+'^^'+(site_xh+1)+'^^'+newExpiresTime+'^^'+1;
	sitearay.pop();
    sitearay_new = sitearay;
	sitearay_new.push(ssturl);
    localStorage.setItem('site_str', ss(sitearay_new));
}
function getcdsvisit()
{
    if(typeof window.localStorage == 'undefined')return;
    var site_str = localStorage.getItem('site_str');
	if(site_str)
	{
		rows=site_str.toString().split(",");
		var con="",len=(rows.length)-1;
		len=len>13?12:len;
		sitevisitlen = len;
	}
}
function subs(_str,_len){
	var _l=0,_out="",_out_bak="";
	for(var _i=0;_i<_str.length;_i++){
		(_str.charCodeAt(_i)>128)?_l+=2:_l++;
		_out_bak = _out;
		_out += _str.charAt(_i);
		if(_l==_len)return _out;
		if(_l>_len)return _out_bak;
	}
	return _out;
}