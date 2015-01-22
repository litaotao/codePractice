
Do(function(){
  var popup;var nav=$("#db-global-nav");var more=nav.find(".bn-more");function handleShowMoreActive(c){var a=$(c.currentTarget);var b=a.parent();if(popup){popup.parent().removeClass("more-active");if($.contains(b[0],popup[0])){popup=null;return}}b.addClass("more-active");popup=b.find(".more-items");popup.trigger("moreitem:show")}nav.delegate(".bn-more, .top-nav-reminder .lnk-remind","click",function(a){a.preventDefault();handleShowMoreActive(a);return}).delegate(".lnk-doubanapp","mouseenter",function(b){var a=$(this);if(!a.parent().hasClass("more-active")){handleShowMoreActive(b)}}).delegate(".top-nav-doubanapp","mouseleave",function(){var b=$(this);var a=b.find(".lnk-doubanapp");if(popup){b.removeClass("more-active");if($.contains(b[0],popup[0])){popup=null}}});$(document).click(function(a){if($(a.target).closest(".more-items").length||$(a.target).closest(".more-active").length){return}if(popup){popup.parent().removeClass("more-active");popup=null}});
});

  Do(function(){
    var nav = $('#db-nav-sns');
    var inp=$("#inp-query"),label=inp.closest(".nav-search").find("label");if("placeholder" in inp[0]){label.hide();inp.attr("placeholder",label.text())}else{if(inp.val()!==""){label.hide()}inp.parent().click(function(){inp.focus();label.hide()}).end().focusin(function(){label.hide()}).focusout(function(){if($.trim(this.value)===""){label.show()}else{label.hide()}}).keydown(function(){label.hide()})}inp.parents("form").submit(function(){if(!$.trim(inp.val()).length){return false}});nav.find(".lnk-more, .lnk-account").click(function(b){b.preventDefault();var d,a=$(this),c=a.hasClass("lnk-more")?$("#db-productions"):$("#db-usr-setting");if(!c.data("init")){d=a.offset();c.css({"margin-left":(d.left-$(window).width()/2-c.width()+a.width()+parseInt(a.css("padding-right"),10))+"px",left:"50%",top:d.top+a.height()+"px"});c.data("init",1);c.hide();$("body").click(function(g){var f=$(g.target);if(f.hasClass("lnk-more")||f.hasClass("lnk-account")||f.closest("#db-usr-setting").length||f.closest("#db-productions").length){return}c.hide()})}if(c.css("display")==="none"){$(".dropdown").hide();c.show()}else{$(".dropdown").hide()}});
  });
  
  var tagsug_src = "http://img3.douban.com/f/shire/4605e734f440a79abdf4866eb4e6c785dfefbba1/js/lib/tagsug.js";
  Do(function(){window.Do=window.Do||function(i){typeof i=="function"&&setTimeout(i,0)};Do.add_js=function h(j){var i=document.createElement("script");i.src=j;document.getElementsByTagName("head")[0].appendChild(i)};Do.add_css=function a(k,j){var i=document.createElement("link");i.rel="stylesheet";i.href=k;document.getElementsByTagName("head")[0].appendChild(i)};Do.check_js=function d(i,k){var j=i();if(j){k(j)}else{setTimeout(function(){d(i,k)},33)}};var e=$("#inp-query,#search_text"),f,c,g,b={q:"",items:[{num:"",name:"日记",cat:1015},{num:"",name:"成员",cat:1005},{num:"",name:"图片",cat:1025},{num:"",name:"小站",cat:2012},{num:"",name:"电影",cat:1002},{num:"",name:"书籍",cat:1001},{num:"",name:"音乐",cat:1003},{num:"",name:"移动应用",cat:3064}],source:"suggest"};e.one("focus",function(){Do.add_js(tagsug_src);Do.check_js(function(){return $.fn.tagsug&&window.Mustache},function(){c=e.tagsug({wordLimit:30,url:"/j/search_suggest?q=",arrName:"items",max:null,haltLink:false,sugOffset:{left:-6,top:26},listTmpl:'<ul class="sug-kind-search"><li class="title"><a href="javascript: void 0;">搜索 “<span>{{q}}</span>” 相关的：</a></li>{{#items}}<li><a href="/search?cat={{cat}}&q={{q}}&source={{source}}"><span>{{num}}</span>{{name}}</a></li>{{/items}}</ul>',leadChar:"",hideChar:["@"],alignLeft:true,queryIncludingSpace:true,tips:null})._tagsug_api[0];c.on("query",function(j,i){if(i!==f){b.q=f=i;c._anterior_txt="";c.showSug(b)}});g=e.tagsug({max:8,useUid:true,tips:"@某人，直达其个人主页"})._tagsug_api[0];g.on("choose",function(j,i){window.location="/people/"+i+"/"})})});$("body").click(function(j){var i=$("#db-tagsug-list");if(i.length&&!$.contains(i[0],j.target)){i.hide()}if($(j.target).is("#db-tagsug-list .title a")){$(".nav-search form").submit()}})});

    Do(function(){
      (function(){var f=$(document);var e=$("html");var d=$("body");var c={display_close:true};var a=['<div class="ui-overlay-mask" style="display:none;">','<div class="ui-overlay-x"></div>                   ','<div class="ui-overlay-container">                 ','  <a href="#" class="ui-overlay-close" style="display:none;">&times;</a> ','  <div class="hd"></div>                   ','  <div class="bd"></div>                   ',"</div>                                     ","</div>                                     "].join("");var g='<div class="ui-overlay-anchor"></div>';function b(){this.init()}b.prototype={init:function(){var h=this;this.config=c;this.mask=$(a).appendTo(d);this.anchor=$(g).prependTo(d);this.container=this.mask.find(".ui-overlay-container");this.header=this.mask.find(".ui-overlay-container > .hd");this.body=this.mask.find(".ui-overlay-container > .bd");this.bnClose=this.mask.find(".ui-overlay-container > .ui-overlay-close");this.bnClose.click(function(i){i.preventDefault();h.close()});f.delegate(".ui-overlay-mask","click",function(i){if(h.config.forbidden_mask_click){return}if(i.target==h.container[0]||$.contains(h.container[0],i.target)){return}h.close()});f.bind("keyup",function(i){if(h.config.forbidden_hotkey_cancel){return}if(!(/input|textarea/i.test(i.target.tagName))&&i.keyCode===27){h.close()}})},open:function(h,j){var i=this.docTop=f.scrollTop();this.anchor.show().css({marginTop:-i});e.addClass("ui-overlay-show");this.mask.show();if(this.config.display_close){this.bnClose.show()}this.setContent(h||"");if(j){j.call(this)}this.container.trigger("overlay:open")},close:function(){e.removeClass("ui-overlay-show");this.anchor.hide();f.scrollTop(this.docTop);this.mask.hide();this.container.trigger("overlay:close")},bind:function(h,i){this.container.bind(h,i)},setConfig:function(h){this.config=$.extend({},c,h||{})},setHeader:function(h){this.header.html(h)},setContent:function(h){this.body.html(h)}};if(!$.overlay){$.overlay=new b()}})();(function(){var a='<iframe src="javascript:;" frameborder="0" scrolling="no" width="{{width}}" height="{{height}}"></iframe>';var b=480;var d=340;function f(i,k,j){var h=curTime=new Date();h.setTime(curTime.getTime()+j);document.cookie=i+"="+escape(k)+((j==null)?"":";expires="+h.toGMTString())+";domain=.douban.com;path=/"}function c(h){if(document.cookie.length>0){var j,i=document.cookie.indexOf(h+"=");if(i!=-1){i=i+h.length+1;j=document.cookie.indexOf(";",i);if(j==-1){j=document.cookie.length}return unescape(document.cookie.substring(i,j))}}return""}var e=function(j,m,k){var i={login:"/accounts/popup/login",reg:"/accounts/popup/register",switch_user:"/accounts/popup/login"};var h=$.overlay.body.find("iframe"),l;l=i[j]+"?redir="+m;l+=k!==undefined?"&source="+k:"";h.attr("src",l)};var g=function(h){return function(l){l.preventDefault();var n=$(this);var i=n.data();var m=i.params?(typeof window[i.params]=="function"?window[i.params].call(this):i.params):null;var j=self.location.href;if(m){j=(j.indexOf("?")+1)?j+"&"+m:j+"?"+m}if(i.width>$("body").width()){i.width=$("body").width()}var k=a.replace("{{width}}",i.width||b).replace("{{height}}",i.height||d);if(typeof i.key==="undefined"||!c(i.key)){$.overlay.open(k,function(){h(encodeURIComponent(j),i.source)});if(i.key&&i.cookie&&i.expired){$.overlay.bind("overlay:close",function(){f(i.key,i.cookie,i.expired)})}}}};$(document).delegate(".lnk-show-login","click",g(function(h,i){e("login",h,i)})).delegate(".lnk-show-reg","click",g(function(h,i){e("reg",h,i)})).delegate(".lnk-switch-user","click",g(function(h,i){e("switch_user",encodeURIComponent(h),i)}))})();
    });
    
        Do(function(){
            var $regUp = $('#reg-up');
            if ($regUp.length) {
                $regUp.find('.lnk-show-reg').trigger('click');
            }
        });
    
var douban_src = 'http://www.douban.com';
var fav_type = 'default';
var fav_url = '#';

              Do(function(){
                $("html").delegate(".thing-like-note-fav .btn-fav","click",function(d){var c=$(this);var a=c.attr("data-object_id");var b=c.hasClass("fav-cancel")?1:0;if(c.hasClass("stat-processing")){return}$.ajax({type:b?"delete":"post",url:"/j/note/like_thing_note",data:{note_id:a,ck:get_cookie("ck")},dataType:"json",success:function(e){}})});
              });
            
Do(function() {
    $(document).delegate('.mod-usercard .lnk-contact-add', 'click', function(e) {
        e.preventDefault();
        var el = $(this);
        if (el.hasClass('processing')) {
            return;
        }
        el.addClass('processing');
        $.post_withck('/j/contact/addcontact', {
        people: el.data('id'),
        from: el.data('source')
        }, function(r) {
            el.removeClass('processing');
            if (!r.result) {
                return;
            }
            el.replaceWith('<span class="usercard-followed">已关注</span>');
        }, 'json');
    });
});
