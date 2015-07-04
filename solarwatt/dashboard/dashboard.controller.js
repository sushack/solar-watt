(function() {
    'use strict';

    angular.module('solarwatt.dashboard').controller('dashboardController', ['$scope', 'currentFactory',
        function($scope, currentFactory) {
            $scope.availability = currentFactory.current;
            $scope.kwp = 1;
            $scope.hours = 1;

            $scope.$watch('kwp', function(newVal, oldVal) {
                if (oldVal === newVal) {
                    return;
                }

                currentFactory.getCurrent($scope.kwp, $scope.hours).then(function() {
                    $scope.availability = currentFactory.current;
                });
            });

            $scope.$watch('hours', function(newVal, oldVal) {
                if (oldVal === newVal) {
                    return;
                }

                currentFactory.getCurrent($scope.kwp, $scope.hours).then(function() {
                    $scope.availability = currentFactory.current;
                });
            });
        }
    ]);
})();
