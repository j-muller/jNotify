/*
 * jNotify.js
 * Written by Jeffrey Muller
 * jHeberg.net - 2013
 */

(function($) {

    var o = {}; // Options object
    var notifId = 0;

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

    ///////////////////////
    // Callbacks
    ///////////////////////

    onClickClose = function() {
        $(this).parent().fadeOut();
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

        timeout: 5000
    };

    $.jNotify = function(options) {
        o = $.extend(defaults, options);

        create();
        var notification = render();

        $('div.jNotify').append(notification);
        $(notification).fadeIn();

        $(notification).find('button.close').click(o.onClickClose);

        setTimeout(function() {
            $(notification).fadeOut();
        }, o.timeout);
    }

})(jQuery);