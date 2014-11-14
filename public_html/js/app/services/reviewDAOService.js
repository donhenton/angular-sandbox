(function () {

    var reviewDAOService = function ($log,$http) {

        var daoService = {};
        
       daoService.addReview = function(currentRestaurant,newReview) 
       {
           
            var errorMessage = null;
            $http.post(g_restaurantUrlBase+"review/"+currentRestaurant.id, newReview).
                    success(function (data, status, headers, config) {
                        this.getAllRestaurants().unshift(newReview);
                        newReview.reviewDTOs = [];
                        newReview.id = data.id;
                    }).
                    error(function (data, status, headers, config) {
                        errorMessage = data.message;
                    });
           
           currentRestaurant.reviewDTOs.push(newReview);
          
       }
       
       daoService.saveReview = function(currentRestaurant,newReview) 
       {
            var saveURL = g_restaurantUrlBase+"review/"+currentRestaurant.id +
                    "/"+newReview.id;
            return $http.put(saveURL, newReview).
                    success(function (data, status, headers, config) {
                        
                    });
       }
       
       daoService.deleteReview = function(currentRestaurant,newReview) 
       {
            var deleteURL = g_restaurantUrlBase+"review/"+currentRestaurant.id +
                    "/"+newReview.id;
            return $http.delete(deleteURL);
                     
       }
       
        return daoService;
    };
    reviewDAOService.$inject = ['$log'];

    angular.module('restaurantApp').factory('reviewDAOService', reviewDAOService);

}());


