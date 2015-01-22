	function vote(user, id, htmlid, md5, value){
		$.ajax({
			url	:rooturl+"/view/vote",
			type	:"GET",
			dataType:"json",
			data	:"id="+id+"&md5="+md5+"&values="+value,
			success	: function(data){
				if (data.status=='success'){
					if(value==-10){
							$('#xvote-'+htmlid).html("<span>已踩</span>");	
							$('#cai'+htmlid).html("<label style='color: #000'>已踩</label>");	
					}else{
						$('#xvotes-'+htmlid).html(data.value);	
						$('#xvote-'+htmlid).html("<span>已投票</span>");	
					}
				}else if (data.status=='nologin'){
					alert("请先登录！");
				}else if (data.status=='false'){
					alert(data.message);
				}
			}
		});
	}

function show_hide_user_links(thediv,thisx,fav,url){
	$(thediv).show();
	$(thisx).hide();
	$(fav).show();	

	$.ajax({
		url :rooturl+url,
		type :"GET"
	});		
}