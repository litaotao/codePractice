(function(doc, win) {
  'use strict';
  $('.backToTop').click(function() {
    $('body').animate({
        scrollTop: 0
      },
      500);
  });
  $(win).on('scroll', function() {
    var scrolltop = $(doc).scrollTop();
    if (scrolltop >= 800) {
      $('.backToTop').removeClass('hide');
    } else {
      $('.backToTop').addClass('hide');
    }
  });
})(document, window);