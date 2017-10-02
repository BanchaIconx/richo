(function () {
    'use strict';

    angular.module('app.pmByBranch')
        .controller('allBranchCtrl', ['$scope', 'contractService', allBranchCtrl])
        .controller('byBranchCtrl', ['$scope', 'contractService', '$stateParams', byBranchCtrl])
        .controller('byBranchAndRegionCtrl', ['$scope', 'contractService', '$stateParams', byBranchAndRegionCtrl])
        .controller('byBranchAndRegionAndOfficeCtrl', ['$scope', 'contractService', '$stateParams', byBranchAndRegionAndOfficeCtrl])

    function allBranchCtrl($scope, contractService) {
        //variable
        $scope.model = {};

        //initial
        contractService.getAllBranchPoSummary(function (response) {
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
    }

    function byBranchCtrl($scope, contractService, $stateParams) {

        //variable
        $scope.model = {};

        //initial
        contractService.getContractPoListByBranch($stateParams.branchId, function (response) {
            //set data
            $scope.model = {
                branchName: "",
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.branchName = response.data[0].ricohBranch.ricohBranchName
            }
            response.data.forEach(function (data) {
                $scope.model.total += data.noOfCounter;
                $scope.model.totalComplete += data.completeNoOfCounter;
                $scope.model.totalNoComplete += (data.noOfCounter - data.completeNoOfCounter);
            });
        });
    }

    function byBranchAndRegionCtrl($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.GetContractPoListByPoRegion($stateParams.regionId, function (response) {
            $scope.model = {
                branchName: $stateParams.branchName,
                regionName: $stateParams.regionName,
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.branchName = response.data[0].ricohBranch.ricohBranchName
                $scope.model.regionName = response.data[0].po.poRegion.districtName + " " + response.data[0].po.poRegion.provinceName;
            }
            response.data.forEach(function (data) {
                $scope.model.total += data.noOfCounter;
                $scope.model.totalComplete += data.completeNoOfCounter;
                $scope.model.totalNoComplete += (data.noOfCounter - data.completeNoOfCounter);
            })
        })
    }

    function byBranchAndRegionAndOfficeCtrl($scope, contractService, $stateParams) {
        //variable
        $scope.model = {};

        //function

        //initial
        contractService.getPmDataByContractPoList($stateParams.officeId, function (response) {
            console.log(response.data);
            $scope.model = {
                branchName: "",
                regionName: "",
                officeName: "",
                total: response.data.length,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.branchName = response.data[0].contractPoList.ricohBranch.ricohBranchName
                $scope.model.regionName = response.data[0].contractPoList.po.poRegion.districtName + " " + response.data[0].contractPoList.po.poRegion.provinceName;
                $scope.model.officeName = response.data[0].contractPoList.po.poNumber + "-" + response.data[0].contractPoList.po.poName;
            }
            response.data.forEach(function (data) {
                if(data.pmStatusId == 2){
                    $scope.model.totalComplete++;
                }else{
                    $scope.model.totalNoComplete++;
                }
            });
        })
    }

})();