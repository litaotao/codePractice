function hxShare2011(title) {
  var context = (title && HX.$S.trim(title)!='')?title:document.title;
  context = context.replace(/%/g,'£¥');
  var url = document.location.href;
  var cu = url;
  var brower = navigator.userAgent.toLowerCase();
  var strongIE = (HX.$B.IE && (brower.indexOf('se')!=-1 || brower.indexOf('maxthon')!=-1 || brower.indexOf('tencent')!=-1));
  url = (url.indexOf('?')!=-1)?(url+'&fromweb=share'):(url+'?fromweb=share');
  var left = 0;
  if(HX.$('foot2010') || HX.$('zt_foot2010') || HX.$('footer') || HX.$('blog_foot2010')) {
	  var obj = HX.$('foot2010') || HX.$('zt_foot2010') || HX.$('footer') || HX.$('blog_foot2010');
	  left = (HX.$E.left(obj)<=21)?0:(HX.$E.left(obj)-21);
	  if(left!=0 && HX.$B.IE && !strongIE) left-=2;
	  }
  var fragment = document.createDocumentFragment();
  var con = HX.$E.create('div',fragment);
  con.id = 'hx_share20110711';
  con.style.left = left+'px';
  var panel = HX.$E.create('div',con);
  panel.id = 'share_panel0711';
  panel.style.display = 'none';
  panel.style.width = '1px';
  var panel_con = HX.$E.create('div',panel);
  var opt = HX.$E.create('div',con);
  opt.id = 'share_opt0711';
  panel_con.innerHTML = '<iframe src="" id="shareFrame0711" style="display:none;"></iframe><ul><li><a href="http://t.hexun.com/channel/shareweb.aspx?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(context)+'" target="_blank" class="hx0711" onclick=hxShareCout2011("'+cu+'","1")>ºÍÑ¶Î¢²©</a></li><li><a href="http://t.sohu.com/third/post.jsp?&url='+escape(url)+'&title='+escape(context)+'" target="_blank" class="sh0711" onclick=hxShareCout2011("'+cu+'","4")>ËÑºüÎ¢²©</a></li><li><a href="http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(context)+'&url='+encodeURIComponent(url)+'&appkey=1362842923" target="_blank" class="sina0711" onclick=hxShareCout2011("'+cu+'","2")>ÐÂÀËÎ¢²©</a></li><li><a href="http://share.renren.com/share/buttonshare.do?link='+encodeURIComponent(url)+'&title='+encodeURIComponent(context)+'" target="_blank" class="rr0711" onclick=hxShareCout2011("'+cu+'","5")>ÈËÈËÍø</a></li><li><a href="http://v.t.qq.com/share/share.php?url='+encodeURIComponent(url)+'&appkey='+encodeURI("19b6600725374fbcb5dc4774c96b7b5d")+'&site=http://www.hexun.com'+'&pic='+'&title='+encodeURI(context)+'" target="_blank" class="qqwb0711" onclick=hxShareCout2011("'+cu+'","3")>ÌÚÑ¶Î¢²©</a></li><li><a href="http://www.douban.com/recommend/?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(context)+'" target="_blank" class="db0711" onclick=hxShareCout2011("'+cu+'","6")>¶¹°êÍø</a></li><li><a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(url)+'&desc='+encodeURIComponent(context)+'" target="_blank" class="qqkj0711" onclick=hxShareCout2011("'+cu+'","4")>QQ¿Õ¼ä</a></li><li><a href="http://go.10086.cn/ishare.do?m=t&u='+encodeURIComponent(url)+'&t='+encodeURIComponent(context)+'&sid=6295c13d16170cd3930687d8156ed4a0" target="_blank" class="sj0711" onclick=hxShareCout2011("'+cu+'","8")>ÊÖ»ú¶ÌÐÅ</a></li></ul>';
  var optSpan = HX.$E.create('span',opt);
  document.body.appendChild(fragment);
   var fx = new HX.Animator({
           onComplete:function() {
			   if(parseInt(panel.style.width)==190) optSpan.className = 'open';
			   else {
				   optSpan.className = '';
				   panel.style.display = 'none';
			      }
			   }
        });										  
  fx.addSubject(new NumSubject(panel, 'width',1,190));
  HX.$V.bind(opt,'mouseover',function(){
	  panel.style.display = '';
	  if(parseInt(panel.style.width)==1) 
	  fx.toggle();
  });
  HX.$V.bind(opt,'click',function(){
	  panel.style.display = '';
	  if(panel.style.width && parseInt(panel.style.width)==1) 
	  fx.toggle();
  });  
  HX.$V.bind(document,'mouseover',function(e){
	var e = e?e:window.event;
	var s = e.srcElement || e.target;
	if((s.parentNode && s.parentNode.id && s.parentNode.id=='hx_share20110711') || (s.parentNode && s.parentNode.parentNode && s.parentNode.parentNode.parentNode && s.parentNode.parentNode.parentNode.parentNode && s.parentNode.parentNode.parentNode.parentNode.id && s.parentNode.parentNode.parentNode.parentNode.id=='share_panel0711')) return;
	else if(panel.style.width && parseInt(panel.style.width)==190) fx.toggle();
  });
  HX.$V.bind(window,'resize',function(){
	  var left = 0;
      if(HX.$('foot2010')|| HX.$('zt_foot2010') || HX.$('footer') || HX.$('blog_foot2010')) {
	    var obj = HX.$('foot2010')|| HX.$('zt_foot2010') || HX.$('footer') || HX.$('blog_foot2010');
	    left = (HX.$E.left(obj)<=21)?0:(HX.$E.left(obj)-21);
		if(left!=0 && HX.$B.IE && !strongIE) left-=2;
	    }
	  con.style.left = left+'px';
	});
}

function hxShareCout2011(url,id) {
	  HX.$('shareFrame0711').src = 'http://law.hexun.com/tempfolder/c.jsp?url='+url+'&from='+id;
	}