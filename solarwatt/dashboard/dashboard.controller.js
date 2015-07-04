(function() {
    'use strict';

    angular.module('solarwatt.dashboard').controller('dashboardController', ['$scope', 'cloudfactory', 'radiationFactory',
        function($scope, cloudFactory, radiationFactory) {
            var availability = [];
            for (var i = 0; i < cloudFactory.clouds.length; i++) {
                var cloud = cloudFactory.clouds[i];
                var available = {};

                for (var n = 0; n < radiationFactory.radiation.length; n++) {
                    var radiation = radiationFactory.radiation[n];
                    if (cloud.time === radiation.time) {
                        var correction = 0.2 + (0.8 * Math.pow(1 - cloud.sky / 100, 2));
                        available = {
                            time: cloud.time,
                            sky: cloud.sky,
                            radiation: radiation.radiation,
                            correction: correction,
                            output: radiation.radiation * correction
                        };

                        availability.push(available);
                        break;
                    }
                }
            }

            $scope.availability = availability;
        }
    ]);
})();
