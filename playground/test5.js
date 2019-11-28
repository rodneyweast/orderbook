
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

// console.log("Math.random: ",Math.random());
a= test5()
console.log(a)
a.then( (res, e) =>{
    console.log('The End', a)
}, (e) => {
    console.log(`Failure: ${e}`);
})
  
