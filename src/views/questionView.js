import { ANSWERS_LIST_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { PREVIOUS_QUESTION_BUTTON_ID } from '../constants.js';
import { DONT_KNOW_QUESTION_BUTTON_ID } from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
    const element = document.createElement('div');

    // I use String.raw just to get fancy colors for the HTML in VS Code.
    element.innerHTML = String.raw `
    <h1>${question}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>
    <button id="${PREVIOUS_QUESTION_BUTTON_ID}">
      Previous question
    </button>
    <button id="${DONT_KNOW_QUESTION_BUTTON_ID}">
      I don't know
    </button>
    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>
  `;

    return element;
};