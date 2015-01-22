var FriendList = 
{
	url: "/Team/GetFollowUsers.aspx",
	obj: null,
	ajaxobj1: null,
	element: null,
	scan: false,
	time: 100,
	thread: -1,
	line: null,
	userid : null,
	curSeleVal:null,
	curAtPos:0,
	inputKeyLen:0,
	curPos:0,
	boxInputID:null,
	pageSize:null,
	topValue:0,
	lineCharacterCount:77,
	isShow:1,
	init: function (inputID, divID, userid) 
	{	 
	    //alert('d');   
	    E("enflag").value="1";
	    // 输入框
	    this.boxInputID=inputID;
		this.obj = document.getElementById(inputID);
		// 显示下拉列表
		var css = "position: absolute; z-index: 99999; font-size:12px;";
	    //alert(FriendList.userid);
	    //debugger;
		this.ajaxobj1 = CreateElementNodeFriendList(inputID, 'DIV', divID, css);
		// 数据类型
		this.userid = userid;
		//是否显示
		this.isShow=1;
		
	},
	
	getElement:	function () 
	{
		if (this.element != null) 
		{
			document.body.removeChild(this.element);
			this.element = null;
		}
		
		this.element = document.createElement("script");
		this.element.type = "text/javascript";
		this.element.language = "javascript";
		
		document.body.appendChild(this.element);
		document.body.appendChild(this.ajaxobj1);
		
		return this.element;
	},

	check: function () 
	{
	  
		if (FriendList.scan == true) 
		{
             
			if (FriendList.obj.valueOld != FriendList.obj.value && "" != FriendList.obj.value) 
			{
				//alert(FriendList.obj.valueOld);
				
				FriendList.obj.valueOld = FriendList.obj.value;
				
				FriendList.getData();
			}
			else if (FriendList.obj.value == "") 
			{
				FriendList.obj.valueOld = FriendList.obj.value;
				FriendList.clean();
			}
			
			FriendList.thread = window.setTimeout(FriendList.check, FriendList.time);
		}
	},

	getData: function ()
	{
		this.getElement();
		if (this.obj.value != null && this.userid != null && this.isShow==1) 
		{
		    //alert(this.isShow);
		    //debugger;
		    var atApos = this.obj.value.lastIndexOf("@")+1;
		    
		    if(atApos > 0)
		    {	        
                //取到光标位置----Start----
		        this.obj.focus();
                var i=0;
                var s = this.obj.value;    
               
		        if(IsFireFoxForList()) 
		        {
		            
                    i=document.getElementById(FriendList.boxInputID).selectionStart;
                    
                }
                else
                {
                    var r = document.selection.createRange();
                    var ctr = this.obj.createTextRange();
                    var ivalue = "&^asdjfls2FFFF325%$^&"; 
                    r.text = ivalue;
                    i = this.obj.value.indexOf(ivalue);
                    r.moveStart("character", -ivalue.length);
                    r.text = "";
                    ctr.collapse(true);
                  
                }
                 
              

                //取到光标位置----End----
                var cursPosS =this.obj.value.substring(0,i);
                
		        var keyInput = cursPosS.substring(cursPosS.lastIndexOf("@")+1);
		        if(keyInput.indexOf(" ")>-1)
		        {   
		            keyInput = "";
		            $('#tableTickFriend').css("display","none");
		        }
		        
		        
		        //alert(i+"-"+atApos +"-"+keyInput);
		        if( keyInput.length>0 &&  keyInput.length<11)
			        this.element.src = this.url + "?userid=" + this.userid + "&key=" + keyInput+"&psize="+FriendList.pageSize;
			}
		}
		else if(this.obj.value != null)
		{
			this.element.src = this.url + this.obj.value;
		}
	},

	focusObj: function () 
	{
		
		if (this.obj.value != "") 
		{
			FriendList.getData();
		}
		
		FriendList.scan = true;
		FriendList.check();
	},

	blurObj: function () 
	{
	    FriendList.scan = false;
		FriendList.clean();
	},

	keyDown: function (evt) 
	{
		if (this.obj != null && this.obj.value != "") 
		{
		    //if(evt.keyCode ==13)
		    //    evt.keyCode=32;
		    
			switch (evt.keyCode) 
			{
			    case 32:
			           FriendList.blurObj();
					   $('#tableTickFriend').css("display","none");
    		           E("enflag").value="0";
    		    break;
			    case 38: //up
					this.scan = false;
					
					if (this.line == null || this.line.rowIndex == 0) 
					{
						FriendList.setLine(this.obj.FriendListBody.rows[this.obj.FriendListBody.rows.length - 1]);
					}
					else 
					{
						FriendList.setLine(this.obj.FriendListBody.rows[this.line.rowIndex - 1]);
					}
					
					return false;
					break;
				
				case 40: //down
				    
					
					this.scan = false;
					
					if (this.line == null || this.line.rowIndex == this.obj.FriendListBody.rows.length - 1) 
					{
						FriendList.setLine(this.obj.FriendListBody.rows[0]);
						
					}
					else 
					{
						FriendList.setLine(this.obj.FriendListBody.rows[this.line.rowIndex + 1]);
					}
					
					return false;
					
					break;
				
				case 13: //Enter
				    //debugger;
				    //alert(FriendList.curSeleVal);
				    if(FriendList.curSeleVal == null)
				        break;
					if(E("enflag").value=="1")
					{										
					    var atApos = this.obj.value.lastIndexOf("@")+1;
		                if(atApos > 0)
		                {
			                this.obj.focus();
                 
                             var temCursPosS =this.obj.value.substring(0,FriendList.curAtPos+FriendList.inputKeyLen);
		                     var keyInput = temCursPosS.substring(FriendList.curAtPos,FriendList.curAtPos+FriendList.inputKeyLen);
		                     var cursPosS = this.obj.value.substring(0,FriendList.curAtPos)+"@"+FriendList.curSeleVal+" ";
		                     var atLastStr = this.obj.value.substring(FriendList.curAtPos+FriendList.inputKeyLen);
			                 this.obj.value = cursPosS + atLastStr;
    		                 //this.obj.value = this.obj.value.replace("@@","@");
    		                 if(IsFireFoxForList())
    		                 {
    		                    evt.preventDefault();
    		                 }
    		                 else
    		                 {
			                     var rng = this.obj.createTextRange();              
                                 rng.moveStart("character",FriendList.curAtPos+FriendList.curSeleVal.length+2);
                                 rng.collapse(true);
                                 rng.select(); 
			                     event.returnValue=false;
                             }
		                }
    					this.obj.value = this.obj.value.replace("@@","@");
					    FriendList.blurObj();
					    $('#tableTickFriend').css("display","none");
    					
					    E("enflag").value="0";
					
					}
                    this.isShow=0;
					break;
				default:
					FriendList.setLine(null);
					this.scan = true;
					FriendList.check();
					break;
			}
			FriendList.inputKeyLen = 0;
		}
		//return true;
	},
    
	setLine: function (line) 
	{
	    //alert('');
		if (line != null) 
		{
			if (this.line != null) 
			{
				FriendList.discolorLine(this.line);
			}			
			var atApos = this.obj.value.lastIndexOf("@")+1;
			
		    if(atApos > 0)
		    {
			    var r,ctr,i,s;
		        if(IsFireFoxForList())
		        {
		            i=document.getElementById(FriendList.boxInputID).selectionStart;
		        }
		        else
		        {
                    r = document.selection.createRange();
                    ctr = this.obj.createTextRange();
                    i=0;
                    s = this.obj.value;                
                    ivalue = "&^asdjfls2FFFF325%$^&"; 
                    r.text = ivalue;
                    i = this.obj.value.indexOf(ivalue);
                    r.moveStart("character", -ivalue.length);
                    r.text = "";
                    ctr.collapse(true);
                }
                var cursPosS =this.obj.value.substring(0,i);
                //debugger;
		        var keyInput = cursPosS.substring(cursPosS.lastIndexOf("@")+1);
		        cursPosS = cursPosS.replace("@"+keyInput,"@"+line.cells[1].innerHTML)+" ";
			    this.line = line;    			
			    FriendList.colorLine(line);  
			    FriendList.curSeleVal=line.cells[1].innerHTML;
			    if(FriendList.inputKeyLen ==0)
			        FriendList.inputKeyLen = i-  FriendList.curAtPos;	
			    		        
			    E("enflag").value="1";
		    }
			this.obj.value = this.obj.value.replace("@@","@");
			//document.getElementById("hiduser").value=line.cells[0].innerHTML;
		}
		else 
		{
			this.line = null;
		}
	},
	setLineValue:function()
	{
	       if(E("enflag").value=="1")
		   {										
			 var atApos = this.obj.value.lastIndexOf("@")+1;
		     if(atApos > 0)
		     {
		        this.obj.focus();
                 
                 var temCursPosS =this.obj.value.substring(0,FriendList.curAtPos+FriendList.inputKeyLen);
		         var keyInput = temCursPosS.substring(FriendList.curAtPos,FriendList.curAtPos+FriendList.inputKeyLen);
		         var cursPosS = this.obj.value.substring(0,FriendList.curAtPos)+"@"+FriendList.curSeleVal+" ";
		         var atLastStr = this.obj.value.substring(FriendList.curAtPos+FriendList.inputKeyLen);
			     this.obj.value = cursPosS + atLastStr;
    		     if(IsFireFoxForList())
    		     {
    		        //this.obj.value = this.obj.value.replace("@@","@");
    		     }
    		     else
    		     {
			         var rng = this.obj.createTextRange();              
                     rng.moveStart("character",FriendList.curAtPos+FriendList.curSeleVal.length+2);
                     rng.collapse(true);
                     rng.select(); 
			         event.returnValue=false;
                 }
		     }
    		 //debugger;
    		 this.obj.value = this.obj.value.replace("@@","@");

			 FriendList.blurObj();
			 $('#tableTickFriend').css("display","none");
    		
			 E("enflag").value="0";
		}	
		this.isShow=0;
	}
	,

	colorLine: 	function (line) 
	{
		line.className = "selected";
	},

	discolorLine:  function (line) 
	{
		line.className = "";
	},

	clean: function () 
	{
	    //debugger;
	    FriendList.curSeleVal=null;
		this.ajaxobj1.innerHTML = "";
	}
	,
	hidden:function()
	{
	    for(var i=0;i<TickFriendArray.length;i++)
	    {
	     
	        if( $('#tableTickFriend_'+ TickFriendArray[i]) !=null)
	            $('#tableTickFriend_'+ TickFriendArray[i]).css("display","none");
	    }
	}
	
};

var TickFriendArray=new Array();//
var everydata = new Array();

//计算占用的字节数
function $strLenth(str) 
{ 
    var len = str.length;
    var reLen = 0;
    for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
            // 全角       
            reLen += 2;
        } else {
            reLen++;   
        }   
    }   
    return reLen;  
    //alert();     
}   
// 显示数据
function showCnt2(data) 
{
    //debugger;
	FriendList.clean();
	//alert(data.length);
	if (data.length > 0) 
	{
	    FriendList.isShow=1;
		var result = new String();		
		var atstrLen =$strLenth(document.getElementById(FriendList.boxInputID).value.substring(0,FriendList.curAtPos));
		
		//alert(FriendList.lineCharacterCount);
		
		var lineCount = Math.floor(atstrLen / FriendList.lineCharacterCount);
		if(lineCount >=4)
		    lineCount = 4;
		var boxTop=(4-lineCount)*18;
		var boxLeft=Math.floor(atstrLen % FriendList.lineCharacterCount)*7;
		//alert(FriendList.curAtPos+"-"+boxTop);
		result += '<table id="tableTickFriend_' + FriendList.boxInputID + '" width="220" border="0" cellspacing="0" cellpadding="0" class="ajaxtable2" style="z-index: 998; position: absolute; display: block; left: '+boxLeft+'px; top: -'+boxTop.toString()+'px;">';
        TickFriendArray.push(FriendList.boxInputID);
       // alert(testarray.length);
		for (var i in data) 
		{
			var tempArray = data[i].split(",");
			
			result += '<tr onmouseover="FriendList.colorLine(this);" onmouseout="FriendList.discolorLine(this)" onmousedown="FriendList.setLine(this);FriendList.setLineValue();$(\'#tableTickFriend\').css(\'display\',\'none\');">';
			
			result += '<td style="display:none">' + tempArray[0] + '</td>';
			result += '<td style="width:170px;">' + tempArray[1] + '</td>';		
			result += '</tr>';
		}
		
		result += '</table>';
		//test
	    //alert(result);
		FriendList.ajaxobj1.innerHTML = result;
				
		FriendList.obj.FriendListBody = FriendList.ajaxobj1.childNodes[0];
	}
	else
	    FriendList.isShow=0;
	everydata = new Array();
}

$position=0;
$dpPath='';

var $dp = null;
function $getClientWidthHeight(w) {
    var win = w || window;
    if (win.document.documentElement && win.document.documentElement.scrollTop) {
        return {
            'width': win.document.documentElement.clientWidth,
            'height': win.document.documentElement.clientHeight
        };
    } else if (win.document.body) {
        return {
            'width': win.document.body.clientWidth,
            'height': win.document.body.clientHeight
        };
    }
}
function $getScroll(w) {
    var win = w || window;
    if (win.document.documentElement && win.document.documentElement.scrollTop) {
        return {
            'top': win.document.documentElement.scrollTop,
            'left': win.document.documentElement.scrollLeft
        };
    } else if (win.document.body) {
        return {
            'top': win.document.body.scrollTop,
            'left': win.document.body.scrollLeft
        };
    }
}
function $getAbsM(topWin) {
    if (topWin == null) {
        topWin = top;
    }
    var leftM = 0;
    var topM = 0;
    var tempWin = window;
    while (tempWin != topWin) {
        var ifs = tempWin.parent.document.getElementsByTagName('iframe');
        for (var i = 0; i < ifs.length; i++) {
            try {
                if (ifs[i].contentWindow == tempWin.window) {
                    var rc = $getBoundingClientRect(ifs[i]);
                    leftM += rc.left;
                    topM += rc.top;
                    break;
                }
            } catch(e) {
                continue;
            }
        }
        tempWin = tempWin.parent;
    }
    return {
        'leftM': leftM,
        'topM': topM
    };
}
function $getBoundingClientRect(obj) {
    if (navigator.product == 'Gecko') {
        var objWin = null;
        var top = obj.offsetTop;
        var left = obj.offsetLeft;
        var right = obj.offsetWidth;
        var bottom = obj.offsetHeight;
        while (obj = obj.offsetParent) {
            if (obj.style.position == 'absolute' || obj.style.position == 'relative' || (obj.style.overflow != 'visible' && obj.style.overflow != '')) {
                break;
            }
            top += obj.offsetTop;
            left += obj.offsetLeft;
            if (obj.tagName.toLowerCase() == "body") {
                objWin = obj.ownerDocument.defaultView;
            }
        }
        var theScroll = $getScroll(objWin);
        left -= theScroll.left;
        top -= theScroll.top;
        right += left;
        bottom += top;
        return {
            'left': left,
            'top': top,
            'right': right,
            'bottom': bottom
        };
    } else {
        return obj.getBoundingClientRect();
    }
}
if (navigator.product == 'Gecko') {
    Document.prototype.attachEvent = function(sType, fHandler) {
        var shortTypeName = sType.replace(/on/, "");
        fHandler._ieEmuEventHandler = function(e) {
            window.event = e;
            return fHandler();
        };
        this.addEventListener(shortTypeName, fHandler._ieEmuEventHandler, false);
    };
    Document.prototype.createStyleSheet = function(cssPath) {
        var head = document.getElementsByTagName('HEAD').item(0);
        var style = document.createElement('link');
        style.href = cssPath;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        head.appendChild(style);
    };
    HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
        switch (where) {
        case "beforeBegin":
            this.parentNode.insertBefore(parsedNode, this);
            break;
        case "afterBegin":
            this.insertBefore(parsedNode, this.firstChild);
            break;
        case "beforeEnd":
            this.appendChild(parsedNode);
            break;
        case "afterEnd":
            if (this.nextSibling) {
                this.parentNode.insertBefore(parsedNode, this.nextSibling);
            } else {
                this.parentNode.appendChild(parsedNode);
            }
            break;
        }
    };
    HTMLIFrameElement.prototype.__defineGetter__("Document",
    function() {
        return this.contentDocument
    });
}
// 创建节点
function CreateElementNodeFriendList(_targetElement, _tag, _id, _css)
{
    //alert(FriendList.topValue);
    //debugger;
    var divobj = document.getElementById(_id);
    if(!divobj)
    {   
        var newObj = document.createElement(_tag); 
       
        var targetObj = document.getElementById(_targetElement);
       
        if(_id && _id!="") newObj.id=_id;   
        
        if(_css && _css!="")
        {   
            newObj.setAttribute("style", _css);   
            newObj.style.cssText = _css;   
        }   
        var top=window;
        while(top.parent.document!=top.document&&top.parent.document.getElementsByTagName("frameset").length==0){top=top.parent;}

        var eCont=(typeof _targetElement=='string')?document.getElementById(_targetElement):_targetElement;

        var objxy=$getBoundingClientRect(eCont);
        var mm=$getAbsM(top);        
        var currWinSize=$getClientWidthHeight(top);
        var theScroll=$getScroll(top);
        var ddTop=mm.topM+objxy.bottom;
        var ddLeft=mm.leftM+objxy.left;
        var ddHeight=Math.max(parseInt(newObj.offsetHeight),30);
        var ddWidth=Math.max(parseInt(newObj.offsetWidth),180); 
        //alert(FriendList.topValue);     
        if(($position==2)||(($position==0)&&((ddTop+ddHeight<currWinSize.height)||(ddTop-ddHeight<ddHeight*0.8))))
        {newObj.style.top=(theScroll.top+ddTop+1+FriendList.topValue)+'px';}
        else{newObj.style.top=(theScroll.top+ddTop-ddHeight-eCont.offsetHeight-3)+'px';}
        newObj.style.left=-1+theScroll.left+Math.min(ddLeft,currWinSize.width-ddWidth-5)+'px';
        
        return newObj;
	}
	
	return divobj;
}  

// 返回串中匹配的串
function AddBold(srcstr, searchstr)
{
	searchstr = searchstr.toUpperCase();
	return srcstr.replace(searchstr, '<b>' + searchstr + '</b>');
}
// 判断FireFox浏览器类型
function IsFireFoxForList()
{
    
	var sAgent = window.navigator.userAgent.toLowerCase();
	
	if (sAgent.indexOf("firefox") != -1 || sAgent.indexOf("safari") != -1 || sAgent.indexOf("chrome") != -1)
	{
		return true;
	}
	
	return false;
}
//@用户下拉框的显示
function showAtUser(inputID,divID,atUserID,pageSize,topValue,rowCharacterCount)
    {
        //debugger;
        //alert('d');

        if(rowCharacterCount!=undefined)            
            FriendList.lineCharacterCount=rowCharacterCount;
        FriendList.topValue=topValue;
        FriendList.init(inputID,divID,atUserID);
        FriendList.blurObj();
      
        FriendList.focusObj();
        FriendList.pageSize=pageSize;
        if(typeof(pub_LoginUserID) != 'undefined')
            FriendList.userid=pub_LoginUserID;
        else
            FriendList.userid=atUserID;
        //alert(FriendList.userid);
       
        var r,ctr,i,ivalue;
        if(IsFireFoxForList()) 
		{
		    i=document.getElementById(inputID).selectionStart;
		}
		else
		{
            r = document.selection.createRange();
            ctr = document.getElementById(inputID).createTextRange();
            i=0;                
            ivalue = "&^asdjfls2FFFF325%$^&"; 
            r.text = ivalue;
            i = document.getElementById(inputID).value.indexOf(ivalue);
            r.moveStart("character", -ivalue.length);
            r.text = "";
            ctr.collapse(true);
        }
        //alert(i);
        FriendList.curAtPos=i;
    }
    
//显示@用户判断，IE与FF textareaId：输入框ID showCount：显示条数，divTopVal：div顶部偏移量
//rowCharacterCount:每行最多显示的字符数
function isShowAtUser(evt,textareaId,PopDivID,userID,showCount,divTopVal,rowCharacterCount)
    {
      var evt=evt||window.event;
      if(evt.keyCode==50)
     {
              
          showAtUser(textareaId,PopDivID,userID,showCount,divTopVal,rowCharacterCount);
     }
    }
