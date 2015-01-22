document.writeln("<a href=\"javascript:void(0)\" id=\"fxwb\" style=\"background:url(http:\/\/i2.sinaimg.cn\/IT\/deco\/2009\/0930\/images\/wbicon_cl_002.png) no-repeat;width:105px;padding:7px 0 0 20px;height:20px;text-align:right; line-height:normal;\"><span style=\"font-size:12px;\">新浪微博<\/span><\/a>");


document.writeln("<a title='转播到腾讯微博' href='javascript:void(0)' onclick=posttoWb() style=\"margin:0 0 0 20px;font-size:12px;font-family:\'\\5b8b\\4f53\';color:#369\"><nobr><span style='display:inline-block;width:16px;height:16px;margin:0 3px 0.2em -20px;vertical-align:middle;background:url(http://v.t.qq.com/share/images/ico.png) no-repeat'><\/span>腾讯微博</nobr><\/a>");


document.writeln("<a title=\"分享到搜狐微博\" href=\"javascript:void((function(s,d,e,r,l,p,t,z,c){var f=\'http:\/\/t.sohu.com\/third\/post.jsp?\',u=z||d.location,p=[\'&url=\',e(u),\'&title=\',e(t||d.title)+' - TechWeb ',\'&content=\',c||\'gb2312\',\'&pic=\',e(p||\'\')].join(\'\');function%20a(){if(!window.open([f,p].join(\'\'),\'mb\',[\'toolbar=0,status=0,resizable=1,width=660,height=470,left=\',(s.width-660)\/2,\',top=\',(s.height-470)\/2].join(\'\')))u.href=[f,p].join(\'\');};if(\/Firefox\/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,\'\',\'\',\'\',\'\',\'\',\'utf-8\'));\" style=\"margin:0 0 0 20px;font-size:12px;font-family:\'\\5b8b\\4f53\';color:#369\"><span style=\"display:inline-block;width:16px;height:16px;margin:0 3px 0.2em -20px;vertical-align:middle;background:url(http:\/\/s2.cr.itc.cn\/img\/t\/152.png) no-repeat\"><\/span>搜狐微博<\/a>");

document.writeln("<a href=\"javascript:void(0);\" onclick=\"(function(){var url = \'link=http:\/\/www.techweb.com.cn&source=\'+ encodeURIComponent(\'TechWeb\')+ \'&info=\'+ encodeURIComponent(document.title.substring(0,22)) +' - TechWeb ' + \' \' + encodeURIComponent(document.location.href);window.open(\'http:\/\/t.163.com\/article\/user\/checkLogin.do?\'+url+\'&\'+new Date().getTime(),\'newwindow\',\'height=330,width=550,top=\'+(screen.height-280)\/2+\',left=\'+(screen.width-550)\/2+\', toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no\');})()\" target=\"_self\" style=\"font-size:12px;margin-left:5px;background: url(http:\/\/img1.cache.netease.com\/cnews\/css09\/wblog.gif) no-repeat;padding:0 0 4px 20px;\">网易微博<\/a> ")

document.writeln("<a href=\"javascript:window.open(\'http:\/\/sns.qzone.qq.com\/cgi-bin\/qzshare\/cgi_qzshare_onekey?url=\'+encodeURIComponent(document.location.href));void(0)\"><img src=\"http:\/\/www.techweb.com.cn\/images\/qzone.gif\" alt=\"分享到QQ空间\" align=\"absmiddle\" border=\"0\" style=\"margin-right:2px;\"><span style=\"font-size:12px;\">QQ空间<\/span><\/a>");
document.writeln("<a href=\"javascript:void(0)\" id=\"fxitb\" style=\"background:url(http:\/\/www.techweb.com.cn\/images\/itiebaicon.gif) no-repeat;width:105px;padding:0px 0 0 20px;height:20px;text-align:right; line-height:normal;\"><span style=\"font-size:12px;\"><span style=\"font-size:14px;font-weight:bold;\">i<\/span>贴吧<\/span><\/a>");
document.writeln("<a href=\"javascript:window.open(\'http:\/\/cang.baidu.com\/do\/add?it=\'+encodeURIComponent(document.title.substring(0,76)+' - TechWeb')+\'&iu=\'+encodeURIComponent(location.href)+\'&fr=ien#nw=1\',\'_blank\',\'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes\'); void 0\" style=\"font-size:12px;font-weight:normal\"><IMG alt=添加到百度搜藏 src=\"http:\/\/cang.baidu.com\/-\/remote\/fav1.jpg\" align=absMiddle border=0> 百度搜藏<\/a> ");
document.writeln("<a style=\"font-size:14px;\" href=\"javascript:window.open(\'http:\/\/shuqian.qq.com\/post?title=\'+encodeURIComponent(document.title+' - TechWeb')+\'&uri=\'+encodeURIComponent(document.location.href)+\'&jumpback=2&noui=1\',\'favit\',\'width=960,height=600,left=50,top=50,toolbar=no,menubar=no,location=no,scrollbars=yes,status=yes,resizable=yes\');void(0)\"><img src=\"http:\/\/shuqian.qq.com\/img\/add.gif\" alt=\"收藏到QQ书签\" align=\"absmiddle\" border=\"0\" style=\"margin-right:2px;\"><span style=\"font-size:12px;\"> QQ书签<\/span><\/a> ");


 var sendT = {
	getHeader : function(){
		return document.title;
	},
	getFirstImgSrc : function(){
		var allPageTags=document.getElementsByTagName("div");
		for (var i=0; i<allPageTags.length;i++) {
			if (allPageTags[i].className=='content_txt') {
				if (allPageTags[i].getElementsByTagName("img")[0] && allPageTags[i].getElementsByTagName("img")[0].width > 100)
				{
					return allPageTags[i].getElementsByTagName("img")[0].src;
				}
				else
				{
					return null;
				}
				
			}
		}
	},
	getContent : function(){
		var allPageTagss=document.getElementsByTagName("div");	
		for (var i=0; i<allPageTagss.length;i++) {
			if (allPageTagss[i].className=='content') {
				return allPageTagss[i].innerHTML;
			}else if(allPageTagss[i].className=='content_txt'){
				
				return allPageTagss[i].getElementsByTagName("P")[0].innerHTML;
			}		
			
		}
	}
}
 document.getElementById("fxwb").onclick=function(){
 (function(s,d,e,r,l,p,t,z,c){
	 var f='http://service.t.sina.com.cn/share/share.php?appkey=1849954540&ralateUid=1642471052',u=z||d.location,p=['&url=',e(u),'&title=',e(sendT.getHeader())+' - TechWeb ','&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');
	 function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');
	 };
	 if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();
})(screen,document,encodeURIComponent,'TECHWEB','http://www.techweb.com.cn/',sendT.getFirstImgSrc(),null,null,null);
}

document.getElementById("fxitb").onclick=function(){
	//alert(sendT.getContent());
	//alert(window.location.href);

		var itieba_share = 'http://tieba.baidu.com/i/sys/share?link=' + encodeURIComponent(window.location.href)
		+'&type=' + encodeURIComponent('text')
		+'&title=' + encodeURIComponent(sendT.getHeader())+' - TechWeb '
		+'&content=' + encodeURIComponent(sendT.getContent());
		if (!window.open(itieba_share, 'itieba', 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=626,height=436')) 
		{
			location.href = itieba_share;
		}		
  
}

function posttoWb() {
		//var _tt = document.title.split('-')[0].replace(/\s+$/, '');
		var _t = encodeURI(document.title+' - TechWeb');
		var _url = encodeURI(window.location);
		var _source = 1000012;
		var _site = encodeURI('www.techweb.com.cn');
		var _pic = '';
		var _u = 'http://v.t.qq.com/share/share.php?appkey=217896&title='+_t+'&url='+_url+'&source='+_source+'&site='+_site+'&pic='+_pic;
		window.open( _u,'转播到腾讯微博', 'width=700, height=580, top=320, left=180, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
	}
