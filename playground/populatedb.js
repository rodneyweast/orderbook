// CRUD - create, read, update, delete
// Before running this code, you need to make sure that the database server is running
// Use the following command to start it:
//
//      /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

// this code will read data from file with name stored in const "fileName" 
// It formats the data so that each element is a key named entry into the database
// It will not write the data to the databas if the data already exist


const _ = require('lodash');
const fs = require('fs');

const fileName = 'BTC_Data19.json'
const exchange = 'CBP'
const transaction = 'BTCUSD'
const collection = exchange + '-' + transaction

console.log(collection)

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'crypto-data'

var getData = () => {
    try{
        var theData= fs.readFileSync(fileName);
        return JSON.parse(theData);
    } catch (e) {
        return [];
    }
 };

var historyData= getData()
var keynames =  ["timestamp", "low", "high", "open", "close"]

console.log("Number of entries:", historyData.length)

console.log('••••••••••••••••••••••••')

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (error,client) => {
    if  (error) {
        return console.log('Unable to connect to database')
    } 

    // console.log('Connected Correctly')
    const db = client.db(databaseName)
    // for loop writes the data from the file in the correct format to the Database
 
    var currentValue= {}
    // var dataValue = _.zipObject(keynames, historyData[0]);
    // console.log(dataValue)
    // currentValue = { timestamp : dataValue.timestamp}
    // console.log(currentValue)
    // db.collection('CBP-BTCUSD').updateOne(
    //     currentValue,
    //     {$set:dataValue},
    //     {upsert: true }
    // )


    for (var i = 0; i < historyData.length; i++) { 
    // for (var i = 0; i < 5; i++) { 
            var dataValue = _.zipObject(keynames, historyData[i]);
        // console.log(dataValue)
        currentValue = { timestamp : dataValue.timestamp}
        // console.log(currentValue)
        db.collection('CBP-BTCUSD').updateOne(
            currentValue,
            {$set:dataValue},
            {upsert: true }
        )
    }
    console.log('Finished loading data')
    // db.collection('CBP-BTCUSD').updateOne(
    //     { timestamp: 1438423140 },
    //     {$set:{
    //     timestamp: 1438423140,
    //     low: 279.89,
    //     high: 279.89,
    //     open: 279.89,
    //     close:279.89,
    //     volume: 0.0565
    //     }},
    //     { upsert: true }
    // )

})
