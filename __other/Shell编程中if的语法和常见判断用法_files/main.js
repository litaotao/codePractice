/*  TABLE OF CONTENT
    1. Common function
    2. Initialing
*/
/*================================================================*/
/*  1. Common function
/*================================================================*/

var sfApp={
    events: function(){
    	// Hiding and Revealing .widgets_hide_seek_contents Contents for Responsive Layout
		jQuery('.widgets-hider-seeker a').click(function(e){
			e.preventDefault();
			var icon = jQuery(this).children('i');
			if(icon.hasClass('icon-down')){
				jQuery('.widgets-hide-seek-contents').slideDown('slow', function(){
					icon.removeClass('icon-down').addClass('icon-up');
				});
			}else{
				jQuery('.widgets-hide-seek-contents').slideUp('slow', function(){
					icon.removeClass('icon-up').addClass('icon-down');
				});
			}
		});
        //back to top
        jQuery('.backtotop').click(function(){
            jQuery('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });
        $(".menu-item-bottom").hide();
    
        // fade in #back-top
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('.menu-item-bottom').fadeIn();
                } else {
                    $('.menu-item-bottom').fadeOut();
                }
            });
        });
        
        //innerbar stiky
        jQuery("#mainbar").hcSticky({
            wrapperClassName: 'leftbar-sticky clearfix',
            top: 0
        });
        //lazyload
        jQuery("img.lazy").show().lazyload({effect: "fadeIn"});

        // tabs
        jQuery('ul.tabs').delegate('li:not(.current)', 'click', function() {
            jQuery(this).addClass('current').siblings().removeClass('current').parents('div.content').find('div.box').eq(jQuery(this).index()).fadeIn(150).siblings('div.box').hide();
        })
        // toggle
        jQuery(".toggle span").click(function(){
            jQuery(this).toggleClass("active");
            jQuery(this).next("div").stop('true','true').slideToggle("slow");
        });
        //popover
        $('.mainbar-wechat').popover({
            trigger: 'hover',
            html: true
        });
        //owl-carousel
        $(".owl-carousel").owlCarousel({
 
            // Most important owl features
            singleItem : true,
            
            // Navigation
            navigation : true,
            navigationText : ["<i class='icon-left-circle'></i>","<i class='icon-right-circle'></i>"],
            //Pagination
            pagination : false,
            paginationNumbers: false,
            
        });
        /* sidebar scroll !ie6 */
        if( $('.widgets').length ){
            var rollbox = $('#innerbar .widgets .innerwidget'), rolllen = rollbox.length;
            if( rolllen && 0<_wortheme.roll[0]<=rolllen && 0<_wortheme.roll[1]<=rolllen ){
                $(window).scroll(function(){
                    var roll = document.documentElement.scrollTop+document.body.scrollTop;
                    if( roll>rollbox.eq(rolllen-1).offset().top+rollbox.eq(rolllen-1).height() ){
                        if( $('.widgetRoller').length==0 ){
                            rollbox.parent().append( '<div class="widgetRoller"></div>' );
                            rollbox.eq(_wortheme.roll[0]-1).clone().appendTo('.widgetRoller');
                            if( _wortheme.roll[0]!==_wortheme.roll[1] )
                                rollbox.eq(_wortheme.roll[1]-1).clone().appendTo('.widgetRoller')
                            var toper = 0;
                            var widther = rollbox.width;
                            if($('body').attr('id')=='hasfixed') toper = 69;
                            $('.widgetRoller').css({position:'fixed',top:toper,zIndex:0,width:widther});
                        }else{
                            $('.widgetRoller').fadeIn(300);
                        }
                    }else{
                        $('.widgetRoller').hide();
                    }
                })
            }
    
            $(window).scroll(function(){
                var scroller = $('.rollto');
                document.documentElement.scrollTop+document.body.scrollTop>200?scroller.fadeIn():scroller.fadeOut();
            })
        }
        // Show Pingbacks

        $('a.show-pingbacks').on('click', function(e){
            e.preventDefault();
            var $this = $(this);
    
            $this.toggleClass('pingbacks-visible').siblings('.pingbacks-trackbacks').slideToggle();
            if($this.hasClass('pingbacks-visible')){
                $this.text('('+$this.data('text-hide')+')');
            } else {
                $this.text('('+$this.data('text-show')+')');
            }
        });

        
    },
    responsiveNav:function(){
		$('ul.sf-menu').superfish({
            delay:       200,                            // one second delay on mouseout
            animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
            speed:       'fast',                          // faster animation speed
            autoArrows:  false                            // disable generation of arrow mark-up
        });
		$('html').addClass('js');	
		$(".sf-menu").tinyNav({
  			active: 'current-menu-item', // String: Set the "active" class
  			//header: 'Navigation',  String: Specify text for "header" and show header instead of the active item
  			indent: '- ', // String: Specify text for indenting sub-items
  			label: '' // String: Sets the <label> text for the <select> (if not set, no label will be added)
		});
    },
    loveRating:function(){
    // Love Rating

    $('body').on('click', 'a.heart-love', function(e){
        e.preventDefault();
    });

    $('body').on('click', 'a.heart-love.unloved', function(e){
        e.preventDefault();
        var $this = $(this);
        var postID = $this.parents('.post').data('id');

        var postData = {
            'action': 'lp_love_post',
            'security': lp_love_post.nonce,
            'post_id': postID,
        };

        $this.attr('title', '');
        $this.removeClass('unloved');
        $this.addClass('loved fade-out-heart');

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: lp_love_post.ajaxurl,
            data: postData,
            success: function(data){
                if(data.success == true){
                    $this.html('<i class="icon-heart"></i><span>'+data.total_loves+'</span>').attr('title', data.new_title).addClass('fade-in-heart');
                    setTimeout(function(){ $this.removeClass('fade-in-heart fade-out-heart'); }, 500);

                    // Update the user widget

                    if($('.empty-love-post-description').length > 0){
                        $('.empty-love-post-description').fadeOut(400, function(){
                            $(this).replaceWith('<ul></ul>');
                            $('.lp-love-post-user ul').prepend(data.new_link);
                            $('.lp-love-post-user ul li:first').fadeIn(400);
                        });
                    } else {
                        $('.lp-love-post-user ul').prepend(data.new_link);
                        $('.lp-love-post-user ul li:first').fadeIn(400);                        
                    }
                    
                }
            }
        });
        
    });
    },
    // Internet Explorer Version Checker
    ie: function(){
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;
    },
    init: function () {
        sfApp.events();
        sfApp.responsiveNav();
        sfApp.loveRating();
    }
};

/*================================================================*/
/*  2. Initialing
/*================================================================*/
$(document).ready(function() {
    "use strict";
    sfApp.init(); 
});

/*================================================================*/
/*  REFRESH IF WINDOW IS OVER 500 PX WIDE - works alone -
    This theme works w/o this, but I don't recommend removing it.
/*
/*================================================================*/
// function refresh() {
//     "use strict";
//     var isSupportTouch = "ontouchend" in document ? true : false;
//     if($(window).width()>=500 && !isSupportTouch){
//         location.reload(true);
//     }
    
// }
// var tOut;
// $(window).resize(function () {
//     "use strict";
//     clearTimeout(tOut);
//     tOut = setTimeout(refresh, 100);
// });

