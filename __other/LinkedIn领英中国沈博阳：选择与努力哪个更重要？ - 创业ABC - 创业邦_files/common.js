var COOKIE_PRE = 'MRGCY_';
var cyzone = {
	tips : function (msg, type, pos, delay) {
		(!type || type == "ok" || type == "success") && (type = "succeed");
		dialog = window.top.art.dialog({
				id : type,
				icon : type,
				padding : "5px 5px 5px 0",
				follow : pos || "",
				content : msg + '<a style="margin-left:10px;color:#000080;text-decoration:underline;" href="javascript:void(0)" onclick="window.top.art.dialog.list[\'' + type + "'].close()\">\u77e5\u9053\u4e86</a>",
				ok : false,
				cancel : false,
				title : false,
				lock : false,
				esc : false,
				fixed : true,
				close : function () {
					$(dialog.DOM.border[0]).removeClass("tips succeed error alert warning confirm")
				}
			}).time(delay || 3);
		$(dialog.DOM.border[0]).addClass("tips").removeClass("succeed error alert warning confirm").addClass(type)
	},
	alert : function (msg, type, delay) {
		return this.tips(msg, type || "warning", "center", delay || 0)
	},
	ok : function (msg, pos, delay) {
		return this.tips(msg, "success", pos, delay)
	},
	error : function (msg, pos, delay) {
		return this.tips(msg, "error", pos, delay)
	},
	warn : function (msg, pos, delay) {
		return this.tips(msg, "warning", pos, delay)
	},
	confirm : function (msg, ok, cancel, pos) {
		dialog = window.top.art.dialog.confirm(msg, ok, cancel);
		$(dialog.DOM.border[0]).addClass("confirm").removeClass("success error alert warning")
	},
	validform : function (selector, callback, options) {
		var getInfoObj = function () {
			return $(this).siblings(".Validform_info").size() ? $(this).siblings(".Validform_info") : $(this).parent().siblings(".Validform_info")
		};
		var _callback = function (json) {
			cyzone.del_masker();
			if (json.code)
				cyzone.ok(json.msg);
			else
				cyzone.error(json.msg);
			return false
		};
		var options = $.extend({
				top : 0,
				left : 0
			}, options);
		$("[datatype]").each(function (i, a) {
			$(a).focusin(function () {
				if (this.timeout)
					clearTimeout(this.timeout);
				var infoObj = getInfoObj.call(this);
				if (infoObj.find(".Validform_right").length != 0 || infoObj.find(".Validform_checktip").text().length == 0)
					return infoObj.hide();
				var left = $(a).offset().left + options.left,
				top = $(a).offset().top + options.top,
				w = $(a).width(), h = $(a).height();
				if ($(a).attr("datatype") == "editor") {
					left = $(a).parent().offset().left + options.left;
					top = $(a).parent().offset().top + options.top;
					w = 0;

					infoObj.css({
						left : left + w - 30,
						top : top - 45,
						zIndex : 99999
					}).show().animate({
						top : top - 35
					}, 200)
				}

				if( infoObj.parents('.aui_state_focus').is(':visible') && $('.aui_state_focus').length == 1 ){
					var top1 = $('.aui_state_focus').offset().top;
					var left1 = $('.aui_state_focus').offset().left;
					infoObj.show().css({
						left : left1,
						top : top - top1 - h,
						zIndex:8000
					}).parent('td').css({'text-align' : 'left'});
				} else{
						infoObj.show().css({
							left:left + w*0.9,
							top:top - h,
							zIndex:8000
						});
				}
			}).focusout(function () {
				var infoObj = getInfoObj.call(this);
				var that = this;
				this.timeout = setTimeout(function () {
						infoObj.siblings(".Validform_info").show() || infoObj.parent().siblings(".Validform_info").show();
						if (that.attributes["ignore"] != "undefined" && infoObj.find(".Validform_checktip").text().length == 0)
							return infoObj.hide()
					}, 0)
			})
		});
		var myform = $(selector).Validform({
				tiptype : function (msg, o, cssctl) {
					if (!o.obj.is("form")) {
						var objtip = o.obj.siblings(".Validform_info").find(".Validform_checktip").size() ? o.obj.siblings(".Validform_info").find(".Validform_checktip") : o.obj.parent().siblings(".Validform_info").find(".Validform_checktip");
						cssctl(objtip, o.type);
						objtip.text(msg);
						var infoObj = o.obj.siblings(".Validform_info").size() ? o.obj.siblings(".Validform_info") : o.obj.parent().siblings(".Validform_info");
						if (o.type == 2)
							infoObj.fadeOut(200);
						else {
							var left = o.obj.offset().left + options.left,
							top = o.obj.offset().top + options.top,
							w = o.obj.width(), h = o.obj.height();
							if (o.obj.attr("datatype") == "editor") {
								left = o.obj.parent().offset().left + options.left;
								top = o.obj.parent().offset().top + options.top;
								w = 0;

								infoObj.css({
									left : left + w - 30,
									top : top - 45,
									zIndex : 9999
								}).show().animate({
									top : top - 35
								}, 200)
							}

							if( infoObj.parents('.aui_state_focus').is(':visible') && $('.aui_state_focus').length == 1 ){
								var top1 = $('.aui_state_focus').offset().top;
								var left1 = $('.aui_state_focus').offset().left;
								infoObj.show().css({
									left : left1,
									top : top - top1 - h,
									zIndex:8000
								}).parent('td').css({'text-align' : 'left'});
							} else{
									infoObj.show().css({
										left:left + w*0.9,
										top:top - h,
										zIndex:8000
									});
							}

						}
					}
				},
				showAllError : true,
				ajaxPost : true,
				beforeSubmit : function (curform) {
					if (typeof options.beforeSubmit != "undefined") {

						var status = options.beforeSubmit();
						if(!status){
							return false;
						}
						
					}

					if (typeof CKEDITOR != "undefined")
						for (instance in CKEDITOR.instances)
							CKEDITOR.instances[instance].updateElement();
					else if (typeof UE != "undefined")
						for (instance in UE.instances)
							UE.instances[instance].sync();
					cyzone.add_masker()
				},
				callback : callback || _callback
			});
		return myform
	},
	add_masker : function () {
		var html = '<div id="htmlmasker" class="overlay" style="position:fixed;bottom:0;right:0;width:100%;height:100%;display:block;z-index:9999;background-color:#000;opacity: 0.6;-moz-opacity:0.6;filter:alpha(opacity=60);"></div><div id="htmlloading" class="loading" style="z-index:99999;background:url(/statics/images/admin_img/loader2.gif) no-repeat 0 0;border:0;width:54px;height:54px;position:fixed;top:50%;margin:-27px 0 0 -27px;left:50%;"></div>';
		$("body").append(html)
	},
	del_masker : function () {
		$("#htmlmasker,#htmlloading").remove()
	},
	changeTxt : function(ele, style, curstyle){
		$(ele).each(function(i, a){
			var t0 = a.value;
			var c0 = window.getComputedStyle ? window.getComputedStyle(a, null)[style] : a.currentStyle[style];
			$(a).focus(function(){
				var t = $(a).val();
				a.style[style] = curstyle;
				if(t == t0){
					$(a).val('');
				}
			}).blur(function(){
				var t = $(a).val();
				if(t == '' || t == null){
					$(a).val(t0);
					a.style[style] = c0;
				}
			});
		})
	}
};
$(function () {
	var iNow = null;
	var $status = $(".status ul li");
	var timer = null;
	star();
	$status.each(function (index) {
		$status.mouseenter(function () {
			iNow = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".scroll_pic ul").eq(iNow).show().siblings().hide()
		})
	});
	$(".scroll").hover(function () {
		clearInterval(timer)
	},function () {
		star();
	});
	function star() {
		timer = setInterval(function () {
				iNow++;
				if (iNow == 5)
					iNow = 0;
				$status.eq(iNow).addClass("active").siblings().removeClass("active");
				$(".scroll_pic ul").eq(iNow).show().siblings().hide()
			}, 3E3)
	}
});
function catchEvent(eventObj, event, eventHandler) {
	if (eventObj.addEventListener)
		eventObj.addEventListener(event, eventHandler, false);
	else if (eventObj.attachEvent) {
		event = "on" + event;
		eventObj.attachEvent(event, eventHandler)
	}
}
var navshover = function () {
	var navs = document.getElementById("navs").children;
	$("#nav .forefather").each(function () {
		if ($(this).attr("navid") == forefather) {
			forefather == 0 ? $(this).addClass("home_er") : $(this).addClass("nav_aa_hover");
			return false
		}
	});
	$("#nav .home_er,.nav_aa_hover").length || $(".forefather").first().addClass("home_er");
	for (var i = 0; i < navs.length; i++) {
		var nav = navs[i];
		var oname = navs[i].className;
		var regexp = new RegExp("(^|\\s)nav_ul_li(\\s|$)");
		var regexp1 = new RegExp("(^|\\s)nav_aa_hover(\\s|$)");
		if (regexp1.test(oname))
			nav.className = "nav_ul_li nav_aa_hover";
		if (regexp.test(oname)) {
			catchEvent(nav, "mouseover", function (nav) {
				return function () {
					nav.className = "nav_ul_li nav_aa_hover";
					var subnavs = nav.children;
					for (var j = 0; j < subnavs.length; j++) {
						var subnav = subnavs[j];
						if (subnav.tagName === "DIV")
							subnav.style.display = "block"
					}
				}
			}
				(nav));
			catchEvent(nav, "mouseout", function (nav) {
				if (regexp1.test(oname))
					return function (e) {
						nav.className = "nav_ul_li nav_aa_hover";
						var subnavs = nav.children;
						var event = e.relatedTarget ? e.relatedTarget : e.toElement;
						if (event.parentNode == nav || event.parentNode.parentNode == nav || event.parentNode.parentNode.parentNode == nav || event.parentNode.parentNode.parentNode.parentNode == nav)
							return;
						for (var j = 0; j < subnavs.length; j++) {
							var subnav = subnavs[j];
							if (subnav.tagName === "DIV")
								subnav.style.display = "none"
						}
					};
				else
					return function (e) {
						nav.className = "nav_ul_li";
						var subnavs = nav.children;
						var event = e.relatedTarget ? e.relatedTarget : e.toElement;
						if (event.parentNode == nav || event.parentNode.parentNode == nav || event.parentNode.parentNode.parentNode == nav || event.parentNode.parentNode.parentNode.parentNode == nav)
							return;
						for (var j = 0; j < subnavs.length; j++) {
							var subnav = subnavs[j];
							if (subnav.tagName === "DIV")
								subnav.style.display = "none"
						}
					}
			}
				(nav))
		}
	}
};
$(function () {
	var iNow = null;
	var $statu = $(".barjs_rightUl li");
	var timer = null;
	star();
	$(".barjs").mouseenter(function () {
		clearInterval(timer)
	});
	$statu.each(function (index) {
		$statu.mouseenter(function () {
			iNow = $(this).index();
			$(this).addClass("barjs_rightLi").siblings().removeClass("barjs_rightLi");
			$(".barjs_leftUl li").eq(iNow).show().siblings().hide()
		})
	});
	$(".barjs").mouseleave(function () {
		star()
	});
	function star() {
		timer = setInterval(function () {
				iNow++;
				if (iNow == 5)
					iNow = 0;
				$statu.eq(iNow).addClass("barjs_rightLi").siblings().removeClass("barjs_rightLi");
				$(".barjs_leftUl li").eq(iNow).show().siblings().hide()
			}, 3E3)
	}
});
$(function () {
	$(".remen em").mouseover(function () {
		var index = $(this).index();
		$(this).addClass("remen_em").siblings().removeClass("remen_em");
		$(".paihang>div").eq(index / 2 - 1).show().siblings().hide()
	})
});
function scrollTop() {
	var $backToTopTxt = "\u8fd4\u56de\n\u9876\u90e8",
	$backToTopEle = $('<div class="backToTop"></div>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function () {
			$("html, body").animate({
				scrollTop : 0
			}, 120)
		}),
	$backToTopFun = function () {
		var st = $(document).scrollTop(),
		winh = $(window).height();
		st > 0 ? $backToTopEle.show() : $backToTopEle.hide();
		if (!window.XMLHttpRequest)
			$backToTopEle.css("top", st + winh - 166)
	};
	$(window).bind("scroll", $backToTopFun);
	$(function () {
		$backToTopFun()
	})
}

$(function () {
	$(".input_txt").focus(function () {
		if ($(this).val() == this.defaultValue)
			$(this).val("")
	});
	$(".input_txt").blur(function () {
		if ($(this).val() == "")
			$(this).val(this.defaultValue)
	});
	$(".wx_text").focus(function () {
		if ($(this).val() == this.defaultValue)
			$(this).val("")
	});
	$(".wx_text").blur(function () {
		if ($(this).val() == "")
			$(this).val(this.defaultValue)
	})
});
