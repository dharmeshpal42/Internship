const readline = require('readline').createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

readline.question(`Enter your first name : ` , name=>
{
    console.log(`hi ${name} !`);
    readline.close();
})