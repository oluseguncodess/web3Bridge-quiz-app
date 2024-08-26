//get all the buttons and sections
const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const questions = document.querySelector('.questions');
const result = document.querySelector('.result');

const startBtn = document.querySelector('.start-btn');
const exitBtn = document.querySelector('.exitBtn');

function rulesOpen() {
    rules.classList.remove("opacity-0");
    rules.classList.add("active");
}

function rulesClose() {
    rules.classList.add("opacity-0");
    rules.classList.remove("active");
}

function startQuestions () {
    rulesClose();
    questions.classList.remove("opacity-0");
    questions.classList.add("active");
    showQuestion();

}
    
//start quiz button    
start.addEventListener("click", rulesOpen);

//exit quiz button
exitBtn.addEventListener("click", rulesClose);

//continue quiz button
startBtn.addEventListener("click", startQuestions)


let que_count = 0;

//get questions from the array instead
 function showQuestion() {
    const que_text = document.querySelector(".que-text")
    let que_tag = `<span> ${questionss[0].question} </span>`
    // let option_tag = `<div><span>${questionss[index].options[0]}</span></div>` + `<div><span>${questionss[index].options[1]}</span></div>` + `<div><span>${questionss[index].options[2]}</span></div>` + `<div><span>${questionss[index].options[2]}</span></div>`
    que_text.innerHTML = que_tag;
 }


// <--***** QUESTIONS --*****-->
// <--***** QUESTIONS --*****-->

let questionss = [
    {
        no: 1,
        question: `What is the correct syntax to print "Hello, World!" to the console in JavaScript?`,
        answer:`console.log("Hello, World!")`,
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
        answer:` Determines the type of a variable`,
        options: [
            `Checks if a variable is defined`, 
            `Determines the type of a variable`,
            `Converts a variable to a specific type`,
            `Creates a new variable of a specified type`
        ]
    }
]






