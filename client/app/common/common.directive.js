(function () {
    'use strict';

    angular.module('app')
        .directive('backButton', backButton);

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
})();