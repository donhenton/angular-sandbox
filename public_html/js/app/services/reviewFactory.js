/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var reviewFactory = function ($log,messageFactory,restaurantDAOService) {

        var factory = {};
        var currentRestaurant ="bonzo"; 
         
        factory.changeRestaurant = function(restaurant)
        {
            $log.log("ccc "+currentRestaurant);
        }
        
        factory.scatterCurrentReviews = function()
        {
            
        }

        return factory;
    };

    reviewFactory.$inject = ['$log','messageFactory','restaurantDAOService'];

    angular.module('restaurantApp').factory('reviewFactory', reviewFactory);


}());