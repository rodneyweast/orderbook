
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
  if (err) throw err;

  var dbo = db.db("CBP");
  var myquery = { time:  new Date('2015-08-01T09:59:00.000Z') };
  var newvalues = { $set: {
        time: new Date('2015-08-01T09:59:00.000Z'),
        low: 279.75,
        high: 279.91,
        open: 279.8,
        close: 279.9,
        volume: 0.0565
      }};

  dbo.collection("BTC-USD").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
