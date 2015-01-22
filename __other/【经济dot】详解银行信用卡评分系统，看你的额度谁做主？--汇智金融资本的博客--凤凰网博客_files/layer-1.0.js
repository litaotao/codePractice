var DEBUG = 0 ;
var isShowDialog = 0;

var _Layer = {
	x0:0,
	y0:0,
	x1:0,
	y1:0,
	offx:1,
	offy:8,
	moveable:false,
	hover:'#999',
	normal:'#999',
	IsModial:0,
	index:10000,
	ondispose:null,
	dispose:function(id){if((typeof this.ondispose=='function')&&this.ondispose.constructor==Function){this.ondispose(id);}},
	buttonclick:null,
	btnclick:function(flg){if((typeof this.buttonclick == 'function') && this.buttonclick.constructor==Function){this.buttonclick(flg)}}
};
var _Location = {
	"left":100,
	"top":100,
	"width":200,
	"height":100
};

var _Css = {
	"cssWhole":"",
	"cssTitle":"",
	"cssTitleButton":"",
	"cssContent":"",
	"cssButton":"",
	"cssStatus":""
};

function getFocus(oid){
	var obj = $(oid);
	if(obj.style.zIndex!=_Layer.index){
		index = _Layer.index + 2;
		var idx = _Layer.index;
		obj.style.zIndex=idx;
		obj.nextSibling.style.zIndex=idx-1;
	}
}

if(!$.browser.msie)	{
	HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr){
		var r=this.ownerDocument.createRange();
		r.setStartBefore(this);
		var parsedHTML=r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where,parsedHTML);
	}
	HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode){
		switch(where){
			case "beforeBegin":
				this.parentNode.insertBefore(parsedNode,this);
				break;
			case "afterBegin":
				this.insertBefore(parsedNode,this.firstChild);
				break;
			case "beforeEnd":
				this.appendChild(parsedNode);
				break;
			case "afterEnd":
				if(this.nextSibling)
					this.parentNode.insertBefore(parsedNode,this.nextSibling);
				else
					this.parentNode.appendChild(parsedNode);
				break;
		}
	}
	HTMLElement.prototype.insertAdjacentText = function(where,txtStr){
		var parsedText=document.createTextNode(txtStr);
		this.insertAdjacentElement(where,parsedText);
	}
}

//拖动层开始
function startDrag(oid,evt){
	var event = evt || window.event;
	if($.browser.msie){
		var obj = $(oid).children[0];
		if(event.button==1){
			//锁定标题栏;
			obj.setCapture();
			//定义对象;
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			//记录鼠标和层位置;
			_Layer.x0 = event.clientX;
			_Layer.y0 = event.clientY;
			_Layer.x1 = parseInt(win.style.left);
			_Layer.y1 = parseInt(win.style.top);
			//记录颜色;
			_Layer.normal = obj.style.backgroundColor;
			//改变风格;
			obj.style.backgroundColor = _Layer.hover;
			win.style.borderColor = _Layer.hover;
			obj.nextSibling.style.color = _Layer.hover;
			_Layer.moveable = true;
		}
	}else{
		var obj = $("#"+oid+" :first-child").get(0);
		if(event.button==0){
			//锁定标题栏;
			window.captureEvents(event.MOUSEMOVE);
			//定义对象;
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			//记录鼠标和层位置;
			_Layer.x0 = event.clientX;
			_Layer.y0 = event.clientY;
			_Layer.x1 = parseInt(win.style.left);
			_Layer.y1 = parseInt(win.style.top);
			//记录颜色;
			_Layer.normal = obj.style.backgroundColor;
			//改变风格;
			obj.style.backgroundColor = _Layer.hover;
			win.style.borderColor = _Layer.hover;
			obj.nextSibling.style.color = _Layer.hover;
			//sha.style.left = _Layer.x1 + 6 + _Layer.offx + "px";
			//sha.style.top = _Layer.y1 + _Layer.offy + "px";
			_Layer.moveable = true;
			document.onmousemove = function(event){drag(oid,event);};
		}
	}

}
//拖动层结束
function stopDrag(oid,evt){
	var event = evt || window.event;
	if($.browser.msie){
		var obj = $(oid).children[0];
		if(_Layer.moveable){
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			var msg = obj.nextSibling;
			win.style.borderColor = _Layer.normal;
			obj.style.backgroundColor = _Layer.normal;
			msg.style.color = _Layer.normal;
			//sha.style.left = obj.parentNode.style.left;
			//sha.style.top = obj.parentNode.style.top;
			obj.releaseCapture();
			_Layer.moveable = false;
		}
   	} else {
		var obj = $("#"+oid+" :first-child").get(0);
		if(_Layer.moveable){
			releaseEvents(event.MOUSEMOVE);
			document.onmousemove = null;
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			var msg = obj.nextSibling;
			win.style.borderColor = _Layer.normal;
			obj.style.backgroundColor = _Layer.normal;
			msg.style.color = _Layer.normal;
			//sha.style.left = win.style.left;
			//sha.style.top = win.style.top;
			_Layer.moveable = false;
		}
	}

}
//拖动层进行中
function drag(oid,evt){
	var event = evt || window.event;
	if($.browser.msie){
		var obj = $("#"+oid+" :first-child").get(0);
		if(_Layer.moveable){
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			win.style.left = (_Layer.x1 + event.clientX - _Layer.x0)  + "px";
			win.style.top = (_Layer.y1 + event.clientY - _Layer.y0) + "px";
			//sha.style.left = (parseInt(win.style.left) + 6 + _Layer.offx) + "px";
			//sha.style.top = (parseInt(win.style.top) + _Layer.offy) + "px";
		}
	}else{
		var obj = $("#"+oid+" :first-child").get(0);
		if(_Layer.moveable){
			var win = obj.parentNode;
			//var sha = win.nextSibling;
			win.style.left = (_Layer.x1 + event.clientX - _Layer.x0)  + "px";
			win.style.top = (_Layer.y1 + event.clientY - _Layer.y0) + "px";
			//sha.style.left = (parseInt(win.style.left) + 6 + _Layer.offx) + "px";
			//sha.style.top = (parseInt(win.style.top) + _Layer.offy) + "px";
		}
	}


}

//最小化层
function min(oid){

}

//关闭层
function dispose(oid){
	var win = $("#"+oid).get(0);
	var bg  = win.nextSibling;
	//var sha = bg.nextSibling;
	document.body.removeChild(win);
	document.body.removeChild(bg);
	//document.body.removeChild(sha);
	_Layer.dispose(oid);
	if(isShowDialog == 1)	isShowDialog = 0;
}

//外部关闭当前层
function close(oid){
	var win = $("#".oid);
	var bg  = win.nextSibling;
	//var sha = bg.nextSibling;
	document.body.removeChild(win);
	document.body.removeChild(bg);
	//document.body.removeChild(sha);
}

/*** 添加完毕 */
//展示层
function show(oLayer){
	var oid = oLayer.id;
	$("#"+oid).css("display",'block');
	//new Effect.SlideDown($(oid));
	//$(oid + "_bg").style.display = "block";
}

//模式形式示层
function showDialog(oLayer){
	if(isShowDialog) return;
	var oid = oLayer.id;
	var el = document.createElement("DIV");
	el.id = "layer_modal_div";
	document.body.parentNode.style.overflowX = 'hidden';
	var theight = document.documentElement.scrollHeight;
	var twidth = document.documentElement.scrollWidth;
	if(theight < 1024) theight = 1024;
	with (el.style){
		background = "#000";
		top = 0;
		left = '-'+document.documentElement.scrollLeft + 'px';
		width = twidth + "px";
		height = theight + "px";
		position = "absolute";
		filter = "alpha(opacity=40)";
		color = "#CCCCCC";
		zIndex = 1000;
		opacity = "0.4";
	}
	document.body.appendChild(el);
	_Layer.IsModial = 1;
	//$(oid).style.display = "block";
	$("#"+oid).css("display","block");
	isShowDialog = 1;
}

//button 按下时
function pressButton(iFlag,id){
	_Layer.btnclick(iFlag);
	dispose(id);
}

function _Title(obj,_icorn,_title,_button,_drag,_style,_width,_height,_gap,_color){
	this.elements = [];
	this.icorn = _icorn;
	this.title = _title;
	this.button = _button;
	this.isAssignStyle = (typeof(_style) == "undefined" || _style == "")?true:false;
	this.elements[0] = document.createElement("div");
	this.elements[4] = document.createElement("SPAN");
	this.elements[5] = document.createElement("SPAN");

	this.elements[0].id = 'dialog_box';

	this.elements[0].className = 'title';

	with(this.elements[0]){
		with(style){

			if($.browser.msie) {
				minWidth = _width - 10 + "px";
				maxWidth = _width - 10 + "px";
			} else {
				width = _width - 10 + "px";
			}
			//$('out').innerHTML += '<br />WIDTH='+width;
		}

		if(_drag == 1){
			if($.browser.msie){
				this.elements[0].OnMouseMove = "drag('" + obj.id + "');";
			}
		}else{
			this.elements[0].OnMouseMove = null;
		}
		if($.browser.msie){
			this.elements[0].OnMouseDown = "startDrag('" + obj.id + "');";
			this.elements[0].OnMouseUp = "stopDrag('" + obj.id + "');";
			this.elements[0].ondblClick = "min('" + obj.id + "');";
		}else{
			this.elements[0].setAttribute("OnMouseDown", "startDrag('" + obj.id + "',event);");
			this.elements[0].setAttribute("OnMouseUp", "stopDrag('" + obj.id + "',event);");
			this.elements[0].setAttribute("ondblClick", "min('" + obj.id + "',event);");
		}
	}


	with( this.elements[4] ){
		innerHTML = "<img style='border:0' src='"+HTTP_FILES_ROOT+"image/smallest.gif' onclick=\"javascript:min('"+obj.id+"');\">" ;
	}

	var watch = this.elements[5];
	with( this.elements[5] ){
		innerHTML = "<img style='border:0' src='"+HTTP_FILES_ROOT+"image/close2.gif' onclick=\"javascript:dispose('"+obj.id+"');\">" ;

	}

	switch( this.button ){
		case 0 :

			this.elements[0].appendChild(this.elements[5]);
			break;
		case 1 :

			this.elements[0].appendChild(this.elements[5]);
			break;
		case 2 :

			break;
		default:
			alert("Error:Layer's title button num increct!");
			break;
	}

	this.elements[0].appendChild(document.createTextNode(this.title));

	this.object = this.elements[0];


	this.getObject = function(){
		//$('out').innerHTML += '<br />WIDTH='+ this.object.style.width;
		return this.object;
	}
}

function _Contant(obj,_src,_iType,_style,_width,_height){
	this.elements = [];
	this.Type = _iType;
	//this.isAssignStyle = (typeof(_style) == "undefined" || _style == "")?true:false;
	this.elements[0] = document.createElement("IMG");
	this.elements[1] = document.createElement("IFRAME");
	this.elements[2] = document.createElement("DIV");

	//this.elements[0].className = "undefined";
	//this.elements[1].className = "undefined";
	//this.elements[2].className = "undefined";

	this.object = {};
	switch ( this.Type ){
		case 0 :
			with(this.elements[0]){
				id = obj.id + "_contant";
				src = _src;

				with(style){
					float = 'left';
					width = _width;
					height = _height;
					border = 0;
					lineHeight = "14px";
					paddingBottom = "3px";
				}
			}
			this.object = this.elements[0];
			break;
		case 1 :
			with(this.elements[1]){
				id = obj.id + "_contant";

					with(style){
						margin = "0px";
						padding = "0px";
						frameBorder = 0;
						switch(obj.Scroll){
							case 0:
								scrolling="No";
								break;
							case 1:
								scrolling="auto";
								break;
							case 2:
								scrolling = "Yes";
								break;
							default:
								break;
						}
						hspace = "0";
						vspace = "0";
						frameSpacing = "0px";
						//position = "absolute";
						//display = 'none';
						//float = "left";
						width = _width + "px";
						height = _height + "px";
					}
					src = _src
			}
			this.object = this.elements[1];
			break;
		case 2 :
			with(this.elements[2]){
				width = _width - 10 + "px";
				id = obj.id + "_contant";
				if($.browser.msie){
					innerHTML = _src;
				} else {
					this.elements[2].appendChild(document.createTextNode(_src));
				}
				if( this.isAssignStyle ){
					with(style){
						width = _width + "px";
						minWidth = _width + "px";
						maxWidth = _width + "px";
						height = _height + "px";
						backgroundColor = "white";
						fontSize = "14px";
						lineHeight = "14px";
						wordBreak = "break-all";
						paddingLeft = "3px";
						paddingTop = (_height/2) + 18 + "px";
						paddingRight = "3px";
						paddingBottom = "3px";
						textAlign = "center";
					}
				} else {
					className = _style + "contant";
				}
			}
			this.object = this.elements[2];
			break;
		default:
			alert("Error:Layer's contant button num increct!");
			break;
	}

	this.getObject = function(){
		return this.object;
	}
}

function _StatusBar(_inum,_iStyle,_width,_height){
	this.elements = [];
	this.isAssignStyle = (typeof(_style) == "undefined" || _style == "")?true:false;
	this.elements[0] = document.createElement("DIV");

	//this.elements[0].className = "undefined";

	with(this.elements[0]){
		if( this.isAssignStyle ){
			with(style){
				backgroundColor = "#CCCCCC";
				width = _width + 6 + "px";
				height = _height + "px";
			};
		}else{
			className = _style + ".status";
		}
	}

	for(var iloop = 0 ; iloop  < _inum ; iloop ++ ){
		this.elements[iloop+1] = document.createElement("SPAN");
		with(this.elements[iloop+1].style){
			backgroundColor = _Layer.normal;
			width = (_width - 2)+ "px";
			height = (_height - 2 ) + "px";
		}
		this.elements[0].appendChild(this.elements[iloop+1]);
	}
	this.object = this.elements[0];
	this.getObject=function(){
		return this.object;
	}
}

function _OperationArea(oid,_iType,_iStyle,_width,_height){
	this.Type = _iType;
	this.isAssignStyle = (typeof(_style) == "undefined" || _style == "")?true:false;
	this.elements =[];
	this.elements[0] = document.createElement("DIV");
	if($.browser.msie){
		_width = _width - 5;
	}
	//this.elements[0].className = "undefined";

	this.gapEl0 = document.createElement("SPAN");
	this.gapEl0.style.width = "4px";
	this.gapEl0.style.height = _height;
	this.gapEl0.innerText = "&nbsp;";

	this.gapEl1 = document.createElement("SPAN");
	this.gapEl1.style.width = "4px";
	this.gapEl1.style.height = _height;
	this.gapEl1.innerText = "&nbsp;";

	for(var iloop  = 0 ; iloop < 6 ; iloop ++){
		this.elements[iloop+1] = document.createElement("INPUT");
		//this.elements[iloop+1].className = "undefined";
	}
	with(this.elements[0])	{
		align = "center";
		if ( this.isAssignStyle ) {
			with(style){
				width = _width;
				height = _height;
				border = 0;
				lineHeight = "14px";
				padding = "3px";
				background = "#FFF";
			}
		}else{
			className = _iStyle + ".main"
		}
	}

	with(this.elements[1]){
		type = "Button";
		value = "OK";
		if(this.isAssignStyle) {
			with(style){
				width = "40px";
				height = "20px";
				border = "1px #666 solid";
				marginBottom = "10px";
			}
		} else {
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(0,'" + oid + "');";
		} else {
			this.elements[1].setAttribute("onclick","javascript:pressButton(0,'" + oid + "');")
		}
	}

	with(this.elements[2]){
		type = "Button";
		value = "Cancel";
			if ( this.isAssignStyle ) {
			with(style){
				width = 40;
				height = 20;
				border = 0;
			}
		} else {
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(1,'" + oid + "');";
		}else{
			this.elements[1].setAttribute("onclick","javascript:pressButton(1,'" + oid + "');")
		}
	}

	with(this.elements[3]){
		type = "Button";
		value = "Retry";
			if ( this.isAssignStyle ) {
			with(style){
				width = 40;
				height = 20;
				border = 0;
			}
		}else{
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(2,'" + oid + "');";
		}else{
			this.elements[1].setAttribute("onclick","javascript:pressButton(2,'" + oid + "');")
		}
	}

	with(this.elements[4]){
		type = "Button";
		value = "Yes";
			if ( this.isAssignStyle ) {
			with(style){
				width = 40;
				height = 20;
				border = 0;
			}
		}else{
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(3,'" + oid + "');";
		}else{
			this.elements[1].setAttribute("onclick","javascript:pressButton(3,'" + oid + "');")
		}
	}

	with(this.elements[5]){
		type = "Button";
		value = "No";
			if ( this.isAssignStyle ) {
			with(style){
				width = 40;
				height = 20;
				border = 0;
			}
		}else{
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(4,'" + oid + "');";
		}else{
			this.elements[1].setAttribute("onclick","javascript:pressButton(4,'" + oid + "');")
		}
	}

	with(this.elements[6])	{
		type = "Button";
		value = "Ignore";
			if ( this.isAssignStyle )	{
			with(style)	{
				width = 40;
				height = 20;
				border = 0;
			}
		}
		else	{
			className = _iStyle + ".button"
		}
		if($.browser.msie){
			this.elements[1].onclick = "pressButton(5,'" + oid + "');";
		}else{
			this.elements[1].setAttribute("onclick","javascript:pressButton(5,'" + oid + "');")
		}
	}
	switch(this.Type){
		case 0 :
			this.elements[0].appendChild(this.elements[1]);
			break;
		case 1 :
			this.elements[0].appendChild(this.elements[1]);
			this.elements[0].appendChild(this.gapEl0);
			this.elements[0].appendChild(this.elements[2]);
			break;
		case 2 :
			this.elements[0].appendChild(this.elements[1]);
			this.elements[0].appendChild(this.gapEl0);
			this.elements[0].appendChild(this.elements[2]);
			this.elements[0].appendChild(this.gapEl1);
			this.elements[0].appendChild(this.elements[3]);
			break;
		case 3 :
			this.elements[0].appendChild(this.elements[4]);
			this.elements[0].appendChild(this.gapEl0);
			this.elements[0].appendChild(this.elements[5]);
			break;
		case 4 :
			this.elements[0].appendChild(this.elements[4]);
			this.elements[0].appendChild(this.gapEl0);
			this.elements[0].appendChild(this.elements[5]);
			this.elements[0].appendChild(this.gapEl1);
			this.elements[0].appendChild(this.elements[6]);
			break;
		default:
			alert("oparation button error");
			break;
	}
	this.object  = this.elements[0];
	this.getObject =function(){
		return this.object;
	};
}

function reSize(obj,oid){
//	var w =	obj.contentWindow.document.body.scrollWidth;
//	var h = obj.contentWindow.document.body.scrollHeight;
//	reDraw(oid,w,h);
}

function reDraw(oid,_width,_height){
	var arr = $(oid).children;
	var el_nums = arr.length;
	//var offsetX = ( _width - parsePx($(oid).style.width))/2 ;
	//$(oid).style.left = (parsePx($(oid).style.left) - offsetX) + "px";
	//$(oid + "_bg").style.left = ( parsePx($(oid + "_bg").style.left) - offsetX ) + "px";
	for (var iloop = 0 ; iloop < el_nums ; iloop ++ ){
		var objTemp = arr[iloop];
		objTemp.style.width = _width;
	}
	//$(oid + "_bg").style.width = _width;
	$(oid).style.height =( _height -  parsePx($(oid+ "_contant").style.height) + parsePx($(oid).style.height) ) + "px";
	//$(oid + "_bg").style.height = ( _height -  parsePx($(oid+ "_contant").style.height) + parsePx($(oid + "_bg").style.height) ) + "px";
	$(oid+ "_contant").style.height = _height + "px";
}

function parsePx(px){
	var ret = "";
	if( px.indexOf("px") != -1){
		ret = px.substring(0,px.length-2);
	}else{
		ret = px;
	}
	return parseInt(ret);
}


function Layer(oid){
	this.Location = _Location;
	this.Css = _Css;
	this.Title = {};
	this.Contant = {};
	this.OperationArea = {};
	this.Bar = {};
	this.Model = 0;
	this.Scroll = 0;
	//this.AutoRiszeAble = 0;
	this.Src = "";
	this.DragEnable = 1;
	this.TitleIcorn = HTTP_FILES_ROOT + "image/logo.gif";
	this.Caption = "";
	this.TitleButton = 0;
	this.StatusBar = 0;
	this.id = oid;
	this.name = "";
	this.Button = 0;
	this.LoadIcorn = HTTP_FILES_ROOT + "ico_ann.gif";
	this.LoadEffect = 0;
	this.pos = 1;
	this.BarNums = 2;
	this.zIndex = _Layer.index;
	this.Display = "none";
	this.TitleShow = true;
	this.CloseRefresh = 0;

	Layer.prototype.setPostion  = function setPostion(){
		switch(this.pos){
			case 0 :
				this.Location.top = "0px";
				this.Location.left = "0px";
				break;
			case 1 :
				//this.Location.width = Number(this.Location.width);
				//this.Location.height = Number(this.Location.height);
				var Y = ((400 - parseFloat(this.Location.height))/2)+document.documentElement.scrollTop;
				if($.browser.msie){
					var X = ((document.body.clientWidth-parseFloat(this.Location.width))/2)+document.documentElement.scrollLeft;
				}else{
					var X = ((document.body.clientWidth-parseFloat(this.Location.width) - 100)/2)+document.documentElement.scrollLeft;
				}
				//alert('X = '+X+' AND Y = '+Y);
				this.Location.top = Y;
				this.Location.left = X;
			break;
			case 2 :
			break;
			default :
			break;
		}
	}

//获取元素横坐标
	function getTop(e){
		var offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
		return offset;
	}
//获取元素的横坐标
	function getLeft(e){
		var offset=e.offsetLeft;
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
		return offset;
	}

	Layer.prototype.setRelativeXY = function(oid,id,offSetX,offSetY){
		var Y = getTop($(id));
		var X = getLeft($(id));
		$(oid).style.top = Y + offSetY;
		$(oid).style.left = X + offSetX;
	}

	Layer.prototype.setAbsoluteXY = function(oid,X,Y){
		$(oid).style.top = Y;
		$(oid).style.left = X;
	}

	/*
	创建新层
	*/
	Layer.prototype.createLayer = function (){
		var iContantHeight = this.Location.height ;
		var iContantWidth = this.Location.width ;
		if (this.TitleShow == 1){
			//iContantHeight = iContantHeight - 18;
		}
		if (this.Model ==2 ){
//			iContantHeight = iContantHeight - 20;
			iContantWidth = iContantWidth - 20;
		}
		if (this.StatusBar == 1){
			//iContantHeight = iContantHeight - 18;
		}

		this.setPostion();

		if(this.Model == 2 ){
			this.Contant = new _Contant(this,this.Src,this.Model,this.Css.cssContent,iContantWidth,iContantHeight);
		} else {
			this.Contant = new _Contant(this,this.Src,this.Model,this.Css.cssContent,this.Location.width,iContantHeight);
		}

		this.Title = new _Title(this,this.TitleIcorn,this.Caption,this.TitleButton,this.DragEnable,this.Css.cssTitle,this.Location.width,18,"1",_Layer.normal);
		this.OperationArea = new _OperationArea(this.id,this.Button,this.Css.cssButton,this.Location.width,20);
		this.Bar = new _StatusBar(this.BarNums,this.Css.cssStatus,this.Location.width,18);

		this.objectMain = document.createElement("DIV");
		this.Value = document.createElement("INPUT");
		this.Value.type = "Text";
		this.Value.value = "";
		this.Value.id = this.id + "_val";
		this.Value.style.display = "none";

		this.objectMain.className = "dialog";

		this.debug = document.createElement("DIV");
		with(this.debug.style){
			height = "500";
			width = "500";
		}

		with(this.objectMain){
			id = this.id;
			with(this.objectMain.style){
				if($.browser.msie) {
					minWidth = maxWidth = width = this.Location.width + 1 + 'px';
					minHeight = maxHeight = height = this.Location.height + 25 + 'px';
				} else {
					minWidth = maxWidth = width = this.Location.width +'px';
					minHeight = maxHeight = height = this.Location.height + 25 + 'px';
				}
				zIndex = this.zIndex;

				//$('out').innerText = width;

				left = this.Location.left + 'px';
				top = this.Location.top + 'px';
				position = "absolute";
				display = this.Display;
			}
			this.objectMain.OnMouseDown = "getFocus('" + this.id + "');";
		}

		if(this.TitleShow){
			this.objectMain.appendChild(this.Title.getObject());
			//this.Title.getObject().style.width = this.Location.width + 'px';
			//$('out').innerText += this.Title.getObject().style.width;
		}

		this.objectMain.appendChild(this.Contant.getObject());
		if(this.Model == 2){
			this.objectMain.appendChild(this.OperationArea.getObject());
		}
		if(this.StatusBar == 1){
			this.objectMain.appendChild(this.Bar.getObject());
		}

		if(DEBUG){
			this.debug.appendChild(this.objectMain);
			//this.debug.appendChild(this.objectShowdow);
			alert(this.debug.innerHTML);
			document.write(this.debug.innerHTML);
		} else {
			this.debug.appendChild(this.objectMain);
			//this.debug.appendChild(this.objectShowdow);
			if($.browser.msie)	{
				document.body.insertAdjacentHTML("beforeEnd",this.debug.innerHTML.replace("<IFRAME","<IFRAME onload=\"reSize(this,'"+this.id+"');\""));
			} else {
				document.body.insertAdjacentHTML("beforeEnd",this.debug.innerHTML);
			}
			if(this.Model != 2 ){
				$(this.id + "_contant").src = this.Src;
			}

			if(this.Model == 1){
				if($.browser.msie){
					;
				} else {
//					$(this.id+"_contant").contentDocument.body.setAttribute("onload","parent.frameResize('"+this.id+"')");
//					$(this.id+"_contant").contentDocument.body.setAttribute("onresize","parent.frameResize('"+this.id+"')");

				}
			}
		}
	}
}


function frameResize(oid)	{
	var container = window.parent.$(oid);
	var title = container.childNodes[0];
	var iframe = window.parent.$(oid+'_contant');
	//var bg = window.parent.$(oid+'_bg');

	var cw = $(oid+"_contant").contentDocument.documentElement.scrollWidth;
	var ch = $(oid+"_contant").contentDocument.documentElement.scrollHeight;
	container.style.height = ch + 'px';
	container.style.width = cw + 'px';
	iframe.style.width = cw + 'px';
	iframe.style.height = ch + 'px';
//	title.style.width = cw - 10 + 'px';
}