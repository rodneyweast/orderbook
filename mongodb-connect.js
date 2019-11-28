const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to  server:\n', err);
    }
    console.log('Connected to MongoDB server');
    const db= client.db('test')

    // db.collection('Todos').insertOne({
    //     text: 'Run Electricity to studio',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    db.collection.updateOne(
        {time: new Date('2015-08-01T09:59:00.000Z')},
        {
            time: new Date('2015-08-01T09:59:00.000Z'),
            low: 279.75,
            high: 279.91,
            open: 279.8,
            close: 279.9,
            volume: 0.0565
        }, (err, result) => {
        if (err) {
            return console.log('Unable to insert User', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    client.close();
});

