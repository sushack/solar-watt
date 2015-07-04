(function() {
    'use strict';

    angular.module('solarwatt.cloudgraph').controller('CloudgraphController', [
        '$scope', 'cloudfactory',
        function($scope, cloudfactory) {
            $scope.test = 'hello';

            $scope.clouds = cloudfactory.clouds;
        }
    ]);
})();
