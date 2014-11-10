(function () {

    var listRestaurantController = function ($scope, $log, restaurantFactory, messageFactory) {



        $scope.restaurantList = restaurantFactory.getRestaurantList();
        $scope.errorMessage = "";

        $scope.changeRestaurant = function (event, restaurant)
        {

            restaurantFactory.changeRestaurant(restaurant);
            onError("");

        };

        var onError = function (message)
        {

            $scope.errorMessage = message;

        };

        $scope.deleteRestaurant = function (restaurant)
        {
            //confirm dialog
            //$log.log("delete restaurant")
            restaurantFactory.changeRestaurant(restaurant);
            var r = window.confirm("Do you wish to delete '"
                    + restaurant.name + "'?")
            if (r == true) {
                //$log.log("peform delete " + restaurant.name);
                restaurantFactory.deleteRestaurant(restaurant);
            }
        };
        messageFactory.subscribe(onError, "ON_ERROR");
    }

    listRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory', 'messageFactory'];
    angular.module('restaurantApp')
            .controller('listRestaurantController', listRestaurantController);





}());