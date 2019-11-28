//testing routines to test libarary that is used to test Coinbase pro query routines
//I need a dataframe tool like pandas, and the one that is getting the most
// downloads is:
//      dataframe-js

var date = new Date();

const DataFrame = require('dataframe-js').DataFrame;
const cbxQuery = require('../cbxQuery');
const fs = require('fs');

var Current_Product= 'BTC-USD';



//Test getLongHistoricRates

const start_time = new Date(2015,0,1,0,0).toISOString();
const end_time =   new Date(2016,0,1,0,0).toISOString();
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
    });
  }, (errorMessage) => {
    console.log(`Failure: ${errorMessage}`);
  })
  
  