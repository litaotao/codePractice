(function( $, window, undefined ){
  var NewRelicBlog = {
    elements: {},

    _bindVendors: function() {},

    _bindEvents: function() {
      var self = this;

      var lastScroll = 0;
      if( !$("body").hasClass("active") ) {
        $(window).scroll( function() {
          var scrollY = $(window).scrollTop();
          if( scrollY > 76 ) {
            if( scrollY > lastScroll ) {
              // scrolling down
              self.elements.header.addClass("hide-it");
            } else if( (scrollY + 20) < lastScroll ) {
              // scrolling up
              self.elements.header.removeClass("hide-it");
            }
          } else if ( scrollY < 75 ) {
            self.elements.header.removeClass("hide-it");
          }
          lastScroll = scrollY;
        });
      }
      
      this.elements.smNavToggle.on( 'click', function(e) {
        e.preventDefault();
        $("body").toggleClass("active");
        // $('body').css({'overflow': 'hidden'});
      });

    },
    
    _getElements: function() {
      this.elements.header = $("#tl-nav");
      this.elements.smNavToggle = $("#sm-nav-toggle");
    },

    initialize: function() {
      this._getElements();
      this._bindVendors();
      this._bindEvents();
    }
  };


  // Send to global namespace
  window.NewRelicBlog = NewRelicBlog;

  // Blastoff
  $(function(){
    NewRelicBlog.initialize();
  });

})( jQuery, window, null );
