//窗口弹出
function wopen2(windowObj,w,h) {
	//if(E("bodyshade")&&E("windowbg")) wclose(windowObj);
	var bodyShadeDiv=parent.document.getElementById("bodyshade");
	var windowbg=parent.document.getElementById("windowbg");
	if(bodyShadeDiv&&windowbg)
	{
	  wclose2(windowObj);
	  
	}
	
	//1.创建背景遮罩
	var bodyshade = parent.document.createElement("div");
	bodyshade.id = "bodyshade";
	with(bodyshade.style) {
		position = "absolute";
		background = "#666";
		width = window.parent.document.documentElement.scrollWidth+"px";
		height = window.parent.document.documentElement.scrollHeight+"px";
		top = "0px";
		left = "0px";
		filter="Alpha(opacity=50)";
		opacity = 0.5;
		zIndex=999;
		}
	parent.document.body.appendChild(bodyshade);
	//2.创建窗口背景
	var windowbg = parent.document.createElement("div");
	windowbg.id = "windowbg";
	with(windowbg.style) {
		position = "absolute";
		background = "#CCC";
		width = parseInt(w)+2+"px";
		height = parseInt(h)+2+"px";
		left = "50%";
		top = "50%";
		filter="Alpha(opacity=0)";
		opacity = 0;
		marginLeft = -w/2+window.parent.document.documentElement.scrollLeft+"px";
		marginTop = -h/2+window.parent.document.documentElement.scrollTop+"px";
		zIndex=999;
		}
	 parent.document.body.appendChild(windowbg);
	
	    //3.显示
	    window.setTimeout(function()
	    {
           var curDiv=parent.document.getElementById(windowObj);
           
           curDiv.style.top ="50%";
           curDiv.style.left = "50%";
           curDiv.style.marginLeft = -w/2-2+window.parent.document.documentElement.scrollLeft+"px";
           curDiv.style.marginTop = -h/2-2+window.parent.document.documentElement.scrollTop+"px";
           curDiv.style.zIndex = 9999;
	    },250);
	 
   }
   function wopen(windowObj,w,h) {
    //所有打开的视频先关闭
    $('.preview_big_4').click();
   
	if(E("bodyshade")&&E("windowbg")) wclose(windowObj);
	//1.创建背景遮罩
	var bodyshade = Element.create("div");
	bodyshade.id = "bodyshade";
	with(bodyshade.style) {
		position = "absolute";
		background = "#666";
		width = document.documentElement.scrollWidth+"px";
		
		height = (document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight+"px":document.documentElement.scrollHeight+"px";
		//height = document.documentElement.scrollHeight+"px";
		top = "0px";
		left = "0px";
		filter="Alpha(opacity=50)";
		opacity = 0.5;
		zIndex=999;
		}
	
	//2.创建窗口背景
	var windowbg = Element.create("div");
	windowbg.id = "windowbg";
	with(windowbg.style) {
		position = "absolute";
		background = "#CCC";
		width = parseInt(w)+2+"px";
		height = parseInt(h)+2+"px";
		left = "50%";
		top = "50%";
		filter="Alpha(opacity=0)";
		opacity = 0;
		marginLeft = -w/2+document.documentElement.scrollLeft+"px";
		marginTop = -h/2+document.documentElement.scrollTop+document.body.scrollTop+"px";
		//alert(marginTop);
		zIndex=999;
		}
	    //3.显示
	    window.setTimeout(function()
	    {
           Element.show(windowObj);
           E(windowObj).style.top ="50%";
           E(windowObj).style.left = "50%";
           E(windowObj).style.marginLeft = -w/2-2+document.documentElement.scrollLeft+"px";
           E(windowObj).style.marginTop = -h/2-2+document.documentElement.scrollTop+document.body.scrollTop+"px";
           E(windowObj).style.zIndex = 9999;
	    },250);
	 
   }
   
//窗口关闭chenjilin add 2009-12-25
function wclose2(windowObj) {
	//Element.hide(parent.document.getElementById(windowObj));
	//alert(windowObj);
	parent.document.getElementById(windowObj).style.display="none";
	
	//Element.remove(parent.document.getElementById("bodyshade"));
	
	var curBodyShade=parent.document.getElementById("bodyshade");
	if(curBodyShade)
	{
	  curBodyShade.parentNode.removeChild(curBodyShade);
	}
	//Element.remove(parent.document.getElementById("windowbg"));
	var curWindowBg=parent.document.getElementById("windowbg");
	if(curWindowBg)
	{
	  curWindowBg.parentNode.removeChild(curWindowBg);
	}
	}
//窗口关闭
function wclose(windowObj) {
	Element.hide(E(windowObj));
	if(E("bodyshade") == 'undefined' || E("bodyshade") == null)
    {
        return;
    }
    if(E("windowbg") == 'undefined' || E("windowbg") == null)
    {
        return;
    }
	Element.remove(E("bodyshade"));
	Element.remove(E("windowbg"));
    var isIe=/msie/.test(navigator.userAgent.toLowerCase());
    if(isIe)
    {
       if(E("bodyshade")!=null)
       {
          E("bodyshade")=null;
       }
       if(E("windowbg")!=null)
       {
          E("windowbg")=null;
       }
	   CollectGarbage();
	}
}

