(function () {

    var restaurantDAOService = function ($log) {

        var daoService = {};
        var restaurantListIndex = {};
        var setUpRestaurantList = function ()
        {
            restaurantListIndex = {}
            daoService.getAllRestaurants().forEach(function (restaurant)
            {
                restaurantListIndex[restaurant.id] = restaurant;
            });

        };

        daoService.saveRestaurant = function (newRestaurant)
        {
            var lookup = daoService.getRestaurantById(newRestaurant.id);
            daoService.loadRestaurant(lookup, newRestaurant);
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

        daoService.deleteRestaurant = function (restaurant)
        {
            //locate the restaurant by walking the array
            //
            //splice it out
            //setUpRestaurantList();

            var idx = -1;
            var resCollection =  this.getAllRestaurants() ;
            for(i=0;i<resCollection.length;i++)
            {
                if (resCollection[i].id === restaurant.id)
                {
                    idx = i;
                    break;
                }
            }
            if (idx > -1)
            {
                resCollection.splice(idx,1);
                setUpRestaurantList();
            }


        }
        setUpRestaurantList();
        return daoService;
    };
    restaurantDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('restaurantDAOService', restaurantDAOService);

}());


