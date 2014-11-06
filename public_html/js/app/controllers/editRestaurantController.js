(function () {

    var editRestaurantController = function ($scope, $log, restaurantFactory,messageFactory) {

        $log.log("in editRestaurant")
        
        
        var newRestaurantHandler = function(restaurant)
        {
            
            $scope.currentRestaurant = restaurantFactory.scatterCurrentRestaurant(); 
             
        }
    
        $scope.saveClick = function()
        {
            restaurantFactory.saveClick($scope.currentRestaurant);
        }
        
        messageFactory.subscribe(newRestaurantHandler,"ON_RESTAURANT_CHANGE");
    }

    editRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory','messageFactory'];
    angular.module('restaurantApp')
            .controller('editRestaurantController', editRestaurantController);
    
    

}());