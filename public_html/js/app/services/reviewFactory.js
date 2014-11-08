/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var reviewFactory = function ($log, messageFactory, restaurantDAOService,reviewDAOService) {

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
            currentRestaurant = restaurant;
        }

        factory.scatterCurrentReviews = function ()
        {
            var scatteredReviews = [];
             
            if (currentRestaurant == null)
            {
               $log.log("current res null in reviewFactory")
                return [];
            }
            
             currentRestaurant.reviewDTOs.forEach(function(rev)
                {
                    var newRev = {};
                     
                    transferReview(rev,newRev);
                    newRev.parentRestaurantId = currentRestaurant.id
                    scatteredReviews.push(newRev);
                }
            )

            return   scatteredReviews;
        }

        return factory;
    };

    reviewFactory.$inject = ['$log', 'messageFactory', 'restaurantDAOService','reviewDAOService'];

    angular.module('restaurantApp').factory('reviewFactory', reviewFactory);


}());