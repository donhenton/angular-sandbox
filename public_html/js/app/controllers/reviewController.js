(function () {

    var reviewController = function ($scope, $log, reviewFactory, messageFactory ) {

        $log.log("in review")

        //live copy is passed in need to make a copy
        var newRestaurantHandler = function (restaurant)
        {
            
            reviewFactory.changeRestaurant(restaurant);
            $scope.currentReviews =  reviewFactory.scatterCurrentReviews();
   
        }

        messageFactory.subscribe(newRestaurantHandler,"ON_RESTAURANT_CHANGE");
        
        $scope.editReview = function(review)
        {
            review.isEditing=true;
        }
        
    }
    reviewController.$inject = ['$scope', '$log', 'reviewFactory', 'messageFactory','restaurantFactory'];
    angular.module('restaurantApp')
            .controller('reviewController', reviewController);

}());


