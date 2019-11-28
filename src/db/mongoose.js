const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/crypto-data1'

const rightNow= Date.now()
console.log(rightNow)

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex: true
})

const exchange = 'CBP'
const transaction = 'BTCUSD'
// const transaction = 'LTCUSD'

const workingCollection = exchange + '-' + transaction + '-event'

const coinHistory = mongoose.model(workingCollection, {
    timestamp: {
        type: Date
    },
    low: {
        type: Number
    }, 
    high: {
        type: Number
    }, 
    open: {
        type: Number
    },
    close:{
        type: Number
    }
})

const coinEvent = new coinHistory({
    timestamp: 1565545360000,
    low: 279.89,
    high: 279.89,
    open: 279.89,
    close: 279.89,
    volume: 0.0565
})

coinEvent.save().then(() =>{
    console.log('Coin Event: ',coinEvent)
}).catch( (error) =>{
    console.log('Error: ',error)
})


const Db = mongoose.createConnection(connectionURL, { useNewUrlParser: true })
Db.on('open', function () {
    Db.db.listCollections().toArray(function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
        // console.log('collection: ', collectionNames)

        const names = collectionNames.map(col => col.name);
        console.log(names)
        // for(var i=0; i < collectionNames.length; i++){
        //     console.log(`${i}: ${collectionNames[i].name}`);
        // } 
        Db.close();
    });
});