const updatetools = require('../updateTools')

const exchange = 'CBP'
const Current_Product = 'BTC-USD'

updatetools.DBmostRecentDate(exchange, Current_Product, function(res){
  console.log(res);
})