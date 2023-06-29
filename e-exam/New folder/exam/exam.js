const hello=document.getElementById("name");

const fnc=()=>{
    uid=localStorage.getItem("itemKey");
    uid=JSON.parse(uid);
    hello.innerHTML=`Hello, ${uid.name}`;
}
fnc();