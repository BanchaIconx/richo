(function () {
    'use strict';

    angular.module('app.common')
        .controller('alertModalController', ['$scope', alertModalController])

    function alertModalController($scope) {

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