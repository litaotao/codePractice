/*
 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var b=!0,o=null,z=!1;window.PR_SHOULD_USE_CONTINUATION=b;window.PR_TAB_WIDTH=8;window.PR_normalizedHtml=window.PR=window.prettyPrintOne=window.prettyPrint=void 0;window._pr_isIE6=function(){var x=navigator&&navigator.userAgent&&navigator.userAgent.match(/\bMSIE ([678])\./),x=x?+x[1]:z;window._pr_isIE6=function(){return x};return x};
(function(){function x(a){return a.replace(F,"&amp;").replace(G,"&lt;").replace(H,"&gt;")}function C(a,c,l){switch(a.nodeType){case 1:var m=a.tagName.toLowerCase();c.push("<",m);var i=a.attributes,q=i.length;if(q){if(l){for(var u=[],g=q;0<=--g;)u[g]=i[g];u.sort(function(a,c){return a.name<c.name?-1:a.name===c.name?0:1});i=u}for(g=0;g<q;++g)u=i[g],u.specified&&c.push(" ",u.name.toLowerCase(),'="',u.value.replace(F,"&amp;").replace(G,"&lt;").replace(H,"&gt;").replace(N,"&quot;"),'"')}c.push(">");for(i=
a.firstChild;i;i=i.nextSibling)C(i,c,l);(a.firstChild||!/^(?:br|link|img)$/.test(m))&&c.push("</",m,">");break;case 3:case 4:c.push(x(a.nodeValue))}}function I(a){function c(a){if("\\"!==a.charAt(0))return a.charCodeAt(0);switch(a.charAt(1)){case "b":return 8;case "t":return 9;case "n":return 10;case "v":return 11;case "f":return 12;case "r":return 13;case "u":case "x":return parseInt(a.substring(2),16)||a.charCodeAt(1);case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":return parseInt(a.substring(1),
8);default:return a.charCodeAt(1)}}function l(a){if(32>a)return(16>a?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if("\\"===a||"-"===a||"["===a||"]"===a)a="\\"+a;return a}function m(a){for(var k=a.substring(1,a.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),a=[],d=[],g="^"===k[0],f=g?1:0,n=k.length;f<n;++f){var j=k[f];switch(j){case "\\B":case "\\b":case "\\D":case "\\d":case "\\S":case "\\s":case "\\W":case "\\w":a.push(j);
continue}var j=c(j),e;f+2<n&&"-"===k[f+1]?(e=c(k[f+2]),f+=2):e=j;d.push([j,e]);65>e||122<j||(65>e||90<j||d.push([Math.max(65,j)|32,Math.min(e,90)|32]),97>e||122<j||d.push([Math.max(97,j)&-33,Math.min(e,122)&-33]))}d.sort(function(a,d){return a[0]-d[0]||d[1]-a[1]});k=[];j=[NaN,NaN];for(f=0;f<d.length;++f)n=d[f],n[0]<=j[1]+1?j[1]=Math.max(j[1],n[1]):k.push(j=n);d=["["];g&&d.push("^");d.push.apply(d,a);for(f=0;f<k.length;++f)n=k[f],d.push(l(n[0])),n[1]>n[0]&&(n[1]+1>n[0]&&d.push("-"),d.push(l(n[1])));
d.push("]");return d.join("")}function i(a){for(var c=a.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),d=c.length,e=[],f=0,g=0;f<d;++f){var j=c[f];"("===j?++g:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=g&&(e[j]=-1)}for(f=1;f<e.length;++f)-1===e[f]&&(e[f]=++q);for(g=f=0;f<d;++f)j=c[f],"("===j?(++g,void 0===e[g]&&(c[f]="(?:")):"\\"===j.charAt(0)&&(j=+j.substring(1))&&
j<=g&&(c[f]="\\"+e[g]);for(g=f=0;f<d;++f)"^"===c[f]&&"^"!==c[f+1]&&(c[f]="");if(a.ignoreCase&&u)for(f=0;f<d;++f)j=c[f],a=j.charAt(0),2<=j.length&&"["===a?c[f]=m(j):"\\"!==a&&(c[f]=j.replace(/[a-zA-Z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return c.join("")}for(var q=0,u=z,g=z,s=0,e=a.length;s<e;++s){var v=a[s];if(v.ignoreCase)g=b;else if(/[a-z]/i.test(v.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){u=b;g=z;break}}for(var r=[],s=0,e=a.length;s<
e;++s){v=a[s];if(v.global||v.multiline)throw Error(""+v);r.push("(?:"+i(v)+")")}return RegExp(r.join("|"),g?"gi":"g")}function O(a){var c=0;return function(l){for(var m=o,i=0,q=0,u=l.length;q<u;++q){var g=l.charAt(q);switch(g){case "\t":m||(m=[]);m.push(l.substring(i,q));i=a-c%a;for(c+=i;0<=i;i-=16)m.push("                ".substring(0,i));i=q+1;break;case "\n":c=0;break;default:++c}}if(!m)return l;m.push(l.substring(i));return m.join("")}}function D(a,c,l,m){c&&(a={source:c,basePos:a},l(a),m.push.apply(m,
a.decorations))}function y(a,c){var l={},m;(function(){for(var i=a.concat(c),g=[],q={},e=0,v=i.length;e<v;++e){var r=i[e],t=r[3];if(t)for(var k=t.length;0<=--k;)l[t.charAt(k)]=r;r=r[1];t=""+r;q.hasOwnProperty(t)||(g.push(r),q[t]=o)}g.push(/[\0-\uffff]/);m=I(g)})();var i=c.length,q=function(a){for(var g=a.source,s=a.basePos,e=[s,"pln"],v=0,g=g.match(m)||[],r={},t=0,k=g.length;t<k;++t){var d=g[t],p=r[d],f=void 0,n;if("string"===typeof p)n=z;else{var j=l[d.charAt(0)];if(j)f=d.match(j[1]),p=j[0];else{for(n=
0;n<i;++n)if(j=c[n],f=d.match(j[1])){p=j[0];break}f||(p="pln")}if((n=5<=p.length&&"lang-"===p.substring(0,5))&&!(f&&"string"===typeof f[1]))n=z,p="src";n||(r[d]=p)}j=v;v+=d.length;if(n){n=f[1];var A=d.indexOf(n),h=A+n.length;f[2]&&(h=d.length-f[2].length,A=h-n.length);p=p.substring(5);D(s+j,d.substring(0,A),q,e);D(s+j+A,n,K(p,n),e);D(s+j+h,d.substring(h),q,e)}else e.push(s+j,p)}a.decorations=e};return q}function w(a){var c=[],l=[];a.tripleQuotedStrings?c.push(["str",/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
o,"'\""]):a.multiLineStrings?c.push(["str",/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,o,"'\"`"]):c.push(["str",/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,o,"\"'"]);a.verbatimStrings&&l.push(["str",/^@\"(?:[^\"]|\"\")*(?:\"|$)/,o]);var m=a.hashComments;m&&(a.cStyleComments?(1<m?c.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,o,"#"]):c.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,
o,"#"]),l.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,o])):c.push(["com",/^#[^\r\n]*/,o,"#"]));a.cStyleComments&&(l.push(["com",/^\/\/[^\r\n]*/,o]),l.push(["com",/^\/\*[\s\S]*?(?:\*\/|$)/,o]));a.regexLiterals&&l.push(["lang-regex",RegExp("^"+P+"(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);a=a.keywords.replace(/^\s+|\s+$/g,"");a.length&&l.push(["kwd",RegExp("^(?:"+a.replace(/\s+/g,"|")+")\\b"),o]);c.push(["pln",
/^\s+/,o," \r\n\t\u00a0"]);l.push(["lit",/^@[a-z_$][a-z_$@0-9]*/i,o],["typ",/^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/,o],["pln",/^[a-z_$][a-z_$@0-9]*/i,o],["lit",/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,o,"0123456789"],["pun",/^.[^\s\w\.$@\'\"\`\/\#]*/,o]);return y(c,l)}function Q(a){function c(a){if(a>s){e&&e!==v&&(g.push("</span>"),e=o);!e&&v&&(e=v,g.push('<span class="',e,'">'));var c=x(k(l.substring(s,a))).replace(j?p:d,"$1&#160;");j=n.test(c);g.push(c.replace(f,w));
s=a}}var l=a.source,m=a.extractedTags,i=a.decorations,q=a.numberLines,u=a.sourceNode,g=[],s=0,e=o,v=o,r=0,t=0,k=O(window.PR_TAB_WIDTH),d=/([\r\n ]) /g,p=/(^| ) /gm,f=/\r\n?|\n/g,n=/[ \r\n]$/,j=b,h=window._pr_isIE6(),u=h?u&&"PRE"===u.tagName?6===h?"&#160;\r\n":7===h?"&#160;<br />\r":8===h?"&#160;<br />":"&#160;\r":"&#160;<br />":"<br />",w;if(q){for(var J=[],h=0;10>h;++h)J[h]=u+'</li><li class="L'+h+'">';var y="number"===typeof q?q-1:0;g.push('<ol class="linenums"><li class="L',y%10,'"');y&&g.push(' value="',
y+1,'"');g.push(">");w=function(){var a=J[++y%10];return e?"</span>"+a+'<span class="'+e+'">':a}}else w=u;for(;;)if(u=r<m.length?t<i.length?m[r]<=i[t]:b:z)c(m[r]),e&&(g.push("</span>"),e=o),g.push(m[r+1]),r+=2;else if(t<i.length)c(i[t]),v=i[t+1],t+=2;else break;c(l.length);e&&g.push("</span>");q&&g.push("</li></ol>");a.prettyPrintedHtml=g.join("")}function h(a,c){for(var l=c.length;0<=--l;){var m=c[l];B.hasOwnProperty(m)?"console"in window&&console.warn("cannot override language handler %s",m):B[m]=
a}}function K(a,c){if(!a||!B.hasOwnProperty(a))a=/^\s*</.test(c)?"default-markup":"default-code";return B[a]}function L(a){var c=a.sourceCodeHtml,l=a.langExtension;a.prettyPrintedHtml=c;try{var m,i=c.match(R),c=[],q=0,h=[];if(i)for(var g=0,s=i.length;g<s;++g){var e=i[g];if(1<e.length&&"<"===e.charAt(0)){if(!S.test(e))if(T.test(e))c.push(e.substring(9,e.length-3)),q+=e.length-12;else if(U.test(e))c.push("\n"),++q;else if(0<=e.indexOf("nocode")&&e.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,
' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)){var v=e.match(M)[2],r=1,t;t=g+1;a:for(;t<s;++t){var k=i[t].match(M);if(k&&k[2]===v)if("/"===k[1]){if(0===--r)break a}else++r}t<s?(h.push(q,i.slice(g,t+1).join("")),g=t):h.push(q,e)}else h.push(q,e)}else{var d;var r=e,p=r.indexOf("&");if(0>p)d=r;else{for(--p;0<=(p=r.indexOf("&#",p+1));){var f=r.indexOf(";",p);if(0<=f){var n=r.substring(p+3,f),j=10;n&&"x"===n.charAt(0)&&(n=n.substring(1),j=16);var w=parseInt(n,j);isNaN(w)||(r=r.substring(0,
p)+String.fromCharCode(w)+r.substring(f+1))}}d=r.replace(V,"<").replace(W,">").replace(X,"'").replace(Y,'"').replace(Z," ").replace($,"&")}c.push(d);q+=d.length}}m={source:c.join(""),tags:h};var y=m.source;a.source=y;a.basePos=0;a.extractedTags=m.tags;K(l,y)(a);Q(a)}catch(x){"console"in window&&console.log(x&&x.stack?x.stack:x)}}function aa(a,c,l){a={sourceCodeHtml:a,langExtension:c,numberLines:l};L(a);return a.prettyPrintedHtml}function ba(a){function c(){for(var l=window.PR_SHOULD_USE_CONTINUATION?
g.now()+250:Infinity;s<m.length&&g.now()<l;s++){var i=m[s];if(i.className&&0<=i.className.indexOf("prettyprint")){var h=i.className.match(/\blang-(\w+)\b/);h&&(h=h[1]);for(var k=z,d=i.parentNode;d;d=d.parentNode)if(("pre"===d.tagName||"code"===d.tagName||"xmp"===d.tagName)&&d.className&&0<=d.className.indexOf("prettyprint")){k=b;break}if(!k){d=i;o===E&&(k=document.createElement("PRE"),k.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />')),E=!/</.test(k.innerHTML));if(E)if(k=
d.innerHTML,"XMP"===d.tagName)k=x(k);else{if("PRE"===d.tagName||!ca.test(k))d=b;else{var p="";d.currentStyle?p=d.currentStyle.whiteSpace:window.getComputedStyle&&(p=window.getComputedStyle(d,o).whiteSpace);d=!p||"pre"===p}d||(k=k.replace(/(<br\s*\/?>)[\r\n]+/g,"$1").replace(/(?:[\r\n]+[ \t]*)+/g," "))}else{k=[];for(d=d.firstChild;d;d=d.nextSibling)C(d,k);k=k.join("")}k=k.replace(/(?:\r\n?|\n)$/,"");d=i.className.match(/\blinenums\b(?::(\d+))?/);e={sourceCodeHtml:k,langExtension:h,sourceNode:i,numberLines:d?
d[1]&&d[1].length?+d[1]:b:z};L(e);if(i=e.prettyPrintedHtml)if(h=e.sourceNode,"XMP"===h.tagName){k=document.createElement("PRE");for(d=0;d<h.attributes.length;++d)if(p=h.attributes[d],p.specified){var f=p.name.toLowerCase();"class"===f?k.className=p.value:k.setAttribute(p.name,p.value)}k.innerHTML=i;h.parentNode.replaceChild(k,h)}else h.innerHTML=i}}}s<m.length?setTimeout(c,250):a&&a()}for(var l=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],
m=[],i=0;i<l.length;++i)for(var h=0,u=l[i].length;h<u;++h)m.push(l[i][h]);var l=o,g=Date;g.now||(g={now:function(){return(new Date).getTime()}});var s=0,e;c()}var P=function(){for(var a="! != !== # % %= & && &&= &= ( * *= += , -= -> / /= : :: ; < << <<= <= = == === > >= >> >>= >>> >>>= ? @ [ ^ ^= ^^ ^^= { | |= || ||= ~ break case continue delete do else finally instanceof return throw try typeof".split(" "),c="(?:^^|[+-]",h=0;h<a.length;++h)c+="|"+a[h].replace(/([^=<>:&a-z])/g,"\\$1");return c+=")\\s*"}(),
F=/&/g,G=/</g,H=/>/g,N=/\"/g,V=/&lt;/g,W=/&gt;/g,X=/&apos;/g,Y=/&quot;/g,$=/&amp;/g,Z=/&nbsp;/g,ca=/[\r\n]/g,E=o,R=RegExp("[^<]+|<\!--[\\s\\S]*?--\>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<","g"),S=/^<\!--/,T=/^<!\[CDATA\[/,U=/^<br\b/i,M=/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/,da=w({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending dynamic event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
hashComments:b,cStyleComments:b,multiLineStrings:b,regexLiterals:b}),B={};h(da,["default-code"]);h(y([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),"default-markup htm html mxml xhtml xml xsl".split(" "));
h(y([["pln",/^[\s]+/,o," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,o,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],["pun",/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),
["in.tag"]);h(y([],[["atv",/^[\s\S]+/]]),["uq.val"]);h(w({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where ",
hashComments:b,cStyleComments:b}),"c cc cpp cxx cyc m".split(" "));h(w({keywords:"null true false"}),["json"]);h(w({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending dynamic event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
hashComments:b,cStyleComments:b,verbatimStrings:b}),["cs"]);h(w({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",
cStyleComments:b}),["java"]);h(w({keywords:"break continue do else for if return while case done elif esac eval fi function in local set then until ",hashComments:b,multiLineStrings:b}),["bsh","csh","sh"]);h(w({keywords:"break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",hashComments:b,multiLineStrings:b,tripleQuotedStrings:b}),["cv","py"]);h(w({keywords:"caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",
hashComments:b,multiLineStrings:b,regexLiterals:b}),["perl","pl","pm"]);h(w({keywords:"break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",hashComments:b,multiLineStrings:b,regexLiterals:b}),["rb"]);h(w({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN ",
cStyleComments:b,regexLiterals:b}),["js"]);h(w({keywords:"all and by catch class else extends false finally for if in is isnt loop new no not null of off on or return super then true try unless until when while yes ",hashComments:3,cStyleComments:b,multilineStrings:b,tripleQuotedStrings:b,regexLiterals:b}),["coffee"]);h(y([],[["str",/^[\s\S]+/]]),["regex"]);window.PR_normalizedHtml=C;window.prettyPrintOne=aa;window.prettyPrint=ba;window.PR={combinePrefixPatterns:I,createSimpleLexer:y,registerLangHandler:h,
sourceDecorator:w,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();/*
 Copyright (C) 2009 Onno Hommes.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_COMMENT,/^#[^\r\n]*/,o,"#"],[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,o,'"']],[[PR.PR_KEYWORD,/^(?:ADS|AD|AUG|BZF|BZMF|CAE|CAF|CA|CCS|COM|CS|DAS|DCA|DCOM|DCS|DDOUBL|DIM|DOUBLE|DTCB|DTCF|DV|DXCH|EDRUPT|EXTEND|INCR|INDEX|NDX|INHINT|LXCH|MASK|MSK|MP|MSU|NOOP|OVSK|QXCH|RAND|READ|RELINT|RESUME|RETURN|ROR|RXOR|SQUARE|SU|TCR|TCAA|OVSK|TCF|TC|TS|WAND|WOR|WRITE|XCH|XLQ|XXALQ|ZL|ZQ|ADD|ADZ|SUB|SUZ|MPY|MPR|MPZ|DVP|COM|ABS|CLA|CLZ|LDQ|STO|STQ|ALS|LLS|LRS|TRA|TSQ|TMI|TOV|AXT|TIX|DLY|INP|OUT)\s/,
o],[PR.PR_TYPE,/^(?:-?GENADR|=MINUS|2BCADR|VN|BOF|MM|-?2CADR|-?[1-6]DNADR|ADRES|BBCON|[SE]?BANK\=?|BLOCK|BNKSUM|E?CADR|COUNT\*?|2?DEC\*?|-?DNCHAN|-?DNPTR|EQUALS|ERASE|MEMORY|2?OCT|REMADR|SETLOC|SUBRO|ORG|BSS|BES|SYN|EQU|DEFINE|END)\s/,o],[PR.PR_LITERAL,/^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/],[PR.PR_PLAIN,/^-*(?:[!-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0()\"\\\';]+/]]),["apollo","agc","aea"]);/*
 Copyright (C) 2011 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([["opn",/^[\(\{\[]+/,o,"([{"],["clo",/^[\)\}\]]+/,o,")]}"],[PR.PR_COMMENT,/^;[^\r\n]*/,o,";"],[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,o,'"']],[[PR.PR_KEYWORD,/^(?:def|if|do|let|quote|var|fn|loop|recur|throw|try|monitor-enter|monitor-exit|defmacro|defn|defn-|macroexpand|macroexpand-1|for|doseq|dosync|dotimes|and|or|when|not|assert|doto|proxy|defstruct|first|rest|cons|defprotocol|deftype|defrecord|reify|defmulti|defmethod|meta|with-meta|ns|in-ns|create-ns|import|intern|refer|alias|namespace|resolve|ref|deref|refset|new|set!|memfn|to-array|into-array|aset|gen-class|reduce|map|filter|find|nil?|empty?|hash-map|hash-set|vec|vector|seq|flatten|reverse|assoc|dissoc|list|list?|disj|get|union|difference|intersection|extend|extend-type|extend-protocol|prn)\b/,
o],[PR.PR_TYPE,/^:[0-9a-zA-Z\-]+/]]),["clj"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,o," \t\r\n\u000c"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,o],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,o],["lang-css-str",/^url\(([^\)\"\']*)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,o],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
[PR.PR_COMMENT,/^(?:<\!--|--\>)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]);/*
 Copyright (C) 2010 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_PLAIN,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])+(?:\'|$))/,o,"\"'"]],[[PR.PR_COMMENT,/^(?:\/\/[^\r\n]*|\/\*[\s\S]*?\*\/)/],[PR.PR_PLAIN,/^(?:[^\/\"\']|\/(?![\/\*]))+/i]]),["go"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\x0B\x0C\r ]+/,o,"\t\n\x0B\u000c\r "],[PR.PR_STRING,/^\"(?:[^\"\\\n\x0C\r]|\\[\s\S])*(?:\"|$)/,o,'"'],[PR.PR_STRING,/^\'(?:[^\'\\\n\x0C\r]|\\[^&])\'?/,o,"'"],[PR.PR_LITERAL,/^(?:0o[0-7]+|0x[\da-f]+|\d+(?:\.\d+)?(?:e[+\-]?\d+)?)/i,o,"0123456789"]],[[PR.PR_COMMENT,/^(?:(?:--+(?:[^\r\n\x0C]*)?)|(?:\{-(?:[^-]|-+[^-\}])*-\}))/],[PR.PR_KEYWORD,/^(?:case|class|data|default|deriving|do|else|if|import|in|infix|infixl|infixr|instance|let|module|newtype|of|then|type|where|_)(?=[^a-zA-Z0-9\']|$)/,
o],[PR.PR_PLAIN,/^(?:[A-Z][\w\']*\.)*[a-zA-Z][\w\']*/],[PR.PR_PUNCTUATION,/^[^\t\n\x0B\x0C\r a-zA-Z0-9\'\"]+/]]),["hs"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([["opn",/^\(+/,o,"("],["clo",/^\)+/,o,")"],[PR.PR_COMMENT,/^;[^\r\n]*/,o,";"],[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/,o,'"']],[[PR.PR_KEYWORD,/^(?:block|c[ad]+r|catch|con[ds]|def(?:ine|un)|do|eq|eql|equal|equalp|eval-when|flet|format|go|if|labels|lambda|let|load-time-value|locally|macrolet|multiple-value-call|nil|progn|progv|quote|require|return-from|setq|symbol-macrolet|t|tagbody|the|throw|unwind)\b/,
o],[PR.PR_LITERAL,/^[+\-]?(?:[0#]x[0-9a-f]+|\d+\/\d+|(?:\.\d+|\d+(?:\.\d*)?)(?:[ed][+\-]?\d+)?)/i],[PR.PR_LITERAL,/^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/],[PR.PR_PLAIN,/^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0()\"\\\';]+/]]),["cl","el","lisp","scm"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])*(?:\'|$))/,o,"\"'"]],[[PR.PR_COMMENT,/^--(?:\[(=*)\[[\s\S]*?(?:\]\1\]|$)|[^\r\n]*)/],[PR.PR_STRING,/^\[(=*)\[[\s\S]*?(?:\]\1\]|$)/],[PR.PR_KEYWORD,/^(?:and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,o],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],
[PR.PR_PLAIN,/^[a-z_]\w*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0][^\w\t\n\r \xA0\"\'\-\+=]*/]]),["lua"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_COMMENT,/^#(?:if[\t\n\r \xA0]+(?:[a-z_$][\w\']*|``[^\r\n\t`]*(?:``|$))|else|endif|light)/i,o,"#"],[PR.PR_STRING,/^(?:\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)|\'(?:[^\'\\]|\\[\s\S])(?:\'|$))/,o,"\"'"]],[[PR.PR_COMMENT,/^(?:\/\/[^\r\n]*|\(\*[\s\S]*?\*\))/],[PR.PR_KEYWORD,/^(?:abstract|and|as|assert|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|if|in|inherit|inline|interface|internal|lazy|let|match|member|module|mutable|namespace|new|null|of|open|or|override|private|public|rec|return|static|struct|then|to|true|try|type|upcast|use|val|void|when|while|with|yield|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|global|include|method|mixin|object|parallel|process|protected|pure|sealed|trait|virtual|volatile)\b/],
[PR.PR_LITERAL,/^[+\-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^(?:[a-z_][\w']*[!?#]?|``[^\r\n\t`]*(?:``|$))/i],[PR.PR_PUNCTUATION,/^[^\t\n\r \xA0\"\'\w]+/]]),["fs","ml"]);/*
 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.sourceDecorator({keywords:"bool bytes default double enum extend extensions false fixed32 fixed64 float group import int32 int64 max message option optional package repeated required returns rpc service sfixed32 sfixed64 sint32 sint64 string syntax to true uint32 uint64",cStyleComments:b}),["proto"]);/*
 Copyright (C) 2010 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^(?:"(?:(?:""(?:""?(?!")|[^\\"]|\\.)*"{0,3})|(?:[^"\r\n\\]|\\.)*"?))/,o,'"'],[PR.PR_LITERAL,/^`(?:[^\r\n\\`]|\\.)*`?/,o,"`"],[PR.PR_PUNCTUATION,/^[!#%&()*+,\-:;<=>?@\[\\\]^{|}~]+/,o,"!#%&()*+,-:;<=>?@[\\]^{|}~"]],[[PR.PR_STRING,/^'(?:[^\r\n\\']|\\(?:'|[^\r\n']+))'/],[PR.PR_LITERAL,/^'[a-zA-Z_$][\w$]*(?!['$\w])/],[PR.PR_KEYWORD,/^(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|object|override|package|private|protected|requires|return|sealed|super|throw|trait|try|type|val|var|while|with|yield)\b/],
[PR.PR_LITERAL,/^(?:true|false|null|this)\b/],[PR.PR_LITERAL,/^(?:(?:0(?:[0-7]+|X[0-9A-F]+))L?|(?:(?:0|[1-9][0-9]*)(?:(?:\.[0-9]+)?(?:E[+\-]?[0-9]+)?F?|L?))|\\.[0-9]+(?:E[+\-]?[0-9]+)?F?)/i],[PR.PR_TYPE,/^[$_]*[A-Z][_$A-Z0-9]*[a-z][\w$]*/],[PR.PR_PLAIN,/^[$a-zA-Z_][\w$]*/],[PR.PR_COMMENT,/^\/(?:\/.*|\*(?:\/|\**[^*/])*(?:\*+\/?)?)/],[PR.PR_PUNCTUATION,/^(?:\.+|\/)/]]),["scala"]);/*
 Copyright (C) 2008 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"],[PR.PR_STRING,/^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/,o,"\"'"]],[[PR.PR_COMMENT,/^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],[PR.PR_KEYWORD,/^(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTHORIZATION|BACKUP|BEGIN|BETWEEN|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMPUTE|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATABASE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DENY|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|ELSE|END|ERRLVL|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FOR|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IN|INDEX|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KILL|LEFT|LIKE|LINENO|LOAD|NATIONAL|NOCHECK|NONCLUSTERED|NOT|NULL|NULLIF|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUTER|OVER|PERCENT|PLAN|PRECISION|PRIMARY|PRINT|PROC|PROCEDURE|PUBLIC|RAISERROR|READ|READTEXT|RECONFIGURE|REFERENCES|REPLICATION|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLLBACK|ROWCOUNT|ROWGUIDCOL|RULE|SAVE|SCHEMA|SELECT|SESSION_USER|SET|SETUSER|SHUTDOWN|SOME|STATISTICS|SYSTEM_USER|TABLE|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|UNION|UNIQUE|UPDATE|UPDATETEXT|USE|USER|VALUES|VARYING|VIEW|WAITFOR|WHEN|WHERE|WHILE|WITH|WRITETEXT)(?=[^\w-]|$)/i,
o],[PR.PR_LITERAL,/^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],[PR.PR_PLAIN,/^[a-z_][\w-]*/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]]),["sql"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0\u2028\u2029]+/,o,"\t\n\r \u00a0\u2028\u2029"],[PR.PR_STRING,/^(?:[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})(?:[\"\u201C\u201D]c|$)|[\"\u201C\u201D](?:[^\"\u201C\u201D]|[\"\u201C\u201D]{2})*(?:[\"\u201C\u201D]|$))/i,o,'"\u201c\u201d'],[PR.PR_COMMENT,/^[\'\u2018\u2019][^\r\n\u2028\u2029]*/,o,"'\u2018\u2019"]],[[PR.PR_KEYWORD,/^(?:AddHandler|AddressOf|Alias|And|AndAlso|Ansi|As|Assembly|Auto|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|Class|CLng|CObj|Const|CShort|CSng|CStr|CType|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get|GetType|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|Let|Lib|Like|Long|Loop|Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|New|Next|Not|NotInheritable|NotOverridable|Object|On|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|ParamArray|Preserve|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TypeOf|Unicode|Until|Variant|Wend|When|While|With|WithEvents|WriteOnly|Xor|EndIf|GoSub|Let|Variant|Wend)\b/i,
o],[PR.PR_COMMENT,/^REM[^\r\n\u2028\u2029]*/i],[PR.PR_LITERAL,/^(?:True\b|False\b|Nothing\b|\d+(?:E[+\-]?\d+[FRD]?|[FRDSIL])?|(?:&H[0-9A-F]+|&O[0-7]+)[SIL]?|\d*\.\d+(?:E[+\-]?\d+)?[FRD]?|#\s+(?:\d+[\-\/]\d+[\-\/]\d+(?:\s+\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)?|\d+:\d+(?::\d+)?(\s*(?:AM|PM))?)\s+#)/i],[PR.PR_PLAIN,/^(?:(?:[a-z]|_\w)\w*|\[(?:[a-z]|_\w)\w*\])/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \"\'\[\]\xA0\u2018\u2019\u201C\u201D\u2028\u2029]+/],[PR.PR_PUNCTUATION,/^(?:\[|\])/]]),["vb","vbs"]);PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t\n\r \xA0]+/,o,"\t\n\r \u00a0"]],[[PR.PR_STRING,/^(?:[BOX]?"(?:[^\"]|"")*"|'.')/i],[PR.PR_COMMENT,/^--[^\r\n]*/],[PR.PR_KEYWORD,/^(?:abs|access|after|alias|all|and|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|mod|nand|new|next|nor|not|null|of|on|open|or|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|rem|report|return|rol|ror|select|severity|shared|signal|sla|sll|sra|srl|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with|xnor|xor)(?=[^\w-]|$)/i,
o],[PR.PR_TYPE,/^(?:bit|bit_vector|character|boolean|integer|real|time|string|severity_level|positive|natural|signed|unsigned|line|text|std_u?logic(?:_vector)?)(?=[^\w-]|$)/i,o],[PR.PR_TYPE,/^\'(?:ACTIVE|ASCENDING|BASE|DELAYED|DRIVING|DRIVING_VALUE|EVENT|HIGH|IMAGE|INSTANCE_NAME|LAST_ACTIVE|LAST_EVENT|LAST_VALUE|LEFT|LEFTOF|LENGTH|LOW|PATH_NAME|POS|PRED|QUIET|RANGE|REVERSE_RANGE|RIGHT|RIGHTOF|SIMPLE_NAME|STABLE|SUCC|TRANSACTION|VAL|VALUE)(?=[^\w-]|$)/i,o],[PR.PR_LITERAL,/^\d+(?:_\d+)*(?:#[\w\\.]+#(?:[+\-]?\d+(?:_\d+)*)?|(?:\.\d+(?:_\d+)*)?(?:E[+\-]?\d+(?:_\d+)*)?)/i],
[PR.PR_PLAIN,/^(?:[a-z]\w*|\\[^\\]*\\)/i],[PR.PR_PUNCTUATION,/^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0\-\"\']*/]]),["vhdl","vhd"]);/*
 Copyright (C) 2009 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[\t \xA0a-gi-z0-9]+/,o,"\t \u00a0abcdefgijklmnopqrstuvwxyz0123456789"],[PR.PR_PUNCTUATION,/^[=*~\^\[\]]+/,o,"=*~^[]"]],[["lang-wiki.meta",/(?:^^|\r\n?|\n)(#[a-z]+)\b/],[PR.PR_LITERAL,/^(?:[A-Z][a-z][a-z0-9]+[A-Z][a-z][a-zA-Z0-9]+)\b/],["lang-",/^\{\{\{([\s\S]+?)\}\}\}/],["lang-",/^`([^\r\n`]+)`/],[PR.PR_STRING,/^https?:\/\/[^\/?#\s]*(?:\/[^?#\s]*)?(?:\?[^#\s]*)?(?:#\S*)?/i],[PR.PR_PLAIN,/^(?:\r\n|[\s\S])[^#=*~^A-Zh\{`\[\r\n]*/]]),["wiki"]);
PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_KEYWORD,/^#[a-z]+/i,o,"#"]],[]),["wiki.meta"]);PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PUNCTUATION,/^[:|>?]+/,o,":|>?"],[PR.PR_DECLARATION,/^%(?:YAML|TAG)[^#\r\n]+/,o,"%"],[PR.PR_TYPE,/^[&]\S+/,o,"&"],[PR.PR_TYPE,/^!\S*/,o,"!"],[PR.PR_STRING,/^"(?:[^\\"]|\\.)*(?:"|$)/,o,'"'],[PR.PR_STRING,/^'(?:[^']|'')*(?:'|$)/,o,"'"],[PR.PR_COMMENT,/^#[^\r\n]*/,o,"#"],[PR.PR_PLAIN,/^\s+/,o," \t\r\n"]],[[PR.PR_DECLARATION,/^(?:---|\.\.\.)(?:[\r\n]|$)/],[PR.PR_PUNCTUATION,/^-/],[PR.PR_KEYWORD,/^\w+:[ \r\n]/],[PR.PR_PLAIN,/^\w+/]]),["yaml","yml"]);
