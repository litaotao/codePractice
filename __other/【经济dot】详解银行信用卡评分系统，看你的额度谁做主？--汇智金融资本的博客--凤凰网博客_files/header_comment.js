/**
 * @version 2.0.0
 * @author yangpeng
 * @description 统计
 */
//通用的 JavaScript 函数
var urlset = 'com';
var curHost = window.location.host;
if(urlset == 'lc') {
	var HTTP_BLOG_ROOT = "http://blog-lc.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-lc.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-lc.ifeng.com/";
	var HTTP_FILES_ROOT = "http://blogfile-lc.ifeng.com/";
}
if(urlset == 'de') {
	var HTTP_BLOG_ROOT = "http://blog-de.ifeng.com/";
	var HTTP_GROUP_ROOT = "http://q-de.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin-de.ifeng.com/";
	var HTTP_FILES_ROOT = "http://blogfile-de.ifeng.com/";
}
if(urlset == 'com') {
	var HTTP_BLOG_ROOT = "http://"+curHost+"/";
	var HTTP_GROUP_ROOT = "http://q.ifeng.com/";
	var HTTP_ADMIN_ROOT = "http://admin.ifeng.com/";
	var HTTP_FILES_ROOT = "http://blogfile.ifeng.com/uploadfiles/";
}

var ifeng = ifeng || {};
ifeng.util = ifeng.util || {};
ifeng.ui = ifeng.ui || {};
(function($) {
    ifeng.comment = {
    	play : true,
        count: 0,
        time: null,
        
         _delcomment_url : HTTP_BLOG_ROOT + 'blog/delete_comment.php',
         //验证码
         _captcha_check_url : HTTP_BLOG_ROOT + 'usercp/index.php?op=checkCaptcha',
         _reload_captcha : 'reload_captcha', //文章验证码reload
         _captcha_img : 'captcha_img', //验证码图片
         _captcha_close  : 'captcha_close', //验证码按钮
         _article_captcha  : 'article_captcha', //验证码容器
         _captcha_text  : 'captcha_text', //验证码内容
         _captcha_tip  : 'captcha_tip', //验证码提示容器
         _captcha_actType  : 'captcha_actType', //验证码显示时当前acttype
         
        init: function() {
            var _this = ifeng.comment;

            //_this.bindStatus.get(); //获取绑定状态
            $('a.publicBt').live('click', _this.reply.beforeSubmit);

            $('a.comment-reply').live('click', _this.reply.process); // 回复
            $('div.face a').find('img').live('click', _this.face); // 表情
            $('#comment_input').bind('focus blur', _this._textareaProcess); // 输入框
            $('div.vcom_btn').bind('click', _this.toMove);
            $('div.vcom_noneList').bind('click', _this.toMove);
            $('a[href="#pingl"]').bind('click', _this.toMove); // $('div.sharearea') 下的功能;

            $('div.tlayer').find('li').live('click', _this.reply.postTo);
            
            
            //验证码
            $('#'+_this._reload_captcha).bind('click', _this.reloadCaptcha);
            $('.del_comment').live('click',_this.delcomment);
             
          
            _this.push.get(-1); // 第一次调用
        },

        face: function() {
            var faceVal = '[' + $(this).attr('alt') + ']';
            var tmpObj = $(this).parent().parent().parent().parent().find('div.vcom_input');

            if (tmpObj.find('textarea').val() == '来说两句吧...') tmpObj.find('textarea').val('');

            $(tmpObj.find('textarea')).insertAtCaret(faceVal);
        },

        toMove: function(event, type) {
            var $body = $('body, html'), $top = $('#videocomment').offset().top - 10;
            $body.stop(true, true).animate({scrollTop: $top + 'px'}, 500, function() {
            	if(!type) {
            		$('#comment_input').focus();
            	}
            });
            return false;
        },
        
        //删除评论
        delcomment:function(){
             var  obj = $(this);
             var _this = ifeng.comment;
             var cid = $(this).attr('commendId');
             $.ajax({
                   url : _this._delcomment_url,
                   dataType:'json',
                   asybc:false,
                   type:'get',
                   data:"cid="+cid,
                   success:function(data){
                        if(data.error){
                              var top = obj.offset().top;
                              $('#singPage').text(data.reason);
                              $('#box_article').css('top',top-30+'px').show();
                              setTimeout(function(){
                                   $('#box_article').hide();   
                              },2000);
                        }else{
                              _this.push.get(-1);  
                        }   
                   }
             });
        },
        //验证码  start
        reloadCaptcha:function(){
               var _this = ifeng.comment;
	       $('#'+_this._captcha_img).attr('src', '/captcha.php?action=blog&t='+Math.random()); 
        },
        
        actionCaptcha:function(obj,objs){
                        var _this = ifeng.comment;
                        if(obj.attr('actType') == 'true') {
                                _this.checkCaptcha(objs);
                                return true;
                        }
                        //关闭遮罩层
                        _this.closeBgLayer();
                        //关闭验证码输入框
                        _this.closeCaptcha();
                        //清空验证码提示
                        _this.clearCaptchaTip();
                        
              
                },
        checkCaptcha: function(objs) {
		var _this = ifeng.comment;
		$.ajax({
			url : _this._captcha_check_url,
			dataType : 'json',
			async : false,
			type : 'post',
			data : "captcha="+_this.getCaptcha(),
			success : function(data){_this.callbackCheckCaptcha(data,objs);}	
		});
	},
        captchaState:function(objs){
                $.ajax({
                      url:HTTP_BLOG_ROOT+"blog/article_comments_ajax.php?commenttype=comment_num_check",
                      dataType :'json',
                      async : false,
		      type : 'get',
		      success : function(captchaStat){
                            if(captchaStat == 1){
                                ifeng.comment.showBgLayer();
                                ifeng.comment.showCaptcha(objs);
                                $('.'+ifeng.comment._captcha_close).bind('click', function(){ 
                                      ifeng.comment.actionCaptcha($(this),objs)
                                });
                                    
                            }else{ 
                                    ifeng.comment.reply.submit(objs);
                            }
                      }
                });
       }, 
       callbackCheckCaptcha: function(msg,objs) {
		var _this = ifeng.comment;
		if(msg.code > 0) {
			//关闭遮罩层
			_this.closeBgLayer();
			//关闭验证码输入框
			_this.closeCaptcha();
			//清空验证码提示
			_this.clearCaptchaTip();
			
            return _this.reply.submit(objs);
		} else {
			$('#'+_this._captcha_tip).html(msg.data);
			return false;
		}
	},
	clearCaptchaTip: function() {
		$('#'+ifeng.comment._captcha_tip).html('');
	},
	setCaptchaActtype: function(actType) {
		$('#'+ifeng.comment._captcha_actType).val(actType);
	},
	getCaptchaActtype: function() {
		return $('#'+ifeng.comment._captcha_actType).val();
	},
       showBgLayer: function() {
               var showHeight = $(document).height();
               $('body').append("<div id='box_bg_all' style='width:100%;display:block; background:#000;opacity:0.2;filter:alpha(opacity=40);z-index:1000;position:absolute;left:0;top:0;'></div>");
               $('#box_bg_all').height(showHeight);	
	},
	closeCaptcha: function() {
		$('#'+ifeng.comment._article_captcha).css('display', 'none');
	},
	showCaptcha: function(objs) {
        var y = objs.offset().top;
        $('#'+ifeng.comment._article_captcha).css('top', y-200+'px');
		$('#'+ifeng.comment._article_captcha).css('display', 'block');
	},
	getCaptcha: function() {
		return $('#'+ifeng.comment._captcha_text).val();
	},
	clearCaptchaText: function() {
		$('#'+ifeng.comment._captcha_text).val('');
	},   
        closeBgLayer: function() {
             $('#box_bg_all').remove();
	},
	
        //验证码end
        
        

        _textareaProcess: function(event) {
        	ifeng.comment.play = false;
            var _this = ifeng.comment;
            var lineObj = $(this).parent().parent();
            clearInterval(_this.time);

            var btnSubmit = $($(this).parent().parent().next()).find('a.publicBt');
            if (event.type == 'focus') {
                lineObj.addClass('import');

                if ('来说两句吧...' == $(this).val()) {
                    $(this).val('');
                    btnSubmit.removeClass('publicBton');
                } else if ('' != $.trim($(this).val())) {
                    btnSubmit.addClass('publicBton');
                }

                var textareaThis = $(this);
                _this.time = setInterval(function() {
                    var currentObj = $(textareaThis.parent().parent().parent()).find('div.vcom_key');
                    var textareaLen = _this.tools.charLength($.trim(textareaThis.val()));

                    if (textareaLen > 1000) {
                        currentObj.addClass('prompt').html('已超过<em>' + (textareaLen - 1000) + '</em>字');
                        lineObj.addClass('error');
                        btnSubmit.removeClass('publicBton');
                    } else {

                        if (textareaLen > 0 && !btnSubmit.hasClass('publicBton')) {
                            btnSubmit.addClass('publicBton');
                        }

                        if (textareaLen == 0 && btnSubmit.hasClass('publicBton')) {
                            btnSubmit.removeClass('publicBton');
                        }

                        currentObj.removeClass('prompt').html(textareaLen + '/1000');
                        lineObj.removeClass('error').addClass('import');
                    }
                }, 300);

            }

            if (event.type == 'blur') {

                lineObj.removeClass('import');
                if ('' == $.trim($(this).val())) {
                    $(this).val('来说两句吧...');
                    btnSubmit.removeClass('publicBton');
                } else {
                    var textareaThis = $(this);
                    var currentObj = $(textareaThis.parent().parent().parent()).find('div.vcom_key');
                    var textareaLen = _this.tools.charLength($.trim(textareaThis.val()));
                    if (textareaLen > 1000) {
                        currentObj.addClass('prompt').html('已超过<em>' + (textareaLen - 1000) + '</em>字');
                        btnSubmit.removeClass('publicBton');
                    } else {
                        currentObj.removeClass('prompt').html(textareaLen + '/1000');
                        btnSubmit.addClass('publicBton');
                    }

                }

            }
        },
        _textareaOnkeyup: function(obj) {
            var _this = $(obj);
            var len = ifeng.comment.tools.charLength($.trim(_this.val()));
            _scrollHeight = _this[0].scrollHeight;
            if (_this.height() < 66) {
                if (len < 72) {
                    _this.height(22);
                }

                if (len > 72 && len < 150) {
                    _this.height(44);
                }

                if (len > 150) {
                    _this.height(66);
                }

            } else {
                if (len < 72) {
                    _this.height(22);
                }

                if (len > 72 && len < 150) {
                    _this.height(44);
                }

                if (len > 150) {
                    _this.height(66);
                }
            }

        },
        forward: function(obj) {
            var _this = $(obj);
            var target = _this.prev();
            if (target.css('display') == 'none') {
                target.css('display', '');
            } else if (target.css('display') == '') {
                target.css('display', 'none');
            } else {
                target.css('display', 'none');
            }
        },
        forwardEvent: {
            onmouseover: function(obj) {
                var _this = $(obj);
                _this.find('a.icon_sina').show();
            },
            onmouseout: function(obj) {
                var _this = $(obj);
                _this.find('a.icon_sina').hide();
            }
        },
        
        deleteEvent:{
             onmouseover: function(obj) {
                var _this = $(obj);
                _this.find('.del_comment').show();
             },
            onmouseout: function(obj) {
                var _this = $(obj);
                _this.find('.del_comment').hide();
            }    
        },
        
        sinaForward: function(obj) {
            var arr = [], href = '';
            var url = HTTP_BLOG_ROOT+"article/"+userinfo['itemid']+".html";
            var content = $('#comment_' + $(obj).attr('commendId')).find('p').html();
            arr.push('http://v.t.sina.com.cn/share/share.php?' + 'appkey=2947336083');
            arr.push('url=' + url);
            arr.push('title=' + ifeng.comment.tools.simple.filter(content));
            arr.push('source=ifeng');
            arr.push('sourceUrl='+HTTP_BLOG_ROOT);
            arr.push('content=utf8');
            arr.push('pic=');

            href = arr.join('&');
            window.open(href, '', 'width=400,height=400');
        }
    };

    ifeng.comment.tools = {
        simple: {
            filter: function(content) {
                content = content.replace(/<img src="http:\/\/blogfile-"+urlset+"\.com\/image\/album\/biaoqing\/gif\/tu\.gif">/gi, '[吐]');
                content = content.replace(/<img src="http:\/\/blogfile-"+urlset+"\.com\/image\/album\/biaoqing\/gif\/ding\.gif">/gi, '[顶]');
                content = content.replace(/<img src="http:\/\/blogfile-"+urlset+"\.com\/image\/album\/biaoqing\/gif\/touxiao\.gif">/gi, '[偷笑]');
                content = content.replace(/<img src="http:\/\/blogfile-"+urlset+"\.com\/image\/album\/biaoqing\/gif\/daxiao\.gif">/gi, '[大笑]');
                content = content.replace(/<img src="http:\/\/blogfile-"+urlset+"\.com\/image\/album\/biaoqing\/gif\/hua\.gif">/gi, '[鲜花]');
                content = content.replace(/<[^>]*>/gi, "");
                return content;
            },
            filterFace: function(content) {
                content = content.replace(/\[吐\]/g, '<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/tu.gif">');
                content = content.replace(/\[顶\]/g, '<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/ding.gif">');
                content = content.replace(/\[偷笑\]/g, '<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/touxiao.gif">');
                content = content.replace(/\[大笑\]/g, '<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/daxiao.gif">');
                content = content.replace(/\[鲜花\]/g, '<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/hua.gif">');
                return content;
            },
            comment: function(obj) {
                var  str = '', _str = '',istr='', reply_str='',style = 'style="width : 38px; height : 38px"';
                
                if (obj.comment_from_code && obj.comment_from_code == 'sina') {
					_str =
						'<a href="javascript:void(0);" class="vcomListIcon" title="新浪微博">' +
							'<img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/rdn_4fed19e87c518.jpg" />' +
						'</a>';
				} else {
					_str = '';
				}
                
                if(userinfo.allowreply==1){
                       reply_str = '<a href="javascript:void(0);" class="comment-reply" commendId="' + obj.cid + '">回复</a>' ;
                }
                
                if(logininfo.username==userinfo.username){
                     istr= '<a href="javascript:void(0);" class="del_comment" style="display:none;" commendId="' + obj.cid + '">删除</a>';        
                }else  if(obj.author==logininfo.username || (obj.reply&&obj.pid>0&&(obj.reply.author==logininfo.username||obj.author==logininfo.username))){
                     istr= '<a href="javascript:void(0);" class="del_comment" style="display:none;" commendId="' + obj.cid + '">删除</a>';    
                }
                if(obj.pid==0){
                        obj.message = ifeng.comment.tools.simple.filterFace(obj.message);
                       
                str = 
                	'<li id="comment_' + obj.cid + '">' + 
                		'<div class="vcom_list_pic">' + 
                			'<a href="'+ HTTP_BLOG_ROOT + obj.authorid +'.html"  target="_blank"><img ' + style + ' src="' + obj.userheadimg + '" alt="' + obj.author + '" title="' + obj.author + '"></a>' + 
            			'</div>' + 
            			'<div class="vcom_list_cont" onmouseover="ifeng.comment.deleteEvent.onmouseover(this);" onmouseout="ifeng.comment.deleteEvent.onmouseout(this);"  >' +
                			'<em>' +
                				'<a href= "'+ HTTP_BLOG_ROOT + obj.authorid + '.html" target="_blank">' + obj.author + '</a>' +
                				_str +
                			'</em>' +
                			'<p>' +obj.message+ '</p>' +
                			'<div class="vcom_list_text">' +
                                                '<span class="time">' + obj.ctime + '</span>' +
                				'<span id="comment_reply_' + obj.cid + '" class="reply">' + istr + 
                					'<span class="forwardHover" onmouseover="ifeng.comment.forwardEvent.onmouseover(this);" onmouseout="ifeng.comment.forwardEvent.onmouseout(this);">' +
                						'<a href="javascript:void(0);" class="icon_sina" commendId="' + obj.cid + '" onclick="ifeng.comment.sinaForward(this);" style="display: none;"></a>' +
                						'<a href="javascript:void(0);">转发</a>' + '</span>' + reply_str + 
                						
            						'</span>' +
                                                        
    						'</div>' +
                		'</div>' +
                	'</li>';
                }else if(obj.pid>0&&obj.reply){
                	 obj.message = ifeng.comment.tools.simple.filterFace(obj.message);
                str = 
                	'<li id="comment_' + obj.cid + '">' + 
                		'<div class="vcom_list_pic">' + 
                			'<a href= "'+ HTTP_BLOG_ROOT + obj.authorid + '.html" target="_blank"><img ' + style + ' src="' + obj.userheadimg + '" alt="' + obj.author + '" title="' + obj.author + '"></a>' + 
            			'</div>' + 
            			'<div class="vcom_list_cont" onmouseover="ifeng.comment.deleteEvent.onmouseover(this);" onmouseout="ifeng.comment.deleteEvent.onmouseout(this);">' +
                			'<em>' +
                				'<a href= "'+ HTTP_BLOG_ROOT + obj.authorid + '.html" target="_blank">' + obj.author + '</a>' +
                				_str +
                			'</em>' +
                			'<p>' +'<a href="'+ HTTP_BLOG_ROOT + obj.authorid + '.html" target="_blank">'+obj.author +'</a>'+ ' 回复 ' +'<a href="'+ HTTP_BLOG_ROOT+obj.reply.authorid + '.html" target="_blank">'+obj.reply.author +'</a>' + ':' +obj.message+ '</p>' +
                			'<div class="vcom_list_text">' +
                                                '<span class="time">' + obj.ctime + '</span>' +
                				'<span id="comment_reply_' + obj.cid + '" class="reply">' + istr + 
                					'<span class="forwardHover" onmouseover="ifeng.comment.forwardEvent.onmouseover(this);" onmouseout="ifeng.comment.forwardEvent.onmouseout(this);">' +
                						'<a href="javascript:void(0);" class="icon_sina" commendId="' + obj.cid + '" onclick="ifeng.comment.sinaForward(this);" style="display: none;"></a>' +
                						'<a href="javascript:void(0);">转发</a>' + '</span>' + reply_str + 
            						'</span>' +
    						'</div>' +
                		'</div>' +
                	'</li>';
                   
                }
                return str;
            },
            reply: function(obj, content, id) {
                var param = {};
                param.id = id;
                param.itemid = $.trim($('.publicBt').attr('itemid'));   //获取评论的文章id
                param.flag = ' flag="1"';
                param.uname = '';  //去掉@
                param.content = '';
                
                param.num = ifeng.comment.tools.charLength($.trim(param.content));
                param.height = function() {
                    var _num = param.num;
                    if (_num < 72) return '22px';
                    if (_num > 72 && _num < 150) return '44px';
                    if (_num > 150) return '66px';
                };
                param.sid = function() {
                    var syn = [], status = 'presina_done', _class = 'class=""';
                    if (ifeng.util.getCookie('sid')) {
                        syn.push('<div class="update">同步到</div>');
                        syn.push('<div class="tlayer">');
                        var _bindStatus = ifeng.comment.bindStatus.status;
                        if (_bindStatus && _bindStatus.code == '1') {
                        	_class = _bindStatus.data.sina.r == '1' ? 'class="current"' : '';
                            status = 'presina_done';
                        }
                        syn.push('<ul><li '+ _class +' title="sina"><a href="javascript:void(0);" class="' + status + '"></a></li></ul>');
                        syn.push('</div>');
                    }
                    return syn.join('');
                };

                var str =
                	'<div class="reply_box">' +
                		'<span class="reply_role"></span>' +
                		'<div class="vcom_send">' +
                			'<div class="vcom_key">' + param.num + '/1000</div>' +
                			'<div class="vcom_input">' +
                				'<div class="vcom_inputt"></div>' +
                				'<div class="vcom_inputc">' +
                					'<textarea id="comment_textarea_' + param.id + '" style="height:' + param.height() + '" onkeyup="ifeng.comment._textareaOnkeyup(this);">' + param.content + '</textarea>' +
            					'</div>' +
            					'<div class="vcom_inputb"></div>' +
            					'<div class="vcom_succeed" id="reply_succeed" style="display:none;"></div>' +
            				'</div>' +
            				'<div class="vcom_function">' +
            					'<div class="face">' +
            						'<a href="javascript:void(0);"><img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/daxiao.gif" alt="大笑" title="大笑"></a>' +
            						'<a href="javascript:void(0);"><img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/ding.gif" alt="顶" title="顶"></a>' +
            						'<a href="javascript:void(0);"><img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/touxiao.gif" alt="偷笑" title="偷笑"></a>' +
            						'<a href="javascript:void(0);"><img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/tu.gif" alt="吐" title="吐"></a>' +
            						'<a href="javascript:void(0);"><img src="'+HTTP_FILES_ROOT+'image/album/biaoqing/hua.gif" alt="鲜花" title="鲜花"></a>' +
            					'</div>' +
            					'<div class="btnico">' +
            						param.sid() +
            						'<a href="javascript:void(0);" class="publicBt publicBton"' + param.flag + ' commentId="' + param.id + '" itemid="'+param.itemid+'" tag="enable"></a>' +
            					'</div>' +
            				'</div>' +
            			'</div>' +
            		'</div>';
                return str;
            }
        },
        charLength : function(str) {
			var cArr = str.match(/[^\x00-\xff]/ig);
			var len = str.length + (cArr == null ? 0 : cArr.length);
			return Math.ceil(len / 2);
		}
    };

    ifeng.comment.paging = {
        currentPage : 1,
		pageSize : 0,
        getPage : function(type, cPage) {
			var _this = ifeng.comment.paging;
			_this.pages(type, cPage, function(event){ifeng.comment.toMove(event, true);});
		},
		getNext : function() {
			var _this = ifeng.comment.paging;
			_this.pages(1, 0, function(event){ifeng.comment.toMove(event, true);});
		},
		getPrev : function() {
			var _this = ifeng.comment.paging;
			_this.pages(-1, 0, function(event){ifeng.comment.toMove(event, true);});
		},
        pages: function(type, cPage, callback) {

			var _this = ifeng.comment.paging;
			var _count = ifeng.comment.count;
			var _pageSize = _this.pageSize = (_count % 10) > 0 ? parseInt(_count / 10) + 1 : parseInt(_count / 10);
			var _currentPage = 1, arr = [];

			if (type == 1) {
			    _currentPage = _this.currentPage + 1;
			} else if (type == -1) {
			    _currentPage = _this.currentPage - 1;
			} else {
			    _currentPage = cPage ? cPage : 1;
			}
			var padding = 2;
			var iLen = padding * 2 + 1;

			// 上一页 &lt; 下一页 &gt; 
            if (_currentPage == 1) {
                arr.push('<li class="vprev"><span>&lt;&lt;上一页</span></li>');
            } else {
                arr.push('<li class="vprev"><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPrev();return false;">&lt;&lt;上一页</a></li>');
            }

            if (_pageSize <= iLen + 1) {
            	for (var i = 1; i <= _pageSize; i++) {
            		if (i == _currentPage) {
                        arr.push('<li class="current"><span>' + _currentPage + '</span></li>');
                    } else {
                        arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a></li>');
                    }
            	}
            } else if ((_currentPage - padding) <= 1) {
            	for (var i = 1; i <= iLen; i++) {
            		if (i == _currentPage) {
                        arr.push('<li class="current"><span>' + _currentPage + '</span></li>');
                    } else {
                        arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a></li>');
                    }
            	}

            	if(_currentPage + 3 != _pageSize) {
                	arr.push('<li><span>...</span></li>');
            	}
            	arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, '+ _pageSize +'); return false;">'+ _pageSize +'</a></li>');
            } else if ((_currentPage + padding) >= _pageSize) {
            	arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, 1); return false;">1</a></li>');
            	if(_currentPage != 4) {
            		arr.push('<li><span>...</span></li>');
            	}

            	for(var i = (_pageSize - 2 * padding); i <= _pageSize; i++) {
            		if (i == _currentPage) {
                        arr.push('<li class="current"><span>' + _currentPage + '</span></li>');
                    } else {
                        arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a></li>');
                    }
            	}
            } else {
            	arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, 1); return false;">1</a></li>');
            	
            	if(_currentPage != 4) {
            		arr.push('<li><span>...</span></li>');
            	}

                for(var i= (_currentPage - padding), len = (_currentPage + padding); i <= len; i++) {
                	if (i == _currentPage) {
                        arr.push('<li class="current"><span>' + _currentPage + '</span></li>');
                    } else {
                        arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a></li>');
                    }
                }
                if(_currentPage + 3 != _pageSize) {
                	arr.push('<li><span>...</span></li>');
            	}
                arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, '+ _pageSize +'); return false;">'+ _pageSize +'</a></li>');
            }

            if (_currentPage == _pageSize) {
                arr.push('<li class="vnext"><span>下一页&gt;&gt;</span></li>');
            } else {
                arr.push('<li class="vnext"><a href="javascript:void(0);" onclick="ifeng.comment.paging.getNext();return false;">下一页&gt;&gt;</a></li>');
            }

            $('div.vcom_pages ul').html(arr.join(''));
			$('div.vcom_pages span.tips').html(_this.recordPage(_currentPage, _pageSize, _count));
			_this.currentPage = _currentPage;
			ifeng.comment.list.get(_currentPage);
			if (callback) callback();
        },

        recordPage: function(current, size, count) {
            var num = current * 10;
			var str = '';
			if (size == 1) {
				count = count < 1 ? 1 : count;
				str = '共' + count + '条 / 第1-' + count + '条';
			} else if (current == size) {
				if (count % 10 == 1) {
					str = '共' + count + '条 / 第' + count + '条';
				} else {
					str = '共' + count + '条 / 第' + parseInt(((current - 1) * 10) + 1) + '-' + count + '条';
				}
			} else {
				str = '共' + count + '条 / 第' + (num - 9) + '-' + num + '条';
			}
            return str;
        }
    };

    /**
	 * 回复列表
	 */
    ifeng.comment.list = {
        url : HTTP_BLOG_ROOT+'blog/article_comments_ajax.php?commenttype=comment_page',
		arr : [],
		currentPage : 1,
		pageSize : 0,
		param : function() {
			var _param = {};
			_param['job'] = 1;
			_param['format'] = 'json';
			_param['pagesize'] = 10;
			_param['p'] = this.currentPage;
                        _param['itemid'] = userinfo['itemid'];
			return _param;
		},
		get : function(page) {
			var _this = ifeng.comment.list;
			_this.currentPage = page ? page : 1;
			var param = _this.param();
			$.ajax({
				url : _this.url,
				data : param,
				dataType : 'json',
                                cache: false ,
				success : _this.success
			});
		},
		success : function(result) {
                        var _simple = ifeng.comment.tools.simple, arr = [], list = result;
			$.each(list, function(index, obj) {
				arr.push(_simple.comment(obj));
			});
			$('#vcom_list_ul').html(arr.join(''));
		}
    };


    /**
	 * 回复功能
	 */
    ifeng.comment.reply = {
        url: HTTP_BLOG_ROOT+'blog/add_comment.php',
        flag: 0,
        obj: null,
        //content: '',
        message:'',
        postTo: function() {
            if (ifeng.util.getCookie('sid')) {
                if (ifeng.comment.bindStatus.status && ifeng.comment.bindStatus.status.code == '1') {
                    if ($(this).hasClass('current')) {
                        $(this).removeClass('current');
                    } else {
                        $(this).addClass('current');
                    }
                } else {
                    window.open('http://my.ifeng.com/?_c=user&_a=bind');
                }
            } else {
                ifeng.ui.loginForm.login();
            }
        },
        param: function(flag, target) {
            var obj = {}, _content = '',_message = '', _this = ifeng.comment,itemid='';
            var content = $(target).parent().parent().parent();
            var message = $(target).parent().parent().parent();
            var contentVal = $('div.vcom_inputc', content).find('textarea');
            
             obj.format = 'js';
             obj.username = userinfo.username;
             obj.uid = userinfo.uid; 
             obj.subject = userinfo.subject;
            
            itemid = $.trim($('.publicBt').attr('itemid'));
           
            if (flag == 0) {
                _message = $.trim($('#comment_input').val());
                
                if (_message && _message != '来说两句吧...' && _message != '' && _this.tools.charLength(_message) <= 1000) {
                     obj.message = _this.reply.message = $('#comment_input').val();
                     obj.itemid = itemid;
                     obj.refComId = 0 ;
                    
                } else {
                    return false;
                }
            }

            if (flag == 1) {
                obj.fromReply = 'true';
                obj.pid = $(target).attr('commentid');
                _message = $.trim(contentVal.val());
                if (_message && _message != '来说两句吧...' && _message != '' && _this.tools.charLength(_message) <= 1000) {
                    obj.message = _this.reply.message = _message;
                    obj.itemid = itemid;
                    
                } else {
                    return false;
                }
            }

            if ($(target).prev().find('li.current')) {
                    obj.postto = $(target).prev().find('li.current').attr('title') ? $(target).prev().find('li.current').attr('title') : '';
            }
            obj.t = new Date().getTime();
            return obj;
        },
        process: function(e) {
            e.preventDefault();
            var _simple = ifeng.comment.tools.simple,
                _this = this;
            var commendId = $(_this).attr('commendid');
            var reply_box = $('div.reply_box');
            if (reply_box) {
                $('#comment_textarea_' + commendId).unbind('focus').unbind('blur');
                reply_box.remove();
            }
            var user_name = $('#comment_' + commendId).find('div.vcom_list_cont a').html();
            var user_content = $('#comment_' + commendId).find('div.vcom_list_cont p').html();
            $('#comment_' + commendId).append(_simple.reply(user_name, user_content, commendId));
            $('#comment_textarea_' + commendId).bind('focus blur', ifeng.comment._textareaProcess);
            $('#comment_textarea_' + commendId).focus();
        },
        beforeSubmit:function(){
                        // 判断按钮是否为已输入状态,需要在未输入的情况下依然弹出登陆.
                        if (!$(this).hasClass('publicBton')) {
                                if (ifeng.util.getCookie('sid') == '') {
                                        ifeng.ui.loginForm.login();
                                        return false;
                                }
                        }
          
                        if (ifeng.util.getCookie('sid') == '') {
                                ifeng.ui.loginForm.login();
                                return false;
                        }
                        
                        ifeng.comment.captchaState($(this));   //验证码
        },
        submit: function(objs) {
            var _reply = ifeng.comment.reply;
            var _this = objs;
            
            _reply.obj = this;
            var _flag = _reply.flag = _this.attr('flag');
            var object = _reply.param(_flag, _this);
           
            if(!object) {
            	return false;
            }

            // 暂时修改
            if ($(this).attr('tag') == 'disable') {
            	$(this).attr('tag', 'enable');
                return false;
            } else {
                $(this).attr('tag', 'disable');
            }
            
            
            $.ajax({
                type:'POST',
                url: _reply.url,
                data:object,
                dataType: 'jsonp',
                cache: false ,
                success: _reply.success
            });

        },
        success: function(obj) { 
            var _obj = $(ifeng.comment.reply.obj).parent().parent().prev();
            if (!obj) {
                if (typeof obj == 'string') {
                    alert(obj);
                    return false;
                } else {
                    ifeng.ui.loginForm.login();
                }
            }else if(obj.error){
                    var top = $('.vcom_send').offset().top;
                    $('#singPage').text(obj.reason);
                    $('#box_article').css('top',top+30+'px').show();
                    setTimeout(function(){
                             $('#box_article').hide();   
                    },2000);
                    return false;
            } 
            else {
                ifeng.comment.clearCaptchaText();     //清空验证码值
		ifeng.comment.reloadCaptcha();
                (function() {
                    var _uname = logininfo.username;    //登录用户
                    if(obj.pid==0){
                         $('.vcom_succeed').show();
                         var _str = 
                    	'<li>' +
	                    	'<div class="vcom_list_pic">' +
	                    		'<a href="javascript:void(0);">' +
	                    			'<img style="width : 38px; height : 38px" src= "'+HTTP_FILES_ROOT+'/image/default_user_pic.gif?fs=0" alt="' + _uname + '" title="' + _uname + '">' +
	                    		'</a>' +
	                		'</div>' +
	                		'<div class="vcom_list_cont">' +
	                			'<em>' +
	                				'<a href="javascript:void(0);">' + obj.author + '</a>' +
	                			'</em>' +
	                			'<p>' + ifeng.comment.tools.simple.filterFace(obj.message) + '</p>' +
	                			'<div class="vcom_list_text"><span class="time">凤凰博客</span></div>' +
	                		'</div>' +
                		'</li>';
                    }else if(obj.pid>0){
                          $('#reply_succeed').show();
                           var _str = 
                    	'<li>' +
	                    	'<div class="vcom_list_pic">' +
	                    		'<a href="javascript:void(0);">' +
	                    			'<img style="width : 38px; height : 38px" src= "'+HTTP_FILES_ROOT+'/image/default_user_pic.gif?fs=0" alt="' + _uname + '" title="' + _uname + '">' +
	                    		'</a>' +
	                		'</div>' +
	                		'<div class="vcom_list_cont">' +
	                			'<em>' + 
	                				'<a href="javascript:void(0);">' + obj.author + '</a>' + 
	                			'</em>' +
	                			'<p>'+ '<a href="javascript:void(0);">' + _uname +'</a> 回复:  ' + ifeng.comment.tools.simple.filterFace(obj.message) + '</p>' +
	                			'<div class="vcom_list_text"><span class="time">凤凰博客</span></div>' +
	                		'</div>' +
                		'</li>';
                    }
                    
                    if ($('div.none-list-last').css('display') == 'block') {
                        $('.none-list').show();
                        $('div.none-list-last').hide();
                        $(_str).appendTo($('#vcom_list_ul'));
                    } else {
                    	$('#vcom_list_ul').prepend(_str);
                    }
                    $('#videocomment').find('div.vcom_key').html('0/1000');
                    $('#syn_btnico').find('a.publicBt').removeClass('publicBton');
                })();

                setTimeout(function() {
                    var _flag = ifeng.comment.reply.flag;
                    $('.vcom_succeed').hide();
                    if (_flag == 1) {
                        $('div.reply_box').remove();
                    } else if (_flag == 0) {
                        $('#comment_input').val('来说两句吧...');
                    }
                }, 2000);
            }
            var tag = $(ifeng.comment.reply.obj), _close = null;
            if (tag.attr('tag') == 'disable') {
                tag.attr('tag', 'enable');
                var n = 5;
                $('#examine_and_verify').show();
                _close = setInterval(function() {
                    if (n > 0) {
                        $('#examine_and_verify').find('span').html('评论审核中请稍后...');
                        n--;
                    } else {
                        $('#examine_and_verify').hide();
                        clearInterval(_close);
                    }
                }, 1000);
            }
        }
    };

    /**
     * 刷新功能块
     */
    ifeng.comment.push = {
        pageSize: 0,
        url: HTTP_BLOG_ROOT+'blog/article_comments_ajax.php?commenttype=comment_num',
        message: 0,
        type: null,
        param: function() {
            var _param = {};
            _param['job'] = 3;
            _param['format'] = 'json';
            _param['itemid'] = userinfo['itemid'];
            return _param;
        },
        get: function(m) {
            var _this = ifeng.comment.push;
            _this.message = m ? m : 1;
            var param = _this.param();
            $.ajax({
                url: _this.url,
                type: 'post',
                data: param,
                dataType: 'json',
                cache: false ,
                success: _this.success
            });

        },
        success: function(result) {
            var _this = ifeng.comment;
            if (_this.push.message == -1) {
                _this.count = result;
                if (result > 0) {
                    $('.none-list').show();
                    $('div.none-list-last').hide();
                }

                $('#vcom_new').hide();

                var _pageSize = (function(r) {
					var size = 1;
					if (r > 10) {
						size = (r % 10) > 0 ? parseInt(result / 10) + 1 : parseInt(result / 10);
					} else {
						size = 1;
					}
					return size;
				})(result);

                var uClass = '', uContent = '', arr = [];

                arr.push('<li class="vprev"><span>&lt;&lt;上一页</span></li>');
                if (_pageSize > 6) {
                    for (var i = 1; i <= 6; i++) {
                        if (i == 1) {
                            uClass = 'class="current"';
                            uContent = '<span>' + i + '</span>';
                        } else if (i == 6) {
                        	uContent = '<em>...</em>';
                        } else {
                            uClass = '';
                            uContent = '<a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a>';
                        }
                        arr.push('<li ' + uClass + '>' + uContent + '</li>');
                    }
                    arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + _pageSize + '); return false;">' + _pageSize + '</a></li>');
                    arr.push('<li class="vnext"><a href="javascript:void(0);" onclick="ifeng.comment.paging.getNext();return false;">下一页&gt;&gt;</a></li>');
                } else if (_pageSize == 1) {
                    arr.push('<li class="current"><span>1</span></li>');
                    arr.push('<li class="vnext"><span>下一页&gt;&gt;</span></li>');
                } else {

                    for (var i = 1; i <= _pageSize; i++) {
                        if (i == 1) {
                            arr.push('<li class="current"><span>' + i + '</span></li>');
                        } else {
                            arr.push('<li><a href="javascript:void(0);" onclick="ifeng.comment.paging.getPage(0, ' + i + '); return false;">' + i + '</a></li>');
                        }
                    }
                    arr.push('<li class="vnext"><a href="javascript:void(0);" onclick="ifeng.comment.paging.getNext();return false;">下一页&gt;&gt;</a></li>');
                }

                var paging = $('div.vcom_pages');
                paging.find('ul').html(arr.join(''));

                var _sPage = result == 0 ? '0' : '1';
                var countStr = result > 10 ? '共' + result + '条 / 第1-10条' : '共' + result + '条 / 第' + _sPage + '-' + result + '条';
                paging.find('span.tips').html(countStr);
//                $('#comment_video_number').html('(' + result + ')');
                _this.list.get(); // 第一次加载和有新数据后请求.
                // 间隔请求
                _this.push.type = setInterval(_this.push.get, 600000);
            } else {
                if (_this.count != result) {
                    _this.count = result;
//                    $('#comment_video_number').html(_this.count);
                    $('#vcom_new').show();
                    clearInterval(_this.push.type);
                }
            }

        }
    };

    ifeng.comment.bindStatus = {
        url: 'http://comment.ifeng.com/api/getUserSns.php',
        status: null,
        get: function() {
            var _this = ifeng.comment.bindStatus;
            $.ajax({
                url: _this.url,
                dataType: 'jsonp',
                success: _this.success
            });
        },
        success: function(obj) {
            ifeng.comment.bindStatus.status = obj;
            if(obj.code == '1') {
                var _obj, bindObj, _type = '', objData = obj.data;
                bindObj = $('#syn_btnico').find('div.tlayer li'); // 已有绑定商
                for(var o in objData) {
                	_obj = objData[o], _type = _obj.type;

                	if(_type == 'sina') {
                		$.each(bindObj, function(i, s) {
                			if($(s).attr('title') == 'sina') {
                				if(_obj.p == '1') $(s).addClass('current');
//                				$(s).find('a').removeClass('presina').addClass('presina_done');
                			}
                		});
                	}

                }

            } else if (obj.code == '0') {

            } else {

            }
        }
    };

    ifeng.comment.init();
})(jQuery);

function ifengcmtcallback(result) {
    ifeng.comment.push.success(result);
}

(function($) {
    $.fn.extend({
        insertAtCaret: function(myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    });
})(jQuery);
