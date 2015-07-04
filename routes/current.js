/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var router = express.Router();
    var request = require('request');

    /* GET triggers listing. */
    router.get('/', function(req, res, next) {

        var kwp = req.query.kwp;
        if (kwp === undefined) {
            kwp = 1;
        }

        var hours = req.query.hours;
        if (hours === undefined) {
            hours = 1;
        }

        var radiation = [{
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

        return request('http://api.wunderground.com/api/639153c7f96ad3d3/hourly/q/UK/Oxford.json', function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var wunderground = JSON.parse(body);

                var clouds = [];

                for (var i = 0; i < 24; i++) {
                    var forecast = wunderground.hourly_forecast[i];

                    var time = forecast.FCTTIME.hour_padded + ":" + forecast.FCTTIME.min;
                    var sky = forecast.sky;

                    clouds.push({
                        time: time,
                        sky: sky
                    });
                }

                var availability = [];
                for (var i = 0; i < clouds.length; i++) {
                    var cloud = clouds[i];
                    var available = {};

                    for (var n = 0; n < radiation.length; n++) {
                        var radiationRow = radiation[n];
                        if (cloud.time === radiationRow.time) {
                            var correction = (0.2 + (0.8 * (1 - cloud.sky / 100))) * (0.2 + (0.8 * (1 - cloud.sky / 100)));
                            available = {
                                time: cloud.time,
                                sky: cloud.sky,
                                radiation: radiationRow.radiation,
                                correction: correction,
                                output: (radiationRow.radiation * correction) * kwp
                            };

                            availability.push(available);
                            break;
                        }
                    }
                }

                var availabilitySort = function(a, b) {
                    if (a.time < b.time) {
                        return -1;
                    }
                    if (a.time > b.time) {
                        return 1;
                    }
                    return 0;
                };

                availability.sort(availabilitySort);

                var respond = [];

                var date = new Date();
                var current_hour = date.getHours();

                for (var i = 0; i < hours; i++) {
                    respond.push(availability[i + current_hour]);
                }

                res.json(respond);
            }
        });

    });

    module.exports = router;

    return router;
})();
