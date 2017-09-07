(function () {
    'use strict';

    angular.module('app.page')
        .controller('authCtrl', ['$scope', '$state', authCtrl]);

    function authCtrl($scope, $state) {

        //varialble
        $scope.error = {
            isError: false,
            errorMsg: ""
        };
        $scope.model = {
            userId: "",
            password: ""
        };

        //function
        $scope.signin = signin;

        function signin() {
            //if not null
            if (!!$scope.model.userId && !!$scope.model.password) {
                $state.go('pm/contract/all');
            } else {
                setMessageError("กรูณากรอกข้อมูลให้ครบถ้วน");
            }
        }

        function setMessageError(msg){
            $scope.error.isError = true;
            $scope.error.errorMsg = msg;
        }
    }

})();



