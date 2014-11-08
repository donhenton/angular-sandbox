(function () {

    var editRestaurantController = function ($scope, $log, restaurantFactory, messageFactory) {

        $scope.recordPresent = false;
        $scope.canAdd = true;
        var newRestaurantHandler = function (restaurant)
        {

            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = true;
        }

        $scope.addNewRestaurant = function ()
        {
            $scope.currentRestaurant = restaurantFactory.createEmptyRestaurant();
            $scope.recordPresent = true;
            $scope.canAdd = false;
        }
        var deleteRestaurantHandler = function (restaurant)
        {

            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
            $scope.recordPresent = false;
            $scope.canAdd = true;
        }

        $scope.cancelClick = function ()
        {

            if (typeof $scope.currentRestaurant.id === 'undefined'
                    || $scope.currentRestaurant.id == 0)
            {
                //add mode
                $scope.recordPresent = false;
                
            }
            else
            {
                restaurantFactory.restore();
                $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant();
                
            }
            $scope.canAdd = true;
            messageFactory.raiseEvent("","ON_ERROR");
        }

        $scope.saveClick = function ()
        {
            var success = restaurantFactory.saveRestaurant($scope.currentRestaurant);
            if (success)
            {
                $scope.canAdd = true;
                $scope.recordPresent = false;
            }
            else
            {
                //
            }

        }
        messageFactory.subscribe(newRestaurantHandler, "ON_RESTAURANT_CHANGE");
        messageFactory.subscribe(deleteRestaurantHandler, "ON_RESTAURANT_DELETE");
    }

    editRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory', 'messageFactory'];
    angular.module('restaurantApp')
            .controller('editRestaurantController', editRestaurantController);



}());