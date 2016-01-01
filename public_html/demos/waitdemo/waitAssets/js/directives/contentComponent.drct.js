angular.module('waitApp').directive('contentComponent',
        function ($log) {


            return {
                restrict: 'E',
                template: '<div class="contentComponent">{{dataDisplay()}}</div>',
                scope: {
                    "datavalue": '=',
                    "loading": '='
                },
                compile: function (element, attributes)
                {


                    var linkFunction = function ($scope, element, attributes) {

                        // initialize the labels done here as controller 
                        // doesn't quite have access to info 
                        // from the scope attrs
                        $scope.dataDisplay = function ()
                        {

                            var displayVar = "";

                            if ($scope.loading === false)
                            {
                                displayVar = $scope.datavalue;

                            } 
                            //$log.debug('display "'+ displayVar +'" '+$scope.datavalue +" "+ $scope.loading)
                            return displayVar;
                        }

                    };

                    return linkFunction;
                },
                controller: function ($scope, $attrs, $element) {

                }
            }
        });

