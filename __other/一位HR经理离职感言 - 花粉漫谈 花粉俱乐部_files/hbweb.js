var jq = jQuery.noConflict();
var hbweb = {};
hbweb.common = {
	hfixed : function(){
		var navtop = 62, sidetop = 110, hfst;
		var dohfix = function(){
			hfst = document.documentElement.scrollTop || document.body.scrollTop;
			
			if(hfst > navtop){jq("#hbw_nav").addClass("hfixed"); }
			else{jq("#hbw_nav").removeClass("hfixed");	}
		};
		dohfix();

		jq(window).on("scroll", function(){ dohfix(); });

		if(jq("#post_acts").length){
			var dosidefix = function(){
				hfst = document.documentElement.scrollTop || document.body.scrollTop;
				
				if(hfst > sidetop){
					jq("#post_acts").addClass("sfixed");
					jq("#pa_fill").show();
				}
				else{
					jq("#post_acts").removeClass("sfixed");
					jq("#pa_fill").hide();
				}
			};
			dosidefix();
			jq(window).on("scroll", function(){ dosidefix(); });
		}
		
	},
	nmore : function(){
		jq(".hnu-section, .hn-more").hover(
			function(){
				jq(this).children(".hnus-fmenu").fadeIn(200);
			},function(){
				jq(this).children(".hnus-fmenu").fadeOut(100);
			}
		);
	},
	sideslide : function(){
		// side slide
		var ssrItem = jq(".ss-reel .ssr-item");
		var subRollInfo = {
			speed    : 240,
			length   : ssrItem.length,
			curIndex : 0,
			curSlide : null,
			comSlide : null,
			animating : false
			
		};
		
		var animatEnd = function(){
			subRollInfo.animating = false;
		}
			
		/* s00167165, 20140415, del, 轮播图左下角的圆点不允许点击
		jq(".ssc-sign").on("click", ".sscs-dot", function(){
			var targetIndex = jq(this).attr("rel");
			if(subRollInfo.curIndex == targetIndex){ return; }
			else if(subRollInfo.curIndex < targetIndex){
				jq(this).addClass("cur").siblings().removeClass("cur");
				subRollInfo.curSlide = ssrItem.eq(subRollInfo.curIndex);
				subRollInfo.curIndex = targetIndex;
				subRollInfo.comSlide = ssrItem.eq(subRollInfo.curIndex).css("left", 240);
				subRollInfo.curSlide.animate({"left" : -240}, subRollInfo.speed);
				subRollInfo.comSlide.animate({"left" : 0}, subRollInfo.speed);
				
			}
			else{
				jq(this).addClass("cur").siblings().removeClass("cur");
				subRollInfo.curSlide = ssrItem.eq(subRollInfo.curIndex);
				subRollInfo.curIndex = targetIndex;
				subRollInfo.comSlide = ssrItem.eq(subRollInfo.curIndex).css("left", -240);
				subRollInfo.curSlide.animate({"left" : 240}, subRollInfo.speed);
				subRollInfo.comSlide.animate({"left" : 0}, subRollInfo.speed);
			}
		});
		*/
		
	
		jq(".ssc-dirbtn").on("click", ".sscs-forbtn", function(){
			if(!subRollInfo.animating){
				subRollInfo.curSlide = ssrItem.eq(subRollInfo.curIndex);
				if(subRollInfo.curIndex < subRollInfo.length - 1){
					subRollInfo.curIndex++;
				}
				else{
					subRollInfo.curIndex = 0;
				}
				jq(".ssc-sign .sscs-dot").removeClass("cur").eq(subRollInfo.curIndex).addClass("cur");
				subRollInfo.comSlide = ssrItem.eq(subRollInfo.curIndex).css("left", 240);
				subRollInfo.animating = true;
				subRollInfo.curSlide.animate({"left" : -240}, subRollInfo.speed);
				subRollInfo.comSlide.animate({"left" : 0}, subRollInfo.speed, animatEnd);
			}
	
		});
	
		jq(".ssc-dirbtn").on("click", ".sscs-bakbtn", function(){
			if(!subRollInfo.animating){
				subRollInfo.curSlide = ssrItem.eq(subRollInfo.curIndex);
				if(subRollInfo.curIndex == 0){
					subRollInfo.curIndex = subRollInfo.length - 1;
				}
				else{
					subRollInfo.curIndex--;
				}
				jq(".ssc-sign .sscs-dot").removeClass("cur").eq(subRollInfo.curIndex).addClass("cur");
				subRollInfo.comSlide = ssrItem.eq(subRollInfo.curIndex).css("left", -240);
				subRollInfo.animating = true;
				subRollInfo.curSlide.animate({"left" : 240}, subRollInfo.speed);
				subRollInfo.comSlide.animate({"left" : 0}, subRollInfo.speed, animatEnd);
			}
		});
	}
};

hbweb.index = function(){

	hbweb.common.hfixed();
	hbweb.common.nmore();
	
	
	jq(".hnus-search").on("focus", ".hs-txt", function(){
		jq(this).siblings(".hs-def").hide();
	});
	
	jq(".hnus-search").on("blur", ".hs-txt", function(){
		if(jq.trim(jq(this).val()).length == 0){
			jq(this).siblings(".hs-def").show();
		}
	});
	
	var slides = jq(".roller .slide"),
		roller = jq(".roller"),
		slideImgs = jq(".slide-img"),
		navdots = jq(".hbw-banner .roller-control .rc-dot");
	  
	var curIndex = 0,
		slideNum = slides.length,
		animating = false,
		breaking = false,
		curSlide, comingSlide, breakCurSlide, breakComingSlide,	rollInt,
		fadeTimer = 600, switchTimer = 6000;
	
	function doRoll(rollPointer){
		
		if(curSlide){
			breakCurSlide = curSlide;
			breakComingSlide = comingSlide;
		}
		
		curSlide = slides.eq(curIndex);
		if(rollPointer == "auto"){
			curIndex++;
			if(curIndex >= slideNum){ curIndex = 0; }
		}
		else if(rollPointer < 0){curIndex = slideNum - 1;}
		else{curIndex = rollPointer;}

		comingSlide = slides.eq(curIndex);
		if(breaking && breakCurSlide){
			breakCurSlide.stop(true);
			breakCurSlide.removeClass("s-cur").css({"top":-400}).show().css({opacity:1});
			breakComingSlide.addClass("s-cur");
			breaking = false;
		}
		animating = true;
		comingSlide.css("top", 0);
		
		// mk: load comingSlide img
		//comingSlide.find("img").attr("src", bannerInfo.imgPath[curIndex]);
				
		navdots.removeClass("cur").eq(curIndex).addClass("cur");
		curSlide.fadeOut({
			duration:fadeTimer,
			queue:false,
			complete:function(){
				curSlide.removeClass("s-cur").css({"top":-400}).show().css({opacity:1});
				comingSlide.addClass("s-cur");
				animating = false;
			}
		});
	}
	
	if(slides.length > 1){
		rollInt = setInterval(function(){doRoll("auto");}, switchTimer);
	}
	
	jq(".hbw-banner").on("click", ".roll-forward", function(){
		if(animating){breaking = true;}
		clearInterval(rollInt);
		doRoll("auto");
		rollInt = setInterval(function(){doRoll("auto");}, switchTimer);
	});

	jq(".hbw-banner").on("click", ".roll-bakward", function(){
		if(animating){breaking = true;}
		clearInterval(rollInt);
		doRoll(curIndex - 1);
		rollInt = setInterval(function(){doRoll("auto");}, switchTimer);
	});
	
	hbweb.common.sideslide();
	
};

hbweb.tcindex = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	
		
	
	var ctcstabs = jq(".hw-ctcs-tabcont");
	jq(".hw-ctcs-tab").on("mouseover", ".hw-ctct-link", function(){
		jq(this).addClass("hw-ctct-selected").siblings(".hw-ctct-link").removeClass("hw-ctct-selected");
		ctcstabs.hide().eq(jq(this).data("tab")).show();
	});
	var tccctabs = jq(".tcc-category .tt-cont");
	jq(".tc-tab-s2").on("mouseover", "li", function(){
		jq(this).addClass("tt-selected").siblings("li").removeClass("tt-selected");
		tccctabs.hide().eq(jq(this).data("tab")).show();
	});
};

hbweb.tcdetail = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	hbweb.common.sideslide();
};

hbweb.bbs = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	hbweb.common.sideslide();
};

hbweb.bbsall = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	hbweb.common.sideslide();
	
	var cptabs = jq(".bbsm-products .bbsm-cont");
	jq(".tc-tab-s2").on("mouseover", "li", function(){
		jq(this).addClass("tt-selected").siblings("li").removeClass("tt-selected");
		cptabs.hide().eq(jq(this).data("tab")).show();
	});
};

hbweb.huaban = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	jq(".hbbf-cate").on("click", ".hce-ctl", function(){
		if(jq(this).hasClass("hc-expand")){
			jq(this).removeClass("hc-expand").addClass("hc-collsp").html('收起 <b class="deco"></b>');
			jq(this).siblings(".hci-expanditem").slideDown(300);
		}
		else{
			jq(this).removeClass("hc-collsp").addClass("hc-expand").html('更多 <b class="deco"></b>');
			jq(this).siblings(".hci-expanditem").slideUp(300);
		}
	})
};

hbweb.vtindex = function(){
	hbweb.common.hfixed();
	hbweb.common.nmore();
	hbweb.common.sideslide();
};