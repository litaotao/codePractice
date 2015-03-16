$(document).ready(function() {
    var title,
        url = window.location.href,
        pic,
        facebook_share;

    var urls = {};

    pic = "/wp-content/themes/ustack/images/logo.png";
    $(".share span").click(function() {
        if ($(this).closest('.entry-header').find('h1').length) {
            title = encodeURIComponent($(this).closest('.entry-header').find('h1').text());
            if ($(this).closest('.entry-header').find('h1').children('a').length) {
                facebook_share = encodeURIComponent($(this).closest('.entry-header').find('h1').children('a').attr('href'));
            } else {
                facebook_share = encodeURIComponent(window.location.href);
            }
        } else if ($(this).closest('article').find('h1:eq(0)').length) {
            title = encodeURIComponent($(this).closest('article').find('h1:eq(0)').text());
            facebook_share = encodeURIComponent(window.location.href);
        }
        if ($(this).closest('article').find('img').length) {
            pic = $(this).closest('article').find('img').attr('src');
        }
        urls.tencent = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title + "&url=" + url + "&pic=" + pic;
        urls.sina = "http://v.t.sina.com.cn/share/share.php?title=" + title + "&url=" + url + "&pic=" + pic;
        urls.google = "https://plus.google.com/share?url=" + url;
        urls.twitter = "https://twitter.com/intent/tweet?status=" + title + " " + url;
        urls.facebook = "https://www.facebook.com/sharer/sharer.php?u=" + facebook_share;
        var key = this.className.replace("-ico", "");
        window.open(urls[key], "_blank", "top=100,left=200,width=648,height=618");
    });
});