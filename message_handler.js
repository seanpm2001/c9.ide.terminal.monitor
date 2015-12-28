/**
 * Terminal Module for the Cloud9
 *
 * @copyright 2013, Ajax.org B.V.
 */

define(function(require, exports, module) {
    "use strict";
    
    var MessageHandler = function(messageMatchers, messageView) {
        this.messageMatchers = messageMatchers;
        this.messageView = messageView;
    };
    
    var proto = MessageHandler.prototype;

    proto.handleMessage = function(data, tab) {
        this.messageMatchers.forEach(function(trigger) {
            var matches = trigger.pattern.exec(data);

            if (matches !== null) {
                var message = trigger.message;

                matches.map(function(value, key) {
                    message = message.replace("{" + key + "}", value);
                });

                this.messageView.show(message, trigger.action, tab);
            }
        }, this);
    };
    
    proto.reposition = function(tab) {
        this.messageView.repositionMessages(tab);
    };
    
    proto.hide = function(message) {
        this.messageView.hide(message);
    }
    
    module.exports = MessageHandler;
});
