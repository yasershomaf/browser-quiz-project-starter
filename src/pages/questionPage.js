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
import { setQuestionRecord } from '../questionsRecord.js';
import { getQuestionRecord } from '../questionsRecord.js';

export const initQuestionPage = () => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';

    //For status information
    const currentStatus = getQuestionRecord(); // We use getQuestionRecord function and take values as object.
    const statusElement = createStatusElement(currentStatus); // Send that object to views for prepared as html element
    userInterface.appendChild(statusElement); // Put that element in page

    //For Questions
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const questionElement = createQuestionElement(currentQuestion.text);
    userInterface.appendChild(questionElement);

    //For creating answer List
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);

    for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
        const answerElement = createAnswerElement(key, answerText); //answerElement holds, key and answerText values

        if (!currentStatus.userAnswers[currentStatus.currentIndex]) {
            //check that we didn't answer
            answerElement.addEventListener('click', checkAnswer);
        } else if (
            currentStatus.userAnswers[currentStatus.currentIndex].correctAnswer ===
            key
        ) {
            //show answers that we did before
            answerElement.classList.add('green');
        } else if (
            currentStatus.userAnswers[currentStatus.currentIndex].userAnswer === key
        ) {
            answerElement.classList.add('red');
        }
        //click listener added to the answerElement
        answersListElement.appendChild(answerElement); //answerElement added in answersListElement
    }

    //To decide which buttons to show depending on the index of question
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
    if (!currentStatus.userAnswers[currentStatus.currentIndex]) {
        //check that we didn't answers
        document
            .getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
            .addEventListener('click', showAnswer);
    }
};

//For moving between questions
const nextQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
    setQuestionRecord('', quizData.currentQuestionIndex);
    initQuestionPage();
};

const prevQuestion = () => {
    quizData.currentQuestionIndex = quizData.currentQuestionIndex - 1;
    setQuestionRecord('', quizData.currentQuestionIndex);
    initQuestionPage();
};

//For checking answers
function checkAnswer() {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const answersListElement = this.parentElement.children;
    if (this.textContent[5] === currentQuestion.correct) {
        // If selected one is correct: make it green and add +1 to correct answers
        this.classList.add('green');
        setQuestionRecord(
            'correct',
            quizData.currentQuestionIndex,
            currentQuestion.correct,
            currentQuestion.correct
        );
        // show amount of correct answer immediately
        const statusElement = document.querySelector('.status h2');
        const currentStatus = getQuestionRecord();
        statusElement.textContent = `${currentStatus.totalCorrectAnswers} / ${quizData.questions.length}`;
    } else {
        this.classList.add('red');
        setQuestionRecord(
            'incorrect',
            quizData.currentQuestionIndex,
            currentQuestion.correct,
            this.textContent[5]
        );

        // After wrong option selected this will show right option
        for (const answer of answersListElement) {
            if (answer.textContent[5] === currentQuestion.correct) {
                answer.classList.add('green');
            }
        }
    }
    // to make that function one use only, we remove it for every item after use
    for (const answer of answersListElement) {
        answer.removeEventListener('click', checkAnswer);
    }
}
// show answer if we push the button i don't know
function showAnswer() {
    const answersListElement = document.querySelectorAll('li');
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    setQuestionRecord(
        'incorrect',
        quizData.currentQuestionIndex,
        currentQuestion.correct
    );
    for (const answer of answersListElement) {
        if (answer.textContent[5] === currentQuestion.correct) {
            answer.classList.add('green');
        }
        answer.removeEventListener('click', checkAnswer);
    }
}