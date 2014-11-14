(function () {

    var reviewDAOService = function ($log,$http) {

        var daoService = {};
        
       daoService.addReview = function(currentRestaurant,newReview) 
       {
           
           
            $http.post(g_restaurantUrlBase+"/review/"+currentRestaurant.id, r).
                    success(function (data, status, headers, config) {
                        this.getAllRestaurants().unshift(r);
                        r.reviewDTOs = [];
                        r.id = data.id;
                    }).
                    error(function (data, status, headers, config) {
                        errorMessage = data.message;
                    });
           
           currentRestaurant.reviewDTOs.push(newReview);
          
       }
       
       daoService.saveReview = function(currentRestaurant,newReview) 
       {
            
       }
       
       daoService.removeReview = function(currentRestaurant,newReview) 
       {
            
       }
       
        return daoService;
    };
    reviewDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('reviewDAOService', reviewDAOService);

}());


