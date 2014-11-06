

(function () {
    var messageFactory = function ($log)
    {
        
        return messagePump;

    };

    messageFactory.$inject = ['$log'];

    angular.module('listApp').factory('messageFactory', messageFactory);

}());