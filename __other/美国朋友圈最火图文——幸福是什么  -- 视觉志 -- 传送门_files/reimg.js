$(function (){
    $('img').each(function() {
        var $t = $(this);
        $t.attr({
            src : $t.attr('data-src'),
        })
        .removeAttr('data-src')
        ;
    });
});
