function isPalindrome(substr,n)
{
    

   let dp = new Array(n);
   let p = new Array(n);
// creating a 2d matrix 
//dp[] store the count of palindrome string
//p[] store the palimdrome string
   for(let i = 0;i<n;i++)
   {
       dp[i] = new Array(n);
       p[i] = new Array(n);

       for(let j= 0;j<n;j++)
       {
           dp[i][j] = 0;
           p[i][j] = false;
       }
   }

   //single length palindrome

   for(let i = 0;i<n;i++)
   p[i][i] = true;

   //length of 2 palindrome
   for(let i = 0;i<n-1;i++)
   {
       if(substr[i] == substr[i+1])
       {
           p[i][i+1] = true;
           dp[i][i+1] = 1;
       }
   }

   //for length is maximum of 2 then 

   for(let gap = 2;gap<n;gap++)
   {
       for(let i =0;i<n-gap;i++)
       {
           let j = gap+i;

           if(substr[i]==substr[j] && p[i+1][j-1])
           p[i][j] = true;

           if(p[i][j] == true)
               dp[i][j] = dp[i][j-1]+dp[i+1][j]+1-dp[i+1][j-1];
           else
               dp[i][j] = dp[i][j-1]+dp[i+1][j]-dp[i+1][j-1];
       }
       
   }
   return dp[0][n-1];
   
}
const readline  = require('readline');
const rl =readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    })
let str;
str = "dharabaabdjkj";
len= str.length;


rl.question(`enter the start point :`,start =>
{
  rl.question(`enter the end point :`,end=>
  {
    if(start <= len && end <= len)
    {
        let substr = str.slice(start,end);
       // console.log(substr);  
       console.log("there are "+isPalindrome(substr.split(""),substr.length)+" palindrome into the String");
        
    }
    else
    {
        console.log("please enter the valid range");
    }
    rl.close();
  })
})


