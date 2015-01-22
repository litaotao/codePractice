(function($){
    var oParams		= {
		'sCheckUrl'		: '/personServe/authenticated_users/entrance.php?mode=ajax&doaction=ajax_email_check&request_type=rz_check',	// 检查认证的地址
		'sWboxUrl'		: '/personServe/authenticated_users/entrance.php?mode=weebox&doaction=email_check',	// 弹出框的地址
		'sCheckLoginUrl': '/personServe/authenticated_users/entrance.php?mode=ajax&doaction=ajax_email_check&request_type=check_login', // 是否登录地址
		'sWboxWidth'	: 620,
		'sWboxHeight'	: 420,
		'sRenzhengList'	: [],
		'sClickIndex'	: 0,
		'sDoubleCheck'	: 0,// 邮箱和手机验证的切换使用 默认0可以切换 1不可以切换
		'sTipCookie'	: 'job1001_cookie_tips_name',
		'nTipNum'		: 1 // 提示的次数（用于邮件成功后台的弹出提示次数，0表示不限制次数）

    };
	
	// 加载需要的css和js
	fnAppendDoc({
      sDocType  : "link",
      sDocName  : "yz_reg",
      sDocUrl   : "http://img3.job1001.com/position_new/style/yz_reg.css"
    });
	fnAppendDoc({
      sDocType  : "link",
      sDocName  : "module",
      sDocUrl   : "http://img3.job1001.com/common_module/style/module.css"
    });
	fnAppendDoc({
      sDocType  : "script",
      sDocName  : "job1001inputValueTips",
      sDocUrl   : "http://j.job1001.com/job1001inputValueTips/job1001inputValueTips.js"
    });
	fnAppendDoc({
      sDocType  : "script",
      sDocName  : "jquery.validator",
      sDocUrl   : "http://j.job1001.com/validator/jquery.validator.js"
    });
	
	// 调用方法
    var Job1001Renzheng = function(params){
		oParams	= $.extend(oParams, params);
    }
	$.extend({Job1001Renzheng : Job1001Renzheng});
	
	$.Job1001Renzheng.fnRenzhengCheck	= function(index, param){
		oParams.sClickIndex	= index;
		if( typeof param != 'undefined' ){
			oParams.sRenzhengList[index].fnCheckSucessParam = param;
		} else {
			oParams.sRenzhengList[index].fnCheckSucessParam	= '';
		}
		// 判断是否检测过用户的认证信息
		$.ajax({
			url: oParams.sCheckUrl + '&item=' + oParams.sRenzhengList[index].fnCheckSucessParam,
			dataType: 'jsonp',
			jsonp: 'jsonp_callback',
			jsonpCallback:"fnRenzhengCallBack",
			data: '',
			success: function(nReturnData) {},
			error: function(XMLHttpRequest, textStatus, errorThrown){ }
		});
	}
	
	// 检查用户的认证信息
	$.Job1001Renzheng.fnRenzhengCallBack = function(data) {
		if ( data.status == 'OK' ) {
		// 已完成认证
			if( typeof oParams.sRenzhengList[oParams.sClickIndex].fnCheckSucess != 'undefined' ){
				oParams.sRenzhengList[oParams.sClickIndex].fnCheckSucess(oParams.sRenzhengList[oParams.sClickIndex].fnCheckSucessParam);
			}
		} else {
		// 未完成认证
			fnRenzhengBox(data.info.type, data.info.step, data.info.uname);
		}
	}
	
	// 邮箱认证超时处理
	$.Job1001Renzheng.fnRenzhengEmailTimeout = function() {
		var d = {
			title:'提示',
			timeout: 3
		}
		$.weeboxs.close();
		$.weeboxs.open('<div style="font-size:13px;font-weight:bold;padding:25px;">邮箱验证链接已超时，请重新验证！</div>',d);
	}
	
	// 从当前url中获得param
	var fnGetParamByLocation	= function(name) {
		var value;
		var url		= location.href;
		if ( url.indexOf('?') != -1 ) {
			url	= location.href.substr(location.href.indexOf('?')+1);
			var urlArr	= url.split('&');
			for(key in urlArr) {
				var kv	= urlArr[key].split('=');
				if ( kv[0] == name )  {
					value	= kv[1];
					break;
				}
			}
		}
		return value;
	}
	
	// 邮箱认证成功页面跳转后要调用的方法
	$.Job1001Renzheng.fnRenzhengEmailSuccess = function(index, param) {
		// 从当前url中的获得参数
		var check_status		= fnGetParamByLocation('check_status');
		var tips_index			= fnGetParamByLocation('tips_index');
		var cookie_select_item	= fnGetParamByLocation('cookie_select_item');
		if ( check_status ) {
			$.ajax({
				url: oParams.sCheckLoginUrl,
				dataType: 'json',
				data: '',
				success: function(d) {
					if ( d.status == 'OK' ) {
						// 已登录
						if ( tips_index != 'undefined' ) {
							index	= tips_index;
						}
						if ( cookie_select_item != 'undefined' ) {
							param	= cookie_select_item;
						}
						
						// 参数赋值
						if ( index ) {
							if ( param ) {
								oParams.sRenzhengList[index].fnCheckSucessParam = param;
							}
							oParams.sClickIndex	= index;
						}
						
						if ( check_status == 'deal_ok' || check_status == 'check_again') { // 验证OK
							// 打开成功的窗口
							var tip_num	= parseInt(0+$.Job1001Renzheng.cookie(oParams.sTipCookie));
							if ( tip_num < oParams.nTipNum || oParams.nTipNum <= 0 ) {
								fnRenzhengBox('email', 3, '');
								// 记录弹出次数
								tip_num++;
								$.Job1001Renzheng.cookie(oParams.sTipCookie, tip_num);
							}
						} else if ( check_status == 'overtime' ) { // 邮箱认证过期
							$.Job1001Renzheng.fnRenzhengEmailTimeout();
						}
					} else {
						// 未登录
						location.href	= '/personServe/login.php?comeurl=exit&jumpurl='+encodeURIComponent(location.href);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){ }
			});
		}
	}
	
	// 手机认证成功调用的方法
	$.Job1001Renzheng.fnRenzhengMobileSuccess = function() {
		oParams.sRenzhengList[oParams.sClickIndex].fnCheckSucess(oParams.sRenzhengList[oParams.sClickIndex].fnCheckSucessParam);
	}
	
	// 成功弹出框中的继续按钮事件
	$.Job1001Renzheng.doSuccessAction = function(index, param) {
		oParams.sRenzhengList[index].fnCheckSucess(param);
	}
	
	// 弹出认证框
	function fnRenzhengBox(type, step, uname, close) {
		var sTitle	= '温馨提示：需要认证您的相应资料才能' + oParams.sRenzhengList[oParams.sClickIndex].sTitle + '哟!';
		var sBtntips= oParams.sRenzhengList[oParams.sClickIndex].sGoonTitle;
		var url		= oParams.sWboxUrl + '&type=' + type + '&step=' +step + '&uname=' + uname + '&btntips=' + sBtntips + '_' + oParams.sClickIndex+'&double_check='+oParams.sDoubleCheck;
		var param	= {
			title:sTitle,
			contentType:'ajax',
			width:oParams.sWboxWidth,
			height:oParams.sWboxHeight
		};
		$.weeboxs.open(url, param);
	}
	
	// 加载js或css 
	function fnAppendDoc(oOptions){
		/*
		  sDocType        插入类型          script/link
		  sDocName        插入文件名        不是url！！！只是文件名
		  sDocUrl         插入文件地址       插入url
		*/
		var jTempDocTypeScript	= $('script');
		var jTempDocTypeCss		= $('link');
		var jAppendHead			= $('head');
		var bIsHave             = false;

		switch(oOptions.sDocType) {
			case 'script':
				jTempDocTypeScript.each(function(){
					if(!($(this).attr('src')===undefined) && ($(this).attr('src').indexOf(oOptions.sDocName)==-1))//如果不重复则为true
					{
						bIsHave=true;
					}
				});
				if(bIsHave) {
					jAppendHead.append('<script src="'+oOptions.sDocUrl+'"></script');
				}
				break;
			case 'link':
				jTempDocTypeCss.each(function(){
					if(!($(this).attr('href')===undefined) && ($(this).attr('href').indexOf(oOptions.sDocName)==-1))//如果不重复则为true
					{
						bIsHave=true;
					}
				});
				if(bIsHave) {
					jAppendHead.append('<link type="text/css" href="'+oOptions.sDocUrl+'" rel="stylesheet">');
				}
				break;
		}
	}
	// cookie
	$.Job1001Renzheng.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);