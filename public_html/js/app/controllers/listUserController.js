(function () {

    var listUserController = function ($scope, $log, listFactory,messageFactory) {

        $log.log("in list");

        $scope.userList = listFactory.userList;
         

        $scope.changeUser = function (event, user)
        {

            listFactory.setCurrentUser(user);
            messageFactory.raiseEvent(user,"ON_USER_CHANGE");
           
        };

        $scope.currentRowIndicator = function (user)
        {

            return listFactory.getCurrentRowCSS(user);
        };

         

    }

    listUserController.$inject = ['$scope', '$log', 'listFactory','messageFactory'];
    angular.module('listApp')
            .controller('listUserController', listUserController);
    
    
    
     

}());