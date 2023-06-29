
var email=document.getElementById("txt-input");
var password=document.getElementById("pwd");
var error1=document.getElementById("error1");
var error2=document.getElementById("error2");
var log=document.getElementById("login");


const fnc=async(data)=>{
    const response=await fetch('http://localhost:5000/api/login',{
        method:"POST",
        mode:"cors",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
    });
    return response.json();
}


log.onclick=()=>{
    var fl=true;
    loi=true;
    if(email.value.includes('@') && email.value.includes('.') && email.value.length>4 && email.value.trim().length>4)
    {
        error1.classList.remove('err');
        error1.classList.add('err1');
    }
    else
    {
        error1.classList.remove('err1');
        error1.classList.add('err');
        fl=false;
    }
    if(password.value.length>=6 && password.value.trim().length>=6)
    {
        error2.classList.remove('err');
        error2.classList.add('err1');
    }
    if(password.value.length<6 || password.value.trim().length<6)
    {
        error2.classList.remove('err1');
        error2.classList.add('err');
        fl=false;
    }
    if(!fl)
    {
        return false;
    }
    data={email:email.value.trim(),password:password.value.trim()}
    console.log(data);
    console.log(fnc(data));
}