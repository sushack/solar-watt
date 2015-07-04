(function() {
    angular.module('solarwatt.radiation').factory('radiationFactory', ['Restangular',
        function(restangular) {
            var o = {
                radiation: []
            };

            o.getRadiation = function() {
                return restangular.all('radiation').getList().then(function(data) {
                    o.radiation = data;
                });
            };

            return o;
        }
    ]);
})();
