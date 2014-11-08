/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var restaurantFactory = function ($log, messageFactory, restaurantDAOService) {

        var factory = {};
        var restaurantList = null;
        var currentRestaurant = {};
        var currentRestaurantBackup = {};
       

        factory.deleteRestaurant = function(restaurant)
        {
            restaurantDAOService.deleteRestaurant(restaurant);
            currentRestaurant = this.createEmptyRestaurant();
            messageFactory.raiseEvent(currentRestaurant, "ON_RESTAURANT_DELETE");
        };
        factory.resetCurrentStatus = function ()
        {

            restaurantList.forEach(function (restaurant)
            {
                restaurant.is_current = false;
            });
        };
        factory.changeRestaurant = function (restaurant)
        {
            this.resetCurrentStatus();
            restaurant.is_current = true;
            currentRestaurant = restaurant;
            this.getRestaurantList();
            messageFactory.raiseEvent(restaurant, "ON_RESTAURANT_CHANGE");
            currentRestaurantBackup =factory.scatterCurrentRestaurant();

        };

        factory.gatherRestaurant = function (restaurant)
        {

            restaurantDAOService.loadRestaurant(currentRestaurant, restaurant);
        };

        factory.scatterCurrentRestaurant = function ()
        {
            var destRestaurant = {};
            var sourceRestaurant = currentRestaurant;
            restaurantDAOService.loadRestaurant(destRestaurant, sourceRestaurant);
            return destRestaurant;
        };

       

        factory.createEmptyRestaurant = function ()
        {
            var destRestaurant = {};
            destRestaurant.name = "";
            destRestaurant.zipCode = "";
            destRestaurant.city = "";
            destRestaurant.state = "";
            destRestaurant.version = 0;
            destRestaurant.is_current = false;
            destRestaurant.id = 0;
            return destRestaurant;
        }

        factory.saveClick = function (newRestaurant)
        {
            if (currentRestaurant.id > 0)
            {
              
              restaurantDAOService.saveRestaurant(newRestaurant);
              restaurantList = restaurantDAOService.getAllRestaurants();

            }
        };

        factory.backup = function()
        {
            currentRestaurantBackup = factory.scatterCurrentRestaurant();
        }
        factory.restore = function()
        {
            return currentRestaurantBackup;
        }
        //this would be a service call
        factory.getRestaurantList = function ()
        {
            if (restaurantList === null)
            {
                restaurantList = restaurantDAOService.getAllRestaurants();
            }


            return restaurantList;
        };
 

        factory.getRestaurantList();
 //       factory.setUpRestaurantList();


        return factory;
    };

    restaurantFactory.$inject = ['$log', 'messageFactory', 'restaurantDAOService'];

    angular.module('restaurantApp').factory('restaurantFactory', restaurantFactory);


}());