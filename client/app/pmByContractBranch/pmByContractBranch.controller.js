(function () {
    'use strict';

    angular.module('app.pmByContractBranch')
        .controller('pmByContractBranchContractController', ['$scope', 'contractService', pmByContractBranchContractController])
        .controller('pmByContractBranchBranchController', ['$scope', 'contractService', '$stateParams', pmByContractBranchBranchController])
        .controller('pmByContractBranchRegionController', ['$scope', 'contractService', '$stateParams', pmByContractBranchRegionController])
        .controller('pmByContractBranchPoController', ['$scope', 'contractService', '$stateParams', pmByContractBranchPoController])
        .controller('pmByContractBranchWicketController', ['$scope', 'contractService', '$stateParams', pmByContractBranchWicketController]);

    function pmByContractBranchContractController($scope, contractService) {

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

    function pmByContractBranchBranchController($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //initial
        contractService.getContractPoListByContract($stateParams.contractId, function (response) {
            //set data
            $scope.model = {
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
        });
    }

    function pmByContractBranchRegionController($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //initial
        contractService.getContractPoListByContractAndBranch($stateParams.contractId, $stateParams.branchId, function (response) {
            //set data
            $scope.model = {
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
        });
    }

    function pmByContractBranchPoController($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //initial
        contractService.getContractPoListByContractAndBranchAndRegion(
            $stateParams.contractId,
            $stateParams.branchId,
            $stateParams.poRegionId,
            function (response) {
                //set data
                $scope.model = {
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
            });
    }

    function pmByContractBranchWicketController($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.getPmDataByContractPoList($stateParams.poId, function (response) {
            $scope.model = {
                contractName: "",
                regionName: "",
                officeName: "",
                total: response.data.length,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if (response.data.length > 0) {
                $scope.model.contractName = response.data[0].contractPoList.contract.contractName;
                $scope.model.regionName = response.data[0].contractPoList.po.poRegion.districtName + " " + response.data[0].contractPoList.po.poRegion.provinceName;;
                $scope.model.officeName = response.data[0].contractPoList.po.poNumber + "-" + response.data[0].contractPoList.po.poName;
            }
            response.data.forEach(function (data) {
                if (data.pmStatusId == 2) {
                    $scope.model.totalComplete++;
                } else {
                    $scope.model.totalNoComplete++;
                }
            });
        })
    }
})();