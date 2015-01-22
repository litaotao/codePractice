document.domain ="cnw.com.cn";

function Trim(str) { 
 var re = /\s*(\S[^\0]*\S)\s*/; 
 re.exec(str); 
 return RegExp.$1; 
}
String.prototype.len=function()         
 {                 
  return this.replace(/[^\x00-\xff]/g,"rr").length;          
}
String.prototype.sub = function(n)
{    
  var r = /[^\x00-\xff]/g;    
  if(this.replace(r, "mm").length <= n) return this;   
 // n = n - 3;    
  var m = Math.floor(n/2);    
  for(var i=m; i<this.length; i++) {    
  if(this.substr(0, i).replace(r, "mm").length>=n) {    
  return this.substr(0, i) ; }    
  } return this;   
};  