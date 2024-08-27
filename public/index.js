//get all the buttons and sections
const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const questions = document.querySelector('.questions');
const result = document.querySelector('.result');
const bottomCounter = document.querySelector('.bottom-counter');

const startBtn = document.querySelector('.start-btn');
const exitBtn = document.querySelector('.exitBtn');
const nextQtn = document.querySelector('.next-qtn');
const optionList = document.querySelector(".option-list");
const optionChildren = optionList.children;

const timeCount = document.querySelector(".timer");


function rulesOpen() {
    rules.classList.remove("opacity-0");
    rules.classList.add("active");
}

function rulesClose() {
    rules.classList.add("opacity-0");
    rules.classList.remove("active");
}

function startQuestions() {
    rulesClose();
    questions.classList.remove("opacity-0");
    questions.classList.add("active");
    showQuestion(0);
    startTimer(15)
}

function handleNextQuestion(params) {
    
    if(que_count <= questionss.length - 2) {
        que_count++
        showQuestion(que_count);
        clearInterval(counter);
        startTimer(timeValue)
    } else {
        console.log("Questions Completed");
    }

    let bottom_number_counter = `<span class="flex select-none"><p class="font-medium pr-1">${que_count+1}</p>Of<p class="font-medium px-1">5</p>Questions</span>`

    bottomCounter.innerHTML = bottom_number_counter;
}

//start quiz button    
start.addEventListener("click", rulesOpen);

//exit quiz button
exitBtn.addEventListener("click", rulesClose);

//continue quiz button
startBtn.addEventListener("click", startQuestions);

//next quiz button
nextQtn.addEventListener("click", handleNextQuestion);


let que_count = 0;
let counter;
let timeValue = 15;

//get questions from the array instead
 function showQuestion(index) {
    const que_text = document.querySelector(".que-text")

    let que_tag = `<span>${questionss[index].no}. ${questionss[index].question} </span>`;

    let option_tag = `<div class="option option pointer-events-auto"><span>${questionss[index].options[0]}</span></div>` 
            + `<div class="option pointer-events-auto"><span>${questionss[index].options[1]}</span></div>` 
            + `<div class="option option pointer-events-auto"><span>${questionss[index].options[2]}</span></div>` 
            + `<div class="option option pointer-events-auto"><span>${questionss[index].options[3]}</span></div>`;

    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag;

    const options = optionList.querySelectorAll(".option");
    options.forEach(option => {
        option.addEventListener("click", selectedOption);
    });
 }

 let tick = `<div class="icon text-green-800 border-green-800 "><i class="fas fa-check "></i></div>`;

 let cross = `<div class="icon text-red-800 border-red-800"><i class="fas fa-times"></i></div>`;

 function selectedOption(event) {
    clearInterval(counter)
    
    const optionSelected = event.currentTarget;
    const optionSelectedText = optionSelected.textContent;
    const allOptions = optionList.children.length
    let correctAns = questionss[que_count].answer;
    
    if(optionSelectedText == correctAns) {
        optionSelected.classList.add("correct");
        optionSelected.classList.add("selected");
        optionSelected.classList.remove("option");
        optionSelected.insertAdjacentHTML('beforeend', tick)
       

    } else {
        optionSelected.classList.add("wrong");
        optionSelected.classList.add("selected");
        optionSelected.classList.remove("option");
        optionSelected.insertAdjacentHTML('beforeend', cross)

        // highlight the right answer 

        for (let i = 0; i < allOptions; i++) {
            let childd = optionChildren[i];

            if(childd.textContent == correctAns) {
                childd.classList.add("correct");
                childd.classList.remove("option");  
                childd.insertAdjacentHTML('beforeend', tick)          
            }
        }

    }

    //once a button has been picked, otilo
    

    for (let i = 0; i < allOptions; i++) {
       
        const child = optionChildren[i];

        if(!child.hasAttribute("selected")) {
           child.classList.add("disabled");
           child.classList.remove("pointer-events-auto");
        }

        if(child.hasAttribute("selected")) {
            child.classList.add("pointer-events-auto");
        }
    }
 }

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
    }
}
// <--***** QUESTIONS OBJECT DATABASE--*****-->
// <--***** QUESTIONS OBJECT DATABASE--*****-->

let questionss = [
    {
        no: 1,
        question: `What is the correct syntax to print "Hello, World!" to the console in JavaScript?`,
        answer:`console.log("Hello, World!");`,
        options: [
            `console.print("Hello, World!");`,
            `print.console("Hello, World!");`,
            `console.log("Hello, World!");`,
            `log.console("Hello, World!");`
        ]
    },
    {
        no: 2,
        question: `How do you declare a variable in JavaScript ES5?`,
        answer:`let myVariable;`,
        options: [
            `variable myVariable;`,
            `var myVariable;`,
            `declare myVariable;`,
            `let myVariable;`
        ]
    },
    {
        no: 3,
        question: `Which operator is used to compare two values for strict equality in JavaScript?`,
        answer:`===`,
        options: [
            `===`,
            `==`,
            `!=`,
            `!==`
        ]
    },
    {
        no: 4,
        question: `How do you create a function in JavaScript?`,
        answer:`function myFunction() {}`,
        options: [
            `create function myFunction() {}`,
            `function myFunction() {}`,
            `func myFunction() {}`,
            `def myFunction() {}`
        ]
    },
    {
        no: 5,
        question: `What does the typeof operator do in JavaScript?`,
        answer:`Determines the type of a variable`,
        options: [
            `Checks if a variable is defined`, 
            `Determines the type of a variable`,
            `Converts a variable to a specific type`,
            `Creates a new variable of a specified type`
        ]
    }
];