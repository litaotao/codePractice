//全局命名
var TB = {};
//中文参数
TB.lang = {
    beginBtn: '单击这里开始我的应用',
    mystockTitle: '我的股票--管理',
    tips_unlogin: '登录和讯账户，换电脑、操作系统，仍可保留工具条的自定义设置',
    linked_login: '点击登录',
    titles_visited: '最近使用',
    linked_exit: '退出',
    tips_blog: '访问我的博客',
    tips_wb: '微博新消息',
    tips_sns: '家园新消息',
    titles_menu: '我的应用',
    linked_manage: '管理我的应用',
    tips_load: '数据加载中...',
    tips_null: '（空）',
    tips_addApp: '添加新应用',
    linked_pops: '查看',
    tips_addSuccess: '添加成功，点击查看所有！',
    tips_addFail: '添加失败！',
    linked_myallstock: '管理我的全部股票(最高可达200只)',
    tips_unlogined: '登录和讯网即可保存自己的自选股表，无论何时何地，洞悉股市风云。',
    tips_suggest: '输入代码、名称或简写',
    tips_nosuggest: '没有可匹配的股票名称或代码',
    tips_addStock: '请输入正确股票代码！',
    tips_warms: '登录后可设置提醒！',
    tips_mywarms: '股票提醒',
    tips_news: '的相关新闻',
    tips_delete: '确认删除吗？',
    tips_noadd: '温馨提示：您还没有添加任何股票，可输入股票代码通过下方“添加自选”按钮进行添加'
};
/*
*name:toolsBar和讯工具条参数接口包
*data:2011-12-12
*author:huangqiang
*company:hexun.com
*/
TB.params = {
    //主体的唯一ID
    toolsId: 'toolsBar20111010',
    //主体宽度
    width: 960,
    //弹窗标示窗口
    popWindow: true,
    //地址
    linked: {
        //退出
        exit: 'http://utility.tool.hexun.com/quit.aspx',
        //管理我的应用
        manage: 'http://myapp.hexun.com',
        //添加应用
        addApp: 'http://myapp.hexun.com',
        //注册地址
        regUrl: 'http://reg.hexun.com/regname.aspx',
        //我的股票
        mystock: 'http://mymoney.hexun.com/istock/default.aspx'
    },
    //接口
    ports: {
        //登录接口
        login: 'http://shequ5.tool.hexun.com/rest/checkjson.aspx',
        //新闻滚动数据
        newsScroll: 'http://myapp.hexun.com/roll/rollAction_list.action',
        //弹窗新闻数据
        popsNews: 'http://myapp.hexun.com/tip/tipAction_tiplist.action',
        //推送数据
        aboutInfo: 'http://myapp.hexun.com/pushLink/pushLinkAction_pushLinklist.action',
        //输入提示接口
        suggest: 'http://data.stock.hexun.com/include/AjaxSearch2011.ashx?type=stock',
        //推送股票接口
        pushStock: 'http://mymoney.tool.hexun.com/2012/interFace/Js_MystockForToolBar.aspx',
        //最近访问接口
        visitStock: 'http://quote.tool.hexun.com/rest1/sd_cookie.ashx',
        //我的股票接口
        myStock: 'http://mymoney.tool.hexun.com/2012/interFace/Js_MystockForToolBar.aspx',
        //登录用户添加股票接口 //MQL 2012-11-5 modify addStock年份参数
        addStock: 'http://mymoney.tool.hexun.com/2012/interface/mystockadd.aspx',
        //登录用户删除股票接口 //MQL 2012-11-8 modify deleteStock年份参数
        deleteStock: 'http://mymoney.tool.hexun.com/2012/interface/myStockRemove.aspx',
        //一级分类
        firTyper: 'http://myapp.hexun.com/appType/appTypeAction_appTypelist.action?type=1',
        //最近访问
        reVisit: 'http://myapp.hexun.com/indexAction_useList.action',
        //统计
        cout: 'http://myapp.hexun.com/indexAction_uselog.action',
        //排序
        order: 'http://myapp.hexun.com/indexAction_sortApp.action',
        //删除
        del: 'http://myapp.hexun.com/indexAction_delApp.action',
        //我的应用
        app: 'http://myapp.hexun.com/indexAction_typeList.action'
    },
    cookie: {
        state: 'TBState',
        user: 'userToken',
        visitor: 'HexunTrack'
    }
};
//加载方法
TB.method = {
    //事件绑定
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
    //DOM加载完毕
    ready: function (func, win, doc) {
        var win = win || window;
        var doc = doc || document;
        var loaded = false;
        var readyFunc = function () {
            if (loaded) return;
            loaded = true;
            func();
        };
        if (doc.addEventListener) {
            this.bind(doc, 'DOMContentLoaded', readyFunc);
        } else if (doc.attachEvent) {
            this.bind(doc, 'readystatechange', function () {
                if (doc.readyState == 'complete' || doc.readyState == 'loaded') readyFunc();
            });
            if (doc.documentElement.doScroll && typeof win.frameElement === 'undefined') {
                var ieReadyFunc = function () {
                    if (loaded) return;
                    try {
                        doc.documentElement.doScroll('left');
                    } catch (e) {
                        window.setTimeout(ieReadyFunc, 0);
                        return;
                    }
                    readyFunc();
                };
                ieReadyFunc();
            }
        }
        this.bind(win, 'load', readyFunc);
    },
    //动态加载
    Loading: function (url, type, callback, id) {
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
                    //MQL 2012-10-16 url改变
                    //road.src = url;
                    road.src = "http://img.hexun.com/app/js/TB.core.js?20130514";
                    document.getElementsByTagName('head')[0].appendChild(road);
                }
                if (type == 'link') {
                    road.type = 'text/css';
                    road.rel = "stylesheet";
                    road.href = url;
                    var header = document.getElementsByTagName('head')[0];
                    header.insertBefore(road, header.firstChild);
                }
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
    }
};

//域名同级
document.domain = 'hexun.com';
//IE6图片背景缓存

try {
    document.execCommand("BackgroundImageCache", false, true);
}
catch (e) { }

//加载
TB.method.ready(function () {
    //载入CSS文件
    TB.method.Loading('http://img.hexun.com/app/css/toolsBar.css?ver=201201301', 'link', function () { });
    //载入js文件
    //TB.method.Loading('http://ui.cms.hexun.com/hq/app/js/TB.core.js','script',function(){
    TB.method.Loading('http://img.hexun.com/app/js/TB.core.js?v5', 'script', function () {
        //获取验证信息
        var saftyInfo = {
            userId: null,
            isLogin: 0,
            userInfo: {},
            state: 1
        };
        //读取状态
        var stateInfo = TB.utils.Cookie.get(TB.params.cookie.state);
        if (stateInfo != null && TB.utils.trim(stateInfo) != '') {
            saftyInfo.state = parseInt(stateInfo);
        }
        else {
            saftyInfo.state = 1;
        }
        //登录用户
        var loginInfo = TB.utils.Cookie.get(TB.params.cookie.user);
        if (loginInfo != null && TB.utils.trim(loginInfo) != '') {
            saftyInfo.isLogin = 1;
            var url = TB.params.ports.login;
            url = (url.indexOf('?') != -1) ? (url + '&token=' + loginInfo) : (url + '?token=' + loginInfo);
            if (typeof console != 'undefined') console.log(url);
            TB.utils.jsonp(url, function (data) {
                if (data) {
                    saftyInfo.userId = data.userid;
                    _loadTB();
                    saftyInfo.userInfo = data;
                }
            }, 'logininfo');
        }
        else {
            saftyInfo.isLogin = 0;
            //游客信息
            var visitInfo = TB.utils.Cookie.get(TB.params.cookie.visitor);
            if (visitInfo != null && TB.utils.trim(visitInfo) != '') {
                saftyInfo.userId = (/SID=(\d+)/).exec(visitInfo)[1];
                _loadTB();
            }
        }


        //载入方法
        function _loadTB() {
            //创建底通
            var bar = new TB.Bar({
                state: saftyInfo.state
            });
            //请求一级分类数据
            TB.utils.jsonp(TB.params.ports.firTyper, function (d1) {
                if (d1) {
                    //请求最近访问数据
                    var url = TB.params.ports.reVisit;
                    url = (url.indexOf('?') != -1) ? (url + '&') : (url + '?');
                    url += 'uid=' + saftyInfo.userId + '&isLogin=' + saftyInfo.isLogin;
                    TB.utils.jsonp(url, function (d2) {
                        if (typeof d2 == 'undefined') d2 = [];
                        //创建我的应用面板
                        var app = new TB.MyApp(bar.myapp_panel, bar.app_list, {
                            visitData: d2,
                            appType: d1,
                            isLogin: saftyInfo.isLogin,
                            userId: saftyInfo.userId,
                            userInfo: saftyInfo.userInfo,
                            ports_cout: TB.params.ports.cout,
                            ports_order: TB.params.ports.order,
                            ports_del: TB.params.ports.del,
                            ports_app: TB.params.ports.app
                        });
                    }, 'revisit');
                }
            }, 'firtyper');
            //其他

            /*
            *滚动新闻数据加载
            *TB.params.ports.newsScroll滚动新闻数据读取接口
            *bar.bar_news滚动新闻载入面板
            **/
            if (bar.news) TB.newsScroll(TB.params.ports.newsScroll, bar.bar_news);

            /*
            *新闻弹窗
            *bar.bar_pops新闻弹窗载入面板
            *TB.params.ports.popsNews弹窗新闻数据接口
            */
            if (bar.pops) {
                var vid = '', vs = TB.utils.Cookie.get(TB.params.cookie.visitor);
                if (vs != null && TB.utils.trim(vs) != '') {
                    vid = (/SID=(\d+)/).exec(vs)[1];
                }
                TB.utils.bind(window, 'focus', function () {
                    TB.params.popWindow = true;
                });
                TB.utils.bind(window, 'blur', function () {
                    TB.params.popWindow = false;
                });
                var pops = new TB.popWindow(bar.bar_pops, {
                    //弹窗数据接口
                    url: TB.params.ports.popsNews,
                    //弹窗间隔,秒
                    gaps: 300,
                    //是否登录
                    isLogin: saftyInfo.isLogin,
                    //用户ID
                    userId: vid,
                    //关联bar类
                    barClass: bar
                });
                //启动弹窗
                setTimeout(function () {
                    pops.visit();
                }, 1000);
            }

            /*
            *推送相关信息
            *currentStock & currentStockName 为和讯个股页记录股票代码和股票名称变量
            *TB.params.ports.aboutInfo推送信息接口
            */
            if (bar.about) {
                if (document.location.href.indexOf('stockdata.stock.hexun.com') != -1 && typeof currentStock != 'undefined' && typeof currentStockName != 'undefined') {
                    bar.bar_about.innerHTML = '<div class="bar_about_old">关于&nbsp;<a href="http://t.hexun.com/g/' + currentStock + '.html" target="_blank">' + currentStockName + '大家都在说什么</a></div>';
                } else {
                    TB.utils.jsonp(TB.params.ports.aboutInfo, function (data) {
                        if (data && data != '')
                            bar.bar_about.innerHTML = '<div class="bar_about">' + data.title + '</div>';
                        //else
                        // console.log(TB.params.ports.aboutInfo)
                        //  console.log(data)
                        //  bar.bar_about.innerHTML = '<div style="padding-top:2px"><IFRAME WIDTH=205 HEIGHT=20 MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no BORDERCOLOR="#000000" SRC="http://hx.hexun.com/html.ng/adform=button&adsize=205*20&place=left08&site=homeway"></IFRAME></div>';

                    }, 'about');
                }
            }


            /*
            *我的股票应用
            *
            */
            if (bar.stock) {
                var stock = new TB.MyStock(bar.bar_stock, bar.mystock_panel, {
                    //我的股票接口
                    mystockUrl: TB.params.ports.myStock,
                    //默认接口
                    defaultUrl: TB.params.ports.pushStock,
                    //最近访问接口
                    visitStockUrl: TB.params.ports.visitStock,
                    //用户ID
                    userId: saftyInfo.userId,
                    //是否登录
                    isLogin: saftyInfo.isLogin,
                    //输入提示
                    suggestUrl: TB.params.ports.suggest,
                    //添加股票
                    addStockUrl: TB.params.ports.addStock,
                    //删除股票
                    deleteStockUrl: TB.params.ports.deleteStock
                });
            }
        }

    });
});
//MQL 添加页内页外跳转
var AjaxJumpBtn = function (arrId, bool) {
    var jumpBtn = document.getElementById(arrId);
    var url = window.location + "";
    if (url.search("myapp.hexun.com") == (-1)) { //判断跳转条件
        var n = jumpBtn.getAttribute("name");
        window.logoN = n;
        var newWindow = window.open("http://myapp.hexun.com");
        window.openAndAjax = true;
        return false;
    }
    else {
        HX.$("sort").style.display = 'none';
        var mainerRight = HX.$("hxAppList");
        if (mainerRight != null) {
            var n = jumpBtn.getAttribute("name");
            var data = (bool == true) ? window.dataArr[n] : window.dataArr2[n];
            var tmp = '<li><dl><dt><img src="' + data.bigpic + '" title="' + data.name + '"></dt><dd class=f><b>' + data.name + '</b><p><span>' + data.total + '</span>' + APP.lang.tips_fix + '</p></dd><dd class=r>开发者：' + ((data.appDeveloper == null || data.appDeveloper == "" || data.appDeveloper == "null") ? "和讯信息技术有限公司" : data.appDeveloper) + '</dd></dl><div class="opt"><iframe frameborder="0" width="715" height="810" scrolling="no" src="' + data.link + '"></iframe></div></li>';
            if (mainerRight.className != 'detail') mainerRight.className = 'detail';
            mainerRight.innerHTML = tmp;
            document.getElementById("hxAppPaging").innerHTML = "";
            return false;
        };
    }
};
