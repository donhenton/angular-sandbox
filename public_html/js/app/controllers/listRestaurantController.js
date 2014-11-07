(function () {

    var listRestaurantController = function ($scope, $log, restaurantFactory,messageFactory) {

        $log.log("in list");

        $scope.restaurantList = restaurantFactory.restaurantList;
         

        $scope.changeRestaurant = function (event, restaurant)
        {

            restaurantFactory.changeRestaurant(restaurant);
           
        };

            

    }

    listRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory','messageFactory'];
    angular.module('restaurantApp')
            .controller('listRestaurantController', listRestaurantController);
    
    
    
     

}());