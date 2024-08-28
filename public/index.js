//get all the buttons and sections
const start = document.querySelector('.start');
const rules = document.querySelector('.rules');
const questions = document.querySelector('.questions');
const result = document.querySelector('.result');
const bottomCounter = document.querySelector('.bottom-counter');
const restart = document.querySelector(".restart");
const quit = document.querySelector(".quit");

const startBtn = document.querySelector('.start-btn');
const exitBtn = document.querySelector('.exitBtn');
const nextQtn = document.querySelector('.next-qtn');
const optionList = document.querySelector(".option-list");
const optionChildren = optionList.children;

const timeCount = document.querySelector(".timer");
const timeLine = document.querySelector(".time-line")

quit.addEventListener("click", overAgain)

function overAgain() {
    window.location.reload();
}

restart.addEventListener("click", playAgain);

function playAgain() {
    window.location.reload();
}

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine = 0;
let widthValue = 0;
let userScore = 0;

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
    startTimer(15)
    startTimerLine(0)

    let bottom_number_counter = `<span class="flex select-none"><p class="font-medium pr-1">${que_count+1}</p>Of<p class="font-medium px-1">${questionss.length}</p>Questions</span>`

    bottomCounter.innerHTML = bottom_number_counter;
}

function showResultBox() {
    questions.classList.add("opacity-0");
    questions.classList.remove("active");

    result.classList.remove("opacity-0");
    result.classList.add("active");

    const resultText = document.querySelector(".result-text");
    if(userScore > 3) {
        let resultTag = '<span class="flex mt-3 text-[14px] font-medium">Great work 🥳 , you got <p class="font-semibold px-[3px]">'+ userScore + '</p>out of<p class="font-semibold px-[3px]">' + questionss.length + '</p>questions</span>';

        resultText.innerHTML = resultTag; 
    } 
    else if(userScore < 1) {
        let resultTag = '<span class="flex mt-3 text-[18px] font-medium">Sorry but, you got <p class="font-semibold px-[3px]">'+ userScore + '</p>out of<p class="font-semibold px-[3px]">' + questionss.length + '</p>questions</span>';

        resultText.innerHTML = resultTag; 
    }
    else {
        let resultTag = '<span class="flex mt-3 text-[18px] font-medium">Nice attempt, you got <p class="font-semibold px-[3px]">'+ userScore + '</p>out of<p class="font-semibold px-[3px]">' + questionss.length + '</p>questions</span>';

        resultText.innerHTML = resultTag;
    }
}

function handleNextQuestion(params) {
    
    if(que_count <= questionss.length - 2) {
        que_count++
        showQuestion(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
    } else {
        console.log("Questions Completed");
        showResultBox()
    }

     let bottom_number_counter = `<span class="flex select-none"><p class="font-medium pr-1">${que_count+1}</p>Of<p class="font-medium px-1">${questionss.length}</p>Questions</span>`

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
    clearInterval(counterLine)
    const optionSelected = event.currentTarget;
    const optionSelectedText = optionSelected.textContent;
    const allOptions = optionList.children.length
    let correctAns = questionss[que_count].answer;
    
    if(optionSelectedText == correctAns) {
        userScore ++;
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
        if(time < 9) {
             let addZero = timeCount.textContent;
             timeCount.textContent= "0" + addZero;
        } 

        if(time < 0) {
            clearInterval(counter)
        }

        if(time == 0) {
            handleNextQuestion()
        }
    } 
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29) 
    function timer() {
        time ++;
        timeLine.style.width = time + "px";
        if(time > 549) {
            clearInterval(counterLine)
        }
        
    }
}
// <--***** QUESTIONS OBJECT DATABASE--*****-->
// <--***** QUESTIONS OBJECT DATABASE--*****-->

function Questions(no, question, answer, options) {
    this.no = no;
    this.question = question;
    this.answer = answer;
    this.options = options;
}

const q1 = new Questions(1, `What is the correct syntax to print "Hello, World!" to the console in JavaScript?`, `console.log("Hello, World!");`, [`console.print("Hello, World!");`, `print.console("Hello, World!");`, `console.log("Hello, World!");`, `log.console("Hello, World!");`]);

const q2 = new Questions(2, `How do you declare a variable in JavaScript ES5?`, `let myVariable;`, [`variable myVariable;`, `var myVariable;`, `declare myVariable;`, `let myVariable;`]);

const q3 = new Questions(3, `Which operator is used to compare two values for strict equality in JavaScript?`, `===`, [`===`, `==`, `!=`, `!==`]);

const q4 = new Questions(4, `How do you create a function in JavaScript?`, `function myFunction() {}`, [`create function myFunction() {}`, `function myFunction() {}`, `func myFunction() {}`, `def myFunction() {}`]);

const q5 = new Questions(5, `What does the typeof operator do in JavaScript?`, `Determines the type of a variable`, [`Checks if a variable is defined`, `Determines the type of a variable`, `Converts a variable to a specific type`, `Creates a new variable of a specified type`]);

const q6 = new Questions(6, `What is the difference between var, let and const?`, `var is function-scoped, let and const are blocked-scoped`, [`var is blocked-scoped, let and const are function scoped`, `var is function-scoped, let and const are blocked-scoped`, `They are all scoped`, `They aren't scoped at all`]);

const q7 = new Questions(7, `What are data types in JavaScript?`, `String, Number, Boolean, Object, Undefined, Null, Symbol`, [`String, Integer, Boolean, Character`, `String, Number, Boolean, Object, Undefined, Null, Symbol`, `String, Float, Boolean, Object`, `Integer, Boolean, Array, Function`]);

const q8 = new Questions(8, `What are JavaScript arrays?`, `Ordered collections of values`, [`Lists of key-value pairs`, `Collections of elements with a fixed size`, `Ordered collections of values`, `A type of object with a single value`]);

const q9 = new Questions(9, `How do you access elements in an array?`, `By index`, [`By index`, `By key`, `By value`, `By property name`]);

const q10 = new Questions(10, `What is a JavaScript object?`, `A collection of key-value pairs`, [`A primitive data type`, `A list of functions`, `A collection of key-value pairs`, `An ordered collection of values`]);

const q11 = new Questions(11, `How do you add a property to an object?`, `object.property = value;`, [`object.property = value;`, `object.addProperty(property, value);`, `object.set(property, value);`, `object.insert(property, value);`]);

const q12 = new Questions(12, `What is a JavaScript loop?`, `A way to repeat code`, [`A method to iterate over arrays`, `A function that executes repeatedly`, `A conditional statement`, `A way to repeat code`]);

const q13 = new Questions(13, `How do write a 'for' loop in Javascript?`, `loop (i = 0; i < 10; i++) { }`, [`loop (i = 0; i < 10; i++) { }`, `loop (i = 0; i < 10; i++) { }`, `for (i < 10; i++) { }`, `repeat (i = 0; i < 10; i++) { }`]);

const q14 = new Questions(14, `What is a while loop?`, `A loop that executes a block of code as long as a condition is true`, [`A loop that executes a block of code a fixed number of times`, `A loop that runs indefinitely`, `A loop that executes a block of code as long as a condition is true`, `A function that calls itself`]);

const q15 = new Questions(15, `What is a do...while loop?`, `A loop that executes code at least once, then repeats as long as a condition is true`, [`A loop that executes code zero or more times`, `A loop that executes code at least once, then repeats as long as a condition is true`, `A loop that executes code based on user input`, `A loop that is used for recursion`]);

const q16 = new Questions(16, `What are JavaScript conditional statements?`, `Statements that perform actions based on conditions`, [`Statements that declare variables`, `Statements that define functions`, `Statements that perform actions based on conditions`, `Statements that loop through data`]);

const q17 = new Questions(17, `How do you write an if statement in JavaScript?`, `if (condition) { }`, [`if (condition) { }`, `if condition { }`, `check (condition) { }`, `if (condition) then { }`]);

const q18 = new Questions(18, `What is the purpose of the switch statement?`, `To execute code based on multiple conditions`, [`To define new functions`, `To perform an action based on a condition`, `To loop through values`, `To execute code based on multiple conditions`]);

let questionss = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18];
