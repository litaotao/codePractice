/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: msic.js 31093 2012-07-16 03:54:34Z zhangguosheng $
*/
//note 响应slidebox的鼠标事件

(function(){
	if(typeof bilicen_diy !== 'undefined') {
		return false;
	}
	bilicen_diy = true;
	function bilicen_slidexactive(step) {
		var e = getEvent();
		var aim = e.target || e.srcElement;
		var parent = aim.parentNode;
		//note 要激活的位置(第几个，数值型)，轮换图盒子ID，当前鼠标指向的slidbar中的索引按钮元素
		var xactivei = null, slideboxid = null,currentslideele = null;
		currentslideele = hasClass(aim, 'slidebarup') || hasClass(aim, 'slidebardown') || hasClass(parent, 'slidebar') ? aim : null;
		while(parent && parent != document.body) {
			//note 顺序按钮元素
			if(!currentslideele && hasClass(parent.parentNode, 'slidebar')) {
				currentslideele = parent;
			}
			//note 上和下按钮元素
			if(!currentslideele && (hasClass(parent, 'slidebarup') || hasClass(parent, 'slidebardown'))) {
				currentslideele = parent;
			}
			//note 轮换图盒子ID
			if(hasClass(parent, 'slidebox')) {
				slideboxid = parent.id;
				break;
			}
			parent = parent.parentNode;
		}
		//note 得到slidebar,一个轮换图只有一个
		var slidebar = $C('slidebar', parent);
		//note slidebar中的索引按钮元素
		var children = slidebar.length == 0 ? [] : filterTextNode(slidebar[0].childNodes);
		//note 上一个和下一个按钮
		if(currentslideele && (hasClass(currentslideele, 'slidebarup') || hasClass(currentslideele, 'slidebardown'))) {
			xactivei = step;
		//note 正常索引按钮
		} else {
			for(var j=0,i=0,L=children.length;i<L;i++){
				if(currentslideele && children[i] == currentslideele) {
					xactivei = j;
					break;
				}
				//note slidebar中可以包含上一个和下一个按钮
				if(!hasClass(children[i], 'slidebarup') && !hasClass(children[i], 'slidebardown')) j++;
			}
		}
		//note 执行显示
		if(slideboxid != null && xactivei != null) slideshow.entities[slideboxid].xactive(xactivei);
	}

	function bilicen_animate() {}
	bilicen_animate.prototype = {
		hasClass: function(el, name){
			return el && el.nodeType == 1 && el.className.split(/\s+/).indexOf(name) != -1;
		},
		addClass: function(el, name){
			el.className += this.hasClass(el, name) ? '' : ' ' + name;
		},
		removeClass: function(el, name){
			var names = el.className.split(/\s+/);
			var newname = [];
			for(var i = 0; i < names.length; i++) {
				if(names[i] !== name) {
					newname.push(names[i]);
				}
			}
			el.className = newname.join(' ');
		},
		hide:function (ele){
			if (typeof ele == 'string') {ele = $(ele);}
			if (ele){ele.style.display = 'none';ele.style.visibility = 'hidden';}
		},
		show:function (ele){
			if (typeof ele == 'string') {ele = $(ele);}
			if (ele) {
				this.removeClass(ele, 'hide');
				ele.style.display = '';
				ele.style.visibility = 'visible';
			}
		},
		fade : function(obj,timer,ftype,cur,fn) {
			var object = this;
			obj = typeof obj == 'string' ? $(obj) : obj;
			if (!obj || obj.getAttribute('fadetimer') && (cur == 0 || cur == 100)) {
				return false;
			}
			if (cur == 0 || cur == 100) {
				this[ftype === 'in' ? 'show' : 'hide'](obj);
			}

			ftype = ftype != 'in' && ftype != 'out' ? 'out' : ftype;
			timer = timer || 400;
			var step = 100/(timer/40);
			obj.style.filter = 'Alpha(opacity=' + cur + ')';
			obj.style.opacity = cur / 100;
			cur = ftype == 'in' ? cur + step : cur - step ;
			obj.setAttribute('fadetimer', (function(){
				return setTimeout(function () {
					object.fade(obj, timer, ftype, cur, fn);
				}, 40);
				})());
			if(ftype == 'in' && cur >= 100 || ftype == 'out' && cur <= 0) {
				this.stopFade(obj);
				fn = fn || function(){};
				fn(obj);
			}
			return obj;
		},
		fadeIn : function (obj,timer,fn) {
			return this.fade(obj, timer, 'in', 0, fn);
		},
		fadeOut : function (obj,timer,fn) {
			return this.fade(obj, timer, 'out', 100, fn);
		},
		stopFade : function (obj) {
			if (!obj) {
				return false;
			}
			clearTimeout(obj.getAttribute('fadetimer'));
			obj.removeAttribute('fadetimer');
			return obj;
		}
	};

	var bil_animate = new bilicen_animate();

	//note 设置第 index 张图片为当前图片
	function bilicen_active (index) {
		if(index != this.index) {
			var timer = 300;
			bil_animate.stopFade(this.slideshows[this.index]).style.display = "none";
			bil_animate.fadeIn(this.slideshows[index], timer);

			if(this.controls && this.controls.length > 0) {
				if(typeof this.controls[this.index] !== 'undefined') {
					this.controls[this.index].className = '';
				}
				if(typeof this.controls[index] !== 'undefined') {
					this.controls[index].className = 'on';
				}
			}
			for(var i=0,L=this.slideother.length; i<L; i++) {
				this.slideother[i].childNodes[this.index].style.display = "none";
				this.slideother[i].childNodes[index].style.display = "block";
			}
			this.index = index;
		}
	}

	_attachEvent(window, 'load', function(){
		var count = 0;
		var timer = setInterval(function() {
			var noslideshow = typeof slideshow === 'undefined';
			if(count++ > 60 || noslideshow) {
				clearInterval(timer);
				return false;
			}
			if(!noslideshow) {
				for(var i in slideshow.entities) {
					if(slideshow.entities[i] instanceof slideshow) {
						var one = slideshow.entities[i];
						one.active = bilicen_active;
						one.run = function() {
									var index = this.index + 1 < this.length ? this.index + 1 : 0;
									if(!this.slidenum && !this.slidestep) {
										this.active(index);
									} else {
										this.activeByStep('down');
									}
									//note 2s 定时轮换
									var ss = this;
									this.timer = setTimeout(function(){
										ss.run();
									}, this.timestep);
								};
						if(one.controls) {
							for(i=0; i<one.controls.length; i++) {
								if(one.slidebarup == one.controls[i] || one.slidebardown == one.controls[i]) continue;
								_attachEvent(one.controls[i], one.barmevent, function(){bilicen_slidexactive();});
							}
						}
					}
				}
				clearInterval(timer)
			}
			return true;
		}, 500);
	});
})();