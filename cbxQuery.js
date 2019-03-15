// Coinbase Pro Query
// Routines to query various parameters of  Coinbase Pro
// The API documentation is located:
// https://docs.pro.coinbase.com

const request = require('request');
const URL = 'https://api.pro.coinbase.com'

var validCurrency = ((product) => {
     // To query coinbase for valid base currency/quote currency
    // https://api.pro.coinbase.com/products
    // return true if the product is valid
    // if in lowercase, it is automatically made uppercase

    var requestString = `${URL}/products`;
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
    // https://api.pro.coinbase.com/products/BTC-USD/candles
    // https://api.pro.coinbase.com/products/BTC-USD/candles?start=2018-07-10T12:00:00&stop=2018-07-15T12:00:00&granularity=900
    // 


//      params['start'] = start
//      if end is not None:
//          params['end'] = end
//      if granularity is not None:
//          acceptedGrans = [60, 300, 900, 3600, 21600, 86400]


    var requestString = `${URL}/products/${product}/candles?start=${start_time}&end=${end_time}&granularity=${granularity}`;
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
                //console.log(JSON.stringify(body,undefined,2));
                resolve(body);
            };
        });
    });
});

var getLongHistoricRates = ((product, start_time, end_time, granularity) => {
      // check that granularity is correct, if not choose near number
      // with the "fixed" granularity determine the granularity
      // calculate the number of seconds between the start_time and end_time
      // and then divide the range by the granularity
      // if the range is more than 300 time periods then break it into pieces 
      // of 300 and do multiple grabs of data


});



module.exports={
    validCurrency,
    getTicker,
    get_product_order_book,
    getHistoricRates
}