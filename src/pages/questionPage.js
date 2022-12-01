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
    START_GAME
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { createCounterElement } from '../views/counterView.js';
import { createQuestionNumberElement } from '../views/questionNumberView.js';
import { createTimerElement } from '../views/timerView.js';
// import { initResultsPage } from './resultsPage.js';
export const initQuestionPage = () => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';
    const counterElement = createCounterElement();
    userInterface.appendChild(counterElement);
    const questionNumberElement = createQuestionNumberElement();
    userInterface.appendChild(questionNumberElement);
    const timerElement = createTimerElement();
    userInterface.appendChild(timerElement);
    const timeStart = new Date(JSON.parse(localStorage.getItem(START_GAME)));
    updateTime(timerElement, timeStart);

    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const questionElement = createQuestionElement(currentQuestion.text);
    userInterface.appendChild(questionElement);
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
        const answerElement = createAnswerElement(key, answerText);
        answersListElement.appendChild(answerElement);
        if (key === currentQuestion.correct) {
            answerElement.classList.add('correct-answer');
        }
        answerElement.addEventListener('click', (event) => checkAnswer(key, event.target));
        if (currentQuestion.selected === key) {
            if (key === currentQuestion.correct) {
                answerElement.classList.add('correct');
            } else {
                answerElement.classList.add('incorrect');
            }
        }
    }
    const resultsButton = document.getElementById(RESULTS_BUTTON_ID)
        // resultsButton.addEventListener('click', initResultsPage );
    resultsButton.classList.add("hidden")



    const nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID)
    nextButton.addEventListener('click', nextQuestion);
    if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        nextButton.classList.add("hidden")
        resultsButton.classList.remove("hidden")
    }
    const prevButton = document.getElementById(PREV_QUESTION_BUTTON_ID)
    prevButton.addEventListener('click', prevQuestion);
    if (quizData.currentQuestionIndex === 0) {
        prevButton.classList.add("hidden")
    }

    const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
    doNotKnowButton.addEventListener("click", showAnswer)
    if (currentQuestion.selected) {
        doNotKnowButton.classList.add("hidden")
        answersListElement.classList.add('disabled');
    }
};
const nextQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    initQuestionPage();
};
const prevQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;
    initQuestionPage();
};
const setAnswer = () => {
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    answersListElement.classList.add('disabled');

    const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
    doNotKnowButton.classList.add("hidden")

    localStorage.setItem(STORED_DATA, JSON.stringify(quizData.questions.map(question => question.selected)))

};

function checkAnswer(answerKey, answerElement) {

    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    if (answerKey === currentQuestion.correct) {
        const amountOfCorrectAnswers = quizData.questions.reduce((sum, question) => {
            if ('abcd'.includes(question.selected)) return ++sum;
            else return sum;
        }, 0);
        document.getElementById(COUNTER_ELEMENT).textContent = `${amountOfCorrectAnswers +1} / ${quizData.questions.length}`;

        answerElement.classList.add('correct');
    } else {
        answerElement.classList.add('incorrect');
    }
    currentQuestion.selected = answerKey;
    setAnswer()

}
const showAnswer = () => {

    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected = DO_NOT_KNOW_KEY;
    setAnswer();
}

function updateTime(timerElement, timeStart, nextMinute, nextSecond) {
    // if (nextMinute === 10) { initResultsPage() } // if 10 minutes is gone we'll load final page
    const timeNow = new Date();

    const minutes = nextMinute || Math.floor((timeNow - timeStart) / 1000 / 60);
    const seconds = nextSecond || Math.floor((timeNow - timeStart) / 1000 - (minutes * 60));

    timerElement.textContent = `Time: ${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`;
    if (seconds === 59) {
        nextMinute = minutes + 1;
        nextSecond = 0
    } else {
        nextSecond = seconds + 1;
    }
    setTimeout(() => {
        updateTime(timerElement, timeStart, nextMinute, nextSecond);
    }, 1000);
}