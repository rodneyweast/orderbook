function testone(x) {
    console.log('in testone: ',x)
    return x
}

function testtwo(var1){
    console.log('testtwo: ',var1)
    return var1
}
testtwo(testone('b'))