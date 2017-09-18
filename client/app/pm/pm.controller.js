(function () {
    'use strict';

    angular.module('app.pm')
        .controller('managePMCtrl', ['$scope', 'contractService', 'setupFactory', 'dropdownlistService', '$sessionStorage', managePMCtrl])
        .controller('addPMCtrl', ['$scope', 'dropdownlistService', '$sessionStorage', 'contractService', '$filter', '$state', addPMCtrl])
        .controller('saveAllPMCtrl', ['$scope', '$sessionStorage', 'contractService', 'alertModalFactory', '$state', saveAllPMCtrl])
        .controller('saveItemPMCtrl', ['$scope', '$sessionStorage', 'contractService', 'alertModalFactory', '$stateParams', saveItemPMCtrl])
        .controller('viewPMCtrl', ['$scope', '$stateParams', 'contractService', 'alertModalFactory', viewPMCtrl]);

    function managePMCtrl($scope, contractService, setupFactory, dropdownlistService, $sessionStorage) {
        //variable
        $scope.model = {
            pageIndex: 1,
            poId: null,
            jobNo: "",
            fromDate: new Date(),
            toDate: new Date()
        };
        $scope.ddlPo = [];
        $scope.data = [];

        //function
        $scope.search = search;

        //initial
        setupFactory.initialDatePicker($scope);
        dropdownlistService.getDdlPoByBranch($sessionStorage.user.branchId, function (response) {
            $scope.ddlPo = response.data;
        })

        //set default dropdown
        if ($sessionStorage.search != undefined && $sessionStorage.search.page == 'pm/manage') {
            $scope.model = $sessionStorage.search.model;
        }

        function search() {
            $scope.model.toDate = $scope.model.fromDate;
            $sessionStorage.search = {
                page: 'pm/manage',
                model: $scope.model
            };
            contractService.postSearchPmData($scope.model, function (response) {
                $scope.data = response.data;
            });
        }
    }

    function addPMCtrl($scope, dropdownlistService, $sessionStorage, contractService, $filter, $state) {
        //variable
        $scope.ddlOffice = [];
        $scope.poId = null;
        $scope.model = [];

        //function
        $scope.onDdlBranchChange = onDdlBranchChange;
        $scope.CreateListPmDataByPoId = CreateListPmDataByPoId;

        //initial
        $sessionStorage.tmpAddContractPoDataList = undefined;
        dropdownlistService.getDdlPoByBranch($sessionStorage.user.branchId, function (response) {
            $scope.ddlOffice = response.data;

            //set default dropdown
            if ($sessionStorage.search != undefined && $sessionStorage.search.page == 'pm/add') {
                $scope.poId = $sessionStorage.search.model.officeId;
                onDdlBranchChange($scope.poId);
            }
        });

        function onDdlBranchChange(id) {
            $scope.model = [];
            if (id == null) return;
            var _po = $filter('filter')($scope.ddlOffice, { 'key': id })[0];
            $sessionStorage.search = {
                page: 'pm/add',
                model: {
                    officeId: id,
                    officeName: _po.value
                }
            }
            contractService.getContractPoListByPo(id, function (response) {
                $scope.model = response.data;
            })
        }

        function CreateListPmDataByPoId(poId) {
            contractService.postCreateListPmDataByPoId(poId, function (response) {
                $state.go('pm/add/all', { officeId: poId });
            })
        }
    }

    function saveAllPMCtrl($scope, $sessionStorage, contractService, alertModalFactory, $state) {
        //variable
        $scope.office = {};
        $scope.saveData = {
            "pmEngineerName": $sessionStorage.user.userName,
            "poOfficerName": "",
            "poOfficerPhoneNo": "",
            "jobNo": "",
            "lastUpdateUserId": $sessionStorage.user.userId,
            "signatureBase64": "",
            "pmDataIdList": []
        };

        //function
        $scope.save = save;
        $scope.clearSignature = clearSignature;

        //initial
        $scope.office = $sessionStorage.search.model;
        contractService.GetPmDataByPoId($scope.office.officeId, function (response) {
            console.log(response)
            $scope.model = response.data;

            if (response.data.length == 0) return;
            $scope.saveData.poOfficerName = response.data[0].poOfficerName;
            $scope.saveData.poOfficerPhoneNo = response.data[0].poOfficerPhoneNo;
            $scope.saveData.jobNo = response.data[0].jobNo;
        });

        var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(0, 0, 0)'
        });

        function clearSignature() {
            signaturePad.clear();
        }

        function save() {
            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) return;

            $scope.saveData.pmDataIdList = [];
            $scope.model.forEach(function (elm) {
                $scope.saveData.pmDataIdList.push(elm.pmDataId);
            }, this);
            if ($scope.model[0].signatureImageUrl == "" || $scope.model[0].signatureImageUrl == null) {
                $scope.saveData.signatureBase64 = signaturePad.toDataURL('image/png');
            }

            contractService.postUpdateListPmData($scope.saveData, function (response) {
                alertModalFactory.success("บันทึกข้อมูลเรียบร้อย", function () {
                    $state.go('pm/add');
                })
            });
        }
    }

    function saveItemPMCtrl($scope, $sessionStorage, contractService, alertModalFactory, $stateParams) {
        //variable
        $scope.model = {};
        $scope.action = "";

        //function
        $scope.uploadImage = uploadImage;
        $scope.imageIsLoaded = imageIsLoaded;
        $scope.removeImage = removeImage;
        $scope.save = save;

        //initial
        $scope.action = $stateParams.action;
        contractService.GetPmDataInfo($stateParams.pmDataId, function (response) {
            console.log(response.data);
            $scope.model = response.data;
            $scope.model.images.forEach(function (elm) {
                elm.imageBase64 = elm.imageUrl
            }, this);
        })

        var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(0, 0, 0)'
        });

        function clearSignature() {
            signaturePad.clear();
        }

        function uploadImage(files) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded;
            reader.readAsDataURL(file);
        }

        function imageIsLoaded(e) {
            $scope.$apply(function () {
                $scope.model.images.push({
                    "imageId": 0,
                    "pmDataId": $scope.model.pmDataId,
                    "imagePath": "",
                    "version": 1,
                    "lastUpdateUserId": $sessionStorage.user.userId,
                    "lastUpdateDateTime": new Date(),
                    "imageUrl": "",
                    "imageBase64": e.target.result
                });
            });
        }

        function removeImage(index) {
            $scope.model.images.splice(index, 1);
        }

        function save() {
            // $scope.model.pmStatusId = 2;
            $scope.model.lastUpdateUserId = $sessionStorage.user.userId

            if($scope.model.signatureImageUrl == null || $scope.model.signatureImageUrl == ""){
                $scope.model.signatureBase64 = signaturePad.toDataURL('image/png');
            }
            $scope.model.images.forEach(function(elm){
                if(elm.imageId > 0){
                    elm.imageBase64 = "";
                }
            },this);
            contractService.postUpdatePmData($scope.model, function (response) {
                alertModalFactory.success("บันทึกข้อมูลเรียบร้อย", function () {
                    window.history.back();
                });
            })
        }
    }

    function viewPMCtrl($scope, $stateParams, contractService, alertModalFactory) {
        //variable
        $scope.action = "";

        //function
        $scope.changeStatus = changeStatus;

        //initial
        $scope.action = $stateParams.action;
        contractService.GetPmDataInfo($stateParams.pmDataId, function (response) {
            $scope.model = response.data;
        });

        function changeStatus() {
            contractService.getChangePmDataStatus($scope.model.pmDataId, function (response) {
                alertModalFactory.success("ยกเลิกข้อมูลเรียบร้อย", function () {
                    window.history.back();
                })
            })
        }
    }
})();