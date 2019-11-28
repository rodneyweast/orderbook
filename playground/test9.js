var async = require('async'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testSchema = new Schema({
  "_id": Number,
  "name": String
},{ "_id": false });


var Test = mongoose.model('Test',testSchema,'test');

mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

var data = [
  { "_id": 1, "name": "One" },
  { "_id": 1, "name": "Another" },
  { "_id": 2, "name": "Two" }
];

async.series(
  [
    // Start fresh
    function(callback) {
      Test.deleteOne({},callback);
    },

    // Ordered will fail on error. Upserts never fail!
    function(callback) {
      var bulk = Test.collection.initializeOrderedBulkOp();
      data.forEach(function(item) {
        bulk.find({ "_id": item._id }).upsert().updateOne({
          "$setOnInsert": { "name": item.name }
        });
      });
      bulk.execute(callback);
    },

    // All as expected
    function(callback) {
      Test.find().exec(function(err,docs) {
        console.log('as expected', docs)
        callback(err);
      });
    },


    // Start again
    function(callback) {
      Test.deleteOne({},callback);
    },

    // Unordered will just continue on error and record an error
    function(callback) {
      var bulk = Test.collection.initializeUnorderedBulkOp();
      data.forEach(function(item) {
        bulk.insert(item);
      });
      bulk.execute(function(err,result) {
        callback(); // so what! Could not care about errors
      });
    },


    // Still processed the whole batch
    function(callback) {
      Test.find().exec(function(err,docs) {
        console.log('still processing', docs)
        callback(err);
      });
    }
  ],
  function(err) {
    if (err) throw err;
    mongoose.disconnect();
  }
);