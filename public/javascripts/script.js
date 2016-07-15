$(document).ready(function() {
    $('#pagepiling').pagepiling({
        sectionsColor: ['#f9f9f9', '#2860BF'],
        anchors: ['home', 'about'],
        scrollingSpeed: 1000,
        easing: 'easeInCubic'
    });

    $('.about').click(function() {
        $.fn.pagepiling.moveSectionDown();
    });
});
