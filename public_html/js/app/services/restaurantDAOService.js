(function () {

    var restaurantDAOService = function ($log,$resource) {

        var daoService = {};
        var localRestaurantCopy = null;
        var restaurantListIndex = {};
        var setUpRestaurantList = function ()
        
        {
            restaurantListIndex = {}
            daoService.getAllRestaurants().forEach(function (restaurant)
            {
                restaurantListIndex[restaurant.id] = restaurant;
                if (typeof restaurant.reviewDTOS == 'undefined')
                {
                    restaurant.reviewDTOS = []; 
                }
            });

        };

        /**
         * the service will return either {id: XXXX} on success 
         * or {{message: "XXX" errorClass: "XXX}
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.saveRestaurant = function (newRestaurant)
        {
            var errorMessage = null;
            var lookup = daoService.getRestaurantById(newRestaurant.id);
            daoService.loadRestaurant(lookup, newRestaurant);
            return errorMessage;
        };

        daoService.loadRestaurant = function (destRestaurant, sourceRestaurant)
        {
            destRestaurant.name = sourceRestaurant.name;
            destRestaurant.zipCode = sourceRestaurant.zipCode;
            destRestaurant.city = sourceRestaurant.city;
            destRestaurant.state = sourceRestaurant.state;
            destRestaurant.version = sourceRestaurant.version;
            destRestaurant.is_current = sourceRestaurant.is_current;
            destRestaurant.id = sourceRestaurant.id;
        }

        daoService.getRestaurantById = function (id)
        {
            return restaurantListIndex[id];
        };
        daoService.getAllRestaurants = function ()
        {
            return g_restaurantData;
        };
        /**
         * 
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.addRestaurant = function (r)
        {
            var errorMessage = null;
            this.getAllRestaurants().unshift(r);
            r.reviewDTOs = [];
            return errorMessage;
        }

        daoService.deleteRestaurant = function (restaurant)
        {
            //locate the restaurant by walking the array
            //
            //splice it out
            //setUpRestaurantList();
            var errorMessage = null;
            var idx = -1;
            var resCollection = this.getAllRestaurants();
            for (i = 0; i < resCollection.length; i++)
            {
                if (resCollection[i].id === restaurant.id)
                {
                    idx = i;
                    break;
                }
            }
            if (idx > -1)
            {
                resCollection.splice(idx, 1);
                setUpRestaurantList();
            }


        }
        setUpRestaurantList();
        return daoService;
    };
    restaurantDAOService.$inject = ['$log','$http'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


