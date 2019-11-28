// must have running database
// launch database with the following code from another terminal window
// /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data

var MongoClient = require('mongodb').MongoClient;

const exchange = 'CBP'
const Current_Product = 'BTC-USD'

const connectionURL = 'mongodb://127.0.0.1:27017/' + exchange
MongoClient.connect(connectionURL, { useNewUrlParser: true, },function(err, client) {
  if (err) throw err;
  console.log('before client.db')
  client.db(exchange).collection(Current_Product).find().sort({"time": -1}).limit(1).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0].time);
  });
  client.close();
});
