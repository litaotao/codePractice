/**
 * Created by 鑫 on 2014/8/15.
 */
isIE7 = !! navigator.userAgent.match(/MSIE 7.0/);
isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);
isAppleIphone = !! navigator.userAgent.match(/iPhone/i);
isAppleIpad = !! navigator.userAgent.match(/iPad/i)
isAndroid = !! navigator.userAgent.match(/Android/i)
if (isIE10) {
    $('html').addClass('ie10'); // detect IE10 version
}
//placeholder-fixed
if (isIE7 || isIE8 || isIE9) { // ie8 & ie9

    // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
   $('input[placeholder]:not(.placeholder-no-fix,input[type="password"])').each(function () {
        var input = jQuery(this);
        if (input.val() == '' && input.attr("placeholder") != '') {
            input.val(input.attr('placeholder'));
        }
        input.focus(function () {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });
        input.blur(function () {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
    $('input[type="password"][placeholder]:not(.placeholder-no-fix),textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
        var pwdField    = $(this);
        var pwdVal      = pwdField.attr('placeholder');
        pwdField.parent().css('position','relative');
        pwdField.after('<b class="placeholder">'+pwdVal+'</b>')
        pwdField.focus(function () {
            pwdField.siblings('b').hide();
        });
        pwdField.blur(function () {
            if (pwdField.val() == '' || pwdField.val() == pwdVal) {
                pwdField.siblings('b').show();
            }
        });
    });
}
//

//hover
$.fn.hoverDelay = function(options){
    var defaults = {
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function(){
            $.noop();
        },
        outEvent: function(){
            $.noop();
        }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer, that = this;
    return $(this).each(function(){
        $(this).hover(function(){
            clearTimeout(outTimer);
            hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
        },function(){
            clearTimeout(hoverTimer);
            outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
        });
    });
}
//登录
var urlstr= new Array();
urlstr=document.domain.split(".");
var rootDomain = urlstr[1]+'.'+urlstr[2]
document.domain = rootDomain;
login = function(backurl){
    if(typeof(backurl) == "undefined"){
        backurl = '';
    }
    $.mbox({
        type: 2,
        title: '帐号登录',
        closeBtn: [1, true],
        offset: [($(window).height() - 500)/2+'px', ''],
        border : [0, 0.5, '#666'],
        area: ['660px','380px'],
        shadeClose: false,
        iframe: {src: passport_url+'/user/loginbox?backurl='+encodeURIComponent(backurl)},
		close: function(index){

        }
    });
};

$(function(){
    $('.user-login').click(function(){
        if(window.location.href.indexOf('dynamic') != -1 || window.location.href.indexOf('centerArticle') != -1 || window.location.href.indexOf('tucao') != -1 ){
             login(window.location.href);
        }else{
           login();  
        }
       
    })
//退出
    $("#logout").click(function(){
        $.ajax({
            type	:	"GET",
            url		:	"/index.php?m=user&a=logout",
            success	:	function (result) {
                location.reload();
            }
        })
    });
//二级
    $(".nav-list").hover(function(){
            $('.nav-drop-down').removeClass('open');
            $(this).children('.nav-drop-down').addClass('open');
        },function(){
            $(this).children('.nav-drop-down').removeClass('open');
        }
    );
//登录后菜单
    $(".user-home").hoverDelay({

        hoverEvent: function(){
            $('.user-drop-down').addClass('open');
            unread_msg();
        },
        outEvent:function(){
            $('.user-drop-down').removeClass('open');
        }
    });

    //
    $('.weixin').hover(function(){
        mbox.tips('<img src="data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAACgAA/+EDKGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMzUwNzE1RTY4OUExMUU0OTg1MkVEOUYyNTI4N0MyMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMzUwNzE1RDY4OUExMUU0OTg1MkVEOUYyNTI4N0MyMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4RTk0M0JDMTE1QzExRTQ4QTYxQ0M2OTc4NEExMDBGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI4RTk0M0JEMTE1QzExRTQ4QTYxQ0M2OTc4NEExMDBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRB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" width="250" height="250"/>', this, {
            style: ['background-color:#ffffff; color:#fff', '#fff'],
            guide:2
        })
    }, function() {
        mbox.closeTips()
    })


    $(".search").hoverDelay({
        outDuring: 5000,
        hoverEvent: function(){
            $(this).addClass('active');
            $('#search-btn1').focus();
            //unread_msg();
        },
        outEvent:function(){
            $(this).removeClass('active');
        }
    });

})



//搜索
function formSearch(obj) {
//    var url = '{:U("search/index")}';
    var url = '/index.php?m=search&a=index';
    var msg = $(obj).prev().val();
    
	if (msg.indexOf('*') != '-1') {
		mbox.msg('搜索内容不能带有“*”等特殊字符!', 2, 3);
		return false;
	}

    if (msg != ''&& msg != '搜索') {
        location.href = url + '&msg=' + msg;
    } else {
        //        alert('请输入要搜索的内容!');

            mbox.msg('请输入要搜索的内容!', 2, 3);


    }
}


$(function() {
    $(document).keydown(function(e) {
        var e = window.event || e;
        var c = e.keyCode || e.which;
        var act = document.activeElement.id;
        if ((act == 'search-btn1' || act == 'btns') && c == 13)
        {
            $('.'+act).click();
        }
    });
})
//
$(window).scroll(function() {
    if ($(window).scrollTop()>136){
        $(".header").addClass("scrolling-fixed").removeClass("no-scrolling-fixed");
    }
    else {
        $(".header").removeClass("scrolling-fixed").addClass("no-scrolling-fixed");
    };
});

//消息
var requestSend = 0;
var message_unread_num;
function unread_msg(){
    if(requestSend == 0 && $.cookie('uid')){
        url = '/index.php?m=message&a=unread_num';
        $.get(url, function(data){
            if(data>0){
                $('#msg_nav').text('+'+data);
                $('.new-count').show();
                $('#msg_menu').text('+'+data);
                $('.new-m').show().text('+'+data);
            }
        });
        requestSend = 1;
    }
}

//头像
$(function(){
    if($("#user-pannel").is(":hidden") ){
        var imm = $.cookie('im');
        var uidm = $.cookie('uid');
        if(uidm){
            href = $('#btn_usercenter').attr('href');
            $('#btn_usercenter').attr('href',href+'&id='+uidm);
            if((typeof(imm)=='null' || imm == '' || imm == null)){
                refreshNav();
                 $('#login-pannel').hide();
                $('#loading-pannel').hide();
            }else{
                urlm = typeof(imm) != null ? domainIMG + "userface/80x80/" +imm.replace(/_/g,'/') : 'http://'+domainIMG+'static/jmw/image/author.jpg';
                var myDate = new Date();
                $('#user-avatar').attr('src', urlm +'?dd='+myDate.getTime());
                $('#login-pannel').hide();
                $('#loading-pannel').hide();
                $('#user-pannel').show();
            }
        }else{
            $('#user-pannel').hide();
            $('#loading-pannel').hide();
            $('#login-pannel').show();

        }
    }
});

function refreshNav(){
    $('#user-avatar').attr('src',domainIMG +'static/jmw/image/loading.gif');
    $('#login-pannel').hide();
    $('#user-pannel').show();
    var uid = $.cookie('uid');
    url = '/index.php?m=user&a=getHeadImgByAjax&uid='+uid;
    $.get(url, function(data){
            if(data.code == 0){
                var myDate = new Date();
               urlm = 'userface/80x80/'+ data.rs.replace(/_/g,'/');
               $('#user-avatar').attr('src',domainIMG + urlm+'?dd='+myDate.getTime());
               $.cookie('im',data.rs,{domain:'.'+rootDomain});
            }else{
               $('#user-avatar').attr('src',data.rs); 
            }
    });
    unread_msg();
}
//判断爆料
function broke(brokeTitle){
	var _jm_ppt_id = $.cookie('_jm_ppt_id');
	if(typeof(_jm_ppt_id) == "null" || _jm_ppt_id == ''){
		login();
	}else{
		window.location.href="/index.php?m=broke&a=index&brokeTitle="+brokeTitle;
	}

}
//新消息提示
var message = {
    time: 0,
    title: document.title,
    timer: null,
    // 显示新消息提示
    show: function () {
        var title = message.title.replace("【　　　】", "").replace("【新消息】", "");
        // 定时器，设置消息切换频率闪烁效果就此产生
        message.timer = setTimeout(function () {
            message.time++;
            message.show();
            if (message.time % 2 == 0) {
                document.title = "【新消息】" + title
            }

            else {
                document.title = "【　　　】" + title
            };
        }, 600);
        return [message.timer, message.title];
    },
    // 取消新消息提示
    clear: function () {
        clearTimeout(message.timer);
        document.title = message.title;
    }
};
//触发
//message.show();
//关闭
//message.clear();
var userPm = {
	show : function (userid) {
		if(!$.cookie('_jm_ppt_id')){
			login();
			return false;
		}
		var locked = true;
		if(locked){
			locked = false;
			if(userid){
				var uid = userid;
			}else{
				var uid = $('.follow-set>p>a').attr('rel');
			}
			$.mbox({
					type: 2,
					title: '私信',
					closeBtn: [1, true],
					offset: [($(window).height() - 290)/2+'px', ''],
					border : [0, 0.5, '#666'],
					area: ['445px','240px'],
					shadeClose: false,
					iframe: {src: "http://"+document.location.hostname+"/index.php?m=msg&a=newpm&vid="+uid},
					close: function(index){

					}
				});	
		}
    },
	deldMsg : function (uid,id) {
		if(!$.cookie('_jm_ppt_id')){
			login();
			return false;
		}
		var locked = true;
		$.mbox({
			area: ['250px','auto'],
			border : [0, 0.5, '#666'],
			dialog: {
				msg: '确认删除该对话吗？',
				btns: 2,
				type: 2,
				btn: ['确定','取消'],
				yes: function(){
					if(locked){
						locked = false;
						$.ajax({
							type: "GET",
							url: "/index.php?m=msg&a=deld",
							data: { vid: uid},
							success: function (result) {
								if(result.code == 0){
									mbox.msg(result.message, 2, -1);
									$('#node_' + id).remove();
								}else{
									mbox.msg(result.message, 2, -1);
								}
								locked = true;
							}
						})
					}
				}, no: function(){
					return false;
				}
			}
		});	
	},
    delMessage :function (id) {
		if(!$.cookie('_jm_ppt_id')){
			login();
			return false;
		}
		var locked = true;
			$.mbox({
				area: ['250px','auto'],
				border : [0, 0.5, '#666'],
				dialog: {
					msg: '确认删除吗？',
					btns: 2,
					type: 2,
					btn: ['确定','取消'],
					yes: function(){
						if(locked){
							locked = false;
							$.ajax({
								type: "GET",
								url: "/index.php?m=msg&a=del",
								data: { id: id, uid: $(this).attr('node-uid')},
								success: function (result) {
									if(result.code == 0){
										mbox.msg(result.message, 2, 1);
										$('#node_' + id).remove();
										$('#pm_list').html(result.context);
									}else{
										mbox.msg(result.message, 2, -1);
									}
									locked = true;
									$("[node-type=pm_btn_delmsg]").each(function(){
										var id	= $(this).attr('node-id');
										 $(this).click(function () {
										   userPm.delMessage(id);
										});
									});
								}
							})
						}
					}, no: function(){
						return false;
					}
				}
			});
    }
};
var userSub = {
    add:function(uid){
        if(!$.cookie('_jm_ppt_id')){
                login(document.location.href);
                return false;
        }
        $.ajax({
            type: "GET",
            url: "/index.php?m=user&a=attentionDo",
            data: { uid:uid},
            success: function (result) {
                var obj = eval(result);
                var rs = obj.data;
                if(rs.code == 1 || rs.code == 3){
                    mbox.msg(rs.message, 2, -1);
                    $('#sub'+uid).hide();
                    $('#sub2'+uid).show();
                }else{
                    mbox.msg(rs.message, 2, -1);
                }
            }
        })
    },
    del:function(uid){
        if(!$.cookie('_jm_ppt_id')){
                login(document.location.href);
                return false;
        }
        $.mbox({
            area: ['250px','auto'],
            border : [0, 0.5, '#666'],
            dialog: {
                msg: '确认取消订阅该作者的文章吗？',
                btns: 2,
                type: 2,
                btn: ['确定','取消'],
                yes: function(){
                    $.ajax({
                        type: "GET",
                        url: "/index.php?m=Subscribe&a=delSubscribe",
                        data: { id: uid},
                        success: function (result) {
                            var obj = eval(result);
                            mbox.msg(obj.message, 2, 1);
                            if(1 == obj.code){
                                $('#sub'+uid).show();
                                $('#sub2'+uid).hide();
                            }
                        }
                    });
                }, no: function(){
                    return false;
                }
            }
        });
    }
};
$(function(){
	$("[node-type=pm_btn_text]").each(function(){
		var uid = $(this).attr('node-uid');
		if($.cookie('uid') == uid){
			$(this).remove();
		}
		 $(this).click(function () {
           userPm.show(uid);
        });
	});
	$("[node-type=pm_btn_deld]").each(function(){
		var uid = $(this).attr('node-uid');
		var id	= $(this).attr('node-i');
		 $(this).click(function () {
           userPm.deldMsg(uid,id);
        });
	});
	$("[node-type=pm_btn_delmsg]").each(function(){
		var id	= $(this).attr('node-id');
		 $(this).click(function () {
           userPm.delMessage(id);
        });
	});
        $("[node-type=sub_btn_text]").each(function(){
		var uid = $(this).attr('node-uid');
		if($.cookie('uid') == uid){
			$(this).remove();
		}
		 $(this).click(function () {
                    userSub.add(uid);
                 });
	});
        $("[node-type=sub_btn_del]").each(function(){
		var uid = $(this).attr('node-uid');
		if($.cookie('uid') == uid){
			$(this).remove();
		}
		 $(this).click(function () {
                    userSub.del(uid);
                 });
	});
});

(function(W){
	var jm = {};
	jm.util = {
		isEmail : function(s){
			return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s) ? true : false;
		},
		isMobile : function(s){
			return /^1[3|4|5|7|8][0-9]{9}$/.test(s) ? true : false;
		},
	};
	W.jm = jm;
})(window)
	
//var s = 'wanghc.j-jj_121@cn-t.v.cn';
//alert(jm.util.isEmail(s));
//var m = '18911689108';
//alert(jm.util.isMobile(m));