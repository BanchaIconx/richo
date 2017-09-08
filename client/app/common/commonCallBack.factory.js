(function () {
    'use strict';

    angular.module('app.common')
        .factory('CommonCallback', ['AlertModalFactory', CommonCallback]);

    function CommonCallback(AlertModalFactory) {

        function onSuccess(successCallBack) {
            return function (response, headers) {
                successCallBack.apply(response, arguments);
            };
        }

        function onError(httpResponse) {
            var callback = function () { };
            $log.log(httpResponse);
            AlertModalFactory.danger(httpResponse.data.error ? httpResponse.data.error : httpResponse.statusText, callback);
        }

        return {
            onSuccess: onSuccess,
            onError: onError
        };
    }
})();