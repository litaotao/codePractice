/*
 Name: paranoid_spacing.js
 Version: 1.7.1
 URL: https://github.com/gibuloto/paranoid-auto-spacing
 Author: Vinta
 License: MIT License
 Description: Insert a white space between full-width characters (Chinese, Japanese, etc.) and half-width alphanumeric characters

 Usage:
 paranoid_spacing.page_spacing();
 paranoid_spacing.element_spacing('#id_name');
 paranoid_spacing.element_spacing('.class_name');
 paranoid_spacing.element_spacing('tag_name');
 */
(function(e){function t(e,t){var n=e.childNodes;for(var r=0;r<n.length&&n[r]!=t;r++)if(n[r].nodeType!=8&&n[r].textContent)return n[r];return t}function n(e,t){var n=e.childNodes;for(var r=n.length-1;r>-1&&n[r]!=t;r--)if(n[r].nodeType!=8&&n[r].textContent)return n[r];return t}function r(e){return e=e.replace(/([\u4e00-\u9fa5\u3040-\u30FF])([a-z0-9@&;=_\[\$\%\^\*\-\+\(\/])/ig,"$1 $2"),e=e.replace(/([a-z0-9!~&;=_\]\,\.\:\?\$\%\^\*\-\+\)\/])([\u4e00-\u9fa5\u3040-\u30FF])/ig,"$1 $2"),e=e.replace(/([\u4e00-\u9fa5\u3040-\u30FF])(\"|\'(\S+))/ig,"$1 $2"),e=e.replace(/((\S+)\'|\")([\u4e00-\u9fa5\u3040-\u30FF])/ig,"$1 $3"),e}function i(e){var i=document.evaluate(e,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),s=i.snapshotLength,o;for(var u=s-1;u>-1;--u){var a=i.snapshotItem(u);a.data=r(a.data);if(o){var f=a.data.toString().substr(-1)+o.data.toString().substr(0,1),l=r(f);if(f!=l){var c=o;while(c.parentNode&&c.nodeName.search(/^(a|u)$/i)==-1&&t(c.parentNode,c)==c)c=c.parentNode;var h=a;while(h.parentNode&&h.nodeName.search(/^(a|u)$/i)==-1&&n(h.parentNode,h)==h)h=h.parentNode;c.nodeName.search(/^(a|u)$/i)==-1?o.data=" "+o.data:h.nodeName.search(/^(a|u)$/i)==-1?a.data=a.data+" ":c.parentNode.insertBefore(document.createTextNode(" "),c)}}o=a}}e.page_spacing=function(){var e='//text()[normalize-space(.)][translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="script"][translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="style"]';i(e)},e.element_spacing=function(e){var t;if(e.indexOf("#")===0){var n=e.substr(1,e.length-1);t='id("'+n+'")//text()'}else if(e.indexOf(".")===0){var r=e.slice(1);t='//*[contains(concat(" ", normalize-space(@class), " "), " '+r+' ")]/text()'}else{var s=e;t="//"+s+"/text()"}i(t)}})(window.paranoid_spacing=window.paranoid_spacing||{});