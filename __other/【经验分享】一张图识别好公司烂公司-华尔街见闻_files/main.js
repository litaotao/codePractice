//通用业务逻辑、全局事件、模板变化等，只依赖jQuery，不需要插件
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['jquery'], factory);
    } else {
        //手动引入 jquery
        factory(root.jQuery);
    }
})(this, function ($) {

    $(function(){
        //
        var $document = $(document);
        /**
         * 导航栏高亮
         */
        var fullPathUrl = location.href;
        $('[data-active-url]').each(function(){
            var $item = $(this);
            var reg = new RegExp($item.attr("data-active-url"));
            if(reg.test(fullPathUrl)) {
                $item.addClass("active");
                //跳出循环
                //return false;
            }
        });
        //搜索框
        var $searchForm = $('#header .search-form');
        $('#header').on('click', '[data-toggle=search-form]', function(e){
            $searchForm.toggleClass('active');
            if ($searchForm.hasClass('active')) {
                $searchForm.find('[name=q]').focus();
            }
        });

        //breaking-news
        $('[data-action=hide-breaking-news]').click(function(e){
            $('body').removeClass('show-breaking-news');
            return false;
        });

        //goto top 返回顶部
        $('[data-action=goto-top]').click(function(e){
            $('html, body').animate({
                scrollTop: 0
            }, 300);
            e.preventDefault();
        });

        /*
         自定义 modal 控制逻辑
         */
        // 打开 modal
        $document.on('click', '[data-action=show-custom-modal]', function(e){
            var $this = $(this);
            var $target = $($this.attr('data-target'));
            $target.addClass('active');
            e.preventDefault();
        });
        // 关闭 modal
        $document.on('click', '[data-action=hide-custom-modal]', function(e){
            var $this = $(this);
            var $target = $($this.attr('data-target'));
            $target.removeClass('active');
            e.preventDefault();
        });
        // 关闭 modal
        $document.on('keyup', '.custom-modal', function(e){
            switch(e.which) {
                case 27 :
                    $(this).removeClass('active');
                    break;
            }
        });
        // 关闭 modal
        $document.on('click', '.custom-modal', function(e){
            if (e.target === this) {
                $(this).removeClass('active');
            }
        });

    });
});

//图片延时加载
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['jquery', 'jquery.lazyload'], factory);
    } else {
        //手动引入 jquery jquery.lazyload
        factory(root.jQuery);
    }
})(this, function($){
    /*
     图片延时加载
     */
    $("img.lazy").lazyload({threshold : 400});
});

//Bootstrap JS启动
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['bootstrap'], factory);
    } else {
        //手动引入 bootstrap
    }
})(this, function(){
    //do no thing
});


//用户相关业务及事件
(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['usermanager','userlogin', 'jquery', 'jquery.parsley', 'jquery.parsley.remote'], factory);
    } else {
        //手动引入
        factory(root.UserManager, root.UserLogin, root.jQuery);
    }
})(this, function(UserManager, UserLogin, $){

    var loginUI = UserLogin.getInstance().getLoginUI();
    var usrManager = UserManager.getInstance();

    $(function(){
        //
        var $document = $(document);
        //
        var $userModal = $('#user-modal');

        // 关闭 用户 modal
        $userModal.on('click', '[data-action=close-custom-modal]', function(e){
            loginUI.hideMessage();
            e.preventDefault();
        });
        // 关闭 用户 modal
        $userModal.on('keyup', function(e){
            switch(e.which) {
                case 27 :
                    loginUI.hideMessage();
                    break;
            }
        });
        // 关闭 用户 modal
        $userModal.on('click', function(e){
            if (e.target === this) {
                loginUI.hideMessage();
            }
        });
        // 关闭 用户 modal
        $userModal.on('click', '.carousel-inner > .item', function(e){
            if (e.target === this) {
                $userModal.removeClass('active');
                loginUI.hideMessage();
            }
        });

        //组织modal表单 输入框 中 按下 左/右键 事件冒泡 触发 bootstrap carousel定义的滑动事件
        $userModal.on('keydown', 'input', function(e){
            e.stopPropagation();
        });

        //form validation
        $('form[data-validate]').parsley({
            successClass: "has-success",
            errorClass: "has-error",
            classHandler: function(el) {
                return el.$element.closest(".form-group");
            },
            errorsWrapper: "<span class='help-block' style='margin-bottom: 0;'></span>",
            errorTemplate: "<span></span>"
        });

        $('form[data-validate]').on('focus change blur keyup', '.password-previewer', function(){
            var passwordInput = $(this);
            var helper = passwordInput.closest('.form-group').find('.form-control-feedback');
            if(passwordInput.val() !== '') {
                helper.removeClass('fa-lock').addClass('fa-eye').css('cursor', 'pointer');
            } else {
                helper.removeClass('fa-eye fa-eye-slash').addClass('fa-lock').css('cursor', 'default');
            }

            var inited = passwordInput.data('password-preview-inited');
            if(inited) {
                return;
            }
            passwordInput.closest('.form-group').on('click', '.form-control-feedback', function(){
                var icon = $(this);
                if(icon.hasClass('fa-eye')) {
                    passwordInput.attr('type', 'text');
                    icon.toggleClass('fa-eye fa-eye-slash');
                } else if(icon.hasClass('fa-eye-slash')) {
                    passwordInput.attr('type', 'password');
                    icon.toggleClass('fa-eye fa-eye-slash');
                }
            });
            passwordInput.data('password-preview-inited', true);
        });
        //消息提醒数字 
        usrManager.onceLogin(function(user) {
            var btn = $("#navbar-right .button-notice");
            //var postId = btn.attr("data-post-id");
            var url = btn.attr("data-url");
            $.ajax({
                url : url
            }).then(function(response) {
                response = parseInt(response);
                if(response>0){
                    btn.html('<div style="position:relative;"><div class="bubble fade top in danger" style="top: -39px; left: 16px; display: block;"><div class="arrow"></div>' + response + '</div></div>');
                    btn.show();
                }

                });
        });

        // 消息提醒
        usrManager.onceLogin(function(user) {
            var btn = $("[data-toggle=collect]")
            var url = $("[data-toggle=collect]").attr("data-url");
            $.ajax({
                    url : url
                }).then(function(response) {
                    btn.attr("data-active", "true");
                }).fail(function(error) {
                    btn.attr("data-active", "false");
                });
        });

        $document.on("click", "body[data-logon=false] [data-toggle=collect]", function(e) {
            loginUI.showModal();
            loginUI.showMessage('', $(this).attr("data-message"), $(this).attr("data-message-type"));
            return false;
        });

        $document.on("click", "body[data-logon=true] [data-active=false][data-toggle=collect]", function(){
            var btn = $(this);
            var postId = btn.attr("data-post-id");
            var url = btn.attr("data-url");
            $.ajax({
                url : url,
                method : 'PUT'
            }).then(function(response) {
                    //btn.attr("data-active", "true");
                    $('[data-toggle=collect][data-post-id=' + postId + ']').attr("data-active", "true");
                }).fail(function(error) {
                });
            return false;
        });

        $document.on("click", "body[data-logon=true] [data-active=true][data-toggle=collect]", function(){
            var btn = $(this);
            var postId = btn.attr("data-post-id");
            var url = btn.attr("data-url");
            $.ajax({
                url : url,
                method : 'DELETE'
            }).then(function(response) {
                    //btn.attr("data-active", "false");
                    $('[data-toggle=collect][data-post-id=' + postId + ']').attr("data-active", "false");
                }).fail(function(error) {
                });
            return false;
        });

        // 点赞
        usrManager.onceLogin(function(user) {
            $("[data-toggle=endorse]").each(function(){
                var btn = $(this);
                //var postId = btn.attr("data-post-id");
                var url = btn.attr("data-url");
                $.ajax({
                    url : url
                }).then(function(response) {
                    btn.attr("data-active", "true");
                }).fail(function(error) {
                    btn.attr("data-active", "false");
                });
            });
        });

        $document.on("click", "body[data-logon=false] [data-toggle=endorse]", function(e) {
            loginUI.showModal();
            loginUI.showMessage('', $(this).attr("data-message"), $(this).attr("data-message-type"));
            return false;
        });

//        var postIdArr = {};
//        $("[data-toggle=endorse]").each(function(){
//            var btn = $(this);
//            var postId = btn.attr("data-post-id");
//            if(!postIdArr[postId]){
//                postIdArr[postId] = true;
////                var url = btn.attr("data-url");
//                var url = '/node/'+postId+'/votes'
//                $.ajax({
//                    url : url,
//                    method : 'GET'
//                }).then(function(response) {
//                    //btn.attr("data-active", "false");
//                    var str = '';
//                    if(response.upVote > 0){
//                        str = ' '+response.upVote;
//                    }
//
//                    $('[data-toggle=endorse][data-post-id=' + postId + '] span').html(str);
//                }).fail(function(error) {
//                });
//            }
//        });

        $document.on("click", "body[data-logon=true] [data-active=false][data-toggle=endorse]", function(){
            var btn = $(this);
            var postId = btn.attr("data-post-id");
            var url = btn.attr("data-url");
            $.ajax({
                url : url,
                method : 'PUT'
            }).then(function(response) {
                //btn.attr("data-active", "true");
                $('[data-toggle=endorse][data-post-id=' + postId + ']').attr("data-active", "true");
                $('[data-toggle=endorse][data-post-id=' + postId + '] span').html(' '+response.upVote);
            }).fail(function(error) {
            });
            return false;
        });

        $document.on("click", "body[data-logon=true] [data-active=true][data-toggle=endorse]", function(){
            var btn = $(this);
            var postId = btn.attr("data-post-id");
            var url = btn.attr("data-url");
            $.ajax({
                url : url,
                method : 'DELETE'
            }).then(function(response) {
                //btn.attr("data-active", "false");
                $('[data-toggle=endorse][data-post-id=' + postId + ']').attr("data-active", "false");
                var str = '';
                if(response.upVote > 0){
                    str = ' '+response.upVote;
                }

                $('[data-toggle=endorse][data-post-id=' + postId + '] span').html(str);
            }).fail(function(error) {
            });
            return false;
        });


        //用户注册
        $document.on('click', '[data-action=register]', function(e){
            loginUI.showModal('register');
            e.preventDefault();
        });

    });
});


//用户关注的资产展示
document.getElementById("page-user-portfolios") && (function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['jquery'], factory);
    } else {
        //手动引入 jquery jquery.lazyload
        factory(root.jQuery);
    }
})(this, function($){
    
	$(function(){
		var $quotesWrapper = $(".focus-portfolios");
		if($quotesWrapper.length <= 0)return;

		var quoteUrl = $quotesWrapper.attr("data-quote-url") || "http://api.markets.wallstreetcn.com/v1/quotes.json",
			priceUrl = $quotesWrapper.attr("data-price-url") || "http://api.markets.wallstreetcn.com/v1/price.json?symbol=",
			$assets =  $quotesWrapper.find(".quotecard"),allSymbols = "",assetList;

		if($assets.length <= 0)return;

		$assets.each(function(){
		   allSymbols += $(this).attr("data-comet") + "_";
		});

		$assets.mouseover(function(){
			$(this).find(".action-del").css("display","inline-block");
		}).mouseout(function(){
			$(this).find(".action-del").css("display","none");
		});

		$assets.find("[data-action-delete]").click(function(e){
			e.preventDefault();
			var target = $(e.target);
			var parent  = target.parents('li.quotecard');
			parent.fadeOut();
			var assetId = parent.data('id');
			if(assetId > 0) {
				$.ajax({url:'/mine/asset/' + assetId, method:'DELETE'});
			}
		});

		function initData() {
			$.ajax({
				url: quoteUrl,
				dataType : 'jsonp',
				success: function(result, request) {

					assetList = result['results'];
					updateData();

				},
				failure: function() {
					//再调用一次，直到成功为止
					initData();
				}

			});
		}

		function updateData() {

			var baseData = assetList;

			if (baseData == null) {
				console.log('function->updateData: the markets baseData is null');
				return;
			}

			var results = [];

			$.ajax({
				url: priceUrl + allSymbols,
				dataType : 'jsonp',
				success: function(result, request) {

					var data = result['results'];

					for (var i=0; i<baseData.length; i++) {

						for (var j=0; j<data.length; j++) {

							if (baseData[i]['symbol'] === data[j]['symbol']) {
								var base = baseData[i];
								var item = data[j];

								item.title = base.title;
								//prevClose 需要转换
								item.prevClose = parseFloat(base.prevClose);
								item.prevCloseTime = base.prevCloseTime;
								//open 需要转换
								item.open = parseFloat(base.open);
								item.openTime = base.openTime;
								item.type = base.type;

								var fixLength = base['numberFormat'].length - 2;
								item.diffPercent = ((item['price'] - item.prevClose) * 100 / item.prevClose).toFixed(2) + '%';
								item.diff = (item['price'] - item.prevClose).toFixed(fixLength);

								if (item['price'] > item.prevClose) {
									item.trend = 'up';
									item.diffPercent = '+' + item.diffPercent;
									item.diff = '+' + item.diff;
								} else if (item['price'] < item.prevClose) {
									item.trend = 'down';
								} else {
									item.trend = '';
								}

								item.price = item.price.toFixed(fixLength);
								//
								results.push(item);
								//结束当前循环
								break;
							}
						}
					}
					refreshData(results);
				}
			});
		}

		function refreshData(results){
			for(var i=0;i<results.length;i++){
				var symbol = results[i].symbol,$quoteCard = $(".quotecard[data-comet='" + symbol + "']"),
					$priceIcon = $quoteCard.find(".price-icon"),$priceCurrent = $quoteCard.find(".price-current"),
					$priceDiff = $quoteCard.find(".price-diff"),$priceDiffPercent = $quoteCard.find(".price-diff-percent");

				$quoteCard.removeClass("up down");
				$priceIcon.removeClass("fa-arrow-up fa-arrow-down");

				$quoteCard.addClass(results[i].trend);
				$priceIcon.addClass("fa-arrow-" + results[i].trend);
				$priceCurrent.html(results[i].price);
				$priceDiff.html(results[i].diff);
				$priceDiffPercent.html(results[i].diffPercent);
			}
		}

		initData();
		setInterval(updateData, 1000*5);
	});
});

//专栏频道
document.getElementById("page-column") && (function(root, factory){
    if (typeof define === 'function' && define.amd) {
        // AMD. require js.
        require(['jquery', 'jquery.jcarousel','jquery.jcarousel-autoscroll'], factory);
    } else {
        //手动引入 jquery jquery.lazyload
        factory(root.jQuery);
    }
})(this, function($){

	$(function(){
		if($(".page-column").length <= 0)return;

		$(".page-column .news").mouseover(function(){
			$(this).addClass("news-hover");
		}).mouseout(function(){
				$(this).removeClass("news-hover");
			});

		var jcarousel = $('.jcarousel');

		jcarousel
			.on('jcarousel:reload jcarousel:create', function () {
				jcarousel.jcarousel('items').width(jcarousel.innerWidth());
			}).on('jcarousel:targetin', 'li', function(event, carousel) {
				var id = $(event.target).data('recommand-target');
				$('[data-recommand-id]').hide();
				$('[data-recommand-id=' + id + ']').show();
				//console.log(title,summary,author,authorId,comment);
			})
			.jcarousel({
				wrap: 'circular'
			})
			.jcarouselAutoscroll({
				interval: 5000,
				target: '+=1',
				autostart: true
			});


		$('.jcarousel-control-prev')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

		$('.jcarousel-control-next')
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('click', function(e) {
				e.preventDefault();
			})
			.jcarouselControl({
				target: '+=1'
			});

		$('.jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			})
			.on('click', function(e) {
				e.preventDefault();
			})
			.jcarouselPagination({
				item: function(page) {
					return '<a href="#' + page + '">' + page + '</a>';
				}
			});
	});
});
