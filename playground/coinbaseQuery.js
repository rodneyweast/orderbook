//testing routines to test libarary that is used to test Coinbase pro query routines
//I need a dataframe tool like pandas, and the one that is getting the most
// downloads is:
//      dataframe-js

var date = new Date();

var DataFrame = require('dataframe-js').DataFrame;
const cbxQuery = require('../cbxQuery');

var Current_Product= 'BTC-USD';

// cbxQuery.getTicker(Current_Product).then(res => {
//     console.log(`Price of ${Current_Product}: ${res.price}`);
//     console.log(JSON.stringify(res, undefined, 2));
// }, (errorMessage) => {
//     console.log(errorMessage);
// });

// cbxQuery.get_product_order_book(Current_Product,2).then(res => {
//     //console.log('The Bids are:', JSON.stringify(res.bids, undefined, 2));
//     console.log('The Asks are:', JSON.stringify(res.asks, undefined,2));
//     console.log('type: ', typeof(res.asks));
// }, (errorMessage) => {
//     console.log(errorMessage);
// });

// Test get Historic Rates data

const start_time = new Date(2018,4,15,0,0).toISOString();
const end_time = new Date(2019,2,11,0,0).toISOString();
//acceptedGrans = [60, 300, 900, 3600, 21600, 86400]
const granularity = 86400;
//const granularity = 21600;
//const granularity = 60;

console.log(`start= ${start_time}`);
console.log(`End= ${end_time}`);
console.log('Now: ',)
var the_data= 'nothing';

cbxQuery.getHistoricRates (Current_Product, start_time, end_time, granularity).then(res => {
    // console.log('The Return value is:', JSON.stringify(res, undefined,2));
    the_data = res;
    var df = new DataFrame(the_data);
    df= df.renameAll(['Time','Low', 'High', 'Open','Close','Volume']);
    df.show();
    console.log('Data dimensions: ', df.dim());
}, (errorMessage) => {
    console.log(`error: ${errorMessage}`);
});

// console.log('before validCurrency');
// cbxQuery.validCurrency('btc-USD').then(res => {
//         // console.log('The Return value is:', JSON.stringify(res, undefined,2));
//         the_data = res;
//         console.log('Currencies: ', res);
//     }, (errorMessage) => {
//         console.log(`error: ${errorMessage}`);
//     });



