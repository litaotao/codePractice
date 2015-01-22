/******************************
 *话费充值js
 */
//校验是否为手机号，返回布尔值
function isMobel(value) {
	if (/^13\d{9}$/.test(value) || (/^15\d{9}$/.test(value))
			|| (/^14\d{9}$/.test(value)) || (/^18\d{9}$/.test(value))) {
		return true;
	} else {
		return false;
	}
}
//通用校验器
var VerifyObj = {};
VerifyObj.ajaxFlag = false;//如果ajax未通过则false

//验证手机号码是否正确
VerifyObj.checkMobilePhoneNumber = function(numInputEl,numErrEl) {
	if (numInputEl.value!= '' && isMobel(parseInt(numInputEl.value))) {
		numErrEl.style.display = "none";
		numErrEl.innerHTML = "";
		return true;
	} else {
		numErrEl.style.display  = "";
		document.getElementById("mobileArea").innerHTML='';//如果是没有，就将显示手机地区的去掉
		var tmp = document.getElementById("selectFaceValueWrap").getElementsByTagName("INPUT");//初始化面值的值
		for( var i =0; i< tmp.length;i++) {
			if(tmp[i].type=="radio"&&tmp[i].checked) {
				var range=tmp[i].range;
				var range=tmp[i].getAttribute('range');
				if(range) {
					document.getElementById("returnPrice").innerHTML = range + '<span class="black1 fwn">元</span>';
				} else {
					document.getElementById("returnPrice").innerHTML = '<span class="err">' + '暂时缺货' + '</span>';
				}
				break;
			}
		}
		if(numInputEl.value == '') {
			numErrEl.innerHTML = "手机号码不能为空！";
		} else {
			numErrEl.innerHTML = "手机号码错误！";
		}
		return false;
	}
};
//通用校验器结束
//<!--获取价格及手机号码校验-->
//构造函数，参数mobilePhoneNumberInputEl：手机号码输入框，radiosWrap：单选元素包裹父元素，priceEl：价格显示元素框。ajaxURL：ajax的URL，参数为面值，数量，号码，返回为meg，如果是数字，则填入价格，如果为其他则填入错误信息
function prePaidPhoneMgr(arg) {
	var THIS = this;
	var numberInputEl = arg.mobilePhoneNumberInputEl;//手机号码输入input
	var numberErrEl = arg.mobilePhoneNumberErrEl;//错误信息提示dom
	var numberSureTrEl = document.getElementById("sureTr");//确认所用的tr的dom
	var numberSure=arg.mobilePhoneSureNumberEl;//确认手机号码信息dom
	var numberSureErrEl = arg.mobilePhoneSureNumberErrEl;//确认手机号码错误信息dom
	var numberSureShow = false;//默认隐藏确认框
	var chargeNumEl = arg.chargeNumEl;//充值张数，目前默认是1张
	var radiosWrapEl = arg.radiosWrapEl;//价格范围单选
	var PriceEl = arg.PriceEl;//价格显示dom
	var mobileAreaEl = arg.mobileAreaEl;//手机归属地dom
	var ajaxURL = arg.ajaxURL;
	var isSuggest=arg.isSuggest;//是否开启手机号记录提示功能

	//预加载loading图片
	function advanceLoadImage(srcURL) {
		var img =  new Image();
		img.src = srcURL;
	}

	//检测是否所有表单项正确
	this.checkAllItemsIsTrue = function() {
		inputNumCheck();
		if(numberInputEl.value!==""  &&  numberErrEl.innerHTML =="" && VerifyObj.ajaxFlag == true) {
			if(isSuggest) {//提交的时候如果验证通过，将这个手机号码保存到本地
				if(LS.item('phoneNumbers')) {//如果从本地取到这个值
					var re=new RegExp(numberInputEl.value);
					var allLocalPhoneNumbers = LS.item('phoneNumbers').split(',');//取到所有存储到本地的号码
					if(allLocalPhoneNumbers.length>100){//如果存储的号码超过100个,就去掉前50个，保证缓存中永远只有100个号码
						allLocalPhoneNumbers=allLocalPhoneNumbers.slice(49,100);
						LS.item('phoneNumbers',allLocalPhoneNumbers.toString());
					}
					if(!re.test(LS.item('phoneNumbers'))) {
						LS.item('phoneNumbers',[LS.item('phoneNumbers'),numberInputEl.value].toString());
					}
				} else {
					LS.item('phoneNumbers',[numberInputEl.value].toString());
				}
			}
			return true;
		} else {
			return false;
		}
	}
	//清除非数字的输入
	function clearNoNum(e) {
		e = e|| window.event;
		var keyCode = e.keyCode;
		//如果是数字，或者小键盘数字，或者光标符号，或者删除键，或者回退键，或者微软智能abc输入数组（229）才允许输入。
		if(!((keyCode <= 57 && keyCode >= 48) ||(keyCode <= 105 && keyCode >= 96) || keyCode == 39 || keyCode == 37 || keyCode == 8 || keyCode == 46 || keyCode == 229 )  ) {
			e.returnValue = false;
			e.preventDefault && e.preventDefault();
		}
	}

	function inputNumCheck() {
		return VerifyObj.checkMobilePhoneNumber(numberInputEl,numberErrEl);
	}

	function clearRadioWarp() {//清除上次访问残留的值
		var tmp = radiosWrapEl.getElementsByTagName("INPUT");//初始化面值的值
		for( var i =0; i< tmp.length;i++) {
			if(tmp[i].getAttribute('area')) {
				tmp[i].removeAttribute('area');
			}
			if(tmp[i].getAttribute('productList')) {
				tmp[i].value=tmp[i].getAttribute('productList');//还原value里面的值
				tmp[i].removeAttribute('productList');
			}
			if(tmp[i].getAttribute('price')) {
				tmp[i].removeAttribute('price');
			}
		}
	}

	//话费充值ajax返回数据处理
	this.huafeiAjaxCallback = function(data) {
		clearRadioWarp();
		if(!data||data.indexOf("错误页面") >= 0) {
			VerifyObj.ajaxFlag  = false;
			document.getElementById("returnPrice").innerHTML = '<span class="err">' + '暂时缺货' + '</span>';
		} else {
			var jsonObj = eval ("(" + data + ")");
			if(jsonObj&&jsonObj.productList&&jsonObj.productList.length)//数字
			{
				var tmp = radiosWrapEl.getElementsByTagName("INPUT");//初始化面值的值
				var defaultPrice='';//页面初始化默认面值为100时取它的优惠价格
				var defaultArea='';
				var defaultData=false;//看看页面默认选中的那个项是否能够取到数据，如果取不到，系统自动帮用户取个有面值的，顺序是先看100，在看50 在看300在看30最后看500面额的
				var faceValueCheckBox={};//将所有有数据的面值以键值对的形式保存，键是facevalue，值是checkBox对象
				for( var i =0; i< tmp.length;i++) {
					if(tmp[i].type=="radio") {
						var faceValue = tmp[i].value;
						var  productList=jsonObj.productList;
						for(var j=0;j<productList.length;j++) {
							if(productList[j].listPrice==faceValue) {
								faceValueCheckBox[faceValue]=tmp[i];//像faceValueCheckBox存值
								tmp[i].setAttribute('area',productList[j].attribution); //将地区写到dom中
								tmp[i].value=productList[j].productId;//设置value的值
								tmp[i].setAttribute('productList',productList[j].listPrice); //将原面值写到dom中
								tmp[i].setAttribute('price',productList[j].price); //将打折面值写到dom中
								break;
							}
						}
						if(tmp[i].checked) {
							if(tmp[i].getAttribute('price')) {//如果取到购买价格
								PriceEl.innerHTML = '<span class="return-price">' + tmp[i].getAttribute('price') + '<span class="black1 fwn">元</span></span>';
								mobileAreaEl.innerHTML =  tmp[i].getAttribute('area');
								mobileAreaEl.style.display='inline';
								numberErrEl.innerHTML = '';
								if(numberSureTrEl.style.display=='none') {//请求回来后将提交按钮弄成可以用
									document.getElementById('btnSubmitData').removeAttribute('disabled');
								}else{
									sureNumber();
								}
							} else {
								document.getElementById("returnPrice").innerHTML = '<span class="err">' + '暂时缺货' + '</span>';
								mobileAreaEl.innerHTML ='';
								numberErrEl.innerHTML = '';
								defaultData=true;//取不到默认面值的数值，系统自动去重新选择面值
							}
						}
					}
				}
				if(defaultData){
					changeDefaultFaceValue(faceValueCheckBox);//调用改变选中面值的方法
				}
				VerifyObj.ajaxFlag  = true;

			} else {//不是数字，为错误提示
				mobileAreaEl.innerHTML = '';
				PriceEl.innerHTML = '<span class="err">' + '暂时缺货' + '</span>';
				VerifyObj.ajaxFlag  = false;

			}

		}
	}
	
	function changeDefaultFaceValue(faceValueCheckBox){//改变选中面值的方法
		if(faceValueCheckBox['100']){
			faceValueCheckBox['100'].click();//调用click方法选中
		}else if(faceValueCheckBox['50']){
			faceValueCheckBox['50'].click();
		}else if(faceValueCheckBox['300']){
			faceValueCheckBox['300'].click();
		}else if(faceValueCheckBox['30']){
			faceValueCheckBox['30'].click();
		}else if(faceValueCheckBox['500']){
			faceValueCheckBox['500'].click();
		}
	}
	function openSuggest() {//自动提示功能调用
		var value=numberInputEl.value;//取到手机号码
		var localFrame=document.getElementById('search_tips_frame');
		var ul=document.getElementById('search_tips');
		if(value==''||isMobel(value)) {//如果value是空的就返回
			ul.style.display='none';
			localFrame.style.display='none';
			return;
		}

		var allLocalPhoneNumbers=LS.item('phoneNumbers');//取到本地所有的号码
		if(allLocalPhoneNumbers) {
			allLocalPhoneNumbers = allLocalPhoneNumbers.split(',');
			if(allLocalPhoneNumbers&&allLocalPhoneNumbers.length) {//本地存储中有数据
				var numberInputElParent=numberInputEl.parentNode;
				ul.innerHTML='';
				var localContainer=document.createDocumentFragment();//创建一个临时的碎片文档
                ul.selectIndex=-1;
                var index=0;
				for(var m=allLocalPhoneNumbers.length-1,k=1;m>=0;m--,k++) {
					var onePhone=allLocalPhoneNumbers[m];//取其中一个号码，取最后次输入的号码
					if(k>9) {
						break;
					}
					if(onePhone&&onePhone.toString().search(value)!=-1) {//如果用户输入号码匹配
						var li=document.createElement('li');
						li.innerHTML=onePhone;
						li.index=index;
						index++;
						localContainer.appendChild(li);
					}
				}
				ul.appendChild(localContainer);
				if(ul.childNodes.length) {//如果下拉框里面有值的
					ul.style.width=(numberInputEl.offsetWidth-2)+"px";
					ul.style.display='block';
					ul.style.left='0px';
					ul.style.top=(numberInputEl.offsetTop+numberInputEl.offsetHeight-1)+'px'//这里高度的计算是input距顶部的高度加上input的高度，减去input下边框的宽度
					localFrame.style.top=ul.style.top;
					localFrame.style.height=(ul.offsetHeight+numberInputEl.offsetTop)+'px';
					localFrame.style.width=ul.offsetWidth+'px';
					localFrame.style.display='block';
				} else {
					ul.style.display='none';
					localFrame.style.display='none';
				}

			}
		}
	}

	function createSuggest() {//创建自动提示的功能------ul中添加一个iframe用来防止ie select遮不住的问题
		var numberInputElParent = numberInputEl.parentNode;
		if(!document.getElementById('search_tips')) {//没有找到这个标签的情况
			var inputSpan=document.createElement('span');
			var inputNextElement=numberInputEl.nextSibling;//input后面的一个元素
			var ul=document.createElement('ul');
			ul.id='search_tips';
			ul.style.display='none';
			ul.selectIndex=-1;//默认位置为-1
			ul.className='huafei_suggest_list';
			var localFrame=document.createElement('iframe');
			localFrame.id='search_tips_frame'
			localFrame.src='javascript:false';
			localFrame.style.frameborder='no';
			localFrame.style.display='none';
			localFrame.className='huafei_iframe';
			inputSpan.appendChild(numberInputEl);
			inputSpan.appendChild(ul);
			inputSpan.appendChild(localFrame);
			inputSpan.style.position='relative';
			inputSpan.style.display='inline-block';
			inputSpan.className='huafei_suggest_box';
			numberInputElParent.insertBefore(inputSpan,inputNextElement);//插回原位置
			if(!ul.onmouseover) {//判断是否有事件
				ul.onmouseover= function(e) {
					var  eventObj=window.event||e;
					var target=eventObj.srcElement||eventObj.target;
					if(target.nodeName.toUpperCase()=='LI') {
						if(typeof ul.selectIndex=='number'&&ul.selectIndex!=-1) {
							ul.childNodes[ul.selectIndex].className='';
						}
						ul.selectIndex=target.index;
						target.className='huafei_list_focus';
					}
				}
			}
			if(!ul.onclick) {
				ul.onclick= function(e) {//点击将值填充到li中去
					var  eventObj=window.event||e;
					var target=eventObj.srcElement||eventObj.target;
					if(target.nodeName.toUpperCase()=='LI') {
						numberInputEl.value=target.innerHTML;
						numberSure.value=target.innerHTML;
						numberInputEl.focus();//焦点回到input
						inputNumCheck();
						getData();
						ul.selectIndex=target.index;
						ul.style.display='none';
						localFrame.style.display='none';
						return;
					}
				}
			}
			ev.addEvent(document,'click', function() {//添加页面事件
				var status=false;
				if(ul.style.display!='none'){
					status=true;
			    }
				ul.style.display='none';
				localFrame.style.display='none';
                if(status){
               	  getData(); 
               }
				
			});
		}
	}

	function suggestKeyEvent(){		
		if(isSuggest) {
			var eventObj=ev.getEvent();
			var keyCode=eventObj.keyCode;
			if(((keyCode <= 57 && keyCode >= 48) ||(keyCode <= 105 && keyCode >= 96) || keyCode == 39 || keyCode == 37 || keyCode == 8 || keyCode == 46 || keyCode == 229 )) {
				window.setTimeout(openSuggest,10);
			}
			var ul=document.getElementById('search_tips');
			var localFrame=document.getElementById('search_tips_frame');
			var selectIndex=ul.selectIndex;			
			if(ul.style.display == "block"&&(keyCode == 40||keyCode == 38)) {
				var allItems=ul.childNodes;
				var allItemsLength=allItems.length;
				if(keyCode==38) {//向上
					if(selectIndex>0) {
						selectIndex--;
					} else {
						selectIndex=allItemsLength-1;
					}
				}
				if(keyCode==40) {//向下
					if(selectIndex<allItemsLength-1) {
						selectIndex++;
					} else {
						selectIndex=0;
					}
				}
				if(ul.selectIndex!=-1) {
					ul.childNodes[ul.selectIndex].className='';
				}
				ul.childNodes[selectIndex].className='huafei_list_focus';
				//numberInputEl.value=ul.childNodes[selectIndex].innerHTML;
				ul.selectIndex=selectIndex;//设置新的位置
			} else if(keyCode == 9) {//tab键默认选第一个
				if(ul.childNodes.length) {
					numberInputEl.value=ul.childNodes[0].innerHTML;
					numberSure.value=ul.childNodes[0].innerHTML;
					ul.style.display='none';
					localFrame.style.display='none';
				}
			} else if(keyCode == 13) {//点击enter键表明选中，然后去后台取值
			   if(typeof selectIndex !=undefined&&selectIndex>-1&&selectIndex<ul.childNodes.length){
			  	 numberInputEl.value=ul.childNodes[selectIndex].innerHTML;
				 numberSure.value=ul.childNodes[selectIndex].innerHTML;
				 getData()//像后台发送请求获取数据
			   }
				ul.style.display='none';
				localFrame.style.display='none';
			}
		}
	}

	//对输入手机号码绑定事件
	function inputPhoneNumberEventBind() {

		numberInputEl.onblur = function(e) {
			inputNumCheck();
		};
		numberInputEl.onclick = function(e) {
			if(this.value=='请输入充值号码'){this.value='';this.style.color='#000'};
			this.select();
		};
		numberInputEl.onkeydown = function(e) {
			clearNoNum(e);
		};
		numberInputEl.onkeyup = function(e){
			if(numberInputEl.value==''){
				numberSure.value='';
				}
			var eventObj =window.event||e;			
			if(isSuggest) {
			  suggestKeyEvent(eventObj);	
			}
			if(eventObj.keyCode!=37&&eventObj.keyCode!=38&&eventObj.keyCode!=39&&eventObj.keyCode!=40){//当按键是上下左右的时候不发起请求
				 if(eventObj.keyCode==13&&isSuggest){
			     }else{
			     getData()//像后台发送请求获取数据
			     }
			}
			if(!numberSureShow && eventObj.keyCode!=13){numberSureTrEl.style.display='';numberSureShow=true};
			if(eventObj.keyCode==9){
				numberSure.focus();
			}			
		};
		//确认号码绑定事件
		numberSure.onblur = function() {
			sureNumber();
		};
		numberSure.onclick = function(e) {
			if(this.value=='再次输入充值号码'){this.value=''};
			this.style.color='#000';
			this.select();
		};
		numberSure.onkeydown = function(e) {
			clearNoNum(e);
		};
		numberSure.onkeyup = function(e){
			var eventObj =window.event||e;
			if(isSuggest) {
			  suggestKeyEvent(eventObj);	
			}
			if(eventObj.keyCode==13 || this.value.length==11){
				sureNumber();
			     }
			
		};
		
	}
	function getData() {//向后台发送请求获取数据
		//如果长度为11位且号码校验正确
		if(isMobel(numberInputEl.value)) {
			inputNumCheck();
			var chargeAccount = numberInputEl.value;
			if(typeof(IMG3BASE) == 'undefined'){
				var IMG3BASE = '';
			}
			PriceEl.innerHTML = '<span class="f_s_12"><img width="16px" height="16px" src="http://img3.126.net/shop/images/loading1.gif">正在加载...</span>';	
			//跨域请求
			var jsonpFlag = jQuery('#jsonpflag'), tmpObj = {};
			if(jsonpFlag && jsonpFlag.val() == 1) {
				var url = ajaxURL + '?chargeAccount='+chargeAccount+'&jsoncallback=?&t=' + new Date().getTime();
				$.getJSON(url, function(data){
					if(data){
						tmpObj['productList'] = data;
						data = JSON.stringify(tmpObj);
						THIS.huafeiAjaxCallback(data);
					}
				});
			}else{ //非跨域请求
				var sendData = "chargeAccount=" + chargeAccount;
				VerifyObj.ajaxFlag  = false;
				XMLHttp.sendReq('POST',ajaxURL,sendData, function (xmlHttpObj) {			
					var data = xmlHttpObj.responseText;
					THIS.huafeiAjaxCallback(data);
				});//(method, url, data, callback,arg)
			}
		}
	}
	function sureNumber(){//比较两次输入是否相同
		if(isMobel(numberInputEl.value) && isMobel(numberSure.value)){
			if(numberInputEl.value!=numberSure.value){
				numberSureErrEl.style.display='';
				numberSureErrEl.innerHTML="输入不一致，请确认";
				document.getElementById('btnSubmitData').setAttribute('disabled','disabled');
				return false;
			}else{
				numberSureErrEl.style.display='none';
				numberSureErrEl.innerHTML="";
				document.getElementById('btnSubmitData').removeAttribute('disabled');
				return true;
			}
		}else{
			numberSureErrEl.style.display='';
			numberSureErrEl.innerHTML="输入号码错误";
			if(numberSure.value=='再次输入充值号码' || numberSure.value==''){numberSureErrEl.innerHTML="请再次输入手机号码"};
			document.getElementById('btnSubmitData').setAttribute('disabled','disabled');
			return false;
		}
	}
	//对选择面值的事件绑定
	function selectFaceValueEventBind() {
		radiosWrapEl.onclick = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			//显示区间控制
			if(target.tagName == "INPUT" && target.name == "productId" && !isMobel(numberInputEl.value)) {
				var rangle = target.getAttribute("range");
				PriceEl.innerHTML = rangle + '<span class="black1 fwn">元</span>';
			}
			if(target.tagName == "INPUT" && target.name == "productId" && isMobel(numberInputEl.value)) {//手机号已经存在的情况下
				var price=target.getAttribute("price");
				if(price) {
					PriceEl.innerHTML = '<span class="return-price">' + price + '<span class="black1 fwn">元</span></span>';
					mobileAreaEl.innerHTML =  target.getAttribute("area");
					mobileAreaEl.style.display='inline';
					if(numberSureTrEl.style.display=='none') {//请求回来后将提交按钮弄成可以用
						document.getElementById('btnSubmitData').removeAttribute('disabled');
					}else{
						sureNumber();
					}
				} else {
					document.getElementById("returnPrice").innerHTML = '<span class="err">' + '暂时缺货' + '</span>';
					mobileAreaEl.innerHTML ='';
					numberErrEl.innerHTML = '';
					if(document.getElementById('btnSubmitData')) {
						document.getElementById('btnSubmitData').setAttribute('disabled','disabled');
					}
				}
			}
		}
	}

	//提交绑定，由于比较不一致，在此单独处理
	function submitBtnsEventBind() {

	}

	this.eventBind = function() {
		inputPhoneNumberEventBind();//手机输入绑定事件
		selectFaceValueEventBind();//选择面值绑定事件
		//submitBtnsEventBind();
	};
	//返回上一步处理
	function goBackCallBack() {

	}

	this.init = function() {
		goBackCallBack();
		advanceLoadImage('http://img3.126.net/shop/images/loading1.gif');		
		THIS.eventBind();
		if(isSuggest) {//如果有提示功能点击空白处隐藏提示
			createSuggest();
		}
       window.onload= function() {//从其他页面跳转过来如果手机号码有的话，直接发送请求
			if(isMobel(parseInt(numberInputEl.value))) {
				getData();//发送请求
			};
       }
	}
	THIS.init();
}

var prePaidPhoneMgr = new prePaidPhoneMgr({
	prePaidFormEl:document.getElementById("prePaidForm1"),//话费充值表单
	mobilePhoneNumberInputEl: document.getElementById("chargeAccount"),//号码输入框
	mobilePhoneNumberErrEl: document.getElementById("chargeAccountErr"),//号码错误提示元素
	mobilePhoneSureNumberEl: document.getElementById("sureAccount"),//确认输入框
	mobilePhoneSureNumberErrEl: document.getElementById("sureAccountErr"),//确认错误提示元素
	chargeNumEl: document.getElementById("chargeNum"),//充值张数
	radiosWrapEl: document.getElementById("selectFaceValueWrap"),//充值面额包裹父元素
	PriceEl: document.getElementById("returnPrice"),//价格
	mobileAreaEl:document.getElementById("mobileArea"),
	ajaxURL:HUAFEI_AJAX_URL,//ajax
	isSuggest:(typeof LS=='object')?true:false//自动提示功能是否开启,这个功能需要ls.js的支持，ls.js是一个处理userData和localStorage(ls类如果找不到就不加载自动提示功能)
} );
 
/**
 * 按钮不可以用
 */
if(document.getElementById('btnSubmitData')) {
	document.getElementById('btnSubmitData').setAttribute('disabled','disabled');
}

 
//点击接受用户协议的ui处理
//clickAcceptCheckboxUISet("agreement","btnSubmitData","btn-orderbg6-disable");
