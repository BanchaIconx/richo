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
            console.log(response);
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
                contractName: "",
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.contractName = response.data[0].contract.contractName;
            }
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
                contractName: "",
                regionName: "",
                total: 0,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.contractName = response.data[0].contract.contractName;
                $scope.model.regionName = "เขต" + response.data[0].po.poRegion.districtName + " " + response.data[0].po.poRegion.provinceName;
            }
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
            $scope.model = {
                contractName: "",
                regionName: "",
                officeName: "",
                total: response.data.length,
                totalComplete: 0,
                totalNoComplete: 0,
                data: response.data
            };
            if(response.data.length > 0){
                $scope.model.contractName = response.data[0].contractPoList.contract.contractName; 
                $scope.model.regionName = "เขต" + response.data[0].contractPoList.po.poRegion.districtName + " " + response.data[0].contractPoList.po.poRegion.provinceName;;
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