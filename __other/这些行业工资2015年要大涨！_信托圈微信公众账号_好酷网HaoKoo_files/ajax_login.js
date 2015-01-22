var reMethod = "POST",pwdmin = 6,unamemin = 2;
function changeAuthCode() {
	var num =  new Date().getTime();
	var rand = Math.round(Math.random() * 10000);
	num = num + rand;
	$('#ver_code').css('visibility','visible');
	if ($("#vdimgck")[0]) {
		$("#vdimgck")[0].src = "/include/vdimgck.php?tag=" + num;
	}
	return false;
}

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function sendMessage() {
  　 curCount = count;
　　  //设置button效果，开始计时
     var tel = $('#telphone').val();
	 if(tel=='')
	 {
	     $(".log_err2").show();
		 $(".log_err2").html('手机号不能为空!');
		 $('#telphone').focus();
		 return false;
	 }
	 
	 if (!$('#telphone').val().match(/1[3-8]+\d{9}$/))
	 {
	     $(".log_err2").html("<font color='red'>手机号码格式不正确！请重新输入！</font>");
	     $('#telphone').focus();
	     return false;
	 } 
	 
	 $(".log_err2").hide();
	 $("#btnSendCode").attr("disabled", "true");
     $("#btnSendCode").val("" + curCount + "秒后再获得短信");
     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
　　  //向后台发送处理数据
     $.ajax({
     　　type: "POST", //用POST方式传输
     　　dataType: "text", //数据格式:JSON
     　　url: 'http://www.haokoo.com/member/send_duanxin.php', //目标地址
    　　 data: "telphone=" + tel ,
    　　 error: function (XMLHttpRequest, textStatus, errorThrown) {},
     　　success: function (msg)
	    {
	        $(".log_err2").html(msg);
	    }
     });
}

//timer处理函数
function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled"); //启用按钮
                $("#btnSendCode").val("重新发送验证码");
            }
            else {
                curCount--;
                $("#btnSendCode").val("" + curCount + "秒后再获得短信");
            }
        }

	$(document).ready(function(){
		$("#reg_new .regtab font").click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			$("#reg_new .box").eq($(this).index()).addClass("show").siblings().removeClass("show");
		});

		$("#login_btm").bind('click',function(){
			var uname = $('#log_username').val();
			var pwd = $('#log_password').val();
			if($("#log_username").val() == ''){
				$(".log_err").show();
				$(".log_err").html('用户名不能为空!');
				$("#log_username").focus();
				return false;			
			}else if($("#log_password").val() == ''){
				$(".log_err").show();
				$(".log_err").html('密码不能为空!');			
				$("#log_password").focus();
				return false;
			}else{
				$.ajax({type:"post",url:"/member/ajax_do.php",data:"fmdo=login&dopost=login&email="+uname+"&pwd="+pwd,success:function(result){
					var data = JSON.parse(result);
					if(data.msg_body == '6'){
						$.closeBox("login",this);
						$("#login_statc").html(data.userinfo);
						$("#scroll_login_statc").html(data.userinfo);
						$("#guestbook .name").html(data.userinfo);
	                    			$("#guestbook .tximg").html("<img src="+data.userface+">");
	                    			$("#guestbook .ds-sync").html(data.fxbtm);
				        	$("#guestbook .pl_con span").hide();
					}else{
						$(".log_err").show();
						$(".log_err").html(data.msg_body);
					}
				}});		
			}			
		});
		

		
		$("#reg_btm").bind('click',function(){
			$(".log_err").show();
			var uname = $('#txtUsername').val();
			var email = $('#email').val();
			var pwd = $('#txtPassword').val();
			var pwdok = $('#userpwdok').val();
			var vdcode = $('#vdcode').val();
			if(uname==""){
				$('.log_err').html("昵称不能为空!");
				$('#txtUsername').focus();
				return false;
			}else if(uname.length < unamemin){
				$('.log_err').html("昵称不能小于"+unamemin+"位!");
				$('#txtUsername').focus();
				return false;
			}
			if(email==""){
				$('.log_err').html("登陆邮箱不能为空!");
				$('#email').focus();
				return false;
			}else{
				var sEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
				if(!sEmail.exec(email))
				{
					$('.log_err').html("Email格式不正确!");
					$('#email').focus();
					return false;
				}
			}
			if(pwd=="")
			{
				$('.log_err').html("密码不能为空!");
				$('#txtPassword').focus();
				return false;
			}
			if(pwd.length < pwdmin)
			{
				$('.log_err').html("密码不能小于"+pwdmin+"位!");
				$('#txtPassword').focus();
				return false;
			}
			if(pwdok!=pwd)
			{
				$('.log_err').html("两次输入密码不一致!");
				$('#userpwdok').focus();
				return false;
			}
			if(vdcode=="")
			{
				$('.log_err').html("验证码不能为空!");
				$('#vdcode').focus();
				return false;
			}
			
			$.ajax({type:"post",url:"/member/ajax_reg_new.php",data:"dopost=regbase&step=1&regtype=0&userid="+uname+"&email="+email+"&userpwd="+pwd+"&userpwdok="+pwdok+"&vdcode="+vdcode,success:function(result){
					var data = $.parseJSON(result);
					if(data.msg_body == '6'){
						$.closeBox("reg_new",this);
						$("#login_statc").html(data.userinfo);
						$("#scroll_login_statc").html(data.userinfo);
						$("#guestbook .name").html(data.userinfo);
	                    			$("#guestbook .tximg").html("<img src="+data.userface+">");
	                    			$("#guestbook .ds-sync").html(data.fxbtm);
				        	$("#guestbook .pl_con span").hide();
				        	$.ajax({type:"get",url:"/plus/cmd_dingyue.php",success:function(msg){
				        		$("body").append(msg);
				        		$.openBox("tjdy_box",this);
				        	}});
					}else{
						$(".log_err").show();
						$(".log_err").html(data.msg_body);
					}
				}});	
						
		});
		
		//手机注册
		$("#reg_btm2").bind('click',function(){
			$(".log_err2").show();
			var uname = $('#txtUsername2').val();
			var telphone = $('#telphone').val();
			var pwd = $('#txtPassword2').val();
			var pwdok = $('#userpwdok2').val();
			var vdcode = $('#vdcode2').val();
			if(uname==""){
				$('.log_err2').html("昵称不能为空!");
				$('#txtUsername').focus();
				return false;
			}else if(uname.length < unamemin){
				$('.log_err2').html("昵称不能小于"+unamemin+"位!");
				$('#txtUsername').focus();
				return false;
			}
			if(telphone==""){
				$('.log_err2').html("登陆的手机号码不能为空!");
				$('#telphone').focus();
				return false;
			}else{
				var sEmail = /1[3-8]+\d{9}/;
				if(!sEmail.exec(telphone))
				{
					$('.log_err2').html("手机号码格式不正确!");
					$('#telphone').focus();
					return false;
				}
			}
			if(vdcode=="")
			{
				$('.log_err2').html("验证码不能为空!");
				$('#vdcode').focus();
				return false;
			}
			if(pwd=="")
			{
				$('.log_err2').html("密码不能为空!");
				$('#txtPassword').focus();
				return false;
			}
			if(pwd.length < pwdmin)
			{
				$('.log_err2').html("密码不能小于"+pwdmin+"位!");
				$('#txtPassword').focus();
				return false;
			}
			if(pwdok!=pwd)
			{
				$('.log_err2').html("两次输入密码不一致!");
				$('#userpwdok').focus();
				return false;
			}
			
			$.ajax({type:"post",url:"/member/ajax_reg_new.php",data:"dopost=regbase&step=1&regtype=1&userid="+uname+"&email="+telphone+"&userpwd="+pwd+"&userpwdok="+pwdok+"&vdcode="+vdcode,success:function(result){
					var data = $.parseJSON(result);
					if(data.msg_body == '6'){
						$.closeBox("reg_new",this);
						$("#login_statc").html(data.userinfo);
						$("#scroll_login_statc").html(data.userinfo);
						$("#guestbook .name").html(data.userinfo);
	                    			$("#guestbook .tximg").html("<img src="+data.userface+">");
	                    			$("#guestbook .ds-sync").html(data.fxbtm);
				        	$("#guestbook .pl_con span").hide();
				        	$.ajax({type:"get",url:"/plus/cmd_dingyue.php",success:function(msg){
				        		$("body").append(msg);
				        		$.openBox("tjdy_box",this);
				        	}});
					}else{
						$(".log_err2").show();
						$(".log_err2").html(data.msg_body);
					}
				}});	
						
		});	
		
		
		$("#ajax_i_log,#scroll_ajax_log").bind('click',function(){			
			$.openBox("login",this);
		});
		$("#ajax_i_reg,#scroll_ajax_reg").bind('click',function(){			
			$.openBox("reg_new",this);
		});
		$("#close_btm").bind('click',function(){			
			$.closeBox("login",this);
		});
		$("#close_btm_reg").bind('click',function(){			
			$.closeBox("reg_new",this);
		});
		
		$("#my_nav_dy").bind('click',function(){
			$.ajax({url:"/plus/ajax_do.php",success:function(result){
			var data = JSON.parse(result);
			if(data.userinfo == -1){
				$.openBox("login",this);		
			}else{
				window.location.href = '/member/mysubscribe/';
			}
			}});
		});	
	});	