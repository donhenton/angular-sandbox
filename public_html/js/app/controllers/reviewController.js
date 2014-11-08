(function () {

    var reviewController = function ($scope, $log, reviewFactory, messageFactory) {

         

        //live copy is passed in need to make a copy
        var newRestaurantHandler = function (restaurant)
        {
             
            reviewFactory.changeRestaurant(restaurant);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();

        }

        var deleteRestaurantHandler = function (restaurant)
        {

            reviewFactory.changeRestaurant(null);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();

        }
        var resetReviews = function ()
        {
            $scope.currentReviews.forEach(function (r)
            {
                r.isEditing = false;
            }
            );
        }

        messageFactory.subscribe(newRestaurantHandler, "ON_RESTAURANT_CHANGE");
        messageFactory.subscribe(deleteRestaurantHandler,"ON_RESTAURANT_DELETE");
        
        
        $scope.editReview = function (review)
        {
            resetReviews();
            review.isEditing = true;
        }
        $scope.saveReviewEdit = function (review)
        {
            review.isEditing = true;
        }
        $scope.cancelReviewEdit = function (review)
        {
            // review.isEditing=true;
            resetReviews();
        }
    }
    reviewController.$inject = ['$scope', '$log', 'reviewFactory', 'messageFactory', 'restaurantFactory'];
    angular.module('restaurantApp')
            .controller('reviewController', reviewController);

}());


