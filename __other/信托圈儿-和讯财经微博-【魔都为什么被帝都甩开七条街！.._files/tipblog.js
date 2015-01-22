var tipBlogT = {
   //ID号
   blogId:'blogWinPanel0718',
   tId:'tWinPanel0718',
   blogFrameId:'blogWinFramel0718',
   tFrameId:'tWinFramel0718',
   bwId:'bwWinPanel0718',
   bwFrameId:'bwWinFrame0718',
   strongIE:!!(HX.$B.IE && (navigator.userAgent.toLowerCase().indexOf('se')==-1 || navigator.userAgent.toLowerCase().indexOf('maxthon')==-1 || navigator.userAgent.toLowerCase().indexOf('tencent')==-1)),   
   //Blog显示
   showBlogInfo:function(obj,url) {
	 var arr = this.getPos(obj,'blog');
     var t = arr[0];
	 var l = arr[1];    
     if(HX.$(this.blogId)) this.show(obj,HX.$(this.blogId),HX.$(this.blogFrameId),l,t,url);
	 else this.create(obj,'blog',t,l,url,this.blogFrameId,this.blogId);
   },
   //人物显示
   showRwInfo:function(obj,url) {
	   this.showBlogInfo(obj,url);
   },   
   //T显示
   showTInfo:function(obj,url) {
	 var arr = this.getPos(obj,'wb');
     var t = arr[0];
	 var l = arr[1];     
     if(HX.$(this.tId)) this.show(obj,HX.$(this.tId),HX.$(this.tFrameId),l,t,url);
	 else this.create(obj,'t',t,l,url,this.tFrameId,this.tId);
   },
   //部委显示
   showBwInfo:function(obj,url) {
	 var arr = this.getPos(obj,'bw');
     var t = arr[0];
	 var l = arr[1];
     if(HX.$(this.bwId)) this.show(obj,HX.$(this.bwId),HX.$(this.bwFrameId),l,t,url);
	 else this.create(obj,'blog',t,l,url,this.bwFrameId,this.bwId,200);	   
   },
   //确认位置
   getPos:function(obj,type) {
	  var obj_w = HX.$E.width(obj);
	  var obj_h = HX.$E.height(obj);	   
      var t = HX.$E.top(obj)+obj_h-2;
	  var exc_w = (type=='blog'||type=='bw')?256:286;
	  var exc_h = (type=='bw')?200:170;
	  if(this.strongIE) t-=2;
	  var l = HX.$E.left(obj);
	  var w = document.documentElement.clientWidth||document.body.clientWidth;
	  if(l+exc_w>w) l = l-exc_w+obj_w;
	  var h = document.documentElement.scrollHeight||document.body.scrollHeight;
	  if(t+exc_h>h) t = t-exc_h-obj_h-10;
	  return [t,l];
   },
   //显示
   show:function(obj,showPanel,framePanel,l,t,url) {
	  framePanel.src = url;
	  HX.$E.css(showPanel,{
	    display:'',
		top:t+'px',
		left:l+'px'
	  });
	  this.addEvent(obj,showPanel);
   },
   //Blog隐藏
   hideBlogInfo:function() {
      if(HX.$(this.blogId)) HX.$(this.blogId).style.display = 'none';
   },
   //T隐藏
   hideTInfo:function() {
      if(HX.$(this.tId)) HX.$(this.tId).style.display = 'none';
   },
   create:function(obj,type,t,l,url,d,id,height) {
     var w = (type=='blog')?256:286;
	 var h = (typeof height !='undefined')?height:170;
	 var p = (type=='blog')?'0 -8px':'0 -64px';
	 var frag = document.createDocumentFragment();
	 var panel = HX.$E.create('div',frag);
	 HX.$E.css(panel,{
	   position:'absolute',
	   top:t+'px',
	   left:l+'px',
	   width:w	   
	 });
	 panel.id = id;
	 /*var header = HX.$E.create('div',panel);
	 HX.$E.css(header,{
	 width:(w-2)+'px',
	 height:'5px',
	 overflow:'hidden'
	 background:'url(http://img.hexun.com/share/tip_bg_new.gif) no-repeat '+p
	 });*/
	 var bodyer = HX.$E.create('div',panel);
	 HX.$E.css(bodyer,{
	  width:(w-16)+'px',
	  height:h+'px',
	  float:'left',
	  border:'1px solid #D1D1D1',
	  //borderTop:'none',
	  padding:'6px 6px 0 6px',
	  background:'#FFF'
	 });
	 /*var panelR = HX.$E.create('div',panel);
	 HX.$E.css(panelR,{
	   width:'2px',
	   float:'left',
	   height:(h+7)+'px',
	   background:'#CCC',
	   overflow:'hidden',
	   opacity:'0.3'
	 });
	 var panelB = HX.$E.create('div',panel);
	 HX.$E.css(panelB,{
	   width:(w-2)+'px',
	   clear:'both',
	   height:'2px',
	   background:'#CCC',
	   marginLeft:'2px',
	   overflow:'hidden',
	   opacity:'0.3'
	 });*/
	 bodyer.innerHTML = '<iframe src="'+url+'" frameborder="0" scrolling="no" width="100%" height="'+h+'" id="'+d+'"></iframe>';
	 document.body.appendChild(frag);
	 this.addEvent(obj,HX.$(id));	 
   },
   addEvent:function(obj,panel) {
      panel.onmouseover = function() {
	    panel.style.display = '';
	  }
	  panel.onmouseout = function() {
	    panel.style.display = 'none';
	  }
	  obj.onmouseout = function() {
	    panel.style.display = 'none';
	  }
   }
};