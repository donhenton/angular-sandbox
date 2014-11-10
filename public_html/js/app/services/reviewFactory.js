/**
 * 
 * the factory that handles restaurant business logic
 * 
 */


(function () {
    var reviewFactory = function ($log, messageFactory, restaurantDAOService,reviewDAOService) {

        var factory = {};
        var currentRestaurant = null;
        
        factory.hasCurrentRestaurant =function()
        {
            if (currentRestaurant == null)
                return false;
            else
                return true;
        }
        
        factory.transferReview = function(from, to)
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

        factory.createEmptyReview = function(parentId)
        {
            var to = {};
            to.id = 0;
            to.parentRestaurantId = parentId;
            to.reviewListing = "";
            to.stampDate = (new Date()).getTime(); ;
            to.starRating = 2;
            to.isEditing = false;
            return to;
            
        }
        factory.changeRestaurant = function (restaurant)
        {
            currentRestaurant = restaurant;
        }
        
        factory.addReview = function(newReview)
        {
            var errorMessage = null;
            errorMessage = reviewDAOService.addReview(currentRestaurant,newReview);
            return errorMessage;
        }
        
        factory.saveReviewEdit = function(newReview)
        {
            var reviews = currentRestaurant.reviewDTOs;
            for (var i=0;i<reviews.length;i++)
            {
                if (reviews[i].id === newReview.id)
                {
                    factory.transferReview(newReview,reviews[i]);
                    break;
                }
            }
            
            
            
            var errorMessage = 
            reviewDAOService.saveReview(currentRestaurant,newReview);
            return errorMessage;
        }
        
        factory.deleteReview = function(newReview)
        {
            var reviews = currentRestaurant.reviewDTOs;
            for (var i=0;i<reviews.length;i++)
            {
                if (reviews[i].id === newReview.id)
                {
                    reviews.splice(i,1);
                    break;
                }
            }
            
            
            
            var errorMessage = 
            reviewDAOService.saveReview(currentRestaurant,newReview);
            return errorMessage;
        }

        factory.scatterCurrentReviews = function ()
        {
            var scatteredReviews = [];
             
            if (currentRestaurant == null)
            {
              // $log.log("current res null in reviewFactory")
                return [];
            }
            
             currentRestaurant.reviewDTOs.forEach(function(rev)
                {
                    var newRev = {};
                     
                    factory.transferReview(rev,newRev);
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