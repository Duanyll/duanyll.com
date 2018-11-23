var sectionHeight = function () {
    var total = $(window).height(),
        $section = $('section').css('height', 'auto');

    if ($section.outerHeight(true) < total) {
        var margin = $section.outerHeight(true) - $section.height();
        $section.height(total - margin - 20);
    } else {
        $section.css('height', 'auto');
    }
}

$(window).resize(sectionHeight);

var newHeaderID = 1;

$(function () {
    sectionHeight();
    $('img').on('load', sectionHeight);
});
