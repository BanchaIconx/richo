(function () {
    'use strict';

    angular.module('app')
        .directive('backButton', backButton)
        .directive('confirm', ['$mdDialog', '$log', '$filter', confirm])

    function backButton() {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                element.addClass("btn md-fab md-fab-sm md-primary md-button md-ink-ripple");
                element.append('<span class="fa fa-chevron-left"></span>');
                element.on('click', function () {
                    window.history.back();
                });
            }
        };
    }

    function confirm($mdDialog, $log, $filter) {
        return {
            link: function (scope, element, attr) {
                var clickAction = attr.confirmClick;
                element.bind('click', function (ev) {
                    var msg = $filter('translate')(attr.confirm) || $filter('translate')('confirm');
                    var confirm = $mdDialog.confirm()
                        .title(msg)
                        .targetEvent(ev)
                        .ok('ตกลง')
                        .cancel('ยกเลิก');
                    $mdDialog.show(confirm).then(function () {
                        scope.$eval(clickAction)
                    }, function () { });
                });

            }
        };
    }
})();