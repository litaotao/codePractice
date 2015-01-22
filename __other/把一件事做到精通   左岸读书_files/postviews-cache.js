jQuery.ajax({type:"GET",url:viewsCacheL10n.admin_ajax_url,data:"postviews_id="+viewsCacheL10n.post_id+"&action=postviews",cache:!1});
jQuery(document).ready(function() {
    var ajax_data = {
        action: "show_postview",
        bigfa_view: viewsCacheL10n.post_id
    };
    $.post(viewsCacheL10n.admin_ajax_url, ajax_data,
    function(data) {
        $('.show-view').html(data);
    });
    return false;
});