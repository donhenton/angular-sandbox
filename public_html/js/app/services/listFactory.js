/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function () {
    var listFactory = function ($log,messageFactory) {

        var factory = {};
        factory.userList = null;
        factory.callThisOnUserChange = null;
        factory.currentUser = {'name': '', 'address': '', 'id': 0, is_current: false};
        factory.userListIndex = {} // list of users by id
        $log.log("m "+messageFactory);
 
        factory.resetCurrentStatus = function ()
        {

            this.userList.forEach(function (user)
            {
                user.is_current = false;
            });
        };
        factory.setCurrentUser = function (user)
        {
            this.resetCurrentStatus();
            user.is_current = true;
            factory.currentUser = user;
            factory.callThisOnUserChange(user);

        };

        factory.getCurrentRowCSS = function (user)
        {

            if (user.is_current)
                return "currentUserRow";
            else
                return null;


        };

        factory.gatherUser = function (user)
        {
           
            this.loadUser(this.currentUser,user);
        };

        factory.scatterCurrentUser = function ()
        {
            var destUser = {};
            var sourceUser = this.currentUser;
            this.loadUser(destUser, sourceUser);
            return destUser;
        };

        factory.loadUser = function(destUser, sourceUser)
        {
            destUser.name = sourceUser.name;
            destUser.address = sourceUser.address;
            destUser.is_current = sourceUser.is_current;
            destUser.id = sourceUser.id;
        }

        factory.saveClick = function (newUser)
        {
            if (this.currentUser.id > 0)
            {
                var lookup = factory.userListIndex[newUser.id];
                this.loadUser(lookup, newUser);

            }
        };

        //this would be a service call
        factory.getUserList = function ()
        {
            var users =
                    [{'name': 'Ashley', 'address': 'Robinson', 'id': 1, is_current: false},
                        {'name': 'Alister', 'address': 'Crowley', 'id': 2, is_current: false},
                        {'name': 'Buzz', 'address': 'Lightyear', 'id': 3, is_current: false},
                        {'name': 'Mannie', 'address': 'Mota', 'id': 4, is_current: false}
                    ];

            this.userList = users;
        };
        //init the system
        factory.setUpUserList = function ()
        {
            this.userList.forEach(function (user)
            {
                factory.userListIndex[user.id] = user;


            });

        };

        factory.getUserList();
        factory.setUpUserList();


        return factory;
    };

    listFactory.$inject = ['$log','messageFactory'];

    angular.module('listApp').factory('listFactory', listFactory);


}());