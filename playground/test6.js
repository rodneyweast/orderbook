
function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

const testValue= ( () => { 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            message = Math.floor(Math.random()*2);
            resolve(message);
        }, 2000)
    })
})  


var test5 = (async () => {
    var test=0
    var i =0;
    for (i=1; i<=9; i++){
        console.log("i: ", i, " before junk")
        test=await testValue(2000);
        console.log("i: ", i, " after junk test=",test)
        if (test==1) break
    }
    console.log("after for loop")
    return  new Promise(function(resolve, reject){
        if (i==0) reject('Did not match criteria')
        else resolve(i)
     })
})


const DataFrame = require('dataframe-js').DataFrame;
const cbxQuery = require('../cbxQuery');

var Current_Product= 'BTC-USD';
console.log('before getStartDate Definition')

var getStartDate = (async (product) => {
    var start_time;
    var end_time;  
    var granularity = 86400;
    var currentDate = Date.now();
    var currentYear = (new Date(currentDate)).getFullYear();
    var Year = 2015;
    var dateFound = false;
    var multiP;
    var mergeValues=[];

    for (Year=2015; Year<=currentDate; Year++) {
        start_time = new Date(Year,0,1,0,0).toISOString();
        if (Year+1 == currentYear) {
          end_time = currentDate;
        }
        else {
          end_time = new Date(Year+1,0,1,0,0).toISOString();
        }
        multiP= await cbxQuery.getLongHistoricRates(Current_Product, start_time, end_time, granularity);
        if (test==1) break
    }
    console.log("after for loop")
    return  new Promise(function(resolve, reject){
        if (i==0) reject('Did not match criteria')
        else resolve(i)
        })
  
    console.log("Found Date is true in: ", Year)
    Year++;
    console.log("Year: ", Year,"   Current Year: ", currentYear);
})  







// console.log("Math.random: ",Math.random());
a= test5()
console.log(a)
a.then( (res, e) =>{
    console.log('The End', a)
}, (e) => {
    console.log(`Failure: ${e}`);
})
  
