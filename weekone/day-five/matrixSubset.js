function subset(arr1,arr2,m,n)
{
    let i = 0;
    let j = 0;

    for(i = 0;i<n;i++)
    {
        for(j = 0;j<m;j++)
        {
            if(arr2[i] == arr1[j])
            
                break;
                
            if(j == m)
            return false;
        }
        return true;
    }
}

let arr1 = [[11, 1, 13],[21, 3, 7],[20,5,32]];
let arr2 = [[11, 3],[7, 1]];

let m = arr1.length;
console.log(m);
//console.log(arr1);

for(let i = 0;i<3;i++)
{
    for(let j = 0;j<3;j++)
    {
        console.log(arr1[i][j]);
    }
}
let n = arr2.length;
console.log("lenght of arr2 is :" +n);

if(subset(arr1,arr2,m,n))
{
    console.log("the arr2 is subset of arr1");
}
else
{
    console.log("the arr2 is not subset of arr1");
}