(function () {
    'use strict';

    angular.module('app.core', [
        // Angular modules
        'ngAnimate'
        , 'ngAria'
        , 'ngMessages'
        , 'angular-md5'
        , 'ngStorage'

        // Custom modules
        , 'app.layout'
        , 'app.i18n'

        // 3rd Party Modules
        , 'ngMaterial'
        , 'ui.router'
        , 'ui.bootstrap'
        , 'duScroll'
    ]);

})();

