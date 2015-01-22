var img_url = 'http://app.myzaker.com/news/images/logo_icon.png';
var wx_share_desc = delHtmlTag($('#content').html());
//微信的设置
function shareFriend() {
    WeixinJSBridge.invoke("sendAppMessage", {
            img_url: img_url,
            img_width: "200",
            img_height: "200",
            link: wx_share_link,
            desc: wx_share_link,
            title: wx_share_title,
            appid: 'wx244828db3afc50cc'
    },
    function(e) {})
}
function shareTimeline() {
    WeixinJSBridge.invoke("shareTimeline", {
            img_url: img_url,
            img_width: "200",
            img_height: "200",
            link: wx_share_link,
            desc: wx_share_link,
            title: wx_share_title,
            "appid": 'wx244828db3afc50cc'
    },
    function(e) {})
}


var onBridgeReady =  function () {  

    WeixinJSBridge.call("hideToolbar");
    //WeixinJSBridge.call("hideOptionMenu");  
    WeixinJSBridge.on("menu:share:appmessage",
        function(e) {
            shareFriend();
    });
    WeixinJSBridge.on("menu:share:timeline",
        function(e) {
            shareTimeline();
    });


};  

if(document.addEventListener){  
    document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);  
} else if(document.attachEvent){  
document.attachEvent("WeixinJSBridgeReady"   , onBridgeReady);  
document.attachEvent("onWeixinJSBridgeReady" , onBridgeReady);  
}  
function delHtmlTag(str){
    return str.replace(/<[^>]+>/g,"");
} 

