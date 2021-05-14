function isPalindrome(str)
{
    var y ="";
    str = str.toLowerCase();
    for(let i = str.length-1;i>=0;i--)
    {
        y = y+str[i];
    }

    if(str = y)
    {
        console.log("it is palindrome");
    }
    else
    {
        console.log("it is not palindrome");
    }
}

isPalindrome("Madam");