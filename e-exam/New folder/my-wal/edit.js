var register = document.getElementById("register");
var fname = document.getElementById("fname");
var sid = document.getElementById("sid");
var email = document.getElementById("e-mail");
var phone = document.getElementById("phone");
// var pss = document.getElementById("pss");
// var cfpss = document.getElementById("cfpss");
var age = document.getElementById("age");
// var addr = document.getElementById("addr");
var branch = document.getElementById("branch");
var g1 = document.getElementById("dot-1");
var g2 = document.getElementById("dot-2");
var g3 = document.getElementById("dot-3");
var c = document.getElementById("c");
var htm = document.getElementById("html");
var css = document.getElementById("css");
var js = document.getElementById("js");

const content=document.getElementById("content");

let userId;

const update=(user)=>{
  userId=user.id;
  fname.value=user.name;
  email.value=user.email;
  sid.value=user.sid;
  phone.value=user.phone;
  age.value=user.age;
  branch.value=user.branch;

}

const func = async () => {
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
  // func(data.user);
  // console.log(data.user);
  update(data.user);
};





const fnc = async (data) => {
  const response = await fetch("http://localhost:5000/api/edit", {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const clearerr = () => {
  console.log("called");
  var e1 = document.getElementById("e1");
  e1.classList.remove("err");
  e1.classList.add("err1");

  var e2 = document.getElementById("e2");
  e2.classList.remove("err");
  e2.classList.add("err1");

  var e3 = document.getElementById("e3");
  e3.classList.remove("err");
  e3.classList.add("err1");

  var e4 = document.getElementById("e4");
  e4.classList.remove("err");
  e4.classList.add("err1");


  var e7 = document.getElementById("e7");
  e7.classList.remove("err");
  e7.classList.add("err1");


  var e9 = document.getElementById("e9");
  e9.classList.remove("err");
  e9.classList.add("err1");

  var e10 = document.getElementById("e10");
  e10.classList.remove("err");
  e10.classList.add("err1");

  var e11 = document.getElementById("e11");
  e11.classList.remove("err");
  e11.classList.add("err1");
};

register.onclick = () => {
  var returnval = true;
  clearerr();
  if (fname.value.trim().length < 5) {
    var e1 = document.getElementById("e1");
    e1.classList.remove("err1");
    e1.classList.add("err");
    returnval = false;
  }
  if (sid.value.trim().length == 0) {
    var e2 = document.getElementById("e2");
    e2.classList.remove("err1");
    e2.classList.add("err");
    returnval = false;
  }
  if (
    !email.value.includes("@") &&
    !email.value.includes(".") &&
    email.value.length < 4 &&
    email.value.trim().length < 4
  ) {
    var e3 = document.getElementById("e3");
    e3.classList.remove("err1");
    e3.classList.add("err");
    returnval = false;
    console.log();
  }
  if (phone.value.trim().length != 10) {
    var e4 = document.getElementById("e4");
    e4.classList.remove("err1");
    e4.classList.add("err");
    returnval = false;
  }


  if (age.value.trim() < 18) {
    var e7 = document.getElementById("e7");
    e7.classList.remove("err1");
    e7.classList.add("err");
    returnval = false;
  }

  
  if (branch.value == "") {
    var e9 = document.getElementById("e9");
    e9.classList.remove("err1");
    e9.classList.add("err");
    returnval = false;
  }
  // console.log(c.checked);

  if (
    c.checked === false &&
    css.checked === false &&
    js.checked === false &&
    htm.checked === false
  ) {
    var e10 = document.getElementById("e10");
    e10.classList.remove("err1");
    e10.classList.add("err");
    returnval = false;
  }

  if (!g1.checked && !g2.checked && !g3.checked) {
    var e11 = document.getElementById("e11");
    e11.classList.remove("err1");
    e11.classList.add("err");
    returnval = false;
  }
  if (returnval === false) {
    return false;
  }
  arr = [];
  if (c.checked) {
    arr.push("C++");
  }
  if (css.checked) {
    arr.push("CSS");
  }
  if (js.checked) {
    arr.push("javascript");
  }
  if (htm.checked) {
    arr.push("HTML");
  }
  gen = "Other";
  if (g1.checked) {
    gen = "Male";
  }
  if (g2.checked) {
    gen = "Female";
  }
  data = {
    userId:userId,
    name: fname.value.trim(),
    email: email.value.trim(),
    sid: sid.value.trim(),
    phone: phone.value.trim(),
    age: age.value.trim(),
    branch: branch.value,
    skill: arr,
    gender: gen,
  };
  fnc(data);
};

func();