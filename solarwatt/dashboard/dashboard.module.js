(function() {
    'use strict';

    angular.module('solarwatt.dashboard', []);

    angular.module('solarwatt.dashboard').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('solarwatt.dashboard', {
                url: '/',
                abstract: true,
                template: '<div ui-view></div>'
            });

            $stateProvider.state('solarwatt.dashboard.page', {
                url: '',
                templateUrl: 'dashboard/partials/index.html'
            });
        }
    ]);

})();
