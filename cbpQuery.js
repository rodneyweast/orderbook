// Coinbase Pro Query
// Routines to query various parameters of  Coinbase Pro

const request = require('request');
var URL= "https://api.pro.coinbase.com";
var Current_Product= 'BTC-USD';


var getTicker = ((product) => {
    var requestString = URL + "/products/" + product + "/ticker";
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


var get_product_order_book = ((product,the_level) => {
    // Get the order book from Coinbase Pro API
    var requestString = `${URL}/products/${product}/book/?level=${the_level}`;
    console.log(requestString);

		// request = URL + "/products/" + product + "/book/?level=" + str(the_level)
		// response = requests.get(request)
		// response_str = response.content.decode("utf-8")
		// response_json = json.loads(response_str)
        // return response_json
        
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
                    x: 27,
                    y: 2
                });
            };
        });
    });
});


module.exports={
    getTicker,
    get_product_order_book
}