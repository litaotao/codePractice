define(function(require, exports){

    /**
     *	图片上传组建
     **/
    require('jquery.jUploader-1.01.min.js');
    fmUpdata();

	/**
	*	添加文集
	**/
    jQ(document).delegate('.add-collect','click',function(){
        if(!isLogin()) {
            jQ('#lgnModal').modal('show');
            return false;
        }

        var aid = jQ(this).attr('aid');
        if(jQ('#collectShowBox').length>0){

        }else{
            var boxHtml = '<div id="collectShowBox" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                '<h3 id="myModalLabel">加入文集</h3>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="clearfix box-style box-choose">' +
                '<span class="sp-left">选择文集</span>' +
                '<div class="pull-right">' +
                '<ul><li class="active">正在获取列表…</li></ul>' +
                '<div class="clearfix new-add-collect">' +
                '<input class="pull-left" type="text" placeholder="创建新文集" />' +
                '<span aid="'+aid+'" class="btn collect-create-btn pull-right" data-loading-text="创建中...">创建</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="clearfix box-in-Wrap hide">' +
                '<div class="clearfix box-style ">' +
                '<span class="sp-left">文集标题</span>' +
                '<div class="pull-right">' +
                '<input id="creat_collect_name" type="text" placeholder="文集名称" />' +
                '</div>' +
                '</div>' +
                '<p class="p-msg invisible"><span class="a-red"><i class="icon-sanjiao"></i>1到20个字符以内</span></p>' +
                '<div class="clearfix box-style">' +
                '<span class="sp-left">文集简介</span>' +
                '<div class="pull-right">' +
                '<textarea rows="3" id="textarea_notes" placeholder="给文集加个注释" ></textarea>' +
                '</div>' +
                '</div>' +
                '<p class="p-msg invisible"><span class="a-red"><i class="icon-sanjiao"></i>400字符以内</span></p>' +
                '<div class="clearfix box-style box-fm">' +
                '<span class="sp-left">封面</span>' +
                '<div class="clearfix pull-right">' +
                '<div class="pull-left fm-box-wrap">' +
                '<span id="fm-img-shuoming">630*386</span>' +
                '<img id="fm-img" style="display:none;" /><input id="database_pic" type="hidden" />' +
                '</div>' +
                '<label class="pull-left btn" id="fm_img_updata">自定义</label>' +
                '</div>' +
                '</div>' +
                '<div class="clearfix box-style user-per-info">' +
                '<span class="sp-left">公开</span>' +
                '<div class="clearfix pull-right">' +
                '<input type="checkbox" id="info_open" checked="checked">' +
                '</div>' +
                '</div>' +
                '<div class="box-btn collect-creat-wrap ">' +
                '<button aid="'+aid+'" class="btn collect-creat-btn">继续</button>' +
                '</div>' +
                '</div>' +
                '<div class="box-msg-wrap">' +
                '<div class="clearfix box-style box-msg">' +
                '<span class="sp-left">加入理由</span>' +
                '<div class="pull-right box-textarea">' +
                '<textarea id="textarea_reason" rows="3" placeholder="100个字符以内" ></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="box-btn">' +
                '<button aid="'+aid+'" class="btn collect-btn collect-add-btn">完成</button>' +
                '</div>' +
                '</div>' +
                '<div class="complete-msg-wrap hide">' +
                '<div class="complete-box">' +
                '<p class="p-1">添加成功</p>'+
                '<p class="p-2">《<span id="collect_active_name">文章名称</span>》被添加到</p>'+
                '<p class="p-3"><a id="collect_name_a" href="#" target="_blank">文集名称</a></p>'+
                '</div>'+
                '<div class="complete-msg-close-wrap">' +
                '<button class="btn complete-close-btn">关闭</button>'+
                '</div>'+
                '</div>'+
                '</div>' +
                '</div>' +
                '<div class="modal-backdrop model-backwhite fade in" ></div>';
        jQ('body').append(boxHtml);
        }
//        jQ('#collectShowBox').modal('show');
        postCollectList();
        jQ('#collectShowBox').slideDown('normal').addClass('in').attr({'aria-hidden':'false'})
    })

    jQ(document).delegate('.model-backwhite','click',function(){
        jQ('#collectShowBox').removeClass('in').slideUp('normal',function(){
            jQ(this).remove();
            jQ('.model-backwhite').remove();
        })
    })
    jQ(document).delegate('.collect-nr-summary .s-edit','click',function(){
        var t = jQ(this)
            ,boxWrap = t.parents('.collect-nr-summary')
            ,boxData = boxWrap.find('.edit-ipt').text();
        if(t.find('i').hasClass('icon-pencil')){
            t.find('i').addClass('icon-ok').removeClass('icon-pencil');
            boxWrap.find('.edit-ipt').html('<textarea style="width:300px;vertical-align:top;margin:0 5px;" rows="3">'+boxData+'</textarea>');
        }else if(t.find('i').hasClass('icon-ok')){
            postCollectEditContens(t);
        }
    })
    jQ(document).delegate('#collectShowBox .close','click',function(){
        jQ('.model-backwhite').trigger('click');
    })
    jQ(document).delegate('#collectShowBox .box-choose li','click',function(){
        jQ(this).addClass('active').siblings().removeClass('active');
    })
    jQ(document).delegate('#collectShowBox .collect-create-btn','click',function(){
        var t = jQ(this)
            ,iptname = t.parents('.new-add-collect').find('input').val()
            ;
        jQ('#creat_collect_name').val(iptname);
        jQ('#collectShowBox .box-choose,#collectShowBox .box-msg-wrap').hide();
        jQ('#collectShowBox .box-in-Wrap').show();
        fmUpdata();
    })
    jQ(document).delegate('#collectShowBox .collect-add-btn','click',function(){
        var t = jQ(this)
            ,aid = t.attr('aid')
            ,boxWrap = t.parents('#collectShowBox')
            ,collectName = boxWrap.find('li[class="active"]').text()
            ,collectId = boxWrap.find('li[class="active"]').attr('collectid')
            ,memo = boxWrap.find('.box-textarea textarea').val()
            ;
        if(collectId==undefined){
            alert('您还没有选择要添加到哪个文集');
            return false;
        }
        PostCollectAdd(t,aid,collectName,collectId,memo);
    })
    jQ(document).delegate('.collect-neirong-index .collect-edit','click',function(){
        var t = jQ(this)
            ,haid = t.attr('haid')
            ,count_article_id = t.parents('.article-box').attr('count_article_id')
            ;
        if(jQ(this).hasClass('collect-btn-up')){
            PostCollectIdxBoxOrder(t,'up');
        }else if(jQ(this).hasClass('collect-btn-on')){
            PostCollectIdxBoxOrder(t,'on');
        }else if(jQ(this).hasClass('collect-btn-del')){
            PostCollectDel(t,haid,count_article_id);
        }
    })
    jQ(document).delegate('.collect-neirong-index .shouji-tuij-btn','click',function(){
        var t = jQ(this);
        postRecommendCollect(t)
    })

    jQ(document).delegate('#share_wrap3 #like','click',function(){
        if(!isLogin()) {
            jQ('#lgnModal').modal('show');
            return false;
        }
        if(!jQ(this).hasClass('is-clicked')){
            var t = jQ(this)
                ,box = jQ(this).parents('.position-box')
                ,random = parseInt(Math.random()*100000)
                ,formUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                ,haid = t.attr('haid')
                ;
            var postData = {
                'act':'anthology',
                'opt':'agree',
                'haid':haid
            };
            jQ.post(formUrl,postData,function(data){
                var data = eval('(' + data + ')');
                if (data.is_success == '0') {
                    showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                } else {
                    var t_num = t.text();
                    if(t_num==''){
                        t.html('1');
                    }else{
                        t.html(parseInt(t_num)+1);
                    }
                    agreeDisagree(t, '+1', '1');
                    t.addClass('is-clicked')
                    updataCookie(aid,clickid);
                }
            })
        }else{
            //alert('已经提交过了');
            showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
        }

    })
    jQ(document).delegate('.manage-subscribe-box i','click',function(){
        if(!isLogin()) {
            jQ('#lgnModal').modal('show');
            return false;
        }

        if(!jQ(this).hasClass('is-clicked')){
            var t = jQ(this)
                ,random = parseInt(Math.random()*100000)
                ,formUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                ,haid = t.attr('haid')
                ;
            var postData = {
                'act':'anthology',
                'haid':haid
            };
            if(t.hasClass('subscription')){
                postData['opt']='subscription';
            }else if(t.hasClass('unsubscription')){
                postData['opt']='unsubscription';
            }

            jQ.post(formUrl,postData,function(data){
                var data = eval('(' + data + ')');
                if (data.is_success == '0') {
                    showDialog(data.msg,'notice','提示信息','','0','','','','','3','')
                } else {
//                        if(t_num==''){
//                            t.html('1');
//                        }else{
//                            t.html(parseInt(t_num)+1);
//                        }
                    var t_num = parseInt(t.find('em').text());
                    if(postData.opt=='subscription'){
                        t.addClass('unsubscription').removeClass('subscription').html('-取消订阅<em>'+(t_num+1)+'</em>')
                        agreeDisagree(t, '+1', '1');
                        t.addClass('is-clicked');
                    }else if(postData.opt=='unsubscription'){
                        if(t_num>'0'){
                            t.addClass('subscription').removeClass('unsubscription').html('+订阅<em>'+(t_num-1)+'</em>')
                            agreeDisagree(t, '-1', '1');
                            t.removeClass('is-clicked');
                        }
                    }
                }
            })
        }else{
            //alert('已经提交过了');
            showDialog('已经提交过了','notice','提示信息','','0','','','','','3','')
        }

    })
    jQ(document).delegate('.shouji-manage-btn','click',function(){
        var t = jQ(this)
            ,random = parseInt(Math.random()*100000)
            ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
            ,postData = {
                'act':'anthology',
                'opt': t.attr('opt'),
                'haid': t.attr('haid')
            }
        jQ.post(postUrl,postData,function(data){
            var data = eval('('+data+')');
            if(data.is_success=='1'){
                if(t.hasClass('shouji-manage-list')){
                    t.parents('.personal-homepage-box').remove();
                }
                document.location.href = 'http://www.huxiu.com/member/collections.html';
            }else{
                alert(data.msg);
            }
        })

    })

    //分享
    /**
     *	by jiantian
     *	time 2013.05.12
     *	分享数
     **/
    jQ(document).on('click','#share_wrap3 li',function(){
        if(!jQ(this).hasClass('tools-qrcode')&&!jQ(this).hasClass('hxs-fontset')){
            var from_url = encodeURIComponent(document.location.href)
                ,title = encodeURIComponent(preg_quote(document.title))
                ,description = encodeURIComponent(preg_quote(jQ('meta[name="description"]').attr('content')))
                ,des = jQ(this).attr('des')
                ,aid = isUndefined(jQ(this).attr('aid'))?'':jQ(this).attr('aid')
                ,pid = isUndefined(jQ(this).attr('pid'))?'':jQ(this).attr('pid')
                ,haid = isUndefined(jQ(this).attr('haid'))?'':jQ(this).attr('haid')
            ///*,url = 'http://huxiu.com/tools.php?new_page=1&mod=share'+'&des='+des+'&from_url='+from_url+'&title='+title+'&description='+description+'&pid='+pid+'&aid='+aid;*/
                ,url = '/share_data?aid='+aid+'&des='+des+'&pid='+pid+'&haid='+haid
                ;
            window.open(url);
        }
    })

    jQ('#share_wrap3 .tools-qrcode').click(function(){
        var box = jQ('#qrcode_box');
        if(box.length>0){
            if(box.is(':hidden')){
                box.stop().show().animate({
                    bottom:'55'
                    ,opacity:'1'
                },'slow')
            }else{
                box.stop().animate({
                    bottom:'45'
                    ,opacity:'0.6'
                },'slow',function(){
                    jQ(this).hide();
                })
            }
        }else{
            var local_url = window.location.href
                ,qrcode_url = '/qr.html?data='+local_url
                ;
            jQ.get(qrcode_url,function(data){
                jQ('#share_wrap .tools-qrcode').append('<div id="qrcode_box">'+data+'</div>');
                jQ('#qrcode_box').stop().show().animate({
                    bottom:'55'
                    ,opacity:'1'
                },'slow')
            })
        }
    })
    jQ(document).on('click','#share_wrap3 .i-more',function(){
        jQ(this).parents('.share-box').siblings('.side-share-box2').toggle();
    })
    jQ(document).on('click','#share_wrap3 .pl-share',function(){
        jQ(this).find('.side-share-box2').toggle();
    })
    jQ(document).delegate('.collect-creat-btn','click',function(){
        var t = jQ(this)
            ,v = jQ('#creat_collect_name').val()
            ,summary = jQ('#textarea_notes').val()
            ,imgid = jQ('#database_pic').val()
            ,openid = jQ('#info_open').attr('checked') != undefined ? '1':'0'
            ;
        PostCollectCreate(t,v,summary,imgid,openid);
    })


})

function postCollectList(){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,postData = {
            'act':'anthology',
            'opt':'getlist'
        }
        ,boxHtml = ''
        ,iHtml = ''
        ;
    jQ.post(postUrl,postData,function(data){
		var data = eval('('+data+')');
        if(data.anthologylist==''){
            jQ('#collectShowBox .box-choose ul').html('<li>暂无文集，先创建一个吧</li>');
        }else{
            jQ.each(data.anthologylist,function(i,v){
                if(v.status=='0'){
                    iHtml = '<i class="icon-lock"></i>';
                }
                boxHtml += '<li collectid="'+v.haid+'">'+ v.title+iHtml+'</li>';
            })
            jQ('#collectShowBox .box-choose ul').html(boxHtml).find('li').eq(0).addClass('active');
        }
    })
}
function PostCollectCreate(t,v,summary,imgid,openid){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,postData = {
            'act':'anthology',
            'opt':'addanthology',
            'aid':jQ(t).attr('aid'),
            'title':v,
            'summary':summary,
            'database_pic':imgid,
            'status':openid
        }
        ,boxHtml = ''
        ,iHtml = ''
        ;
    if(v.length > 20){
        alert('请将文集标题长度限制在1到20个字符以内');
        return;
    }
    if(summary.length > 400){
        alert('请将文集简介长度限制在400个字符以内');
        return;
    }

    jQ.post(postUrl,postData,function(data){
		var data = eval('('+data+')');
        if(data.is_success=='1'){
            jQ('#collectShowBox .box-choose,#collectShowBox .box-msg-wrap').show();
            jQ('#collectShowBox .box-in-Wrap').hide();
            if(data.status=='0'){
                iHtml = '<i class="icon-lock"></i>';
            }
            if(data.haid>0){
                var liBox = jQ('#collectShowBox .box-choose li');
                liBox.removeClass('active');
                if(liBox.text()=='您还没有创建好的文集'){
                    liBox.remove();
                }
                jQ('#collectShowBox .box-choose ul').prepend('<li collectId='+data.haid+' class="active">'+v+'</li>')
            }else{
                alert(data.msg)
            }

        }else{
            alert(data.msg)
        }
    })

}
function PostCollectAdd(t,aid,collectName,collectId,memo){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,postData = {
            'act':'anthology',
            'opt':'addarticle',
            'aid':aid,
            'haid':collectId,
            'memo':memo
        }
        ,boxHtml = '';
    jQ.post(postUrl,postData,function(data){
		var data = eval('('+data+')');
        if(data.is_success=='1'){
            jQ('#collectShowBox .box-choose,#collectShowBox .box-msg-wrap').hide();
            jQ('#collectShowBox .complete-msg-wrap').show();
            jQ('#collect_active_name').text(data.article_title);
            jQ('#collect_name_a').text(collectName).attr({'href':'http://www.huxiu.com/collections/'+collectId});
            setTimeout("jQ('.model-backwhite').trigger('click')",1000);
        }else{
            alert(data.msg)
        }

    })

}

function PostCollectIdxBoxOrder(t,v){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,boxWrap = jQ(t).parents('.article-box')
        ,postData = {
            'act':'anthology',
            'aid':boxWrap.attr('count_article_id'),
            'haid':jQ(t).parents('.collect-neirong-index').attr('haid')
        }
        ;
        if(v=="on"){
            postData['opt']='up';
        }else{
            postData['opt']='down';
        }

    jQ.post(postUrl,postData,function(data){
		var data = eval('('+data+')');
        if(data.is_success=='1'){
            var oldBoxWrap = jQ('.collect-neirong-index .article-box')
                ,boxBoxLength = oldBoxWrap.length-1
                ,boxLength = boxWrap.index('.collect-neirong-index .article-box')
                ;
            if(v=="on"){
                if(boxLength>0){
                    boxWrap.prev('.article-box').before(boxWrap);
                }else {
                    window.location.reload();
                }
            }else if(v=='up'){
                if(boxLength<boxBoxLength){
                    boxWrap.next('.article-box').after(boxWrap);
                }else{
                    window.location.reload();
                }
            }
        }else{
            alert(data.msg)
        }

    })
}
function PostCollectDel(t,haid,count_article_id){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,boxWrap = jQ(t).parents('.article-box')
        ,postData = {
            'act':'anthology',
            'opt':'delarticle',
            'aid':boxWrap.attr('count_article_id'),
            'haid':haid
        }
        ;

    jQ.post(postUrl,postData,function(data){
		var data = eval('('+data+')');
        if(data.is_success=='1'){
            boxWrap.remove();
        }else{
            alert(data.msg)
        }

    })
}

function postCollectEditContens(t){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,boxWrap = t.parents('.collect-nr-summary')
        ,postData = {
            'act':'anthology',
            'opt':'editarticle',
            'aid': t.attr('aid'),
            'haid': t.attr('haid'),
            'memo': boxWrap.find('.edit-ipt textarea').val()
        }
        ;
    jQ.post(postUrl,postData,function(data){
        var data = eval('('+data+')');
        if(data.is_success=='1'){
            t.find('i').addClass('icon-pencil').removeClass('icon-ok');
            boxWrap.find('.edit-ipt').text(postData.memo);
        }else{
            alert(data.msg)
        }

    })

}

function postRecommendCollect(t){
    var random = parseInt(Math.random()*100000)
        ,postUrl = '/js_anthology.html?&is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
        ,postData = {
            'act':'anthology',
            'aid': t.attr('aid'),
            'haid': t.attr('haid')
        }
        ;
    if(t.hasClass('recommend-shouji')){
        postData['opt'] = 'recommend';
    }else if(t.hasClass('unrecommend-shouji')){
        postData['opt'] = 'unrecommend';
    }

    jQ.post(postUrl,postData,function(data){
        var data = eval('('+data+')');
        if(data.is_success=='1'){
            if(postData['opt'] == 'recommend'){
                t.addClass('unrecommend-shouji').removeClass('recommend-shouji').text('取消推荐');
            }else if(postData['opt'] == 'unrecommend'){
                t.addClass('recommend-shouji').removeClass('unrecommend-shouji').text('推荐');
            }
        }else{
            alert(data.msg)
        }
    })
}

function fmUpdata() {
    jQ.jUploader({
        button: 'fm_img_updata', // 这里设置按钮id
        action: '/js_anthology.html?opt=uploadimg&huxiu_hash_code='+huxiu_hash_code, // 这里设置上传处理接口

        // 开始上传事件
        onUpload: function (fileName) {
            jQ('#tip').text('正在上传 ' + fileName + ' ...');
        },

        // 上传完成事件
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            if (response.is_success=='1') {
                jQ('#fm-img-shuoming').remove();
                jQ('#fm-img').attr('src', response.server_pic).show();
                jQ('#database_pic').val(response.database_pic);
                //jQ('#tip').text(fileName + ' 上传成功。');

                // 这里说明一下，一般还会在图片附近加添一个hidden的input来存放这个上传后的文件路径(response.fileUrl)，方便提交到服务器保存
            } else {
                alert('上传失败');
                //jQ('#tip').text('上传失败');
            }
        },

        // 系统信息显示（例如后缀名不合法）
        showMessage: function (message) {
            //jQ('#tip').text(message);
            alert(message);
        },

        // 取消上传事件
        onCancel: function (fileName) {
            jQ('#tip').text(fileName + ' 上传取消。');
        }
    });
}