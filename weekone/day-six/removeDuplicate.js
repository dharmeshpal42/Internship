function remove(s)
{
    let ch = s.split("");
    for(let i = 0;i<ch.length;i++)
    {
        for(j = i+1;j<ch.length;j++)
        {
            if(ch[i] == ch[j])
            {
                  ch.splice(j,1);
                  j--;
            }
        }
    }
    return ch.join("");
}

console.log(remove("my name is dharmesh pal"));