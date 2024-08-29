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

const q19 = new Questions(19, `How do you handle errors in JavaScript?`, `Using try...catch blocks`, [`Using try...catch blocks`, `Using if...else statements`, `Using error functions`, `Using debug commands`]);

const q20 = new Questions(20, `What is an event in JavaScript?`, `An action or occurrence that is handled by the code`, [`A type of variable`, `An action or occurrence that is handled by the code`, `A loop that handles data`, `A function that executes on demand`]);

const q21 = new Questions(21, `How do you add an event listener to an element?`, `element.addEventListener(event, function)`, [`element.addEventListener(event, function)`, `element.on(event, function)`, `element.attach(event, function)`, `element.listen(event, function)`]);

const q22 = new Questions(22, `What is the DOM (Document Object Model)`, `An API for interacting with HTML and XML documents`, [`A server-side technology`, `A way to style documents`, `An API for interacting with HTML and XML documents`, `A database query language`]);

const q23 = new Questions(23, `How do you manipulate the DOM using JavaScript?`, `By using the DOM API methods`, [`By modifying the HTML structure directly`, `By writing CSS rules`, `By creating new files`, `By using the DOM API methods`]);

const q24 = new Questions(24, `What is a JavaScript callback function?`, `A function that is passed as an argument to another functions`, [`A function that returns another function`, `A function that is passed as an argument to another function`, `A function that calls itself`, `A function that runs automatically on load`]);

const q25 = new Questions(25, `What is the difference between synchronous and asynchronous code?`, `Synchronous code executes one line at a time, asynchronous code can execute out of order`, [`Synchronous code executes one line at a time, asynchronous code can execute out of order`, `Synchronous code is executed by the server, asynchronous code by the client`, `Synchronous code can be paused, asynchronous code cannot`, `Both execute in the same manner`]);

const q26 = new Questions(26, `What is a promise in JavaScript?`, `An object representing the eventual completion or failure of an asynchronous operation`, [`A data structure for storing values`, `A method for handling errors`, `An object representing the eventual completion or failure of an asynchronous operation`, `A function for iterating over values`]);

const q27 = new Questions(27, `How do you create and use a JavaScript promise?`, `new Promise((resolve, reject) => { })`, [`new Promise((resolve, reject) => { })`, `Promise.create((resolve, reject) => { })`, `Promise((resolve, reject) => { })`, `new AsyncPromise((resolve, reject) => { })`])

const q28 = new Questions(28, `What is async/await in JavaScript?`, `A way to handle asynchronous code in a more synchronous manner`, [`A technique for optimizing synchronous code`, `A method for defining global variable`, `A technique for optimizing synchronous code`, `A way to handle asynchronous code in a more synchronous manner`]);

const q29 = new Questions(29, `What is the purpose of the this keyword in JavaScript?`, `To refer to the object that owns the method`, [`To refer to the previous value of a variable`, `To refer to the global object`, `To refer to the object that owns the method`, ` To refer to the function that is currently executing`]);

const q30 = new Questions(30, `How do you create a JavaScript class?`, `class MyClass { constructor() { } }`, [`class MyClass { function() { } }`, `class MyClass { constructor() { } }`, `create class MyClass { }`, `function MyClass() { }`]);

const q31 = new Questions(31, `What is inheritance in JavaScript?`, `A way to extend functionality from one class to another`, [`A method for creating objects`, `A technique for handling asynchronous operations`, `A way to define global functions`, `A way to extend functionality from one class to another`]);

const q32 = new Questions(32, `What are JavaScript closures?`, `Functions that are defined inside another function and retain access to their outer function's variables`, [`Objects that encapsulate data and functions`, `Functions that execute repeatedly`, `Variables that are globally scoped`, `Functions that are defined inside another function and retain access to their outer function's variables`]);

const q33 = new Questions(33, `How do you use the map method on an array?`, `array.map(callback)`, [`array.map(callback)`, `array.apply(callback)`, `array.filter(callback)`, `array.reduce(callback)`]);

const q34 = new Questions(34, `How do you write an if statement in JavaScript?`, `if (condition) { }`, [`if (condition) { }`, `if condition { }`, `check (condition) { }`, `if (condition) then { }`]);

const q35 = new Questions(35, `What is the filter method in JavaScript?`, `A method to create a new array with elements that pass a test`, [`A method to transform each element in an array`, `A method to create a new array with elements that pass a test`, `A method to sort elements in an array`, `A method to remove duplicates from an array`]);

const q36 = new Questions(36, `How do you use the reduce method on an array?`, `array.reduce(callback, initialValue)`, [`array.reduce(callback, initialValue)`, `array.reduce(callback, initialValue)`, `array.map(callback, initialValue)`, `array.push(callback, initialValue)`]);

const q37 = new Questions(37, `What is the spread operator?`, `... used to expand an iterable into elements`, [`[] used to create arrays`, `{} used to create objects`, `... used to expand an iterable into elements`, `() used to call functions`]);

const q38 = new Questions(38, `What is destructuring in JavaScript?`, `A way to extract values from arrays or objects into distinct variables`, [`A method to modify the DOM`, `A way to extract values from arrays or objects into distinct variables`, `A technique to combine arrays`, `A way to define functions with multiple parameters`]);

const q39 = new Questions(39, `What are JavaScript conditional statements?`, `Statements that perform actions based on conditions`, [`Statements that declare variables`, `Statements that define functions`, `Statements that perform actions based on conditions`, `Statements that loop through data`]);

const q40 = new Questions(40, `What are JavaScript modules?`, `Pieces of reusable code that can be exported and imported`, [`Templates for HTML`, `Scripts for server-side operations`, `Pieces of reusable code that can be exported and imported`, `Stylesheets for CSS`]);

let questionss = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32, q33, q34, q35, q36, q37, q38, q39, q40];
