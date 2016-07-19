function convertColor(e) {
    $.post('/convert', $('.input').serialize(), function(color) {
        alert('');
    }, 'text');
    e.stopPropagation();
}

function chooseColor(e) {
    $.get('/choose', function(colors) {
        alert('loaded chosen colors');
        console.log(colors);
    }, 'json');
    e.stopPropagation();
}

function chooseRandomColor(e) {
    $.get('/random', function(colors) {
        alert('loaded random colors');
        console.log(colors);
    }, 'json');
    e.stopPropagation();
}

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

    $('.choose').one('click', chooseColor);

    $('.random').on('click', chooseRandomColor);

});
