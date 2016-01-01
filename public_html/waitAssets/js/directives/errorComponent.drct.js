angular.module('waitApp').directive('errorComponent',
        function ($log) {

            return {
                template: '<div class="waitComponent">' +
                        '<div class="waitMessage">' +
                        '<ng-transclude>' +
                        'Unable to retrieve data' +
                        '</ng-transclude>' +
                        '</div></div>',
                restrict: 'E',
                transclude: true,
                scope: {}

            };
        });