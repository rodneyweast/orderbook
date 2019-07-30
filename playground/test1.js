var a= [1,2,3,4]
var b= [5,6,7,8]
var c= [[[1,2],[3,4]],[[5,6]], [[7,8],[9,10],[11,12]]]
console.log( a.concat(b))

var d= []

for (let i = 0; i < c.length; i++) {
    console.log('c[',i,']=',c[i])
    d= d.concat(c[i])
} 

console.log('d =', d)