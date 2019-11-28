var val=0
var outString = "";
var cnt;
powerArray= [];
var j= 0;
var k= 1;
for (let i= 1; i< 52; i++ ) {
    k *=2;
    console.log(i, k)
    powerArray[j]=k;
    j++

}

var highest2;
var highestNumber;
for (let i=2; i< 100000; i++) {
    val = i;
    outString = `${i} : `;
    cnt = 1;
    highest2 = 1;
    highestNumber=1;
    do{
        // find highest power of 2
        if (powerArray.includes(val) & val> highest2) highest2= val;
        // find highest prime
        // total prime count
        // total count of steps
        if (val > highestNumber) highestNumber= val;
        outString += `${val}, `;
        if (val % 2) val = val = val*3+1;
        else val=val/2;
        cnt++;
    } while (val>1);
    outString += `1`;
    console.log(`Number: ${i}    Steps: ${cnt}  Highest Power of 2: ${highest2}   Highest Number: ${highestNumber}`);
    console.log(`Number: ${outString}`);
}