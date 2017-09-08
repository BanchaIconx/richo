(function () {
    'use strict';

    angular.module('app.page')
        .controller('authCtrl', ['$scope', '$rootScope', '$state', 'authenService', '$sessionStorage', authCtrl])
        .controller('menuCtrl', ['$scope', '$rootScope', '$sessionStorage', menuCtrl]);

    function authCtrl($scope, $rootScope, $state, authenService, $sessionStorage) {
        //varialble
        $scope.error = {
            isError: false,
            errorMsg: ""
        };
        $scope.model = {
            userId: "",
            password: ""
        };
        $sessionStorage.user = undefined;

        //function
        $scope.signin = signin;

        function signin() {
            $rootScope.menuGroup = undefined;
            
            //if not null
            if (!!$scope.model.userId && !!$scope.model.password) {
                authenService.login($scope.model, function (response) {
                    $sessionStorage.user = response.data;
                    // console.log($sessionStorage.user);
                    //set up menu
                    // $rootScope.menuGroup = $sessionStorage.user.role.allowMenuFunctions[0].menuFunctions;
                    $rootScope.userRole = $sessionStorage.user.roleId;
                    console.log($sessionStorage.user);
                    //go to default page
                    if($rootScope.userRole == 1){
                        // สาขา
                        $state.go('pm/branch/all');
                    }else{
                        //สำนักงานใหญ่
                        $state.go('pm/contract/all');
                    }
                })
            } else {
                setMessageError("กรูณากรอกข้อมูลให้ครบถ้วน");
            }
        }

        function setMessageError(msg) {
            $scope.error.isError = true;
            $scope.error.errorMsg = msg;
        }
    }

    function menuCtrl($scope, $rootScope, $sessionStorage){
        if($sessionStorage.user != undefined){
            $rootScope.userRole = $sessionStorage.user.roleId;
        }
    }

})();



