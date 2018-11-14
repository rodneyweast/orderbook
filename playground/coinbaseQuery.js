//testing routines to test libarary that is used to test Coinbase pro query routines

const cbpQuery = require('../cbpQuery');


var Current_Product= 'BTC-USD';


cbpQuery.getTicker(Current_Product).then(res => {
    console.log(`Price of ${Current_Product}: ${res.price}`);
    // console.log(JSON.stringify(bid, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});

// cbpQuery.get_product_order_book(Current_Product,2).then(res => {
//     console.log(`Orderbook ${Current_Product}: `);
//     //${res.price}
//     // console.log(JSON.stringify(bid, undefined, 2));
// }, (errorMessage) => {
//     console.log(errorMessage);
// });
