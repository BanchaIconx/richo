(function () {
    'use strict';

    angular.module('app.pmByContract')
        .controller('allContrackCtrl', ['$scope', 'contractService', allContrackCtrl])
        .controller('byContractCtrl', ['$scope', 'contractService', '$stateParams', byContractCtrl])
        .controller('byContractAndRegionCtrl', ['$scope', 'contractService', '$stateParams', byContractAndRegionCtrl])
        .controller('byContractAndRegionAndOfficeCtrl', ['$scope', 'contractService', '$stateParams', byContractAndRegionAndOfficeCtrl])

    function allContrackCtrl($scope, contractService) {

        //variable
        $scope.model = {};

        //function
        $scope.downloadExcel = downloadExcel;
        $scope.archive = archive;

        //initial
        contractService.postGetContractAll(function (response) {
            //set data
            $scope.model = {
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            response.data.forEach(function (data) {
                $scope.model.total += data.totalNoOfCounter;
                $scope.model.totalComplete += data.totalCompleteNoOfCounter;
                $scope.model.totalNoComplete += (data.totalNoOfCounter - data.totalCompleteNoOfCounter);
            })
        });

        function downloadExcel() {

        }

        function archive() {

        }
    }

    function byContractCtrl($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.getContractPoListByContract($stateParams.contractId, function (response) {
            $scope.model = {
                contractName: $stateParams.contractName,
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            response.data.forEach(function (data) {
                $scope.model.total += data.noOfCounter;
                $scope.model.totalComplete += data.completeNoOfCounter;
                $scope.model.totalNoComplete += (data.noOfCounter - data.completeNoOfCounter);
            })
        })

    }

    function byContractAndRegionCtrl($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.getContractPoListByPoRegion($stateParams.regionId, function (response) {
            $scope.model = {
                contractName: $stateParams.contractName,
                regionName: $stateParams.regionName,
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            response.data.forEach(function (data) {
                $scope.model.total += data.noOfCounter;
                $scope.model.totalComplete += data.completeNoOfCounter;
                $scope.model.totalNoComplete += (data.noOfCounter - data.completeNoOfCounter);
            })
        })
    }

    function byContractAndRegionAndOfficeCtrl($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.getPmDataByContractPoList($stateParams.officeId, function (response) {
            console.log(response);
            $scope.model = {
                contractName: $stateParams.contractName,
                regionName: $stateParams.regionName,
                officeName: $stateParams.officeName,
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            response.data.forEach(function (data) {
                $scope.model.total += data.noOfCounter;
                $scope.model.totalComplete += data.completeNoOfCounter;
                $scope.model.totalNoComplete += (data.noOfCounter - data.completeNoOfCounter);
            })
        })
    }
})();