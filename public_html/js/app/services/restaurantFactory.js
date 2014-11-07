/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var restaurantFactory = function ($log,messageFactory,restaurantDAOService) {

        var factory = {};
        factory.restaurantList = null;
        factory.currentRestaurant =  {};
        factory.restaurantListIndex = {} // list of restaurants by id
        
 
        factory.resetCurrentStatus = function ()
        {

            this.restaurantList.forEach(function (restaurant)
            {
                restaurant.is_current = false;
            });
        };
        factory.changeRestaurant = function (restaurant)
        {
            this.resetCurrentStatus();
            restaurant.is_current = true;
            factory.currentRestaurant = restaurant;
            messageFactory.raiseEvent(restaurant,"ON_RESTAURANT_CHANGE");

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
           
            this.loadRestaurant(this.currentRestaurant,restaurant);
        };

        factory.scatterCurrentRestaurant = function ()
        {
            var destRestaurant = {};
            var sourceRestaurant = this.currentRestaurant;
            this.loadRestaurant(destRestaurant, sourceRestaurant);
            return destRestaurant;
        };

        factory.loadRestaurant = function(destRestaurant, sourceRestaurant)
        {
            destRestaurant.name = sourceRestaurant.name;
            destRestaurant.zipCode = sourceRestaurant.zipCode;
            destRestaurant.city = sourceRestaurant.city;
            destRestaurant.state = sourceRestaurant.state;
            destRestaurant.version = sourceRestaurant.version;
            destRestaurant.is_current = sourceRestaurant.is_current;
            destRestaurant.id = sourceRestaurant.id;
        }
        
         factory.createEmptyRestaurant = function()
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
                var lookup = factory.restaurantListIndex[newRestaurant.id];
                this.loadRestaurant(lookup, newRestaurant);

            }
        };

        factory.cancelClick = function ( )
        {
             var res = factory.createEmptyRestaurant();
             factory.setCurrentRestaurant(res);
             messageFactory.raiseEvent(restaurant,"ON_RESTAURANT_CHANGE");
             return res;
        };

        //this would be a service call
        factory.getRestaurantList = function ()
        {
            
            this.restaurantList = restaurantDAOService.getAllRestaurants();
        };
        //init the system
        factory.setUpRestaurantList = function ()
        {
            this.restaurantList.forEach(function (restaurant)
            {
                factory.restaurantListIndex[restaurant.id] = restaurant;


            });

        };

        factory.getRestaurantList();
        factory.setUpRestaurantList();


        return factory;
    };

    restaurantFactory.$inject = ['$log','messageFactory','restaurantDAOService'];

    angular.module('restaurantApp').factory('restaurantFactory', restaurantFactory);


}());