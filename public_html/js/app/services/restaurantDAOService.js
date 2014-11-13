(function () {

    var restaurantDAOService = function ($log, $resource) {

        var daoService = {};
        var localRestaurantCopy = null;
        var restaurantListIndex = {};
        //@
        var setUpRestaurantList = function ()

        {
            restaurantListIndex = {}
            daoService.getAllRestaurants().forEach(function (restaurant)
            {
                restaurantListIndex[restaurant.id] = restaurant;
                if (typeof restaurant.reviewDTOs == 'undefined')
                {
                    restaurant.reviewDTOs = [];
                }
            });

        };

        /** //@
         * the service will return either {id: XXXX} on success 
         * or {{message: "XXX" errorClass: "XXX}
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.saveRestaurant = function (newRestaurant)
        {
            var errorMessage = null;
            $http.put(g_restaurantUrlBase + "/" + newRestaurant.id, newRestaurant).
                    success(function (data, status, headers, config) {
                        var lookup = daoService.getRestaurantById(newRestaurant.id);
                        daoService.loadRestaurant(lookup, newRestaurant);
                    }).
                    error(function (data, status, headers, config) {
                        errorMessage = data.message;
                    });

            return errorMessage;

        };

        //@
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
        //@
        daoService.getRestaurantById = function (id)
        {
            return restaurantListIndex[id];
        };

        //@
        daoService.getAllRestaurants = function ()
        {
            if (localRestaurantCopy === null)
            {
                localRestaurantCopy = $http.get(g_restaurantUrlBase);
            }
            return localRestaurantCopy;
            
        };
        /**
         * //@
         * @param {type} newRestaurant
         * @returns a string with error message or null
         */
        daoService.addRestaurant = function (r)
        {
            var errorMessage = null;

            $http.post(g_restaurantUrlBase, r).
                    success(function (data, status, headers, config) {
                        this.getAllRestaurants().unshift(r);
                        r.reviewDTOs = [];
                        r.id = data.id;
                    }).
                    error(function (data, status, headers, config) {
                        errorMessage = data.message;
                    });
            return errorMessage;
        }
        //@
        daoService.deleteRestaurant = function (restaurant)
        {
   
            var errorMessage = null;

            $http.delete(g_restaurantUrlBase + "/" + restaurant.id).
                    success(function (data, status, headers, config) {

                        var idx = -1;
                        var resCollection = this.getAllRestaurants();
                        for (var i = 0; i < resCollection.length; i++)
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

                    }).
                    error(function (data, status, headers, config) {
                        errorMessage = data.message;
                    });

            return errorMessage;

        }
        setUpRestaurantList();
        return daoService;
    };
    restaurantDAOService.$inject = ['$log', '$http'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


