$(document).ready(function()
		{
/* version 1
			$("a.next").mouseover(function(){
				$("#jump").css('display', 'inline-block');
			});

			$("div.content-page").mouseleave(function()
			{
				$("#jump").css('display', 'none');
			});

			$("#goto").click(function(){
				var pages = $("#pages").val();
				location.href = "http://www.zreading.cn/page/"+pages;
			});
*/
			$("a.jump").mouseover(function(){
				$("#jump").css('display', 'inline');
			});

			$("a.jump").mousedown(function(){
				var pages = $("#pages").val();
				location.href = "http://www.zreading.cn/page/"+pages;
			});

			$("div.content-page").mouseleave(function()
			{
				$("#jump").css('display', 'none');
			});




		});