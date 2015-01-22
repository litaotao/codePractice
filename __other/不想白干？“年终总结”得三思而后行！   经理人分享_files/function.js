/* ------------------------------------------------------------------------- *
 *  managershare 
 *	基本js方法
 * ------------------------------------------------------------------------- */
$(document).ready(function(){
	if($(window).scrollTop()>60) $("header").addClass("header");
	function scrollTop(){  
		var scrollH = $(window).scrollTop();  

		// 页面导航浮动
		if(scrollH>60){
			$("header").addClass("header");
		}else{
			$("header").removeClass("header");
		}
	}  
	//绑定滚动事件  
	$(window).bind('scroll',scrollTop); 

	// 搜索
	$("#search_form").submit(function(){
		if($.trim($("#key_words").val())==''){
			return false;
		}
	})
	// 百科搜索
	$("#wiki_search_form").submit(function(){
		if($.trim($("#search_text").val())==''){
			return false;
		}
	})

});

/*  弹出窗口
 * ------------------------------------ */
function show_window(t){
	htmlobj=$.ajax({url:"/"+t+".php",async:false});
	$("#window_content").html(htmlobj.responseText);
	$("#diolog_window").show();
	var window_h = $(".window").height();
	var w_h = $(window).height();
	var margin_top = (w_h-window_h)/2-100;
	$("body").css({"overflow-y":"hidden","margin-right":"17px"});
	$("header").css({"padding-right":"17px","right":"-9px"});
	$(".window").css({"margin-top":margin_top});
}
function close_window(){
	$("#diolog_window").hide();
	$("body").css({"overflow-y":"","margin-right":""});
	$("header").css({"padding-right":"","right":""});
}


/*  登录/注册
 * ------------------------------------ */
function login() {
	var username = $('#username').val();
	var password = $('#password').val();
	if(username == ''){
		tips('请填写邮箱或用户名');
		return false;
	}
	if(password == ''){
		tips('请填写密码');
		return false;
	}
	$.post("/ajax/ajax_login.php?action=login", {username:username,password:password}, function(data){
		if (data==1) {
			tips('登录成功');	
			var w=setTimeout(function(){
				window.location.reload();
			},1000);
			return false;
		}
		else {
			tips('帐号或密码错误！');//warning(cp,'用户名或密码错误！');
			return false;
		}
	})
}
//登录后返回
function loginBack(newUser) {
	window.location.reload();
}
//退出登录
function logout() {
	$.post("/ajax/ajax_login.php?action=loginout", function(data){
		if (data=="loginout") {
			tips('退出成功');	
			var w=setTimeout(function(){
				window.location.reload();
			},1000);
		}
	})
}

//资料设置
function set_profiles() {
	var display_name = $('#display_name').val();
	var user_email = $('#user_email').val();
	var description = $('#description').val();
	var pic_url_avatar = $('#pic_url_avatar').val();
	var occupation = $('#occupation').val();
	var occupation_id = $('#occupation').find("option:selected").attr("rel");
	var pattern = /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	
	if(display_name == ''){
		alert('请填写昵称');
		return false;
	}
	if(user_email == ''){
		alert('请填写邮箱');
		return false;
	}
	if(!pattern.test(user_email)) {
		alert("邮箱格式不对");
		return false;
	}
	$.post("/ajax/ajax_login.php?action=setprofile", {pic_url_avatar:pic_url_avatar,display_name:display_name,user_email:user_email,description:description,occupation:occupation,occupation_id:occupation_id}, function(data){
		if (data=="ok") {
			// 去掉红点
			$(".avatar").children(".fa-circle").remove();
			$(".setting_box").find(".fa-circle").remove();
			$(".tips_inner").remove();
			alert("设置成功");
			return true;
		}
		else if(data=="display_name_isnull"){
			alert('请填写昵称');
			return false;
		}
		else if(data=="user_email_isnull"){
			alert('请填写邮箱');
			return false;
		}
		else if(data=="email_existed"){
			alert('该邮箱已存在');
			return false;
		}
	});
}
//修改密码
function edit_pass() {
	var password = $('#password').val();
	var new_password = $('#new_password').val();
	var new_password_confirm = $('#new_password_confirm').val();
	
	if(new_password == '' || /[\'\"\\]/.test(new_password)) {
		alert('新密码为空或包含非法字符');
		return false;
	}
	if(new_password_confirm == ''){
		alert('请重复新密码');
		return false;
	}
	if(new_password != new_password_confirm){
		alert('新密码两次输入不一致');
		return false;
	}
	$.post("/ajax/ajax_login.php?action=editpass", {password:password,new_password:new_password,new_password_confirm:new_password_confirm}, function(data){
		if (data=="ok") {
			alert("修改成功");
			window.location.reload();
			return true;
		}
		else if(data=="oldpass_error"){
			alert('旧密码不正确');
			return false;
		}
		else if(data=="newpass_error"){
			alert('新密码错误');
			return false;
		}
	});
}
//解除账号绑定
function remove_bindedsns(snstype) {
	$.post("/ajax/ajax_login.php?action=removesns", {snstype:snstype}, function(data){
		if (data=="ok") {
			tips('解除成功');
			var w=setTimeout(function(){
				window.location.reload();
			},1000);
			return true;
		}
		else if(data=="nopass"){
			tips(snstype+'是您登录本站的唯一方式，若想解除请先设置本站登录密码。');
			return false;
		}else{
			tips('参数错误');
			return false;
		}
	});
}
//jquery上传头像的typefile
function show_upload_avatar(btnId,msgId) {
	$(document).ready(function(){
		var button = $('#'+btnId), interval;
		msgId = msgId ? msgId : "#upload_message";
		var fileType = "all",fileNum = "one";
		new AjaxUpload(button,{
			action: '/ajax/ajax_upload.php?action=uploadavatar',
			/*data:{
				'buttoninfo':button.text()
			},*/
			name: 'userfile',
			onSubmit : function(file, ext){
				if(fileType == "pic")
				{
					if (ext && /^(jpg|png|jpeg|gif)$/.test(ext)){
						this.setData({
							'info': '文件类型为图片'
						});
					} else {
						 $(msgId).html('非图片类型文件，请重传');
						 $(msgId).fadeOut(5000);
						return false;
					}
				}
				$(msgId).show();
				$(msgId).html('<img src="/admin_1/style/img/load.gif"> 正在上传');
				
				if(fileNum == 'one')
					this.disable();
				
				interval = window.setInterval(function(){
					var text = button.text();
					if (text.length < 14){
						button.text(text + '.');                    
					} else {
						$(msgId).show();
						$(msgId).html('<img src="/admin_1/style/img/load.gif"> 正在上传');
					}
				}, 200);
			},
			onComplete: function(file, response){
				response=response.split("|");
				if(response[0] != "success"){
					//alert(response);
					$(msgId).show();
					$(msgId).html(response+'。<br>上传失败,请重新换张图片!');
					$(msgId).fadeOut(5000);
				}
				window.clearInterval(interval);
				
				this.enable();
				
				if(response[0] == "success") {
					var rand = (new Date()).getTime();
					var rand = escape(rand);
					$("#upfileResult_"+btnId).html('<img src="'+response[1]+"middle_"+response[2]+"?"+rand+'" width=100 height=100>');//
					$("#pic_url_"+btnId).val(response[2]);
					$(msgId).html("上传成功").fadeOut(3000);
				}
			}
		});
	 
	}); 
}
// 注册验证
function check_reg(){
	var res='';
	$("#reg_form").find("input").each(function(){
		var obj = $(this);
		result=obj.validate();
		if(result=='error'){
			res = result;
		}
	});
	if(res!=='error'){
		//$("#reg_form").submit();
		var username = $('#reg_username').val();
		var email = $('#reg_email').val();
		var password = $('#reg_password').val();
		var repassword = $('#reg_repassword').val();
		var verifycode = $('#reg_verifycode').val();
		var occupation  = $("#reg_occupation").val();
		var occupation_id  = $("#occupation_id").val();
		$.post("/ajax/ajax_login.php?action=regsubmit", {username:username,email:email,password:password,repassword:repassword,verifycode:verifycode,occupation:occupation,occupation_id:occupation_id}, function(data){//alert(data);
			if (data=="regok") {
				tips("注册成功");
				window.location.reload();
				return true;
			}
			else if(data=="error"){
				tips('注册失败');
				return false;
			}
		});
	}
}
// 验证码刷新
function refresh_code(){
	$("#VerifyImg").attr("src","/admin_1/getcode.php?" + Math.random());
}
/*  获取随机文章
 * ------------------------------------ */
function get_rand_post(em){
	htmlobj=$.ajax({url:"/ajax/ajax_getData.php?action=rand_post&category_id="+em,async:false});
	$(".post_random").html("<li style='text-align:center;'>正在努力加载哦……</li>");
	$(".post_random").html(htmlobj.responseText);
}
function get_wiki_top(em){
	htmlobj=$.ajax({url:"/ajax/ajax_getData.php?action=wiki_top&type="+em,async:false});
	$(".words_top10").html("<li style='text-align:center;'>正在努力加载哦……</li>");
	$(".words_top10").html(htmlobj.responseText);
}

/*  平滑滚动
 *	参数：t-节点 e-距离 s-速度
 * ------------------------------------ */
function scrollTo(t,e,s){
	$('html, body').animate({
	    scrollTop: $(t).offset().top-e
	}, s);
	return false;
}

/*  平滑滚动后闪烁
 * ------------------------------------ */
function scrollTo_shake(t,e,s,m,n,c){
	$('html, body').animate({
	    scrollTop: $(t).offset().top-e
	}, s);
	var y=setTimeout(function(){shake($(m),n,c)},800);
	var w=setTimeout(function(){
		$(m).focus()
	},2000);
	return false;
}

/*  闪烁
 *	参数：ele-节点 cls-闪烁的css类 times-次数
 * ------------------------------------ */
function shake(ele,cls,times){
	var i = 0,t= false ,o =ele.attr("class")+" ",c ="",times=times||2;
	if(t) return;
	t= setInterval(function(){
		i++;
		c = i%2 ? o+cls : o;
		ele.attr("class",c);
		if(i==2*times){
			clearInterval(t);
			ele.removeClass(cls);
		}
	},200);
}
/*  提示
 * ------------------------------------ */
function tips(msg){
	$('body').append("<div class='tips'>"+msg+"</div>");
	$(".tips").delay(2000).fadeOut(1000);
}
/*  进入词条 （百科页搜索框）
 * ------------------------------------ */
function go_to_words(){
	var words = $("#search_text").val();
	$("#wiki_search_form").find("#search_tag").remove();
	$("#wiki_search_form").submit();
	//window.location.href='/wiki/'+words;
}

/*  隐藏右侧导航菜单
 * ------------------------------------ */
function hide_nav(){
	if($("div").hasClass("post_aside_nav"))
		$(".post_aside_nav").toggle();
	if($("div").hasClass("words_aside_nav"))
		$(".words_aside_nav").toggle();
}
/*  关注/取消关注
 * ------------------------------------ */
function follow(type,uid,obj){
	$.post('/ajax/ajax_action.php?action=follow',{type:type,uid:uid},function(data){
		if(data=='yes'){
			if(type=='follow'){
				$(obj).removeClass("follow").addClass("unfollow");
				$(obj).attr("onclick","follow('unfollow','"+uid+"',this)");
				$(obj).html("取消关注");
				tips("已关注");
			}else{
				$(obj).removeClass("unfollow").addClass("follow");
				$(obj).attr("onclick","follow('follow','"+uid+"',this)");
				$(obj).html("关注");
				tips("已取消关注");
			}
		}else{
			tips(data);
		}
	});
}