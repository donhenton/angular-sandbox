(function () {

    var editRestaurantController = function ($scope, $log, listFactory,messageFactory) {

        $log.log("in editRestaurant")
        
        
        var newRestaurantHandler = function(restaurant)
        {
            
            $scope.currentRestaurant = listFactory.scatterCurrentRestaurant(); 
             
        }
    
        $scope.saveClick = function()
        {
            listFactory.saveClick($scope.currentRestaurant);
        }
        
        messageFactory.subscribe(newRestaurantHandler,"ON_RESTAURANT_CHANGE");
    }

    editRestaurantController.$inject = ['$scope', '$log', 'restaurantFactory','messageFactory'];
    angular.module('restaurantApp')
            .controller('editRestaurantController', editRestaurantController);
    
    

}());