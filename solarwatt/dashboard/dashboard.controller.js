(function() {
    'use strict';

    angular.module('solarwatt.dashboard').controller('dashboardController', ['$scope', 'currentFactory',
        function($scope, currentFactory) {
            $scope.availability = currentFactory.current;
            $scope.kwp = 4;
            $scope.hours = 4;

            $scope.$watch('kwp', function (newVal, oldVal) {
                if (oldVal === newVal) {
                    return;
                }

                currentFactory.getCurrent($scope.kwp, $scope.hours).then(function () {
                    $scope.availability = currentFactory.current;
                });
            });

            $scope.$watch('hours', function (newVal, oldVal) {
                if (oldVal === newVal) {
                    return;
                }

                currentFactory.getCurrent($scope.kwp, $scope.hours).then(function () {
                    $scope.availability = currentFactory.current;
                });
            });
            $scope.appliances = [
                {"id": "dishwasher", "img": "dishwasher_noun_129754_cc.svg", "power": {"w": 1800, "h": 0.75}},
                {"id": "dryer", "img": "dryer_noun_30042_cc.svg", "power": {"w": 3000, "h": 2}},
                {"id": "laptop", "img": "laptop_noun_3960_cc.svg", "power": {"w": 100, "h": 2}},
                {"id": "microwave", "img": "microwave_noun_147587_cc.svg", "power": {"w": 1000, "h": 0.25}},
                {"id": "oven", "img": "oven_noun_10675_cc.svg", "power": {"w": 3000, "h": 1}},
                {"id": "vacuum", "img": "vacuum_noun_134149_cc.svg", "power": {"w": 1500, "h": 0.25}},
                {"id": "videogame", "img": "videogame_noun_147540_cc.svg", "power": {"w": 500, "h": 2}},
                {"id": "washingmachine", "img": "washingmachine_noun_10373_cc.svg", "power": {"w": 1500, "h": 2}}
            ];
            $scope.check = function (item) {
                var hours = $scope.availability;
                var i;

		for(i=0; i<Math.ceil(item.power.h); i++) {
                  if (hours[i].output < item.power.w) { return 'badAppliance';}
                }

                return 'goodAppliance';
            };
        }
    ]);
})();
