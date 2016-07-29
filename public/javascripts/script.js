var handlers = {
    convert: function(e) {
        e.preventDefault();
        animateColorsOut();

        setTimeout(function() {
            $.get('/convert', function(form) {
                $('.content').html(form).hide().fadeIn(300);
            }, 'html');
        }, animationTiming($('.color-box')));
    },

    convertColor: function(e) {
        e.preventDefault();
        $.post('/convertColor', $('#inputColorForm').serialize(), function(color) {
            // use $("[name='rgb']").attr('value', color.convertedRGBColor); for hex -> rbg conversion
            // use $("[name='hex']").attr('value', color.convertedHexColor); for rbg -> hex conversion
            $("input[name='rgb']").val(color.rgb);
            $("input[name='hex']").val(color.hex);
            $("input[name='soft-rgb']").val(color.softRgb);
            $("input[name='soft-hex']").val(color.softHex);

            // Change colors of colorboxes
            $('.convert-color-box').css({ "background-color": color.hex });
            $('.convert-soft-color-box').css({ "background-color": color.softHex });
        }, 'json');
    },

    choose: function(e) {
        e.preventDefault();
        animateColorsOut();

        setTimeout(function() {
            $.get('/choose', function(colors) {
                handlers.chooseColor(colors);
            }, 'json');
        }, animationTiming($('.color-box')));
    },

    chooseColor: function(colors) {
        $.get('/chooseColor', function(colorBoxes) {
            var colorBoxes = $(colorBoxes);
            animateColorsIn(colorBoxes, colors);
            $('.content').html(colorBoxes);
        }, 'html');
    },

    random: function(e) {
        e.preventDefault();
        animateColorsOut();

        setTimeout(function() {
            $.get('/random', function(randomColors) {
                handlers.chooseRandomColor(randomColors);
            }, 'json');
        }, animationTiming($('.color-box')));
    },

    chooseRandomColor: function(randomColors) {
        $.get('/chooseColor', function(colorBoxes) {
            var colorBoxes = $(colorBoxes);
            animateColorsIn(colorBoxes, randomColors);
            $('.content').html(colorBoxes);
        }, 'html');
    }
}

function animateColorsOut() {
    $.each($(".color-box"), function(i, element) {
        $(element).css({ 'opacity': 0 });
        setTimeout(function() {
            $(element).css({
                'opacity': 1.0,
                'animation': 'fadeOut 0.65s forwards ease'
            });
        }, 100 + (i * 100));
    });
}

function animateColorsIn(arr, colors) {
    $.each(arr.find(".color-box"), function(i, element) {
        $(element).css({ 'opacity': 0 });
        setTimeout(function() {
            $(element).css({
                'opacity': 1.0,
                'animation': 'fadeIn 0.65s forwards ease',
                'background-color': colors[i]
            });
        }, 100 + (i * 100));
    });
}

function animationTiming(arr) {
    var time;
    if (!arr.length) {
        time = 350;
    } else {
        time = 1200;
    }
    return time;
}

function pPiling() {
    // Pagepiling -----------------------------------------------
    // More info at https: //github.com/alvarotrigo/pagePiling.js/
    $('#pagepiling').pagepiling({
        sectionsColor: ['#f9f9f9', '#2860BF'],
        anchors: ['home', 'about'],
        scrollingSpeed: 1000,
        easing: 'easeInCubic'
    });

    $('#about').click(function() {
        $.fn.pagepiling.moveSectionDown();
    });
    // ----------------------------------------------------------
}

function navigation() {
    // Event delegations ----------------------------------------
    // This is to make sure AJAX DOM elements are properly handled.
    $('.content').on('submit', '#inputColorForm', function(e) {
        e.preventDefault();
        handlers['convertColor'].call(this, e);
    }).on('click', '.clear', function() {
        $("input").val('');
    }).on('mouseenter', '.color-box', function() {
        $(this).children('.color-code').css({ display: 'block' });
    }).on('mouseleave', '.color-box', function() {
        $(this).children('.color-code').css({ display: 'none' });
    });
    //-----------------------------------------------------------
}

function genericClickHandler() {
    // In order to follow the DRY principle, we create a generic 
    // click handler for all buttons and links using the data-action 
    // attribute. Here, we map the data-action attribute's value to 
    // its respective handler function.
    $("button[data-action]").on("click", function(e) {
        e.preventDefault();
        var link = $(this),
            action = link.data("action");

        if (typeof handlers[action] === "function") {
            handlers[action].call(this, e);
        }
    });
}

$(document).ready(function() {
    pPiling();
    navigation();
    genericClickHandler();
});
