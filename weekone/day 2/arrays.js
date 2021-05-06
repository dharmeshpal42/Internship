
//insert 10000 values in array using loop
const readline = require('readline');
const rl = readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    })


var arr = new Array;

function insert()
{
    console.time('execution time is')
for(i = 0;i<10000;i++)
{
    arr.push(i+" ");
}
console.log(arr);
console.timeEnd('execution time is')
}


// update a value on specific position
function updatedata(callback)
{
    console.time('execution time is')
    rl.question(`enter the position to be update :`,position=>{
    rl.question(`enter the value to be updated :`,value =>
    {
         console.log(`the value is ${value}`)
         const newarray = arr.splice(position,1,value);
         console.log(arr);
         console.timeEnd('execution time is')
         callback();
         
         
    })
})
    
}
//delete the element in array
function removedata()
{
    console.time('execution time is')
        rl.question(`enter the poistion to be deleted :`,pos =>{
             const newarray = arr.splice(pos,1);
             console.log(arr);
            rl.close();
            console.timeEnd('execution time is')
        })
}

insert();
updatedata(removedata);


