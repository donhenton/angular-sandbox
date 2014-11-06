/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var restaurantFactory = function ($log,messageFactory) {

        var factory = {};
        factory.restaurantList = null;
       // factory.callThisOnRestaurantChange = null;
        factory.currentRestaurant =  {};
        factory.restaurantListIndex = {} // list of restaurants by id
       // $log.log("m "+messageFactory);
 
        factory.resetCurrentStatus = function ()
        {

            this.restaurantList.forEach(function (restaurant)
            {
                restaurant.is_current = false;
            });
        };
        factory.setCurrentRestaurant = function (restaurant)
        {
            this.resetCurrentStatus();
            restaurant.is_current = true;
            factory.currentRestaurant = restaurant;
           // factory.callThisOnRestaurantChange(restaurant);

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

        factory.saveClick = function (newRestaurant)
        {
            if (this.currentRestaurant.id > 0)
            {
                var lookup = factory.restaurantListIndex[newRestaurant.id];
                this.loadRestaurant(lookup, newRestaurant);

            }
        };

        //this would be a service call
        factory.getRestaurantList = function ()
        {
            
            this.restaurantList = g_restaurantData;
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

    restaurantFactory.$inject = ['$log'];

    angular.module('restaurantApp').factory('restaurantFactory', restaurantFactory);


}());