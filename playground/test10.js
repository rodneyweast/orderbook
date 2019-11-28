
// need to be able to do a bulk update, but have had problems getting it to work with
// fields other than id when I change the name from _id to time even keeping time as 
// a number the code fails
// I believe test9.js may be overly complex anyway, so am thinking of testing code from:
//https://docs.mongodb.com/manual/reference/method/Bulk.find.upsert/

const mongoose = require('mongoose'),
        assert = require('assert');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
 
// mongoose.set('debug', true);

var testSchema = new Schema({
    "time": Number,
    "name": String
  });

var data = [
    { "time": 1, "name": "One" },
    { "time": 1, "name": "Another" },
    { "time": 2, "name": "Two" }
  ];

var TestModel = mongoose.model('test', testSchema);

var identifier = 'does-not-exist';

TestModel.findOneAndUpdate({}
    , update, {
    upsert: true,
    new: true,
    overwrite: true // works if you comment this out
}, function(err, model) {
    assert.equal(model.time, 'tag1');

    process.exit(0);
});

//https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/
// or maybe:
//https://silvantroxler.ch/2016/insert-or-update-with-mongodb-and-mongoose/