(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$location', '$document', 'appConfig', '$sessionStorage', AppCtrl]); // overall control

    function AppCtrl($scope, $rootScope, $state, $location, $document, appConfig, $sessionStorage) {

        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;

        $scope.$watch('main', function (newVal, oldVal) {
            // if (newVal.menu !== oldVal.menu || newVal.layout !== oldVal.layout) {
            //     $rootScope.$broadcast('layout:changed');
            // }

            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
                $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
                if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                    $scope.main.fixedHeader = true;
                    $scope.main.fixedSidebar = true;
                }
                if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                    $scope.main.fixedHeader = false;
                    $scope.main.fixedSidebar = false;
                }
            }
            if (newVal.fixedSidebar === true) {
                $scope.main.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
                $scope.main.fixedSidebar = false;
            }
        }, true);


        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });
    }
})();

(function () {
    'user stict';

    angular.module('app').run(['$rootScope', '$location', '$state', '$sessionStorage', function ($rootScope, $location, $state, $sessionStorage) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

            if (toState.name == 'signin')
                return;
            // now, redirect only not authenticated
            if ($sessionStorage.user == undefined) {

                $location.path('/signin');
            }
        });
        $rootScope.getUserId = function () {
            //  $sessionStorage.user == undefined ? "" : $sessionStorage.user.userName;
            var txt = "";
            if($sessionStorage.user != undefined){
                txt += $sessionStorage.user.userName;
                if($sessionStorage.user.roleId == 1){
                    //สาขา
                    txt += " ("+$sessionStorage.user.branch.ricohBranchName+") ";
                }else{
                    //สำนักงานใหญ่
                    txt += " (สำนักงานใหญ่) ";
                }
            }
            return txt;
        }
    }]);
})();