(function($$, $) {
  $$.facebook_activity_queue = [];

  $$.setup_fbconnect = function() {
    window.fbAsyncInit = function() {
      FB.init($$.fb_init_params);
      FB.getLoginStatus(function (response){
        // all the functions that wait for fb to be initialized can listen to this event.
        $(document).trigger('fbinitialized');
        if (response.status ==='unknown'){
          // user is logged out from facebook
          slideshare_object.fb_logged_out = true;
        }
      },true);
      if(!slideshare_object.user.loggedin) {
        FB.Event && FB.Event.subscribe('auth.statusChange', slideshare_object.onFBStatusChange);
      }
    };

    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.id = 'facebook-jssdk';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
  };

  $$.fbconnect = {
    basic_perms : {
      scope: 'email, publish_actions'
    },
    download_perms : {
      scope: 'email,publish_actions,user_about_me,user_birthday,'+
        'user_location,user_website,user_work_history'
    }
  };

  $$.fbAutoLogin = function(access_token, fb_user_id) {
    //Logs in a user to SlideShare using an access token and fb user id
    slideshare_object.fbConnect('/fbconnect/create_account_or_login?from=fb_auto_login',
      { access_token: access_token,
        fb_user_id: fb_user_id,
        auto_login: true
      }, function(data) {
        if(data.status < 4) {
          //4,5 are login fail statuses
          //Login is successful
          slideshare_object.ga('fb_opengraph', 'auto_login', 'login_successful');
          //reloading the page since the page was rendered for logged-out state and contains login/signup links for actions
          window.location.reload();
        } else {
          slideshare_object.ga('fb_opengraph', 'auto_login', 'login_failed');
        }
      });
  };

  $$.unsubscribeFBStatusChange = function() {
    //Temporary fix till we figure out the issue with FB.Event.unsubscribe
    slideshare_object.disable_autologin = true;
    //window.FB && FB.Event && FB.Event.unsubscribe('auth.statusChange', slideshare_object.onFBStatusChange);
  };

  $$.onFBStatusChange = function(response) {
    if(slideshare_object.disable_autologin === true) {
      return;
    }
    //Callback for the auth.statusChange event - triggered by Facebook
    var status = response.status;
    if(status === 'connected' && cookie('autologin_disabled') !== "true") {
      slideshare_object.ga('fb_opengraph', 'auto_login', 'connected');
      slideshare_object.fbAutoLogin(response.authResponse.accessToken,
                                    response.authResponse.userID);
    }
  };

  $$.fbConnect = function(url, params, callback) {
    if(slideshare_object.fbconnect_in_progress === true) {
      return;
    }
    slideshare_object.fbconnect_in_progress = true;
    $.post(url, params, function(data) {
      slideshare_object.fbconnect_in_progress = false;
      callback(data);
    }, 'json');
  };

  $$.setup_fbconnect_interaction = function() {
    var fbErrorCodes = { 
      INVALID_ACCESS_TOKEN : 190,
      REQUIRES_EXTENDED_PERMISSIONS : 200
    };

    var linkFbProfileResponse = {
      PROFILE_LINKED : 1,
      NOT_LOGGED_IN : 2,
      USER_ALREADY_EXISTS : 3,
      NO_PUBLISH_PERMISSIONS : 4
    };

    var fbReconnectNotification = {
      DAYS_UNTIL_NEXT_NOTICE : 3,
      MAX_NUMBER_OF_DISMISSALS : 2
    };

    //if not logged in
    if (!slideshare_object.user.loggedin) {
      $('body').on('click', '#fb-login-modalbox', function() {
        window.fromSource = window.fromSource || getUrlVar('from_source');
        var itemLocation = 'fancybox';
        $('#j-fb-modalbox-indicator').show();
        var perms = slideshare_object.fbconnect.basic_perms;
        if ($$.isDownloadUrl()) {
          perms = slideshare_object.fbconnect.download_perms;
        }
        slideshare_object.unsubscribeFBStatusChange();
        //Facebook SDK should be ready before this block executes
        window.FB && FB.login(function(response) {
          if (response) {
            if (response.authResponse) {
              if ($$.isDownloadUrl()) {
                slideshare_object.fbConnect('/fbconnect/create_account_or_login?from_page=download',
                  { access_token : response.authResponse.accessToken,
                    fb_user_id : response.authResponse.userID,
                    login_source : window.loginSource
                  }, function(data) {
                    fbconnect_login_redirect(data, itemLocation);
                  });
              } else {
                slideshare_object.fbConnect('/fbconnect/create_account_or_login',
                  { access_token : response.authResponse.accessToken,
                    fb_user_id : response.authResponse.userID,
                    login_source : window.loginSource
                  }, function(data) {
                    fbconnect_login_redirect(data, itemLocation);
                  });
              }
            } else {
              $('#j-fb-modalbox-indicator').hide();
            }
          } else {
            $('#j-fb-modalbox-indicator').hide();
          }
        },
        perms);
      });
    }

    //if not logged in (Foundation modal login)
    if (!slideshare_object.user.loggedin) {
      $('body').on('click', '#fblogin-modal-cta', function() {
        window.fromSource = window.fromSource || getUrlVar('from_source');
        var itemLocation = 'fancybox';
        $('#j-fb-modalbox-indicator').show();
        var perms = slideshare_object.fbconnect.basic_perms;
        if ($$.isDownloadUrl()) {
          perms = slideshare_object.fbconnect.download_perms;
        }
        slideshare_object.unsubscribeFBStatusChange();
        //Facebook SDK should be ready before this block executes
        window.FB && FB.login(function(response) {
          if (response) {
            if (response.authResponse) {
              if ($$.isDownloadUrl()) {
                slideshare_object.fbConnect('/fbconnect/create_account_or_login?from_page=download',
                  { access_token : response.authResponse.accessToken,
                    fb_user_id : response.authResponse.userID,
                    login_source : window.loginSource
                  }, function(data) {
                    fbconnect_login_redirect_from_iframe(data, itemLocation);
                  });
              } else {
                slideshare_object.fbConnect('/fbconnect/create_account_or_login',
                  { access_token : response.authResponse.accessToken,
                    fb_user_id : response.authResponse.userID,
                    login_source : window.loginSource
                  }, function(data) {
                    fbconnect_login_redirect_from_iframe(data, itemLocation);
                  });
              }
            } else {
              $('#j-fb-modalbox-indicator').hide();
            }
          } else {
            $('#j-fb-modalbox-indicator').hide();
          }
        },
        perms);
      });
    }

    function allow_publish_for(action_name) {
        return ($$.user.is_opengraph_user && $$.user.opengraph_permissions[action_name] && $$.user.fb_access_token);
    }

    function og_params_for(action) {
      var current_location = action.ppt_url || location_without_params();
      var params = {};
      switch(action.name) {
        case 'view':
        case 'favorite':
          params.presentation = current_location;
          break;
        case 'download':
          // URL is of the form :
          //http://slideshare.net/abhinavdhasmana/savedfiles
          //?s_title=hadoop-and-hbase-on-amazon-web-services&user_id=115622&login=AmazonWebServices
          var title = getUrlVar('s_title');
          var login = getUrlVar('user_login');
          params.presentation = "http://www.slideshare.net/"+login+"/"+title;
          break;
        case 'comment':
          params.presentation = current_location;
          params.message = action.message;
          break;
        case 'follow':
          params.profile = action.facebook_user_id;
          break;
        default:
          error("Unknown action: " + action.name);
      }
      params.access_token = $$.user.fb_access_token;
      return params;
    }

    function og_url_for(action_name) {
      if(action_name === 'follow') {
        return '/me/og.follows';
      } else {
        return '/me/' + $$.fb_app_name + ':' + action_name;
      }
    }

    function og_notify_ga(action) {
      var fb_source = getUrlVar('fb_source');
      //Trigger a different GA if user came from facebook
      if(getUrlVar('code') || fb_source) {
        if(fb_source) {
          slideshare_object.ga('fb_opengraph', 'publish_action', 'from_facebook_' + action + '_' + fb_source);
        } else {
          slideshare_object.ga('fb_opengraph', 'publish_action', 'from_facebook_' + action);
        }
      } else {
        slideshare_object.ga('fb_opengraph', 'publish_action', action);
      }
    }

    $$.pushPendingFBactivities = function(){
      var FBqueue = slideshare_object.facebook_activity_queue;

      while (FBqueue.length){
        var fb_activity = FBqueue.pop();
        slideshare_object.push_activity_to_facebook(fb_activity.action, fb_activity.callback);
      }
    };

    $$.post_activity_to_facebook = function(action, callback) {
      if(!allow_publish_for(action.name)) {
        callback();
        return;
      }
      if(!window.FB) {
        $$.facebook_activity_queue.push({'action': action, 'callback': callback});
        return;
      }

      $$.push_activity_to_facebook(action, callback);
    };

    $$.push_activity_to_facebook = function(action, callback){

      var url = og_url_for(action.name);
      //TODO: This is ugly, refactor
      if(action.name === 'view') {
        $('.fb-msg').addClass('hide');
        $('.fb-activity-ss, .fb-activity-ss .progress').removeClass('hide');
      }
      FB.api(url, 'post', og_params_for(action), function(response) {
        if (response && response.error) {
          if(response.error.code === fbErrorCodes.REQUIRES_EXTENDED_PERMISSIONS){
            $.post('/fbconnect/remove_publish_perms');
          } else if(response.error.code === fbErrorCodes.INVALID_ACCESS_TOKEN) {
            $.post('/fbconnect/invalidate_access_token');
          }
          slideshare_object.ga('fb_opengraph_error',response.error.type + '-' + response.error.code ,
            response.error.message , slideshare_object.user.id);
        }
        callback(response);
        });
      og_notify_ga(action.name);
    };

    $$.remove_activity_from_facebook = function(actionId, callback){
      $('.fb-msg').addClass('hide');
      $('.fb-activity-ss .progress').removeClass('hide');
      FB.api(
        '/' + actionId,
        'delete',
        {
          access_token: slideshare_object.user.fb_access_token
        },
        callback);
    };

    function fbconnect_login_redirect(data, itemLocation) {
      // Modal login window in upload page raises a ga call when fb login/signup is successful
      var escaped_window_location = escape(window.location.href);
      var fromSource = window.fromSource,
        fromType = window.fromType || getUrlVar('from');
      if((window.location.pathname.startsWith("/upload")) &&
        (data.status === 1 || data.status === 2 || data.status === 3)) {
        slideshare_object.ga('Upload', 'fb_login_successful');
        escaped_window_location = escaped_window_location.replace("loggedout_","loggedin_loggedout_");
      }
      switch (data.status) {
      case 1:
        /*A new user has been created*/
        slideshare_object.ga('Signup', 'fb_login', 'fb_signup_from_' + itemLocation);
        if (typeof(fromSource) != "undefined") {
          window.location.replace("/fbconnect/landingpage?from=" + fromSource);
        } else {
          window.location.replace("/fbconnect/landingpage?from=" + escaped_window_location);
        }
        break;
      case 2:
        /* User is existing ss user */
        if (typeof(fromSource) != "undefined") {
          window.location.replace("/fbconnect/landingpage?from=" + fromSource);
        } else {
          window.location.replace("/fbconnect/landingpage?from=" + escaped_window_location);
        }
        break;
      case 3:
        /*The user already had a facebook linked account*/
        /*Handle the logout page*/
        _gaq.push(['_trackEvent', 'Login', 'fb_login', 'fb_login_from_'+itemLocation]);
        var decodedURL = decodeURIComponent(fromSource);

        if (getUrlVars().from_logout !== undefined && typeof(fromType) == "undefined") {
          window.location.replace('/');
        }else if(window.location.pathname.startsWith("/upload")){
          window.location.replace(window.location.href.replace("loggedout_","loggedin_loggedout_"));
          return false;
        } else if (fromSource &&
          fromSource.length > 1 &&
          isInternalRedirect(fromSource) &&
          window.location.href !== decodedURL) {
          window.location.href = decodedURL;
        } else {
          window.location.reload();
        }
        break;
      case 4:
        /*Failed*/
        $('.j-alert').html("Login unsuccessful. Please try again.");
        $('.j-alert').removeClass('hide');
        break;
      case 5:
        /*Suspended User*/
        $('.j-alert').html("Login unsuccessful. Your account has been suspended as it was found to " +
          "be in violation of SlideShare's Terms of Service and/or Community Guidelines. Please read the " +
          "<a href='http://help.slideshare.com/entries/22330620-Why-was-my-slideshare-account-suspended-' " +
          "target='_blank' class='blue_link_bold'>Suspended Users FAQ</a> to resolve this issue.");
        $('.j-alert').removeClass('hide');
        break;
      default:
        window.location.reload();
      }
    }

    /* Handles redirect logic when a logged in slideshare 
    user links his account to facebook */
    function fbconnect_login_redirect_link(data) {
      $('#j-fb-topnav-indicator').hide();
      $('#j-fb-login-indicator').hide();
      switch (data.status) {
      case linkFbProfileResponse.PROFILE_LINKED:
        /* Success */
        window.location.reload();
        break;
      case linkFbProfileResponse.USER_ALREADY_EXISTS:
        /*User already exists this facebook login*/
        $('#page-error').append('We could not connect your SlideShare account ' +
                                'to Facebook. This Facebook login is already ' +
                                'being used with another SlideShare account.').show();
        break;
      case linkFbProfileResponse.NO_PUBLISH_PERMISSIONS:
      /* Publish Permissions not granted*/
        $('#page-error').append('We could not connect your SlideShare account ' +
                                  'to Facebook. Sharing on SlideShare is better ' +
                                  'when you allow us to post to Facebook.').show();
        $('#fb-login') && $('#fb-login').html("<strong>Connect</strong>").removeClass("disabled");
        break;
      default:
        $('#page-error').append('There was an error.').show();
      }
    }

    // Modal login window callback after facebook login
    // Post message to the login iframe popin
    function fbconnect_login_redirect_from_iframe(data, itemLocation) {
      var fromSource = $('#target_url').val();
      var message = 'fbconnectDefault';
      switch (data.status) {
      case 1:
        /*A new user has been created*/
        $$.ga(['_trackEvent', 'Signup', 'fb_login', 'fb_signup_from_'+ itemLocation]);
        message = 'fbconnectNewUser';
        break;
      case 2:
        /* User is existing ss user */
        message = 'fbconnectExistingUser';
        break;
      case 3:
        /*The user already had a facebook linked account*/
        /*Handle the logout page*/
        $$.ga(['_trackEvent', 'Login', 'fb_login', 'fb_login_from_' + itemLocation]);
        message = 'fbconnectExistingUserWithLinkedAccount';
        break;
      case 4:
        /*Failed*/
        message = 'fbconnectFailed';
        break;
      case 5:
        /*Suspended User*/
        message = 'fbconnectSuspendedUser';
        break;
      }
      $.postMessage(message, fromSource, parent);
    }

    function fb_reconnect_callback(data) {
      if (data.status === linkFbProfileResponse.USER_ALREADY_EXISTS) {
        /* Another User already exists with this facebook login*/
        $('#page-error').append('This Facebook login is already ' +
                                'being used with another SlideShare account. ' +
                                'Try again using another account.').show();
      } else{
        window.location.reload();
      }
    }

    function fbconnect_delink_callback(data) {
      window.location.reload();
    }

    // Remember that the user has dismissed the Fb error notification once more.
    function rememberFbErrorDismissal() {
      if (window.localStorage) {
        try {
          var key = 'fbErrorDismissals';
          var value = Number(window.localStorage[key]) || 0;
          window.localStorage[key] = String(value + 1);
          window.localStorage.fbErrorLastDismissal = new Date().getTime();
        } catch (ex) {
          // Probably due to storage size limit violation.
        }
      }
    }

    /**
    * @return {boolean} Whether the user has dismissed the Fb error often enough
    *     that we will not show it again.
    */
    function hidefbErrorNotification() {
      if (!window.localStorage) {
        // Without localStorage, we don't want to show the error every time the page loads.
        return true;
      }
      try {
        var key = 'fbErrorDismissals';
        var value = Number(window.localStorage[key]) || 0;
        if(value === 0){
          return false;
        } else if(value >= fbReconnectNotification.MAX_NUMBER_OF_DISMISSALS){ // threshold - can be updated later
          return true;
        } else {
          var lastDismissalTime = window.localStorage.fbErrorLastDismissal || new Date().getTime();
          var currentTime = new Date().getTime();
          var diffDays = Math.ceil((currentTime - lastDismissalTime) / (1000 * 3600 * 24));
          return diffDays <= fbReconnectNotification.DAYS_UNTIL_NEXT_NOTICE;
        }
      } catch (ex) {
        return true;
      }
    }

    $(document).ready(function() {
      // When facebook sdk is initialized, activate fblogin button
      $(document).bind('fbinitialized', function(){
        $('#fb-login').removeClass('disabled');
      });

      $('#j-delink-fb').on('click', function(e) {
        e.preventDefault();
        $.post('/fbconnect/delink_facebook_profile', {}, fbconnect_delink_callback, 'json');
      });

      if ((slideshare_object.isHomePage() || slideshare_object.isSlideViewPage()) &&
           !slideshare_object.is_mobile){
        if(slideshare_object.user && slideshare_object.user.is_opengraph_user &&
           !slideshare_object.user.fb_access_token && !hidefbErrorNotification()){
          var msg = "Your facebook connection has expired. <a href='#' id='fb-reconnect'>Click here to connect and continue sharing.</a>";
          var $flash = $('#flash-notice');
          $flash.find('span').html(msg);
          $flash.slideDown('slow');
          slideshare_object.ga('fb_opengraph', 'reconnect-notice', 'displayed');
          $flash.find('.close').click(function(){
            rememberFbErrorDismissal();
            slideshare_object.ga('fb_opengraph', 'reconnect-notice', 'cancelled');
          });
        }
      }

      $('#fb-reconnect').click(function(e) {
        e.preventDefault();
        if (slideshare_object.user.loggedin && slideshare_object.user.is_opengraph_user &&
            !slideshare_object.user.fb_access_token) {
          var perms = slideshare_object.fbconnect.download_perms;
          perms.return_scopes = true;

          slideshare_object.unsubscribeFBStatusChange();
          window.FB && FB.login(function(response) {
            if (response && response.authResponse) {
              $.post('/fbconnect/link_facebook_profile',
                { access_token : response.authResponse.accessToken,
                  fb_user_id : response.authResponse.userID,
                  granted_perms : response.authResponse.grantedScopes
                },
                function(data) {
                  fb_reconnect_callback(data);
                },
                'json');
            }
          },
          perms);
          slideshare_object.ga('fb_opengraph', 'reconnect-notice', 'connected');
        }
      });

      $('#fb-login').click(function(e) {
        if ($(this).hasClass('disabled')){
          return;
        }
        var itemLocation = 'login';
        e.preventDefault();
        window.fromSource = getUrlVar('from_source') || encodeURIComponent('/');
        $('#j-fb-login-indicator').show();
        if (!$(this).hasClass("fb-login-new")) {
          $(this).html("Connecting...").addClass("disabled");
        }
        var perms = slideshare_object.fbconnect.basic_perms;
        if (slideshare_object.user.loggedin) {
          perms = slideshare_object.fbconnect.download_perms;
        }
        perms.return_scopes = true;

        slideshare_object.unsubscribeFBStatusChange();
        window.FB && FB.login(function(response) {
          if (response) {
            if (response.authResponse) {
              if (slideshare_object.user.loggedin) {
                if (!slideshare_object.user.is_fbuser ||
                    !slideshare_object.user.is_opengraph_user ||
                    !slideshare_object.user.fb_access_token) {
                  $.post('/fbconnect/link_facebook_profile',
                    { access_token : response.authResponse.accessToken,
                      fb_user_id : response.authResponse.userID,
                      granted_perms : response.authResponse.grantedScopes },
                    function(data) {
                      fbconnect_login_redirect_link(data);
                    },
                    'json');
                }
              } else {
                $.post('/fbconnect/fb_login',
                {},
                function(data) {
                  slideshare_object.fbConnect('/fbconnect/create_account_or_login',
                    { access_token : response.authResponse.accessToken,
                      fb_user_id : response.authResponse.userID,
                      login_source : window.loginSource,
                      granted_perms : response.authResponse.grantedScopes
                    }, function(data) {
                      fbconnect_login_redirect(data, itemLocation);
                    });
                },
                'json');
              }
            } else {
              $('#j-fb-login-indicator').hide();
            }
          } else {
            $('#j-fb-login-indicator').hide();
          }
        },
        perms);
      });
    });
  };
  $$.setup_opengraph_interaction = function() {
    $('.player').bind('fb-view-published', function(e, actionId){
      $('.fb-activity-ss .progress').addClass('hide');
      $$.slideshow.view_action_state = 'published';
      $('.fb-removed').addClass('hide');
      $('.fb-viewed').removeClass('hide');
      // set an action id to refer to it later
      $$.slideshow.view_action_id = actionId;
      if (cookie("og_notified") !== "true"){
        $('.fb-viewed').popover({ placement : 'top', html : true, trigger : 'manual' }).popover('show');
      }
    });
    $('.player').bind('fb-view-failed', function(e, error){
      slideshare_object.ga('fb_opengraph','view-publish-failed', error.id, error.message);
      slideshare_object.slideshow.view_action_state = 'failed';
      $('.fb-activity-ss .progress').addClass('hide');
    });

    $('.player').bind('fb-favorite-failed', function(e, error){
      slideshare_object.ga('fb_opengraph','favorite-publish-failed', error.id || error.type, error.message);
    });

    $('#j-popover-okay').on('click', function(e){
      e.preventDefault();
      cookie("og_notified", true, { path: '/', expires: 365 });
      $('.fb-viewed').popover('hide');
    });
    $('.fb-viewed').on('click',function(e){
      e.preventDefault();
      if ($$.slideshow.view_action_state == 'published' &&
          ($$.slideshow.view_action_id !== null || $$.slideshow.view_action_id !== undefined)) {
        $$.remove_activity_from_facebook($$.slideshow.view_action_id, function(response){
          if(response && !response.error) {
            $('.fb-activity-ss .progress').addClass('hide');
            $('.player').trigger('fb-view-removed');
          }
        });

      }
    });
    $('.player').bind('fb-view-removed', function(){
      $('.fb-activity-ss .progress').addClass('hide');
      $$.slideshow.view_action_state = 'removed';
      $$.slideshow.view_action_id = null;
      $('.fb-viewed').addClass('hide');
      $('.fb-removed').removeClass('hide');
      slideshare_object.ga('fb_opengraph', 'fb-view-removed');
    });
    $('.fb-removed').on('click',function(e){
      e.preventDefault();
      $$.post_activity_to_facebook({ name: 'view' }, function(response){
        if ((response !== undefined) && (response.id)) {
          $('.player').trigger('fb-view-published', response.id);
        }
      });
    });
  };

  $(window).load(function() {
    $$.setup_fbconnect();
  });  
  
})(slideshare_object, jQuery);
