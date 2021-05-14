
var md1 = [[1,2,3],[4,5,6],[6,7,8]];
var md2 = [[2,3],[4,5]];

let subset = false;
for(var x = 0; x < md1.length; x++){ 
    for(var y = 0; y < md2.length; y++){
      if(md1[x][0] == md2[y][0] && md1[x][1] == md2[y][1]){
        subset = true;
      }
    }
}
if(subset == true)
{
    console.log("md2 is subset of md1");
}
else
{
    console.log("md2 is not subset of md1");
}
