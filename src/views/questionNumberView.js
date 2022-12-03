import { quizData } from '../data.js';
import { QUESTION_NUMBER_ID } from '../constants.js';

export const createQuestionNumberElement = () => {
  const element = document.createElement('div');
  element.setAttribute('id', QUESTION_NUMBER_ID);
  element.innerHTML = String.raw`
      Question № ${quizData.currentQuestionIndex + 1};
    `;
  return element;
};
