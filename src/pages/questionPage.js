import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createStatusElement } from '../views/recordView.js';
import { quizData } from '../data.js';
import { getQuestionRecord } from '../questionsRecord.js';
import { setQuestionRecord } from '../questionsRecord.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  //For status information
  const currentStatus = getQuestionRecord(); // We use getQuestionRecord function and take values as object.
  const statusElement = createStatusElement(currentStatus); // Send that object to views for prepared as html element
  userInterface.appendChild(statusElement); // Put that element in page

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  setQuestionRecord('', quizData.currentQuestionIndex + 1);
  initQuestionPage();
};
