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

const databaseName = 'crypto-data1'
const connectionURL = 'mongodb://127.0.0.1:27017/'+ databaseName

const exchange = 'CBP'
// const transaction = 'BTCUSD'
const transaction = 'LTCUSD'

const workingCollection = exchange + '-' + transaction + '-event'

// does the the collection exist yet?
// If it doesn't then create a collection







MongoClient.connect(connectionURL, {useNewUrlParser: true }, (error,client) => {
    if  (error) {
        return console.log('Unable to connect to database')
    } 

    const db = client.db(databaseName)
    
    client.collectionNames(function(err, collections){
        console.log(collections);
    });
    // console.log('Connected Correctly')
    // const db = client.db(databaseName).collection(workingCollection)
    // console.log('db: ',db)
    // // var lastDate=  db.collection(workingCollection).find().sort({"timestamp": -1}).limit(1)
    // // console.log("Last Date: ", lastDate)

    // //Count items in database 
    // db.find().count().then( (count) => {
    //     console.log('Number of Entries: ',count);
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    // console.log('Finished loading data')

    client.close();
})

// Get Current data in order to see if we are up to date

var endDate= Date.now()
console.log('endDate: ', endDate)
