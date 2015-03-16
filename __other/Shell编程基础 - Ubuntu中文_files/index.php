/* 所有皮肤的公共CSS

管理员注意！任何对Common.css的改变必须先在技术客栈讨论，谢谢。 */

/* for Main Page */
#interwiki-completelist {
    font-weight: bold;
}

/*

== 参考区 ==

*/

/* make the list of references look smaller */
ol.references {
   font-size: 100%;
}

.references-small { font-size: 90%;}

sup.reference { 
  white-space: nowrap;
}

/* VALIDATOR NOTICE: the following is correct, but the W3C validator doesn't accept it */
/* -moz-* is a vendor-specific extension (CSS 2.1 4.1.2.1) */
/* column-count is from the CSS3 module "CSS Multi-column Layout" */
/* Please ignore any validator errors caused by these two lines */
.references-2column {
  font-size: 90%;
  -moz-column-count:2;
  column-count:2;
}

.same-bg { background: none }

ol.references > li:target,
sup.reference:target,
cite:target {
  background-color: #DDEEFF;
}
/*

== 表格 ==

*/
/* wikitable/prettytable class for skinning normal tables */

table.wikitable,
table.prettytable {
  background: #f9f9f9;
  border: 1px #aaaaaa solid;
  border-collapse: collapse;
  margin-top: 1em; margin-bottom: 1em;
}

table.wikitable th, table.wikitable td,
table.prettytable th, table.prettytable td {
  border: 1px #aaaaaa solid;
  padding: 0.2em;
}

table.wikitable th,
table.prettytable th {
  background: #f2f2f2;
  text-align: center;
}

table.wikitable caption,
table.prettytable caption {
  margin-left: inherit;
  margin-right: inherit;
}

/*

== 提示 ==

*/
/* Style for "notices" */
.notice {
    text-align: justify;
    margin: 1em;
    padding: 0.2em;
}

#disambig {
    border-top: 3px double #cccccc;
    border-bottom: 3px double #cccccc;
}

#spoiler {
    border-top: 2px solid #ddd;
    border-bottom:2px solid #ddd;
}

/* Standard talk template style */

.Talk-Notice {
    border: 1px solid #C0C090;
    background-color: #F8EABA;
    margin-bottom: 3px;
    width: 80%;
    border-spacing: 3px;
    margin-left: auto;
    margin-right: auto;
}

.Talk-Notice:after {
  content: "The CSS for this template should be changed. See [[Wikipedia:Template Standardisation]].";
}

/* Make template background appear correctly on all browsers */
.Talk-Notice td {
    background: inherit;
}

/*

== 图片 ==

*/

div.thumb {
border-top: 1em solid #FFFFFF;
margin-top: 1em;
}

/*

== 未归类 ==

*/

/* Makes redirects appear in italics on [[Special:Allpages]] */
.allpagesredirect {
    font-style: italic;
}

/* Choose whether to have AD/BC dates or CE/BCE dates*/

/* First, the default : display both : See templates ADCE and BCEBC for how these are used*/
.Use_Default_Date_Convention { display: inline; }
.Use_AD_and_BC { display: none; }
.Use_BCE_and_CE { display: none; }

/* If you want to display AD and BC add the following to User:You/monobook.css page */
/*
.Use_Default_Date_Convention { display: none; }
.Use_AD_and_BC { display:inline; }
.Use_BCE_and_CE { display:none; }
*/

/*If you want to display CE and BCE add the following to User:You/monobook.css page */
/*
.Use_Default_Date_Convention { display: none; }
.Use_AD_and_BC { display:none; }
.Use_BCE_and_CE {display:inline; }
*/

/* Class for links with loudspeaker icon next to them */

.audiolink a{
    background: url("http://upload.wikimedia.org/wikipedia/commons/f/f7/Loudspeaker.png") center left no-repeat !important;
    padding-left: 16px !important;
    padding-right: 0 !important;
}

/* Icons for medialist templates [[Template:Listen]], [[Template:Multi-listen_start]], [[Template:Video]], [[Template:Multi-video_start]] */

div.listenlist {
    background: url("http://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Gnome-speakernotes.png/30px-Gnome-speakernotes.png");
    padding-left: 40px;
}

div.videolist {
    background: url("http://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Video.svg/40px-Video.svg.png");
    padding-left: 50px;
}

div.multivideolist {
    background: url("http://upload.wikimedia.org/wikipedia/en/thumb/7/7a/FilmRoll-small.png/40px-FilmRoll-small.png");
    padding-left: 50px;
}

/* Style rules for media list templates */

div.medialist {
    min-height: 50px;
    margin: 1em;
    background-position: top left;
    background-repeat: no-repeat;
}

div.medialist ul {
    list-style-type: none;
    list-style-image: none;
    margin: 0;
}

div.medialist ul li {
    padding-bottom: 0.5em;
}

div.medialist ul li li {
    font-size: 91%;
    padding-bottom: 0;
}

/*Add formatting to make sure that "external references" from [[Template:Ref]] do
  not get URL expansion, not even when printed. The mechanism up to MediaWiki 1.4 was
  that the HTML code contained a SPAN following the anchor A; this SPAN had the class
  "urlexpansion", which was not displayed on screen, but was shown when the medium was
  "print". The rules below ensure (a) that there is no extra padding to the right of
  the anchor (displayed as "[<number>]"), (b) that there is no "external link arrow" for
  the link, and (c) that this SPAN of class "urlexpansion" is never shown.
*/

.plainlinksneverexpand {
  background: none ! important;
  padding: 0 ! important;
}

.plainlinksneverexpand .urlexpansion {
  display: none ! important;
}

/* Make sure that ext links displayed within "plainlinksneverexpand" don't get
   the arrow...
*/
.plainlinksneverexpand a {
   background: none !important;
   padding: 0 !important;
}

/* With MediaWiki 1.5, the mechanism has changed: instead of a SPAN of class "urlexpansion"
   following the anchor A, the anchor itself now has class "external autonumber" and the
   expansion is inserted when printing (see the common printing style sheet at
   http://en.wikipedia.org/skins-1.5/common/commonPrint.css) using the ":after" pseudo-
   element of CSS. We have to switch this off for links due to Template:Ref!
*/
.plainlinksneverexpand a.external.text:after {
  display: none !important;
}
.plainlinksneverexpand a.external.autonumber:after {
  display: none !important;
}

/* Infobox template style */

.infobox {
   border: 1px solid #aaaaaa;
   background-color: #f9f9f9;
   color: black;
   margin-bottom: 0.5em;
   margin-left: 1em;
   padding: 0.2em;
   float: right;
   clear: right;
}
.infobox td,
.infobox th {
   vertical-align: top;
}
.infobox caption {
   font-size: larger;
   margin-left: inherit;
}
.infobox.bordered {
   border-collapse: collapse;
}
.infobox.bordered td,
.infobox.bordered th {
   border: 1px solid #aaaaaa;
}
.infobox.bordered .borderless td,
.infobox.bordered .borderless th {
   border: 0;
}

.infobox.sisterproject {
   width: 20em;
   font-size: 90%;
}
 
/* styles for bordered infobox with merged rows */
.infobox.bordered .mergedtoprow td,
.infobox.bordered .mergedtoprow th {
   border: 0;
   border-top: 1px solid #aaaaaa;
   border-right: 1px solid #aaaaaa;
}
 
.infobox.bordered .mergedrow td,
.infobox.bordered .mergedrow th {
   border: 0;
   border-right: 1px solid #aaaaaa;
}
 
 
/* styles for geography infoboxes, e.g. countries, country subdivisions, cities, etc. */
 
.infobox.geography {
   text-align: left;
   border-collapse: collapse;
   line-height: 1.2em; 
   font-size: 90%;
}
 
.infobox.geography  td,
.infobox.geography  th {
   border-top: solid 1px #aaaaaa;
   padding: 0.4em 0.6em 0.4em 0.6em;
}
.infobox.geography .mergedtoprow td,
.infobox.geography .mergedtoprow th {
   border-top: solid 1px #aaaaaa;
   padding: 0.4em 0.6em 0.2em 0.6em;
}
 
.infobox.geography .mergedrow td,
.infobox.geography .mergedrow th {
      border: 0;
      padding: 0 0.6em 0.2em 0.6em;
}
 
.infobox.geography .mergedbottomrow td,
.infobox.geography .mergedbottomrow th {
   border-top: 0;
   border-bottom: solid 1px #aaaaaa;
   padding: 0 0.6em 0.4em 0.6em;
}
 
.infobox.geography .maptable td,
.infobox.geography .maptable th {
      border: 0;
      padding: 0;
}

/* Support for Template:IPA, Template:Unicode and Template:Polytonic. The inherit declaration resets the font for all browsers except MSIE6.  The empty comment must remain. */
.IPA {
        font-family: "Segoe UI", "Chrysanthi Unicode", "Doulos SIL", "Gentium", "GentiumAlt", "Code2000", "TITUS Cyberbit Basic", "DejaVu Sans", "Bitstream Cyberbit", "Arial Unicode MS", "Lucida Sans Unicode", "Hiragino Kaku Gothic Pro", "Matrix Unicode";
}
.Unicode {
        font-family: "Segoe UI", "TITUS Cyberbit Basic", "Code2000", "Doulos SIL", "Chrysanthi Unicode", "Bitstream Cyberbit", "Bitstream CyberBase", "Thryomanes", "Gentium", "GentiumAlt", "Visual Geez Unicode", "Lucida Grande", "Arial Unicode MS", "Microsoft Sans Serif", "Lucida Sans Unicode";
}
.latinx {
        font-family: "TITUS Cyberbit Basic", "Code2000", "Microsoft Sans Serif";
}
.polytonic, .interwiki-el a {
        font-family: "Athena", "Gentium", "Palatino Linotype", "Segoe UI", "Arial Unicode MS", "Lucida Sans Unicode", "Lucida Grande", "Code2000";
}
.mufi {
        font-family: "Alphabetum", "Cardo", "LeedsUni", "Junicode", "TITUS Cyberbit Basic", "ALPHA-Demo";
}
.interwiki-ja a {
        font-family: "Meiryo", "MS PMincho", "MS Mincho", "MS PGothic", "MS Gothic", "Arial Unicode MS";
}
.interwiki-ko a {
        font-family: "Malgun Gothic", "Gulim", "Dotum", "Arial Unicode MS";
}
.interwiki-ru a, .interwiki-uk a, .interwiki-be a, .interwiki-bg a,
.interwiki-sr a, .interwiki-mk a, .interwiki-os a, .interwiki-tg a,
.interwiki-mo a,.interwiki-kk a, .interwiki-ky a, .interwiki-tt a,
.interwiki-ba a, .interwiki-cv a, .interwiki-mn a, .interwiki-xal a,
.interwiki-udm a,.interwiki-ab a, .interwiki-av a, .interwiki-ce a {
        /* 西里爾字母 */
        font-family: "Times CY", "Times New Roman", Times, serif;
}
.interwiki-ar a, .interwiki-fa a, .interwiki-ur a, .interwiki-ug a {
        /* 阿拉伯字母 */
        font-family: "Arial Unicode MS", "Microsoft Sans Serif", "Times New Roman", Times, serif;
        direction: rtl;
}
.interwiki-he a, .interwiki-yi a {
        /* 希伯來字母 */
        font-family: Cardo, "Arial Unicode MS", Code2000, David, "Times New Roman", Times, serif;
        direction: rtl;
}
.interwiki-af a, .interwiki-als a, .interwiki-an a, .interwiki-ang a,
.interwiki-ast a, .interwiki-az a, .interwiki-ba a, .interwiki-bat-smg a,
.interwiki-bm a, .interwiki-br a, .interwiki-bs a, .interwiki-ca a,
.interwiki-ceb a, .interwiki-co a, .interwiki-cs a, .interwiki-csb a,
.interwiki-cy a, .interwiki-da a, .interwiki-de a, .interwiki-en a,
.interwiki-eo a, .interwiki-es a, .interwiki-et a, .interwiki-eu a,
.interwiki-ff a, .interwiki-fi a, .interwiki-fiu-vro a, .interwiki-fo a,
.interwiki-fr a, .interwiki-frp a, .interwiki-fur a, .interwiki-fy a,
.interwiki-ga a, .interwiki-gd a, .interwiki-gl a, .interwiki-gv a,
.interwiki-ha a, .interwiki-hr a, .interwiki-ht a, .interwiki-hu a,
.interwiki-ia a, .interwiki-id a, .interwiki-ie a, .interwiki-ilo a,
.interwiki-io a, .interwiki-is a, .interwiki-it a, .interwiki-jbo a,
.interwiki-jv a, .interwiki-kg a, .interwiki-ksh a, .interwiki-ku a,
.interwiki-kw a, .interwiki-la a, .interwiki-lad a, .interwiki-lb a,
.interwiki-li a, .interwiki-lij a, .interwiki-lmo a, .interwiki-ln a,
.interwiki-lt a, .interwiki-lv a, .interwiki-map-bms a, .interwiki-mi a,
.interwiki-ms a, .interwiki-na a, .interwiki-nap a, .interwiki-nds a,
.interwiki-nl a, .interwiki-nn a, .interwiki-no a, .interwiki-nrm a,
.interwiki-oc a, .interwiki-om a, .interwiki-os a, .interwiki-pam a,
.interwiki-pl a, .interwiki-pms a, .interwiki-pt a, .interwiki-rm a,
.interwiki-ro a, .interwiki-sc a, .interwiki-scn a, .interwiki-sco a,
.interwiki-se a, .interwiki-simple a, .interwiki-sk a, .interwiki-sl a,
.interwiki-so a, .interwiki-sq a, .interwiki-su a, .interwiki-sv a,
.interwiki-sw a, .interwiki-tet a, .interwiki-tpi a, .interwiki-tk a,
.interwiki-tl a, .interwiki-tw a, .interwiki-tr a, .interwiki-uz a,
.interwiki-vec a, .interwiki-vi a, .interwiki-wa a, .interwiki-war a,
.interwiki-wo a, .interwiki-yo a, .interwiki-cdo a, .interwiki-zh-min-nan a {
        font-family: "Times New Roman", Times, serif;
}

#wpSave {
  font-weight: bold;
}

/* hiddenStructure from Monobook - allows selective hiding of markup in templates */
.hiddenStructure {
   display: none;
   speak: none;
}

/* Removes underlines from links */
.nounderlines a {
  text-decoration: none;
}

/* CSS for testing a new Main Page design, see [[Wikipedia:WikiProject Usability/Main Page]] */

#EnWpMainPage { width: 100%; margin-top: 1em; }
#EnWpMainPage h2 { font-size: 130%; font-weight: bold; margin: 0; padding: 0; border: 0; }
#EnWpMpMargin { margin-right: 13.8em; }
#EnWpMpCol1 { float: left; clear: left; width: 50%; }
#EnWpMpCol2 { width: 49.9%; float: left; }
#EnWpMpBrowse { background: #f8fcff url(http://upload.wikimedia.org/wikipedia/en/9/9f/MP-three-books.png) no-repeat 180% 9%; border: 1px solid #c7c7c7; }
#EnWpMpBrowseCats li { font-size: 85%; margin-left: 1em; line-height: 1.5; }
#EnWpMpBrowseCats h3 { font-size: 120%; margin: .2em 0 .1em -.8em; padding: 0; font-weight: normal; }
#EnWpMpBrowseCats h3 a { font-weight: bold; }
#EnWpMpBook { background-image: url(http://upload.wikimedia.org/wikipedia/en/7/7e/MP-open-book.png); }
#EnWpMpFeaturedPic { text-align: center; margin: 0 0 .5em; font-size: 85%; font-weight: bold; }
#EnWpMpFeaturedPic h2 { font-size: 145%; text-align: left; }
.EnWpMpBrowseRight { float: right; width: 12.7em; }
.EnWpMpBrowseBottom { margin: 1em 0; }
.EnWpMpBrowseBottom #EnWpMpBrowseCats li, .EnWpMpBrowseBottom #EnWpMpUsefulLinks, .EnWpMpBrowseBottom #EnWpMpFeaturedPic { float: left; width: 24%; margin: 0; line-height: normal; }
.EnWpMpBrowseBottom #EnWpMpBrowseCats h3 { margin-left: 0; }
#EnWpMpUsefulLinks { clear: left; }
#EnWpMpSearch { background: url(http://upload.wikimedia.org/wikipedia/en/a/ae/MP-magnifying-glass.png) no-repeat top right; }
#EnWpMpSearch input { vertical-align: middle; }
#EnWpMpSearchInner { float: right; width: 20em; text-align: center; }
#bodySearchMP { margin: 0; padding: 0; }
#bodySearchMP .bodySearchWrap { float: right; width: 17.5em; text-align: left; padding: .8em 0; }
#bodySearchMP label { display: block; font-size: 95%; font-weight: bold; margin-bottom: -.2em; }
#bodySearchMP .bodySearchBtnGo { font-weight: bold; padding-left: .3em; padding-right: .3em; margin-left: .5em; }
.EnWpMpContentBox { border: 1px solid; margin-bottom: .9em; }
#EnWpMpCol2 .EnWpMpContentBox { margin-left: .9em; }
.EnWpMpImage { float: right; margin: 0 0 .2em .2em; }
.EnWpMpImage img { position: relative; z-index: 3; }
#EnWpMpSisterProjects { float: left; width: 49%; }
.EnWpMpSisterProject { float: left; width: 17em; margin: 0; height: 5.5em; margin: 0; }
.EnWpMpSisterImg { float: left; width: 40px; height: 100%; }
#EnWpMpOtherLangs { margin-left: 50%; }
#EnWpMainPageNoCSS { display: none; }
#EnWpMpBook2 { background-image: url(http://upload.wikimedia.org/wikipedia/commons/8/8e/MP-open-book2.png); }
#EnWpMpSearch2 { background: url(http://upload.wikimedia.org/wikipedia/en/3/3a/MP-magnifying-glass2.png) no-repeat top right; }

/* Custom link colors for use in [[MediaWiki:Edittools]] */
.charboxblack a:link, .charboxblack a:hover, .charboxblack a:visited, .charboxblack a:active { color: black; }
.charboxsilver a:link, .charboxsilver a:hover, .charboxsilver a:visited, .charboxsilver a:active { color: silver; }
.charboxgray a:link, .charboxgray a:hover, .charboxgray a:visited, .charboxgray a:active { color: gray; }
.charboxwhite a:link, .charboxwhite a:hover, .charboxwhite a:visited, .charboxwhite a:active { color: white; }
.charboxmaroon a:link, .charboxmaroon a:hover, .charboxmaroon a:visited, .charboxmaroon a:active { color: maroon; }
.charboxred a:link, .charboxred a:hover, .charboxred a:visited, .charboxred a:active { color: red; }
.charboxpurple a:link, .charboxpurple a:hover, .charboxpurple a:visited, .charboxpurple a:active { color: purple; }
.charboxfuchsia a:link, .charboxfuchsia a:hover, .charboxfuchsia a:visited, .charboxfuchsia a:active { color: fuchsia; }

.charboxgreen a:link, .charboxgreen a:hover, .charboxgreen a:visited, .charboxgreen a:active { color: green; }
.charboxlime a:link, .charboxlime a:hover, .charboxlime a:visited, .charboxlime a:active { color: lime; }
.charboxolive a:link, .charboxolive a:hover, .charboxolive a:visited, .charboxolive a:active { color: olive; }
.charboxyellow a:link, .charboxyellow a:hover, .charboxyellow a:visited, .charboxyellow a:active { color: yellow; }

.charboxnavy a:link, .charboxnavy a:hover, .charboxnavy a:visited, .charboxnavy a:active { color: navy; }
.charboxblue a:link, .charboxblue a:hover, .charboxblue a:visited, .charboxblue a:active { color: blue; }
.charboxteal a:link, .charboxteal a:hover, .charboxteal a:visited, .charboxteal a:active { color: teal; }
.charboxaqua a:link, .charboxaqua a:hover, .charboxaqua a:visited, .charboxaqua a:active { color: aqua; }

/* custom edits */
.allpagesredirect a:link { color:#0066ff;}

 /* 维基共享资源图像巡视格式 */

  /* 链接 */
  .tickerDiffLink { } /* diff links in ticker */
  .tickerMiscLink { } /* misc links in ticker */

  /* 去除引点 */
  .tickerList ul,    .tickerList ul li    { list-style: none; text-indent:-2em; margin-left:2em;   text-align:left; }
  .tickerList ul ul, .tickerList ul ul li { list-style: none; text-indent:0;    margin-left:1.5em; text-align:left; }

  /* 各种记录格式 */
  .tickerEntry_deleted     { }  /* 图像删除记录 */
  .tickerEntry_replaced    { }  /* 图像替换记录 */
  .tickerEntry_tagged      { }  /* 加上或删去问题模板的图像记录 */
  .tickerEntry_redir       { }  /* 图像重新定向记录 */
  .tickerEntry_recat       { }  /* 图像重新分类记录 */
  .tickerEntry_notify      { }  /* 全界的更改记录 */
  .tickerEntry_changed     { }  /* 一般的更改记录 */

  /* 各种行为格式 */
  .tickerAction_deleted:before     { content:"(×)"; color: #FF0000; font-family:monospace; font-weight:bold; font-size:100%; background: pink; }
  .tickerAction_replaced:before    { content:" REPL "; color: #CC88FF; font-family:monospace; font-weight:bold; font-size:100%; }
  .tickerAction_addedBad:before    { content:" +VfD "; color: #FF8800; font-family:monospace; font-weight:bold; font-size:100%; }
  .tickerAction_removedBad:before  { content:" -VfD "; color: #00BB00; font-family:monospace; font-weight:bold; font-size:100%; }
  .tickerAction_addedGood:before   { content:" +OK  "; color: #00BB00; font-family:monospace; font-weight:bold; font-size:100%; }
  .tickerAction_removedGood:before { content:" -OK  "; color: #FF8800; font-family:monospace; font-weight:bold; font-size:100%; }

  /* 巡视功能使用列表 */
  .tickerUsage  { font-size:80%; }

  /* 每次记录应用用于多数图像的模板 */
  .tickerTemplateEntry    { font-weight: bold; }

  /* 每次记录应用次要记录---应用模板的某图像 */
  .tickerSubEntry         { }

  /* 次要记录格式 */
  .tickerMinorEntry  { color:#666; }     /* minor entry */
  .tickerMinorEntry a,
  .tickerMinorEntry a:link,
  .tickerMinorEntry a:visited { color:#669; }
  #bodyContent .tickerMinorEntry a.extiw,
  #bodyContent .tickerMinorEntry a.extiw:link,
  #bodyContent .tickerMinorEntry a.extiw:visited { color:#669; }

/*

== 未归类 ==

*/

/* Class styles */

/* .toccolours added here because version in
   monobook/main.css wasn't being used by the print style */
.toccolours {
   border:1px solid #aaaaaa;
   background-color:#f9f9f9;
   padding:5px;
   font-size: 95%;
}

/* Remove padding from external links displayed without icon */
#bodyContent .plainlinks a {padding: 0 !important}

#p-nav h5 {
   display: none;
}

.portlet a {
   text-decoration: none;
}

.portlet a:hover {
   text-decoration: underline;
}

#p-nav .pBody {
   padding-right: 0;
}

#p-nav a {
   display: block;
   width: 100%;
}

/* Special characters list below edit window works better without underlining */
#editpage-specialchars a { text-decoration: none; }
#editpage-specialchars a:hover { text-decoration: underline; }

/* If you don't want to see special characters list at all,
   put the following line in your User:You/monobook.css file
  (and remove the slash-asterisk comments) */
/* #editpage-specialchars { display: none; } */

/* Makes the background of a framed image white instead of gray. */
/* Only visible with transparent images. */
/* See #Framed_image_background_color */
div.thumb div a img {
    background-color:#f9f9f9;
}

/* Put a checker background at the image description page only visible if the image has transparent background */
 
#file img {background: url("http://upload.wikimedia.org/wikipedia/commons/5/5d/Checker-16x16.png") repeat;}

/* To position the spoken article link at the top of page
Commented out while sitenotice present */

#spoken {
  position: absolute;
  float: right;
  text-align: right;
  font-size: 90%;
  right: 0;
  z-index: 1;
  background: none;
  border-bottom-style: none;
  top: -2.2em;
  display: block !important;
}

/* try adding here, this had no effect in [[MediaWiki:Common.css]] */
.plainlinksneverexpand a.external.text:after {
 display: none !important
}

/*

== 折叠效果 ==

*/
/* Standard Navigationsleisten.*/

div.Boxmerge,
div.NavFrame {
        margin: 0px;
        padding: 2px;
        border: 1px solid #aaaaaa;
        border-collapse: collapse;
        font-size: 95%;
}
div.Boxmerge div.NavFrame {
        border-style: none;
        border-style: hidden;
}
div.NavFrame + div.NavFrame,
div.NavFrame + table.collapsible,
table.collapsible + div.NavFrame,
table.collapsible + table.collapsible {
        border-top-style: none;
        border-top-style: hidden;
}
div.NavPic {
        background-color: #ffffff;
        margin: 0px;
        padding: 2px;
        float: left;
}
div.NavFrame div.NavHead {
        height: 1.6em;
        font-weight: bold;
        font-size: 100%;
        text-align: center;
        background-color: #efefef;
        cursor:pointer;
}
div.NavFrame p {
        font-size: 100%;
}
div.NavFrame div.NavContent {
        font-size: 100%;
}
div.NavFrame div.NavContent p {
        font-size: 100%;
}
div.NavEnd {
        margin: 0px;
        padding: 0px;
        line-height: 1px;
        clear: both;
}
span.NavToggle {
        float: right;
        display: none; /*保证在禁用JS状态下不显示提示*/
        text-align: right;
        font-weight: normal;
        font-size: smaller;
}

/*

== 条目信息框 ==

条目信息框（ambox）模板风格 */

table.ambox {
  width: 80%; 
  margin: 0 auto; 
  border-collapse: collapse; 
  background: #fbfbfb; 
  border: 1px solid #aaa; 
  border-left: 10px solid #1e90ff;       /* 定义“notice”的蓝条 */
}
table.ambox th, table.ambox td {      /* 信息框主体单元 */
  padding: 0.25em 0.5em;              /* 0.5em 左/右 */
}
table.ambox td.ambox-image {          /* 左侧图像单元 */
  width: 52px; 
  padding: 2px 0px 2px 0.5em;         /* 0.5em 左，0px 右 */
  text-align: center; 
}
table.ambox td.ambox-imageright {     /* 右侧图像单元 */
  width: 52px; 
  padding: 2px 4px 2px 0px;           /* 0px 左，4px 右 */
  text-align: center; 
}
table.ambox-notice {
  border-left: 10px solid #1e90ff;       /* 蓝条 */
/* border-right: 10px solid #1e90ff; */  /* 如果你想显示两条蓝条的话XD */
}
table.ambox-serious {
  border-left: 10px solid #b22222;       /* 红条 */
}
table.ambox-content {
  border-left: 10px solid #f28500;       /* 橙条 */
}
table.ambox-style {
  border-left: 10px solid #f4c430;       /* 黄条 */
}
table.ambox-merge {
  border-left: 10px solid #9932cc;       /* 紫条 */
}
table.ambox-growth {
  border-left: 10px solid #228b22;       /* 绿条 */
}
table.ambox-protection {
  border-left: 10px solid #bba;          /* 灰条 */
}
table.ambox-talk {
  border-left: 10px solid #18e7f8;       /* 靛条 */
}
table.ambox.ambox-mini {                 /* 小型的浮动信息框 */
    float: right;
    clear: right;
    margin: 0 0 0 1em;
    width: 25%;
}

/*

==地理坐标==

To display coordinates using the notation in the source code, write this in your User:Username/monobook.css:
   .geo-default { display: inline } .geo-nondefault { display: none } 
   .geo-dec { display: inline } .geo-dms { display: inline }
 
To display coordinates using decimal notation, write this in your User:Username/monobook.css:
   .geo-default { display: inline } .geo-nondefault { display: inline } 
   .geo-dec { display: inline } .geo-dms { display: none }
 
To display coordinates using DMS notation, write this in your User:Username/monobook.css:
   .geo-default { display: inline } .geo-nondefault { display: inline } 
   .geo-dec { display: none }   .geo-dms { display: inline }
 
To display coordinates in both decimal and DMS notation, write this in your User:Username/monobook.css:
   .geo-default { display: inline } .geo-nondefault { display: inline } 
   .geo-dec { display: inline }   .geo-dms { display: inline }
   .geo-multi-punct { display: inline }
 
See [[Template:Coor link]] for how these are used.
 
Note that the classes "geo", "longitude", and "latitude" are not just styles but also used by the [[Geo microformat]], so the names should not be changed.
 
*/
 
.geo-default { display: inline; }
.geo-nondefault { display: none; }
.geo-dms { display: inline; }
.geo-dec { display: inline; }
.geo-multi-punct { display: none; }
 
.longitude .latitude {
    white-space: nowrap;
}
 
/* This is used for the Geo microformat, but no style is needed for now other than .geo-dec. */
.geo { }
 
/***** end Geo-related */

/*

== 未归类 ==

*/
/* Do not expand kvaleberg.com-URLs for printing */
#content span.coordinates a.external.text:after, #content span.coordinates a.external.autonumber:after {
     content: "";
}

/* Formatierung betrifft Vorlagen: Geokoordinate, Koordinate2 & Koordinate3 */
#coordinates {
  position:absolute; z-index:1; border:none; background:none; right:12px; top:1.3em; float:right; margin:0.0em;
  padding:0.0em; line-height:1.5em; text-align:right; text-indent:0; font-size:85%; text-transform:none; white-space:normal;
}

/* kleines Globus-Symbol neben der Geookordinate anzeigen */
#coordinates a[href ^="http://"] {
    background: url(http://upload.wikimedia.org/wikipedia/de/d/d4/Gnome-globe.png) center right no-repeat; padding-right: 18px !important;
}

/* custom edits */
/* 分类框高度 */
#catlinks {
	border: 1px solid #aaa;
	background-color: #f9f9f9;
	padding: 5px;
	margin-top: 1em;
	clear: both;
}

/*
== navigation boxes ==
*/
/* default skin for navigation boxes */

table.navbox {
   background-color: #f9f9f9;
   border: 1px solid #aaaaaa;
   clear: both;
   font-size: 90%;
   margin: auto;
   padding: 2px;
   text-align: center;
   width: 100%;
}
table.navbox + table.navbox {
  margin-top:-1px;        /* single pixel border between adjacent navboxes (doesn't work for IE6, but that's okay) */
}
.navbox-title, .navbox-abovebelow, table.navbox th {
  text-align:center;      /* title and above/below styles */
  padding-left:1em;
  padding-right:1em;
}
.navbox-group {           /* group style */
  white-space:nowrap;
  text-align:right;
  font-weight:bold;
  padding-left:1em;
  padding-right:1em;
}
.navbox, .navbox-subgroup {
  background:#fdfdfd;     /* Background color */
}
.navbox-title, table.navbox th {
  background:#ccccff;     /* Level 1 color */
}
.navbox-abovebelow, .navbox-group, .navbox-subgroup .navbox-title {
  background:#ddddff;     /* Level 2 color */
}
.navbox-subgroup .navbox-group, .navbox-subgroup .navbox-abovebelow {
  background:#e6e6ff;     /* Level 3 color */
}
.navbox-even {
  background:#f7f7f7;     /* Even row striping */
}
.navbox-odd {
  background:transparent; /* Odd row striping */
}
table.navbox tr:not(:first-child) th {
    background-color: #ddf;
}


#toolbar { border: 1px solid #aaaaaa; }
/*

== headline edit ==

*/

.editsection {
	font-weight: normal !important;
	margin-left: 1em;
}

/*修正IE的渲染bug*/
.noedit {
	padding-top: 1px;
}

.noedit .editsection
{
	display: none;
}

/* 
== for some templates ==

Messagebox templates
*/
.messagebox {
   border: 1px solid #aaa;
   background-color: #f9f9f9;
   width: 80%;
   margin: 0 auto 1em auto;
   padding: .2em;
}
.messagebox.merge {
   border: 1px solid #c0b8cc;
   background-color: #f0e5ff;
   text-align: center;
}
.messagebox.cleanup {
   border: 1px solid #9f9fff;
   background-color: #efefff;
   text-align: center;
}
.messagebox.standard-talk {
   border: 1px solid #c0c090;
   background-color: #f8eaba;
}
.messagebox.nested-talk {
   border: 1px solid #c0c090;
   background-color: #f8eaba;
   width: 100%;
   margin: 2px 4px 2px 4px;
}
.messagebox.small {
   width: 238px;
   font-size: 85%;
   float: right;
   clear: both;
   margin: 0 0 1em 1em;
   line-height: 1.25em; 
}
.messagebox.small-talk {
  width: 238px;
  font-size: 85%;
  float: right;
  clear: both;
  margin: 0 0 1em 1em;
  line-height: 1.25em; 
  background: #F8EABA;
}
/* For template documentation */
.template-documentation {
    clear: both;
    margin: 1em 0 0 0;
    border: 1px solid #aaa; 
    background-color: #ecfcf4; 
    padding: 5px;
}

/*
== external link ==

 Change the external link icon to an Adobe icon for all PDF files 
 (in browsers that support these CSS selectors, like Mozilla and Opera)

 */
#bodyContent a[href$=".pdf"].external, 
#bodyContent a[href*=".pdf?"].external, 
#bodyContent a[href*=".pdf#"].external,
#bodyContent a[href$=".PDF"].external, 
#bodyContent a[href*=".PDF?"].external, 
#bodyContent a[href*=".PDF#"].external {
    background: url(http://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Icons-mini-file_acrobat.gif/15px-Icons-mini-file_acrobat.gif) center right no-repeat;
    padding-right: 16px;
}
 
/* Change the external link icon to an Adobe icon anywhere the PDFlink class */
/* is used (notably Template:PDFlink). This works in IE, unlike the above. */
span.PDFlink a {
    background: url(http://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Icons-mini-file_acrobat.gif/15px-Icons-mini-file_acrobat.gif) center right no-repeat !important;
    padding-right: 17px !important;
}
 
span.geolink a {
    background: url(http://upload.wikimedia.org/wikipedia/en/a/a7/Monobook-globe.png) center right no-repeat !important;
    padding-right: 11px !important;
}

/*
== ToolTips ==
*/
.TipTrackButton_tip, .TipMouseButton_tip, .TipClickButton_tip, .TipTrack_tip, .TipMouse_tip, .TipClick_tip {
    border: 1px solid #8888aa;
    background: #f7f8ff;
    padding: 0.5em;
}

/*
== other ==
*/
span.lanLabel {
    color: #777777;
    padding-left: 0.5em;
}

tt span.minor {
    margin: 0 -2px 0 -3px;
    font-size: 12px;
}
tt span.newpage {
    margin: 0 1px 0 -6px;
    font-size: 12px;
}
tt span.bot {
    margin: 0 -6px 0 1px;
    font-size: 12px;
}
/*tt span.unpatrolled*/

/* 用于封禁类模板，如Template:Uw-block1 */
div.user-block {
    padding: 5px;
    border: 1px solid #A9A9A9;
    background-color: #FFEFD5;
}

/* For linked citation numbers and document IDs, where the number need not be shown on a screen or a handheld, but should be included in the printed version */
 
@media screen, handheld, projection {
    cite *.printonly {
        display: none;
    }
}
/* With MediaWiki 1.5, the mechanism has changed: instead of a SPAN of class "urlexpansion"
   following the anchor A, the anchor itself now has class "external autonumber" and the
   expansion is inserted when printing (see the common printing style sheet at
   http://en.wikipedia.org/skins-1.5/common/commonPrint.css) using the ":after" pseudo-
   element of CSS. We have to switch this off for links due to Template:Ref!
*/
.plainlinksneverexpand a.external.text:after {
    display: none !important;
}
.plainlinksneverexpand a.external.autonumber:after {
    display: none !important;
}
/* With MediaWiki 1.5, the mechanism has changed: instead of a SPAN of class "urlexpansion"
   following the anchor A, the anchor itself now has class "external autonumber" and the
   expansion is inserted when printing (see the common printing style sheet at
   http://en.wikipedia.org/skins-1.5/common/commonPrint.css) using the ":after" pseudo-
   element of CSS. We have to switch this off for links due to Template:Ref!
*/
.plainlinksneverexpand a.external.text:after {
    display: none !important;
}
.plainlinksneverexpand a.external.autonumber:after {
    display: none !important;
}
 
/* Messagebox templates */
.messagebox {
    border: 1px solid #aaa;
    background-color: #f9f9f9;
    width: 80%;
    margin: 0 auto 1em auto;
    padding: .2em;
}
.messagebox.merge {
    border: 1px solid #c0b8cc;
    background-color: #f0e5ff;
    text-align: center;
}
.messagebox.cleanup {
    border: 1px solid #9f9fff;
    background-color: #efefff;
    text-align: center;
}
.messagebox.standard-talk {
    border: 1px solid #c0c090;
    background-color: #f8eaba;
    margin: 4px auto;
}
.messagebox.nested-talk {
    border: 1px solid #c0c090;
    background-color: #f8eaba;
    width: 100%;
    margin: 2px 0 0 0;
    padding: 2px;
}
.messagebox.small {
    width: 238px;
    font-size: 85%;
    float: right;
    clear: both;
    margin: 0 0 1em 1em;
    line-height: 1.25em; 
}
.messagebox.small-talk {
    width: 238px;
    font-size: 85%;
    float: right;
    clear: both;
    margin: 0 0 1em 1em;
    line-height: 1.25em; 
    background: #F8EABA;
}
 
 
/* Cell sizes for tmbox/imbox/cmbox/ombox message boxes */
th.mbox-text, td.mbox-text {     /* The message body cell(s) */
    border: none; 
    padding: 0.25em 0.9em;       /* 0.9em left/right */
    width: 100%;
}
td.mbox-image {                  /* The left image cell */
    border: none; 
    padding: 2px 0 2px 0.9em;    /* 0.9em left, 0px right */
    text-align: center; 
}
td.mbox-imageright {             /* The right image cell */
    border: none;
    padding: 2px 0.9em 2px 0;    /* 0px left, 0.9em right */
    text-align: center; 
}
 
/* Article message box styles */
table.ambox {            /* 10% = Will not overlap with other elements */
    margin: -1px 10% 0px;    /* -1px = Single border between stacked boxes in all browsers */
    border: 1px solid #aaa; 
    border-left: 10px solid #1e90ff;    /* Default "notice" blue */
    background: #fbfbfb; 
}
.ambox th.mbox-text, 
.ambox td.mbox-text {            /* The message body cell(s) */
    border: none; 
    padding: 0.25em 0.5em;       /* 0.5em left/right */
    width: 100%;                 /* Make all amboxes the same width regardless of text length */
}
.ambox td.mbox-image {           /* The left image cell */
    border: none; 
    padding: 2px 0 2px 0.5em;    /* 0.5em left, 0px right */
    text-align: center; 
}
.ambox td.mbox-imageright {      /* The right image cell */
    border: none; 
    padding: 2px 0.5em 2px 0;    /* 0px left, 0.5em right */
    text-align: center; 
}
 
table.ambox-notice {
    border-left: 10px solid #1e90ff;    /* Blue */
}
table.ambox-speedy {
    border-left: 10px solid #b22222;    /* Red */
    background: #fee;                   /* Pink */
}
table.ambox-serious,
table.ambox-delete {    /* "serious" is deprecated, use "delete" instead. */
    border-left: 10px solid #b22222;    /* Red */
}
table.ambox-content {
    border-left: 10px solid #f28500;    /* Orange */
}
table.ambox-style {
    border-left: 10px solid #f4c430;    /* Yellow */
}
table.ambox-merge,
table.ambox-move {    /* "merge" is deprecated, use "move" instead. */
    border-left: 10px solid #9932cc;    /* Purple */
}
table.ambox-protection {
    border-left: 10px solid #bba;       /* Gray-gold */
}
 
/* Image message box styles */
table.imbox {
    margin: 4px 10%; 
    border-collapse: collapse; 
    border: 3px solid #1e90ff;    /* Default "notice" blue */
    background: #fbfbfb;
}
.imbox .mbox-text .imbox {    /* For imboxes inside imbox-text cells. */
    margin: 0 -0.5em;    /* 0.9 - 0.5 = 0.4em left/right. */
}
.mbox-inside .imbox {    /* For imboxes inside other templates. */
    margin: 4px;
}
 
table.imbox-notice {
    border: 3px solid #1e90ff;    /* Blue */
}
table.imbox-speedy {
    border: 3px solid #b22222;    /* Red */
    background: #fee;             /* Pink */
}
table.imbox-delete {
    border: 3px solid #b22222;    /* Red */
}
table.imbox-content {
    border: 3px solid #f28500;    /* Orange */
}
table.imbox-style {
    border: 3px solid #f4c430;    /* Yellow */
}
table.imbox-move {
    border: 3px solid #9932cc;    /* Purple */
}
table.imbox-protection {
    border: 3px solid #bba;       /* Gray-gold */
}
table.imbox-license {
    border: 3px solid #88a;       /* Dark gray */
    background: #f7f8ff;          /* Light gray */
}
table.imbox-featured {
    border: 3px solid #cba135;    /* Brown-gold */
}
 
/* Category message box styles */
table.cmbox {
    margin: 3px 10%;
    border-collapse: collapse;
    border: 1px solid #aaa; 
    background: #DFE8FF;           /* Default "notice" blue */
}
 
table.cmbox-notice {
    background: #DFE8FF;    /* Blue */
}
table.cmbox-speedy {
    margin-top: 4px;
    margin-bottom: 4px;
    border: 4px solid #b22222;    /* Red */
    background: #FFDBDB;          /* Pink */
}
table.cmbox-delete {
    background: #FFDBDB;    /* Red */
}
table.cmbox-content {
    background: #FFE7CE;    /* Orange */
}
table.cmbox-style {
    background: #FFF9DB;    /* Yellow */
}
table.cmbox-move {
    background: #F1D0FF;    /* Purple */
}
table.cmbox-protection {
    background: #EFEFE1;    /* Gray-gold */
}
 
/* Other pages message box styles */
table.ombox {
    margin: 4px 10%; 
    border-collapse: collapse; 
    border: 1px solid #aaa;       /* Default "notice" gray */
    background: #f9f9f9;
}
table.ombox-small {               /* For the "small=yes" option */
    clear: right;
    float: right;
    margin: 4px 0 4px 1em;
    width: 238px;
    font-size: 88%;
    line-height: 1.25em;
}
 
table.ombox-notice {
    border: 1px solid #aaa;       /* Gray */
}
table.ombox-speedy {
    border: 2px solid #b22222;    /* Red */
    background: #fee;             /* Pink */
}
table.ombox-delete {
    border: 2px solid #b22222;    /* Red */
}
table.ombox-content {
    border: 1px solid #f28500;    /* Orange */
}
table.ombox-style {
    border: 1px solid #f4c430;    /* Yellow */
}
table.ombox-move {
    border: 1px solid #9932cc;    /* Purple */
}
table.ombox-protection {
    border: 2px solid #bba;       /* Gray-gold */
}
 
/* Talk page message box styles */
table.tmbox {
    margin: 4px 10%;
    border-collapse: collapse;
    border: 1px solid #c0c090;    /* Default "notice" gray-brown */
    background: #f8eaba;
}
table.tmbox-small {               /* For the "small=yes" option */
    clear: right;
    float: right;
    margin: 4px 0 4px 1em;
    width: 238px;
    font-size: 88%;
    line-height: 1.25em;
}
.mbox-inside .tmbox {    /* For tmboxes inside other templates. */
    margin: 2px;
}
 
table.tmbox-speedy {
    border: 2px solid #b22222;    /* Red */
    background: #fee;             /* Pink */
}
table.tmbox-delete {
    border: 2px solid #b22222;    /* Red */
}
table.tmbox-content {
    border: 2px solid #f28500;    /* Orange */
}
table.tmbox-style {
    border: 2px solid #f4c430;    /* Yellow */
}
table.tmbox-move {
    border: 2px solid #9932cc;    /* Purple */
}
table.tmbox-protection,
table.tmbox-notice {
    border: 1px solid #c0c090;    /* Gray-brown */
}

/*
== MetaBox ==

*/
 
/* Nou esquema de colors per a la Plantilla:Metacaixa usada a la portada */
 
/* Configuració per defecte en lila 
   Tons usats; 1; 7050a0 2; 9070c0 3; b090e0 4; d0b0ff 5; f0d0ff */
 
.mcBoto {
  background-color: #d0b0ff; /* 4 */
  border: 0.15em solid #000000;
  border-color: #f0d0ff #b090e0 #9070c0 #f0d0ff;  /* 5 3 3 5 */
  border-radius-topleft: .5em;
  border-radius-topright: .5em;
  -moz-border-radius: .5em .5em 0em 0em;
  cursor:pointer;
  display: inline;
  margin-right: 0.1em;
  padding: 0.2em 0.3em 0.2em 0.3em;
  position: relative;}
 
.mcBoto a,
.mcBoto strong {
  background: none !important;
  color:#7050a0 !important;  /* 1 */
  font-size: 90%;
  font-weight: bold;
  padding: 0 !important;
  text-decoration: none !important;}
 
.mcBoto a:hover,
.mcBoto strong:hover {
  color: black !important;
  text-decoration: underline !important;}
 
.mcBotoSel {
  background-color: #9070c0; /* 2 */
  border: 0.15em solid #000000;
  border-color: #b090e0 #7050a0 #9070c0 #b090e0;  /* 3 1 2 3 */
  border-radius-topleft: .5em;
  border-radius-topright: .5em;
  -moz-border-radius: .5em .5em 0em 0em;
  cursor: default;
  display: inline;
  margin-right: 0.1em;
  padding: 0.2em 0.3em 0.2em 0.3em;
  position: relative;
  color:white;}
 
.mcBotoSel a {
  background: none !important;
  color:white !important;
  cursor: default;
  font-size: 90%;
  font-weight: bold;
  padding: 0 !important;
  text-decoration: none !important;}
 
.mcContingut {
  background-color: #f8f8ff;
  border: 0.2em solid #9070c0; /* 2 */
  border-color: #9070c0 #7050a0 #7050a0 #9070c0 ; /* 2 1 1 2 */
  -moz-border-radius: 0em .5em .5em 0em;
  border-radius-topright: .5em;
  border-radius-bottomright: .5em;
  padding: 1em;
  position: static;  /* Si hi posem relative falla amb MSIE */}
 
.mcPestanya {
  background-color: #f8f8ff;
  border-color: #7050a0 #b090e0 #b090e0 #7050a0; /* 1 3 3 1 */  width: 100%;
}
 
/* Configuració del Verd 1;60b030 2;75c045 3;90d060 4;a5e085 5;c0f090 */
 
.mcVerd .mcBoto {
 background-color: #a5e085; /* 4 */
 border-color: #c0f090 #90d060 #75c045 #c0f090;  /* 5 3 2 5 */}
 
.mcVerd .mcBoto a,
.mcVerd .mcBoto strong {
  color:#60b030 !important;  /* 1 */
  font-size:90%}
 
.mcVerd .mcBoto a:hover,
.mcVerd .mcBoto strong:hover {
  color: black !important;
  text-decoration: underline;}
 
.mcVerd .mcBotoSel {
  background-color: #75c045; /* 2 */
  border-color: #90d060 #60b030 #75c045 #90d060;  /* 3 1 2 3 */}
 
.mcVerd .mcContingut {
  background-color: #f5fffa;
  border-color: #75c045 #60b030 #60b030 #75c045 ; /* 2 1 1 2 */}
 
.mcVerd .mcPestanya {
  background-color: #f5fffa;
  border-color: #60b030 #90d060 #90d060 #60b030; /* 1 3 3 1 */}
 
/* Configuració del Vermell 1;CC0000 2;FF0000 3;FF8888 4;FFAAAA 5;FFCCCC */
 
.mcVermell .mcBoto {
 background-color: #FFAAAA; /* 4 */
 border-color: #FFCCCC #FF8888 #FF0000 #FFCCCC;  /* 5 3 2 5 */}
 
.mcVermell .mcBoto a,
.mcVermell .mcBoto strong {
  color:#CC0000 !important;  /* 1 */
  font-size:90%}
 
.mcVermell .mcBoto a:hover 
.mcVermell .mcBoto strong:hover {
  color: black !important;
  text-decoration: underline;}
 
.mcVermell .mcBotoSel {
  background-color: #FF0000; /* 2 */
  border-color: #FF8888 #CC0000 #FF0000 #FF8888;  /* 3 1 2 3 */}
 
.mcVermell .mcContingut {
  background-color: #fffafa;
  border-color: #FF0000 #CC0000 #CC0000 #FF0000; /* 2 1 1 2 */}
 
.mcVermell .mcPestanya {
  background-color: #fffafa;
  border-color: #CC0000 #FF0000 #FF0000 #CC0000; /* 1 3 3 1 */}
 
/* Configuració del Blau 1;3379de 2;5b8dd6 3;88abde 4;a7c1e6 5;c8d6e9 */
 
.mcBlau .mcBoto {
 background-color: #a7c1e6; /* 4 */
 border-color: #c8d6e9 #88abde #5b8dd6 #c8d6e9;  /* 5 3 2 5 */}
 
.mcBlau .mcBoto a,
.mcBlau .mcBoto strong {
  color:#3379de !important;  /* 1 */
  font-size:90%}
 
.mcBlau .mcBoto a:hover 
.mcBlau .mcBoto strong:hover {
  color: black !important;
  text-decoration: underline;}
 
.mcBlau .mcBotoSel {
  background-color: #5b8dd6; /* 2 */
  border-color: #88abde #3379de #5b8dd6 #88abde;  /* 3 1 2 3 */}
 
.mcBlau .mcContingut {
  background-color: #f0f8ff;
  border-color: #5b8dd6 #3379de #3379de #5b8dd6; /* 2 1 1 2 */}
 
.mcBlau .mcPestanya {
  background-color: #f0f8ff;
  border-color: #3379de #88abde #88abde #3379de; /* 1 3 3 1 */}
 
 
/* Configuració del Groc 1;ffd813 2;ffe147 3;ffe977 4;fff1a4 5;fef4bc */
 
.mcGroc .mcBoto {
 background-color: #fff1a4; /* 4 */
 border-color: #fef4bc #ffe977 #ffe147 #fef4bc;  /* 5 3 2 5 */}
 
.mcGroc .mcBoto a,
.mcGroc .mcBoto strong {
  color:#ffd813 !important;  /* 1 */
  font-size:90%}
 
.mcGroc .mcBoto a:hover 
.mcGroc .mcBoto strong:hover {
  color: black !important;
  text-decoration: underline;}
 
.mcGroc .mcBotoSel {
  background-color: #ffe147; /* 2 */
  border-color: #ffe977 #ffd813 #ffe147 #ffe977;  /* 3 1 2 3 */}
 
.mcGroc .mcContingut {
  background-color: #fffce8;
  border-color: #ffe147 #ffd813 #ffd813 #ffe147; /* 2 1 1 2 */}
 
.mcGroc .mcPestanya {
  background-color: #fffce8;
  border-color: #ffd813 #88abde #88abde #ffd813; /* 1 3 3 1 */}
 
/* Configuració del Taronja 1;ff820e 2;ff9d42 3;ffac5d 4;ffbd7f 5;ffd0a4 6;ffeedd */
 
.mcTaronja .mcBoto {
 background-color: #ffbd7f; /* 4 */
 border-color: #ffd0a4 #ffac5d #ff9d42 #ffd0a4;  /* 5 3 2 5 */}
 
.mcTaronja .mcBoto a,
.mcTaronja .mcBoto strong {
  color:#ff820e !important;  /* 1 */
  font-size:90%}
 
.mcTaronja .mcBoto a:hover 
.mcTaronja .mcBoto strong:hover {
  color: black !important;
  text-decoration: underline;}
 
.mcTaronja .mcBotoSel {
  background-color: #ff9d42; /* 2 */
  border-color: #ffac5d #ff820e #ff9d42 #ffac5d;  /* 3 1 2 3 */}
 
.mcTaronja .mcContingut {
  background-color: #ffeedd; /* 6 */
  border-color: #ff9d42 #ff820e #ff820e #ff9d42; /* 2 1 1 2 */}
 
.mcTaronja .mcPestanya {
  background-color: #ffeedd; /* 6 */
  border-color: #ff820e #ffac5d #ffac5d #ff820e; /* 1 3 3 1 */}
 
/* Final d'estils de la Metacaixa */
 
/*HERE FINISHES "METABOX" COLOUR-SCHEMES*/

/*****
** Bytecounter colours
*****/
strong.mw-plusminus-neg
   {
   color: #c00;
   }
.mw-plusminus-pos {color: #060;}
.mw-plusminus-neg {color: #900;}