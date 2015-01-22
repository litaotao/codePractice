var ifeng = window.ifeng || {};
(function()
{
    ifeng.util = ifeng.util || {};
    ifeng.video = ifeng.video || {};
    ifeng.business = ifeng.business || {};
    ifeng.util = {
        merge : function(s, t)
        {
            var r = {};
            if (!t)
            {
                return s
            }
            for (var i in s)
            {
                r[i] = typeof t[i] != "undefined" ? t[i] : s[i]
            }
            return r
        },
        getCookie : function(name)
        {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen)
            {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg)
                {
                    return ifeng.util.getCookieVal(j)
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0)
                {
                    break
                }
            }
            return ""
        },
        getCookieVal : function(offset)
        {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1)
            {
                endstr = document.cookie.length
            }
            return unescape(document.cookie.substring(offset, endstr))
        },
        getCookies : function()
        {
            _Cookie = new Array();
            if (document.cookie.indexOf(";") != -1)
            {
                var _sp, _name, _tp, _tars, _tarslength;
                var _item = document.cookie.split("; ");
                var _itemlength = _item.length;
                for (i = 0; i < _itemlength; i++)
                {
                    _sp = _item[i].split("=");
                    _name = _sp[0];
                    _value = _sp[1];
                    _coo = new Array();
                    _coo.name = _name;
                    _coo.value = _value;
                    _Cookie.push(_coo)
                }
            }
            return _Cookie
        },
        setCookie : function(name, value, expires, path, domain, secure)
        {
            document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "") + ((path) ? "; path=" + path : "")
                    + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "")
        },
        deleteCookie : function(name, path, domain)
        {
            if (this.getCookie(name))
            {
                document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "")
                        + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
            }
        },
        clearCookie : function()
        {
            cookies = this.getCookies();
            for (i = 0; i < cookies.length; i++)
            {
                this.deleteCookie(cookies[i]["name"])
            }
        },
        getCookieString : function()
        {
            return document.cookie
        },
        stringToJSON : function(str)
        {
            return (new Function("return " + str))()
        },
        jsonToString : function(json)
        {
            var arr = [], me = this, format = function(s)
            {
                if (typeof s == "object" && s != null)
                {
                    return me.jsonToString(s)
                }
                else
                {
                    return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s
                }
            };
            for (var i in json)
            {
                arr.push("'" + i + "':" + format(json[i]))
            }
            return "{" + arr.join(",") + "}"
        },
        secondToDate : function(seconds)
        {
            var hh, mm, ss;
            if (!seconds || seconds < 0)
            {
                return
            }
            hh = seconds / 3600 | 0;
            seconds = parseInt(seconds) - hh * 3600;
            if (parseInt(hh) < 10)
            {
                hh = "0" + hh
            }
            mm = seconds / 60 | 0;
            ss = parseInt(seconds) - mm * 60;
            if (parseInt(mm) < 10)
            {
                mm = "0" + mm
            }
            if (ss < 10)
            {
                ss = "0" + ss
            }
            return hh != "00" ? hh + ":" + mm + ":" + ss : mm + ":" + ss
        },
        format : function(date, format)
        {
            var _ = date;
            var o = {
                "M+" : _.getMonth() + 1,
                "d+" : _.getDate(),
                "h+" : _.getHours(),
                "m+" : _.getMinutes(),
                "s+" : _.getSeconds(),
                "q+" : Math.floor((_.getMonth() + 3) / 3),
                S : _.getMilliseconds()
            };
            if (/(y+)/.test(format))
            {
                format = format.replace(RegExp.$1, (_.getFullYear() + "").substr(4 - RegExp.$1.length))
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(format))
                {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
                }
            }
            return format
        },
        convertTimeByZone : function(date, TimeZone)
        {
            if (!date)
            {
                return
            }
            return new Date(date.getTime() + date.getTimezoneOffset() * 60000 + (3600000 * TimeZone))
        },
        getScript : function(src, f)
        {
            var s = document.createElement("script");
            s.onload = s.onreadystatechange = function()
            {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
                {
                    f && f();
                    s.onload = s.onreadystatechange = null
                }
            };
            s.src = src;
            document.getElementsByTagName("head")[0].appendChild(s)
        }
    };
    ifeng.video.VideoRecord = function(settings)
    {
        this.settings = ifeng.util.merge(this.settings, settings)
    };
    ifeng.video.VideoRecord.prototype = {
        settings : {
            cookieExpires : 864000000,
            domain : "v.ifeng.com",
            cookieName : "playListTag"
        },
        setCookies : function(cookieJson, expires)
        {
            var _ = this, date = new Date();
            expires = expires ? expires : new Date(date.getTime() + _.settings.cookieExpires);
            ifeng.util.setCookie(_.settings.cookieName, ifeng.util.jsonToString(cookieJson), expires, "/", _.settings.domain)
        },
        getCookieJson : function()
        {
            var str = ifeng.util.getCookie(this.settings.cookieName);
            if (str)
            {
                return ifeng.util.stringToJSON(str)
            }
            return {}
        },
        updateCookies : function(key, value)
        {
            var json = this.getCookieJson();
            json[key] = value;
            this.setCookies(json)
        },
        _deleteByKey : function(key)
        {
            var json = this.getCookieJson();
            if (json)
            {
                for (var item in json)
                {
                    if (item === key)
                    {
                        delete json[key];
                        break
                    }
                }
            }
            return json
        },
        saveOrUpdate : function(key, value)
        {
            var json = this._deleteByKey(key);
            json[key] = value;
            this.setCookies(json)
        },
        remove : function(key)
        {
            var json = this._deleteByKey(key);
            this.setCookies(json)
        },
        removeAll : function()
        {
            this.setCookies({})
        }
    };
    ifeng.business.VideoRecordWrite = {
        flashWriteCookie : function(vid, name, vlasttime, vurl, duration)
        {
            var o = {
                vlasttime : vlasttime,
                vurl : vurl,
                duration : duration,
                name : name
            }, cookies = new ifeng.video.VideoRecord();
            cookies.saveOrUpdate(vid, o)
        }
    }
})();