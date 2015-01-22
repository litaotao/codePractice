
(function(){var return_code_report={report:function(data){if(!data){return;}
var needData=['domain','cgi','code','time'];for(var i=0,len=needData.length;i<len;i++){if(!(needData[i]in data)){return;}}
if('type'in data){data.type=data.type||3;}else{data.type=data.code==0?1:3;}
data.r=Math.random();data.time=~~data.time;setTimeout(function(){var img=document.createElement('img');var s='';for(var e in data){s+=''+e+'='+data[e]+'&';}
if(s.length>1E3){return;}
img.src='http://c.isdspeed.qq.com/code.cgi?'+s;},0);}};if(window.seajs&&window.define){define('app/v8/utils/return_code_report/1.0',null,function(require,exports,module){return return_code_report;});}else{window.ReturnCodeReport=return_code_report;}})();/*  |xGv00|55c8c8053560ed648981b89b1fe0fc7d */