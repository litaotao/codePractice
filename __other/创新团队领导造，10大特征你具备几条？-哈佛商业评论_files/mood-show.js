$(function(){
	mood.get();
});
function moodPlus(item){
		plus = $('<div id="plus" class="mood-plus">+1</div>');
		plus.css({
			top: '110px',
			left: '12px',
			fontSize: '14px',
			opacity:1
		});
		item.append(plus);
		plus.animate({
			top: '20px',fontSize: '38px',left: '2px',opacity: '0'
		},{duration:500});
}
var mood = {
	time : new Date().getTime(),
    find:function(id) {
        return $('#m_'+id);
    },
	set:function(vote_id) {
		var _this = this;
		if(this.check()) {
			$.getJSON(APP_URL+"?app=mood&controller=index&action=vote&contentid="+contentid+"&voteid="+vote_id+"&jsoncallback=?", function(json){
				moodPlus(_this.find(vote_id));
				_this.render(json);
				$.cookie("mood_time"+contentid, _this.time);
			});
		} else {
			alert('请勿重复提交');
		}
	},
	get:function() {
		var _this = this;
		$.getJSON(APP_URL+"?app=mood&controller=index&action=vote&contentid="+contentid+"&jsoncallback=?", function(json){
			_this.render(json);
		});
	},
	check:function() {
		return (this.time - $.cookie('mood_time'+contentid)) > 1000 * 30;
	},
	render: function(json) {
		var self = this;
		$.each(json.data, function(){
			if(this.number == 0){
				this.height = 0;
			}
            var elem = self.find(this.moodid);
            elem.find('.per').css('height', this.height+'%');
            elem.find('.progress').attr('title', this.number);
		});
		$('.item .per').each(function(){
			if($(this).css('height') == '0%'){
				$(this).removeClass('bdper');
			}
		});
	}
};