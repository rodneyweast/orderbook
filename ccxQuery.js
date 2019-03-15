// Coinbase Pro Query
// Routines to query various parameters of  Coinbase Pro
// The API documentation is located:
// https://docs.pro.coinbase.com

exchangeList = ['bittrex', 'coinbase', 'gemini', 'kraken'];

const request = require('request');

var validExchange = ((exchange) => {
    if (exchangeList.indexOf(exchange.toLowerCase()) > -1) {
        return true;
    } else {
       return false;
    }
});

var validCurrencies = ((exchange, pruduct) => {
    // to Query kraken for valid currencies, use:
    // https://api.kraken.com/0/public/Assets

    // To query coinbase for valid base currency/quote currency
    // https://api.pro.coinbase.com/products

    // to query gemini for valid currencies, use:
    // https://api.gemini.com/v1/symbols

    // to query bittrex for valid currencies, use:
    // https://api.bittrex.com/api/v1.1//public/getcurrencies

});

var getExchangeURL = ((exchange) => {

    switch(exchange.toLowerCase()) {
        case "gemini":
            var URL= "https://api.gemini.com";;
            break;
        case "kraken":
            var URL= "https://api.kraken.com";;
            break;
        case "bittrex":
        // code block
            break;
        default:
          // default to coinbase pro
          var URL= "https://api.pro.coinbase.com";
      }
      return URL;
});


var getTicker = ((exchange, product) => {
    // gemini - https://api.gemini.com/v1/pubticker/btcusd
    // kraken - 

    // test exchange
    if validExchange(exchange) {
       //need to check the product
       URL = getExchangeURL(exchange);
       switch(exchange.toLowerCase()) {
        case "gemini":
          // code block
            break;
        case "kraken":
          // code block
            var URL= "https://api.kraken.com";;
            break;
        case "bittrex":
        // code block
            break;
        default:
          // default to coinbase pro
          var URL= "https://api.pro.coinbase.com";
      }
    }
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
                resolve({
                    price: body.price,
                    bid: body.bid,
                    ask: body.ask
                });
            };
        });
    });
});


var get_product_order_book = ((exchange, product, the_level) => {
    // Get the order book from Coinbase Pro API
    // product is in the form BTC-USD, BCH-EUR, ETH-BTC

    var requestString = `${getExchangeURL(exchange)}/products/${product}/book/?level=${the_level}`;
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
                resolve({
                    bids: body.bids,
                    asks: body.asks
                });
            };
        });
    });
});

var getHistoricRates = ((exchabnge, product, start_time, end_time, granularity) => {
    // Get the historic Rats from Coinbase Pro API for times specified

//  if start is not None:
//      params['start'] = start
//      if end is not None:
//          params['end'] = end
//      if granularity is not None:
//          acceptedGrans = [60, 300, 900, 3600, 21600, 86400]
//      if granularity not in acceptedGrans:
//          newGranularity = min(acceptedGrans, key=lambda x:abs(x-granularity))
//      print(granularity,' is not a valid granularity level, using',newGranularity,' instead.')
//         granularity = newGranularity
//     params['granularity'] = granularity


    var requestString = `${URL}/products/${product}/candles/?level=${the_level}`;
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
                resolve({
                    bids: body.bids,
                    asks: body.asks
                });
            };
        });
    });
});

module.exports={
    validExchange,
    validCurrencies,
    setExchange,
    getTicker,
    get_product_order_book,
    getHistoricRates
}