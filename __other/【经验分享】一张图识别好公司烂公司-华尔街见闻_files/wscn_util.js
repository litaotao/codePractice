//添加 trim 方法
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


var WSCN_UTIL = {};

(function (util) {

	util.cookie = {
		getCookie : function (key) {

			if (document.cookie.length > 0) {
				var start = document.cookie.indexOf(key + "=");
				if (start != -1) {
					start = start + key.length + 1;
					end = document.cookie.indexOf(";", start);
					if (end == -1) {
						end = document.cookie.length;
					}
					return unescape(document.cookie.substring(start, end));
				}
			}
			return "";
		},

		setCookie : function (key, value, expiredays) {
			var expires = '';
			var date = new Date();
			if (expiredays) {
				date.setDate(date.getDate() + expiredays);
				expires = ';expires=' + date.toUTCString();
			} else {
				expires = ';expires=Fri, 31 Dec 9999 23:59:59 GMT';
			}
			document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires;
		}
	};

	util.url = {
		parseQueryString : function (url) {
			url && (url = url.substr(url.indexOf("?") + 1)); 
			var result = {}, queryString = url || location.search.substring(1),
				re = /([^&=]+)=([^&]*)/g,m;
			while (m = re.exec(queryString)) { 
				result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); 
			}
			return result;
		}
	};

	util.mobile = {
		detectOrientation : function (callback) {
			var supportOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object");

			var updateOrientation = function () {
				if (supportOrientation) {
					updateOrientation = function () {
						var orientation = window.orientation;
						switch (orientation) {
						case 90:
						case  - 90:
							orientation = "landscape";
							break;
						default:
							orientation = "portrait";
						}
						document.body.parentNode.setAttribute("class", orientation);
						callback && callback(orientation);
					};
				} else {
					updateOrientation = function () {
						var orientation = (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
						document.body.parentNode.setAttribute("class", orientation);
						callback && callback(orientation);
					};
				}
				updateOrientation();
			};

			var init = function () {
				updateOrientation();
				if (supportOrientation) {
					window.addEventListener("orientationchange", updateOrientation, false);
				} else {
					window.setInterval(updateOrientation, 5000);
				}
			};
			window.addEventListener("DOMContentLoaded", init, false);
		}

	};
	
	util.browser = {
		iOS : function(){
			return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
		},
		
		android : function(){
			return /android/.test(navigator.userAgent.toLowerCase());
		}
	
	};
	
	
    util.dom = {
        /**
         * 转换dom上设置的data-?的值转换为js对象
         * @param str
         * @returns
         */
        parseDomData : function(str) {
            if (typeof str !== 'string') {
                return ;
            }
            //str = str.replace(/\s/g, '');
            var array = str.split(';');
            var obj = {};
            for (var l=array.length-1; l>-1; l--) {
                var item = array[l];
                var index = item.indexOf(':');
                if (index > -1 && (index < item.length - 1)) {
                    var key = item.substring(0, index).trim();
                    key = key.replace(/-\w/g, function(word) {
                        return word.charAt(1).toUpperCase();
                    });
                    var value = item.substring(index+1).trim();
                    //类型转换 boolean
                    switch (value) {
                        case 'true':
                            value = true;
                            break;
                        case 'false':
                            value = false;
                            break;
                    }
                    //类型转换 number
                    if (/^(-?\d+)(\.\d+)?$/.test(value)) {
                        value = + value;
                    }
                    obj[key] = value;
                }
            }
            return obj;
        }
    };

})(WSCN_UTIL)
