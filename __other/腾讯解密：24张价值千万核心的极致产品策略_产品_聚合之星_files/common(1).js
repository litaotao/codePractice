$(function () {

  //搜索
  $(".toggle-search").click(function() {
      $(".toggle-search").toggleClass("active");
      $(".search-expand").fadeToggle(250);
      setTimeout(function() {
          $(".search-expand input").focus();
      }, 300);
  });
  
  //
  $(".screen-nav").click(function(){
    $(".navbar .nav").slideToggle(300);
  });
  
	//侧栏跟随
	var $sidebar = $(".sidebar .widget:last-of-type"),
		offsetTop = 0,copyTop = 0,
		scrollt = 0;
	$(window).scroll(function () {
		scrollt = $(window).scrollTop();
    if (offsetTop==0) {offsetTop = $sidebar.offset().top;copyTop = $(".copy").offset().top};
    if (scrollt + $sidebar.height() + 120 > copyTop) {
        $sidebar.stop().animate({
          marginTop: copyTop - 120 - offsetTop - $sidebar.height() + 25
        });
        return false;
    };
    if (scrollt > offsetTop) {
        $sidebar.stop().animate({
          marginTop: scrollt - offsetTop + 25
        });
    } else {
      $sidebar.stop().animate({
        marginTop: 15
      });
    };
		return false;
	});
  
  $("embed,object").parent().addClass("embed-responsive embed-responsive-4by3");
  0!=$(".copy").length&&/zblogcn.+wdssmq/.test($(".copy").html())||alert("不版留权是不道厚的，果如你在实删要我没也办法，外另每次新更这句话会都出现，正反是要死逼症迫强不如把就这段话顺的序乱打");


  $(".nav a").each(function(){
    if (location.href ==$(this).attr("href")) $(this).addClass("active");
  });

  var tt = setTimeout(function(){},500);
  $(".article-layer-box,.share-btn-box").mouseenter(function(){
    clearTimeout(tt);
    $(".article-layer-box").show();
  }).mouseleave(function(){
    tt = setTimeout(function () {
      $(".article-layer-box").hide();
    }, 500);
  });
  
});