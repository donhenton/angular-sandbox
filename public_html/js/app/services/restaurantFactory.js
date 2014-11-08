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
       

        factory.deleteRestaurant = function(restaurant)
        {
            restaurantDAOService.deleteRestaurant(restaurant);
            this.currentRestaurant = this.createEmptyRestaurant();
            messageFactory.raiseEvent(this.currentRestaurant, "ON_RESTAURANT_DELETE");
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
            this.currentRestaurant = restaurant;
            messageFactory.raiseEvent(restaurant, "ON_RESTAURANT_CHANGE");

        };

        factory.getCurrentRowCSS = function (restaurant)
        {

            if (restaurant.is_current)
                return "currentRestaurantRow";
            else
                return null;


        };

        factory.gatherRestaurant = function (restaurant)
        {

            restaurantDAOService.loadRestaurant(currentRestaurant, restaurant);
        };

        factory.scatterCurrentRestaurant = function ()
        {
            var destRestaurant = {};
            var sourceRestaurant = this.currentRestaurant;
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
            if (this.currentRestaurant.id > 0)
            {
                //TODO 
                restaurantDAOService.saveRestaurant(newRestaurant);
               // var lookup = restaurantDAOService.getRestaurantById(newRestaurant.id);
               // restaurantDAOService.loadRestaurant(lookup, newRestaurant);

            }
        };

        factory.cancelClick = function ( )
        {
            var res = factory.createEmptyRestaurant();
            factory.setCurrentRestaurant(res);
            messageFactory.raiseEvent(restaurant, "ON_RESTAURANT_CHANGE");
            return res;
        };

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