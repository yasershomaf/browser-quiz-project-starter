import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID, STORED_DATA, START_GAME } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';

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
    const now = new Date();
    if (!localStorage.getItem(STORED_DATA)) {
        localStorage.setItem(START_GAME, JSON.stringify(now))
    };
    initQuestionPage();
};