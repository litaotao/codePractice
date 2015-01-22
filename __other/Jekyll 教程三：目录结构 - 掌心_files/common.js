/**
 * @desc:   公用js
 * @author: zhanxin.lin
 * @depend: jQuery, jQuery scrollTo
 */
$(document).ready(function() {
    /**
     *  scrollTo Top
     */
    var scrollTo = {
            nodeName: "J-backTop",
            scrollHeight: "100",
            linkBottom: "100px",
            linkRight: "1em",
            _scrollTop: function() {
            if(jQuery.scrollTo) {
                jQuery.scrollTo(0, 800, {queue:true});
            }
        },
        _scrollScreen: function() {
            var that = this, topLink = $('#' + that.nodeName);

            if(jQuery(document).scrollTop() <= that.scrollHeight) {
                topLink.hide();
                return true;
            }  else {
                topLink.fadeIn();
            }
        },
        _resizeWindow: function() {
            var that = this, topLink = $('#' + that.nodeName);
            if($(window).width() > 1024) {
                topLink.css({
                    'right' : '',
                    'left': '1000px',
                    'bottom': that.linkBottom
                });
            } else {
                topLink.css({
                    'left': '',
                    'right' : that.linkRight,
                    'bottom': that.linkBottom
                });
            }


        },
        run: function() {
            var that = this, topLink = $('<a id="' + that.nodeName + '" href="#" class="toTop">&uarr;</a>');
            topLink.appendTo($('body'));

            topLink.css({
                'display': 'none',
                'position': 'fixed',
                'left': '',
                'right': that.linkRight,
                'bottom': that.linkBottom
            });

            that._resizeWindow();

            if(jQuery.scrollTo) {
                topLink.click(function() {
                    that._scrollTop();
                    return false;
                });
            }
            jQuery(window).resize(function() {
                that._scrollScreen();
                that._resizeWindow();
            });
            jQuery(window).scroll(function() {
                that._scrollScreen();
            });
        }
    }
    scrollTo.run();


    YugenLogo.initialize( {
        framerate: 60,

        width: 380,
        height: 220,

        colorSpeedFactor: 0.4,
        morphSpeedFactor: 0.4,
        introSpeedFactor: 2,
        outroSpeedFactor: 2,

        morphStrengthFactor: 0.8,

        morphBaseSpeedFactor: 0.2,
        normalOffsetFactor: 1.5,

        maxShapeRotation: 0.2,

        wordOffsetX: 0,
        wordOffsetY: 0,

        wordScale: 1,

        foregroundScaleX: 0.42,
        foregroundScaleY: 0.21,
        backgroundScaleX: 0.36,
        backgroundScaleY: 0.21,

        shadowAlpha: 0.1,

        shapeQuality: 9,

        containerID: "logo-bg",
        logoCanvasID: "yugen-logo-canvas",

        colors:[
            [new YugenLogo.util.Color(240, 240, 240), new YugenLogo.util.Color(0, 0, 0)],
            [new YugenLogo.util.Color(0, 0, 0), new YugenLogo.util.Color(240, 240, 240)]
        ],

        inputs: [
            YugenLogo.input.move,
            YugenLogo.input.press
        ],

        fallbackImages: [
        ]
    });
});
