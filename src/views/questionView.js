import {
  ANSWERS_LIST_ID,
  QUESTION_CONTAINER_CLASS,
  USEFUL_LINKS_ID,
} from '../constants.js';
/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  const element = document.createElement('div');
  element.classList.add(QUESTION_CONTAINER_CLASS);
  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
  <h1>${question}</h1>
  <ul id="${ANSWERS_LIST_ID}">
  </ul>
  <ul id="${USEFUL_LINKS_ID}">
  </ul>
`;

  return element;
};
