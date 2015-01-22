(function($) {
    $('body').append('<div class="rollto"><a href="javascript:;"></a></div>')

    // lazy avatar
    $('.avatar').lazyload({
        placeholder: jui.uri + '/images/avatar-default.png',
        event: 'scrollstop'
    });

    $('.thumb').lazyload({
        placeholder: jui.uri + '/images/thumbnail.png',
        event: 'scrollstop'
    });

    $('.wp-smiley').lazyload({
        event: 'scrollstop'
    });

    var elments = {
        sidebar: $('.sidebar'),
        footer: $('.footer')
    }

    $('.feed-wechat').popover({
    	container: 'body',
    	html: true,
    	trigger: 'hover',
    	placement: 'bottom'
    })

    $('.home a').attr('target', '_blank')


    $('.tagtab li').each(function(e){
    	$(this).click(function(){
    		$(this).addClass('active').siblings().removeClass()
    		$($('.tagcontent')[e]).fadeIn(300).siblings('.tagcontent').hide()
    	})
    })


    if ($('.article-content').length) $('.article-content img').attr('data-tag', 'bdshare')


window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"12"},"share":{},"image":{tag: 'bdshare',"viewList":["qzone","weixin","tsina","tqq","renren","sqq","douban"],"viewText":"分享到：","viewSize":"16"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

   


    $('.rollto a').on('click', function() {
        scrollTo()
    })

    $(window).scroll(function() {
        var scroller = $('.rollto');
        document.documentElement.scrollTop + document.body.scrollTop > 200 ? scroller.fadeIn() : scroller.fadeOut();
    })

    /* functions
     * ====================================================
     */
    function scrollTo(name, speed) {
        if (!speed) speed = 300
        if (!name) {
            $('html,body').animate({
                scrollTop: 0
            }, speed)
        } else {
            if ($(name).length > 0) {
                $('html,body').animate({
                    scrollTop: $(name).offset().top
                }, speed)
            }
        }
    }
    

    var islogin = false
    if( $('body').hasClass('logged-in') ) islogin = true

    /* event click
     * ====================================================
     */
    $(document).on('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            _ta = $(target)

        if (_ta.hasClass('disabled')) return
        if (_ta.parent().attr('data-event')) _ta = $(_ta.parent()[0])
        if (_ta.parent().parent().attr('data-event')) _ta = $(_ta.parent().parent()[0])

        var type = _ta.attr('data-event')

        switch (type) {
            
            case 'comment-user-change':
                $('#comment-author-info').slideDown(300)
                $('#comment-author-info input:first').focus()

                break;
        }
    })



    $('.commentlist .url').attr('target','_blank')
	
	/*$('#comment-author-info p input').focus(function() {
		$(this).parent('p').addClass('on')
	})
	$('#comment-author-info p input').blur(function() {
		$(this).parent('p').removeClass('on')
	})

	$('#comment').focus(function(){
		if( $('#author').val()=='' || $('#email').val()=='' ) $('.comt-comterinfo').slideDown(300)
	})*/

    var edit_mode = '0',
        txt1 = '<div class="comt-tip comt-loading">正在提交, 请稍候...</div>',
        txt2 = '<div class="comt-tip comt-error">#</div>',
        txt3 = '">',
        cancel_edit = '取消编辑',
        edit,
        num = 1,
        comm_array = [];
    comm_array.push('');

    $comments = $('#comments-title');
    $cancel = $('#cancel-comment-reply-link');
    cancel_text = $cancel.text();
    $submit = $('#commentform #submit');
    $submit.attr('disabled', false);
    $('.comt-tips').append(txt1 + txt2);
    $('.comt-loading').hide();
    $('.comt-error').hide();
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $('#commentform').submit(function() {
        $('.comt-loading').show();
        $submit.attr('disabled', true).fadeTo('slow', 0.5);
        if (edit) $('#comment').after('<input type="text" name="edit_id" id="edit_id" value="' + edit + '" style="display:none;" />');
        $.ajax({
            url: jui.uri+'/modules/comment.php',
            data: $(this).serialize(),
            type: $(this).attr('method'),
            error: function(request) {
                $('.comt-loading').hide();
                $('.comt-error').show().html(request.responseText);
                setTimeout(function() {
                        $submit.attr('disabled', false).fadeTo('slow', 1);
                        $('.comt-error').fadeOut()
                    },
                    3000)
            },
            success: function(data) {
                $('.comt-loading').hide();
                comm_array.push($('#comment').val());
                $('textarea').each(function() {
                    this.value = ''
                });
                var t = addComment,
                    cancel = t.I('cancel-comment-reply-link'),
                    temp = t.I('wp-temp-form-div'),
                    respond = t.I(t.respondId),
                    post = t.I('comment_post_ID').value,
                    parent = t.I('comment_parent').value;
                if (!edit && $comments.length) {
                    n = parseInt($comments.text().match(/\d+/));
                    $comments.text($comments.text().replace(n, n + 1))
                }
                new_htm = '" id="new_comm_' + num + '"></';
                new_htm = (parent == '0') ? ('\n<ol style="clear:both;" class="commentlist commentnew' + new_htm + 'ol>') : ('\n<ul class="children' + new_htm + 'ul>');
                ok_htm = '\n<span id="success_' + num + txt3;
                ok_htm += '</span><span></span>\n';

                if (parent == '0') {
                    if ($('#postcomments .commentlist').length) {
                        $('#postcomments .commentlist').before(new_htm);
                    } else {
                        $('#respond').after(new_htm);
                    }
                } else {
                    $('#respond').after(new_htm);
                }

                $('#comment-author-info').slideUp()

                // console.log( $('#new_comm_' + num) )
                $('#new_comm_' + num).hide().append(data);
                $('#new_comm_' + num + ' li').append(ok_htm);
                $('#new_comm_' + num).fadeIn(1000);
                $body.animate({
                        scrollTop: $('#new_comm_' + num).offset().top - 200
                    },
                    500);
                $('.comt-avatar .avatar').attr('src', $('.commentnew .avatar:last').attr('src'));
                countdown();
                num++;
                edit = '';
                $('*').remove('#edit_id');
                cancel.style.display = 'none';
                cancel.onclick = null;
                t.I('comment_parent').value = '0';
                if (temp && respond) {
                    temp.parentNode.insertBefore(respond, temp);
                    temp.parentNode.removeChild(temp)
                }
            }
        });
        return false
    });
    addComment = {
        moveForm: function(commId, parentId, respondId, postId, num) {
            var t = this,
                div, comm = t.I(commId),
                respond = t.I(respondId),
                cancel = t.I('cancel-comment-reply-link'),
                parent = t.I('comment_parent'),
                post = t.I('comment_post_ID');
            if (edit) exit_prev_edit();
            num ? (t.I('comment').value = comm_array[num], edit = t.I('new_comm_' + num).innerHTML.match(/(comment-)(\d+)/)[2], $new_sucs = $('#success_' + num), $new_sucs.hide(), $new_comm = $('#new_comm_' + num), $new_comm.hide(), $cancel.text(cancel_edit)) : $cancel.text(cancel_text);
            t.respondId = respondId;
            postId = postId || false;
            if (!t.I('wp-temp-form-div')) {
                div = document.createElement('div');
                div.id = 'wp-temp-form-div';
                div.style.display = 'none';
                respond.parentNode.insertBefore(div, respond)
            }!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
            $body.animate({
                    scrollTop: $('#respond').offset().top - 180
                },
                400);
            if (post && postId) post.value = postId;
            parent.value = parentId;
            cancel.style.display = '';
            cancel.onclick = function() {
                if (edit) exit_prev_edit();
                var t = addComment,
                    temp = t.I('wp-temp-form-div'),
                    respond = t.I(t.respondId);
                t.I('comment_parent').value = '0';
                if (temp && respond) {
                    temp.parentNode.insertBefore(respond, temp);
                    temp.parentNode.removeChild(temp)
                }
                this.style.display = 'none';
                this.onclick = null;
                return false
            };
            try {
                t.I('comment').focus()
            } catch (e) {}
            return false
        },
        I: function(e) {
            return document.getElementById(e)
        }
    };

    function exit_prev_edit() {
        $new_comm.show();
        $new_sucs.show();
        $('textarea').each(function() {
            this.value = ''
        });
        edit = ''
    }
    var wait = 15,
        submit_val = $submit.val();

    function countdown() {
        if (wait > 0) {
            $submit.val(wait);
            wait--;
            setTimeout(countdown, 1000)
        } else {
            $submit.val(submit_val).attr('disabled', false).fadeTo('slow', 1);
            wait = 15
        }
    }



})(jQuery)