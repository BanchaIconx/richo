(function () {
    'use strict';

    angular.module('app.equipment')
        .controller('manageEquipmentCtrl', ['$scope', 'dropdownlistService', manageEquipmentCtrl])
        .controller('addEquipmentCtrl', ['$scope', 'dropdownlistService', addEquipmentCtrl])
        .controller('editEquipmentCtrl', ['$scope', 'dropdownlistService', '$stateParams', editEquipmentCtrl]);

    function manageEquipmentCtrl($scope, dropdownlistService) {

    }

    function addEquipmentCtrl($scope, dropdownlistService) {

        //test data
        $scope.title = {
            t1: "CA POS 73 counters",
            t2: "เขตจตุจักร์ กรุงเทพมหานคร",
            t3: "10062 - ปณฝ.ห้วยขวาง"
        }
    }

    function editEquipmentCtrl($scope, dropdownlistService, $stateParams) {

        //test data
        $scope.title = {
            t1: "CA POS 73 counters",
            t2: "เขตจตุจักร์ กรุงเทพมหานคร",
            t3: "10062 - ปณฝ.ห้วยขวาง"
        };
    }
})();