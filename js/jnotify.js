/*
 * jNotify.js
 * Written by Jeffrey Muller
 * jHeberg.net - 2013
 */

(function($) {

    var o = {}; // Options object

    ////////////////////////
    // Ui
    ////////////////////////

    create = function() {
        if ($('body div.jNotify').length === 0) {
            var container = $('<div>').addClass(o.position + ' jNotify');

            $('body').append(container);
        }
    }

    render = function() {
        var notification = $('<div>').addClass('jNotify-notification');

        if (o.isClosable === true) {
            notification.append($('<button>').addClass('close').html('&times;'));
        }

        notification.append($('<div>').addClass('content').html(o.content));

        return notification;
    }

    remove = function(notification) {
        var content = $(notification).find('div.content').html();

        $(notification).fadeOut(function() {
            $(notification).remove();

            if ($('div.jNotify div.jNotify-notification').length > 0 && o.pool > 0) {
                display();
            }
        });
    }

    display = function() {
        var displayed = 0;
        $('div.jNotify div.jNotify-notification').each(function(idx, e) {
            if ($(e).is(':hidden')) {
                $(e).fadeIn();

                var t = setTimeout(function() {
                    remove(e);
                    clearInterval(t);
                }, o.timeout);
                $(e).find('button.close').click(o.onClickClose);
            }

            displayed++;
            if (o.pool > 0 && displayed >= o.pool) {
                return false;
            }
        });
    }

    ///////////////////////
    // Callbacks
    ///////////////////////

    onClickClose = function() {
        var notification = $(this).parent();

        remove(notification);
    }

    ///////////////////////
    // Constructor
    ///////////////////////

    $.jNotify = function(options) {
        var defaults = {
            // Layout to use (must be "top left", "top right", "bottom left", "bottom right")
            position: 'top right',

            // Define if the notification is closable
            isClosable: true,

            // Content of the notification
            content: '',

            // Callback to call when user click on "close" button
            onClickClose: onClickClose,

            // Time in milliseconds while bubble is displayed
            timeout: 5000,

            // Limit the number of notification displayed (0 to disable)
            pool: 0
        };

        o = $.extend(defaults, options);

        create();
        var notification = render();

        $('div.jNotify').append(notification);

        display();
    }

})(jQuery);