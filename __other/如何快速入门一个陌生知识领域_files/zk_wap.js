var loading = false;
$("#commentInput").width($(window).width()-$("#comment_post_btn").width()-20);
$(".commentInputBox").hide();

if(!browser.versions.iPhone)
{
    var pre_scroll = -1;
    var downFlag = true;
    var is_animate = false;
    $(window).scroll(function(){
        if($(window).scrollTop()<50){
            showDownloadBtn();
            hideTopBtn();
            downFlag = true;
        }
        else
        {
            if ((pre_scroll - $(window).scrollTop())>0){
                if(!downFlag&&!is_animate)
                {
                    is_animate = true;

                    showDownloadBtn();
                }
                downFlag = true;
            }
            else
            {
                if(downFlag&&!is_animate)
                {
                    is_animate = true;
                    hideDownloadBtn();
                }
                downFlag = false;
            }

        if((document.body.clientHeight+$(window).scrollTop())>$("#picture").offset().top){
            showTopBtn();
        }else{
            hideTopBtn();
        }
        pre_scroll = $(window).scrollTop();
        }
        //  $('#downTips').css('top',$(window).scrollTop());
        //  $('#back-to-top').css('top',$(window).scrollTop()+$(window).height()-75);
    })

var bt;
var t;
function touchEnd(event) {
    if(t)clearTimeout(t);
    t = setTimeout('touchendTimeOut()',500);
}

var touchStarY;
function touchendTimeOut(){
    if($(window).scrollTop()<50){
        showDownloadBtn();
        downFlag = true;
    }
}
document.addEventListener("touchend", touchEnd, false);

}else{
    document.ontouchstart = function (e) {

        touchStarY = e.targetTouches[0].pageY;
    };

    document.ontouchmove = function (e) {
        if(showInputFlag)return;
        nStartY = e.targetTouches[0].pageY;
        var distanceY = touchStarY - nStartY;

        if(Math.abs(distanceY)>10){
            if($(window).scrollTop()>50){
                if(distanceY>0){
                    $("#downTips").css('top',"-42px");
                }else{
                    $("#downTips").css('top',"0");
                }
            }else{
                $("#downTips").css('top',"0");
                hideTopBtn();
            }

            if((document.body.clientHeight+$(window).scrollTop())>$("#picture").offset().top){
                showTopBtn();
            }else{
                hideTopBtn();
            }
        }
    };
}

$("#alpha_bg").height($(document).height())

//$("#alpha_bg").click(function(){
//    hideInput();
// });  

$("#commentInput").focusin(function() {
    if(browser.versions.iPhone){
        var distance = $('.commentInputBox').offset().top;
        $('body').animate({scrollTop:distance},10)
    }
});

var likeArr = [];

function zan(obj){
    var cid = $(obj).parent().find("input[name=cid]").val();
    var _this = obj;
    if(likeArr.indexOf(cid) == -1){
        $.getJSON("article_action.php?act=like_com&cid="+cid+"&pk="+pkid,function(json){
            if(json.stat==1){
                var num = Number($(_this).parent().find(".like_num").html());
                var like_num = $(_this).parent().find(".like_num");
                $(like_num).show();
                $(like_num).html(num+1);
                $(_this).css("border-color","#f5693c");
                $(_this).css("color","#e16867");
                $(_this).find("img").attr("src","images/like_bg_2.png");
                likeArr.push(cid);
            }
            else
            {
                alert(json.msg);
            }
        });

    }
}

function stopBubble(e) {  
    var e = e ? e : window.event;  
    if (window.event) { // IE  
        e.cancelBubble = true;   
    } else { // FF  
    e.stopPropagation();   
    }   
}
function hideInput(){
    showInputFlag = false;
    $("#alpha_bg").hide();
    $(".commentInputBox").hide();
    $("body").removeAttr("ontouchmove");
    $("#commentInput").attr("placeholder","我也评论一句");
    $("#commentInput").val('');
    $("#reply_cid").val('');
    setTimeout('showTopBtn()',600);
}

function showTopBtn(){
    $("#back-to-top").show();
}

function hideTopBtn(){
    $("#back-to-top").hide();
}

function inputFocus(){
    $("#commentInput").focus();
}

var reply_str='';
var showInputFlag = false;
function showInput(obj){
    var cid = '';
    if(obj){
        var author = $(obj).find('.author').html();
        var content = $(obj).find('.con').html();
        $("#commentInput").attr("placeholder",'回复:'+author);
        cid = $(obj).find("input[name=cid]").val();
        $("#reply_cid").val(cid);
        reply_str = author+':'+content;
    }

    showInputFlag = true;
    hideTopBtn();
    $("#downTips").css('top',"-42px");
    $("#alpha_bg").show();
    $(".commentInputBox").show();
    $("#commentInput").focus()

    $("body").attr("ontouchmove","event.preventDefault()");
}

$(".div_like").bind('click',function(e){
    $.getJSON("article_action.php?act=like_art&pk="+pkid+"&app_id="+app_id);
    $('#add_like').show();
    $('#add_like').animate({'top':$('#add_like').position().top-80},'5000',function(e){
        $('#add_like').hide();
    })

    $(this).find("img:eq(1)").attr('src','images/ic_article_liked_selected.png');
    $(this).unbind('click');
})

$("#comment_post_btn").click(function(e){
    if($("#commentInput").val()!=='')
    {
        showTopBtn();
        $("#alpha_bg").hide();
        $(".commentInputBox").hide();

        $("#new_comment_id").show();

        var obj = {};
        obj['auther_icon'] = 'http://sns.myzaker.com/images/noavatar_middle.png';
        obj['auther_name'] = '我';
        obj['like_num'] = '';
        obj['ctime'] = '刚刚';
        obj['content'] = $("#commentInput").val();
        if($("#reply_cid").val()){
            obj['reply'] = '<div class="reply">'+reply_str+'</div>';
        }else{
            obj['reply'] = '';
        }

    var comment_list_html = template($('#comment_li2').val(),obj);
    $('.new_comment_box_all').prepend(comment_list_html);

    var distance = $('.new_comment_box_all').offset().top;

    $('body').animate({scrollTop:distance},500,function(e){

    });

    $.post("article_action.php?act=commentPost&pk="+pkid, { content: $("#commentInput").val(),cid:$("#reply_cid").val()},function(json){
        if(json.stat==1){}
    });

    $("#commentInput").attr("placeholder","我也评论一句");
    $("#commentInput").val('');
    $("#reply_cid").val('');
    }

    $("body").removeAttr("ontouchmove");
});

function template(_str,_arr)
{
    //替换模板变量
    var reCat = /<{(\w+)}>/gi;
    return _str.replace(reCat,function(){return _arr[arguments[1]];});
}

var topHeight = $("#downTips").height();
function showDownloadBtn(){
    if(browser.versions.iPhone){
        $('#downTips').show();
        is_animate = false;
    }else{
        $('#downTips').fadeIn('slow',function(e){
            is_animate = false;
        });
    }
}

function hideDownloadBtn(){
    //  $('#downTips').hide();
    if(browser.versions.iPhone){
        $('#downTips').hide();
        is_animate = false;
    }else{
        $('#downTips').fadeOut('slow',function(e){
            is_animate = false;
        });
    }
}

if(browser.versions.iPhone)
{
    $(".commentInputBox").addClass('addtop');
}
else
{
    $(".commentInputBox").addClass('addbottom');
}



