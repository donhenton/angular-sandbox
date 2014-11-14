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



        factory.deleteRestaurant = function (restaurant)
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
            // $log.log('current' + restaurant.name + " " + restaurant.zip + " " + restaurant.state)
            currentRestaurant = restaurant;
            this.getRestaurantList();

            //$log.log('backup ' + restaurant.name + " " + restaurant.zip + " " + restaurant.state)
            // messageFactory.raiseEvent("", "ON_ERROR");
            messageFactory.raiseEvent(restaurant, "ON_RESTAURANT_CHANGE");

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
        /**
         * 
         * @param {type} restaurant
         * @returns null if validation successful or error message 
         */
        factory.validateRestaurant = function (restaurant)
        {
            var errorMessage = null;
            if (typeof restaurant.name == 'undefined' ||
                    restaurant.name === null || restaurant.name.trim() === "")
                errorMessage = "Name cannot be blank";
            if (typeof restaurant.zipCode == 'undefined' ||
                    restaurant.zipCode === null || restaurant.zipCode.trim() === "")
                errorMessage = "Zip Code cannot be blank";
            if (typeof restaurant.city == 'undefined' ||
                    restaurant.city === null || restaurant.city.trim() === "")
                errorMessage = "City cannot be blank";
            if (typeof restaurant.state == 'undefined' ||
                    restaurant.state === null || restaurant.state.trim() === "")
                errorMessage = "State cannot be blank";

            return errorMessage;
        };

        factory.saveRestaurant = function (newRestaurant)
        {

            var errorMessage = null;

            errorMessage = this.validateRestaurant(newRestaurant);
            if (errorMessage === null)
            {
                if (newRestaurant.id > 0)
                {
                    //save mode
                    errorMessage = restaurantDAOService.saveRestaurant(newRestaurant);
                }
                else
                {
                    //add mode
                    errorMessage = restaurantDAOService.addRestaurant(newRestaurant);
                }
            }
            if (errorMessage === null)
            {
                restaurantList = restaurantDAOService.getAllRestaurants();

            }


            return errorMessage;

        };


        factory.restore = function ()
        {
            //$log.log("current id in restore id " + currentRestaurant.id  );
            if (typeof currentRestaurant.id == 'undefined' || currentRestaurant.id != 0)
            {
                var source = restaurantDAOService.getRestaurantById(currentRestaurant.id)
                //$log.log("source in restore id " + source.id + " " + source.name);
                restaurantDAOService.loadRestaurant(currentRestaurant, source);
                //$log.log("currentRestaurant in restore id " + currentRestaurant.id + " " +
                //        currentRestaurant.name);
            }


        }
        //this would be a service call
        factory.getRestaurantList = function ()
        {
            
            return restaurantList;
        };


      //  factory.getRestaurantList();


        factory.init = function ()
        {
           return restaurantDAOService.init().
                    success(function (data, status, headers, config) {
                        console.log("factory init")
                        restaurantList = data;
                        // setUpRestaurantList();
                    }).
                    error(function (data, status, headers, config) {

                    });
        }
         

        return factory;
    };

    restaurantFactory.$inject = ['$log', 'messageFactory', 'restaurantDAOService'];

    angular.module('restaurantApp').factory('restaurantFactory', restaurantFactory);


}());