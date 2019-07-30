// CRUD - create, read, update, delete
// Before running this code, you need to make sure that the database server is running
// Use the following command to start it:
//
//      /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'crypto-data'

MongoClient.connect(connectionURL, {useNewUrlParser: true }, (error,client) => {
    if (error) {
        return console.log('Unable to connect to database')
    } 

    console.log('Connected Correctly')
})