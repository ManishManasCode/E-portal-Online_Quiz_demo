const table = document.getElementById("info");
const hd = document.getElementById("hd");
const second=document.getElementById("second");
const log=document.getElementById("log");
const quiz=document.getElementById("quiz");
const hello=document.getElementById("name");
const func = (data) => {
  hello.innerHTML=`Hello, ${data.name}`;
  hd.innerHTML = `${data.name}`;
  second.innerHTML=`<p class="mb-0">
  <strong class="pr-1">Student ID:</strong>${data.sid}
</p>
<p class="mb-0">
  <strong class="pr-1">Sem:</strong>6
</p>
<p class="mb-0">
  <strong class="pr-1">Section:</strong>A
</p>`;
  table.innerHTML = `<tr>
    <th width="30%">Name</th>
    <td width="2%">:</td>
    <td>${data.name}</td>
    </tr>
    <tr>
    <th width="30%">Email</th>
    <td width="2%">:</td>
    <td>${data.email}</td>
    </tr>
    <tr>
    <th width="30%">Gender</th>
    <td width="2%">:</td>
    <td>${data.gender}</td>
    </tr>
    <tr>
    <th width="30%">Age</th>
    <td width="2%">:</td>
    <td>${data.age}</td>
    </tr>
    <tr>
    <th width="30%">Phone no</th>
    <td width="2%">:</td>
    <td>${data.phone}</td>
    </tr>
    <tr>
    <th width="30%">Student id</th>
    <td width="2%">:</td>
    <td>${data.sid}</td>
    </tr>
    <tr>
    <th width="30%">Branch</th>
    <td width="2%">:</td>
    <td>${data.branch}</td>
    </tr>
    <tr>
    <th width="30%">Skills</th>
    <td width="2%">:</td>
    <td>${data.skill}</td>
    </tr>`;

for(let i=0;i<data.scores.length;i++)
{
  let hr=document.createElement('br');
  let br=document.createElement('br');
  let div=document.createElement('div');
  div.innerHTML=`
  <h3>Quiz ${i+1}:</h3> 
  <p>Score : ${data.scores[i]}</p>
  <p>Time Left : ${data.times[i]}</p>`
  quiz.appendChild(div);
  quiz.appendChild(br);
  quiz.appendChild(br);
}    
    
};

const fnc = async () => {
  let dat = window.localStorage.getItem("itemKey");
  // console.log(dat);
  if(!dat)
  {
    return;
  }
  let response = await fetch("http://localhost:5000/api/mywall", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: dat,
  });
  let data = await response.json();
  func(data.user);
};

log.onclick=()=>{
  window.localStorage.clear();
}

fnc();

