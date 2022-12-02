import { STORED_DATA } from "./constants.js";

/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

const storedData = JSON.parse(localStorage.getItem(STORED_DATA))

const quizData = {
    currentQuestionIndex: 0,
    // the questions in the quiz
    questions: [{
            text: 'Why use "use strict" at the beginning of a JavaScript file?',
            answers: {
                a: 'Indicates that all variables must be named in camelCase',
                b: 'Turns on strict mode, warnings become errors',
                c: 'Indicates that only "let" and "const" can be used in the code',
                d: 'There is a limit on the use of the number of characters in the name of variables',
            },
            correct: 'b',
            selected: null,
            links: [{
                    text: 'W3School',
                    href: 'https://www.w3schools.com/js/js_strict.asp',
                },
                {
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode',
                },
            ],
        },
        {
            text: 'How to check if an object is an array?',
            answers: {
                a: 'type of(Array)',
                b: 'if (Array = "array")',
                c: 'No way, all arrays in JS are objects',
                d: 'Array.isArray',
            },
            correct: 'd',
            selected: null,
            links: [{
                    text: 'Tutorial Republic',
                    href: 'https://www.tutorialrepublic.com/faq/how-to-check-if-object-is-an-array-in-javascript.php',
                },
                {
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray',
                },
            ],
        },
        {
            text: 'What is "this"?',
            answers: {
                a: '"this" points to the scope object at run time',
                b: '"this" is always equal to window',
                c: '"this" replaces any variable',
                d: '"this" is always used only in functions and refers to the function itself',
            },
            correct: 'a',
            selected: null,
            links: [{
                    text: 'W3School',
                    href: 'https://www.w3schools.com/js/js_this.asp',
                },
                {
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',
                },
            ],
        },
        {
            text: 'Is there a difference between == and === ?',
            answers: {
                a: 'There is no difference',
                b: 'One produces a type cast, the other does not',
                c: 'One is in strict mode, the other is not',
                d: 'One operator for comparing primitives, another for objects and arrays',
            },
            correct: 'b',
            selected: null,
            links: [{
                    text: 'Guru99',
                    href: 'https://www.guru99.com/difference-equality-strict-operator-javascript.html',
                },
                {
                    text: 'JavaScript.info',
                    href: 'https://javascript.info/comparison',
                },
            ],
        },
        {
            text: 'What happens as a result of the expression const foo = 10 + "20" ?',
            answers: {
                a: '30',
                b: '1020',
                c: 'will cause an error',
                d: 'undefined',
            },
            correct: 'b',
            selected: null,
            links: [{
                    text: 'JS Tutor',
                    href: 'https://pythontutor.com/javascript.html#mode=edit',
                },
                {
                    text: 'Programiz.com',
                    href: 'https://www.programiz.com/javascript/online-compiler/',
                },
            ],
        },
        {
            text: 'How can an object be cloned?',
            answers: {
                a: 'Object1 = Object2',
                b: 'Object1 === Object2',
                c: 'Object1.clone(Object2)',
                d: 'Object1 = {...Object2}',
            },
            correct: 'd',
            selected: null,
            links: [{
                    text: 'Codingem.com',
                    href: 'https://www.codingem.com/javascript-clone-object/',
                },
                {
                    text: 'FreeCodeCamp.org',
                    href: 'https://www.freecodecamp.org/news/clone-an-object-in-javascript/',
                },
            ],
        },
        {
            text: 'How can you add an element to the beginning of an array?',
            answers: {
                a: 'Array.filter()',
                b: 'Array.forEach()',
                c: 'Array.push()',
                d: 'Array.unshift()',
            },
            correct: 'd',
            selected: null,
            links: [{
                    text: 'W3School',
                    href: 'https://www.w3schools.com/jsref/jsref_unshift.asp#:~:text=The%20unshift()%20method%20adds,method%20overwrites%20the%20original%20array.',
                },
                {
                    text: 'FreeCodeCamp.org',
                    href: 'https://www.freecodecamp.org/news/how-to-insert-an-element-into-an-array-in-javascript/',
                },
            ],
        },
        {
            text: 'The task is to multiply all the numbers in the array by 2, which method is better to use?',
            answers: {
                a: 'Array.filter()',
                b: 'Array.forEach()',
                c: 'Array.map()',
                d: 'Array.reduce()',
            },
            correct: 'c',
            selected: null,
            links: [{
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
                },
                {
                    text: 'W3School',
                    href: 'https://www.w3schools.com/js/js_array_methods.asp',
                },
            ],
        },
        {
            text: 'Is the declaration of the "var" variable currently being used to write code?',
            answers: {
                a: 'var allows variables to be hoisted, which means they can be referenced in code before they are declared',
                b: 'Applies, but not in strict mode',
                c: 'No, this is an obsolete variable declaration, not used now',
                d: 'You can use "let", "const" and "var" in the same way',
            },
            correct: 'a',
            selected: null,
            links: [{
                    text: 'FreeCodeCamp',
                    href: 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/',
                },
                {
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let',
                },
            ],
        },
        {
            text: 'What object does not exist in JS?',
            answers: {
                a: 'Map',
                b: 'Set',
                c: 'Array',
                d: 'Let',
            },
            correct: 'd',
            selected: null,
            links: [{
                    text: 'FreeCodeCamp',
                    href: 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/',
                },
                {
                    text: 'MDN',
                    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let',
                },
            ],
        },
    ],
};

if (storedData) {
    quizData.questions.forEach((question, index) => {
        question.selected = storedData[index]
    })
}
export { quizData }