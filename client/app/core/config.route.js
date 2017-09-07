(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
         
            $urlRouterProvider
                .when('/', 'pm/contract/all')
                .otherwise('pm/contract/all');


            // $stateProvider.state('dashboard', {
            //     url: '/dashboard',
            //     templateUrl: 'app/dashboard/dashboard.html'
            // });

            $stateProvider.state('signin', {
                url: '/signin',
                templateUrl: 'app/page/signin.html'
            });

            //user
            $stateProvider.state('user/manage',{
                url: '/user/manage',
                templateUrl: 'app/user/manage.html'
            });
            $stateProvider.state('user/changePassword',{
                url: '/user/changePassword',
                templateUrl: 'app/user/changePassword.html'
            });
            $stateProvider.state('user/add',{
                url: '/user/add',
                templateUrl: 'app/user/add.html'
            });
            $stateProvider.state('user/edit',{
                url: '/user/edit/:userId',
                templateUrl: 'app/user/edit.html'
            });

            //equipment
            $stateProvider.state('equipment/manage',{
                url: '/equipment/manage',
                templateUrl: 'app/equipment/manage.html'
            });
            $stateProvider.state('equipment/add',{
                url: '/equipment/add',
                templateUrl: 'app/equipment/add.html'
            });
            $stateProvider.state('equipment/edit',{
                url: '/equipment/edit/:id',
                templateUrl: 'app/equipment/edit.html'
            });

            //manage pm
            $stateProvider.state('pm/manage',{
                url: '/pm/manage',
                templateUrl: 'app/pm/manage.html'
            });
            $stateProvider.state('pm/add',{
                url: '/pm/add',
                templateUrl: 'app/pm/add.html'
            });

            //pm by contract
            $stateProvider.state('pm/contract/all',{
                url: '/pm/contract/all',
                templateUrl: 'app/pmByContract/all.html'
            });
            $stateProvider.state('pm/contract/byContract',{
                url: '/pm/contract/all/:contractId',
                templateUrl: 'app/pmByContract/byContract.html'
            });
            $stateProvider.state('pm/contract/byContractAndRegion',{
                url: '/pm/contract/all/:contractId/:regionId',
                templateUrl: 'app/pmByContract/byContractAndRegion.html'
            });
            $stateProvider.state('pm/contract/byContractAndRegionAndOffice',{
                url: '/pm/contract/all/:contractId/:regionId/:officeId',
                templateUrl: 'app/pmByContract/byContractAndRegionAndOffice.html'
            });

            //pm by branch
            $stateProvider.state('pm/branch/all',{
                url: '/pm/branch/all',
                templateUrl: 'app/pmByBranch/all.html'
            });
            $stateProvider.state('pm/branch/byBranch',{
                url: '/pm/branch/all/:branchId',
                templateUrl: 'app/pmByBranch/byBranch.html'
            });
            $stateProvider.state('pm/branch/byBranchAndRegion',{
                url: '/pm/branch/all/:branchId/:regionId',
                templateUrl: 'app/pmByBranch/byBranchAndRegion.html'
            });
            $stateProvider.state('pm/branch/byBranchAndRegionAndOffice',{
                url: '/pm/branch/all/:branchId/:regionId/:officeId',
                templateUrl: 'app/pmByBranch/byBranchAndRegionAndOffice.html'
            });
        }]
    );

})(); 