const log=document.getElementById("logbut");
const content=document.getElementById("content");
log.onclick=()=>{
    window.localStorage.clear();
}

const dis=(data)=>{
    for(let i=0;i<data.length;i++)
    {
        const div = document.createElement("div");
        div.setAttribute("class","file");
        div.innerHTML=`
        <h3>${i+1})${data[i].filename}</h3>
        <form>
            <button class="down" id="down" formaction="/api/file/${data[i].filename}">Download</button>
        </form>
        `;
        content.appendChild(div);
        const br=document.createElement('br');
        content.appendChild(br);
    }

}

const fnc=async()=>{
    const response = await fetch("http://localhost:5000/api/getfile");
    let data=await response.json();
    // console.log(data);
    dis(data.fil);
}

fnc();