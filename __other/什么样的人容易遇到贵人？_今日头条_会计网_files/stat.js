var statSrc = document.getElementById("statjs").src;
var catid = parseInt(/catid=([0-9]*)/g.exec(statSrc)[1]);
/* cnzz */
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
switch (catid) {
    case 272:
        document.write(unescape("%3Cdiv id='cnzz_stat_icon_30081100'%3E%3C/div%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D30081100' type='text/javascript'%3E%3C/script%3E"));
        break;
    case 273:
        document.write(unescape("%3Cdiv id='cnzz_stat_icon_30081101'%3E%3C/div%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D30081101' type='text/javascript'%3E%3C/script%3E"));
        break;
}
document.write(unescape("%3Cdiv id='cnzz_stat_icon_30067228'%3E%3C/div%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D30067228' type='text/javascript'%3E%3C/script%3E"));

/**
 * 题库（域名：www.kuaiji.com/exam ）
 * @type {Number}
 */
var now_url = location.href;
if(now_url.indexOf('/exam') > 0) {
    document.write(unescape("<div style='display:none;'>%3Cscript src='" + cnzz_protocol + "hm.baidu.com/h.js%3F53263be9ef2f55c61d9c77de2899f72e' type='text/javascript'%3E%3C/script%3E</div>"));
}

if(now_url.indexOf('passport') > 0){
	document.write(unescape("%3Cspan id='cnzz_stat_icon_1253321733'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D1253321733' type='text/javascript'%3E%3C/script%3E"));
}

if(now_url.indexOf('my') > 0){
	document.write(unescape("%3Cspan id='cnzz_stat_icon_1253321733'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D1253321733' type='text/javascript'%3E%3C/script%3E"));
}


var m_video = now_url.indexOf('controller=video');
var start2 = now_url.indexOf("m.kuaiji.com");
if (m_video > -1 && start2 > -1) {
    document.write("<script type='text/javascript'>(function() { var cnzz_protocol = ((\"https:\" == document.location.protocol) ? \" https://\" : \" http://\");document.write(unescape(\"%3Cspan id='cnzz_stat_icon_30081496'%3E%3C/span%3E%3Cscript src='\" + cnzz_protocol + \"w.cnzz.com/c.php%3Fid%3D30081496%26l%3D3' type='text/javascript'%3E%3C/script%3E\"))});</script>")
}




/**
 * 手机端统计 
 * 判断cookie 中 viewer 的值， 若为mobile时，则加载wap页面的统计代码 
 */

if (start2 > -1) {
	document.write(unescape("%3Cdiv id='cnzz_stat_icon_30081902'%3E%3C/div%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/c.php%3Fid%3D30081902' type='text/javascript'%3E%3C/script%3E"));
}


document.write("<script type='text/javascript'>(function() {    var c = document.createElement('script');    c.type = 'text/javascript';    c.async =true;    c.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'pro.clicki.cn/boot/10004';    var h = document.getElementsByTagName('script')[0];    h.parentNode.insertBefore(c, h);})();</script>"
);
