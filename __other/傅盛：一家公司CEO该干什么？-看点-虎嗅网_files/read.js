define(function(require, exports){


	/**
	*	读点
	*	想读，在读，读过三个按钮绑定点击
	*	缺少点击空白隐藏选项框
	**/
	jQ(document).on('click','.read-btn',function(){
		if(isLogin()){
			var box_wrap = jQ('.float-book-box');
				var opt = jQ(this).attr('opt')
					,box_w = box_wrap.height()
					,offs = jQ(this).offset();
			box_wrap.css({top:parseInt(offs.top)-box_w-50,left:parseInt(offs.left)-10})
			box_wrap.find('#'+opt).attr('checked','true').siblings().removeAttr('checked');
			if(box_wrap.is(':hidden')){
				box_wrap.show();
			}
		}else{
			jQ('#lgnModal').modal('show');
		}
	
	})
	
    jQ('.float-book-box form').submit(function(){return false;});
    
	jQ(document).on('click','.float-book-box .btn',function(){
		var box_wrap = jQ(this).parents('.float-book-box')
			,aid = box_wrap.attr('aid')
			,random = parseInt(Math.random()*100000)
			,url = box_wrap.find('form').attr('action')+'?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
			,opt = box_wrap.find('input:checked').val()
			,masssage = box_wrap.find('textarea').val()
			,postData =  {'aid':aid,'message':masssage,'act':'add_book','opt':opt}
			;
		jQ.post(url,postData,function(data){
	        var data = eval('(' + data + ')');
			if(data.is_success=='1'){
				alert(data.msg)
				//统一消息弹出框
				jQ('.float-book-box').hide();
				window.location.reload();
			}else{
				showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
			}
		})
		
	})
	

	
	/**
	*	读点
	*	精简读点弹出窗口变完整窗口，点击，移动
	**/
	jQ(document).on('click','.show-box-short',function(){
		jQ(this).removeClass('show-box-short');
	})
	
	jQ(document).on('mouseover','.show-box-short',function(){
		jQ(this).stop(true,true).show();
	})
	
	jQ(document).on('mouseout','.show-box-short',function(){
		var t = jQ(this).parents('.book-wrap-card').find('.btn-readbook');
		hideBoxanimate(t,'.book-wrap-card','.show-box','show-box-short','','');
	})
	
	/**
	*	读点
	*	读点弹出窗口,想读，在读，读过按钮切换。
	**/
	jQ(document).on('click','.optional span',function(){
		jQ(this).addClass('active').siblings().removeClass('active');
	})
	
	/**
	*	读点
	*	读点弹出窗口 修改内容后提交
	**/
	jQ(document).on('click','.show-box-btn',function(){
		var random = parseInt(Math.random()*100000)
			,url = jQ(this).attr('url')+'?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
			,t = jQ(this).parents('.book-wrap-card').find('.btn-readbook')
			,val = "msg="+jQ(this).parents('.show-box').find('textarea').val()
			,val = val + "&type="+jQ(this).parents('.show-box').find('span[class="active"]').html();
		dataPost(url,val,t,'.book-wrap-card','.show-box')
	})
	/**
	*	读点
	*	显示框控制字数
	**/
	
	jQ(document).on('keyup','.float-book-box textarea',function(){
		var max=350;
		var length = jQ(this).val().length;
		jQ(this).parents('.float-book-box').find('#s_sum').html(max-length);
		if(length>max){
			return false;
		}
	})




	/**
	*	by jiantian
	*	time 2013.01.17
	*	窗体弹出框显示与隐藏
	**/
	function toggleBox(url,t,wrap,box,newClass){
		var url = isUndefined(url) ? '' : url
			,wrap = isUndefined(wrap) ? '.book-wrap-card' : wrap
			,box = isUndefined(box) ? '.show-box' : box
			,newClass = isUndefined(box) ? '' : newClass
			,jQwrap = jQ(t).parents(wrap)
			,jQbox = jQwrap.find(box);
		if(jQbox.length>=1){
			if(jQbox.is(":hidden")){
				jQbox.show();
				jQ(t).addClass('active');
			}else{
				jQbox.hide();
				jQ(t).removeClass('active');
			}
		}else{
			var btn = '我'+jQ(t).html()+'这本书,修改';
			jQ(t).html(btn).addClass('active');
			boxDelete(jQ(t).siblings('.btn-readbook'));
			boxInsert(jQwrap,jQ(t).attr('value'),url);
			hideBoxanimate(t,wrap,box,'show-box-short','','');
			jQ(t).siblings().find('.sup-num').html(parseInt(jQ(t).siblings().find('.sup-num').html())+1);
		}
	}
	
	
	/**
	*	by jiantian
	*	time 2013.01.17
	*	post数据,完成80%
	**/
	function dataPost(url,t,act,val,wrap,box,newClass){
		var id = '0101';
		jQ.ajax({
			url:url,
			type:'post',
			data:val,
			dataType:"html",
			timeout:8000,
			beforeSend:function(){
				//console.log('链接中')
				//massageShow(t,'链接中','','','','1','box_'+id)
			},
			success:function(data){
				data = eval("("+data+")");
				if(data.is_success=="1"){
					if(!isUndefined(t)){
						if(!isUndefined(data.type)){
							jQ(t).html('我'+data.type+'这本书，修改')
						}
						toggleBox(url,t,wrap,box,newClass);
					}
				}else{
					//错误的时候
					alert("出错了");
					return false;
				}
			},
			complete:function(XMLHttpRequest, textStatus){
				if(XMLHttpRequest.readyState=='4'){
					//maXMLHttpRequest.ssageShow(t,'链接中','','','','1')
				}
                console.log(XMLHttpRequest.status);
                console.log(textStatus);
			}
		})
	}
	
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.01.17
	*	判断内容是否相同
	**/
	function alike(n,o){
		return n==o?true:false;
	}
	
	/**
	*	by jiantian
	*	time 2013.01.17
	*	移动窗体并删除
	**/
	function boxDelete(t){
		jQ(t).css({'position':'relative'})
			.animate({'right':'-20px','opacity':'0'},200,function(){jQ(this).remove()});
	}
	
	/**
	*	by jiantian
	*	time 2013.01.16
	*	指定位置插入模块
	**/
	function boxInsert(t,v,url){
		var v = isUndefined(v) ? 'read' : v,
			box = '<div class="show-box tr-bg show-box-short"><h2>说点什么吧</h2><div class="optional"><span class="'+(v=="wantread"?"active":"")+'" value="wantread">想读</span><span class="'+(v=="atread"?"active":"")+'" value="atread">在读</span><span class="'+(v=="read"?"active":"")+'" value="read">读过</span></div><div class="ctt"><textarea name="atc_content" maxlength="350" class="textarea-txt"></textarea><p ><em>350</em><a class="show-box-btn" type="submit" url="'+url+'">确认</a></p><i class="icon-i i-show-box"></i><span class="close">x</span></div></div>';
		jQ(t).append(box);
	}
	
	
	/**
	*	by jiantian
	*	time 2013.01.15
	*	隐藏窗口动画
	**/
	function hideBoxanimate(t,wrap,boxclass,c,offset1,offset2){
		var wrap = isUndefined(wrap) ? jQ(t).parents('.book-wrap-card') : jQ(t).parents(wrap)
			,offset1 = isUndefined(offset1) ? '130' : offset1
			,offset2 = isUndefined(offset2) ? '104' : offset2
			,boxclass = isUndefined(boxclass) ? wrap.find('.show-box') : wrap.find(boxclass)
			,c = isUndefined(c) ? 'show-box-short' : c
			,offset1 = wrap.outerHeight()-jQ(t).position().top+25
			,offset2 = offset1-10;
		
		boxclass.delay(1000).animate({
			'bottom':offset1+'px','opacity':'0'
		},100,function(){
			boxclass.hide().css({'bottom':offset2+'px','opacity':'1'}).removeClass(c);
			jQ(t).removeClass('active');
		})
	}
	
	
	
	
	
	/**
	*	by jiantian
	*	time 2013.01.15
	*	右侧滑动进入动画
	**/
	function toggleSlide(t,b,o){
		if(jQ(b).css('opacity')>'0'){
			jQ(t).removeClass("active");
			jQ(b).stop(true,true).animate({'right':'-320px','opacity':'0'},200,function(){jQ(this).hide()});
			jQ(o).css({'opacity':'1'});
		}else{
			jQ(t).addClass("active");
			jQ(o).css({'opacity':'0.3'});
			jQ(b).show().stop(true,true).animate({'right':'20px','opacity':'1'},200)
			.animate({'right':'-10px','opacity':'1'},160)
			.animate({'right':'0px','opacity':'1'},150);
		}
	}
	
	
	/**
	*	by jiantian
	*	time 2013.01.15
	*	把目标“标签”放到data里
	**/
	function tagsSave(id,tags){
		if(jQ(id).length == '0'){
			jQ(id).data(tags,jQ(id).attr(tags)).attr(tags,'javascript:void(0);');
		}else{
			jQ(id).each(function(){
				jQ(this).data(tags,jQ(this).attr(tags)).attr(tags,'javascript:void(0);');
			})
		}
	}
	
	
	
	/**
	*	by jiantian
	*	time 2013.01.15
	*	提示信息
	**/
	function massageShow(t,msg,w,timeout,align,start,boxClass){
		var msg = isUndefined(msg) ? '错误' : msg
		,w = isUndefined(w) ? jQ(t).outerWidth() : w
		,h = jQ(t).outerHeight(true)
		,pos = boxPosition(t)
		,top = pos['top']
		,left = pos['left']
		,timeout = isUndefined(timeout) ? '800' : timeout
		,align = isUndefined(align) ? 'center' : align
		,start = isUndefined(start) ? '0' : start
		,boxClass = isUndefined(boxClass) ? '' : boxClass;
		if(jQ("#show_msg").length==0){
			var box = '<div id="show_msg" class='+boxClass+'>' + msg + '</div>';
		}
		jQ("body").append(box);
		var newH = jQ("#show_msg").outerHeight(true);
		jQ("#show_msg").css({
			width:w,
			height:h,
			top:top,
			left:left,
			'text-align':align,
			opacity:"0"
		}).animate({opacity:"1",top:top-newH},150)

		if(start=="0"){
			jQ("#show_msg").delay(400).animate({
					opacity:"0"
				}, 700);
		}
	}
	
	/**
	*	by jiantian
	*	time 2013.01.15
	*	定位位置
	**/
	function boxPosition(t){
		var pos = {
			'top':jQ(t).offset().top
			,'left':jQ(t).offset().left
		};
		return pos;
	}

})
