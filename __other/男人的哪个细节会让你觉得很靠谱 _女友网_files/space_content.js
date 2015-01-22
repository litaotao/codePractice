$(function(){
	$.getJSON(APP_URL+'?app=system&controller=content&action=space&type=html&jsoncallback=?',{'contentid':contentid,'pagesize':3}, function(json){
		if(json.spaceid) {
			$('#space_content').html(json.html);
		}
	});
});