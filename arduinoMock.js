var express = require('express');
var _ = require('lodash');

var app = express();

app.get('/data', function (req, res) {

    var tempData = _.random(0, 100);
    var pressureData = _.random(0, 100);
    var miscData = _.random(0, 100);

    var data = {
        "temp": tempData,
        "pressure": pressureData,
        "misc": miscData
    };

    res.send(data);

});

//app.listen(3456);

app.listen(3456, function (err) {
    if (err) {
        console.log('There has been an error', err);
    }

    console.log('server is listening on port 3456');
});