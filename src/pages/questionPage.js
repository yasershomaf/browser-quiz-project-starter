import {
    ANSWERS_LIST_ID,
    NEXT_QUESTION_BUTTON_ID,
    PREVIOUS_QUESTION_BUTTON_ID,
    DONT_KNOW_QUESTION_BUTTON_ID,
    USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { createStatusElement } from '../views/recordView.js';
import { quizData } from '../data.js';
import { getQuestionRecord } from '../questionsRecord.js';
import { setQuestionRecord } from '../questionsRecord.js';

export const initQuestionPage = () => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';

  //For status information
  const currentStatus = getQuestionRecord(); // We use getQuestionRecord function and take values as object.
  const statusElement = createStatusElement(currentStatus); // Send that object to views for prepared as html element
  userInterface.appendChild(statusElement); // Put that element in page

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

    const questionElement = createQuestionElement(currentQuestion.text);

    userInterface.appendChild(questionElement);

    const answersListElement = document.getElementById(ANSWERS_LIST_ID);

    for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
        const answerElement = createAnswerElement(key, answerText);
        answerElement.addEventListener('click', checkAnswer);
        answersListElement.appendChild(answerElement);
    }
    if (quizData.currentQuestionIndex === 0) {
        document
            .getElementById(NEXT_QUESTION_BUTTON_ID)
            .addEventListener('click', nextQuestion);
        document.getElementById(PREVIOUS_QUESTION_BUTTON_ID).style.display = 'none';
    } else if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        document
            .getElementById(PREVIOUS_QUESTION_BUTTON_ID)
            .addEventListener('click', prevQuestion);
        document.getElementById(NEXT_QUESTION_BUTTON_ID).style.display = 'none';
    } else {
        document
            .getElementById(PREVIOUS_QUESTION_BUTTON_ID)
            .addEventListener('click', prevQuestion);
        document
            .getElementById(NEXT_QUESTION_BUTTON_ID)
            .addEventListener('click', nextQuestion);
    }
    const indexOfCorrectAnswer = 'abcd'.indexOf(quizData.questions.correct);
    document
        .getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
        .addEventListener('click', showAnswer);

};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  setQuestionRecord('', quizData.currentQuestionIndex + 1);
  initQuestionPage();
};

const prevQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;

    initQuestionPage();
};

function checkAnswer() {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const answersListElement = this.parentElement.children;
    if (this.textContent[5] === currentQuestion.correct) {
        this.classList.add('green');
    } else {
        this.classList.add('red');
        for (const answer of answersListElement) {
            if (answer.textContent[5] === currentQuestion.correct) {
                answer.classList.add('green');
            }
        }
    }
    for (const answer of answersListElement) {
        answer.removeEventListener('click', checkAnswer);
    }
}

function showAnswer() {
    const answersListElement = document.querySelectorAll('li');
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    for (const answer of answersListElement) {
        if (answer.textContent[5] === currentQuestion.correct) {
            answer.classList.add('green');
        }
        answer.removeEventListener('click', checkAnswer);
    }
}