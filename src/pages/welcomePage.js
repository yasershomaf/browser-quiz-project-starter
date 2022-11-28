import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';
import { setQuestionRecord } from '../questionsRecord.js';

export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const startQuiz = () => {
  setQuestionRecord('reset', 0); //To reset Local Storage of question records.
  // Funny thing is we use Local Storage against refreshing page. But with refreshing page we manually reset with this
  // Otherwise correct answer numbers pumping up with every click.
  // Need to find solution to start from that(when page refreshed) question when page refreshed to solve this.
  // or ignore already answered question when starting from beginning.
  initQuestionPage();
};
