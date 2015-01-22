var digg = {
    done : [],
	data : null,
	get  : function(contentid, obj){
			var t = this;
			$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?', function(data){
			digg.data = data;																									
			t.render(data.supports, obj);
			if(data.done) {
				t.done[contentid] = true;
			}
		})
	},
	set: function(contentid, obj){
		var t = this;
		if(t.done[contentid]) {
			alert('您已经顶过了');
			return;
		}
		$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?&flag=1', function(data){
			if(data > 0) {
				t.done[contentid] = true;
				var diggtime;
				t.render(data, obj);
			} else {
				alert('您已经顶过了');
				return;
			}
		});
	},
	render: function(v, obj){
			var t = this;
			s = parseInt(v);
			$('#'+obj).html(s);
	}
}