const cbxQuery = require('./cbxQuery');
const MongoClient = require('mongodb').MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017/'

var getStartDate = (async (product) => {
  var Year= 2014
  var start_time = new Date(Year,0,1,0,0).toISOString();
  var currentDate = new Date(Date.now());
  var i= 0;

  var startDate=new Date(start_time);
  var endDate;
  var granularity = 86400;
  var testSet
  do {
      i++;
      endDate= new Date(startDate.getTime() + 300 * 86400000);
      if (endDate > currentDate) endDate= new Date(currentDate);
      // console.log (`Start Date ${i}: ${new Date(startDate)}`);
      // get the Historic Rates
      testSet = await cbxQuery.getHistoricRates (product, startDate, endDate, granularity);
      // testSet = [1,2,3]
      // console.log('After creating testSet', testSet)
      startDate= new Date(startDate.getTime() + 301 * 86400000);
      // console.log('After creating new startDate')
      // console.log('Is array')
      if ( Array.isArray(testSet) && testSet.length > 0){
          // console.log('found Data')
          break
        }
      else {
        // console.log('Result is Empty: ', testSet.length, Array.isArray(testSet));
      }
  } while ( startDate < currentDate);
  // console.log('after while loop')
  return  new Promise(function(resolve, reject){
    if ( Array.isArray(testSet) && testSet.length > 0)
      resolve (1000*testSet[0][0])
    else {
      reject('Did not match criteria')
    }
 })
});

var loadDataset = (async (product, startDate, enDate) => {

  var currentStart=new Date(start_time);
  var currentEnd
  var granularity = 60;
  var currentSet
  do {
      i++;
      currentEnd= new Date(currentStart.getTime() + 300 * granularity*1000);
      if (currentEnd > endDate) currentEnd= new Date(endDate);
      // console.log (`Start Date ${i}: ${new Date(startDate)}`);
      
      // get the Historic Rates
      currentSet = await cbxQuery.getHistoricRates (product, startDate, endDate, granularity);
      startDate= new Date(startDate.getTime() + 301 * granularity*1000);
      console.log('After creating new startDate')
      if ( Array.isArray(currentSet) && currentSet.length > 0){
          // console.log('found Data')
          break
        }
      else {
        // console.log('Result is Empty: ', testSet.length, Array.isArray(testSet));
      }
  } while ( currentDate < endDate);
});

var LoadData = (async (exchange, product, startdate) => {
  var startDate = new Date( Math.floor(startdate.getTime()/60)*60)
  var currentStart=new Date(startDate);
  // var endDate= new Date(startDate.getTime()+30*86400*1000);
  var endDate= new Date(startDate.getTime()+60*(2*30*1440)*1000);   // 60days= ~ 1 months later
  if (endDate> (new Date())) endDate= Math.floor(new Date()/60)*60;
  var currentEnd
  var granularity = 60;
  var currentSet
  var i = 0;
  var dateNumber
  var dateText
  do {
     i++;
      currentEnd= new Date(currentStart.getTime() + 300 * granularity*1000);
      if (currentEnd > endDate) currentEnd= new Date(endDate);
      dateNumber= currentStart.getTime()
      dateText= new Date(dateNumber).toISOString()
      console.log(`Start ${i}:  ${new Date(currentStart).toISOString()}`)
      // get the Historic Rates
      // console.log('before call to getHistoricRates')
      currentSet = await cbxQuery.getHistoricRates (product, currentStart, currentEnd, granularity)
      // console.log('currentSet; ', currentSet)
      DBupdateSet(exchange,product,currentSet)
      currentStart= new Date(currentStart.getTime() + 300 * granularity*1000);
      await cbxQuery.sleep(500) 
      // console.log('after sleep')
  } while ( currentStart < endDate);
  console.log('Finishing dataset')
});


function DBmostRecentDate(exch, cp, callback) {
  MongoClient.connect(connectionURL, { useNewUrlParser: true, },function(err, client) {
    if (err) {
      return console.dir(err);
    }
    client.db(exch).collection(cp).find().sort({"time": -1}).limit(1).toArray(function(err, items) {
      // console.log(items);
      client.close(); 
      return callback(items[0].time);     
    });
  });
}

function DBupdateSet(exch, cp, dataSet) {
  // dataSet is an Array in the format returned by Coinbase getHistoric Data
  // [[date, low, high, open, close, volume], ...]
  
 
  var dataItem
  var objects = [];
  
  for (var x = 0; x < dataSet.length; x++) {
    dataItem= {
      time: new Date(dataSet[x][0]*1000).toISOString(),
      low: dataSet[x][1],
      high: dataSet[x][2],
      open: dataSet[x][3],
      close: dataSet[x][4],
      Volume: dataSet[x][5]
    }
    //console.log('dataItem: ',dataItem)
    objects[x] = 
    {
      updateOne: 
        {
          filter: {time: new Date(dataItem.time).toISOString()},
          update: { $set: dataItem },
          upsert: true
        }
    }
  }
  // console.log(objects[0])
  MongoClient.connect(connectionURL, { useNewUrlParser: true, },function(err, client) {
      if (err) throw err;
    client.db(exch).collection(cp).bulkWrite(objects).then(res => {
      client.close();
      // console.log(`Bulk write value: ${JSON.stringify(res, undefined, 2)}`);
    }, (errorMessage) => {throw errorMessage;
    });
  });
}

function DBupdateCollection(exch, cp, startDate) {
    var nowDate = Math.floor(Date.now()/60000)*60000
    var endDate = Math.floor(startDate/60000)*60000
    if (endDate > nowDate) endDate= nowDate
}

function DBproductExist(exch, productCode, callback) {
  //checks to see if the productCode exists in the database
  // Returns a boolean indicating true if it exist and fals if it doesn't
  MongoClient.connect(connectionURL, { useNewUrlParser: true},function(err, client) {
    if (err) {
      return console.dir(err);
    }
    client.db(exch).listCollections().toArray(function(err, items) {
      var allCollections = []
      items.forEach(eachCollectionDetails => {
          allCollections.push(eachCollectionDetails.name);
      });
      client.close();
      if (allCollections.includes(productCode)) 
          return callback(true)
      else
          return callback(false);  
    });
  });
}


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
      DBupdateSet(exch, cp, appendList)
    });
  });
}

module.exports={
  LoadData,
  getStartDate,
  DBmostRecentDate,
  DBupdateSet,
  DBproductExist,
  DBfillBlanks
}

