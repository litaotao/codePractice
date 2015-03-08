// dw-comments.js v0.1
//
// Copyright (c) 2012 Peter Yim (http://www.ibm.com/developerworks)
// 
/*--------------------------------------------------------------------------*/
dojo.provide('dwc.comments');

if (typeof(dwc) == 'undefined') {

    dwc = {}

}

dwc.signInPreText = dwc.signInPreText || '';

dwc.signIn = dwc.signIn || 'Sign in';

dwc.or = dwc.or || 'or';

dwc.register = dwc.register || 'register';

dwc.signInPostText = dwc.signInPostText || '';

dwc.leaveCmt = dwc.leaveCmt || 'to leave a comment.';

dwc.addCmts = dwc.addCmts || 'Add comments';

dwc.addCmt = dwc.addCmt || 'Add comment';

dwc.view = dwc.view || 'View';

dwc.totalCmts = dwc.totalCmts || 'Total comments';

dwc.postYourCmt = dwc.postYourCmt || 'Post your comment';

dwc.show = dwc.show || 'Show:';

dwc.recentCmts = dwc.recentCmts || 'Most recent comments';

dwc.allCmts = dwc.allCmts || 'All comments';

dwc.tooLongCmt = dwc.tooLongCmt || 'Your comment has exceeded the 1000-char limit';

dwc.numCharsLeft = dwc.numCharsLeft || '<span id="charCount">{1}</span> characters left';

dwc.reportAbuse = dwc.reportAbuse || 'Report abuse';

dwc.postingCmt = dwc.postingCmt || 'Posting comment...';

dwc.noCmt = dwc.noCmt || 'Be the first to add a comment.';

dwc.netwkErr = dwc.netwkErr || 'There is a problem in retrieving the comments. Please refresh the page later.';

dwc.btnPost = dwc.btnPost || 'Submit';

dwc.enterCmt = dwc.enterCmt || 'Error: Please add a comment.';

dwc.loginErr = dwc.loginErr || 'Your login status cannot be verified at this point. Please try again later.';

dwc.postErr = dwc.postErr || 'Your comment cannot be posted at this time. Please try again later.';

dwc.postBy = dwc.postBy || 'Posted by {1} on {2}';

dwc.siteId = dwc.siteId || 1;

dwc.lang = dwc.lang || 'en';

dwc.viperLang = dwc.viperLang || 'en';

dwc.notifyMsg = dwc.notifyMsg || 'Notify me when a comment is added';

dwc.htmlWarning = dwc.htmlWarning || 'Note: HTML elements are not supported within comments.';

dwc.doNotErase = dwc.doNotErase || '--- Add any comments below this line ---';

dwc.abuseHref = dwc.abuseHref || null;

dwc.cmt = dwc.cmt || 'Comment:';

dwc.maxChars = dwc.maxChars || 1000;

dwc.cmtTxt = dwc.cmtTxt || 'Comment';

dwc.cmtsTxt = dwc.cmtsTxt || 'Comments';

dwc.q = dojo.query;

dwc.id = dojo.byId;

dwc.h = dojo.hitch;

dojo.extend(dojo.NodeList, {

    show: function() {

        this.style({

            display: ''

        })

    },

    hide: function() {

        this.style({

            display: 'none'

        })

    }

});

dojo.declare("dwc.comments", null, {

    _divId: 'threadShow',

    _width: '95%',

    _hitsPerPage: 5,

    _nCmtsId: 'nCmts',

    _anchorCmts: 'comments',

    _PV: [],

    total: 0,

    hash: 0,

    recentNumCmts: 5,

    alotCmts: 10,

    loginStatus: false,

    signinType: 'overlay',

    marker: 0,

    errFlag: 0,

    _downloadsURL: '/developerworks/views/trialDownloadXML.jsp',

    cachedCommentsUrl: '/developerworks/maverick/execute/getComments',

    noCachedCommentsUrl: '/developerworks/maverick/execute/getComments',

    commentsUrl: '',

    _imgPlHdr: '<img id="imgPlHdr" src="//1.www.s81c.com/i/v17/animated-progress-38x38c.gif" alt="" />',

    divs: [],

    xmlData: null,

    showAllResults: false,

    constructor: function(cmtSectId, width, hitsPerPage, nCmtsId, anchorCmts) {

        this._divId = cmtSectId || this._divId;

        this._width = width || this._width;

        this._hitsPerPage = hitsPerPage || this._hitsPerPage;

        this._nCmtsId = nCmtsId || this._nCmtsId;

        this._anchorCmts = anchorCmts || this._anchorCmts;

        this.commentsUrl = this.cachedCommentsUrl;

        this.divs = [];

        if (typeof(dwsi) != 'undefined' && typeof(dwsi.dwsiEvtTgt) != 'undefined') {

            dwsi.dwsiEvtTgt.addListener("dwsi_logged_in_onpgload", dwc.h(this, this.loggedInCallback));

            dwsi.dwsiEvtTgt.addListener("dwsi_logged_in", dwc.h(this, this.loggedInCallback))

        }

        dojo.ready(dwc.h(this, function() {

            this.loadMeta();

            var s = '';

            s += this.addCmtForm();

            s += '<div class="ibm-alternate-rule"><hr/ /></div>';

            s += this.addViewControl('topControl', 'selectComments', 'numCmts', 'dropdownCmts', 'howManyComments', true);

            s += '<div id="cmtSect"></div>';

            s = this._imgPlHdr + '<div id="cmtTog" style="display:none">' + s + '</div>';

            s += this.addViewControl('bottomControl', 'selectComments2', 'numCmts2', 'dropdownCmts2', 'howManyComments2', false);

            dwc.q('#' + this._divId).html(s);

            this.reloadCmts();

            if (typeof(dwsi) != 'undefined' && typeof(dwsi.dwsiEvtTgt) != 'undefined') {

                dwsi.dwsiEvtTgt.addListener("dwsi_logged_out", dwc.h(this, this.afterSignOut))

            }

            /*KLM: For phase 2, adding the placeholder above the TOC

            var relatedDownloadsPlaceHolder = dwc.q('#dw-summary-area .ibm-col-6-4 .ibm-no-print');

            var relatedDownloadsTag = dojo.create('span', {

            id: 'relatedDownloads'

            });

            relatedDownloadsPlaceHolder.append(relatedDownloadsTag);*/

            this.retrieveDownloads();

            dwc.q('#selectComments, #selectComments2').connect('onsubmit', dwc.h(this, function(event) {

                event.preventDefault();

                this.commentsUrl = this.cachedCommentsUrl;

                var howManyCmts = dwc.q('#howManyComments')[0],

                    howManyCmts2 = dwc.q('#howManyComments2')[0];

                (event.target.id == 'selectComments') ? howManyCmts2.value = howManyCmts.value: howManyCmts.value = howManyCmts2.value;

                dwc.q('#cmtSect')[0].innerHTML = this._imgPlHdr;

                if (howManyCmts.value == 'all') {

                    this.showAllResults = true;

                    this.retrieveCmts(function() {}, this.showAllResults);

                    if (this.total >= this.alotCmts) {

                        dwc.q('#bottomControl').show()

                    }

                } else if (howManyCmts.value == 'recent') {

                    this.showAllResults = false;

                    dwc.q('#bottomControl').hide();

                    this.reloadCmts()

                }

            }));

            dwc.q(':button#postCmt').connect('onclick', dwc.h(this, function(event) {

                event.preventDefault();

                dwc.q('#cmtHead').removeClass('ibm-error');

                var infoCmt = dwc.id('infoCmt');

                infoCmt && infoCmt.removeAttribute('role');

                this.postingCmt()

            }));

            dwc.q('#newCmt').connect('onkeydown', this.keyCount);

            dwc.q('#newCmt').connect('onkeyup', this.keyCount);

            dwc.q('#newCmt').connect('oninput', this.keyCount);

            dwc.id('newCmt').onpaste = this.keyCount

        }))

    },

    loadMeta: function() {

        this._PV = dwc.q('div.metavalue');

        var tPV = {};

        dojo.forEach(this._PV, function(namevalue) {

            var t = namevalue.innerHTML.split("=");

            tPV[t[0]] = encodeURIComponent(t[1])

        });

        this._PV = tPV

    },

    reloadCmts: function() {

        this.marker = 0;

        this.retrieveCmts(function() {

            dwc.q('#cmtTog').show()

        }, this.showAllResults)

    },

    addCmtForm: function() {

        var s = '<div class="ibm-container ibm-alternate-two dw-commentbox dw-noborder">' + '<div class="ibm-container-body dw-commentbox dw-noborder">';

        if (this.loginStatus != 'true') {
            rBHash = (typeof rBHash == 'undefined') ? {} : rBHash; 
            var urlLang = rBHash['urlLang'] || 'en_us';
            var signinAppCode = rBHash['appCode'] || 'dwmav';             
            var hrefLoc = window.location.href;
            
            s += '<p id="signInSect">' + dwc.signInPreText + ' <a onclick="var e=arguments[0] || window.event; dwsi.siInst && dwsi.siInst.showSignIn(); if (e.stopPropagation){ e.stopPropagation();} else { e.cancelBubble = true; } e.preventDefault && e.preventDefault(); return false;" href="#">' + dwc.signIn + '</a> ' + dwc.or + ' <a href="/developerworks/dwwi/jsp/ssoregister.jsp?d='
            + encodeURIComponent( (hrefLoc.search(/#.+/) != -1 ? hrefLoc : hrefLoc + '#' + this._anchorCmts) )
            + '&lang=' + urlLang
            + ((signinAppCode) ? '&a=' + signinAppCode : '') 
            + '">' + dwc.register + '</a> ' + dwc.signInPostText + ' ' + dwc.leaveCmt + '</p>'

        }

        s += '<p id="cmtHead"><label for="newCmt"><strong>' + dwc.addCmt + ':</strong></label></p>';

        s += '<p>' + dwc.htmlWarning + '</p><div id="infoCmt"></div>' + '<form focus="name" enctype="multipart/form-data" method="post" action="" name="form" class="ibm-column-form ibm-styled-form">' + '<p class="6-4-textarea">' + '<textarea rows="5" name="newCmt" id="newCmt" class="dw-inoperable" disabled=""></textarea><br /></p>' + '<span class="ibm-input-group">' + '<input type="checkbox" value="1" name="comment_notification" id="comment_notification" disabled="disabled">' + '<label id="notifyText" class="ibm-form-note dw-btn-cancel-sec" for="comment_notification">' + dwc.notifyMsg + '</label>' + '</span>' + '<span class="ibm-form-note dw-btn-cancel-sec notifySection" id="maxCharsCount">' + dwc.numCharsLeft.replace(/\{1\}/, dwc.maxChars) + '</span>' + '<p class="ibm-buttons-row">' + '<input type="button" value="' + dwc.btnPost + '" name="postCmt" id="postCmt" class="ibm-btn-sec ibm-btn-small ibm-disabled" disabled="disabled" />' + '</p>' + '</form>' + '</div>' + '</div>';

        return s

    },

    addViewControl: function(divId, formId, numCmtId, dropdownCmtId, selCmtId, display) {

        return '<div id="' + divId + '" class="ibm-container ibm-alternate-two dw-comment-totals" style="' + ((display) ? '' : 'display:none') + '">' + '<div class="ibm-container-body">' + '<form id="' + formId + '" method="get" action="">' + '<p>&nbsp;<span class="dw-comment-totals-label"><strong>' + dwc.totalCmts + ' (<span id="' + numCmtId + '"></span>)</strong></span>' + '<span class="dw-how-many-comments-label" style="display:none" id="' + dropdownCmtId + '"><label for="' + selCmtId + '"><strong>' + dwc.show + '</strong></label>&nbsp;' + '<select name="comments" id="' + selCmtId + '" class="dw-how-many-comments">' + '<option selected="selected" value="recent">' + dwc.recentCmts + ' </option>' + '</select>' + '<input type="image" class="ibm-btn-go" name="ibm-go" value="Go" src="//1.www.s81c.com/i/v17/buttons/short-btn.gif" alt="Go"/><br />' + '</span>' + '</p>' + '</form>' + '</div>' + '</div>'

    },

    retrieveCmts: function(callbk, displayAll) {

        var endIdx = (typeof displayAll != 'undefined' && displayAll) ? this.total : this.marker + this._hitsPerPage;

        endIdx = (this.total != 0 && endIdx > this.total) ? this.total : endIdx;

        this.marker += this._hitsPerPage;

        this.marker = (this.total != 0 && this.marker > this.total) ? this.total : this.marker;

        this.fetchCmts(0, endIdx, function() {

            dwc.id('numCmts').innerHTML = this.total;

            dwc.id('numCmts2').innerHTML = this.total;

            dwc.id(this._nCmtsId).innerHTML = '<span>' + this.total + '</span><img class="dw-cmts-arrow" alt="" src="//dw1.s81c.com/developerworks/i/v17/dw-cmts-arrow.png" height="7" width="7" /> <a href="#' + this._anchorCmts + '" class="dw-cmt-link">' + ((this.total == 1) ? dwc.cmtTxt : dwc.cmtsTxt) + '</a>';

            if (this.total == 0) {

                dwc.q('#topControl, #bottomControl').hide();

                dwc.q('#cmtSect')[0].innerHTML = (this.errFlag) ? this.errorNwkMsg() : this.emptyCmt()

            }

            if (this.total > this.recentNumCmts) {

                dwc.q('#dropdownCmts, #dropdownCmts2').show();

                if (dwc.q("#topControl option[value='all']").length == 0) {

                    dwc.q('#topControl select, #bottomControl select').forEach(function(dropdownControl) {

                        dojo.place('<option value="all">' + dwc.allCmts + '</option>', dropdownControl, 'last')

                    })

                }

            }

            dwc.q('#imgPlHdr').hide();

            dwc.h(this, callbk)()

        })

    },

    fetchCmts: function(start, range, callbk) {

        dojo.xhrGet({

            url: this.commentsUrl,

            content: {

                contentID: this._PV['ArticleID'],

                start: start,

                range: range,

                siteID: dwc.siteId

            },

            handleAs: "xml",

            preventCache: true,

            load: dwc.h(this, function(xmlData) {

                this.storeCmts(xmlData);

                dwc.q('#cmtSect')[0].innerHTML = this.divs.join('');

                dwc.q('.dw-report-abuse').connect('onclick', dwc.h(this, function(event) {

                    var anchor = (event.target) ? event.target : event.srcElement;

                    if (this.loginStatus != 'true') {

                        dwc.abuseHref = anchor.href;

                        if (!!dwsi.siInst) dwsi.siInst.showSignIn();

                        event.preventDefault()

                    } else {

                        window.open(anchor.href, "_self")

                    }

                    return false

                }));

                dwc.h(this, callbk)()

            }),

            error: dwc.h(this, function(xmlData) {

                if (xmlData.responseText.indexOf('Error 500: Cannot find a thread') == 0) {

                    dwc.q('#cmtSect').html(this.emptyCmt())

                } else {

                    this.errFlag = 1;

                    dwc.q('#cmtSect').html(this.errorNwkMsg())

                }

                dwc.h(this, callbk)()

            }),

            handle: dwc.h(this, function() {}),

            async: true

        })

    },

    storeCmts: function(xmlData) {

        this.divs = [];

        this.xmlData = xmlData;

        this.total = this.getXMLText('totalCount', this.xmlData);

        if (!this.total) this.total = 0;

        var comments = dwc.q('comment', this.xmlData);

        var cmtLen = comments.length;

        for (var i = 0; i < cmtLen; i++) {

            (i == (cmtLen - 1)) ? this.divs.push(this.thFormat(comments[i], true)): this.divs.push(this.thFormat(comments[i], false))

        }

    },

    thFormat: function(thObj, last) {

        var anchorTxt = this.getXMLText('author', thObj);

        var profileUrlTxt = this.getXMLText('profileurl', thObj);

        var bodyTxt = this.getXMLText('body', thObj);

        var timeTxt = this.getXMLText('time', thObj);

        if (profileUrlTxt.length > 0) anchorTxt = '<a href="' + profileUrlTxt + '">' + anchorTxt + '</a>';

        else anchorTxt = anchorTxt;

        var body = bodyTxt.replace(/&lt;(\/*strong|\/*pre)&gt;/ig, '<$1>').replace(/[\r\n]/g, '').replace(/(.*?)(<pre>.*?<\/pre>)/ig, '<p>$1</p>$2').replace(/((<pre>.*?<\/pre>)+)((?!<p>).+|$)/ig, '$1<p>$3</p>').replace(/<p><\/p>/gi, '').replace(/<p><br \/>\s*/gi, '<p>').replace(/\s*<br \/><\/p>/gi, '</p>').replace(/<pre><br \/>\s*/gi, '<pre>');

        body = (body.search(/<pre>.*?<\/pre>/g) == -1) ? '<p>' + body + '</p>' : body;

        var reportAbuseUrl = '/developerworks/community/report?' + 'lang=' + dwc.viperLang + '&referingURL=' + window.location.href + '&mymessage=' + dwc.cmt + ' ' + encodeURIComponent(body.replace(/<.*?>/g, '')) + '%0D' + encodeURIComponent(dwc.postBy.replace(/\{1\}/, anchorTxt).replace(/\{2\}/, timeTxt).replace(/<.*?>/g, '').substring(0, 150)) + '%0D%0D' + encodeURIComponent(dwc.doNotErase);

        return '<div class="comment"><div class="dw-icomment-container">' + '<div class="dw-icomment-body dw-noborder">' + '<div class="dw-icomment-body dw-noborder">' + body + '<p class="ibm-item-note-alternate dw-item-note-alternate-left">' + dwc.postBy.replace(/\{1\}/, anchorTxt).replace(/\{2\}/, timeTxt) + '</p><p class="ibm-ind-link ibm-item-note-alternate dw-item-note-alternate-right">' + '<a class="ibm-caution-link dw-report-abuse" href="' + reportAbuseUrl + '" target="_self">' + dwc.reportAbuse + '</a></p>' + '<div class="dw-clear-both"></div>' + '</div></div>' + '</div></div>' + ((!last) ? '<div class="ibm-rule"><hr/ /></div>' : '')

    },

    postingCmt: function(bAnon) {

        if (this.validateCmt()) {

            this.postingOptIn();

            dwc.q('#infoCmt').html('<p><img src="//1.www.s81c.com/i/v17/icons/_icons/ibm_icon_alert_SM.png " alt="" width="16" height="16" />' + dwc.postingCmt + '</p>');

            dwc.q('#postCmt').attr('disabled', true).removeClass('ibm-btn-arrow-pri').addClass('ibm-btn-sec ibm-disabled');

            dojo.xhrPost({

                url: "/developerworks/maverick/execute/postComment",

                content: {

                    contentID: this._PV['ArticleID'],

                    cn: 'test',

                    an: ((!!bAnon && typeof(bAnon) == 'boolean') ? bAnon : ""),

                    cb: dwc.q('#newCmt').attr('value')[0].replace(/(\n){3,}/g, '\n\n').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\[\s*((.+\s*\|\s*)?(http[s]?:\/\/|ftp:\/\/)?(www\.)?[a-zA-Z0-9-\.]+\..+(\s*.+\s*\|\s*)?)\]/g, '$1').replace(/\[\s*([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+\s*\]/g, '$1'),

                    siteID: dwc.siteId

                },

                handleAs: "xml",

                preventCache: true,

                handle: function() {

                    dwc.q('#newCmt').removeAttr('disabled');

                    dwc.q('#postCmt').removeClass('ibm-btn-sec ibm-disabled').addClass('ibm-btn-arrow-pri').attr('disabled', false);

                    dwc.q('#infoCmt').text('');

                    dwc.q('#newCmt')[0].focus()

                },

                load: dwc.h(this, function(xmlRep) {

                    if (this.getXMLText('response', xmlRep) == 'ok') {

                        dwc.q('#newCmt').attr('value', '');

                        dwc.q('#cmtSect').html('');

                        dwc.q('#charCount').html(dwc.maxChars);

                        this.total++;

                        this.reloadCmts()

                    } else {

                        alert(dwc.postErr)

                    }

                }),

                error: function() {

                    alert(dwc.postErr)

                },

                timeout: 120000

            })

        }

    },

    validateCmt: function() {

        var b = false;

        var newCmt = dwc.q('#newCmt');

        newCmt.attr('disabled', true);

        newCmt.attr('value', newCmt.attr('value'));

        var newCmtValue = newCmt.attr('value')[0];

        if (typeof newCmtValue == 'undefined' || newCmtValue == '') {

            dwc.q('#cmtHead').addClass('ibm-error');

            newCmt.attr('disabled', false);

            dwc.q('#newCmt')[0].focus();

            var infoCmt = dwc.id('infoCmt');

            infoCmt.setAttribute('role', 'alert');

            infoCmt.innerHTML = '<p class="ibm-error"><img src="//1.www.s81c.com/i/v17/icons/_icons/ibm_icon_alert_SM.png " alt="" width="16" height="16" />' + dwc.enterCmt + '</p>';

            infoCmt.style.visibility = 'hidden';

            infoCmt.style.visibility = 'visible'

        } else if (newCmtValue.length > dwc.maxChars) {

            dwc.q('#infoCmt').html('<p class="ibm-ind-error"><strong>' + dwc.tooLongCmt + '</strong></p>');

            newCmt.attr('disabled', false)

        } else {

            b = true

        }

        return b

    },

    getXMLText: function(nodeName, parentNode) {

        return dwc.q(nodeName, parentNode)[0].textContent || dwc.q(nodeName, parentNode)[0].text

    },

    loggedInCallback: function(event, evtArgs) {

        if (typeof(evtArgs.json) != 'undefined') {

            this.loginStatus = evtArgs.json.status;

            if (this.loginStatus === 'true') {

                this.signinType = evtArgs.json.signin_type;

                dojo.ready(dwc.h(this, function() {

                    this.afterSignIn()

                }))

            }

        }

    },

    afterSignIn: function() {
        // user has clicked on href. need to send the user to the abuse page after logged in
        if (dwc.abuseHref != null) {
            window.open(dwc.abuseHref, "_self");
        }

        dwc.q('#signInSect').hide();
        dwc.q('#newCmt').attr('disabled', false);
        dwc.q('#newCmt').removeClass('dw-inoperable').addClass('dw-operable');
        dwc.q('#postCmt').removeClass('ibm-btn-sec ibm-disabled').addClass('ibm-btn-arrow-pri').attr('disabled', false);
        dwc.q('#maxCharsCount').removeClass('ibm-form-note');
        dwc.id(this._nCmtsId).innerHTML = '<span>' + this.total + '</span><img class="dw-cmts-arrow" alt="" src="//dw1.s81c.com/developerworks/i/v17/dw-cmts-arrow.png" height="7" width="7" /> <a href="#icomments" class="dw-cmt-link">' + ((this.total == 1) ? dwc.cmtTxt : dwc.cmtsTxt) + '</a>';
        this.getOptIn(); // determine optIn value

        // only move the focus to comments if sign in from comments
        (this.signinType == 'mf') ? '' : dwc.q('#newCmt')[0].focus();
    },

    afterSignOut: function() {
        dwc.q('#signInSect').show();
        dwc.q('#newCmt').attr('disabled', true);
        dwc.q('#newCmt').addClass('dw-inoperable').removeClass('dw-operable');
        dwc.q('#postCmt').attr('disabled', true).removeClass('ibm-btn-arrow-pri').addClass('ibm-btn-sec ibm-disabled');
        dwc.q('#maxCharsCount').addClass('ibm-form-note');
        dwc.q('input[name=comment_notification]').attr('disabled', true);
        dwc.id(this._nCmtsId).innerHTML = '<span>' + this.total + '</span><img class="dw-cmts-arrow" alt="" src="//dw1.s81c.com/developerworks/i/v17/dw-cmts-arrow.png" height="7" width="7" /> <a href="#icomments" class="dw-cmt-link">' + ((this.total == 1) ? dwc.cmtTxt : dwc.cmtsTxt) + '</a>';
        dwc.q('#comment_notification').attr('checked', false)
    },

    emptyCmt: function() {

        return '<div class="comment"><div class="dw-icomment-container">' + '<table class="dw-icomment-body" cellpadding="0" cellspacing="0" width="100%"><tr><td><p>' + dwc.noCmt + '</p></td></tr></table>' + '</div></div>'

    },

    errorNwkMsg: function() {

        return '<div class="comment"><div class="dw-icomment-container">' + '<table class="dw-icomment-body" cellpadding="0" cellspacing="0" width="100%"><tr><td><p>' + dwc.netwkErr + '</p></td></tr></table>' + '</div></div>'

    },

    getOptIn: function() {

        if (typeof(this._PV['ArticleID']) == 'undefined') {

            return

        }

        dojo.xhrGet({

            url: "/developerworks/maverick/execute/get_opt_in",

            content: {

                content_id: this._PV['ArticleID']

            },

            handleAs: "json",

            preventCache: true,

            load: dwc.h(this, function(json) {

                if (json['return'] == 1) {

                    this.hash = json['hash'];

                    dwc.q('#comment_notification').show();

                    dwc.q('#notifyText').show();

                    dwc.q('#notifyText').removeClass('ibm-form-note');

                    dwc.q('input[name=comment_notification]').attr('disabled', false);

                    dwc.q('input[name=comment_notification]').attr('checked', (json.opt_in == 1) ? true : false)

                } else {

                    dwc.q('#comment_notification').hide();

                    dwc.q('#notifyText').hide()

                }

            }),

            error: function(json) {

                dwc.q('#comment_notification').hide();

                dwc.q('#notifyText').hide()

            }

        })

    },

    postingOptIn: function() {

        dojo.xhrPost({

            url: "/developerworks/maverick/execute/save_opt_in",

            content: {

                content_id: this._PV['ArticleID'],

                hash: this.hash,

                notify: (dwc.q('input[name=comment_notification]').attr('checked')[0] ? 1 : 0)

            },

            preventCache: true,

            handleAs: "json"

        })

    },

    retrieveDownloads: function() {

        dojo.xhrGet({

            url: this._downloadsURL,

            content: {

                contentID: this._PV['ArticleID'],

                requestType: 'downloads'

            },

            preventCache: true,

            handleAs: "xml",

            load: dojo.hitch(this, function(xml) {

                this.formatXML(xml)

            }),

            error: function(xml) {

                console.log(xml);

            }

        })

    },

    /*KLM: Phase 1 formatXML()

    formatXML: function (xml) {

    var xmlData = dojo.query('download', xml);

    var xmlLen = xmlData.length;

    if (xmlLen > 0) {

    var downloadsText = this.formatDownloadsText();

    this.createDownloadsOverlay();

    dojo.byId('relatedDownloads').innerHTML = "</br/><span onClick='ibmweb.overlay.show(\"related-downloads\",this);return false;' role='presentation'><a class='ibm-popup-link' href='#'>" + downloadsText + "</a></span>";

    var ul = dojo.create("ul", {

    className: "ibm-bullet-list"

    }, 'related-downloads-place-holder');

    dojo.forEach(xmlData, function (data) {

    var title = dojo.query('title', data).text();

    var url = dojo.query('url', data).text();

    if (url.indexOf("?") > -1) {

    url += "&ca=dct-trial-"

    } else {

    url += "?ca=dct-trial-"

    }

    data = '<a href="' + url + '">' + title.replace(/evaluate:/i, '').replace(/introduction\sto/i, '').replace(/trial\sdownload/i, '').replace(/download/i, '').replace(/exercise:/i, '') + '</a>';

    dojo.create("li", {

    innerHTML: data

    }, ul)

    })

    }

    },*/

    /*KLM: Phase 2 formatXML()*/

    formatXML: function(xml) {

        var xmlData = dojo.query('download', xml);

        var xmlLen = xmlData.length;

        if (xmlLen > 0) {

            var downloadsText = this.formatDownloadsText();

            var tryText = this.formatTryText();

            var TRYText = this.formatTRYText();

            /*Move aria-hidden from dw-toc to TOC <li> twisty*/

            var dwTocParent = dojo.byId('dw-toc');

            console.log(dwTocParent);

            dojo.removeAttr(dwTocParent, "aria-hidden");

            var dwToc = new Array();

            dwToc[0] = dojo.query("#dw-toc .ibm-twisty > li:last-child", dojo.byId("dw-summary-area"))[0];

            dwToc[1] = dojo.query("#dw-toc .ibm-twisty > li:last-child a", dojo.byId("dw-summary-area"))[0];

            dwToc[2] = dojo.query("#dw-toc .ibm-twisty > li:last-child span", dojo.byId("dw-summary-area"))[0];

            dwToc[3] = dojo.query("#dw-toc .ibm-twisty > li:last-child .ibm-twisty-body", dojo.byId("dw-summary-area"))[0];

            dojo.forEach(dwToc, function(x, i) {

                dojo.attr(x, "aria-hidden", "true");

            });

            if (xmlLen == 1) {

                this.createDownloadButton();

                var data = xmlData[0];

                var title = dojo.query('title', data).text();

                var url = dojo.query('url', data).text();

                if (url.indexOf("?") > -1) {

                    url += "&ca=dct-trial-"

                } else {

                    url += "?ca=dct-trial-"

                }

                var data = '<a href="' + url + '" id="dw-try-related-single">' + tryText + title.replace(/evaluate:/i, '').replace(/introduction\sto/i, '').replace(/trial\sdownload/i, '').replace(/download/i, '').replace(/exercise:/i, '') + '</a>';

                dojo.place(data, 'related-downloads-place-holder');

            } else if (xmlLen > 1) {

                this.createDownloadsList(downloadsText);

                dojo.forEach(xmlData, function(data) {

                    var title = dojo.query('title', data).text();

                    var url = dojo.query('url', data).text();

                    if (url.indexOf("?") > -1) {

                        url += "&ca=dct-trial-"

                    } else {

                        url += "?ca=dct-trial-"

                    }

                    data = '<a href="' + url + '" class="ibm-forward-em-link">' + TRYText + title.replace(/evaluate:/i, '').replace(/introduction\sto/i, '').replace(/trial\sdownload/i, '').replace(/download/i, '').replace(/exercise:/i, '') + '</a>';

                    dojo.create("li", {

                        innerHTML: data

                    }, 'related-downloads-place-holder');

                });

                //KLM: toggle TOC and Try related software twisties

                var dwTry = new Array();

                dwTry[0] = dojo.query("#dw-toc .ibm-twisty li ", dojo.byId("dw-summary-area"))[0];

                dwTry[1] = dojo.query("#dw-toc .ibm-twisty li a", dojo.byId("dw-summary-area"))[0];

                dwTry[2] = dojo.query("#dw-toc .ibm-twisty li span", dojo.byId("dw-summary-area"))[0];

                dwTry[3] = dojo.query("#dw-toc .ibm-twisty li .ibm-twisty-body", dojo.byId("dw-summary-area"))[0];

                dojo.forEach(dwToc, function(x, i) {

                    //when twisty trigger (a, span) clicked...

                    if (i == 1 || i == 2) {

                        dojo.connect(x, "onclick", function(evt) {

                            //...check if Trial software twisty is already open..

                            if (dojo.hasClass(dwTry[0], "ibm-active")) {

                                //...if it's open, close it

                                dojo.removeClass(dwTry[0], "ibm-active");

                                dojo.addClass(dwTry[1], "ibm-twisty-trigger-closed");

                                dojo.style(dwTry[3], "display", "none");

                            }

                        });

                    }

                });

                dojo.forEach(dwTry, function(x, i) {

                    //when twisty trigger (a, span) clicked...

                    if (i == 1 || i == 2) {

                        dojo.connect(x, "onclick", function(evt) {

                            //...check if TOC twisty is already open..

                            if (dojo.hasClass(dwToc[0], "ibm-active")) {

                                //...if it's open, close it

                                dojo.removeClass(dwToc[0], "ibm-active");

                                dojo.addClass(dwToc[1], "ibm-twisty-trigger-closed");

                                dojo.style(dwToc[3], "display", "none");

                            }

                            if (!dojo.hasClass(dwTry[0], "ibm-active")) {

                                dojo.addClass(dwTry[0], "ibm-active");

                                dojo.removeClass(dwTry[1],

                                    "ibm-twisty-trigger-closed");

                                dojo.style(dwTry[3], "display", "block");

                            } else if (dojo.hasClass(dwTry[0], "ibm-active")) {

                                dojo.removeClass(dwTry[0], "ibm-active");

                                dojo.addClass(dwTry[1], "ibm-twisty-trigger-closed");

                                dojo.style(dwTry[3], "display", "none");

                            }

                        });

                    }

                });

                if (dwc.siteId == 60) { //make the font size smaller if it's Japanese

                    //so everything fits on one line

                    dojo.query("#dw-try-related > .ibm-twisty-head").style("fontSize",

                        "13px");

                }

            }

        }

    },

    formatDownloadsText: function() {

        var downloadsText = "";

        switch (dwc.siteId) {

            case 1:

                downloadsText = "Try related software";

                break;

            case 10:

                downloadsText = " 试用相关软件";

                break;

            case 40:

                downloadsText = "Попробуйте другое программное обеспечение по этой теме";

                break;

            case 60:

                downloadsText = "関連するソフトウェアをお試しください";

                break;

            case 70:

                downloadsText = "Hãy thử phần mềm có liên quan";

                break;

            case 80:

                downloadsText = " Baixe o software relacionado ao tema";

                break;

            case 90:

                downloadsText = "Pruebe software relacionado";

                break;

            default:

                downloadsText = "Try related software";

                break;

        }

        return downloadsText;

    },

    formatTryText: function() {

        var tryText = "";

        switch (dwc.siteId) {

            case 1:

                tryText = "Try ";

                break;

            case 10:

                tryText = "试用 ";

                break;

            case 40:

                tryText = "Попробуйте ";

                break;

            case 60:

                tryText = "試用 ";

                break;

            case 70:

                tryText = "Dùng thử ";

                break;

            case 80:

                tryText = "Baixe ";

                break;

            case 90:

                tryText = "Pruebe ";

                break;

            default:

                tryText = "Try ";

                break;

        }

        return tryText;

    },

    formatTRYText: function() {

        var TRYText = "";

        switch (dwc.siteId) {

            case 1:

                TRYText = "TRY: ";

                break;

            case 10:

                TRYText = "试用: ";

                break;

            case 40:

                TRYText = "Попробуйте: ";

                break;

            case 60:

                TRYText = "試用: ";

                break;

            case 70:

                TRYText = "Dùng thử: ";

                break;

            case 80:

                TRYText = "Baixe: ";

                break;

            case 90:

                TRYText = "Pruebe: ";

                break;

            default:

                TRYText = "TRY: ";

                break;

        }

        return TRYText;

    },

    /*KLM: Phase 1 overlay

    createDownloadsOverlay: function () {

    var overlay = '<div id="related-downloads" style="display:none">' + '<div class="ibm-body">' + '<div class="ibm-main">' + '<div class="ibm-title ibm-subtitle"><h2>Related Downloads</h2></div>' + '<div class="ibm-container ibm-alternate ibm-buttons-last">' + '<p id="related-downloads-place-holder"></p>' + '</div>' + '</div>' + '</div>' + '</div>';

    dojo.place(overlay, 'ibm-footer-module-dwwrapper', 'last')

    },*/

    /*KLM: Phase 2 list (one download)*/

    createDownloadButton: function() {

        var tryRelated = dojo.byId('dw-try-related');

        if (tryRelated == null) {

            var list = '<div id="dw-try-related-bckgrd"><div id="related-downloads-place-holder"></div></div>';

            var toc = dojo.query('#dw-toc .ibm-twisty')[0];

            dojo.place(list, toc, 'before');

        }

    },

    /* KLM: Phase 2 list (more than one download)*/

    createDownloadsList: function(downloadsText) {

        var tryRelated = dojo.byId('dw-try-related');

        if (tryRelated == null) {

            var list = '<li id="dw-try-related"><div id="dw-try-related-bckgrd"></div><a href="#toggle" class="ibm-twisty-trigger ibm-twisty-trigger-closed"><img src="// www.ibm.com/i/c.gif " alt="-" aria-hidden="true"/></a><span class="ibm-twisty-head">' + downloadsText + '</span><div class="ibm-twisty-body" style="display: none;"><ul class="ibm-link-list" id="related-downloads-place-holder"></ul></div></li>';

            var toc = dojo.query('#dw-toc .ibm-twisty')[0];

            dojo.place(list, toc, 'first');

        }

    },



    keyCount: function() {

        var newCmt = dwc.q('#newCmt');

        var newCmtValue = newCmt.attr('value')[0];

        if (newCmtValue.length > dwc.maxChars) {

            newCmt.attr('value', newCmtValue.substring(0, dwc.maxChars))

        }

        if ((dwc.maxChars - newCmtValue.length) >= 0) dwc.q('#charCount').html((dwc.maxChars - newCmtValue.length))

    }

});