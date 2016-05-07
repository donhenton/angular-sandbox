/**
 * 
 *  
 *  the main conroller of the page
 */
angular.module('waitApp')

 
        .config(function ($locationProvider)
        {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            }).hashPrefix("!");
        })
 

        .controller('SectionCtrl', function ($scope, $log, $timeout, $location)
        {
            var vm = this;
            vm.searchInfo = JSON.stringify($location.search());
            vm.searchCollection = $location.search();
             
            vm.displayBanner = function ()
            {
                vm.showBanner = true;

                $timeout(function () {
                    vm.removeBanner();

                }, 60000);
            }


            vm.removeBanner = function ()
            {
                vm.showBanner = false;
            }

            vm.successAction = function ()
            {
                $log.debug("did success")
                vm.loading = true;
                vm.error = false;
                vm.data = [1, 2, 3, 4];
 
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
                vm.data = [1, 2, 3, 4];
                vm.errorMessage = "Server Error: Try again later"
                vm.displayBanner();
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
            if (vm.searchCollection["showBanner"])
            {
                 vm.displayBanner();
            }
            else
            {
                vm.showBanner = false;
            }
        });


