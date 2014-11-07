/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var reviewFactory = function ($log, messageFactory, restaurantDAOService) {

        var factory = {};
        var currentRestaurant = null;
        
        function transferReview(from, to)
        {
            to.id = from.id;
            to.parentRestaurantId = from.parentRestaurantId;
            to.reviewListing = from.reviewListing;
            to.stampDate = from.stampDate;
            to.starRating = from.starRating;
            if (typeof from.isEditing == 'undefined')
            {
                from.isEditing = false;
            }
            to.isEditing = from.isEditing;
        }

        factory.changeRestaurant = function (restaurant)
        {
            this.currentRestaurant = restaurant;
        }

        factory.scatterCurrentReviews = function ()
        {
            var scatteredReviews = [];

            this.currentRestaurant.reviewDTOs.forEach(function(rev)
                {
                    var newRev = {};
                    new
                    transferReview(rev,newRev);
                    scatteredReviews.push(newRev);
                }
            )

            return   scatteredReviews;
        }

        return factory;
    };

    reviewFactory.$inject = ['$log', 'messageFactory', 'restaurantDAOService'];

    angular.module('restaurantApp').factory('reviewFactory', reviewFactory);


}());