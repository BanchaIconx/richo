(function () {
    'use strict';

    angular.module('app')
        .service('dropdownlistService', ['$http', 'appConfig', 'CommonCallback', 'setupFactory', dropdownlistService]);

    function dropdownlistService($http, appConfig, CommonCallback, setupFactory) {
        var http = {
            'getDdlBranches': function (data) {
                return setupFactory.serviceGet('/dropdownList/getDdlBranches/', data);
            },
            'getDdlRoles': function () {
                return setupFactory.serviceGet('/dropdownList/getDdlRoles');
            },
            'getDdlPoByBranch': function (data) {
                return setupFactory.serviceGet('/dropdownList/getDdlPoByBranch/', data);
            },
            'getDdlContract': function () {
                return setupFactory.serviceGet('/dropdownList/getDdlContract');
            },
            'getDdlPoRegion': function (data) {
                return setupFactory.serviceGet('/dropdownList/getDdlPoRegion/', data);
            },
            'getDdlPo': function (data) {
                return setupFactory.serviceGet('/dropdownList/getDdlPo/', data);
            },
            'getDdlContractPoData': function (data) {
                return setupFactory.serviceGet('/dropdownList/getDdlContractPoData/', data);
            },
            'getDdlWicked': function (data, data2) {
                return setupFactory.serviceGet('/dropdownList/getDdlWicked/', data, data2);
            },
            'getDdlTemplates': function () {
                return setupFactory.serviceGet('/dropdownList/getDdlTemplates');
            }
        }

        function getDdlBranches(branchId, successCallBack) {
            $http(http.getDdlBranches(branchId))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlRoles(successCallBack) {
            $http(http.getDdlRoles())
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlPoByBranch(data, successCallBack) {
            $http(http.getDdlPoByBranch(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlContract(successCallBack) {
            $http(http.getDdlContract())
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlPoRegion(data, successCallBack) {
            $http(http.getDdlPoRegion(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlPo(data, successCallBack) {
            $http(http.getDdlPo(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlContractPoData(data, successCallBack) {
            $http(http.getDdlContractPoData(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlWicked(data, data2, successCallBack) {
            $http(http.getDdlWicked(data, data2))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        function getDdlTemplates(successCallBack) {
            $http(http.getDdlTemplates())
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        return {
            getDdlBranches: getDdlBranches,
            getDdlRoles: getDdlRoles,
            getDdlPoByBranch: getDdlPoByBranch,
            getDdlContract: getDdlContract,
            getDdlPoRegion: getDdlPoRegion,
            getDdlPo: getDdlPo,
            getDdlContractPoData: getDdlContractPoData,
            getDdlWicked: getDdlWicked,
            getDdlTemplates: getDdlTemplates
        };
    }
})();