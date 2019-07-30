const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const HistorySchema = new Schema({
    time: Number,
    low: Number,
    high: Number,
    open: Number,
    close: Number,
    volume: Number
})
const CoinSchema = new Schema({
    exchange: String,
    symbol: String,
    history: [HistorySchema] 
})

const CoinData = mongoose.model('coin', CoinSchema);


module.export = CoinData;