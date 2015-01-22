function add_to_wz() {
    var width = 480;
    var height = 480;
    var leftVal = (screen.width - width) / 2;
    var topVal = (screen.height - height) / 2;
    var d = document;
    var t = d.selection ? (d.selection.type != 'None' ? d.selection.createRange().text : '') : (d.getSelection ? d.getSelection() : '');
    window.open('http://wz.cnblogs.com/create?t=' + escape(d.title) + '&u=' + escape(d.location.href) + '&c=' +
     escape(t) + '&i=0', '_blank', 'width=' + width + ',height=' + height + ',toolbars=0,resizable=1,left=' + leftVal + ',top=' + topVal);
}

function LoadSideRightList(cateId, cateTitle) {
    $.ajax({
        url: '/ws/SideRightList.asmx/GetList',
        data: '{cateId:' + cateId + ',cateTitle:"' + cateTitle + '"}',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        success: function (data) {
            $("#right_content_list").html(data.d);
        },
        error: function (xhr) {
        }
    });
}

function SetFontSize(size) {
    $("#ArticleCnt p").css("font-size", size);
}

function cnblogs_code_collapse(element) {
    if (element.children('div.cnblogs_code_open').css('display') != 'none') {
        element.children('div.cnblogs_code_open').css('display', 'none');
        element.children('img.code_img_opened').css('display', 'none');
        element.children('img.code_img_closed').css('display', 'inline');
    }
    else {
        element.children('div.cnblogs_code_open').css('display', 'block');
        element.children('img.code_img_opened').css('display', 'inline');
        element.children('img.code_img_closed').css('display', 'none');
    }
}

function cnblogs_code_show(id) {
    if ($('#cnblogs_code_open_' + id).css('display') == 'none') {
        $('#cnblogs_code_open_' + id).show();
        $('#code_img_opened_' + id).show();
        $('#code_img_closed_' + id).hide();
    }
}
function cnblogs_code_hide(id, event) {
    if ($('#cnblogs_code_open_' + id).css('display') != 'none') {
        $('#cnblogs_code_open_' + id).hide();
        $('#code_img_opened_' + id).hide();
        $('#code_img_closed_' + id).show();
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;
        }
    }
}

function zzk_go() {
    var keystr = encodeURIComponent(document.getElementById('zzk_q').value);
    window.location = "http://zzk.cnblogs.com/s?t=k&w=" + keystr;
}
function zzk_go_enter(event) {
    if (event.keyCode == 13) {
        zzk_go();
        return false;
    }
}

function voteArticle(contentId, voteType) {
    $("#digg_tips").html('提交中...');
    $.ajax({
        url: '/mvcajax/vote/VoteArticle',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: '{"contentId":' + contentId + ',"voteType":"' + voteType + '"}',
        success: function (data) {
            if (data.IsSuccess) {
                var voteElement = $('#' + voteType.toLowerCase() + '_count');                
                $(voteElement).html(parseInt($(voteElement).html()) + 1);
            }
            $("#digg_tips").html(data.Message);
        },
        error: function (xhr) {
            $("#digg_tips").html(xhr.responseText);
        }
    });
}

function loadSideAdText() {
    $.ajax({
        url: '/ad/sidetext',
        type: 'get',
        dataType: 'text',
        cache: false,
        success: function (data) {
            $("#side_adtext").html(data);
        }
    });
}

$(function () {
    //loadSideAdText();
    $.ajax({
        url: '/mvcajax/Stats/UpdateViewCount',
        data: '{"contentId":' + contentId + '}'
    });
});