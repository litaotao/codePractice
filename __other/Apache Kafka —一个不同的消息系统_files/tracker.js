var Tracker = {
	trackVcrImpressions : true,
	trackForgotPasswordSteps : true,
	trackContentBookmarking : true,
	trackAdActions : true,

	doTrackVcrImpressions : function() {
        var device = CookieManager.readCookie("device");

		if(!Tracker.trackVcrImpressions) {
			return;
		}
		$(".f_vcrbottom").each(
			function doTrack(index) {
				var vcr = jQuery.parseJSON($(this).attr("jsh"));
				_gaq.push(["_trackEvent", (device !== undefined && device == 'mobile') ? "VCRImpressionMobile-"+vcr.id : "VCRImpression-"+vcr.id, $(location).attr("href"), "bottom"]);
			}
		);
		$(".f_vcrembed").each(
			function doTrack(index) {
				var vcr = jQuery.parseJSON($(this).attr("jsh"));
				_gaq.push(["_trackEvent", (device !== undefined && device == 'mobile') ? "VCRImpressionMobile-"+vcr.id : "VCRImpression-"+vcr.id, $(location).attr("href"), "embedded"]);
			}
		);
	},
	
	doTrackContentBookmark : function(action, label) {		
		if(!Tracker.trackContentBookmarking) {
			return;
		}		
		_gaq.push(['_trackEvent', 'Bookmarks', action, label]);
		
	},
	
	doTrackForgotPasswordSteps : function(step) {
		if(!Tracker.trackForgotPasswordSteps) {
			return;
		}
		_gaq.push(["_trackEvent", "Forgot password", step, ""]);
	},
	
	doTrackAdAction : function(category, label, action) {		
		if(!Tracker.trackAdActions) {
			return;
		}
		_gaq.push(['_trackEvent', 'ADACTION~' + category , action, label]);
		
	},
	
	safeExec: function(f) {
		try {
			f();
		}
		catch(ex) {
			if(window.console && window.console.log) {
				window.console.log(ex);
			}
		}
	}
};