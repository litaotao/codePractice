$(document).ready(function(){
			var $i_dy = $('#dy_statc .i_dy');
			var $s_dy = $("#dy_statc .s_dy");
		        var $wechatid = $i_dy.attr("data-wechatid");
		        var $aid = $(".stow .favarticle").attr("data-articleid");
			$.ajax({url:"/plus/ajax_do.php",data:{'wechatid' : $wechatid , 'do' : 's' , 'aid' : $aid},success:function(result){
				var data = JSON.parse(result);
				if(data.userinfo != -1){
					$("#login_statc").html(data.userinfo);
                    			$("#guestbook .name").html(data.userinfo);
                    			$("#guestbook .tximg").html("<img src="+data.userface+">");
                    			$("#guestbook .ds-sync").html(data.fxbtm);
			        	$("#guestbook .pl_con span").hide();
				}
				if(data.subscribe == 2){
					$i_dy.hide();
					$s_dy.show();
				}else if(data.subscribe == -2){
					$i_dy.show();
					$s_dy.hide();
				}
				if(data.stow == 3){					
					$(".stow .favarticle").hide();
					$(".stow .unfavarticle").show();
				}else if(data.stow == -3){					
					$(".stow .favarticle").show();
					$(".stow .unfavarticle").hide();
				}
			}});
			$(".stow .favarticle").bind("click", function(){					
					$.ajax({url:"/plus/ajax_do.php",data:{'wechatid' : $wechatid , 'do' : 'stow' , 'aid' : $aid},success:function(result){
						var data = JSON.parse(result);
						if(data.stow == 3){
							$(".stow .favarticle").hide();
							$(".stow .unfavarticle").show();
						}else if(data.stow == -3){
							$(".stow .favarticle").show();
							$(".stow .unfavarticle").hide();
						}
						if(data.userinfo== -1){
				  			$.openBox("login",this);
				  		}					
					}});				  	
				});
				$("#dy_statc .i_dy").bind("click", function(){					
					$.ajax({url:"/plus/ajax_do.php",data:{'wechatid' : $wechatid , 'do' : 'subscribe' , 'aid' : $aid},success:function(result){
						var data = JSON.parse(result);
						if(data.subscribe == 2){							
							$('#dy_statc .i_dy').hide();
							$("#dy_statc .s_dy").show();
						}else if(data.subscribe == -2){
							$('#dy_statc .i_dy').show();
							$("#dy_statc .s_dy").hide();
						}
						if(data.userinfo== -1){
				  			$.openBox("login",this);
				  		}						
					}});			  	
				});
		  });
		  
		  
function ResizeImages()
{
   var myimg,oldwidth,oldheight;
   var maxwidth=600;
   var maxheight=880
   var imgs = document.getElementById('article').getElementsByTagName('img');   
   for(i=0;i<imgs.length;i++){
     myimg = imgs[i];
     //myimg.style.margin = '0 auto';
     //myimg.style.display ='block';
     //myimg.removeAttribute("style");
     imgsrc = myimg.getAttribute("src");
     if(!imgsrc){
     	imgdatasrc = myimg.getAttribute("data-src");
     	if(!imgdatasrc){
     		imgdatasrc2 = myimg.getAttribute("date-");
     		myimg.setAttribute('src',imgdatasrc2);	
     	}else{
     		myimg.setAttribute('src',imgdatasrc);
     	}
     }
     if(myimg.width > myimg.height)
     {
         if(myimg.width > maxwidth)
         {
            oldwidth = myimg.width;
            //myimg.height = myimg.height * (maxwidth/oldwidth);
            myimg.width = maxwidth;
         }
     }/*else{
         if(myimg.height > maxheight)
         {
            oldheight = myimg.height;
            myimg.width = myimg.width * (maxheight/oldheight);
            myimg.height = maxheight;
         }
     }*/
   }
   
   function lastload(){        	
        	var str ='';
        	str += '<style type="text/css">';
		str += 'html #hm_t_46613 .hm-t-container{width:670px;}';
		str +='html #hm_t_46613 .hm-t-container{border-color:#e5e5e5;}';
		str +='html #hm_t_46613 .hm-t-header{border-bottom:1px dashed #e5e5e5;}';;
		str +='html #hm_t_46613 .hm-t-header{color:#262626;background-color: #fff;font-size: 22px;font-weight:normal;}';
		str +='html #hm_t_46613 .hm-t-carousel-digit{width:24px;height:24px;line-height:24px;background-color: #e5e5e5;}';
		str +='</style>';
        	$("body").append(str);	
        }
     lastload()
   
}



//$(function(){
//	var navtop = $(".haokui13").offset().top+$(".haokui13").height();
//				$(window).scroll(function(){				   
//				    var  sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;					
//				    if(sTop >= navtop ){
//					   $(".haokuacr1").css({ "position": "fixed", "top": "60px" });
//					}else{
//					   $(".haokuacr1").css({ "position": "", "top": "0" });
//				    }
//     				});
//
//})
     				
     	$(window).load(function() {
     		var hidetop = $(".haokuac4").offset().top;
				$(window).scroll(function(){				   
				    var  sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
					if(sTop >= hidetop-360){
					   $(".haokcr15").hide();
					}else{
					   $(".haokcr15").show();
				    }
     				});
     		$(".jjhg img").attr("src",'/images/FkweETXEvQvChyRynxky.jpg');
     		
	     	$("iframe").each(function(i){
		     //$(this).parent().addClass("ifm_center");
		     $src = $(this).attr("src");
		     if($src !== undefined){
		     	$newstr = $src.replace(/width=\d+/,"width=auto");
		     	$(this).attr({width:'100%',Height:'336',src:$newstr});
		     }	     
		     if($src === undefined){
		     	$datasrc = $(this).attr("date-src");
		     	if($datasrc === undefined){
		     		$imgsrc2 = $(this).attr("date-");
		     		$(this).attr("src",$imgsrc2);
		     		$imgsrc2 = $imgsrc2.replace(/width=\d+/,"width=auto");
		     		$(this).attr({width:'100%',Height:'336',src:$imgsrc2});
		     	}else{
		     		$(this).attr("src",$datasrc);
		     		$datasrc = $datasrc.replace(/width=\d+/,"width=auto");
		     		$(this).attr({width:'100%',Height:'336',src:$datasrc});
		     	}	
		     }
		 });
        });
        
        
        
