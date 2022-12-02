import {
  NEXT_QUESTION_BUTTON_ID,
  PREV_QUESTION_BUTTON_ID,
  DONT_KNOW_QUESTION_BUTTON_ID,
  RESULTS_BUTTON_ID,
  BUTTON_CONTAINER_CLASS,
} from '../constants.js';
/**
 * Create a full question element
 * @returns {Element}
 */
export const createButtonElement = () => {
  const element = document.createElement('div');
  element.classList.add(BUTTON_CONTAINER_CLASS);
  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
  <button id="${PREV_QUESTION_BUTTON_ID}">
    <<
  </button>
  <button id="${DONT_KNOW_QUESTION_BUTTON_ID}">
    ?
  </button>
  <button id="${NEXT_QUESTION_BUTTON_ID}">
    >>
  </button>
  <button id="${RESULTS_BUTTON_ID}">
    Results
  </button>
`;

  return element;
};
