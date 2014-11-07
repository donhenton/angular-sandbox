(function () {

    var restaurantDAOService = function ($log) {

        var daoService = {};

        daoService.getAllRestaurants = function()
        {
           return g_restaurantData;
        }

 

        return daoService;
    };
    restaurantDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


