(function () {
    'use strict';

    angular.module('app.pmByContract')
        .controller('allContrackCtrl', ['$scope', allContrackCtrl])
        .controller('byContractCtrl', ['$scope', byContractCtrl])
        .controller('byContractAndRegionCtrl', ['$scope', byContractAndRegionCtrl])
        .controller('byContractAndRegionAndOfficeCtrl', ['$scope', byContractAndRegionAndOfficeCtrl])

    function allContrackCtrl($scope) {

    }

    function byContractCtrl($scope) {
        //variable
        $scope.model = {};

        //test data
        $scope.model = {
            contractName: "CA POS 73 counters",
            total: 3000,
            success: 2000,
            remain: 1000
        };
    }

    function byContractAndRegionCtrl($scope) {
        //variable
        $scope.model = {};

        //test data
        $scope.model = {
            contractName: "CA POS 73 counters",
            regionName: "เขตจตุจักร กรุงเทพมหานคร",
            total: 200,
            success: 150,
            remain: 50
        };
    }

    function byContractAndRegionAndOfficeCtrl($scope) {
        //variable
        $scope.model = {};

        //test data
        $scope.model = {
            contractName: "CA POS 73 counters",
            regionName: "เขตจตุจักร กรุงเทพมหานคร",
            officeName: "00057 - เคาน์เตอร์บริการไปรษณีย์ตลาดนัดสวนจตุจักร",
            total: 3,
            success: 1,
            remain: 2
        };
    }
})();