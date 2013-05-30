/*
 * jNotify.js
 * Written by Jeffrey Muller
 * jHeberg.net - 2013
 */

(function($) {

    var o = {};

    ////////////////////////
    // Ui
    ////////////////////////

    setLayout = function(layout) {
        o.htmlTemplate = $(o.htmlTemplate).attr('class', layout);
    }

    setContent = function(content) {
        o.htmlTemplate = $(o.htmlTemplate).find('#content').text(content).parent();
    }

    setClosable = function(isClosable) {
        if (isClosable === true) {
            var closeBtn = '<button class="close">&times;</button>';

            o.htmlTemplate = $(o.htmlTemplate).append(closeBtn);
            $(o.htmlTemplate).find('button.close').click(o.onClickClose);
        }
    }

    ///////////////////////
    // Callbacks
    ///////////////////////

    onClickClose = function() {
        $(o.htmlTemplate).fadeOut();
    }

    ///////////////////////
    // Constructor
    ///////////////////////

    var defaults = {
        // Layout to use (must be "top left", "top right", "bottom left", "bottom right")
        layout: 'top right',

        // Define if the notification is closable
        isClosable: true,
        
        // Define the HTML template of the notification bubble
        htmlTemplate: '<div id="jnotify-box"><div id="content"></div></div>',

        // Content of the notification
        content: '',

        // Callback to call when user click on "close" button
        onClickClose: onClickClose
    };

    $.jNotify = function(options) {
        o = $.extend(defaults, options);

        setLayout(o.layout);
        setContent(o.content);
        setClosable(o.isClosable);

        $('body').append(o.htmlTemplate);
        return this;
    }

})(jQuery);