import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
    const element = document.createElement('div');
    element.innerHTML = String.raw `
    <h1>Welcome</h1>
    <button id="${START_QUIZ_BUTTON_ID}">start quiz</button>
    <p>You only have 10 minutes to answer</p>
  `;
    return element;
};