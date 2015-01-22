//获取上级来源
var tj_r = 0;
if (document.referrer.length > 0) {
    tj_r = encodeURIComponent(document.referrer);
}
try {
    if (tj_r.length == 0 && opener.location.href.length > 0) {
        tj_r =   encodeURIComponent(opener.location.href);
    }
} catch (e) {}

/*需要页面上填写开始*/
//作者
var tj_a=typeof(editor)== 'undefined' || editor=="" ? 'techweb' : encodeURIComponent(editor);
//标题
var tj_t=typeof(title)== 'undefined' || title=="" ? encodeURIComponent(document.title) : encodeURIComponent(title);
//文章分类名(栏目名称)
var tj_sn=typeof(catname)=='undefined' || catname==""?"tw":encodeURIComponent(catname);
//文章类型（需要区分是文章还是应用1：新闻列表，2：新闻文章，3：应用列表，4：应用列表）
var tj_c=typeof(type)=='undefined' || type==""?1:type;
//文章id
var tj_i=typeof(contentid)=='undefined' || contentid==""?0:contentid;
/*需要页面上填写结束*/

//获取窗口分辨率
//屏幕分辨率的高_屏幕分辨率的宽_屏幕可用工作区高度_屏幕可用工作区宽度_你的屏幕设置是
var tj_w=window.screen.width + "*" + window.screen.height+ "_" + window.screen.availWidth+"*"+ window.screen.availHeight+"_"+ window.screen.colorDepth;

//创建一个新链接
var tj_create = document.createElement("script");
//var c=new Image();
tj_create.src = "http://analytics.techweb.com.cn/tj/index/r/"+tj_r+"/w/"+tj_w+"/a/"+tj_a+"/t/"+tj_t+"/c/"+tj_c+"/sn/"+tj_sn+"/i/"+tj_i+"/rom/"+(new Date().getTime());

var tj_script = document.getElementsByTagName("script")[0];
tj_script.parentNode.insertBefore(tj_create,tj_script.nextSibling);
