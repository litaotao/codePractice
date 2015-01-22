var ifeng = ifeng || {};
ifeng.app = ifeng.app || {};
ifeng.util = ifeng.util || {};
ifeng.ui = ifeng.ui || {};

//通用的 JavaScript 函数
var urlset = 'com';
var curHost = window.location.host;
if(urlset == 'lc') {
	var HTTP_BLOG_ROOT = "http://blog-lc.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-lc.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-lc.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile-lc.ifeng.com/';
}
if(urlset == 'de') {
	var HTTP_BLOG_ROOT = "http://blog-de.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-de.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-de.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile-de.ifeng.com/';
}
if(urlset == 'com') {
	var HTTP_BLOG_ROOT = "http://"+curHost+"/";
	var HTTP_GROUP_ROOT = "http://q.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin.ifeng.com/";
	var HTTP_FILES_ROOT = 'http://blogfile.ifeng.com/uploadfiles/';
}

/************************************************************************************
 * 独立BASE
 * ***********************************************************************************/

ifeng.util.Dom = {
	getEl : function(el) {
		if (!el) {
			return null;
		} else if (typeof el == 'string') {
			return document.getElementById(el);
		} else if (typeof el == 'object') {
			return el;
		}
	},
	getElements : function(els) {
		var _els = [];
		if (els instanceof Array) {
			for ( var i = 0; i != els.length; i++) {
				_els[_els.length] = this.getEl(els[i]);
			}
		} else if (typeof els == 'object'
				&& typeof els['length'] != 'undefined' && els['length'] > 0) {
			for ( var i = 0; i != els.length; i++) {
				_els[_els.length] = this.getEl(els[i]);
			}
		} else {
			_els[0] = this.getEl(els);
		}
		return _els;
	},
	_batch : function(els, func) {
		try {
			els = this.getElements(els);
			for ( var i = 0; i < els.length; i++) {
				func(els[i]);
			}
		} catch (e) {
			// alert(e.description)
		}
	},
	hide : function(els) {
		var _run = function(el) {
			el.style.display = 'none';
		};
		this._batch(els, _run);
	},
	show : function(els) {
		var _run = function(el) {
			el.style.display = 'block';
		};
		this._batch(els, _run);
	},
	getClass : function(el) {
		if (this.getEl(el)) {
			return this.getEl(el).className;
		} else {
			return;
		}
	},
	setClass : function(els, val) {
		var _run = function(el) {
			el.className = val;
		};
		this._batch(els, _run);
	},
	addClass : function(els, val) {
		if (!val) {
			return;
		}
		var _run = function(el) {
			var _cln = el.className.split(' ');
			for ( var i = 0; i != _cln.length; i++) {
				if (_cln[i] == val) {
					return;
				}
			}
			if (el.className.length > 0) {
				el.className = el.className + ' ' + val;
			} else {
				el.className = val;
			}
		};
		this._batch(els, _run);
	},
	hasClass : function(el, val) {
		var _bl = false;
		if (this.getEl(el)) {
			if (!el.className) {
				return;
			}
			var _cln = el.className.split(' ');
			for ( var i = 0; i != _cln.length; i++) {
				if (_cln[i] == val) {
					_bl = true;
					break;
				}
			}
		}
		return _bl;
	},
	removeClass : function(els, val) {
		if (!val) {
			return;
		}
		var _run = function(el) {
			var _cln = el.className.split(' ');
			var _s = '';
			for ( var i = 0; i != _cln.length; i++) {
				if (_cln[i] != val) {
					_s += _cln[i] + ' ';
				}
			}
			if (_s == ' ') {
				_s = '';
			}
			if (_s.length != 0) {
				_s = _s.substr(0, _s.length - 1);
			}
			el.className = _s;
		};
		this._batch(els, _run);
	},
	getElementsByClassName : function(parentEl, className, tagName) {
		if (!parentEl || !className)
			return null;

		var els = cds = [];
		cds = ifeng.util.Dom.getEl(parentEl).childNodes;
		className = className.toUpperCase();
		for ( var i = 0; i < cds.length; i++) {
			var _type = cds[i].nodeType;
			if (_type != 3 && _type != 8 && cds[i].className.toUpperCase() == className) {
				if (!tagName || cds[i].nodeName.toUpperCase() == tagName.toUpperCase()) {
					els[els.length] = cds[i];
				}
			}
		}
		return els;
	}
};
/*******************************************************************************
 * 事件函数
 ******************************************************************************/
ifeng.util.Event = {
	_cache : [],
	addListener : function(els, eventName, func, range) {
		var _run = function(el) {
			var _scope = el;
			var _fn = function(e) {
				var _ev = e || window.event;
				if (range) {
					func.apply(range, [ _ev, _scope ]);
				} else {
					func(_ev, _scope);
				}
			};
			if (!ifeng.util.Event._cache[el]) {
				ifeng.util.Event._cache[el] = [];
			}
			/* 防止重复绑定同样的事件 */
			if (ifeng.util.Event._cache[el][func]) {
				// return false;
			}
			ifeng.util.Event._cache[el][func] = func;
			if (el.attachEvent) {
				el.attachEvent('on' + eventName, _fn);
			} else if (el.addEventListener) {
				el.addEventListener(eventName, _fn, false);
			} else {
				el['on' + eventName] = _fn;
			}
		};
		ifeng.util.Dom._batch(els, _run);
	},
	removeListener : function(elem, type, handle) {
		var _run = function(el) {
			if (el.detachEvent) {
				el.detachEvent('on' + eventName, ifeng.util.Event._cache[el][func]);
			} else if (el.removeEventListener) {
				el.removeEventListener(eventName, ifeng.util.Event._cache[el][func], false);
			} else {
				el['on' + eventName] = null;
			}
			ifeng.util.Event._cache[el][func] = null;
		};
		ifeng.util.Dom._batch(els, _run);
	}
};

/*******************************************************************************
 * 独立BASE
 ******************************************************************************/
var DOM = ifeng.util.Dom, EVENT = ifeng.util.Event;

ifeng.ui.commentPush = {
    url : 'http://comment.ifeng.com/getv.php',
    cUrl : 'http://comment.ifeng.com/sinacallback.php',
    sUrl : 'https://api.weibo.com/oauth2/authorize?client_id=2947336083&redirect_uri=http%3A%2F%2Fcomment.ifeng.com%2Fsinacallback.php&response_type=token&state=2',
    qLoginType : false,
    bindType : null, //新浪微博登陆成功后返回对象
    num : 0,
    time : null,
    uname : '',
    _status : 'enable',
    getCookie : function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return (function(offset){
                    var endstr = document.cookie.indexOf (";", offset);
                    if (endstr == -1) {
                        endstr = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(offset, endstr));
                })(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break; 
        }
        return "";
    },
    selectFix : function(type) {
    	/*
    	 * ie无法遮罩SELECT问题
    	 */
		var select_ = document.getElementsByTagName('select');
		if (document.all && select_) {
			if (type == 'show') {
        		ifeng.util.Dom.show(select_);
	    	} else {
	    		ifeng.util.Dom.hide(select_);
	    	}
		}

		// 单独处理IE的光标问题
		var content_input = document.getElementById('comment_input');
		if (document.all && content_input) {
			if(type == 'show') {
//				content_input.disabled = '';
				document.getElementById('comment_input').disabled = false;
			} else {
				content_input.setAttribute('disabled','disabled');
			}
		}
    },
    getSidForUname : function() {
        var _un = ifeng.ui.commentPush.getCookie('sid'); //带有用户名的SID
        return _un.substring(32, _un.length); //32是SID后的用户名
    },
    param : function() {
        var _this = this, obj = {}, currentDate = new Date().getTime();
        obj['_'] = currentDate;
        obj['job'] = '16';
        obj['format'] = 'js'; 
        obj['username'] = _this.uname ? _this.uname : '';
        obj['callback'] = 'json_' + currentDate;

        window['json_' + currentDate] = function(obj) {
            _this.success(obj);
            try {
                delete window['json_' + currentDate];
            } catch(e) {
                
            }

        };

        return obj;
    },
    initState : function() {
        // 初始化登陆状态
        var loginBoxDiv = DOM.getEl('header_loginForm');
        var divClass = DOM.getElementsByClassName(loginBoxDiv, 'logincont', 'div');
        DOM.removeClass(loginBoxDiv, 'weibo');
        DOM.show(divClass[0]);
        DOM.hide(divClass[1]);
        DOM.hide(divClass[2]);
    },
    build : function(url) {
        var timestamp = new Date().getTime();
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('src', encodeURI(url));
        script.setAttribute('charset', 'utf-8');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', 'jsonp_' + timestamp);

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    var s;
                    while (s = document.getElementById('jsonp_' + timestamp)) {
                        s.parentNode.removeChild(s);
                        for (var prop in s) {
                            try {
                                delete s[prop];
                            } catch(e) {
                                
                            }
                        }
                    }
                }
            };
        } else {
            script.onload = function() {
                var s;
                while (s = document.getElementById('jsonp_' + timestamp)) {
                    s.parentNode.removeChild(s);
                    for (var prop in s) {
                        try {
                            delete s[prop];
                        } catch(e) {
                            
                        }
                    }
                }
            };
        }
        head.appendChild(script);
    },
    get : function() {
        var _ = ifeng.ui.commentPush;
        var _url = _.url, object = _.param(), str = [];

        for (var obj in object) {
            str.push('&' + obj + '=' + object[obj]);
        }

        _url = _url.indexOf('?') == -1 ? encodeURI(_url + '?' + str.join('')) : encodeURI(_url + str.join(''));
        _.build(_url);

    },
    success : function(obj) {
        var _this = ifeng.ui.commentPush;
        if (_this.num != obj.count) {
            var countObj = document.getElementById('header_userName_span');
            var _uName = countObj.innerHTML, numStr = '';

            numStr += '<em id="header_userName_value" title="' + _uName + '">' + _uName + '</em>';
            numStr += '<a href="javascript:void(0);" onclick="ifeng.ui.commentPush.countClick();return false;" style="display : block;">';
            numStr += '<p id="header_userName_msgCount">' + obj.count + '</p>';
            numStr += '</a>';

            countObj.innerHTML = numStr;
            clearInterval(_this.time);
        }
    },
    login : function() {
        var loginBoxDiv = DOM.getEl('header_loginForm');
        var divClass = DOM.getElementsByClassName(loginBoxDiv, 'logincont', 'div');

        DOM.hide(divClass[1]);
        DOM.show(divClass[2]);

        var userName = DOM.getEl('header_bind_uname'),
            pwd = DOM.getEl('header_bind_pwd'),
            pwdTxt = DOM.getEl('header_bind_pwdText');

        EVENT.addListener(pwdTxt, 'focus', function() {
            pwdTxt.style.display = 'none';
            pwd.style.display = 'inline';
            pwd.focus();
        });

        EVENT.addListener(pwd, 'blur', function() {
            if (pwd.value == "") {
                pwd.style.display = 'none';
                pwdTxt.style.display = 'inline';
            } else {
                pwd.style.color = "#2d2d2d";
            }
        });

        EVENT.addListener(userName, 'focus', function(e) {
            if (userName.value == "请输入用户名")
                userName.value = "";
            userName.style.color = "#2d2d2d";
        });

        EVENT.addListener(userName, 'blur', function(e) {
            if (userName.value == "") {
                userName.value = "请输入用户名";
                userName.style.color = '';
            } else {
                userName.style.color = "#2d2d2d";
            }
        });

        EVENT.addListener('header_Login_submit_btn', 'click', function(e) {
            ifeng.ui.commentPush.submit();
        });

        EVENT.addListener([userName, pwd], 'keyup', function(e) {
            e = e || window.event;          
            if (e.keyCode === 13)
                ifeng.ui.commentPush.submit();
        });
        ifeng.ui.commentPush.qLoginType = true;
    },
    jumpBind : function() {
    	var loginBoxDiv = DOM.getEl('header_loginForm');
        var divClass = DOM.getElementsByClassName(loginBoxDiv, 'logincont', 'div');
        DOM.hide(divClass[2]);
        DOM.show(divClass[1]);
    },
    open : function(e) {
        var _this = ifeng.ui.commentPush;
        var style = 'width=1000,height=400';
        window.open(_this.sUrl, '', style);
        var bindType = '';
        var time = setInterval(function() {
            bindType = ifeng.util.getCookie('sns_bind_info');
            if(bindType && bindType != '') {
                var obj = eval('('+ bindType + ')'), tObj = null, $uname = '';

                if(obj.code == '-1') {
                    // 微博登陆成功但是用户名已存在.
                    _this.bindType = obj;
                    var loginBoxDiv = DOM.getEl('header_loginForm');
                    var divClass = DOM.getElementsByClassName(loginBoxDiv, 'logincont', 'div');
                    DOM.addClass(loginBoxDiv, 'weibo');

                    DOM.hide(divClass[0]);
                    DOM.show(divClass[1]);
                    var _bindTypeName = DOM.getEl('bindTypeName');
                    _bindTypeName.value = obj.msg + '在凤凰';
                    ifeng.ui.commentPush.qLoginType = true;
                } else if(obj.code == '1') {
                    ifeng.util.deleteCookie('sns_bind_info', '/', '.ifeng.com');
                    ifeng.util.deleteCookie('sina_token', '/', '.ifeng.com');
                    ifeng.ui.commentPush.qLoginType = false;
                    alert('未知错误,请刷新重试!');
                } else if(obj.code == '0') {
                	// 微博登陆成功.
                    ifeng.util.deleteCookie('sns_bind_info', '/', '.ifeng.com');
                    ifeng.util.deleteCookie('sina_token', '/', '.ifeng.com');
                    ifeng.ui.commentPush.qLoginType = false;
                    $uname = ifeng.ui.commentPush.getSidForUname();
                    if($uname && $uname != '') {
                        tObj = {'username' : $uname, 'errnum' : '0'};
                        afterLogin(tObj);
                    }

                } else {
                    return false;
                }
                clearInterval(time);
            }
        }, 1000);
    },
    checkInfo : function() {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (!cookieEnabled) {
            alert("请开启浏览器COOKIE功能！");
            return false;
        }

        var userName = DOM.getEl('header_bind_uname'),
            pwd = DOM.getEl('header_bind_pwd'),
            pwdTxt = DOM.getEl('header_bind_pwdText'),
            error = DOM.getEl('login_bind_error');

        if (userName.value == '' || userName.value == '请输入用户名') {
            error.innerHTML = '请输入用户名！';
            error.style.display = 'block';
            userName.focus();
            return false;
        }

        if (pwd.value == '') {
            error.innerHTML = '请输入密码！';
            error.style.display = 'block';
            pwdTxt.style.display = 'none';
            pwd.style.display = 'inline';
            pwd.focus();
            return false;
        }

        error.style.display = 'none';
        var _url = 'http://comment.ifeng.com/api/userLogin.php';
        var params = 'username=' + encodeURIComponent(userName.value);
        params += '&password=' + encodeURIComponent(pwd.value);
        params += '&callback=afterLogin';
        params += '&_=' + new Date().getTime();
        _url += '?' + params;
        ifeng.util.getScript(_url);

    },
    submit : function() {
        var expires = new Date(new Date().getTime() + 864000000);
        ifeng.util.setCookie('chuname', '0', expires, '/', '.ifeng.com');
        this.checkInfo();
    },
    bind : function(type) {
        var _this = ifeng.ui.commentPush;
        var _url = type ? _this.cUrl + '?state=4' : _this.cUrl + '?state=3';
        var timestamp = new Date().getTime();

        window['json_' + timestamp] = function(obj) {
            if (obj.code == '0') {
                // 绑定成功
                if (!type) {
                    ifeng.util.deleteCookie('sns_bind_info', '/', '.ifeng.com');
                    ifeng.util.deleteCookie('sina_token', '/', '.ifeng.com');
                    ifeng.ui.commentPush.qLoginType = false;
                    var $uname = ifeng.ui.commentPush.getSidForUname(), tObj = {};
                    if($uname && $uname != '') {
                        tObj = {'username' : $uname, 'errnum' : '0'};
                        afterLogin(tObj);
                    }

                } else {
                    ifeng.util.deleteCookie('sns_bind_info', '/', '.ifeng.com');
                    ifeng.util.deleteCookie('sina_token', '/', '.ifeng.com');
                }

            } else if (obj.code == '1') {
                //绑定失败
                if (type != 4) {
                    alert('绑定失败,请重新操作!');
                } else {
                	alert('绑定失败,请重新操作!');
                }
            } else {
                // -1该用户已存在
                DOM.getEl('bind_type_content').innerHTML = '该用户名已存在!';
                return false;
            }
            _this.bindType = null;
            try {
                delete window['json_' + timestamp];
            } catch (e) {
                
            }
        };

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        var bind_uname = type ? '' : document.getElementById('bindTypeName').value;

        script.setAttribute('src', encodeURI(_url + '&username=' + bind_uname + '&callback=json_' + timestamp + '&_=' + timestamp));
        script.setAttribute('charset', 'utf-8');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', 'jsonp_' + timestamp);

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    var s;
                    while (s = document.getElementById('jsonp_' + timestamp)) {
                        s.parentNode.removeChild(s);
                        for (var prop in s) {
                            try {
                                delete s[prop];
                            } catch(e) {
                                
                            }
                        }
                    }
                }
            };
        } else {
            script.onload = function() {
                var s;
                while (s = document.getElementById('jsonp_' + timestamp)) {
                    s.parentNode.removeChild(s);
                    for (var prop in s) {
                        try {
                            delete s[prop];
                        } catch(e) {
                            
                        }
                    }
                }
            };
        }
        head.appendChild(script);
    },
    countClick : function(event) {
        var _span = document.getElementById('header_userName_span'), _uname = '';
        _uname = document.getElementById('header_userName_value').innerHTML;
        _span.innerHTML = _uname;

        window.open('http://my.ifeng.com/?_c=user&_a=hand');
        ifeng.ui.commentPush.init();
    },
    init : function(uname) {
        var _this = ifeng.ui.commentPush;
        _this.uname = uname ? uname : _this.uname;
        _this.time = setInterval(_this.get, 60000);
    }
};

/*  用户检查   */
/*ifeng.app.User = {
    checkSrc :'http://blog.ifeng.com/misc.php?script=getusername',
    userCheck : function(){
        var sid = ifeng.util.getCookie("sid");
        if (sid && sid.length > 32){
            var _ = this , d = new Date();
            ifeng.util.getScript(_.checkSrc+'&tm='+d.getTime());
        }
    }
};*/

/*  登录框   */
ifeng.ui.loginForm = {  
    //submitSrc:'http://comment.ifeng.com/api/userLogin.php?',
    submitSrc:HTTP_BLOG_ROOT+'user_login.php?',
    setting:{
        formId :'header_loginForm',         //登录窗口id
        closeBtnId : 'header_closeFormBtn', //关闭按钮id
        errorId:'header_loginError',        //错误提示区id
        userNameId:'header_loginUName',     //用户名输入区id
        pwdId:'header_loginPwd',            //密码输入区id
        pwdText:'header_pwdText',           //密码默认文字提示区id
        auotCheckBoxId:'header_loginAuto',  //自动登录checkbox的id
        autoCheckText:'header_loginAutoText',
        submitBtnId:'header_LoginSubmitBtn',//登录按钮的id 
        playerId:'fplay'                    //播放器的id,处理播放器暂停问题
    },
    isUpload:false,
    _firstLogin:true,
    initFormEvent:function(){
        var _ = this, s =_.setting;
        var userName = DOM.getEl(s.userNameId);
        var pwd = DOM.getEl(s.pwdId), pwdTxt = DOM.getEl(s.pwdText);
        pwd.style.color = "#2d2d2d";
        
        EVENT.addListener(pwdTxt,'focus',function(){
            pwdTxt.style.display='none';
            pwd.style.display='inline';
            pwd.focus();
        });
        EVENT.addListener(pwd,'blur',function(){
            if (pwd.value == ""){
                pwd.style.display='none';
                pwdTxt.style.display='inline';
            }else{
                pwd.style.color = "#2d2d2d";
            }
        });
        EVENT.addListener(userName,'focus',function(e){
            if(userName.value == "请输入用户名"){         
                userName.value = "";                
            }
            userName.style.color = "#2d2d2d";
        });
        EVENT.addListener(userName,'blur',function(e){
            if (userName.value == ""){      
                userName.value = "请输入用户名";
                userName.style.color = '';
            }else{
                userName.style.color = "#2d2d2d";
            }
        });
        EVENT.addListener(s.submitBtnId,'click',function(event){
			if (event && event.preventDefault) {
				event.preventDefault();
			} else {
				window.event.returnValue = false;
			}
            _.submit();
        });
        EVENT.addListener([userName,pwd],'keyup',function(e){
            e = e || window.event;          
            if(e.keyCode === 13){
                _.submit();
            }
        });	
        EVENT.addListener(s.closeBtnId,'click',function(e){
        	// 添加防止页面select无法被遮罩层盖住
        	ifeng.ui.commentPush.selectFix('show');
            var form = DOM.getEl(s.formId);
            form.style.display = "none";
            var player = document.getElementById(s.playerId);
            if(player && player.videoPlay){
                player.videoPlay();
            }
        });

        for (var i = 1; i <= 3; i++) {
            EVENT.addListener(s.closeBtnId + '_' + i, 'click', function(e) {
            	// 添加防止页面select无法被遮罩层盖住
            	ifeng.ui.commentPush.selectFix('show');
                var form = DOM.getEl(s.formId);
                form.style.display = "none";
                var player = document.getElementById(s.playerId);
                if (player && player.videoPlay) {
                    player.videoPlay();
                    ifeng.ui.commentPush.initState();
                }
            });
        }

        var check = document.getElementById(s.auotCheckBoxId);
        EVENT.addListener(s.autoCheckText,'click',function(e){
            if(check['checked']){
                check.removeAttribute('checked');
                check['checked']=false;
            }else{
                check.setAttribute('checked','checked');
                check['checked']=true;
            }
        });
    },
    checkInfo:function(){
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (!cookieEnabled){
            alert("请开启浏览器COOKIE功能！");
            return false;
        }
        var _ = this, s =_.setting;
        var userName = DOM.getEl(s.userNameId);
        var pwd = DOM.getEl(s.pwdId),pwdTxt = DOM.getEl(s.pwdText);
        
        var error = DOM.getEl(s.errorId);
        if(userName.value=='' || userName.value =='请输入用户名'){
            error.innerHTML = '请输入用户名！';
            error.style.display = 'block';
            userName.focus();
            return false;
        }
        if(pwd.value==''){
            error.innerHTML = '请输入密码！';
            error.style.display = 'block';
            pwdTxt.style.display='none';
            pwd.style.display='inline';
            pwd.focus();
            return false;
        }
        error.style.display = 'none';       
        var  params = 'action=login&';
        params += 'username=' + encodeURIComponent(userName.value);
        params += '&userpass=' + encodeURIComponent(pwd.value);
        params += '&callback=afterLogin&format=JS';
        params += '&_=' + new Date().getTime();
        ifeng.util.getScript(_.submitSrc + params);
      
    },
    submit:function(){
        //设置cookie      
        var expires = new Date(new Date().getTime() + 864000000);
        var s = this.setting, autoCheck = DOM.getEl(s.auotCheckBoxId);
        if(autoCheck.checked){       
            ifeng.util.setCookie('chuname', '1', expires, '/', '.ifeng.com');
        }else{
            ifeng.util.setCookie('chuname', '0', expires, '/', '.ifeng.com');
        }
        this.checkInfo();
    },
    login:function(isUpload){
        var _ = this, s =_.setting;

        ifeng.ui.commentPush.selectFix('hide');

        if(isUpload){
            this.isUpload = true;
        }

        if(_._firstLogin){
            _.initFormEvent();
            _._firstLogin = false;
        }
        var form = DOM.getEl(s.formId);
        form.style.display = "block";
        
        DOM.getEl(s.errorId).style.display = 'none';        
        var username = ifeng.util.getCookie("uname");
        var checkname = ifeng.util.getCookie("chuname");
        
        if(checkname == "1"){
            DOM.getEl(s.auotCheckBoxId).setAttribute('checked','checked');
        }
        if(username){
            var fname = DOM.getEl(s.userNameId);
            fname.value = username;
            fname.focus();
        }

        //若可以调用播放器暂停方法，暂停播放器
        try {
        	var player = document.getElementById(s.playerId);
	        if (player && player.videoPause) {
	            player.videoPause();
	        }
        } catch(error) {
        	
        }
    }
};
//////////////////////////////////////////////////////////////////////////////
/*   后台接口方法     */

//php在检查用户是否登录时调用的方法
function cb_userdetail(){  
    successLogin(sso_username);
};

function cb_login(){};

function afterLogin(logininfo) {
    if (typeof(logininfo) != "undefined") {

    	ifeng.ui.commentPush.selectFix('show');

        //登陆成功后,运行绑定新浪微博操作;
    	if(ifeng.ui.commentPush.qLoginType) {
    		ifeng.ui.commentPush.bind(4);
    	}

        var s = ifeng.ui.loginForm.setting || {};
        switch (logininfo.errornum) {
            case 0 :
                var __uname = logininfo.userid ? (logininfo.userid).substring(32, logininfo.userid.length) : logininfo.username;
                successLogin(decodeURIComponent(__uname),logininfo);
                document.getElementById(s['formId']).style.display = 'none';
                if (ifeng.ui.loginForm.isUpload === true) {
                    setTimeout(function() {
                        uploadWin = window.open('http://my.ifeng.com/?_c=video&_a=upload');
                        uploadWin.focus();
                    },100);
                } else {
                	try {
                		var player = document.getElementById(s.playerId);
	                    if (player && player.videoPlay) {
	                        player.videoPlay();
	                    }
                	} catch(error) {
                		
                	}
                }

                // 绑定状态请求
                if (ifeng.comment.bindStatus) {
                    ifeng.comment.bindStatus.get();
                }

                break;
            default :
                var error = document.getElementById('header_loginError');
                error.innerHTML = "输入的账号或密码出错，请重新输入";
                error.style.display = "block";
                break;
        }
    }
}

var successLogin = function(sso_username,logininfo) {
	// 评论结构登陆状态
	var comment_loginuser = document.getElementById('comment_loginuser');
	if (comment_loginuser) {
		comment_loginuser.innerHTML = '<a href="http://my.ifeng.com/?_c=index&_a=my" title="' + sso_username + '" target="_blank">' + sso_username + '</a>';
	}

	var expires = new Date(new Date().getTime() + 864000000);
	ifeng.util.setCookie('uname', sso_username, expires, '/', '.ifeng.com');
        
	// 页面上评论登录处理
	var login = '<div class="blofIf_blue blofIf_pad">';
        login += '<span class="submit_img_arrow"><div id="sub_arrow"><a target="_self" class="submit_img" id="sub_link" style="display: none;"></a></div></span>';
        if(logininfo.domain!=''){
               login +='<a href="'+HTTP_BLOG_ROOT+'usercp/index.php?op=blogpost" class="a02">写博文</a>|<a href="'+logininfo.domain+'."+"'+HTTP_BLOG_ROOT+'">我的博客</a> | <a href="http://my.ifeng.com/my" target="_blank">个人中心</a> | <a href="http://my.ifeng.com/?_c=message&_a=my-message" target="_blank">消息<span class="red">("'+logininfo.msgcount+'")</span></a> | <a href="http://my.ifeng.com/?_c=user&_a=edit-password" target="_blank">修改密码</a> | <a href="/logout.php" target="hiddenFrm">退出</a></div>';
        }else{
               login +='<a href="'+HTTP_BLOG_ROOT+'usercp/index.php?op=blogpost" class="a02">写博文</a>|<a href="'+HTTP_BLOG_ROOT+logininfo.uid+'.html">我的博客</a> | <a href="http://my.ifeng.com/my" target="_blank">个人中心</a> | <a href="http://my.ifeng.com/?_c=message&_a=my-message" target="_blank">消息<span class="red">('+logininfo.msgcount+')</span></a> | <a href="http://my.ifeng.com/?_c=user&_a=edit-password" target="_blank">修改密码</a> | <a href="/logout.php" target="hiddenFrm">退出</a></div>';
        }
        var pinglun = document.getElementById('navR_judge');
	if (pinglun && pinglun.innerHTML) {
		pinglun.innerHTML = login;
	}
};

ifeng.util.Event.addListener(window, 'load', function() {
	ifeng.app.User.userCheck(); // 用户检查是否登录
});
