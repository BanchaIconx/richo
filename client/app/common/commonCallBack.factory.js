(function () {
    'use strict';

    angular.module('app.common')
        .factory('CommonCallback', ['alertModalFactory', CommonCallback]);

    function CommonCallback(alertModalFactory) {

        function onSuccess(successCallBack) {
            return function (response, headers) {
                successCallBack.apply(response , arguments);
            };
        }

        function onError(httpResponse) {
            var callback = function () { };
            alertModalFactory.danger(httpResponse.data.error ? httpResponse.data.error : httpResponse.statusText, callback);
        }

        return {
            onSuccess: onSuccess,
            onError: onError
        };
    }
})();