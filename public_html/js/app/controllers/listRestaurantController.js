(function () {

    var listRestaurantController = function ($scope, $log, listFactory,messageFactory) {

        $log.log("in list");

        $scope.restaurantList = listFactory.restaurantList;
         

        $scope.changeRestaurant = function (event, restaurant)
        {

            listFactory.setCurrentRestaurant(restaurant);
            messageFactory.raiseEvent(restaurant,"ON_RESTAURANT_CHANGE");
           
        };

        $scope.currentRowIndicator = function (restaurant)
        {

            return listFactory.getCurrentRowCSS(restaurant);
        };

         

    }

    listRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory','messageFactory'];
    angular.module('restaurantApp')
            .controller('listRestaurantController', listRestaurantController);
    
    
    
     

}());