(function () {

    var editUserController = function ($scope, $log, listFactory,messageFactory) {

        $log.log("in edituser")
        
        
        var nameChangeHandler = function(u )
        {
            //don't use u for currentUser as it is a live ref
            // not a copy, just here for param demonstration
            $scope.currentUser = listFactory.scatterCurrentUser(); 
            $log.log("called name change handler "+u.name)
        }
       // listFactory.callThisOnUserChange = nameChangeHandler;
       // listFactory.setOnUserChange(nameChangeHandler);
        $scope.saveClick = function()
        {
            listFactory.saveClick($scope.currentUser);
        }
        
        messageFactory.subscribe(nameChangeHandler,"ON_USER_CHANGE");
    }

    editUserController.$inject = ['$scope', '$log', 'listFactory','messageFactory'];
    angular.module('listApp')
            .controller('editUserController', editUserController);
    
    

}());