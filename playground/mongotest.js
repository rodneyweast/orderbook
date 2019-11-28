const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CBP_BTC-USD', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Schema = mongoose.Schema;

// Create Schema and Model
const HistorySchema = new Schema({
    time: Date,
    low: Number,
    high: Number,
    open: Number,
    close: Number,
    volume: Number
})

// const CoinSchema = new Schema({
//     exchange: String,
//     symbol: String,
//     history: [HistorySchema] 
// })

const Coin = mongoose.model('entry', HistorySchema);

const Entry = new Coin( {
        time: new Date(1438423140000),
        low: 279.75,
        high: 279.91,
        open: 279.80,
        close: 279.90,
        volume: 0.0565
  
});

// console.log(Entry)
// console.log('Before Entry.save');

Entry.save({upsert: true }).then((Entry) => {
    console.log(Entry)
    mongoose.disconnect();
}).catch((error) => {
    console.log(`Error: ${error}`)
    mongoose.disconnect();
})


// module.export = CoinData;