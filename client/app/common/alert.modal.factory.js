(function () {
    'use strict';

    angular.module('app.common')
        .factory('alertModalFactory', ['$uibModal', alertModalFactory]);

    function alertModalFactory($modal) {

        function success(text, thenCallback) {
            open('success', text, thenCallback);
        }

        function danger(text, thenCallback) {
            open('danger', text, thenCallback);
        }

        function open(mode, text, thenCallback) {
            $modal.open({
                templateUrl: 'app/common/alert.modal.html',
                controller: 'alertModalController',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    config: function () {
                        return {
                            mode: mode,
                            text: text
                        };
                    }
                }
            }).result.then(function () {
                if (thenCallback) {
                    thenCallback();
                }
            });
        }

        return {
            success: success,
            danger: danger
        };
    }
})();
