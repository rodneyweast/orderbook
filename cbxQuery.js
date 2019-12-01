// Coinbase Pro Query
// Routines to query various parameters of  Coinbase Pro
// The API documentation is located:
// https://docs.pro.coinbase.com

var DataFrame = require('dataframe-js').DataFrame;
const request = require('request');

const math = require('mathjs');
const URL = 'https://api.pro.coinbase.com'

var validCurrency = ((product) => {
    // To query coinbase for valid base currency/quote currency
    // URL is: https://api.pro.coinbase.com/products

    var requestString = `${URL}/products`;
    console.log('product: ',product);
        return new Promise((resolve, reject) => {
        request({
            url: requestString,
            json: true,
            headers: {
                'User-Agent': 'request'
                }
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to pro.coinbase.com Server');
            } else if (response.statusCode != 200) {
                reject('Product Code Error');
            } else { 
                // console.log(JSON.stringify(body,undefined,2));
                // console.log(body);
                var currency_List = [];
                for (i=0; i< body.length; i++) {
                    // console.log(i, body[i].id);
                    currency_List[i]= body[i].id;
                }
               resolve(
                    (currency_List.indexOf(product.toUpperCase()) > -1)
                );
            };
        }); 
    });
});

var getTicker = ((product) => {
    // Get the current price and current bid and ask
    // Other items are available, but currently this is all
    // we are returning
    // Documentation is located at:
    //      https://docs.pro.coinbase.com/#get-product-ticker


    var requestString =  URL + "/products/" + product + "/ticker";
    console.log(requestString);
    return new Promise((resolve, reject) => {
        request({
            url: requestString,
            json: true,
            headers: {
                'User-Agent': 'request'
              }
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to pro.coinbase.com Server');
            } else if (response.statusCode != 200) {
                reject('Product Code Error');
            } else { 
                console.log(body);
                resolve({
                    price: body.price,
                    bid: body.bid,
                    ask: body.ask
                });
            };
        });
    });
});


var get_product_order_book = ((product, the_level) => {
    // Get the order book from Coinbase Pro API
    // product is in the form BTC-USD, BCH-EUR, ETH-BTC
    // Documentation is at:
    //      https://docs.pro.coinbase.com/#get-product-order-book

    var requestString = `${URL}/products/${product}/book/?level=${the_level}`;
    console.log(requestString);
  
    return new Promise((resolve, reject) => {
        request({
            url: requestString,
            json: true,
            headers: {
                'User-Agent': 'request'
                }
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to pro.coinbase.com Server');
            } else if (response.statusCode != 200) {
                reject('Product Code Error');
            } else { 
                // console.log(JSON.stringify(body,undefined,2));
                resolve({
                    bids: body.bids,
                    asks: body.asks
                });
            };
        });
    });
});

var getHistoricRates = ((product, start_time, end_time, granularity) => {
    // Get the historic Rats from Coinbase Pro API for times specified
    // Documentation is at:
    //      https://docs.pro.coinbase.com/#get-historic-rates

    // Example:
    // URL: https://api.pro.coinbase.com/products/BTC-USD/candles
    // URL: https://api.pro.coinbase.com/products/BTC-USD/candles?start=2018-07-10T12:00:00&stop=2018-07-15T12:00:00&granularity=900
    // 

    // acceptedGrans are [60, 300, 900, 3600, 21600, 86400]
    //console.log(`\ngetHistoricRates: product: ${product}     \nstart: ${start_time}   \nend: ${end_time}    granularity: ${granularity}`)
    var requestString = `${URL}/products/${product}/candles?start=${start_time}&end=${end_time}&granularity=${granularity}`;
    //console.log(`Request: ${requestString}`);
    var startSeconds= Date.parse(start_time)/1000
    var endSeconds = Date.parse(end_time)/1000
    var deltaT = endSeconds - startSeconds
    var dataEntries = deltaT/granularity
    // console.log(`Start: ${startSeconds}   End: ${endSeconds}   DeltaT: ${deltaT}   Data Entries: ${dataEntries}`)
    var nSteps = Math.floor(dataEntries/300)
    // console.log('Number of Steps: ',nSteps,'\n••••••••••••••••••••••••\n')
    
    if (deltaT <= 0.0) {
        return ''
    }
    else {
        return new Promise((resolve, reject) => {
            request({
                url: requestString,
                json: true,
                headers: {
                    'User-Agent': 'request'
                    }
            }, (error, response, body) => {
                if (error) {
                    reject('Unable to connect to pro.coinbase.com Server');
                } else if (response.statusCode != 200) {
                    reject(`Product Code Error: ${response.statusCode} 
                    Request: ${requestString}`);
                } else { 
                    // console.log(JSON.stringify(body,undefined,2));
                    resolve(body);
                };
            });
        });
    };
});

function sleep(millis) {
    //console.log('Sleep function started: ', Date.now())
    return new Promise(resolve => setTimeout(resolve, millis));
}

var getLongHistoricRates = (async (product, start_time, end_time, granularity) => {
      // check that granularity is correct, if not choose near number
      // with the "fixed" granularity determine the granularity
      // calculate the number of seconds between the start_time and end_time
      // and then divide the range by the granularity
      // if the range is more than 300 time periods then break it into pieces 
      // of 300 and do multiple grabs of data

    // convert start_time and end_time to seconds
    var startSeconds= Date.parse(start_time)/1000
    var endSeconds = Date.parse(end_time)/1000
    var deltaT = endSeconds - startSeconds
    var dataEntries = deltaT/granularity
    console.log(`Start: ${startSeconds}   End: ${endSeconds}   DeltaT: ${deltaT}   Data Entries: ${dataEntries}`)
    var nSteps = Math.floor(dataEntries/300)
    console.log('Number of Steps: ',nSteps+1,'\n••••••••••••••••••••••••\n')
    var startTime= start_time
    var endTime = end_time;
    let totalResults = []
    var timer1=-0
    for (var i= 0; i <= nSteps; i++){
        startTime = new Date(startSeconds*1000)
        endTime = new Date(math.min(endSeconds, (startSeconds+granularity*300))*1000)
        startSeconds += granularity*301
        console.log(`Processing step ${i} of ${nSteps}`)
        await sleep(4000);
        totalResults.push(getHistoricRates (product, startTime, endTime, granularity));
    }
    console.log('After getLongHistory for loop');
   

    return totalResults;



});

module.exports={
    sleep,
    validCurrency,
    getTicker,
    get_product_order_book,
    getHistoricRates,
    getLongHistoricRates
}