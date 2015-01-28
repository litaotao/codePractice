window.addEvent('domready', function(){
  var doc = document.body.innerHTML;
  $$('input.overtext').each(function(el){
    new OverText(el);
  });
  if (doc.test('subscribe-form')) {
    $each($$('.subscribe-form'), function(elem){
      var inpt = elem.getElement('input.txt');
      if(!inpt) return;
      inpt.addEvent('click', function(){
        window.open('http://info.cloudera.com/NewsletterSubscribe.html', '_blank');
      });
    });
  }
  if (doc.test('carousel')) {
  var carousel = null;
  var delay = 8000;
  var timer = null;
  var paused = false;
    $$('div.carousel').each(function(div){
      carousel = new SimpleSlideShow.Carousel(div.getElement('.carousel-holder ul'), {
        slides: div.getElements('div.carousel-holder li'),
        nextLink: div.getElement('a.arrow-next'),
        prevLink: div.getElement('a.arrow'),
        onSlideDisplay: function() {
          if (!paused) {
            clearTimeout(timer);
            timer = setTimeout(function() {
              carousel.forward();
            }, delay);
          }
        },
        crossFadeOptions: {
          transition: 'quint:in:out',
          duration: 700
        }
      });
    });
    clearTimeout(timer);
    timer = setTimeout(function() {
      carousel.forward();
    }, delay);
    $$('a.arrow-next, a.arrow').addEvent('click', function() {
    clearTimeout(timer);
      paused = true;
  });
  }
  if (doc.test('show-gallery')) {
    var photos;
    $$('.show-gallery').addEvent('click', function(){
      if (photos) {
        photos.setStyle('display', 'block').position({allowNegative:false});
        return;
      }
      new Request({
        url: '/wp-content/themes/cloudera/assets/photos/gallery.html',
        onComplete: function(resp){
          var div = new Element('div', {html: resp}).inject(document.body);
          photos = $$('.office-photos')[0];
          photos.setStyle('display', 'block').inject(document.body, 'top').position({ allowNegative: false });
          photos.getElement('.btn-close').addEvent('click', function(){
            photos.setStyle('display', 'none');
          });
          new SimpleSlideShow({
            slides: photos.getElements('ul.visual li'),
            nextLink: photos.getElement('a.gallery-next'),
            prevLink: photos.getElement('a.gallery-prev'),
            currentIndexContainer: photos.getElement('.gallery-count'),
            maxContainer: photos.getElement('.gallery-max'),
            onSlideDisplay: function(i){
              photos.getElement('div.visual-txt p').set('html', photos.getElements('ul.visual li img')[i].get('alt'));
            }
          });
        }
      }).send();
    });
  }
  if (doc.test('screenshot-carousel')) {
    $$('.screenshot-carousel').each(function(carousel) {
      var thumbs = carousel.getElement('ul.thumbnails');
      var lis = thumbs.getElements('li');
      thumbs.addEvent('click:relay(li)', function(e, li){
        e.preventDefault();
        lis.removeClass('active');
        li.addClass('active');
        var link = li.getElement('a');
        if (link && link.get('href') && link.get('href').test(/jpg$/)) {
          carousel.getElement('.screenshot-screencast').setStyle('display', 'none');
          carousel.getElement('.screenshot-inner').setStyle('display','block').empty().adopt(new Element('img', {src: link.get('href')}));
        } else {
          carousel.getElement('.screenshot-inner').setStyle('display', 'none');
          carousel.getElement('.screenshot-screencast').setStyle('display', 'block');
        }
      });
    });
  }
  if (doc.test('testimonials')) {
    $$('.testimonials').each(function(testimonial){
      var imgs = testimonial.getElements('.quote_icons img');
      var quotes = testimonial.getElements('li div.quotes');
      var vis;
      var show = function(index){
        quotes.setStyle('display', 'none');
        quotes[index].setStyle('display', 'block');
        divot.position({
          relativeTo: imgs[index],
          offset: {
            x: 0,
            y: -60
          }
        });
        vis = index;
      };
      var divot = new Element('img', {
        src: '/assets/images/bg-quote-divot.gif',
        styles: {
          position: 'absolute',
          width: 40,
          height: 17,
          display: 'none'
        },
        events: {
          load: function(){
            this.setStyle('display', 'block');
            show(0);
          }
        }
      }).inject(testimonial);
      var timer = (function(){
        vis ++;
        if (vis >= imgs.length) vis = 0;
        show(vis);
      }).periodical(6000);
      testimonial.addEvent('mouseover:relay(img)', function(e, img){
        if (img == divot) return;
        var index = imgs.indexOf(img);
        show(index);
        $clear(timer);
      });
      
    });
  }
  if (doc.test('hadoop-posts')) {
    var dims = $$('.hadoop-posts')[0].getSize();
    $$('.grid_2 .hadoop-post object, .grid_2 .hadoop-post embed').each(function(elem){
      var size = elem.getSize();
      var w = (elem.get('width') || size.x).toInt();
      var h = (elem.get('height') || size.y).toInt();
      if(w <= dims.x) return;
      elem.set('width', dims.x);
      elem.set('height', h * dims.x / w);
    });
  }
  if(doc.test('abstracted-table')) {
    var tooltip = $$('.tooltip')[0];
    $$('td.abstract').each(function(elem){
      var lnk = elem.getElements('a')[0];
      var dv = elem.getElements('div')[0];
      elem.addEvent('mouseover', function(){
        tooltip.set('html', dv.get('html')).position({
          relativeTo: elem,
          offset: {
            x: -330
          }
        }).setStyle('display', 'block');
        elem.setStyle('background-color', '#F0F0F0');
        if(lnk) lnk.setStyle('color', '#000');
      }).addEvent('mouseout', function(){
        tooltip.setStyle('display', 'none').set('html', '');
        elem.setStyle('background-color', '#FFF');
        if(lnk) lnk.setStyle('color', '#017EC5');
      });
    });
  }
  if(doc.test('training-filter')) {
    function loadTraining(){
      $('training-body').addClass('loading');
      $('training-body').set('html', '');

      var req = new Request({
        url: '/ajax_training_events.php',
        evalScripts: false,
        data: { filter: $('training-filter').value },
        onComplete: function(text){
          $('training-body').removeClass('loading');
          $('training-body').set('html', text);
        }
      }).send();
    }

    $('training-filter').addEvent('change', loadTraining);
    loadTraining();
  }
  
  $$('object, embed').each(function(elem){
    elem.setAttribute('wmode', 'transparent');
  });
  
  $$('form').each(function(elem){
    var btn = elem.getElement('input[type="button"]') || elem.getElement('a.submit');
    if(!btn) return;
    var clicker = function(){
      elem.submit();
    }
    btn.addEvent('click', clicker);
  });


	
});

jQuery(function($) {

	$(".cb").colorbox({
		iframe:true,
		fastIframe: false,
		innerWidth:520,
		innerHeight:520,
		opacity: 0.75
	 });
	
	$('#cboxContent').bind('cbox_complete', function() {
		var page = $('iframe', this).contents().find('.sl-page');
		$(this).colorbox.resize( {innerWidth:page.width(), innerHeight:page.height()});
	});
	
	// full window width homepage slider
	
	var homeSlideCount = 1; // TODO: clean this up
	$('.homeSlideHolder').children('li').each(function(){
		if (homeSlideCount == 1) {
			$('#homeSliderControls').append('<a href="#" class="on">'+homeSlideCount+'</a>');
		} else {
			$('#homeSliderControls').append('<a href="#">'+homeSlideCount+'</a>');
		}
		homeSlideCount++;
	});
	homeSlideCount -= 1;
	
	var duplicateFirstSlide = $('.homeSlideHolder').children('li').first().clone();
	$('.homeSlideHolder').append(duplicateFirstSlide);
	
	var id = 0;
	var nextSlidePosition = 0;
	var playSlides = true;
	var currentSlideID = 1;
	
	$('#homeSliderControls a').click(function(){
		id = $(this).text();
		playSlides = false;
		if($(this).hasClass('on')) return false;
		$('#homeSliderControls a').removeClass('on');
		$(this).addClass('on');
		slideToSlide(id);
		return false;
	});
	
  /*
	function slideToSlide( id ) {
		var nth = 0;
		var slideContent;
		$('.homeSlideHolder').children('li').each(function(){
			nth++
			if (nth == id) {
				nextSlidePosition = -$(this).position().left;				
			}
			if (nth == currentSlideID) {
				slideContent = $(this).contents().find('.homeSlideContent');
			}
		});	
		slideContent.animate({
			left: '-200px',
			opacity: '0'
		}, 500, function() {
			$('.homeSlideHolder').animate({
				left: nextSlidePosition
			}, 1000, function() {
				slideContent.css({left: '0', opacity: '1'})
				currentSlideID = id;
				if (id == homeSlideCount + 1) {
					$('.homeSlideHolder').css('left', '0');
					currentSlideID = 1;
				}
				clearTimeout(nextSlide);
				nextSlide = setTimeout(slidePlay, slideDuration);
			});
		});
	}

	// autoplay slideshow
	var slidenum = 2;
	var slideDuration = 5000;
	var nextSlide = setInterval(slidePlay, slideDuration);
	function slidePlay() {
		if(playSlides) {
			id = slidenum;
			slideToSlide(slidenum);
			if(slidenum == homeSlideCount + 1) {
				slidenum = 1;
			}
			$('#homeSliderControls').children().each(function(){
				if( $(this).text() == slidenum ) {
					$('#homeSliderControls a').removeClass('on');
					$(this).addClass('on');
				}
			});
			slidenum++;
		} else {
			return false;
		}
	}
*/
	// size the window, don't listen
	
	var windowWidth = $(window).width();
	if( windowWidth > 940) {
		$('.homeSlide').width( windowWidth );
		$('body').css('overflow-x', 'hidden');
	} else {
		$('.homeSlide').width( '960px' );
		$('body').css('overflow-x', 'visible');
	}
	
	$(window).resize(function(){
		$('.homeSlideHolder').css('left', function(){
			var nth = 0;
			$('.homeSlideHolder').children('li').each(function(){
				nth++
				if (nth == id) {
					nextSlidePosition = -$(this).position().left;
				}
			});
			return nextSlidePosition;
		});
		windowWidth = $(window).width();
		if( windowWidth > 940) {
			$('.homeSlide').width( windowWidth );
			$('body').css('overflow-x', 'hidden');
		} else {
			$('.homeSlide').width( '960px' );
			$('body').css('overflow-x', 'visible');
		}
	});

  var $menus = $('#site-head').find('.super').find('ul.menu-items');
  var $featuredMenu = $('#site-head').find('.super').find('ul.featured-items');

  $menus.add($featuredMenu).each(function(i, menu) {
      $(menu).children('li').equalHeight();
  });

	
});

function download(link){
  try{
    var pageTracker = _gat._getTracker("UA-2275969-4");
    pageTracker._trackEvent('Download', link.href);
    setTimeout('document.location = "' + link.href + '"', 100)
  } catch(err) {}
  return false;
}

(function($) {
    /**
    * Usage: $collection.equalHeight();
    */
    $.fn.equalHeight = function() {
        var height = 0;
        this
          .each(function(i, el) {
              var ht = $(el).outerHeight(false);
              height = ( ht > height ) ? ht : height;
          });
       // console.log(height);
       return this.css('height', height);
    };

})(jQuery);
