// must have running database
// launch database with the following code from another terminal window
// /Users/rodney/mongodb/bin/mongod --dbpath=/Users/rodney/mongodb-data
// code to do an bulk write with data from an array with
// updateone on each item and upsert = true
//

const updatetools = require('../updateTools')

const exchange = 'CBP'
const Current_Product = 'BTC-USD'

console.log('Starting');
// var dataset = [
//     {
//         time: new Date('2015-08-01T09:59:00.000Z'),
//         low: 279.75,
//         high: 279.91,
//         open: 279.8,
//         close: 279.9,
//         volume: 1.09
//     },
//     {
//         time: new Date('2015-08-01T10:00:00.000Z'),
//         low: 279.7,
//         high: 279.9,
//         open: 279.7,
//         close: 279.8,
//         volume: 0.11
//     },
//     {
//         time: new Date('2015-08-01T10:01:00.000Z'),
//         low: 279.2,
//         high: 280.9,
//         open: 279.7,
//         close: 280.0,
//         volume: 0.32
//     },
//     {
//       time: new Date('2015-08-01T10:02:00.000Z'),
//       low: 277.2,
//       high: 282.9,
//       open: 278.7,
//       close: 280.1,
//       volume: 0.77
//   }
//   ];
  dataset= [[1438426440,280.01,280.07,280.07,280.01,0.4701],
  [1438426320,279.91,279.91,279.91,279.91,0.0183],
  [1438426260,279.83,279.98,279.98,279.83,1.7834],
  [1438426200,280.06,280.14,280.06,280.14,1.7661],
  [1438426080,279.99,280.03,279.99,280.03,0.4946],
  [1438426020,279.97,279.97,279.97,279.97,0.3567],
  [1438425960,279.93,279.93,279.93,279.93,0.9111],
  [1438425900,280.1,280.15,280.1,280.14,7.3785],
  [1438425840,279.78,279.96,279.78,279.96,4.0024],
  [1438425780,279.78,279.78,279.78,279.78,0.4733],
  [1438425600,279.77,279.77,279.77,279.77,1.6205],
  [1438425540,279.77,279.88,279.87,279.77,1.7794],
  [1438425480,279.87,279.89,279.89,279.87,1.9448],
  [1438425420,279.74,279.88,279.88,279.74,0.1164],
  [1438425360,279.64,279.84,279.64,279.84,1.76159313],
  [1438425300,279.63,279.69,279.63,279.69,9.8997],
  [1438425240,279.63,279.63,279.63,279.63,1.7531],
  [1438425060,279.63,279.63,279.63,279.63,1.8292],
  [1438424940,279.63,279.63,279.63,279.63,0.3667]]
console.log(dataset)
// console.log(`exchange: ${exchange}\n Current Product: ${Current_Product}\n dataset: ${dataset}`)
updatetools.DBupdateSet(exchange, Current_Product, dataset)

console.log('End')