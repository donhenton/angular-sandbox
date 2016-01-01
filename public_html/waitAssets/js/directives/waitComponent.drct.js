/**
 * component that display a waiting indicator 
 * Element level
 * Text inside the element is the message
 * defaults to 'Loading
 *  
 */

angular.module('waitApp').directive('waitComponent',
        function ($log) {

            return {
                template: '<div class="waitComponent">' +
                        '<div>' +
                        '<img class="waitImage"  '+
                        'src="waitAssets/images/ajax-loader-dashboard_30.gif">' +
                        '</div>' +
                        '<div class="waitMessage">' +
                        '<ng-transclude>' +
                        'Loading...' +
                        '</ng-transclude>' +
                        '</div></div>',
                restrict: 'E',
                transclude: true,
                scope: {}

            };
        });