(function () {
    'use strict';

    angular.module('app')
        .service('dropdownlistService', ['$http', dropdownlistService]);

    function dropdownlistService($http) {

        function ddlBranches(branchId) {
            return [{
                key: 1,
                value: "Branch 1"
            }];
        }

        return {
            ddlBranches: ddlBranches
        };
    }
})();