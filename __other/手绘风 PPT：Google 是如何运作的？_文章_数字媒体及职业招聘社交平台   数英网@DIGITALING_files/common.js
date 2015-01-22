/// <reference path="jquery/jquery-1.7.1.min.js" />
//sildeBanner
var domain = "http://" + location.host;

/*****start global script*****/
//获取即时时间
function formatDate(now,sl) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();  
    //var second = now.getSeconds();
    if (month < 10) {month = "0" + month;}
    if (date < 10) {date = "0" + date;}
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    sl = sl ? 0 : 1;
    if (sl == 0) {
        return year + "-" + month + "-" + date;
    } else {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
}

function getLocalTime(nS,nb) {
    var d = new Date(parseInt(nS) * 1000);
    nb = nb ? 0 : 1;
    if (nb == 0) {
        return formatDate(d,0);
    } else{
        return formatDate(d,1);
    }
    //2010年12月23日 10:53
    //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    //2010年12月23日
    //return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10);
    //2010-12-23
    //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").substr(0, 10);
};
//获取即时年月
function getLocalYM(tm) {
    var ym = new Date(parseInt(tm) * 1000).toLocaleString().split("月");
    return ym[0] + "月";
};
//http link
function linkHttp(str) {
    var htp = 'http://';
    var strArr = new Array();
    var strArr = str.split(htp);
    if (strArr.length > 1) {
        sStr = str;
    } else {
        sStr = htp+str;
    }
    return sStr;
}
//获取radio button 值
$.getBoxRadioValue = function (name) {
    var str = "";
    $('input[name="' + name + '"]').each(function () { if (this.checked) { if (str) { str += ',' + this.value; } else { str = this.value; } } });
    return str;
};
//获取input输入框值
$.getBoxTextValue = function (selecter) {
    var str = "";
    $(selecter).each(function () { if (str) { if ($(this).val()) { str += "," + $(this).val(); } else { str += ",http://" } } else { str = $(this).val(); } });
    return str;
};
//获取项目合作伙伴
$.getProjectTeammember = function () {
    member = new Array();
    $("#team_member tr").each(function (i) {
        member[i] = { "userId": $("#team_member tr .user_" + i).val(), "username": $("#team_member tr .username_" + i).val(), "userTitle": $("#team_member tr .userTitle_" + i).val() };
    });
    return member;
};
//带文字的silder banner
function sildeBanner(bname,inter) {
    var number = $('.' + bname + ' .banner_txt ul.banner_num li');
    var bodies = $('.' + bname + ' .banner_pic ul li');
    var titles = $('.' + bname + ' .banner_txt ul.banner_title li');
	inter=inter?inter:3;
    var defaultOpts = { interval: inter*1000 };
    var _count = $(number).length;
    //$("ul.banner_num").width(24 * _count);
    var _current = 0;
    var _intervalID = null;
    var stop = function () { window.clearInterval(_intervalID); };
    var slide = function (opts) {
        if (opts) {
            _current = opts.current || 0;
        } else {
            _current = (_current >= (_count - 1)) ? 0 : (++_current);
        };
        $(bodies).filter(":visible").css({
            display: 'none',
            opacity: 1
        }).animate({
            opacity: 0
        }, 100);
        $(bodies).eq(_current).css({
            display: 'block',
            opacity: 0
        }).animate({
            opacity: 1
        }, 500);
        $(number).removeClass("on").eq(_current).addClass("on");
        $(titles).removeClass("on").eq(_current).addClass("on");
    };
    var go = function () {
        stop();
        _intervalID = window.setInterval(function () { if (_count > 1) { slide(); } }, defaultOpts.interval);
    };
    var itemMouseOver = function (target, items) {
        stop();
        var i = $.inArray(target, items);
        slide({ current: i });
    };
    $(number).hover(function () { if ($(this).attr('class') != 'on') { itemMouseOver(this, $(number)); } else { stop(); } }, go);
    $(titles).hover(function () { if ($(this).attr('class') != 'on') { itemMouseOver(this, $(titles)); } else { stop(); } }, go);
    $(bodies).hover(stop, go);
    go();
};
//不带文字，纯数字的silder banner
function sildeBanners(bname) {
    var number = $('.' + bname + ' .banners_txt ul.banners_num li');
    var bodies = $('.' + bname + ' .banners_pic ul li');
    var defaultOpts = { interval: 3000 };
    var _count = $(number).length;
    if (_count < 2) { $('.' + bname + ' .banners_txt').hide(); }
    //$("ul.banner_num").width(24 * _count);
    var _current = 0;
    var _intervalID = null;
    var stop = function () { window.clearInterval(_intervalID); $('.' + bname + ' .banners_txt').css('display', 'block'); };
    var slide = function (opts) {
        if (opts) {
            _current = opts.current || 0;
        } else {
            _current = (_current >= (_count - 1)) ? 0 : (++_current);
        };
        $(bodies).filter(":visible").css({
            display: 'none',
            opacity: 1
        }).animate({
            opacity: 0
        }, 100);
        $(bodies).eq(_current).css({
            display: 'block',
            opacity: 0
        }).animate({
            opacity: 1
        }, 500);
        $(number).removeClass("on").eq(_current).addClass("on");
    };
    var go = function () {
        stop();
        if (bname != 'inner_content') {$('.' + bname + ' .banners_txt').css('display', 'none');}
        _intervalID = window.setInterval(function () { if (_count > 1) { slide(); } }, defaultOpts.interval);
    };
    var itemMouseOver = function (target, items) {
        stop();
        var i = $.inArray(target, items);
        slide({ current: i });
    };
    $(number).hover(function () { if ($(this).attr('class') != 'on') { itemMouseOver(this, $(number)); } else { stop(); } }, go);
    $(bodies).hover(stop, go);
    go();
};
//列头全选框被单击 
function chkAllClick(sonName, cbAllId) {
    var arrSon = document.getElementsByName(sonName);
    var cbAll = document.getElementById(cbAllId);
    var tempState = cbAll.checked;
    for (i = 0; i < arrSon.length; i++) {
        if (arrSon[i].checked != tempState)
            arrSon[i].click();
    }
};
//子项复选框被单击 
function chkSonClick(sonName, cbAllId) {
    var arrSon = document.getElementsByName(sonName);
    var cbAll = document.getElementById(cbAllId);
    for (var i = 0; i < arrSon.length; i++) {
        if (!arrSon[i].checked) {
            cbAll.checked = false;
            return;
        }
    }
    cbAll.checked = true;
};
//模拟 text placehold
function textFocus(field, defaultValue) {
    field.style.color = '#666';
    if (field.value == defaultValue) {
        field.value = '';
        //field.style.color = '#bbb';
    }
};
function textBlur(field, defaultValue) {
    field.style.color = '#666';
    if (field.value == '') {
        field.value = defaultValue;
        field.style.color = '#bbb';
    }
};
//showTipPopup errorPopup
function errorPopup(panel, bools) {
    $(panel).each(function () {
        var _this = $(this);
        if (_this.hasClass('error_panel')) {
            _this.find('.yellow_popup_box').show();
            //todo error  or uncurrent  
            //if (bools = 1) {
            //    _this.find(popup).find('.error_part').removeClass('hide');
            //    _this.find(popup).find('.uncorrect_part').addClass('hide');
            //} else{
            //    _this.find(popup).find('.error_part').addClass('hide');
            //    _this.find(popup).find('.uncorrect_part').removeClass('hide');
            //}
        }
        //如果对了 出现 “right” icon
        //挡住上面的一般内容
        _this.find('input').focus(function () {
            $(this).parents(panel).find('.yellow_popup_box').hide();
        });
    });
    $('.yellow_popup_box a.del_artli_btn').click(function () {
        var _this = $(this);
        _this.parents('.yellow_popup_box').hide();
    });
};
function popupError(panel, bools) {
    $(panel).live('each', function () {
        var _this = $(this);
        if (_this.hasClass('error_panel')) {
            _this.find('.yellow_popup_box').show();
            //todo error  or uncurrent  
            //if (bools = 1) {
            //    _this.find(popup).find('.error_part').removeClass('hide');
            //    _this.find(popup).find('.uncorrect_part').addClass('hide');
            //} else{
            //    _this.find(popup).find('.error_part').addClass('hide');
            //    _this.find(popup).find('.uncorrect_part').removeClass('hide');
            //}
        }
        //如果对了 出现 “right” icon
        //挡住上面的一般内容
        _this.find('input').live('focus', function () {
            $(this).parents(panel).find('.yellow_popup_box').hide();
        });
    });
    $('.yellow_popup_box a.del_artli_btn').live('click', function () {
        var _this = $(this);
        _this.parents('.yellow_popup_box').hide();
    });
};
//vm placeholder
function vmplaceholder() {
    var vm_input = $('.vm_placeholder input');
    vm_input.each(function () {
        if ($(this).val() == "") {
            $(this).parent().children('label').show();
        } else {
            $(this).parent().children('label').hide();
        }
    });
    vm_input.focus(function () {
        $(this).addClass('keypress');
    });
    vm_input.blur(function () {
        $(this).removeClass('keypress');
    });

    vm_input.keydown(function () {
        var vm_label = $(this).parent().children('label');
        var vm_input_val = $(this).val();
        $(this).addClass('keypress');
        vm_label.hide();
        if (vm_input_val == "") {
            vm_label.show();
        } else {
            vm_label.hide();
        }
    });
    vm_input.keyup(function () {
        var vm_label = $(this).parent().children('label');
        var vm_input_val = $(this).val();
        //$(this).removeClass('keypress');
        vm_label.hide();
        if (vm_input_val == "") {
            vm_label.show();
        } else {
            vm_label.hide();
        }
    });

};
function vmholderpopup() {
    var vm_input = $('.vm_placeholder input');
    if (vm_input.val() == "") {
        vm_input.parent().children('label').show();
    } else {
        vm_input.parent().children('label').hide();
    }
    vm_input.live('focus', function () {
        $(this).addClass('keypress');
    });
    vm_input.live('blur', function () {
        $(this).removeClass('keypress');
    });

    vm_input.live('keydown', function () {
        var vm_label = $(this).parent().children('label');
        var vm_input_val = $(this).val();
        $(this).addClass('keypress');
        vm_label.hide();
        if (vm_input_val == "") {
            vm_label.show();
        } else {
            vm_label.hide();
        }
    });
    vm_input.live('keyup', function () {
        var vm_label = $(this).parent().children('label');
        var vm_input_val = $(this).val();
        //$(this).removeClass('keypress');
        vm_label.hide();
        if (vm_input_val == "") {
            vm_label.show();
        } else {
            vm_label.hide();
        }
    });

};
//只允许输入数字
function numonly(item) {
    $(item).css("ime-mode", "disabled");
    $(item).bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
        if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
        {
            return;
        }
        return code >= 48 && code <= 57;
    });
};
//字符串截取，中文算2个，英文算1个
function subString(str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) { strlen += 2; } else { strlen++; }
        s += str.charAt(i);
        if (strlen >= len) { return s + '...'; }
    }
    return s;
};
function getLength(_str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = _str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = _str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
//还可以输入字数
function wordLess(txt, txtnum, number) {
    function inputLess() {
        var $ele = $(txt), str = $ele.val() || "", result = "", len = 0, index = 0;
        //循环
        //while (len < number) {
            //var c = str.charCodeAt(index);
            //if (c >= 0 && c <= 128) {
            //    len += 0.5;
            //} else {
            //    len += 1;
            //}
            //result += str.charAt(index) || "";
            ////result = str[index] || "";//ie7 读取不到
            //index += 1;
        //}
        //$ele.val(result);  //ie不能赋值
        //var lessNum = parseInt(getLength(result) / 2);

        var lessNum = parseInt(getLength(str) / 2);
        var lessCode = Math.abs(number - lessNum);
        //$(txtnum).text(lessCode);
        if (lessNum > number) {
            $ele.css('borderColor', '#ff3f6e');
            $ele.addClass('error_ele');
            $(txtnum).addClass('color_red');
            $(txtnum).html('已超过<b>' + lessCode + '</b>个字');
        } else {
            $ele.css('borderColor', '#c0c0c0');
            $ele.removeClass('error_ele');
            $(txtnum).removeClass('color_red');
            $(txtnum).html('还可以输入<b>' + lessCode + '</b>个字');
        }
    };
    //inputLess();
    $(txt).live('keyup', function () {
        inputLess();
    });
    $(txt).live('focusout', function () {
        inputLess();
    });
};
//tag edit
function tagEdit(editbtn, taglist, taginput, addbtn) {
    $(editbtn).click(function () {
        var arr = [];
        //n 个 tagli 以“，”间隔 组合成字符串
        $(taglist).find('li a').each(function (i) {
            arr.push($(this).text());
        });
        $(taginput).val(arr.join(","));
        $(taglist).parent().addClass('hide');
        $(taginput).parent().removeClass('hide');
        $(editbtn).addClass('hide');
    });
    $(addbtn).click(function () {
        var inputVal = checktag($(taginput).val());
        //alert(inputVal);
        var interArr = [];
        var t = '';
        for (var i = 0; i < inputVal.length; i++) {
            var tmp = inputVal.charAt(i);
            if (tmp != ',') {
                t += tmp;
                lastNum = true;
            } else {
                if (t != ',') {
                    interArr.push(t);
                    t = '';
                }
                lastNum = false;
            }
        }
        if (t != ',') {
            interArr.push(t);
            //想数组末尾添加
        }
        //interArr.reverse(); //倒序
        $(taglist).find('li').remove();
        for (var i = 0; i < interArr.length; i++) {
            //alert(interArr[i]);
            if (interArr[i] != '') {
                var _tagTxt = '<li><a>' + interArr[i] + '</a></li>';
            } else {
                var _tagTxt = '<li><a>暂无数据</a></li>';
            }
            //to make it better
            //$('.tag_edit .tag_item .tag_list').append(_tagTxt);
            $(taglist).append(_tagTxt);
        }
        //interArr.reverse(); //倒序
        $(taglist).parent().removeClass('hide');
        $(taginput).parent().addClass('hide');
        $(editbtn).removeClass('hide');
    });
};
//textarea 换行显示
function replace_br(str) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    return str;
};
function replace_ng(str) {
    str = str.replace(/<br.*?>/ig, '\r\n');
    return str;
};
function replace_rn(str) {
    str = str.replace(/<br.*?>/ig, '\r\n');
    str = str.replace(/&lt;br.*?&gt;/ig, '\r\n');
    return str;
};
function replace_ngs(str) {
    str = str.replace(/<br.*?>/ig, '<br/>');
    str = str.replace(/&lt;br.*?&gt;/ig, '<br/>');
    return str;
};
//tag input val 校验
//中文逗号 替换成引文逗号
function replaceTag(_str) {
    var strArr = [];
    strArr = _str.split("，");
    var strVal = [];
    for (var i = 0; i < strArr.length; i++) {
        if (strArr[i] != "") {
            strVal.push(strArr[i]);
        }
    }
    return strVal.toString();
};
function checktag(str) {
    var estr = replaceTag(str);
    var strArr = [];
    strArr = estr.split(',');
    //alert(strArr);
    var _strVal = [];
    if (strArr.length < 10) {
        for (var i = 0; i < strArr.length; i++) {
            if (strArr[i] != '') {
                _strVal.push(strArr[i]);
            }
        }
    } else {
        for (var i = 0; i < 10; i++) {
            if (strArr[i] != '') {
                _strVal.push(strArr[i]);
            }
        }
    }
    return _strVal.toString();
};
//tag each
function tagtoli(id, str) {
    $(id).empty();
    var interArr = [];
    interArr = str.split(',');
    _tagTxt = new Array();
    if (interArr.length > 0) {
        for (var i = 0; i < interArr.length; i++) {
            if (interArr[i] != '') {
                _tagTxt = '<li><a>' + interArr[i] + '</a></li>';
            } else {
                _tagTxt = '<li><a>暂无数据</a></li>';
            }
            $(id).append(_tagTxt);
        }
    } else {
        _tagTxt = '<li><a>暂无数据</a></li>';
        $(id).append(_tagTxt);
    }
};
//profile add new education
function addEdu(box, year, school, level, depart) {
    var eduhtml = '<div class="clearfix">'
                + '<div class="f_l w_140 line_2em">'
                    + '<p>' + year + '</p>'
                    + '<p><a class="edit_profile_btn"><i class="icon edit_pen mg_r_5"></i><b class="v_m color_blue">编辑</b></a></p>'
                    + '<p><a class="icon del_info_icon"></a></p>'
                + '</div>'
                + '<div class="f_l w_350">'
                    + '<p class="line_2em font_b">' + school + ' ' + depart + '</p>'
                    + '<p class="line_2em">' + level + '</p>'
                + '</div>'
            + '</div>';
    $(box).append(eduhtml);
}
//打开确认取消cancel popup
function openCancel(item) {
    $("#cancel_" + item).slideDown();
};
function closeCancel(item) {
    $("#cancel_" + item).slideUp();
};
//del art pro
function openDel(item) {
    $('.confirm_cancel_popup').hide();
    $("#cancel_" + item).show();
};
function closeDel(item) {
    $("#cancel_" + item).hide();
};

//倒计时
function disTime(_box) {
    var iNum = 0;
    var iMax = 1;
    var iIntervalId = null;
    function incNum() {
        if (!$(_box).hasClass('tip_act')) {
            iMax--;
        }
        if (iMax <= iNum) {
            clearInterval(iIntervalId);
            $(_box).addClass('tip_act');
            $(_box).slideUp();
        }
    }
    iIntervalId = setInterval(incNum, 1000);
};
//permission_link
function permission(link) {
    $(link).hover(function () {
        $(this).addClass('permission_link_act');
    }, function () {
        $(this).removeClass('permission_link_act');
    }).click(function () {
        $(this).next('.permission_list').show();
        $(this).next('.permission_list').find('li a').click(function () {
            $(this).parents('.permission').find('.permission_link em').text($(this).text());
            $(this).parents('.permission').find('.permission_link input').val($(this).find("input").val());
            $(this).parents('.permission').find('.permission_list').hide();
        }).hover(function () {
            $(this).parents('.permission').find('.permission_list').show();
        }, function () {
            $(this).parents('.permission').find('.permission_list').hide();
        })
    });
};
//输入并显示
function inputShow(_input, _show) {
    $(_show).text($(_input).val());
    $(_input).keypress(function () {
        $(_show).text($(_input).val());
    });
    $(_input).keyup(function () {
        $(_show).text($(_input).val());
    });
};
//jerry openDialog
//openDialog
function openDialog(dW, dId) {
    var tag = $('#' + dId);
    tag.width(dW);
    var dH = tag.height();
    var bW = $('body').width();
    var bH = $(window).height();
    //定位 showDialog position
    function showDialog(_tag, animate) {
        if (_tag.width() < $(window).width()) {
            var leftPosition = (document.documentElement.offsetWidth - _tag.width()) / 2;
        } else {
            var leftPosition = document.documentElement.scrollLeft + 5;
        }

        if (_tag.height() < $(window).height()) {
            var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
            if (isChrome) {
                var topPosition = document.body.scrollTop + ($(window).height() - _tag.height()) / 2;
            }
            else {
                var topPosition = document.documentElement.scrollTop + ($(window).height() - _tag.height()) / 2;
            }
        } else {
            var topPosition = document.documentElement.scrollTop + 5;
        }

        var positions = {
            left: leftPosition + "px",
            top: topPosition + "px"
        };

        if (!animate) {
            _tag.css(positions);
        } else {
            _tag.animate(positions, "slow");
        }
    };
    showDialog(tag);
    tag.css({
        display: "block",
        //left: bW / 2,
        //top: bH / 2,
        //marginLeft: -dW / 2,
        //marginTop: -dH / 2,
        zIndex: 999
    });
    //setupScreenLocker
    var setupScreenLocker = {
        screenLockerBackground: "#666",
        screenLockerOpacity: "0.2"
    };
    $("body").append("<div id='ScreenLocker'><!-- --></div>");
    $("#ScreenLocker").css({
        position: "absolute",
        background: setupScreenLocker.screenLockerBackground,
        left: "0",
        top: "0",
        opacity: setupScreenLocker.screenLockerOpacity,
        display: "block",
        width: bW,
        height: $(document).height(),
        zIndex: 998
    });
};
function closeDialog(dId) {
    var tag = $('#' + dId);
    tag.css({
        display: "none"
    });
    //$("#ScreenLocker").css({
    //    display: "none"
    //});
    $('#ScreenLocker').remove();
};
//open tips
function openCloseTips(bIcon, txt, txtColor, pWidth) {
    $('#popup_tips .popup_con').find('i').removeClass().addClass('icon mg_r_10 ' + bIcon);
    $('#popup_tips .popup_con').find('b').text(txt).removeClass().addClass(txtColor + ' v_m');
    openPopup(pWidth, 'popup_tips');
    //if (bIcon != 'success_icon') {
        setTimeout("$.closePopupLayer('popup_tips')", 1000);
    //} else {
        //$.closePopupLayer('popup_tips');
    //}
};
//身份证号验证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        //error = "输入身份证号码长度不对！";
        //alert(error);
        //frmAddUser.txtIDCard.focus();
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            //error = "错误的身份证号码！.";
            //alert(error);
            //frmAddUser.txtIDCard.focus();
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6, 14);
        if (checkDate(date8) == false) {
            //error = "身份证中日期信息不正确！.";
            //alert(error);
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }
        // check last digit
        if (varArray[17].toUpperCase() != intCheckDigit) {
            //error = "身份证效验位错误！...正确为： " + intCheckDigit + ".";
            //alert(error);
            return false;
        }
    }
    else {        //length is 15
        //check date
        var date6 = idNumber.substring(6, 12);
        if (checkDate(date6) == false) {
            //alert("身份证日期信息有误！.");
            return false;
        }
    }
    //alert ("Correct.");
    return true;
};
function checkDate(date) {
    return true;
};
//调用粘贴板
function copyToClipboard(txt,btn) {
    //引入 Zero Clipboard flash文件   
    ZeroClipboard.setMoviePath("http://file.digitaling.com/js/3rd/clipboard/ZeroClipboard.swf");
    //新建对象   
    clip = new ZeroClipboard.Client();
    //设置指向光标为手型   
    clip.setHandCursor(true);
    //通过传入的参数设置剪贴板内容   
    clip.setText(txt);
    //添加监听器，完成点击复制后弹出警告   
    clip.addEventListener("complete", function (client, text) {
        //alert(text);
        openPopup('280','popup_form_check');
        //openCloseTips('success_icon', '链接复制成功', 'color_green', '280');
    });
    //绑定触发对象按钮ID   
    clip.glue(btn);
}
/*****start content script*****/
//common
var common = {
    init: function (pe) {
        if (pe == 0) { this.siteNav(0); } else { this.siteNav(); }
        //this.siteNav();
        this.hsSelect();
        this.navlist();
        this.level();
		this.editAvatar();
		this.goanimate();
		pages.checknum();
		this.showQrcImg();
    },
	sendemail:function(){
		$("#user_send_email").live("click",function(){
			$.get(domain+"/datas/sendemail",function(data){
				if(data.isSuccess==1){
					$.closePopupLayer("popup_upload_avatar");
					openPopup("350","popup_user_send_email");
				}
			},"json");
		});
	},
	loadImg:function(){
		$("img.load").lazyload({placeholder:"http://file.digitaling.com/images/common/loadimg.gif"});
	},
	editAvatar:function(){
		$("#edit_avatar_s_btn").hover(function(){
			$(this).children('.edit_avatar_s_btn').removeClass("hide");
		},function(){
			$(this).children('.edit_avatar_s_btn').addClass("hide");
		});
	},
	navlist: function () {
	    $('.navs ul li:not(.n_none)').hover(function () {
	        $(this).addClass('over');
	    }, function () {
	        $(this).removeClass('over');
	    });
    },
    banner: function () {
        //var number = $(".banner .banner_txt ul.banner_num li");
        //var bodies = $(".banner .banner_pic ul li");
        //var titles = $(".banner .banner_txt ul.banner_title li");
        sildeBanner('left_banner', 3);
        //sildeBanner('office_banner', 3);
        //sildeBanner('right_banner',3);
        sildeBanner('month_banner', 3);
        //sildeBanner('explore_banner',3);
        //sildeBanner('inspiration_banner',3);
        //sildeBanner('interview_banner',3);
        sildeBanners('home_banners');
		sildeBanners('other_banners');
        sildeBanners('inner_banners');
        sildeBanners('inner_content');
        sildeBanners('art_banners');

    },
    tabs: function () {
        $('ul.tabs>li').click(function () {
            var tabs = $(this).parent().children('li');
            var panels = $(this).parent().parent().find('.tab_main');
            var index = $.inArray(this, tabs);
            tabs.removeClass('on').eq(index).addClass('on');
            panels.removeClass("show").eq(index).addClass("show");
        })
    },
    popupTabs: function () {
        $('ul.tabs>li').live('click', function () {
            var tabs = $(this).parent().children('li');
            var panels = $(this).parent().parent().find('.tab_main');
            var index = $.inArray(this, tabs);
            tabs.removeClass('on').eq(index).addClass('on');
            panels.removeClass("show").eq(index).addClass("show");
        })
    },
    comment: function () {
        var _clickComm = $('.comm_list ul li div p a.click_comm');
        var _clickReap = $('.comm_list ul li div p a.click_repeat');
        _clickComm.live('click', function () {
            if ($("#userType").val() == '') { openPopup("400", "popup_login"); return false; }//未登录 弹出登录
            var replyuId = $(this).parent().find(".replyuId").val();
            var replyName = $(this).parent().find(".replyName").val();
            var replyUtype = $(this).parent().find(".replyUtype").val();
            var _commInput = '<div class="comm_input">'
				+ '<div class="mg_b_10"><input type="hidden" id="replyuId" value="' + replyuId + '"><input type="hidden" id="replyUtype" value="' + replyUtype + '"><input type="hidden" id="replyName" value="' + replyName + '"><textarea id="comment_text"></textarea></div>'
				+ '<div class="clearfix">'
					+ '<div class="f_l"><!--<a class="emotion"><i class="icon express_icon mg_r_10"></i></a>--></div>'
					+ '<div class="f_r"><a class="yellow_btn post_comm_btn">发布</a></div>'
				+ '</div>'
			+ '</div>';
            var _postAfter = $(this).parent().parent().parent('.post_after');
            $('.comm_input').remove();
            if (_postAfter.parent('.repeat_comm').hasClass('repeat_bd')) {
                _postAfter.parent().parent().append(_commInput);
            } else {
                _postAfter.parent().append(_commInput);
            }
            addEmotion('comment_text');
            // focus
            $("#comment_text").focus();
        });
        _clickReap.live('click', function () {
            if ($("#userType").val() == '') { openPopup("400", "popup_login"); return false; }//未登录 弹出登录
            var replyuId = $(this).parent().find(".replyuId").val();
            var replyname = $(this).parent().find(".replyName").val();
            var replyUtype = $(this).parent().find(".replyUtype").val();
            var _commInput = '<div class="comm_input">'
				+ '<div class="mg_b_10"><input type="hidden" id="replyuId" value="' + replyuId + '"><input type="hidden" id="replyUtype" value="' + replyUtype + '"><input type="hidden" id="replyName" value="' + replyname + '"><textarea id="comment_text"></textarea></div>'
				+ '<div class="clearfix">'
					+ '<div class="f_l"><!--<a class="emotion"><i class="icon express_icon mg_r_10"></i></a>--></div>'
					+ '<div class="f_r"><a class="yellow_btn post_comm_btn">发布</a></div>'
				+ '</div>'
			+ '</div>';
            var _postAfter = $(this).parent().parent().parent('.post_after');
            $('.comm_input').remove();
            _postAfter.parent().append(_commInput);
            addEmotion('comment_text');
        });
        $('a.post_comm_btn').live('click', function () {
            var _commInput = $(this).parent().parent().parent().parent().parent();
            var _repeatComm = _commInput.find('.repeat_comm');
            if ($("#comment_text").val() == '') {
                $("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">请填写评论后再发布！</b></span>');
                openPopup("280", "popup_zan");
                return false;
            }
            var commentText = replace_em($("#comment_text").val());
            var conId = $("#conId").val();
            var cType = $("#cType").val();
            var replyuId = $("#replyuId").val();
            var replyName = $("#replyName").val();
            var replyUtype = $("#replyUtype").val();
            var parentComId = _commInput.find('.commentId').val();
            var data = { datas: { conId: conId, cType: cType, replyuId: replyuId, replyUtype: replyUtype, replyName: replyName, content: commentText, parentComId: parentComId } }
            $(this).removeClass("yellow_btn").addClass("grey_btn").text('发布...');
            if (!_repeatComm.hasClass('repeat_bd')) { _repeatComm.addClass('repeat_bd'); }
            $.post(domain + "/datas/comment", data, function (data) {
                var datas = eval('(' + data + ')');
                switch (datas.isSuccess) {
                    case 1:
                        if (datas.userId == datas.replyuId) {
                            if (datas.replyUtype == datas.uType) {
                                var _repeatPanel = '<div class="repeat_panel">'
									+ '<div class="clearfix post_after">'
										+ '<div class="f_l w_30 mg_r_10"><a target="_blank" href="' + datas.userUri + '"><img src="' + datas.userAvatar + '" alt="" width="30"/></a></div>'
										+ '<div class="f_l w_570 line_em">'
											+ '<p class=""><a class="font_b inline_bk mg_r_5" target="_blank" href="' + datas.userUri + '">' + datas.userNickName + '</a></p>'
											+ '<p class="">' + commentText + '</p>'
											+ '<p class="a_r"><input class="replyuId" type="hidden" value="' + datas.userId + '" name="replyuid"><input class="replyUtype" type="hidden" value="' + datas.uType + '" name="replyUtype"><input class="replyName" type="hidden" value="' + datas.userNickName + '" name="replyName"><span class="color_999 inline_bk v_m mg_r_10 mg_l_10">' + datas.timeStamp + '</span><a class="color_blue click_repeat v_m">回复</a></p>'
										+ '</div>'
									+ '</div>'
								+ '</div>';
                            } else {
                                var _repeatPanel = '<div class="repeat_panel">'
									+ '<div class="clearfix post_after">'
										+ '<div class="f_l w_30 mg_r_10"><a target="_blank" href="' + datas.userUri + '"><img src="' + datas.userAvatar + '" alt="" width="30"/></a></div>'
										+ '<div class="f_l w_570 line_em">'
											+ '<p class=""><a class="font_b inline_bk mg_r_5" target="_blank" href="' + datas.userUri + '">' + datas.userNickName + '</a> 回复 <a target="_blank" href="' + datas.replyUri + '">' + datas.replyName + '</a></p>'
											+ '<p class="">' + commentText + '</p>'
											+ '<p class="a_r"><input class="replyuId" type="hidden" value="' + datas.userId + '" name="replyuid"><input class="replyUtype" type="hidden" value="' + datas.uType + '" name="replyUtype"><input class="replyName" type="hidden" value="' + datas.userNickName + '" name="replyName"><span class="color_999 inline_bk v_m mg_r_10 mg_l_10">' + datas.timeStamp + '</span><a class="color_blue click_repeat v_m">回复</a></p>'
										+ '</div>'
									+ '</div>'
								+ '</div>';
                            }
                        } else {
                            var _repeatPanel = '<div class="repeat_panel">'
								+ '<div class="clearfix post_after">'
									+ '<div class="f_l w_30 mg_r_10"><a target="_blank" href="' + datas.userUri + '"><img src="' + datas.userAvatar + '" alt="" width="30"/></a></div>'
									+ '<div class="f_l w_570 line_em">'
										+ '<p class=""><a class="font_b inline_bk mg_r_5" target="_blank" href="' + datas.userUri + '">' + datas.userNickName + '</a> 回复 <a target="_blank" href="' + datas.replyUri + '">' + datas.replyName + '</a></p>'
										+ '<p class="">' + commentText + '</p>'
										+ '<p class="a_r"><input class="replyuId" type="hidden" value="' + datas.userId + '" name="replyuid"><input class="replyUtype" type="hidden" value="' + datas.uType + '" name="replyUtype"><input class="replyName" type="hidden" value="' + datas.userNickName + '" name="replyName"><span class="color_999 inline_bk v_m mg_r_10 mg_l_10">' + datas.timeStamp + '</span><a class="color_blue click_repeat v_m">回复</a></p>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
                        }
                        _commInput.append(_repeatPanel);
                        _commInput.find('.replyComCount').text(datas.commentCount);
                        $('.comm_input').remove();
                        $(this).removeClass("grey_btn").addClass("yellow_btn").text('发布');
                        break;
                    case 0:
                        $("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">服务器正忙，稍后评论！</b></span>');
                        openPopup("280", "popup_zan");
                        $(this).removeClass("grey_btn").addClass("yellow_btn").text('发布');
                        break;
                }
            });
        });

        //替换表情
        function replace_em(str) {
            str = str.replace(/\</g, '&lt;');
            str = str.replace(/\>/g, '&gt;');
            str = str.replace(/\n/g, '<br/>');
            str = str.replace(/\[em_([0-9]*)\]/g, '<img src="http://file.digitaling.com/images/face/$1.gif" border="0" />');
            return str;
        };
        function addEmotion(txt) {
            $('.emotion').qqFace({
                assign: txt, //给那个控件赋值
                path: 'http://file.digitaling.com/images/face/'	//表情存放的路径
            });
        };
        addEmotion('saytext');
        $("#pubComment").click(function () {
            if ($("#saytext").val() == '') {
                $("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">请填写评论后再发布！</b></span>');
                openPopup("280", "popup_zan");
                return false;
            }
            var commentText = replace_em($("#saytext").val());
            var conId = $("#conId").val();
            var cType = $("#cType").val();
			var cTitle = $("#cTitle").val();
			var cCover = $("#cCover").val();
            var share_sina = $("#share_sina_val").val();
            var share_qq = $("#share_qq_val").val();
            var data = { datas: { conId: conId, cType: cType, content: commentText, parentComId: 0 },synch:{share_sina:share_sina,share_qq:share_qq,conId:conId,cTitle:cTitle,cCover:cCover,cType: cType}}		
            $("#pubComment").removeClass("yellow_btn").addClass("grey_btn").text('发布...');
            $.post(domain + "/datas/comment", data, function (data) {
                switch (data.isSuccess) {
                    case 1:
                        var comment_li = '<li><div><div class="repeat_comm"><div class="clearfix post_after"><div class="f_l w_50 mg_r_10"><a target="_blank" href="' + data.userUri + '"><img src="' + data.userAvatar + '" alt="" width="50" height="50" /></a></div><div class="f_l w_600 line_16"><p class="font_14"><a class="font_b" target="_blank" href="' + data.userUri + '">' + data.userNickName + ':</a><input type="hidden" value="' + data.comId + '" class="commentId"></p><p class="font_14">' + commentText + '</p><p class="a_r font_12" ><input class="replyuId" type="hidden" value="' + data.userId + '" name="replyuid"><input class="replyUtype" type="hidden" value="' + data.uType + '" name="replyUtype"><input class="replyName" type="hidden" value="' + data.userNickName + '" name="replyName"><span class="color_999 inline_bk v_m mg_r_10 mg_l_10">' + data.timeStamp + '</span><a class="color_blue click_comm v_m">评论 <span class="replyComCount">0</span></a></p></div></div></div></div></li>';
                        $("#comments ul").prepend(comment_li);
                        $("#pubComment").removeClass("grey_btn").addClass("yellow_btn").text('发布');
                        $("#commentCount_top,#commentCount_bom").text(data.commentCount);
                        $("#saytext").val("");
						
                        if (data.commentCount > 10) {
                            var pages = Math.ceil(data.commentCount / 10)
                            var page_bar = '';
                            for (p = 1; p <= pages; p++) {
                                if (p == 1) {
                                    var pageBar = '<a class="act" href="javascript:void(0);" onclick="comment.getComment(' + conId + ',' + cType + ',' + p + ');">' + p + '</a>';
                                } else {
                                    var pageBar = '<a href="javascript:void(0);" onclick="comment.getComment(' + conId + ',' + cType + ',' + p + ');">' + p + '</a>';
                                }
                                page_bar += pageBar;
                            }
                            $("#comment_page").html(page_bar);
                        }

                        break;
                    case 0:
                        $("#popup_zan .popup_con .tips").html('<i class="icon uncurrent_b_icon mg_r_5"></i><span class="v_m"><b class="inline_bk color_red mg_r_10">服务器正忙，稍后评论！</b></span>');
                        openPopup("280", "popup_zan");
                        $("#pubComment").removeClass("grey_btn").addClass("yellow_btn").text('发布');
                        break;
                }
            }, "json");//end post
        });

    },
    level: function () {
        $('a.level').live('click', function () {
            var userType = $('#userType').val();
            if (userType == '') {
                openPopup('400', 'popup_login');
            } else if (userType == '2') {
                window.open(domain + '/company/advertisement');
            } else if (userType == '1') {
                window.open(domain + '/user/privilege');
            }
        })
    },
    wmode: function () {
        $('#article_con').find('embed').each(function (i) {
			$(this).attr("wmode", "opaque").wrap('<div id="flash_'+i+'">');
			$("#flash_"+i).html($("#flash_"+i).html());
        });
    },
	conImg: function (type) {
		$('#'+type+'_con').find('img').each(function (i) {
			$(this).addClass("load").attr("data-original",$(this).attr("src")).removeAttr("src");
		})
		$('#'+type+'_con img').lazyload({placeholder:"http://file.digitaling.com/images/common/loadimg.gif"});
    },
	wxqrc: function () {
	    function shareSnsIcon(bs,bt) {
	        //show hide sns
	        $('#add_' + bs + '_sns_con').hover(function () {
	            $('#add_' + bs + '_sns_con .add_sns_link').css('display', 'none');
	            $('#add_' + bs + '_sns_con .hide_sns_box').removeClass('hide');
	        }, function () {
	            $('#add_' + bs + '_sns_con .add_sns_link').css('display', 'inline-block');
	            $('#add_' + bs + '_sns_con .hide_sns_box').addClass('hide');
	        });
	        //二维码
	        $('#share_' + bs + '_weixin').hover(function () {
	            var imgurl = $('#qrimgurl_' + bs ).val();
	            if ($('#qrcode_' + bs + '_infobox img').attr("src") == "") {
	                $.get(domain + "/qr/image/" + imgurl, function (data) {
	                    $('#qrcode_' + bs + '_infobox img').attr("src", data.content);
	                    $('#qrcode_' + bs + '_loading').addClass('hide');
	                    $('#qrcode_' + bs + '_infobox').removeClass('hide');
	                }, 'json');
	            }
	            $('#qrcode_' + bs + '_box').css('display', 'block');
	        }, function () {
	            $('#qrcode_' + bs + '_box').css('display', 'none');
	        });
	    }
        //ues 20x20
	    shareSnsIcon('s',31);
	    //ues 30x30
	    shareSnsIcon('b',36);
	},
	closeTips: function (type) {
		var data = {type:type}
		$.post(domain+"/datas/setCookies",data,function(data){
			$('#tips_random').slideUp();
		},"json");
	},
	goanimate: function () {
	    var $el = $('#btop');
	    var $el_top = $('#btop .back_top');
	    //add 自适应
	    var _fixSection = function () {
	        var win_w = $(window).width();
	        var win_h = $(window).height();
	        var _right = 15;
	        if (win_w > 1115) {
	            var _right = (win_w - 1000) / 2 - 45;
	        }
	        $el.css('right', _right + 'px');
	        //ie6
	        if ($.browser.msie) {
	            if ($.browser.version === "6.0") {
	                if (document.documentElement.clientWidth > 1115) {
	                    var _right = (document.documentElement.clientWidth - 1000) / 2 - 45;
	                }
	                //alert(_right);
	                $el.css('right', _right + 'px');
	            }
	        }
	    };
	    $(window).resize(_fixSection);
	    _fixSection();
	    //end add
	    $(window).bind('scroll', function () {
	        var pos = 0;
	        pos = parseInt(document.body.scrollTop || document.documentElement.scrollTop);
	        //alert(pos);
	        if (pos > 50) {
	            $el_top.fadeIn();
	        } else {
	            $el_top.fadeOut();
	        }

	    });
	    //回顶部
	    $el.on('click', '#return_top', function (e) {
	        e.preventDefault();
	        $('html,body').animate({
	            scrollTop: 0
	        }, 400);
	    });
	},
	siteNav: function (ep) {
	    $('#site_nav_ul li:not(.em_li)').hover(function () {
	        $(this).siblings().removeClass('on');
	        $(this).addClass('on');
	    }, function () {
	        $(this).removeClass('on');
	    });
	    if (ep != 0) { navScroll();}
	    function navScroll() {
	        //浮动滚动
	        $(window).scroll(function () {
	            var st = $(document).scrollTop();
	            (st > 0) ? $('#d_site').addClass("fixd_nav") : $('#d_site').removeClass("fixd_nav");
	            (st > 125) ? $('.site_menu').slideDown() : $('.site_menu').slideUp();
	        });
	        if (navigator.userAgent.indexOf('Firefox') >= 0) {
	            var st = $(document).scrollTop();
	            (st > 0) ? $('#d_site').addClass("fixd_nav") : $('#d_site').removeClass("fixd_nav");
	            (st > 125) ? $('.site_menu').slideDown() : $('.site_menu').slideUp();
	        }
	    }
	},
	showQrcImg: function () {
	    //rss_box weixin wrc
	    $('.bsns_blk_weixin').hover(function () {
	        if ($(this).parent().next('.digital_wx').hasClass('hide')) {
	            $(this).parent().next('.digital_wx').removeClass('hide');
	        }
	    }, function () {
	        $(this).parent().next('.digital_wx').addClass('hide');
	    });
	    $('.digital_wx').hover(function () {
	        $(this).removeClass('hide');
	    }, function () {
	        $(this).addClass('hide');
	    });
	    //mobile wrc
	    $('#footer .wap_link').hover(function () {
	        if ($('#footer .footer_qrc').hasClass('hide')) {
	            $('#footer .footer_qrc').removeClass('hide');
	        }
	    }, function () {
	        $('#footer .footer_qrc').addClass('hide');
	    });
	    $('#footer .footer_qrc').hover(function () {
	        $(this).removeClass('hide');
	    }, function () {
	        $(this).addClass('hide');
	    });
	},
	hsSelect: function () {
	    $('#hs_select').hover(function () {
	        $(this).children('.show_hslist').addClass('bg_f6');
	        $(this).children('.hs_list').removeClass('hide');
	        $('#hs_list>li').click(function () {
	            var _hsli = $(this);
	            var _hsli_text = _hsli.children('a').text();
	            var _hsli_val = _hsli.attr('values');
	            _hsli.siblings('li').removeClass('hide');
	            _hsli.addClass('hide');
	            $('#hs_select').find('em').text(_hsli_text);
	            $('#cathead').val(_hsli_val);
	            _hsli.parent('ul').addClass('hide');
	        })
	    }, function () {
	        $(this).children('.show_hslist').removeClass('bg_f6');
	        $(this).children('.hs_list').addClass('hide');
	    })
	}
};
//kind_editor
var editor;
var contentEditor = {
    simples: function () {
        KindEditor.ready(function (K) {
            editor = K.create('textarea.content_editor', {
                allowFileManager: false,
                allowUpload: true,
                items: [
                        'formatblock', 'bold', 'italic', 'forecolor', 'hilitecolor', 'strikethrough', 'justifyleft',
                        'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist',
                        'lineheight', 'indent', 'outdent', 'link', 'unlink', 'removeformat', 'clearhtml'],
                uploadJson: domain + "/datas/eupload"
            });
        });
    },
    defaults: function (types) {
		var imageStr = types?'multiimage':'image';
        KindEditor.ready(function (K) {
            editor = K.create('textarea.content_editor', {
                allowFileManager: false,
                allowUpload: true,
                items: [
                        imageStr, 'link', 'unlink', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 
                        'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'removeformat', 'clearhtml', 'fullscreen', '/',
                        'formatblock', 'bold', 'italic', 'forecolor', 'hilitecolor', 'strikethrough',
                        'flash','insertfile','table', 'code', 'subscript', 'superscript', 'source'],
                uploadJson: domain + "/datas/eupload"
            });
        });
    },
    uploadSimple: function (id, folder, imgsrc, resize) {
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K('#' + id)[0],
                fieldName: 'imgFile',
                url: domain + '/datas/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        K('#' + imgsrc).attr("src", url);
                        if (resize) {
                            if (data.w > data.h) {
                                K('#' + imgsrc).attr("width", 320).attr("align", "absmiddle");
                            } else {
                                K('#' + imgsrc).attr("height", 320).attr("align", "absmiddle");
                            }
                        }
                    } else {
                        alert(data.message);
                    }
                },
                afterError: function (str) {
                    alert('自定义错误信息: ' + str);
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
    },
    uploadBtn: function (id, folder, imgsrc, resize) {
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K('#' + id)[0],
                fieldName: 'imgFile',
                url: domain + '/datas/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        K('#' + imgsrc).attr("src", url);
                        if (resize) {
                            if (data.w > data.h) {
                                K('#' + imgsrc).attr("width", 320).attr("align", "absmiddle");
                            } else {
                                K('#' + imgsrc).attr("height", 320).attr("align", "absmiddle");
                            }
                        }
                    } else {
                        alert(data.message);
                    }
                },
                afterError: function (str) {
                    alert('自定义错误信息: ' + str);
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
    },
    uploadApi: function (id, folder, imgsrc, resize) {
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K('#' + id)[0],
                fieldName: 'imgFile',
                url: domain + '/api/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        K('#' + imgsrc).attr("src", url);
                        if (resize) {
                            if (data.w > data.h) {
                                K('#' + imgsrc).attr("width", 320).attr("align", "absmiddle");
                            } else {
                                K('#' + imgsrc).attr("height", 320).attr("align", "absmiddle");
                            }
                        }
                    } else {
                        alert(data.message);
                    }
                },
                afterError: function (str) {
                    alert('自定义错误信息: ' + str);
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
    },
    uploadBanner: function (id, folder, imgsrc, bannerUrl) {
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K(id)[0],
                fieldName: 'imgFile',
                url: domain + '/datas/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        K(imgsrc).attr("src", url);
                    } else {
                        alert(data.message);
                    }
                },
                afterError: function (str) {
                    alert('自定义错误信息: ' + str);
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
    },
    uploadIdPic: function (id, folder, imgsrc, hidden, delId) {
        var _deletehtml = '<span class="font_12"><i class="icon attach_icon mg_r_5"></i><a class="v_m color_666" target="_blank" href="Ritz_ShanghaiPudong_00083_1220x520.jpg" title="Ritz_ShanghaiPudong_00083_1220x520.jpg" id="feedback_pic_src">Ritz_ShanghaiPudong_00083_1220x520.jpg</a></span><a id="delete_feedback_pic" class="font_14 font_b color_blue mg_l_10 v_m" href="javascript:void(0);">删除</a>';
        KindEditor.ready(function (K) {
            var uploadbutton = K.uploadbutton({
                button: K('#' + id)[0],
                fieldName: 'imgFile',
                url: domain + '/datas/eupload?dir=' + folder,
                afterUpload: function (data) {
                    if (data.error === 0) {
                        var url = K.formatUrl(data.url, 'absolute');
                        $('#upload_attach_box').hide();
                        $('#delete_attach_box').html(_deletehtml);
                        $('#' + imgsrc).text(url);
                        $('#' + imgsrc).attr('title', url);
                        $('#' + imgsrc).attr('href', url);
                        $('#' + hidden).val(url);
                    } else {
                        alert(data.message);
                        $('#' + hidden).val(0);
                    }
                },
                afterError: function (str) {
                    alert('自定义错误信息: ' + str);
                }
            });
            uploadbutton.fileBox.change(function (e) {
                uploadbutton.submit();
            });
        });
        //ie8 第一次点击失效
        $('#' + delId).live('click',function () {
            $('#upload_attach_box').show();
            $('#delete_attach_box').html('');
        })
    }
};
//login
var login = {
    profile: function () {
        $('ul.profile_tabs>li').click(function () {
            //TODO checked

            var tabs = $(this).parent().children('li');
            var panels = $(this).parent().parent().parent().find('.tab_main');
            var index = $.inArray(this, tabs);
            tabs.removeClass('on').eq(index).addClass('on');
            panels.removeClass("show").eq(index).addClass("show");
        })
    },
    invite: function () {
        $('.start_load_btn').click(function () {
            $('.check_mail').addClass('hide');
            $('.invite_friend').removeClass('hide');
        })
    },
    inputPanel: function () {
        errorPopup('.registe_box .register_panel');
        vmplaceholder();
    },
    inputPanelPopup: function () {
        popupError('.registe_box .register_panel');
        vmholderpopup();
    },
    company: function () {
        //slide company bg
        var bodies = $('.company_bg_list .company_bg_pic ul li');
        var defaultOpts = { interval: 5000 };
        var _count = $('.company_bg_list .company_bg_pic ul li').length;
        var _current = 0;
        var _intervalID = null;
        var stop = function () { window.clearInterval(_intervalID); };
        var slide = function (opts) {
            if (opts) {
                _current = opts.current || 0;
            } else {
                _current = (_current >= (_count - 1)) ? 0 : (++_current);
            };
            //$(bodies).filter(":visible").fadeOut('fast');
            //$(bodies).eq(_current).fadeIn('slow');
            $(bodies).filter(":visible").css({
                display: 'none',
                opacity: 1
            }).animate({
                opacity: 0
            }, 1500);
            $(bodies).eq(_current).css({
                display: 'block',
                opacity: 0
            }).animate({
                opacity: 1
            }, 1500);
        };
        var go = function () {
            stop();
            _intervalID = window.setInterval(function () { slide(); }, defaultOpts.interval);
        };
        $(bodies).hover(stop, go);
        go();
    }
};
//article
var article = {
    artli: function () {
        $('.arlli_tab .con_list ul li').hover(function () {
            $(this).addClass('over');
        }, function () {
            $(this).removeClass('over');
        })
    },
    delArt: function (id, func, favType) {//delete article
        var data = { id: id, favType: favType }
        $.post(domain + "/datas/" + func, data, function (data) {
            switch (data.isSuccess) {
                case 1:
                    closeDel('delart_' + id);
                    $("#art_list_id_" + id).slideUp();
                    break;
            }
        }, "json");
    },
    yellowTip: function () {
        $('.saved_tip_box a.del_artli_btn').click(function () {
            $(this).parent('.saved_tip_box').slideUp();
        })
    },
    selectbox: function () {
        var flag = true;
        $('.select_box,.select_panel').hover(function () {
            flag = false;
        }, function () {
            flag = true;
        });
        $('body').click(function () {
            if (flag) {
                $('.select_panel').addClass('hide');
            }
        });
        $('.select_box').click(function () {
            if (!$(this).next('.select_panel').hasClass('hide')) {
                $(this).next('.select_panel').addClass('hide');
            } else {
                var _set = $(this).find('span.v_m');
                $('.select_panel').addClass('hide');
                $(this).next('.select_panel').removeClass('hide');
                $(this).next('.select_panel').find('a').click(function () {
                    var _get = $(this).text();
                    _set.text(_get);
                    $('.select_panel').addClass('hide');
                })
            }
        })
    },
    publish: function () {
        //tag edit
        tagEdit('.tag_edit .editag_btn', '.tag_edit .tag_item .tag_list', '.tag_edit .tag_input .title_text', '.tag_edit .tag_input .blue_btn');

        //标题输入字数
        wordLess('#article_title', '.input_less', 30);
        //摘要数字
        wordLess('.describe_text', '.textarea_less', 140);
        //posttime
        $('a.change_posttime').click(function () {
            $(this).parent('span.date_span').hide();
            $(this).parents('.pub_time').find('.post_time_box').removeClass('hide');
        });
        //confirm posttime
        $('a.preview_btn').click(function () {
            var _data = $('.post_time_input input.date_text').val();
            var _hour = $('.post_time_input input.hour_text').val();
            var _minute = $('.post_time_input input.minute_text').val();
            if (_hour < 0 || _hour > 24 || _hour =='') {
                $('.post_time_input input.hour_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.hour_text').css('border-color', '#bbb');
            }
            if (_minute < 0 || _minute > 60 || _minute=='') {
                $('.post_time_input input.minute_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.minute_text').css('border-color', '#bbb');
            }
            $(this).parents('.pub_time').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
            $(this).parents('.pub_time').find('span.date_span b').text(_data + ' ' + _hour + ':' + _minute);
        });
        //cancel posttime
        $('a.cancel_posttime').click(function () {
            $(this).parents('.pub_time').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
        });
        //pub_tip_box
        $('.pub_tip_box a.del_artli_btn').click(function () {
            $(this).parents('.pub_tip_box').slideUp();
        });
        //add author
        $('.author_table .add_del_td a.addr_icon').click(function () {
            var author_tr = '<tr>'
                                + '<td width="40%" class="author_name"><label>Name：</label><input type="text" class="w_190" /></td>'
                                + '<td width="55%" class="author_url"><label>URL：</label><input type="text" class="w_300"  /> </td>'
                                + '<td class="add_del_td"><a class="icon del_icon"></a></td>'
                            + '</tr>';
            var _len = $('.author_table tr').length;
            if (_len <= 3) {
                $(this).parents('.author_table').append(author_tr);
            }
        });
        $('.add_del_td a.del_icon').live('click', function () {
            $(this).parent().parent('tr').remove();
        });
        //cover
        $('.preview_cover_box').hover(function () {
            $('.preview_cover_box .preview_c_txt').addClass('hide');
            //$('.preview_cover_box .preview_c_btn').removeClass('hide');
            $('.preview_cover_box .preview_c_btn').css('visibility', 'visible');
        }, function () {
            $('.preview_cover_box .preview_c_txt').removeClass('hide');
            //$('.preview_cover_box .preview_c_btn').addClass('hide');
            $('.preview_cover_box .preview_c_btn').css('visibility', 'hidden');
        })
        //advance_set_link
        $('.advance_set_link a').click(function () {
            $('.advance_set_box').removeClass('hide');
        });
        $('.advance_set_box a.del_info_icon').click(function () {
            $(this).parent().addClass('hide');
        })
    },
    source: function () {
        $("#article_source").change(function () {
            if ($(this).val() != 0) {
                location.href = domain + $(this).val();
            }

        });
    },
    yellowPopup: function () {
        //what is dm collection popup
        $('.embody_box i.ques_icon').parent('a').hover(function () {
            $(this).parent().find('.whatis_dm').show();
        }, function () {
            $(this).parent().find('.whatis_dm').hide();
        });
        //buy privilege popup
        $('.privilege_panel i.ques_icon').parent('a').hover(function () {
            $('.privilege_panel').next().show();
        }, function () {
            $('.privilege_panel').next().hide();
        });
        //互相关注.激活私信！
        $('.no_flow_btn').hover(function () {
            $(this).parent().parent().find('.direct_msg').show();
        }, function () {
            $(this).parent().parent().find('.direct_msg').hide();
        })
    }
};
//works
var works = {
    editMyworks: function () {
        $('.myworks_list ul li').hover(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        })
    },
	delPro: function (id,func,favType) {//delete article
		var data = {id:id,favType:favType}
		$.post(domain+"/datas/"+func,data,function(data){
			switch(data.isSuccess){
				case 1:
					closeDel('delpro_'+id);
					$("#pro_list_id_"+id).remove();
				break;
			}
		},"json");
    },
	
    workTabs: function () {
        $('.agency_radio input[type=radio]').change(function () {
            var $this = $(this);
            if ($this.attr("value") == 3) {
                $('.com_agency').addClass('hide');
            } else if ($this.attr("value") == 4) {
                $('.com_agency').removeClass('hide');
            }
            else { }
        });
    },
    publish: function () {
        //tag editbtn, tagli, taginput, addbtn
        tagEdit('.tag_edit .editag_btn', '.tag_edit .tag_item .tag_list', '.tag_edit .tag_input .title_text', '.tag_edit .tag_input .blue_btn');
        //标题输入字数
        wordLess('#project_title', '.input_less', 30);

        //role_list
        $('.role_list li').toggle(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        });
        //online
        $('.onoff_line input[type=radio]').change(function () {
            var $this = $(this);
            if ($this.attr("value") == 2) {
                $this.parent().parent().find('.vm_label').addClass('hide');
            } else if ($this.attr("value") == 1) {
                $this.parent().parent().find('.vm_label').removeClass('hide');
            }
            else { }
        });
        //posttime
        $('a.change_posttime').click(function () {
            $(this).parent('span.date_span').hide();
            $(this).parents('.pub_time').find('.post_time_box').removeClass('hide');
        });
        //confirm posttime
        $('a.preview_btn').click(function () {
            var _data = $('.post_time_input input.date_text').val();
            var _hour = $('.post_time_input input.hour_text').val();
            var _minute = $('.post_time_input input.minute_text').val();
            if (_hour < 0 || _hour > 24 || _hour == '') {
                $('.post_time_input input.hour_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.hour_text').css('border-color', '#bbb');
            }
            if (_minute < 0 || _minute > 60 || _minute == '') {
                $('.post_time_input input.minute_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.minute_text').css('border-color', '#bbb');
            }
            $(this).parents('.pub_time').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
            $(this).parents('.pub_time').find('span.date_span b').text(_data + ' ' + _hour + ':' + _minute);
        });
        //cancel posttime
        $('a.cancel_posttime').click(function () {
            $(this).parents('.pub_time').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
        });
        //pub_tip_box
        $('.pub_tip_box a.del_artli_btn').click(function () {
            $(this).parents('.pub_tip_box').slideUp();
        });
        //add author
        $('#add_teammates').click(function () {
            var m = $('#team_member').find('tr').length;
            var teammates_tr = '<tr>'
                                + '<td width="40%"><label>Name:</label><input type="hidden" value="" name="userId" class="user_' + m + '"><input type="text" class="w_190 username_' + m + '" value="" name="username"/></td>'
                                + '<td width="55%"><label><label>Title:</label><input type="text" class="w_290 userTitle_' + m + '" value="" name="userTitle"/></td>'
                                + '<td class="add_del_td"><a class="icon del_icon"></a></td>'
                            + '</tr>';
            if (m < 30) {
                $('#team_member').append(teammates_tr);
            }
        });

        $('.add_del_td a.del_icon').live('click', function () {
            $(this).parent().parent('tr').remove();
        });
        //cover
        $('.preview_cover_box').hover(function () {
            $('.preview_cover_box .preview_c_txt').addClass('hide');
            //$('.preview_cover_box .preview_c_btn').removeClass('hide');
            $('.preview_cover_box .preview_c_btn').css('visibility', 'visible');
        }, function () {
            $('.preview_cover_box .preview_c_txt').removeClass('hide');
            //$('.preview_cover_box .preview_c_btn').addClass('hide');
            $('.preview_cover_box .preview_c_btn').css('visibility', 'hidden');
        })
        //advance_set_link
        $('.advance_set_link a').click(function () {
            $('.advance_set_box').removeClass('hide');
        });
        $('.advance_set_box a.del_info_icon').click(function () {
            $(this).parent().addClass('hide');
        });
        //per_pro_chb
        var perchb = $('input[name=per_pro_chb]');
        function perpro() {
            if (!perchb.attr("checked")) {
                $('.com_agency').removeClass('hide');
            } else {
                $('.com_agency').addClass('hide');
            }
        }
        perpro();
        $('#per_pro_chb').click(function () { perpro(); });
    },
    score: function (id, myscore, read) {
        $('#score').raty({
            path: domain + '/file/js/3rd/raty/img',
            half: true,
            hints: ['1', '2', '3', '4', '5'],
            readOnly: read,
            score: myscore / 2,
            size: 40,
            width: 222,
            click: function (score, evt) {
				var cTitle = $("#cTitle").val();
				var cCover = $("#cCover").val();
				var conId  = $("#conId").val();
                var data   = { datas: { conId: id, score: score * 2 },synch:{conId:conId,cTitle:cTitle,cCover:cCover,score: score * 2}}
                $.post(domain + "/datas/score", data, function (datas) {
                    $('#score_num').text(score * 2);
                    var data = eval('(' + datas + ')');
                    $('.grey_score_box').addClass('hide');
                    $('.red_score_box').removeClass('hide');
                    switch (data.isSuccess) {
                        case 0:
                            $('.red_score_box span').text("评分失败了！");
                            break;
                        case 1:
                            $('.red_score_box span').text("谢谢");
                            $('.grey_score_box .pro_sc_txt').text('我的评分');
                            $('#score').raty({ path: domain + '/file/js/3rd/raty/img', half: true, readOnly: true, score: score });
                            break;
                        case 2:
                            $('.red_score_box span').text("你已经评过分了！");
                            $('#score').raty({ path: domain + '/file/js/3rd/raty/img', half: true, readOnly: true, score: myscore / 2 });
                            $('#score_num').text(myscore);
                            break;
                    }
                });
            }
        });
        $('#score').click(function () {
            if ($("#userType").val() == '') {
                openPopup("400", "popup_login");
                return false;
            } else {
                loopTime();
            }
        });
        function loopTime() {
            //倒计时
            var iNum = 0;
            var iMax = 3;
            var iIntervalId = null;
            function incNum() {
                if (!$('.red_score_box').hasClass('hide')) {
                    iMax--;
                }
                if (iMax <= iNum) {
                    clearInterval(iIntervalId);
                    $('.grey_score_box').removeClass('hide');
                    $('.red_score_box').addClass('hide');
                    $('#score_num').css('display', 'inline-block');
                    $('.grey_score_box .want_score').hide();
                    $('.grey_score_box .average_score').removeClass('hide').addClass('inline_bk');
                }
            }
            iIntervalId = setInterval(incNum, 1000);
        }
    },
    projectOwner: function () {
        $("#project_own").change(function () {
            if ($(this).val() != 0) {
                location.href = domain + $(this).val();
            }
        });
    },
    projectIndu: function () {
        $("#project_industry").change(function () {
            location.href = domain + $(this).val();
        });
    },
    vmselect: function () {
        var _panel = $('.roles_list span');
        var _panel_input = $('.roles_list span input');
        var _box = $('.roles_list div');
        var flag = true;
        _panel.hover(function () { flag = false; }, function () { flag = true; });
        _box.hover(function () { flag = false; }, function () { flag = true; });
        _panel.click(function () {
            //for projects
            if ($(this).parents().hasClass('com_agency')) {
                $('.pro_editor_con').find('.vm_roles_panel').addClass('hide');
            } else if ($(this).parents().hasClass('pro_editor_con')) {
                $('.com_agency').find('.vm_roles_panel').addClass('hide');
            }
            //for all
            $(this).parent().parent().siblings().find('.vm_roles_panel').addClass('hide');
            if ($(this).next('.vm_roles_panel').hasClass('hide')) {
                $(this).next('.vm_roles_panel').removeClass('hide');
            }else{
                $(this).next('.vm_roles_panel').addClass('hide');
            }
        })
        $('body').click(function () {
            if (flag) { _box.addClass('hide'); }
        });
    }
};
//jobs
var jobs = {
    search: function () {
        //onoff advance search
        $('.onoff_job a.onjob_link').click(function () {
            $(this).addClass('hide');
            $(this).next('.offjob_link').removeClass('hide');
            $('.search_job .job_key_btn').addClass('hide');
            $('.search_job .search_job_advance').removeClass('hide');
        });
        $('.onoff_job a.offjob_link').click(function () {
            $(this).addClass('hide');
            $(this).prev('.onjob_link').removeClass('hide');
            $('.search_job .job_key_btn').removeClass('hide');
            $('.search_job .search_job_advance').addClass('hide');
        });
        //condition_list
        $('.condition_list ul li').hover(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        });
        $('.condition_list ul li a.del_tip_icon').click(function () {
            $(this).parent('li').hide();

        })
        //todo select condition
    },
    switchView: function () {
        var _style = $(".switch_view a");
        var _loose = $(".switch_view a.loose");
        var _compact = $(".switch_view a.compact");
        _style.click(function () {
            if (_style.hasClass("act_loose")) {
                _loose.removeClass("act_loose");
                _compact.addClass("act_compact");
                $('.switch_view_con .loose_view').addClass('hide');
                $('.switch_view_con .compact_view').removeClass('hide');
            } else {
                _loose.addClass("act_loose");
                _compact.removeClass("act_compact");
                $('.switch_view_con .loose_view').removeClass('hide');
                $('.switch_view_con .compact_view').addClass('hide');
            }
        });
    },
    editFavJob: function () {
        $('.fav_jobs .loose_view ul li').hover(function () {
            $(this).addClass('over');
        }, function () {
            $(this).removeClass('over');
        });
        //job_edit_list
        $('.job_edit_list ul li').hover(function () {
            $(this).addClass('over');
            $('a.del_artli_btn').click(function () {
                $(this).parent('li').slideUp();
            })
        }, function () {
            $(this).removeClass('over');
        });
        //store_table
        $('.store_table table tr').hover(function () {
            $(this).find('.del_store_lable').removeClass('hide');
            $('a.del_artli_btn').click(function () {
                $(this).parents('tr').remove();
            })
        }, function () {
            $(this).find('.del_store_lable').addClass('hide');
        });
    },
    shelf: function () {
        $('.shelf_box .shelf_link').click(function () {
            $(this).parents('.shelf_box').find('.shelf_list').removeClass('hide');
        });
        $('.shelf_box .confirm_shelf').click(function () {
            $(this).parents('.shelf_box').find('.shelf_list').addClass('hide');
            //复制职位信息
            var jobId = $('input[name=jobname]:checked').val();
            //alert(jobId);
            if (jobId != '') {
                location.href = domain+'/jobs/publish/'+jobId;
            }

        });
        $('.shelf_box .cancel_btn').click(function () {
            $(this).parents('.shelf_box').find('.shelf_list').addClass('hide');
        });

        //pjob_name accelerator
        $('.pjob_name input[name=accelerator]').click(function () {
            if (this.checked) {
                $(this).parents('.pjob_name').find('.use_accelerator').removeClass('hide');
            } else {
                $(this).parents('.pjob_name').find('.use_accelerator').addClass('hide');
            }
        });
        //shelf_list_box ul li bg
        $('.shelf_list_box input[name=jobname]').click(function () {
            if (this.checked) {
                $(this).parents('li').siblings('li').removeClass('bg_blue');
                $(this).parents('li').addClass('bg_blue');
            } else {
                $(this).parents('li').removeClass('bg_blue');
            }
        })

    },
    publish: function () {
        //close tip_box
        $('.saved_tip_box a.del_artli_btn').click(function () {
            $(this).parent('.saved_tip_box').slideUp();
        })
        //tag editbtn, tagli, taginput, addbtn
        tagEdit('.tag_edit .editag_btn', '.tag_edit .tag_item .tag_list', '.tag_edit .tag_input .title_text', '.tag_edit .tag_input .blue_btn');
        //标题输入字数
        //wordLess('#job_title', '.input_less', 30);
        //role_list
        $('.role_list li').toggle(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        });
        //online
        $('.onoff_line input[type=radio]').change(function () {
            var $this = $(this);
            if ($this.attr("value") == 2) {
                $this.parent().parent().find('.vm_label').addClass('hide');
            } else if ($this.attr("value") == 1) {
                $this.parent().parent().find('.vm_label').removeClass('hide');
            }
            else { }
        });
        //posttime
        $('a.change_posttime').click(function () {
            $(this).parent('span.date_span').hide();
            $(this).parents('.pub_job_r').find('.post_time_box').removeClass('hide');
        });
        //confirm posttime
        $('a.preview_btn').click(function () {
            var _data = $('.post_time_input input.date_text').val();
            var _hour = $('.post_time_input input.hour_text').val();
            var _minute = $('.post_time_input input.minute_text').val();
            if (_hour < 0 || _hour > 24 || _hour == '') {
                $('.post_time_input input.hour_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.hour_text').css('border-color', '#bbb');
            }
            if (_minute < 0 || _minute > 60 || _minute == '') {
                $('.post_time_input input.minute_text').css('border-color', '#ff3f6e');
                return false;
            } else {
                $('.post_time_input input.minute_text').css('border-color', '#bbb');
            }
            $(this).parents('.pub_job_r').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
            $(this).parents('.pub_job_r').find('span.date_span b').text(_data + ' ' + _hour + ':' + _minute);
        });
        //cancel posttime
        $('a.cancel_posttime').click(function () {
            $(this).parents('.pub_job_r').find('span.date_span').show();
            $(this).parents('.post_time_box').addClass('hide');
        });
        //pub_tip_box
        $('.pub_tip_box a.del_artli_btn').click(function () {
            $(this).parents('.pub_tip_box').slideUp();
        });
    }
};
//people
var people = {
    search: function () {
        //onoff advance search
        $('.search_job .onoff_job a.onjob_link').click(function () {
            $(this).addClass('hide');
            $(this).next('.offjob_link').removeClass('hide');
            $('.search_job .search_job_advance').removeClass('hide');
        });
        $('.search_job .onoff_job a.offjob_link').click(function () {
            $(this).addClass('hide');
            $(this).prev('.onjob_link').removeClass('hide');
            $('.search_job .search_job_advance').addClass('hide');
        });
        //condition_list
        $('.condition_list ul li').hover(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        });
        $('.condition_list ul li a.del_tip_icon').click(function () {
            $(this).parent('li').hide();

        })
        //todo select condition
    },
    invite: function () {
        //input_invite
        $('.input_invite a.yellow_btn').click(function () {
            $(this).parents('.input_invite').addClass('hide');
            $('.select_invite').removeClass('hide');
        });
        $('.select_invite a.yellow_btn').click(function () {
            $(this).parents('.select_invite').addClass('hide');
            $('.success_invite').removeClass('hide');
        });
        $('.success_invite a.yellow_btn').click(function () {
            $(this).parents('.success_invite').addClass('hide');
            $('.input_invite').removeClass('hide');
        });
        //$('.text_invite a.yellow_btn').click(function () {
		//	var email_address = $("#email_address").val();
		//	var data          = {datas:email_address};
		//	$.post(domain+"/datas/regInvite",data,function(data){
		//		switch(data.isSuccess){
		//			case 1:
		//				$('#text_invite').addClass('hide');
        //    			$('#success_text_invite').removeClass('hide');
		//			break;
		//			case 0:
		//				$('#text_invite').addClass('hide');
        //    			$('#success_text_invite').removeClass('hide');
		//			break;
		//		}
		//	},"json");
        //});
        //$('#success_text_invite a.yellow_btn').click(function () {
        //    $(this).parents('.success_text_invite').addClass('hide');
        //    $('.text_invite').removeClass('hide');
        //});
    },
    comInvite: function () {
        var email_address = $("#email_address").val();
        if (email_address == '') {
            $("#email_address").animate({
                backgroundColor: "#FF3F6E"
            }, 100);
            $("#email_address").animate({
                backgroundColor: "#ffffff"
            }, 100);
            $("#email_address").animate({
                backgroundColor: "#FF3F6E"
            }, 100);
            $("#email_address").animate({
                backgroundColor: "#ffffff"
            }, 100);
            return false;
        }
        var data = { datas: email_address };
        $.post(domain + "/datas/regInvite", data, function (data) {
            switch (data.isSuccess) {
                //成功
                case 1:
                    $('#text_invite').addClass('hide');
                    $('#success_text_invite').removeClass('hide');
                    $("#email_address").val('');
                    break;
                //失败
                case 0:
                    $('#text_invite').addClass('hide');
                    $('#success_text_invite').removeClass('hide');
                    break;
            }
        }, "json");
    },
    backInvite: function () {
        $('#success_text_invite').addClass('hide');
        $('#text_invite').removeClass('hide');
    }
};
//dashboard
var dashboard = {
    dynamicList: function () {
        $('.dynamic_list ul li').hover(function () {
            $(this).addClass('over');
            $('a.del_artli_btn').click(function () {
                $(this).parent('li').slideUp();
            })
        }, function () {
            $(this).removeClass('over');
        });
    },
    commentList: function () {
        //focus
        $('.comment_erea textarea').focus(function () {
            $(this).addClass('write');
            $(this).parent().next('.emotion_send_box').removeClass('hide');
        });
        //blur
        //$('.comment_erea textarea').blur(function () {
        //    $(this).removeClass('write');
        //    $(this).parent().next('.emotion_send_box').addClass('hide');
        //});
        //send
        $('.comment_erea .emotion_send_box .sub_btn').click(function () {
            $(this).parents('.comment_erea').find('textarea').removeClass('write');
            $(this).parents('.comment_erea').find('.emotion_send_box').addClass('hide');
        })

    },
    setting: function () {
        inputShow('#account_name', '#account_name_text');
        inputShow('#account_mobile', '#account_mobile_text');
        inputShow('#account_email', '#account_email_text');
        inputShow('#account_idcnum', '#account_idcnum_text');
    }
};
//资料进度
function proPrecent() {
    var pre = $('#profile_precent');
    var num = $('#precent_num').text();
    //var pre_w = pre.width();
    //alert(pre_w);
    var len = 0;
    var img_src = $('#avatar_src')[0].src;
    //alert(img_src);
    if (img_src != 'http://file.digitaling.com/images/avatar/avatar_m_320x320.jpg' && img_src != 'http://file.digitaling.com/images/avatar/avatar_f_320x320.jpg') {
        len += 10;
    }
    //website
    var site = 0;
    if ($('#edit_link_website').val() != 'http://') {
        site++;
    }
    if ($('#edit_link_blog').val() != 'http://') {
        site++;
    }
    if ($('#edit_link_weibo').val() != 'http://') {
        site++;
    }
    if (site == 1) { len += 10; } else if (site > 1) { len += 20 }
    //introduce
    if ($('#edit_introduce_text').val() != '' && $('#edit_introduce_text').val().length >= 50) { len += 10; }
    //account_name
    if ($('#edit_account_name').text() != '') { len += 10; }
    //account_name
    if ($('#edit_basic_nickname').val() != '') { len += 10; }
    ////location
    if ($('#edit_basic_province').val() != '0' && $('#edit_basic_city').val() != '0') { len += 10; }
    //job
    if ($('#edit_basic_function').val() != '0') { len += 10; }
    //gender
    if ($("#edit_basic_gender input:radio[name=sex]:checked").val() != '') { len += 10; }
    //mobile
    if ($('#edit_basic_mobile').val() != '') { len += 10; }
    //qq
    if ($('#edit_basic_qq').val() != '') { len += 10; }
    //mail
    if ($('#edit_basic_email').val() != '') { len += 10; }
    //birther
    if ($('#edit_basic_birthYear').val() != '0' && $('#edit_basic_birthMonth').val() != '0') { len += 10; }
    //marital
    if ($('#edit_basic_marital').val() != '0') { len += 10; }
    //hobbies
    {
        var hobb = $('#edit_basic_hobbies').val();
        var hobbArr = [];
        hobbArr = hobb.split(',');
        if (hobbArr.length >= 3) { len += 10; }
    }
    //skill
    {
        var skill = $('#edit_skill_con').val();
        var skillArr = [];
        skillArr = skill.split(',');
        if (skillArr.length >= 3) { len += 10; }
    }
    //job_count_list
    var jd_len = $('#job_count_list dd').length - 1;
    if (jd_len == 1) { len += 10; } else if (jd_len > 1) { len += 20; }
    //edu_count_list
    var ed_len = $('#edu_count_list dd').length - 1;
    if (ed_len == 1) { len += 10; } else if (ed_len > 1) { len += 20; }

    pre.css('width', len);
    $('#precent_num').text(len / 2 + '%');
};
//account
var account = {
    profile: function () {
        //profile_list edit
        function editProfile() {
            $('.profile_list li a.edit_profile_btn').click(function () {
                $(this).parents('li').siblings('li').find('.scan_box').removeClass('hide');
                $(this).parents('li').siblings('li').find('.fix_box').addClass('hide');
                //赋值
                $('#edit_introduce_text').val(replace_ng($('#introduce_text').html()));
                //btn样式
                $(this).parents('ul').find('a.edit_profile_btn i').removeClass('edit_pen').addClass('edit_grey_pen');
                $(this).parents('ul').find('a.edit_profile_btn b').addClass('color_999').removeClass('color_blue');
                $(this).parents('ul').find('a.add_dd_btn i').removeClass('addr_icon').addClass('addr_grey_icon');
                $(this).parents('ul').find('a.add_dd_btn b').addClass('color_999').removeClass('color_blue');
                $(this).parents('ul').find('a.edit_profile_btn').unbind("click");
                $(this).parents('ul').find('a.add_dd_btn').unbind("click");

                if ($(this).parents('dl').hasClass('edit_dl')) {
                    $(this).parents('dd').siblings('dd').find('.scan_box').removeClass('hide');
                    $(this).parents('dd').siblings('dd').find('.fix_box').addClass('hide');
                    $(this).parents('dd').find('.scan_box').addClass('hide');
                    $(this).parents('dd').find('.fix_box').removeClass('hide');
                } else {
                    $(this).parents('li').find('.scan_box').addClass('hide');
                    $(this).parents('li').find('.fix_box').removeClass('hide');
                }
                $(this).children('i').removeClass('edit_pen').addClass('edit_grey_pen');
                $(this).children('b').addClass('color_999').removeClass('color_blue');
                $('.operate_link_box').hide();
                $(this).parents('li').find('.no_sentence').addClass('hide');
                $(this).parents('li').siblings('li').find('.no_sentence').removeClass('hide');
                /*if (!$('li.avatar_info').find('.fix_box').hasClass('hide')) {
                    $('.edit_avatar_btn').show();
                } else {
                    $('.edit_avatar_btn').hide();
                }*/
                //编辑教育信息
                if ($(this).hasClass('edit_college_btn')) {
                    $(this).parents('dd').siblings('dd').find('.scan_box').removeClass('hide');
                    $(this).parents('dd').siblings('dd').find('.fix_box').addClass('hide');
                    $(this).parents('dd').find('.scan_box').addClass('hide');
                    $(this).parents('dd').find('.fix_box').removeClass('hide');
                    $(this).parents('dd').find('.fix_box').find('.college_add_box').removeClass('hide');

                } else if ($(this).hasClass('edit_highschool_btn')) {
                    $(this).parents('dd').siblings('dd').find('.scan_box').removeClass('hide');
                    $(this).parents('dd').siblings('dd').find('.fix_box').addClass('hide');
                    $(this).parents('dd').find('.scan_box').addClass('hide');
                    $(this).parents('dd').find('.fix_box').removeClass('hide');
                    $(this).parents('dd').find('.fix_box').find('.highschool_add_box').removeClass('hide');
                }
            });
        };
        //add_dd_btn
        function addDd() {
            $('.profile_list li a.add_dd_btn').click(function () {
                //btn样式
                $(this).parents('ul').find('a.edit_profile_btn i').removeClass('edit_pen').addClass('edit_grey_pen');
                $(this).parents('ul').find('a.edit_profile_btn b').addClass('color_999').removeClass('color_blue');
                $(this).parents('ul').find('a.add_dd_btn i').removeClass('addr_icon').addClass('addr_grey_icon');
                $(this).parents('ul').find('a.add_dd_btn b').addClass('color_999').removeClass('color_blue');
                $(this).parents('li').siblings('li').find('a.edit_profile_btn').unbind("click");
                $(this).parents('li').find('a.edit_profile_btn').unbind("click");
                $(this).parents('li').siblings('li').find('a.add_dd_btn').unbind("click");
                $(this).parents('li').find('a.add_dd_btn').unbind("click");

                $(this).parents('li').siblings('li').find('dd.new_edit').addClass('hide');
                $(this).parents('li').find('dd.new_edit').removeClass('hide');
                $('.operate_link_box').hide();
                $(this).parents('li').find('.no_sentence').addClass('hide');
                $(this).parents('li').siblings('li').find('.no_sentence').removeClass('hide');
                //在编辑状态下点击添加
                if (!$(this).parents('li').find('.fix_box').hasClass('hide')) {
                    $(this).parents('li').find('.fix_box').addClass('hide');
                    $(this).parents('li').find('.scan_box').removeClass('hide');
                    $(this).parents('li').find('a.edit_profile_btn').unbind("click");
                }

                if ($(this).hasClass('add_college_btn')) {
                    $(this).parents('li').find('dd.new_edit').find('.college_add_box').removeClass('hide');
                    $(this).parents('li').find('dd.new_edit').find('.highschool_add_box').addClass('hide');
                } else if ($(this).hasClass('add_highschool_btn')) {
                    $(this).parents('li').find('dd.new_edit').find('.college_add_box').addClass('hide');
                    $(this).parents('li').find('dd.new_edit').find('.highschool_add_box').removeClass('hide');
                }
            });
        };
        editProfile();
        addDd();
        function closeFix(btn) {
            $(btn).click(function () {
                $(this).parents('li').find('.scan_box').removeClass('hide');
                $(this).parents('li').find('.fix_box').addClass('hide');
                //btn样式
                $(this).parents('ul').find('a.edit_profile_btn i').addClass('edit_pen').removeClass('edit_grey_pen');
                $(this).parents('ul').find('a.edit_profile_btn b').addClass('color_blue').removeClass('color_999');
                $(this).parents('ul').find('a.add_dd_btn i').addClass('addr_icon').removeClass('addr_grey_icon');
                $(this).parents('ul').find('a.add_dd_btn b').addClass('color_blue').removeClass('color_999');
                $(this).parents('ul').find('a.edit_profile_btn').bind("click", editProfile());
                $(this).parents('ul').find('a.add_dd_btn').bind("click", addDd());

                $('.operate_link_box').show();
                $(this).parents('li').find('.no_sentence').removeClass('hide');
                $(this).parents('li').find('dd.new_edit').addClass('hide');
                /*$('.edit_avatar_btn').hide();*/
            });
        }
        closeFix('.profile_list li a.cancel_btn');
        function saveFix(btn) {
            $(btn).click(function () {
                //基本信息
                if ($(this).hasClass('edit_basic')) {
                    //nickname
                    if ($("#edit_basic_nickname").val() == '') {
                        openCloseTips('warn_icon', '昵称不能为空', 'color_666', '280');
                        return false;
                    }
                    //mobile
                    if ($("#edit_basic_mobile").val() != '') {
                        if ($("#edit_basic_mobile").val().length >= 14 || $("#edit_basic_mobile").val().length <= 10) {
                            openCloseTips('warn_icon', '手机号码输入有误', 'color_666', '280');
                            return false;
                        }
                    }
                    //mail
                    if ($("#edit_basic_email").val() != '') {
                        var myreg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                        if (!myreg.test($("#edit_basic_email").val())) {
                            openCloseTips('warn_icon', '联系邮箱格式有误', 'color_666', '280');
                            return false;
                        }
                    }
                }
                //自我描述为空
                if ($(this).hasClass('edit_intro')) {
                    if ($("#edit_introduce_text").val() == '') {
                        openCloseTips('warn_icon', '请输入自我描述', 'color_666', '280');
                        return false;
                    } else if ($("#edit_introduce_text").hasClass('error_ele')) {
                        openCloseTips('warn_icon', '输入自我描述字数超出限制', 'color_666', '320');
                        $("#edit_introduce_text").focus();
                        return false;
                    } else {
                        $("#intro_sentence").hide();
                    }
                }
                //履历为空
                if ($(this).hasClass('add_exper')) {
                    if ($("#add_exper_company").val() == '' || $("#add_exper_title").val() == '') {
                        openCloseTips('warn_icon', '企业名称或担任职位不能为空', 'color_666', '320');
                        return false;
                    }
                    var _startWorkTimeYear   = parseInt($("#add_exper_start_year").val());
                    var _startWorkTimeMonth  = parseInt($("#add_exper_start_month").val());
                    var _endWorkTimeYear     = parseInt($("#add_exper_end_year").val());
                    var _endWorkTimeMonth = parseInt($("#add_exper_end_month").val());
                    var _untilNow = $("#add_exper_end_now").attr("checked") ? 1 : 0;
                    if (_startWorkTimeYear > _endWorkTimeYear && _untilNow == 0) {
                        openCloseTips('warn_icon', '开始年份不能晚于结束年份', 'color_666', '320');
                        return false;
                    } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth && _untilNow == 0) {
                        openCloseTips('warn_icon', '开始月份不能晚于结束月份', 'color_666', '320');
                        return false;
                    }
                }
                //奖励为空
                if ($(this).hasClass('add_award')) {
                    if ($("#add_user_award_name").val() == '' || $("#add_user_award_level").val() == '') {
                        openCloseTips('warn_icon', '奖项名称或等级荣誉不能为空', 'color_666', '320');
                        return false;
                    }
                }
                //教育信息为空
                if ($(this).hasClass('addedu_college')) {
                    if ($("#add_school_name_college").val() == '') {
                        openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
                        return false;
                    }
                }
                if ($(this).hasClass('addedu_high')) {
                    if ($("#add_highschool_name").val() == '') {
                        openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
                        return false;
                    }
                }
                //编辑状态
                var edit_exper_tag = $(this).parents('.fix_box').find('input.edit_exper_tag').val();
                var edit_award_tag = $(this).parents('.fix_box').find('.edit_award_tag').val();
                var edit_college_tag = $(this).parents('.fix_box').find('.edit_college_tag').val();
                var edit_highschool_tag = $(this).parents('.fix_box').find('.edit_highschool_tag').val();
                //alert(edit_exper_tag);
                //履历为空
                if ($(this).hasClass('edit_exper')) {
                    if ($("#edit_exper_company_" + edit_exper_tag).val() == '' || $("#edit_exper_title_" + edit_exper_tag).val() == '') {
                        openCloseTips('warn_icon', '企业名称或担任职位不能为空', 'color_666', '320');
                        return false;
                    }
                    var _startWorkTimeYear = parseInt($("#edit_exper_start_year_" + edit_exper_tag).val());
                    var _startWorkTimeMonth = parseInt($("#edit_exper_start_month_" + edit_exper_tag).val());
                    var _endWorkTimeYear = parseInt($("#edit_exper_end_year_" + edit_exper_tag).val());
                    var _endWorkTimeMonth = parseInt($("#edit_exper_end_month_" + edit_exper_tag).val());
                    var _untilNow = $("#edit_exper_end_now_" + edit_exper_tag).attr("checked") ? 1 : 0;
                    if (_startWorkTimeYear > _endWorkTimeYear && _untilNow == 0) {
                        openCloseTips('warn_icon', '开始年份不能晚于结束年份', 'color_666', '320');
                        return false;
                    } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth && _untilNow == 0) {
                        openCloseTips('warn_icon', '开始月份不能晚于结束月份', 'color_666', '320');
                        return false;
                    }
                }
                //奖励为空
                if ($(this).hasClass('edit_award')) {
                    if ($("#edit_user_award_name_" + edit_award_tag).val() == '' || $("#edit_user_award_level_" + edit_award_tag).val() == '') {
                        openCloseTips('warn_icon', '奖项名称或等级荣誉不能为空', 'color_666', '320');
                        return false;
                    }
                }
                //教育信息为空
                if ($(this).hasClass('editedu_college')) {
                    if ($("#edit_school_name_college_" + edit_college_tag).val() == '') {
                        openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
                        return false;
                    }
                }
                if ($(this).hasClass('editedu_high')) {
                    if ($("#edit_highschool_name_" + edit_highschool_tag).val() == '') {
                        openCloseTips('warn_icon', '学校名称不能为空', 'color_666', '280');
                        return false;
                    }
                }

                $(this).parents('li').find('.scan_box').removeClass('hide');
                $(this).parents('li').find('.fix_box').addClass('hide');
                //btn样式
                $(this).parents('ul').find('a.edit_profile_btn i').addClass('edit_pen').removeClass('edit_grey_pen');
                $(this).parents('ul').find('a.edit_profile_btn b').addClass('color_blue').removeClass('color_999');
                $(this).parents('ul').find('a.add_dd_btn i').addClass('addr_icon').removeClass('addr_grey_icon');
                $(this).parents('ul').find('a.add_dd_btn b').addClass('color_blue').removeClass('color_999');
                $(this).parents('ul').find('a.edit_profile_btn').bind("click", editProfile());
                $(this).parents('ul').find('a.add_dd_btn').bind("click", addDd());

                $('.operate_link_box').show();
                $(this).parents('li').find('.no_sentence').removeClass('hide');
                $(this).parents('li').find('dd.new_edit').addClass('hide');
                /*$('.edit_avatar_btn').hide();*/
            });
        }
        saveFix('.profile_list li a.save_fix_btn');
        //save_fix_btn
        $('.profile_list li .new_edit a.save_fix_btn').click(function () {
            //add
            if ($("#add_exper_company").val() == '' || $("#add_exper_title").val() == '') {
                return false;
            }
            var _startWorkTimeYear = parseInt($("#add_exper_start_year").val());
            var _startWorkTimeMonth = parseInt($("#add_exper_start_month").val());
            var _endWorkTimeYear = parseInt($("#add_exper_end_year").val());
            var _endWorkTimeMonth = parseInt($("#add_exper_end_month").val());
            if (_startWorkTimeYear > _endWorkTimeYear) {
                return false;
            } else if (_startWorkTimeYear == _endWorkTimeYear && _startWorkTimeMonth > _endWorkTimeMonth) {
                return false;
            }
            if ($("#add_user_award_name").val() == '' || $("#add_user_award_level").val() == '') {
                return false;
            }
            if ($("#add_school_name_college").val() == '') {
                return false;
            }
            if ($("#add_highschool_name").val() == '') {
                return false;
            }

            $(this).parents('li').find('dd.new_edit').addClass('hide');
            //$(this).parents('li').find('dd.update_edit').removeClass('hide');   //todo 显示增加的 html
            $('.operate_link_box').show();
            //btn样式
            $(this).parents('ul').find('a.edit_profile_btn i').addClass('edit_pen').removeClass('edit_grey_pen');
            $(this).parents('ul').find('a.edit_profile_btn b').addClass('color_blue').removeClass('color_999');
            $(this).parents('ul').find('a.add_dd_btn i').addClass('addr_icon').removeClass('addr_grey_icon');
            $(this).parents('ul').find('a.add_dd_btn b').addClass('color_blue').removeClass('color_999');
            $(this).parents('ul').find('a.edit_profile_btn').bind("click", editProfile());
            $(this).parents('ul').find('a.add_dd_btn').bind("click", addDd());
        });
        permission('.permission_link');
        wordLess('#edit_introduce_text', '#introduce_text_num', 600);
    },
    cdata: function () {
        //company data 
        $('.scan_c_box .edit_data_btn').click(function () {
            $(this).parents('.scan_c_box').addClass('hide');
            $(this).parents('.scan_c_box').next('.fix_c_box').removeClass('hide');
            // $('.avatar_c_info a.edit_avatar_btn').show();
            //赋值
            $('#companyIntro').val(replace_ng($('#showCompanyIntro').html()));
        });
        $('.fix_c_box .save_data_btn').click(function () {
            $(this).parents('.fix_c_box').addClass('hide');
            $(this).parents('.fix_c_box').prev('.scan_c_box').removeClass('hide');
            //$('.avatar_c_info a.edit_avatar_btn').hide();
        });
    },
    precent: function () {
        proPrecent();
    }
};
//company
company = {
    search: function () {
        //condition_list
        $('.condition_list ul li').hover(function () {
            $(this).addClass('act');
        }, function () {
            $(this).removeClass('act');
        });
        $('.condition_list ul li a.del_tip_icon').click(function () {
            $(this).parent('li').hide();
        })
        //todo select condition
    },
    openCompany: function (w, popup, selecter) {
        openPopup(w, popup);
		company.loadByinid(0,selecter);
        $("#inderstry").attr("onchange", "company.loadByinid($(this).val(),'" + selecter + "');");
        $("#add_temp_company_btn").attr("onclick", "reg.tempCompany('" + selecter + "');");
        $("#searchCompanyBykw").attr("onclick", "company.searchCompanyBykw('"+selecter+"');");
		if(selecter=="add_company"){
			$("#addnonameAgency_box").removeClass("hide");
		}
    },
    loadByinid: function (inid, selecter) {
        $("#choose_condition li").removeClass("selected");//清空字母过滤
        $("#choose_condition li.choose_all").addClass("selected");
        $("#edit_company_list").empty();
        $("#edit_company_loading").removeClass("hide");//show loading icon
        $.get(domain + "/api/getCompanyByinId/id/" + inid + "/orderbyField/companyLevel/orderbyType/desc", function (data) {
            if (data.isSuccess == 1) {
                $.each(data.content, function (i, company) {
                    if (company.companyName != '') {
                        if (selecter == "add_brand") {
							if(inid==0){
								$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + company.industry + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
							}else{
								$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + inid + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
							}
						} else {
                            $("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + company.industry + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
                        }
                    }
                });
                $("#edit_company_none").addClass("hide");
                $("#edit_company_loading").addClass("hide");
            } else {
                $("#edit_company_loading").addClass("hide");
                $("#edit_company_none").removeClass("hide");
            }
        }, 'json');
    },
	searchCompanyBykw: function (selecter) {
		var kw   = $("#search_company").val();
		var inId = $("#inderstry").val();
		if(kw==''){
			openCloseTips('uncurrent_b_icon', '请输入关键字', 'color_red', '280');
			$("#search_company").focus();
			return false;
		}
        $("#choose_condition_company li").removeClass("selected");//清空字母过滤
        $("#choose_condition_company li.choose_all").addClass("selected");
        $("#edit_company_list").empty();
        $("#edit_company_loading").removeClass("hide");//show loading icon
		var data = {inId:inId,kw:kw}
		$.post(domain+"/api/searchCompanyBykw",data,function(data){
            if (data.isSuccess == 1) {
                $.each(data.content, function (i, company) {
                    if (company.companyName != '') {
                        if (selecter == "add_brand") {
							if(inId==0){
								$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + company.industry + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
							}else{
								$("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + inId + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
							}
						} else {
                            $("<li class=letter_" + company.firstLetter + "><a title='"+ company.companyName +"' href='javascript:void(0);' onclick=\"company.chooseCompany('" + company.companyId + "','" + company.companyName + "','" + selecter + "','" + company.industry + "');\"><b>·</b>" + company.companyName + "</a></li>").appendTo($("#edit_company_list"));
                        }
                    }
                });
                $("#edit_company_none").addClass("hide");
                $("#edit_company_loading").addClass("hide");
            } else {
                $("#edit_company_loading").addClass("hide");
                $("#edit_company_none").removeClass("hide");
				$("#get_all_company").attr("onclick", "company.loadByinid("+inId+",'"+selecter+"');").text("返回！");
            }
        }, 'json');
    },
    chooseCompany: function (id, name, selecter, inid) {
        $("#" + selecter + "_name").val(name);
        $("#" + selecter + "_id").val(id);
        if (inid) {
            $("#project_industry").removeClass("hide");  
			if(selecter=="add_brand"){
				$("#project_industry_id").val(inid);
				$("#project_industry_name").text($("#inderstry option[value='"+inid+"']").text());
			}
        }
        $.closePopupLayer('popup_choose');
    },
	addnonameAgency: function (id, name, selecter, roleid) {
		$("#" + selecter + "_name").val(name);
        $("#" + selecter + "_id").val(id);
		$("#project_roles input[value='"+roleid+"']").attr("checked","checked"); 
        $.closePopupLayer('popup_choose');
	}
};
//get right information
var right = {
    getArticles: function (type) {
        if (type == "zan") {
            var getUri = domain + "/api/getArticles/type/" + type;
        } else {
            var getUri = domain + "/api/getArticles/type/" + type + "Count";
        }
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, art) {
                if (type == "view") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em h_50" style="display:table;"><a class="v_m" style="display:table-cell;" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p></div></li>').appendTo("#right_" + type + "_articles");
                }
                if (type == "collect") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="inline_bk mg_l_10 color_999" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><i class="icon grey_fav_icon mg_r_5"></i><em class="v_m">' + art.collectCount + '</em></a></p></div></li>').appendTo("#right_" + type + "_articles");
                }
                if (type == "zan") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="color_red inline_bk mg_l_10" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><i class="icon praise_s_icon mg_r_5"></i><em class="v_m">' + art.zan + '</em></a></p></div></li>').appendTo("#right_" + type + "_articles");
                }
                if (type == "comment") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="color_999 inline_bk mg_l_10" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><i class="icon grey_comment_icon mg_r_5"></i><em class="v_m">' + art.commentCount + '</em></a></p></div></li>').appendTo("#right_" + type + "_articles");
                }
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
	getFeature: function (offset) {
		var getUri = domain + "/api/getFeature/offset/"+offset;
		$('.right_loading').removeClass('hide');
		$.get(getUri, function (data) {
            $.each(data.content, function (i, art) {
				$('<li class="clearfix mg_b_10"><div class="f_l h_100"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="160" height="100"/></a></div><div class="f_r w_150 pd_t_10"><p class="line_em h_50"><a class="v_m" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p></div></li>').appendTo("#right_new_feature");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
	},
	getLatestFavArt: function () {
		var getUri = domain + "/datas/getLatestFavArt";
		$('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, art) {
            	$('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="'+art.title+'" title="'+art.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em h_50" style="display:table;"><a class="v_m" style="display:table-cell;" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 70) + '</a></p></div></li>').appendTo("#right_myfav_articles");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
	},
    getFocusArt: function (cat, xbanner) {
        var getUri = domain + "/api/getFocusArt/category/" + cat;
        var fartlink, farttxt, farinter;
		switch(cat){
			case 26:
				fartlink = domain + '/feature/interview';
				farttxt = '专访';
			    farinter = 3;
			break;
			case 29:
				fartlink = domain + '/feature/future';
				farttxt = '未来生活进行时';
			    farinter = 3;
			break;
			case 57:
				fartlink = domain + '/feature/inspiring';
				farttxt = '灵感';
			    farinter = 5;
			break;
			case 28:
				fartlink = domain + '/feature/space';
				farttxt = '空间';
			    farinter = 4;
			break;
		}
        var farthtml = '<div class="section_title mg_b_10 clearfix"><h3 class="f_l font_msyh"><a href="' + fartlink + '">' + farttxt + '</a></h3><span class="f_r"><a href="' + fartlink + '"><i class="v_m">More</i><i class="icon more_icon mg_l_5"></i></a></span></div><div class="' + xbanner + ' banner"><div class="banner_pic"><ul class="clearfix" id="right_' + cat + '_article_cover"></ul></div><div class="banner_txt clearfix"><ul class="f_l banner_title clearfix" id="right_' + cat + '_article_title"></ul><ul class="f_r banner_num clearfix" id="right_' + cat + '_article_num"></ul></div></div>';
        $(farthtml).appendTo('#right_' + cat + '_article');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, art) {
                var j = i + 1;
                if (i == 0) {
                    $('<li class="on"><a title="' + art.title + '" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="' + art.title + '" title="'+art.title+'"/></a></li>').appendTo("#right_" + cat + "_article_cover");
                    $('<li class="on"><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 50) + '</a></li>').appendTo("#right_" + cat + "_article_title");
                    $('<li class="on"><a>' + j + '</a></li>').appendTo("#right_" + cat + "_article_num");
                } else {
                    $('<li><a title="' + art.title + '" target="_blank" href="' + domain + '/articles/' + art.articleId + '.html"><img src="' + art.cover + '" alt="' + art.title + '" title="'+art.title+'"/></a></li>').appendTo("#right_" + cat + "_article_cover");
                    $('<li><a target="_blank" href="' + domain + '/articles/' + art.articleId + '.html">' + subString(art.title, 50) + '</a></li>').appendTo("#right_" + cat + "_article_title");
                    $('<li><a>' + j + '</a></li>').appendTo("#right_" + cat + "_article_num");
                }
            });
            sildeBanner(xbanner, farinter);
        }, 'json');
    },
    getFocusPro: function (cat) {
        var getUri = domain + "/api/getFocusPro/category/" + cat;
        var fprohtml = '<div class="section_title mg_b_10 clearfix"><h3 class="f_l font_msyh"><a href="' + domain + '/projects/weekly">每周项目精选</a></h3><span class="f_r"><a href="' + domain + '/projects/weekly"><i class="v_m">More</i><i class="icon more_icon mg_l_5"></i></a></span></div><div class="month_banner banner"><div class="banner_pic"><ul class="clearfix" id="right_' + cat + '_project_cover"></ul></div><div class="banner_txt clearfix"><ul class="f_l banner_title clearfix" id="right_' + cat + '_project_title"></ul><ul class="f_r banner_num clearfix" id="right_' + cat + '_project_num"></ul></div></div>';
        $(fprohtml).appendTo('#right_' + cat + '_project');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, pro) {
                var j = i + 1;
                if (i == 0) {
                    $('<li class="on"><a title="' + pro.title + '" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="' + pro.title + '" title="'+pro.title+'"/></a></li>').appendTo("#right_" + cat + "_project_cover");
                    $('<li class="on"><span>' + getLocalYM(pro.publishTime) + '</span></li>').appendTo("#right_" + cat + "_project_title");
                    $('<li class="on"><a>&hearts;</a></li>').appendTo("#right_" + cat + "_project_num");
                } else {
                    $('<li><a title="' + pro.title + '" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="' + pro.title + '" title="'+pro.title+'"/></a></li>').appendTo("#right_" + cat + "_project_cover");
                    $('<li><span>' + getLocalYM(pro.publishTime) + '</span></li>').appendTo("#right_" + cat + "_project_title");
                    $('<li><a>&hearts;</a></li>').appendTo("#right_" + cat + "_project_num");
                }
            });
            sildeBanner('month_banner', 3);
        }, 'json');
    },
    getProjects: function (type) {
        if (type == "score") {
            var getUri = domain + "/api/getProjects/type/" + type;
        } else {
            var getUri = domain + "/api/getProjects/type/" + type + "Count";
        }
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, pro) {
                if (type == "view") {
                    var btxt = '';
                    var atxt = '';
                    if (pro.brand != 0) {
                        var btxt = '<a class="color_999" target="_blank" href="' + domain + '/company/' + pro.brand + '">' + pro.brandName + '</a>';
                    } else {
                        var btxt = pro.brandName;
                    }
                    var _viewhtml = '<li class="clearfix"><div class="f_l"><p class="mg_b_5"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="'+pro.title+'" title="'+pro.title+'" width="80" height="50" /></a></p><p class="a_c"><a class="color_red" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><i class="icon star_s_icon v_m mg_r_5"></i><em class="inline_bk v_m font_b">' + pro.score + '</em></a></p></div><div class="f_r w_230"><p class="line_em mg_b_10 font_name"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html">' + subString(pro.title, 70) + '</a></p><p class="line_em color_999"><b>Brand:</b> ' + btxt + '</p>'+atxt+'</div></li>';
                    $(_viewhtml).appendTo("#right_" + type + "_projects");
                }
                if (type == "collect") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="'+pro.title+'" title="'+pro.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html">' + subString(pro.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="inline_bk mg_l_10 color_999" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><i class="icon grey_fav_icon mg_r_5"></i><em class="v_m">' + pro.collectCount + '</em></a></p></div></li>').appendTo("#right_" + type + "_projects");
                }
                if (type == "score") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="'+pro.title+'" title="'+pro.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html">' + subString(pro.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="color_red inline_bk mg_l_10" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><i class="icon star_s_icon mg_r_5"></i><em class="v_m">' + pro.score + '</em></a></p></div></li>').appendTo("#right_" + type + "_projects");
                }
                if (type == "comment") {
                    $('<li class="clearfix"><div class="f_l"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><img src="' + pro.cover + '" alt="'+pro.title+'" title="'+pro.title+'" width="80" height="50" /></a></div><div class="f_r w_230"><p class="line_em font_14 h_36"><a target="_blank" href="' + domain + '/projects/' + pro.proId + '.html">' + subString(pro.title, 70) + '</a></p><p class="color_999 font_12 a_r mg_t_10"><a class="color_999 inline_bk mg_l_10" target="_blank" href="' + domain + '/projects/' + pro.proId + '.html"><i class="icon grey_comment_icon mg_r_5"></i><em class="v_m">' + pro.commentCount + '</em></a></p></div></li>').appendTo("#right_" + type + "_projects");
                }
            });

            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getLatestComments: function (type) {
        var getUri = domain + "/api/getLatestComment/type/" + type;
        $.get(getUri, function (data) {
            $.each(data.content, function (i, comment) {
                if (comment.uType == 1) { var userUri = domain + '/people/' + comment.userId; } else { var userUri = domain + '/company/' + comment.userId; }
                if (type == 1) { var comUri = domain + '/articles/' + comment.conId; }
                if (type == 2) { var comUri = domain + '/projects/' + comment.conId; }
                var nrcomms = replace_rn(comment.content);
                var _html = '<li><a href="' + comUri + '.html" target="_blank"><b>' + comment.userNickName + ':</b><span>' + subString(nrcomms, 90) + '</span></a></li>'
                $(_html).appendTo("#right_"+type+"_comments")
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getPeople: function (type) {
        var getUri = domain + "/api/getPeople/type/" + type;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, people) {
                if ((i + 1) % 3 == 0) { var userBr = 'class="avatar_three"'; } else { var userBr = ''; }
                var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
                var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
                if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
                $('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="100" height="100" /></a></p><p class="a_c h_line_20"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></p></li>').appendTo("#right_people");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
	getPeopleFollowers: function (uid) {
        var getUri = domain + "/api/getPeopleFollowers/uid/" + uid;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, people) {
                if ((i + 1) % 3 == 0) { var userBr = 'class="avatar_three"'; } else { var userBr = ''; }
                var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
                var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
                if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
                $('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="100" height="100" /></a></p><p class="a_c h_line_20"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></p></li>').appendTo("#right_peopleFollowers");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },	
	getPeopleFans: function (uid) {
        var getUri = domain + "/api/getPeopleFans/uid/" + uid;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, people) {
                if ((i + 1) % 3 == 0) { var userBr = 'class="avatar_three"'; } else { var userBr = ''; }
                var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
                var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
                if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
                $('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="100" height="100" /></a></p><p class="a_c h_line_20"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></p></li>').appendTo("#right_peopleFans");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },	
    getActPeople: function () {
        var getUri = domain + "/api/getActPeople";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, people) {
                if ((i + 1) % 3 == 0) { var userBr = 'class="avatar_three"'; } else { var userBr = ''; }
                var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
                var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
                if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
                $('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="100" height="100" /></a></p><p class="a_c h_line_20"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></p></li>').appendTo("#right_people");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getHotCompany: function () {
        var getUri = domain + "/api/getHotCompany";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, company) {
                if ((i + 1) % 3 == 0) { var userBr = 'class="avatar_three"'; } else { var userBr = ''; }
                var iconHtml = right.getComIcon(parseInt(company.companyLevel));
                if (company.logo == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/brand_l_100x100.jpg'; } else { var avatar = eval('(' + company.logo + ')'); var userAvatar = avatar.avatar_100; }
                //$('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/company/' + company.companyId + '" target="_blank"><img alt="'+company.companyName+'" title="'+company.companyName+'" src="' + userAvatar + '" width="100" height="100" /></a></p><p class="a_c h_line_20"><a title="'+company.companyName+'" href="' + domain + '/company/' + company.companyId + '" target="_blank"><span class="v_m">' + subString(company.companyName,8) + '</span></a><a class="level">' + iconHtml + '</a></p></li>').appendTo("#right_company");
                $('<li ' + userBr + '><p class="h_100"><a href="' + domain + '/company/' + company.companyId + '" target="_blank"><img alt="' + company.companyName + '" title="' + company.companyName + '" src="' + userAvatar + '" width="100" height="100" /></a></p></li>').appendTo("#right_company");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getVisiter: function (uid) {
        var getUri = domain + "/api/getVisiter/uId/" + uid;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
			if(data.isSuccess==1){
            $.each(data.content, function (i, people) {
                var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
                var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
                if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
                $('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="50" height="50"></a></div><div class="f_l w_260 pd_t_2"><div class="mg_b_10"><span class="font_b font_14"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></span></div><p class="font_12 color_666" title="'+people.funcName+'">' +  subString(people.funcName,40) + '</p></div></li>').appendTo("#right_visiter");
            });
            $('.right_loading').addClass('hide');
			}else{
			    $('<li class="clearfix font_14 color_666 pd_l_10">暂无数据</li>').appendTo("#right_visiter");
			    $('.right_loading').addClass('hide');
			}
        }, 'json');
    },
    getMyVisit: function (uid) {
        var getUri = domain + "/api/getMyVisit/uId/" + uid;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
			if(data.isSuccess==1){
				$.each(data.content, function (i, people) {
					var counts = parseInt(people.dmArticlesCount) + parseInt(people.dmProjectsCount);
					var iconHtml = right.getUserIcon(counts, parseInt(people.userRoles));
					if (people.avatar == '') { var userAvatar = 'http://file.digitaling.com/images/avatar/avatar_m_100x100.jpg'; } else { var avatar = eval('(' + people.avatar + ')'); var userAvatar = avatar.avatar_100; }
					$('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a href="' + domain + '/people/' + people.uId + '" target="_blank"><img alt="'+people.nickname+'" title="'+people.nickname+'" src="' + userAvatar + '" width="50" height="50"></a></div><div class="f_l w_260 pd_t_2"><div class="mg_b_10"><span class="font_b font_14"><a title="'+people.nickname+'" href="' + domain + '/people/' + people.uId + '" target="_blank"><span class="v_m">' + subString(people.nickname,10) + '</span></a><a class="level">' + iconHtml + '</a></span></div><p class="font_12 color_666" title="'+people.funcName+'">' +  subString(people.funcName,40) + '</p></div></li>').appendTo("#right_my_visit");
				});
				$('.right_loading').addClass('hide');
			}else{
			    $('<li class="clearfix font_14 color_666 pd_l_10">暂无数据</li>').appendTo("#right_my_visit");
			    $('.right_loading').addClass('hide');
			}
        }, 'json');
    },
    getUserIcon: function (counts, userRoles) {
        switch (userRoles) {
            case 1:
                var iconHtml = '';
                break;
            case 2:
                var levelNum = Math.floor(counts / 2) + 1;
                if (levelNum > 20) { levelNum = 20; }
                if (levelNum == 0) { levelNum = 1; }
                var iconHtml = '<i title="认证会员" class="icon sl' + levelNum + ' mg_l_5"></i>';
                break;
            case 3:
                var levelNum = Math.floor(counts / 2) + 1;
                if (levelNum > 20) { levelNum = 20; }
                if (levelNum == 0) { levelNum = 1; }
                var iconHtml = '<i title="达人" class="icon wl' + levelNum + ' mg_l_5"></i>';
                break;
            case 4:
                var iconHtml = '<i title="名人" class="icon ml mg_l_5"></i>';
                break;
            case 5:
                var iconHtml = '<i title="特约撰稿人/编辑" class="icon tl mg_l_5"></i>';
                break;
            case 6:
                var iconHtml = '<i title="特约撰稿人/编辑" class="icon tl mg_l_5"></i>';
                break;
            case 7:
                var iconHtml = '<i title="特约撰稿人/编辑" class="icon tl mg_l_5"></i>';
                break;
        }
        return iconHtml;
    },
    getComIcon: function (comLevel) {
        switch (comLevel) {
            case 0:
                var iconHtml = '';
                break;
            case 1:
                var iconHtml = '';//普通
                break;
            case 2:
                var iconHtml = '<i title="黄冠企业" class="icon cl1 mg_l_5"></i>';
                break;
            case 3:
                var iconHtml = '<i title="紫冠企业" class="icon cl2 mg_l_5"></i>';
                break;
            case 4:
                var iconHtml = '<i title="蓝冠企业" class="icon cl3 mg_l_5"></i>';
                break;
            case 5:
                var iconHtml = '<i title="至尊企业" class="icon cl4 mg_l_5"></i>';
                break;
        }
        return iconHtml;
    },
    getJobsIcon: function (tooler) {
        if (tooler == '') {
            var iconHtml = '';
        } else if (tooler == 'icon hot_icon') {
            var iconHtml = '<i title="热门招聘" class="icon hot_icon mg_l_5"></i>';
        } else if (tooler == 'icon hurry_icon') {
            var iconHtml = '<i title="急需招聘" class="icon hurry_icon mg_l_5"></i>';
        } else if (tooler == 'icon salary_icon') {
            var iconHtml = '<i title="高薪招聘" class="icon salary_icon mg_l_5"></i>';
        }
        return iconHtml;
    },
    getJobTextLink: function () {
        var getUri = domain + "/api/getJobTextLink";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, links) {
                var iconHtml = right.getJobsIcon((links.tooler).toString());
                $('<li><a href="' + links.linkUrl + '" target="_blank">﹥' + links.title + ''+ iconHtml +'</a></li>').appendTo("#right_job_text_link");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
	getLatestJobs: function () {
		var randoms = Math.floor(Math.random()*100000 + 10000);
        var getUri = domain + "/api/getLatestJobs?"+randoms;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, jobs) {
				if(jobs.comName==''){
				    $('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a target="_blank" href="' + domain + '/company/' + jobs.companyId + '"><img src="' + jobs.comLogo + '" alt="" width="50" height="50" /></a></div><div class="f_l w_250"><h3 class="mg_b_5 font_14"><a href="' + domain + '/jobs/' + jobs.jobId + '.html" target="_blank" title="' + jobs.title + '">' + jobs.title + '</a></h3></div></li>').appendTo("#right_latest_job");
				}else{
				    $('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a target="_blank" href="' + domain + '/company/' + jobs.companyId + '"><img src="' + jobs.comLogo + '" alt="" width="50" height="50" /></a></div><div class="f_l w_250"><h3 class="mg_b_5 font_14"><a href="' + domain + '/jobs/' + jobs.jobId + '.html" target="_blank">' + jobs.title + '</a></h3><p class="font_nl font_12 color_666">招聘企业:<a href="' + domain + '/company/' + jobs.companyId + '">' + jobs.comName + '</a></p></div></li>').appendTo("#right_latest_job");
				}
			});
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getJobHotBanner: function () {
        var getUri = domain + "/api/getJobHotBanner";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, links) {
                $('<a href="' + links.linkUrl + '" target="_blank"><img src="' + links.banner + '" alt="' + links.bTitle + '" title="' + links.bTitle + '"/></a>').appendTo("#right_job_hot_banner");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getComProRank: function () {
        var getUri = domain + "/api/getComProRank";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, ranks) {
                var j = i + 1;
                $('<li class="clearfix"><div class="f_l"><i class="list_num list_num_3 v_m font_14 mg_r_10">' + j + '</i><a title="'+ranks.companyName+'" class="v_m" href="' + domain + '/company/' + ranks.companyId + '" target="_blank">' + subString(ranks.companyName,32) + '</a></div><div class="f_r font_arial color_37e">' + ranks.dmProjectsCount + '</div></li>').appendTo("#right_com_pro_rank");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getComArtRank: function () {
        var getUri = domain + "/api/getComArtRank";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, ranks) {
                var j = i + 1;
                $('<li class="clearfix"><div class="f_l"><i class="list_num list_num_3 v_m font_14 mg_r_10">' + j + '</i><a title="'+ranks.companyName+'" class="v_m" href="' + domain + '/company/' + ranks.companyId + '" target="_blank">' + subString(ranks.companyName,32) + '</a></div><div class="f_r font_arial color_37e">' + ranks.dmArticlesCount + '</div></li>').appendTo("#right_com_art_rank");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
    getComJobs: function (id, blockId, comLogo) {
        var getUri = domain + "/api/getComJobs/id/" + id;
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, jobs) {
                if (jobs.jobId != blockId) {
                    $('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a target="_blank" href="' + domain + '/company/' + jobs.companyId + '"><img src="' + comLogo + '" alt="" width="50" height="50" /></a></div><div class="f_l w_250 color_666"><h3 class="mg_b_5 font_14"><a target="_blank" href="' + domain + '/jobs/' + jobs.jobId + '.html">' + jobs.title + '</a></h3><p class="font_12 mg_b_5">工作区域: ' + jobs.provinceName + ' ' + jobs.cityName + '</p></div></li>').appendTo("#right_com_jobs");
                }
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    },
	getJobViewDetail: function () {
        var getUri = domain + "/api/getJobViewDetail";
        $('.right_loading').removeClass('hide');
        $.get(getUri, function (data) {
            $.each(data.content, function (i, jobs) {
				var viewCon = jobs.viewCon;
				$('<li class="clearfix"><div class="f_l w_50 h_50 mg_r_10"><a target="_blank" href="' + domain + '/company/' + viewCon.companyId + '"><img src="' + viewCon.logo + '" alt="" width="50" height="50" /></a></div><div class="f_l w_250 color_666"><h3 class="mg_b_5 font_14"><a target="_blank" href="' + domain + '/jobs/' + viewCon.jobId + '.html">' + viewCon.title + '</a></h3><p class="font_nl font_12 color_666">招聘企业:<a href="' + domain + '/company/' + viewCon.companyId + '">' + viewCon.companyName + '</a></p></li>').appendTo("#right_viewdetail_jobs");
            });
            $('.right_loading').addClass('hide');
        }, 'json');
    }
}
var pages = {
    gotopage: function () {
        var page = $("#gotopagenum").val();
        var total = $("#gotototalpage").val();
        var pageUrl = $("#gotopageurl").val();
		var pagePar = $("#gotoParameter").val();
        if (page == '') { return false; }else{page = parseInt(page)}
        if (page > total) {
            location.href = pageUrl + "/" + total+pagePar;
        } else {
            location.href = pageUrl + "/" + page+pagePar;
        }
    },
    checknum: function () {
        var page = $("#gotopagenum");
        page.keydown(function () {
            numonly("#gotopagenum");
        });
        //分页跳转
        $('#gotopagenum').keyup(function (e) {
            if (e.which == 13) {
                pages.gotopage();
            }
        });
    }
}

// article project category check
var categoryCheck = {
    checkLength: function (id, boxname, len) {
		$("#" + id + " input[name='" + boxname + "']").attr('disabled', true);
		if ($("#" + id + " input[name='" + boxname + "']:checked").length >= len) {
			$("#" + id + " input[name='" + boxname + "']:checked").attr('disabled', false);
		} else {
			$("#" + id + " input[name='" + boxname + "']").attr('disabled', false);
		}
        $("#" + id + " input[type=checkbox]").click(function () {
            $("#" + id + " input[name='" + boxname + "']").attr('disabled', true);
            if ($("#" + id + " input[name='" + boxname + "']:checked").length >= len) {
                $("#" + id + " input[name='" + boxname + "']:checked").attr('disabled', false);
            } else {
                $("#" + id + " input[name='" + boxname + "']").attr('disabled', false);
            }
        });
    }
}
