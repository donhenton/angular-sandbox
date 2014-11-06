(function () {

    var editUserController = function ($scope, $log, listFactory) {

        $log.log("edituser controller")
        var nameChangeHandler = function(user)
        {
            $log.log("handler "+user.name);
        }
        listFactory.setOnUserChange(nameChangeHandler);
        
        $scope.currentUser = listFactory.scatterCurrentUser();

        $scope.saveClick = function()
        {
            listFactory.saveClick($scope.currentUser);
        }

      

         

    }

    editUserController.$inject = ['$scope', '$log', 'listFactory'];
    angular.module('listApp')
            .controller('editUserController', editUserController);
    
    console.log("editUserController")

}());