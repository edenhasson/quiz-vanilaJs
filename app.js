let questions = ['american', 'drag', 'complete'];
let counter = 3
let rightAnswers = 0;
let username = "";
// const nextButton = document.getElementById('nextButton');
const resultsDiv = document.getElementById('results');
const divStep1 = document.getElementById('step1');
const divStep2 = document.getElementById('step2');
const divStep3 = document.getElementById('step3');
const answerParagraph = document.getElementById('answer');
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const imagesContainer = document.getElementById('images-container');
const scoreDiv = document.getElementById('score');

const nameHandler = () => {
    // console.log(document.getElementById('username').value);
    // console.log(document.getElementById('user-name'));
    const nameInput = document.getElementById('username');
    document.getElementById('user-name').innerHTML = "Welcome " + nameInput.value;
    username = nameInput.value;
    // const welcomeDiv = document.getElementById('welcome')
    document.getElementById('welcome').parentNode.removeChild(document.getElementById('welcome'));
    randomQuestionHander();
}
const randomQuestionHander = () => {
    console.log(questions);
    if (resultsDiv.style.display !== 'none') {
        resultsDiv.style.display = 'none';
    }
    progressBar(counter);
    const place = Math.floor(Math.random() * counter);
    const type = questions[place]
    switch (type) {
        case 'american':
            console.log('a');
            divStep2.style.display = 'none';
            divStep3.style.display = 'none';
            divStep1.classList.add('fade-in');
            divStep1.style.display = 'block';
            break;
        case 'drag':
            console.log('b');
            divStep3.style.display = 'none';
            divStep1.style.display = 'none';
            divStep2.classList.add('fade-in');
            divStep2.style.display = 'block';
            break;
        case 'complete':
            console.log('c');
            divStep1.style.display = 'none';
            divStep2.style.display = 'none';
            divStep3.classList.add('fade-in');
            divStep3.style.display = 'block';
            break;
        default:
            divStep1.style.display = 'none';
            divStep2.style.display = 'none';
            divStep3.style.display = 'none';
            scoreHandler();
            break;

    }
    counter--;
    questions.splice(place, 1);
    console.log(questions);
}

const americanCheck = (isTrue) => {
    const buttons = document.querySelectorAll('.american');
    buttons.forEach(btn => {
        console.log(btn);
        btn.disabled = true;
    });
    if (isTrue) {
        success();
    } else {
        fail();
    }
}

const success = () => {
    answerParagraph.style.backgroundColor = 'green';
    answerParagraph.innerHTML = "Good job you got the currect answer";
    resultsDiv.style.display = "block";
    rightAnswers++;
}
const fail = () => {
    answerParagraph.style.backgroundColor = 'red';
    answerParagraph.innerHTML = "Wrong answer...";
    resultsDiv.style.display = "block";
}
const checkResult = () => {
    const answerInput = document.getElementById('succeed');
    answerInput.disabled = true;
    if (answerInput.value === 'succeed') {
        success()
    } else {
        fail();
    }
    answerInput.disable = true;
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
});

containers.forEach(container => {
    container.addEventListener('dragover', () => {
        if (container.hasChildNodes) {
            if(container.firstChild){
                if (container.firstChild.tagName === 'H1') {
                    container.removeChild(container.firstChild);
                } else {
                    const img = container.firstChild;
                    imagesContainer.prepend(img);
                }
            }
        }
        const draggable = document.querySelector('.dragging');
        container.appendChild(draggable);
    })
})

const checkDragAnswer = () => {
    const div1 = document.getElementById('number1');
    const div2 = document.getElementById('number2');
    const div3 = document.getElementById('number3');
    const div4 = document.getElementById('number4');
    div1.firstChild.draggable = false;
    div2.firstChild.draggable = false;
    div3.firstChild.draggable = false;
    div4.firstChild.draggable = false;
    if (div1.firstChild.classList.value.includes('number1') && div2.firstChild.classList.value.includes('number2') && div3.firstChild.classList.value.includes('number3') && div4.firstChild.classList.value.includes('number4')) {
        success();
    } else {
        fail();
    }
}

const scoreHandler = () => {
    const h1 = document.createElement('h1');
    h1.innerHTML = `${username} you have finished the exam, you got ${rightAnswers} out of 3`
    scoreDiv.appendChild(h1);
}

const progressBar = (question) => {
    const progressBar = document.getElementsByClassName('bar')[0];
    progressBar.style.display = "flex";
    if (question === 0) {
        progressBar.style.display = 'none';
    }
    switch (question) {
        case 3:
            document.getElementsByClassName('pro1')[0].classList.add('question');
            break;
        case 2:
            document.getElementsByClassName('pro2')[0].classList.add('question');
            break;
        case 1:
            document.getElementsByClassName('pro3')[0].classList.add('question');
            break;
    }
}