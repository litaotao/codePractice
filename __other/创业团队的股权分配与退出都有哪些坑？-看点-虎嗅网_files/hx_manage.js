define(function(require, exports){

    /**
     * 新版文章审核  js-guanli-wrap js-btn-examine
     * 2014/10/29
     * by zhaojinye
     */
    if(jQ('.js-guanli-wrap').length > 0){
        jQ('.js-guanli-wrap').on('click', '.js-btn-examine', function(){
            var btn = jQ(this);
            if(!btn.hasClass('disabled')){
                btn.addClass('disabled');
                var url = '/admin/article_reasons',
                 post_data = {'huxiu_hash_code':huxiu_hash_code},
                 aid = count_article_id;
                 jQ.post(url, post_data, function(data){
                     data = eval('('+data+')');
                     var html = '';
                     for(var i=0;i<data.data.length;i++){
                         html+= '<label class="new-lb"><input id="'+ data.data[i].id +'" name="reason" value="'+ data.data[i].message +'" type="checkbox" />'+ data.data[i].message +'</label>';
                     }

                     if(data.result == 1){
//                        var html = '<label class="new-lb"><input id="4" name="reason" value="相关讨论已经很多，本文的角度和观点都没有超出原有范围。" type="checkbox">相关讨论已经很多，本文的角度和观点都没有超出原有范围。</label><label class="new-lb"><input id="2" name="reason" value="公关倾向过于明显" type="checkbox">公关倾向过于明显</label><label class="new-lb"><input id="5" name="reason" value="文章内容比较浅显" type="checkbox">文章内容比较浅显</label><label class="new-lb"><input id="1" name="reason" value="与本站内容定位差别较大" type="checkbox">与本站内容定位差别较大</label><label class="new-lb"><input id="3" name="reason" value="有论点，但有价值的内容过于单薄，核心观点不突出，说服力不强。" type="checkbox">有论点，但有价值的内容过于单薄，核心观点不突出，说服力不强。</label><label class="new-lb"><input id="6" name="reason" value="重复投稿" type="checkbox">重复投稿</label>'
                        var strHtml =
                                '<div class="clearfix">' +
                                    '<div class="pull-left">忽略理由如下:</div>' +
                                    '<div class="modal-manage pull-right"><a class="js-modal-manage" href="javascript:void(0);">管理</a></div>' +
                                    '</div>' +
                                    '<div class="reason-box js-reason-box">' + html + '<label class="new-lb"><textarea class="js-custom-reason" placeholder="您可在此输入自定义忽略理由"></textarea></label>' +
                                    '</div>' +
                                    '<div class="reason-edit-box js-reason-edit-box"></div>'
                            , title = '忽略'
                            , strBtn = '<button class="btn btn-success article-check-ignore-conform" aid='+ aid +' data-dismiss="modal" aria-hidden="true">确定</button>'
                            ;
                        dialogBox('ignoreModal',title, strHtml, strBtn);

                     }else{
                         dialogBox('ignoreModal','忽略', data.message, '');
                     }
                     btn.removeClass('disabled');
                 });
            }


        });

        //点击忽略对话框中的忽略按钮
        jQ(document).on('click', '.article-check-ignore-conform', function(){
            var btn = jQ(this)
                , oParent = btn.parents('.modal')
                , oReasonBox = oParent.find('.js-reason-box')
                , iReason = oReasonBox.find('.js-custom-reason').val()
                , aid = jQ(this).attr('aid')
                , url = '/admin/article_ignore_action'
                , param = {'huxiu_hash_code':huxiu_hash_code,'aid':aid}
                , reason = new Array
                , i = 0
                ;
            jQ.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
                var value = jQ(ele).val()
                    , id = jQ(ele).attr('id')
                    , isChecked = (jQ(ele).attr('checked')=='checked') ? true:false
                    ;
                if(isChecked){
                    reason[i] = {'id':id, 'message':value};
                    i++;
                }
            });
            if(iReason != ''){
                reason[reason.length] = {'id':0, 'message':iReason};
            }

            if(!reason[0] && (iReason=='')){
                alert('请至少选择一种忽略理由'); return;
            }

            param.reasons = reason;
            console.log(param);
            jQ.post(url, param, function(data){
                var data = eval('('+data+')');
                if(data.result == 1){
                    location.reload();
                }else{
                    alert(data.msg);
                }
            })
        })

//点击管理按钮
        jQ(document).on('click', '.js-modal-manage', function(){
            var btn = jQ(this)
                , oParent = btn.parents('.modal')
                , oReasonBox = oParent.find('.js-reason-box')
                , oReasonEditBox = oParent.find('.js-reason-edit-box')
                ;
            jQ.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
                var strHtml = '<label class="new-lb"><span class="remove-article-reason">-</span><input id="'+ jQ(ele).attr('id') +'" name="reason" type="text" value="'+jQ(ele).val()+'" /></label>';
                oReasonEditBox.append(strHtml);
            });
            oReasonBox.css('display', 'none');
            btn.attr('class', 'js-btn-reason-add').html('添加');
            oParent.find('.article-check-ignore-conform').attr('class', 'btn btn-success js-btn-article-manage-ignore');
            console.log('忽略成功！');
        });

//点击删除按钮
        jQ(document).on('click', '.js-reason-edit-box .new-lb span', function(){
            var btn = jQ(this)
                , iReasonBox = btn.parent().find('input[type="text"]')
                , url = '/admin/article_reason_delete_action'
                , param = {'huxiu_hash_code':huxiu_hash_code, 'reason_id':iReasonBox.attr('id')}
                ;

            console.log(iReasonBox.attr('id'))
            if(iReasonBox.attr('id')==undefined){
                iReasonBox.parent().remove();
                return;
            }
//    if(confirm('确定要删除该理由吗？')){
            jQ.post(url, param, function(data){
                data = eval('('+data+')');
                if(data.result == 1){
                    btn.parent().remove();
                }else{
                    alert(data.msg);
                }
            });
//    }



        });

//点击添加按钮
        jQ(document).on('click', '.js-btn-reason-add', function(){
            var btn = jQ(this)
                , oParent = btn.parents('.modal')
                , oReasonEditBox = oParent.find('.js-reason-edit-box')
                ;
            oReasonEditBox.prepend('<label class="new-lb"><span class="remove-article-reason">-</span><input name="reason" type="text" value="" /></label>');
            oReasonEditBox.find('.new-lb:first-child input').focus();
        });

//点击管理忽略理由中确定按钮
        jQ(document).on('click', '.js-btn-article-manage-ignore', function(){
            var btn = jQ(this)
                , oParent = btn.parents('.modal')
                , oReasonEditBox = oParent.find('.js-reason-edit-box')
                , urlModify = '/admin/article_reason_edit_action'
                , urlAdd = '/admin/article_reason_add_action'
                , paramAdd = {'huxiu_hash_code':huxiu_hash_code}
                , paramModify = {'huxiu_hash_code':huxiu_hash_code}
                , arrModify = []
                , arrAdd = []
                ;
            jQ.each(oReasonEditBox.find('.new-lb input[type="text"]'), function(index, ele){
                if(jQ(ele).attr('id') == undefined){
                    arrAdd.push(jQ(ele).val());
                }else{
                    var obj = {};
                    obj.id = jQ(ele).attr('id');
                    obj.message = jQ(ele).val();
                    arrModify.push(obj);
                }
                paramAdd['reason'] = arrAdd;
                paramModify['reason'] = arrModify;

            });
            if(arrAdd.length > 0){
                jQ.post(urlAdd, paramAdd, function(data){
                    var data = eval('('+data+')');
                    if(data.result == 1){

                    }else{
                        alert(data.msg)
                    }
                })
            }

            if(arrModify.length > 0){
                jQ.post(urlModify, paramModify, function(data){
                    var data = eval('('+data+')');
                    if(data.result == 1){

                    }else{
                        alert(data.msg)
                    }
                })
            }


        });

        function dialogBox(id, title, strBody, btnOk){

            var html = '<div id="'+id+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>' +
                '<h4 id="myModalLabel">'+title+'</h4>' +
                '</div>' +
                '<div class="modal-body">'+strBody+'</div>' +
                '<div class="modal-footer">' + btnOk + '<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>' + '</div>' +
                '</div>';
            if(jQ('#' + id).length > 0){
                jQ('#' + id).remove();
            }
            jQ('body').append(html);
            jQ('#'+id+'').modal();
        }

    }



    /**
     * 新版文章推送  js-guanli-wrap  js-btn-push
     * 2014/10/28
     * by zhaojinye
     */
     if(jQ('.js-guanli-wrap').length > 0){
         //推送内容存储
         var baseData = {pushManage:{}};
         jQ('.js-guanli-wrap').on('click', '.js-btn-push', function(){

             var btn = jQ(this)
                 , urlType = '/user/chinese_article_push_type'
                 , paramType = {'huxiu_hash_code':huxiu_hash_code, 'is_ajax':1}
                 , aid = count_article_id
                 , urlArticle = '/user/get_push_article_view'
                 , paramArticle = {'aid':aid,'huxiu_hash_code':huxiu_hash_code, 'is_ajax':1}
                 ;
             if(!btn.hasClass('disabled')){
                 btn.addClass('disabled');
                 baseData.pushManage.aid = aid;
                 jQ.post(urlType, paramType, function(data){
                     baseData.pushManage.list = eval('('+data+')');
                     jQ.post(urlArticle, paramArticle, function(data){
                         data = eval('('+data+')');
                         baseData.pushManage.activeList = data;
                         baseData.pushManage.articleTitle = data.data.title;
                         baseData.pushManage.articleSubTitle = data.data.subtitle;
                         baseData.pushManage.articleSummary = data.data.summary;
                         baseData.pushManage.articleCover = data.data.pic;
                         pushManage();
                        btn.removeClass('disabled');
                     });
                 });
             }



         });


         jQ(document).on('click', '#modal_push .js-modal-push-all-box label', function(){
             baseData.pushManage.bid = jQ(this).attr('bid');
             var btn = jQ(this)
                 , oPushBox1 = btn.parents('.js-modal-body-push1')
                 , oPushBox2 = btn.parents('#modal_push').find('.js-modal-body-push2')
                 , articleStartTime = ''
                 , imgBox = baseData.pushManage.articleCover
                 , articleTitle = baseData.pushManage.articleTitle
                 , articleSubTitle = baseData.pushManage.articleSubTitle
                 , articleSummary = baseData.pushManage.articleSummary
                 , strHtml = '<div class="clearfix form-horizontal modal-push-box2">' +
                            '<div class="body-left">'+
                                 '<div class="control-group">' +
                                     '<div class="controls">' +
                                         '<div class="input-append date">' +
                                             '<input type="text" id="modalTime" placeholder="定时推送" class="manage-article-time-input" value="'+ articleStartTime +'"/>' +
                                             '<span class="add-on"><i class="icon-th"></i></span>' +
                                         '</div>' +
                                     '</div>' +
                                 '</div>' +
                                 '<div class="control-group">' +
                                     '<div class="controls">' +
                                         '<div class="img-box">' +
                                             '<label for="pushArticleCover" class="modal-img-box"><input type="file" name="pushArticleCover" class="hide" id="pushArticleCover"></label>' +
//                                             '<span class="img-box-span">' +imgBox+'</span>'+
                                             '<span class="img-box-span"><img src="'+imgBox+'" /></span>' +
                                             '<div class="item-prgs"></div>'+
                                         '</div>' +
                                     '</div>' +
                                 '</div>' +
                            '</div>'+
                            '<div class="body-right">'+
                                 '<div class="control-group">' +
                                    '<div class="controls"><input type="text" id="articleTitle" placeholder="文章标题" value="'+articleTitle+'"></div>' +
                                 '</div>' +
                                 '<div class="control-group">' +
                                    '<div class="controls"><input type="text" id="articleSubTitle" placeholder="文章副标题" value="'+articleSubTitle+'"></div>' +
                                 '</div>' +
                                 '<div class="control-group">' +
                                     '<div class="controls"><textarea class="" rows="4" type="text" id="articleSummary" placeholder="文章摘要">'+articleSummary+'</textarea></div>' +
                                 '</div>' +
                            '</div>' +
                            '</div>'
                            ;
             oPushBox1.css('display', 'none');
             oPushBox2.html(strHtml);
             btn.parents('#modal_push').find('.js-modal-footer1').css('display', 'none');
             btn.parents('#modal_push').find('.js-modal-footer2').css('display', 'block');

             jQ('.input-append.date').datetimepicker({
                 language: "zh-CN",
                 format: "yyyy-mm-dd hh:ii",
                 autoclose: true,
                 todayBtn: true,
                 pickerPosition: "bottom-left"
             });
             jQ('#pushArticleCover').uploadify({
                 'buttonClass' : 'img-btn-class',
                 'buttonText' : '',
                 'swf'      : '/static/js/uploadify/uploadify.swf',
                 'uploader' : '/admin/img_cover_upload',
                 'auto': true,
                 'multi': false,
                 'fileTypeExts' : '*.jpg;*.jpeg;*.gif;*.png',
                 'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
                     var strPercent = (bytesUploaded/bytesTotal)*100;
                     strPercent = strPercent.toString().substr(0, 4);
                     jQ('#pushArticleCover').parents('.img-box').find('.item-prgs').css('display','block').html('已上传'+strPercent+'%');
                 },
                 'onUploadSuccess' : function(file,data,response) {
                     var data = eval('('+data+')');
                     console.dir(data);
                     if(data.result==1){
                         imgBox = '<img src="'+data.url+'" />';
                         jQ('.modal-push-box2 .img-box .img-box-span').html(imgBox);
                         jQ('#pushArticleCover').parents('.img-box').find('.item-prgs').css('display','none');
                     }
                 },
                 'onUploadError' : function(file, errorCode, errorMsg, errorString) {
                     jQ('#pushArticleCover').parents('.img-box').find('.item-prgs').html('上传失败！');
                 }
             });

         });

         jQ(document).on('click', '#modal_push .js-modal-push-active-box label', function(){
             if(confirm('确认要取消推送么？')){
                 var t = jQ(this)
                     ,aid = t.attr('aid')
                     ,bidData = t.attr('bid');
                 ;
                     var url = '/user/del_push_article'
                         , param = {'huxiu_hash_code':huxiu_hash_code,'is_ajax':1, 'aid':aid, 'bid':bidData}
                         ;
                     jQ.post(url, param, function(data){
                         data = eval('('+data+')');
                         if(data.is_success == 1){
                             var strHtml = '<div class="message-box-out"><div class="message-box-in">'+data.msg+'</div></div>';
                             jQ('body').append(strHtml);
                             setTimeout(function(){
                                 jQ('body .message-box-out').css('display', 'none').remove();
                             }, 2000);
                             t.remove();
                         }else{
                             var strHtml = '<div class="message-box-out"><div class="message-box-in">'+data.msg+'</div></div>';
                             jQ('body').append(strHtml);
                             setTimeout(function(){
                                 jQ('body .message-box-out').css('display', 'none').remove();
                             }, 2000);
                         }
                     })
                 }
         });

         jQ(document).on('click', '#modal_push .btn-success', function(){
             var btn = jQ(this)
                 , oDate = new Date()
                 , time = oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + +oDate.getDate() + ' ' + oDate.getHours() + ':' + oDate.getSeconds()
                 , articleStartdate = (btn.parents('.modal').find('#modalTime').val()=='')?time:btn.parents('.modal').find('#modalTime').val()
                 , articleTitle = btn.parents('.modal').find('#articleTitle').val()
                 , articleSubTitle = btn.parents('.modal').find('#articleSubTitle').val()
                 , articleSummary = btn.parents('.modal').find('#articleSummary').val()
                 , articleImgSrc = btn.parents('.modal').find('.img-box img').attr('src')
                 , bid = baseData.pushManage.bid
                 , aid = baseData.pushManage.aid
                 , url = '/user/chinese_article_push_add'
                 , param = {'huxiu_hash_code':huxiu_hash_code,'is_ajax':1,'startdate':articleStartdate, 'summary':articleSummary, 'title':articleTitle, 'subtitle':articleSubTitle, 'pic':articleImgSrc, 'bid':bid, 'aid':aid}
             ;
             jQ.post(url, param, function(data){
                 data = eval('('+data+')');
                 if(data.is_success == 1){
                     var strHtml = '<div class="message-box-out"><div class="message-box-in">'+data.msg+'</div></div>';
                     jQ('body').append(strHtml);
                     setTimeout(function(){
                         jQ('body .message-box-out').css('display', 'none').remove();
                     }, 2000);
                     btn.remove();
                 }else{
                     var strHtml = '<div class="message-box-out"><div class="message-box-in">'+data.msg+'</div></div>';
                     jQ('body').append(strHtml);
                     setTimeout(function(){
                         jQ('body .message-box-out').css('display', 'none').remove();
                     }, 2000);
                 }

             });
         });

         //获取数据
         function pushManage(){
             var manageData = baseData.pushManage.list
                 , articleManage = baseData.pushManage.activeList
                 , manageHtml=''
                 , manageActiveHtml = ''
                 , strId
                 ;
             if(manageData.is_success==1){
                 jQ.each(manageData.data,function(k,v){
                     manageHtml += '<label title="'+ v.name+'" bid="'+ v.bid+'" for="itemid'+ v.bid+'" ><input id="itemid'+ v.bid+'" name="item" type="radio">'+ v.name+'</label>';
                 });
                 manageHtml = '<div class="modal-push-box js-modal-push-all-box" data-toggle="buttons">'+manageHtml+'</div>';
             }else {
                 manageHtml = '<div class="alert alert-error">'+manageData.msg+'</div>';
             }
             manageHtml = '<div class="alert alert-success push-modal-title">推送列表：</div>'+ manageHtml;

             if(articleManage.is_success == 1){
                 if(articleManage.pushdata.length == 0){
                     manageActiveHtml = '<br/><br/><hr style="margin:10px 0;"><div class="text-center"><span class="label" style="padding:5px 10px;">这篇文章还没有被推送过</span></div>';
                 }else{
                     jQ.each(articleManage.pushdata,function(k,v){
//                    if(v.status=='1'){classAction='active';}else{classAction=''}
                         manageActiveHtml += '<label bid="'+ v.bid+'" aid="'+baseData.pushManage.aid+'" title="'+ v.name+'">'+ v.name+'</label>';
                     });
                     manageActiveHtml = '<br/><br/><div class="alert alert-success push-modal-title">已推送到下列位置</div>' +
                         '<div class="modal-push-box manage-push-btn-wrap js-modal-push-active-box" data-toggle="buttons">'+manageActiveHtml+'</div>';
                 }
             }else{
                 manageActiveHtml = '<div class="alert alert-info">'+articleManage.msg+'</div>';
             }
             showPushBox(manageHtml, manageActiveHtml);

         }

         //显示推送对话框
         function showPushBox(manageHtml, manageActiveHtml){
             var boxHtml = '<div id="modal_push" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                 '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4>管理推送</h4></div>' +
                 '<div class="modal-body">' +
                 '<div class="js-modal-body-push1">' +
                 manageHtml +
                 manageActiveHtml +
                 '</div>' +
                 '<div class="js-modal-body-push2"></div>' +
                 '</div>' +
                 '<div class="modal-footer">' +
                 '<div class="js-modal-footer1"><button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button></div>' +
                 '<div class="js-modal-footer2" style="display: none;"><button class="btn btn-success" data-dismiss="modal" aria-hidden="true">确定</button>' +
                 '<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button></div>' +
                 '</div>'+
                 '</div>';
             if(jQ('.modal').length>0){
                 jQ('.modal').remove();
             }
             jQ('body').append(boxHtml);
             jQ('.modal').modal();
         }

     }


	//加载关联微博窗体
	var aid = count_article_id
		,cWeiBoPostUrl = '/usersubmit.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
		,cZtPostUrl = '/pushdata?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='
		;
	jQ(document).on('click','.btn-relation',function(){
		showSetBox('关联微博',2);
		firstShowWeiboList(aid,cWeiBoPostUrl,'add_weibo_article');
	})
	
	jQ('#connectionWeibo button').live('click',function(){
		var random = parseInt(Math.random()*100000)
			,url = cWeiBoPostUrl+random
			,iptCtt = jQ('#connectionWeibo').find('input').val()
			,postData = {
					'aid':aid
					,'act':'add_weibo_article'
					,'url':iptCtt
				}
			;
		jQ.post(url,postData,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success == '1') {
				var vUrl = jQ('#connectionWeibo input').val();
				jQ('#connectionWeibo input').val();
				if(jQ('.no-list').length>0){jQ('.no-list').remove();}
				
				jQ('#connectionWeiboList').prepend('<p><a href="'+vUrl+'" target="_blank">'+vUrl+'</a><i class="icon-remove" act="del_weibo_article" title="删除关联"></i></p>');
				jQ('#connectionWeibo .info').html('<span class="success">关联成功</span>');
			}else{
				jQ('#connectionWeibo .info').html('<span class="error">关联失败</span>');
			}
		})
	})
	jQ('#connectionWeiboList .icon-remove').live('click',function(){
		var random = parseInt(Math.random()*100000)
			,url = cWeiBoPostUrl+random
			,aBox = jQ(this)
			,iptCtt = jQ(this).siblings('a').attr('href')
			,postData = {
					'aid':aid
					,'act': 'del_weibo_article'
					,'url':iptCtt
				}
			;
		jQ.post(url,postData,function(data){
			var data = eval('(' + data + ')');
			if(data.is_success == '1') {
				jQ(aBox).parents('p').remove();
				jQ('#connectionWeibo .info').html('<span class="success">删除成功</span>');
			}else{
				jQ('#connectionWeibo .info').html('<span class="error">删除失败</span>');
			}
		})
	})
			
	/**
	*	后台管理
	*	见天
	*	2013.09.30
	**/
	jQ('.manage-box2').hover(function(){
		jQ(this).find('ul').height('auto')
	},function(){
		jQ(this).find('ul').height('0')
	})

	jQ(document).on('click','.ifrome-btn',function(){
		var url = jQ(this).attr('url')
			,w = jQ(this).attr('w')
			,h = jQ(this).attr('h')
			;
		if(jQ('#gl_set_iframe_wrap').length>0){
			jQ('#gl_set_iframe_wrap').remove();
		}
		/* zhong 20130713 添加弹出拖动 */
		jQ('body').append('<div id="gl_set_iframe_wrap" style="width:'+w+'px;height:'+h+'px;margin:'+(-h/2)+'px 0 0 '+(-w/2)+'px;"><h2 id="tuodong" >点击拖动</h2><i class="close">x</i><iframe id="gl_set_iframe" src="'+url+'"></iframe></div>')
		
		jQ('#gl_set_iframe_wrap .close').live('click',function(){
			jQ('#gl_set_iframe_wrap').remove();
		})
        var oWin = document.getElementById("gl_set_iframe_wrap");
        var oH2 = oWin.getElementsByTagName("h2")[0];
        var bDrag = false;
        var disX = disY = 0;
        oH2.onmousedown = function (event)
        {		
            var event = event || window.event;
            bDrag = true;
            disX = event.clientX - oWin.offsetLeft;
            disY = event.clientY - oWin.offsetTop;
            this.setCapture && this.setCapture();
            return false
        };
        document.onmousemove = function (event)
        {
            if (!bDrag) return;
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
            var maxT = document.documentElement.clientHeight - oWin.offsetHeight;		
            iL = iL < 0 ? 0 : iL;
            iL = iL > maxL ? maxL : iL; 		
            iT = iT < 0 ? 0 : iT;
            iT = iT > maxT ? maxT : iT;

            oWin.style.marginTop = oWin.style.marginLeft = 0;
            oWin.style.left = iL + "px";
            oWin.style.top = iT + "px";		
            return false
        };
        document.onmouseup = window.onblur = oH2.onlosecapture = function ()
        {
            bDrag = false;
            oH2.releaseCapture && oH2.releaseCapture();
        };
	})
		
		
	//加载关联赞助专栏
	jQ(document).on('click','.btn-submit-zt',function(){
		var t=jQ(this)
			,boxHtml = '<div id="ztnrCtt" class="form-inline"><select id="ztnrCttSelect" multiple="multiple" style="margin-right:5px;"><option>稍等更新中…</option></select><select id="ztnrClassSelect" class="span2" multiple="multiple"><option>还未选择专题</option></select><p style="margin-top:10px;"><button class="btn zt-btn" type="submit" >提交</button></p><span class="info"></span></div>';
		showSetBox('关联赞助专栏',0,boxHtml);
		queryShowZtList(t,aid,cZtPostUrl,'getList','pushZt');
	})
	//加载关联赞助专栏分类
	jQ(document).on('click','#ztnrCttSelect option',function(){
		var t = jQ(this);
		if(jQ(this).attr('ztnameen')!='默认无选择'){
			queryShowZtList(t,aid,cZtPostUrl,'getClass','pushZt');
		}
	})
	//关联赞助专栏提交
	jQ(document).on('click','#ztnrCtt .zt-btn',function(){
		var t = jQ(this);
		queryShowZtList(t,aid,cZtPostUrl,'getSubmit','pushZt');
	})

	//第三方推送
	jQ(document).on('click','.btn-submit-ad',function(){
		var t=jQ(this)
			,boxHtml = '<div id="adnrCtt" class="form-inline"><div id="adnrCttWrap" style="margin-right:5px;">稍等更新中…</div><p style="margin-top:10px;"><button class="btn btn-ad3f" type="submit">提交</button></p><span class="info"></span></div>';
		showSetBox('第三方推送',0,boxHtml);
		queryShowZtList(t,aid,cZtPostUrl,'getList','pushAd');
	})
	//第三方推送提交
	jQ(document).on('click','#adnrCtt .btn-ad3f',function(){
		var t = jQ(this)
			,aid = count_article_id;

		queryShowZtList(t,aid,cZtPostUrl,'getSubmit','pushAd');
	})
        //一周精选推荐啊
        jQ(document).on('click','.btn-submit-Weekbest',function(){
		var t=jQ(this)
			,boxHtml = '<div id="weekbest" class="form-inline"><div id="adnrCttWrap" style="margin-right:5px;"><textarea class="postact" style="width:515px;"></textarea></div><p style="margin-top:10px;"><button class="btn btn-ad3f" type="submit">提交</button></p><span class="info"></span></div>';
		showSetBox('一周精选',0,boxHtml);
		queryShowZtList(t,aid,cZtPostUrl,'getList','pushWeekbest');
	})
        //一周精选推荐提交
	jQ(document).on('click','#weekbest .btn-ad3f',function(){
		var t = jQ(this)
			,aid = count_article_id;
                var postact =jQ('.postact').val();
		queryShowZtList(t,aid,cZtPostUrl,postact,'pushWeekbest');
	})

})

/**
*	by jiantian
*	time 2013.09.30
*	提示框，使用方法↓
*	m = 1 '消息，参数c'
*	m = 2 '关联微博'
**/
function showSetBox(t,m,c){
	var random = parseInt(Math.random()*100000)
		,url = '/usersubmit.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
		,m = isUndefined(m)?'':m
		,c = isUndefined(c)?'':c
		,setCtt = ''
		;
	
	if(m=='0'){
		setCtt = c;
	}
	if(m=='1'){
		setCtt = SetBoxShowMessage(c);
	}
	if(m=='2'){
		setCtt = SetBoxCtt();
	}
	
	
	if(!jQ('#showSetBox').length>0){
            var box = '<div id="showSetBox" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="showSetBoxLabel" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="myModalLabel">管理-'+t+'</h3></div><div class="modal-body">'+setCtt+'</div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button></div></div>'
		;
		jQ('body').append(box);
	}else{
            jQ('#showSetBox #myModalLabel').html('管理-'+t);
            jQ('#showSetBox .modal-body').html(setCtt);
        }
	jQ('#showSetBox').modal('show');
	
}

/**
*	by jiantian
*	time 2013.09.30
*	提示框内容-提示内容
**/
function SetBoxShowMessage(c){
	return c;
}

/**
*	by jiantian
*	time 2013.09.30
*	提示框内容-管理-关联微博
**/
function SetBoxCtt(){
	var box = '<div id="connectionWeibo" class="form-inline" ><input type="text" class="span3" style="margin-right:10px;"><button type="submit" class="btn">提交</button><span class="info"></span><h4>已关联微博</h4></div><div id="connectionWeiboList"><p class="no-list">没有关联微博</p></div>';
	return box;
}

/**
*	by jiantian
*	time 2013.09.30
*	管理-关联微博-第一次列表
**/
function firstShowWeiboList(aid,postUrl,act){
	var random = parseInt(Math.random()*100000)
		,url = postUrl+random
		,postData = {
				'aid':aid
				,'act': 'add_weibo_article'
				,'url':''
			}
		;

	jQ.post(url,postData,function(data){
		var data = eval('(' + data + ')')
			,hData = '';
		if(data.is_success == '1') {
			var vUrl = jQ('#connectionWeibo input').val();
			
			if(jQ('.no-list').length>0){jQ('.no-list').remove();}
			for(i=0;i<data.mid_urls.length;i++){
				hData = hData+'<p><a href="'+data.mid_urls[i]+'" target="_blank">'+data.mid_urls[i]+'</a><i class="icon-remove" act="del_weibo_article" title="删除关联"></i></p>';
			}
			jQ('#connectionWeiboList').html(hData);
		}else{
		}
	})

}

/**
*	by jiantian
*	time 2013.10.31
*	管理-关联赞助专栏
*	ftype = 'pushZt' 赞助专栏
*	ftype = 'pushAd' 推送客户端广告
*	act = getList '查询专题列表'
*	act = getClass '查询专题分类'
*	act = getSubmit '提交绑定'
**/
function queryShowZtList(t,aid,postUrl,act,ftype){
	var random = parseInt(Math.random()*100000)
		,url = postUrl+random
		,checkIpt = new Array
		,postData = {
				'aid':aid
				,'zid':isUndefined(t.attr('zid'))?'':t.attr('zid')
				,'act':act
				,'url':url
				,'ftype':ftype
			}
	if(act=='getSubmit'){
		if(ftype=='pushZt'){
			postData.zid =jQ('#ztnrCttSelect option:selected').attr('zid');
			postData.ztnameen =jQ('#ztnrCttSelect option:selected').attr('ztnameen')=='默认无选择'?'':jQ('#ztnrCttSelect option:selected').attr('ztnameen');
			postData.tid = jQ('#ztnrClassSelect option:selected').attr('tid');
		}else if(ftype=='pushAd'){
			jQ('#adnrCttWrap input:checked').each(function(i){
				checkIpt[i] = jQ(this).attr('openid');
			})
			postData['pro']=checkIpt;
		}
	}

	jQ.post(url,postData,function(data){
		var data = eval('(' + data + ')')
			,hData = '';
			if(data.is_success == '1'){
				if(ftype=='pushZt'){
					if(act=='getList'){
						for(i=0;i<data.content.length;i++){
							hData += '<option zid="'+data.content[i].zid+'" ztnameen="'+data.content[i].ztnameen+'">'+data.content[i].zanzhushang+'</option>';
						}
						jQ('#ztnrCttSelect').html('<option zid="0" ztnameen="默认无选择">默认无选择</option>'+hData);	
					}
					if(act=='getClass'){
						for(i=0;i<data.content.length;i++){
							hData += '<option tid="'+data.content[i].tid+'" val="'+data.content[i].ztclassname+'">'+data.content[i].ztclassname+'</option>';
						}
						jQ('#ztnrClassSelect').html(hData);
						jQ('#ztnrClassSelect option[val="列表"]').attr('selected','selected');
					}
					if(act=='getSubmit'){
						queryShow('#ztnrCtt',data.msg,'alert-success');
						if(postData.ztnameen!=''){
							setTimeout(window.top.location.reload(),800)
						}
					}
				}else if(ftype=='pushAd'){
					if(act=='getList'){
						for(i=0;i<data.content.length;i++){
							if(data.content[i].status=='1'){
								var iptChecked = 'checked';
							}else{
								var iptChecked = '';
							}
							hData += '<label class="checkbox" style="margin:5px 10px 5px 0;background:#ECF0F1;font-size:12px;border-radius:5px;display:inline-block;padding:5px 10px;"><input type="checkbox" name="pro[]" oid="'+data.content[i].oid+'" openid="'+data.content[i].openid+'" '+iptChecked+' style="margin-right:5px;">'+data.content[i].openname+'</label>';
						}
						jQ('#adnrCttWrap').html(hData);
					}
					if(act=='getSubmit'){
						queryShow('#adnrCtt',data.msg,'alert-success');
						setTimeout(window.top.location.reload(),800);
					}
				}else if(ftype='pushWeekbest'){
                                    queryShow('#weekbest',data.msg,'alert-success');
                                }
			}else{
                            if(ftype='pushWeekbest'){
                                queryShow('#weekbest',data.msg,'alert-error');
                                jQ('#showSetBox,.modal-backdrop').delay(1500).animate({opacity:0}, 400,function(){
                                        jQ(this).remove();
                                });
                            }else{
				queryShow('#ztnrCtt',data.msg,'alert-error');
                            }
			}
	})
}


/*
* 表单错误展示
* type="alert-error/alert-success"
*/
function queryShow(id,s,type){
	var box = '<div class="alert '+type+'"><button type="button" class="close" data-dismiss="alert">x</button><div class="box-ctt">'+s+'</div></div>'
	;
	if(jQ('#showSetBox .alert').length>0){
		jQ('#showSetBox .alert').stop().animate({opacity:1}, 100).attr('class','alert '+type).find('.box-ctt').html(s);
	}else{
		jQ(id).before(box);
	}
	jQ('#showSetBox .alert').delay(1500).animate({opacity:0}, 400,function(){
		jQ(this).remove();
	});
}