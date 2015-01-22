(function (ss) {
  ss.setup_instruments_interaction = function () {
    var s;

    window.fbAsyncInit = function () {
      FB.init({
        appId: slideshare_object.facebook_app_id,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        oauth: true, // to enable OAuth 2.0
        channelUrl: slideshare_object.relative_static_origin_server + 'channel.html'
      });
      FB.getLoginStatus(function (response) {
        if (response.status === 'unknown') {
          // user is logged out from facebook
          slideshare_object.fb_logged_out = true;
        }
      }, true);
      if (FB.Event && FB.Event.subscribe) {
        FB.Event.subscribe('edge.create', function (targetUrl) {
          _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
          _gaq.push(['_trackEvent', 'bigfoot_slideview', 'viralsharefacebook']);
        });
        if (!ss.user.loggedin) {
          FB.Event.subscribe('auth.statusChange', ss.onFBStatusChange);
        }
      }

      // Check for method definition
      if (typeof ss.pushPendingFBactivities === 'function'){
        ss.pushPendingFBactivities();
      }
    };


    window.plusone_success = function (obj) {
      _gaq.push(['_trackEvent', 'bigfoot_slideview', 'viralshareGooglePlusOne']);
    };

    window.linkedInShareSuccess = function () {
      _gaq.push(['_trackEvent', 'bigfoot_slideview', 'viralshareLinkedIn']);
    };

    $.fn.extend({
      // click and stop event propagation or browser defaults
      evt_track: function (category, action, optional_label, optional_value, tracker) {
        return this.click(function (event) {
          window._gaq.push(['_trackEvent', category, action, optional_label, optional_value]);
          return true;
        });
      },
      evt_trackAjaxOkay: function (category, action, optional_label, optional_value, tracker) {
        return this.bind('ajaxOkay', function () {
          window._gaq.push(['_trackEvent', category, action, optional_label, optional_value]);
          return true;
        });
      }
    });

    if (slideshare_object.is_free_author) {
      window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'free_author_page_load']);
      $('.j-full-analytics').evt_track('bigfoot_slideview', 'free_author_analytics_click');
    }
    $("#linkCollectLeads").evt_track("bigfoot_slideview", "clickLinkCollectLeads",
      "Slideshow:" + ss.slideshow.id +
      ", User:" + ss.slideshow.user_name);
    $('.j-download', ss.svTools).evt_track('bigfoot_slideview', 'downloadclick>' +
      (ss.user.loggedin ? "loggedin" : "loggedout"));
    $('.j-action-addfav', ss.svTools).evt_track('bigfoot_slideview', 'favoriteexpand');
    $('.action-twitter').evt_track('bigfoot_slideview', 'twitterthis');
    $('.action-facebook').evt_track('bigfoot_slideview', 'shareonfacebook');
    $('.action-moretab').evt_track('bigfoot_slideview', 'onmore');

    var $relatedTabs = $('.j-related-more-tab');
    $relatedTabs.find('.j-related-slideshows').evt_track('bigfoot_slideview',
      'relatedslideshows_tab');
    $relatedTabs.find('.j-more-slideshows').evt_track('bigfoot_slideview',
      'morebyuser_tab');
    $('.j-featured-category a').evt_track('bigfoot_slideview', 'featured_category_clicked');
    // Register author panel events
    var authorPanel = $('section').find('.j-author-panel');
    if(authorPanel.size() > 0){
      window._gaq.push(['_trackEvent', 'author-panel', 'pageload']);
      authorPanel.on('click', 'li', function(){
        var option = $(this).index();
        var action = 'NONE';
        switch(option){
          case 0:
            action = 'info';
            break;
          case 1:
            action = 'privacy';
            break;
          case 2:
            action = 'analytics';
            break;
          case 3:
            action = 'leads';
            break;
        }
        window._gaq.push(['_trackEvent', 'author-panel', action + '_clicked' ]);
      });
    }

    //  If this slideview load is from search results page
    if(document.referrer.match(/search\/slideshow/)){
      var resultNum = getUrlVar('from_search');
      if(resultNum !== undefined){
        //  send an event for pageload
        window._gaq.push(['_trackEvent', 'searchresult', 'slideview_load_' + resultNum]);
        //  trigger event if user downloads
        $('.j-download', ss.svTools).evt_track('searchresult', 'downloadclick_' + resultNum);
        //  when liked
        $('.j-action-addfav', ss.svTools).evt_track('searchresult', 'liked_' + resultNum);
      }
    }

    //  if slideview is referred from search results and the user has
    //  viewed slides in multiples of 10 percentages, 10%, 20%...
    //  trigger a GA event
    if($(player)){
      $(player).bind('next', function(e){
        if(document.referrer.match(/search\/slideshow/)){
          var lastPosition = player.controller.slideCount;
          var nextSlide = player.controller.currentPosition;
          var currDepthOfView = Math.ceil((100.0 * nextSlide)/lastPosition);
          var lastDepthOfView = Math.ceil((100.0 * (nextSlide - 1))/lastPosition);
          var lastMultipleOf10 = currDepthOfView - (currDepthOfView % 10);
          if(lastDepthOfView < lastMultipleOf10){
            var resultNum = getUrlVar('from_search');
            if(resultNum && window._gaq){
              resultNum = resultNum.split('#')[0];
              window._gaq.push(['_trackEvent','searchresult', 'view_' + resultNum + '_' + lastMultipleOf10]);
            }
          }
        }
      });
    }

    function bindMoreRelatedEvent(eventCategory, selector, isNonInteractiveEvent, suffix) {
      $(selector).click(function (event) {
        var sourceElement = $(event.srcElement);
        if (!(sourceElement.hasClass('j-action-addfav') || sourceElement.hasClass('j-action-faved'))) {
          var index = $(selector).filter(':not(".j-action-addfav, .j-action-faved")').index(this) + 1;
          suffix = typeof suffix !== 'undefined' ? suffix : '';    
          var related_algo_id = eventCategory.indexOf('related') != -1 ? ("_" + $(this).attr("data-algo-id")) : '';
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', eventCategory, 
            (index.toString() + suffix + related_algo_id), undefined, !!isNonInteractiveEvent]);
        }
      });
    }
    // Add related panel event
    var ab_variant = $(".relatedContent").attr("ab_variant");
    var pageload_algo_id = $($(".j-related-impression")[0]).attr("data-algo-id");
    var underscored_algo_id = '_' + pageload_algo_id;
    switch (slideshare_object.related_type){
      case 'related':
        if(ab_variant == "slideshare") {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'relatedcontent_li', 
            'related_loaded_ss' + underscored_algo_id, undefined, true]);
          bindMoreRelatedEvent('relatedcontent_li', '#relatedList li a', true, '_ss');
        }
        else if(ab_variant == "linkedin") {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'relatedcontent_li', 
            'related_loaded_li' + underscored_algo_id, undefined, true]);
          bindMoreRelatedEvent('relatedcontent_li', '#relatedList li a', true, '_li');
        }
        else {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'relatedcontent_loaded', pageload_algo_id, undefined, true]);
          bindMoreRelatedEvent('relatedcontent', '#relatedList li a', true);
        }
        break;
      case 'featured':
        window._gaq.push(['_trackEvent','bigfoot_slideview', 'featuredcontent_loaded', undefined, undefined, true]);
        bindMoreRelatedEvent('featuredcontent', '#relatedList li a', true);
        break;
      case 'fromlinetwork':
        window._gaq.push(['_trackEvent','bigfoot_slideview', 'linetworkcontent_loaded', undefined, undefined, true]);
        bindMoreRelatedEvent('linetworkcontent', '#ss-from-network li a', true);
        break;
      case 'trending':
        window._gaq.push(['_trackEvent','bigfoot_slideview', 'trendingcontent_loaded', undefined, undefined, true]);
        bindMoreRelatedEvent('trending_content', '#ss-trending li a', true);
        break;
      default:
        window._gaq.push(['_trackEvent','bigfoot_slideview', 'norelated_loaded', undefined, undefined, true]);
    }
    if($("#moreList").is(":visible")){
      window._gaq.push(['_trackEvent','bigfoot_slideview', 'morebyusercontent_default', 'pageload', undefined, true]);
      bindMoreRelatedEvent('morebyusercontent_default', '#moreList li a', true);
    }
    else if($("#relatedList").is(":visible")){
      bindMoreRelatedEvent('morebyusercontent', '#moreList li a', true);
    }

    $('.nav_home a', ss.header).evt_track('topnav_home');
    $('.nav_browse a', ss.header).evt_track('topnav_browse');
    $('.nav_slidespace a', ss.header).evt_track('topnav_myslidespace');
    $('.nav_upload a', ss.header).evt_track('topnav_upload');
    $('.nav_community a', ss.header).evt_track('topnav_community');
    $('.nav_widgets a', ss.header).evt_track('topnav_widgets');
    $('#slideview_on_linkedin').evt_track('bigfoot_slideview', 'on_linkedin');
    $('.twitter-follow-button').evt_track('bigfoot_slideview', 'follow_ss_twitter');
    $('#fb-follow-button').evt_track('bigfoot_slideview', 'follow_ss_facebook');
    $('.embedRepeat input').focus(function () {
      var action = "";
      if (this.id == "embed-code2") {
        action = "moreshareoptions>embed";
      } else if (this.id == "embedCodeWP2") {
        action = "moreshareoptions>Wordpress";
      } else {
        action = "moreshareoptions>WOrelatedpreso";
      }
      window._gaq.push(['_trackEvent', 'bigfoot_slideview', action]);
    });

    $('.j-desc-more').evt_track('bigfoot_slideview', 'description>more');
    $('.author-title .j-author-name').evt_track('bigfoot_slideview', 'authorlinkclick');
    $('.author-title .j-author-slideshows').evt_track('bigfoot_slideview', 'authorslideshowslinkclick');
    $('#commentsList .j-username').evt_track('bigfoot_slideview', 'commentuserlinkclick');
    $('#favsList .j-username').evt_track('bigfoot_slideview', 'favoriteuserlinkclick');

    if (ss.promoted) {
      window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'promoted', 'show']);
      $('#relatedList li:lt(' + ss.promoted + ')').evt_track('bigfoot_slideview', 'promoted', 'click');
    }

    if (ss.contests) {
      $.each(ss.contests, function (index, contest) {
        window._gaq.push(['_trackEvent', "bigfoot_contest", contest.contestLink, "slideview"]);
      });
    }

    //Only for flash player
    if (ss.player) {
      if ((jQuery('#noflash').length === 0) || (jQuery('#noflash').is(':visible') === false)) {
        // log player load
        var playerurl = ss.player.url;
        if (playerurl.match('swf/ssplayer2.swf')) {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerload', 'normal']);
        } else if (playerurl.match('swf/playerv.swf')) {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerload', 'video']);
        } else if (playerurl.match('swf/doc_player.swf')) {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerload', 'doc']);
        } else {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerload', 'a9']);
        }
      } else {
        // log player load fail
        try {
          var flashversion = deconcept.SWFObjectUtil.getPlayerVersion().major;
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerloadfail', flashversion]);
        } catch (e) {
          window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'playerloadfail', 'unknown']);
        }
      }
    }

    ss.track_shareform = function (share_li) {
      window._gaq.push(['_trackEvent', 'bigfoot_slideview', 'sharethisslideshowopen']);
      $('#send-button', share_li).evt_track('bigfoot_share',
        'sendemail').evt_trackAjaxOkay('bigfoot_share', 'sendemail', 'success');
      $('#import-button', share_li).evt_track('bigfoot_share',
        'importfriends').evt_trackAjaxOkay('bigfoot_share', 'importfriends', 'success');
      $('#message_to', share_li).evt_track('bigfoot_share', 'sharewith');
      $('#message_body', share_li).evt_track('bigfoot_share', 'yourmessage');
      $('#all-contacts,#recently-emailed,#all-addresses', share_li).click(function (event) {
        var ul = $(event.target).parents('ul[id]')[0];
        if (ul.id == 'all-contacts') {
          window._gaq.push(['_trackEvent', 'bigfoot_share', 'contacts']);
        } else if (ul.id == 'recently-emailed') {
          window._gaq.push(['_trackEvent', 'bigfoot_share', 'recent']);
        } else if (ul.id == 'all-addresses') {
          window._gaq.push(['_trackEvent', 'bigfoot_share', 'imported-address']);
        }
      });
    };

    ss.last_iframe = null;
    jQuery('.lostchild').mouseenter(function (event) {
      ss.last_iframe = event.target;
    });
    jQuery('.lostchild').mouseleave(function (event) {
      ss.last_iframe = null;
    });
    window.track_beforeunload_event = function () {
      if (ss.last_iframe) {
        ss.last_iframe = $(ss.last_iframe).parents('.lostchild')[0] || ss.last_iframe;
        var identifier = ss.last_iframe.className.replace(/lostchild|adbox-outer/g,
          '').replace(/^\s+|\s+$/g, '').split(/\s+/).sort().join(' ');
        ss.last_iframe = null;
      }
    };
    var old_onbeforeunload = window.onbeforeunload;
    window.onbeforeunload = function () {
      var value = window.track_beforeunload_event();
      value = value || (old_onbeforeunload && old_onbeforeunload.apply(window, arguments));
      if (value) {
        return value;
      }
    };
    jQuery(document).blur(track_beforeunload_event);
  };

  if(!ss.slideshow.is_private) {
    Number.prototype.number_with_delimiter = function(delimiter) {
        var number = this + '';
        delimiter = delimiter || ',';
        var split = number.split('.');
        split[0] = split[0].replace(
            /(\d)(?=(\d\d\d)+(?!\d))/g,
            '$1' + delimiter
        );
        return split.join('.');
    };

    (function totalShareCount(){
       var totalCount = 0;
       var responsereceived = 0;
       var $totalShares = $('.j-total-shares');

       var networkSelectors = {
         'facebook': '#sv-facebook-share',
         'google': '#sv-google-share',
         'linkedin': '#sv-linkedin-share',
         'twitter': '#sv-twitter-share'
       };

       var updateViewWithCount = function(network, count) {
         responsereceived += 1;
         var numericCount = parseInt(count, 10);
         if(numericCount){
          totalCount += numericCount;
         }
         $totalShares.text(totalCount.number_with_delimiter());

         // Update social widget count
         if(networkSelectors[network]) {
           $(networkSelectors[network])
            .find('.j-share-count')
            .html(numericCount.number_with_delimiter());
         }
       };

       var page_path = $(location).attr('pathname');
       var domain = 'www.slideshare.net';

       //Get G+ count
       $.ajax({
         url: '/slideshow/get_gplus_count',
         data: {
          slideshow_url: page_path
         }
       }).done(function(response){
         updateViewWithCount('google', response.g_plus_count);
       });

      //Get FB like+shares+ comment count
       $.ajax({
          url: 'https://graph.facebook.com/fql',
          data: {
           q: 'SELECT total_count FROM link_stat WHERE url="'+ domain + page_path + '"'
          }
        }).done(function(response){
          updateViewWithCount('facebook', response.data[0].total_count);
        });

      //Get tweets count
      (function getTweetCount(){
       var twitterApi = 'http://urls.api.twitter.com/1/urls/count.json?url=';
       $.getJSON( twitterApi + domain + page_path + '&callback=?', function(data){
          updateViewWithCount('twitter', data.count);
       });
      })();

      //Get LinkedIn count
      (function getLiCount(){
       var LiApi = 'http://www.linkedin.com/countserv/count/share?url=';
       $.getJSON( LiApi + domain + page_path + '&callback=?', function(data){
          updateViewWithCount('linkedin', data.count);
       });
      })();
    })(); // totalShareCount()
  }

})(slideshare_object);

(function() {
  // Load GA and Comscore
  slideshare_object.loadGAandComscore();

  // Bizo
  window._bizo_data_partner_id = "870";
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = true;
  b.src = (window.location.protocol === "https:" ? "https://sjs" : "http://js") + ".bizographics.com/insight.min.js";
  s.parentNode.insertBefore(b, s);

  /* Load Social JS API scripts */

  // Facebook JSSDK
  slideshare_object.setup_fbconnect();

  // LinkedIn JSSDK
  var LIsrc = document.location.protocol + '//platform.linkedin.com/in.js?async=true';
  $.getScript(LIsrc, function() {
    // Now the LinkedIn "IN" object should exist.
      typeof(IN) !== 'undefined' && IN.init({
        api_key: "y4wa9oe4c6nu",
        credentials_cookie: true,
        entropy: Math.floor(Math.random() * 10000)
      });
  });
})();