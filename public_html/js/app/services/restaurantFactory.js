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
            messageFactory.raiseEvent("", "ON_ERROR");
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
            if (restaurant.name === null || restaurant.name.trim() === "")
                errorMessage = "Name cannot be blank";
            if (restaurant.zipCode === null || restaurant.zipCode.trim() === "")
                errorMessage = "Zip Code cannot be blank";
            if (restaurant.city === null || restaurant.city.trim() === "")
                errorMessage = "City cannot be blank";
            if (restaurant.state === null || restaurant.state.trim() === "")
                errorMessage = "State cannot be blank";

            return errorMessage;
        };

        factory.saveRestaurant = function (newRestaurant)
        {

            var errorMessage = null;
            var success = true;
            errorMessage = this.validateRestaurant(newRestaurant);
            if (errorMessage === null)
            {
                if (currentRestaurant.id > 0)
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
            else
            {
                success = false;
            }
            messageFactory.raiseEvent(errorMessage, "ON_ERROR");
            return success;

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