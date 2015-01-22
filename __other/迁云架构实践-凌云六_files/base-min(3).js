/*
Copyright 2014, KISSY v1.41
MIT Licensed
build time: Feb 11 16:30
*/
KISSY.add("dom/base/api",[],function(h){var m=h.Env.host||{},n=m.document,q=h.UA,b={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12},e={isCustomDomain:function(b){var b=b||m,b=e.get(b),g=b.document.domain,b=b.location.hostname;return g!==b&&g!=="["+b+"]"},getEmptyIframeSrc:function(b){b=b||m;b=e.get(b);return q.ie&&e.isCustomDomain(b)?
"javascript:void(function(){"+encodeURIComponent('document.open();document.domain="'+b.document.domain+'";document.close();')+"}())":""},NodeType:b,getWindow:function(l){if(!l)return m;l=e.get(l);if(h.isWindow(l))return l;var g=l;g.nodeType!==b.DOCUMENT_NODE&&(g=l.ownerDocument);return g.defaultView||g.parentWindow},getDocument:function(l){if(!l)return n;l=e.get(l);return h.isWindow(l)?l.document:l.nodeType===b.DOCUMENT_NODE?l:l.ownerDocument},isDomNodeList:function(b){return b&&!b.nodeType&&b.item&&
!b.setTimeout},nodeName:function(b){var g=e.get(b),b=g.nodeName.toLowerCase();q.ie&&(g=g.scopeName)&&"HTML"!==g&&(b=g.toLowerCase()+":"+b);return b},_RE_NUM_NO_PX:RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i")};h.mix(e,b);return e});
KISSY.add("dom/base/attr",["./api"],function(h,m){function n(a){return null==a?"":a+""}function q(a,c){var c=i[c]||c,b=s[c];return b&&b.get?b.get(a,c):a[c]}var b=m("./api"),e=h.Env.host.document,l=b.NodeType,e=e&&e.documentElement,g=b.nodeName,a=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,j=/^(?:button|input|object|select|textarea)$/i,k=/^a(?:rea)?$/i,d=/:|^on/,c=/\r/g,f={},r={val:1,css:1,html:1,text:1,data:1,width:1,
height:1,offset:1,scrollTop:1,scrollLeft:1},t={tabindex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):j.test(a.nodeName)||k.test(a.nodeName)&&a.href?0:void 0}}},i={hidefocus:"hideFocus",tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},v=
{get:function(a,c){return b.prop(a,c)?c.toLowerCase():void 0},set:function(a,c,f){!1===c?b.removeAttr(a,f):(c=i[f]||f,c in a&&(a[c]=!0),a.setAttribute(f,f.toLowerCase()));return f}},s={},p={},x={select:{get:function(a){var c=a.selectedIndex,f=a.options,d;if(0>c)return null;if("select-one"===""+a.type)return b.val(f[c]);a=[];c=0;for(d=f.length;c<d;++c)f[c].selected&&a.push(b.val(f[c]));return a},set:function(a,c){var f=h.makeArray(c);h.each(a.options,function(a){a.selected=h.inArray(b.val(a),f)});
f.length||(a.selectedIndex=-1);return f}}};h.each(["radio","checkbox"],function(a){x[a]={get:function(a){return null===a.getAttribute("value")?"on":a.value},set:function(a,c){if(h.isArray(c))return a.checked=h.inArray(b.val(a),c),1}}});t.style={get:function(a){return a.style.cssText}};h.mix(b,{_valHooks:x,_propFix:i,_attrHooks:t,_propHooks:s,_attrNodeHook:p,_attrFix:f,prop:function(a,c,f){var d=b.query(a),g,e;if(h.isPlainObject(c))h.each(c,function(a,c){b.prop(d,c,a)});else if(c=i[c]||c,e=s[c],void 0!==
f)for(a=d.length-1;0<=a;a--)g=d[a],e&&e.set?e.set(g,f,c):g[c]=f;else if(d.length)return q(d[0],c)},hasProp:function(a,c){var f=b.query(a),d,i=f.length,g;for(d=0;d<i;d++)if(g=f[d],void 0!==q(g,c))return!0;return!1},removeProp:function(a,c){var c=i[c]||c,f=b.query(a),d,g;for(d=f.length-1;0<=d;d--){g=f[d];try{g[c]=void 0,delete g[c]}catch(e){}}},attr:function(c,i,e,j){var k=b.query(c),s=k[0];if(h.isPlainObject(i)){var j=e,u;for(u in i)b.attr(k,u,i[u],j)}else{if(j&&r[i])return b[i](c,e);i=i.toLowerCase();
if(j&&r[i])return b[i](c,e);i=f[i]||i;c=a.test(i)?v:d.test(i)?p:t[i];if(void 0===e){if(s&&s.nodeType===l.ELEMENT_NODE){"form"===g(s)&&(c=p);if(c&&c.get)return c.get(s,i);e=s.getAttribute(i);return""===e&&(i=s.getAttributeNode(i),!i||!i.specified)?void 0:null===e?void 0:e}}else for(j=k.length-1;0<=j;j--)if((s=k[j])&&s.nodeType===l.ELEMENT_NODE)"form"===g(s)&&(c=p),c&&c.set?c.set(s,e,i):s.setAttribute(i,""+e)}},removeAttr:function(c,d){var d=d.toLowerCase(),d=f[d]||d,e=b.query(c),g,h,r;for(r=e.length-
1;0<=r;r--)if(h=e[r],h.nodeType===l.ELEMENT_NODE&&(h.removeAttribute(d),a.test(d)&&(g=i[d]||d)in h))h[g]=!1},hasAttr:e&&!e.hasAttribute?function(c,a){var a=a.toLowerCase(),f=b.query(c),d,i;for(d=0;d<f.length;d++)if(i=f[d],(i=i.getAttributeNode(a))&&i.specified)return!0;return!1}:function(c,a){var f=b.query(c),d,i=f.length;for(d=0;d<i;d++)if(f[d].hasAttribute(a))return!0;return!1},val:function(a,f){var d,i,e,r,u;if(void 0===f){if(e=b.get(a)){if((d=x[g(e)]||x[e.type])&&"get"in d&&void 0!==(i=d.get(e,
"value")))return i;i=e.value;return"string"===typeof i?i.replace(c,""):null==i?"":i}}else{i=b.query(a);for(r=i.length-1;0<=r;r--){e=i[r];if(1!==e.nodeType)break;u=f;null==u?u="":"number"===typeof u?u+="":h.isArray(u)&&(u=h.map(u,n));d=x[g(e)]||x[e.type];if(!d||!("set"in d)||void 0===d.set(e,u,"value"))e.value=u}}},text:function(c,a){var f,d,i,e;if(void 0===a)return f=b.get(c),b._getText(f);d=b.query(c);for(i=d.length-1;0<=i;i--)if(f=d[i],e=f.nodeType,e===l.ELEMENT_NODE)b.cleanData(f.getElementsByTagName("*")),
"textContent"in f?f.textContent=a:f.innerText=a;else if(e===l.TEXT_NODE||e===l.CDATA_SECTION_NODE)f.nodeValue=a},_getText:function(c){return c.textContent}});return b});
KISSY.add("dom/base/class",["./api"],function(h,m){function n(b){for(var b=h.trim(b||""),b=b.split(a),e=[],d,c=b.length,f=0;f<c;f++)(d=b[f])&&e.push(d);return e}function q(a){return function(b,d){var c,f,e,g=b.classList,i=l.call(arguments,2);c=0;for(f=d.length;c<f;c++)(e=d[c])&&g[a].apply(g,[e].concat(i))}}function b(a){return function(b,d){var c=n(d),f=l.call(arguments,2);e.query(b).each(function(d){d.nodeType===g.ELEMENT_NODE&&e[a].apply(e,[d,c].concat(f))})}}var e=m("./api"),l=[].slice,g=e.NodeType,
a=/[\.\s]\s*\.?/;h.mix(e,{_hasClass:function(a,b){var d,c,f,e=a.classList;if(e.length){d=0;for(c=b.length;d<c;d++)if((f=b[d])&&!e.contains(f))return!1;return!0}return!1},_addClass:q("add"),_removeClass:q("remove"),_toggleClass:q("toggle"),hasClass:function(a,b){var d=!1,b=n(b);e.query(a).each(function(a){if(a.nodeType===g.ELEMENT_NODE&&e._hasClass(a,b))return d=!0,!1});return d},replaceClass:function(a,b,d){e.removeClass(a,b);e.addClass(a,d)},addClass:b("_addClass"),removeClass:b("_removeClass"),
toggleClass:b("_toggleClass")});return e});
KISSY.add("dom/base/create",["./api"],function(h,m){function n(a){a=a&&a!==j?a.createElement(c):f;a===f&&(a.innerHTML="");return a}function q(a,c){var f=n(c);f.innerHTML="m<div>"+a+"</div>";return f.lastChild}function b(a,c){if(c)if(s&&c.canHaveChildren&&"removeNode"in a){if(a.firstChild)a:{try{a.innerHTML="";break a}catch(f){}for(var d;d=a.lastChild;)b(d,a)}a.removeNode(!1)}else c.removeChild(a)}function e(a,c,f){var d=c.nodeType;if(d===k.DOCUMENT_FRAGMENT_NODE){c=c.childNodes;f=f.childNodes;for(d=
0;c[d];)f[d]&&e(a,c[d],f[d]),d++}else if(d===k.ELEMENT_NODE){c=c.getElementsByTagName("*");f=f.getElementsByTagName("*");for(d=0;c[d];)f[d]&&a(c[d],f[d]),d++}}function l(c,d){var f=h.require("event/dom"),b,o;if(d.nodeType!==k.ELEMENT_NODE||a.hasData(c)){b=a.data(c);for(o in b)a.data(d,o,b[o]);f&&f.clone(c,d)}}function g(a){var c=null,d,f;if(a&&(a.push||a.item)&&a[0]){c=a[0].ownerDocument;c=c.createDocumentFragment();a=h.makeArray(a);d=0;for(f=a.length;d<f;d++)c.appendChild(a[d])}else"Unable to convert "+
a+" to fragment.";return c}var a=m("./api"),j=h.Env.host.document,k=a.NodeType,d=h.UA.ieMode,c="div",f=j&&j.createElement(c),r=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,t=/<([\w:]+)/,i=/^\s+/,v=/\s+$/,s=!!(d&&9>d),p=s,x=/<|&#?\w+;/,H=j&&"outerHTML"in j.documentElement,D=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;h.mix(a,{create:function(d,f,b,e){var o=null;if(!d)return o;if(d.nodeType)return a.clone(d);if("string"!==typeof d)return o;void 0===e&&(e=!0);e&&(d=h.trim(d));var e=a._creators,
G,C,b=b||j,J,A=c;if(x.test(d))if(J=D.exec(d))o=b.createElement(J[1]);else{d=d.replace(r,"<$1></$2>");if((J=t.exec(d))&&(G=J[1]))A=G.toLowerCase();G=(e[A]||q)(d,b);p&&(C=d.match(i))&&G.insertBefore(b.createTextNode(C[0]),G.firstChild);p&&/\S/.test(d)&&(C=d.match(v))&&G.appendChild(b.createTextNode(C[0]));C=G.childNodes;1===C.length?o=C[0].parentNode.removeChild(C[0]):C.length?o=g(C):d+" : create node error"}else o=b.createTextNode(d);d=o;h.isPlainObject(f)&&(d.nodeType===k.ELEMENT_NODE?a.attr(d,f,
!0):d.nodeType===k.DOCUMENT_FRAGMENT_NODE&&a.attr(d.childNodes,f,!0));return d},_fixCloneAttributes:function(c,d){"textarea"===a.nodeName(c)&&(d.defaultValue=c.defaultValue,d.value=c.value)},_creators:{div:q},_defaultCreator:q,html:function(c,d,f){var c=a.query(c),b=c[0],o=!1,e,g;if(!b)return null;if(void 0===d)return b.nodeType===k.ELEMENT_NODE?b.innerHTML:b.nodeType===k.DOCUMENT_FRAGMENT_NODE?(f=n(b.ownerDocument),f.appendChild(b),f.innerHTML):null;d+="";if(!d.match(/<(?:script|style|link)/i)&&
(!p||!d.match(i))&&!y[(d.match(t)||["",""])[1].toLowerCase()])try{for(e=c.length-1;0<=e;e--)g=c[e],g.nodeType===k.ELEMENT_NODE&&(a.cleanData(g.getElementsByTagName("*")),g.innerHTML=d);o=!0}catch(h){}o||(d=a.create(d,0,b.ownerDocument,0),a.empty(c),a.append(d,c,f))},outerHtml:function(c,d,f){var c=a.query(c),b=c.length,o=c[0];if(!o)return null;if(void 0===d){if(H&&o.nodeType!==a.DOCUMENT_FRAGMENT_NODE)return o.outerHTML;d=n(o.ownerDocument);d.appendChild(a.clone(o,!0));return d.innerHTML}d+="";if(!d.match(/<(?:script|style|link)/i)&&
H)for(f=b-1;0<=f;f--)o=c[f],o.nodeType===k.ELEMENT_NODE&&(a.cleanData(o,1),o.outerHTML=d);else d=a.create(d,0,o.ownerDocument,0),a.insertBefore(d,c,f),a.remove(c)},remove:function(c,d){var f,e=a.query(c),o,i=h.require("event/dom"),g;for(g=e.length-1;0<=g;g--)f=e[g],!d&&f.nodeType===k.ELEMENT_NODE&&(o=h.makeArray(f.getElementsByTagName("*")),o.push(f),a.removeData(o),i&&i.detach(o)),b(f,f.parentNode)},clone:function(c,d,f,b){"object"===typeof d&&(b=d.deepWithDataAndEvent,f=d.withDataAndEvent,d=d.deep);
var c=a.get(c),o,i=a._fixCloneAttributes,g;if(!c)return null;g=c.nodeType;o=c.cloneNode(d);if(g===k.ELEMENT_NODE||g===k.DOCUMENT_FRAGMENT_NODE)i&&g===k.ELEMENT_NODE&&i(c,o),d&&i&&e(i,c,o);f&&(l(c,o),d&&b&&e(l,c,o));return o},empty:function(c){var c=a.query(c),d,f;for(f=c.length-1;0<=f;f--)d=c[f],a.remove(d.childNodes)},_nodeListToFragment:g});a.outerHTML=a.outerHtml;var B=a._creators,F=a.create,y={area:"map",thead:"table",td:"tr",th:"tr",tr:"tbody",tbody:"table",tfoot:"table",caption:"table",colgroup:"table",
col:"colgroup",legend:"fieldset"},z;for(z in y)(function(c){B[z]=function(a,d){return F("<"+c+">"+a+"</"+c+">",void 0,d)}})(y[z]);y.option=y.optgroup=function(c,a){return F('<select multiple="multiple">'+c+"</select>",void 0,a)};return a});
KISSY.add("dom/base/data",["./api"],function(h,m){var n=m("./api"),q=h.Env.host,b="_ks_data_"+h.now(),e={},l={},g={applet:1,object:1,embed:1},a={hasData:function(a,c){if(a)if(void 0!==c){if(c in a)return!0}else if(!h.isEmptyObject(a))return!0;return!1}},j={hasData:function(d,c){return d==q?j.hasData(l,c):a.hasData(d[b],c)},data:function(a,c,f){if(a==q)return j.data(l,c,f);var e=a[b];if(void 0!==f)e=a[b]=a[b]||{},e[c]=f;else return void 0!==c?e&&e[c]:e=a[b]=a[b]||{}},removeData:function(a,c){if(a==
q)return j.removeData(l,c);var f=a[b];if(void 0!==c)delete f[c],h.isEmptyObject(f)&&j.removeData(a);else try{delete a[b]}catch(e){a[b]=void 0}}},k={hasData:function(d,c){var f=d[b];return!f?!1:a.hasData(e[f],c)},data:function(a,c,f){if(!g[a.nodeName.toLowerCase()]){var r=a[b];if(!r){if(void 0!==c&&void 0===f)return;r=a[b]=h.guid()}a=e[r];if(void 0!==f)a=e[r]=e[r]||{},a[c]=f;else return void 0!==c?a&&a[c]:a=e[r]=e[r]||{}}},removeData:function(a,c){var f=a[b],g;if(f)if(g=e[f],void 0!==c)delete g[c],
h.isEmptyObject(g)&&k.removeData(a);else{delete e[f];try{delete a[b]}catch(j){a[b]=void 0}a.removeAttribute&&a.removeAttribute(b)}}};h.mix(n,{__EXPANDO:b,hasData:function(a,c){for(var f=!1,b=n.query(a),e=0;e<b.length&&!(f=b[e],f=f.nodeType?k.hasData(f,c):j.hasData(f,c));e++);return f},data:function(a,c,f){var a=n.query(a),b=a[0];if(h.isPlainObject(c))for(var e in c)n.data(a,e,c[e]);else if(void 0===f){if(b)return b.nodeType?k.data(b,c):j.data(b,c)}else for(e=a.length-1;0<=e;e--)b=a[e],b.nodeType?
k.data(b,c,f):j.data(b,c,f)},removeData:function(a,c){var f=n.query(a),b,e;for(e=f.length-1;0<=e;e--)b=f[e],b.nodeType?k.removeData(b,c):j.removeData(b,c)},cleanData:function(a,c){var f=n.query(a),b,e,i=h.require("event/dom");for(e=f.length-1;0<=e;e--)if(b=f[e],b.nodeType){var g=c&&h.makeArray(b.getElementsByTagName("*"))||[];g.push(b);b=0;for(var s=g.length;b<s;b++)k.removeData(g[b]);i&&i.detach(g)}else j.removeData(b)}});return n});
KISSY.add("dom/base/insertion",["./api"],function(h,m){function n(c,b){var e=[],h,i,v;for(h=0;c[h];h++)if(i=c[h],v=a(i),i.nodeType===l.DOCUMENT_FRAGMENT_NODE)e.push.apply(e,n(j(i.childNodes),b));else if("script"===v&&(!i.type||d.test(i.type)))i.parentNode&&i.parentNode.removeChild(i),b&&b.push(i);else{if(i.nodeType===l.ELEMENT_NODE&&!g.test(v)){v=[];var s,p,x=i.getElementsByTagName("script");for(p=0;p<x.length;p++)s=x[p],(!s.type||d.test(s.type))&&v.push(s);k.apply(c,[h+1,0].concat(v))}e.push(i)}return e}
function q(a){a.src?h.getScript(a.src):(a=h.trim(a.text||a.textContent||a.innerHTML||""))&&h.globalEval(a)}function b(a,b,d,g){a=e.query(a);g&&(g=[]);a=n(a,g);e._fixInsertionChecked&&e._fixInsertionChecked(a);var b=e.query(b),i,v,j,p,k=b.length;if((a.length||g&&g.length)&&k){a=e._nodeListToFragment(a);1<k&&(p=e.clone(a,!0),b=h.makeArray(b));for(i=0;i<k;i++)v=b[i],a&&(j=0<i?e.clone(p,!0):a,d(j,v)),g&&g.length&&h.each(g,q)}}var e=m("./api"),l=e.NodeType,g=/^(?:button|input|object|select|textarea)$/i,
a=e.nodeName,j=h.makeArray,k=[].splice,d=/\/(java|ecma)script/i;h.mix(e,{_fixInsertionChecked:null,insertBefore:function(a,d,e){b(a,d,function(a,c){c.parentNode&&c.parentNode.insertBefore(a,c)},e)},insertAfter:function(a,d,e){b(a,d,function(a,c){c.parentNode&&c.parentNode.insertBefore(a,c.nextSibling)},e)},appendTo:function(a,d,e){b(a,d,function(a,c){c.appendChild(a)},e)},prependTo:function(a,d,e){b(a,d,function(a,c){c.insertBefore(a,c.firstChild)},e)},wrapAll:function(a,b){b=e.clone(e.get(b),!0);
a=e.query(a);a[0].parentNode&&e.insertBefore(b,a[0]);for(var d;(d=b.firstChild)&&1===d.nodeType;)b=d;e.appendTo(a,b)},wrap:function(a,b){a=e.query(a);b=e.get(b);h.each(a,function(a){e.wrapAll(a,b)})},wrapInner:function(a,b){a=e.query(a);b=e.get(b);h.each(a,function(a){var c=a.childNodes;c.length?e.wrapAll(c,b):a.appendChild(b)})},unwrap:function(a){a=e.query(a);h.each(a,function(a){a=a.parentNode;e.replaceWith(a,a.childNodes)})},replaceWith:function(a,b){var d=e.query(a),b=e.query(b);e.remove(b,!0);
e.insertBefore(b,d);e.remove(d)}});h.each({prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},function(a,b){e[b]=e[a]});return e});
KISSY.add("dom/base/offset",["./api"],function(h,m){function n(a){var b,d=a.ownerDocument.body;if(!a.getBoundingClientRect)return{left:0,top:0};b=a.getBoundingClientRect();a=b[c];b=b[f];a-=j.clientLeft||d.clientLeft||0;b-=j.clientTop||d.clientTop||0;return{left:a,top:b}}function q(a,c){var d={left:0,top:0},e=k(a),f,g=a,c=c||e;do{if(e==c){var h=g;f=n(h);h=k(h);f.left+=b[r](h);f.top+=b[t](h)}else f=n(g);d.left+=f.left;d.top+=f.top}while(e&&e!=c&&(g=e.frameElement)&&(e=e.parent));return d}var b=m("./api"),
e=h.Env.host,l=h.UA,g=e.document,a=b.NodeType,j=g&&g.documentElement,k=b.getWindow,d=Math.max,c="left",f="top",r="scrollLeft",t="scrollTop";h.mix(b,{offset:function(a,c,d){if(void 0===c){var a=b.get(a),e;a&&(e=q(a,d));return e}d=b.query(a);for(e=d.length-1;0<=e;e--){var a=d[e],f=c;"static"===b.css(a,"position")&&(a.style.position="relative");var g=q(a),h={},j=void 0,k=void 0;for(k in f)j=parseFloat(b.css(a,k))||0,h[k]=j+f[k]-g[k];b.css(a,h)}},scrollIntoView:function(d,e,g,j){var l,n,m,q;if(m=b.get(d)){e&&
(e=b.get(e));e||(e=m.ownerDocument);e.nodeType===a.DOCUMENT_NODE&&(e=k(e));h.isPlainObject(g)&&(j=g.allowHorizontalScroll,q=g.onlyScrollIfNeeded,g=g.alignWithTop);j=void 0===j?!0:j;n=h.isWindow(e);var d=b.offset(m),r=b.outerHeight(m);l=b.outerWidth(m);var t,z,u,w;n?(n=e,t=b.height(n),z=b.width(n),w={left:b.scrollLeft(n),top:b.scrollTop(n)},n=d[c]-w[c],m=d[f]-w[f],l=d[c]+l-(w[c]+z),d=d[f]+r-(w[f]+t)):(t=b.offset(e),z=e.clientHeight,u=e.clientWidth,w={left:b.scrollLeft(e),top:b.scrollTop(e)},n=d[c]-
(t[c]+(parseFloat(b.css(e,"borderLeftWidth"))||0)),m=d[f]-(t[f]+(parseFloat(b.css(e,"borderTopWidth"))||0)),l=d[c]+l-(t[c]+u+(parseFloat(b.css(e,"borderRightWidth"))||0)),d=d[f]+r-(t[f]+z+(parseFloat(b.css(e,"borderBottomWidth"))||0)));if(q){if(0>m||0<d)!0===g?b.scrollTop(e,w.top+m):!1===g?b.scrollTop(e,w.top+d):0>m?b.scrollTop(e,w.top+m):b.scrollTop(e,w.top+d)}else(g=void 0===g?!0:!!g)?b.scrollTop(e,w.top+m):b.scrollTop(e,w.top+d);if(j)if(q){if(0>n||0<l)!0===g?b.scrollLeft(e,w.left+n):!1===g?b.scrollLeft(e,
w.left+l):0>n?b.scrollLeft(e,w.left+n):b.scrollLeft(e,w.left+l)}else void 0===g||g?b.scrollLeft(e,w.left+n):b.scrollLeft(e,w.left+l)}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0,scrollTop:0,scrollLeft:0});h.each(["Left","Top"],function(c,d){var f="scroll"+c;b[f]=function(g,h){if("number"===typeof g)return arguments.callee(e,g);var g=b.get(g),j,l,n,m;g&&g.nodeType===a.ELEMENT_NODE?void 0!==h?g[f]=parseFloat(h):j=g[f]:(m=k(g),void 0!==h?(h=parseFloat(h),l="Left"===c?h:b.scrollLeft(m),n=
"Top"===c?h:b.scrollTop(m),m.scrollTo(l,n)):(j=m["page"+(d?"Y":"X")+"Offset"],"number"!==typeof j&&(l=m.document,j=l.documentElement[f],"number"!==typeof j&&(j=l.body[f]))));return j}});h.each(["Width","Height"],function(a){b["doc"+a]=function(c){c=b.get(c);c=b.getDocument(c);return d(c.documentElement["scroll"+a],c.body["scroll"+a],b["viewport"+a](c))};b["viewport"+a]=function(c){var c=b.get(c),d=k(c),c=d["inner"+a];if(l.mobile&&c)return c;var c="client"+a,d=d.document,e=d.body,f=d.documentElement[c];
return"CSS1Compat"===d.compatMode&&f||e&&e[c]||f}});return b});
KISSY.add("dom/base/style",["./api"],function(h,m){function n(a,c){return c.toUpperCase()}function q(a){return a.replace(s,"ms-").replace(y,n)}function b(a,c,d){var b={},e=a.style,f;for(f in c)b[f]=e[f],e[f]=c[f];d.call(a);for(f in c)e[f]=b[f]}function e(a,c,d){var b,e,f;if(!(3===a.nodeType||8===a.nodeType||!(b=a.style)))if(c=q(c),f=D[c],c=B[c]||c,void 0!==d){null===d||d===p?d=p:!isNaN(Number(d))&&!v[c]&&(d+=x);f&&f.set&&(d=f.set(a,d));if(void 0!==d){try{b[c]=d}catch(g){"css set error:"+g}d===p&&
b.removeAttribute&&b.removeAttribute(c)}b.cssText||a.removeAttribute("style")}else{if(!f||!("get"in f&&void 0!==(e=f.get(a,!1))))e=b[c];return void 0===e?"":e}}function l(a){var c,d=arguments;0!==a.offsetWidth?c=g.apply(void 0,d):b(a,L,function(){c=g.apply(void 0,d)});return c}function g(c,d,b){if(h.isWindow(c))return d===t?a.viewportWidth(c):a.viewportHeight(c);if(9===c.nodeType)return d===t?a.docWidth(c):a.docHeight(c);var e=d===t?["Left","Right"]:["Top","Bottom"],f=d===t?c.offsetWidth:c.offsetHeight;
if(0<f)return"border"!==b&&h.each(e,function(d){b||(f-=parseFloat(a.css(c,"padding"+d))||0);f="margin"===b?f+(parseFloat(a.css(c,b+d))||0):f-(parseFloat(a.css(c,"border"+d+"Width"))||0)}),f;f=a._getComputedStyle(c,d);if(null===f||0>Number(f))f=c.style[d]||0;f=parseFloat(f)||0;b&&h.each(e,function(d){f+=parseFloat(a.css(c,"padding"+d))||0;"padding"!==b&&(f+=parseFloat(a.css(c,"border"+d+"Width"))||0);"margin"===b&&(f+=parseFloat(a.css(c,b+d))||0)});return f}var a=m("./api"),j=h.Env.host,k=h.UA,d=h.Features,
c=a.nodeName,f=j.document,r=/^margin/,t="width",i="display"+h.now(),v={fillOpacity:1,fontWeight:1,lineHeight:1,opacity:1,orphans:1,widows:1,zIndex:1,zoom:1},s=/^-ms-/,p="",x="px",H=/\d(?!px)[a-z%]+$/i,D={},B={"float":"cssFloat"},F={},y=/-([a-z])/ig,z=f&&f.documentElement.style||{},u;h.each(["","Webkit","Moz","O","ms"],function(a){a=a?a+"UserSelect":"userSelect";void 0===u&&a in z&&(u=a)});if(d.isTransformSupported()){var w;w=B.transform=d.getTransformProperty();B.transformOrigin=w+"Origin"}d.isTransitionSupported()&&
(B.transition=d.getTransitionProperty());h.mix(a,{_camelCase:q,_cssHooks:D,_cssProps:B,_getComputedStyle:function(c,d){var b="",e,f,g,h,i;f=c.ownerDocument;d=B[d]||d;if(e=f.defaultView.getComputedStyle(c,null))b=e.getPropertyValue(d)||e[d];b===""&&!a.contains(f,c)&&(b=c.style[d]);if(a._RE_NUM_NO_PX.test(b)&&r.test(d)){i=c.style;f=i.width;g=i.minWidth;h=i.maxWidth;i.minWidth=i.maxWidth=i.width=b;b=e.width;i.width=f;i.minWidth=g;i.maxWidth=h}return b},style:function(c,d,b){var c=a.query(c),f,g=c[0];
if(h.isPlainObject(d))for(f in d)for(g=c.length-1;g>=0;g--)e(c[g],f,d[f]);else{if(b===void 0){f="";g&&(f=e(g,d,b));return f}for(g=c.length-1;g>=0;g--)e(c[g],d,b)}},css:function(c,d,b){var c=a.query(c),f=c[0],g;if(h.isPlainObject(d))for(g in d)for(f=c.length-1;f>=0;f--)e(c[f],g,d[g]);else{d=q(d);g=D[d];if(b===void 0){b="";if(f&&(!g||!("get"in g&&(b=g.get(f,true))!==void 0)))b=a._getComputedStyle(f,d);return typeof b==="undefined"?"":b}for(f=c.length-1;f>=0;f--)e(c[f],d,b)}},show:function(c){var c=
a.query(c),d,b,e;for(e=c.length-1;e>=0;e--){b=c[e];b.style.display=a.data(b,i)||p;if(a.css(b,"display")==="none"){d=b.tagName.toLowerCase();var g=void 0,h=F[d],j=void 0;if(!F[d]){g=f.body||f.documentElement;j=f.createElement(d);a.prepend(j,g);h=a.css(j,"display");g.removeChild(j);F[d]=h}d=h;a.data(b,i,d);b.style.display=d}}},hide:function(c){var c=a.query(c),d,b;for(b=c.length-1;b>=0;b--){d=c[b];var e=d.style,f=e.display;if(f!=="none"){f&&a.data(d,i,f);e.display="none"}}},toggle:function(c){var c=
a.query(c),d,b;for(b=c.length-1;b>=0;b--){d=c[b];a.css(d,"display")==="none"?a.show(d):a.hide(d)}},addStyleSheet:function(c,d,b){if(typeof c==="string"){b=d;d=c;c=j}var c=a.getDocument(c),e;if(b&&(b=b.replace("#",p)))e=a.get("#"+b,c);if(!e){e=a.create("<style>",{id:b},c);a.get("head",c).appendChild(e);e.styleSheet?e.styleSheet.cssText=d:e.appendChild(c.createTextNode(d))}},unselectable:function(d){var d=a.query(d),b,e,f=0,g,i;for(e=d.length-1;e>=0;e--){b=d[e];i=b.style;if(u!==void 0)i[u]="none";else if(k.ie){i=
b.getElementsByTagName("*");b.setAttribute("unselectable","on");for(g=["iframe","textarea","input","select"];b=i[f++];)h.inArray(c(b),g)||b.setAttribute("unselectable","on")}}},innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0,width:0,height:0});h.each([t,"height"],function(c){a["inner"+h.ucfirst(c)]=function(d){return(d=a.get(d))&&l(d,c,"padding")};a["outer"+h.ucfirst(c)]=function(d,b){var e=a.get(d);return e&&l(e,c,b?"margin":"border")};a[c]=function(d,b){var e=a.css(d,c,b);e&&(e=parseFloat(e));
return e};D[c]={get:function(a,d){var b;d&&(b=l(a,c)+"px");return b}}});var L={position:"absolute",visibility:"hidden",display:"block"};h.each(["left","top"],function(c){D[c]={get:function(d,b){var e,g,h;if(b){h=a.css(d,"position");if(h==="static")return"auto";e=a._getComputedStyle(d,c);if((g=e==="auto")&&h==="relative")return"0px";if(g||H.test(e)){h={top:0,left:0};if(a.css(d,"position")==="fixed")g=d.getBoundingClientRect();else{for(e=d.offsetParent||(d.ownerDocument||f).body;e&&!M.test(e.nodeName)&&
a.css(e,"position")==="static";)e=e.offsetParent;g=a.offset(d);h=a.offset(e);h.top=h.top+(parseFloat(a.css(e,"borderTopWidth"))||0);h.left=h.left+(parseFloat(a.css(e,"borderLeftWidth"))||0)}g.top=g.top-(parseFloat(a.css(d,"marginTop"))||0);g.left=g.left-(parseFloat(a.css(d,"marginLeft"))||0);e={top:g.top-h.top,left:g.left-h.left}[c]+"px"}}return e}}});var M=/^(?:body|html)$/i;return a});
KISSY.add("dom/base/selector",["./api"],function(h,m){function n(a){var c=this.length,d;for(d=0;d<c&&!1!==a(this[d],d);d++);}function q(a){a=a.substr(1);if(!a)throw Error("An invalid or illegal string was specified for selector.");return a}function b(a){return function(b){var e=d._getElementById(a,c);return e&&d._contains(b,e)?[e]:[]}}function e(a){return function(c){return c.getElementsByClassName(a)}}function l(a){return function(c){return c.getElementsByTagName(a)}}function g(a,f){var j,k,o="string"===
typeof a,m=void 0!==f?g(f):(k=1)&&[c],r=m.length;if(a)if(o){a=z(a);if(k)if("body"===a)j=[c.body];else if(H.test(a)&&t)j=v(c.getElementsByClassName(RegExp.$1));else if(F.test(a))j=(k=d._getElementById(RegExp.$2,c))&&k.nodeName.toLowerCase()===RegExp.$1?[k]:[];else if(D.test(a))j=(k=d._getElementById(a.substr(1),c))?[k]:[];else if(B.test(a))j=v(c.getElementsByTagName(a));else if(!a.match(/,|\+|=|~|\[|\]|:|>|\||\$|\^|\*|\(|\)|[\w-]+\.[\w-]+|[\w-]+#[\w-]+/)&&t){j=a.split(/\s+/);var p=m,A,y;k=0;for(o=
j.length;k<o;k++){A=j;y=k;var E;E=j[k];var I=E.charAt(0);E="#"===I?b(q(E)):"."===I?e(q(E)):l(E);A[y]=E}k=0;for(o=j.length;k<o;k++){E=j[k];var I=[],K;A=0;for(y=p.length;A<y;A++)K=E(p[A]),I.push.apply(I,v(K));p=I;if(!p.length)break}j=p&&1<p.length?d.unique(p):p}if(!j){j=[];for(k=0;k<r;k++)x.apply(j,d._selectInternal(a,m[k]));1<j.length&&1<r&&d.unique(j)}}else{if(j=a.nodeType||h.isWindow(a)?[a]:a.getDOMNodes?a.getDOMNodes():i(a)?a:s(a)?v(a):[a],!k){o=j;A=o.length;j=[];for(k=0;k<A;k++)for(p=0;p<r;p++)if(d._contains(m[p],
o[k])){j.push(o[k]);break}}}else j=[];j.each=n;return j}function a(a,c){var d=a&&j(a,"class");return d&&(d=d.replace(/[\r\t\n]/g,p))&&-1<(p+d+p).indexOf(p+c+p)}function j(a,c){var d=a&&a.getAttributeNode(c);if(d&&d.specified)return d.nodeValue}function k(a,c){return"*"===c||a.nodeName.toLowerCase()===c.toLowerCase()}var d=m("./api"),c=h.Env.host.document,f=c.documentElement,r=f.matches||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector,t="getElementsByClassName"in
c,i=h.isArray,v=h.makeArray,s=d.isDomNodeList,p=" ",x=Array.prototype.push,H=/^\.([\w-]+)$/,D=/^#([\w-]+)$/,B=/^([\w-])+$/,F=/^([\w-]+)#([\w-]+)$/,y=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,z=h.trim;h.mix(d,{_compareNodeOrder:function(a,c){return!a.compareDocumentPosition||!c.compareDocumentPosition?a.compareDocumentPosition?-1:1:a.compareDocumentPosition(c)&4?-1:1},_getElementsByTagName:function(a,c){return v(c.querySelectorAll(a))},_getElementById:function(a,c){return c.getElementById(a)},
_getSimpleAttr:j,_isTag:k,_hasSingleClass:a,_matchesInternal:function(a,c){for(var d=[],b=0,e,f=c.length;b<f;b++)e=c[b],r.call(e,a)&&d.push(e);return d},_selectInternal:function(a,c){return v(c.querySelectorAll(a))},query:g,get:function(a,c){return g(a,c)[0]||null},unique:function(){function a(b,e){return b===e?(c=!0,0):d._compareNodeOrder(b,e)}var c,b=!0;[0,0].sort(function(){b=!1;return 0});return function(d){c=b;d.sort(a);if(c)for(var e=1,f=d.length;e<f;)d[e]===d[e-1]?(d.splice(e,1),--f):e++;return d}}(),
filter:function(c,b,e){var c=g(c,e),f,i,l,m,e=[];if("string"===typeof b&&(b=z(b))&&(l=y.exec(b)))f=l[1],i=l[2],m=l[3],f?f&&!i&&!m&&(b=function(a){return j(a,"id")===f}):b=function(c){var d=!0,b=!0;i&&(d=k(c,i));m&&(b=a(c,m));return b&&d};return e="function"===typeof b?h.filter(c,b):d._matchesInternal(b,c)},test:function(a,c,b){a=g(a,b);return a.length&&d.filter(a,c,b).length===a.length}});return d});
KISSY.add("dom/base/traversal",["./api"],function(h,m){function n(b,a,j,k,d,c,f){if(!(b=e.get(b)))return null;if(0===a)return b;c||(b=b[j]);if(!b)return null;d=d&&e.get(d)||null;void 0===a&&(a=1);var c=[],m=h.isArray(a),n,i;"number"===typeof a&&(n=0,i=a,a=function(){return++n===i});for(;b&&b!==d;){if((b.nodeType===l.ELEMENT_NODE||b.nodeType===l.TEXT_NODE&&f)&&q(b,a)&&(!k||k(b)))if(c.push(b),!m)break;b=b[j]}return m?c:c[0]||null}function q(b,a){if(!a)return!0;if(h.isArray(a)){var j,k=a.length;if(!k)return!0;
for(j=0;j<k;j++)if(e.test(b,a[j]))return!0}else if(e.test(b,a))return!0;return!1}function b(b,a,j,k){var d=[],c,f;if((c=b=e.get(b))&&j)c=b.parentNode;if(c){j=h.makeArray(c.childNodes);for(c=0;c<j.length;c++)f=j[c],(k||f.nodeType===l.ELEMENT_NODE)&&f!==b&&d.push(f);a&&(d=e.filter(d,a))}return d}var e=m("./api"),l=e.NodeType;h.mix(e,{_contains:function(b,a){return!!(b.compareDocumentPosition(a)&16)},closest:function(b,a,e,h){return n(b,a,"parentNode",function(a){return a.nodeType!==l.DOCUMENT_FRAGMENT_NODE},
e,!0,h)},parent:function(b,a,e){return n(b,a,"parentNode",function(a){return a.nodeType!==l.DOCUMENT_FRAGMENT_NODE},e,void 0)},first:function(b,a,h){b=e.get(b);return n(b&&b.firstChild,a,"nextSibling",void 0,void 0,!0,h)},last:function(b,a,h){b=e.get(b);return n(b&&b.lastChild,a,"previousSibling",void 0,void 0,!0,h)},next:function(b,a,e){return n(b,a,"nextSibling",void 0,void 0,void 0,e)},prev:function(b,a,e){return n(b,a,"previousSibling",void 0,void 0,void 0,e)},siblings:function(e,a,h){return b(e,
a,!0,h)},children:function(e,a){return b(e,a,void 0)},contents:function(e,a){return b(e,a,void 0,1)},contains:function(b,a){b=e.get(b);a=e.get(a);return b&&a?e._contains(b,a):!1},index:function(b,a){var j=e.query(b),k,d=0;k=j[0];if(!a){j=k&&k.parentNode;if(!j)return-1;for(;k=k.previousSibling;)k.nodeType===l.ELEMENT_NODE&&d++;return d}d=e.query(a);return"string"===typeof a?h.indexOf(k,d):h.indexOf(d[0],j)},equals:function(b,a){b=e.query(b);a=e.query(a);if(b.length!==a.length)return!1;for(var h=b.length;0<=
h;h--)if(b[h]!==a[h])return!1;return!0}});return e});KISSY.add("dom/base","./base/api,./base/attr,./base/class,./base/create,./base/data,./base/insertion,./base/offset,./base/style,./base/selector,./base/traversal".split(","),function(h,m){var n=m("./base/api");m("./base/attr");m("./base/class");m("./base/create");m("./base/data");m("./base/insertion");m("./base/offset");m("./base/style");m("./base/selector");m("./base/traversal");h.mix(h,{DOM:n,get:n.get,query:n.query});return n});
