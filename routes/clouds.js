/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var router = express.Router();
    var request = require('request');

    /* GET triggers listing. */
    router.get('/', function(req, res, next) {

        return request('http://api.wunderground.com/api/639153c7f96ad3d3/hourly/q/UK/Oxford.json', function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var wunderground = JSON.parse(body);
                res.json(wunderground);
            }
        });
    });

    module.exports = router;

    return router;
})();
