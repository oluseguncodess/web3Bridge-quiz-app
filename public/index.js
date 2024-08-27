// Get all the buttons and sections
const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const questions = document.querySelector('.questions');
const result = document.querySelector('.result');
const bottomCounter = document.querySelector('.bottom-counter');

const startBtn = document.querySelector('.start-btn');
const exitBtn = document.querySelector('.exitBtn');
const nextQtn = document.querySelector('.next-qtn');

let que_count = 0;

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
    showQuestion(que_count);
}

function handleNextQuestion() {
    if (que_count < questionss.length - 1) {
        que_count++;
        showQuestion(que_count);
    } else {
        console.log("Questions Completed");
    }

    const bottom_number_counter = `<span class="flex select-none"><p class="font-medium pr-1">${que_count + 1}</p>Of<p class="font-medium px-1">${questionss.length}</p>Questions</span>`;
    bottomCounter.innerHTML = bottom_number_counter;
}

// Start quiz button
start.addEventListener("click", rulesOpen);

// Exit quiz button
exitBtn.addEventListener("click", rulesClose);

// Continue quiz button
startBtn.addEventListener("click", startQuestions);

// Next question button
nextQtn.addEventListener("click", handleNextQuestion);

// Show question and options
function showQuestion(index) {
    const que_text = document.querySelector(".que-text");
    const optionList = document.querySelector(".option-list");

    const que_tag = `<span>${questionss[index].no}. ${questionss[index].question} </span>`;
    let option_tag = '';
    questionss[index].options.forEach(option => {
        option_tag += `<div class="option"><span>${option}</span></div>`;
    });

    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag;

    // Attach event listeners to the options
    const options = optionList.querySelectorAll(".option");
    options.forEach(option => {
        option.addEventListener("click", optionSelected);
    });
}

// Handle option selection
function optionSelected(event) {
    const selectedOption = event.currentTarget; // This refers to the clicked option div
    console.log("Selected Option:", selectedOption.innerHTML);

    // You can add logic to check if the selected option is correct, etc.
}

// Questions object database
const questionss = [
    {
        no: 1,
        question: `What is the correct syntax to print "Hello, World!" to the console in JavaScript?`,
        answer: `console.log("Hello, World!")`,
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
        answer: `let myVariable;`,
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
        answer: `===`,
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
        answer: `function myFunction() {}`,
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
        answer: `Determines the type of a variable`,
        options: [
            `Checks if a variable is defined`,
            `Determines the type of a variable`,
            `Converts a variable to a specific type`,
            `Creates a new variable of a specified type`
        ]
    }
];
