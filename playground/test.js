
// var doMultiple1=(async function loop(theCount) {
//     for (let i = 0; i < theCount; i++) {
//         var x= Math.random() * 1000;
//         await new Promise(resolve => setTimeout(resolve(x), x));
//         console.log(i);
//     }
// });

// doMultiple1(3)


// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//   console.log(values);
// });
// expected output: Array [3, 42, "foo"]

function resolveDelayed(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, Math.random() * 1000);
    });
  }

  var f1 = async function () {
    var x = await resolveDelayed(Math.random() * 1000);
    console.log(`inside f1 x= ${x}`);
    return x
  }

// z= f1()
// console.log('Before doing only 1')
// z.then(res => {
//                 // console.log('The Return value is:', JSON.stringify(res, undefined,2));
//                 the_data = res;
//                 console.log('Doing only 1 result: ', res);
//             }, (errorMessage) => {
//                 console.log(`error: ${errorMessage}`);
//             });

var doMultiple=(async function loop(theCount) {
    var pArray = []
    console.log('Before for loop typeof parray= ',typeof(pArray));
//    console.log('in doMultiple: theCount=',theCount)
    for (let i = 0; i < theCount; i++) {
        console.log(i)
        //pArray.push(f1());
        pArray.push(5)
    }
    console.log(pArray);
    return pArray
});


console.log('Before doing Multiple')
var r1= doMultiple(4)
console.log('Array has a size of:', r1.length)
console.log('Array=', r1)
// Promise.all(r1).then(function(values) {
//   console.log(values);
// });

