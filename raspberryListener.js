var request = require('request');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var intervalTime = 60000;

var expirationDate = 30 * 60000 //60,000 milliseconds in a minute

setInterval(function() {
    request.get('http://localhost:3456/data', function (error, response, body) {
        assert.equal(null, error);

        var data = JSON.parse(body);

        // Connection URL
        var url = 'mongodb://localhost:27017/stationData';
        // Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            data.timeStamp = new Date();

            var collection = db.collection('stations');
            collection.insertOne(data, function (err, result) {
                if(err) {
                    console.log('Error: ', err);
                    db.close();
                }

                db.close();
                console.log('Data saved successfully');

                cleanUpData();
            });
        });
    });
}, intervalTime);


function cleanUpData() {
    // Connection URL
    var url = 'mongodb://localhost:27017/stationData';
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var dateToCheckBy = new Date() - expirationDate;

        var filterQuery = {
            'timeStamp': {
                '$lt': new Date(dateToCheckBy)
            }
        };

        var collection = db.collection('stations');
        collection.deleteMany(filterQuery, function (err, result) {
            if(err) {
                console.log('Error: ', err);
                db.close();
            }

            db.close();
            console.log('Data deleted successfully');
        });
    });
}