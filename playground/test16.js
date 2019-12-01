// Make appendList of data that needs to be added to database
//

const updatetools = require('../updateTools')
const MongoClient = require('mongodb').MongoClient;


const exchange = 'CBP'
const Current_Product = 'BTC-USD'

console.log('Starting')

const connectionURL = 'mongodb://127.0.0.1:27017/'

function DBfillBlanks(exch, cp) {
  MongoClient.connect(connectionURL, { useNewUrlParser: true, },function(err, client) {
    if (err) {
      return console.dir(err);
    }
    client.db(exch).collection(cp).find().sort({"time": 1}).limit(1000).toArray(function(err, items) {
    //   console.log(items);
      client.close(); 
      
      var t=items[1].time
      var told
      var deltaT
      var appendList=[]
      var tt
      var resold
      var r
      var timeInSeconds
      var item
      var theDate
      for (var i=1; i< items.length; i++) {
          t= items[i].time
          told= items[i-1].time
          deltaT= (new Date(t).getTime()-new Date(told).getTime())/60000
        //   console.log(`t: ${t}   told: ${told}  deltaT: ${deltaT}`)
          if (deltaT>1){
              // console.log("••••••••••••••••••••••\nTime: ",t, "   ∆t: ", deltaT )
              resold= items[i-1]
              for (let j=1; j< deltaT; j++){
                  r= Object.assign({}, resold);
                  // console.log(`t: ${t}   tt: ${tt} `)
                  timeInSeconds = (new Date(new Date(told).getTime() + 60000 * j)).getTime()/1000
                  r.volume= 0.0
                  // [[date, low, high, open, close, volume], ...]
                  item = [timeInSeconds, r.low, r.high, r.open, r.close, r.volume]
                  theDate= new Date(timeInSeconds*1000)
                  console.log(theDate, item)
                  appendList.push(item)
                  // console.log(`tt: ${tt}\n r: ${r.time}\n••••••••••••••••••`)
                  if (appendList.length >=999) break;
              }
          }
          if (appendList.length >=999) break;
      }
      console.log(`${appendList.length} Items Added`)
      updatetools.DBupdateSet(exch, cp, appendList)
    });
  });
}

DBfillBlanks(exchange, Current_Product)


 
