// JavaScript Document
var ie = (function () {
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );
    return v > 4 ? v : undef;

} ());

function showdel(show,cmtid)
{
    if(document.getElementById('SpanDel_'+cmtid)!=null)
    {
        if(show)
        {
           document.getElementById('SpanDel_'+cmtid).style.display="";
        }
        else
        {
          document.getElementById('SpanDel_'+cmtid).style.display="none";
        }
    }
}

function getObject(objectId) {
	if(document.getElementById && document.getElementById(objectId)) {
		// w3c dom
		return document.getElementById(objectId);
	} else if (document.all && document.all(objectId)) {
		// msie 4 dom
		return document.all(objectId);
	} else if (document.layers && document.layers[objectId]) {
		// nn 4 dom.. note: this won't find nested layers
		return document.layers[objectId];
	} else {
		return false;
	}
}

/*我的首页弹出 menu js*/
function isMatch(str1,str2) {  
	var index = str1.indexOf(str2); 
	if(index==-1) return false; 
	return true; 
	} 
function ResumeError() { 
	return true; 
} 
//window.onerror = ResumeError; 
function menu(id) {
	return document.getElementById(id);
}// 相对尺寸
function GetOffsetTop (el, p) {
	var _t = el.offsetTop;
	var _p = el.offsetParent;
	while (_p) {
	if (_p == p) break;
		_t += _p.offsetTop;
		_p = _p.offsetParent;
	}
	return _t;
};
function GetOffsetLeft (el, p) {
	var _l = el.offsetLeft;
	var _p = el.offsetParent;
	while (_p) {
	if (_p == p) break;
		_l += _p.offsetLeft;
		_p = _p.offsetParent;
	}
	return _l;
};
function showMenu (baseID, divID) {
	baseID = menu(baseID);
	divID  = menu(divID);
	if (showMenu.timer) clearTimeout(showMenu.timer);
	hideCur();
	divID.style.display = 'block';
	showMenu.cur = divID;
	if (! divID.isCreate) {
		divID.isCreate = true;
		divID.onmouseover = function () {
		if (showMenu.timer) clearTimeout(showMenu.timer);
		hideCur();
		divID.style.display = 'block';
		};
		function hide () {
		showMenu.timer = setTimeout(function () {divID.style.display = 'none';}, 10);
		}
		divID.onmouseout = hide;
		baseID.onmouseout = hide;
	}
	function hideCur () {
	showMenu.cur && (showMenu.cur.style.display = 'none');
	}
}
/*首页blog切换*/
function blogTab1(n){
	for(var i=1;i<=4;i++){
		if(i==n){
			if (i==1){
				getObject("li"+i).className="blogbg1";
			}else if (i==2){ 
				getObject("li"+i).className="blogbg2";
			}else if (i==3){ 
				getObject("li"+i).className="blogbg3";
			}else if (i==4){ 
				getObject("li"+i).className="blogbg4";
			}
				getObject("blogteam_"+i).className="blogcon";
			}else{		
				if (i==1){ 
					getObject("li"+i).className="blogbg11";
			}else if (i==2){
					getObject("li"+i).className="blogbg22";
			}else if (i==3){
					getObject("li"+i).className="blogbg33";
			}else if (i==4){
					getObject("li"+i).className="blogbg44";
			}	
			getObject("blogteam_"+i).className="hidden";
		}
	}
}
/*首页右侧更多显示隐藏*/
function collapse(objImg,objId){
	var obj = document.getElementById(objId);
	if(objImg && obj){
	   if(objImg.src.toString().indexOf('open')>-1){
		   objImg.src=objImg.src.toString().replace('iconopen','iconclose');
		   objImg.title='显示';
		   obj.style.display='none';
	   }
	   else if(objImg.src.toString().indexOf('close')>-1){
		   objImg.src=objImg.src.toString().replace('iconclose','iconopen');
		   objImg.title='隐藏';
		   obj.style.display='';
	   }
	}
}
/*首页显示评论*/
function T(i){
	var ob=document.getElementById(i);  
	if(ob.style.display=="block"){
		ob.style.display="none";
		var ob2=document.getElementById('c'+i);
	}
	else
	{
		ob.style.display="block";
		var ob2=document.getElementById('c'+i);
	}
}
var RecordL="";
function TC(i,obj)
{
   var ob=document.getElementById('t1_'+i);
   var txtobj= document.getElementById('commentTwo_'+i);
   var hidobj= document.getElementById('hidcmt_'+i);
   var curcommentID=obj.getAttribute('commentID');
   var curUserName= obj.getAttribute('curUserName');
   var commentBtn=E("commentBtnTwo_"+i);
   if(commentBtn!=null)
   {
        commentBtn.value="回复";
        commentBtn.disabled=false;
        commentBtn.style.background = "transparent url(/images/common/btn43_23.gif) no-repeat scroll 0 0";
   }
   if(ob.style.display=="block")
   {
   
        if(curcommentID==hidobj.value)
        {
		    ob.style.display="none";
		    txtobj.value="";
		    hidobj.value="";
		    RecordL="";
		}
		else
		{
		     txtobj.value="回复@"+curUserName+" ：";
		     RecordL="回复@"+curUserName+" ：";
	         hidobj.value=curcommentID;
        		
		     var ua = navigator.userAgent.toLowerCase();
             var IE = /msie/.test(ua);
             if(IE)
             {
                 txtobj.focus();
                 var rng = txtobj.createTextRange(); 
                 rng.moveStart("character",txtobj.value.length);
                 rng.collapse(true); 
                 rng.select(); 
             }
             else
             {   
                 txtobj.focus();
             }
		}
		
	}
	else
	{   
	    ob.style.display="block";
	    txtobj.value="回复@"+curUserName+" ：";
	    RecordL="回复@"+curUserName+" ：";
	    hidobj.value=curcommentID;
		
		var ua = navigator.userAgent.toLowerCase();
        var IE = /msie/.test(ua);
        if(IE)
        {
             txtobj.focus();
             var rng = txtobj.createTextRange(); 
             rng.moveStart("character",txtobj.value.length);
             rng.collapse(true); 
             rng.select(); 
        }
        else
        {   
             txtobj.focus();
        }
	}
}

function TNew(i)
{
    var img = new GetJsPhoto(i);
    img.load();
}
/*频道页导航滚动*/
Marquee = function(id){
	try{document.execCommand("BackgroundImageCache", false, true);}
	catch(e){};
	var container = document.getElementById(id),
	slide = container.getElementsByTagName("li")[0],
	speed = arguments[1] || 30;
	slide.innerHTML += slide.innerHTML;
	var item  = slide.getElementsByTagName("a"),
	critical = item[item.length/2].offsetLeft,
	delta = 0;
	var rolling = function(){
		delta == -critical ? delta = 0 : delta--;
		slide.style.left = delta + "px";
	}
	var timer = setInterval(rolling,speed)
	container.onmouseover=function() {clearInterval(timer)}
	container.onmouseout=function() {timer=setInterval(rolling,speed)}
}
function Tab(objID,objShowID,obj){
	var parentObj=obj.parentNode;  
	var liArr= parentObj.getElementsByTagName("li");	
	if(liArr.length<=0)return; 
			for(var i=0;i<liArr.length;i++)
			{
				if(liArr[i]==obj)
				{	liArr[i].className="btnOver";
					 
				}
				else	
				{
					 
					liArr[i].className="btnOut"; 	
				}
			}
		 var pObj= document.getElementById(objID);
		 var objArr=pObj.childNodes;
		 for(var i=0;i<objArr.length;i++)
		{  
			if(objArr[i].id==objShowID)
			{
				objArr[i].className="divShow"; 
			}
			else
			{
				objArr[i].className="unShow";
			}
		}
}
function SelMyTab(type,blogname)
{
　　document.location.href='http://t.hexun.com/'+blogname+'/p1/t'+type+'/default.html';
}

function CommentTab(type,page)
{
   if(type==2)
   {
      document.location.href='http://t.hexun.com/group/t0/comments.html';
   }
   else if(type==3)
   {
     document.location.href='http://t.hexun.com/group/t1/comments.html';
   }
   else
   {
      document.location.href='http://t.hexun.com/t'+type+'/comments.html';
   }
}

function RecommendTab(type,page)
{
   document.location.href='http://t.hexun.com/t'+type+'/myrecommend.html';
}

function RecommendTab1(blogname,type,page)
{
   //alert('http://wb.hexun.com/' + blogname + '/t'+type+'/myrecommend.html');
   document.location.href='http://t.hexun.com/' + blogname + '/t'+type+'/myrecommend.html';
}

function GotoTop()
{
   //alert(0);
   document.documentElement.scrollTop=0;
   document.body.scrollTop=0;
}
rotate = {
    rotateRight: function (imgID, angle, callback, maxWidth) {
        this._img[imgID] = this._img[imgID] || {};
        this._img[imgID]._right = this._img[imgID]._right || 0;
        this._img[imgID]._right++;
        this._rotate(imgID, angle == undefined ? 90 : angle, callback, maxWidth)
    },
    rotateLeft: function (imgID, angle, callback, maxWidth) {
        this._img[imgID] = this._img[imgID] || {};
        this._img[imgID]._left = this._img[imgID]._left || 0;
        this._img[imgID]._left++;
        this._rotate(imgID, angle == undefined ? -90 : -angle, callback, maxWidth)
    },
    _img: {},
    _rotate: function (imgID, angle, callback, maxWidth) {
        var p = document.getElementById(imgID);
        var par = p.parentNode.parentNode.parentNode;
        p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;

        if (p.angle >= 0) {
            var rotation = Math.PI * p.angle / 180
        } else {
            var rotation = Math.PI * (360 + p.angle) / 180
        }
        var costheta = Math.cos(rotation);
        var sintheta = Math.sin(rotation);
        if (document.all && !window.opera && ie) {
            var canvas = document.createElement("img");
            canvas.src = p.src;
            canvas.height = p.height;
            canvas.width = p.width;
            // alert(canvas.height + ' ' + canvas.width)
            if (!this._img[imgID]._initWidth) {
                this._img[imgID]._initWidth = canvas.width;
                this._img[imgID]._initHeight = canvas.height
            }
            if (canvas.height > maxWidth + 8) {
                canvas._w1 = canvas.width;
                canvas._h1 = canvas.height;
                canvas.height = maxWidth - 4;
                canvas.width = (canvas._w1 * canvas.height) / canvas._h1
            }
            if (ie) {
                canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(enabled=true,M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
                var me = this;
                setTimeout(function () {

                    par.style.height = 'auto';
                    var left = me._img[imgID]._left,
                            right = me._img[imgID]._right;

                    if ((left === 1 && !right) || (!left && right === 1)) {
                        me._img[imgID]._width = canvas.width;
                        me._img[imgID]._height = canvas.height;
                        par.style.height = canvas.width + 24;
                    }
                    else {
                        if ((right % 2 == 0 && !left) || (left % 2 == 0 && !right) || (Math.abs(right - left) % 2 == 0)) {
                            canvas.width = me._img[imgID]._initWidth - 4;
                            canvas.height = me._img[imgID]._initHeight - 4
                            //par.style.height = canvas.width + 24;
                        }
                        else {
                            canvas.width = me._img[imgID]._width;
                            canvas.height = me._img[imgID]._height;
                            par.style.height = canvas.width + 24;
                        }
                    }

                },
                    0)
            }

        }
        else {

            var canvas = document.createElement("img");
            canvas.src = p.src;
            canvas.height = p.height;
            canvas.width = p.width;
            // alert(canvas.height + ' ' + canvas.width)
            if (!this._img[imgID]._initWidth) {
                this._img[imgID]._initWidth = canvas.width;
                this._img[imgID]._initHeight = canvas.height
            }
            if (canvas.height > maxWidth + 8) {
                canvas._w1 = canvas.width;
                canvas._h1 = canvas.height;
                canvas.height = maxWidth - 4;
                canvas.width = (canvas._w1 * canvas.height) / canvas._h1
            }
            var me = this;
            me._img[imgID]._width = canvas.width;
            me._img[imgID]._height = canvas.height;

            function rot() {
                var l = me._img[imgID]._left || 0,
                    r = me._img[imgID]._right || 0,
                    $canvas = $(canvas);
                if (Math.abs(l - r) % 2 == 0) {

                    $canvas.height(me._img[imgID]._initHeight);
                    $canvas.width(me._img[imgID]._initWidth);
                    $(par).height(me._img[imgID]._initHeight + 24);
                    $(canvas).rotate({
                        angle: setn() * 90,
                        center: ['center', 'center']
                    });
                    // alert(2)
                    $canvas.css({ position: 'absolute', left: 0, top: 0 });
                }
                else {
                    $canvas.height(me._img[imgID]._height);
                    $canvas.width(me._img[imgID]._width);
                    $(par).height(me._img[imgID]._width + 28);
                    $(canvas).rotate({
                        angle: setn() * 90,
                        center: ['center', 'center']
                    });
                    // alert($(canvas))
                    $(canvas).css({ position: 'absolute', left: (me._img[imgID]._height - me._img[imgID]._width) / 2, top: -(me._img[imgID]._height - me._img[imgID]._width) / 2 });
                }


            }
            function setn() {

                var l = me._img[imgID]._left || 0,
                    r = me._img[imgID]._right || 0;
                if (l - r >= 0) {
                    n = -Math.abs(l - r) % 4;
                }
                else {
                    n = Math.abs(l - r) % 4;
                }
                return n;
            }

            //
            rot();
        }

        canvas.id = p.id;
        canvas.angle = p.angle;
        if (p) {
            var pp = p.parentNode;
            pp.removeChild(p);
            pp.appendChild(canvas);
        }
        // p.parentNode.replaceChild(canvas, p);

        if (callback && typeof callback === "function") {
            callback(canvas)
        }
    }
}
function EnhancedImage(articleid, photoid, url, type) {
    var self = this;
    this.src = url;
    this.width = 0;
    this.height = 0;
    this.loaded = false;
    this.image = null;
    this.load = function () {
        if (this.loaded)
            return;
        this.image = new Image();
        this.image.src = this.src;
        function loadImage() {
            if (self.width != 0 && self.height != 0) {
                clearInterval(interval);
                self.loaded = true;
                ShinkImgDone(articleid, photoid, url, type);
            }
            self.width = self.image.width;
            self.height = self.image.height;
        }
        var interval = setInterval(loadImage, 50);
    }
}
function ShinkImg(articleid, photoid, url, type) {
    var img = new EnhancedImage(articleid, photoid, url, type);
    img.load();
}
function GetJsPhoto(i) {
    var self = this;
    this.src = "http://t.hexun.com/images/common/btn43_23.gif";
    this.width = 0;
    this.height = 0;
    this.loaded = false;
    this.image = null;
    this.load = function () {
        if (this.loaded)
            return;
        this.image = new Image();
        this.image.src = this.src;
        function loadImage() {
            if (self.width != 0 && self.height != 0) {
                clearInterval(interval);
                self.loaded = true;
                T(i);
            }
            self.width = self.image.width;
            self.height = self.image.height;
        }
        var interval = setInterval(loadImage, 50);
    }
}
function ShinkImgDone(articleid, photoid, url, type) {
    if (type == 1) {
        var aJustW = 335;
        var newurl = url;
        var orgurl = url;
        if (url.indexOf("b45_") >= 0) {
            orgurl = url.replace("b45_", "b_");
        }
        var html = "<h3><span class=\"preview_big_4\" title=\"关闭\" onclick=\"javascript:ShinkImg('" + articleid + "','" + photoid + "','" + url + "','0');\">&nbsp;</span>";


        if (typeof (usertemplate) != "undefined" && usertemplate != null && usertemplate == 36) {
            html += "<span class=\"preview_big_2\" id='rotateLeft_" + articleid + "_" + photoid + "'><a>向左转</a></span><span class=\"preview_big_3\" id='rotateRight_" + articleid + "_" + photoid + "'><a>向右转</a></span></h3>";
        }
        else {
            html += "<span class=\"preview_big_1\"><a href=\"" + orgurl + "\" target=_blank>查看原图</a></span><span class=\"preview_big_2\" id='rotateLeft_" + articleid + "_" + photoid + "'><a>向左转</a></span><span class=\"preview_big_3\" id='rotateRight_" + articleid + "_" + photoid + "'><a>向右转</a></span></h3>";
        }



        html += "<div style='position: relative'><a href=\"javascript:void(0);\" onclick=\"javascript:ShinkImg('" + articleid + "','" + photoid + "','" + url + "','0');\"><img src=\"" + newurl + "\" id=\"BigImg_" + articleid + "_" + photoid + "\" class=\"imgSmall\" onload=\"var image=new Image();image.src=this.src;if(image.width>0 && image.height>0){if(image.width>=450){this.width=450;this.height=image.height*450/image.width;}}\" /></a></div>";
        if (document.getElementById("MiddleDiv_" + articleid + "_" + photoid) != null) {
            document.getElementById("MiddleDiv_" + articleid + "_" + photoid).innerHTML = html;
            document.getElementById("MiddleDiv_" + articleid + "_" + photoid).style.display = "block";
            document.getElementById("SmallDiv_" + articleid + "_" + photoid).style.display = "none";
        }
        addEvent("rotateLeft_" + articleid + "_" + photoid, function () { rotate.rotateLeft("BigImg_" + articleid + "_" + photoid, 90, null, 450) }, "click");
        addEvent("rotateRight_" + articleid + "_" + photoid, function () { rotate.rotateRight("BigImg_" + articleid + "_" + photoid, 90, null, 450) }, "click");
    }
    else {
        document.getElementById("SmallDiv_" + articleid + "_" + photoid).style.display = "block";
        document.getElementById("MiddleDiv_" + articleid + "_" + photoid).style.display = "none";
    }
}
addEvent = function (elm, func, evType, useCapture) {
    var _el = E(elm);
    if (_el == null) {
        trace("addEvent 找不到对象：" + elm);
        return
    }
    if (typeof useCapture == "undefined") {
        useCapture = false
    }
    if (typeof evType == "undefined") {
        evType = "click"
    }
    if (_el.addEventListener) {
        _el.addEventListener(evType, func, useCapture);
        return true
    } else {
        if (_el.attachEvent) {
            var r = _el.attachEvent("on" + evType, func);
            return true
        } else {
            _el["on" + evType] = func
        }
    }
}
removeEvent = function (oElement, fHandler, sName) {
    var _el = E(oElement);
    if (_el == null) {
        trace("removeEvent 找不到对象：" + oElement);
        return
    }
    if (typeof fHandler != "function") {
        return
    }
    if (typeof sName == "undefined") {
        sName = "click"
    }
    if (_el.addEventListener) {
        _el.removeEventListener(sName, fHandler, false)
    } else {
        if (_el.attachEvent) {
            _el.detachEvent("on" + sName, fHandler)
        }
    }
    fHandler[sName] = null
}
function copytext(blogname,username) 
 {	
//    if(window.clipboardData)
//    {
//        var copyText='http://t.hexun.com/'+blogname+'/default.html';
//        window.clipboardData.clearData();                 
//        window.clipboardData.setData('Text',copyText);
//        alert(username + '的财经微博地址已经拷贝到剪贴板！');
//    }
     var copyText='http://t.hexun.com/'+blogname+'/default.html';
     var isCopy=copyToClipboard(copyText);
     if(isCopy)
     {
        alert(username + '的财经微博地址已经拷贝到剪贴板！');
     }
 }
  function copyToClipboard(txt) {   
     
     
     if(window.clipboardData)
     {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
        return true;
     }
     
     else if(navigator.userAgent.indexOf("Opera") != -1)
     {
        window.location = txt;
        return true;
     }
     else if(navigator.userAgent.indexOf("Firefox")!=-1||navigator.userAgent.indexOf("Chrome")!=-1)
     {
        alert("你的浏览器不支持脚本复制或你拒绝了浏览器安全确认，请尝试手动[Ctrl+C]复制。");
        return false;
     }
     else if (window.netscape)
     {
       try
       {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
       }
       catch (e)
       {
          alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
       }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
               return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
               return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
               return false;     
        clip.setData(trans,null,clipid.kGlobalClipboard);
        //alert("复制成功！")
     }
}     
function showMessageBox(content,articleid,photoid,wWidth)
{
    if(document.getElementById('back')!=null)
    {
       document.getElementById('back').parentNode.removeChild(document.getElementById('back'));
    }
    if(document.getElementById('mesWindow')!=null)
    {
      document.getElementById('mesWindow').parentNode.removeChild(document.getElementById('mesWindow'));
    }
    var isIe=(document.all)?true:false;
    var bWidth=parseInt(document.documentElement.scrollWidth);
    var bHeight=parseInt(document.documentElement.scrollHeight);
    var back=document.createElement("div");
    back.id="back";
    var styleStr="top:0px;left:0px;position:absolute;background:#666;width:"+bWidth+"px;height:"+bHeight+"px;";
    styleStr+=(isIe)?"filter:alpha(opacity=40);":"opacity:0.40;";
    back.style.cssText=styleStr;
    document.body.appendChild(back);
    var mesW=document.createElement("div");
    mesW.id="mesWindow";
    mesW.innerHTML=content;
    var objLookingFor=document.getElementById("SmallDiv_"+articleid+"_"+photoid);
    var posX = objLookingFor.offsetLeft;
    var posY = objLookingFor.offsetTop;
    var aBox = objLookingFor;//需要获得位置的对象
    do{
         aBox = aBox.offsetParent;
         if(aBox==null) break;
         posX += aBox.offsetLeft;
         posY += aBox.offsetTop;
         
    } while(aBox.tagName!="BODY");
    objLookingFor.style.display="none";
    styleStr="left:"+posX+"px;top:"+posY+"px;position:absolute;width:510px;";
    mesW.style.cssText=styleStr;
    document.body.appendChild(mesW);
}

/*右侧变成背景*/
function trHead(line,css){    
	var obj=document.getElementById(line);
	var imgDir=css;
	
    if(css<10)
	{ 
	   imgDir="00"+css;
	}
	else if(css<100)
	{
	   imgDir="0"+css;
	}
	
	if(obj.style.display=="none"){
		obj.style.display="block";
		var obj2=document.getElementById('s'+line);
		if(obj2 != null)
		{
		    if(css==1)
		    {
		      obj2.style.backgroundImage="url(http://t.hexun.com/images/"+imgDir+"/iconopen.gif)";
		    }
		    else
		    {
    		  
		      obj2.style.backgroundImage="url(http://t.hexun.com/images/"+imgDir+"/iconopen.gif)";
		    }
		    obj2.title="隐藏";
		}
	}
	else{
		obj.style.display="none";
		var obj2=document.getElementById('s'+line);
		if(obj2 != null)
		{
		    if(css==1)
		    {
		       obj2.style.backgroundImage="url(http://t.hexun.com/images/"+imgDir+"/iconclose.gif)";
		    }
		    else
		    {
		       obj2.style.backgroundImage="url(http://t.hexun.com/images/"+imgDir+"/iconclose.gif)";
		    }
		    obj2.title="显示";
		}
	}
}
/*第二套模板背景图*/
document.writeln("<div id=\"MBtopbg\"><\/div>");

String.prototype.replaceAll = function(s1,s2)
{
    return this.replace(new RegExp(s1, "gm"), s2);
}

function videoOpen(articleID, videoCount, videoUrl)
{     
     
     document.getElementById('p_' + articleID + '_video' + videoCount).innerHTML = document.getElementById('hid_' + articleID + '_videoUrl' + videoCount).innerHTML.replaceAll("ptth://", "http://");
     //document.getElementById('p_' + articleID + '_video' + videoCount).innerHTML = 123;
     //alert(document.getElementById('hid_' + articleID + '_videoUrl' + videoCount).innerHTML.replaceAll("ptth://", "http://").replaceAll("em123bed", "<embed").replaceAll("obj123321","<object").replaceAll("&gt;",">"));
     //alert(document.getElementById('p_' + articleID + '_video' + videoCount).innerHTML);
}

function videoMouseUp(articleID, videoCount, videoUrl)
{
     //alert(1);
     document.getElementById('SmallDiv_' + articleID + '_video' + videoCount).style.display = "none";
     document.getElementById('MiddleDiv_' + articleID + '_video' + videoCount).style.display = "block";    
}

function videoClose(articleID, videoCount)
{
     document.getElementById('SmallDiv_' + articleID + '_video' + videoCount).style.display = "block";
     document.getElementById('MiddleDiv_' + articleID + '_video' + videoCount).style.display = "none";
     document.getElementById('p_' + articleID + '_video' + videoCount).innerHTML = "";
}

function removeLink(str)
{
    str = str.replace(/<a.*?>(.*)<\/a>/ig,''); 
    return str;
}

function TextValidate(t) {
    var code;
    var character;
    if (document.all) //判断是否是IE浏览器
    {
        code = window.event.keyCode;
    }
    else {
        code = arguments.callee.caller.arguments[0].which;
    }
    var character = String.fromCharCode(code);
    if (t == 1) {
        if (character != ',') {

            var txt = new RegExp("[\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\[,\\],\\{,\\},\\(,\\),\\',\\_,\\-,\\=,\"]");
            //特殊字符正则表达式
            if (txt.test(character)) {

                if (document.all) {
                    window.event.returnValue = false;
                }
                else {
                    arguments.callee.caller.arguments[0].preventDefault();
                }
            }
        }
    }
    else {
        var txt = new RegExp("[\\;,\\ ,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\[,\\],\\{,\\},\\(,\\),\\',\\_,\\-,\\=,\"]");
        //特殊字符正则表达式
        if (txt.test(character)) {

            if (document.all) {
                window.event.returnValue = false;
            }
            else {
                arguments.callee.caller.arguments[0].preventDefault();
            }
        }
    }

}