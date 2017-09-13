(function () {
    'use strict';

    angular.module('app.user')
        .controller('manageUserCtrl', ['$scope', 'dropdownlistService', 'userService', manageUserCtrl])
        .controller('addUserCtrl', ['$scope', 'dropdownlistService', 'alertModalFactory', 'userService', '$sessionStorage', addUserCtrl])
        .controller('editUserCtrl', ['$scope', 'dropdownlistService', '$stateParams', '$sessionStorage', 'userService' ,'alertModalFactory', editUserCtrl])
        .controller('changePasswordCtrl', ['$scope', '$sessionStorage', 'userService', 'alertModalFactory', changePasswordCtrl]);

    function manageUserCtrl($scope, dropdownlistService, userService) {

        //variable
        $scope.model = {
            pageIndex: 1,
            userId: "",
            userName: "",
            statusId: "0",
            branchId: null
        }
        $scope.ddlBranches = {};

        //function
        $scope.search = search;

        //initial
        dropdownlistService.getDdlBranches(0, function (response) {
            $scope.ddlBranches = response.data;
        })

        function search() {
            userService.postSearchUser($scope.model, function (response) {
                $scope.data = response.data;
            })
        }
    }

    function addUserCtrl($scope, dropdownlistService, alertModalFactory, userService, $sessionStorage) {

        //variable
        $scope.model = {};
        $scope.ddlBranches = {};

        //function
        $scope.add = add;

        //initial
        dropdownlistService.getDdlBranches(0, function (response) {
            $scope.ddlBranches = response.data;
        });
        dropdownlistService.getDdlRoles(function (response) {
            $scope.ddlRoless = response.data;
        })

        $scope.model = {
            createUserId: $sessionStorage.user.userId,
            lastUpdateUserId: $sessionStorage.user.userId,
            version: 1,
            statusId: 'A',
            userBranches: [],
            userRoles: []
        }

        function add() {

            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) return;

            if ($scope.model.password != $scope.model.confirmPassword) {
                alertModalFactory.danger("รหัสผ่านกับรหัสยืนยัน ไม่ตรงกัน");
                return;
            }

            // userService
            $scope.model.userRoles = [];
            $scope.model.userBranches = [];

            $scope.model.userRoles.push({
                userRoleId: 0,
                roleId: $scope.roleId,
                userId: $scope.model.userId
            });
            $scope.model.userBranches.push({
                userBranchId: 0,
                userId: $scope.model.userId,
                ricohBranchId: $scope.branchId
            });
            userService.postAddUser($scope.model, function (response){
                alertModalFactory.success("เพิ่มผู้ใช้เรียบร้อย", function(){
                    window.history.back();
                });
            })
        }
    }

    function editUserCtrl($scope, dropdownlistService, $stateParams, $sessionStorage, userService, alertModalFactory) {
        //variable
        $scope.model = {};
        $scope.ddlBranches

        //function
        $scope.save = save;
        $scope.cancelUser = cancelUser;

        //initial
        dropdownlistService.getDdlBranches(0, function (response) {
            $scope.ddlBranches = response.data;
        });
        dropdownlistService.getDdlRoles(function (response) {
            $scope.ddlRoless = response.data;
        });
        userService.getUserByUserId($stateParams.userId, function(response){
            $scope.model = response.data;
            $scope.model.lastUpdateUserId = $sessionStorage.user.userId;
        })

        function save() {
            //if field invalid return false
            if ($scope.submitForm.$invalid) return;

            userService.postUpdateUser($scope.model, function (response){
                alertModalFactory.success("บันทึกข้อมูลเรียบร้อย", function(){
                    window.history.back();
                });
            })
        }

        function cancelUser(){
            userService.postCancelUser($scope.model, function (response){
                alertModalFactory.success("ยกเลิกข้อมูลผู้ใช้เรียบร้อย", function(){
                    window.history.back();
                });
            })
        }
    }

    function changePasswordCtrl($scope, $sessionStorage, userService, alertModalFactory) {
        //variable
        $scope.model = {};
        $scope.user = {};

        //function
        $scope.save = save;

        //init
        $scope.user = {
            userId: $sessionStorage.user.userId
        }
        $scope.model = {
            userName: $sessionStorage.user.userName,
            userId: $sessionStorage.user.userId
        }

        function save() {
            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) return;

            userService.changePassword($scope.user, function (response) {
                alertModalFactory.success("เปลี่ยนรหัสผ่านเรียบร้อย", function () {
                    $scope.user = {
                        userId: $sessionStorage.user.userId
                    }
                });
            })
        }
    }
})();