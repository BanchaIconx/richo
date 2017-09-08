(function () {
    'use strict';

    angular.module('app.common')
        .controller('alertModalController', ['$scope', 'config', '$uibModalInstance', alertModalController])

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
})();