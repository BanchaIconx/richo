(function () {
    'use strict';

    angular.module('app.page')
        .controller('authCtrl', ['$scope', '$rootScope', '$state', 'userService', '$sessionStorage', authCtrl])
        .controller('menuCtrl', ['$scope', '$rootScope', '$sessionStorage', menuCtrl])
        .controller('page404Ctrl', ['$scope', '$sessionStorage', page404Ctrl]);

    function authCtrl($scope, $rootScope, $state, userService, $sessionStorage) {
        //varialble
        $scope.error = {
            isError: false,
            errorMsg: ""
        };
        $scope.model = {
            userId: "",
            password: ""
        };
        $sessionStorage.$reset();
        //function
        $scope.signin = signin;

        function signin() {
            $rootScope.menuGroup = undefined;
            if($scope.submitForm.$invalid){
                angular.element('input.ng-invalid').first().focus();
            }

            //if not null
            if (!!$scope.model.userId && !!$scope.model.password) {
                userService.login($scope.model, function (response) {
                    $sessionStorage.user = response.data;
                    //set up menu
                    $rootScope.menuGroup = $sessionStorage.user.role.allowMenuFunctions[0].menuFunctions;
                    $rootScope.userRole = $sessionStorage.user.roleId;
                    //go to default page
                    if ($rootScope.userRole == 1) {
                        // สาขา
                        $state.go('pm/add');
                    } else {
                        //สำนักงานใหญ่
                        $state.go('pm/contract/all');
                    }
                })
            } else {
                setMessageError("กรุณากรอกข้อมูลให้ครบถ้วน");
            }
        }

        function setMessageError(msg) {
            $scope.error.isError = true;
            $scope.error.errorMsg = msg;
        }
    }

    function menuCtrl($scope, $rootScope, $sessionStorage) {
        if ($sessionStorage.user != undefined) {
            // $rootScope.userRole = $sessionStorage.user.roleId;
            $rootScope.menuGroup = $sessionStorage.user.role.allowMenuFunctions[0].menuFunctions;
        }
    }

    function page404Ctrl($scope, $sessionStorage) {
        //variable
        $scope.backUrl = "";

        //initial
        if($sessionStorage.user.roleId == 1){
            //สาขา
            $scope.backUrl = "#/pm/add";
        }else{
            //สำนักงานใหญ่
            $scope.backUrl = "#/pm/contract/all";
        }
    }
})();



