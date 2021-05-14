let str = "asdaaaafbbbvvvccg";
let occ = {}
let ch;

for(let i  = 0;i<str.length;i++)
{
	ch = str[i];
	if(occ[ch] === undefined)
	{
		occ[ch] = 1;
	}
	else
	{
		occ[ch]++;
	}
}

for(ch in occ)
{
	console.log(ch+"=="+occ[ch]);
}
for(ch in occ)
{
if(occ[ch] >=2)
{
	console.log("the string has not same frequency beacuse "+ch+" is repeated "+occ[ch]+" time ");
}
else
{
	
}
};