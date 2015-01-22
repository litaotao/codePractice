//内页
$(".rich_media_tool span").hover(function() {
	$(this).addClass("on");
}, function() {
	$(this).removeClass("on");
});

$(".activity-info .like b i").hover(function() {
	$(this).css("opacity",0.8);
}, function() {
	$(this).css("opacity",1);
});

jQuery.fn.extend({
	enter: function(fn){
		$(this).bind('keydown',function(event){var e = event || window.event;if(!e.ctrlKey && e.keyCode ==13){if(typeof(fn)!='undefined')fn.call(this)}});
		return this;
	}
});

function formattime(unixtime) {  
    var unixTimestamp = new Date(unixtime* 1000);
	var str = unixTimestamp.getFullYear().toString();
	str += '-' + (unixTimestamp.getMonth() < 9 ? '0'+(unixTimestamp.getMonth()+1).toString() : (unixTimestamp.getMonth()+1).toString());
	str += '-' + (unixTimestamp.getDate() <= 9 ? '0'+unixTimestamp.getDate().toString() : unixTimestamp.getDate().toString());
	str += ' ' + (unixTimestamp.getHours() <= 9 ? '0'+unixTimestamp.getHours().toString() : unixTimestamp.getHours().toString());
	str += ':' + (unixTimestamp.getMinutes() <= 9 ? '0'+unixTimestamp.getMinutes().toString() : unixTimestamp.getMinutes().toString());
    return str;
}

function changeimg() {
	$("#captcha").attr("src","/verify?tag=review&t=" + new Date().getTime());
}

function submitform() {
  $.post("/index.php?r=wx/addreview", { aid: aid, pid: pid, review: $("textarea").val(), verify: $("#verify").val() },
	function(re){
		if(re==-1){alert("评论失败")}else if(re==0){$("#verify").focus();alert("验证码错误")}else{alert("评论成功");$("textarea").val("");$("#pid").val(0);}
		$("#verify").val("");
		changeimg();
		loading(1)
  });
}

function showform(id) {	
	var str='<div class="form-weixin"><div style="border-bottom:solid 1px #ccc"><textarea id="review"></textarea></div><div class="clearfix" style="padding:4px"><div class="fr" style="width:auto"><button type="submit" class="btn" onclick="submitform()">提 交</button></div>';
    str+='<div class="fl"><input type="text" id="verify" maxlength="4" style="width:90px" placeholder="验证码"/> <img src="/verify?tag=review" onclick="changeimg()" id="captcha" style="display:inline-block;vertical-align:middle;width:78px;height:30px;border:1px solid #666"> <a onclick="changeimg()" title="点击刷新验证码">刷新验证码</a></div></div></div>';
	$(".form-weixin").remove();
	if(pid<1){$("#btn-fastreply").html("快速回复").attr("onclick","showform(0)");}else{$("#a-"+pid).html("[回复]").attr("onclick","showform("+pid+")");}	
	if(id<1){
		$("#btn-fastreply").html("关闭回复").attr("onclick","hideform(0)");
		$("#area-comment-form").html(str);
	}else{
		$("#a-"+id).html("关闭回复").attr("onclick","hideform("+id+")");
		$("#c-"+id).append(str);
	}
	$("#verify").enter(function(){submitform()});
	if(id>-1)$("textarea").focus();
	pid = (id > -1) ? id : 0; //引用ID
}

function hideform(id) {
	$(".form-weixin").remove();
	if(id==0){
		$("#btn-fastreply").html("快速回复").attr("onclick","showform(0)");
	}else{
		$("#a-"+id).html("[回复]").attr("onclick","showform("+id+")");
}}

function showewm(){ $(".qr_code_pc_inner").show() }

function hideewm(){ $(".qr_code_pc_inner").hide() }
	
function loading(page) {
  $.ajax({
  type:"get",
  url:"/index.php?r=wx/getreview",
  data:{'aid':aid, 'page':page},
  dataType: "jsonp",
  success:function(re){
  if (re != null) {
  $('#area-comment-inner').html('');
  var user='';
  for(var i = 0; i<re.data.length; i++){
	  $('#area-comment-inner').append('<div class="item-comment-divider"></div>');
	  
	  if(re.data[i].quote!=''){
		  var str1='',str2='';
		  for(var j = 0; j < re.data[i].quote.length; j++){
			user=(re.data[i].quote[j].user!=0)?re.data[i].quote[j].user:"匿名";
			str1+='<div class="item-comment item-comment-quote">';
			str2+='<div class="content-comment">'+re.data[i].quote[j].content+'</div>';
			str2+='<div class="author-comment"><span class="index-comment" title="发表于'+formattime(re.data[i].quote[j].time)+'">#'+re.data[i].quote[j].story+'</span> <a class="name">'+user+'</a><p class="floor-comment">'+(j+1)+'</p></div></div>';

		  }
	  $('#area-comment-inner').append(str1+str2);
	  }
	    
	  user=(re.data[i].user!=0)?re.data[i].user:"匿名";
	  $('#area-comment-inner').append('<div id="c-'+re.data[i].id+'" class="item-comment item-comment-first"><div class="area-comment-left"><a class="thumb"><img class="avatar" src="/assets/images/avatar.png"></a></div><div class="area-comment-right"><div class="author-comment last" data-uid="402860"><span class="index-comment">#'+re.data[i].story+' </span> <a class="name">'+user+'</a> 发表于 <span class="time">'+formattime(re.data[i].time)+'</span> <a id="a-'+re.data[i].id+'" onclick="showform('+re.data[i].id+')">[回复]</a><p class="floor-comment">6</p> </div> <div class="content-comment">'+re.data[i].content+'</div></div></div>');
  }
  var pagestr='<div class="page clearfix"><ul>';
  if(page==1){pagestr+='<li class="disabled"><a>|&lt;</a></li><li class="disabled"><a>&lt;&lt;</a></li>';}else{pagestr+='<li><a href="javascript:loading(1)">|&lt;</a></li><li><a href="javascript:loading('+(page-1)+')">&lt;&lt;</a></li>';}
  
  for (var i = 1; i <= re.maxpage; i++){
	  if(i==page){pagestr+='<li class="on"><a>'+i+'</a></li>';}else{pagestr+='<li><a href="javascript:loading('+i+')">'+i+'</a></li>';}	  
  }
  if(page==re.maxpage){pagestr+='<li class="disabled"><a>&gt;&gt;</a></li><li class="disabled"><a>&gt;|</a></li>';}else{pagestr+='<li><a href="javascript:loading('+(page+1)+')">&gt;&gt;</a></li><li><a href="javascript:loading('+re.maxpage+')">&gt;|</a></li>';}  
  pagestr+='</ul></div>';  
  $('#area-comment-inner').append(pagestr);
  }}
  });
}
function dig_article(id,num){
  $.ajax({
	type:"get",
	url:"/click?callback=?",
	data:{mode:3,id:id},
	dataType: "jsonp",
	success:
	function(re) {
		if(re!=-1)
		$('#link_dig').html("<i></i>"+(num<100000?parseInt(num+1):"100000+")).addClass("link_digs");
		}
  });
}

window.onload=function(){
  var obj = document.getElementById("img-content").getElementsByTagName("img");
  for(i=0;i<obj.length;i++){	  
	obj[i].onload=function(){
	  if(this.width>670){
		 this.width = 670
	  }
	}
	if(obj[i].src=="" && obj[i].getAttribute("data-src") !=""){
		obj[i].src = obj[i].getAttribute("data-src")
	}
	if(obj[i].style.visibility != ""){
	   obj[i].style.visibility =""
	}
	if(obj[i].style.width != ""){
	   obj[i].style.width =""
	}
	if(obj[i].getAttribute("data-w")>0){
	   obj[i].width = obj[i].getAttribute("data-w")
	}
	if(obj[i].width>670){
	   obj[i].width = 670
	}	
  }
  var video = document.getElementsByTagName("video");
  for (var i = 0; i < video.length; i++) {
	  var src = video[i].getAttribute("data-src");	  
	  getVideo(video[i], src);	  
  }
  showform(-1);
  loading(1);
  setTimeout(function(){
  if(document.getElementById("right").clientHeight-document.getElementById("left").clientHeight>470){
  var hot=document.getElementById("hot");
  hot.parentNode.removeChild(hot);
  }else if(document.getElementById("right").clientHeight-document.getElementById("left").clientHeight>270){
  var news=document.getElementById("news");
  news.parentNode.removeChild(news);  
  }else if(document.getElementById("right").clientHeight-document.getElementById("left").clientHeight>30){
  document.getElementById("left").style.height=document.getElementById("right").clientHeight-30+"px"
  }
  } , 999)
}

window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"排骨网","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];