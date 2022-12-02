import {
    ANSWERS_LIST_ID,
    DONT_KNOW_QUESTION_BUTTON_ID,
    NEXT_QUESTION_BUTTON_ID,
    PREV_QUESTION_BUTTON_ID,
    RESULTS_BUTTON_ID,
    USER_INTERFACE_ID,
    DO_NOT_KNOW_KEY,
    STORED_DATA
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
// import { initResultsPage } from './resultsPage.js';
export const initQuestionPage = () => {
    const userInterface = document.getElementById(USER_INTERFACE_ID);
    userInterface.innerHTML = '';
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    console.log(currentQuestion.selected);
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
    const resultsButton =  document.getElementById(RESULTS_BUTTON_ID)
    // resultsButton.addEventListener('click', initResultsPage );
     resultsButton.classList.add("hidden")
            


    const nextButton =  document.getElementById(NEXT_QUESTION_BUTTON_ID)
    nextButton.addEventListener('click', nextQuestion);
        if (quizData.currentQuestionIndex === quizData.questions.length - 1 ){
            nextButton.classList.add("hidden")
            resultsButton.classList.remove("hidden")
        }
        const prevButton = document.getElementById(PREV_QUESTION_BUTTON_ID)
       prevButton .addEventListener('click', prevQuestion);
        if(quizData.currentQuestionIndex === 0){
            prevButton.classList.add("hidden")
        }
   
    const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
    doNotKnowButton.addEventListener("click", showAnswer)
    if(currentQuestion.selected){
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
const setAnswer = () =>{ 
    const answersListElement = document.getElementById(ANSWERS_LIST_ID);
    answersListElement.classList.add('disabled');

    const doNotKnowButton = document.getElementById(DONT_KNOW_QUESTION_BUTTON_ID)
    doNotKnowButton.classList.add("hidden")

    localStorage.setItem(STORED_DATA, JSON.stringify(quizData.questions.map(question =>question.selected)))

};

function checkAnswer(answerKey, answerElement) {
    
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    if (answerKey === currentQuestion.correct) {
        answerElement.classList.add('correct');
    } else {
        answerElement.classList.add('incorrect');
    }
    currentQuestion.selected = answerKey;

    setAnswer();


}
const showAnswer = () =>{
   
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    currentQuestion.selected = DO_NOT_KNOW_KEY;
setAnswer();
}
