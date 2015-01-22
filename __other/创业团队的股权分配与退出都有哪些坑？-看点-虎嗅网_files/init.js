/**
var jQ = jQuery.noConflict();
**/
seajs.modify('jquery', function(require, exports) {
  window.jQuery = window.jQ = exports
})
seajs.modify('cookie', function(require, exports, module) {
  module.exports = jQ.cookie
})
var cookie_uid = 0 , console=console||{log:function(){return;}};
define(function(require, exports){
    console.log('如果你能看到这段话，那么欢迎你加入虎嗅团队，让我们一起从事这件伟大的，准备拯救世界的前端攻城师事业，^_-。请发送邮件到jobs@huxiu.com，请注明这是来自虎嗅网js信息的应聘信息。');

    /**
     *	首页－毒霸转用
     **/
    if(jQ('#duba_wrap').length > 0 ){
        jQ('#duba_wrap a').each(function(){
            jQ(this).attr('href',jQ(this).attr('href')+'?f=duba');
        })
    }

	/**
	*	全站
	*	加载cookie模块
	**/
	var cookie = require('cookie');
	require('bootstrap');
	require('prettify');

    /**
     *	内容页广告只显示一次
     *
     **/
    if(jQ.cookie('adbox_article')=='0'||jQ.cookie('adbox_article')==null){
        if(jQ('.hx-new-adbox-article').length>0){
            jQ('.hx-new-adbox-article .hx-ad-close').live('click',function(){
                jQ('.hx-new-adbox-article').hide();
                jQ.cookie('adbox_article','1',{expires:353600});
            })
        }
    }else{
        if(jQ('.hx-new-adbox-article').length>0){
            jQ('.hx-new-adbox-article').hide();
        }
    }



    /**
     *	加载认证用户名片
     *  by 见天
     *  time 2014.03.17
     **/
    require('hovercard.css');
    require('hoverCard');
	
	
	/**
	*	全站
	*	by jiantian
	*	time 2013.01.15
	*	判断是否登录
	**/
	if(jQ.cookie(cookiepre+'uid')!='0'&&jQ.cookie(cookiepre+'uid')!=null){
		cookie_uid=jQ.cookie(cookiepre+'uid');
		//cookie_uid='0';
	}
	jQ.cookie('count_article','1',{expires:259200}); 
	var count_article = jQ.cookie('count_article');
	if(count_article == '1' && count_article_id > 0 ){
	var article_id = 'count_article_'+count_article_id;
		if(jQ.cookie(article_id)!='1'){
			var article_url = '/tools/tongji.html?&huxiu_hash_code='+huxiu_hash_code+'&t='+(Math.random()*10000);
			jQ.post(article_url+'&aid='+count_article_id,function(){})
			jQ.cookie(article_id,'1',{expires:60*60*1000});
		}else{
		}
	}
	/**
	*	全站
	*	by jiantian
	*	time 2013.09.09
	*	个人中心更新提示
	**/
	if(isLogin()){
		if(jQ.cookie('login_first')!='0'&&jQ.cookie('login_first')!=null){
			if(jQ('#newTipFirst').length>0){
				jQ('.login-box').css('position','static').find('#newTipFirst').remove();
			}
		}else{
			jQ('.login-box').css('position','relative').append('<img id="newTipFirst" style="position:absolute;top:34px;left:48px;width:138px;" src="http://www.huxiu.com/static/img/newtip01.png">');
			jQ.cookie('login_first','1',{expires:353600});
		}
	}


	jQ("#start-intro").click(function(){
		bootstro.start();
	});
	
	/**
	*	boot左侧附加导航
	**/
	jQ('#navbar').affix();
	
	/**
	*	boot标记
	**/
	jQ('.a-reg').popover('toggle');
	jQ('.toggle-tooltip a,.toggle-tooltip i').tooltip();
    jQ('.show-tooltip a,.show-tooltip').tooltip('show');
	
	/**
	*	全站登录
	**/
	if(jQ('#lgnModal').length>0){
		require('hx_login');
	}
	/**
	*	全站注销
	**/
	if(jQ('.logout-btn').length>0){
		logout()
	}

	/**
	*	如果未登录，首页订阅不可用
	**/
	if(jQ('.a-email').length>0){
		var email = jQ('.a-email')
		email.attr({'url':email.attr('href'),'href':'javascript:void(0);'});
		jQ(document).on('click','.a-email',function(){
			if (!isLogin()) {
				jQ('#lgnModal').modal('show');
			}else{
//                临时修复bug   2014.06.23
//				location.href=email.attr('url');
				location.href='http://www.huxiu.com/user/change_subemail';
			}
		})
		jQ(document).on('click','.app-ad-btn',function(){
			jQ(this).find('div').toggle();
			jQ(this).siblings().find('div').hide();
		})
	}

	/**
	*	登录浮动框
	**/
	if(jQ('.float-box').length>0){
		jQ('.close').live('click',function(){
			jQ(this).parents('.float-box').hide();
		})
	}

	
	/**
	*	加载读点js
	**/
	if(jQ('.slides-box').length>0){
		slibeBox('#slides');
		slibeBox('#slides2');
		slibeBox('#slides3');
		slibeBox('#slides4');
		
	}
	
	/**
	*	加载读点js
	**/
	if(jQ('.books-neirong').length>0){
		require('read');
	}
	
	/**
	*	加载内容页管理
	**/
	if(jQ('#position_wrap').length>0){
        require('uploadify/uploadify.css');
        require('uploadify/uploadify.min');
		require('hx_manage');
	}

	/**
	*	by jiantian
	*	2013.11.15
	*	加载个人标签
	**/
	if(jQ('.personal-homepage-list .apply-renzheng-btn,.pre-territory-tags-wrap,#js_author_renzheng').length>0){
		require('hx_per_tags');
	}

	/**
	*	by jiantian
	*	time 2013.11.16
	*	
	**/
	if(jQ('.per-box').length>0){
		require('hx_user_info');
	}
	
	/**
	*	加载名片js
	**/
	if(jQ('#body_books').length>0){
		require('hovercard.css');
		require('hoverCard');
	}
	
	/**
	*	加载热词js
	**/
	if(jQ('#reci_container').length>0){
		require('masonry');
		
		
		jQ('#reci_container').masonry({itemSelector : '.item'});
		
		function Arrow_Points(){
		  var s = jQ("#reci_container").find(".item");
		  jQ.each(s,function(i,obj){
			var posLeft = jQ(obj).css("left");
			if(posLeft == "0px"){
			  html = "<span class='rightCorner'></span>";
			  jQ(obj).prepend(html);
			} else {
			  html = "<span class='leftCorner'></span>";
			  jQ(obj).prepend(html);
			}
		  });
		}
		Arrow_Points();
	}
	
	/**
	*	加载评论js
	**/
	if(jQ('#pinglun').length>0){
		require('hx_pinglun');
	}
	/**
	*	内容增加超链
	**/
	if(jQ('#neirong_box').length>0){
		jQ('#neirong_box a:not(.a_self)').attr('target','_blank');
	}

	/**
	*	个人中心内所有删除动作和订阅添加
	*	见天
	*	5.7
	**/
	if(jQ('.personal-homepage,.individual-center-box,.author-page,.tags-all-list,#tags_list,.tags-nr-box,#js_author_renzheng').length>0){
		jQ(document).on('click','.box-delete a,.personal-dingyue .close-ico,.personal-homepage .close-ico, #js_author_renzheng .close-ico',function(){
            if(confirm('确实要删除吗?')){
                var favid = jQ(this).attr('favid')
                    ,id = isUndefined(jQ(this).attr('id'))?'':jQ(this).attr('id')
                    ,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
                    ,tagid = isUndefined(jQ(this).attr('tagid'))?'':jQ(this).attr('tagid')
                    ,authorid = isUndefined(jQ(this).attr('authorid'))?'':jQ(this).attr('authorid')
                    ,opt = jQ(this).attr('opt')
                    ,act = jQ(this).attr('act')
                    ,postUrl = '/usersubmit?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
                    ,random = parseInt(Math.random()*100000)
                    ,formUrl = postUrl+random
                    ,postData = {'favid':favid,'id':id,'aid':aid,'tagid':tagid,'authorid':authorid,'opt':opt,'act':act}
                    ;
                jQ.post(formUrl,postData,function(data){
                    var data = eval('(' + data + ')');
                    if(data.is_success == '1') {
                        jQ('#id_'+id).remove();
                    }else{
                        alert(data.msg)
                    }
                })
            }
			
		})
        jQ(document).on('click','.set-tags,.add-tag,.tags-dingyue,.author-page .close-ico',function(){
            var favid = jQ(this).attr('favid')
                ,id = isUndefined(jQ(this).attr('id'))?'':jQ(this).attr('id')
                ,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
                ,tagid = isUndefined(jQ(this).attr('tagid'))?'':jQ(this).attr('tagid')
                ,authorid = isUndefined(jQ(this).attr('authorid'))?'':jQ(this).attr('authorid')
                ,opt = jQ(this).attr('opt')
                ,act = jQ(this).attr('act')
                ,postUrl = '/usersubmit?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
                ,random = parseInt(Math.random()*100000)
                ,formUrl = postUrl+random
                ,postData = {'favid':favid,'id':id,'aid':aid,'tagid':tagid,'authorid':authorid,'opt':opt,'act':act}
                ;
            jQ.post(formUrl,postData,function(data){
                var data = eval('(' + data + ')');
                if(data.is_success == '1') {
                    alert(data.msg)
                    jQ('#id_'+id).remove();
                }else{
                    alert(data.msg)
                }
            })

        })

        /**
         *	个人中心删除
         *	见天
         *	14.01.14
         **/
        if(jQ('.shouji-manage-btn').length>0){
            jQ(document).delegate('.shouji-manage-btn','click',function(){
                var t = jQ(this)
                    ,random = parseInt(Math.random()*100000)
                    ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                    ,postData = {
                        'act':'anthology',
                        'opt': t.attr('opt'),
                        'haid': t.attr('haid')
                    }
                jQ.post(postUrl,postData,function(data){
                    var data = eval('('+data+')');
                    if(data.is_success=='1'){
                        t.parents('.personal-homepage-box').remove();
                    }else{
                        alert(data.msg);
                    }
                })

            })
        }
  
  /*
  * zisasign
  * 2014.4.28
  * 加载上传头像插件
  * 无法实现seajs包裹
  */
  if(jQ('#avatar_uploader').length > 0) {
      var currentTab = 'upload',
          swf = new fullAvatarEditor("swfContainer", 400, 750, {
                  id: 'swf',
                  upload_url: '/user/change_avatar',
                  browse_box_width: 260,
                  browse_box_height: 260,
                  browse_box_align: 0,
                  webcam_box_align: 0,
                  browse_tip: "仅支持JPG、PNG格式的图片文件，小于2MB",
                  browse_button_font_size: 12,
                  browse_tip_font_size: 12,
                  browse_tip_y: 224,
                  src_box_width: 300,
                  src_box_height: 300,
                  src_upload:1,
                  avatar_tools_visible: true,
                  avatar_sizes: '180*180|120*120|48*48',
                  avatar_sizes_desc: '180*180像素|120*120像素|48*48',
                  tab_visible: false
              }, function(json) {
                if(json.code == 5) {
                  switch(json.type) {
                    case 0:
                      jQ('#current_avatar img').attr('src', json.content.avatar);
                      break;
                    default:
                      alert("上传失败，请稍后重试");
                  }
                }
              });

      jQ('.panel-buttons').click(function () {
        if (currentTab !== this.id) {
            currentTab = this.id;
            jQ(this).addClass('current');
            jQ(this).siblings().removeClass('current');
            swf.call('changepanel', this.id);
        }
      });
  }
}




	/**
	*	投稿判断投读书
	*	见天
	*	7.3
	**/
   	if(jQ('.tougao-msg').length>0){
		jQ('.tougao-class select').change(function(){
			var tougaoText = jQ(this).find('option:selected').text();
			if(tougaoText=='读点'){
				jQ('.book-dd').show();
				jQ('#dudiantougao').show();
				jQ('#wenzhangtougao').hide();
			}else{
				jQ('.book-dd').hide();
				jQ('#dudiantougao').hide();
				jQ('#wenzhangtougao').show();
			}
		})
   	}
	/**
	*	判断投递活动
	*	见天
	*	7.4
	**/
   	if(jQ('#toudihuodong').length>0){
		require('bootstrap-datetimepicker.min');
		require('datetimepicker.css');
   		
		jQ(".form_datetime").datetimepicker({
		    format: "yyyy-mm-dd hh:ii",
		    autoclose: true,
		    todayBtn: true,
		    startDate: "2013-07-01",
		    minuteStep: 10
		});
   	}
	
	/**
	*	验证码
	*	见天
	*	8.10
	**/
   	if(jQ('#code-img').length>0){
   		var random = parseInt(Math.random()*100000)
		,url = '/tools/get_capimg.html?&huxiu_hash_code='+huxiu_hash_code+'&back='+random
		,box = jQ('#code-img');
   		box.click(function(){
   			jQ.get(url,function(data){
   				box.html(data);
   			})
   		})
   	}
	
	
	/**
	*	by jiantian
	*	time 2013.05.12
	*	分享
	**/
	if(jQ('#share_wrap').length>0||jQ('#pinglun_list').length>0){
		
		/**
		*	by jiantian
		*	time 2013.05.12
		*	分享数
		**/
		var share_num_url = '/tools/getsharenum.html?aid='
			,share_box = jQ('.side-share-box .pos-top')
			,share_num_id = share_box.find('i').attr('aid')
			;
		jQ.get(share_num_url+share_num_id,function(data){
			share_box.find('i').html(data);
		})
		
		
		jQ(document).on('click','.share-box li',function(){
			if(!jQ(this).hasClass('tools-qrcode')&&!jQ(this).hasClass('hxs-fontset')){
				var from_url = encodeURIComponent(document.location.href)
					,title = encodeURIComponent(preg_quote(document.title))
					,description = encodeURIComponent(preg_quote(jQ('meta[name="description"]').attr('content')))
					,des = jQ(this).attr('des')
					,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
					,pid = isUndefined(jQ(this).attr('pid'))?'':jQ(this).attr('pid')
                    ,haid = isUndefined(jQ(this).attr('haid'))?'':jQ(this).attr('haid')
					///*,url = 'http://huxiu.com/tools.php?new_page=1&mod=share'+'&des='+des+'&from_url='+from_url+'&title='+title+'&description='+description+'&pid='+pid+'&aid='+aid;*/
					,url = '/share_data?aid='+aid+'&des='+des+'&pid='+pid+'&haid='+haid
					;
				window.open(url);
			}
		})
		jQ('#share_wrap .hxs-fontset').click(function(){
			var supBox = jQ(this).find('sup')
				,cttBox = jQ('#neirong_box')
				,cttBoxNum = parseInt(cttBox.css('font-size'));
			if(supBox.text()=='+'){
				cttBox.css({'font-size':cttBoxNum+2+'px','line-height':cttBoxNum+12+'px'});
				supBox.text('-')
			}else{
				cttBox.css({'font-size':cttBoxNum-2+'px','line-height':cttBoxNum+8+'px'});
				supBox.text('+')
			}
		})
		jQ('#share_wrap .tools-qrcode').click(function(){
			var box = jQ('#qrcode_box');
			if(box.length>0){
				if(box.is(':hidden')){
			        box.stop().show().animate({
			        	bottom:'55'
			        	,opacity:'1'
			        },'slow')
                }else{
			        box.stop().animate({
			        	bottom:'45'
			        	,opacity:'0.6'
			        },'slow',function(){
			        	jQ(this).hide();
			        })
                }
			}else{
            	var local_url = window.location.href
            		,qrcode_url = '/qr.html?&huxiu_hash_code='+huxiu_hash_code+'&data='+local_url
            		;
            	jQ.get(qrcode_url,function(data){
            		jQ('#share_wrap .tools-qrcode').append('<div id="qrcode_box">'+data+'</div>');
			        jQ('#qrcode_box').stop().show().animate({
			        	bottom:'55'
			        	,opacity:'1'
			        },'slow')
            	})
			}
		})
		jQ(document).on('click','.share-box .i-more',function(){
			jQ(this).parents('.share-box').siblings('.side-share-box2').toggle();
		})
		jQ(document).on('click','.pl-share',function(){
			jQ(this).find('.side-share-box2').toggle();
		})
		
	}
    /**
    * by 赵金叶
    * 修改个人资料页面
    * time 2014.3.19
    **/
    if(jQ('#personal-view').length>0 || jQ('#js_register_wrap').length>0){
    }
        require('hx-2014');

    if(jQ('.create-collect-wrap').length > 0){
        require('select/select2.css');
        require('select/select2.min');
//        require('select/select2_locale_zh-CN');
    }

    /**
     *	by zisasign
     *  招聘广告 条件载入
     *	time 2014.04.23
     *  增加猎聘
     *  time 2014.05.26
     **/
    
    /* 远程查询的公用函数
     * by zisasign
     * 2014.06.11
     */
    
    function remoteCheckGenerator(url) {
      return function(field) {
        if(field.prev_value === field.value) {
          if (field.wrapper.hasClass('success')){
            return false
          }
          else{
            return true
          }
        } else {
          var flag = false;
          jQ.ajax({
            url: url + encodeURI(field.value),
            async: false
            }).done(function(data){
              data = eval('(' + data + ')');
              if(data.is_success !== 1){
               flag = true;
              }
          })
          field.prev_value = field.value;
          return flag;
        }
      }
    } 
    
    // liepin 内容页评论上
    if(jQ('.jobAds-1').length > 0) {
      require.async('jobAds/jobs.css');
      require.async('jobAds/setup', function(jobDisplayer) {
        jobDisplayer.add_jobAds1();
      })
    }
    
    // liepin 内容页右侧
    if(jQ('.jobAds-2').length > 0) {
      require.async('jobAds/jobs.css');
      require.async('jobAds/setup', function(jobDisplayer) {
        jobDisplayer.add_jobAds2();
      })
    }
    
    // lagou 内容页右侧
    if(jQ('.jobAds-3').length > 0) {
      require.async('jobAds/jobs.css');
      require.async('jobAds/setup', function(jobDisplayer) {
        jobDisplayer.add_jobAds3();
      })
    }
    
    // lagou 首页右侧
    if(jQ('.jobAds-4').length > 0) {
      require.async('jobAds/jobs.css');
      require.async('jobAds/setup', function(jobDisplayer) {
        jobDisplayer.add_jobAds4();
      })
    }
    
    if(jQ('#auth_bind_form').length > 0) {
      require.async('hxValidator/hxValidator', function(hxValidator) {
        var url = '/user/check_login_name?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+(Math.random()*10000) + '&username=',
            options = {
              messages: {
                remoteAccountCheck: "不存在此账户"
              },
              customCheckMethods: {
                remoteAccountCheck: remoteCheckGenerator(url)
              }
            };
        new hxValidator("#auth_bind_form", options);
      })
    }
    
    if(jQ('#email_correction_form').length > 0) {
      require.async('hxValidator/hxValidator', function(hxValidator) {
        var url = '/user/check_reg_email?huxiu_hash_code='+huxiu_hash_code+'&random='+(Math.random()*10000) + '&email=',
            options = {
              messages: {
                remoteCheck: "该邮箱已被占用，请使用其他邮箱"
              },
              customCheckMethods: {
                remoteCheck: remoteCheckGenerator(url)
              }
            };
        new hxValidator("#email_correction_form", options);
      })
    }
    
    if(jQ('#password_correction_form').length > 0) {
      require.async('hxValidator/hxValidator', function(hxValidator) {
        new hxValidator("#password_correction_form");
      })
    }
    
    if(jQ('#user_register').length > 0) {

      require.async('hxValidator/hxValidator', function(hxValidator) {
          var captchaName = jQ(".captcha-field input[name='captchaname']").val(),
              getCaptchaUrl = "/user/get_register_captcha?is_ajax=1&captchaname=" + captchaName,
              captchaImage = jQ(".captcha-field .captcha"),
              linkButton = captchaImage.find('.change-link');

          function getCaptcha() {
              linkButton.hide();
              jQ.ajax(getCaptchaUrl).done(function(data) {
                  var data = eval('(' + data + ')');
                  console.log(1);
                  if(data.is_success == "1") {
                      captchaName = data.captchaname;
                      console.log(captchaName);
                      captchaImage.find("img").remove();
                      captchaImage.prepend(data.captcha_pic);
                  } else {

                      alert("服务器返回异常，请稍后再试。");
                  }
                  linkButton.show();
              })
          }
        jQ(".captcha-field .change-link").on("click", getCaptcha);

        var remoteUsernameCheckUrl = '/user/check_reg_username?huxiu_hash_code='+huxiu_hash_code+'&random='+(Math.random()*10000) + '&username=',
            remoteEmailCheckUrl = '/user/check_reg_email?huxiu_hash_code='+huxiu_hash_code+'&random='+(Math.random()*10000) + '&email=',
            remoteCaptchaUrl = "/user/check_register_captcha/user/check_register_captcha/?is_ajax=1&captchaname=" + captchaName + "&captchavalue=",
            options = {
              messages: {
                usernameUniqueRemote: "该用户名已被占用，请使用其他用户名",
                emailUniqueRemote: "该邮箱已被占用，请使用其他邮箱",
                captchaRemote: "验证码输入错误"
              },
              customCheckMethods: {
                usernameUniqueRemote: remoteCheckGenerator(remoteUsernameCheckUrl), 
                emailUniqueRemote: remoteCheckGenerator(remoteEmailCheckUrl),
                captchaRemote: remoteCheckGenerator(remoteCaptchaUrl)
              }
            };
        new hxValidator("#user_register_form", options);
      })
    }
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	提交建议
	**/
	if(jQ('#report_brn').length>0){
		jQ('#report_brn').click(function(){
			if(jQ('.float-report-box').length>0){
				jQ('.float-report-box').remove();
			}
			var offs = jQ(this).offset()
				,box = ''
				;
            if(isLogin()){
                box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top-260)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt"><div class="textarea-book"><textarea maxlength="350" placeholder="建议内容"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
                ;
            }else{
                box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top-330)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt">' +
                    '<div class="ipt-box"><label>姓名：</label><input class="ipt-name" /></div>' +
                    '<div class="ipt-box"><label>联系方式：</label><input class="ipt-contact" /></div>' +
                    '<div class="textarea-book"><textarea maxlength="350" placeholder="建议内容"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
            }
			jQ('body').append(box);
			jQ('.float-report-box form').submit(function(){return false;});
			
		})
	}
	if(jQ('#report_brn2').length>0){
		jQ('#report_brn2').click(function(){
			if(jQ('.float-report-box').length>0){
				jQ('.float-report-box').remove();
			}
			var offs = jQ(this).offset()
				,box = ''
				;

            if(isLogin()){
                box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top-260)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt"><div class="textarea-book"><textarea maxlength="350" placeholder="建议内容"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
                ;
            }else{
                box = '<div class="float-box float-report-box" style="left:'+(offs.left-174)+'px;top:'+(offs.top-330)+'px"><h3>提交建议</h3><span class="close">x</span><div class="ctt-wrap"><form name="name" action="/usersubmit.html" method="get"><div class="box-ctt">' +
                    '<div class="ipt-box"><label>姓名：</label><input class="ipt-name" /></div>' +
                    '<div class="ipt-box"><label>联系方式：</label><input class="ipt-contact" /></div>' +
                    '<div class="textarea-book"><textarea maxlength="350" placeholder="建议内容"></textarea></div><div class="clearfix btn-box"><button type="button" class="pull-right btn">确定</button></div></div></form></div></div>'
            }
			jQ('body').append(box);
			jQ('.float-report-box form').submit(function(){return false;});
			
		})
	}
	jQ('.float-report-box .btn-box').live('click',function(){
		var url = location.href
			,postUrl = '/usersubmit.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
			,random = parseInt(Math.random()*100000)
			,formUrl = postUrl+random
			,act = 'add_report'
            ,iptName = isUndefined(jQ('.float-report-box .ipt-name').val())?'未填':jQ('.float-report-box .ipt-name').val()
            ,iptCtt = isUndefined(jQ('.float-report-box .ipt-contact').val())?'未填':jQ('.float-report-box .ipt-contact').val()
			,message = jQ(this).parents('.float-report-box').find('textarea').val()
			,postData = ''
			;
        if(isLogin()){
            postData = {'url':url,'act':act,'message':encodeURI(message)}
        }else{
            postData = {'url':url,'act':act,'message':encodeURI('姓名:'+iptName+'联系方式:'+iptCtt+'。发来的建议内容:'+message)}
        }
		jQ.post(formUrl,postData,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success == '1') {
				alert(data.msg)
				jQ('.float-report-box').remove();
			}else{
				alert(data.msg)
			}
		})
	})
	jQ('.float-report-box .close').live('click',function(){
		jQ('.float-report-box').remove();
	})
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	个人中心，邮件，注册检测
	**/
  
  /*
  * 2014.4.29
  * 启用新的接口 注释原验证代码
  * zisasign
  */
	// if(jQ('.reg-wrap').length>0){
//     
//     jQ('#inputEmail,#inputName').live('blur',function(){
//       formCheck(jQ(this))
//     })
//     jQ('#inputPwd2').live('blur',function(){
//       var pwd = jQ('#inputPwd')
//         ,pwd2 = jQ('#inputPwd2')
//         ;
//       if(pwd2.val()==''){
//         pwd.parents('.control-group').removeClass('success').addClass('error')
//         pwd2.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('密码不能为空');
//       }else if(pwd.val()==pwd2.val()){
//         pwd.parents('.control-group').removeClass('error').addClass('success')
//         pwd2.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('输入正确');
//       }else{
//         pwd.parents('.control-group').removeClass('success').addClass('error')
//         pwd2.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('两次密码不一致');
//       }
//     })
//     jQ('#phone').live('blur',function(){
//       var phone = jQ('#phone')
//         ,mobile = /^1\d{10}$/
//         ;
//       if(!mobile.test(phone.val())){
//         phone.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('请填写手机号码');
//       }else{
//         phone.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('号码正确');
//       }
//     })
//   }
//   
	/**
	*	by jiantian
	*	time 2013.05.13
	*	个人中心修改资料检测
	**/
  /*
  * 2014.4.29
  * 启用新的接口 注释原验证代码
  * zisasign
  */
	// if(jQ('.personal-data').length>0){
//     
//     jQ('#inputEmail,#inputName').live('blur',function(){
//       formCheck(jQ(this),'/user/check/?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random=')
//     })
//     jQ('#inputPwd3').live('blur',function(){
//       var pwd2 = jQ('#inputPwd2')
//         ,pwd3 = jQ('#inputPwd3')
//         ;
//       if(pwd3.val()==''){
//         pwd2.parents('.control-group').removeClass('success').addClass('error')
//         pwd3.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('密码不能为空');
//       }else if(pwd2.val()==pwd3.val()){
//         pwd2.parents('.control-group').removeClass('error').addClass('success')
//         pwd3.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('输入正确');
//       }else{
//         pwd2.parents('.control-group').removeClass('success').addClass('error')
//         pwd3.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('两次密码不一致');
//       }
//     })
//     jQ('#inputphone').live('blur',function(){
//       var phone = jQ('#inputphone')
//         ,mobile = /^1\d{10}$/
//         ;
//       if(!mobile.test(phone.val())){
//         phone.parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('请填写手机号码');
//       }else{
//         phone.parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html('号码正确');
//       }
//     })
//   }

    /**
     *	by jiantian
     *	time 2014.02.17
     *	举报私信
     **/

    if(jQ('.msg-center-box .report-btn').length>0){
        jQ('.report-btn').live('click',function () {
            if (isLogin()) {
                var t = jQ(this)
                    ,postUrl = '/setuser/report?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
                    ,boxCtt = jQ(this).parents('tr').find('.pm-title .pm-box').text()
                    ,type = t.attr('typename')
                    ,uid =  t.attr('reportid')
                    ,random = parseInt(Math.random()*100000)
                    ,formUrl = postUrl+random
                    ,postData = ''
                    ;
                postData = {'type':type,'reportid':uid,'description':boxCtt};

                jQ.post(formUrl,postData,function(data){
                    var data = eval('(' + data + ')');
                    if (data.is_success == "1") {
                        showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                    }else{
                        showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                    }
                })
            }else{
                jQ('#lgnModal').modal('show');
            }
        })
    }
    /*
     *   稍后阅读列表
     *   by 见天
     *   2014.03.07
     **/
    if(jQ('.later-reading-btn').length>0){
        jQ(document).delegate('.later-reading-btn','click',function(){
            if (isLogin()) {
                var t = jQ(this)
                    ,aid = t.attr('aid')
                    ;
                t.addClass('disabled');
                postReadLaterList(t,aid);
            }else {
                jQ('#lgnModal').modal('show');
            }
        })
        function postReadLaterList(t,aid){
            if(t.hasClass('disabled')){
                var random = parseInt(Math.random()*100000)
                    ,postUrl = '/setuser/laterRead?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                    ,postData = {
                        'aid': aid
                    }
                jQ.post(postUrl,postData,function(data){
                    var data = eval('('+data+')');
                    if(data.is_success=='1'){
                        t.addClass('later-reading-active').attr({'href':'/member/laterread.html','data-original-title':'点击查看待读列表.^_^'});
                    }else{
                        alert(data.msg);
                    }
                    t.removeClass('disabled');
                })
            }
        }
    }
	
	function formCheck(box,type){
		var message = jQ(box).val()
			,check = jQ(box).attr('name')
			,postUrl = isUndefined(type)?'/index.php?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random=':type
			,random = parseInt(Math.random()*100000)
			,formUrl = postUrl+random+'&check='+check
			,postData = {'value':message}
			;
		if(message!=''){
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if(data.is_success == '1') {
					jQ(box).parents('.control-group').removeClass('error').addClass('success').find('.help-inline').html(data.msg);
				}else{
					jQ(box).parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html(data.msg);
				}
				box.popover('show');
			})
		}else{
			jQ(box).parents('.control-group').removeClass('success').addClass('error').find('.help-inline').html('输入框不能为空');
		}
	}
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.05.09
	*	用户协议
	**/
	if(jQ('#user_memo').length>0){
		jQ(document).on('click','.user-memo-btn',function(){
			if(jQ('#user_memo:hidden').length>0){
				jQ('#user_memo').show().animate({
					height: '260'
				}, 'slow');
			}else{
				jQ('#user_memo').animate({
					height: '0'
				}, 'slow',function(){
					jQ(this).hide()
				});
			}
		})
	}
	/**
	*	by jiantian
	*	time 2013.05.10
	*	复制到剪贴板的js代码
	**/
	jQ('.rss-wrap button').live('click',function(){
		var text = jQ(this).siblings('input').val();
		copy_code(text);
	})
	
	/**
	*	by jiantian
	*	time 2013.08.26
	*	个人中心ajax更新资料
	**/
	if(jQ('.author-card').length>0){
        if(jQ('#birth_ymd').length>0){
            require('birth_year_month_day.js');
        }
		jQ('.s-edit').live('click',function(){
			var t = jQ(this)
				,box = t.parent().find('.edit-box')
				,boxName = box.attr('name')
				,boxV = box.text()
				,boxContrast = ''
        ,postData = {}
				;
			if(jQ(this).find('.s-edit-btn').text()=='修改'){
                if(boxName == 'sex'){
                    box.html('<select class="span2" name="'+boxName+'"><option value="0">保密</option><option value="1">男</option><option value="2">女</option></select>');
                    box.find('option').each(function(){
                        if(t.text()==boxV){
                            t.attr({selected:'selected'})
                        }
                    })
                }else if(boxName == 'phone'){
                    box.html('<input type="text" name="'+boxName+'" placeholder="填写真实手机，小编将会电联确认" pattern="\\d{11}" class="span3" value="'+boxV+'">')
                }else if(boxName == 'often_email'){
                    box.html('<input type="text" name="'+boxName+'" pattern="^[a-zA-Z0-9-\_.]+@[a-zA-Z0-9-\_.]+\.[a-zA-Z0-9.]{2,5}$" class="span3" value="'+boxV+'">')
                }else{
                    box.html('<input type="text" name="'+boxName+'" class="span3" value="'+boxV+'">')
                }

				t.find('i').removeClass('icon-pencil').addClass('icon-ok');
				t.find('.s-edit-btn').text('确认');
				t.data('oldData',boxV);
			}else{
                if(t.hasClass('disabled')){
                    return;
                }else{
                    t.addClass('disabled');
                }
                if(boxName == 'sex'){
                    var op = box.find('option:selected');
                    var iptValue = op.val();
                    boxContrast = op.text();
                }else{
                    var iptValue = boxContrast = box.find('input').val();
                }

				if(jQ(this).data('oldData') == boxContrast){
                    if(boxName == 'sex'){
                        if(iptValue=='0'){box.html('默认');}
                        if(iptValue=='1'){box.html('男');}
                        if(iptValue=='2'){box.html('女');}
                    }else{
                        box.html(iptValue);
                    }

					t.find('i').removeClass('icon-ok').addClass('icon-pencil');
					t.find('.s-edit-btn').text('修改');
                    t.removeClass('disabled');
				}else{
					var random = parseInt(Math.random()*100000)
						,url = '/user/usersetting?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&callback='+random
						;
            postData[boxName] = iptValue;
						jQ.post(url,postData,function(data){
							var data = eval('(' + data + ')');
							if(data.is_success == '1'){
                                if(boxName == 'sex'){
                                    if(iptValue=='0'){box.html('默认');}
                                    if(iptValue=='1'){box.html('男');}
                                    if(iptValue=='2'){box.html('女');}
                                }else{
                                    box.html(iptValue);
                                }

								t.find('i').removeClass('icon-ok').addClass('icon-pencil');
								t.find('.s-edit-btn').text('修改');
                                if(t.parents('dl').hasClass('active')){
                                    t.parents('dl').removeClass('active');
                                }
							}else{
                                showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                            }
                            t.removeClass('disabled');
						})
				}
			}
		})
	}
	/**
	*	by jiantian
	*	time 2013.12.01
	*	个人中心ajax更新资料
	**/
	if(jQ('.per-info,.pre-territory-tags-wrap').length>0){
		jQ('.set-eye select').each(function(){
			jQ(this).attr('selId',jQ(this).find('option:selected').val());
		})

        jQ('.set-eye select').change(function(){
            var t = jQ(this)
                ,selOldId = t.attr('selId')
                ,selId = t.find('option:selected').val()
                ,iptName = t.parent().parent().find('.edit-box').attr('name')
                ,random = parseInt(Math.random()*100000)
                ,url = '/userdata/upuserQuanxian?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                ,postData = {}
                ;
            postData['pro['+iptName+']']=selId;
            if(selOldId!=selId){
                jQ.post(url,postData,function(data){
                    var data = eval('('+data+')');
                    if(data.is_success=='1'){
                        t.attr('selId',selId);
                    }
                })
            }
        })


        jQ('#birth_ymd select').change(function(){
            var t = jQ(this)
                ,selOldId = t.attr('selId')
                ,selId = t.find('option:selected').val()
                ,iptName = t.attr('name')
                ,random = parseInt(Math.random()*100000)
                ,url = '/member/edit_profile.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                ,postData = {
                    'name': iptName,
                    'val' : selId
                }
                ;
            if(selOldId!=selId){
                jQ.post(url,postData,function(data){
                    var data = eval('('+data+')');
                    if(data.is_success=='1'){
                        t.attr('selId',selId);
                    }
                })
            }
        })

		jQ(document).delegate('.per-info .edit-box input','change',function(){
            var boxBtn = jQ(this).parents('dd').find('.s-edit');
            boxBtn.trigger('click');
		})
        jQ(document).delegate('.per-info .edit-box input','focus',function(){
            var iptData = jQ(this).val()
            if(iptData=='未填写'){
                jQ(this).val('');
            }
        })
		

	}
	
	
	/**
	*	by jiantian
	*	time 2013.06.06
	*	作者名片
	**/
	if(jQ('.author-weixin').length>0){
		jQ(document).on('click','.author-weixin',function(){
			jQ(this).find('.author-weixin-box').toggle();
		})
	}
	/**
	*	by jiantian
	*	time 2013.05.12
	*	订阅作者
	**/
		jQ(document).on('click','.dy-btn',function(){
			var id = isUndefined(jQ(this).attr('id'))?'':jQ(this).attr('id')
				,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
				,tagid = isUndefined(jQ(this).attr('tagid'))?'':jQ(this).attr('tagid')
				,uid = isUndefined(jQ(this).attr('uid'))?'':jQ(this).attr('uid')
				,authorid = isUndefined(jQ(this).attr('authorid'))?'':jQ(this).attr('authorid')
				,opt = jQ(this).attr('opt')
				,act = jQ(this).attr('act')
				,postUrl = '/usersubmit?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
				,random = parseInt(Math.random()*100000)
				,formUrl = postUrl+random
				,postData = {'id':id,'aid':aid,'uid':uid,'tagid':tagid,'authorid':authorid,'opt':opt,'act':act}
			
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if(data.is_success == '1') {
					showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
				}else{
					showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
				}
			})
			
		})

	/**
	*	by jiantian
	*	time 2013.06.22
	*	个人设置
	**/
	if(jQ('#year_m_d').length>0){
		if(data_y!=0){
			jQ('#year_m_d select[name="birthyear"] option[value='+data_y+']').attr('selected','selected');
		}
		if(data_m!=0){
			jQ('#year_m_d select[name="birthmonth"] option[value='+data_m+']').attr('selected','selected');
		}
		if(data_d!=0){
			jQ('#year_m_d select[name="birthday"] option[value='+data_d+']').attr('selected','selected');
		}
	}
	/**
	*	by jiantian
	*	time 2013.08.12
	*	联想之星
	**/
	if(jQ('.image-box').length>0){
		require('fancybox/jquery.fancybox-1.3.4.css');
		require('fancybox/jquery.fancybox-1.3.4.pack');
		jQ("a.grouped_elements").fancybox({
		'titlePosition'  : 'inside'
		});
	}
	
	/**
	*	by jiantian
	*	time 2013.08.24
	*	个人中心用户信息
	**/
	if(jQ('.user-intro').length>0){
		jQ('.box-attribute li').mouseover(function(){
			jQ('.box-attribute .box-attribute-ctt').hide()
			jQ(this).find('.box-attribute-ctt').show();
		})
		jQ('.box-attribute li').mouseout(function(){
			jQ('.box-attribute .box-attribute-ctt').hide()
		})
	}
	
	/**
	*	by jiantian
	*	time 2013.08.03
	*	日历
	**/
	if(jQ('#idCalendar').length>0){
		require('hx_act_calendar');
	}
	
    //禁言与解禁
    jQ('.user-manage-btn .btn,.stop-user-btn').live('click',function () {
		if (isLogin()) {
			var t = jQ(this)
				,postUrl = '/setuser/stop_user?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
				,type = t.attr('typename')
				,uid =  t.attr('uid')
				,random = parseInt(Math.random()*100000)
				,formUrl = postUrl+random
				,postData = ''
				;
			postData = {'type':type,'uid':uid};
			
			jQ.post(formUrl,postData,function(data){
				var data = eval('(' + data + ')');
				if (data.is_success == "1") {
                    console.log(1111)
					showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					if(type=='stopuser'){
						t.attr('typename','startuser').html('解禁');
					}else{
						t.attr('typename','stopuser').html('禁言');
					}
						
				}else{
                    console.log(2222)
//                    showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime)
//                    showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime)
//                    showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime)
                    showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
				}
			})
		}else{
			jQ('#lgnModal').modal('show');
		}
	})


    /**
     * 此处下方均为弹出的对话框showDialog 所用到的函数,是从common.js复制过来的  =========开始
     * by zhaojinye
     * 2014/11/12
     */
    var JSMENU = [];
    JSMENU['active'] = [];
    JSMENU['timer'] = [];
    JSMENU['drag'] = [];
    JSMENU['layer'] = 0;
    JSMENU['zIndex'] = {'win':200,'menu':300,'dialog':400,'prompt':500};
    JSMENU['float'] = '';
    var showDialogST = null;
    var EXTRAFUNC = [], EXTRASTR = '';
    EXTRAFUNC['showmenu'] = [];
    var BROWSER = {};
    function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
        clearTimeout(showDialogST);
        cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
        leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
        mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
        var menuid = 'fwin_dialog';
        var menuObj = $(menuid);
        var showconfirm = 1;
        confirmtxtdefault = '确定';
        closetime = isUndefined(closetime) ? '' : closetime;
        closefunc = function () {
            if(typeof func == 'function') func();
            else eval(func);
            hideMenu(menuid, 'dialog');
        };
        if(closetime) {
            leftmsg = closetime + ' 秒后窗口关闭';
            showDialogST = setTimeout(closefunc, closetime * 1000);
            showconfirm = 0;
        }
        locationtime = isUndefined(locationtime) ? '' : locationtime;
        if(locationtime) {
            leftmsg = locationtime + ' 秒后页面跳转';
            showDialogST = setTimeout(closefunc, locationtime * 1000);
            showconfirm = 0;
        }
        confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
        canceltxt = canceltxt ? canceltxt : '取消';
        if(menuObj) hideMenu('fwin_dialog', 'dialog');
        menuObj = document.createElement('div');
        menuObj.style.display = 'none';
        menuObj.className = 'fwinmask';
        menuObj.id = menuid;
        $('append_parent').appendChild(menuObj);
        var hidedom = '';
        if(!BROWSER.ie) {
            hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
        }
        var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
        s += t ? t : '提示信息';
        s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
        if(mode == 'info') {
            s += msg ? msg : '';
        } else {
            s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
            s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>'+confirmtxt+'</strong></button>' : '');
            s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+canceltxt+'</strong></button>' : '';
            s += '</p>';
        }
        s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
        menuObj.innerHTML = s;
        if($('fwin_dialog_submit')) $('fwin_dialog_submit').onclick = function() {
            if(typeof func == 'function') func();
            else eval(func);
            hideMenu(menuid, 'dialog');
        };
        if($('fwin_dialog_cancel')) {
            $('fwin_dialog_cancel').onclick = function() {
                if(typeof funccancel == 'function') funccancel();
                else eval(funccancel);
                hideMenu(menuid, 'dialog');
            };
            $('fwin_dialog_close').onclick = $('fwin_dialog_cancel').onclick;
        }
        showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
        try {
            if($('fwin_dialog_submit')) $('fwin_dialog_submit').focus();
        } catch(e) {}
    }

    function in_array(needle, haystack) {
        if(typeof needle == 'string' || typeof needle == 'number') {
            for(var i in haystack) {
                if(haystack[i] == needle) {
                    return true;
                }
            }
        }
        return false;
    }

    function hideMenu(attr, mtype) {
        attr = isUndefined(attr) ? '' : attr;
        mtype = isUndefined(mtype) ? 'menu' : mtype;
        if(attr == '') {
            for(var i = 1; i <= JSMENU['layer']; i++) {
                hideMenu(i, mtype);
            }
            return;
        } else if(typeof attr == 'number') {
            for(var j in JSMENU['active'][attr]) {
                hideMenu(JSMENU['active'][attr][j], mtype);
            }
            return;
        }else if(typeof attr == 'string') {
            var menuObj = $(attr);
            if(!menuObj || (mtype && menuObj.mtype != mtype)) return;
            var ctrlObj = '', ctrlclass = '';
            if((ctrlObj = $(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {
                var reg = new RegExp(' ' + ctrlclass);
                ctrlObj.className = ctrlObj.className.replace(reg, '');
            }
            clearTimeout(JSMENU['timer'][attr]);
            var hide = function() {
                if(menuObj.cache) {
                    if(menuObj.style.visibility != 'hidden') {
                        menuObj.style.display = 'none';
                        if(menuObj.cover) $(attr + '_cover').style.display = 'none';
                    }
                }else {
                    menuObj.parentNode.removeChild(menuObj);
                    if(menuObj.cover) $(attr + '_cover').parentNode.removeChild($(attr + '_cover'));
                }
                var tmp = [];
                for(var k in JSMENU['active'][menuObj.layer]) {
                    if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
                }
                JSMENU['active'][menuObj.layer] = tmp;
            };
            if(menuObj.fade) {
                var O = 100;
                var fadeOut = function(O) {
                    if(O == 0) {
                        clearTimeout(fadeOutTimer);
                        hide();
                        return;
                    }
                    menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
                    menuObj.style.opacity = O / 100;
                    O -= 20;
                    var fadeOutTimer = setTimeout(function () {
                        fadeOut(O);
                    }, 40);
                };
                fadeOut(O);
            } else {
                hide();
            }
        }
    }

    function showMenu(v) {
        var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
        var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
        var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
        var ctrlObj = $(ctrlid);
        var menuObj = $(menuid);
        if(!menuObj) return;
        var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
        var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
        var pos = isUndefined(v['pos']) ? '43' : v['pos'];
        var layer = isUndefined(v['layer']) ? 1 : v['layer'];
        var duration = isUndefined(v['duration']) ? 2 : v['duration'];
        var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
        var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
        var cache = isUndefined(v['cache']) ? 1 : v['cache'];
        var drag = isUndefined(v['drag']) ? '' : v['drag'];
        var dragobj = drag && $(drag) ? $(drag) : menuObj;
        var fade = isUndefined(v['fade']) ? 0 : v['fade'];
        var cover = isUndefined(v['cover']) ? 0 : v['cover'];
        var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
        var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
        var winhandlekey = isUndefined(v['win']) ? '' : v['win'];
        zindex = cover ? zindex + 500 : zindex;
        if(typeof JSMENU['active'][layer] == 'undefined') {
            JSMENU['active'][layer] = [];
        }

        for(i in EXTRAFUNC['showmenu']) {
            try {
                eval(EXTRAFUNC['showmenu'][i] + '()');
            } catch(e) {}
        }

        if(evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
            hideMenu(menuid, mtype);
            return;
        }
        if(mtype == 'menu') {
            hideMenu(layer, mtype);
        }

        if(ctrlObj) {
            if(!ctrlObj.getAttribute('initialized')) {
                ctrlObj.setAttribute('initialized', true);
                ctrlObj.unselectable = true;

                ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
                ctrlObj.onmouseout = function() {
                    if(this.outfunc) this.outfunc();
                    if(duration < 3 && !JSMENU['timer'][menuid]) {
                        JSMENU['timer'][menuid] = setTimeout(function () {
                            hideMenu(menuid, mtype);
                        }, timeout);
                    }
                };

                ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
                ctrlObj.onmouseover = function(e) {
                    doane(e);
                    if(this.overfunc) this.overfunc();
                    if(evt == 'click') {
                        clearTimeout(JSMENU['timer'][menuid]);
                        JSMENU['timer'][menuid] = null;
                    } else {
                        for(var i in JSMENU['timer']) {
                            if(JSMENU['timer'][i]) {
                                clearTimeout(JSMENU['timer'][i]);
                                JSMENU['timer'][i] = null;
                            }
                        }
                    }
                };
            }
        }

        if(!menuObj.getAttribute('initialized')) {
            menuObj.setAttribute('initialized', true);
            menuObj.ctrlkey = ctrlid;
            menuObj.mtype = mtype;
            menuObj.layer = layer;
            menuObj.cover = cover;
            if(ctrlObj && ctrlObj.getAttribute('fwin')) {menuObj.scrolly = true;}
            menuObj.style.position = 'absolute';
            menuObj.style.zIndex = zindex + layer;
            menuObj.onclick = function(e) {
                return doane(e, 0, 1);
            };
            if(duration < 3) {
                if(duration > 1) {
                    menuObj.onmouseover = function() {
                        clearTimeout(JSMENU['timer'][menuid]);
                        JSMENU['timer'][menuid] = null;
                    };
                }
                if(duration != 1) {
                    menuObj.onmouseout = function() {
                        JSMENU['timer'][menuid] = setTimeout(function () {
                            hideMenu(menuid, mtype);
                        }, timeout);
                    };
                }
            }
            if(cover) {
                var coverObj = document.createElement('div');
                coverObj.id = menuid + '_cover';
                coverObj.style.position = 'absolute';
                coverObj.style.zIndex = menuObj.style.zIndex - 1;
                coverObj.style.left = coverObj.style.top = '0px';
                coverObj.style.width = '100%';
                coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
                coverObj.style.backgroundColor = '#000';
                coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
                coverObj.style.opacity = 0.5;
                coverObj.onclick = function () { hideMenu(); };
                $('append_parent').appendChild(coverObj);
                _attachEvent(window, 'load', function () {
                    coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
                }, document);
            }
        }
        if(drag) {
            dragobj.style.cursor = 'move';
            dragobj.onmousedown = function(event) {try{dragMenu(menuObj, event, 1);}catch(e){}};
        }

        if(cover) $(menuid + '_cover').style.display = '';
        if(fade) {
            var O = 0;
            var fadeIn = function(O) {
                if(O > 100) {
                    clearTimeout(fadeInTimer);
                    return;
                }
                menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
                menuObj.style.opacity = O / 100;
                O += 20;
                var fadeInTimer = setTimeout(function () {
                    fadeIn(O);
                }, 40);
            };
            fadeIn(O);
            menuObj.fade = true;
        } else {
            menuObj.fade = false;
        }
        menuObj.style.display = '';
        if(ctrlObj && ctrlclass) {
            ctrlObj.className += ' ' + ctrlclass;
            menuObj.setAttribute('ctrlid', ctrlid);
            menuObj.setAttribute('ctrlclass', ctrlclass);
        }
        if(pos != '*') {
            setMenuPosition(showid, menuid, pos);
        }
        if(BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $('fwin_' + winhandlekey)) {
            $(menuid).style.left = (parseInt($(menuid).style.left) - parseInt($('fwin_' + winhandlekey).style.left)) + 'px';
            $(menuid).style.top = (parseInt($(menuid).style.top) - parseInt($('fwin_' + winhandlekey).style.top)) + 'px';
        }
        if(maxh && menuObj.scrollHeight > maxh) {
            menuObj.style.height = maxh + 'px';
            if(BROWSER.opera) {
                menuObj.style.overflow = 'auto';
            } else {
                menuObj.style.overflowY = 'auto';
            }
        }

        if(!duration) {
            setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
        }

        if(!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
        menuObj.cache = cache;
        if(layer > JSMENU['layer']) {
            JSMENU['layer'] = layer;
        }
        var hasshow = function(ele) {
            while(ele.parentNode && ((typeof(ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele,null) : ele['currentStyle'])['display'] !== 'none') {
                ele = ele.parentNode;
            }
            if(ele === document) {
                return true;
            } else {
                return false;
            }
        };
        if(!menuObj.getAttribute('disautofocus')) {
            try{
                var focused = false;
                var tags = ['input', 'select', 'textarea', 'button', 'a'];
                for(var i = 0; i < tags.length; i++) {
                    var _all = menuObj.getElementsByTagName(tags[i]);
                    if(_all.length) {
                        for(j = 0; j < _all.length; j++) {
                            if((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {
                                _all[j].className += ' hidefocus';
                                _all[j].focus();
                                focused = true;
                                var cobj = _all[j];
                                _attachEvent(_all[j], 'blur', function (){cobj.className = trim(cobj.className.replace(' hidefocus', ''));});
                                break;
                            }
                        }
                    }
                    if(focused) {
                        break;
                    }
                }
                if(!focused) {
                    menuObj.focus();
                }
            } catch (e) {

            }
        }
    }

    function _attachEvent(obj, evt, func, eventobj) {
        eventobj = !eventobj ? obj : eventobj;
        if(obj.addEventListener) {
            obj.addEventListener(evt, func, false);
        } else if(eventobj.attachEvent) {
            obj.attachEvent('on' + evt, func);
        }
    }

    function setMenuPosition(showid, menuid, pos) {
        var showObj = $(showid);
        var menuObj = menuid ? $(menuid) : $(showid + '_menu');
        if(isUndefined(pos) || !pos) pos = '43';
        var basePoint = parseInt(pos.substr(0, 1));
        var direction = parseInt(pos.substr(1, 1));
        var important = pos.indexOf('!') != -1 ? 1 : 0;
        var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;

        if(!menuObj || (basePoint > 0 && !showObj)) return;
        if(showObj) {
            sxy = fetchOffset(showObj);
            sx = sxy['left'];
            sy = sxy['top'];
            sw = showObj.offsetWidth;
            sh = showObj.offsetHeight;
        }
        mw = menuObj.offsetWidth;
        mcw = menuObj.clientWidth;
        mh = menuObj.offsetHeight;
        mch = menuObj.clientHeight;

        switch(basePoint) {
            case 1:
                bpl = sx;
                bpt = sy;
                break;
            case 2:
                bpl = sx + sw;
                bpt = sy;
                break;
            case 3:
                bpl = sx + sw;
                bpt = sy + sh;
                break;
            case 4:
                bpl = sx;
                bpt = sy + sh;
                break;
        }
        switch(direction) {
            case 0:
                menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
                mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
                break;
            case 1:
                ml = bpl - mw;
                mt = bpt - mh;
                break;
            case 2:
                ml = bpl;
                mt = bpt - mh;
                break;
            case 3:
                ml = bpl;
                mt = bpt;
                break;
            case 4:
                ml = bpl - mw;
                mt = bpt;
                break;
        }
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        if(!important) {
            if(in_array(direction, [1, 4]) && ml < 0) {
                ml = bpl;
                if(in_array(basePoint, [1, 4])) ml += sw;
            } else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
                ml = bpl - mw;
                if(in_array(basePoint, [2, 3])) {
                    ml -= sw;
                } else if(basePoint == 4) {
                    ml += sw;
                }
            }
            if(in_array(direction, [1, 2]) && mt < 0) {
                mt = bpt;
                if(in_array(basePoint, [1, 2])) mt += sh;
            } else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
                mt = bpt - mh;
                if(in_array(basePoint, [3, 4])) mt -= sh;
            }
        }
        if(pos.substr(0, 3) == '210') {
            ml += 69 - sw / 2;
            mt -= 5;
            if(showObj.tagName == 'TEXTAREA') {
                ml -= sw / 2;
                mt += sh / 2;
            }
        }
        if(direction == 0 || menuObj.scrolly) {
            if(BROWSER.ie && BROWSER.ie < 7) {
                if(direction == 0) mt += scrollTop;
            } else {
                if(menuObj.scrolly) mt -= scrollTop;
                menuObj.style.position = 'fixed';
            }
        }
        if(ml) menuObj.style.left = ml + 'px';
        if(mt) menuObj.style.top = mt + 'px';
        if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
            menuObj.style.position = 'absolute';
            menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
        }
        if(menuObj.style.clip && !BROWSER.opera) {
            menuObj.style.clip = 'rect(auto, auto, auto, auto)';
        }
    }

    function doane(event, preventDefault, stopPropagation) {
        var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
        var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
        e = event ? event : window.event;
        if(!e) {
            e = getEvent();
        }
        if(!e) {
            return null;
        }
        if(preventDefault) {
            if(e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        }
        if(stopPropagation) {
            if(e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        }
        return e;
    }

    function trim(str) {
        return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
    }

    /**
     * ===========showDialog结束
     * by zhaojinye
     * 2014/11/12
     */

    /**
     *	by jiantian
     *	time 2014.01.03
     *	文集编辑页面js
     **/

    if(jQ('.add-collect,.collect-neirong-index').length>0){
        require('hx_collect');
    }
	
    /**
     *	by jiantian
     *	time 2014.01.20
     *	取消订阅
     **/

    jQ(document).delegate('.edit-unsubscription','click',function(){

        if(confirm('确实要取消订阅吗?')){
            var t = jQ(this)
                ,random = parseInt(Math.random()*100000)
                ,formUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                ,haid = t.attr('haid')
                ;
            var postData = {
                'act':'anthology',
                'haid':haid,
				'opt':'unsubscription'
            };
            jQ.post(formUrl,postData,function(data){
                var data = eval('(' + data + ')');
                if (data.is_success == '0') {
                    showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                } else {
                    t.parents('.personal-homepage-box').remove();
                }
            })
		}

    })

    /**
     *	by jiantian
     *	time 2014.01.20
     *	加入文集弹窗
     **/

    if(jQ('.create-collect-wrap, .js-wj-edit-cover').length>0){
        require('hx_edit_collect');
    }
    /**
     *	by jiantian
     *	time 2014.01.03
     *	创建文集页面
     **/
    if(jQ('.collect-checkbox').length>0){
        jQ(document).delegate('.collect-checkbox','click',function(){
            if(jQ(this).attr('checked')=='checked'){
                jQ('.create-collect-wrap .box-info').show();
            }else{
                jQ('.create-collect-wrap .box-info').hide();
            }
        })
    }
    
    /**
     *	by jiantian
     *	time 2014.01.22
     *	个人中心稍后阅读的js默认开启
     **/
    if(jQ('#readlater_wrap').length>0){
        jQ('.author-list-menu .li-end').addClass('open').find('li').eq(2).find('a').addClass('2').tooltip('show');
    }
    
    
    /**
     *	by jiantian
     *	time 2014.03.08
     *	认证页面及个人中心上传二维码
     **/

//    if(jQ('.create-collect-wrap #wechat_erweima_updata').length>0){
//
//        require('hx_wechat_erweima');
//    }


    /**
     *	by zhaojinye
     *	time 2014.05.05
     *	认证页面及个人中心上传二维码
     **/

    if(jQ('.js-info-basic-edit-view #wechat_erweima_updata, .wechat-erweima-wrap #wechat_erweima_updata').length>0){
        require.async('hx_wechat_erweima_new');
    }
    
    
})


		
/**
*	全站
*	绑定下拉菜单,滑动显示
**/
menuSlide('#user_login div','ul');
		
/**
*	全站
*	绑定分享菜单,滑动显示
**/
menuClickSlide('.book-share','.share-box');

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	菜单滑动下拉显示
**/
function menuSlide(id,tags,timeout){
	var timeout = isUndefined(timeout) ? '800' : timeout;
	jQ(id).hover(function(){
		jQ(this).find(tags).stop(true,true).slideDown('fast');
	}, function() {
		jQ(this).find(tags).delay(timeout).slideUp(100);
	});
}

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	菜单点击下拉显示
**/
function menuClickSlide(id,tags){
	var box = jQ(id).find(tags);
	jQ(document).on('click',id,function(){
		if(box.is(':hidden')){
			box.stop(true,true).slideDown('fast');
		}else{
			box.stop(true,true).slideUp(100);
		}
	});
}

/**
*	全站
*	by jiantian
*	time 2013.05.22
*	定义$符号
**/
function $(id) {
	return !id ? null : document.getElementById(id);
}


/**
*	全站
*	by jiantian
*	time 2013.01.15
*	判断是否定义
*	加载common的时候不需要
**/
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

/**
*	全站
*	by jiantian
*	time 2013.01.15
*	判断是否登录
**/
function isLogin(){
	var uid = isUndefined(uid)?'0':uid;
	if(cookie_uid!='0'){
		return true;
	}else if(uid!='0'){
		return true;
	}else{
		return false;
	}
}


/**
*	by jiantian
*	time 2013.05.07
*	读点的滚动数据
**/
function slibeBox(id) {
	var ul_box = jQ(id).find('.slides-div ul'),
		ul_num = ul_box.length,
		li_wrap = jQ(id).find('.slides-pagination'),
		li_box='',
		pre = jQ(id).find('.pre'),
		next = jQ(id).find('.next'),
		li_btn = ul_box.find('a'),
		slibe_w = jQ(id).find('.slides-div').width(),
		cur_i = '0';
	
	for(i=1;i<=ul_num;i++){
		if(i=='1'){
			li_box = '<li><a href="javascrpit:void(0)" class="on">'+i+'</a></li>'
		}else{
			li_box += '<li><a href="javascrpit:void(0)">'+i+'</a></li>';
		}
		li_wrap.html(li_box);
	}
	li_wrap.find('a').live('click',function(){
		var t_num = jQ(this).text()-1;
		
			if(t_num>cur_i){
				moveBox(ul_box,-slibe_w,cur_i,t_num,li_wrap,pre)
				cur_i = t_num;
				if(cur_i==(ul_num-1)){
					next.addClass('on');
				}
			}else if(t_num<cur_i){
				moveBox(ul_box,slibe_w,cur_i,t_num,li_wrap,next)
				cur_i = t_num;
				if(cur_i=='0'){
					pre.addClass('on');
				}
			}
		
	})
	pre.live('click',function(){
		if(cur_i!='0'){
			moveBox(ul_box,slibe_w,cur_i,--cur_i,li_wrap,next)
			if(cur_i=='0'){
				pre.addClass('on');
			}
		}
	})
	next.live('click',function(){
		if(cur_i<(ul_num-1)){
			moveBox(ul_box,-slibe_w,cur_i,++cur_i,li_wrap,pre)
			if(cur_i==(ul_num-1)){
				next.addClass('on');
			}
		}
	})
	
	function moveBox(ul_box,slibe_w,cur_i,cur_i2,li_wrap,tbox) {
			ul_box.eq(cur_i).animate({left:slibe_w},1000);
			ul_box.eq(cur_i2).animate({left:0},1000).addClass('on').siblings().removeClass('on');
			li_wrap.find('a').removeClass('on').eq(cur_i2).addClass('on');
			tbox.removeClass('on');
	}
}


/**
*	全站错误提示
**/
function errorBox(){
	var boxWrap = '<div id="box_wrap"></div>'
}


	
/**
*	by jiantian
*	time 2013.05.09
*	退出登录
**/
function logout(){
	var logout_url = jQ('.logout-btn').attr('url');
	jQ('.logout-btn').attr('href','javascript:void(0);');
	jQ('.logout-btn').live('click',function(){
	    var	random = parseInt(Math.random()*100000)
	    	,uUrl = logout_url+'?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&back=?&random='+random
			;
		jQ.post(uUrl,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success=='1'){
				jQ('.login-box').before('<div class="login-box"><div class="btn-group"><a href="/contribute" class="contribute" title="投稿">投稿</a></div><div class="btn-group"><a href="#lgnModal" data-toggle="modal">登录</a><a href="/user/register">注册</a></div><div class="btn-group"><a href="/rss" title="RSS"><i class="icon-rss"></i></a></div></div>').remove();
				window.location.reload();
			}
		})
	})
}

/**
*	by jiantian
*	time 2013.05.10
*	跟随浮动
**/
if(jQ('.go-top').length>0){
	floatBox('.go-top','','300','right','10','none')
}
if(jQ('#position_wrap').length>0){
	floatBox('#position_wrap','','0','right','70','none')
}
if(jQ('#share_wrap').length>0){
	floatBox('#share_wrap','.neirong','700')
}
function floatBox(id,wrap,top,right,bottom,dis){
	var box = jQ(id)
		,top = isUndefined(top)?'0':top
		,bottom = isUndefined(bottom)?'0':bottom
		,wrapNum = '1000000'
		,right = isUndefined(right)?'0':right
		,dis = isUndefined(dis)?'block':dis
		;

	if(!isUndefined(wrap)&&wrap!=''){
		var wrapBox = jQ(wrap)
			,wrapH = wrapBox.height()
			,wOffs = wrapBox.offset();
		var wrapNum = wrapH+wOffs.top-66;
	}
	if(dis=='none'){box.hide();}
	if(right!='0'){
		var winWth = jQ(window).width();
		var boxWth = jQ('.row-fluid-wrap-hx').width();
		if((winWth-boxWth) >= 20){
			var rNum = (winWth-boxWth)/2-box.width();
		}else{
			var rNum = '10px';
		}
		box.css({'right':rNum})
	}

    jQ(window).scroll(function() {
		var scrolls = jQ(this).scrollTop()+jQ(window).height()-60;
		if (scrolls > top && scrolls < wrapNum) {
			if (window.XMLHttpRequest) {
				box.css({
                    position: 'fixed',
                    bottom: bottom+'px',
			    	display:'block'
				});
			} else {
				box.css({
                    position: 'absolute',
					top: scrolls-bottom+'px',
			    	display:'block'
				});
			}
		}else {
			box.css({
			    position: 'relative',
			    display:dis
			})
		}
    })
}

/**
*	by jiantian
*	time 2013.05.10
*	复制到剪贴板的js代码
**/
function preg_quote(str) {
    return str.replace(/(["'"])/g, "`");
}


/**
*	by jiantian
*	time 2013.05.10
*	复制到剪贴板的js代码
**/
function copy_code(copyText) 
{
    if (window.clipboardData) 
    {
        window.clipboardData.setData("Text", copyText)
    } 
    else 
    {
        var flashcopier = 'flashcopier';
        if(!document.getElementById(flashcopier)) 
        {
          var divholder = document.createElement('div');
          divholder.id = flashcopier;
          document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed src="/static/img/_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(copyText)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
  alert('copy成功！');
}


/**
*	by jiantian
*	time 2013.05.23
*	格式化对象为json数据
**/
function parseFunction(data){
	
	var vdata='';
	
	jQ.each(data,function(i,v){
		vdata = vdata+'"'+i+'":'+v+','
	})
	vdata = '{'+vdata+'}';
	
	return vdata;
}

/**
*	by jiantian
*	time 2013.05.23
*	更新cookie数据
**/
function updataCookie(aid,clickid){
	var hxwz_uid = 'hxwz_'+uid,hxwz_aid = eval('('+jQ.cookie(hxwz_uid) + ')'),flag=0;
	var temp_click = Math.pow(2,clickid-1);
	jQ.each(hxwz_aid,function(id,v){
		if(id==aid && (v & temp_click)==0){
			flag=1;
			v+=temp_click;
			hxwz_aid[aid] = v;
			return false;
		}
	})
	
	if(flag==0){
		hxwz_aid[aid] = temp_click;
	}
	var vdata = parseFunction(hxwz_aid);
	jQ.cookie(hxwz_uid,vdata,{expires:4592000})
}


