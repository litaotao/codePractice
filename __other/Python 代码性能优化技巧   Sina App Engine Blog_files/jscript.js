jQuery(document).ready(function($){

  $("a").bind("focus",function(){if(this.blur)this.blur();});
  $('.rollover').rollover();
  $("a.target_blank").attr("target","_blank");


  $("#footer_menu > ul > li:last-child").addClass("last");


  $("#global_menu > ul > li:first-child").addClass("first");
  $("#global_menu > ul > li:last-child").addClass("last");
  $("#global_menu ul li:has(ul)").addClass("parent_menu");

  var n_size=$("#global_menu > ul > li").size();
  var aWidth = 1000/n_size;
  $("#global_menu > ul > li").css("width", aWidth+"px");
  $("#global_menu ul ul li").css("width", (aWidth+25)+"px");

  $("#global_menu ul li").hover(function(){
   $(">ul:not(:animated)",this).slideDown("fast");
   $(this).addClass("active_menu");
   if ($(this).hasClass("first"))
    $(this).addClass("active_menu_first");
   if ($(this).hasClass("last"))
    $(this).addClass("active_menu_last");
  },
  function(){
   $(">ul",this).slideUp("fast");
   $(this).removeClass("active_menu");
   if ($(this).hasClass("active_menu_first"))
    $(this).removeClass("active_menu_first");
   if ($(this).hasClass("active_menu_last"))
    $(this).removeClass("active_menu_last");
  });


  $("#header_menu ul li").hover(function(){
   $(">ul:not(:animated)",this).slideDown("fast");
   },
   function(){
   $(">ul",this).slideUp("fast");
  });
  $("#header_menu ul li:has(ul)").addClass("parent_menu");


  $("#comment_area ol > li:even").addClass("even_comment");
  $("#comment_area ol > li:odd").addClass("odd_comment");
  $(".even_comment > .children > li").addClass("even_comment_children");
  $(".odd_comment > .children > li").addClass("odd_comment_children");
  $(".even_comment_children > .children > li").addClass("odd_comment_children");
  $(".odd_comment_children > .children > li").addClass("even_comment_children");
  $(".even_comment_children > .children > li").addClass("odd_comment_children");
  $(".odd_comment_children > .children > li").addClass("even_comment_children");

  $("#trackback_switch").click(function(){
    $("#comment_switch").removeClass("comment_switch_active");
    $(this).addClass("comment_switch_active");
    $("#comment_area").animate({opacity: 'hide'}, 0);
    $("#trackback_area").animate({opacity: 'show'}, 1000);
    return false;
  });

  $("#comment_switch").click(function(){
    $("#trackback_switch").removeClass("comment_switch_active");
    $(this).addClass("comment_switch_active");
    $("#trackback_area").animate({opacity: 'hide'}, 0);
    $("#comment_area").animate({opacity: 'show'}, 1000);
    return false;
  });

  $("div.post:first").addClass("first_post");
  $("div.side_widget:first").addClass("first_widget");




});