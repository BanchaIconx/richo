(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'
        
        // Custom Feature modules
        ,'app.page'
        ,'app.user'
        ,'app.equipment'
        ,'app.pm'
        ,'app.pmByContract'
        ,'app.pmByBranch'
        
        // 3rd party feature modules
        ,'mgo-angular-wizard'
        ,'ui.tree'
        ,'ngMap'
    ]);

})();

