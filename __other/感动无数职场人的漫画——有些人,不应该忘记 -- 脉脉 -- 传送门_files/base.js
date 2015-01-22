$(function (){
    $("#home_more_btn").click(function (){
        var page = 'home';
        var path_name = location.pathname.substr(1);
        var kind = path_name == '' ? 'select' : path_name;
        var lastindex = $("#li").text();
        var addfactor = parseInt($("#af").text());
        $("#home_more_btn").hide();
        $("#home_loading").show();
        $.ajax({
            type:'GET',
            url:'/more/'+page+'/'+kind,
            data:{lastindex:lastindex, _xsrf:getCookie('_xsrf')},
            success:function(msg){
                $("#home_loading").hide();
                $(".feed_body").append(msg);
                $("#li").text(parseInt(lastindex) + addfactor);
                var hnid = "#hn"+(parseInt(lastindex) + addfactor);
                if($(hnid).text() == "1"){
                    $("#home_more_btn").show();
                }
            }
        });
        return false;
    });

    $("#accounts_more_btn").click(function (){
        var page = 'accounts';
        var kind = 'new';
        var current_url = location.href;
        if (current_url.indexOf('hot') != -1){
            kind = 'hot';
        }
        if (current_url.indexOf('self') != -1){
            kind = 'self';
        }
        if (current_url.indexOf('vf') != -1){
            kind = 'vf';
        }
        var lastindex = $("#li").text();
        var addfactor = parseInt($("#af").text());
        $("#accounts_more_btn").hide();
        $("#accounts_loading").show();
        $.ajax({
            type:'GET',
            url:'/more/'+page+'/'+kind,
            data:{lastindex:lastindex, _xsrf:getCookie('_xsrf')},
            success:function(msg){
                $("#accounts_loading").hide();
                $(".feed_body").append(msg);
                $("#li").text(parseInt(lastindex) + addfactor);
                var hnid = "#hn"+(parseInt(lastindex) + addfactor);
                if($(hnid).text() == "1"){
                    $("#accounts_more_btn").show();
                }
            }
        });
        return false;
    });

    $("#account_more_btn").click(function (){
        var page = 'account';
        var kind = 'recent';
        var current_url = location.href;
        if (current_url.indexOf('old') != -1){
            kind = 'old';
        } else if (current_url.indexOf('hot') != -1){
            kind = 'hot';
        }
        var account = current_url.split('/')[4];
        if(!isWxid(account)) {
            alert('Something went wrong.');
            return false;
        }
        var lastindex = $("#li").text();
        var addfactor = parseInt($("#af").text());
        $("#account_more_btn").hide();
        $("#account_loading").show();
        $.ajax({
            type:'GET',
            url:'/more/'+page+'-'+account+'/'+kind,
            data:{lastindex:lastindex, _xsrf:getCookie('_xsrf')},
            success:function(msg){
                $("#account_loading").hide();
                $(".feed_body").append(msg);
                $("#li").text(parseInt(lastindex) + addfactor);
                var hnid = "#hn"+(parseInt(lastindex) + addfactor);
                if($(hnid).text() == "1"){
                    $("#account_more_btn").show();
                }
            }
        });
        return false;
    });

    $("#search_more_btn").click(function (){
        var page = 'search';
        var kind = 'account';
        var current_url = location.href;
        if (current_url.indexOf('t=essay') != -1){
            kind = 'essay';
        }
        if (current_url.indexOf('q=') == -1){
            return false;
        }
        q = current_url.split('?')[1].split('&');
        if(q[0].indexOf('q=') != -1) {
            q = q[0].split('=')[1];
        } else {
            q = q[1].split('=')[1];
        }
        var lastindex = $("#li").text();
        var addfactor = parseInt($("#af").text());
        $("#search_more_btn").hide();
        $("#search_loading").show();
        $.ajax({
            type:'GET',
            url:'/more/'+page+'/'+kind,
            data:{q:q, t: kind, lastindex:lastindex, _xsrf:getCookie('_xsrf')},
            success:function(msg){
                $("#search_loading").hide();
                $(".feed_body").append(msg);
                $("#li").text(parseInt(lastindex) + addfactor);
                var hnid = "#hn"+(parseInt(lastindex) + addfactor);
                if($(hnid).text() == "1"){
                    $("#search_more_btn").show();
                }
            }
        });
        return false;
    });

});
