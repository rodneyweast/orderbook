const cbxQuery = require('../cbxQuery');
const updatetools = require('../updateTools')
// This test will find the first date of valid data, and
// Then will download data starting at that date and add it
// to the database


// var t1 = new Date()
// console.log('t1: ', t1)

// var t2 = new Date(Date.now())
// console.log('t2: ', t2)
const Current_Product= "BTC-USD"



updatetools.getStartDate('BTC-USD').then(res => {
      console.log(`Date of first ${Current_Product}: ${(new Date(res))}`);
      // console.log(JSON.stringify(res, undefined, 2));
  }, (errorMessage) => {
      console.log(errorMessage);
  });

//Now I need to add the code that will grab each year and store it
// in the database.

// and that data will go here





// var currentYear = (new Date(currentDate)).getFullYear();
// console.log("Year: ", currentYear);
// var nextDate =  new Date(currentDate.getTime() + 299*86400000);

// console.log (`New date: ${new Date(nextDate)}`);
// var now = new Date()
// console.log("Current Time is: " + now);

// // getFullYear function will give current year 
// var currentYear = (new Date()).getFullYear()
// console.log("Current year is: " + currentYear);
