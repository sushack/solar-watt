(function() {
    'use strict';

    angular.module('solarwatt.cloudgraph', []);

    angular.module('solarwatt.cloudgraph').config([
    	'$stateProvider',
    	function($stateProvider){
    		$stateProvider.state('cloudgraph', {
                url: '/cloudgraph',
                templateUrl: 'cloudgraph/partials/graph.html',
                controller:'CloudgraphController',
                resolve:{
                    getClouds:['cloudfactory', function(cloudfactory){
                        return cloudfactory.getClouds();
                    }]
                }
    		});
    	}]);
})();
