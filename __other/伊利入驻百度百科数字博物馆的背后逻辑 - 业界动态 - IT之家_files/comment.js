$(document).ready(function () {
    $("#btnComment").click(function () {
        postdata();
    });
    $("#btnReplyComment").click(function () {
        self.parent.tb_remove();
        postdata();
    });
});


 function postdata(){
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "newsid=" + $("#newsid").val() + "&commentNick=" + escape($("#commentNick").val()) + "&commentContent=" + escape($("#commentContent").val()).replace(/\+/g, '%2B') + "&parentCommentID=" + $("#parentCommentID").val() + "&txtCode=" + $("#txtCode").val() + "&type=comment",
         success: function (msg) {

             var messageobj = GetObj('commentMessage');

             messageobj.innerHTML = '<span style="color:red">' + msg + '</span>';
             if (msg.indexOf("评论成功") >= 0) {
                 self.parent.LoadData();
                 var comment = GetObj("commentContent");
                 comment.value = '';

             }
         }
     });
 }

 function GetObj(objName) {
     if (document.getElementById) {
         return eval('document.getElementById("' + objName + '")');
     } else if (document.layers) {
         return eval("document.layers['" + objName + "']");
     } else {
         return eval('document.all.' + objName);
     }
 }

 function ShowReplay_pre(commentid,newsid) {

     var ReplyDiv = GetObj('Reply' + commentid);
     ReplyDiv.style.display = 'block';


     if (ReplyDiv.innerHTML.length == 0) {

            replydivHtml = '  <div class="reply_post_comment">';
            replydivHtml += '	<a href="javascript:void(0)" class="close_comm" onclick="CloseReplay(' + commentid + ')"></a>';
            replydivHtml += '  <div class="add_comm">';
			replydivHtml += '  <textarea name="txtBody" id="commentContent' + commentid + '" cols="60" rows="5" class="ipt-txt" onfocus="if(this.value==\'IT之家有您参与更精彩！\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'IT之家有您参与更精彩！\';"></textarea>';
			replydivHtml += '  <div class="comm-con"><span>签名：</span>  ';
			 if(getCookie("username")=='')
			replydivHtml += '  <input name="txtNickname" type="text" id="commentNick' + commentid + '" size="36" class="ipt-txt" value="匿名" onfocus="if(this.value==\'匿名\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'匿名\';" />';
			else
			replydivHtml += '  <input name="txtNickname" type="text" id="commentNick' + commentid + '" size="36" class="ipt-txt" value="' + getCookie("username") + '" />';
			replydivHtml += '  </div>';
			replydivHtml += '  <input type="submit" name="btnComment" value="发表评论"  onclick="PostQuickComment(' + commentid + ',' + newsid + ')" id="btnComment" class="button" />';
			replydivHtml += '  <span id="commentMessage' + commentid + '" style="color:red;"></span>';
            replydivHtml += '  </div>';

            ReplyDiv.innerHTML = replydivHtml;
     }
    }
    function CloseReplay(commentid) {
        var ReplyDiv = GetObj('Reply' + commentid);
        ReplyDiv.style.display = 'none';
}

	function ShowReplay(commentid,newsid,lou)
	{
		 var ReplyDiv = GetObj('Reply' + commentid);
     ReplyDiv.style.display = 'block';
         JsonStr = "\{ \"commentid\":\"" + commentid + "\", \"newsid\":\"" + newsid + "\"  , \"iLou\":\"" + lou + "\"  \}";
         $.ajax({
             type: "POST",
             url: "/ithome/postComment.aspx/ShowReplyLogin",
             data: JsonStr,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             async: true,
             success: function (msg) {
                 ReplyDiv.innerHTML = msg.d;
                 var t=$("#commentContent" + commentid).val();
                 $("#commentContent" + commentid).val("").focus().val(t);
             }
         });

   }

   function displayCommentLouMore(commentid) {

       $("<div/>").load("/ithome/GetAjaxData.aspx", { "commentid": commentid, "type": "getmorelou" }, function () {
       }).appendTo($("#lou" + commentid));
       $("#liGetMore" + commentid).hide();
   }




 function PostQuickComment(commentid, newsid) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "newsid=" + newsid + "&commentNick=" + escape($("#commentNick" + commentid).val()) + "&commentContent=" + escape($("#commentContent" + commentid).val()).replace(/\+/g, '%2B') + "&parentCommentID=" + commentid + "&txtCode=" + $("#txtCode" + commentid).val() + "&type=comment",
         success: function (msg) {

             var messageObj = GetObj('commentMessage' + commentid);
             messageObj.innerHTML = '<span id="commentMessage" style="color:red">' + msg + '</span>';
             if (msg.indexOf("评论成功") >= 0) {
                 QuickCommentLoadData(commentid);
             }

         }
     });
 }

 function QuickCommentLoadData(commentid) {
     $("#lou" + commentid).show();
     $("<div/>").load("/ithome/GetAjaxData.aspx", { "commentid": commentid, "type": "getloucomment"}, function () {
     }).appendTo($("#lou" + commentid));
   //  $("#lou" + commentid).append('   <li class="gh"><div class="re_info"><strong class="p_floor"></strong>新回复</div><div class="re_comm"><p class="p_1">' + $("#commentContent" + commentid).val() + '</p><p class="p_2"><span class="comm_reply"><a  href="javascript:;">支持(0)</a><span class="v">|</span><a id="against877904" href="javascript:;">反对(0)</a><span class="v">|</span><a href="javascript:;">回复</a></span></p></li>');
     var ReplyDiv = GetObj('Reply' + commentid);
     ReplyDiv.style.display = 'none';
     ReplyDiv.innerHTML = "";
}



 function commentVote(commentid, typeid) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "commentid=" + commentid + "&type=replyVote&typeid=" + typeid,
         success: function (msg) {

             if (msg.indexOf("您") >= 0) {
                 alert(msg);
             }
             else {
                 if (typeid == 1) {
                     $("#agree" + commentid).text('取消支持(' + msg + ')');
                     $("#agree" + commentid).attr('href', 'javascript:cancleCommentVote('+commentid+', 1)');

                     $("#agree" + commentid).css({ "position": "relative" });
                     $("#agree" + commentid).append("<span class='flower'></span>");
                     $("#agree" + commentid).find(".flower").css({ "position": "absolute", "text-align": "center", "left": "6px", "top": "-10px", "display": "block", "width": "30px", "height": "30px", "background": "url(http://file.ithome.com/images/agree.gif) left center no-repeat", "opacity": "0" }).animate({ top: '-30px', opacity: '1' }, 300, function () { $(this).delay(300).animate({ top: '-35px', opacity: '0' }, 300) });
                     $("#agree" + commentid).find(".flower").removeClass();

                 }
                 else {
                     $("#against" + commentid).text('取消反对(' + msg + ')');
                     $("#against" + commentid).attr('href', 'javascript:cancleCommentVote(' + commentid + ', 2)');

                     $("#against" + commentid).css({ "position": "relative" });
                     $("#against" + commentid).append("<span class='shit'></span>");
                     $("#against" + commentid).find(".shit").css({ "position": "absolute", "text-align": "center", "left": "6px", "top": "-60px", "display": "block", "width": "30px", "height": "30px", "background": "url(http://file.ithome.com/images/against.gif) left center no-repeat", "opacity": "0" }).animate({ top: '-30px', opacity: '1' }, 300, function () { $(this).delay(300).animate({ top: '-5px', opacity: '0' }, 300) });
                     $("#against" + commentid).find(".shit").removeClass();

                 }
             }
         }
     });
 }


 function cancleCommentVote(commentid, typeid) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "commentid=" + commentid + "&type=cancleReplyVote&typeid=" + typeid,
         success: function (msg) {
             if (msg.indexOf("您") >= 0) {
                 alert(msg);
             }
             else {
                 if (typeid == 1) {
                     $("#agree" + commentid).text('支持(' + msg + ')');
                     $("#agree" + commentid).attr('href', 'javascript:commentVote(' + commentid + ', 1)');

                 }
                 else {
                     $("#against" + commentid).text('反对(' + msg + ')');
                     $("#against" + commentid).attr('href', 'javascript:commentVote(' + commentid + ', 2)');

                 }
             }
         }
     });
 }



 function commentComplain(commentid) {
     if (confirm("感谢您对评论内容的监督，多人举报后该评论将被隐藏，注意恶意举报会被处罚。是否举报？")) {
         $.ajax({
             type: "POST",
             url: "/ithome/postComment.aspx",
             data: "commentid=" + commentid + "&type=complain",
             success: function (message) {
                 $("#complainmessage" + commentid).html("<span style=\"color:red;display:none;border:1px #fcbb90 solid;background:#fefcf4;position:absolute;padding:4px;right:0;top:0px;width:225px;text-align:center;\" class=\"jubao" + commentid + "\">" + message + "&nbsp;&nbsp;</span>");
                 $(".jubao" + commentid).css({ "display": "block","opacity": "0" }).animate({ top: '-22px', opacity: '1' }, 300, function () { $(this).delay(1000).animate({ top: '-30px', opacity: '0'}, 300,function () {$(this).remove();}) });
             }
         });
     }
 }


 function appCommentComplain(commentid,u,p) {
     if (confirm("感谢您对评论内容的监督，多人举报后该评论将被隐藏，注意恶意举报会被处罚。是否举报？")) {
         wp7Complain(commentid, u, p);
     }
 }

 function wp7Complain(commentid, u, p) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "commentid=" + commentid + "&type=complain&u=" + u + "&p=" + p,
         success: function (message) {
             $("#complainmessage" + commentid).html("<span style=\"color:red;\" class=\"jubao\">" + message + "&nbsp;&nbsp;</span>");
             $(".jubao").delay(1500).fadeOut("slow");
         }
     });
 }


 function hotCommentVote(commentid, typeid) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "commentid=" + commentid + "&type=replyVote&typeid=" + typeid,
         success: function (msg) {
             if (msg.indexOf("您") >= 0) {
                 alert(msg);
             }
             else {
                 if (typeid == 1) {
                     $("#hotagree" + commentid).text('取消支持(' + msg + ')');
                     $("#hotagree" + commentid).attr('href', 'javascript:cancleHotCommentVote(' + commentid + ', 1)');

                     $("#hotagree" + commentid).css({ "position": "relative" });
                     $("#hotagree" + commentid).append("<span class='flower'></span>");
                     $("#hotagree" + commentid).find(".flower").css({ "position": "absolute", "text-align": "center", "left": "6px", "top": "-10px", "display": "block", "width": "30px", "height": "30px", "background": "url(http://file.ithome.com/images/agree.gif) left center no-repeat", "opacity": "0" }).animate({ top: '-30px', opacity: '1' }, 300, function() { $(this).delay(300).animate({ top: '-35px', opacity: '0' }, 300) });
                     $("#hotagree" + commentid).find(".flower").removeClass();

                 }
                 else {

                     $("#hotagainst" + commentid).text('取消反对(' + msg + ')');
                     $("#hotagainst" + commentid).attr('href', 'javascript:cancleHotCommentVote(' + commentid + ', 2)');

                     $("#hotagainst" + commentid).css({ "position": "relative" });
                     $("#hotagainst" + commentid).append("<span class='shit'></span>");
                     $("#hotagainst" + commentid).find(".shit").css({ "position": "absolute", "text-align": "center", "left": "6px", "top": "-60px", "display": "block", "width": "30px", "height": "30px", "background": "url(http://file.ithome.com/images/against.gif) left center no-repeat", "opacity": "0" }).animate({ top: '-30px', opacity: '1' }, 300, function() { $(this).delay(300).animate({ top: '-5px', opacity: '0' }, 300) });
                     $("#hotagainst" + commentid).find(".shit").removeClass();

                 }
             }
         }
     });
 }


 function cancleHotCommentVote(commentid, typeid) {
     $.ajax({
         type: "POST",
         url: "/ithome/postComment.aspx",
         data: "commentid=" + commentid + "&type=cancleReplyVote&typeid=" + typeid,
         success: function (msg) {
             if (msg.indexOf("您") >= 0) {
                 alert(msg);
             }
             else {
                 if (typeid == 1) {
                     $("#hotagree" + commentid).text('支持(' + msg + ')');
                     $("#hotagree" + commentid).attr('href', 'javascript:hotCommentVote(' + commentid + ', 1)');

                 }
                 else {
                     $("#hotagainst" + commentid).text('反对(' + msg + ')');
                     $("#hotagainst" + commentid).attr('href', 'javascript:hotCommentVote(' + commentid + ', 2)');

                 }
             }
         }
     });
 }


function clearComment() {
    var comment = document.getElementById("commentContent");

    if (comment.value == "IT之家有您参与更精彩！") {
        comment.value = '';
        comment.onclick = function ()
        { }
    }
}

function showValidate() {
            var comment = GetObj('commentContent');
            if (comment.value == "IT之家有您参与更精彩！")
                comment.value = '';

}

function LoadData() {

    $("<div/>").load("/ithome/GetAjaxData.aspx", { "newsID": $("#newsid").val(), "type": "comment" }, function () {
    }).appendTo($("#LoadArticleReply"));
   // location.replace("#LoadArticleReply");


}

function pagecomment(page, commentcount) {
    $("<div/>").load("/ithome/GetAjaxData.aspx", { "newsID": $("#newsid").val(), "type": "commentpage", "page": page }, function () {
    }).appendTo($("#ulcommentlist")).fadeIn('slow');
    if (page * 50 > commentcount)
        $(".more_comm").hide();

}

$('.mobile a').attr('title','下载IT之家客户端，炫耀我的尾巴！');

/* Ctrl+Enter回复 */
$('textarea').attr('onkeydown','if(event.ctrlKey&&event.keyCode==13){document.getElementById("btnComment").click();return false}');

    var txt = $('#entered_UsernameInput').val();
    $('#entered_UsernameInput').focus(function () {
        if (txt === $(this).val())
        	$(this).val('').css({'color':'#272a30'});
    }).blur(function () {
        if ($(this).val() == '')
        	$(this).val(txt).css({'color':'#888'});
    });
   
    $('#entered_passwordInput').focus(function () {
        $('#entered_passwordLabel').hide();
    }).blur(function () {
        if ($(this).val() == '')
        	$('#entered_passwordLabel').show();
    });

    $("#btn_loginbtn").click(function () {
       CommentLogin($("#entered_UsernameInput").val(),$("#entered_passwordInput").val());
    });

    $("#btn_logoutbtn").click(function () {
       LogOut();
    });
    
    
    function CommentLogin(username,pwd)
    {
    	 $("#btn_loginbtn").addClass("disable").attr({
            disabled: true
        });
        $("#returnMsg").text('');
        var JsonStr = "\{ \"username\":\"" + username + "\", \"password\":\"" + pwd + "\"  \}";
        $.ajax({
            type: "POST",
            url: "/ithome/login.aspx/btnLogin_Click",
            data: JsonStr,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (msg) {
                if (msg.d.indexOf('ok')<0) {
                    $("#btn_loginbtn").attr('disabled', false);
                    $("#returnMsg").text(msg.d);
                }
                else {
                    $(".comm_login").hide();
                    $(".quickcommentlogined").show();
                   

                }


            }
        });
    }
    
    function LogOut()
    {
    	 var JsonStr = "";
        $.ajax({
            type: "POST",
            url: "/ithome/login.aspx/btnLogout_Click",
            data: JsonStr,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (msg) {
                location.reload();
            }
        });
    }
    
    
	 $("#displayAnonymous").click(function () {
	 			$("#commentLoginPanel").hide();
	 		 	$("#commentAnonymousPanel").show();
	 		 	$("#commentMessage").html('');
	 	 });
	 	 	 $("#displayLogin").click(function () {
	 			$("#commentLoginPanel").show();
	 		 	$("#commentAnonymousPanel").hide();
	 		 	 	$("#commentMessage").html('');
	 	 });
	 	 
	 	 