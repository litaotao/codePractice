// 下面是 seajs 的异步载入代码：
;(function(m, o, d, u, l, a, r) {
  if(m[d]) return
  function f(n, t) { return function() { r.push(n, arguments); return t } }
  m[d] = a = { args: (r = []), config: f(0, a), use: f(1, a) }
  m.define = f(2)
  u = o.createElement('script')
  u.id = d + 'node'
  u.src = '/static/js/sea.js'
  l = o.getElementsByTagName('head')[0]
  a = o.getElementsByTagName('base')[0]
  a ? l.insertBefore(u, a) : l.appendChild(u)
})(window, document, 'seajs');

seajs.config({
	base:'/static/js/',
    debug:2,
	alias: {
		'jquery': 'sea_jquery',
		'bootstrap': '/static/js/bootstrap.min.js',
		'hx_jq': 'jquery.js',
		'hoverCard': 'hoverCard',
		'cookie':'jquery_cookie',
		'jq_tmpl':'jquery.tmpl.min',
		'prettify':'prettify.js',
		'masonry':'jquery.masonry.min.js',
		'baidujs':'http://cbjs.baidu.com/js/m.js',
		'png_min':'png_min'
	},
	preload: ['jquery'],
    charset: 'utf-8'
})
// 'hx_common': 'http://huxiu.com/static/js/common.js',

// seajs.use(['hx_common','init']);
seajs.use(['init']);