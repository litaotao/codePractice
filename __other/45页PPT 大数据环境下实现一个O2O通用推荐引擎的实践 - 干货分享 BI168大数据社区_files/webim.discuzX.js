//custom
(function(webim) {
	var path = _IMC.path;
	webim.extend(webim.setting.defaults.data, _IMC.setting);
    var cookie_key = "_webim_cookie_";
	if( _IMC.is_visitor ) { cookie_key = "_webim_v_cookie_"; }
    if( _IMC.user != "" ) { cookie_key = cookie_key + _IMC.user.id; }
    webim.status.defaults.key = cookie_key;
	webim.route( {
		online: path + "index.php?action=online",
		offline: path + "index.php?action=offline",
		deactivate: path + "index.php?action=refresh",
		message: path + "index.php?action=message",
		presence: path + "index.php?action=presence",
		status: path + "index.php?action=status",
		setting: path + "index.php?action=setting",
		history: path + "index.php?action=history",
		clear: path + "index.php?action=clear_history",
		download: path + "index.php?action=download_history",
		buddies: path + "index.php?action=buddies",
        //room actions
		invite: path + "index.php?action=invite",
		join: path + "index.php?action=join",
		leave: path + "index.php?action=leave",
		block: path + "index.php?action=block",
		unblock: path + "index.php?action=unblock",
		members: path + "index.php?action=members",
        //notifications
		notifications: path + "index.php?action=notifications",
        //upload files
		upload: path + "static/images/upload.php"
	} );

	webim.ui.emot.init({"dir": path + "static/images/emot/default"});
	var soundUrls = {
		lib: path + "static/assets/sound.swf",
		msg: path + "static/assets/sound/msg.mp3"
	};
	var ui = new webim.ui(document.body, {
		imOptions: {
			jsonp: _IMC.jsonp
		},
		soundUrls: soundUrls,
		//layout: "layout.popup",
        layoutOptions: {
            unscalable: _IMC.is_visitor,
            detachable: true
        },
		buddyChatOptions: {
            downloadHistory: !_IMC.is_visitor,
			//simple: _IMC.is_visitor,
			upload: _IMC.upload && !_IMC.is_visitor
		},
		roomChatOptions: {
            downloadHistory: !_IMC.is_visitor,
			upload: _IMC.upload
		}
	}), im = ui.im;
    //全局化
    window.webimUI = ui;

	if( _IMC.user ) im.setUser( _IMC.user );
	if( _IMC.menu ) ui.addApp("menu", { "data": _IMC.menu } );
	if( _IMC.enable_shortcut ) ui.layout.addShortcut( _IMC.menu );

	ui.addApp("buddy", {
		showUnavailable: _IMC.show_unavailable,
		is_login: _IMC['is_login'],
		disable_login: true,
		collapse: false,
		//disable_user: _IMC.is_visitor,
        //simple: _IMC.is_visitor,
		loginOptions: _IMC['login_options']
	});
    if(!_IMC.is_visitor) {
        if( _IMC.enable_room )ui.addApp("room", { discussion: (_IMC.discussion && !_IMC.is_visitor) });
        if( _IMC.enable_noti )ui.addApp("notification");
        if( _IMC.enable_chatlink )ui.addApp("chatlink", {
            space_href: [/mod=space&uid=(\d+)/i, /space\-uid\-(\d+)\.html$/i],
            space_class: /xl\sxl2\scl/,
            space_id: null,
            link_wrap: document.getElementById("ct")
        });
    }
    ui.addApp("setting", {"data": webim.setting.defaults.data, "copyright": true});
	ui.render();
	_IMC['is_login'] && im.autoOnline() && im.online();
})(webim);
