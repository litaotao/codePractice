



















if(typeof doyoo=='undefined' || !doyoo){
var d_genId=function(){
    var id ='',ids='0123456789abcdef';
    for(var i=0;i<34;i++){ id+=ids.charAt(Math.floor(Math.random()*16));  }  return id;
};
var doyoo={
env:{
secure:false,
mon:'http://m9104.talk99.cn/monitor',
chat:'http://zgc099a.talk99.cn/chat',
file:'http://static.soperson.com/131221',
compId:10020604,
confId:10021664,
vId:d_genId(),
lang:'',
fixFlash:1,
subComp:0,
_mark:'0a3832338fecbd41e5d015a8a16b155aaffb813464c6f0a8bf7856fce03a37907a8f6d3fef884b31'
}

, monParam:{
index:1,

title:'\u878d\u8d44\u79df\u8d41\u670d\u52a1',
text:'\u60a8\u597d\uff0c\u6b22\u8fce\u5149\u4e34\uff01\u6211\u4eec\u5c06\u4e3a\u60a8\u63d0\u4f9b\u878d\u8d44\u79df\u8d41\u516c\u53f8\u548c\u5546\u4e1a\u4fdd\u7406\u516c\u53f8\u8f6c\u8ba9\u3001\u6ce8\u518c\u3001\u8d44\u91d1\u901a\u9053\u3001\u5883\u5916\u878d\u8d44\u3001\u9879\u76ee\u5408\u4f5c\u3001\u94f6\u79df\u5408\u4f5c\u3001\u91d1\u878d\u8d44\u6e90\u5bf9\u63a5\u3001\u8bbe\u5907\u878d\u8d44\u3001\u653f\u5e9c\u5e73\u53f0\u878d\u8d44\u3001\u533b\u9662\u878d\u8d44\u7b49\u3002\u70ed\u7ebf\uff1a<strong>400 820 4563</strong> \u624b\u673a\uff1a<strong>13917374830</strong>&nbsp;\u7535\u8bdd\uff1a<strong>021-62111001 </strong>&nbsp;QQ:<strong>50526233</strong>&nbsp;&nbsp; \u5fae\u4fe1\uff1a<strong>jinrongzulin</strong> ',
auto:10,
group:'10023641',
start:'00:00',
end:'24:00',
mask:false,
status:false,
fx:1,
mini:1,
pos:1,
offShow:1,
loop:0,
autoHide:0,
hidePanel:0,
miniStyle:2,
showPhone:0,
monHideStatus:[1,1,3],
monShowOnly:''
}


, panelParam:{
category:'icon',
position:1,
vertical:180,
horizon:5


,mode:1,
target:'10023641',
online:'http://static.soperson.com/default/images/floaticon/on_line_105.gif?131127110427',
offline:'http://static.soperson.com/default/images/floaticon/off_line_105.gif?131127110427',
width:89,
height:139,
status:0,
closable:0,
regions:[],
collapse:0



}


,msgParam:{
    title:'\u9700\u8981\u878d\u8d44\u79df\u8d41\u8bf7\u7559\u8a00:',
    index:3,
    pos:1,
    group:10023641,
    delay:2
}


};

if(typeof talk99Init == 'function'){
    talk99Init(doyoo);
}


document.write('<div id="doyoo_panel"></div>');


document.write('<div id="doyoo_monitor"></div>');


document.write('<div id="talk99_message"></div>')

document.write('<div id="doyoo_share" style="display:none;"></div>');
document.write('<lin'+'k rel="stylesheet" type="text/css" href="http://static.soperson.com/131221/talk99.css?140610"></li'+'nk>');
document.write('<scr'+'ipt type="text/javascript" src="http://static.soperson.com/131221/talk99.js?141104" charset="utf-8"></scr'+'ipt>');

}

