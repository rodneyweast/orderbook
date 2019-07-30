// This test was written to help me sort out how to return multiple values from
// calls so that I can put together the Long History of cbxQuery

// it started with experimenting with the following code from Promise.all
// examples:

// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

function sleep(millis) {
    console.log('Sleep function started: ', 
    Date.now())
    return new Promise(resolve => setTimeout(resolve, millis));
}


// Function f returns a promise, and MultiP returns an array of promises which
// are resolved with Promise.all

var f = ( (x) => {
    return  new Promise(function(resolve, reject) {
        // setTimeout(resolve, Math.random() * 1000, user_function);
        setTimeout(resolve, Math.random() * 1000, 1000*x*Math.random());
      });   
})

// testing multiple calls within function and return an array of promises

var multiP  =  (async (mCNT) => {
    var pArray = []
    var tmp
    for (let i = 0; i < mCNT; i++) {
        console.log('in for loop step: ',i)
        pArray.push(f(i))
        console.log('after push', pArray)
        await sleep(2000);
        console.log("Waited 5s");
    }
    return pArray;
});

var a= multiP(5);

console.log('Result length=', a.length)
console.log('multiP; ', a)

// Promise.all(a).then(function(values) {
//   console.log('a=',values);
// });

a.then((message) => {
    console.log(`Success: ${message}`);
    Promise.all(message).then(function(values) {
        console.log('Result=',values);
    });
}, (errorMessage) => {
    console.log(`Failure: ${errorMessage}`);
})

// end of the multi call test section



