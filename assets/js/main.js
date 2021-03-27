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

var scrollDelta = 10;
var scrollOffset = 200;
var isScroll = false;
var previousTop = 0;
var currentTop = 0;


$(window).scroll(function () {
    if (!isScroll) {
        isScroll = true;
        (window.requestAnimationFrame)
            ? requestAnimationFrame(autoHideHeader)
            : setTimeout(autoHideHeader, 250);
    }
});

function autoHideHeader() {
    var header = $('header');
    var banner = $('#banner');
    currentTop = $(window).scrollTop();

    if (previousTop >= currentTop) {
        if (previousTop - currentTop >= scrollDelta) {
            header.removeClass('header-collapse');
            banner.removeClass('header-collapse');
        }
    }
    else {
        if (currentTop - previousTop >= scrollDelta && currentTop > scrollOffset) {
            header.addClass('header-collapse');
            banner.addClass('header-collapse');
        }
    }

    previousTop = currentTop;
    isScroll = false;
}