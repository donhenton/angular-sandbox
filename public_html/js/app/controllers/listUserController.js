(function () {

    var listUserController = function ($scope, $log, listFactory) {

        $log.log("in list");

        $scope.userList = listFactory.userList;
         

        $scope.changeUser = function (event, user)
        {

            listFactory.setCurrentUser(user);
            
           
        };

        $scope.currentRowIndicator = function (user)
        {

            return listFactory.getCurrentRowCSS(user);
        };

         

    }

    listUserController.$inject = ['$scope', '$log', 'listFactory'];
    angular.module('listApp')
            .controller('listUserController', listUserController);
    
    angular.module('listApp')
            .controller('editUserController');
    
     

}());