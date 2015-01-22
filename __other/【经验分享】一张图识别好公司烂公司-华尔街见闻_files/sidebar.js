// +----------------------------------------------------------------------
// | [finance] http://WallStreetCN.com
// +----------------------------------------------------------------------
// | Author: Mr.5 <mr5.simple@gmail.com>
// +----------------------------------------------------------------------
// + Datetime: 14-6-20 下午7:13
// +----------------------------------------------------------------------
// + sidebar 嵌入调用脚本
// +----------------------------------------------------------------------
(function (root, factory) {

    if (typeof root.WallstreetCN == 'undefined') {
        root.WallstreetCN = {};
    }
    if (typeof root.WallstreetCN.embed == 'undefined') {
        root.WallstreetCN.embed = {};
    }
    root.WallstreetCN.embed.Sidebar = factory();


})(this, function () {
    /**
     * @package WallStreetCN.embed
     * @class Sidebar
     * @param {string} parentId 上级节点 ID
     * @param {object} options  选项
     * @param {string} iFrameId iFrame 自身的 ID
     */
    var Sidebar = function (parentId, options, iFrameId) {
        if (typeof parentId !== 'string') {
            throw new Error('parentId 未指定');
        }
        if (!document.getElementById(parentId)) {
            throw new Error('找不到 parentId 对应的 DOM 节点');
        }
        if (!options || typeof options.tabs !== 'object' || options.tabs.length <= 0) {
            throw new Error('options 参数不正确，请查阅文档 http://markets.wallstreetcn.com/embed/editor/sidbar');
        }
        this.parentId = parentId;
        this.iframeId = iFrameId;
        this.options = options;
    }
    Sidebar.prototype = /* @lends WallStreetCN.embed.Sidebar.prototype */ {
        _baseURL: 'http://markets.wallstreetcn.com/embed/sidebar/v2',
        /**
         * 渲染
         */
        render: function () {
            var self = this;

            var iframe = document.createElement('iframe');
            if (typeof self.iframeId === 'string') {
                iframe.setAttribute('id', self.iframeId);
            }
            if(!self.options.width) {
                iframe.setAttribute('width', self.options.width);
            } else {
                iframe.setAttribute('width', self.options.width);
            }
            iframe.setAttribute('height', self.options.height);
            iframe.setAttribute('scrolling', 'no');
            iframe.style.border = 'none';
            iframe.setAttribute('src', self._generateURL(self.options));

            document.getElementById(self.parentId).appendChild(iframe);
        },

        /**
         * 生成 URL
         * @param {object} options
         * @returns {string}
         * @private
         */
        _generateURL: function (options) {
            var self = this;
            var utmSource = options.utmSource;
            if(!utmSource) {
                utmSource = 'unknown';
            } else {
                delete options.utmSource;
            }
            encodeURI(utmSource);
            return self._baseURL + '?_='
                + self._base64_encode(JSON.stringify(options), true)
                + '&utm_source=' + utmSource
                + '&utm_medium=embed-sidebar&utm_campaign=open_platform'
                + '&hmsr=' + utmSource
                + '&hmmd=embed-sidebar&hmpl=open_platform';

        },
        /**
         * base64 编码
         * @param {string} u    待编码的字符串
         * @param {boolean} urisafe 是否 uri
         * @private
         * @returns {string}
         */
        _base64_encode: function (u, urisafe) {
            // constants
            var b64chars
                = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            var fromCharCode = String.fromCharCode;
            // encoder stuff
            var cb_utob = function (c) {
                if (c.length < 2) {
                    var cc = c.charCodeAt(0);
                    return cc < 0x80 ? c
                        : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                        + fromCharCode(0x80 | (cc & 0x3f)))
                        : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | ( cc & 0x3f)));
                } else {
                    var cc = 0x10000
                        + (c.charCodeAt(0) - 0xD800) * 0x400
                        + (c.charCodeAt(1) - 0xDC00);
                    return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                        + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                        + fromCharCode(0x80 | ((cc >>> 6) & 0x3f))
                        + fromCharCode(0x80 | ( cc & 0x3f)));
                }
            };
            var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
            var utob = function (u) {
                return u.replace(re_utob, cb_utob);
            };
            var cb_encode = function (ccc) {
                var padlen = [0, 2, 1][ccc.length % 3],
                    ord = ccc.charCodeAt(0) << 16
                        | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
                        | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
                    chars = [
                        b64chars.charAt(ord >>> 18),
                        b64chars.charAt((ord >>> 12) & 63),
                        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
                    ];
                return chars.join('');
            };
            var btoa = function (b) {
                return b.replace(/[\s\S]{1,3}/g, cb_encode);
            };
            var _encode = function (u) {
                    return btoa(utob(u))
                }
                ;
            var encode = function (u, urisafe) {
                return !urisafe
                    ? _encode(u)
                    : _encode(u).replace(/[+\/]/g,function (m0) {
                    return m0 == '+' ? '-' : '_';
                }).replace(/=/g, '');
            };
            return encode(u, urisafe);
        }

    }

    return Sidebar;
});