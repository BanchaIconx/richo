(function () {
    'use strict';

    angular.module('app')
        .service('contractService', ['$http', 'CommonCallback', 'setupFactory', contractService]);

    function contractService($http, CommonCallback, setupFactory) {
        var http = {
            'postGetContractAll': function () {
                return setupFactory.servicePost('/contract/postGetContractAll', '');
            },
            'getContractPoListByContract': function (data) {
                return setupFactory.serviceGet('/contractPoList/getContractPoListByContract/', data);
            },
            'getContractPoListByPoRegion': function (data) {
                return setupFactory.serviceGet('/contractPoList/getContractPoListByPoRegion/', data);
            },
            'getPmDataByContractPoList': function (data) {
                return setupFactory.serviceGet('/pmData/getPmDataByContractPoList/', data);
            },
            'getAllBranchPoSummary': function () {
                return setupFactory.serviceGet('/contract/getAllBranchPoSummary', '');
            },
            'getContractPoListByBranch': function (data) {
                return setupFactory.serviceGet('/contractPoList/getContractPoListByBranch/', data);
            },
            'getContractPoListByPo': function (data) {
                return setupFactory.serviceGet('/contractPoList/getContractPoListByPo/', data);
            },
            'GetContractPoDataByWicketAndcontractPoList': function (data1, data2) {
                return setupFactory.serviceGet('/contractPoData/GetContractPoDataByWicketAndcontractPoList/', data1, data2);
            },
            'postUpdateContractPoDataItem': function (data) {
                return setupFactory.servicePost('/contractPoData/postUpdateContractPoDataItem', data);
            },
            'postCreateContractPoData': function (data) {
                return setupFactory.servicePost('/contractPoData/postCreateContractPoData', data);
            },
            'deleteContractPoData': function (data) {
                return setupFactory.serviceDelete('/contractPoData/deleteContractPoData/', data);
            },
            'GetPmDataByPoId': function (data) {
                return setupFactory.serviceGet('/pmData/GetPmDataByPoId/', data);
            },
            'postCreatePmData': function (data) {
                return setupFactory.servicePost('/pmData/postCreatePmData', data);
            },
            'GetContractPoListIdByContractIdAndPoId': function (data, data2) {
                return setupFactory.serviceGet('/contractPoList/GetContractPoListIdByContractIdAndPoId/', data, data2);
            },
            'postCreateListPmDataByPoId': function (data) {
                return setupFactory.servicePost('/pmData/postCreateListPmDataByPoId', data);
            },
            'GetPmDataInfo': function (data) {
                return setupFactory.serviceGet('/pmData/GetPmDataInfo/', data);
            },
            'postUpdatePmData': function (data) {
                return setupFactory.servicePost('/pmData/postUpdatePmData', data);
            },
            'postUpdateListPmData': function (data) {
                return setupFactory.servicePost('/pmData/postUpdateListPmData', data)
            },
            'postSearchPmData': function(data){
                return setupFactory.servicePost('/pmData/postSearchPmData', data);
            },
            'getChangePmDataStatus' : function(data){
                return setupFactory.serviceGet('/pmData/getChangePmDataStatus/', data);
            }
        };

        function postGetContractAll(successCallBack) {
            $http(http.postGetContractAll())
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getContractPoListByContract(data, successCallBack) {
            $http(http.getContractPoListByContract(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getContractPoListByPoRegion(data, successCallBack) {
            $http(http.getContractPoListByPoRegion(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getPmDataByContractPoList(data, successCallBack) {
            $http(http.getPmDataByContractPoList(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getAllBranchPoSummary(successCallBack) {
            $http(http.getAllBranchPoSummary())
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getContractPoListByBranch(data, successCallBack) {
            $http(http.getContractPoListByBranch(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getContractPoListByPo(data, successCallBack) {
            $http(http.getContractPoListByPo(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function GetContractPoDataByWicketAndcontractPoList(data1, data2, successCallBack) {
            $http(http.GetContractPoDataByWicketAndcontractPoList(data1, data2))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postUpdateContractPoDataItem(data, successCallBack) {
            $http(http.postUpdateContractPoDataItem(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postCreateContractPoData(data, successCallBack) {
            $http(http.postCreateContractPoData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function deleteContractPoData(data, successCallBack) {
            $http(http.deleteContractPoData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function GetPmDataByPoId(data, successCallBack) {
            $http(http.GetPmDataByPoId(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postCreatePmData(data, successCallBack) {
            $http(http.postCreatePmData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function GetContractPoListIdByContractIdAndPoId(data, data2, successCallBack) {
            $http(http.GetContractPoListIdByContractIdAndPoId(data, data2))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postCreateListPmDataByPoId(data, successCallBack) {
            $http(http.postCreateListPmDataByPoId(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function GetPmDataInfo(data, successCallBack) {
            $http(http.GetPmDataInfo(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postUpdatePmData(data, successCallBack) {
            $http(http.postUpdatePmData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postUpdateListPmData(data, successCallBack) {
            $http(http.postUpdateListPmData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function postSearchPmData(data, successCallBack){
            $http(http.postSearchPmData(data))
            .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getChangePmDataStatus(data, successCallBack){
            $http(http.getChangePmDataStatus(data))
            .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        return {
            postGetContractAll: postGetContractAll,
            getContractPoListByContract: getContractPoListByContract,
            getContractPoListByPoRegion: getContractPoListByPoRegion,
            getPmDataByContractPoList: getPmDataByContractPoList,
            getAllBranchPoSummary: getAllBranchPoSummary,
            getContractPoListByBranch: getContractPoListByBranch,
            getContractPoListByPo: getContractPoListByPo,
            GetContractPoDataByWicketAndcontractPoList: GetContractPoDataByWicketAndcontractPoList,
            postUpdateContractPoDataItem: postUpdateContractPoDataItem,
            postCreateContractPoData: postCreateContractPoData,
            deleteContractPoData: deleteContractPoData,
            GetPmDataByPoId: GetPmDataByPoId,
            postCreatePmData: postCreatePmData,
            GetContractPoListIdByContractIdAndPoId: GetContractPoListIdByContractIdAndPoId,
            postCreateListPmDataByPoId: postCreateListPmDataByPoId,
            GetPmDataInfo: GetPmDataInfo,
            postUpdatePmData: postUpdatePmData,
            postUpdateListPmData: postUpdateListPmData,
            postSearchPmData: postSearchPmData,
            getChangePmDataStatus: getChangePmDataStatus
        }
    }
})();