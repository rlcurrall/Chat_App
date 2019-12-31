/* eslint-disable no-undef */

$(document).ready(function() {
    // on click show/hide menu
    $('#showColors').on('click', function(e) {
        e.preventDefault();
        $('#colors').slideToggle('slow', function() {});
    });

    // if click away from container, hide colors
    $(document).on('click', function() {
        if (!$(event.target).closest('#container').length) {
            if ($('#colors').is(':visible')) {
                $('#colors').slideUp('slow', function() {});
            }
        }
    });

    // if black selected
    $('#black').on('click', function() {
        $('#showColors').css('color', '#000000');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#000000';
    });

    // if blue
    $('#blue').on('click', function() {
        $('#showColors').css('color', '#1460aa');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#1460aa';
    });

    // if red
    $('#red').on('click', function() {
        $('#showColors').css('color', '#b50000');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#b50000';
    });

    // if green
    $('#green').on('click', function() {
        $('#showColors').css('color', '#24a159');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#24a159';
    });

    // if purple
    $('#purple').on('click', function() {
        $('#showColors').css('color', '#bf6ee0');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#bf6ee0';
    });

    // if yellow
    $('#yellow').on('click', function() {
        $('#showColors').css('color', '#aa8f00');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#aa8f00';
    });

    // if purple
    $('#purple').on('click', function() {
        $('#showColors').css('color', '9a123b');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#9a123b';
    });

    // if orange
    $('#orange').on('click', function() {
        $('#showColors').css('color', '#d35400');
        $('#colors').slideUp('slow', function() {});
        // set users text color to value
        userColor = '#d35400';
    });
});
