define(function(require, exports){
	/**
	*	全站通用登录
	**/
	var backUrl = location.href;
	var weboUrl = jQ('.weibo-lgn').attr('href')
		,qqUrl = jQ('.qq-lgn').attr('href')
		;
	jQ('.weibo-lgn').attr('href',weboUrl+'&backurl='+backUrl);
	jQ('.qq-lgn').attr('href',qqUrl+'&backurl='+backUrl);
	jQ('.float-login-box form').submit(function(){return false;})
	jQ('.float-login-box .lgn-btn').live('click',function(){
		var uName = jQ('#inputName').val()
			,uPwd = jQ('#inputPassword').val()
			,random = parseInt(Math.random()*100000)
			,uUrl = jQ('#float_form_lgn').attr('action')+'&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&back=?&random='+random
			,fHash = jQ('#formhash').val()
			,sbmit = jQ('#submitcode').val()
			,cBox = isUndefined(jQ('#autolgn').attr('checked'))?'':jQ('#autolgn').attr('checked')
			;
        jQ.post(uUrl,{username:uName,password:uPwd,formhash:fHash,autolgn:cBox,submit:sbmit},function(data){
            var data = eval('('+data+')');
            if(data.is_success=='1'){
                window.location.reload();
            }else {
                alert(data.msg)
                //提示框
            }
        })
    })
})
