/** JS Logics */
(function($){
	
	/** Drop Downs */
	function contangoMenu() {
		
		/** Superfish Menu */
		$( '.menu ul' ).supersubs({			
			minWidth: 12,
			maxWidth: 25,
			extraWidth: 0			
		}).superfish({		
			delay: 1200, 
			autoArrows: false,
			dropShadows: false		
		});
		
		/** Last Child */
		$( '.menu ul.sub-menu li:last-child a' ).css( 'border-bottom', 'none' );
	
	}
	
	/** jQuery Document Ready */
	$(document).ready(function(){
		contangoMenu();
	});
	
	/** jQuery Windows Load */
	$(window).load(function(){
	});

})(jQuery);