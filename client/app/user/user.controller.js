(function () {
    'use strict';

    angular.module('app.user')
        .controller('manageUserCtrl', ['$scope', 'dropdownlistService', manageUserCtrl])
        .controller('addUserCtrl', ['$scope', 'dropdownlistService', addUserCtrl])
        .controller('editUserCtrl',['$scope', 'dropdownlistService', editUserCtrl])
        .controller('changePasswordCtrl', ['$scope', changePasswordCtrl]);

    function manageUserCtrl($scope, dropdownlistService) {

        //variable
        $scope.model = {
            pageIndex: 1,
            userId: "",
            userName: "",
            roleId: 0,
            statusId: "0",
            branchId: null
        }
        $scope.ddlBranches = {};

        //test data
        $scope.data = {
            pageIndex: 1,
            totalItems: 2,
            itemPerPage: 15,
            userViews: [{
                userId: "user1",
                userName: "นายช่าง เชี่ยวชาญ",
                statusId: "A",
                userRole: [],
                userBranches: "สาขาแจ้งวัฒนะ"
            }, {
                userId: "user2",
                userName: "นายชำนาญ การช่าง",
                statusId: "A",
                userRole: [],
                userBranches: "สาขาแจ้งวัฒนะ"
            }]
        };

        //function
        $scope.search = search;

        //initial
        $scope.ddlBranches = dropdownlistService.ddlBranches(0);
        // console.log($scope.ddlBranches);

        function search() {
            
        }
    }

    function addUserCtrl($scope, dropdownlistService) {

        //variable
        $scope.model = {};
        $scope.ddlBranches = {};

        //function
        $scope.add = add;

        //initial
        $scope.ddlBranches = dropdownlistService.ddlBranches(0);

        function add() {

            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) return;
        }
    }

    function editUserCtrl($scope, dropdownlistService){
        //variable
        $scope.model = {};
        $scope.ddlBranches

        //function
        $scope.save = save;

        //initial
        $scope.ddlBranches = dropdownlistService.ddlBranches(0);

        //test data
        $scope.model = {
            userId: "user1",
            userName: "user 1",
            branchId: 1
        }

        function save(){

        }
    }

    function changePasswordCtrl($scope){
        //variable
        $scope.model = {};

        //test data
        $scope.model = {
            userName: "นายช่าง เชี่ยวชาญ",
            userId: "user1"
        };
    }
})();