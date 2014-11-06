(function () {

    var listRestaurantController = function ($scope, $log, restaurantFactory,messageFactory) {

        $log.log("in list");

        $scope.restaurantList = restaurantFactory.restaurantList;
         

        $scope.changeRestaurant = function (event, restaurant)
        {

            restaurantFactory.setCurrentRestaurant(restaurant);
           
        };

        $scope.currentRowIndicator = function (restaurant)
        {
            $log.log("in current row indicator for controller")
            return restaurantFactory.getCurrentRowCSS(restaurant);
        };

         

    }

    listRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory','messageFactory'];
    angular.module('restaurantApp')
            .controller('listRestaurantController', listRestaurantController);
    
    
    
     

}());