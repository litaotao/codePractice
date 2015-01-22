document.writeln("<div id=\"login\">");
document.writeln("	<div class=\"regtitle\"><h6 class=\"lg_tit\">会员登录</h6><span id=\"close_btm\">&times;</span></div>");
document.writeln("	<form id=\"login_form\" name=\"login_form\">");
document.writeln("		<div class=\"log_err\"></div>");
document.writeln("		<div><label>用户名：</label><input type=\"text\" name=\"email\" id=\"log_username\" class=\"txt_style\" placeholder=\"注册邮箱/手机号码\"/></div>");
document.writeln("		<div><label>密<span></span>码：</label><input type=\"password\" id=\"log_password\" class=\"txt_style\" name=\"pwd\"/><a href=\"/member/resetpassword.php\" class=\"find_pwd\">忘记密码？</a></div>");
document.writeln("		<div class=\"remb_btm\"><label><input type=\"checkbox\"  value=\"2592000\" name=\"keeptime\"/>记住密码</label></div>");
document.writeln("		<div class=\"lg_btm\"><a href=\"javascript:void(0);\" id=\"login_btm\">登录</a></div>");
document.writeln("	</form>");
document.writeln("	<h6 class=\"fast_log\">快速登录</h6>");
document.writeln("	<p><a href=\"/oauth/weibo/\"  target=\"_self\"><img src=\"/images/wbzhdl.gif\" /></a><a href=\"/oauth/qq/\"  target=\"_self\"><img src=\"/images/qqzhdl.gif\" /></a></p>");
document.writeln("</div>");
document.writeln("<div id=\"reg_new\">");
document.writeln("	<div class=\"regtitle\"><h6 class=\"lg_tit\">会员注册</h6><div class=\"regtab\"><font class=\"on\">邮箱注册</font><font>手机注册</font></div><span id=\"close_btm_reg\">&times;</span></div>");

document.writeln("	<div class=\"box show\"><form id=\"reg_form\" name=\"reg_form\">");
document.writeln("		<div class=\"log_err\"></div>");
document.writeln("		<div><label>昵<span></span>称：</label><input type=\"text\" name=\"userid\" id=\"txtUsername\" class=\"txt_style\"/></div>");
document.writeln("		<div><label>登录邮箱：</label><input type=\"text\" id=\"email\" class=\"txt_style\" name=\"email\"/></div>");
document.writeln("		<div><label>密<span></span>码：</label><input type=\"password\" id=\"txtPassword\" class=\"txt_style\" name=\"userpwd\"/></div>");
document.writeln("		<div><label>确认密码：</label><input type=\"password\" id=\"userpwdok\" class=\"txt_style\" name=\"userpwdok\"/><input type=\"hidden\" name=\"regtype\" value=\"0\" /></div>");
document.writeln("		<div><label>验&nbsp;&nbsp;证&nbsp;码：</label><input type=\"text\" id=\"vdcode\" style=\"width:80px; text-transform: uppercase;\" class=\"txt_style\" name=\"vdcode\"/><img id=\"vdimgck\" onclick=\"this.src=this.src+\'?\'\" style=\"cursor: pointer;vertical-align:middle;\" alt=\"看不清？点击更换\" src=\"/include/vdimgck.php\"/>");
document.writeln("           <a href=\"javascript:void(0)\" onclick=\"changeAuthCode();\" style=\"font-size:14px;\">看不清？点击更换</a></div>");
document.writeln("		<div class=\"lg_btm\"><a href=\"javascript:void(0);\" id=\"reg_btm\" target=\"_self\">注册</a></div>");
document.writeln("	</form></div>");


document.writeln("	<div class=\"box\"><form id=\"reg_form2\" name=\"reg_form2\">");
document.writeln("		<div class=\"log_err2\"></div>");
document.writeln("		<div><label>昵<span></span>称：</label><input type=\"text\" name=\"txtUsername2\" id=\"txtUsername2\" class=\"txt_style\"/></div>");
document.writeln("		<div><label>手机号码：</label><input type=\"text\" style=\"width:100px;\" id=\"telphone\" class=\"txt_style\" name=\"telphone\" maxlength=\"11\"/> <input id=\"btnSendCode\" type=\"button\" value=\"发送验证码\" onclick=\"sendMessage()\" /></div>");
document.writeln("		<div><label>验&nbsp;&nbsp;证&nbsp;码：</label><input type=\"text\" id=\"vdcode2\" style=\"width:80px; text-transform: uppercase;\" class=\"txt_style\" name=\"vdcode\" maxlength=\"8\"/></div>");
document.writeln("		<div><label>密<span></span>码：</label><input type=\"password\" id=\"txtPassword2\" class=\"txt_style\" name=\"txtPassword2\"/></div>");
document.writeln("		<div><label>确认密码：</label><input type=\"password\" id=\"userpwdok2\" class=\"txt_style\" name=\"userpwdok2\"/><input type=\"hidden\" name=\"regtype\" value=\"1\"/></div>");
document.writeln("		<div class=\"lg_btm\"><a href=\"javascript:void(0);\" id=\"reg_btm2\" target=\"_self\">注册</a></div>");
document.writeln("	</form></div>");


document.writeln("	<h6 class=\"fast_log\">快速登录</h6>");
document.writeln("	<p><a href=\"/oauth/weibo/\"  target=\"_self\"><img src=\"/images/wbzhdl.gif\" /></a><a href=\"/oauth/qq/\"  target=\"_self\"><img src=\"/images/qqzhdl.gif\" /></a></p>");
document.writeln("</div>");