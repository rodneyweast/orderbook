//testing routines to test libarary that is used to test Coinbase pro query routines
//I need a dataframe tool like pandas, and the one that is getting the most
// downloads is:
//      dataframe-js

var date = new Date();

const DataFrame = require('dataframe-js').DataFrame;
const cbxQuery = require('../cbxQuery');
const fs = require('fs');

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

// console.log('before validCurrency');
// cbxQuery.validCurrency('btc-USD').then(res => {
//         // console.log('The Return value is:', JSON.stringify(res, undefined,2));
//         the_data = res;
//         console.log('Currencies: ', res);
//     }, (errorMessage) => {
//         console.log(`error: ${errorMessage}`);
//     });


// // Test get Historic Rates data

// const start_time = new Date(2018,0,1,0,0).toISOString();
// const end_time = new Date(2018,2,17,1,0).toISOString();

// //acceptedGrans = [60, 300, 900, 3600, 21600, 86400]
//  const granularity = 21600;

// console.log(`start= ${start_time}\nEnd= ${end_time}`);
// var the_data= 'nothing';

cbxQuery.getHistoricRates (Current_Product, start_time, end_time, granularity).then(res => {
    // console.log('The Return value is:', JSON.stringify(res, undefined,2));
    the_data = res;
    console.log('the_data type: ', typeof the_data );
    var df = new DataFrame(the_data);
    df= df.renameAll(['Time','Low', 'High', 'Open','Close','Volume']);
    df.show();
    console.log('Data dimensions: ', df.dim());
}, (errorMessage) => {
    console.log(`error: ${errorMessage}`);
});

//Test getLongHistoricRates

const start_time = new Date(2018,0,1,0,0).toISOString();
const end_time =   new Date(2019,0,1,0,0).toISOString();
// acceptedGrans are [60, 300, 900, 3600, 21600, 86400]

//const granularity = 60;
const granularity = 86400;
//const granularity = 3600;
var multiP= cbxQuery.getLongHistoricRates(Current_Product, start_time, end_time, granularity);

console.log('Result length=', multiP.length)
console.log('multiP; ', multiP)

multiP.then((message) => {
  console.log(`Success: ${message}`);
  Promise.all(message).then(function(values) {
    var mergeValues=[]
    for (let i = 0; i < values.length; i++) {
      mergeValues= mergeValues.concat(values[i])
    } 
    if (  Array.isArray(mergeValues) && values.mergeValues){
      console.log('Result is Empty');
    }
    else {
      console.log('Result=',mergeValues);
    }
    // fs.writeFileSync('BTC_Data.json', JSON.stringify(mergeValues));

  });
}, (errorMessage) => {
  console.log(`Failure: ${errorMessage}`);
})



// cbxQuery.getLongHistoricRates (Current_Product, start_time, end_time, granularity).then(res => {
//     // console.log('The Return value is:', JSON.stringify(res, undefined,2));
//     the_data = res;
//     console.log('the_data type: ', typeof the_data );
//     var df = new DataFrame(the_data);
//     df= df.renameAll(['Time','Low', 'High', 'Open','Close','Volume']);
//     df.show();
//     console.log('Data dimensions: ', df.dim());
// }, (errorMessage) => {
//     console.log(`error: ${errorMessage}`);
// });
