/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var listFactory = function ($log) {

        var factory = {};
        factory.userList = null;

        factory.resetCurrentStatus = function ()
        {
             
            this.userList.forEach(function(user) 
            {
                user.is_current = false;
            })
        }
        factory.setCurrentUser = function (user)
        {
            this.resetCurrentStatus();
            user.is_current = true;
            factory.currentUser = user;

        }
        
         factory.getCurrentRowCSS = function (user)
        {
             
            if (user.is_current)
                return "currentUserRow";
            else
                return null;
            
             
        }
        

        factory.getUserList = function ()
        {
            var users =
                    [{'name': 'Ashley', 'address': 'Robinson', 'id': 1, is_current: false},
                        {'name': 'Alister', 'address': 'Crowley', 'id': 2, is_current: false},
                        {'name': 'Buzz', 'address': 'Lightyear', 'id': 3, is_current: false},
                        {'name': 'Mannie', 'address': 'Mota', 'id': 4, is_current: false},
                    ];

            this.userList = users;
        }
        //init the system
        
        factory.currentUser = {'name': '', 'address': '', 'id': 0, is_current: false};
        factory.getUserList();

        return factory;
    };

    listFactory.$inject = ['$log'];

    angular.module('listApp').factory('listFactory', listFactory);


}());