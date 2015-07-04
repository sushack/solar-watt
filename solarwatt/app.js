(function() {
    'use strict';
    angular.module('solarwatt', [
        'ui.router',
        'angular-loading-bar',
        'restangular',
        'ui.select2',
        'angularMoment',
        'yaru22.angular-timeago',
        'ngToast',
        'solarwatt.templates',
        'solarwatt.cloudgraph',
        'solarwatt.radiation',
        'solarwatt.dashboard'
    ]);

    angular.module('solarwatt').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('solarwatt', {
                url: '',
                abstract: true,
                template: '<div ui-view></div>'
            });

            $urlRouterProvider.otherwise('/');
        }
    ]);

    angular.module('solarwatt').config(['RestangularProvider',
        function(RestangularProvider) {
            RestangularProvider.setBaseUrl('api/v1');
        }
    ]);

    angular.module('solarwatt').filter('numberFixedLen', function() {
        return function(n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = '' + num;
            while (num.length < len) {
                num = '0' + num;
            }
            return num;
        };
    });

    angular.module('solarwatt').directive('timeInput', ['moment', function(moment) {
        var tpl = '<div class="time_input">' +
            '<input ng-model="timeInput" type="hidden" placeholder="00.00">' +
            '<input ng-model="time.hours" type="number" class="hours" placeholder="00" max="6" min="0" step="1">' +
            '<span class="time-sep">:</span>' +
            '<input ng-model="time.minutes" type="number" class="minutes" placeholder="00" min="0" max="59" step="1">' +
            '<span class="time-sep">:</span>' +
            '<input ng-model="time.seconds" type="number" class="seconds" placeholder="000" min="0" max="59" step="1">' +
            '</div>';

        return {
            restrict: 'A',
            template: tpl,
            replace: true,
            scope: {
                timeInput: '='
            },
            link: function(scope, element, attrs) {

                scope.$watch('timeInput', function(newValue) {
                    var duration = moment.duration(newValue, 'seconds');
                    scope.time = {
                        hours: duration.hours(),
                        minutes: duration.minutes(),
                        seconds: duration.seconds()
                    };
                });

                scope.$watchCollection('time', function(newTime, oldTime) {
                    scope.timeInput = moment.duration(newTime, 'seconds').asSeconds();
                });
            }
        };
    }]);

    angular.module('solarwatt').filter('time', [
        'moment', '$filter',
        function(moment, $filter) {
            return function(input) {
                var time = moment.duration(input, 'seconds');
                var hours = $filter('numberFixedLen')(time.hours());
                var minutes = $filter('numberFixedLen')(time.minutes(), 2);
                var seconds = $filter('numberFixedLen')(time.seconds(), 2);
                return hours + ':' + minutes + ':' + seconds;
            };
        }
    ]);

    angular.module('solarwatt').constant('angularMomentConfig', {
        preprocess: 'unix', // optional
        timezone: 'Europe/London' // optional
    });

    return angular;
})();
