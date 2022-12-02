import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID, STORED_DATA, START_TIME } from '../constants.js';
import { createResults } from '../views/resultsView.js';
import { initQuestionPage } from './questionPage.js';
import { createCounterElement } from '../views/counterView.js';
import { quizData } from '../data.js';



export const initResultsPage = (time) => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';
    const timeContainer = document.createElement("div")
    timeContainer.textContent = "Your time is : " + time;
    userInterface.appendChild(timeContainer)

    const counter = createCounterElement();
    userInterface.appendChild(counter)

    const resultsElement = createResults()
    userInterface.appendChild(resultsElement)
    
    document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
}
const startQuiz = () => {
    localStorage.removeItem(STORED_DATA)
    localStorage.removeItem(START_TIME)
    quizData.questions.forEach(question => {
        question.selected = null
    })
    quizData.currentQuestionIndex = 0;
    initQuestionPage(true);
  };
