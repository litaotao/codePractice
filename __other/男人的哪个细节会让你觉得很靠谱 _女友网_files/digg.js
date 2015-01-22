var digg = {
    done : false,
	data : null,
	get  : function(contentid){
			var t = this;
			$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?', function(data){
			digg.data = data;																									
			t.render(data.supports,data.againsts);
			if(data.done) {
				t.done = true;
				$('#supports').attr("title", "你已经顶过了");
				$('#againsts').attr("title", "你已经踩过了");
			}
		})
	},
	set  : function(contentid,flag){
				var t = this;
				if(t.done) {
					if(flag ==1) alert('您已经顶过了');
					else alert('你已经踩过了');
					return;
			    }
				$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?&flag='+flag, function(data){
					if(data > 0) {
						t.done = true;
						var diggtime;
						if(flag == 1) {
							t.render(data,t.data.againsts);
						} else {
							t.render(t.data.supports,data);
						}
					} else {
						document.location.href = WWW_URL+'digg/';
					}
			});
	},
	render  : function(s, a){
			var t = this;
			s = parseInt(s);
			a = parseInt(a);
			var total = (s+a)?(s+a):false,
			percent = Math.floor((total?(s/total):0)*100);
			$('#supports').children(0).html(s).next().html(percent+'%');
			$('#againsts').children(0).html(a).next().html((percent?(100-percent):0)+'%');
	}
}