(function () {

    var initialController = function ($scope, $log, listFactory) {



        $scope.userList = listFactory.userList;
        $scope.currentUser = {};
        $scope.currentUser = listFactory.currentUser;

        $scope.saveClick = function()
        {
            listFactory.saveClick($scope.currentUser);
        }

        $scope.changeUser = function (event, user)
        {
             //$log.log(event);
            //$log.log(user.id);
            listFactory.setCurrentUser(user);
            $scope.currentUser = listFactory.scatterCurrentUser();
            //$log.log("scatter "+$scope.currentUser.name);
        };

        $scope.currentRowIndicator = function (user)
        {

            return listFactory.getCurrentRowCSS(user);
        };

         

    }

    initialController.$inject = ['$scope', '$log', 'listFactory'];
    angular.module('listApp')
            .controller('initialController', initialController);

}());