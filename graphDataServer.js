var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var assert = require('assert');

var app = express();

var dataInMilliSeconds = 30 * 60000; //60,000 milliseconds in a minute

app.get('/graphData', function (req, res) {

    // Connection URL
    var url = 'mongodb://localhost:27017/stationData';

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var dateToCheckBy = new Date() - dataInMilliSeconds;
        //var dateToCheckBy = new Date();
        var filterQuery = {
          'timeStamp': {
              '$gte': new Date(dateToCheckBy)
          }
        };

        var collection = db.collection('stations');

        collection.find(filterQuery).toArray(function (err, docs) {
            if(err) {
                console.log('Error: ', err);
                db.close();
            }

            res.send(docs);

            db.close();
        });
    });

});

app.listen(8080, function (err) {
    if (err) {
        console.log('There has been an error', err);
    }

    console.log('server is listening on port 8080');
});
