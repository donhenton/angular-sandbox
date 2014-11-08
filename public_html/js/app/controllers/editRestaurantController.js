(function () {

    var editRestaurantController = function ($scope, $log, restaurantFactory, messageFactory) {

        var newRestaurantHandler = function (restaurant)
        {

            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = true;
        }
        var deleteRestaurantHandler = function (restaurant)
        {

            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = false;
        }

        $scope.cancelClick = function ()
        {
            $scope.currentRestaurant = restaurantFactory.restore();

        }

        $scope.saveClick = function ()
        {
            restaurantFactory.saveClick($scope.currentRestaurant);

        }
        messageFactory.subscribe(newRestaurantHandler, "ON_RESTAURANT_CHANGE");
        messageFactory.subscribe(deleteRestaurantHandler, "ON_RESTAURANT_DELETE");
    }

    editRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory', 'messageFactory'];
    angular.module('restaurantApp')
            .controller('editRestaurantController', editRestaurantController);



}());