import {
    ANSWERS_LIST_ID,
    NEXT_QUESTION_BUTTON_ID,
    PREV_QUESTION_BUTTON_ID,
    DONT_KNOW_QUESTION_BUTTON_ID,
    USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
export const initQuestionPage = () => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';
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
    if (quizData.currentQuestionIndex === 0) {
        document.getElementById(PREV_QUESTION_BUTTON_ID).style.display = 'none';
    }
    if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        document.getElementById(NEXT_QUESTION_BUTTON_ID).textContent = 'I finished';
    }
    document
        .getElementById(NEXT_QUESTION_BUTTON_ID)
        .addEventListener('click', nextQuestion);
    document
        .getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
        .addEventListener('click', () => showAnswer(key));
    document
        .getElementById(PREV_QUESTION_BUTTON_ID)
        .addEventListener('click', prevQuestion);
    if (currentQuestion.selected) {
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

function checkAnswer(answerKey, answerElement) {
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    answersListElement.classList.add('disabled');
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    if (answerKey === currentQuestion.correct) {
        answerElement.classList.add('correct');
    } else {
        answerElement.classList.add('incorrect');
    }
    currentQuestion.selected = answerKey;
}

function showAnswer(answerKey) {
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    answersListElement.classList.add('disabled');
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected = answerKey;
}