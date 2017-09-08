(function () {
    'use strict';

    angular.module('app')
        .service('authenService', ['$http', 'appConfig', 'CommonCallback' ,'alertModalFactory', 'md5', authenService]);

    function authenService($http, config, CommonCallback , alertModalFactory, md5) {

        var req_login = {
            method: 'POST',
            url: config.apiUrl + '/authen/postLogin',
            data: {}
        }

        function login(users, successCallBack) {
            var _user = angular.copy(users);
            _user.password = md5.createHash(_user.password);
            req_login.data = angular.copy(_user);
            $http(req_login)
                .then(CommonCallback.onSuccess(successCallBack), function onError(httpResponse) {
                    var callback = function () { };
                    alertModalFactory.danger(httpResponse.data.Message, callback);
                });
        }

        return {
            login: login
        }
    }
})();