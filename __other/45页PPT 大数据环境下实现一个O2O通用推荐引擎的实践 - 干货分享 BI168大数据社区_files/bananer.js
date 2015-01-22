/*
* 通栏广告，页面需要有一个id为bananer_con的div，用于做容器，并将该js在div后面引用。
* @date 2012-12-19
* @author xuxiaoyan
*/

var chs_adslider_actionIndex = 1;
var chs_adslider_timeout = setTimeout(function(){},0);
var chs_adslider_bannerCount = 4;//广告数量
var chs_adslider_turnTime = 2000;//轮换时间间隔
var chs_adslider_fadeTime=800;//淡入动画时间

//通过类名查找所要的元素集合
function getElementsByClassName(className,term){
	var parentEle=null;
	if(term.parentObj){
		parentEle = typeof term.parentObj=='string'? document.getElementById(term.parentObj) : term.parentObj;
	}
	var rt = [],coll= (parentEle==null?document:parentEle).getElementsByTagName(term.tagName||'*');
	for(var i=0;i<coll.length;i++){
		if(coll[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			rt[rt.length]=coll[i];
		}
	}
	return rt;
}
//设置透明度
function setOpacity(ev, v){
	if(document.all){  //IE
		ev.style.filter='alpha(opacity='+v+')';
	}else{             //FF
		ev.style.opacity=v/100;
	}
}
//淡入效果(含淡入到指定透明度)  
function fadeIn(elem, speed, opacity){  
        /*  
         * 参数说明  
         * elem==>需要淡入的元素  
         * speed==>淡入速度,正整数(可选)  
         * opacity==>淡入到指定的透明度,0~100(可选)  
         */
        speed = (speed/20) || 20;  
        opacity = opacity || 100;  
        //显示元素,并将元素值为0透明度(不可见)  
        elem.style.display = 'block';  
        setOpacity(elem, 0);  
        //初始化透明度变化值为0  
        var val = 0;  
        //循环将透明值以5递增,即淡入效果  
        (function(){  
            setOpacity(elem, val);  
            val += 5;  
            if (val <= opacity) {  
                setTimeout(arguments.callee, speed)  
            }  
        })();  
}

function startSlider(){
	addMouseEvent();//添加鼠标事件
	//开始轮换
	chs_adslider_timeout = setTimeout(switchTab,chs_adslider_turnTime);
}
function addMouseEvent(){
	var banners=getElementsByClassName('banner', {parentObj:'chs_banners'});
	for(var i=0;i<banners.length;i++)
	{
		banners[i].onmouseover=function(){
			clearTimeout(chs_adslider_timeout);
		};
		banners[i].onmouseout=function(){
			chs_adslider_timeout = setTimeout(switchTab,chs_adslider_turnTime);
		};	
	}
}
function switchTab()
{
	chs_adslider_actionIndex = chs_adslider_actionIndex%chs_adslider_bannerCount+1;
	tab('c',chs_adslider_actionIndex);
}
function tab(name,c){
	clearTimeout(chs_adslider_timeout);
	chs_adslider_actionIndex = c;
	for(i=1;i<=chs_adslider_bannerCount;i++){
		  var menu=document.getElementById(name+i);
		  var con=document.getElementById("c-"+name+i);
		  menu.className=i==c?"hover":"";
		  if(i==c){
			fadeIn(con,chs_adslider_fadeTime);
		  }
		  else{
		  	con.style.display="none";
		  }
	};
	chs_adslider_timeout = setTimeout(switchTab,chs_adslider_turnTime);
};