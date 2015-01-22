var setAmount={
		min:1,
		max:999,
		reg:function(x){
			return new RegExp("^[1-9]\\d*$").test(x);
		},
		amount:function(obj,mode){
			var x=$(obj).val();
			if (this.reg(x)){
				if (mode){
					x++;
				}else{
					x--;
				}
			}else{
				alert("请输入正确的数量！");
				$(obj).val(1);
				$(obj).focus();
			}
			return x;
		},
		reduce:function(obj){
			var x=this.amount(obj,false);
			if (x>=this.min){
				$(obj).val(x);
			}else{
				alert("商品数量最少为"+this.min);
				$(obj).val(1);
				$(obj).focus();
			}
		},
		add:function(obj){
			var x=this.amount(obj,true);
			if (x<=this.max){
				$(obj).val(x);
			}else{
				alert("商品数量最多为"+this.max);
				$(obj).val(999);
				$(obj).focus();
			}
		},
		modify:function(obj){
			var x=$(obj).val();
			if (x<this.min||x>this.max||!this.reg(x)){
				alert("请输入正确的数量！");
				$(obj).val(1);
				$(obj).focus();
			}
		}
}

// 显示表单提交成功的信息
function showSuccessMessage(text)
{
	//  top-left, top-right, bottom-left, bottom-right, center
	if($.fn.jGrowl){
		$.jGrowl("<i class='glyphicon glyphicon-ok'></i> "+text, { 
			theme: 'alert alert-success pull-left',
			position:'center',
			closeTemplate:''
		});
	}
	else{
		alert(text);
	}
	
	return true;
}

// 显示错误信息

function showErrorMessage(text)
{

	if($.fn.jGrowl){
		$.jGrowl("<i class='glyphicon glyphicon-remove'></i> "+text, {
			theme: 'alert alert-warning pull-left',// danger,
			position:'center',
			closeTemplate:''
		});
	}
	else{
		alert(text);
	}
	return true;
}

function page_loaded()
{
	$('.popover-trigger').popover();

	$('.ui-portlet-content').each(function(){
		if(jQuery.trim($(this).html())==''){
			$(this).parent('.ui-portlet').hide();
		}
	});
	//$(".alert").alert().append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
}

$(document).ready(function() {
	page_loaded();	
});

function detectCapsLock(e, obj) {
	var valueCapsLock = e.keyCode ? e.keyCode : e.which;
	var valueShift = e.shiftKey ? e.shiftKey : (valueCapsLock == 16 ? true : false);
	obj.className = (valueCapsLock >= 65 && valueCapsLock <= 90 && !valueShift || valueCapsLock >= 97 && valueCapsLock <= 122 && valueShift) ? 'form-control clck txt' : 'form-control txt';
	$(obj).blur(function () {
		$(this).className = 'form-control txt';
	});
}


// 显示表单验证错误的信息
function showValidateErrors(request,model,suffix)
{
	var tempmodel = model;
	var field_name = '';
	var error_message = '';
	var firsterror = true;
	for(var i in request)
	{
		//alert(i);
		tempmodel = model;
		field_name =i;
		var split_str=i.split('.');
		if(split_str.length>1)
		{
			tempmodel = split_str[0];
			field_name = split_str[1];
		}
		// 首字母大写，如将task_id,替换成Task_id
		var field = field_name.replace(/\b\w+\b/g, function(word) {
           return word.substring(0,1).toUpperCase( ) +
                  word.substring(1);
         });
         // 替换下划线 ，并使字符串为驼峰型。如将Task_id,替换成TaskId
         field = field.replace(/\_\w/g, function(word) {
           return word.substring(1,2).toUpperCase( );
         });
         //alert('#error_".$options['model']."'+field);
		
		if(firsterror)
		{
			window.location.hash = '#'+tempmodel+field+suffix;
			firsterror = false;
		}
		$("#error_"+tempmodel+field+suffix).remove();
		$('#'+tempmodel+field+suffix).parent('div:first').append("<span id='error_"+tempmodel+field+suffix+"' name='error_"+tempmodel+field+suffix+"' class='ui-state-error ui-corner-all' style='position: absolute;'><span class='ui-icon ui-icon-alert'></span>"+request[i]+"</span>");
		var txt = $('label[for="'+tempmodel+field+suffix+'"]').html();
		//alert(txt);
		error_message +=txt+':'+ request[i]+"<br/>";
	}
	if(error_message!='')
	{
		show_message(error_message,8);
	}
}
function addNewCrawlRegular()
{
	var field = $('.model-schema-list').val();
	$('.model-schema-area').before($('<div class="regexp-add"><label for="CrawlRegexp'+field+'">Regexp '+field+'</label><textarea id="CrawlRegexp'+field+'" cols="60" rows="2" name="data[Crawl][regexp_'+field+']"></textarea></div>'));
}
var AjaxHelper={
	dialog_open:false,
	open_help: function(){
		$('#ajax_doing_help').html('<img src="/img/ajax/circle_ball.gif" /> 正在提交...');
		$('#ajax_doing_help').dialog({width: 650,
			close: function(event, ui) {
				$('#invite-user-html').hide().appendTo('body');
			}
		});
		this.dialog_open=true;
	},	
	has_init_tab:false,
	friends_tab:null		
}


/* 订单ajax操作提示信息  开始*/
//显示提示信息
function showAlert(info,obj,infoSign)
{
   if($('#'+infoSign).size()>0){return;}
   var newd=document.createElement("span");
   newd.id=infoSign;
   newd.className='ui-state-error';
   newd.innerHTML=info;
   $(obj).append($(newd));
}
//删除提示信息
function removeAlert(infoSign)
{
   $(infoSign).remove();
}

function clearSubmitError(obj){
	$(obj).parent().find('.errorInfo').remove();
}
function clearWaitInfo(obj){
	if(obj){
		$(obj).parent().find('.waitInfo').remove();
	}
	else{
		$(".waitInfo").remove();
	}
}

function showWaitInfo(info,obj){
	try{
		if(obj==null)return;
		clearWaitInfo();
		var newd=document.createElement("span");
		newd.className='waitInfo';
		newd.id='waitInfo';
		newd.innerHTML=info;
		obj.parentNode.appendChild(newd);
	}catch(e){}
}

function showWaitInfoOnInner(info,obj){
	try{
		if(obj==null)return;
		clearWaitInfo();
		var newd=document.createElement("span");
		newd.className='waitInfo';
		newd.id='waitInfo';
		newd.innerHTML=info;
		obj.innerHTML='';
		obj.appendChild(newd);
	}catch(e){}
}



function upload_multi_file(file, serverData){
	try {
		var progress = progress_list[file.id];
		progress.setComplete();
		if (serverData === " ") {
			this.customSettings.upload_successful = false;
		} else {
			var data=eval("(" + serverData + ")");
			if(data.status==1){
				this.customSettings.upload_successful = true;
				var filesize = '';
				if(data.size/1024/1024 >1){
					
					filesize = Math.round(data.size/1024/1024*100)/100 +'MB';
				}
				else if(data.size/1024 >1){
					filesize = Math.round(data.size/1024*100)/100 +'KB';
				}
				else{
					filesize = data.size + 'B';
				}
				
				$("#fileuploadinfo_"+data.fieldname+"_"+data.data_id).append('<div class="col-md-4  upload-fileitem">'+
		                 ' <a target="_blank" href="'+ BASEURL +'/uploadfiles/download/'+data.id+'" class="btn btn-success "><i class="glyphicon glyphicon-cloud-download"></i><div>'+data.name+'</div><small>File Size: '+ filesize +'</small></a>'+
		                 '<i class="glyphicon glyphicon-remove remove" data-id="'+data.data_id+'" title="Remove"></i>'+
			             '</div>');
			}
		}
	} catch (e) {
		alert(serverData);
	}
}

/* 订单ajax操作提示信息  结束 */


function validateForm(form){
	
	
	if(typeof($(form).data('noajax'))!='undefined' || typeof($(form).attr('target'))!='undefined' || $(form).attr('method')=='get'|| $(form).attr('method')=='GET'){
	      return true; // 不需要绑定ajax提交事件，则跳过
    }
	
	if($.fn.validate){
		
		jQuery.validator.addMethod("biggerThen", function(value, element) {
			var biggerThan  = $(element).attr('biggerThen');
 			  return value > $(biggerThan).val();
			}, "Please check the value is in the right range");
		
		
		var validator = $(form).validate({
	        errorElement : 'span',
	        errorClass : 'help-block',
	        focusInvalid : true,        
	        highlight : function(element) {
	            $(element).closest('.form-group').addClass('has-error');
	        },
	        success : function(label) {
	            label.closest('.form-group').removeClass('has-error');
	            label.remove();
	        },
	        errorPlacement : function(error, element) {
	            element.parent('div').append(error);
	        },
	        submitHandler : function(form) {
	        	if ($(form).validate().form()) {
	        		if(typeof($(form).data('noajax'))!='undefined' || typeof($(form).attr('target'))!='undefined' || $(form).attr('method')=='get'|| $(form).attr('method')=='GET'){
	        		      return true; // 不需要绑定ajax提交事件，则跳过
	        	    }
	        		else{
	        			ajaxSubmitForm(form);
	        		}
	        		//form.submit();    	
	        	}
	        }
	    });
		
		/*$(form).keypress(function(e) {
	        if (e.which == 13) {
	            if ($(this).validate().form()) {
	                $(this).submit();
	            }
	            return false;
	        }
	    });*/
		
		return validator;
	}
	
}


$(function(){
	validateForm('form');
//	jGrowl test
//	$.jGrowl("<i class='glyphicon glyphicon-ok'></i> test", { 
//		sticky:true,
//		closeTemplate:'',
//		theme: 'alert alert-success pull-left',
//		position:'center'
//	});
	//站内查询
//	$("input[type=text]").focusin(function(){$( this ).removeClass( "ui-state-default");
//		$( this ).addClass( "ui-state-focus");
//	});
//	$("input[type=text]").focusout(function(){$( this ).removeClass( "ui-state-focus");
//		$( this ).addClass( "ui-state-default");
//	});
	/* 菜单开始 */
	$('.ui-navi li').hover(function(){
		$(this).children(".ui-drop-menu:first").show();
	},function(){
		$(this).children(".ui-drop-menu:first").hide();
	});
	
	if(sso.is_login()){
		getUnreadMsgNum();
	}
	//二级菜单显示隐藏	
	$(".ui-sidemenu li").hover(
            function () {
                var li_width = $(this).width();
                var li_offset = $(this).offset();
                $(this).children("a").addClass( "ui-state-default");
                var submenu = $(this).children(".ui-secondmenu");
                if(li_offset.left>$(window).width()/2){
                    submenu.css('left',-submenu.width()+2).show();
                }
                else{
                    submenu.css('left',li_width-2).show();
                }
                 var offset = submenu.offset();
                if(li_offset.top-$(window).scrollTop()+submenu.height()>$(window).height()){
                    if(submenu.height() < $(window).height()){
                        // 子菜单的高度小于window的高度时，子菜单从window的底部开始显示
                        submenu.css('top',$(window).height()-2-li_offset.top -submenu.height()+$(window).scrollTop() );
                    }
                    else{
                        // 子菜单的高度大于window的高度时，从window顶部开始显示
                        submenu.css('top',-li_offset.top+$(window).scrollTop()+2);
                    }
                }
            },
            function(){
                $(this).children("a").removeClass( "ui-state-default");
                $(".ui-secondmenu",this).hide();
            });
	/* 菜单结束 */
	
	/*
	$('.pagelink a').live('click',function(){
		$linkobj = this;
		
		var region_obj = $(this).parents('.ui-portlet-content').eq(0);
		// 加载region分页的内容
		var page_url = this.href;
		var portletid = region_obj.parents('.ui-portlet').eq(0).attr('id');
		
		if(portletid){
			region_obj.load(page_url+' #' + portletid,{},function(){			
				var offset = region_obj.offset();
				$('html,body').animate({ scrollTop: offset.top },1000);			
				
				var html = region_obj.find('.ui-portlet-content').html();
				region_obj.html(html);
				
				if(!$.browser.msie){
					region_obj.find('img[original]').lazyload({
			            placeholder : BASEURL+"/img/grey.gif",
			            effect      : "fadeIn" ,threshold : 200                 
			        });
				}
				loadStatsData();
				
				
				var url_info = page_url.split('/');	
				var page = $($linkobj).html();
				var hash = window.location.hash;
				hash = hash.replace('page_'+portletid+'=','page=').replace(/page=\d+/,'');								
				if(hash=='#'||hash=='')	{
					hash='#page_'+portletid+'='+page;
				}
				else{
					hash = hash+'&page_'+portletid+'='+page;
					hash=hash.replace('&&','&');
				}
				page_hash.updateHash(hash, false);
				
			});	
		}
		return false;
	});*/
});

/* UItoTop jQuery Plugin 1.2 | Matt Varone | http://www.mattvarone.com/web-design/uitotop-jquery-plugin */
(function($){$.fn.UItoTop=function(options){var defaults={text:'To Top',min:200,inDelay:600,outDelay:400,containerID:'toTop',containerHoverID:'toTopHover',scrollSpeed:1200,easingType:'linear'},settings=$.extend(defaults,options),containerIDhash='#'+settings.containerID,containerHoverIDHash='#'+settings.containerHoverID;$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');$(containerIDhash).hide().on('click.UItoTop',function(){$('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);$('#'+settings.containerHoverID,this).stop().animate({'opacity':0},settings.inDelay,settings.easingType);return false;}).prepend('<span id="'+settings.containerHoverID+'"></span>').hover(function(){$(containerHoverIDHash,this).stop().animate({'opacity':1},600,'linear');},function(){$(containerHoverIDHash,this).stop().animate({'opacity':0},700,'linear');});$(window).scroll(function(){var sd=$(window).scrollTop();if(typeof document.body.style.maxHeight==="undefined"){$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
if(sd>settings.min)
$(containerIDhash).fadeIn(settings.inDelay);else
$(containerIDhash).fadeOut(settings.Outdelay);});};})(jQuery);


$(function(){
	// jQuery UItoTop
	$().UItoTop({ easingType: 'easeOutQuart' });
})