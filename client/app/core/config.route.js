(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
         
            $urlRouterProvider
                .when('/', 'page/404')
                .otherwise('page/404');


            $stateProvider.state('page/404', {
                url: '/page/404',
                templateUrl: 'app/page/404.html'
            });

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
                url: '/equipment/add/:contractId',
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
            $stateProvider.state('pm/add/all',{
                url: '/pm/add/all/:officeId',
                templateUrl: 'app/pm/save.all.html'
            });
            $stateProvider.state('pm/add/all/item',{
                url: '/pm/add/all/items/:pmDataId/:action',
                templateUrl: 'app/pm/save.all.items.html'
            });
            $stateProvider.state('pm/detail',{
                url: '/pm/detail/:pmDataId/:action',
                templateUrl: 'app/pm/view.html'
            });
            $stateProvider.state('pm/search',{
                url: '/pm/search',
                templateUrl: 'app/pm/search.html'
            });

            $stateProvider.state('pm/search/add/all/item',{
                url: '/pm/search/add/all/items/:pmDataId/:action',
                templateUrl: 'app/pm/save.all.items.html'
            });

            // //pm by contract
            // $stateProvider.state('pm/contract/all',{
            //     url: '/pm/contract/all',
            //     templateUrl: 'app/pmByContract/all.html'
            // });
            // $stateProvider.state('pm/contract/byContract',{
            //     url: '/pm/contract/byContract/:contractId',
            //     templateUrl: 'app/pmByContract/byContract.html'
            // });
            // $stateProvider.state('pm/contract/byContractAndRegion',{
            //     url: '/pm/contract/byContractAndRegion/:contractId/:regionId',
            //     templateUrl: 'app/pmByContract/byContractAndRegion.html'
            // });
            // $stateProvider.state('pm/contract/byContractAndRegionAndOffice',{
            //     url: '/pm/contract/byContractAndRegionAndOffice/:officeId',
            //     templateUrl: 'app/pmByContract/byContractAndRegionAndOffice.html'
            // });

            // //pm by branch
            // $stateProvider.state('pm/branch/all',{
            //     url: '/pm/branch/all',
            //     templateUrl: 'app/pmByBranch/all.html'
            // });
            // $stateProvider.state('pm/branch/byBranch',{
            //     url: '/pm/branch/byBranch/:branchId',
            //     templateUrl: 'app/pmByBranch/byBranch.html'
            // });
            // $stateProvider.state('pm/branch/byBranchAndRegion',{
            //     url: '/pm/branch/byBranchAndRegion/:regionId/:contractId',
            //     templateUrl: 'app/pmByBranch/byBranchAndRegion.html'
            // });
            // $stateProvider.state('pm/branch/byBranchAndRegionAndOffice',{
            //     url: '/pm/branch/byBranchAndRegionAndOffice/:officeId',
            //     templateUrl: 'app/pmByBranch/byBranchAndRegionAndOffice.html'
            // });

            //view pm contract
            $stateProvider.state('viewContract/contract',{
                url: "/viewContract",
                templateUrl: "app/pmByContractBranch/contract.html"
            });
            //view pm contract/branch
            $stateProvider.state('viewContract/contract/branch',{
                url: "/viewContract/:contractId",
                templateUrl: "app/pmByContractBranch/branch.html"
            });
            //view pm contract/branch/poRegion
            $stateProvider.state('viewContract/contract/branch/poRegion',{
                url: "/viewContract/:contractId/:branchId",
                templateUrl: "app/pmByContractBranch/region.html"
            });
            //view pm contract/branch/poRegion/po
            $stateProvider.state('viewContract/contract/branch/poRegion/po',{
                url: "/viewContract/:contractId/:branchId/:poRegionId",
                templateUrl: "app/pmByContractBranch/po.html"
            });
            //view pm contract/branch/poRegion/po/wicket
            $stateProvider.state('viewContract/contract/branch/poRegion/po/wicket',{
                url: "/viewContract/:contractId/:branchId/:poRegionId/:poId",
                templateUrl: "app/pmByContractBranch/wicket.html"
            });
        }]
    );

})(); 