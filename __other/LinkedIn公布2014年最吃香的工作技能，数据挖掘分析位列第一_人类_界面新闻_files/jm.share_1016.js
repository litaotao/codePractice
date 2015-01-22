
$(function() {
    include_css('/plugins/share/jm.share.css');
	var _jm_url = encodeURIComponent(window.location.href);
	var _jm_title = $('title').html();
	var _jm_summary = $('meta[name="description"]').attr('content');
	var _jm_pic = encodeURIComponent($('body').find('img').eq(0).attr('src'));

	if(typeof(jm_config) != 'undefined')
	{
		if(typeof jm_config.title != 'undefined' && jm_config.title != '') {
			_jm_title = jm_config.title;
		}
		if(typeof jm_config.summary != 'undefined' && jm_config.summary != '') {
			_jm_summary = jm_config.summary;
		}
		if(typeof jm_config.imageUrl != 'undefined') {
			_jm_pic = encodeURIComponent(jm_config.imageUrl);
		}
	}

	if (_jm_pic == 'undefined' || typeof(_jm_pic) == 'undefined')
	{
		_jm_pic = '';
	}

	// sina分享
	$('.jm_sina').click(function() {
		var _jm_share_title = '【'+_jm_title+'】'+ _jm_summary;
		if (typeof($(this).attr('data')) != 'undefined' && $(this).attr('data') != '')
		{
			_jm_share_title += '...'+$(this).attr('data');
		}
		var _jm_source = 'jiemian';
		var _jm_appkey = '2254771841';
		var _jm_ralateUid = '';

		var _sina_url = 'http://service.weibo.com/share/share.php?title='+_jm_share_title+'&url='+_jm_url+'&source='+_jm_source+'&appkey='+_jm_appkey+'&pic='+_jm_pic+'&searchPic=false&relateUid='+_jm_ralateUid;
		window.open(_sina_url);
		
		addShareNumber(this, $(this).attr('url'));
	});

	// QQ好友分享
	$('.jm_qq').click(function() {
		var _jm_share_desc = _jm_summary;
		var _jm_share_title = _jm_title;
		var _jm_site = 'jiemian';

		var _QQ_share_url = 'http://connect.qq.com/widget/shareqq/index.html?url='+_jm_url+'&showcount=0&desc='+_jm_share_desc+'&summary='+_jm_share_desc+'&title='+_jm_share_title+'&site='+_jm_site+'&pics'+_jm_pic;
		window.open(_QQ_share_url);
		
		addShareNumber(this, $(this).attr('url'));
	});

	// QQ空间
	$('.jm_qzone').click(function() {
		var _jm_desc = '';
		if (typeof($(this).attr('data')) != 'undefined' && $(this).attr('data') != '')
		{
			_jm_desc += $(this).attr('data');
		}

		var _Qzone_share_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ _jm_url +'&title='+ _jm_title +'&pics='+ _jm_pic +'&summary='+ _jm_summary +'&desc='+ _jm_desc;
		window.open(_Qzone_share_url);
		addShareNumber(this, $(this).attr('url'));
	});

	// QQ微博
	$('.jm_qq_weibo').click(function() {
		var _jm_QQ_weibo_title = encodeURIComponent('【'+ _jm_title +'】'+ _jm_summary);
		var _jm_QQ_appkey = '';
		var _jm_site = '';
		if (typeof($(this).attr('data')) != 'undefined' && $(this).attr('data') != '')
		{
			_jm_QQ_weibo_title += '...'+$(this).attr('data');
		}
		
		var _Qweibo_share_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title='+_jm_QQ_weibo_title+'&url='+ _jm_url +'&appkey='+_jm_QQ_appkey+'&site='+_jm_site+'&pic='+_jm_pic;
		window.open(_Qweibo_share_url);
		addShareNumber(this, $(this).attr('url'));
	});

	// 微信分享
	$('.jm_weixin').click(function() {
		var l = ($(window).width() - 360) / 2;
		var t = ($(window).height() - 360 - 60) / 3;
		var host = document.location.host;
		var html = '';
        $('.share-css').remove();
        $('.jm_weixin_win').remove();
		html += '<div class="jm_weixin_win"><div class="jm_weixin_header"><h3>分享到微信朋友圈</h3><span class="jm_winxin_close">X</span>';
		html +=	'</div><div class="jm_webchat"><img src="http://s.jiathis.com/qrcode.php?url='+_jm_url.replace(host,'m.jiemian.com')+'" width="220" height="220" alt="二维码加载失败...">';
		html += '</div><div class="jm_weixin_footer">打开微信，使用 “扫一扫” 即可将网页分享到我的朋友圈。</div></div>';
		$('body').append(html);
		$('.jm_weixin_win').css({
			'left' : l+'px',
			'top' : t+'px'
		});

		addShareNumber(this, $(this).attr('url'));
	});
	// 关闭微信弹窗
	$('body').on('click','.jm_winxin_close', function() {
		$('.jm_weixin_win').remove();
	});
	function addShareNumber(obj, url) {
		if ($(obj).attr('share') == 'true')
		{
			$.get(url, {}, function(data) {
				$(obj).attr('share', 'false');
			});
		}
	}
});