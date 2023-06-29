const submit=document.getElementById("submit")
const fle=document.getElementById("filess");


submit.onclick=async (e)=>{
  // e.preventDefault();
  if(fle.files.length===0)
  {
    console.log("called");
    return false;
  }
  const formdata=new FormData();
  formdata.append('file',fle.files[0]);
  // for (var key of formdata.entries()) {
  //   console.log(key[0] + ', ' + key[1])
  // }x 
  const response =await fetch('http://localhost:5000/api/file',{
    method:"POST",
    body:formdata,
  }).catch(console.error);
  console.log(response);
}
