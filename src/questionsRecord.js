import { quizData } from './data.js';

//Creating answerList to save answers in Local Storage
// It is something like this vv
//{questionNumber: 1, answer: ''},{questionNumber: 2, answer: ''},{questionNumber: 3, answer: ''}...
let answerList = [];
for (let index = 0; index < quizData.questions.length; index++) {
  answerList.push({ questionNumber: index + 1, answer: '' });
}

// ----- To access Up-to-date User Answers -----
// Accessing answerList with getQuestionRecord() then return required variables
// When you call this function it will return list with 3 item: [sum, answeredQuestions, lastOne]

// -----How to use this in your page-----
// first: import { sumCorrectAnswers } from '../questionsRecord.js';
// then: const randomValue = sumCorrectAnswers();
// to reach specific element you should type:  randomValue.[2] => will bring you: answeredQuestions
function sumCorrectAnswers() {
  let updatedAnswerList = Object.values(getQuestionRecord())[0]; //Get up to date answers ans assign it to updatedAnswerList
  let sum = 0; //will be needed to sum the numbers
  let lastOne = 0; //if we refresh the page, it will show last un answered question
  let firstTime = true; //to get first un answered question.
  let totalUnAnswered = 0; //to count un answered questions

  for (let index = 0; index < updatedAnswerList.length; index++) {
    if (updatedAnswerList[index].answer === quizData.questions[index].correct) {
      sum++; // checking and summing the correct answers in up-to-date list
    }
    if (updatedAnswerList[index].answer === '') {
      totalUnAnswered++; // checking and summing the un answered questions in up-to-date list
      if (firstTime) {
        //to get first un answered question
        lastOne = index + 1;
        firstTime = false; //lastOne will not change till this function called again
      }
    }
  }
  let answeredQuestions = updatedAnswerList.length - totalUnAnswered;
  return [sum, answeredQuestions, lastOne];
}

// -----Use this method to access up-to-date Question records-----
// -----How to use this in your page-----
//     actually there is no need for you to use in your page. You can access all required elements with function above(sumCorrectAnswers)
// Still.. here is how:
// first: import { getQuestionRecord } from '../questionsRecord.js';
// then: const randomValue = getQuestionRecord();
// to reach specific element you should type:  randomValue[5].answer
const getQuestionRecord = () => {
  let updatedAnswerList = answerList;
  let questionRecord = JSON.parse(localStorage.getItem('questionRecord'));
  if (!questionRecord) {
    questionRecord = {
      answerList: updatedAnswerList,
    };
  }
  return questionRecord;
};

//-----Use this method to set question records-----

// -----How to use this in your page-----
// First: import { setQuestionRecord } from '../questionsRecord.js';
// Then: setQuestionRecord('c', quizData.currentQuestionIndex);

const setQuestionRecord = (answer, questionNumber) => {
  const correctAnswer = quizData.questions[questionNumber].correct;
  let updatedAnswerList = Object.values(getQuestionRecord())[0];
  if (answer === 'reset') {
    updatedAnswerList = answerList;
  } else {
    updatedAnswerList[questionNumber].answer = answer;
  }

  localStorage.setItem(
    'questionRecord',
    JSON.stringify({
      answerList: updatedAnswerList,
    })
  );
};

export { getQuestionRecord };
export { setQuestionRecord };
export { sumCorrectAnswers };
