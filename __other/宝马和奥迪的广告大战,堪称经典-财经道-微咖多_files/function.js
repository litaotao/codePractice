$(document).ready(function () {

    var url = window.location.href;
    var parts = url.split('/');
    if (parts.length > 0) {
        var currhtml = parts[parts.length - 1];
        $("#topNavs a[href='" + currhtml + "']").addClass('active').siblings().removeClass('active');
    }

 
})