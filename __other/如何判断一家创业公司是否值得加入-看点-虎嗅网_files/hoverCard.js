jQ(function(){
    bindHoverCard('.hx-card');
});

function bindHoverCard(fun) {
    var isHover = false;
    var showHoverCard,removeHoverCard,CurrentCard;
    var selector=jQ(fun);//要绑定的对象

    selector.die("mouseover").live("mouseover", function () {

        if (CurrentCard) CurrentCard.remove();
        if (removeHoverCard) clearTimeout(removeHoverCard);
        if (showHoverCard) clearTimeout(showHoverCard);
        //显示名片
        showHoverCard = setTimeout(hoverCardBuilder(jQ(this)), 108000);
    });
    selector.die("mouseout").live("mouseout", function () {
        if (!isHover) {
            clearTimeout(showHoverCard);
        } else if(CurrentCard) {
            removeCard();
            CurrentCard.hover(function () {
                clearTimeout(removeHoverCard);
            }, function () {
                removeCard();
            });
        }
        isHover = false;
    });
    //删除名片
    removeCard=function(timer){
        removeHoverCard = setTimeout(function () { CurrentCard.remove() }, timer||600);
    }
    //构建名片DOM
    hoverCardBuilder=function (hoverObject) {
        if (!isHover) {
            isHover = true;
            var hoverTop = '',hoverTopClass='',hoverLeft='',hoverLeftClass='';
            if(hoverObject.offset().top-jQ('body').scrollTop()>='200'){
                hoverTop = hoverObject.offset().top - 190;
                hoverTopClass = 'hx-hover-card-arrow2';
            }else{
                hoverTop = hoverObject.offset().top + hoverObject.height()+8;
                hoverTopClass = 'hx-hover-card-arrow';
            }
            if(jQ(window).width()-hoverObject.offset().left<='400'){
                hoverLeft = hoverObject.offset().left-200+ hoverObject.width()/2;
                hoverLeftClass = 'hx-hover-card-right';
            }else{
                hoverLeft = hoverObject.offset().left-30+ hoverObject.width()/2;
                hoverLeftClass = '';
            }
            var bmHoverCard = jQ("<div>").addClass("hx-hover-card").css({
                top: hoverTop,
                left: hoverLeft
            });
            var bmHoverCardArrow = jQ("<div>").addClass(hoverTopClass).addClass(hoverLeftClass);
            var bmHoverCardBorder = jQ("<div>").addClass("hx-hover-card-border");
            var bmLoading = jQ("<img>").attr({ "border": "0", "src": "static/img/transparent.gif" }).addClass("loading")
            var bmHoverCardBefore = jQ("<div>").addClass("hx-hover-card-before");
            var bmHoverCardContainer = jQ("<div>").addClass("hx-hover-card-container").html(bmHoverCardBefore);
            bmHoverCard.append(bmHoverCardArrow).append(bmHoverCardBorder).append(bmHoverCardContainer);
            /**插入DOM**/


            /**获取数据
             *hx_user_id为用户id，用于查询用户信息
             **/
            if (hoverObject.attr("userid")) {
                var random = parseInt(Math.random()*100000)
                    ,postUrl = '/usersubmit.html?is_ajax=1&huxiu_hash_code='+huxiu_hash_code+'&random='+random
                    ,postData = {
                        'uid':hoverObject.attr("userid")
                        ,'act':'get_usercard'
                    }
                    ;
                /*
                 *ajax动态获取用户信息
                 * */
                jQ.ajax({
                    url:postUrl,
                    type:"post",
                    data:postData,
                    dataType:"json",
                    timeout:8000,
                    beforeSend:function(){
                        bmHoverCardBefore.html(bmLoading);
                    },
                    success:function(data){
                        if(data.is_success == '1') {

                            jQ("body").prepend(bmHoverCard);
                            CurrentCard=jQ(".hx-hover-card");
                            bmHoverCardContainer.html(data.usercard);
                        }
                    },
                    error:function(){
                        bmHoverCardBefore.html("读取错误");
                    }
                });
            } else {
                bmHoverCardBefore.html("缺少查询参数");
            }
        }
    }
};