define(function(require, exports){
	var atUrl = '/tools/atlist.html?f=100&back=?&f=100&huxiu_hash_code='+huxiu_hash_code+'&random=';
	var showMsgId = '#textarea';
	var postUrl = '/usersubmit.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random=';
	var plStart = '1';
	
    /**
	*	by jiantian
	*    禁用表单
	**/
    jQ('.pinglun form').submit(function(){return false;});
    
	jQ(showMsgId).keyup(function(){
		//定义最少输入数字
		var min=10,not_state = '1';
		//取得用户输入的字符的长度
		var length = jQ(this).val().length;
        if(length==0){
            jQ("#notice").html("最少输入<span id='notice_span'>"+(min-length)+"</span>个字");
        }else if(length<min){
			jQ("#notice").html("还要输入<span id='notice_span'>"+(min-length)+"</span>个字");
		}else{
			jQ("#notice").html("您可以发布了");
		}
	})
	
    //@用户
	require('jquery.caret')
	require('jquery.atwho');
    var random = parseInt(Math.random()*100000);
    jQ.getJSON(atUrl + random, function (data) {
        datas = jQ.map(data, function (value, i) {
            return {'id':i, 'key':value, 'name':value}
        })
        atFind(datas);
    })
    
	/**
	*	字体大小设置
	**/
	if(jQ('#font_big').length>0){
		jQ(document).on('click','#font_big,#font_small',function(){
			var cttBox = jQ('#neirong_box');
			if(jQ(this).attr('id')=='font_big'){
				if(cttBox.css('font-size')=='14px'){
					cttBox.css({'font-size':'16px','line-height':'26px'});
				}else if(cttBox.css('font-size')=='16px'){
					cttBox.css({'font-size':'18px','line-height':'28px'});
				}
			}else{
				if(cttBox.css('font-size')=='16px'){
					cttBox.css({'font-size':'14px','line-height':'24px'})
				}else if(cttBox.css('font-size')=='18px'){
					cttBox.css({'font-size':'16px','line-height':'26px'})
				}
				
			}
			jQ(this).addClass('noclose').siblings().removeClass('noclose');
		})
	}
	
	/**
	*	textarea自动高度
	**/
	require('autoresize.min')
	jQ('#pl_form textarea').autoResize({
	    onResize : function() {
	        jQ(this).css({opacity:0.8});
	    },
	    animateCallback : function() {
	        jQ(this).css({opacity:1});
	    },
	    animateDuration : 300,
	    extraSpace : 30
	});
	jQ('#pinglun_list .textarea-txt,.author-ask .textarea-txt').autoResize({
	    onResize : function() {
	        jQ(this).css({opacity:0.8});
	    },
	    animateCallback : function() {
	        jQ(this).css({opacity:1});
	    },
	    animateDuration : 300,
	    extraSpace : 30,
		limit: 150
	});
	/*
	*长评论
	jQ('#cpl').live('click',function(){
		if(jQ(this).find('input').val()=='1'){
			jQ('#textarea').height('97');
			jQ(this).find('input').val('0');
		}else{
			jQ('#textarea').height('400');
			jQ(this).find('input').val('1');
		}
		console.log(jQ(this).find('input').val())
	})
	*/	
		
    //提交评论和点评
    jQ('.subscribe-btn').live('click',function () {
	    if (isLogin()) {
	        //评论
	        if(plStart=='1'){
		        var box = jQ(this).parents('form')
		        	,boxTextarea = box.find('.textarea-txt')
		        	,random = parseInt(Math.random()*100000)
		        	,formUrl = postUrl+random
		        	,boxDataMsg = isUndefined(boxTextarea.data('msg'))?'':boxTextarea.data('msg')
		        	,formMsg = boxTextarea.val()+boxDataMsg
		        	,action = box.find('input[name="act"]').val()
		        	,idtype = box.find('input[name="idtype"]').val()
		        	,aid = box.find('input[name="aid"]').val()
		        	,pid = box.find('input[name="pid"]').val()
		        	,t = jQ(this);
		        //内容不能为空
		        if(formMsg==''||formMsg==null){
		        	var formBox = t.parents('form')
		        		,textareaBox = formBox.find('.textarea-txt').parent()
		        		,boxHtml = '<div class="error-box" style="position:absolute;margin:0 auto;top:0;right:100px;color:#f00;width:200px;">亲，内容为空你好意思么</div>'
		        		;
		        	t.after(boxHtml).parent().css({'position':'relative'});
		        	formBox.find('.textarea-txt').css({'background-color':'#fdf4eb'});
		        	textareaBox.stop(true,true)
		        		.animate({'right':'10px'},100)
						.animate({'right':'-10px'},100)
		        		.animate({'right':'7px'},90)
						.animate({'right':'-7px'},90)
		        		.animate({'right':'4px'},80)
						.animate({'right':'-4px'},80)
						.animate({'right':'0'},70,function(){
		        			formBox.find('.textarea-txt').css({'background-color':'#fff'});
		        			formBox.find('.error-box').remove();
						});
		        	return false;
		        }
		        //提交表单
		        pinglunPost(formUrl,formMsg,action,idtype,aid,pid)
		        //关闭提交
		        plStart='0';
	        }
	        
	    } else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    }
    })
    
    //点评回复
    
	if(!isLogin()){
		jQ(document).on('click','#pinglun_list .textarea-txt',function(){
			jQ('#lgnModal').modal('show');
		})
	}
    
    
    jQ('.pinglun-reply-btn').live('click',function(){
		if(isLogin()) {
	    	//获取要回复用户名和内容
	    	var name = jQ(this).parents('.dianping-box-text').find('.name').text()
	    		,msg = jQ(this).parents('.dianping-box-text').find('.dd-s').text()
	    		,box = jQ(this).parents('.dianping-list').find('.textarea-txt').focus();
	    	//过滤msg代码保证只引用一条
	    	msg = htmlGroup(msg);
	    	//存储要回复的用户名并写入输入框
	    	box.data({'name':name,'msg':'//@'+msg}).val('回复@'+name+' ：').focus();
    	}else{
			jQ('#lgnModal').modal('show');
    	}
    })
    
    
	//提交顶踩
    jQ('.agree,.disagree').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.pinglun-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_click&opt=pid'
					,aid = box.find('input[name="aid"]').val()
					,pid = box.find('input[name="pid"]').val()
					,clickid='';
				if(jQ(this).hasClass('agree')){
					clickid = 0;
				}else if(jQ(this).hasClass('disagree')){
					clickid = 1;
				}
				var postData = {'clickid':clickid,'aid':aid,'pid':pid};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == "0") {
						if(data.uid=='0'){
							jQ('#lgnModal').modal('show');
						}
						alert(data.msg)
						//要改啊
						//showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					} else {
						agreeDisagree(t, '+1', '1');
						var t_span =t.find('span'),t_num = t_span.text();
						if(t_num==''){
							t_span.html('(1)');
						}else{
							t_num = t_num.replace('(','');
							t_num = parseInt(t_num.replace(')',''));
							t_span.html('('+(t_num+1)+')');
						}
					}
					t.addClass('is-clicked')
				})
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	
    
    //提交举报
    jQ('.report-btn').live('click',function () {
		if (isLogin()) {
			var t = jQ(this)
				,postUrl = '/setuser/report?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
				,box = jQ(this).parents('.pinglun-box')
				,type = t.attr('typename')
				,rid =  t.attr('reportid')
				,pid =  t.attr('pid')
				,aid =  t.attr('aid')
				//,content = box.find('.view-info').html()
				,random = parseInt(Math.random()*100000)
				,formUrl = postUrl+random
				,postData = ''
				;
postData = {'type':type,'reportid':rid,'aid':aid,'pid':pid};
//postData = {'type':type,'reportid':rid,'aid':aid,'content':encodeURI(content.substring(0,118))};
			
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
    
    /**
	*	全站
	*	by jiantian
	*	time 2013.05.23
	*	判断顶踩
	**/
	if (isLogin()) {
		var hxwz_uid = 'hxwz_'+uid;
		if(!jQ.cookie(hxwz_uid)){
			var hxwzUrl = '/tools/getuserdata.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
	        	,random = parseInt(Math.random()*100000)
	        	,hxwzUrl = hxwzUrl+random
		        ;
			jQ.get(hxwzUrl,function(data){
				data = eval('(' + data + ')'),
				vdata = parseFunction(data.aid);
				jQ.cookie(hxwz_uid,vdata,{expires:4592000})
				
				jQ.each(data.aid,function(id,v){
					if(id==count_article_id){
						if((v & 1) > 0){
							jQ('#nolike').addClass('is-clicked');
						}
						if((v & 2) > 0){
							jQ('#like').addClass('is-clicked');
						}
						if((v & 4) >0){
							jQ('#favorite').addClass('is-clicked');
						}
					}
				})
			})
		}else{
			var hxwz_aid = eval('('+jQ.cookie(hxwz_uid) + ')');
			jQ.each(hxwz_aid,function(id,v){
				if(id==count_article_id){
					if((v & 1) > 0){
						jQ('#nolike').addClass('is-clicked');
					}
					if((v & 2) > 0){
						jQ('#like').addClass('is-clicked');
					}
					if((v & 4) >0){
						jQ('#favorite').addClass('is-clicked');
					}
				}
			})
		}
	}
	//喜欢，没劲
    jQ('#like,#nolike').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.position-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_click&opt=aid'
					,aid = t.attr('aid')
					,clickid='';
				if(jQ(this).attr('title')=='喜欢'){
					clickid = 2;
				}else if(jQ(this).attr('title')=='没劲'){
					clickid = 1;
				}
				var postData = {'clickid':clickid,'aid':aid};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == '0') {
						showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					} else {
						var t_num = t.text();
						if(t_num==''){
							t.html('1');
						}else{
							t.html(parseInt(t_num)+1);
						}
						agreeDisagree(t, '+1', '1');
						t.addClass('is-clicked')
						updataCookie(aid,clickid);
					}
				})
			}else{
				//alert('已经提交过了');
				//要改啊
				showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	//收藏
    jQ('#favorite').live('click',function () {
	    if (isLogin()) {
			if(!jQ(this).hasClass('is-clicked')){
				var t = jQ(this)
					,box = jQ(this).parents('.position-box')
					,random = parseInt(Math.random()*100000)
					,formUrl = postUrl+random+'&act=add_favorite&opt=aid'
					,aid = t.attr('aid')
					,message='';
				var postData = {'aid':aid,'message':message};
				jQ.post(formUrl,postData,function(data){
					var data = eval('(' + data + ')');
					if (data.is_success == "0") {
						//alert(data.msg);
						//要改啊
						showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
					}else {
						var t_num = t.text();
						if(t_num==''){
							t.html('1');
						}else{
							t.html(parseInt(t_num)+1);
						}
						agreeDisagree(t, '+1', '1');
						//showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
						t.addClass('is-clicked')
						updataCookie(aid,4);
					}
				})
			}else{
				//alert('已经提交过了');
				//要改啊
				showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
			}
	    	
	    }else {
			jQ('#lgnModal').modal('show');
	        //没登录就弹出登录框
	    	
	    }
    })
	
    
    /**
     *    删除评论和点评；添加删除有料、优问
     *    view-delete-btn 	 删除评论
     *    view-del-btn		 删除点评
     *    view-recommend-btn 添加删除有料
     *    toauthor-btn 添加删除优问
     **/
    jQ('.view-delete-btn,.view-del-btn').live('click',function () {
        if(confirm('确实要删除吗?')){
            var box = jQ(this).parents('.pinglun-box')
                ,action = ''
                ,random = parseInt(Math.random()*100000)
                ,formUrl = postUrl+random
                ,idtype = box.find('input[name="idtype"]').val()
                ,aid = box.find('input[name="aid"]').val()
                ,pid = box.find('input[name="pid"]').val()
                ,reppid = isUndefined(jQ(this).attr('reppid'))?'':jQ(this).attr('reppid')
                ;
            if(reppid==''){
                action = jQ(this).attr('action');
            }else{
                action = 'del_postcomment';
            }
            pinglunPost(formUrl,'',action,idtype,aid,pid,reppid,jQ(this))
        }
    })
    jQ('.view-recommend-btn,.toauthor-btn').live('click',function () {
        var box = jQ(this).parents('.pinglun-box')
            ,action = ''
            ,random = parseInt(Math.random()*100000)
            ,formUrl = postUrl+random
            ,idtype = box.find('input[name="idtype"]').val()
            ,aid = box.find('input[name="aid"]').val()
            ,pid = box.find('input[name="pid"]').val()
            ,reppid = isUndefined(jQ(this).attr('reppid'))?'':jQ(this).attr('reppid')
            ;
        if(reppid==''){
            action = jQ(this).attr('action');
        }else{
            action = 'del_postcomment';
        }
        pinglunPost(formUrl,'',action,idtype,aid,pid,reppid,jQ(this))
    })
    		
    /**
     *    高亮显示问答
     **/
	var askUrl = window.location.href;
	if(filterToUrl(askUrl)){
		var urlHash = window.location.hash;
		if(answerToUrl(askUrl)){
			jQ('.textarea-txt').data({'name':'','msg':''});
			jQ(urlHash).find('.dianping-list').show();
			if(jQ(urlHash).find('.dianping-mini-list').length>0){
				jQ(urlHash).find('.dianping-mini-list').hide();
			}
		}
		if(highLightAsk(askUrl)){
			jQ(urlHash).addClass('pinglun-box-remind').siblings().removeClass('pinglun-box-remind');
		}
	}
	
	/*是否问答栏目*/
    function filterToUrl(t){
    	var reg = /odby=toauthor/g;
    	if(reg.test(t)){
    		return true;
    	}else{
    		return false;
    	}
    }
	/*高亮问题*/
    function highLightAsk(t){
    	var reg = /#g_pid/g;
    	if(reg.test(t)){
    		return true;
    	}else{
    		return false;
    	}
    }
	/*高亮答案*/
    function answerToUrl(t){
    	var reg = /is_answer#g_pid/g;
    	if(reg.test(t)){
    		return true;
    	}else{
    		return false;
    	}
    }
    /**
     *    打开点评
     **/
	if(highLightAsk(askUrl)){
		var urlHash = window.location.hash;
		console.log(askUrl,urlHash)
		if(dianpingToUrl(askUrl)){
			jQ(urlHash).find('.dianping-list').show();
			if(jQ(urlHash).find('.dianping-mini-list').length>0){
				jQ(urlHash).find('.dianping-mini-list').hide();
			}
		}
	}
	/*匹配点评*/
    function dianpingToUrl(t){
    	var reg = /&is_postcomment/g;
    	if(reg.test(t)){
    		return true;
    	}else{
    		return false;
    	}
    }
     
    /**
     *    分享开关
     **/
	if('1'=='2'){
	require('hx_guanli_fenxiang')
	    jQ('.share-btn').live('click', function() {
	    	var box = jQ(this).siblings();
	        box.clearQueue();
	        box.toggle();
	       	jQ(this).mouseout(function(){
	        	box.delay(1000).fadeOut(400);
	       	})
	    })
			jQ('.pl-share ul').live('mouseover',function(){
			jQ(this).clearQueue();
		});
		jQ('.pl-share ul').live('mouseout',function(){
			jQ(this).delay(1000).fadeOut(400);
		});
	}
    
	/**
	*	by jiantian
	*	time 2013.01.26
	*	评论窗口激活
	**/
	jQ(document).on('focusin','#message',function(){
		jQ(this).parents('form').addClass('form-click').find('.subscribe-btn').addClass('textarea-click');
	})
	jQ(document).on('focusout','#message',function(){
		jQ(this).parents('form').removeClass('form-click');
	})
	
	
	/**
	*	by jiantian
	*	time 2013.01.28
	*	点评收缩展开
	**/
	jQ(document).on('click','.reply,.dianping-mini-box,.i-dianping-close',function(){
		var box = jQ(this).parents('.pinglun-box').find('.dianping-list')
            ,miniBox = jQ(this).parents('.pinglun-box').find('.dianping-mini-list')
            ,box_offset = box.parents('.pinglun-box').offset();
		/*如果是关闭的就打开它，否则就关闭它*/
		if(box.is(':hidden')){
			//缓存点评内容
			jQ('.textarea-txt').data({'name':'','msg':''});
			
			box.slideDown();
			miniBox.hide();
		}else{
            jQ('body,html').animate({
                scrollTop:box_offset.top  //让body的scrollTop等于pos的top，就实现了滚动
            },0);
			box.slideUp();
			miniBox.show();
		}
	})
	
	/**
	*	by jiantian
	*	time 2013.01.28
	*	点评收缩展开
	**/
	jQ('.view-delete-btn,.view-del-btn').live('mouseover',function(){
		jQ(this).parent().parent().addClass('red-bg')
	})
	jQ('.view-delete-btn,.view-del-btn').live('mouseout',function(){
		jQ(this).parent().parent().removeClass('red-bg')
	})
	
	/**
	*	by jiantian
	*	time 2013.05.08
	*	隐藏踩的过多的评论
	**/
	jQ('.disagree').each(function(i){
		var box = jQ(this).parents('.pinglun-box')
			,d_num = pIntAndDel(jQ(this).find('span').text())
			,agree_num = isUndefined(jQ(this).siblings('.agree').find('span').text())?'0':jQ(this).siblings('.agree').find('span').text()
			,agree_num = pIntAndDel(agree_num)
			,reply_num = isUndefined(jQ(this).siblings('.reply').find('span').text())?'0':jQ(this).siblings('.reply').find('span').text()
			,reply_num = pIntAndDel(reply_num)
			;
		if(d_num < 25 && d_num > 5 && agree_num <=0 && reply_num <=0){
			box.before('<div class="cool-pinglun">该评论相当无趣，已被隐藏，点击可查看</div>')
			box.hide();
		}
	});
	jQ('.cool-pinglun').live('click',function(){
		jQ(this).hide().next('.pinglun-box').show();
	})
	
	/**
	*	by jiantian
	*	time 2013.07.27
	*	图说
	**/
	if(jQ('.tushuo-neirong').length>0){
		require('jquery.ad-gallery');
		require('jquery.ad-gallery.css');
		jQ(function() {
		var galleries = jQ('.ad-gallery').adGallery();
		});
	}
	
	/**
	*	by jiantian
	*	time 2013.07.27
	*	用点嗅一下
	**/
	if(jQ('.comment-title').length>0){
		jQ('.comment-title').click(function(){
			if(isLogin()){
				jQ('#textarea').focus();
			}else{
				jQ('#lgnModal').modal('show');
			}
		})
		/**
		*	by jiantian
		*	time 2013.07.27
		*	用点嗅缩放
		**/
		jQ('.yongdian .comments .ctt').each(function(){
			var box = jQ(this).html()
			,boxSub = ''
			;
			if(box.length>='160'){
				boxSub = ydCommonFilter(box).substring(0,160)+'...<span class="open-details">[展开详细↓]</span>';
			}else{
				boxSub = ydCommonFilter(box).substring(0,160);
			}
			jQ(this).data({'content':box+' <span class="open-details">[收起内容↑]</span>','contentSpare':boxSub,'v':'0'}).html(boxSub);
		})
		jQ('.open-details').live('click',function(){
			var box = jQ(this).parents('.ctt');
			if(box.data('v')=='0'){
				box.html(box.data('content')).data('v','1');
			}else{
				box.html(box.data('contentSpare')).data('v','0');
			}
		})
	}
	function ydCommonFilter(t){
		var reg = /<br>/g;
		t = t.replace(reg, '');
		return t;
	}
	
	/**
	*	向作者提问
	*	by jiantian
	*	time 2013.07.20
	**/
	if(jQ('.askAuthor').length>0){
		var box = jQ('.askAuthor'),boxName = box.attr('name');
		box.attr({href:'javascript:void(0)'});
		
		box.live('click',function(){
			if(isLogin()){
				jQ('#textarea').focus().val(boxName);
			}else{
				jQ('#lgnModal').modal('show');
			}
		})
	}

    /**
     *	计划任务
     *	by jiantian
     *	time 2014.03.20
     **/
    jQ.post('/yarcrontab.html',{},function(){});

	
	
	
	/**
	*	by jiantian
	*	time 2013.01.30
	*	提交评论
	*	url 提交的URL
	*	message 内容
	*	action 操作类型
	*	idtype 帖子类型
	*	aid 文章id
	*	pid 评论id
	*	reppid 点评id
	*	btnid 点击对象
	**/
	function pinglunPost(url,message,action,idtype,aid,pid,reppid,btnid){
		var toauthor = '0';
			if(jQ('input[name="toauthor"]').val()>0||filterToAuthor(message)){
				toauthor = '1';
			}
		var url = url
			,msg = encodeURI(message)
			,action = action
			,idtype = idtype
			,aid = isUndefined(aid) ? '' : aid
			,pid = isUndefined(pid) ? '' : pid
			,reppid = isUndefined(reppid) ? '' : reppid
	,postData = {'message':msg,'act':action,'idtype':idtype,'aid':aid,'pid':pid,'reppid':reppid,'toauthor':toauthor}
			,boxid = '';
		jQ.post(url,postData,function(data){
	        var data = eval('(' + data + ')');
			if(data.is_success=='1'){
				data.username = isUndefined(data.username)?'虎嗅网友':data.username;
				if(action=='add_post'){
					htmlWiter('#pinglun_list',action,aid,data.pid,data.reppid,data.username,data.yijuhua,data.message);
				}else if(action=='add_postcomment'){
						htmlWiter(jQ('#g_pid'+pid).find('.dianping-form'),action,aid,data.pid,data.reppid,data.username,data.yijuhua,data.message);
				}else if(action=='del_post'){
					var box = jQ(btnid).parents('.pinglun-box');
                    htmlDelete(box);
				}else if(action=='del_postcomment'){
					var box = jQ(btnid).parents('.dianping-box');
                    htmlDelete(box);
				}else if(action=='add_recommend' || action == 'del_recommend'|| action=='add_article_eye'||action=='del_article_eye'||action=='add_toauthor'||action=='del_toauthor'){
					var boxid = '#g_pid'+pid;
					recommendSet(boxid,btnid,action)
				}
				
			}else{
				showDialog(data.msg,'notice','提示信息','','0','','','','','5','')
			}
			//成功后打开提交
			plStart='1';
		})
		
	}

	/**
	*    过滤多余“回复@”并增加@代码
	*    点评引用时用
	**/
	function htmlGroup(t) {
		var reg = /\/\//g;
		var reg2 = /回复@.*?：/g;
		t = t.replace(reg2, '');
		if(reg.test(t)){
			var t = t.split("//");
		    var re = ">"+name+"</g";
		    var m = t[0]+"//"+t[1];
		    return m;
	    }else{
	    	return t;
	    }
	}

	/**
	*    如果内容包含#向作者提问#返回1
	*    向作者提问
	**/
	function filterToAuthor(t) {
		var reg = /#向作者提问#/g;
		if(reg.test(t)){
		    return true;
	    }else{
	    	return false;
	    }
	}
	
	
	/**
	*    过滤内容里的括号，并返回整数型数据
	**/
	function pIntAndDel(d){
		var d = d==''?'0':d
			,d = d.replace('(','')
			,d =  parseInt(d.replace(')',''))
		return d;
	}
	
	
	
	/**
	*    添加评论和点评加动画效果
	**/
	function htmlWiter(boxid,action,aid,pid,reppid,username,signature,msg){
		var pinglunBox = '<div class="clearfix pinglun-box pinglun-box-set" id="g_pid'+pid+'"><div class="user-img"><a href="/member/'+uid+'.html" title="'+username+'" class="tx-img" target="_blank" c="1"><img src="http://images.huxiu.com/avatar.php?uid=' + uid + '&size=small"></a></div><div class="pinglun-box-text"><a class="name" href="/member/'+uid+'.html" target="_blank" title="'+username+'">'+username+'</a><span class="signature" title="'+signature+'">'+signature+'</span><div class="view-info">'+msg+'</div></div><div class="clearfix view-func"><time class="pull-left s-time">刚刚</time><span class="pl-share"><i class="icon-i"></i>分享<div class="share-box side-share-box2"><ul><li class="pos-btn hxs-tsina" des="hxs_tsina" pid="'+pid+'" title="分享到新浪微博"></li><li class="pos-btn hxs-tqq" des="hxs_tqq" pid="'+pid+'" title="分享到腾讯微博"></li><li class="pos-btn hxs-qzone" des="hxs_qzone" pid="'+pid+'" title="分享到QQ空间"></li><li class="pos-btn hxs-renren" des="hxs_renren" pid="'+pid+'" title="分享到人人网"></li><li class="pos-btn hxs-douban" des="hxs_douban" pid="'+pid+'" title="分享到豆瓣"></li><li class="pos-btn hxs-t163" des="hxs_t163" pid="'+pid+'" title="分享到网易微博"></li><li class="pos-btn hxs-linkedin" des="hxs_linkedin" pid="'+pid+'" title="分享到linkedin"></li><li class="pos-btn hxs-tomail" des="hxs_tomail" title="分享到邮件分享"></li></ul></div></span><span class="agree"><i class="icon-i"></i>顶</span><span class="disagree"><i class="icon-i"></i>踩</span><span class="reply"><i class="icon-i"></i>点评</span></div><div class="clearfix dianping-list"><div class="clearfix dianping-form"><form onsubmit="return false;" action="POST" method="/forum.php?mod=hxpost&action=reply&type=2&aid='+aid+'"><div class="dianping-textarea"><textarea class="textarea-txt" action-type="check" cols="" rows="" name=""></textarea></div><input type="reset" style="display:none"><input type="hidden" name="aid" value="'+aid+'"><input type="hidden" name="pid" value="'+pid+'"><input type="hidden" name="reppid" value=""><input type="hidden" name="act" value="add_postcomment"><input type="hidden" name="idtype" value="aid"><div class="pull-right dianping-btn"><button type="submit" name="comment_btn" value="true" class="button-txt subscribe-btn"><strong>回复</strong></button></div></form></div><i class="icon-i i-dianping-jiao"></i><i class="icon-i i-dianping-close"></i></div><span class="view-set-s"><span class="view-set-s-wrap"><a href="javascript:void(0)" class="view-delete-btn" action="del_post" title="确定删除?">删除</a></span></span></div>';
		var dianipingBox = '<div class="clearfix dianping-box dianping-box-set"><div class="user-img"><a href="/member/'+uid+'.html" title="'+username+'" c="1" class="tx-img" target="_blank"><img src="http://images.huxiu.com/avatar.php?uid='+uid+'&size=small" ></a></div><div class="dianping-box-text"><span class="dd-s"><a class="name" href="/member/'+uid+'.html" target="_blank" title="'+username+'">'+username+'</a>：'+msg+'</span><div class="clearfix dianping-func"><time class="pull-left s-time"><span title="刚刚">刚刚</span></time><span class="pull-right"><a href="javascript:void(0);" class="view-del-btn" reppid="'+reppid+'" title="确定删除?">删除</a><span class="pinglun-reply-btn">回复</span></span></div></div></div>';
		
		var box = '<div class="post-box" style="width:100%;height:123px;background-color:#fefefe;border:2px solid #ccc;padding:5px;position:absolute;right:-13px;bottom:9px;">'+msg+'</div>';
		if(action=='add_post'){
			jQ('.textarea-box').prepend(box).find('#textarea').val('');
			jQ('.post-box').animate({opacity:'0',width:'0',height:'0'}, 400,function(){
				jQ(this).remove();
				jQ(boxid).prepend(pinglunBox)
					.find(".pinglun-box:first").css({opacity:".2"}).animate({opacity:"1"}, 800);
			});
		}else if(action=='add_postcomment'){
			jQ(boxid).find('textarea').val('');
			var boxidHeight = jQ(boxid).find('textarea').height();
			jQ(boxid).find('.dianping-textarea').prepend(box);
			jQ('.post-box').height(boxidHeight).animate({opacity:'0',width:'0',height:'0'}, 400,function(){
				jQ(this).remove();
				jQ(boxid).after(dianipingBox)
					.find('.dianping-box:first').css({opacity:'.4'}).animate({opacity:'1'}, 500);
			})
		}
		
	}
	
	/**
	*    删除评论和点评加动画效果
	**/
	function htmlDelete(box){
		jQ(box).animate({opacity:'0',left:'150'},300,function(){
			jQ(this).remove();
		})
	}
	
	/**
	*	设置推荐和取消推荐,点睛和取消点睛
	**/
	function recommendSet(boxid,btnid,action){
		if(action=='add_recommend'){
			jQ(btnid).attr({'action':'del_recommend','title':'取消有料'}).text('取消有料');
			jQ(boxid).addClass('pinglun-box-youliao').append('<div class="pinglun-box-youliao-mark"><span>有料</span></div>');
		}else if(action=='del_recommend'){
			jQ(btnid).attr({'action':'add_recommend','title':'有料'}).text('有料');
			jQ(boxid).removeClass('pinglun-box-youliao').find('.pinglun-box-youliao-mark').remove();
		}else if(action=='add_article_eye'){
			jQ(btnid).attr({'action':'del_article_eye','title':'取消点睛'}).text('取消点睛');
			jQ(boxid).addClass('pinglun-box-youliao').append('<div class="pinglun-box-youliao-mark dianjing-mak"><span>点睛</span></div>');
		}else if(action=='del_article_eye'){
			jQ(btnid).attr({'action':'add_article_eye','title':'画龙点睛'}).text('点睛');
			jQ(boxid).removeClass('pinglun-box-youliao').find('.pinglun-box-youliao-mark').remove();
		}else if(action=='add_toauthor'){
			jQ(btnid).attr({'action':'del_toauthor','title':'取消优问'}).text('取消优问');
		}else if(action=='del_toauthor'){
			jQ(btnid).attr({'action':'add_toauthor','title':'优问'}).text('优问');
		}
	}
	

	/**
	* 顶踩效果
	**/
	function agreeDisagree(t, msg, type) {
	    var pos = jQ(t).offset();
	    var ani = jQ('<div class="voteAni" style="color:green;">' + msg + '</div>');
	    ani.appendTo('body');
	    if (type == "1") {
	        ani.offset({left:pos.left + 5, top:pos.top - 10})
	            .show()
	            .animate({
	                'font-size':'40px', 'opacity':'0.1', 'top':'-=50px'
	            }, 400, 'linear', function () {
	                ani.remove();
	            }
	        );
	    } else {
	        ani.offset({left:pos.left - 20, top:pos.top - 20})
	            .show()
	            .animate({
	                'opacity':'0.8', 'top':'-=20px'
	            }, 400, 'linear', function () {
	                ani.remove();
	            }
	        );
	    }
	}
	
	
	/**
	 *    @js调用
	 **/
	function atFind(data) {
	    jQ("textarea").atWho("@", {
	        tpl:"<li data-value='jQ{key}'>${name} </li>", cache:false, limit:5, 'data':data
	    });
	}
	
	/**
	*	扩展阅读
	**/
	if(jQ('#extra_read').length>0){
		require('extra_read_j');
	}


    /*
     *   稍后阅读
     *   by 见天
     *   2014.01.22
     **/
    jQ(document).delegate('.read-later-btn','click',function(){

        if (isLogin()) {
            var t = jQ(this)
                ,aid = count_article_id
                ;
            t.button('loading');
            postReadLater(t,aid);
        }else {
            jQ('#lgnModal').modal('show');
        }

    })
    function postReadLater(t,aid){
        var random = parseInt(Math.random()*100000)
            ,postUrl = '/setuser/laterRead?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
            ,postData = {
                'aid': aid
            }
        jQ.post(postUrl,postData,function(data){
            var data = eval('('+data+')');
            if(data.is_success=='1'){
                jQ('.read-later-btn').button('reset').removeClass('read-later-btn').addClass('read-later-list').attr('href','/member/laterread.html').html('<i class="icon-book icon-white"></i>待读列表');

            }else{
                jQ('.read-later-btn').button('reset');
                alert(data.msg);
            }
        })
    }


    /**
    * 此处下方均为弹出的对话框showDialog 所用到的函数,是从common.js复制过来的  =========开始
        * by zhaojinye
        * 2014/12/10
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
     * 2014/12/10
     */



})
