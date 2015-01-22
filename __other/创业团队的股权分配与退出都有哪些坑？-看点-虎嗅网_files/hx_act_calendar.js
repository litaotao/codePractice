define(function(require, exports){


		var tmpDate = new Date()
			,year = tmpDate.getFullYear()
			,month = tmpDate.getMonth() + 1
			,month = month<10? "0"+month : ''+month
			;
		CalendarPost(year+month);
		jQ(document).on('click','#idCalendar td',function(){
			var title = jQ(this).data('title')
				,starttime = jQ(this).data('starttime')
				,endtime = jQ(this).data('endtime')
				,place = jQ(this).data('place')
				,memo = jQ(this).data('memo')
				,undertake = jQ(this).data('undertake')
				,link  = jQ(this).data('link')
				,boxOff = jQ(this).position()
				,boxData = '<h2>'+title+'</h2><p>开始时间：'+starttime+'</p><p>结束时间：'+endtime+'</p><p>活动地点：'+place+'</p><p>活动介绍：'+memo+'</p><p>主办单位：'+undertake+'</p><p>活动链接：<a href="'+link+'" target="_blank">点击这里</a></p><i class="i-jiao"></i>'
				;
	        if(title!=undefined){
	        	jQ("#showIformation").show().html(boxData).focus();
				jQ("#showIformation").css('top',boxOff.top+20);
				jQ(".i-jiao").css('left',boxOff.left+3);
	        }
	        
	        jQ('#showIformation a').on('mousedown', function(event){
                return false;
            })
	        jQ('#showIformation').blur(function(){
	        	jQ("#showIformation").hide()
	        })
	    })
		if (isLogin()) {
			jQ('.new-Calendar').attr('href','/activity.html')
		}else{
			jQ('.new-Calendar').attr({'href':'#lgnModal','data-toggle':'modal'})
		}



/**
*	by jiantian
*	time 2013.08.03
*	日历js
**/
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}
Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

var Calendar = Class.create();
Calendar.prototype = {
  initialize: function(container, options) {
    this.Container = $(container);
    this.Days = [];
    
    this.SetOptions(options);
    this.data = this.options.data;
    this.Year = this.options.Year;
    this.Month = this.options.Month;
    this.SelectDay = this.options.SelectDay;
    this.onSelectDay = this.options.onSelectDay;
    this.onToday = this.options.onToday;
    this.onFinish = this.options.onFinish;  

    this.Draw(); 
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
        data:           {},
        Year:           new Date().getFullYear(),//显示年
        Month:          new Date().getMonth() + 1,//显示月
        SelectDay:      function(){},//选择日期
        onSelectDay:    function(){},//在选择日期触发
        onToday:        function(){},//在当天日期触发
        onFinish:       function(){}//日历画完后触发
    };
    Object.extend(this.options, options || {});
  },
  //上一个月
  PreMonth: function() {
    //先取得上一个月的日期对象
    var d = new Date(this.Year, this.Month - 2, 1);
    //再设置属性
    this.Year = d.getFullYear();
    this.Month = d.getMonth() + 1;
    if(this.Month<10){
    	this.Month = '0'+this.Month;
    }
    CalendarPost(this.Year+''+this.Month);
    //重新画日历
    this.Draw();
  },  
  //下一个月
  NextMonth: function() {
    var d = new Date(this.Year, this.Month, 1);
    this.Year = d.getFullYear();
    this.Month = d.getMonth() + 1;
    if(this.Month<10){
    	this.Month = '0'+this.Month;
    }
    CalendarPost(this.Year+''+this.Month);
    this.Draw();
  },
  //画日历
  Draw: function() {
    //用来保存日期列表
    var arr = [];
    //用当月第一天在一周中的日期值作为当月离第一天的天数
    for(var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++){ arr.push("&nbsp;"); }
    //用当月最后一天在一个月中的日期值作为当月的天数
    for(var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++){ arr.push(i); }
    
    var frag = document.createDocumentFragment();
    
    this.Days = [];
    
    while(arr.length > 0){
        //每个星期插入一个tr
        var row = document.createElement("tr");
        //每个星期有7天
        for(var i = 1; i <= 7; i++){
            var cell = document.createElement("td");
            cell.innerHTML = "&nbsp;";
            
            if(arr.length > 0){
                var d = arr.shift();
                cell.innerHTML = d;
                if(d > 0){
                    this.Days[d] = cell;
                    //判断是否今日
                    if(this.IsSame(new Date(this.Year, this.Month - 1, d), new Date(), !!0)){ this.onToday(cell); }
                    //判断是否选择日期
                    var dat = this.SelectDay();
                    for(var j=0; !!dat[j]; j++){
                        if(new Date(dat[j]) && this.IsSame(new Date(this.Year, this.Month - 1, d), new Date(dat[j]), !0)){
                                           this.onSelectDay(cell);                        }
                    }
                }
            }
            row.appendChild(cell);
        }
        frag.appendChild(row);
    }
    //先清空内容再插入(ie的table不能用innerHTML)
    while(this.Container.hasChildNodes()){ this.Container.removeChild(this.Container.firstChild); }
    this.Container.appendChild(frag);
    
    this.onFinish();
  },
  //判断是否同一日
  IsSame: function(d1, d2, bl) {
    return bl ? d1.getFullYear() == d2.getFullYear() && d1.getDate() == d2.getDate() :
    d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
  } 
};

new Calendar("idCalendar", {
    SelectDay: function(){
        var arr = [];
        for(var pro in this.data[this.Month]){
            arr.push(new Date().setDate(pro))
        }
        return arr
    },
    onSelectDay: function(o){o.className = "onSelect";},
    onToday: function(o){o.className = "onToday"; },
    onFinish: function(){
        var self = this;
        $("idCalendarYear").innerHTML = this.Year; 
        $("idCalendarMonth").innerHTML = this.Month;
        $("idCalendarPre").onclick = function(){self.PreMonth();};
        $("idCalendarNext").onclick = function(){self.NextMonth();};
    }
});


function CalendarPost(num){
	var random = parseInt(Math.random()*100000)
		,url = '/tools/getrili.html?data='+num+'&callback='+random;
	jQ.post(url,function(data){
		var data = eval('('+data+')');
		jQ.each(data,function(v,i){
			var num = jQ('#idCalendar td')
				,num_len = jQ('#idCalendar td').length
				;
			for(n=0;n<num_len;n++){
				if(v == num.eq(n).text()){
					num.eq(n).addClass('onSelect').data({title:i.title,starttime:i.starttime,endtime:i.endtime,place:i.place,memo:i.summary,undertake:i.holder,link:i.link}).attr('tabindex','0');
				}
			}
			
		})
	})
}


})