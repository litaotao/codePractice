define(function(require, exports){

//定义常用变量
function getRand(){
	return  parseInt(Math.random()*100000);
}

//去掉字符串左右两边的空格
function strToTrim(str){
    if(str != undefined){
        str =str.replace(/(^\s*)|(\s*$)/g, "");
        return str;
    }

}

var basicUrl = '/user/usersetting?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();

/**
 *
 *赵金叶
 *2014.4.16
 *判断登录页面
 *
 **/




jQ('#inputName').blur(function(){
    var box = jQ(this);
    var message = strToTrim(box.val());
    if(message != ''){
        var message = encodeURI(message)
        , check = jQ(box).attr('name')
        , url = '/user/check_login_name?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random=' + getRand() + '&check='+check
        , param = {'username':message};
        jQ.post(url, param, function(data){
            data = eval('(' + data + ')');
            if(data.is_success == '1') {
                jQ(box).parents('.control-group').removeClass('error').find('.help-inline').html('');
            }else{
                jQ(box).parents('.control-group').addClass('error').find('.help-inline').html(data.msg);
            }
            box.popover('show');
        });
    }else{
        jQ(box).parents('.control-group').addClass('error').find('.help-inline').html('用户名不能为空');

    }
});

jQ('#inputName').focus(function(){
	jQ(this).parents('.control-group').removeClass('error');	
	jQ(this).parents('.control-group').find('.help-inline').html('');
});
/**
*
*赵金叶
*2014.3.19
*修改个人资料页面
*
**/

//解决ie中无法使用trim()方法


/**  获取个人信息对象  **/
function getInfo(box){ 

	var element = box.find('.item-content'),
	obj = {};
	jQ.each(element, function(index, ele){
		var oItem = jQ(ele).attr('class').match(/js-item-([a-z|_]+)/);
		if(oItem != null){
			var key = oItem[1],
			value = jQ(ele).html();
			if(key == 'sex'){
				var strSex = value.replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
				if(strSex == '男'){
					value = 1;
				}else if(strSex == '女'){
					value = 2;
				}else if(strSex == '保密'){
					value = 0;
				}
			}
			obj[key] = value;
			
			
		}
	});
	return obj; 
} 

/**  获取编辑状态时的  个人信息对象  **/
function getEditInfo(box){ 

	var element = box.find('.js-cont'),
	obj = {};
	jQ.each(element, function(index, ele){
		var oItem = jQ(ele).attr('class').match(/js-item-([a-z|_]+)/);
		if(oItem != null){
			var key = oItem[1],
			value = jQ(ele).val();
            value = strToTrim(value);
			if(key == 'sex'){
				value = jQ(ele).find('input[name=\'sex\']:checked').val();
			}
			obj[key] = value;
		}
	});

	var eleSelect = box.find('.item-slt');
	jQ.each(eleSelect, function(index, ele){
		var oItem = jQ(ele).attr('class').match(/js-item-pmt-([a-z|_]+)/);
		if(oItem != null){
			var key;
			if(oItem[1] == 'borntime'){
				oItem[1] = 'birthyear';
			}
			key = 'pmt[' + oItem[1] + ']',
			value = jQ(ele).val();
			obj[key] = value;
		}
		
	});
	return obj; 
}

//邮箱验证
function checkEmail(email){
    email = strToTrim(email);
	var isemail=/^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/;
	if(isemail.test(email)){
		return '';
	}else if(email == ''){
		return '邮箱不能为空';
	}else{
		return '邮箱格式不正确'
	}
}

//电话号码验证
function checkPhone(tel,flag){
    tel = strToTrim(tel);
    var phone=/1\d{10}/;
	if(phone.test(tel) && tel.length == 11){
		return '';
	}else if(tel == ''){
        if(flag){
            return '手机号码不能为空';
        }else{
            return '';
        }
	}else{
		return '手机号码错误';
	}
}
//常用邮箱
jQ('.js-item-edit-often_email').blur(function(){
	var email = jQ(this).val();
	var parent = jQ(this).parents('.view-item');
	var errorBox = parent.find('.item-error-tip');
	var str = checkEmail(email);
	errorBox.html(str);
});

//必填项判断
    jQ('.js-validate').blur(function(){
        var btn = jQ(this);
        var parent = btn.parents('.view-item');
        var errorBox = parent.find('.item-error-tip');
        var msg = strToTrim(btn.val());
        if(msg == ''){
            errorBox.html('此为必填项');
        }else{
            errorBox.html('');
        }
    });


//手机
jQ('.js-item-edit-phone').blur(function(){
	var phone = jQ(this).val();
	var parent = jQ(this).parents('.view-item');
	var errorBox = parent.find('.item-error-tip');
    var flag = false;
    if(jQ(this).hasClass('js-isnull')){
        flag = true;
    }
    var str = checkPhone(phone,flag);
    errorBox.html(str);
});

//微信公众号长度不能超过20
jQ('.js-item-wx_public').blur(function(){
    var btn = jQ(this);
    var parent = btn.parents('.view-item');
    var errorBox = parent.find('.item-error-tip');
    var msg = strToTrim(btn.val());
    if(msg.length > 20){
        errorBox.html('微信公众号的长度不能超过20');
    }else{
        errorBox.html('');
    }
});


//点击编辑、保存按钮
jQ('.personal-view-box .js-info-edit').on('click', function(){
	var btn = jQ(this);
	var parent = btn.parents('.personal-view-box');
	var view = parent.find('.js-info-basic-view');
	var viewEdit = parent.find('.js-info-basic-edit-view');
	var str = btn.html();
	//点击编辑按钮
	if(str == '编辑'){
		
		var obj = getInfo(view);
		for(var key in obj){
			//判断性别
			if(key == 'sex'){
				var strSex = obj[key]
				if(strSex == '1'){
					viewEdit.find('input[id=\'male\']').attr('checked', 'checked');
				}else if(strSex == '2'){
					viewEdit.find('input[id=\'female\']').attr('checked', 'checked');
				}else if(strSex == '0'){
					viewEdit.find('input[id=\'sexunknown\']').attr('checked', 'checked');
				}
			//判断年月日
			}else if(key == 'borntime'){
				var borntime = obj[key];
				var year = borntime.substring(0, borntime.indexOf('年'))
				,month = borntime.substring(borntime.indexOf('年')+1, borntime.indexOf('月'))
				,day = borntime.substring(borntime.indexOf('月')+1, borntime.indexOf('日'));
				viewEdit.find('select[name=\'birthyear\'] option').each(function(){
					if(jQ(this).val() == year){
						jQ(this).attr('selected', true);
					}
				});
				viewEdit.find('select[name=\'birthmonth\'] option').each(function(){
					if(jQ(this).val() == month){
						jQ(this).attr('selected', true);
					}
				});
				viewEdit.find('select[name=\'birthday\'] option').each(function(){
					if(jQ(this).val() == day){
						jQ(this).attr('selected', true);	
					}	
				});	
			}else{
				jQ('.js-info-basic-edit-view .js-item-'+ key).val(obj[key]);
			}
		}
		
		btn.html('保存');
		btn.addClass('btn-round-save');
		view.css('display', 'none');
		viewEdit.css('display', 'block');
	
	//点击保存按钮
	}else{
			//是否可以提交的标志
		var flag = true;
		viewEdit.find('.item-error-tip').each(function(){
            var ele = jQ(this);
            //若有错误出现
            if(strToTrim(ele.html()) != ''){
                flag = false;
                var parent = ele.parents('.view-item');
                var oInput = parent.find('.js-cont');
                oInput.focus();
            }else{
                //必填项判断 js-item-edit-phone, js-item-edit-often_email
                var oInput = ele.parent('.view-item').find('.js-validate');
                var oInputPhone = ele.parent('.view-item').find('.js-item-edit-phone');
                var oInputEmail = ele.parent('.view-item').find('.js-item-edit-often_email');
//                console.log(oInputEmail.val() + ',' + oInputPhone.val());
                if(strToTrim(oInput.val()) == '' || strToTrim(oInputEmail.val()) == '' || (oInputPhone.hasClass('js-isnull') && strToTrim(oInputPhone.val()) == '')){
                    flag = false;
                    ele.html('此为必填项');
                    oInput.focus();
                }

                var weixinPublic = strToTrim(ele.parent('.view-item').find('.js-item-wx_public').val());
                if(weixinPublic != undefined  &&  weixinPublic.length > 20){
                    flag = false;
                    ele.html('微信公众号的长度不能超过20！');
                    ele.parent('.view-item').find('.js-item-wx_public').focus();
                }

            }

		});

		//当前可以提交
		if(flag){
			//param保存将要上传的值
			var param = {};
			var obj = getEditInfo(viewEdit);
			for(var key in obj){
				obj[key] = encodeURI(obj[key]);
				param[key] = obj[key];
			}
//			console.log(param);

		    jQ.post(basicUrl, param, function(data){
				var data = eval('('+data+')');
				//成功
				if(data.is_success == 1){
					var obj = getEditInfo(viewEdit);
					var year, month, day;
					for(var key in obj){
						if(key == 'sex'){
							if(obj[key] == 1){
								view.find('.js-item-sex').html('男');
							}else if(obj[key] == 2){
								view.find('.js-item-sex').html('女');	
							}else{
								view.find('.js-item-sex').html('保密');	
							}
						}else if(key == 'birthyear'){
							year = obj[key];
						}else if(key == 'birthmonth'){
							month = obj[key];
						}else if(key == 'birthday'){
							day = obj[key];
						// }else if(key == 'namePmt' || key == 'yijuhuaPmt' || key == 'sexPmt' || key == 'borntimePmt' ||
						// 		key == 'companyPmt' || key == 'positionPmt'){
						}else if(key.indexOf('Pmt') > -1){
							continue;
						}else{
							view.find('.js-item-'+key).html(obj[key]);
						}
					}
					view.find('.js-item-borntime').html(year + '年' + month + '月' + day + '日');



                    btn.html('编辑');
                    btn.removeClass('btn-round-save');
                    view.css('display', 'block');
                    viewEdit.css('display', 'none');

                    var strHtml = '<div class="info-save">保存成功</div>'
                        , viewBox = btn.parents('.personal-view-box');
                    viewBox.append(strHtml);
                    var saveBox = viewBox.find('.info-save');
                    setTimeout(function(){
                        saveBox.css('display', 'none').remove();
                    }, 1000);

                    //若为认证页面，添加审核中提示小标
                    if(parent.hasClass('js-authtct')){
                        var authtct = data.applydata;
                        if(authtct != ''){
                            for(var key in authtct){
                                if(key != 'dateline'){
                                    jQ('.js-icon-gl2-shenhe-' + key).removeClass('hidden');
                                }
                            }
                            view.find('.alert').removeClass('hidden');
                        }
                    }
				
				//失败	
				}else{
	                var strHtml1 = '<div class="info-save">'+data.msg +'</div>'
					, viewBox1 = btn.parents('.personal-view-box');
					viewBox1.append(strHtml1);
					var saveBox1 = viewBox1.find('.info-save');
					setTimeout(function(){
						saveBox1.css('display', 'none');
					}, 3000);
				}
			});
		}
		
	}
});


/***   
**    注册界面用到的js  
**    赵金叶  
**    2014.4.2
***/
var strLogin = '3-15位字符：支持中文、英文、数字和常用符号';
var strNameNull = '请输入用户名';
var strLoginExist = '用户名已存在';
var strEmailNull = '请输入邮箱';
var strEmailNoright = '邮箱格式不正确';
var strEmailExist = '邮箱已经注册过了';
var strPassword = '请输入6-20位字符：支持中文、英文、数字和常用符号。字母区分大小写';
var strPasswordNull = '请输入密码';
var strPasswordNextNull = '请再次输入密码';
var strPasswordNotSame = '两次密码输入不一致';

/***      判断用户是否注册过     ***/
function isUsernameRegistered(name, box){
	var url = '/user/check_reg_username?huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
	jQ.get(url+'&username='+name, function(data){
		data = eval('(' + data + ')');
		if(data.is_success == 1){
			box.html('');
			box.addClass('js-sucess');
			box.removeClass('colorG');
		}else{
			box.html(data.msg);
			box.addClass('colorR');
			box.removeClass('colorG');
		}
	})
}

/***      判断邮箱是否注册过     ***/
function isEmailRegistered(email,box){
	var url = '/user/check_reg_email?huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
	jQ.get(url+'&email='+email, function(data){
		data = eval('(' + data + ')');
		if(data.is_success == 1){
            box.html('');
			box.addClass('js-sucess');
			box.removeClass('colorG');
		}else{
			box.html(data.msg);
			box.addClass('colorR');
			box.removeClass('colorG');
		}
	})
}

jQ('.js-register').on('focus', function(){
 	var btn = jQ(this);
 	var parent = btn.parents('.view-item');
 	var box = parent.find('.help-inline');
 	if(btn.hasClass('js-register-user')){
		box.html(strLogin);
		box.addClass('colorG');
	}else if(btn.hasClass('js-register-email')){
		box.html(strEmailNull);
		box.addClass('colorG');
	}else if(btn.hasClass('js-register-password')){
		box.html(strPassword);
		box.addClass('colorG');
	}

});

jQ('.js-register').on('blur', function(){
	var btn = jQ(this);
 	var parent = btn.parents('.view-item');
 	var box = parent.find('.help-inline');
	if(btn.hasClass('js-register-user')){
		var str = btn.val().replace(/[^\x00-\xff]/g,"***");
		if(strToTrim(btn.val()) == ''){
 			box.html(strNameNull);
 			box.addClass('colorR');
 			box.removeClass('colorG');
		}else if(str.length < 3 || str.length > 15){
			box.html(strLogin);
			box.addClass('colorR');
			box.removeClass('colorG');
		}else{
                        box.html('');
			isUsernameRegistered(btn.val(), box);
		}
	}else if(btn.hasClass('js-register-email')){
	 	var isemail=/^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/;
	 	var email = strToTrim(btn.val());
		if(email == ''){
			box.html(strEmailNull);
 			box.addClass('colorR');
 			box.removeClass('colorG');
		}else {
            box.html('');
            if(isemail.test(email)){
                isEmailRegistered(email, box);
            }else {
                box.html(strEmailNoright);
                box.addClass('colorR');
                box.removeClass('colorG');
            }
                }
	}else if(btn.hasClass('js-register-password')){
		if(btn.val() == ''){
			box.html(strPasswordNull);
			box.addClass('colorR');
			box.removeClass('colorG');
		}else if(btn.val().length < 6 || btn.val().length > 20){
			box.html(strPassword);
			box.addClass('colorR');
			box.removeClass('colorG');
		}else{
			box.html('');
			box.addClass('js-sucess');
			box.removeClass('colorG');
		}
	}else if(btn.hasClass('js-register-password-next')){
		var password = parent.prev().find('.js-register-password').val();
		if(btn.val() == ''){
			box.html(strPasswordNextNull);
			box.addClass('colorR');
		}else if(password != btn.val()){
			box.html(strPasswordNotSame);
			box.addClass('colorR');
		}else{
			box.html('');
			box.addClass('js-sucess');
			box.removeClass('colorG');
		}
	}
});

jQ('.js-register-password').change(function(){

	var pw = jQ(this),
	pwN = jQ('.js-register-password-next');
	if(pwN.val() != '' && pw.val() != pwN.val()){
		pwN.parents('.item-content').next().html(strPasswordNotSame);
		pwN.parents('.item-content').next().addClass('colorR');
		pwN.parents('.item-content').next().removeClass('js-sucess');
	}
});

jQ('.js-protocol').change(function(){
	if(jQ('.js-protocol').attr('checked') == 'checked'){
		jQ('.js-protocol-label').removeClass('colorR');
		jQ('.js-protocol-label').find('a').removeClass('colorR');
	}
});

// form 提交注册信息 并跳转
// zisasign 
// 2014.4.14

//是否提交请求的标志
var flag = true;

//点击注册页面的按钮
jQ('.js-register-submit').click(function(event){

	flag = true;
	
	var btn = jQ(this);
	var parent = btn.parents('.js-register-parent');
	var errorBox = parent.find('.help-inline');
	
	jQ.each(errorBox, function(index, ele){
		if(!(jQ(ele).hasClass('js-sucess')) || jQ(ele).hasClass('colorG')){
			jQ(ele).prev().find('.js-register').blur();
			flag = false;
			return;
		}
	})

	//是否同意虎嗅协议
	if(jQ('.js-protocol').attr('checked') != 'checked'){
		flag = false;
		jQ('.js-protocol-label').addClass('colorR');
		jQ('.js-protocol-label').find('a').addClass('colorR');
	}
});

jQ('#register_form').submit(function() {
	if(flag){return true} else {return false }
})

// zisasign 2014.4.30 临时注销
// jQ('.js-bangdingzhanghao').click(function(){
//   var btn = jQ(this);
//   var parent = btn.parents('.js-register-parent');
//   var name = parent.find('.js-bangding-user').val();
//         var oauth = jQ('#oauth').val();
//   var password = parent.find('.js-bangding-password').val();
//   var flag = true;
//   if(name == ''){
//     parent.find('.js-bangding-user').focus();
//     parent.find('.js-bangding-user').parents('.view-item').find('.help-inline-register')
//                     .addClass('colorR').html('帐号不能为空');
//     flag = false;
//     return;
//   }else{
//     parent.find('.js-bangding-user').parents('.view-item').find('.help-inline-register')
//                     .removeClass('colorR').html('');
//   }
//   if(password == ''){
//     parent.find('.js-bangding-password').focus();
//     parent.find('.js-bangding-password').parents('.view-item').find('.help-inline-register')
//                     .addClass('colorR').html('密码不能为空');
//     flag = false;
//   }else{
//     parent.find('.js-bangding-password').parents('.view-item').find('.help-inline-register')
//                     .removeClass('colorR').html('');
//   }
// 
//   if(flag){
//     var url = '';
//     name = encodeURI(name);
//     var param = '&name=' + name + '&password=' + password+'&oauth='+oauth;
//     jQ.post(url, param, function(data){
//       data = eval('(' + data + ')');
//       if(data.is_success == 1){
//         window.location.href='/user/auth_success';
//       }else{
//         alert(data.msg);
//       }
//     });
//   }
// 
// 
// 
// });

// 重新发送验证邮件
// zisasign
// 增加了是否是验证页面的判断
// 2014.4.15
// 提出公共要素，组成resendEmail函数
// 2014.5.14

function resendEmail(url) {
  var elem = jQ(this),
      hint_elem = jQ('.resend-email-hint');
      hint_elem.removeClass('resend-email-success resend-email-errors').text("发送中");
  
  elem.hide();
  jQ.get(url, function(data) {
  	data = eval('('+data+')');
  	//发送成功
  	if(data.is_success == 1) {
  		hint_elem.text("邮件已发送").addClass("resend-email-success");
		
  	} else {
  	//发送失败
  		hint_elem.text("邮件发送失败").addClass("resend-email-errors");
  	}
  	elem.text("再次发送").show();
  })
}


// 异常邮箱处理流程
jQ('#email_sent .js-resend-email').click(function(e) {
  e.preventDefault();
  var email = jQ("input[name='email']").val(),
      url = "/user/auth_send_email?is_ajax=1&huxiu_hash_code="+huxiu_hash_code+"&random="+getRand()+email;
  resendEmail.call(this, url);
})

// 注册流程
jQ('#user_register .js-resend-email').click(function(e) {
  e.preventDefault();
  // 判断是否邮件验证页面还是注册
  var regtype = "&regtype=" + jQ("input[name='regtype']").val(),
      url = "/user/hx_send_email?is_ajax=1&huxiu_hash_code="+huxiu_hash_code+"&random="+getRand()+regtype;
	resendEmail.call(this, url);
});


// 忘记密码流程
jQ('.forget-password-wrap .forget-resend-email').click(function(e) {
  e.preventDefault();
  var email = jQ("input[name='email']").val(),
      url = "/user/reset_passwd?is_ajax=1&huxiu_hash_code="+huxiu_hash_code+"&random="+getRand() +"&email=" + email;
	resendEmail.call(this, url);
});

/**
*
* 赵金叶
* 2014.4.11
* 认证作者页面
*
**/

//修改按钮(即修改作者个人信息按钮)的显示与否
jQ('.js-author-info').on('mouseover', function(){
	var parent = jQ(this);
	var btn = parent.find('.js-e-btn');
	btn.css('display', 'inline');
}).on('mouseout',function(){
	var parent = jQ(this);
	var btn = parent.find('.js-e-btn');
	if(btn.find('span').html() == '修改'){
		btn.css('display', 'none');
	}
	
});

//获得当前编辑状态时，作者的信息
function getAuthorInfo(element){
	var obj = {};
	var item = element.attr('class').match(/js-authorinfo-([a-z|_]+)/);
	var key = item[1];
	var value = element.find('input').val();
	obj[key] = value;
	return obj;
}

//作者主页面-------点击修改/确定按钮
jQ('.js-e-btn').on('click', function(){
	var btn = jQ(this);
	//flag  表示是否为邮箱
	var flag = false;

    //(undefined != null) => false, (undefined != '') => true
	if(strToTrim(btn.attr('href')) != null){
		flag = true;
	}

	if(!flag){
		var oSpan = btn.siblings('.js-author-info-s');
		if(btn.find('span').html() == '修改'){

			var str = '<input class="author-info-input js-author-info-input" type="text" value="">';
			var val =strToTrim(oSpan.html());
			oSpan.html(str);
			if(val == '未填写'){
				oSpan.find('input').focus().attr('placeholder', '未填写');
			}else{
				oSpan.find('input').focus().val(val);
			}
			
			btn.find('span').html('确定');

		}else if(btn.find('span').html()  == '确定'){

			var param = getAuthorInfo(oSpan);
			jQ.post(basicUrl, param, function(data){
				data = eval('(' + data + ')');
				if(data.is_success == 1){
					for(var key in param){
						oSpan.html(param[key]);
					}
					btn.find('span').html('修改');
				}else{
                    alert(data.msg);
                    oSpan.find('input').focus();
				}
			});

		}
	}
	
	
});

//点击修改微信二维码
jQ('.js-author-weixin').mouseover(function(){
	jQ('.js-author-weixin-modify').css('display', 'block');
}).mouseout(function(){
	jQ('.js-author-weixin-modify').css('display', 'none');
});

//点击显示微信公众号
jQ('.js-author-card').click(function(){
	var box = jQ('.js-author-weixin-box');
	if(box.css('display') == 'block'){
		box.css('display', 'none');
	}else{
		box.css('display', 'block');
	}
});

/**
*
* 赵金叶
* 2014.4.15
* 认证作者页面---删除评论
*
**/

//删除评论
jQ('.js-author-comm-delete').on('click', function(){

	if(confirm('确实要删除吗?')){

		var btn = jQ(this);
		var parent = btn.parents('.js-author-comm-all-box');
		var box = parent.find('.js-author-comm-box');
		//表示一篇文章是否只有一个评论
		if(box.length > 1){
			parent = btn.parents('.js-author-comm-box');
		}
        var action = ''
            ,postUrl = '/usersubmit?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+getRand()
            ,id = btn.attr('id')
            ,act = btn.attr('act');
            param = {'id':id, 'act':act };
            jQ.post(postUrl, param, function(data){
            	data = eval('('+data+')');
            	if(data.is_success == 1){
            		parent.remove();
            	}else{
            		alert(data.msg);
            	}
            });
        }

});

//删除文集
jQ('.js-author-collect-del').on('click', function(){
	if(confirm('确实要删除吗?')){
		var btn = jQ(this);
		var parent = btn.parents('.js-author-collect');
		var url = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
		var param =  {'act':'anthology', 'opt': 'del', 'haid': btn.attr('haid')};
		jQ.post(url, param, function(data){
			data = eval('('+data+')');
			if(data.is_success == 1){
            		parent.remove();
            	}else{
            		alert(data.msg);
            	}
		});
	}
});

//删除我的读书
jQ('.js-author-book-del').on('click', function(){
	if(confirm('确实要删除吗?')){
		var btn = jQ(this);
		var parent = btn.parents('.js-author-book');
		var url = '/usersubmit?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
		var param =  {'act':btn.attr('act'), 'opt': btn.attr('opt'), 'id': btn.attr('id')};
		jQ.post(url, param, function(data){
			data = eval('('+data+')');
			if(data.is_success == 1){
            		parent.remove();
            	}else{
            		alert(data.msg);
            	}
		});
	}
});

//删除我的收藏
jQ('.js-author-shoucang-del').on('click', function(){
	
		if(confirm('确实要删除吗?')){
			var btn = jQ(this);
			var parent = btn.parents('.js-author-shoucang');
			var url = '/usersubmit?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
			var param =  {'act':'del_favorite', 'id': btn.attr('id')};
			jQ.post(url, param, function(data){
				data = eval('('+data+')');
				if(data.is_success == 1){
	            		parent.remove();
	            	}else{
	            		alert(data.msg);
	            	}
			});
		}
	
		
});

//文章申诉
jQ('.js-shengsu-btn').click(function(){
    var btn = jQ(this);
    var parent = btn.parents('.js-author-article');
    var ignoreBox = parent.find('.js-ignore-msg');
    //如果第二个忽略理由为空，即申诉按钮不可用
    if(strToTrim(ignoreBox.html()) == ''){
        var strHtml = '<div id="js-dialog" class="dialog" style="display: block;">'+
            '<h3>添写申诉理由</h3>'+
            '<p>您可以再次编辑您的稿件，然后在这里写下您的申诉理由。我们会对您的稿件进行复核。复核为终审，如果您的稿件还是没有通过，我们只能表示非常遗憾。</p>'+
            '<textarea></textarea>'+
            '<input type="reset" value="取消" class="btn js-cancel">'+
            '<input type="submit" value="确定" class="btn js-ok">'+
            '</div>';
        jQ('body').append(strHtml);
        var msg = parent.find('.js-shengsu-msg').html();
        jQ('.dialog textarea').val(msg).focus();
        jQ('.dialog').css('display', 'block');


        jQ('.dialog .js-ok').click(function(){
            var aid = parent.attr('aid');
            var message = jQ('.dialog textarea').val();
            if(strToTrim(message) == ''){
                alert('申诉内容不能为空！');
                jQ('.dialog textarea').focus();
            }else{
                var url = '/usersubmit';
                var param = {'act':'author_reason', 'aid':aid, 'message':message, 'huxiu_hash_code':huxiu_hash_code};
                jQ.post(url, param, function(data){
                    var data = eval('('+data +')');
                    if(data.is_success == 1){
                        jQ('.dialog').css('display', 'none');
                        window.location.reload();
                    } else {
                        alert(data.msg);
                    }
                    jQ('.dialog textarea').val('');
                });
            }
        });
        jQ('.dialog .js-cancel').click(function(){
            jQ('.dialog').css('display', 'none');
        });
    }else{
        btn.removeClass('js-shengsu-btn');
    }





});


//删除文章
jQ(document).delegate('.js-del-btn', 'click', function(){
	var btn = jQ(this);
    var parent = btn.parents('.js-author-article')
        ,status = parent.attr('status')
        ,aid = parent.attr('aid')
        ,id = parent.attr('did')
        ,url
        ;
    console.log(parent.html())
    if(parent.html() == null){
        status = btn.parents('.js-guanli-wrap').attr('status');
    }

    if(status == 'draft'){
        url = '/usersubmit/?act=del_draft&id='+id+'&huxiu_hash_code='+huxiu_hash_code +'&is_ajax=1';
    }else if(status == 'refused'){
        url = '/usersubmit/?act=del_article&aid='+aid+'&huxiu_hash_code='+huxiu_hash_code +'&is_ajax=1';
    }else if(status == 'article-content'){
        //在文章内容页删除文章
        aid = count_article_id;
        url = '/usersubmit/?act=del_article&aid='+aid+'&huxiu_hash_code='+huxiu_hash_code +'&is_ajax=1';

    }

    jQ.get(url, function(data){
		var data = eval('('+data+')');
		if(data.is_success == 1){
            if(status == 'article-content'){
                window.location.href = '/index.php'
            }else{
                parent.remove();
            }
		}else{
			alert('删除失败！');
		}
	});
});

jQ(document).on('click', '.js-tougao-btn', function(){
    var btn = jQ(this)
        ,parent = btn.parents('.js-author-article')
        ,status = parent.attr('status')
        ,aid = parent.attr('aid')
        ,id = parent.attr('did')
        ,url = ' /usersubmit/?act=draft2contribute&id='+id+'&huxiu_hash_code='+huxiu_hash_code +'&is_ajax=1'
        ;

    jQ.get(url, function(data,status){
        var data = eval('('+data+')');
        if(data.is_success == 1){
            alert('投稿成功！');
            document.location.replace(location.href);
        }else{
            alert(data.msg);

        }
    });
});

/*
* zisasign
* 2014.4.23
* 用户设置 修改密码页面 修改邮件页面 登录页面 输入验证
*
*/

jQ('#inputAccount').focus(function() {
  var btn = jQ(this),
  box =btn.parent().find('.hint-text');
  box.html("").removeClass("colorR");
})

jQ('#inputAccount').blur(function() {
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text');
  if(input_value.length == 0) {
    box.html("请输入帐号").addClass("colorR");
  } else {
    box.html("").removeClass("colorR");
  }
})

jQ("#inputPwd").blur(function() {
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text');
  if(input_value.length == 0) {
    box.html("请输入密码").addClass("colorR");
  } else {
    box.html("").removeClass("colorR");
  }
})

jQ("#inputPwd2").focus(function() {
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text');
  if(input_value.length < 6 || input_value.length > 20) {
    box.removeClass("colorR").addClass("color999").html("6-20位，支持中英文、数字和常用符号，区分大小写");
  }
})

jQ("#inputPwd2").blur(function(){
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text');
  if(input_value.length == 0) {
    box.html("请输入新密码").removeClass("color999").addClass("colorR");
  } else if(input_value.length < 6 || input_value.length > 20) {
    box.removeClass("color999").addClass("colorR").html("6-20位，支持中英文、数字和常用符号，区分大小写");
  } else {
    box.html("").removeClass("color999 colorR");
  }
})

jQ("#inputPwd3").blur(function(){
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text'),
      prev_input_value = jQ('#inputPwd2').val();
      
  if(input_value.length == 0) {
    box.html("请输入确认密码").addClass("colorR");
  } else if(prev_input_value !== input_value) {
    box.html("两次输入不一致").addClass("colorR");
  } else {
    box.html("").removeClass("colorR");
  }
})

function EmailRegisteredCheck(input_field, error_field, url) {
  var input_value = input_field.val();
  
}

jQ("#inputEmail").blur(function(){
  var btn = jQ(this),
      input_value = btn.val(),
      box =btn.parent().find('.hint-text'),
      hint_text = checkEmail(input_value);

  // 邮件格式检查
  if(hint_text.length !== 0){
    box.html(hint_text).addClass("colorR");
  } // 是否与原邮箱相同检查
  else if(btn.hasClass('unique-check')) {
    var prev_email = jQ('.current-email').text();
    if (input_value === prev_email) {
      box.html('此邮箱为您当前邮箱').addClass("colorR");
    } else {
      box.html('').removeClass("colorR");
    }
  }  // 是否是注册邮箱检查
  else if(btn.hasClass('register-check')) {
    // 获取之前输入的正确的
    var prev_input = btn.data("prev");
    // 如果两次没有改变，直接返回错误提示，节省一次请求
    if (prev_input === input_value) {  return }
    var url = '/user/check_reg_email?huxiu_hash_code='+huxiu_hash_code+'&random='+getRand();
    jQ.ajax({
      url: url+'&email='+input_value,
      async: false
      }).done(function(data){
        data = eval('(' + data + ')');
        if(data.is_success == 1){
          box.html('该邮箱未注册').addClass("colorR");
        } else {
          box.html('').removeClass("colorR");
        }
    });
    btn.data("prev", input_value);
  } else {
    box.html('').removeClass("colorR");
  }
})

jQ("#password_reset_form, #password_change_form, #email_change_form, #login_form, #auth_bind_form").submit(function() {
    jQ('#inputAccount, #inputPwd, #inputPwd2, #inputPwd3, #inputEmail').trigger("blur");
  
  if(jQ('.colorR').length > 0){
    return false;
  } else {return true}
})

/**
*
*赵金叶
*2014.3.21
*search页面添加显示‘展示全文’，收起按钮
*
**/
//jQ('.js-search').delegate('.js-more' ,'click', function(){
//	console.log('sssssssssss');
//	var btn = jQ(this);
//	var parent = btn.parents('dl');
//	console.log(parent);
//	var boxCut = parent.find('.js-search-cut');
//	var boxComplete = parent.find('.js-search-complete');
//	if('展开全文' == btn.html()){
//		boxCut.css('display', 'none');
//		boxComplete.css('display', 'block');
//	}else if('收起' == btn.html()){
//		boxCut.css('display', 'block');
//		boxComplete.css('display', 'none');
//	}
//	
//});

if(jQ('.wj-box').length > 0){
//    围观评论,点击评论按钮
    jQ('.js-wj-btn-cmt').on('click', function(){
        var oBtn = jQ(this);
        var oParent = oBtn.parents('.js-wj-cover');
        var oText = oParent.find('.js-wj-cmt-text');
        var text = strToTrim(oText.val());
        text = encodeURI(text);

        if(text == ''){
            alert('内容不能为空');
        }else{

            //js-wj-cmt-flag   判断点击的是哪个页面的评论按钮
            var strClass, strTool = '';
            if(oParent.hasClass('js-wj-cmt-flag')){
                strClass = 'wj-cmt-cnt';
               /* strTool = '<div class="wj-cmt-tool-box js-wj-cmt-tool-box">'+
                                '<div class="wj-cmt-tool clearfix">'+
                                    '<ul class="wj-cmt-ul pull-right clearfix">'+
                                        '<li><a class="js-wj-tool-dianping" href="javascript:void(0);">点评</a></li>'+
                                        '<li><a class="js-wj-tool-share" href="javascript:void(0);">分享</a></li>'+
                                        '<li><a class="js-wj-tool-like" href="javascript:void(0);">顶(1)</a></li>'+
                                        '<li><a class="js-wj-tool-dislike" href="javascript:void(0);">踩</a></li>'+
                                    '</ul>'+
                                '</div>'+

                                '<div class="wj-cover-cmt-wrap pst none text-right js-wj-cmt-wrap">'+
                                    '<div class="trangle wj-cmt-trangle-out"></div>'+
                                    '<div class="trangle wj-cmt-trangle-in"></div>'+
                                    '<textarea class="wj-cover-cmt-ta" placeholder="我也来说一句..."></textarea>'+
                                    '<input class="btn btn-warning" type="submit" value="点评">'+
                                '</div>'+
                           '</div>';*/
            }else{
                strClass = 'wj-cover-cmt-cnt';
                strTool = '';
            }

            var url = '/collection/add_collection_comment'
                , param = {'haid':oBtn.attr('haid'), 'comment':text, 'huxiu_hash_code':huxiu_hash_code}
                ;
            jQ.post(url, param, function(data){
                var data = eval('(' + data + ')');
                if(data.is_success == 1){
                    var strAuthor = data.content.username
                        , strImgsrc = data.content.pic
                        , strAuthorHref = data.content.url
                        , strTime = '刚刚'
                    ;
//                    var oDate = new Date()
//                        ,strTime = oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + oDate.getDate() + ' ' + oDate.getHours() +':' + oDate.getMinutes();

                    var strHtml = '<div class="wj-btm clearfix">'+
                        '<a class="wj-author" href="'+ strAuthorHref +'"><img src="'+ strImgsrc +'"></a>'+
                        '<div class="wj-cover-cmt-box">'+
                        '<div class="wj-cover-cmt-t"><a class="wj-cover-cmt-author"  href="'+ strAuthorHref +'">'+strAuthor+'</a><span class="wj-cmt-time">'+strTime+'</span></div>'+
                        '<p class="' + strClass + '">'+ data.content.content +'</p>'+ strTool+
                        '</div></div>';
                    jQ('.js-wj-cover-cmt-box').append(strHtml);
                    oText.val('');
                }else{
                    alert(data.msg);
                }
            });

        }


    });

/*    jQ('.js-wj-img-hot').on( 'click',  function(){
        var btn = jQ(this);
        var wjid = btn.attr('wjid');
        jQ('.js-wj-expanding-box-in').html(wjid);
    });*/

    //过往文集
    jQ('.js-wj-select').click(function(){
        var btn = jQ(this);
        var url = btn.attr('value');
        console.log('url:' + url);
        window.location.href = url;
    })


//    点击点评，显示点评输入框
    jQ('.js-wj-tool-dianping').on('click', function(){
        var btn = jQ(this);
        var oParent = btn.parents('.js-wj-cmt-tool-box');
        var oBox = oParent.find('.js-wj-cmt-wrap');
        if(oBox.css('display') == 'none'){
            oBox.slideDown('fast');
        }else{
            oBox.slideUp('fast');
        }
    });

/*//       最受欢迎，最近更新   wj-btn-pop js-wj-btn-new
    jQ('.js-wj-tool-bar a').on('click', function(){
        var btn = jQ(this);
        if(btn.hasClass('colorB')){

            var typeid = btn.attr('typeid');
            var oParent = btn.parents('.js-wj-subscribe');
            oParent.find('.js-wj-expanding-box-in').html(typeid);
            oParent.find('#js_wj_img_carousel').html(typeid);


            if(btn.hasClass('js-wj-btn-pop')){
                btn.removeClass('colorB').removeClass('js-wj-btn-pop');
                btn.prev().addClass('colorB').addClass('js-wj-btn-new');
            }else{
                btn.removeClass('colorB').removeClass('js-wj-btn-new');
                btn.next().addClass('colorB').addClass('js-wj-btn-pop');
            }
        }
    });*/

    //我的文集编辑按钮
    jQ('.js-wj-btn-edit').on('click', function(){
        var btn = jQ(this);
        var oParent = btn.parents('.js-wj-item-box');
        var oExcuseBox = oParent.find('.js-wj-item-excuse-box');
        var oExcuseSpan = oParent.find('.js-wj-item-excuse');
        var strText = oExcuseSpan.html();
        if(!oExcuseBox.hasClass('js-flag')){
            oExcuseSpan.html('<textarea>'+ strText +'</textarea>');
            oExcuseBox.addClass('js-flag');
            oExcuseBox.find('.e-btn').css('display', 'inline');
        }
        oExcuseSpan.find('textarea').focus();
    });

    //我的文集  确定编辑该文集中的文章
    jQ('.js-wj-item-excuse-box .e-btn').on('click', function(){
        var btn = jQ(this);
        var oExcuseBox = btn.parents('.js-wj-item-excuse-box');
        var oExcuseSpan = oExcuseBox.find('.js-wj-item-excuse');
        var strSpan = oExcuseBox.find('textarea').val();

        var url = '/collection/ajax_up_collection_article'
            , param = {
                'haid':btn.parents('.js-wj-expanding-box-in-edit').attr('haid')
                , 'aid':btn.parents('.js-wj-item-box').attr('aid')
                , 'memo':strSpan
                , 'huxiu_hash_code': huxiu_hash_code
                , 'opt': 'editarticle'
            };

        jQ.post(url, param, function(data){
            var data = eval('(' + data + ')');
            if(data.is_success == 1){
                oExcuseSpan.html(strSpan);
                oExcuseBox.removeClass('js-flag');
                btn.css('display', 'none');
            }else{
                alert(data.msg);
            }
        });
    });

    //我的文集排序
    jQ('.js-wj-order').click(function(){
        var btn = jQ(this);
        var oParent = btn.parents('.js-wj-item-box');
        var oNum = btn.parent().find('.js-wj-order-num');
        var url = '/collection/ajax_up_collection_article'
            , param = {
                'huxiu_hash_code':huxiu_hash_code
                , 'haid':jQ('.js-wj-expanding-box-in-edit').attr('haid')
                , 'aid':oParent.attr('aid')
                , 'sortid': oNum.val()
            }
            ;

        jQ.post(url, param, function(data){
            var data = eval('(' + data + ')');
            if(data.is_success == 1){
                alert('排序成功！')
                window.location.reload();
            }else{
                alert(data.msg);
            }
        });
    });




    //我的文集  确定删除该文集中的文章
    jQ('.js-wj-btn-del').on('click', function(){
        var btn = jQ(this);
        var oParent = btn.parents('.js-wj-item-box');
        var aid = [oParent.attr('aid')];
        if(confirm('确定要删除这篇文章么？')){
            var url = '/collection/del_collection_article'
                , param = {'huxiu_hash_code':huxiu_hash_code, 'haid':jQ('.js-wj-expanding-box-in-edit').attr('haid'), 'aid':aid}
                ;

            jQ.post(url, param, function(data){
                var data = eval('(' + data + ')');
                if(data.is_success == 1){
                    oParent.remove();
                    alert('成功删除该文章！');
                }else{
                    alert(data.msg);
                }
            });
        }

    });

    //批量删除
    jQ('.js-wj-batchdel').on('click', function(){

        var element = jQ('.js-wj-item-box ul .js-wj-check');
        var aid = [];
        jQ.each(element, function(index, ele){
            var oParent = jQ(ele).parents('.js-wj-item-box');
            if(jQ(ele).attr('checked') == 'checked'){
                aid.push(oParent.attr('aid'));
            }
        });
        if(aid.length > 0){
            if(confirm('确定要删除这些文章么？')){
                var url = '/collection/del_collection_article'
                    , param = {'huxiu_hash_code':huxiu_hash_code, 'haid':jQ('.js-wj-expanding-box-in-edit').attr('haid'), 'aid':aid}
                    ;
                jQ.post(url, param, function(data){
                        var data = eval('(' + data + ')');
                    if(data.is_success == 1){
                        jQ.each(element, function(index, ele){
                           var oParent = jQ(ele).parents('.js-wj-item-box');
                            if(jQ(ele).attr('checked') == 'checked'){
                                oParent.remove();
                            }
                        });
                        alert('删除成功！')
                    }else{
                        alert(data.msg);
                    }
                });

            }
        }else{
            alert('请选中文章！')
        }

    });

    //保存文集简介及标题
    if(jQ('.js-wj-edit-cnt').length > 0){
        jQ('.js-wj-save').click(function(){
            var btn = jQ(this)
                , oParent = btn.parents('.js-wj-edit-cnt')
                , oTitle = oParent.find('.js-wj-title')
                , oSummary = oParent.find('.js-wj-summary')
            ;
            var url = '/collection/ajax_up_collection'
                , haid = oParent.parents('.js-wj-expanding-box-in-edit').attr('haid')
                , summary = oSummary.val()
                , title = oTitle.val()
                , str = 'http://upload.huxiu.com/upload/'
                , picSrc = btn.parents('.js-wj-edit-cover').find('#fm-img').attr('src').substring(str.length)
                , param = {'huxiu_hash_code': huxiu_hash_code, 'haid': haid, 'summary':summary, 'title': title, 'pic':picSrc}
            ;
            jQ.post(url, param, function(data){
                var data = eval('('+data+')');
                if(data.is_success == 1){
                    alert('保存成功!');
                }else{
                    alert(data.msg);
                }
            });

        });
    }


    //删除文集
    jQ('.js-wj-delete').click(function(){
       var btn = jQ(this)
           , oParent = btn.parents('.js-wj-expanding-box-in-edit, .js-wj-img-hot, .wj-box-shadow, .js-wj-dtl-cover, .js-wj-right-item');
        if(confirm('确定要删除这个文集吗？')){
            var url = '/collection/del_collection'
                , haid = oParent.attr('haid')
                , param = {'haid':haid, 'huxiu_hash_code':huxiu_hash_code}
            ;
            console.log('haid:'+haid);
            jQ.post(url, param, function(data){
                var data = eval('('+data+')');
                if(data.is_success == 1){
                    alert('删除文集成功！');
                }else{
                    alert(data.msg);
                }
            });

        }
    });

//    图片轮播图
    if(jQ('#js_wj_img_carousel').length > 0){

        var oMain = document.getElementById('js_wj_img_carousel');
        var oUl = oMain.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');

        var btnPre = document.getElementById('js-wj-pre');
        var btnNext = document.getElementById('js-wj-next');

        var iNow = 1;// 表示当前文集的页数，从1开始
        var num = 3;//文集图片显示个数
        var timer = null;
        //点击向右按钮，flag = true; else flag = fasle;
        var flag = true;
        //判断timer是否为空
        var flagTimer = true;
        var timerToast = null
            , flagTimerToast = true;

        // maxPage 文集的总页数
        var maxPage = parseInt(jQ(oUl).attr('maxlength'));


        btnPre.onclick = function(){
            if(iNow==1){
                flag = false;
                jQ(oMain).find('.wj-toast').html('这是第一张文集！').css('display', 'block');
//                if(flagTimerToast){
                    flagTimerToast = false;
                    timerToast = setInterval(function(){
                        jQ(oMain).find('.wj-toast').css('display','none');
                        clearInterval(timerToast);
                    }, 1000);
//                }
            }else{
                iNow --;
                flag = false;
                var oldLeft = oUl.offsetLeft;
                var w = (aLi[0].offsetWidth+10)*num;
                move(oldLeft, w);
                getWjInfo(jQ(aLi[(iNow-1)*3]));
            }

        };
        btnNext.onclick = function(){

            // maxPage 文集的总页数  aLi.length 文集加载的总长度, currentLength 当前文集的长度
            var curPage = iNow
                , loadedPage = Math.ceil(aLi.length/num);
            //点击右键
            flag = true;

            var oldLeft = oUl.offsetLeft;
            var w = (aLi[0].offsetWidth+10)*num;

            if(aLi.length < num){
                //这是最后一篇文集
                jQ(oMain).find('.wj-toast').html('这是最后一张文集！').css('display', 'block');
                flagTimerToast = false;
                var timerToast = setInterval(function(){
                    jQ(oMain).find('.wj-toast').css('display','none');
                    clearInterval(timerToast);
                }, 1000);

            }else if(loadedPage-curPage >= 1){
                iNow++;
                move(oldLeft, w);
                getWjInfo(jQ(aLi[(iNow-1)*num]));
            }else if(loadedPage-curPage < 1){
                if(loadedPage == maxPage){
                    //这是最后一篇文集
                    jQ(oMain).find('.wj-toast').html('这是最后一张文集！').css('display', 'block');
                    flagTimerToast = false;
                    var timerToast = setInterval(function(){
                        jQ(oMain).find('.wj-toast').css('display','none');
                        clearInterval(timerToast);
                    }, 1000);

                //需要加载内容
                }else{
                    iNow++;
                    getCarouselImage(iNow, oldLeft, w);

                }
            }

        };

        function move(oldLeft, w){
//            console.log('oldleft:' + oldLeft + ',w:' + w);
            if(flagTimer){
                flagTimer = false;
                timer = setInterval(function(){
                    var speed = w/8;
                    speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
                    //点击向右的按钮
                    if(flag){
//                            console.log('w:'+ w+ ',oldLeft:'+oldLeft + ',left:'+ oUl.style.left + ",speed:" + speed);
                        oUl.style.left = oUl.offsetLeft - speed + 'px';

                        if(oUl.offsetLeft <= (oldLeft-w)){
                            oUl.style.left = oldLeft - w + 'px';
                            clearInterval(timer);
                            flagTimer = true;
                        }
                    //点击向左的按钮
                    }else{
                        oUl.style.left = oUl.offsetLeft + speed + 'px';
                        if(oUl.offsetLeft >= oldLeft + w){
                            oUl.style.left = oldLeft + w + 'px';
                            clearInterval(timer);
                            flagTimer = true;
                        }
                    }
                }, 40);
            }
        }


        jQ('#js_wj_img_carousel').on('click', '.js-wj-img-item a img', function(){
            getWjInfo(jQ(this).parents('.js-wj-img-item'));
        });

    }

    //首页热门文集
    jQ('.js-wj-img-hot .wj-img200 img').click(function(){
        getWjInfo(jQ(this).parents('.js-wj-img-hot'));
    });


    //文集图片轮播，显示后面的文集
    function getCarouselImage(curPage, oldLeft, w){
        var url = '/collection/ajax_subscribe'
            , order = jQ('.js-wj-tool-bar').find('a.colorB').attr('typeid')
            , param = {'hpage':curPage, 'orderby': order , 'huxiu_hash_code': huxiu_hash_code, 'random': getRand() }
        ;
        if(order == undefined){
            url = '/collection/ajax_mycollection';
        }

         jQ.post(url, param, function(data){
             var data = eval('('+data+')');
             if(data.is_success == 1){
                 maxPage = data.maxpage;
                 var strHtml = '';
                 for(var i = 0; i < data.content.length; i ++){
                     var ele = data.content[i];
//                     strHtml += '<li class="wj-img-item pst js-wj-img-item" haid="'+ ele.haid +'"><a href="javascript:void(0);"><img src="'+ ele.pic +'"></a><div haid="'+ele.haid+'" class="wj-btn-sub js-wj-btn-sub"><a href="javascript:void(0);">订阅</a></div></li>';
                     strHtml += '<li class="wj-img-item pst js-wj-img-item" haid="'+ ele.haid +'"><a href="javascript:void(0);"><img src="'+ ele.pic +'"></a></li>';
                 }
                 jQ('.wj-img-box-ul').append(strHtml);

                 move(oldLeft, w);
                 getWjInfo(jQ(aLi[(curPage-1)*num]));
             }else{
                 if(data.hpage > data.maxpage){
                     maxPage = data.maxpage;
                     //这是最后一篇文集
                     jQ(oMain).find('.wj-toast').html('这是最后一张文集！').css('display', 'block');
                     flagTimerToast = false;
                     var timerToast = setInterval(function(){
                         jQ(oMain).find('.wj-toast').css('display','none');
                         clearInterval(timerToast);
                     }, 1000);

                 }
                 console.log(data.msg);
             }
         });

    }

    //获取文集下的文章.     oLi:表示将要显示文集的图片    flagIsClick=true 表示是通过点击图片而获取文集内容
    function getWjInfo(oLi){
        if(oLi.offset() == null || (oLi.offset().left+oLi.width()/2-10 - oLi.parents('.js-wj-get').offset().left < 0)){
            var left = 151;
        }else {
            var left = oLi.offset().left+oLi.width()/2-10 - oLi.parents('.js-wj-get').offset().left;
        }
        var oTrangle = oLi.parents('.js-wj-get').find('.wj-expanding-box .trangle');
        oTrangle.animate({'left': left+'px'});

        var oLoading = oLi.parents('.js-wj-get').find('.wj-expanding-box .loading');
        oLoading.css('display', 'block');
        var url = '/collection/ajax_collection_content'
            , param = {
                'huxiu_hash_code': huxiu_hash_code
                , 'random': getRand()
                , 'ajax': 1
                , 'haid': oLi.attr('haid')
            }
            , editUrl = '/collection/collection_edit/'+  oLi.attr('haid')
            , strhtml = '<div class="more wj-btm js-wj-edit-box"><a href="'+ editUrl +'">编辑</a></div>'
        ;
        jQ.post(url, param, function(data){
            var data = eval('('+data+')');
            if(data.is_success == 1){
                var box = jQ('.js-wj-expanding-box-in');
               var flagAdd = false;//是否添加edit工具条
                if(box.find('.js-wj-edit-box').length > 0){
                    flagAdd = true;
                }
                box.html(data.content);
//                console.log('flagAdd:'+flagAdd);
                if(flagAdd){
                    box.prepend(strhtml);
                }
                oLoading.css('display','none');
            }else{
                oLoading.css('backgroundImage', 'none');
                oLoading.find('span').html('加载失败！');
            }
        });

    }


    //订阅、删除按钮的显示与隐藏
    jQ(document).on('mouseover','.wj-box-shadow, .js-wj-img-hot, .js-wj-img-item, .js-wj-dtl-cover, .js-wj-right-item', function(){
        var box = jQ(this);
        var btn = box.find('.js-wj-btn-sub, .js-wj-btn-sub-cancel, .js-wj-delete');
        if(btn.length > 0){
            btn.css('display', 'block');
        }
    });
    jQ(document).on('mouseout','.wj-box-shadow, .js-wj-img-hot, .js-wj-img-item, .js-wj-dtl-cover, .js-wj-right-item', function(){
        var box = jQ(this);
        var btn = box.find('.js-wj-btn-sub, .js-wj-btn-sub-cancel, .js-wj-delete');
        if(btn.length > 0){
            btn.css('display', 'none');
        }
    });

    //点击订阅按钮
    jQ(document).on('click', '.js-wj-btn-sub, .js-wj-btn-sub-cancel', function(e){
         var btn = jQ(this)
             , oParent = btn.parents('.js-wj-img-hot, .wj-box-shadow, .js-wj-dtl-cover');
         var url = ''
             , param = {
                 'huxiu_hash_code': huxiu_hash_code
                 , 'haid': oParent.attr('haid')
                 , 'ajax': 1
                 , 'random': getRand()
             }
             ;
         if(btn.hasClass('js-wj-btn-sub-cancel')){
             url = '/collection/ajax_del_subscribe';
//             alert('cancel sub');
         }else{
             url = '/collection/ajax_add_subscribe';
//             alert('sub')
         }

         jQ.post(url, param, function(data){
             var data = eval('('+data+')');
             if(data.is_success == 1){

                 if(btn.hasClass('js-wj-btn-sub-cancel')){
                     btn.find('a').html('订阅');
                     btn.removeClass('js-wj-btn-sub-cancel').addClass('js-wj-btn-sub');
                     alert('取消订阅成功');
                 }else{
                     btn.find('a').html('取消订阅');
                     btn.removeClass('js-wj-btn-sub').addClass('js-wj-btn-sub-cancel');
                     alert('订阅成功');
                 }

             }else{
                 alert(data.msg);
             }
         });
     });

    //bug收集按钮
    jQ('.js-btn-bug-collect').click(function(){
        var m = '<div class="js-alert"></div><p>欢迎大家指出文集的不足之处。</p><textarea class="modal-body-text js-modal-body-text"></textarea>'
        var box = '<div id="showBoxModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button><h3>对文集的建议</h3></div>' +
            '<div class="modal-body">'+m+'</div>' +
            '<div class="modal-footer"><button type="button" class="btn js-btn-submit" aria-hidden="true">提交</button></div>' +
            '</div>';
        if(jQ('#showBoxModal').length <= 0){
            jQ('body').append(box);
        }else{
            jQ('#showBoxModal .js-alert').html('').removeClass('alert alert-success alert-error');
            jQ('#showBoxModal .js-modal-body-text').val('');
        }
        jQ('#showBoxModal').modal('toggle');

    });

    jQ('body').on('click', '#showBoxModal .js-btn-submit', function(){
        var url = '/collection/collection_bug'
         , message = jQ(this).parents('#showBoxModal').find('.js-modal-body-text').val()
         , param = {
             'message':message
             , 'huxiu_hash_code': huxiu_hash_code
             , 'ajax': 1
             , 'random': getRand()
         }
         ;
        var oParent = jQ(this).parents('#showBoxModal')
            ,oAlert = oParent.find('.js-alert');
        oAlert.attr('class', 'js-alert');
         jQ.post(url, param, function(data){
             var data = eval('(' + data + ')');
             if(data.is_success == 1){
//                 alert('提交成功！');
                 oAlert.addClass('alert alert-success').html(data.msg);
                 setTimeout(function(){
                     oParent.modal('toggle');
                 }, 3000);
             }else{
                 oAlert.addClass('alert alert-error').html(data.msg);
             }
         });
    });

    //在热门文集页面、文集标签页面、文集内容页面添加点赞功能
    jQ('.js-wj-info-like').click(function(){
        var btn = jQ(this);
        if(btn.hasClass('wj-info-liked')){
            alert('您已经表过态了');
        }else{
//            console.log('obj:'+btn.parents('.wj-box-shadow'));
//            if(!btn.parents('.wj-box-shadow')){
//                console.log('not');
//            }
            var haid = btn.parents('.wj-box-shadow').find('.js-wj-btn-sub, .js-wj-btn-sub-cancel').attr('haid');
            console.log('haid:'+haid);
            if(!haid){
                haid = btn.parents('.wj-dtl-cover').find('.js-wj-cover .js-wj-btn-cmt').attr('haid');
            }
            var url = '/collection/ajax_add_collection_like'
                , param = {
                    'is_ajax':1,
                    'random':getRand(),
                    'huxiu_hash_code': huxiu_hash_code,
                    'haid': haid
                }
            jQ.post(url, param, function (data) {
                    var data = eval('(' + data + ')');
                    if (data.is_success == 1) {
                        btn.find('span').html(parseInt(btn.find('span').html())+1);
                        btn.addClass('wj-info-liked');
                    } else {
                        alert(data.msg);
                    }
                });
        }
    });
}

    //创建文集时显示文集标签, 编辑文集时显示文集标签
    if(jQ('.create-collect-wrap').length  > 0){

        function movieFormatResult(movie) {

            var markup = movie.tagname + '<input name="tagid[]" value="'+movie.id+'" type="hidden" /> ';
            return markup;
        }
        function movieFormatSelection(movie) {
            return movie.tagname;
        }
        jQ('#js_wj_input_tag').select2({

            minimumInputLength: 1,
            maximumSelectionSize: 5,
            width: 430,
//            placeholder: "Search for a tag",
            minimumInputLength: 1,
            maximumSelectionSize: 5,
            multiple: true,
            ajax: {
                url: "/collection/ajax_get_tag",
                dataType: 'json',
                quietMillis: 100,
                data: function (term, page) { // page is the one-based page number tracked by Select2
                    return {
                        tagname: term, //search term
                        huxiu_hash_code: huxiu_hash_code,
                        page_limit: 10, // page size
                        page: page, // page number
                        apikey: "ju6z9mjyajq2djue3gbvv26t" // please do not use so this example keeps working
                    };
                },
                results: function (data, page) {
//                    var more = (page * 10) < data.total; // whether or not there are more results available
                    return {results: data.content};
                }
            },
            formatResult: movieFormatResult, // omitted for brevity, see the source of this page
            formatSelection: movieFormatResult // omitted for brevity, see the source of this page
//            dropdownCssClass: "js-wj-dropdown",// apply css that makes the dropdown taller
//            escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
        });

        if(tagdata[0] != undefined){
            jQ('.js-wj-dropdown').select2('data',tagdata);
        }


    }


    if(jQ('.js-dropdown-btn-tougao').length > 0){
        jQ('.js-dropdown-btn-tougao').click(function(){
            var btn = jQ(this)
                , box = btn.parent().find('.js-dropdown-menu-tougao li span')
                , url = '/usersubmit/?act=userdraft'+'&huxiu_hash_code='+huxiu_hash_code+'&is_ajax=1&timestamp='+(new Date().getTime());

            jQ.get(url, function(data){
                data = eval('('+data+')');
                if(data.is_success == 1){
                    var draftNum = data.count, strDraftNum;
                    if(draftNum == 0){
                        strDraftNum = '';
                    }else{
                        strDraftNum = '('+draftNum+')';
                    }
                    box.html(strDraftNum);
                }else{
                    console.log(data.msg);
                }
            });
        })
    }
//    var self = this;

    if(jQ('.js-tougao').length > 0){

        //flagTimmer:true 表示可以自动保存，否则停止自动保存
        var im = 0, oldCnt = '', oTimer = null, flagTimer = true
            , did = ((document.getElementById('title_did').value=='')?'0':document.getElementById('title_did').value);

        oTimer = self.setInterval(function(){
            saveArticle();
        },5000);

        function saveArticle(){
            var aid =  ((document.getElementById('title_aid').value=='')?'0':document.getElementById('title_aid').value);
            if(aid > 0){
                flagTimer = false;
            }
            if(flagTimer){
                var title = document.getElementById("title").value
                    , cnt = UE.getEditor('editor').getContent()
                    ;
                im ++;
//                console.log('i:'+im);
                if(oldCnt != cnt){
                    oldCnt = cnt;
                    ajaxContent(title, cnt, false, aid);
                }
            }
        }

        function ajaxContent(title, cnt, flag, aid){
//            alert('aid:'+aid)
            flagTimer = false;
//        console.log('ajaxContent change!');
            jQ('.js-tougao-saving-box').find('span').html('保存中...');
            var catid = jQ('.js-select option:selected').attr('value')
                , leibie = catid
                , url = '/contribute_do'
                , param = {'title':title, 'content':cnt, 'catid':catid, 'aid':aid, 'did':did, 'leibie': leibie, 'huxiu_hash_code':huxiu_hash_code,'is_ajax':1};

            if(catid == '6'){
                var bookName = jQ('.book-dd dd input[name="book_name"]').val()
                    , writeName = jQ('.book-dd dd input[name="write_name"]').val()
                    , translator = jQ('.book-dd dd input[name="translator"]').val()
                    , publish = jQ('.book-dd dd input[name="publish"]').val()
                    , publishBrand = jQ('.book-dd dd input[name="publish_brand"]').val()
                    , isbn = jQ('.book-dd dd input[name="isbn"]').val()
                    , publishSummary = jQ('.book-dd dd input[name="publish_summary"]').val()
                    ;
                param= {'title':title, 'content':cnt, 'catid':catid, 'aid':aid, 'did':did, 'leibie': leibie, 'book_name':bookName, 'write_name':writeName, 'translator':translator,
                    'publish':publish, 'publish_brand':publishBrand, 'isbn':isbn, 'publish_summary':publishSummary, 'huxiu_hash_code':huxiu_hash_code,'is_ajax':1}
            }

            jQ.post(url, param, function(data){
                data = eval('('+data+')');
                if(data.is_success == 1){
                    //点击保存按钮
                    /*if(flag){
                        oTimer = setTimeout('saveArticle()', 5000);
                    }*/
                    flagTimer = true;

                    did = data.did;
                    jQ('#title_did').val(did);
                    jQ('.js-tougao-saving-box').find('span').html('已保存');
                    setTimeout(function(){
                        jQ('.js-tougao-saving-box').find('span').html('');
                    }, 1500);
                }else{
                    jQ('.js-tougao-saving-box').find('span').html(data.msg);
                }
            });
        }

//        saveArticle();


        jQ('#submit_save_btn').click(function(e){
            e.preventDefault();
            var title = document.getElementById("title").value
                , cnt = UE.getEditor('editor').getContent()
                ;
            flagTimer = false;
            clearInterval(oTimer);
            oTimer = setInterval(function(){
                saveArticle();
            }, 5000);
//            console.log('stop timer, and flagTimer:' + flagTimer);
            ajaxContent(title, cnt, true);
            return false;
        });
    }



});

