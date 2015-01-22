//is_recomment_layer = true;
var layer_zoom = 1;
var bdy = (document.documentElement&&document.documentElement.clientWidth)?document.documentElement:document.body;
var isIE6=($.browser.msie && ($.browser.version == "6.0") && !$.support.style)?true:false;
var isXHTML=document.compatMode=="CSS1Compat"?true:false;
var recomment_bg = recomment_bg || undefined;
var recomment_clickURL = recomment_clickURL || "";
var h1,h2;
if(recomment_bg !== undefined){
	h1 = 305;
	h2 = 85;
}else{
	h1 = 250;
	h2 = 30;
}

var setFloat = function() {
	if (!is_recomment_layer) {
		return false;
	}
	if ($('#blog_recoment_layer') != null){
		var smTagObj = $('#blog_recoment_layer');
		if(isIE6||!isXHTML) {
			smTagObj.css("position", "absolute");
			if(layer_zoom == 1) {
				smTagObj.css("top", bdy.scrollTop+bdy.offsetHeight-h1+"px");
			} else {
				smTagObj.css("top", bdy.scrollTop+bdy.offsetHeight-h2+"px");
			}
		} else {
			smTagObj.css("position", "fixed");
		}
		smTagObj.css("right", 5+"px");
		smTagObj.css("display", "block");
	}
};

if(recomment_bg !== undefined && $('#blog_recoment_layer')!=null){
	var blog_recoment_layer = $("#blog_recoment_layer");
	var title = $("#blog_recoment_layer .title");
	var con = $("#blog_recoment_layer .con");
	var t = title[0];
	for(var i = 0; i < t.childNodes.length; i++){
		if(t.childNodes[i].nodeType === 3){
			t.removeChild(t.childNodes[i]);
		}
	}
	blog_recoment_layer.css({
		border:"1px solid #CCC",
		width:"303px",
		height:"295px",
		backgroundImage:"url(" + recomment_bg + ")",
		cursor:"pointer"
	})
	title.click(function(event){
		window.open(recomment_clickURL);
		event.stopPropagation();
	});
	title.append("<div style='width:59px; height:59px; position: absolute; background: url(http://y3.ifengimg.com/7453de49fefe2d71/2013/1022/bobaotuijian.gif) no-repeat 0 0;'></div>")
	title.css("backgroundImage", "none");
	title.css("height","80px");
	title.css("padding","0");
	con.css("margin","0 5px 5px 5px");
	con.css("width","281px");
	con.css("border","0");
	$("#img_layer_zoom").attr("src", "http://y0.ifengimg.com/7453de49fefe2d71/2013/0829/small.gif");
	$('#blog_recoment_layer_close img').attr("src", "http://y0.ifengimg.com/7453de49fefe2d71/2013/0829/close.gif");
}
if ($('#blog_recoment_layer_close')!= null) {
	$('#blog_recoment_layer_close').on("click", function() {$('#blog_recoment_layer').hide();is_recomment_layer = false; return false;});
}
if ($('#blog_recoment_layer_narrow') != null) {
	$('#blog_recoment_layer_narrow').on("click", function() {
		if(layer_zoom == 1) {
			if(isIE6||!isXHTML) {
				$('#blog_recoment_layer').css("top", bdy.scrollTop+bdy.offsetHeight-h2+"px");
			}
			if(recomment_bg !== undefined){
				$('#blog_recoment_layer').animate({bottom:"-217px"},"slow");
				$('#img_layer_zoom').attr("src", "http://y0.ifengimg.com/7453de49fefe2d71/2013/0829/big.gif");
			}else{
				$('#blog_recoment_layer').animate({bottom:"-212px"},"slow");
				$('#img_layer_zoom').attr("src", HTTP_FILES_ROOT + 'image/main_blog/v3_images/restore.gif');
			}
			layer_zoom = 0;
			return false;
		} else {
			if(isIE6||!isXHTML) {
				var smTagObj = $('#blog_recoment_layer').css("top", bdy.scrollTop+bdy.offsetHeight-h1+"px");
			}
			$('#blog_recoment_layer').animate({bottom:"5px"},"slow");
			if(recomment_bg !== undefined){
				$('#img_layer_zoom').attr("src", "http://y0.ifengimg.com/7453de49fefe2d71/2013/0829/small.gif");
			}else{
				$('#img_layer_zoom').attr("src", HTTP_FILES_ROOT + 'image/main_blog/v3_images/narrow.gif');
			}
			layer_zoom = 1;
			return false;
		}
	});
}
window.onscroll = setFloat;
window.onresize = setFloat;
window.onload = setFloat;
