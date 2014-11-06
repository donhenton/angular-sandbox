/**
 * 
 * http://answers.oreilly.com/topic/2190-two-examples-of-the-observer-pattern-in-javascript/
 * 
 * This is simple message pump system. Clients register a function for a particular 
 * event by calling:
 * 
 * subscribe(functionVar,eventType)
 * subscribe(refreshListener,"ON_REFRESH");
 * 
 * To raise an event
 * raiseEvent(messagePayload,eventType)
 * raiseEvent({username:'fred'},"ON_REFRESH")
 * 
 * the signature of the refreshListener should be : refreshListener(payload)
 * The payload is what will be sent for the event.
 * 
 * 
 */

(function () {
    var messageFactory = function ($log,listFactory)
    {
        
        return messagePump;

    };

    messageFactory.$inject = ['$log','listFactory'];

    angular.module('listApp').factory('messageFactory', messageFactory);

}());