/**
 * 
 *  
 *  the main conroller of the page
 */
angular.module('waitApp')

        .controller('SectionCtrl', function ($scope, $log, $timeout)
        {
            var vm = this;

            vm.successAction = function ()
            {
                $log.debug("did success")
                vm.loading = true;
                vm.error = false;
                vm.data = [1,2,3,4];

                $timeout(function () {
                    vm.loading = false;
                    vm.error = false;
                    $log.debug("did change");
                    angular.forEach(vm.data, function (data, idx)
                    {
                        vm.data[idx] = vm.data[idx] * 10;

                    })

                }, 2000)
            }
            
            vm.failureAction = function ()
            {
                $log.debug("did failure")
                vm.loading = true;
                vm.error = false;
                vm.data = [1,2,3,4];
                vm.errorMessage="Server Error: Try again later"

                $timeout(function () {
                    vm.loading = false;
                    vm.error = true;
                    $log.debug("did change");
                    angular.forEach(vm.data, function (data, idx)
                    {
                        vm.data[idx] = vm.data[idx] * 10;

                    })

                }, 2000)
            }
            
            vm.successAction();
        });


