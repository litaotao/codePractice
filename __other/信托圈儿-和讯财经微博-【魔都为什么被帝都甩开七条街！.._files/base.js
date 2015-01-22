/* 和讯JavaScript框架
 * 测试版  
 *
 *--------------------------------------------------------------------------*/
var HX = {
	//版本号
	Version:'1.0',
	//浏览器类型
	Browser: {
	  IE:!!(window.attachEvent && !window.opera && window.ActiveXObject),
	 // IE6:!!(HX.Browser.IE && navigator.userAgent.toLowerCase().match(/msie([\d.]+)/)[1] == '6.0'),
	  FireFox:!!(document.getBoxObjectFor),
	  Chrome:!!(window.MessageEvent && !document.getBoxObjectFor),
	  Opera:!!(window.opera),
	  Safari:!!(window.openDatabase)
	  }
	};

/**
 *Object类的扩展
 *@destination:扩展体
 *@source:扩展参数
*/
Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};
Object.extend(Object,{
//1.是否为节点元素
isElement:function(object){
 return object && object.nodeType == 1; 
 },
//2.是否为数组
isArray:function(object) {
 return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
 },
//3.是否为HASH
isHash: function(object) {
 return object instanceof Hash;
 },
//4.是否为函数
isFunction: function(object) {
 return typeof object == "function";
 },
//5.是否为字符串
isString:function(object) {
 return typeof object == "string";
 },
//6.是否为数字
isNumber: function(object) {
 return typeof object == "number";
 },
//7.是否未定义
isUndefined: function(object) {
 return typeof object == "undefined";
 },
//8.返回对象具有的所有属性值集合
values:function(object) {
 var values = [];
 for (var property in object) {
  values.push(object[property]);
  }
  return values;
 },
//9.返回对象具有的属性名称集合
keys:function(object) {
 var keys = [];
 for(var property in object) {
  keys.push(property);
  }
  return keys;
 },
//10.其他方法
other:function(object) {}
});

/**
*取对象的简化
*/
var E = function(id) {
	var el;
	if (Object.isString(id)) el = document.getElementById(id);
	else el = id;
	if(el) return el;
	};

/**
*Element对象的扩展
*/
var Element = {
	//是否为CSS
	isCss:function(ele,c) {
	var classes = E(ele).className;
    if(!classes) return false;
    if(classes == c) return true;
		},
	//CSS添加
	addCss:function(ele,c) {
	if(Element.isCss(ele,c)) return ;
    if(E(ele).className) c = " " + c;
    ele.className +=c;	
		},
	//CSS删除
	removeCss:function(ele,c) {
	E(ele).className = E(ele).className.replace(new RegExp("\\b"+c+"\\b\\s*","g"),"");
		},
	//判定显隐
	visible: function(ele) {
    return E(ele).style.display != 'none';
        },
	//显隐开关
    toggle: function(ele) {
    ele = E(ele);
    Element[Element.visible(ele) ? 'hide' : 'show'](ele);
    return ele;
        },
	//隐藏
    hide: function(ele) {
    ele = E(ele);
    ele.style.display = 'none';
    return ele;
        },
	//显示
    show: function(ele) {
        ele = E(ele);
        ele.style.display = '';
        return ele;
        },
	//DOM元素删除
	remove:function(ele) {
		ele = E(ele);
		ele.parentNode.removeChild(ele);
		return ele;
		},
	//DOM元素创建
	create:function(tag_name,parent,parameters){
		var ele;
		ele = document.createElement(tag_name);
		parent = parent?parent:document.body;
		parent.appendChild(ele);
		if(parameters) {
			
			}
		return ele;
		},
	//去除空白节点
	cleanWhitespace: function(ele) {
        element = E(ele);
        var node = element.firstChild;
        while (node) {
        var nextNode = node.nextSibling;
        if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
        node = nextNode;
        }
        return element;
        }
	};

/**
*Event对象
*/
var Event = {
	//事件注册
	addEvent:function(ele,name,fun) {
	  if(document.attachEvent) return ele.attachEvent("on"+name,fun);
	   if(document.addEventListener) return ele.addEventListener(name,fun,false);
	  },
	//事件注销
	removeEvent:function(ele,name,fun) {
	  if(document.detachEvent) return ele.detachEvent("on"+name,fun);
	   if(document.removeEventListener) return ele.removeEventListener(name,fun,false);
	  },
	//防止冒泡事件
	cancleEventUp:function(e){
	  var e = e?e:event;
      if(document.all) window.event.cancelBubble=true;   
      else e.stopPropagation();  
	  }
	};

/**
*animation对象
*/
var animation = {
	timer:"",
	//下展
	downBig:function(ele,vate,height){
		E(ele).style.height = "0px";
		E(ele).style.display = "";
		animation.timer = setInterval(dobig,vate);
		function dobig() {
			var h = parseInt(E(ele).style.height);
			if(h<height) E(ele).style.height = h+1+"px";
			else {
				E(ele).style.height = height+"px";
				clearInterval(animation.timer);
				}
			}
		},
	//上缩
	upSmall:function(ele,vate,height){
		E(ele).style.height = height+"px";
		E(ele).style.display = "";
		animation.timer = setInterval(dosmall,vate);
		function dosmall() {
			var h = parseInt(E(ele).style.height);
			if(h>0) E(ele).style.height = h-1+"px";
			else {
				E(ele).style.height = "0px";
				clearInterval(animation.timer);
				E(ele).style.display = "none";
				}
			}		
		}
	};
	
/**
 *Ajax对象
 */
var Ajax = {
	
	};
	
/**
 *Form对象
 */
var Form = {
	
	};
	
/**
 *Window对象
 */
var Window = {
   
    };