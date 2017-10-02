(function () {
    'use strict';

    angular.module('app.equipment')
        .controller('manageEquipmentCtrl', ['$scope', 'dropdownlistService', 'contractService', '$sessionStorage', '$state', '$filter', 'alertModalFactory', manageEquipmentCtrl])
        .controller('addEquipmentCtrl', ['$scope', 'dropdownlistService', '$sessionStorage', 'templateService', 'contractService', 'alertModalFactory', '$stateParams', addEquipmentCtrl])
        .controller('editEquipmentCtrl', ['$scope', 'dropdownlistService', '$stateParams', '$sessionStorage', 'contractService', 'alertModalFactory', editEquipmentCtrl]);

    function manageEquipmentCtrl($scope, dropdownlistService, contractService, $sessionStorage, $state, $filter, alertModalFactory) {

        //variable
        $scope.model = {
            contractId: null,
            regionId: null,
            officeId: null,
            counterId: null,
            data: []
        };
        $scope.ddlContracts = [];
        $scope.ddlRegions = [];
        $scope.ddlOffices = [];
        $scope.ddlCounter = [];
        $scope.contractPoListId = 0;

        //function
        $scope.getDdlContract = getDdlContract; //สัญญา
        $scope.getDdlPoRegion = getDdlPoRegion; //เขต
        $scope.getDdlPo = getDdlPo;  //ที่ทำการไปรษณีย์
        $scope.getDdlWicked = getDdlWicked //เคาน์เตอร์;
        $scope.search = search;
        $scope.goPage = goPage;
        $scope.deleteContractPoData = deleteContractPoData;

        //initial
        $sessionStorage.tmpEditEquipment = undefined;
        getDdlContract();

        function getDdlContract() {
            dropdownlistService.getDdlContract(function (response) {
                $scope.ddlContracts = response.data;
            });
        }

        if ($sessionStorage.search != undefined) {
            if ($sessionStorage.search.page == 'equipment/manage') {
                $scope.model = $sessionStorage.search.model;
                if ($scope.model.contractId == null) return;
                dropdownlistService.getDdlPoRegion($scope.model.contractId, function (response) {
                    $scope.ddlRegions = response.data;
                    if ($scope.model.regionId == null) return;
                    dropdownlistService.getDdlPo($scope.model.regionId, function (response) {
                        $scope.ddlOffices = response.data;
                        if ($scope.model.officeId == null) return;
                        dropdownlistService.getDdlWicked($scope.model.contractId, $scope.model.officeId, function (response) {
                            $scope.ddlCounter = response.data;
                            search();
                        });
                    });
                });
            }
        }

        function getDdlPoRegion(id) {
            $scope.ddlRegions = [];
            $scope.ddlOffices = [];
            $scope.ddlCounter = [];
            if (id == null) return;
            dropdownlistService.getDdlPoRegion(id, function (response) {
                $scope.ddlRegions = response.data;
            });
        }

        function getDdlPo(id) {
            $scope.ddlOffices = [];
            $scope.ddlCounter = [];
            if (id == null) return;
            dropdownlistService.getDdlPo(id, function (response) {
                $scope.ddlOffices = response.data;
            });
        }

        function getDdlWicked() {
            $scope.ddlCounter = [];
            if ($scope.model.officeId == null) return;
            dropdownlistService.getDdlWicked($scope.model.contractId, $scope.model.officeId, function (response) {
                $scope.ddlCounter = response.data;
            });
            contractService.GetContractPoListIdByContractIdAndPoId($scope.model.contractId, $scope.model.officeId, function (response) {
                $scope.contractPoListId = response.data;
            });
        }

        function search() {
            $scope.model.data = [];
            if ($scope.model.counterId == null) return;

            //set session search
            $sessionStorage.search = {
                page: "equipment/manage",
                model: $scope.model
            };

            var _counter = $filter('filter')($scope.ddlCounter, { 'value': $scope.model.counterId })[0];
            contractService.GetContractPoDataByWicketAndcontractPoList(_counter.value, _counter.key, function (response) {
                $scope.model.data = response.data;
            });
        }

        function goPage(action, value) {
            var _contract = $filter('filter')($scope.ddlContracts, { 'key': $scope.model.contractId })[0];
            var _region = $filter('filter')($scope.ddlRegions, { 'key': $scope.model.regionId })[0];
            var _office = $filter('filter')($scope.ddlOffices, { 'key': $scope.model.officeId })[0];
            var _counter = $filter('filter')($scope.ddlCounter, { 'value': $scope.model.counterId })[0];
            //set tmp session data
            $sessionStorage.tmpEditEquipment = {
                header: {
                    t1: _contract,
                    t2: _region,
                    t3: _office,
                    t4: _counter,
                    contractPoListId: $scope.contractPoListId
                },
                data: value
            };
            //set session search
            $sessionStorage.search = {
                page: "equipment/manage",
                model: $scope.model
            };

            if (action == "edit") {
                //go edit page
                $state.go('equipment/edit', { id: value.contractPoDataItemId });
            } else if (action == "add") {
                //go add page
                $state.go('equipment/add', { contractId: $scope.model.contractId });
            }

        }

        function deleteContractPoData() {
            contractService.deleteContractPoData($scope.model.data.contractPoDataId, function (response) {
                alertModalFactory.success("ลบข้อมูลเรียบร้อย", function (response) {
                    getDdlWicked();
                })
            })
        }
    }

    function addEquipmentCtrl($scope, dropdownlistService, $sessionStorage, templateService, contractService, alertModalFactory, $stateParams) {
        //variable
        $scope.title = {};
        $scope.model = {};
        $scope.ddlTemplates = [];

        //function
        $scope.save = save;
        $scope.onTemplateChange = onTemplateChange;

        //init
        var tmp = angular.copy($sessionStorage.tmpEditEquipment);
        $scope.title = tmp.header;
        $scope.model = {
            "contractPoDataId": 0,
            "templateId": null,
            "contractPoListId": $scope.title.contractPoListId,
            "wicketId": "",
            "version": 1,
            "lastUpdateUserId": $sessionStorage.user.userId,
            "lastUpdateDateTime": new Date(),
            "contractPoList": null,
            "template": null,
            "contractPoDataItems": []
        };
        dropdownlistService.getDdlTemplates($stateParams.contractId, function (response) {
            $scope.ddlTemplates = response.data;
        })

        function onTemplateChange(id) {
            $scope.templateItems = [];
            if (id == null) return;
            templateService.getTemplateInfo(id, function (response) {
                $scope.templateItems = response.data.equipmentTemplates;
            })
        }

        function save() {
            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) return;

            $scope.model.contractPoDataItems = [];
            $scope.templateItems.forEach(function (elm) {
                $scope.model.contractPoDataItems.push({
                    "contractPoDataItemId": 0,
                    "contractPoDataId": 0,
                    "itemNo": elm.itemNo,
                    "itemName": elm.itemName,
                    "brand": elm.brand,
                    "model": elm.model,
                    "serial": elm.serial,
                    "ip": "",
                    "brandModel": elm.brandModel,
                    "ipNo": elm.ip,
                    "serialNo": elm.serialNo,
                    "equipmentTypeId": elm.equipmentTypeId,
                    "version": 1,
                    "lastUpdateUserId": $sessionStorage.user.userId,
                    "lastUpdateDateTime": new Date()
                });
            }, this);

            contractService.postCreateContractPoData($scope.model, function (response) {
                alertModalFactory.success("เพิ่มข้อมูลเรียบร้อย", function () {
                    window.history.back();
                })
            })
        }
    }

    function editEquipmentCtrl($scope, dropdownlistService, $stateParams, $sessionStorage, contractService, alertModalFactory) {

        //variable
        $scope.title = {};
        $scope.model = {};

        //function
        $scope.save = save;

        //init
        var tmp = angular.copy($sessionStorage.tmpEditEquipment);
        $scope.title = tmp.header;
        $scope.model = tmp.data;

        function save() {
            $scope.model.lastUpdateUserId = $sessionStorage.user.userId;
            contractService.postUpdateContractPoDataItem($scope.model, function (response) {
                alertModalFactory.success("แก้ไขข้อมูลเรียบร้อย", function () {
                    window.history.back();
                })
            })
        }
    }
})();