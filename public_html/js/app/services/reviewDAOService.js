(function () {

    var reviewDAOService = function ($log) {

        var daoService = {};
        
       daoService.addReview = function(currentRestaurant,newReview) 
       {
          // console.log(currentRestaurant.reviewDTOs);
           //console.log(newReview);
           currentRestaurant.reviewDTOs.push(newReview);
          // console.log(currentRestaurant.reviewDTOs);
       }
       
       daoService.saveReview = function(currentRestaurant,newReview) 
       {
           //console.log(currentRestaurant.reviewDTOs);
           //console.log(newReview);
           //currentRestaurant.reviewDTOs.push(newReview);
           //console.log(currentRestaurant.reviewDTOs);
       }
       
       
       
        return daoService;
    };
    reviewDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('reviewDAOService', reviewDAOService);

}());


