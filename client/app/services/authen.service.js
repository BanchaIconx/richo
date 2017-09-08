(function () {
    'use strict';

    angular.module('app')
        .service('authenService', ['$http', 'appConfig' ,'CommonCallback' ,'$sessionStorage', authenService]);

    function authenService($http, config, CommonCallback, sessionStorage) {

        var http = $http('', {}, {
            'login': {
                method: 'POST',
                url: config.apiUrl + '/authen/postLogin'
            }
        });

        function login(data, successCallBack) {
			resource.login(data,
				CommonCallback.onSuccess(successCallBack),
				CommonCallback.onError);
		}
    }
})();