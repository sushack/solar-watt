(function() {
    'use strict';

    angular.module('solarwatt.cloudgraph').factory('cloudfactory', ['Restangular',
        function(restangular) {
            var o = {
                clouds: []
            };

            o.getClouds = function() {
                console.log('getting clouds');
                return restangular.one('clouds').get().then(function(data) {
                    o.clouds = data;
                });
            };

            return o;
        }
    ]);
})();
