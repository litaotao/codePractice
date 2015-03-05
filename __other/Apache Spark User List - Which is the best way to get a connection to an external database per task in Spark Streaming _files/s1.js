try {
   var d = top.document; 
  function crsspxl(z) {
           if(d.body == null || typeof d.body == 'undefined'){
               if(z < 2500){
                   var rec = function() { crsspxl(z * 2); };
                   setTimeout(rec, z);
               }
           }
           else {
               var l = 'http://tag.crsspxl.com/s2.html?d=1294',i,j;
               try {
                   var r = (top.document) ? top.document.referrer : false;
                   r = encodeURIComponent(r);                   var a, f, q, e;
                   if (r) {
                       l += "&r=" + r;
                   }
               } catch(er) {
           }
           var u = encodeURIComponent(d.URL);
           l += "&u=" + u;
           try {
               var g=d.getElementById('crsspxl_494810001');
               if(typeof(g)!='undefined' && g!=null){
                   g.setAttribute('src', l);
               }
               else{
                   g=d.createElement('IFRAME');
                   g.width=1;
                   g.height=1;
                   g.frameBorder=0;
                   g.border=0;
                   g.marginwidth=0;
                   g.marginheight=0;
                   g.setAttribute('width', '1');
                   g.setAttribute('height', '1');
                   g.setAttribute('style', 'visibility:hidden;position:absolute;border:medium none');
                   g.setAttribute('src', l);
                   d.body.appendChild(g);
               }
           }catch(er){
       }
   }
}

try {
   crsspxl(100);
} catch(er) {
}
} catch(er) {
}
