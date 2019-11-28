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


// If Current_Product does not Exist, then 
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


const exchange = 'CBP'
const Current_Product = 'BTC-USD'
//const Current_Product = 'LTC-USD'

const connectionURL = 'mongodb://127.0.0.1:27017/'+ exchange

console.log('Current_Product: ', Current_Product);
console.log('••••••••• Starting •••••••••••••')

// Get Current data in order to see if we are up to date
// and round it down to the previous minute

var endDate= Math.floor(Date.now()/60000)*60000

console.log('Current Date: ', new Date(endDate))


mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// get list of existing collections

const Db = mongoose.createConnection(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true})

Db.on('open', function () {
    Db.db.listCollections().toArray(function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
        const names = collectionNames.map(col => col.name);
        console.log('Inside: ', names)
        // does the the collection exist yet?
        
        if (names.includes(Current_Product)){
            // if (names.includes(Current_Product.toLowerCase())){
            //Get it up to date
            // grab up to a month of data
            console.log('Collection exist')
            // get the most recent date of collection
            // update Collection
        }
        else {
            console.log('Collection does not exist: ', Current_Product)
            // If it doesn't then read the data from the exchange
            // and find the oldest date from that exchange 
            updatetools.getStartDate(Current_Product).then(res => {
                console.log(`Date to Start Loading for ${Current_Product}: ${(new Date(res))}`);
                // updatetools.loadData(Current_Product, res)
            //then add 1 year of data using the code that I built int test12_bulkWriteUpsert.js
            // and updateTools.js
            
            }, (errorMessage) => {
                console.log(errorMessage);
            });
        }       
    });
});

mongoose.disconnect()

