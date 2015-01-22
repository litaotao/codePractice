/*
*name:TB和讯工具条工具包
*data:2011-12-12
*author:huangqiang
*company:hexun.com
*/
//是否关闭工具条栏
var TBisCloseBar = true;

if (typeof TB == 'undefined') TB = { lang: {}, params: {} };
//方法集
TB.utils = {
    //浏览器类型及版本判断
    $B: {
        IE: window.ActiveXObject ? true : false,
        FF: (navigator.userAgent.indexOf('Firefox') >= 0) ? true : false,
        Chrome: (navigator.userAgent.indexOf('Chrome') >= 0) ? true : false,
        Opera: window.opera ? true : false,
        Safari: (navigator.userAgent.indexOf('Safari') >= 0) ? true : false,
        Apple: /\((iPhone|iPad|iPod)/i.test(navigator.userAgent),
        isMobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        android2_3up: navigator.userAgent.match(/Android [2-9].[3-9][.\d]*/), //是否为大约或等于android 2.3
        ios5up: navigator.userAgent.match(/OS [5-9]_\d[_\d]*/),               //是否为大约或等于IOS 5
        isAndroid: navigator.userAgent.match(/android/i),                     //是否为Android
        isIOS: navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),    //是否为IOS
        //版本判断
        version: function (v) {
            var nav = navigator.userAgent.toLowerCase();
            if (!v) return;
            switch (v) {
                case 'IE': return nav.match(/msie ([\d.]+)/)[1]; break;
                case 'FF': return nav.match(/firefox\/([\d.]+)/)[1]; break;
                case 'Chrome': return nav.match(/chrome\/([\d.]+)/)[1]; break;
                case 'Opera': return nav.match(/opera\/([\d.]+)/)[1]; break;
                case 'Safari': return nav.match(/version\/([\d.]+)/)[1]; break;
            }
        },
        IE6: function () { return !!(TB.utils.$B.IE && parseInt(TB.utils.$B.version('IE')) < 7) }
    },
    Extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
    },
    inhert: function (object, fun) {
        return function () { return fun.apply(object, arguments); }
    },
    inhertEvent: function (object, fun) {
        return function (event) { return fun.call(object, (event || window.event)); }
    },
    init: function () {
        return function () { this.initialize.apply(this, arguments); }
    },
    $: function (element) {
        var el;
        if (typeof element == 'string') el = document.getElementById(element);
        else el = element;
        if (!el) return null;
        else return el;
    },
    $$: function (selector, parents) {
        var p = parents || [document];
        if (typeof selector == 'object') return [selector];
        if (typeof selector == 'string') {
            var str = this.mergeSpace(selector).replace(/\s*>\s*/g, '>').replace(/\s*\+\s*/g, '+').replace(/\s*~\s*/g, '~');
            var arr = str.split(' ');
            this.each(arr, function (a) {
                if (a.indexOf('>') != -1 || a.indexOf('~') != -1) p = TB.utils.$Q.cutLayer(a, p);
                else {
                    if (a.indexOf(':') != -1 || a.indexOf('[') != -1) p = TB.utils.$Q.setType(a, p);
                    else p = TB.utils.$Q.query(a, p);
                }
            });
            return p;
        }
    },
    $Q: {
        query: function (selector, parents) {
            var arr = [], type = selector.charAt(0);
            if (type == '#') {
                var temp = document.getElementById(selector.replace(/#/, ''));
                arr.push(temp);
            }
            else if (type == '*') {
                TB.utils.each(parents, function (parent) {
                    var temp = parent.getElementsByTagName('*');
                    var len = temp.length;
                    for (var i = 0; i < len; i++) { arr.push(temp[i]); }
                });
            }
            else if (type == '.') {
                TB.utils.each(parents, function (parent) {
                    var temp = parent.getElementsByTagName('*');
                    var len = temp.length;
                    for (var i = 0; i < len; i++) {
                        if (temp[i].className && TB.utils.hasClass(temp[i], selector.substr(1))) arr.push(temp[i]);
                    }
                });
            }
            else {
                var tag = selector;
                TB.utils.each(parents, function (parent) {
                    if (selector.indexOf('.') != -1) {
                        tag = selector.split('.')[0];
                        var classes = selector.split('.')[1];
                    }
                    var temp = parent.getElementsByTagName(tag);
                    var len = temp.length;
                    for (var i = 0; i < len; i++) {
                        if (selector.indexOf('.') != -1) {
                            if (temp[i].className && TB.utils.hasClass(temp[i], classes)) arr.push(temp[i]);
                        }
                        else arr.push(temp[i]);
                    }
                });
            }
            return arr;
        },
        setType: function (selector, parents) {
            var arr = [];
            if (selector.indexOf(':') != -1) {
                var str = selector.split(':')[0];
                arr = this.cutOrder(selector, this.query(str, parents));
            }
            else if (selector.indexOf('[') != -1) {
                var str = selector.split('[')[0];
                arr = this.cutAttr(selector, this.query(str, parents));
            }
            return arr;
        },
        cutLayer: function (selector, parents) {
            var arr = [], p = parents, type = '>';
            if (selector.indexOf('~') != -1) type = '~';
            var s = selector.split(type);
            if (s[0].indexOf(':') != -1 || s[0].indexOf('[') != -1) p = setType(s[0], p);
            else p = this.query(s[0], p);
            TB.utils.each(p, function (parent) {
                var a = (type == '>') ? parent.childNodes : parent.parentNode.childNodes;
                len = a.length;
                for (var i = 0; i < len; i++) {
                    if (a[i].nodeType == 1) arr.push(a[i]);
                }
            });
            if (s[1].indexOf(':') != -1 || s[1].indexOf('[') != -1) p = this.setType(s[1], arr);
            else p = this.query(s[1], arr);
            return p;
        },
        cutOrder: function (selector, parents) {
            var arr = [];
            if (selector.indexOf(':first') != -1) {
                arr.push(parents[0]);
            }
            else if (selector.indexOf(':last') != -1) {
                arr.push(parents[parents.length - 1]);
            }
            else if (selector.indexOf(':even') != -1) {
                TB.utils.each(parents, function (parent, i) {
                    if (i % 2 == 0) arr.push(parent);
                });
            }
            else if (selector.indexOf(':odd') != -1) {
                TB.utils.each(parents, function (parent, i) {
                    if (i % 2 == 1) arr.push(parent);
                });
            }
            else if (selector.indexOf(':eq') != -1) {
                var reg = /:eq\((\d+)\)/;
                var index = parseInt(reg.exec(selector)[1]);
                arr.push(parents[index]);
            }
            else if (selector.indexOf(':gt') != -1) {
                var reg = /:gt\((\d+)\)/;
                var index = parseInt(reg.exec(selector)[1]);
                TB.utils.each(parents, function (parent, i) {
                    if (i > index) arr.push(parent);
                });
            }
            else if (selector.indexOf(':lt') != -1) {
                var reg = /:lt\((\d+)\)/;
                var index = parseInt(reg.exec(selector)[1]);
                TB.utils.each(parents, function (parent, i) {
                    if (i < index) arr.push(parent);
                });
            }
            return arr;
        },
        cutAttr: function (selector, parents) {
            var arr = [], a_str = selector.substring(selector.indexOf('[') + 1, selector.indexOf(']')), attr = [];
            var temp = a_str.split(',');
            for (var i = 0; i < temp.length; i++) {
                var mark = '=';
                if (temp[i].indexOf('!=') != -1) mark = '!=';
                var t = temp[i].split(mark);
                var obj = {};
                obj.name = t[0];
                obj.attr = t[1].replace(/\'|\"/g, '');
                obj.ifno = (mark == '=') ? true : false;
                attr.push(obj);
            }
            TB.utils.each(parents, function (parent) {
                for (var i = 0; i < attr.length; i++) {
                    if (attr[i].ifno && parent[attr[i].name] && parent[attr[i].name] == attr[i].attr) arr.push(parent);
                    if (!attr[i].ifno) arr.push(parent);
                }
            });
            return arr;
        }
    },
    trim: function (str) {
        if (typeof str != 'string') return;
        return str.replace(/^\s+|\s+$/g, '');
    },
    mergeSpace: function (str) {
        var reg = /\s+/g;
        return this.trim(str).replace(reg, ' ');
    },
    each: function (arr, iterator) {
        for (var i = 0, il = arr.length; i < il; i++) {
            var v = iterator(arr[i], i);
        }
    },
    indexOf: function (arr, value) {
        for (var i = 0, il = arr.length; i < il; i++) {
            if (arr[i] == value) return i;
        }
        return -1;
    },
    //将任何对象转换为数组
    makeArray: function (o) {
        if (o == null) return [];
        if (!o.length || typeof o === 'string') return [o];
        var result = [];
        for (var i = 0; i < o.length; i++)
            result[i] = o[i];
        return result;
    },
    //判断是否为DOM节点
    isElement: function (ele) {
        return !!(ele && ele.nodeType == 1 || ele && ele.nodeType == 11);
    },
    //创建元素
    create: function (tag, parent, classes) {
        var newTag = document.createElement(tag);
        parent = (typeof parent != 'undefined' && this.isElement(parent)) ? this.$(parent) : document.body;
        if (parent) parent.appendChild(newTag);
        else return null;
        if (typeof classes == 'string') newTag.className = classes;
        return newTag;
    },
    //删除元素
    remove: function (tag) {
        tag.parentNode.removeChild(tag);
    },
    hasClass: function (ele, c) {
        if (ele.className) {
            if (c) {
                return new RegExp('\\b' + this.trim(c) + '\\b').test(ele.className);
            }
            else
                return ele.className;
        }
    },
    addClass: function (ele, c) {
        var arr = [];
        if (ele.className) {
            arr = ele.className.split(' ');
            if (this.indexOf(arr, c) == -1) arr.push(c);
        } else {
            arr.push(c);
        }
        ele.className = arr.join(' ');
    },
    removeClass: function (ele, c) {
        if (ele.className) {
            ele.className = this.trim(ele.className.replace(new RegExp('\\b' + c + '\\b\\s*', 'g'), ''));
        }
    },
    pos: function (el) {
        if (el.parentNode === null || el.style.display == 'none') return false;
        var parent = null, pos = [], box;
        if (el.getBoundingClientRect) {
            box = el.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop
            };
        }
        else
            if (document.getBoxObjectFor) {
                box = document.getBoxObjectFor(el);
                var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
                var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
                pos = [box.x - borderLeft, box.y - borderTop];
            }
            else {
                pos = [el.offsetLeft, el.offsetTop];
                parent = el.offsetParent;
                if (parent != el) {
                    while (parent) {
                        pos[0] += parent.offsetLeft;
                        pos[1] += parent.offsetTop;
                        parent = parent.offsetParent;
                    }
                }
                if (!window.opera || (!(navigator.userAgent.indexOf('Safari') >= 0) && e.style.position == 'absolute')) {
                    pos[0] -= document.body.offsetLeft;
                    pos[1] -= document.body.offsetTop;
                }
            }
        if (el.parentNode) {
            parent = el.parentNode;
        }
        else {
            parent = null;
        }
        while (parent && parent.tagName.toUpperCase() != 'BODY' && parentName.toUpperCase() != 'HTML') {
            pos[0] -= parent.scrollLeft;
            pos[1] -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            }
            else parent = null;
        }
        return { x: pos[0], y: pos[1] };
    },
    width: function (el, value) {
        if (typeof value == 'undefined') {
            return el.offsetWidth;
        }
        else return this.css(el, 'width', value + 'px');
    },
    height: function (el, value) {
        if (typeof value == 'undefined') {
            return el.offsetHeight;
        }
        else return this.css(el, 'height', value + 'px');
    },
    left: function (el, value) {
        if (typeof value == 'undefined') {
            return this.pos(el).x;
        }
        else return this.css(el, 'left', value + 'px');
    },
    top: function (el, value) {
        if (typeof value == 'undefined') {
            return this.pos(el).y;
        }
        else return this.css(el, 'top', value + 'px');
    },
    css: function (ele, name, value) {
        if (typeof name == 'undefined' && typeof value == 'undefined') {
            return ele.style.cssText;
        }
        else if (typeof name == 'string' && typeof value == 'undefined') {
            if (name == 'float') name = (window.ActiveXObject) ? 'styleFloat' : 'cssFloat';
            if (name == 'opacity' && window.ActiveXObject && ele.style.filter)
                return parseFloat(ele.style.filter.replace(/alpha\(opacity=/, '').replace(/\)/, '')) / 100;
            else {
                name = this.camelCase(name);
                return ele.style[name];
            }
        }
        else if (typeof name == 'object' && typeof value == 'undefined') {
            var params = name;
            for (var n in params) {
                var param;
                if (n == 'opacity' && window.ActiveXObject) {
                    ele.style.filter = 'alpha(opacity=' + parseInt(parseFloat(params[n]) * 100) + ')';
                }
                else {
                    if (n == 'float') {
                        param = (window.ActiveXObject) ? 'styleFloat' : 'cssFloat';
                    }
                    else {
                        param = this.camelCase(n);
                    }
                    ele.style[param] = params[n];
                }
            }
        }
        else
            if (typeof name == 'string' && typeof value != 'undefined') {
                if (name == 'float') name = (window.ActiveXObject) ? 'styleFloat' : 'cssFloat';
                if (name == 'opacity' && window.ActiveXObject)
                    ele.style.filter = 'alpha(opacity=' + parseInt(parseFloat(value) * 100) + ')';
                else {
                    name = this.camelCase(name);
                    ele.style[name] = value;
                }
            }
    },
    camelCase: function (str) {
        return str.replace(/-\D/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    },
    hyphenate: function (str) {
        return str.replace(/[A-Z]/g, function (match) {
            return ('-' + match.charAt(0).toLowerCase());
        });
    },
    isArray: function (value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },
    prop: function (ele, name, value) {
        if (typeof (value) == 'undefined' && ele[name]) {
            return ele[name];
        } else {
            ele[name] = value;
        }
    },
    text: function (ele, value) {
        return this.prop(ele, typeof ele.innerText != 'undefined' ? 'innerText' : 'textContent', value);
    },
    bind: function (ele, name, fn) {
        if (ele.attachEvent) {
            ele['e' + name + fn] = fn;
            ele[name + fn] = function () {
                ele['e' + name + fn](window.event);
            }
            ele.attachEvent('on' + name, ele[name + fn]);
        }
        else ele.addEventListener(name, fn, false);
    },
    unbind: function (ele, name, fn) {
        if (ele.detachEvent) {
            ele.detachEvent('on' + name, ele[name + fn]);
            ele[name + fn] = null;
        }
        else ele.removeEventListener(name, fn, false);
    },
    cancelEventUp: function () {
        if (window.ActiveXObject) window.event.cancelBubble = true;
        else {
            var e = this.searchEvent();
            e.stopPropagation();
        }
    },
    searchEvent: function () {
        var func = this.searchEvent.caller;
        while (func != null) {
            var arg0 = func.arguments[0];
            if (arg0) {
                if (arg0.constructor == Event || arg0.constructor == MouseEvent)
                    return arg0;
            }
            func = func.caller;
        }
        return null;
    },
    //删除数组中指定索引的值
    removeAt: function (arr, position) {
        var items = [];
        if (position >= arr.length) return;
        else {
            items = arr.slice(0, position).concat(arr.slice(position + 1, arr.length));
            return items;
        }
    },
    //设置URL格式
    setUrl: function (url) {
        return (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
    },
    //查找祖先
    findAncestor: function (obj, parent) {
        while (obj.parentNode && obj != parent) {
            obj = obj.parentNode;
        }
        return obj == parent;
    }
};
/*
*cookie获取、设置、删除
*/
TB.utils.Cookie = {
    get: function (name) {
        var tmp, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
        if ((tmp = reg.exec(document.cookie)))
            return (tmp[2]);
        return null;
    },
    set: function (name, value, expires, domain, path) {
        var str = name + "=" + value;
        if (expires != null || expires != '') {
            if (expires == 0) { expires = 100 * 365 * 24 * 60; }
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 60 * 1000);
            str += "; expires=" + exp.toGMTString();
        }
        if (path) { str += "; path=" + path; }
        if (domain) { str += "; domain=" + domain; }
        document.cookie = str;
    },
    del: function (name, domain, path) {
        document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
};
//jsonp格式请求
TB.utils.jsonp = function (url, callback, jp_no) {
    var url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
    var name = 'hxbase_json' + new Date().getTime();
    if (typeof jp_no != 'undefined') name += jp_no;
    url += 'callback=' + name;
    window[name] = callback;
    var road = document.createElement('script');
    road.type = 'text/javascript';
    road.src = url;
    document.getElementsByTagName('head')[0].appendChild(road);
    if (road.readyState) {
        road.onreadystatechange = function () {
            if (road.readyState == 'loaded' || road.readyState == 'complete') {
                road.onreadystatechange = null;
                document.getElementsByTagName('head')[0].removeChild(road);
                window[name] = 'undefined';
                try { delete window[name]; }
                catch (e) { }
            }
        }
    }
    else {
        road.onload = function () {
            document.getElementsByTagName('head')[0].removeChild(road);
            window[name] = 'undefined';
            try { delete window[name]; }
            catch (e) { }
        }
    }
};
//异步加载
TB.utils.Loading = function (url, type, callback, id) {
    if (type == 'img' || type == 'script' || type == 'link') {
        var road = null;
        if (type == 'img') {
            road = new Image();
            road.src = url + '?time=' + new Date().getTime();
        }
        else {
            road = document.createElement(type);
            if (type == 'script') {
                road.type = 'text/javascript';
                road.src = url;
            }
            if (type == 'link') {
                road.type = 'text/css';
                road.rel = "stylesheet";
                road.href = url;
            }
            document.getElementsByTagName('head')[0].appendChild(road);
        }
        if (typeof id != 'undefined') road.id = id;
        if (road.readyState) {
            road.onreadystatechange = function () {
                if (road.readyState == 'loaded' || road.readyState == 'complete') {
                    road.onreadystatechange = null;
                    callback(road);
                }
            }
        }
        else {
            road.onload = function () {
                callback(road);
            }
        }
    }
};
//获取URL参数
TB.utils.$U = {
    getParams: function () {
        var arr = arguments;
        var value = {};
        var url = location.search;
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            if (str.indexOf('&') != -1) {
                var v = str.split('&');
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < v.length; j++) {
                        if (arr[i] == v[j].split('=')[0]) value[arr[i]] = v[j].split('=')[1];
                    }
                }
            }
            else value[str.split('=')[0]] = str.split('=')[1];
        }
        return value;
    },
    getDomain: function () {
        //hash锚，host主机名端口(hostname|port)，协议protocol，路径pathname。
        var url = location.hostname;
        return (url.indexOf('www.') != -1) ? url.substr(4) : url;
    }
};

/**
*拖动类
*/
TB.Drag = new TB.utils.init();
TB.Drag.prototype = {
    initialize: function (drag, options) {
        this.drag = TB.utils.$(drag);
        this._x = this._y = 0;
        this.FM = TB.utils.inhertEvent(this, this.Move);
        this.FS = TB.utils.inhert(this, this.Stop);
        this.setDefault(options);
        this.Limit = !!this.options.Limit;
        this.mxLeft = parseInt(this.options.mxLeft);
        this.mxTop = parseInt(this.options.mxTop);
        this.mxRight = parseInt(this.options.mxRight);
        this.mxBottom = parseInt(this.options.mxBottom);
        this.LockX = !!this.options.LockX;
        this.LockY = !!this.options.LockY;
        this.Lock = !!this.options.Lock;
        this.conLimit = !!this.options.conLimit;
        this.repairX = this.options.repairX;
        this.repairY = this.options.repairY;
        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;
        this.Handle = TB.utils.$(this.options.Handle) || this.drag;
        this.drag.style.position = 'absolute';
        //兼容ipad
        this.eventStart = TB.utils.$B.Apple ? 'touchstart' : 'mousedown';
        this.eventMove = TB.utils.$B.Apple ? 'touchmove' : 'mousemove';
        this.eventEnd = TB.utils.$B.Apple ? 'touchend' : 'mouseup';
        if (this.options.e == null) TB.utils.bind(this.Handle, this.eventStart, TB.utils.inhertEvent(this, this.Start));
        else this.Start(this.options.e);
    },
    //默认参数设定
    setDefault: function (options) {
        this.options = {
            Handle: '', //拖动柄
            Limit: false,
            mxLeft: 0, //左限
            mxTop: 0, //上限
            mxRight: 9999, //右限
            mxBottom: 9999, //下限
            Lock: false, //是否锁定
            LockX: false, //锁定水平
            LockY: false, //锁定垂直
            conLimit: false, //设定容器
            repairX: 0,
            repairY: 0,
            e: null,
            onStart: function () { },
            onMove: function () { },
            onStop: function () { }
        };
        TB.utils.Extend(this.options, options || {});
    },
    //触发拖动
    Start: function (oEvent) {
        if (this.Lock) return;
        this._x = TB.utils.$B.Apple ? (oEvent.targetTouches[0].clientX - this.drag.offsetLeft) : (oEvent.clientX - this.drag.offsetLeft);
        this._y = TB.utils.$B.Apple ? (oEvent.targetTouches[0].clientY - this.drag.offsetTop) : (oEvent.clientY - this.drag.offsetTop);
        TB.utils.bind(document, this.eventMove, this.FM);
        TB.utils.bind(document, this.eventEnd, this.FS);
        if (TB.utils.$B.IE) {
            TB.utils.bind(this.Handle, 'losecapture', this.FS);
            this.Handle.setCapture();
        }
        else {
            TB.utils.bind(window, 'blur', this.FS);
            oEvent.preventDefault();
        }
        this.onStart(oEvent);
    },
    //拖动中
    Move: function (oEvent) {
        if (this.Lock) { this.Stop(); return; };
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();  //清除选择
        var vLeft = TB.utils.$B.Apple ? (oEvent.targetTouches[0].clientX - this._x) : (oEvent.clientX - this._x), vTop = TB.utils.$B.Apple ? (oEvent.targetTouches[0].clientY - this._y) : (oEvent.clientY - this._y);
        if (this.Limit) {
            vLeft = Math.max(Math.min(vLeft, this.mxRight - this.drag.offsetWidth), this.mxLeft);
            vTop = Math.max(Math.min(vTop, this.mxBottom - this.drag.offsetHeight), this.mxTop);
        }
        if (!this.LockX) this.drag.style.left = (TB.utils.$B.IE && this.conLimit) ? (vLeft + this.repairX + "px") : (vLeft + "px");
        if (!this.LockY) this.drag.style.top = (TB.utils.$B.IE && this.conLimit) ? (vTop + this.repairY + "px") : (vTop + "px");
        this.onMove();
    },
    //结束拖动
    Stop: function (oEvent) {
        TB.utils.unbind(document, this.eventMove, this.FM);
        TB.utils.unbind(document, this.eventEnd, this.FS);
        if (TB.utils.$B.IE) {
            TB.utils.unbind(this.Handle, "losecapture", this.FS);
            this.Handle.releaseCapture();
        } else {
            TB.utils.unbind(window, "blur", this.FS);
        };
        this.onStop(oEvent);
    }
};


//动画类
TB.Animator = new TB.utils.init();
TB.Animator.prototype = {
    initialize: function (options) {
        this.setDefault(options);
        this.subjects = [];   //动画主题
        this.state = 0; //开始状态标示
        this.target = 0; //目标状态标示
        this.lastTime = null; //当前时间标示
        var _this = this;
        this.timer = function () { _this.timerEvent(); };  //每帧执行的参数变动函数
    },
    setDefault: function (options) {
        this.options = {
            frame: 20,  //运动帧频，默认为20毫秒一次
            duration: 400, //运动持久时间，默认为400毫秒
            transition: TB.Animator.tx.easeInOut, //采用的动画形式
            onComplete: function () { }, //完成后执行的扩展函数
            onMove: function () { }     //运动期间的扩展函数
        };
        TB.utils.Extend(this.options, options || {});
    },
    //启动动画
    toggle: function () {
        this.seekTo(1 - this.target);
    },
    //查找尾状态
    seekTo: function (to) {
        this.seekFromTo(this.state, to);
    },
    //确定始末状态，启动setInterval
    seekFromTo: function (from, to) {
        this.target = Math.max(0, Math.min(1, to));
        this.state = Math.max(0, Math.min(1, from));
        this.lastTime = new Date().getTime();
        if (!this.intervalId)
            this.intervalId = setInterval(this.timer, this.options.frame);
    },
    //状态值的变换
    timerEvent: function () {
        var now = new Date().getTime();
        var timePassed = now - this.lastTime;
        this.lastTime = now;
        var movement = (timePassed / this.options.duration) * (this.state < this.target ? 1 : -1);
        if (Math.abs(movement) >= Math.abs(this.state - this.target)) {
            this.state = this.target;
        } else {
            this.state += movement;
        }
        try {
            this.propagate();
        } finally {
            this.options.onMove.call(this);
            if (this.target == this.state) {
                window.clearInterval(this.intervalId);
                this.intervalId = null;
                this.options.onComplete.call(this);
            }
        }
    },
    //启动相应的动画算法，根据记录的变动state值作为参数，并返回相应的值value，并将此值赋给动画主题
    propagate: function () {
        var value = this.options.transition(this.state);
        for (var i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].setState) {
                this.subjects[i].setState(value);
            } else {
                this.subjects[i](value);
            }
        }
    },
    //添加动画主题，返回对象本身，链式操作
    addSubject: function (subject) {
        this.subjects[this.subjects.length] = subject;
        return this;
    }
};

//动画算法集
TB.Animator.makeEaseIn = function (a) {
    return function (state) {
        return Math.pow(state, a * 2);
    }
};
TB.Animator.makeEaseOut = function (a) {
    return function (state) {
        return 1 - Math.pow(1 - state, a * 2);
    }
};
TB.Animator.makeElastic = function (bounces) {
    return function (state) {
        state = TB.Animator.tx.easeInOut(state);
        return ((1 - Math.cos(state * Math.PI * bounces)) * (1 - state)) + state;
    }
};
TB.Animator.makeBounce = function (bounces) {
    var fn = TB.Animator.makeElastic(bounces);
    return function (state) {
        state = fn(state);
        return state <= 1 ? state : 2 - state;
    }
};
TB.Animator.makeADSR = function (attackEnd, decayEnd, sustainEnd, sustainLevel) {
    if (sustainLevel == null) sustainLevel = 0.5;
    return function (state) {
        if (state < attackEnd) {
            return state / attackEnd;
        }
        if (state < decayEnd) {
            return 1 - ((state - attackEnd) / (decayEnd - attackEnd) * (1 - sustainLevel));
        }
        if (state < sustainEnd) {
            return sustainLevel;
        }
        return sustainLevel * (1 - ((state - sustainEnd) / (1 - sustainEnd)));
    }
};
TB.Animator.tx = {
    easeInOut: function (pos) {
        return ((-Math.cos(pos * Math.PI) / 2) + 0.5);
    },
    linear: function (x) {
        return x;
    },
    easeIn: TB.Animator.makeEaseIn(1.5),
    easeOut: TB.Animator.makeEaseOut(1.5),
    strongEaseIn: TB.Animator.makeEaseIn(2.5),
    strongEaseOut: TB.Animator.makeEaseOut(2.5),
    elastic: TB.Animator.makeElastic(1),
    veryElastic: TB.Animator.makeElastic(3),
    bouncy: TB.Animator.makeBounce(1),
    veryBouncy: TB.Animator.makeBounce(3)
};

//自定义主题包
/*
*数字主题包
*eles:元素对象数组
*property:要改变的属性
*from:初始值
*to:目标值
*units:单位
*/
function NumSubject(eles, property, from, to, units) {
    this.eles = TB.utils.makeArray(eles);
    if (property == 'opacity' && window.ActiveXObject) {
        this.property = 'filter';
    } else {
        this.property = TB.utils.camelCase(property);
    }
    this.from = parseFloat(from);
    this.to = parseFloat(to);
    this.units = ((typeof units != 'undefined') && (units != null)) ? units : 'px';
}
NumSubject.prototype = {
    setState: function (state) {
        var style = this.getStyle(state);
        var visibility = (this.property == 'opacity' && state == 0) ? 'hidden' : '';
        var j = 0;
        for (var i = 0; i < this.eles.length; i++) {
            try {
                this.eles[i].style[this.property] = style;
            } catch (e) {
                // ff下的一个异常处理
                if (this.property != 'fontWeight') throw e;
            }
            if (j++ > 20) return;
        }
    },
    getStyle: function (state) {
        state = this.from + ((this.to - this.from) * state);
        if (this.property == 'filter') return "alpha(opacity=" + Math.round(state * 100) + ")";
        if (this.property == 'opacity') return state;
        return Math.round(state) + this.units;
    }
};
/*
*颜色主题包
*eles:元素对象数组
*property:要改变的属性
*from:初始值
*to:目标值
*/
function ColorSubject(eles, property, from, to) {
    this.eles = TB.utils.makeArray(eles);
    this.property = TB.utils.camelCase(property);
    this.to = this.expandColor(to);
    this.from = this.expandColor(from);
    this.origFrom = from;
    this.origTo = to;
}
ColorSubject.prototype = {
    expandColor: function (color) {
        var hexColor, red, green, blue;
        hexColor = ColorSubject.parseColor(color);
        if (hexColor) {
            red = parseInt(hexColor.slice(1, 3), 16);
            green = parseInt(hexColor.slice(3, 5), 16);
            blue = parseInt(hexColor.slice(5, 7), 16);
            return [red, green, blue];
        }
        if (window.DEBUG) {
            alert("Invalid colour: '" + color + "'");
        }
    },
    getValueForState: function (color, state) {
        return Math.round(this.from[color] + ((this.to[color] - this.from[color]) * state));
    },
    setState: function (state) {
        var color = '#'
				+ ColorSubject.toColorPart(this.getValueForState(0, state))
				+ ColorSubject.toColorPart(this.getValueForState(1, state))
				+ ColorSubject.toColorPart(this.getValueForState(2, state));
        for (var i = 0; i < this.eles.length; i++) {
            this.eles[i].style[this.property] = color;
        }
    }
};
ColorSubject.parseColor = function (str) {
    var color = '#', match;
    if (match = ColorSubject.rgbReg.exec(str)) {
        var part;
        for (var i = 1; i <= 3; i++) {
            part = Math.max(0, Math.min(255, parseInt(match[i])));
            color += ColorSubject.toColorPart(part);
        }
        return color;
    }
    if (match = ColorSubject.hexReg.exec(str)) {
        if (match[1].length == 3) {
            for (var i = 0; i < 3; i++) {
                color += match[1].charAt(i) + match[1].charAt(i);
            }
            return color;
        }
        return '#' + match[1];
    }
    return false;
};
ColorSubject.toColorPart = function (number) {
    if (number > 255) number = 255;
    var digits = number.toString(16);
    if (number < 16) return '0' + digits;
    return digits;
};
ColorSubject.rgbReg = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
ColorSubject.hexReg = /^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;



/*
*name:TB.Bar和讯工具条主体
*data:2011-12-12
*author:huangqiang
*company:hexun.com
*/
TB.Bar = new TB.utils.init();

TB.Bar.prototype = {
    initialize: function (options) {
        this.setDefault(options);
        this.contrainer = this.options.contrainer;
        this.state = this.options.state;
        this.app = this.options.app;
        this.news = this.options.news;
        this.about = this.options.about;
        this.stock = this.options.stock;
        this.pops = this.options.pops;
        this.stateTime = this.options.stateTime;
        //DOM创建
        this.onCreate();
    },
    setDefault: function (options) {
        this.options = {
            //装载容器
            contrainer: document.body,
            //type:状态0,1,2
            //0:隐藏；1:显示；2:app显示
            //time:cookie过期时间
            state: 1,
            //过期时间
            stateTime: 60 * 24,
            //应用模块
            app: true,
            //新闻模块
            news: true,
            //关于模块
            about: true,
            //股票模块
            stock: true,
            //弹窗模块
            pops: true
        };
        TB.utils.Extend(this.options, options || {});
    },
    onCreate: function () {
        //文档碎片，缓存DOM
        this.frag = document.createDocumentFragment();
        //工具条主体
        this.bar = TB.utils.create('div', this.frag);
        //插个IE6恶心的毛办法
        if (TB.utils.$B.IE6()) {
            this.ie6_excess = TB.utils.create('div', this.frag, TB.params.toolsId + '_ie6');
            this.ie6_excess.style.display = 'none';
        }
        //主体赋予唯一ID号，统一样式入口
        this.bar.id = TB.params.toolsId;
        //工具条内容区域
        this.bar_bodyer = TB.utils.create('div', this.bar, 'bar_bodyer');
        //应用层
        this.app_area = TB.utils.create('div', this.bar_bodyer, 'app_area');
        //新闻层
        this.news_area = TB.utils.create('div', this.bar_bodyer, 'news_area');
        //关于层
        this.about_area = TB.utils.create('div', this.bar_bodyer, 'about_area');
        //股票层
        this.stock_area = TB.utils.create('div', this.bar_bodyer, 'stock_area');
        //开关层
        this.bar_toggle = TB.utils.create('div', this.bar_bodyer);
        //创建DOM
        this.contrainer.appendChild(this.frag);
        //工具条状态
        if (this.state == 0) {
            this.bar_toggle.className = 'bar_closed';
            if (TB.utils.$B.IE6()) {
                var left = TB.utils.left(this.bar_bodyer) + TB.params.width;
                this.bar.style.display = 'none';
                this.ie6_excess.style.display = '';
                if (screen.width <= 1024) left -= 10;
                this.ie6_excess.style.left = left + 'px';
            }
            else this.bar.style.bottom = '-24px';
        }
        else {
            this.bar_toggle.className = 'bar_toggle';
            if (TB.utils.$B.IE6()) {
                if (screen.width <= 1024) {
                    this.bar_toggle.style.right = '-18px';
                }
            }
        }
        if (this.app) this.appDom();
        if (this.news) this.newsDom();
        if (this.about) this.aboutDom();
        if (this.stock) this.stockDom();
        if (this.pops) this.popsDom();
        //添事件
        this.addEvent();
    },
    //事件
    addEvent: function () {
        var _this = this;
        //开关层
        TB.utils.bind(this.bar_toggle, 'mouseover', function () {
            if (TB.utils.hasClass(this, 'bar_toggle')) TB.utils.addClass(this, 'bar_toggle_over');
            else if (TB.utils.hasClass(this, 'bar_closed')) TB.utils.addClass(this, 'bar_closed_over');
        });
        TB.utils.bind(this.bar_toggle, 'mouseout', function () {
            if (TB.utils.hasClass(this, 'bar_toggle')) TB.utils.removeClass(this, 'bar_toggle_over');
            else if (TB.utils.hasClass(this, 'bar_closed')) TB.utils.removeClass(this, 'bar_closed_over');
        });
        TB.utils.bind(this.bar_toggle, 'click', function () {
            if (TB.utils.hasClass(this, 'bar_closed')) _this.openBar();
            else if (TB.utils.hasClass(this, 'bar_toggle')) _this.closedBar();
        });
        //ie6
        if (TB.utils.$B.IE6()) {
            TB.utils.bind(this.ie6_excess, 'click', function () {
                this.style.display = 'none';
                _this.bar_toggle.className = 'bar_toggle';
                _this.bar.style.display = '';
                if (screen.width <= 1024) _this.bar_toggle.style.right = '-18px';
                TB.utils.Cookie.del(TB.params.cookie.state, 'hexun.com');
                TB.utils.Cookie.set(TB.params.cookie.state, 1, _this.stateTime, 'hexun.com');
            });
        }
        //添加document事件
        TB.utils.bind(document, 'click', function (e) {
            var source = e.srcElement || e.target;
            if (!TB.utils.findAncestor(source, _this.bar) && !TB.utils.findAncestor(source, TB.utils.$('hxToolsBar20111010_login'))) {
                _this.closeAppPanel();
                _this.closeStockPanel();
            }
        });
    },
    //打开bar
    openBar: function () {
        TBisCloseBar = true;
        this.bar_toggle.className = 'bar_toggle';
        this.bar.style.bottom = '0px';
        //设置状态
        this.state = 1;
        TB.utils.Cookie.del(TB.params.cookie.state, 'hexun.com');
        TB.utils.Cookie.set(TB.params.cookie.state, 1, this.stateTime, 'hexun.com');
    },
    //关闭bar
    closedBar: function () {
        TBisCloseBar = false;
        if (this.app) {
            this.closeAppPanel();
        }
        if (this.stock) {
            this.closeStockPanel();
        }
        if (TB.utils.$B.IE6()) {
            var left = TB.utils.left(this.bar_bodyer) + TB.params.width;
            this.bar.style.display = 'none';
            this.ie6_excess.style.display = '';
            if (screen.width <= 1024) left -= 10;
            this.ie6_excess.style.left = left + 'px';
        }
        else {
            this.bar_toggle.className = 'bar_closed';
            this.bar.style.bottom = '-24px';
        }
        //设置状态
        this.state = 0;
        TB.utils.Cookie.del(TB.params.cookie.state, 'hexun.com');
        TB.utils.Cookie.set(TB.params.cookie.state, 0, this.stateTime, 'hexun.com');
    },
    //应用程序DOM
    appDom: function () {
        //开始按钮
        this.bar_myhexun = TB.utils.create('div', this.app_area, 'bar_myhexun');
        this.bar_myhexun.title = TB.lang.beginBtn;
        //app面板
        this.myapp_panel = TB.utils.create('div', this.bar_bodyer, 'myapp_panel');
        var closed = TB.utils.create('div', this.myapp_panel, 'closed');
        var span = TB.utils.create('span', closed);
        //list面板
        this.app_list = TB.utils.create('div', this.bar_bodyer, 'app_list');
        this.app_list.style.display = 'none';
        //状态判断
        if (this.state == 2) TB.utils.addClass(this.bar_myhexun, 'bar_myhexun_open');
        else this.myapp_panel.style.display = 'none';
        //开始按钮事件
        var _this = this;
        TB.utils.bind(this.bar_myhexun, 'mouseover', function () {
            if (TB.utils.hasClass(this, 'bar_myhexun_open')) return;
            TB.utils.addClass(this, 'bar_myhexun_over');
        });
        TB.utils.bind(this.bar_myhexun, 'mouseout', function () {
            if (TB.utils.hasClass(this, 'bar_myhexun_open')) return;
            TB.utils.removeClass(this, 'bar_myhexun_over');
        });
        TB.utils.bind(this.bar_myhexun, 'click', function () {
            if (TB.utils.hasClass(this, 'bar_myhexun_open')) {
                _this.closeAppPanel();
                //设置cookie状态
                //....
            }
            else {
                _this.openAppPanel();
                //设置cookie状态
                //.....
            }
        });
        //应用层关闭事件
        TB.utils.bind(span, 'mouseover', function () {
            TB.utils.addClass(this, 'over');
        });
        TB.utils.bind(span, 'mouseout', function () {
            TB.utils.removeClass(this, 'over');
        });
        TB.utils.bind(span, 'click', function () {
            _this.closeAppPanel();
        });
    },
    //滚动新闻DOM
    newsDom: function () {
        this.bar_news = TB.utils.create('div', this.news_area, 'bar_news');
    },
    //关于DOM
    aboutDom: function () {
        this.bar_about = TB.utils.create('div', this.about_area);
    },
    //股票DOM
    stockDom: function () {
        this.bar_stock = TB.utils.create('div', this.stock_area, 'bar_mystock');
        this.mystock_panel = TB.utils.create('div', this.bar_bodyer, 'mystock_panel');
        this.mystock_panel.style.display = 'none';
        var ms_header = TB.utils.create('div', this.mystock_panel, 'ms_header');
        var span = TB.utils.create('span', ms_header, 'ms_closed');
        var title = document.createTextNode(TB.lang.mystockTitle);
        ms_header.appendChild(title);
        var _this = this, timer = null;
        TB.utils.bind(this.bar_stock, 'mouseover', function () {
            if (TB.utils.hasClass(this, 'bar_mystock_on')) return;
            TB.utils.addClass(this, 'bar_mystock_over');
            clearTimeout(timer);
            timer = setTimeout(function () { _this.openStockPanel() }, 500);
        });
        TB.utils.bind(this.bar_stock, 'mouseout', function () {
            clearTimeout(timer);
            if (TB.utils.hasClass(this, 'bar_mystock_on')) return;
            TB.utils.removeClass(this, 'bar_mystock_over');
        });
        TB.utils.bind(span, 'mouseover', function () {
            TB.utils.addClass(this, 'ms_closed_over');
        });
        TB.utils.bind(span, 'mouseout', function () {
            TB.utils.removeClass(this, 'ms_closed_over');
        });
        TB.utils.bind(span, 'click', function () {
            _this.closeStockPanel();
        });
    },
    //弹窗
    popsDom: function () {
        this.bar_pops = TB.utils.create('div', this.bar, 'pop_window');
        this.bar_pops.style.display = 'none';
    },
    //关闭我的应用面板
    closeAppPanel: function () {
        if (!this.app || this.myapp_panel.style.display == 'none') return;
        this.myapp_panel.style.display = 'none';
        var list = TB.utils.$$('.list_con', [this.app_list]);
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].style.display = 'none';
        }
        this.app_list.style.display = 'none';
        TB.utils.removeClass(this.bar_myhexun, 'bar_myhexun_open');
        TB.utils.removeClass(this.bar_myhexun, 'bar_myhexun_over');
        var arr = TB.utils.$$('.myapp_menu ul li', [this.myapp_panel]);
        if (arr.length && arr.length >= 1) {
            for (var i = 0, len = arr.length; i < len; i++) {
                TB.utils.removeClass(arr[i], 'on');
            }
        }
    },
    //开启我的应用
    openAppPanel: function () {

        if (!this.app) return;
        this.myapp_panel.style.display = '';
        TB.utils.addClass(this.bar_myhexun, 'bar_myhexun_open');
        var h = TB.utils.height(this.myapp_panel);
        this.myapp_panel.style.top = -h + 'px';
    },
    //关闭我的股票面板
    closeStockPanel: function () {
        this.mystock_panel.style.display = 'none';
        TB.utils.removeClass(this.bar_stock, 'bar_mystock_on');
        TB.utils.removeClass(this.bar_stock, 'bar_mystock_over');
    },
    //开启我的股票面板
    openStockPanel: function () {
        this.mystock_panel.style.display = '';
        TB.utils.addClass(this.bar_stock, 'bar_mystock_on');
        var h = TB.utils.height(this.mystock_panel);
        this.mystock_panel.style.top = -h + 'px';
    }
};



/*
*name:TB.MyApp和讯工具条应用面板
*data:2011-12-13
*author:huangqiang
*company:hexun.com
*/
TB.MyApp = new TB.utils.init();
TB.MyApp.prototype = {
    initialize: function (appPanel, listPanel, options) {
        this.appPanel = appPanel || null;
        this.listPanel = listPanel || null;
        this.setDefault(options);
        //是否登录
        this.isLogin = this.options.isLogin;
        //用户ID
        this.userId = this.options.userId;
        //统计接口
        this.ports_cout = this.options.ports_cout;
        //排序接口
        this.ports_order = this.options.ports_order;
        //请求应用数据接口
        this.ports_app = this.options.ports_app;
        //用户登录信息
        this.userInfo = this.options.userInfo;
        //最近访问数据
        this.visitData = this.options.visitData;
        //最近访问数据最大条数
        this.maxVisit = this.options.maxVisit;
        //我的应用数据
        this.appType = this.options.appType;
        //类别最大数
        this.maxType = this.options.maxType;
        //最大列表数
        this.maxList = this.options.maxList;
        //延时显示
        this.delay = this.options.delay;
        //删除接口
        this.ports_del = this.options.ports_del;
        //延时计时器
        this.timer = null;
        //是否选中
        this.selected = false;
        this.onCreate();
    },
    setDefault: function (options) {
        this.options = {
            isLogin: 0,
            userId: null,
            ports_cout: null,
            ports_order: null,
            ports_app: null,
            userInfo: null,
            visitData: null,
            appType: null,
            ports_del: null,
            maxVisit: 6,
            maxType: 4,
            maxList: 13,
            delay: 200
        };
        TB.utils.Extend(this.options, options || {});
    },
    onCreate: function () {
        var frag = document.createDocumentFragment();
        //登录模块
        var myapp_head = TB.utils.create('div', frag, 'myapp_head');
        var unlogined = TB.utils.create('div', myapp_head, 'unlogined');
        var onlogined = TB.utils.create('div', myapp_head, 'onlogined');
        if (this.isLogin != 1) {
            onlogined.style.display = 'none';
            unlogined.innerHTML = TB.lang.tips_unlogin + '&nbsp;<a href="javascript:;" class="linked_login" onclick="TB.loginDialog.show();return false;">' + TB.lang.linked_login + '</a>';
        }
        else {
            unlogined.style.display = 'none';
            if (this.userInfo != null) {
                var sex_classes = (this.userInfo.sex == 1) ? 'man' : 'woman';
                var str_un = '<dl><dt><a href="http://t.hexun.com/' + this.userInfo.userid + '/default.html" target="_blank"><img src="' + this.userInfo.photo + '" /></a></dt><dd><div class="league_name"><span class="' + sex_classes + '"><a href="http://t.hexun.com/' + this.userInfo.userid + '/default.html?fromtool=weibo" target="_blank">' + this.userInfo.username + '</a></span><a href="' + TB.params.linked.exit + '?gourl=' + window.location.href + '" class="exit_link">' + TB.lang.linked_exit + '</a></div><div class="league_info"><a  href="http://' + this.userInfo.username + '.blog.hexun.com/?fromtool=blog" target="_blank" title="' + TB.lang.tips_blog + '"><b></b><cite  class="i_blog"></cite><i></i></a><a href="' + this.userInfo.wbMsgLink + '?fromtool=atme" target="_blank" title="' + TB.lang.tips_wb + '"><b></b><cite class="i_wb">';
                if (this.userInfo.wbMsgNum != '0') str_un += '(' + this.userInfo.wbMsgNum + ')';
                str_un += '</cite><i></i></a><a href="' + this.userInfo.snsMsgLink + '?fromtool=message" target="_blank" title="' + TB.lang.tips_sns + '"><b></b><cite class="i_sns">';
                if (this.userInfo.snsMesNum != '0') str_un += '(' + this.userInfo.snsMesNum + ')';
                str_un += '</cite><i></i></a></div></dd></dl>';
                onlogined.innerHTML = str_un;
            }
        }
        //最近访问模块
        if (this.visitData != null && TB.utils.isArray(this.visitData) && this.visitData.length && this.visitData.length >= 1) {
            var myapp_lately = TB.utils.create('div', frag, 'myapp_lately');
            var lately_h4 = TB.utils.create('h4', myapp_lately);
            lately_h4.innerHTML = TB.lang.titles_visited;
            this.lately_ul = TB.utils.create('ul', myapp_lately);
            this.lately_ul.innerHTML = this.setVisit(this.visitData);
        }
        //我的应用
        var myapp_menu = TB.utils.create('div', frag, 'myapp_menu');
        myapp_menu_h4 = TB.utils.create('h4', myapp_menu);
        myapp_menu_h4.innerHTML = TB.lang.titles_menu;
        if (this.appType != null && TB.utils.isArray(this.appType) && this.appType.length && this.appType.length >= 1) {
            this.menu_ul = TB.utils.create('ul', myapp_menu);
        }
        myapp_menu_h5 = TB.utils.create('h5', myapp_menu);
        myapp_menu_h5.innerHTML = '<span><a href="' + TB.params.linked.manage + '" target="_blank">' + TB.lang.linked_manage + '</a></span>';

        this.appPanel.appendChild(frag);
        if (typeof this.lately_ul != 'undefined') {
            var _this = this;
            var lilist = document.getElementsByTagName('li');
            for (var i = 0, len = lilist.length; i < len; i++) {
                TB.utils.bind(lilist[i], 'click', function () {
                    var id = this.id.replace('app-revisit-', '');
                    _this.cout(id);
                });
            }
        }
        if (this.menu_ul) this.setMenu(this.menu_ul, this.appType);
        this.autoHeight();
    },
    //设置最近访问数据
    //MQL 2012-10-16设置appTarget==0时的页内跳转
    setVisit: function (data) {
        var arr = [];
        window.dataArr = [];
        var n = 0;
        for (var i = 0, len = Math.min(data.length, this.maxVisit) ; i < len; i++) {
            if (data[i].appTarget == "0") {
                window.dataArr[n] = data[i];
                arr.push('<li id="app-revisit-' + data[i].id + '" onclick="AjaxJumpBtn(this.id,true)" name="' + n + '"><a style="cursor:pointer"><img src="' + data[i].pic + '" /><span>' + data[i].name + '</span></a></li>');
                n++;
            }
            else {
                arr.push('<li id="app-revisit-' + data[i].id + '"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].pic + '" /><span>' + data[i].name + '</span></a></li>');
            }
        }
        return arr.join('');
    },

    //统计
    cout: function (id) {
        var url = this.ports_cout;
        url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
        url += 'uid=' + this.userId + '&isLogin=' + this.isLogin + '&appId=' + id;
        (new Image()).src = url;
    },
    //设置类型表单
    setMenu: function (panel, data) {
        var _this = this;
        for (var i = 0, len = Math.min(this.maxType, data.length) ; i < len; i++) {
            var li = TB.utils.create('li', panel);
            var span = TB.utils.create('span', li);
            span.innerHTML = data[i].name;
            span.className = 'menu_' + data[i].en;
            //事件
            li.onmouseover = (function (ele, id, n) {
                return function () {
                    clearTimeout(_this.timer);
                    _this.overMenu(ele, id, n);
                }
            })(li, data[i].id, i);
        }
        this.typeList = panel.getElementsByTagName('li');
        //绑定事件源

        TB.utils.bind(this.appPanel, 'mouseover', function (e) {
            var source = e.srcElement || e.target;
            if (!TB.utils.findAncestor(source, panel)) {
                clearTimeout(_this.timer);
                for (var i = 0, len = _this.typeList.length; i < len; i++) {
                    TB.utils.removeClass(_this.typeList[i], 'on');
                }
                _this.timer = setTimeout(function () {
                    var list = TB.utils.$$('.list_con', [_this.listPanel]);
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i].style.display = 'none';
                    }
                    _this.listPanel.style.display = 'none';
                }, _this.delay);
            }
        });
    },
    //鼠标经过效果
    overMenu: function (ele, id, n) {
        var _this = this;
        if (this.typeList) {
            //选中效果
            for (var i = 0, len = this.typeList.length; i < len; i++) {
                if (i == n) TB.utils.addClass(this.typeList[i], 'on');
                else TB.utils.removeClass(this.typeList[i], 'on');
            }
            this.timer = setTimeout(function () {
                _this.showListPanel(ele, id, n);
            }, this.delay);
        }
    },
    //展现各类型的数据
    showListPanel: function (ele, id, n) {
        var _this = this;
        //判断
        if (TB.utils.$('TBListPanel' + id)) {
            var panel = TB.utils.$('TBListPanel' + id);
            //panel.style.display = '';
            this.setListPanel(panel, id, n);
        }
            //请求数据
        else {
            var panel = TB.utils.create('div', this.listPanel, 'list_con');
            panel.id = 'TBListPanel' + id;
            panel.innerHTML = '<div class="loading">' + TB.lang.tips_load + '</div>';
            this.setListPanel(panel, id, n);
            var url = TB.utils.setUrl(this.ports_app);
            url += 'isLogin=' + this.isLogin + '&uid=' + this.userId + '&type=' + id;
            if (typeof console != 'undefined') console.log(url);

            TB.utils.jsonp(url, function (data) {
                panel.innerHTML = '';
                if (TB.utils.isArray(data) && data.length && data.length >= 1) {
                    //开通数据列表
                    new TB.orderBox(panel, data, {
                        isLogin: _this.isLogin,
                        ports_del: _this.ports_del,
                        ports_cout: _this.ports_cout,
                        ports_order: _this.ports_order,
                        NO: n,
                        id: id,
                        listPanel: _this.listPanel,
                        userId: _this.userId
                    });
                }
                else {
                    panel.innerHTML = '<div class="null"><a href="' + TB.params.linked.addApp + '" target="_blank">' + TB.lang.tips_addApp + '</a>' + TB.lang.tips_null + '</div>'
                };
                //alert(panel.innerHTML)
                //alert(data[0].appTarget)
                //_this.setListPanel(panel,id,n);
            }, 'tb_ports_app');
        }
    },
    //设置应用项
    setListPanel: function (panel, id, n) {
        var list = TB.utils.$$('.list_con', [this.listPanel]);
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].id && list[i].id.substr(11) == id) list[i].style.display = '';
            else list[i].style.display = 'none';
        }
        this.listPanel.style.display = '';
        var h = TB.utils.height(panel) + 1;
        var maxH = 36 + 32 * (4 - n) - 1;
        this.listPanel.style.top = (h <= maxH) ? (-maxH + 'px') : (-h + 'px');
    },
    //自适应高度
    autoHeight: function () {
        this.appPanel.style.height = 'auto';
        var h = TB.utils.height(this.appPanel);
        this.appPanel.style.top = -h + 'px';
    }
};


//排序
TB.orderBox = new TB.utils.init();
TB.orderBox.prototype = {
    /*initialize初始化
    *contrainer 容器
    *data 加载数据
    *options 相关参数
    */
    initialize: function (contrainer, data, options) {
        this.contrainer = TB.utils.$(contrainer);
        this.data = (data && TB.utils.isArray(data)) ? data : [];
        this.setDefault(options);
        this.unitH = this.options.unitH;
        this.maxLen = this.options.maxLen;
        this.maxScroll = this.options.maxScroll;
        this.isLogin = this.options.isLogin;
        this.isDrag = (this.isLogin == 1) ? true : false;
        this.NO = this.options.NO;
        this.listPanel = this.options.listPanel;
        this.ports_del = this.options.ports_del;
        this.ports_cout = this.options.ports_cout;
        this.ports_order = this.options.ports_order;
        this.userId = this.options.userId;
        this.id = this.options.id;
        //内部参数
        //数据长度
        this.dataLen = this.data.length;
        //置顶项
        this.topItem = 0;
        //当前显示条目
        this.showLen = (this.maxLen >= this.dataLen) ? (this.dataLen) : (this.maxLen);
        //Y坐标系
        this.Ypos = this.reYPos();
        //滚动动画标记
        this.scrollToggle = false;
        //滚动计时器
        this.fx = null;
        //滚动标记
        this.fxMark = false;
        //打开应用
        this.openOperate = true;
        this.onCreate();
    },
    /*
    *setDefault默认值
    *options 相关参数
    */
    setDefault: function (options) {
        this.options = {
            //一个li的单位高
            unitH: 32,
            //最多条目数
            maxLen: 13,
            //最多滚动条数
            maxScroll: 5,
            //是否登录
            isLogin: 0,
            userId: null,
            id: null,
            NO: 1,
            listPanel: null,
            ports_del: null,
            ports_cout: null,
            ports_order: null
        };
        TB.utils.Extend(this.options, options || {});
    },
    /*
    *onCreate创建结构
    */
    onCreate: function () {
        var frag = document.createDocumentFragment();
        this.prev = TB.utils.create('div', frag, 'prev_app prev_app_no');
        this.panel = TB.utils.create('div', frag, 'list_all');
        this.next = TB.utils.create('div', frag, 'next_app');
        var ul = TB.utils.create('ul', this.panel);
        this.toggleOpt();
        this.setList(ul, this.data);
        this.panel.style.height = this.setHeight();
        this.contrainer.appendChild(frag);
        this.setTop();
        //添加事件
        if (this.showLen >= 1) this.addEvent();
    },
    //设置高度
    setTop: function () {
        var h = TB.utils.height(this.listPanel) - 1;
        var maxH = 36 + 32 * (4 - this.NO) - 1;
        this.listPanel.style.top = (h <= maxH) ? (-maxH + 'px') : (-h + 'px');
    },
    /*
    *setList设置li结构
    */
    setList: function (panel, data) {
        var len = data.length,
		    arr = [];
        if (len == 0) return;
        var arr2 = [];
        if (!window.dataArr2) {
            window.dataArr2 = [];
        }
        var n = 0;
        for (var i = 0; i < len; i++) {
            //MQL 2级目录页内跳转
            if (this.isLogin == 1) {
                if (data[i].appTarget == "0") {
                    window.dataArr2[n] = data[i];
                    arr.push('<li id="app-list-' + data[i].id + '" onclick="AjaxJumpBtn(this.id,false)" name="' + n + '"><a><img src="' + data[i].pic + '"><span>' + data[i].name + '</span></a><cite class="del" id="app-delopt-' + data[i].id + '"></cite></li>');
                    n++;
                }
                else {
                    arr.push('<li id="app-list-' + data[i].id + '"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].pic + '"><span>' + data[i].name + '</span></a><cite class="del" id="app-delopt-' + data[i].id + '"></cite></li>');
                }
            }
            else {
                if (data[i].appTarget == "0") {
                    window.dataArr2[n] = data[i];
                    arr.push('<li id="app-list-' + data[i].id + '"onclick="AjaxJumpBtn(this.id,false)" name="' + n + '"><a><img src="' + data[i].pic + '"><span>' + data[i].name + '</span></a></li>');
                    n++;
                }
                else {
                    arr.push('<li id="app-list-' + data[i].id + '"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].pic + '"><span>' + data[i].name + '</span></a></li>');
                }
            }
        }
        panel.innerHTML = arr.join('');
    },
    /*
    *toggleOpt设置控制按钮显隐
    */
    toggleOpt: function () {
        if (this.maxLen >= this.dataLen) {
            this.prev.style.display = 'none';
            this.next.style.display = 'none';
        }
        else {
            this.prev.style.display = 'block';
            this.next.style.display = 'block';
        }
    },
    //统计
    cout: function (id) {
        var url = this.ports_cout;
        url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
        url += 'uid=' + this.userId + '&isLogin=' + this.isLogin + '&appId=' + id;
        (new Image()).src = url;
    },
    /*
    *setHeight定高
    */
    setHeight: function () {
        return this.showLen * this.unitH + 'px';
    },
    /*
    *getList实时获取lilist
    */
    getList: function () {
        if (this.panel.getElementsByTagName('li')) {
            var cols = this.panel.getElementsByTagName('li'), arr = [];
            for (var i = 0, len = cols.length; i < len; i++) {
                if (!TB.utils.hasClass(cols[i], 'temp')) arr.push(cols[i]);
            }
            if (arr.length == 0) return null;
            return arr;
        }
        return null;
    },
    /*
    *cutList过滤lilist
    */
    cutList: function (obj) {
        var arr = this.getList();
        return TB.utils.removeAt(arr, TB.utils.indexOf(arr, obj));
    },
    /*
    *addEvent事件添加
    */
    addEvent: function () {
        var lilist = this.getList();
        var _this = this,
	       ifScroll = false,
		   timer = null;
        if (lilist == null) return;
        this.setNowY();
        for (var i = 0, len = lilist.length; i < len; i++) {
            //鼠标移上
            TB.utils.bind(lilist[i], 'mouseover', function () { TB.utils.addClass(this, 'over'); });
            //鼠标移出
            TB.utils.bind(lilist[i], 'mouseout', function () { TB.utils.removeClass(this, 'over'); });
            //鼠标拖动
            if (this.isDrag && this.showLen > 1) {
                new TB.Drag(lilist[i], {
                    LockX: true,
                    onStart: function (e) {
                        _this.openOperate = true;
                        var _ = this;
                        //var e = TB.utils.searchEvent();
                        var source = e.target || e.srcElement;
                        if (source.tagName.toLowerCase() == 'cite') return;
                        timer = setTimeout(function () {
                            _this.openOperate = false;
                            _.lilist = _this.cutList(_.drag);
                            ifScroll = true;
                            //TB.utils.addClass(this.drag,'over');
                            TB.utils.css(_.drag, { position: 'absolute', opacity: 0.8 });
                            if (_.temp) _.temp.style.display = '';
                            else {
                                _.temp = document.createElement('li');
                                _.temp.className = 'temp';
                            }
                            _.drag.parentNode.insertBefore(_.temp, _.drag);
                        }, 300);
                    },
                    onMove: function () {
                        if (!_this.openOperate) {
                            var y = TB.utils.top(this.drag) - TB.utils.top(_this.panel);
                            if (y >= _this.Ypos[_this.Ypos.length - 1])
                                this.drag.parentNode.appendChild(this.temp);
                            else {
                                for (var i = 0; i < _this.Ypos.length - 1; i++) {
                                    if (y <= _this.Ypos[0] + _this.unitH / 2) this.drag.parentNode.insertBefore(this.temp, this.lilist[_this.topItem]);
                                    else if (_this.Ypos[i + 1] && y <= _this.Ypos[i + 1] + _this.unitH / 2 && y > _this.Ypos[i] + _this.unitH / 2 && this.lilist[_this.topItem + i + 1])
                                        this.drag.parentNode.insertBefore(this.temp, this.lilist[_this.topItem + i + 1]);
                                    //else this.drag.parentNode.appendChild(this.temp);
                                }
                            }
                            //开启滚动
                            /*if(_this.maxLen<_this.dataLen && ifScroll) {
                            var x = _this.mousePos().x,
                            y = _this.mousePos().y,
                            cols = _this.optPos();
                            if(x>=cols.prevX && x<=cols.prevX+cols.prevW && y>=cols.prevY && y<=cols.prevX+cols.prevH) {if(!_this.fxMark) _this.openPrev(this.drag);}
                            else if(x>=cols.nextX && x<=cols.nextX+cols.prevW && y>=cols.nextY && y<=cols.nextY+cols.prevH) {if(!_this.fxMark) _this.openNext(this.drag);}
                            else {
                            clearInterval(_this.fx);
                            _this.fxMark = false;
                            _this.topItem = _this.panel.scrollTop/_this.unitH;
                            }
                            }*/
                        }
                    },
                    onStop: function (e) {
                        if (!_this.openOperate) {
                            this.drag.parentNode.insertBefore(this.drag, this.temp);
                            if (this.temp) this.temp.style.display = 'none';
                            TB.utils.removeClass(this.drag, 'over');
                            TB.utils.css(this.drag, { position: 'static', opacity: 1 });
                            _this.setNowY();
                            ifScroll = false;
                            _this.reOrder();
                        }
                        //打开应用
                        //var e = TB.utils.searchEvent();
                        var source = e.target || e.srcElement;
                        if (source.tagName.toLowerCase() == 'cite') return;
                        clearTimeout(timer);
                        _this.openApp(this.drag.id);
                    }
                });
                lilist[i].style.position = 'static';
            }
            else {
                TB.utils.bind(lilist[i], 'click', function () { _this.openApp(this.id); });
            }
        }
        //上下操作
        TB.utils.bind(this.prev, 'mouseover', function () { TB.utils.addClass(this, 'prev_app_over'); });
        TB.utils.bind(this.prev, 'mouseout', function () { TB.utils.removeClass(this, 'prev_app_over'); });
        TB.utils.bind(this.next, 'mouseover', function () { TB.utils.addClass(this, 'next_app_over'); });
        TB.utils.bind(this.next, 'mouseout', function () { TB.utils.removeClass(this, 'next_app_over'); });
        TB.utils.bind(this.next, 'click', function () {
            if (!_this.scrollToggle && !TB.utils.hasClass(_this.next, 'next_app_no')) _this.nextScroll();
        });
        TB.utils.bind(this.prev, 'click', function () {
            if (!_this.scrollToggle && !TB.utils.hasClass(_this.prev, 'prev_app_no')) _this.pervScroll();
        });
        //删除操作
        if (this.isLogin == 1) {
            var cites = this.panel.getElementsByTagName('cite');
            for (var i = 0, len = cites.length; i < len; i++) {
                cites[i].onclick = function () {
                    var yes = confirm(TB.lang.tips_delete);
                    if (!yes) return;
                    //删除接口
                    var _ = this;

                    var url = _this.ports_del;
                    url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
                    url += 'uid=' + _this.userId + '&isLogin=' + _this.isLogin + '&appId=' + this.id.replace('app-delopt-', '') + '&type=' + _this.id;
                    TB.utils.jsonp(url, function (data) {
                        if (data && data == 1) {
                            TB.utils.remove(_.parentNode);
                            //删除后续处理
                            _this.delDeal();
                        }
                    }, 'appdel');
                };
            }
        }
    },
    //排序
    reOrder: function () {
        //新ID存储一边
        var neworderArr = [];
        var order_li = this.getList();
        var ln = order_li.length;
        for (var i = 0; i < ln; i++) {
            neworderArr.push(order_li[i].id.replace('app-list-', ''));
        }
        //提交更改数据
        var url = this.ports_order;
        url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
        url += 'uid=' + this.userId + '&isLogin=' + this.isLogin + '&type=' + this.id + '&appIds=' + neworderArr.join(',');
        if (typeof console != 'undefined') console.log(url);
        TB.utils.jsonp(url, function (data) { }, 'order');
    },
    /*
    *删除后续处理
    */
    delDeal: function () {
        var lilist = this.getList();
        if (lilist == null) {
            this.contrainer.innerHTML = '<div class="null"><a href="' + TB.params.linked.addApp + '" target="_blank">' + TB.lang.tips_addApp + '</a>' + TB.lang.tips_null + '</div>';
            return;
        }
        var len = lilist.length;
        if (len <= this.maxLen) {
            //隐藏操作
            if (this.prev.style.display && this.prev.style.display != 'none') {
                this.prev.style.display = 'none';
                this.next.style.display = 'none';
            }
            //重设高度
            this.showLen = len;
            this.panel.style.height = this.setHeight();
        }
        this.setTop();
    },
    /*
    *openApp打开应用
    */
    openApp: function (id) {
        if (this.openOperate) {
            this.cout(id.replace('app-list-', ''));
            return;
        }
    },
    /*
    *openPrev开启上滚动
    */
    openPrev: function () {
        this.fxMark = true;

        var _this = this;
        this.fx = setInterval(function () {
            var top = _this.panel.scrollTop;
            if (top > 0) {
                _this.panel.scrollTop -= _this.unitH;
            }
            else {
                clearInterval(_this.fx);
                _this.fxMark = true;
            }
        }, 200);
    },
    /*
    *openNext开启下滚动
    */
    openNext: function () {
        var maxTop = (this.dataLen - this.maxLen) * this.unitH;
        this.fxMark = true;
        var _this = this;
        this.fx = setInterval(function () {
            var top = _this.panel.scrollTop;
            if (top < maxTop) {
                _this.panel.scrollTop += _this.unitH;
            }
            else {
                clearInterval(_this.fx);
                _this.fxMark = true;
            }
        }, 200);
    },
    /*
    *mousePos获取鼠标坐标
    */
    mousePos: function () {
        var e = TB.utils.searchEvent();
        if (e.pageX && e.pageY) {
            return { x: e.pageX, y: e.pageY }
        }
        var sL = document.body.scrollLeft || document.documentElement.scrollLeft,
		     cL = document.body.clientLeft || document.documentElement.clientLeft,
			 sT = document.body.scrollTop || document.documentElement.scrollTop,
			 cT = document.body.clientTop || document.documentElement.clientTop;
        return {
            x: e.clientX + sL - cL,
            y: e.clientY + sT - cT
        }
    },
    /*
    *optPos定位prev和next位置
    */
    optPos: function () {
        return {
            prevX: TB.utils.left(this.prev),
            prevY: TB.utils.top(this.prev),
            prevW: TB.utils.width(this.prev),
            prevH: TB.utils.height(this.prev),
            nextX: TB.utils.left(this.next),
            nextY: TB.utils.top(this.next),
            nextW: TB.utils.width(this.next),
            nextH: TB.utils.height(this.next)
        };
    },
    /*
    *reYPos重设Y坐标系
    */
    reYPos: function () {
        var arr = [],
	       len = this.showLen;
        for (var i = 0; i < len; i++) {
            arr.push(i * this.unitH);
        }
        return arr;
    },
    /*
    *reYPos设置当前显示项的top值
    */
    setNowY: function () {
        var liArr = this.getList(),
	      yArr = this.reYPos();
        for (var i = this.topItem; i < this.showLen; i++) {
            liArr[i].style.top = yArr[i] + 'px';
        }
    },
    /*
    *nextScroll设置向下滚动
    */
    nextScroll: function () {
        var reNum = this.dataLen - this.maxLen - this.topItem;
        this.scrollToggle = true;
        var oneoff = (reNum <= this.maxScroll) ? reNum : this.maxScroll;
        var _this = this;
        var t = this.panel.scrollTop;
        var maxt = (this.dataLen - this.maxLen) * this.unitH;
        if (t < maxt && !TB.utils.hasClass(this.next, 'next_app_no')) {
            TB.utils.removeClass(this.prev, 'prev_app_no');
            var fx = new TB.Animator({
                onComplete: function () {
                    _this.topItem = parseInt(_this.panel.scrollTop / _this.unitH);
                    if (_this.panel.scrollTop >= maxt)
                        TB.utils.addClass(_this.next, 'next_app_no');
                    _this.scrollToggle = false;
                }
            }
		 );
            fx.addSubject(function (value) {
                _this.panel.scrollTop = t + _this.unitH * oneoff * value;
            });
            fx.seekFromTo(0, 1);
        }
    },
    /*
    *pervScroll设置向上滚动
    */
    pervScroll: function () {
        this.scrollToggle = true;
        var oneoff = (this.topItem <= this.maxScroll) ? this.topItem : this.maxScroll;
        var _this = this;
        var t = this.panel.scrollTop;
        if (t >= 0 && !TB.utils.hasClass(this.prev, 'prev_app_no')) {
            TB.utils.removeClass(this.next, 'next_app_no');
            var fx = new TB.Animator({
                onComplete: function () {
                    _this.topItem = parseInt(_this.panel.scrollTop / _this.unitH);
                    if (_this.panel.scrollTop <= 0)
                        TB.utils.addClass(_this.prev, 'prev_app_no');
                    _this.scrollToggle = false;
                }
            }
		 );
            fx.addSubject(function (value) {
                _this.panel.scrollTop = t - _this.unitH * oneoff * value;
            });
            fx.seekFromTo(0, 1);
        }
    }
};



/*
*name:TB.loginDialog
*date:2011-10-14
**/
TB.loginDialog = {
    onCreate: function () {
        //定义DOM
        var frag = document.createDocumentFragment();
        var h = this.getH();
        var shade = TB.utils.create('div', frag);
        var iframe = TB.utils.create('iframe', shade);
        shade.id = 'hxToolsBar20111010_shade';
        shade.style.height = h + 'px';
        iframe.style.height = h + 'px';
        var login = TB.utils.create('div', frag);
        login.id = 'hxToolsBar20111010_login';
        login.innerHTML = '<dl><dt><span onclick="TB.loginDialog.closed()"></span></dt><dd><iframe width="100%" scrolling="no" height="180px" frameborder="0" src="http://login.tool.hexun.com/OtherInterFace/IFR_userLoginDialog_01.aspx?hexunMember_loginSetup_referrer=' + location.href + '&fromtool=myapplogi"></iframe></dd></dl>';
        document.body.appendChild(frag);
        var android2_3up = TB.utils.$B.android2_3up;
        var ios5up = TB.utils.$B.ios5up;
        var isMobile = TB.utils.$B.isMobile;
        try {
            if (isMobile && !ios5up || !android2_3up) {//匹配ios4 或android2.3以下
                var p = document.getElementById("toolsBar20111010");
                p.style.display = "absolute";
                function handler(event) {
                    var top = window.innerHeight + document.body.scrollTop - 24;
                    p.style.top = top + "px";
                    p.style.opacity = 1;
                }
                function touchstart(event) {
                    p.style.opacity = 0;
                }
                function touchend(event) {
                    p.style.opacity = 1;
                }
                document.addEventListener("scroll", handler, false);
                document.addEventListener("touchstart", touchstart, false);
                document.addEventListener("touchend", touchend, false);
            }
        } catch (e) {

        }
    },
    closed: function () {
        if (TB.utils.$('hxToolsBar20111010_shade') && TB.utils.$('hxToolsBar20111010_login')) {
            TB.utils.$('hxToolsBar20111010_shade').style.display = 'none';
            TB.utils.$('hxToolsBar20111010_login').style.display = 'none';
        }
    },
    show: function () {
        if (TB.utils.$('hxToolsBar20111010_shade') && TB.utils.$('hxToolsBar20111010_login')) {
            TB.utils.$('hxToolsBar20111010_shade').style.display = '';
            TB.utils.$('hxToolsBar20111010_login').style.display = '';
        }
        else {
            this.onCreate();
        }
    },
    getH: function () {
        var ch = document.documentElement.clientHeight || document.body.clientHeight;
        var h = document.documentElement.scrollHeight || document.body.scrollHeight;
        return (ch < h) ? h : ch;
    }
};



/*
*输入提示
*date:2011-10-18
**/

TB.Suggest = new TB.utils.init();

TB.Suggest.prototype = {
    initialize: function (txtObj, url, options) {
        this.txtObj = txtObj;
        this.url = url;
        this.setDefault(options);
        this.gaper = this.options.gaper;
        this.maxRow = this.options.maxRow;
        this.scriptId = this.options.scriptId;
        this.contrainer = this.options.contrainer;
        this.noInput = this.options.noInput;
        this.noData = this.options.noData;
        this.callback = this.options.callback;
        this.pos = this.options.pos;
        //全局计时器
        this.timer = null;
        //旧值存储
        this.oldValue = null;
        //键盘步骤
        this.step = 0;
        //存放即时值
        this.temp = null;
        //构造
        this.onCreate();
    },
    setDefault: function (options) {
        this.options = {
            //查找间隔
            gaper: 100,
            //最大显示条数
            maxRow: 10,
            //加载script的固定ID标示
            scriptId: 'hxSuggest_ids20111010',
            //加载容器
            contrainer: document.body,
            //无输入提示
            noInput: 'code/name/spell',
            //无数据提示
            noData: 'NO DATA!',
            //位置
            pos: [16, 11],
            //事件
            callback: function () { }
        };
        TB.utils.Extend(this.options, options || {});
    },
    onCreate: function () {
        this.frag = document.createDocumentFragment();
        this.shade = TB.utils.create('div', this.frag);
        TB.utils.css(this.shade, {
            width: '204px',
            background: '#8D8D8D',
            position: 'absolute',
            opacity: '0.6',
            display: 'none'
        });
        this.panel = TB.utils.create('div', this.frag);
        TB.utils.css(this.panel, {
            border: '1px solid #9A9B9D',
            width: '202px',
            background: '#FFF',
            position: 'absolute',
            display: 'none',
            color: '#000'
        });
        this.contrainer.appendChild(this.frag);
        this.addEvent();
    },
    addEvent: function () {
        var _this = this;
        this.txtObj.onfocus = function () {
            var value = TB.utils.trim(this.value);
            if (value == _this.noInput) this.value = '';
            this.style.color = '#000';
            _this.openSearch();
        };
        this.txtObj.onblur = function () {
            clearInterval(_this.timer);
            _this.oldValue = null;
            _this.step = 0;
            if (TB.utils.trim(this.value) == '') {
                _this.temp = null;
                this.style.color = '#868686';
                this.value = _this.noInput;
            }
            if (_this.temp != null) this.value = _this.temp.split(',')[0];
            _this.hide();
        };
        TB.utils.bind(this.txtObj, 'keydown', function (e) {
            var e = e ? e : window.event;
            if (e.keyCode == 13) {
                if (_this.temp != null) this.value = _this.temp.split(',')[0];
                _this.hide();
            }
        });
        TB.utils.bind(document, 'keydown', function (e) {
            _this.keyEvent(e);
        });
    },
    openSearch: function () {
        var _this = this;
        this.timer = setInterval(function () {
            var value = TB.utils.trim(_this.txtObj.value).toUpperCase();
            if (value != '' && value != null && value != _this.oldValue) {
                _this.oldValue = value;
                _this.showValue(value);
            }
            if (value == '') {
                _this.oldValue = value;
                _this.panel.innerHTML = '';
                _this.hide();
            }
        }, this.gaper);
    },
    hide: function () {
        this.panel.style.display = 'none';
        this.shade.style.display = 'none';
    },
    show: function () {
        this.panel.style.display = '';
        this.shade.style.display = '';
        var h = TB.utils.height(this.panel);
        var left = this.pos[0];
        var top = this.pos[1] - h;
        this.panel.style.left = left + 'px';
        this.shade.style.left = left + 2 + 'px';
        this.panel.style.top = top + 'px';
        this.shade.style.top = top + 2 + 'px';
        this.shade.style.height = h + 'px';
    },
    showValue: function (value) {
        if (TB.utils.$(this.scriptId) && TB.utils.$(this.scriptId) != null) {
            TB.utils.remove(TB.utils.$(this.scriptId));
        }
        var _this = this;
        var url = (this.url.indexOf('?') != -1) ? (this.url + '&') : (this.url + '?');
        url += "key=" + value;
        TB.utils.Loading(url, 'script', function () {
            if (hxSuggest_JsonData && TB.utils.isArray(hxSuggest_JsonData)) {
                _this.panel.innerHTML = '';
                _this.setValue(hxSuggest_JsonData);
            }
            else _this.hide();
        }, this.scriptId);
    },
    setValue: function (data) {
        var str = '<table cellpadding="0" cellspacing="0" width="100%" style="font-size:12px;cursor:default;line-height:normal;">';
        if (data.length == 0) {
            str += '<tr><td style="padding:5px 0 5px 8px;">' + this.noData + '</td></tr>';
            this.temp = null;
        }
        else {
            var len = Math.min(data.length, this.maxRow);
            for (var i = 0; i < len; i++) {
                var arr = [data[i].code, data[i].name, data[i].short, data[i].type, data[i].stocktype, data[i].market];
                if (i == 0) str += '<tr style="background:#ECECEC">';
                else str += '<tr style="background:">';
                str += '<td style="padding:5px 0 5px 10px;"><input type="hidden" value="' + arr + '" style="display:none;"/>' + this.redDeal(data[i].code) + '</td>';
                if (data[i].name.length > 5) str += '<td><span title="' + data[i].name + '">' + this.redDeal(data[i].name.substr(0, 5)) + '</span></td>';
                else str += '<td><span title="' + data[i].name + '">' + this.redDeal(data[i].name) + '</span></td>';
                str += '<td>' + this.redDeal(data[i].short) + '</td>';
                str += '<td style="color:#858585;">' + data[i].type + '</td>';
                str += '</tr>';
            }
        }
        str += '</table>';
        this.panel.innerHTML = str;
        if (data.length > 0) {
            var trlist = this.panel.getElementsByTagName('tr');
            this.step = 0;
            this.temp = trlist[0].getElementsByTagName('input')[0].value;
            var len = trlist.length;
            var _this = this;
            for (var i = 0; i < len; i++) {
                trlist[i].onmouseover = (function (i) {
                    return function () {
                        _this.selectRow(i);
                    }
                })(i);
            }
        }
        this.show();
    },
    redDeal: function (str) {
        var key = TB.utils.trim(this.txtObj.value).toUpperCase();
        str = str.replace(key, '<span style="color:#FF0000;float:none;">' + key + '</span>');
        return str;
    },
    selectRow: function (n) {
        var trlist = this.panel.getElementsByTagName('tr');
        var len = trlist.length;
        for (var j = 0; j < len; j++) {
            if (n == j) {
                trlist[j].style.background = '#ECECEC';
                this.step = j;
                this.temp = trlist[j].getElementsByTagName('input')[0].value;

            }
            else {
                trlist[j].style.background = '';
            }
        }
    },
    keyEvent: function (e) {
        var e = e ? e : window.event;
        if (typeof this.panel == 'undefined' && this.panel.display == 'none') return;
        if (e.keyCode == 38) {
            var len = this.panel.getElementsByTagName('tr').length;
            if (len > 1) {
                this.step = (this.step == 0) ? (len - 1) : (this.step - 1);
                this.selectRow(this.step);
            }
        }
        if (e.keyCode == 40) {
            var len = this.panel.getElementsByTagName('tr').length;
            if (len > 1) {
                this.step = (this.step == len - 1) ? 0 : (this.step + 1);
                this.selectRow(this.step);
            }
        }
    }
};



/*
*我的自选股
*date:2011-10-18
*update:2011-12-31
**/

TB.MyStock = new TB.utils.init();

TB.MyStock.prototype = {
    initialize: function (bar, panel, options) {
        this.bar = bar;
        this.panel = panel;
        this.setDefault(options);
        this.isLogin = this.options.isLogin;
        this.userId = this.options.userId;
        this.mystockUrl = this.options.mystockUrl;
        this.defaultUrl = this.options.defaultUrl;
        this.suggestUrl = this.options.suggestUrl;
        this.addStockUrl = this.options.addStockUrl;
        this.deleteStockUrl = this.options.deleteStockUrl;
        this.visitStockUrl = this.options.visitStockUrl;
        this.gaper = this.options.gaper;
        //记录当前页码
        this.pager = 1;
        //记录总页数
        this.sum = 1;
        //存放前一页的最后一条数据
        this.temp = null;
        //当前滚动第几条
        this.scrollNO = 1;
        //间隔计时器
        this.timer = null;
        //滚动计时器
        this.fx_timer = null;
        //当前数据源
        this.dataSource = 3;
        //无数据
        this.noData = false;
        this.onCreate();
    },
    setDefault: function (options) {
        this.options = {
            isLogin: 0,
            userId: null,
            mystockUrl: null,
            defaultUrl: null,
            suggestUrl: null,
            addStockUrl: null,
            deleteStockUrl: null,
            visitStockUrl: null,
            gaper: 6000
        };
        TB.utils.Extend(this.options, options || {});
    },
    onCreate: function () {
        //bar上的条目
        this.mystock_fir = TB.utils.create('div', this.bar, 'mystock_fir');
        this.fir_scroll = TB.utils.create('ul', this.mystock_fir);
        this.fir_warm = TB.utils.create('span', this.mystock_fir, 'ms_warm');
        //自选股面板
        var frag = document.createDocumentFragment();
        this.ms_bodyer = TB.utils.create('div', frag, 'ms_bodyer');
        this.stock_list = TB.utils.create('div', this.ms_bodyer, 'stock_list');
        this.list_ul = TB.utils.create('ul', this.stock_list);
        this.stock_more = TB.utils.create('div', this.ms_bodyer, 'stock_more');
        this.add_tip = TB.utils.create('div', this.stock_more, 'add_success');
        this.add_tip.innerHTML = TB.lang.tips_addSuccess;
        var more_link = TB.utils.create('a', this.stock_more, 'ms_more');
        more_link.href = TB.params.linked.mystock + "?fromtool=myappmoney";
        more_link.target = '_blank';
        more_link.innerHTML = TB.lang.linked_myallstock;

		/* ===新添加=== */
		var ads_link= TB.utils.create('a', this.stock_more, 'ms_more');
		ads_link.href="http://wizard.stock.hexun.com/adstat/startNew.aspx?p=14&t=1&i=651";
		ads_link.target = '_blank';
		ads_link.style.marginTop="10px";
		ads_link.innerHTML="超低佣金开户赢万元翻翻大牛股机会";
		/* ===新添加over=== */

        if (this.isLogin == 0) {
            var login_tip = TB.utils.create('div', this.stock_more, 'login_tip');
            login_tip.innerHTML = '<p>' + TB.lang.tips_unlogined + '</p><a href="javascript;" class="ms_logined" onclick="TB.loginDialog.show();return false;"></a><a href="' + TB.params.linked.regUrl + '" class="ms_reg" target="_blank"></a>';
        }
        else {
            this.addTips = TB.utils.create('div', this.stock_more, 'add_tips');
            this.addTips.style.display = 'none';
            this.addTips.innerHTML = TB.lang.tips_noadd;
        }
        this.ms_footer = TB.utils.create('div', frag, 'ms_footer');
        var ms_txt = TB.utils.create('span', this.ms_footer, 'ms_txt');
        var ms_btn = TB.utils.create('span', this.ms_footer, 'ms_btn');
        this.input = TB.utils.create('input', ms_txt);
        this.input.value = TB.lang.tips_suggest;
        ms_btn.innerHTML = '<input type="button" value="" name="add_btn" class="add_btn"/>';
        this.panel.appendChild(frag);
        this.btn = ms_btn.getElementsByTagName('input')[0];
        this.addEvent();
        //第一次执行数据请求
        this.requestData(1, true);
    },
    //最近访问数据
    visitData: function (isFir, n) {
        var _this = this;
        var url = this.visitStockUrl;
        TB.utils.jsonp(url, function (data) {
            if (!data || (data.length && data.length <= 0)) {
                _this.defaultData(isFir);
                return;
            }
            _this.dataSource = 2;
            _this.padDefault(data, isFir, n);
        }, 'visitstock');
    },
    //微博推送
    defaultData: function (isFir, n) {
        var _this = this;
        var url = this.defaultUrl;
        TB.utils.jsonp(url, function (data) {
            if (!data || (data.length && data.length <= 0)) return;
            _this.dataSource = 3;
            _this.padDefault(data, isFir, n);
        }, 'defaultstock');
    },
    //默认填充
    padDefault: function (d, isFir, n) {
        var len = Math.min(d.length, 6);
        this.fir_scroll.innerHTML = '';
        this.scrollNO = 1;
        this.fir_scroll.scrollTop = 0;
        this.setFir(n, len, d);
        this.setPanel(len, d);
    },
    //我的股票
    myData: function (isFir, n) {
        var _this = this;
        var url = this.mystockUrl;
        url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
        TB.utils.jsonp(url + 'userId=' + this.userId + '&pager=' + n, function (data) {
            if (typeof data == 'undefined') {
                _this.noData = true;
                _this.fir_warm.innerHTML = '<a style="color:#999" title="' + TB.lang.tips_mywarms + '" href="http://mymoney.hexun.com/istock/StockRemind.aspx?fromtool=myappmoney" target="_blank">&nbsp;&nbsp;(0)</a>';
                _this.visitData(isFir);
                return;
            }
            _this.noData = false;
            if (this.addTips) this.addTips.style.display = 'none';
            _this.dataSource = 1;
            _this.sum = Math.ceil(data.sum / 10);
            var len = Math.min(data.list.length, 10);
            _this.fir_scroll.innerHTML = '';
            var warm_num = (data.remind && data.remind != '') ? data.remind : 0;
            if (warm_num == 0) {
                _this.fir_warm.innerHTML = '<a style="color:#999" title="' + TB.lang.tips_mywarms + '" href="http://mymoney.hexun.com/istock/StockRemind.aspx?fromtool=myappmoney" target="_blank">&nbsp;&nbsp;(' + warm_num + ')</a>';
            }
            else {
                _this.fir_warm.innerHTML = '<a style="color:#999" title="' + TB.lang.tips_mywarms + '" href="http://mymoney.hexun.com/istock/StockRemind.aspx?fromtool=myappmoney" target="_blank">&nbsp;&nbsp;<font color=#ff0000>(' + warm_num + ')</font></a>';
            }
            _this.scrollNO = 1;
            _this.fir_scroll.scrollTop = 0;
            _this.setFir(n, len, data.list);
            if (n == 1) _this.setPanel(len, data.list);
            else {
                // if(typeof console!='undefined') console.log(url+'userId='+_this.userId+'&pager=1');
                TB.utils.jsonp(url + 'userId=' + _this.userId + '&pager=1', function (data) {
                    _this.setPanel(10, data.list);
                }, 'mystockmore');
            }
        }, 'mystock');
    },
    requestData: function (n, isFir) {
        var _this = this;
        if (this.isLogin == 0) {
            this.fir_warm.innerHTML = '<a style="color:#999;" title="' + TB.lang.tips_warms + '" href="http://mymoney.hexun.com/istock/StockRemind.aspx?fromtool=myappmoney" target="_blank">&nbsp;&nbsp;(0)</a>';
            this.visitData(isFir, n);
        }
        if (this.isLogin == 1) {
            this.myData(isFir, n);
        }
    },
    //股票面板数据请求
    panelData: function () {
        var _this = this;
        var url = (this.isLogin == 0) ? this.defaultUrl : this.mystockUrl;
        url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
        if (this.isLogin == 1) url += 'userId=' + this.userId + '&pager=1';
        TB.utils.jsonp(url, function (data) {
            if (!data) return;
            var len = (_this.isLogin == 0) ? Math.min(data.length, 6) : Math.min(data.list.length, 10);
            var d = (_this.isLogin == 0) ? data : data.list;
            _this.list_ul.innerHTML = '';
            _this.setPanel(len, d);
        }, 'barstock');
    },
    setFir: function (n, len, data) {
        var arr = [];
        if (this.temp != null) arr.push(this.temp);
        this.temp = data[len - 1];
        for (var i = 0; i < len; i++) arr.push(data[i]);
        var ln = arr.length;
        for (var i = 0; i < ln; i++) {
            var li = TB.utils.create('li', this.fir_scroll);
            this.setFirHTML(li, arr[i]);
        }
        //设置滚动
        this.setScroll(ln);
    },
    //获取指定字符数据长度
    getLen: function (str, mark) {
        return (str.substr(str.chatAt(mark))).length;
    },
    //填充一条bar上的数据
    setFirHTML: function (obj, data) {
        var price = data.price;
        var priceRate = data.priceRate;
        var percentRate = data.percentRate.replace(/\s/g, '');
        if (price == '0') price = '----';
        var links = (data.stockLink.indexOf('http://') != -1) ? data.stockLink : ('http://' + data.stockLink);
        var str = '<a href="' + links + '?fromtool=myappstock" target="_blank" onclick="TB.utils.cancelEventUp();" class="skip_link"><span class="name">' + data.name + '</span><span class="price">' + price + '</span>';
        var classes_p = 'p_up', classes_r = 'r_up';
        if (data.percentRate.indexOf('-') != -1) {
            classes_p = 'p_down';
            classes_r = 'r_down';
        }
        else if (percentRate == '' || percentRate == '0%' || percentRate == '0' || percentRate == 'null') {
            classes_p = 'p_flat';
            classes_r = 'r_flat';
            priceRate = '0.00%';
            percentRate = '0.00%';
        }
        else {
            priceRate = '+' + priceRate;
            percentRate = '+' + percentRate;
        }
        str += '<span class="' + classes_p + '">' + priceRate + '</span><span class="' + classes_r + '">' + percentRate + '</span></a>';
        //if(!data.newwsLink || data.newsLink=='null') {
        str += '<a class="ms_news" title="' + data.name + TB.lang.tips_news + '" target="_blank" onclick="TB.utils.cancelEventUp();" href="http://mymoney.hexun.com/istock/stocknews.aspx?fromtool=myappmoney&k=' + data.code + '"></a>';
        //}
        //else str+='<span class="ms_news"><a href="'+data.newsLink+'"  target="_blank" onclick="TB.utils.cancelEventUp();" title="'+data.name+TB.lang.tips_news+'">('+data.newsNumber+')</a></span>';		
        obj.innerHTML = str;
    },
    //设置滚动
    setScroll: function (ln) {
        var _this = this;
        //判断
        var _del = function () {
            _this.timer = setTimeout(function () {
                if (_this.scrollNO + 1 <= ln) {
                    _fx();
                }
                else {
                    if (_this.isLogin != 0) {
                        if (_this.pager < _this.sum) _this.pager += 1;
                        else _this.pager = 1;
                    }
                    _this.requestData(_this.pager, false);
                    //_this.panelData();
                }
            }, _this.gaper);
        };
        //运动
        var _fx = function () {
            _this.fx_timer = setInterval(function () {
                var top = _this.fir_scroll.scrollTop;
                if (top < _this.scrollNO * 24) _this.fir_scroll.scrollTop += 1;
                else {
                    clearInterval(_this.fx_timer);
                    _this.fir_scroll.scrollTop = _this.scrollNO * 24;
                    _this.scrollNO += 1;
                    _del();
                }
            }, 20);
        };
        //执行
        _del();
    },
    setPanel: function (n, data) {
        this.list_ul.innerHTML = '';
        if (!this.noData) {
            for (var i = 0; i < n; i++) {
                var li = TB.utils.create('li', this.list_ul);
                this.setPanelHTML(li, data[i]);
            }
        }
        else if (this.addTips) this.addTips.style.display = '';
        this.autoH();
    },
    //填充一条面板上的数据
    setPanelHTML: function (obj, data) {
        if (data == null) return;
        var _this = this;
        var price = data.price;
        var priceRate = data.priceRate;
        var percentRate = data.percentRate.replace(/\s/g, '');
        if (price == '0') price = '----';
        var links = (data.stockLink.indexOf('http://') != -1) ? data.stockLink : ('http://' + data.stockLink);
        var str = '<span class="name"><a href="' + links + '?fromtool=myappstock" target="_blank" onclick="TB.utils.cancelEventUp();">' + data.name + '</a></span><span class="price">' + price + '</span>';
        var classes_p = 'p_up', classes_r = 'r_up';
        if (data.percentRate.indexOf('-') != -1) {
            classes_p = 'p_down';
            classes_r = 'r_down';
        }
        else if (percentRate == '' || percentRate == '0%' || percentRate == '0' || percentRate == 'null') {
            classes_p = 'p_flat';
            classes_r = 'r_flat';
            priceRate = '0.00%';
            percentRate = '0.00%';
        }
        else {
            priceRate = '+' + priceRate;
            percentRate = '+' + percentRate;
        }
        str += '<span class="' + classes_p + '">' + priceRate + '</span><span class="' + classes_r + '">' + percentRate + '</span>';
        obj.innerHTML = str;
        var d = TB.utils.create('span', obj, 'deleted');
        d.onmouseover = function () { TB.utils.addClass(this, 'deleted_over') };
        d.onmouseout = function () { TB.utils.removeClass(this, 'deleted_over') };
        d.onclick = function () {
            if (typeof console != 'undefined') console.log(_this.dataSource);
            if (_this.isLogin == 0) TB.loginDialog.show();
            else if (_this.dataSource == 3 || _this.dataSource == 2) window.open(TB.params.linked.mystock);
            else {
                //请求删除数据
                var cof = window.confirm(TB.lang.tips_delete);
                if (cof) {
                    var url = _this.deleteStockUrl;
                    url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
                    url += 'dbID=' + data.id;
                    TB.utils.jsonp(url, function (data) {
                        if (parseInt(data) == 1) {
                            _this.panelData();
                        }
                    }, 'deletestock');
                }
            }
        };
    },
    addEvent: function () {
        var _this = this;
        var suggest = new TB.Suggest(this.input, this.suggestUrl, {
            maxRow: 6,
            noInput: TB.lang.tips_suggest,
            noData: TB.lang.tips_nosuggest,
            contrainer: this.ms_footer
        });
        TB.utils.bind(this.btn, 'click', function () {
            _this.addStock(suggest.temp);
        });
        TB.utils.bind(this.btn, 'mouseover', function () {
            TB.utils.addClass(this, 'add_btn_over');
        });
        TB.utils.bind(this.btn, 'mouseout', function () {
            TB.utils.removeClass(this, 'add_btn_over');
        });
    },
    addStock: function (data) {
        if (data == null) alert(TB.lang.tips_addStock);
        else if (this.isLogin == 0) TB.loginDialog.show();
        else {
            //添加接口 
            //MQL 2012-11-5 modify codetype
            var _this = this;
            var url = this.addStockUrl;
            url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
            url += 'code=' + data.split(',')[0] + '&codetype=' + data.split(',')[4];
            TB.utils.jsonp(url, function (data) {
                if (parseInt(data) == 1) {
                    _this.addSuccess();
                    _this.noData = false;
                    if (_this.addTips) _this.addTips.style.display = 'none';
                    _this.panelData();
                } else {
                    _this.addFail();
                    if (_this.addTips) _this.addTips.style.display = 'none';
                }
            }, 'addstock');
        }
    },
    //添加成功提示
    addSuccess: function () {
        var _this = this;
        var fx = new TB.Animator();
        fx.addSubject(new NumSubject(this.add_tip, 'opacity', 0, 0.9));
        this.add_tip.style.display = 'block';
        fx.seekFromTo(0, 1);
        setTimeout(function () {
            var fx1 = new TB.Animator({
                onComplete: function () { _this.add_tip.style.display = ''; }
            });
            fx1.addSubject(new NumSubject(_this.add_tip, 'opacity', 0.9, 0));
            fx1.seekFromTo(0, 1);
        }, 2000);
    },
    //添加失败提示
    addFail: function () {
        var _this = this;
        var fx = new TB.Animator();
        fx.addSubject(new NumSubject(this.add_tip, 'opacity', 0, 0.9));
        this.add_tip.innerHTML = TB.lang.tips_addFail;
        this.add_tip.style.display = 'block';
        fx.seekFromTo(0, 1);
        setTimeout(function () {
            var fx1 = new TB.Animator({
                onComplete: function () { _this.add_tip.style.display = ''; }
            });
            fx1.addSubject(new NumSubject(_this.add_tip, 'opacity', 0.9, 0));
            fx1.seekFromTo(0, 1);
        }, 2000);
    },
    //自适应高度
    autoH: function () {
        var h = TB.utils.height(this.panel);
        this.panel.style.top = -h + 'px';
    }
};


/*
*新闻滚动
*date:2011-10-17
*/

//加载新闻数据
TB.newsScroll = function (url, contrainer) {
    TB.utils.jsonp(url, function (data) {
        var len = data.length;
        var frag = document.createDocumentFragment();
        var panel = TB.utils.create('div', frag, 'news_panel');
        var panelS = TB.utils.create('div', panel);
        var ul = TB.utils.create('ul', panelS);
        var roll = TB.utils.create('div', frag, 'news_roll');
        var span_up = TB.utils.create('span', roll, 'roll_up');
        var span_down = TB.utils.create('span', roll, 'roll_down');
        for (var i = 0; i < len; i++) {
            var li = TB.utils.create('li', ul);
            li.innerHTML = '<a href="' + data[i].columnLink + '" target="_blank">[' + data[i].columnName + '</a>]<a href="' + data[i].url + '" target="_blank">' + data[i].title + '</a>';
        }
        contrainer.appendChild(frag);
        TB.utils.bind(span_up, 'mouseover', function () { TB.utils.addClass(this, 'roll_up_over'); });
        TB.utils.bind(span_up, 'mouseout', function () { TB.utils.removeClass(this, 'roll_up_over'); });
        TB.utils.bind(span_down, 'mouseover', function () { TB.utils.addClass(this, 'roll_down_over'); });
        TB.utils.bind(span_down, 'mouseout', function () { TB.utils.removeClass(this, 'roll_down_over'); });
        TB.Scroll.gapScroll(panelS, {
            distance: 20,
            control: true,
            preId: span_up,
            nextId: span_down
        });
    }, 'newsScroll');
};

//滚动
TB.Scroll = {
    //间隔滚动
    gapScroll: function (objId, options) {
        //定义参数
        var scrollObj = TB.utils.$(objId);
        var contrainer = scrollObj.parentNode;
        options = options || {};
        var gap = parseInt(options.gap) || 2000;
        var frame = parseInt(options.frame) || 20;
        var distance = parseInt(options.distance) || 22;
        var vate = parseFloat(options.vate) || 0.05;
        var direction = options.direction || 'scrollTop';
        var control = options.control || false;
        var preObj = TB.utils.$(options.preId) || '';
        var nextObj = TB.utils.$(options.nextId) || '';
        var ename = options.ename || 'click';
        var maxLength = TB.Scroll.pack(scrollObj, direction);
        var mark = 0, timer, gap_timer, l = Math.floor(maxLength / distance);
        var toggle = false;
        //启动动画
        timer = setTimeout(goto, gap);
        function goto() {
            mark += 1;
            gap_timer = setInterval(plus, frame);
        }
        //+动画
        function plus() {
            clearTimeout(timer);
            var d = contrainer[direction];
            if (d < mark * distance) contrainer[direction] = Math.ceil(d + (mark * distance - d) * vate);
            else {
                clearInterval(gap_timer);
                mark = mark < l ? mark : 0;
                contrainer[direction] = mark * distance;
                if (!toggle) timer = setTimeout(goto, gap);
            }
        }
        //-动画
        function minus() {
            clearTimeout(timer);
            var d = contrainer[direction];
            if (d > mark * distance) contrainer[direction] = Math.floor(d - (d - mark * distance) * vate);
            else {
                clearInterval(gap_timer);
                mark = mark < 1 ? l : mark;
                contrainer[direction] = mark * distance;
                if (!toggle) timer = setTimeout(goto, gap);
            }
        }
        //控制部分
        if (control && preObj != '' && nextObj != '') {
            nextObj['on' + ename] = function () {
                clearInterval(gap_timer);
                mark = mark < l ? mark : 0;
                contrainer[direction] = mark * distance;
                goto();
            }
            preObj['on' + ename] = function () {
                clearInterval(gap_timer);
                mark = mark < 1 ? l : mark;
                contrainer[direction] = mark * distance;
                mark -= 1;
                gap_timer = setInterval(minus, frame);
            }
        }
        //鼠标事件
        scrollObj.onmouseover = function () { toggle = true; clearTimeout(timer); }
        scrollObj.onmouseout = function () { toggle = false; timer = setTimeout(goto, gap); }
    },
    //重包裹内容，返回最大宽度或高度
    pack: function (obj, type, control) {
        var temp = obj.innerHTML;
        obj.innerHTML = '';
        var span = document.createElement('span');
        obj.appendChild(span);
        span.innerHTML = temp;
        span.style.styleFloat = 'left';
        span.style.cssFloat = 'left';
        var len = (type == 'scrollTop') ? span.offsetHeight : span.offsetWidth;
        span.innerHTML += temp;
        if (typeof control != 'undefined' && control == true) span.innerHTML += temp;
        return len;
    }
};


/*
*新闻弹窗
*date:2011-10-17
*/
TB.popWindow = new TB.utils.init();
TB.popWindow.prototype = {
    initialize: function (contrainer, options) {
        this.contrainer = contrainer;
        this.setDefault(options);
        this.url = this.options.url;
        this.gaps = this.options.gaps * 1000;
        this.userId = this.options.userId;
        this.barClass = this.options.barClass;
        this.isLogin = this.options.isLogin;
        //计时器
        this.timer = null;
        //显示时间
        this.showTime = this.options.showTime;
        //DOM创建
        this.onCreate();
    },
    setDefault: function (options) {
        this.options = {
            //访问接口
            url: null,
            //访问间隔
            gaps: 60,
            //是否登录
            isLogin: 0,
            //用户ID
            userId: null,
            //显示时间
            showTime: 20000,
            //外来接口
            barClass: null
        };
        TB.utils.Extend(this.options, options || {});
    },
    onCreate: function () {
        this.frag = document.createDocumentFragment();
        this.pw_title = TB.utils.create('div', this.frag, 'pw_title');
        this.title = TB.utils.create('span', this.pw_title, 'title');
        this.closed = TB.utils.create('span', this.pw_title, 'closed');
        this.pw_context = TB.utils.create('div', this.frag, 'pw_context');
        this.pw_more = TB.utils.create('div', this.frag, 'pw_more');
        this.contrainer.appendChild(this.frag);
        this.addEvent();
    },
    addEvent: function () {
        var _this = this;
        //关闭按钮事件
        TB.utils.bind(this.closed, 'mouseover', function () {
            TB.utils.addClass(this, 'closed_over');
        });
        TB.utils.bind(this.closed, 'mouseout', function () {
            TB.utils.removeClass(this, 'closed_over');
        });
        TB.utils.bind(this.closed, 'click', function () {
            clearTimeout(_this.timer);
            _this.contrainer.style.display = 'none';
        });
        //动画效果
        this.fx_show = new TB.Animator({ duration: 2000 });
        this.fx_show.addSubject(new NumSubject(this.contrainer, 'opacity', 0, 1));
        this.fx_hide = new TB.Animator({
            duration: 1000,
            onComplete: function () {
                clearTimeout(_this.timer);
                _this.contrainer.style.display = 'none';
            }
        });
        this.fx_hide.addSubject(new NumSubject(this.contrainer, 'opacity', 1, 0));
        //取消计时器
        TB.utils.bind(this.contrainer, 'mouseover', function () {
            clearTimeout(_this.timer);
        });
        //重新启动
        TB.utils.bind(this.contrainer, 'mouseout', function () {
            _this.timer = setTimeout(function () {
                _this.fx_hide.seekFromTo(0, 1);
            }, _this.showTime);
        });
    },
    //数据访问
    getCname: function (host) {
        var cname = "";
        var aParam = location.host.split(".");
        for (var i = 0, len = aParam.length; i < len; i++) {
            if (aParam[i] == "hexun") break;
        }
        cname = aParam[i - 1] + ".hexun.com";
        return cname;
    },
    visit: function () {
        var _this = this;
        if (this.barClass != null && this.barClass.state != 0) {
            var url = (this.url.indexOf('?') != -1) ? (this.url + '&uid=' + this.userId) : (this.url + '?uid=' + this.userId);
            if (typeof console != 'undefined') console.log(url);
            var cname = this.getCname(location.host);
            url = url + "&cname=" + cname;

            var cityCondition = false, //城市判断条件 
                cookie = document.cookie,
                n1 = cookie.indexOf("CITY="),
                n2 = cookie.indexOf(";", n1),
                cityNum;
            if (n1 == -1) {
                cityCondition = true;
            }
            else {
                cityNum = cookie.substring(n1, n2).replace(/\D+/g, "") + ",";
            }
            TB.utils.jsonp(url, function (data) {
                if (typeof data != 'undefined' && TB.params.popWindow) {
                    _this.getData(data);
                    if (data.city == undefined) {
                        cityCondition = true;
                    }
                    if (data.city && cityNum) {
                        cityCondition = data.city.indexOf(cityNum) == -1 ? false : true;
                    }
                    if (cityCondition) {
                        TB.utils.css(_this.contrainer, { 'display': '', 'opacity': 0 });
                        _this.fx_show.seekFromTo(0, 1);
                        _this.timer = setTimeout(function () {
                            _this.fx_hide.seekFromTo(0, 1);
                        }, _this.showTime);
                    }
                }
                setTimeout(function () {
                    _this.visit();
                }, _this.gaps);
            }, 'pops');
        }
        else {
            //setTimeout(function () {
            //    _this.visit();
            //}, 3000);
        }
    },
    //数据构建
    getData: function (data) {
        //this.title.innerHTML = (data.title.length>12)?data.title.substr(0,12):data.title;
        this.title.innerHTML = data.title;
        this.pw_context.innerHTML = '<a href="' + data.url + '" target="_blank">' + data.desc + '</a>';
        this.pw_more.innerHTML = '<a href="' + data.url + '" target="_blank">' + TB.lang.linked_pops + '</a>';
    }
};