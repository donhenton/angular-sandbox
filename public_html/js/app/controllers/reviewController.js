(function () {

    var reviewController = function ($scope, $log, reviewFactory, messageFactory) {

        $scope.hasCurrentRestaurant = function()
        {
            return reviewFactory.hasCurrentRestaurant();
        }

        //live copy is passed in need to make a copy
        var newRestaurantHandler = function (restaurant)
        {
             
            reviewFactory.changeRestaurant(restaurant);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
            $scope.isAdding = false;
            resetReviews(); 

        }

        
        var deleteRestaurantHandler = function (restaurant)
        {

            reviewFactory.changeRestaurant(null);
            $scope.currentReviews = reviewFactory.scatterCurrentReviews();
            $scope.isAdding = false;
            resetReviews(); 

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
        
        
        $scope.isAdding = false;
        
        $scope.addNewReview = function ()
        {
            $scope.isAdding = true;
        }
        $scope.cancelNewReview = function ()
        {
            $scope.isAdding = false;
        }
        
        $scope.editReview = function (review)
        {
            resetReviews();
            review.isEditing = true;
            $scope.isAdding = false;
        }
        $scope.saveReviewEdit = function (review)
        {
            review.isEditing = true;
            $scope.isAdding = false;
        }
        $scope.cancelReviewEdit = function (review)
        {
            $scope.isAdding = false;
            resetReviews();
        }
    }
    reviewController.$inject = ['$scope', '$log', 'reviewFactory', 'messageFactory', 'restaurantFactory'];
    angular.module('restaurantApp')
            .controller('reviewController', reviewController);

}());


