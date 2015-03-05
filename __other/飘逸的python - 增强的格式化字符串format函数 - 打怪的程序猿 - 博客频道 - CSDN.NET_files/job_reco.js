/*
UI地址：\\192.168.6.119\产品管理\2_数据支撑\03_UI\职位推荐
引用方法：<script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
调用方法：csdn.position.show({
sourceType: "", //blog，bbs, download，ask, space, hero, edu, csto
tplType: "", //模板类型，
               博客详情：blogDetail,
               博客专栏：blogSpec,
               论坛详情：bbsDetail，
               问答详情：askDetail，
               个人空间--我的空间：personalSpaceMy，
               个人空间--首页：personalSpaceHome，
               英雄会--首页：heroHome
               英雄会--答题专家组：heroExpert
               英雄会--挑战题目详情页：heroFightDetail
               英雄会--我的英雄会：heroMy
               在线培训--课程分类列表：无
               在线培训--课程详情页：eduDetail
               搜索：search
               下载--我的资源：downMy
               下载--下载页和下载详情页：downDetail

searchType: "", //页面类型，用于搜索函数，detail(详情页) / list(列表页)。
searchKey: "", //搜索关键字，例如博客详情：博文ID，如果是博客专栏：分类字符串。
username: "", //当前登录用户名
containerId: "" //容器DIV的id。
});
举例：
博客详情页
<div id="job_blog_reco">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "blog",
     tplType: "blogDetail",
     searchType: "detail",
     searchKey: "博文ID",
     username: "当前登录用户名",
     containerId: "job_blog_reco"  //容器DIV的id。
   });
 </script>
</div>

博客专栏页
<div id="job_blog_reco_spec">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "blog",
     tplType: "blogSpec",
     searchType: "list",
     searchKey: "专栏分类字符串",
     username: "当前登录用户名",
     containerId: "job_blog_reco_spec"  //容器DIV的id。
   });
 </script>
</div>

论坛详情页
<div id="job_bbs_reco">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "discussion_topic",
     tplType: "bbsDetail",
     searchType: "detail",
     searchKey: "贴子ID",
     username: "当前登录用户名",
     containerId: "job_bbs_reco"  //容器DIV的id。
   });
 </script>
</div>

问答详情页
<div id="job_ask_reco">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "ask_topic",
     tplType: "askDetail",
     searchType: "list",
     searchKey: "问题ID",
     username: "当前登录用户名",
     containerId: "job_ask_reco"  //容器DIV的id。
   });
 </script>
</div>

个人空间--我的空间
<div id="job_myspace_reco">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "my",
     tplType: "personalSpaceMy",
     searchType: "list",
     searchKey: "NO",
     username: "当前登录用户名",
     containerId: "job_myspace_reco"  //容器DIV的id。
   });
 </script>
</div>
个人空间--首页
<div id="job_myhome_reco">
 <script src="http://csdnimg.cn/jobreco/job_reco.js" type="text/javascript"></script>
 <script type="text/javascript">
   csdn.position.show({
     sourceType: "my",
     tplType: "personalSpaceHome",
     searchType: "list",
     searchKey: "NO",
     username: "当前登录用户名",
     containerId: "job_myhome_reco"  //容器DIV的id。
  });
 </script>
</div>


 英雄会-首页，正在发生的下面。
 http://hero.csdn.net/

 英雄会--答题专家组，审题专家组下面。
 http://hero.csdn.net/Examine/Apply

 英雄会--挑战题目详情页，发布公司下面。
 http://hero.csdn.net/OnlineCompiler/Index?ID=10646&ExamID=10649&from=4

 英雄会--我的英雄会，列表的下面。
 http://hero.csdn.net/Exam/List



 在线培训--课程分类列表



 在线培训--课程详情页，在右侧推荐课程下边。
 http://edu.csdn.net/course/detail/326




 搜索
 http://so.csdn.net/so/search/s.do?q=java



 CSTO-案例库列表
 http://www.csto.com/case


 CSTO-案例详情页
 http://www.csto.com/case/show/id:21740


 CSTO-我的T台
 http://www.csto.com/my/info/edit


 CSTO-项目列表页
 http://www.csto.com/project/list


 CSTO-项目详情页
 http://www.csto.com/p/72969


*/
$(document).ready(function() {
  var i = 1;
});
(function (window) {
  var csdn = window.csdn || {};
  function Position() {
    this.prefix = window.location.protocol;


    $("<link>")
      .attr({ rel: "stylesheet",
        type: "text/css",
        href: window.location.protocol + "//csdnimg.cn/jobreco/job_reco.css"
      })
      .appendTo("head");

    /*
     http://blog.csdn.net/lmj623565791/article/details/42407923#t7
     http://blog.csdn.net/column.html
     http://bbs.csdn.net/topics/390963719
     http://ask.csdn.net/
     http://my.csdn.net/
     http://my.csdn.net/my/mycsdn
     http://hero.csdn.net/
    */

    //博客详情：tplType = blogDetail
    this.blogTpl = '<dl class="blog-ass-articl tracking-ad" data-mod="{0}">' +
      '<dt><span>准备好了么？&nbsp;<label class="po_blg_detail_tiao">跳</label><label class="po_blg_detail_ba">吧</label><label class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></span>' +
      '<a href="{1}" target="_blank" class="po_blg_more">更多职位尽在&nbsp;<label class="po_blg_detail_csdn">CSDN JOB</label></a></dt>' +
      '{2}' +
      '</dl>';//{0}，点击标记popu_36    //{1}，http, https ://job.csdn.net    //{2}，内容
    this.blogItem = '<dd class="po_blg_dd">' +
      '<div class="po_blg_po">' +
      '<a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a>' +
      '</div>' +
      '<div class="po_blg_company">' +
      '<a href="{3}" title="{4}" target="_blank">{5}</a>' +
      '</div>' +
      '<label class="po_blg_separator">|</label>' +
      '<div class="po_blg_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<a class="po_blg_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</dd>' ;
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //博客专栏：tplType = blogSpec
    this.blogSpecTpl = '<div class="box_1 tracking-ad" data-mod="{0}">' +
      '<div style="position: relative;">' +
      '<h2>准备好了么？&nbsp;<label class="po_blg_detail_tiao">跳</label><label class="po_blg_detail_ba">吧</label><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></h2>' +
      '</div>' +
      '<ul class="list_comm">' +
      '{2}' +
      '</ul>' +
      '<div class="po_blg_spec_more_div"><a href="{1}" target="_blank" class="po_blg_spec_more">更多职位尽在&nbsp;<label class="po_blg_spec_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.blogSpecItem = '<li>' +
      '<div class="po_blg_spec_po">' +
      '<a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a>' +
      '</div>' +
      '<div class="po_blg_spec_company">' +
      '<a href="{3}" title="{4}" target="_blank">{5}</a>' +
      '</div>' +
      '<div class="po_blg_spec_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div><a class="po_blg_spec_iwant" href="{9}" target="_blank">我要跳槽</a></div>' +
      '</li>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //论坛详情：tplType = bbsDetail
    this.bbsTpl = '<div id="topic-suggest" class="po_bbs_div tracking-ad" data-mod="{0}">' +
      '<div class="related-tags po_bbs_tit_div">' +
      '<span>准备好了么？&nbsp;<label class="po_blg_detail_tiao">跳</label><label class="po_blg_detail_ba">吧</label><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></span>' +
      '<a class="po_bbs_more" href="{1}" target="_blank">更多职位尽在&nbsp;<label class="po_bbs_csdn">CSDN JOB</label></a>' +
      '</div>' +
      '<div class="related-topics po_bbs_item_div">' +
      '<ul>' +
      '{2}' +
      '</ul>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.bbsItem = '<li class="po_bbs_li"><div class="po_bbs_po">' +
      '<a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a>' +
      '</div>' +
      '<div class="po_bbs_company">' +
      '<a href="{3}" title="{4}" target="_blank">{5}</a>' +
      '</div>' +
      '<label class="po_bbs_separator">|</label>' +
      '<div class="po_bbs_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div><a class="po_bbs_iwant" href="{9}" target="_blank">我要跳槽</a></div>' +
      '</li>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //问答首页：tplType = askDetail
    this.askTpl = '<div class="mod_other_ask hot_tags po_ask_div tracking-ad" data-mod="{0}">' +
      '<div class="other_ask">' +
      '<h3><span>准备好了么？&nbsp;<label class="po_my_my_tiao">跳</label><label class="po_my_my_ba">吧</label><label class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></span></h3>' +
      '<div class="po_ask_div_list">' +
      '{2}' +
      '</div>' +
      '<div class="po_ask_more_div"><a href="{1}" target="_blank" class="po_ask_more">更多职位尽在&nbsp;<label class="po_my_home_csdn">CSDN JOB</label></a></div>' +
      '</div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.askItem = '<div class="po_ask_item_div">' +
      '<div class="po_ask_po">' +
      '<a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a>' +
      '</div>' +
      '<div class="po_ask_salary">' +
      '<a href="{6}" target="_blank">{7}</a>' +
      '</div>' +
      '<div class="po_ask_company">' +
      '<a href="{3}" title="{4}" target="_blank">{5}</a>' +
      '</div>' +
      '<a class="po_ask_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //个人空间-首页：tplType = personalSpaceHome
    this.perSpaceHomeTpl = '<div class="phr_third clearfix tracking-ad" data-mod="{0}">' +
      '<div class="phr_third_tit po_my_home_tit">' +
      '<div class="phrt_t po_my_home_t">准备好了么？&nbsp;<label class="po_my_my_tiao">跳</label><label class="po_my_my_ba">吧</label><label class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></div>' +
      '</div>' +
      '<div class="phr_third_con po_my_home_div">' +
      '{2}' +
      '</div>' +
      '<div class="po_my_home_more"><a href="{1}" target="_blank" class="po_my_home_more">更多职位尽在&nbsp;<label class="po_my_home_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.perSpaceHomeItem = '<div class="po_my_home_item_div clearfix">' +
      '<div class="po_my_home_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_my_home_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div class="po_my_home_company"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<a class="po_my_home_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //个人空间-我的：tplType = personalSpaceMy
    this.perSpaceMyTpl = '<div class="interested_con tracking-ad" data-mod="{0}" style="display: block;">' +
      '<h3 class="po_my_my_h3">准备好了么？&nbsp;<label class="po_my_my_tiao">跳</label><label class="po_my_my_ba">吧</label><label class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></h3>' +
      '{2}' +
      '<div class="po_my_my_more_div"><a href="{1}" target="_blank" class="po_my_my_more">更多职位尽在&nbsp;<label class="po_my_my_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.perSpaceMyItem = '<div class="po_my_my_item_div">' +
      '<div class="po_my_my_po">' +
      '<a class="po_my_my_po_a" href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a>' +
      '</div>' +
      '<div class="po_my_my_salary">' +
      '<a href="{6}" target="_blank">{7}</a>' +
      '</div>' +
      '<div class="po_my_my_company">' +
      '<a href="{3}" title="{4}" target="_blank">{5}</a>' +
      '</div>' +
      '<a class="po_my_my_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略    //{9}，职位链接


    //英雄会--首页
    this.heroHomeTpl = '<div class="her_topic_right tracking-ad" data-mod="{0}">' +
      '<h3 class="haping_t">准备好了么？&nbsp;<span class="po_yx_home_tiao">跳</span><span class="po_yx_home_ba">吧</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span></h3>' +
      '{2}' +
      '<div class="po_yx_home_more_div"><a href="{1}" target="_blank" class="po_yx_home_more">更多职位尽在&nbsp;<label class="po_yx_home_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.heroHomeItem = '<div class="her_platform po_yx_home_item_div">' +
      '<div class="po_yx_home_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_yx_home_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div class="po_yx_home_company"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<a class="po_yx_home_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //英雄会--答题专家组
    this.heroExpertTpl = '<div class="her-r-expli po_yx_ex_div tracking-ad" data-mod="{0}">' +
      '<h3 class="tit"><span class="po_yx_ex_tit">准备好了么？&nbsp;</span><label class="po_yx_home_tiao px_yx_ex_tiao">跳</label><label class="po_yx_home_ba px_yx_ex_ba">吧</label><span class="po_yx_ex_tit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span></h3>' +
      '{2}' +
      '<div class="po_yx_ex_more_div"><a href="{1}" target="_blank" class="po_yx_ex_more">更多职位尽在&nbsp;<label class="po_yx_ex_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.heroExpertItem = '<dl class="her-r-explicon po_yx_ex_po_item_div">'
      '<dt class="po_yx_ex_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></dt>' +
      '<dd class="po_yx_ex_salary"><a href="{6}" target="_blank">{7}</a></dd>' +
      '<dd class="py_yx_ex_company"><a href="{3}" title="{4}" target="_blank">{5}</a></dd>' +
      '<a class="po_yx_ex_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</dl>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //英雄会--挑战题目详情页
    this.heroFightDetailTpl = '<div class="her_format_right py_yx_fd_div tracking-ad" data-mod="{0}">' +
      '<h3 class="po_yx_fd_tit"><span>准备好了么？&nbsp;</span><label class="po_yx_home_tiao">跳</label><label class="po_yx_home_ba">吧</label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span></h3>' +
      '{2}' +
      '<div class="po_yx_fd_more_div"><a href="{1}" target="_blank" class="po_yx_fd_more">更多职位尽在&nbsp;<label class="po_yx_fd_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.heroFightDetailItem = '<div class="po_yx_fd_item_div">' +
      '<div class="po_yx_fd_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_yx_fd_company"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<div class="po_yx_fd_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div><a class="po_yx_fd_iwant" href="{9}" target="_blank">我要跳槽</a></div>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略


    //英雄会--我的英雄会
    this.heroMyTpl = '<div class="her-resultli po_yx_my_div tracking-ad" data-mod="{0}">' +
      '<h3><span>准备好了么？&nbsp;</span><label class="po_yx_home_tiao">跳</label><label class="po_yx_home_ba">吧</label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span>' +
      '<a href="{1}" target="_blank" class="po_yx_my_more">更多职位尽在&nbsp;<label class="po_yx_my_csdn">CSDN JOB</label></a></h3>' +
      '{2}' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.heroMyItem = '<div class="po_yx_my_item_div">' +
      '<div class="po_yx_my_item_dot">▪</div>' +
      '<div class="po_yx_my_item_cont">' +
      '<div class="po_yx_my_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_yx_my_company"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<label class="po_yx_my_separator">|</label>' +
      '<div class="po_yx_my_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '</div>' +
      '<a class="po_yx_my_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略



    //在线培训--课程分类列表
    this.eduListTpl = '';
    this.eduListItem = '';


    //在线培训--课程详情页
    this.eduDetailTpl = '<div class="boutique-curr-box tracking-ad" data-mod="{0}">' +
      '<div class="boutique-curr"><h3>准备好了么？&nbsp;<label class="po_my_my_tiao">跳</label><label class="po_my_my_ba">吧</label><label class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</label></h3>' +
      '<div class="cutt-column">' +
      '{2}' +
      '<div class="po_edu_detail_more_div"><a href="{1}" target="_blank" class="po_edu_detail_more">更多职位尽在&nbsp;<label class="po_edu_detail_csdn">CSDN JOB</label></a></div>' +
      '</div></div></div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.eduDetailItem = '<div class="po_edu_detail_item_div clearfix">'
      '<div class="po_edu_detail_po"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}<a></div>' +
      '<div class="po_edu_detail_salary"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div class="po_edu_detail_company"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<a class="po_edu_detail_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略



    //搜索
    this.searchTpl = '<div class="common-box tracking-ad" data-mod="{0}" style="display: block;">' +
      '<h3 id="job-pos-title" class="po_search_tit">准备好了么？&nbsp;<span class="po_blg_detail_tiao">跳</span><span class="po_blg_detail_ba">吧</span><span class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span></h3>' +
      '<div class="po_search_div">' +
      '{2}' +
      '<div class="po_search_more_div"><a href="{1}" target="_blank" class="po_search_more">更多职位尽在&nbsp;<label class="po_search_csdn">CSDN JOB</label></a></div>' +
      '</div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.searchItem = '<div class="po_search_item_div">' +
      '<div class="po_search_po_div"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_search_salary_div"><a href="{6}" target="_blank">{7}</a></div>' +
      '<div class="po_search_company_div"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<a class="po_search_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>' +
      '';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略    //{9}，我要跳槽



    //下载--我的资源
    this.downMyTpl = '<div id="my-tags-side" class="panel panel-default tracking-ad" data-mod="{0}">' +
      '<div class="panel-heading po_downmy_div">' +
      '<h3 class="panel-title">准备好了么？&nbsp;<span class="po_blg_detail_tiao">跳</span><span class="po_blg_detail_ba">吧</span><span class="po_blg_detail_th">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;！</span></h3>' +
      '</div>' +
      '<div class="panel-body">' +
      '{2}' +
      '</div>' +
      '<div class="po_downmy_more_div"><a href="{1}" target="_blank" class="po_downmy_more">更多职位尽在&nbsp;<label class="po_downmy_csdn">CSDN JOB</label></a></div>' +
      '</div>';//{0}，点击标记popu_36    //{1}，更多的链接    //{2}，内容
    this.downMyItem = '<div class="po_downmy_item_div">' +
      '<div class="po_downmy_po_div"><a href="{0}" title="{1}" strategy="{8}" target="_blank">{2}</a></div>' +
      '<div class="po_downmy_company_div"><a href="{3}" title="{4}" target="_blank">{5}</a></div>' +
      '<div class="po_downmy_salary_div"><a href="{6}">{7}</a></div>' +
      '<a class="po_downmy_iwant" href="{9}" target="_blank">我要跳槽</a>' +
      '</div>';
    //{0}，职位链接    //{1}，职位名称    //{2}，职位名称    //{3}，公司链接    //{4}，公司名称    //{5}，公司名称    //{6}，职位链接    //{7}，职位薪水    //{8}，上报策略    //{9}，我要跳槽



    //下载--下载页和下载详情页
    this.downDetailTpl = '';
    this.downDetailItem = '';





  };

  Position.prototype = {
    show: function(conf) {
      var _conf = conf;
      var _this = this;
      _this.show_inner(_conf);
      /*$(window).load(function() {
        _this.show_inner(_conf);
      });*/
    },
    show_inner: function(conf) {
      this.sourceType = conf.sourceType;//blog，bbs, download，ask, space, hero, edu, csto .....
      this.tplType = conf.tplType;
      //模板类型，博客详情：blogDetail，博客专栏：blogSpec，论坛详情：bbsDetail，问答首页：askDetail，个人空间--我的空间：personalSpaceMy，个人空间--首页：personalSpaceHome，
      //英雄会--首页：heroHome，英雄会--答题专家组：heroExpert，英雄会--挑战题目详情页：heroFightDetail，英雄会--我的英雄会：heroMy，
      //在线培训--课程分类列表页：eduList，在线培训--课程详情页：eduDetail，.....
      this.searchType = conf.searchType;//页面类型，用于搜索函数，detail(详情页) / list(列表页)。
      this.searchKey = conf.searchKey;//搜索关键字，例如博客详情：博文ID，如果是博客专栏：分类字符串。
      this.username = conf.username;
      this.containerId = conf.containerId;

      this.$container = $("#" + this.containerId);
      this.prefix = window.location.protocol;

      this.load();
    },

    load: function() {
      var that = this;
      if (that.searchKey === "NO" && that.username === "") {
        return;
      }

      var _url = that.get_url(that.username, that.searchType, that.searchKey, that.sourceType);
      var _strategy = that.get_strategy(that.username, that.searchType);
      var containerTpl = that.get_containerTpl(that.tplType);
      var itemTpl = that.get_itemTpl(that.tplType);

      //that.username = that.getUserName();

      $.ajax({
        type: "get",
        url: _url,
        dataType: "jsonp",
        jsonp: "callback",
        async: false,
        success: function (obj) {
          var count = obj.hits.length;
          if (obj.hits && obj.hits.length > 0) {
            that.fillData(that.$container, obj.hits, containerTpl, itemTpl, that.prefix, _strategy);
          }
          if (count < 4 && that.username) {
            //以内容搜索职位，再次发送请求
          }
      },
      error: function(err) {
        var i = 0;
        //alert('err');
      }
      });
    },
    fillData: function(container, items, containerTpl, itemTpl, prefix, _strategy) {
      var homeUrl = prefix + "//job.csdn.net";
      var jobUrl = prefix + "//job.csdn.net/Job/Index?jobID=";//职位页面url，样例：http://job.csdn.net/Job/Index?jobID=80500，http://tmpjob.csdn.net/Job/Index?jobID=80500
      var companyUrl = prefix + "//pr.csdn.net/enterprise/ent_home?orgid=";//3，样例：http://pr.csdn.net/enterprise/ent_home?orgid=406854，http://lpr.csdn.net/enterprise/ent_home?orgid=406854

      var htmlItems = "";
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var obj = item.object;
        if (obj.id && obj.title && obj.org_id && obj.org_name) {
          var salaryText = "";
          if (obj.salary_max == 0 && obj.salary_min == 0) {
            salaryText = "面议";
          } else {
            var mins = obj.salary_min / 1000;
            var maxs = obj.salary_max / 1000;
            salaryText = mins + "-" + maxs + "K/月";
          }

          var htmlItem = itemTpl.replace(/\{0\}/, jobUrl + obj.id)
            .replace(/\{1\}/, obj.title)
            .replace(/\{2\}/, obj.title)
            .replace(/\{3\}/, companyUrl + obj.org_id)
            .replace(/\{4\}/, obj.org_name)
            .replace(/\{5\}/, obj.org_name)
            .replace(/\{6\}/, jobUrl + obj.id)
            .replace(/\{7\}/, salaryText)
            .replace(/\{8\}/, _strategy)
            .replace(/\{9\}/, jobUrl + obj.id);
          //{0}，职位链接  //{1}，职位名称  //{2}，职位名称  //{3}，公司链接  //{4}，公司名称  //{5}，公司名称  //{6}，职位链接  //{7}，职位薪水  //{8}，上报策略
          htmlItems += htmlItem;
        }
      }
      var jHtml = containerTpl.replace(/\{0\}/, "popu_72")
        .replace(/\{1\}/, homeUrl)
        .replace(/\{2\}/, htmlItems);
      //container.html(jHtml);
      var tdd = $(jHtml).appendTo(container);
      var tds = [];
      tds.push(tdd[0]);
      try {
        window['trackingAd']($(tds));
      } catch(ee) {};
      return true;
    },
    get_strategy: function(un, searcht) {
      var _st = "";
      if (un != "") {
        _st = "PersonalRecommend";
      } else if (searcht == "detail") {
        _st = "DetailRecommend";
      } else if (searcht == "list") {
        _st = "ListRecommend";
      } else {
        _st = "unknown";
      }

      return _st;
    },
    get_itemTpl: function(tplType) {
      var c = "";
      switch (tplType) {
        case "blogDetail":
          c = this.blogItem;
          break;
        case "blogSpec":
          c = this.blogSpecItem;
          break;
        case "bbsDetail":
          c = this.bbsItem;
          break;
        case "askDetail":
          c = this.askItem;
          break;
        case "personalSpaceMy":
          c = this.perSpaceMyItem;
          break;
        case "personalSpaceHome":
          c = this.perSpaceHomeItem;
          break;
        case "heroHome":
          c = this.heroHomeItem;
          break;
        case "heroExpert":
          c = this.heroExpertItem;
          break;
        case "heroFightDetail":
          c = this.heroFightDetailItem;
          break;
        case "heroMy":
          c = this.heroMyItem;
          break;
        case "eduList":
          c = this.eduListItem;
          break;
        case "eduDetail":
          c = this.eduDetailItem;
          break;
        case "search":
          c = this.searchItem;
          break;
        case "downMy":
          c = this.downMyItem;
          break;
        case "downDetail":
          c = this.downDetailItem;
        default:
          break;
      }
      return c;
    },
    get_containerTpl: function(tplType) {
      var c = "";
      switch (tplType) {
        case "blogDetail":
          c = this.blogTpl;
          break;
        case "blogSpec":
          c = this.blogSpecTpl;
          break;
        case "bbsDetail":
          c = this.bbsTpl;
          break;
        case "askDetail":
          c = this.askTpl;
          break;
        case "personalSpaceMy":
          c = this.perSpaceMyTpl;
          break;
        case "personalSpaceHome":
          c = this.perSpaceHomeTpl;
          break;
        case "heroHome":
          c = this.heroHomeTpl
          break;
        case "heroExpert":
          c = this.heroExpertTpl;
          break;
        case "heroFightDetail":
          c = this.heroFightDetailTpl;
          break;
        case "heroMy":
          c = this.heroMyTpl;
          break;
        case "eduList":
          c = this.eduListTpl;
          break;
        case "eduDetail":
          c = this.eduDetailTpl;
          break;
        case "search":
          c = this.searchTpl;
          break;
        case "downMy":
          c = this.downMyTpl;
          break;
        case "downDetail":
          c = this.downDetailTpl;
          break;
        default:
          break;
      }
      return c;
    },
    get_url: function(un, searcht, key, st) {
      var _st = st;
      var u = "http://internalapi.csdn.net/psearch/psearch/query?x-acl-token=kUOm7x6dCaKGFa8RxxLQ5Hm75ioK&index_name=test_b2d_job_141211&_client_=";
      //var u = "http://p.search.dm.csdn.net/v2/test_b2d_job_141211/csdn/_search?_client_=";
      if (un != "") {
        _st = "uc_proxy";
        u = u + "search_job_by_user";
        u = u + "&from=1&size=4";
        u = u + "&id=" + un;
      } else if (searcht == "detail") {
        u = u + "search_job_by_content";
        u = u + "&id=" + key;
        u = u + "&from=1&size=4";
      } else if (searcht == "list") {
        u = u + "search_job_by_content";
        u = u + "&content=" + key;
        u = u + "&from=1&size=4";
      }
      u = u + "&source_type=" + _st;
      u = u + "&fields=id,publish_time,title,org_name,org_id,salary_max,salary_min";
      return u;
    },
    getThisCss: function() {
      $("<link>")
        .attr({ rel: "stylesheet",
          type: "text/css",
          href: csdn.position.prefix + "//csdnimg.cn/jobreco/job_reco.css"
        })
        .appendTo("head");
    },
    getUserName: function() {
      return this.getCookie("UserName");
    },
    getCookie: function(objName) {
      var arrStr = document.cookie.split("; ");
      for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return decodeURI(temp[1]);
      }
    },
    evil: function() {
    }
  };

  csdn.position = new Position();
  window["csdn"] = csdn;
})(window);