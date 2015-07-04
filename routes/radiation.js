/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var router = express.Router();

    /* GET triggers listing. */
    router.get('/', function(req, res, next) {
        var result = [{
            time: '14:00',
            radiation: 821
        }, {
            time: '15:00',
            radiation: 664
        }, {
            time: '16:00',
            radiation: 471
        }, {
            time: '17:00',
            radiation: 269
        }, {
            time: '18:00',
            radiation: 96
        }, {
            time: '19:00',
            radiation: 39
        }, {
            time: '20:00',
            radiation: 0
        }, {
            time: '21:00',
            radiation: 0
        }, {
            time: '22:00',
            radiation: 0
        }, {
            time: '23:00',
            radiation: 0
        }, {
            time: '00:00',
            radiation: 0
        }, {
            time: '01:00',
            radiation: 0
        }, {
            time: '02:00',
            radiation: 0
        }, {
            time: '03:00',
            radiation: 0
        }, {
            time: '04:00',
            radiation: 20
        }, {
            time: '05:00',
            radiation: 48
        }, {
            time: '06:00',
            radiation: 134
        }, {
            time: '07:00',
            radiation: 318
        }, {
            time: '08:00',
            radiation: 521
        }, {
            time: '09:00',
            radiation: 707
        }, {
            time: '10:00',
            radiation: 853
        }, {
            time: '11:00',
            radiation: 942
        }, {
            time: '12:00',
            radiation: 967
        }, {
            time: '13:00',
            radiation: 926
        }];

        res.json(result);
    });

    module.exports = router;

    return router;
})();
