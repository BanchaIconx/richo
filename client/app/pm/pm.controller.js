(function () {
    'use strict';

    angular.module('app.pm')
        .controller('managePMCtrl', ['$scope', '$state', 'contractService', 'setupFactory', 'dropdownlistService', '$sessionStorage', managePMCtrl])
        .controller('addPMCtrl', ['$scope', 'dropdownlistService', '$sessionStorage', 'contractService', '$filter', '$state', 'alertModalFactory', addPMCtrl])
        .controller('saveAllPMCtrl', ['$scope', '$sessionStorage', 'contractService', 'alertModalFactory', '$state', '$stateParams', 'dropdownlistService', saveAllPMCtrl])
        .controller('saveItemPMCtrl', ['$scope', '$sessionStorage', 'contractService', 'alertModalFactory', '$stateParams', saveItemPMCtrl])
        .controller('viewPMCtrl', ['$scope', '$stateParams', 'contractService', 'alertModalFactory', 'appConfig', '$filter', viewPMCtrl]);

    function managePMCtrl($scope, $state, contractService, setupFactory, dropdownlistService, $sessionStorage) {
        //variable
        $scope.model = {
            pageIndex: 1,
            poId: null,
            jobNo: "",
            fromDate: new Date(),
            toDate: new Date(),
            branchId: 0,
            statusId: null
        };
        $scope.ddlPo = [];
        $scope.data = [];
        $scope.ddlPmStatus = [];
        var branchId = 0;
        $scope.selected = null;

        //function
        $scope.search = search;

        //initial
        setupFactory.initialDatePicker($scope);
        if ($state.current.name == 'pm/search') {
            branchId = $sessionStorage.user.branchId;
            $scope.model.branchId = $sessionStorage.user.branchId;
        }
        dropdownlistService.getDdlPoByBranch(branchId, function (response) {
            $scope.ddlPo = response.data;
        });
        dropdownlistService.getDdlPmStatus(function (response) {
            $scope.ddlPmStatus = response.data;
        });

        //set default dropdown
        if ($sessionStorage.search != undefined && $sessionStorage.search.page == 'pm/manage') {
            $scope.model = $sessionStorage.search.model;
            $scope.model.fromDate = ($scope.model.fromDate != null) ? new Date($scope.model.fromDate) : null;
            $scope.model.toDate = ($scope.model.toDate != null) ? new Date($scope.model.toDate) : null;
        }

        function search() {
            // $scope.model.toDate = $scope.model.fromDate;
            if ($scope.selected == null) {
                $scope.model.poId = 0;
            } else {
                $scope.model.poId = $scope.selected.key;
            }

            $sessionStorage.search = {
                page: 'pm/manage',
                model: $scope.model
            };
            contractService.postSearchPmData($scope.model, function (response) {
                $scope.data = response.data;
            });
        }
    }

    function addPMCtrl($scope, dropdownlistService, $sessionStorage, contractService, $filter, $state, alertModalFactory) {
        //variable
        $scope.ddlOffice = [];
        $scope.poId = null;
        $scope.model = [];

        //function
        $scope.onDdlBranchChange = onDdlBranchChange;
        $scope.CreateListPmDataByPoId = CreateListPmDataByPoId;
        $scope.change = change;

        //initial
        $sessionStorage.contractId = undefined;
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
                if (response.data == true) {
                    $state.go('pm/add/all', { officeId: poId });
                } else {
                    alertModalFactory.danger("ที่ทำการไปรษณีย์นี้ถูกสร้างใบงานไปแล้ว");
                }
            })
        }

        function change(value) {
            console.log(value);
        }
    }

    function saveAllPMCtrl($scope, $sessionStorage, contractService, alertModalFactory, $state, $stateParams, dropdownlistService) {
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
        $scope.ddlContract = [];
        $scope.contractId = null;
        $scope.showEdit = true;
        $scope.officeName = "";

        //function
        $scope.save = save;
        $scope.clearSignature = clearSignature;
        $scope.ddlContractChange = ddlContractChange;

        //initial
        $scope.officeName = $sessionStorage.search.model.officeName;
        if ($sessionStorage.contractId != undefined) {
            $scope.contractId = $sessionStorage.contractId;
            ddlContractChange($scope.contractId);
        }
        dropdownlistService.getDdlContractByPoId($stateParams.officeId, function (response) {
            $scope.ddlContract = response.data;
        })
        // $scope.office = $sessionStorage.search.model;
        // contractService.GetPmDataByPoId($scope.office.officeId, function (response) {
        //     $scope.model = response.data;

        //     if (response.data.length == 0) return;
        //     $scope.saveData.poOfficerName = response.data[0].poOfficerName;
        //     $scope.saveData.poOfficerPhoneNo = response.data[0].poOfficerPhoneNo;
        //     $scope.saveData.jobNo = response.data[0].jobNo;
        // });

        function ddlContractChange(contractId) {
            $scope.model = [];
            $sessionStorage.contractId = contractId;
            if (contractId == null) return;
            contractService.GetPmDataByPoIdAndContractId($stateParams.officeId, contractId, function (response) {
                $scope.model = response.data;

                if (response.data.length == 0) return;
                $scope.saveData.poOfficerName = response.data[0].poOfficerName;
                $scope.saveData.poOfficerPhoneNo = response.data[0].poOfficerPhoneNo;
                $scope.saveData.jobNo = response.data[0].jobNo;

                //เช็คสถานะของใบงานว่าตรวจเช็คครบแล้วหรือยัง
                for (var i = 0; i < $scope.model.length; i++) {
                    if ($scope.model[i].pmStatusId == 2 || !$scope.model[i].isEdit) {
                        $scope.showEdit = false;
                        break;
                    }
                }
            })
        }

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
            if ($scope.submitForm.$invalid) {
                angular.element('input.ng-invalid').first().focus();
                return;
            }

            var isHaveEditRecord = false;
            $scope.model.forEach(function (elm) {
                if (elm.isEdit == false) {
                    alertModalFactory.danger("กรุณาตรวจเช็คใบงานให้ครบก่อนบันทึกข้อมูล");
                    isHaveEditRecord = true;
                }
            }, this);
            if (isHaveEditRecord) return;


            if (signaturePad.isEmpty()) {
                alertModalFactory.danger("กรุณากรอกลายเซ็น");
                return;
            }

            $scope.saveData.pmDataIdList = [];
            $scope.model.forEach(function (elm) {
                $scope.saveData.pmDataIdList.push(elm.pmDataId);
            }, this);
            if ($scope.model[0].signatureImageUrl == "" || $scope.model[0].signatureImageUrl == null) {
                $scope.saveData.signatureBase64 = signaturePad.toDataURL('image/png');
            }

            contractService.postUpdateListPmData($scope.saveData, function (response) {
                alertModalFactory.success("ดำเนินการทำ PM เรียบร้อยแล้ว", function () {
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
        $scope.clearSignature = clearSignature;
        $scope.save = save;

        //initial
        $scope.action = $stateParams.action;
        contractService.GetPmDataInfo($stateParams.pmDataId, function (response) {
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
            $scope.model.signatureImageUrl = null;
        }

        function uploadImage(files) {
            var file = files[0];
            // var reader = new FileReader();
            // reader.onload = $scope.imageIsLoaded;
            // reader.readAsDataURL(file);

            //parse meta data
            loadImage.parseMetaData(file, function (data) {
                //default image orientation
                var orientation = 0;
                //if exif data available, update orientation
                if (data.exif) {
                    orientation = data.exif.get('Orientation');
                }
                var loadingImage = loadImage(
                    file,
                    function (canvas) {
                        //here's the base64 data result
                        var base64data = canvas.toDataURL('image/jpeg');
                        //here's example to show it as on imae preview
                        // var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                        imageIsLoaded(base64data);
                    }, {
                        //should be set to canvas : true to activate auto fix orientation
                        canvas: true,
                        orientation: orientation
                    }
                );
            });
        }

        function imageIsLoaded(result) {
            $scope.$apply(function () {
                $scope.model.images.push({
                    "imageId": 0,
                    "pmDataId": $scope.model.pmDataId,
                    "imagePath": "",
                    "version": 1,
                    "lastUpdateUserId": $sessionStorage.user.userId,
                    "lastUpdateDateTime": new Date(),
                    "imageUrl": "",
                    "imageBase64": result
                });
            });
        }

        function removeImage(index) {
            $scope.model.images.splice(index, 1);
        }

        function save() {
            //set dirty all input
            angular.forEach($scope.submitForm.$error.required, function (field) {
                field.$setDirty();
            });

            //if field invalid return false
            if ($scope.submitForm.$invalid) {
                alertModalFactory.danger("กรุณากรอกข้อมูลให้ครบถ้วน");
                angular.element('input.ng-invalid').first().focus();
                return;
            }

            // $scope.model.pmStatusId = 2;
            $scope.model.lastUpdateUserId = $sessionStorage.user.userId
            if ($stateParams.action == 'edit' && ($scope.model.signatureImageUrl == null || $scope.model.signatureImageUrl == "")) {
                if (!signaturePad.isEmpty()) {
                    $scope.model.signatureBase64 = signaturePad.toDataURL('image/png');
                } else {
                    alertModalFactory.danger("กรุณากรอกลายเซ็น");
                    return;
                }
            }

            $scope.model.images.forEach(function (elm) {
                if (elm.imageId > 0) {
                    elm.imageBase64 = "";
                }
            }, this);
            $scope.model.action = $stateParams.action;
            contractService.postUpdatePmData($scope.model, function (response) {
                alertModalFactory.success("ดำเนินการทำ PM เรียบร้อยแล้ว", function () {
                    window.history.back();
                });
            });
        }
    }

    function viewPMCtrl($scope, $stateParams, contractService, alertModalFactory, appConfig, $filter) {
        //variable
        $scope.action = "";
        $scope.pdfUrl = "";

        //function
        $scope.changeStatus = changeStatus;
        $scope.print = print;

        //initial
        $scope.action = $stateParams.action;
        contractService.GetPmDataInfo($stateParams.pmDataId, function (response) {
            $scope.model = response.data;
            $scope.pdfUrl = appConfig.pdfUrl + $scope.model.contractPoList.contract.contractCode + "/" + $scope.model.pdfUrl;
            // + $scope.model.contractPoList.po.poNumber + "-" + $scope.model.contractPoList.po.poName + "/"
            // + $scope.model.contractPoList.contract.contractCode + "-" + $scope.model.contractPoList.po.poNumber + "-"
            // + $scope.model.wicketId + ".pdf"
        });

        function print() {
            // C001-ระบบส่งต่อและนำจ่าย%2050%20แห่ง/เขตศป.สุวรรณภูมิ%20สมุทรปราการ/10001-ศป.สุวรรณภูมิ/C001-10001-1-25600921.pdf
            // window.open(
            //     appConfig.pdfUrl + 
            //     $scope.model.contractPoList.contract.contractCode +"-"+$scope.model.contractPoList.contract.contractName+"/"
            //     +"เขต"+$scope.model.contractPoList.po.poRegion.districtName+" "+$scope.model.contractPoList.po.poRegion.provinceName+"/"
            //     +$scope.model.contractPoList.po.poNumber+"-"+$scope.model.contractPoList.po.poName+"/"
            //     +$scope.model.contractPoList.contract.contractCode+"-"+$scope.model.contractPoList.po.poNumber+"-"
            //     +$scope.model.wicketId+".pdf"
            //     , '_blank');
            // window.open(appConfig.pdfUrl + $scope.model.pmDataId , '_blank');
        }

        function changeStatus() {
            contractService.getChangePmDataStatus($scope.model.pmDataId, function (response) {
                alertModalFactory.success("ยกเลิกข้อมูลเรียบร้อย", function () {
                    window.history.back();
                })
            })
        }
    }
})();