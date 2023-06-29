var DATA = [];
var showFav = false;

const questionForm = document.getElementById('question');
const subjecti=document.getElementById('subject');
const quesi=document.getElementById('ques');
const welcome = document.getElementById('welcome');
const response = document.getElementById('response');
const quesInfo = document.getElementById('ques-info');
const resolveBtn = document.getElementById('resolve');
const quesList = document.getElementsByTagName('ul')[1];
const newQuesBtn = document.getElementById('new-ques');
const responseBtn = document.getElementById('response-submit');
const query = document.getElementById('query');
const noMatchFound = document.getElementById('no-match-found');
const responseForm = document.getElementById('responseForm');
const responseList = document.getElementById('responseList');
const index = document.getElementById('pos');
const favBtn = document.getElementById('favs');
const allQuesBtn = document.getElementById('all');
const sub_err=document.getElementById('sub_err');
const que_err=document.getElementById('que_err');



favBtn.addEventListener('click', () => {
    showFav = true;
    favBtn.classList.add('d-none');
    allQuesBtn.classList.remove('d-none');
    renderQuestionList(DATA);
});

allQuesBtn.addEventListener('click', () => {
    showFav = false;
    allQuesBtn.classList.add('d-none');
    favBtn.classList.remove('d-none');
    renderQuestionList(DATA);
});

newQuesBtn.addEventListener('click', () => {
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
});

function generateHighlightIndex(search, text) {
    let s = 0;
    let arr = [];
    text = text.toLowerCase();
    while(s < text.length) {
        let beg = text.indexOf(search, s);
        if(beg === -1) break;
        s = beg + search.length;
        arr.push({beg, end: s});
    }
    return arr;
}

query.addEventListener('keyup', () => {
    let search = query.value.toLowerCase().trim();
    if(search.length === 0) {
        renderQuestionList(DATA);
        return;
    }
    let matches = 0;
    DATA.forEach((obj, ind, arr) => {
        obj.subjHighLight = generateHighlightIndex(search, obj.subj);
        obj.quesHighlight = generateHighlightIndex(search, obj.ques);
        matches += obj.subjHighLight.length + obj.quesHighlight.length;
    });
    if(matches === 0) renderNoMatchFound();
    else renderQuestionList(DATA, true);
});

function renderResponseList(responses) {
    responseList.innerHTML = '';
    responses.forEach((resp, pos) => {

        let div = createBox(resp.name, resp.message);
        div.classList.add('bg-light');
        div.classList.add('my-2');
        div.classList.remove('border-bottom');


        let iconBar = document.createElement('div');
        iconBar.setAttribute('class', 'mr-2 d-flex justify-content-end');
        
        div.append(iconBar);
        responseList.appendChild(div);
    });
}

function renderQuestionInfo(question) {
    let div = createBox(question.subj, question.ques);

    let star = createStarIcon();
    star.style.cursor = 'pointer';
    star.style.color = 'rgb(248, 196, 23)';
    if(question.isFavourite) star.classList.add('fas');
    else star.classList.add('far');

    star.addEventListener('click', () => {
        DATA[index.value].isFavourite = !DATA[index.value].isFavourite;
        localStorage.setItem('DATA', JSON.stringify(DATA));
        displayResponseArea(index.value);
        renderQuestionList(DATA);
    });

    let iconBar = document.createElement('div');
    iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');

    iconBar.appendChild(star);

    div.appendChild(iconBar);
    
    div.classList.add('bg-light');
    div.classList.remove('border-bottom');
    quesInfo.innerHTML = '';
    quesInfo.appendChild(div);
}

function deleteQuestion() {
    DATA.splice(index.value, 1);
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderQuestionList(DATA);
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
}

function addResponse(e) {
    e.preventDefault();
    let name = responseForm.username.value, message = responseForm.response.value;
    responseForm.username.value = '';
    responseForm.response.value = '';
    let q = DATA[responseForm.qId.value];
    q.response.push({name, message});
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderResponseList(q.response);
}

function displayResponseArea(pos) {
    index.value = pos;
    welcome.classList.add('d-none');
    response.classList.remove('d-none');
    renderQuestionInfo(DATA[pos]);
    renderResponseList(DATA[pos].response);
}

function generateHighlight(parent, text, highlights) {
    let s = 0;
    let piece = '';
    highlights.forEach((obj) => {
        piece = document.createTextNode(text.substring(s, obj.beg));
        parent.appendChild(piece);
        let span = document.createElement('span');
        span.classList.add('bg-warning');
        piece = document.createTextNode(text.substring(obj.beg, obj.end));
        s = obj.end;
        span.appendChild(piece);
        parent.appendChild(span);
    });
    if(s < text.length) {
        piece = document.createTextNode(text.substring(s, text.length));
        parent.appendChild(piece);
    }
}

function createBox(title, subtitle, isQueryList = false, titleHighlight = [], subtitleHighlight = []) {
    let h5 = document.createElement('h5');
    h5.setAttribute('class', 'mb-1');
    if(!isQueryList) {
        let header = document.createTextNode(title);
        h5.appendChild(header);
    }
    else generateHighlight(h5, title, titleHighlight);

    let p = document.createElement('p');
    p.setAttribute('class', 'text-secondary mb-1');
    if(!isQueryList) {
        let body = document.createTextNode(subtitle);
        p.appendChild(body);
    }
    else generateHighlight(p, subtitle, subtitleHighlight);

    let div = document.createElement('div');
    div.setAttribute('class', 'border-bottom pl-4 py-2');
    div.appendChild(h5);
    div.appendChild(p);
    
    return div;
}


function createStarIcon() {
    let star = document.createElement('i');
    star.setAttribute('class', 'fa-star fa-lg');
    return star;
}

function createCountLabel(count) {
    let span = document.createElement('span');
    span.innerText = count;
    return span;
}

function renderQuestionList(questions, isQueryList = false) {
    if(query.value.trim() !== '') isQueryList = true;
    quesList.innerHTML = '';
    noMatchFound.classList.add('d-none');
    questions.forEach((obj, pos) => {
        if(isQueryList && obj.quesHighlight.length === 0 && obj.subjHighLight.length === 0) {}
        else if(showFav && !obj.isFavourite) {}
        else {
            let div = createBox(obj.subj, obj.ques, isQueryList, obj.subjHighLight, obj.quesHighlight);
            let star = createStarIcon();
            star.style.color = 'rgb(248, 196, 23)';
            if(obj.isFavourite) star.classList.add('fas');
            else star.classList.add('far');

            let iconBar = document.createElement('div');
            iconBar.setAttribute('class', 'mr-2 ml-auto d-flex justify-content-end');
    
            iconBar.appendChild(star);

            div.appendChild(iconBar);
            
            let li = document.createElement('li');
            li.appendChild(div);
            li.addEventListener('click', () => displayResponseArea(pos));
            quesList.appendChild(li);
        }
    });
}

function renderNoMatchFound() {
    quesList.innerHTML = '';
    noMatchFound.classList.remove('d-none');
}
const clearerr=()=>{
        que_err.classList.remove('err1');
        que_err.classList.add('err');

        sub_err.classList.remove('err1');
        sub_err.classList.add('err');
}

questionForm.addEventListener('submit', (e) => {
    clearerr();
    e.preventDefault();
    let ques = questionForm.ques.value.trim(), subj = questionForm.subject.value.trim();
    var fl=true;
    if(ques.length===0)
    {
        que_err.classList.remove('err');
        que_err.classList.add('err1');
        fl=false;
    }
    if(subj.length===0)
    {
        sub_err.classList.remove('err');
        sub_err.classList.add('err1');
        fl=false;
    }
    if(fl===false)
        return fl;
    questionForm.ques.value = '';
    questionForm.subject.value = '';
    DATA.push({ques, subj, quesHighlight: [], subjHighLight: [], response: []});
    localStorage.setItem('DATA', JSON.stringify(DATA));
    renderQuestionList(DATA);
});

responseForm.addEventListener('submit', addResponse);

resolveBtn.addEventListener('mouseup', deleteQuestion);

function setup() {
    if(localStorage.getItem("DATA")) DATA = JSON.parse(localStorage.getItem("DATA"));

    renderQuestionList(DATA);
    response.classList.add('d-none');
    welcome.classList.remove('d-none');
}

setup();