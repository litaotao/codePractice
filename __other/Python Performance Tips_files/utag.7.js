//tealium universal tag - utag.7 ut4.0.201411092245, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.async=true;b.src=o.src;if(o.id){b.id=o.id}
if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}
utag.DB("Attach to "+l+": "+o.src);}};try{(function(id,loader){var u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,i;u.data={"account_id":"newrelic"};for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'){e=u.map[d].split(',');for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.myCallback=function(){u.initialized=true;for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}else{h=d.split(":");if(h.length==2&&b[h[0]]==h[1]){g=""+u.event_lookup[u.map[d]];if(g!=""){b._cevent=g}}}}
window.rtp=function(){window.rtp.q=[];window.rtp.a=u.data.account_id;}
window.rtp('send','view');window.rtp('get','campaign',true);};var tag_url="//rtp-cloud4.marketo.com/rtp-api/v1/rtp.js?";tag_url+="rh="+encodeURIComponent(b["dom.domain"]);tag_url+="&aid="+encodeURIComponent(u.data.account_id);utag.ut.libloader2({src:tag_url,cb:u.myCallback});}};utag.o[loader].loader.LOAD(id);})('7','newrelic.blog');}catch(e){}
