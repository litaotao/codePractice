//弹窗下载
(function($){
	$(function(){

		// Dialog
		$('#dialog').dialog({
			autoOpen: false,
			width: 200,
			modal: true,
			buttons: {
				"确认": function() {
					var dia = this;
					$.ajax({
						type:'POST',
						url:'/ext/seccode_att.php',
						data:{'com_code':$('#input_code').val()},
						dataType:'html',
						success:function(res) {
							if ('yes' == res) {
								window.location = ('/ext/down_att.php?aid='+ $('#aid').val() + '&code=' + $('#input_code').val());
								$(dia).dialog("close");
							} else {
								alert('验证码错误！');
							}
						}

					});
				}

			},
			resizable:false
		}).dialog({
			open: function() {
				$('#imgcode').click();
			}
		});


		// Dialog Link
		$('.dialog_link').click(function(){

			$('#aid').val($(this).attr('aid'));//附件标识
			$('#dialog').dialog('open');
			return false;
		});

		//图片验证码绑定
		$('#imgcode').bind('click', function(){
			$(this).attr('src', '/ext/seccode_att.php?rnum=' + Math.random());
		});

	});
})(jQuery);