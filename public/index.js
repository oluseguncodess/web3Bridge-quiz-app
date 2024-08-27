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
     },
    {
        no: 6,
        question: `What is the difference between var, let and const`,
        answer:`var is function-scoped, let and const are blocked-scoped`,
        options: [
            `var is blocked-scoped, let and const are function scoped`, 
            `var is function-scoped, let and const are blocked-scoped`,
            `They are all scoped`,
            `They aren't scoped at all`
        ]
    },
    {
        no: 7,
        question: `What are data types in JavaScript?`,
        answer:`String, Number, Boolean, Object, Undefined, Null, Symbol`,
        options: [
            `String, Integer, Boolean, Character`, 
            `String, Number, Boolean, Object, Undefined, Null, Symbol`,
            `String, Float, Boolean, Object`,
            `Integer, Boolean, Array, Function`
        ]
    },
    {
        no: 8,
        question: `What are JavaScript arrays?`,
        answer:`Ordered collections of values`,
        options: [
            `Lists of key-value pairs`, 
            `Collections of elements with a fixed size`,
            `Ordered collections of values`,
            `A type of object with a single value`
        ]
    },
    {
        no: 9,
        question: `How do you access elements in an array?`,
        answer:`By index`,
        options: [
            `By index`, 
            `By key`,
            `By value`,
            `By property name`
        ]
    },
    {
        no: 10,
        question: `What is a JavaScript object?`,
        answer:`A collection of key-value pairs`,
        options: [
            `A primitive data type`, 
            `A list of functions`,
            `A collection of key-value pairs`,
            `An ordered collection of values`
        ]
    },
    {
        no: 11,
        question: `How do you add a property to an object?`,
        answer:`object.property = value;`,
        options: [
            `object.property = value;`, 
            `object.addProperty(property, value);`,
            `object.set(property, value);`,
            `object.insert(property, value);`
        ]
    },
    {
        no: 12,
        question: `What is a JavaScript loop`,
        answer:`A way to repeat code`,
        options: [
            `A method to iterate over arrays`, 
            `A function that executes repeatedly`,
            `A conditional statement`,
            `A way to repeat code`
        ]
    },
    {
        no: 13,
        question: `How do write a 'for' loop in Javascript?`,
        answer:`loop (i = 0; i < 10; i++) { }`,
        options: [
            `loop (i = 0; i < 10; i++) { }`, 
            `loop (i = 0; i < 10; i++) { }`,
            `for (i < 10; i++) { }`,
            `repeat (i = 0; i < 10; i++) { }`
        ]
    },
    {
        no: 14,
        question: `What is a while loop?`,
        answer:`A loop that executes a block of code as long as a condition is true`,
        options: [
            `A loop that executes a block of code as long as a condition is true`, 
            `A loop that executes a block of code a fixed number of times`,
            `A loop that runs indefinitely`,
            `A function that calls itself`
        ]
    },
    {
        no: 15,
        question: `What is a do...while loop?`,
        answer:`A loop that executes code at least once, then repeats as long as a condition is true`,
        options: [
            `A loop that executes code zero or more times`, 
            `A loop that executes code at least once, then repeats as long as a condition is true`,
            `A loop that executes code based on user input`,
            `A loop that is used for recursion`
        ]
    },
    {
        no: 16,
        question: `What are JavaScript conditional statements?`,
        answer:`Statements that perform actions based on conditions`,
        options: [
            `Statements that declare variables`, 
            `Statements that define functions`,
            `Statements that perform actions based on conditions`,
            `Statements that loop through data`
        ]
    },
    {
        no: 17,
        question: `How do you write an if statement in JavaScript?`,
        answer:`if (condition) { }`,
        options: [
            `if (condition) { }`, 
            `if condition { }`,
            `check (condition) { }`,
            `if (condition) then { }`
        ]
    },
    {
        no: 18,
        question: `What is the purpose of the switch statement?`,
        answer:`To execute code based on multiple conditions`,
        options: [
            ` To define new functions`, 
            `To perform an action based on a condition`,
            `To loop through values`,
            `To execute code based on multiple conditions`
        ]
    }
];