/**
*	个人博客页用到的js
*	author: zengfy
*/
var loading = '数据正在加载,请稍等...';
var loading_li = '<li>数据加载中...</li>';
var currTime = new Date;
currTime = currTime.getTime();

$(function(){
	//头部导航，写博文功能
	$("#sub_arrow").bind('mouseover', function(){
		$("#sub_link").css("display","block");
	});
	$('#write_upload_button').mouseleave(function(){
		$("#sub_link").css("display","none");
	});
})

//用户头像
function l_user_head(){
	var oLayer = new Layer("l_user_head");
	var date = new Date;
	oLayer.Src = "/user/userhead_layer.php?time="+date.getTime();
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 228;
	oLayer.Location.height = 380;
	oLayer.Caption = "设置个人资料";
	oLayer.createLayer();
	showDialog(oLayer);
}
//自定义链接弹出
function l_links(linktype){
	var date = new Date;
	if(!linktype) linktype = 0;
	layerId = (linktype==1) ? "l_friends" : "l_links";
	var oLayer = new Layer(layerId);
	oLayer.Src = "/user/links.php?linktype="+linktype+"&time="+date.getTime();
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 555;
	oLayer.Location.height = 467;
	oLayer.Caption = "设置自定义链接";
	oLayer.createLayer();
	showDialog(oLayer);
}
//自定义链接列表
function ajaxLinks(linktype){
	if(!linktype) linktype = 0;
	layerId = (linktype==1) ? 'friends_list' : 'self_link_list';
	$("#"+layerId).html(loading_li);
	var date = new Date;
	$.get('/user/user_home_ajax.php?op=links&uid='+uid+'&linktype='+linktype+'&time='+date.getTime(), function(data) {
		$("#"+layerId).html(data);
	});
}
//登录
function l_login(){
	var oLayer = new Layer("l_login");
	oLayer.Caption="欢迎您登录凤凰博客";
	oLayer.Src = "/login_layer.php";
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 398;
	oLayer.Location.height = 162;
	oLayer.createLayer();
	showDialog(oLayer);
}
//分享
function l_share(surl){
	var oLayer = new Layer("l_share");
	oLayer.Caption="分享";
	oLayer.Src = "/user/share.php?surl=" + surl;
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 326;
	oLayer.Location.height = 150;
	oLayer.createLayer();
	showDialog(oLayer);
}
/**
 * 博主好友模块“设置”弹出页面
 * @param {Object}
 */
function l_friend(uid, pageNum) {
	var oLayer = new Layer("l_friend");
	oLayer.Caption = "全部凤凰好友";
	oLayer.Src = "/index.php?action=friend&op=all_friend&uid="+uid+"&page="+pageNum;
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 350;
	oLayer.Location.height = 200;
	oLayer.createLayer();
	showDialog(oLayer);
}

/**
 * 首页好友列表
 * @author zhangyuyi
 * @param {Object} uid
 */
function ajaxFriend() {
	$.get('/user/user_home_ajax.php?op=friendList&uid='+uid, function(data) {$("#blog_main_right_friend").html(data)});
}

//显示布局设置框
function layoutBox(e){
	var obj = $("#layout_div");
	var date = new Date;
	with($("#layout_frame")) {
		src = "/user/layoutset.php?time=" + date.getTime();
	}
	obj.toggle();
}

//留言弹出
function l_guestbooks(uid)	{
	var oLayer = new Layer("l_guestbooks");
	oLayer.Src = "/user/guestbooks_layer.php?uid="+uid;
	oLayer.Model = 1;
	oLayer.Caption = '我要留言(最多支持300个汉字)';
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 450;
	oLayer.Location.height = 170;
	oLayer.Location.width = 398;
	oLayer.Location.height = 162;
	oLayer.createLayer();
	showDialog(oLayer);
}

if(typeof(_Layer) == 'object'){
	var tmp;
	_Layer.ondispose = function(divid){
		switch(divid){
			case 'l_links':
				ajaxLinks(0);
				break;
			case 'l_friends':
				ajaxLinks(1);
				break;
			case 'l_user_head':
				tmp = getUid();
				ajaxUpdateInfo('blog_user_info', tmp);
				break;
			case 'l_friend':
				fId = $("#friendHidden").val();
				ajaxFriend(fId,'1');
				break;
		}
	}
}
/**
 * 添加好友
 * @author zhangyuyi
 * @param {Object} friendID
 * @param {Object} uid
 * @param {Object} url
 */
function addFriend(friendID, uid, username, url) {
	url = document.domain;
	url = "http://"+url+"/index.php";
	$.get(url+'?action=friend&op=add_friend&friendid=' + friendID + '&uid=' + uid + '&username=' + username, function(data) {
		if(data) {
			if(data.indexOf("{#ERR#}")==0) {
				l_login();
			} else {
				if(data.indexOf("1")==0) {
					alert("你已成功添加博主为好友");
					oA = $("#aH3");
					oA.hide();
					$("#aH4").show();
				} else if(data.indexOf("Duplicate entry") == 0) {
					alert("博主已经是您的好友了");
				}
			}
		}
	});
}
 /**
  * 删除好友
  * @author zhangyuyi 2008.08.21
  */
function delFriend(friendID, uid, url){
	if(confirm('你确定要删除此好友吗？')) {
		$.get(url+'?action=friend&op=del_friend&friendid=' + friendID + '&uid=' + uid, function(data) {
			if(data) {
				if(data.indexOf("{#ERR#}")==0) {
					alert(data);
				} else {
					if(data.indexOf("1")==0) {
						$("#"+friendID+"_li").remove();
					} else {
						alert("删除好友失败，请稍候再试。");
					}
				}
			}
		});
	}
}
/**
 * 静态化所用 js
 * @author 李连生（2010-01-12）
**/
function load_staticdata(itemids) {
	var staticarr = eval(staticdata);
	var nullnum = 0;
	for(i = 0; i < staticarr.length; i ++) {
		if(!$('#pv1_'+staticarr[i]['itemid'])) {
			nullnum ++;
		} else {
			itemids[staticarr[i]['itemid']] = 2;
			$('#pv1_'+staticarr[i]['itemid']).html(staticarr[i]['viewnum']);
			$('#pv2_'+staticarr[i]['itemid']).html(staticarr[i]['viewnum']);
			$('#cn1_'+staticarr[i]['itemid']).html(staticarr[i]['replynum']);
			$('#cn2_'+staticarr[i]['itemid']).html(staticarr[i]['replynum']);
		}
	}
	if(nullnum != 0) {
		var itemidstring = '';
		for(var _ist in itemids) {
			if(itemids[_ist] == 1) {
				itemidstring = itemidstring + _ist + '_';
			}
		}
		var createurl = '/ajax/ajax_blog.php';
		$.get(createurl+'?op=blog_lstat&_is='+itemidstring, function(data) {
			var staticarr_c = eval(data);
			for(i = 0; i < staticarr_c.length; i ++) {
				if(!exist('pv1_'+staticarr_c[i]['itemid'])) {
					nullnum ++;
				} else {
					$('#pv1_'+staticarr_c[i]['itemid']).html(staticarr_c[i]['viewnum']);
					$('#pv2_'+staticarr_c[i]['itemid']).html(staticarr_c[i]['viewnum']);
					$('#cn1_'+staticarr_c[i]['itemid']).html(staticarr_c[i]['replynum']);
					$('#cn2_'+staticarr_c[i]['itemid']).html(staticarr_c[i]['replynum']);
				}
			}
		});
	}
}
/*博文推荐数*/
function myVote(itemid) {
	url = document.domain;
	url = "http://"+url+"/user/user_home_ajax.php";
	var oDate = new Date();
	$.get(url+'?op=userCommend&itemid=' + itemid + '&time=' + oDate.getTime(),function(data){
		$('#commend_num_' + itemid).html(data);
		$('#commend_css_' + itemid).html('');
		$('#commend_css_' + itemid).attr('class','num3');
	});
}
/*博文频道推荐数*/
function myDig(itemid) {
	url = document.domain;
	url = "http://"+url+"/user/user_home_ajax.php";
	var oDate = new Date();
	$.get(url+'?op=userCommend&itemid=' + itemid + '&time=' + oDate.getTime(), function(data){
		$('#commend_num_' + itemid).html(data);
		$('#commend_css_' + itemid).html('已推荐');
	});
}
/**
 * 修改密码弹出框
 * @author 杨泽朋 2012-03-06
 */
function l_password(uid) {
	var oLayer = new Layer("l_password");
	oLayer.Caption = "修改密码";
	oLayer.Src = "/index.php?action=password&op=show_edit&uid="+uid;
	oLayer.Model = 1;
	oLayer.AutoRiszeAble = 1;
	oLayer.Location.width = 400;
	oLayer.Location.height = 200;
	oLayer.createLayer();
	showDialog(oLayer);
}
/**
 * 清除new标签
 * @author zhangyuyi 2008.08.05
 *
 */
 function clearNewTip() {
 	document.cookie = 'newMessageNum=0; domain=.ifeng.com';
 }

/**
 * 检测博主音乐列表是否存在
 * @author zhangyuyi 2008.08.25
 *
 */
function ajaxMusicList(uid) {
	var timestamp = Date.parse(new Date());
	$.get('/user/user_home_ajax.php?op=musicList&uid=' + uid+'&args=' + timestamp, function(data) {$("#blog_main_right_music").html(data)});
}
function ajaxUserGuestBooks(uid) {
	var timestamp = Date.parse(new Date());
	$.get('/user/user_home_ajax.php?op=userGuestBooks&uid=' + uid+'&args=' + timestamp, function(data) {$("#blog_main_right_guestbooks").html(data)});
}
/**
 * 為減少驗證碼請求次數所作的修改
 * @author zhangyuyi 2008.12.23
 * @return
 */
var checkCodeFlag = true;
function showCheckCode() {
	var oCheckCodeDiv = $("#checkcode");
	if(checkCodeFlag) {
		var sTmpCodeString = '验证码：<input type="text" name="authnum" id="authnum" size=4 maxlength="4"/>&nbsp;<img border="0" id="randimg" src="../spic_check.php" onclick="this.src=\'../spic_check.php?update=\' + Math.random()" style="cursor:pointer;" align="absmiddle" name="randimg" title="点击更新验证码" />&nbsp;&nbsp;<span class="blue" style="cursor:pointer;" onclick="$(randimg).src=\'../spic_check.php?update=\' + Math.random()">看不清验证码</span>';
		oCheckCodeDiv.html(sTmpCodeString);
		checkCodeFlag = false;
	}
}

function deleteNotice(deleteurl) {
	delete_notice.showNotice(deleteurl);
}

var delete_notice = {
	_noticeLayerId : 'delete_notice',
	_noticeLayerConfirmId : 'delete_notice_confirm',
	_noticeLayerCancelId : 'delete_notice_cancel',
	_noticeUrlId : 'delete_notice_url',
	init : function() {
		var _this = delete_notice;
		$('#'+_this._noticeLayerConfirmId).bind('click', function() {_this.noticeConfirm();});
		$('#'+_this._noticeLayerCancelId).bind('click', function() {_this.noticeCancel();});
	},
	showNotice : function(url) {
		var _this = delete_notice;
		$('#'+_this._noticeLayerId).css({display : 'block', top : _this.documentHeight(), left : _this.documentWidth()});
		_this.setDeleteNoticeUrl(url);
	},
	hideNotice : function() {
		$('#'+delete_notice._noticeLayerId).css({display : 'none'});
	},
	documentHeight : function() {
		var height = $(window).height();
		var scrolll = $(document).scrollTop();
		return Math.floor(height / 2) + scrolll;
	},
	documentWidth : function() {
		var width = $(window).width();
		var scrolll = $(document).scrollLeft();
		return Math.floor(width / 2) - 150 + scrolll;
	},
	noticeConfirm : function() {
		var _this = delete_notice;
		var url = _this.getDeleteNoticeUrl();
		
		_this.hideNotice();
		_this.redirect(url);
	},
	noticeCancel : function() {
		var _this = delete_notice;
		_this.hideNotice();
	},
	redirect : function(url) {
		location.href = url;
	},
	setDeleteNoticeUrl : function(url) {
		$('#'+delete_notice._noticeUrlId).attr('val', url);
	},
	getDeleteNoticeUrl : function(url) {
		return $('#'+delete_notice._noticeUrlId).attr('val');
	}
};
$(function() {delete_notice.init();})
