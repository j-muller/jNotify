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
        if (notifications.length === 0) {
            var container = $('<div>').addClass(o.position + ' jNotify');

            $('body').append(container);
        }

        notifications.push({ options: o })
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

        for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].options.content == content) {
                notifications.splice(i, 1);
                break;
            }
        }
        $(notification).parent().hide();

        if (o.pool > 0) {
            display();
        }
    }

    display = function() {
        var displayed = 0;

        $('div.jNotify div.jNotify-notification').each(function(idx, e) {
            console.log('e -> ' + $(e).html() + ' | hidden ' + $(e).is(':hidden'))
            if ($(e).is(':hidden')) {
                // console.log('hidden... -> ' + e)
                $(e).show();

                $(e).find('button.close').click(onClickClose);
                setTimeout(function() {
                    remove(e);
                }, o.timeout);
            } else {
                displayed++;
            }

            if (displayed == o.pool && o.pool > 0) {
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

    var notifications = [];

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
        pool: 1
    };

    $.jNotify = function(options) {
        o = $.extend(defaults, options);

        create();
        var notification = render();

        $('div.jNotify').append(notification);

        display();
    }

})(jQuery);