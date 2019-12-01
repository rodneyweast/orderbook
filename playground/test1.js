var a= [1,2,3,4,7,8,10,13,14,15]
var b= [5,6,7,8]
var c= [[[1,2],[3,4]],[[5,6]], [[7,8],[9,10],[11,12]]]
var d= [[1,2],[3,4],[5,6],[7,8],[9,10],[11,12]]


//  console.log( a.concat(b))

// var d= []

// for (let i = 0; i < c.length; i++) {
//     console.log('c[',i,']=',c[i])
//     d= d.concat(c[i])
// } 

// console.log('d =', d)
console.log(d.slice(0,2))

var t= new Date("2015-08-01T10:31:00.000Z")
var t1= t.getTime() / 1000
var tt= new Date(t.getTime() + 60000)
console.log(`t : ${t}    t1: ${t1}     tt: ${tt.toISOString()}`)

