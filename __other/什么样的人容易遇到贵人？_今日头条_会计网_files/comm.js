// JavaScript Document
/*鼠标经过，弹出浮动层的事件*/

var potMove = function(obj){
	var p = $("."+obj);
	var p_on = obj+"_on";
	var ae;
	p.hover(
		function(){
			var This = $(this);
			ae=setInterval(function(){
				 This.addClass(p_on); 
			},200)
		},
		function(){
			var This = $(this);
			clearInterval(ae);
			This.removeClass(p_on);
		  }
	);
}

/*鼠标经过，弹出城市浮动层的事件*/
$(function(){
	var tl;
	$(".city_drop_p").hover(
		function(){tl=setInterval(function(){ $(".mod_city").addClass("mod_city_on"); },300)},
		function(){clearInterval(tl);}
	);
	$(".mod_city").hover(
		function(){},
		function(){ $(".mod_city").removeClass("mod_city_on");}
	);
})
/*菜单栏 鼠标经过事件
*针对于，头部文件
*potNumeList("mod_menu_li","menu_cont");
*/

var potNumeList={
	fnu:this,
	 mouseshow:function(obj,num){
		var ofj = obj,nfm = num,
		catli = $("#catge"+num),
		catli_on = obj+"_on",
		contr = $(".mod_menu_list"),
		conshow = $("#panel"+num),
		fNume =$("#menu_cont");	
		catli.siblings().removeClass(catli_on);
		catli.addClass(catli_on);
		fNume.css({"display":"block"});
		conshow.siblings().css({"display":"none"});
		conshow.css({"display":"block"});
		this.showNume(ofj,nfm);
	},
	mousehide:function(l,a){
		var catli = $("#catge"+a),
		catli_on = obj+"_on",
		contr = $(".mod_menu_list"),
		conshid = $("#panel"+num).siblings(),
		fNume =$("#menu_cont");
		catli.removeClass(catli_on);
		fNume.css({"display":"none"});
		conshid.css({"display":"none"});
		
	},
	hideAll:function(obj){
		var contr = $(".mod_menu_list"),
			dis =  $(".mod_menu_li_other"),
		p = $("."+obj),
		p_on = obj+"_on",
		conshid = $("#menu_cont > div"),
		Nume =$("#menu_cont");
		contr.mouseleave(function(){
			p.removeClass(p_on);
			conshid.css({"display":"none"});
			Nume.css({"display":"none"});
		});
		dis.mouseover(function(){
			p.removeClass(p_on);
			conshid.css({"display":"none"});
			Nume.css({"display":"none"});
		});
		
	},
	showNume:function(fl,a){
		var contr = $(".mod_menu_list"),
			catli = $("#catge"+a),
			Nume = $("#menu_cont"),
			hd =$(".mod_menu_hd"),
			Ncd = $("#panel"+a);
			Nume.css({"display":"block"});
			cah = parseFloat(catli.offset().top, 10);
		var catli_h = parseFloat(catli.outerHeight(), 10);
			Nume_h=parseFloat(Nume.offset().top, 10),
			Ncd_h = parseFloat(Ncd.outerHeight(), 10);
			hd_h = parseFloat(hd.outerHeight(), 10);
			f = parseFloat($("#menu_list").offset().top, 10),
			g = parseFloat($(window).scrollTop(), 10),
            h = parseFloat($(window).height(), 10);
			0 < cah + catli_h - Ncd_h - f && (Nume_h = cah + catli_h - Ncd_h);
            0 < Nume_h + Ncd_h + f - g - h && (Nume_h = g + h - Ncd_h - f);
            Nume_h + f > cah && (Nume_h = cah - f);
            0 > cah + catli_h - Ncd_h - f && (Nume_h = hd_h);		
			Nume.stop().animate({top:Nume_h+"px",height:Ncd_h+"px"},200);			
		this.hideAll(fl);
		
	},
	eachLi:function(li){
		var p = $("."+li);
		var tl;
		p.each(function(i){
			p.eq(i).mousemove(function(){
				var num = $(this).attr("index"),
				obj = $(this).attr("class");
				var onj = obj.length;
				if(onj<12){
					potNumeList.mouseshow(obj,num);
				}
			});
		});
			
	}
	
}


/*var potNumeList={
	fnu:this,
	mouseshow:function(){},
	mousehide:function(){},
	hideAll:function(){},
	showNume:function(){},
	eachLi:function(){}
}
*/

/*新改的头部下拉部分 start*/

/*$(function(){
	if(!$(".mod_menu_list_on").has('.mod_menu_hd').size()){

		$(".mod_menu_list").mouseenter(function(){
			$("#menu_list").css({"display":"block"});
		})

		$('.mod_menu_list').mouseleave(function(){
			$('.mod_menu_li').removeClass("mod_menu_li_on");
			$("#menu_list").hide();
			$("#menu_cont").hide();
		})
		
		$("#menu_cont").mouseleave(function(){
			$('.mod_menu_li').removeClass("mod_menu_li_on");
		})
	}else{

		$("#menu_list").css({"display":'block'});

		$(".mod_menu_list").mouseleave(function(){
			$("#menu_cont").hide();
		})
		$("#menu_cont").mouseleave(function(){
			$('.mod_menu_li').removeClass("mod_menu_li_on");
		})
	}


	$('.mod_menu_li').mouseenter(function(){
		$("#menu_cont").css({'display':"block"});
		var ind = $('.mod_menu_li').index(this);
		$(".submenu_item").hide();
		$("#panel"+ind).show();
		$("#catge"+ind).addClass("mod_menu_li_on");

		if($(this).attr("id")){
			var catgeHeight = $("#menu_list").height()
			var modHeight = $("#menu_cont").height()
			var top = $(this).position().top
			if(modHeight<catgeHeight){
				$("#menu_cont").css("top",(top+40)+"px")
			}else{
				$("#menu_cont").css("top","40px")
			}
		}

	})
	$('.mod_menu_li').mouseleave(function(){
		$('.mod_menu_li').removeClass("mod_menu_li_on");
	})

	$(".submenu_item").mouseenter(function(){
		var id = $(this).attr("id")
		//alert(id)
		var i=/\d/.exec(id);
		//alert(i)
		$('.mod_menu_li').removeClass("mod_menu_li_on").eq(i).addClass("mod_menu_li_on")
	})

})*/

/**
 * @tabs	选项卡插件
 * @调用方式	
   $.fn.tabs({
	    mouseEvent: "",//鼠标事件
		tabstit: "" ,//选项卡的标题层class	
		tabsPanel: ""//选项卡内容的div容器	 				 
   });
 */
$.fn.tabs = function(options){
	//默认值
	var defaults = {
		mouseEvent: "click",
		tabstit:"tab_fab_h",
		tabsPanel:"tab_fab_cont"
	}
	var options = $.extend({}, defaults, options);
	var tit = $("."+options.tabstit).find("li");
	var cont =  $("."+options.tabsPanel);
	if(options.mouseEvent == "click"){
		tit.each(function(i){
			$(this).bind({
				"click":function(){
					THIS = $(this);
					hovertime = setTimeout(function(){
						THIS.addClass("tab_tit_on");
						THIS.siblings().removeClass("tab_tit_on");
						cont.eq(i).css("display","block");
						cont.eq(i).siblings().css("display","none");
					},200)
				}
			});				  
		})	
	}
	else if(options.mouseEvent == "mouseover"){
		tit.each(function(i){
			$(this).bind({
				"mouseover":function(){
					THIS = $(this);
					hovertime = setTimeout(function(){
						THIS.addClass("tab_tit_on");
						THIS.siblings().removeClass("tab_tit_on");
						cont.eq(i).css("display","block");
						cont.eq(i).siblings().css("display","none");
					},200)
				},
				"mouseout":function(){
					clearTimeout(hovertime);	
				}
			});				  
		})	
	}
}
/**
 * @fadeSlider	图片滑动播放插件
 * @调用方式	
   $.fn.fadeSlider({
		controlsShow: true, //是否显示数字导航
		speed: 800, //滑动速度
		auto: true, //是否自定滑动
		pause: 2000, //两次滑动暂停时间持
		height: 0, //容器高度，不设置自动获取图片高度
		width: 0//容器宽度，不设置自动获取图片宽度
   })
 */
$.fn.fadeSlider = function(options) {
	//默认值
    var defaults = {
        controlsShow: true, //是否显示数字导航
		effect: 1, //1表示浮现,2表示滑动
        speed: 800, //滑动速度
        auto: true, //是否自定滑动
        pause: 2000, //两次滑动暂停时间持
        height: 0, //容器高度，不设置自动获取图片高度
        width: 0 //容器宽度，不设置自动获取图片宽度
    }
	var options = $.extend({}, defaults, options);
	
	this.each(function() {
		var obj = $(this);
		var curr = 1; //当前索引
		var $img = obj.find("li");
		var s = $img.length;
		var w = $img.eq(0).outerWidth();
		var h = $img.eq(0).outerHeight();
		var $flashelement = $("ul", obj);
		options.height == 0 ? obj.height(h) : obj.height(options.height);
		options.width == 0 ? obj.width(w) : obj.width(options.width);
		obj.css({"overflow":"hidden","position":"relative"});
		$(obj).append("<div class='slider_title'>"+$img.first().find("h3").find("a").html()+"</div>");
		if(options.effect == 1){
			$("li", obj).css("display","none");	
			$("li img", obj).css({"display":"block","opacity":"1"});	
		}
		else if(options.effect == 2){
			$("li", obj).css({"float":"left","width":w})
			$flashelement.css("width", s * w);	
			$("li img", obj).css({"display":"block","opacity":"1"});	
		}
		if(options.controlsShow) {
			var navbtnhtml = '<div class="slider_navNum">';
			for (var i = 0; i < s; i++) {
				navbtnhtml += '<span>' + (i + 1) + '</span>';
			}
			navbtnhtml += '</div>';
			obj.append(navbtnhtml);
			obj.find(".slider_navNum span").hover(function() {
				var num = Number($(this).html());
				flash(num, true, options.effect);
			}, function() {
				timeout = setTimeout(function() {
					flash((curr / 1 + 1), false, options.effect);
				}, options.pause);
			});
		};
		function setcurrnum(index) {
			obj.find(".slider_navNum span").eq(index).addClass('on').siblings().removeClass('on');
		}
		function flash(index, clicked, effect) {
			$flashelement.stop();
			var next = index == s ? 1 : index + 1;
			curr = next - 1;			
			setcurrnum((index - 1));
			switch(effect){
				case 1:
				$("li", obj).css("display","none");
				$("li", obj).eq(index - 1).fadeTo(options.speed,1);
				//$("li", obj).eq(index - 1).find("h3").css('display', 'block');
				$(".slider_title",obj).html($("li", obj).eq(index - 1).find("h3").find("a").html());				
				break;
				
				case 2:
				p = ((index - 1) * w * -1);
				$(".slider_title",obj).html($("li", obj).eq(index - 1).find("h3").find("a").html());
				$flashelement.animate(
					{ marginLeft: p },
					options.speed
				);
			}
			if (clicked) {
				clearTimeout(timeout);
			};
			if (options.auto && !clicked) {
				timeout = setTimeout(function() {
					flash(next, false, options.effect);
				}, options.speed + options.pause);
			};
		}
		var timeout;
		//初始化
		setcurrnum(0);
		if(options.effect == 1){
			$("li", obj).eq(0).css('display', 'block');
			//$("li", obj).eq(0).find("h3").css('display', 'block');		
		}
		if (options.auto) {
			timeout = setTimeout(function() {
				flash(2, false, options.effect);
			}, options.pause);
		};
	});
};
/**
 * @fadeSlider	资讯滚动列表效果
 * @调用方式	
  ticker()
 */
var ticker =function(){
    var _wrap=$('.rol_list_blank_ul');//定义滚动区域
    var _interval=2000;//定义滚动间隙时间
    var _moving;//需要清除的动画
	var rols = $(".rol_list_arow a"),
		rolCla=rols.attr("class");
    _wrap.hover(function(){
        clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
    },function(){
        _moving=setInterval(function(){
           var _field=_wrap.find('li:first');//此变量不可放置于函数起始处,li:first取值是变化的
    	   var _w=_field.width();//取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
            _field.animate({marginLeft:-_w+'px'},2100,function(){//通过取负margin值,隐藏第一行
                _field.css('marginLeft',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
            })
        },_interval)//滚动间隔时间取决于_interval
    }).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动
	
};

/**
 * @rotatelist	资讯滚动列表效果
 * @调用方式	
   $.fn.rotatelist({
		speed: 10, //移动速率
		rate : 3, //图片每次移动的距离
		par : 80, //基数
		direction : 1 //方向，1是水平方向，2是垂直方向
   })
 */
$.fn.rotatelist = function(options){
	var defaults = {
		speed: 10, //移动速率
		rate : 1, //图片每次移动的距离
		par : 315, //基数
		direction : 1 //方向，1是水平方向，2是垂直方向
	};
	var options = $.extend({}, defaults, options);

	this.each(function() {
		var obj = $(this);
		var action_timer = null;
		var init_timer = null;
		var On = false;
		var length = 0;
		var In = false;
		var slideobj = null;
		var holder1 = null;
		//初始化
		function init(){
			slideobj = obj.find(".rol_list_blank");
			holder1 = slideobj.find(".holder1");
			slideobj.find(".holder2").html(holder1.html());
			
			if(options.direction == 1){
				slideobj.scrollLeft(holder1.outerWidth());
				if(holder1.outerWidth() > slideobj.outerWidth()){
					start();	
				}
				else return;
			}
			else if(options.direction == 2){
				slideobj.scrollTop(holder1.outerHeight());
				if(holder1.outerHeight() > slideobj.outerHeight()){
					start();	
				}
				else return;
			}
			
			slideobj.mouseover(function () {
				stop()
			})
			slideobj.mouseout(function () {
				start()
			})
			
			if(obj.find(".j_nxt").size() != 0){
				var aleft = obj.find(".j_nxt");
				aleft.mousedown(function () {
					up();
				})
				aleft.mouseup(function () {
					stopUp();
				})
				aleft.mouseout(function () {
					stopUp();
				})		
				aleft.mouseover(function () {
					stop();
				})	
			}
			
			if(obj.find(".j_pre").size() != 0){
				var aright = obj.find(".j_pre");
				aright.mousedown(function () {
					down();
				})
				aright.mouseup(function () {
					stopDown();
				})
				aright.mouseout(function () {
					stopDown();
				})
				aright.mouseover(function () {
					stop();
				})	
			}
			
		}
		function start(){
			clearInterval(init_timer);
			init_timer = setInterval(function () {
				down();
				stopDown();
			}, 3000)
		};
		function stop(){
			clearInterval(init_timer)	
		};
		function up(){
			if (On) {
				return
			}
			clearInterval(init_timer);
			On = true;
			action_timer = setInterval(function () {
				move_backword()
			}, options.speed)	
		};
		function stopUp(){
			if (In) {
				return
			}
			clearInterval(action_timer);
			if(options.direction == 1){
				if (slideobj.scrollLeft() % options.par != 0) {
					length = -(slideobj.scrollLeft() % options.par);
					T()
				} else {
					On = false
				}	
			}
			else if(options.direction == 2){
				if (slideobj.scrollTop() % options.par != 0) {
					length = -(slideobj.scrollTop() % options.par);
					T()
				} else {
					On = false
				}	
			}
			start();
		};
		function move_backword(){
			if(options.direction == 1){
				if (slideobj.scrollLeft() <= 0) {
					slideobj.scrollLeft(holder1.outerWidth());
				}
				var lf = slideobj.scrollLeft() - options.rate; 
				slideobj.scrollLeft(lf);	
			}
			else if(options.direction == 2){
				if (slideobj.scrollTop() <= 0) {
					slideobj.scrollTop(holder1.outerHeight());
				}
				var tp = slideobj.scrollTop() - options.rate; 
				slideobj.scrollTop(tp);	
			}
		};
		function down(){
			clearInterval(action_timer);
			if (On) {
				return
			}
			clearInterval(init_timer);
			On = true;
			move_forword();
			action_timer = setInterval(function () {
				move_forword();
			}, options.speed)
		};
		function stopDown(){
			if (In) {
				return
			}
			clearInterval(action_timer);
			if(options.direction == 1){
				if (slideobj.scrollLeft() % options.par != 0) {
					length = options.par - slideobj.scrollLeft() % options.par;
					T();
				} else {
					On = false
				}	
			}
			else if(options.direction == 2){
				if (slideobj.scrollTop() % options.par != 0) {
					length = options.par - slideobj.scrollTop() % options.par;
					T();
				} else {
					On = false
				}	
			}
			start();
		};
		function move_forword(){
			if(options.direction == 1){
				if (slideobj.scrollLeft() >= holder1.outerWidth()) {
					slideobj.scrollLeft(0);
				}
				var lf = slideobj.scrollLeft() + options.rate; 
				slideobj.scrollLeft(lf);	
			}
			else if(options.direction == 2){
				if (slideobj.scrollTop() >= holder1.outerHeight()) {
					slideobj.scrollTop(0);
				}
				var tp = slideobj.scrollTop() + options.rate; 
				slideobj.scrollTop(tp);	
			}	
		};
		function T(){
			if (length == 0) {
				On = false;
				In = false;
				return
			}
			var V;
			var W = options.speed,
				X = options.rate;
			if (Math.abs(length) < options.par / 5) {
					X = Math.round(Math.abs(length / 5));
					if (X < 1) {
						X = 1
					}
				}
			if (length < 0) {
					if (length < -X) {
						length += X;
						V = X
					} else {
						V = -length;
						length = 0
					}
					if(options.direction == 1){
						var lf = slideobj.scrollLeft() - V;
						slideobj.scrollLeft(lf);	
					}
					else if(options.direction == 2){
						var tp = slideobj.scrollTop() - V;
						slideobj.scrollTop(tp);	
					}
					setTimeout(function () {
						T()
					}, W)
			} else {
				if (length > X) {
					length -= X;
					V = X
				} else {
					V = length;
					length = 0
				}
				if(options.direction == 1){
					var lf = slideobj.scrollLeft() + V;
					slideobj.scrollLeft(lf);	
				}
				else if(options.direction == 2){
					var tp = slideobj.scrollTop() + V;
					slideobj.scrollTop(tp);	
				}
				setTimeout(function () {
					T()
				}, W)
			}	
		}
		init();
	});
}

/**
 * @create: charry
 * @rotatelist	内容列表垂直无缝滚动插件
 * @调用方式	
   $.fn.listScroll({
		speed: 30, //移动速率
		rowHeight : 24 //列表高度
   })
 */
$.fn.listScroll = function(options){
	var defaults = {
		speed: 30
		//rowHeight: 24
	}
	var options = $.extend({},defaults,options),
	intId = [];
	
	function marquee(obj){
		var iw = obj.find('.j-hd1 li').outerWidth(),
			ilen =obj.find('.j-hd1 li').length;
		var wl = iw*ilen;
		$('.j-hd2').html($('.j-hd1').html());
		obj.find("ul").width(wl);
		obj.find("ul").animate({marginLeft: "-=1"},0,function(){
			var sh = Math.abs(parseInt($(this).css("margin-left")))//得到margin-left的值转换成整数
			if(sh >= wl)
			{
				//$(this).find("li").slice(0,1).appendTo($(this));//将第一个li列表追加到ul里面
				$(this).css("margin-left",0)//重置margin-left为0，进行下一次滚动
			}else{
				$('j-hd2').css("margin-left",0)
			}
		});
		
	}
	this.each(function(i){
		//var sh = options["rowHeight"],
		var speed = options["speed"],
		_this = $(this);
		
		var _setInterval=function(){
				intId[i]=setInterval(function(){marquee(_this);},speed);
			}
			_setInterval();
			//hover
			_this.hover(function(){clearInterval(intId[i]);},function(){_setInterval();});
	})
}

/*******************************后台中心脚本****************************************/
/*鼠标点击，dl收起展开*/
var potclcik = function(obj){
	var d = $("."+obj),
		t = d.find("dt");
	t.click(function(){
		var c = $(this).attr("class");
		if(c=="show_ico"){
			var h = t.height();
			$(this).parent().animate({
  				height: "25px" }, "slow");
			$(this).attr("class","hide_ico");
		}else if(c=="hide_ico"){
			$(this).parent().css({"height":"auto"});
			$(this).attr("class","show_ico");
		}
	});
}
/*页面左右两边高度*/
var sorkHeight=function(){
	var rH = $(".mod_grid_m").outerHeight(true);
	var lH = $(".mod_grid_l").outerHeight(true);
	if(rH>lH){
		$(".mod_grid_l").height(rH);
	}
}

var click_add_on =function(obj,bln){
	var n = $("."+obj).find(bln);
	n.click(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass('on')
	});
}
/*全选删除*/

var del_btn = function(hd,bd){
	var del_hd = $(".j-acd").find('input[name="relche"]'),
		del_bd = $('input[name="'+bd+'"]');
		del_hd.click(function(){
			del_bd.prop('checked', $(this).prop('checked'));
		})

	//del_hd.attr("date-ck","ck[0]");
//	del_bd.attr("date-dk","date-dk[f]");
//	del_hd.click(function(){
//		var ck=del_hd.attr("date-ck");
//		if(ck=="ck[0]"){ 
//			/*del_bd.each(function(i){
//				del_bd.eq(i).attr("checked", true);
//			}); */
//			$(this).attr("checked", true);
//			del_bd.attr("checked", true);
//			del_bd.parents("tr").css("background-color","#F4F4F4");
//			del_hd.attr("date-ck","ck[1]");
//			del_bd.attr("date-dk","date-dk[t]");
//		} else if(ck=="ck[1]"){  
//			/*del_bd.each(function(i){
//				del_bd.eq(i).attr("checked", false);
//			});*/
//			$(this).attr("checked", false);
//			del_bd.attr("checked", false); 
//			del_bd.parents("tr").css("background-color","#fff");
//			del_hd.attr("date-ck","ck[0]"); 
//			del_bd.attr("date-dk","date-dk[f]");
//		} 
//	});	
//	del_bd.click(function(){
//		var dk=$(this).attr("date-dk");
//		if(dk=="date-dk[f]"){
//			$(this).attr("checked", true);
//			$(this).attr("date-dk","date-dk[t]"); 
//			$(this).parents("tr").css("background-color","#F4F4F4");
//		} else if(dk=="date-dk[t]"){  
//			$(this).attr("checked", false); 
//			$(this).attr("date-dk","date-dk[f]");
//			$(this).parents("tr").css("background-color","#fff");
//			del_hd.attr("date-ck","ck[0]"); 
//			del_hd.attr("checked", false);
//		}
//	});
	
	
	/*del_bd.each(function(i){	
		var dk=del_bd.attr("date-dk");
		del_bd.eq(i).click(function(){
			if(dk=="date-dk[f]"){
				$(this).attr("checked", true);
				$(this).attr("date-dk","date-dk[t]"); 
			} else if(dk=="date-dk[t]"){  
				$(this).attr("checked", false); 
				del_hd.attr("date-ck","ck[0]"); 
				del_hd.attr("checked", false);
			}
		});
		
	});*/

}	


/*******************************机构店铺****************************************/




/*
	线下活动详细页广告
*/

$(function(){
	$(".j-image").click(function(){
		var src = $(this).find('img').attr('src');
		$(this).parent().addClass('on').siblings().removeClass('on')
		$(".j-imgbox").find('img').attr('src',src);
	})

	
	//培训班详细页选中当前效果
	//$('[rel="selecton"]').click(function(){
	//	$(this).addClass("selectboxOn").siblings().removeClass("selectboxOn")
	//})
	
	$(".j-tobm").live("click",function(){
		$(".j-pxbox").addClass("pxRedBox");
		$(this).parent().addClass("fn-dn");
		$(".j-choice").removeClass("fn-dn");
		$(".j-pxClose").removeClass("fn-dn")
		$(".j-submitform").attr("rel","linkbuy");
	})
	$(".j-addbuy").live("click",function(){
		$(".j-pxbox").addClass("pxRedBox");
		$(this).parent().addClass("fn-dn");
		$(".j-choice").removeClass("fn-dn");
		$(".j-pxClose").removeClass("fn-dn")
		$(".j-submitform").attr("rel","linkadd");
	})


	$("[rel='selecton']").click(function(){
		if($(this).attr("data-flag")){
			//$(this).removeClass("selectboxOn").removeAttr("data-flag");
		}else{
			$(this).attr("data-flag","selected").addClass("selectboxOn").siblings().removeClass("selectboxOn").removeAttr("data-flag");

		}
		if($(".selectboxOn").length==2){
			$(".jgt-btn").removeClass("j-tobm").unbind("click").attr("rel","linkbuy");
			$(".addbuy").removeClass("j-addbuy").unbind("click").attr("rel","linkadd");
			if($(".pxRedBox").length==1){
				$(".j-choice").addClass("fn-dn");
				$(".j-sendform").removeClass("fn-dn");
			}
		}else{

			$(".jgt-btn").addClass("j-tobm").removeAttr("rel","linkbuy");
			$(".addbuy").addClass("j-addbuy").removeAttr("rel","linkadd");

			if($(".pxRedBox").length==1){
				$(".j-choice").removeClass("fn-dn");
				$(".j-sendform").addClass("fn-dn");
			}
		}

	})

	$(".j-pxClose").live("click",function(){
		$(this).parent().removeClass("pxRedBox")
		$(this).addClass("fn-dn");
		$(".j-choice").addClass("fn-dn");
		$(".j-sendform").addClass("fn-dn");
		$(".j-line").removeClass("fn-dn")
	})


	//通过以上的判断则提交当前表单

	$("[rel='linkbuy']").live("click",function(){
		$("#tobuy").submit();
	})

	$("[rel='linkadd']").live("click",function(){
		$("#tobuy").submit();

	})
/*
	$(".j-submitform").live("click",function(){
		$("#tobuy").submit();
	})
*/

	
	function checkUserSelect(){ //判断是否以经选择好了条件
		if($(".selectboxOn").length !==2){return false;}
		var date=$(".j-calender").val();
		if(!date){
			return false;
		}
		return true;
	}
	
	$(".j-count").focus(function(){
		$(this).blur();
	})
	
	
	
	//报名人数增减
	var cV = function(){
		var count = $('.j-count').val();
		if(count==1){
			$(".j-bmcountReduce").addClass("un-reduce");
		}
	}
	cV();
	$('.j-bmcountAdd').click(function(){
		var tar = $(this).parent().find('.j-count');
		var count = tar.val();
		count++;
		tar.val(count);
		if(count > 1){
			$(".j-bmcountReduce").removeClass("un-reduce");
		}
	})
	
	$('.j-bmcountReduce').click(function(){
		var tar = $(this).parent().find('.j-count');
		var count = tar.val();
		if(count ==1){
			return ;
		}else if(count > 1){
			$(this).removeClass("un-reduce");
		}
		count--;
		if(count ==1){
			$(this).addClass("un-reduce");
		}
		tar.val(count);
	})

})
/*******************************试听课****************************************/


/*
	栏目展示
*/
var potclick=function(obj){
	var o = $("."+obj);
	   // n = $("."+rwd);
	o.click(function(){
		var e = $(this).find(".im_hd_arrow em"),
			em = e.attr("class");
		if(em=="ia_se"){
			$(this).find(".im_hd_arrow").html('<em class="ia_dw">展开</em>');
			$(this).next().slideUp("slow");
		}else if(em=="ia_dw"){
			$(this).find(".im_hd_arrow").html('<em class="ia_se">收起</em>');
			$(this).next().removeClass('fn-dn').slideDown("slow");
			
		}
	});
	
}

$(function(){

		//频道列表页模板 
	$(".j-listdown").hover(
		function(){
			$(this).find(".j-show").siblings().removeClass("msc-a");
		}, function(){
			$(this).find(".j-show").siblings().addClass("msc-a");	
		}
	);
	$(".j-listdown a").click(function(){
		$(this).addClass("j-show");
		$(this).siblings().addClass("psa-b msc-a").removeClass("j-show");	
		var ce = $(this).clone(true).removeClass("psa-b");
		$(".j-listdown").prepend(ce);
		$(this).remove();
	});
	//线下活动详细页
	
	
	//点击去报名后
	window.T="";
	$(".j-goto").live('click',function(){
		window.num=59;
		if(window.T){
			clearInterval(window.T);
			$("#reduceCount").html(59);
		}
		var html=$(".j-bmmain").html();
		$.dialog({
			width:395,
			height:210,
			nomask:true,
			html:html,
			run:true,
			title:'活动报名',
			titleclass:"alerttitle"/*,
			after:function(){
				$(".j-submitbtn").click(function(){
					$.dialogClose();
					bmText();
				})
			}*/
		});
	})
	//点击报名上的提交
	window.bmText=bmText;
	function bmText(){
		var html = $(".j-bmtext").html();
		$.dialog({
			width:395,
			height:210,
			nomask:true,
			html:html,
			run:true,
			title:'活动报名',
			titleclass:"alerttitle",
			after:function(){
				window.T=setInterval(reduceCount,1000);
			}
		});
	}
	window.num=59;	
	function reduceCount(){
		window.num--;
		if(window.num==0){
			clearInterval(window.T);
			$("#reduceCount").parent().removeClass("disableSend").addClass("send");
		}
		$("#reduceCount").html(window.num);
	}
	
	$(".send").live("click",function(){
		$("#reduceCount").parent().removeClass("send").addClass("disableSend");
		$("#reduceCount").html(59);
		window.num=59;
		window.T=setInterval(reduceCount,1000);
	})
	
})


//表单获得焦点移除错误提示

$(function(){
	$("input").focus(function(){
		$(this).parent().removeClass("formerror");
	})

	$("input[type='checkbox']").click(function(){
		$(this).parent().parent().removeClass("formerror");
	})

	$("input[type='file']").click(function(){
		$(this).css("border","");
	})

	$("select").click(function(){
		$(this).parent().removeClass("formerror");
		$(this).css("border","");
	})
})

//播放页表单
$(function(){
	$(".j-tit").focus(function(){
		$(".j-tit-bd").slideDown("slow",function(){$('.j-tit-bd').css('display','block')});
	});
	$(".j-tit-closed").click(function(){
		$(".j-tit-bd").slideUp("slow",function(){$('.j-tit-bd').css('display','none')});
	});
	//进入评论区
	$('.j-rqa-hd').click(function(){
		$('.j-qal,.j-editarea').slideUp("slow",function(){$('.j-qal').css('display','none')});
		$('.j-rqa-bd').slideDown("slow",function(){$('.j-rqa-bd').css('display','block')});
	});
	//返回列表区
	$('.j-goback').click(function(){
		$('.j-qal,.j-editarea').slideDown("slow",function(){$('.j-qal').css('display','block')});
		$('.j-rqa-bd').slideUp("slow",function(){$('.j-rqa-bd').css('display','none')});
	});
	//点击显示评论
	$('.j-show-hd').click(function(){
		$('.j-show-bd').slideDown("slow",function(){$('.j-show-bd').css('display','block')});
	});
	//删除评论
	$('.j-deld').click(function(){
		var em =parseInt( $('.j-show-hd').find('em').text());
		$(this).parent().slideUp("slow",function(){
			$(this).parent().remove();
			em = --em;
			$('.j-show-hd').find('em').html(em);
			if(em==0){
				$('.j-show-hd').find('em').html('添加');
			}
		});
	});
	//删除主要问题
	$('.j-close').click(function(){	
		$('.j-rqa-bd').slideUp("slow",function(){$('.j-rqa-bd').remove()});
		$('.j-qal,.j-editarea').slideDown("slow",function(){$('.j-qal').css('display','block')});
	});

})

/*试听课 新添 精品直播*/

function stu_show(){                          
    var index=0;
    var length=$(".j-time-bd dl").length;
	var w = $(".j-time-bd dl").outerWidth();
	$('.j-time-bd').width(length*w);
    
	if(length=='1'){
		$('.j-tmie-hd').addClass('fn-dn');
	}
    function showImg(i){
	   var p = w*i;
		$(".j-time-bd").animate(			  
			{ marginLeft: -p },
			300
		);
		$(".j-tmie-hd .v_day").html($(".j-time-bd dl").eq(i).attr('title'));
    }
    
    function slideNext(){
        if(index >=0 && index < length-1){
			 index++;
			 $('.j-r').removeClass('btn-un-right').addClass('btn-right');
			 $('.j-l').removeClass('btn-un-left').addClass('btn-left');	
			 if(index==length-1){
				$('.j-r').removeClass('btn-right').addClass('btn-un-right');
				$('.j-l').removeClass('btn-un-left').addClass('btn-left');
			}
             showImg(index);

        }else{
			$('.j-r').removeClass('btn-right').addClass('btn-un-right');
			$('.j-l').removeClass('btn-un-left').addClass('btn-left');		
            return false;
        }	 
	  
	   
    }
     
    function slidepre(){
		
       if(index >=1 ) {
		   --index;
             showImg(index);
			 $('.j-l').removeClass('btn-un-left').addClass('btn-left');
			 $('.j-r').removeClass('btn-un-right').addClass('btn-right');
			  if(index==0){
				$('.j-r').removeClass('btn-un-right').addClass('btn-right');
				$('.j-l').removeClass('btn-left').addClass('btn-un-left');
			}
        }else{
			$('.j-r').removeClass('btn-un-right').addClass('btn-right');
			$('.j-l').removeClass('btn-left').addClass('btn-un-left');
			
        }
    }	
	$(".j-r").click(function(){
		   slideNext();
	   })
	$(".j-l").click(function(){
		   slidepre();
	   })
	
}
/*回到顶部*/
function setGoTop() {
    var backToTop = $('<div class="backToTop"><a title="返回顶部" class="backToTop1" href="javascript:void(0)"></a><a title="帮助" target="_blank" class="backToTop2" href="http://bbs.kuaiji.com/forum-802-1.html"></a></div>');
    backToTop.appendTo($("body"));
    backToTop.find(".backToTop1").click(function() {
        $("html, body").animate({scrollTop: 0}, 120);
    });
    backToTop.toggle($(document).scrollTop() > 0);
	$(".j-close-second").click(function(){
		$(this).parent().slideUp("slow");
	});

    $(window).scroll(function() {
        backToTop.toggle($(document).scrollTop() > 0);
        // IE6下的定位
        if (navigator.userAgent.indexOf("MSIE 6") != -1)
            backToTop.css("top", $(document).scrollTop() + $(window).height() - backToTop.innerHeight() - 108);
    });
}

/* 
 *@author charry
 *@info 文本框内容长度统计
 */
$.fn.InputLength=function(options){
		var def={
			showId:null,
			strLen:30
		}
		$me=$(this);
		var options=$.extend(def,options);
		$(options["showId"]).html(options["strLen"]-$me.val().length);//设置初始值
		return this.each(function(){
			$me.bind("keydown keyup",function(){
				var slen=$me.val().length;
				if(slen > parseInt(options["strLen"])){
					$me.val($me.val().substring(0,options["strLen"]));
					return;
				}
				else{
					$(options["showId"]).html(options["strLen"]-slen);
				}
			})
		});
	}
	
/* 
 *@author charry
 *@info 收藏本站
 */
//加入收藏
function AddFavorite(sURL, sTitle)
{
    try{
        window.external.addFavorite(sURL, sTitle);
    }catch(e){
        try{
            window.sidebar.addPanel(sTitle, sURL, "");
        }catch(e){
            alert('按 "Ctrl+D" 收藏会计网，最新会计资讯，免费试听课，本地培训班，一键直达。');
        }
    }
}
//设为首页
function SetHome(obj,vrl){ 
	try{ 
		obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); 
	}catch(e){ 
		if(window.netscape) { 
			try { 
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
			}catch (e) { 
			alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"); 
		} 
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
		prefs.setCharPref('browser.startup.homepage',vrl); 
		}else{ 
			alert("您的浏览器不支持，请按照下面步骤操作：\n 1.打开浏览器设置。\n 2.点击设置网页。\n 3.输入："+ vrl +" 点击确定。"); 
		} 
	} 
} 
