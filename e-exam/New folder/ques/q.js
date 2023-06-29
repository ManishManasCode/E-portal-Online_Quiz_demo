let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ],
    choosen:""
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ],
    choosen:""
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ],
    choosen:""
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ],
    choosen:""
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ],
    choosen:""
  },
];

const start_btn = document.querySelector(".start_btn button");
const ext_btn = document.querySelector(".ext_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const wrap=document.getElementById("wrap");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}
ext_btn.onclick=()=>{
    window.location.href="/exam"
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}
let timeValue =  65;
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(timeValue); 
    // startTimerLine(0); 
    next_btn.classList.add("show"); 
}


let que_count = 0;
let prev_count=0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let prev_ans="";

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    for(let i=0;i<5;i++)
    {
        questions[i].choosen="";
    }
    wrap.innerHTML='<div id="answers"></div>';
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 65; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    prev_count=0;
    prev_ans="";
    showQuetions(que_count); 
    queCounter(que_numb);
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    // startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.innerHTML="Next Que";
    
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const prev_btn = document.querySelector("footer .prev_btn");

const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    
    prev_ans="";
    prev_count=0;
    if(que_count < questions.length - 1){
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
    }
    else
    {
        showResult(); 
    }
    if(que_count>=1)
    {
        prev_btn.classList.add("show");
    }
    if(que_count===4)
    {
        next_btn.innerHTML="Submit";
    }
}


prev_btn.onclick=()=>{
    prev_ans="";
    prev_count=0;
    que_count--;
    que_numb--;
    showQuetions(que_count); 
    queCounter(que_numb);
    if(que_count<1)
    {
        prev_btn.classList.remove("show");
    }
    next_btn.innerHTML="Next Que";
}

let tickIconTag = '<div class="icon tick" id="rem"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");


    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
        console.log(option[i].textContent===questions[index].choosen);
        if(option[i].textContent===questions[index].choosen)
        {
            prev_count++;
            option[i].insertAdjacentHTML("beforeend",tickIconTag);
        }
    }

}




function optionSelected(answer)
{
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    questions[que_count].choosen=userAns;
    if(prev_count>=1)
    {
        let x=document.getElementById("rem");
        x.remove();
    }
    if(userAns == correcAns && prev_ans!==correcAns)
    { 
        userScore += 1; 
    }
    if(prev_ans===correcAns && userAns!=correcAns && prev_ans!==userAns)
    {
        userScore-=1;
    }
    prev_ans=userAns;
    answer.insertAdjacentHTML("beforeend", tickIconTag); 
    prev_count+=1;
}

function showResult(){
    const ans=document.getElementById("answers");
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ 
        let scoreTag = '<span>and congrats! , You got <p><b>'+ userScore +'</b></p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore > 1){ 
        let scoreTag = '<span>and nice , You got <p><b>'+ userScore +'</b></p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry , You got only <p><b>'+ userScore +'</b></p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    //display question
    for(i=0;i<5;i++)
    {

        let que_tag = '<span>'+ questions[i].numb + ". " + questions[i].question +'</span>';
        let option_tag = '<div class="optio"><span>'+ questions[i].options[0] +'</span></div>'
        + '<div class="optio"><span>'+ questions[i].options[1] +'</span></div>'
        + '<div class="optio"><span>'+ questions[i].options[2] +'</span></div>'
        + '<div class="optio"><span>'+ questions[i].options[3] +'</span></div>';
        
        
        let que_tex='<div class="que_tex">'+que_tag+'</div>';
        let option_lis='<div class="option_lis">'+option_tag+'</div>'; 
        ans.insertAdjacentHTML("beforebegin",que_tex);
        ans.insertAdjacentHTML("beforebegin",option_lis);
       
        const option_li = document.getElementsByClassName("option_lis")[i];
        for(j=0;j<4;j++)
        {
            if(questions[i].options[j]===questions[i].choosen)
            {
                option_li.children[j].classList.add("incorrect");
            }
            if(questions[i].options[j]===questions[i].answer)
            {
                option_li.children[j].classList.remove("incorrect");
                option_li.children[j].classList.add("correct");
            }
            
        }
        
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        let min=Math.floor(time/60);
        let sec=Math.floor(time%60);
        if(min<10)
        {
            min="0"+min;
        }
        if(sec<10)
        {
            sec="0"+sec;
        }
        timeCount.textContent=min+" : "+sec;
        if(time < 0)
        { 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns)
                { 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            que_count=5;
            showResult();
        }
    }
}

// function startTimerLine(time){
//     counterLine = setInterval(timer, 29);
//     function timer(){
//         time += 1; 
//         time_line.style.width = time + "px";
//         if(time > 549){ 
//             clearInterval(counterLine); 
//         }
//     }
// }

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}