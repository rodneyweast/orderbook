// Start the database before using this code using the following command
//
//      /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

// Get the current time
// get the floor of the current time in minutes
// find the most recent data with the following call
//      db.getCollection('CBP-BTCUSD').find().sort({"timestamp": -1}).limit(1)
// get the data from the most recent to current
//      the code for this is in coinbaseQuery.js
// load this data into the database
//      the code for this is in populatedb.js


// If workingCollection does not Exist, then 
//      find earliest data for transaction by day, 
//      to get a quick assessment of start date 
//      starting with 2015 and working forward by 300 days at a time 
//      until we get data
//      Use the start date from the day data subtract 1 day as a starting point
//          Collect the data starting from 1 day earlier and grab up to 
//          10 data sets of 300 points which represents about 2 days of data
//          Note- if dateNow- startdate means more than 10*300 (3000) minutes then
//          use 3000 minutes
//          else use the dateNow - startdate  to calculate what to grab
//          grab the datasets needed
//          adding each one to the database as we proceed
//          set delay time as 5 seconds
//  Else
//      start at the newest date and grab up to 10 data sets as above
//      if the dateNow - newest date is > 10 minute then set delay of 5 seconds
//      else set delay of 15 minutes


const mongoose = require('mongoose')
const DataFrame = require('dataframe-js').DataFrame;
const cbxQuery = require('../cbxQuery');
const updatetools = require('../updateTools')
const Math = require('math')

const exchange = 'CBP'
const product = 'BTCUSD'

var loadData = (async (product, startDate) => {

});

var loadDb = (async (exchange, product) => {
    console.log('Start loadDb')
    const databaseName = 'crypto-data'
    const connectionURL = 'mongodb://127.0.0.1:27017/'+ databaseName
    var endDate= Math.floor(Date.now()/60000)*60000
    const workingCollection = exchange + '-' + product + '-event';
    var Current_Product=  product.substring(0,3)+ '-' + product.substring(3,6);

    console.log(`Current Product: ${Current_Product}`)

    //is the following connect needed?
    mongoose.connect(connectionURL,{
        useNewUrlParser: true,
        useCreateIndex: true
    })

    const Db = mongoose.createConnection(connectionURL, { useNewUrlParser: true })
    console.log('Working Collection: ', workingCollection)
    Db.on('open', function () {
        // get list of existing collections
        Db.db.listCollections().toArray(function (err, collectionNames) {
        console.log('In Db.on');
        if (err) {
            console.log(err);
            return;
        }
            const names = collectionNames.map(col => col.name);
            // console.log('Inside: ', names)
            // does the the collection exist yet?
            if (names.includes(workingCollection.toLowerCase()+'s')){
                //Get it up to date
                // grab up to a month of data
                console.log('Collection exist')

                // update Collection
                //get the latest date from the collection and use it as start date
                // use now as the end date unless it is greater than month

            }
            else {
                // If it doesn't then create a collection
                // Go through the data year by year at the Day granularity
                // once you find a day that has data, then grab up to a month worth of data
                console.log('Collection does not exist: ', Current_Product)
        //      find earliest data for transaction by day, 
        //      to get a quick assessment of start date 
        //      starting with 2014 and working forward by 300 days at a time 

            updatetools.getStartDate(Current_Product).then(res => {

                    endDate= Math.min(res+86400*1000*30, endDate)
                    console.log(`Start: ${(res)}  End: ${(endDate)}`);
                    console.log(`Start: ${new Date(res)}  End: ${new Date(endDate)}`);
                    // loadData(Current_Product, res)
                }, (errorMessage) => {
                    console.log(errorMessage);
                });
            }       
        });
    });

    mongoose.disconnect();

});
console.log('•••••• Starting ••••••••')
loadDb(exchange, product);