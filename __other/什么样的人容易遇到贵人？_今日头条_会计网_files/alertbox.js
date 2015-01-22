$(function(){
    //var target = new Date('2014-06-03 18:00:00')
    //var time=Date.parse(target);
    //var current = Date.parse(new Date());
    //console.log(new Date(target).toLocaleString())
    //console.log(new Date(current).toLocaleString())

/*  //右下角的弹窗
    if(current<time){
        $('body').append('<div style="background:url(http://static.kuaiji.com/images/500.gif) no-repeat;width:312px;height:177px;position:fixed;bottom:0;right:0;display:block;cursor:pointer;z-index:999999;" id="openURL"><div style="width:15px;height:15px;display:block;float:right" id="change" rel="1"></div></div>')    ;

        $("#openURL").click(function(){
            //window.location.href="http://www.baidu.com"   ;
            window.open('http://bbs.kuaiji.com/thread-531431-1-1.html?utm_source=gw-lowerright');
        })

        $("#change").click(function(e){
            e.stopPropagation()

            $('#openURL').hide();

            //去掉点击两次才能关闭右小角的广告
            
            //if($(this).attr('rel')){
            //    $(this).removeAttr('rel')
            //    window.open('http://bbs.kuaiji.com/thread-531431-1-1.html?utm_source=gw-lowerright');
            // }else{
            //    $('#openURL').hide();
            //}
            

        })
*/
function reduceTime(){
	var target = new Date('2014/06/05 18:00:00')
	var time=Date.parse(target);
	var current = Date.parse(new Date());
	if(!$("#openURL").length){
 		$('body').append('<div style="background:url(http://static.kuaiji.com/images/500.jpg) no-repeat;width:312px;height:177px;position:fixed;bottom:0;right:0;display:block;cursor:pointer;z-index:999999;" id="openURL">'+
 			'<div class="clearfix" style="position:absolute;width:290px;padding:80px 0 0 0">'+
				'<div id="hours" style="width:78px;height:78px;float:left;line-height:78px;font-size:40px;color:#fff;text-align:center;padding-left:5px"></div>'+
				'<div id="minutes" style="width:78px;height:78px;float:left;line-height:78px;font-size:40px;color:#fff;text-align:center;padding-left:25px"></div>'+
				'<div id="seconds" style="width:78px;height:78px;float:left;line-height:78px;font-size:40px;color:#fff;text-align:center;padding-left:25px"></div>'+
 			'</div>'+
 			'<div style="width:25px;height:25px;display:block;float:right;" id="change" rel="1"></div>'+
 			'</div>'
 			);


        $("#openURL").click(function(){
            window.open('http://bbs.kuaiji.com/thread-531431-1-1.html?utm_source=gw-lowerright');
        })

        $("#change").click(function(e){
            e.stopPropagation()
            $('#openURL').remove();
            clearTimeout(Time)
        })

	}
	if(current<time){
    	var counts = (time - current)/1000;
    	var hours = Math.floor(counts/(60*60));
    	console.log(hours);
    	var _minutes = counts-hours*60*60;
    	var minutes=Math.floor(_minutes/60);
    	console.log(minutes);
    	var seconds = _minutes-minutes*60;
    	console.log(seconds);
    	$("#hours").html(hours);
    	$("#minutes").html(minutes);
    	$("#seconds").html(seconds);

        Time = setTimeout(reduceTime,1000);
	}else{
		clearTimeout(Time);
		$("#openURL").remove();
	}


}

var Time = setTimeout(reduceTime,1000)

})