// must have running database
// launch database with the following code from another terminal window
// /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data
// code to do an bulk write with data from an array with
// updateone on each item and upsert = true
//

const {MongoClient, ObjectId} = require('mongodb');

console.log('Starting');
var dataset = [
    {
        time: new Date('2015-08-01T09:59:00.000Z'),
        low: 279.75,
        high: 279.91,
        open: 279.8,
        close: 279.9,
        volume: 1.09
    },
    {
        time: new Date('2015-08-01T10:00:00.000Z'),
        low: 279.7,
        high: 279.9,
        open: 279.7,
        close: 279.8,
        volume: 0.11
    },
    {
        time: new Date('2015-08-01T10:01:00.000Z'),
        low: 279.2,
        high: 280.9,
        open: 279.7,
        close: 280.0,
        volume: 0.32
    },
    {
      time: new Date('2015-08-01T10:02:00.000Z'),
      low: 277.2,
      high: 282.9,
      open: 278.7,
      close: 280.1,
      volume: 0.77
  }
  ];
  
var objects = [];

for (var x = 0; x < dataset.length; x++) {
  objects[x] = {
    updateOne: 
      {
        filter: {time: new Date(dataset[x].time)},
        update: { $set: dataset[x] } ,
        upsert: true
      }
    }
}

console.log(objects)

const url= 'mongodb://localhost:27017/CBP'
console.log('Before MongClient.connect')
MongoClient.connect(url, { useNewUrlParser: true }, async function(err, client)  {
    console.log('Inside MongoClient.connect')
    if (err) throw err;
    console.log('after if (err) in MongClient.connect')
    var dbo = client.db("CBP");
    console.log('after defining dbo')
    dbo.collection('BTC-USD').bulkWrite(objects).then(res => {
      console.log(`Bulk write value: ${JSON.stringify(res, undefined, 2)}`);
    }, (errorMessage) => {
      console.log(errorMessage);
    });
    client.close();
});

