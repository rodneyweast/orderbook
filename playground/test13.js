// must have running database
// launch database with the following code from another terminal window
// /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

var MongoClient = require('mongodb').MongoClient;

const exchange = 'CBP'
const Current_Product = 'BTC-USD'
const connectionURL = 'mongodb://127.0.0.1:27017/'

function DBmostRecentDate(exch, cp, callback) {
  MongoClient.connect(connectionURL, { useNewUrlParser: true, },function(err, client) {
    if (err) {
      return console.dir(err);
    }
    client.db(exch).collection(cp).find().sort({"time": -1}).limit(1).toArray(function(err, items) {
      // console.log(items);
      client.close(); 
      return callback(items[0].time);     
    });
  });
}


DBmostRecentDate(exchange, Current_Product, function(res){
  console.log(res);
})