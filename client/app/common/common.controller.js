(function () {
    'use strict';

    angular.module('app.common')
        .controller('alertModalController', ['$scope', 'config', '$uibModalInstance', alertModalController])
        .factory('setupFactory', ['appConfig', '$sessionStorage', setupFactory])

    function alertModalController($scope, config, $modalInstance) {
        //variable
        $scope.mode = config.mode;
        $scope.text = config.text;

        //function
        $scope.close = close;

        function close() {
            $modalInstance.close();
        }
    }

    function setupFactory(appConfig, $sessionStorage) {

        //variable 
        // var token = $sessionStorage.user.token;
        var token = "1";

        function serviceGet(url, data, data2) {
            var _url = appConfig.apiUrl + url;
            if(data != undefined){
                _url += data;
            }
            if(data2 != undefined){
                _url += ("/" + data2);
            }
            return {
                method: 'GET',
                url: _url,
                headers: {
                    token: token
                }
            };
        }

        function servicePost(url, data) {
            return {
                method: 'POST',
                url: appConfig.apiUrl + url,
                headers: {
                    token: token
                },
                data: data
            }
        }

        function serviceDelete(url, data) {
            return {
                method: 'DELETE',
                url: appConfig.apiUrl + url + data,
                headers: {
                    token: token
                }
            }
        } 

        return {
            serviceGet: serviceGet,
            servicePost: servicePost,
            serviceDelete: serviceDelete
        }
    }
})();