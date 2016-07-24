var handlers = {
    convert: function(e) {
        e.preventDefault();
        $.get('/convert', function(form) {
            $('.content').html(form);
        }, 'html');
    },

    convertColor: function(e) {
        e.preventDefault();
        $.post('/convertColor', $('#colorSubmitForm').serialize(), function(color) {
            // use $("[name='rgb']").attr('value', color.convertedRGBColor); for hex -> rbg conversion
            // use $("[name='hex']").attr('value', color.convertedHexColor); for rbg -> hex conversion
            $("input[name='rgb']").val(color.rgb);
            $("input[name='hex']").val(color.hex);
            $("input[name='softrgb']").val(color.softRgb);
            $("input[name='softhex']").val(color.softHex);

            // Change colors of colorboxes
            $('.colorbox').css({ "background-color": color.hex });
            $('.softcolorbox').css({ "background-color": color.softHex });
        }, 'json');
    },

    // function will pass to chooseColor for html rendering

    getColors: function(e) {
        e.preventDefault();
        $.get('/choose', function(colors) {
            handlers.chooseColor(colors);
        }, 'json');
    },

    chooseColor: function(colors) {
        $.get('/choose-does-something-else', function(boxes) {
            // do stuff with colors
            $('.content').html(boxes);
        }, 'html');
    }

    // chooseRandomColor: function(e) {
    //     e.preventDefault();
    //     $.get('/random', function(colors) {

    //         var content = $('.content');

    //         // select current colorblocks
    //         var colorblocks = $('.colors').children().filter(function() {
    //             return $(this).hasClass('nonblock');
    //         });

    //         // remove each in sequence
    //         colorblocks.each(function() {
    //             $(this).queue(function() {
    //                 // animate fade out
    //                 $(this).css({
    //                     animation: "fadeOut 2s forwards ease"
    //                 }).dequeue();
    //             }).queue(function() {
    //                 // then remove from DOM
    //                 $(this).remove().dequeue();
    //             });
    //         });

    //         // Then load up new blocks
    //         // create array of new elements via document.createElement('li'), className = "nonblock"
    //         content.html('<div class=\"colors row-one\"> <li class=\"block\"></li><li class="nonblock a"></li>' +
    //             '<li class="nonblock b"></li><li class="nonblock c"></li><li class="nonblock d"></li></div>');

    //         // select new blocks and set their random color

    //         // append it to first and second row and animate fade in for each in sequence

    //     }, 'json');
    // }
}

$(document).ready(function() {
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

    // Event delegations ----------------------------------------
    // This is to make sure AJAX DOM elements are properly handled.
    $('.content').on('submit', '#colorSubmitForm', function(e) {
        e.preventDefault();
        handlers['convertColor'].call(this, e);
    }).on('click', '.clear', function() {
        $("input").val('');
    }).on('mouseenter', '.nonblock', function() {
        $(this).children('.colorCode').css({ display: 'block' });
    }).on('mouseleave', '.nonblock', function() {
        $(this).children('.colorCode').css({ display: 'none' });
    });
    //-----------------------------------------------------------

    // In order to follow the DRY principle, we create a generic click handler for 
    // all buttons and links using the data-action attribute. Here, we map the
    // data-action value to its respective handler function.
    $("button[data-action]").on("click", function(e) {
        e.preventDefault();
        var link = $(this),
            action = link.data("action");

        if (typeof handlers[action] === "function") {
            handlers[action].call(this, e);
        }
    });
});
