(function () {

    var restaurantDAOService = function ($log) {

        var daoService = {};

        daoService.getAllRestaurants = function()
        {
           return g_restaurantData;
        }

        daoService.deleteRestaurant = function(restaurant)
        {
            
        }

        return daoService;
    };
    restaurantDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


