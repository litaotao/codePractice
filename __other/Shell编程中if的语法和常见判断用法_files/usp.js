/* 
	User Submitted Posts - Add Another Upload Link
	http://perishablepress.com/user-submitted-posts/
*/
jQuery(document).ready(function() {
	jQuery('#usp_add-another').click(function(event) {
		event.preventDefault();
		var $this = jQuery(this);
		var $newInput = $this.parent().find('input:visible:last').clone().val('');
		$this.before($newInput);
	});
});