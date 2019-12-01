// must have running database
// launch database with the following code from another terminal window
// /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

const updatetools = require('../updateTools')

const exchange = 'CBP'
const Current_Product = 'BTC-USD'
const connectionURL = 'mongodb://127.0.0.1:27017/' 




  updatetools.DBproductExist(exchange,Current_Product,function(res){
    console.log(res);
  })

