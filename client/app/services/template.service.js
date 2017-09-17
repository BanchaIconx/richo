(function () {
    'use strict';

    angular.module('app')
        .service('templateService', ['$http', 'CommonCallback', 'setupFactory', templateService]);

    function templateService($http, CommonCallback, setupFactory) {
        var http = {
            'getTemplateInfo': function (data) {
                return setupFactory.serviceGet('/template/getTemplateInfo/', data);
            }
        };

        function getTemplateInfo(data, successCallBack) {
            $http(http.getTemplateInfo(data))
                .then(CommonCallback.onSuccess(successCallBack), CommonCallback.onError);
        }

        return {
            getTemplateInfo: getTemplateInfo
        }
    }
})();