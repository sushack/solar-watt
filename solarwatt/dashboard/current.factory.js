(function() {
    'use strict';

    angular.module('solarwatt.dashboard').factory('currentFactory', [
        'Restangular',
        function(restangular) {
            var o = {
                current: []
            };

            o.getCurrent = function(panels, hours) {
                if (panels === undefined || panels < 1) {
                    panels = 1;
                }

                if (hours === undefined || hours < 1) {
                    hours = 1;
                }

                return restangular.all('current').getList({
                    kwp: panels,
                    hours: hours
                }).then(function(data) {
                    o.current = data;
                });
            };

            return o;
        }
    ]);

})();
