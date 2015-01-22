function addFavorite2() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
  try{
   window.external.addFavorite(url, title);
  }catch(e){
   alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
  }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
  alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

$(document).ready(function(){
	$.ajax({url:"/plus/ajax_do.php",success:function(result){
		var data = JSON.parse(result);
		if(data.userinfo != '-1'){
			$("#login_statc").html(data.userinfo);
			$("#scroll_login_statc").html(data.userinfo);			
		}
	}});
	$typeid = $("#dy_arctype").attr("data-type");
	$.ajax({url:"/plus/type_subscribe.php",data:{'typeid' : $typeid , 'do' : 's'},success:function(data){
		if(data == '-3'){				
			$("#dy_arctype").html('已订阅+');
			$("#dy_arctype").attr("href","/member/type_subscribe/");
		}						
	}});
	
	$("#dy_arctype").bind("click", function(){
					$typeid = $(this).attr("data-type");		
					$.ajax({url:"/plus/type_subscribe.php",context: this,data:{'typeid' : $typeid , 'do' : 'i'},success:function(data){
						if(data == -3){					
							$(this).html('已订阅+');
							$(this).attr("href","/member/type_subscribe/");
						}
						if(data == -1){
				  			$.openBox("login",this);
				  		}						
					}});			  	
				});

    $(window).scroll(function(){
	    var navtop = $(".haokuit3").offset().top;
	    var  sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
	    if(sTop >= navtop ){
		   $("#footernav").show();
		}else{
		   $("#footernav").hide();
	    }
	    
	   /* var hotarc = $(".haoklir5").offset().top;
	    if(sTop >= hotarc ){
		 $(".haoklir5 .demo1").css({position: "fixed",top:"60px"});
	    }else{
	   	 $(".haoklir5 .demo1").css("position","");
	    }
	  */  
	     if(sTop >= 500){
		   $("#rt_tips").show();
	     }else{
		   $("#rt_tips").hide();
	     }
     });
     $("#rt_tips .gotop").bind("click", function(){
	          $("html,body").animate({scrollTop:0},800);
     });
     
     $("#rt_tips .gzhk").hover(function(){
     		 $("#rt_tips .gzhk img").animate({
     		    height: "102px",
		    width: "102px"		    
		  }, 1000 );
     	},function(){
		
		  $("#rt_tips .gzhk img").stop(true,false).animate({
		    height: "0",
		    width: "0"		    
		  }, 1000,'swing');		  
     });
     
});	  