// Make appendList of data that needs to be added to database
//

const updatetools = require('../updateTools')
const MongoClient = require('mongodb').MongoClient;


const exchange = 'CBP'
const Current_Product = 'BTC-USD'

console.log('Starting')

const connectionURL = 'mongodb://127.0.0.1:27017/'

updatetools.DBfillBlanks(exchange, Current_Product)
