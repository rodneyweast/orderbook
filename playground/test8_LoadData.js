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
const product = 'BTC-USD'
const connectionURL = 'mongodb://127.0.0.1:27017/'

var LoadData = (async (exchange, product, startdate) => {
    var startDate = new Date( Math.floor(startdate.getTime()/60)*60)
    var currentStart=new Date(startDate);
    // var endDate= new Date(startDate.getTime()+30*86400*1000);
    var endDate= new Date(startDate.getTime()+60*(1*30*1440)*1000);   // 60days= ~ 1 months later
    if (endDate> (new Date())) endDate= Math.floor(new Date()/60)*60;
    var currentEnd
    var granularity = 60;
    var currentSet
    var i = 0;
    do {
       i++;
        currentEnd= new Date(currentStart.getTime() + 300 * granularity*1000);
        if (currentEnd > endDate) currentEnd= new Date(endDate);
        console.log(`Start ${i}: ${currentStart}`)
        // get the Historic Rates
        // console.log('before call to getHistoricRates')
        currentSet = await cbxQuery.getHistoricRates (product, currentStart, currentEnd, granularity)
        // console.log('currentSet; ', currentSet)

        updatetools.DBupdateSet(exchange,product,currentSet)
        currentStart= new Date(currentStart.getTime() + 301 * granularity*1000);
        await cbxQuery.sleep(500) 
        // console.log('after sleep')
    } while ( currentStart < endDate);
    console.log('wow it is here')
});

LoadData(exchange, product, new Date('2015-08-01T11:33:00.000Z'))