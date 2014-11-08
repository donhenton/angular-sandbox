(function () {

    var restaurantDAOService = function ($log) {

        var daoService = {};
        var restaurantListIndex = {}
        
        var setUpRestaurantList = function ()
        {
             
            restaurantListIndex = {}
            daoService.getAllRestaurants().forEach(function (restaurant)
            {
                restaurantListIndex[restaurant.id] = restaurant;


            });

        };
        daoService.getRestaurantById = function(id)
        {
            return restaurantListIndex[id];
        };
        daoService.getAllRestaurants = function()
        {
           return g_restaurantData;
        };

        daoService.deleteRestaurant = function(restaurant)
        {
            
        }
        setUpRestaurantList();
        return daoService;
    };
    restaurantDAOService.$inject = ['$log'];
    
    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


