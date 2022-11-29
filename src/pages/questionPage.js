import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREVIOUS_QUESTION_BUTTON_ID,
  DONT_KNOW_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createStatusElement } from '../views/recordView.js';
import { quizData } from '../data.js';
import { setQuestionRecord } from '../questionsRecord.js';
import { sumCorrectAnswers } from '../questionsRecord.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  //This is for creating STATUS information
  const currentQuestionNumber = quizData.currentQuestionIndex; //To get current question number
  const sumCorrect = sumCorrectAnswers(); // To get 3 value from sumCorrectAnswers [sum, totalAnsweredQuestions, lastOne]
  const statusElement = createStatusElement(currentQuestionNumber, sumCorrect); // Send that list to views for prepared as html element
  userInterface.appendChild(statusElement); // Put that element in page

  //For Questions
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  //For creating answer List
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText); //answerElement holds, key and answerText values
    answerElement.addEventListener('click', checkAnswer); //click listener added to the answerElement
    answersListElement.appendChild(answerElement); //answerElement added in answersListElement
  }

  //To decide which buttons to show depending on the index of question
  if (quizData.currentQuestionIndex === 0) {
    document
      .getElementById(NEXT_QUESTION_BUTTON_ID)
      .addEventListener('click', nextQuestion);
    document.getElementById(PREVIOUS_QUESTION_BUTTON_ID).style.display = 'none';
  } else if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    document
      .getElementById(PREVIOUS_QUESTION_BUTTON_ID)
      .addEventListener('click', prevQuestion);
    document.getElementById(NEXT_QUESTION_BUTTON_ID).style.display = 'none';
  } else {
    document
      .getElementById(PREVIOUS_QUESTION_BUTTON_ID)
      .addEventListener('click', prevQuestion);
    document
      .getElementById(NEXT_QUESTION_BUTTON_ID)
      .addEventListener('click', nextQuestion);
  }
  const indexOfCorrectAnswer = 'abcd'.indexOf(quizData.questions.correct);
  document
    .getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
    .addEventListener('click', showAnswer);
};

//For moving between questions
const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  initQuestionPage();
};

const prevQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;
  initQuestionPage();
};

//For checking answers
function checkAnswer() {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const answersListElement = this.parentElement.children;
  setQuestionRecord(this.textContent[5], quizData.currentQuestionIndex); //This will refresh local data with chosen answer
  //this.textContent[5] getting the 5. char at string which is after 4 blank space: our answer letter
  if (this.textContent[5] === currentQuestion.correct) {
    console.log(this.textContent[2]);
    // If selected one is correct: make it green
    this.classList.add('green');
  } else {
    this.classList.add('red');
    // if wrong option selected this for function will still show the right answer
    for (const answer of answersListElement) {
      if (answer.textContent[5] === currentQuestion.correct) {
        answer.classList.add('green');
      }
    }
  }

  // to make that function one use only, we remove it for every item after use
  for (const answer of answersListElement) {
    answer.removeEventListener('click', checkAnswer);
  }
  // initQuestionPage();
  // ^^
  // This code can refresh the page immediately. But it also refresh the questions and erase their color.
  // What can be done: While producing question checking if they already answered and give a color with getQuestionRecord method ?? maybe ?? I don't know
}

function showAnswer() {
  const answersListElement = document.querySelectorAll('li');
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  for (const answer of answersListElement) {
    if (answer.textContent[5] === currentQuestion.correct) {
      answer.classList.add('green');
    }
    answer.removeEventListener('click', checkAnswer);
  }
}
