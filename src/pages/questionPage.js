import {
  ANSWERS_LIST_ID,
  DONT_KNOW_QUESTION_BUTTON_ID,
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  RESULTS_BUTTON_ID,
  USER_INTERFACE_ID,
  DO_NOT_KNOW_KEY,
  STORED_DATA,
  COUNTER_ELEMENT,
  START_TIME,
  USEFUL_LINKS_ID,
  STATUS_DIV,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createButtonElement } from '../views/buttonView.js';
import { quizData } from '../data.js';
import { createCounterElement } from '../views/counterView.js';
import { createQuestionNumberElement } from '../views/questionNumberView.js';
import { createTimerElement } from '../views/timerView.js';
import { createUsefulLinkElement } from '../views/usefulLink.js';
import { initResultsPage } from './resultsPage.js';

let startTime;
let timer;

//------------- CREATING PAGE -------------------
export const initQuestionPage = (resetTime) => {
  if (!startTime) {
    startTime = JSON.parse(localStorage.getItem(START_TIME));

    if (!startTime) {
      startTime = 0;
    }
  }
  if (resetTime) {
    startTime = 0;
  }
  // Reset html
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  // Status Elements
  const statusDiv = document.createElement('div');
  statusDiv.classList.add(STATUS_DIV);
  userInterface.appendChild(statusDiv);

  const counterElement = createCounterElement();
  statusDiv.appendChild(counterElement);
  const questionNumberElement = createQuestionNumberElement();
  statusDiv.appendChild(questionNumberElement);
  const timerElement = createTimerElement();
  statusDiv.appendChild(timerElement);

  clearTimeout(timer);
  timer = setTimeout(() => {
    updateTime(timerElement);
  }, 1000);

  // Getting Questions & Answers & Buttons and printing in page
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);

  //↓↓ To create Answer buttons
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement); // Button text changed for each button with the text in data
    // ↓↓ Correct answer have this class while creating the button (No need to click or anything).
    if (key === currentQuestion.correct) {
      answerElement.classList.add('correct-answer');
    }
    // ↓↓ on create: checkAnswer click listener added every to answer-button
    answerElement.addEventListener('click', (event) =>
      checkAnswer(key, event.target)
    );
    // ↓↓ If -selected- is not empty for current question that means we answer it before so: paint it on create
    if (currentQuestion.selected === key) {
      if (key === currentQuestion.correct) {
        answerElement.classList.add('correct');
      } else {
        answerElement.classList.add('incorrect');
      }
    }
  }

  //------------- CONTROL BUTTONS -------------------
  const buttonElement = createButtonElement();
  userInterface.appendChild(buttonElement);

  //------------- Useful Links -------------------
  const usefulLinksElement = document.getElementById(USEFUL_LINKS_ID);
  usefulLinksElement.classList.add('hidden');
  currentQuestion.links.forEach((link) => {
    const linkElement = createUsefulLinkElement(link);
    usefulLinksElement.appendChild(linkElement);
  });

  // ↓↓ Results ↓↓
  const resultsButton = document.getElementById(RESULTS_BUTTON_ID);
  resultsButton.addEventListener('click', () => {
    clearTimeout(timer);
    initResultsPage(formatTime(startTime));
  });
  resultsButton.classList.add('hidden'); // Results button is hidden by default

  // ↓↓ Next ↓↓
  const nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  nextButton.addEventListener('click', nextQuestion);
  if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
    nextButton.classList.add('hidden');
    resultsButton.classList.remove('hidden');
  }
  // ↓↓ Previous ↓↓
  const prevButton = document.getElementById(PREV_QUESTION_BUTTON_ID);
  prevButton.addEventListener('click', prevQuestion);
  if (quizData.currentQuestionIndex === 0) {
    prevButton.classList.add('hidden');
  }
  // ↓↓ Don't Know ↓↓
  const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID);
  doNotKnowButton.addEventListener('click', showAnswer);
  if (currentQuestion.selected) {
    doNotKnowButton.classList.add('hidden');
    answersListElement.classList.add('disabled'); //← ← This class has trick on CSS. If we have it: all button list will be unable to click
    usefulLinksElement.classList.remove('hidden');
  }
};

//------------- BUTTON FUNCTIONS -------------------
const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  initQuestionPage();
};
const prevQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;
  initQuestionPage();
};

// ↓↓ Making list disabled - hiding Don't know button - setting local storage = all common for checkAnswer() & showAnswer()
const setAnswer = () => {
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  answersListElement.classList.add('disabled'); //← ← This class has trick on CSS. If we have it: all button list will be unable to click

  const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID);
  doNotKnowButton.classList.add('hidden');

  const usefulLinksElement = document.getElementById(USEFUL_LINKS_ID);
  usefulLinksElement.classList.remove('hidden');
  // ↓↓ If User change -question.selected- this will put it on local storage
  localStorage.setItem(
    STORED_DATA,
    JSON.stringify(quizData.questions.map((question) => question.selected))
  );
};

function checkAnswer(answerKey, answerElement) {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  if (answerKey === currentQuestion.correct) {
    const amountOfCorrectAnswers = quizData.questions.filter(
      (question) => question.selected === question.correct
    ).length;
    document.getElementById(COUNTER_ELEMENT).textContent = `${
      amountOfCorrectAnswers + 1
    } / ${quizData.questions.length}`;

    answerElement.classList.add('correct');
  } else {
    answerElement.classList.add('incorrect');
  }
  currentQuestion.selected = answerKey;
  setAnswer();
}
const showAnswer = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = DO_NOT_KNOW_KEY; // ← ← Selected question marked as do-not-know-key
  setAnswer();
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60); // 60 (seconds per minute)
  const seconds = time - minutes * 60;
  return `${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`;
};

const updateTime = (timerElement) => {
  startTime++;
  localStorage.setItem(START_TIME, JSON.stringify(startTime));
  const formattedTime = formatTime(startTime);

  if (startTime === 600) {
    // 600 = 10 (minutes) * 60 (seconds per minute)
    clearTimeout(timer);
    initResultsPage(formattedTime);
    return;
  }
  timerElement.textContent = `Time: ${formattedTime}`;

  timer = setTimeout(() => {
    updateTime(timerElement);
  }, 1000);
};
