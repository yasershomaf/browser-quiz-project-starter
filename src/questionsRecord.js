import { quizData } from './data.js';

let answerList = [];
for (let index = 0; index < quizData.questions.length; index++) {
  answerList.push({ questionNumber: index + 1, answer: '' });
}

function sumCorrectAnswers() {
  let updatedAnswerList = Object.values(getQuestionRecord())[0];
  let sum = 0;
  let lastOne = 0;
  let firstTime = true;
  let totalUnAnswered = 0;

  for (let index = 0; index < updatedAnswerList.length; index++) {
    if (updatedAnswerList[index].answer === quizData.questions[index].correct) {
      sum++;
    }
    if (updatedAnswerList[index].answer === '') {
      totalUnAnswered++;
      if (firstTime) {
        lastOne = index + 1;
        firstTime = false;
      }
    }
  }
  return [sum, updatedAnswerList.length - totalUnAnswered, lastOne];
}

// -----Use this method to access up-to-date Question records-----

// -----How to use this in your page-----
// first: import { getQuestionRecord } from '../questionsRecord.js';
// then: const randomValue = getQuestionRecord();
// to reach specific element you should type:  randomValue.currentIndex
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

// it has 2 argument. 1 = status , 2 = currentQuestion
// status = 'reset' for resetting all correct answers as 0
// status = 'correct' for increase 1 correct answers
// status = '' for wrong answers. it does nothing
// currentQuestion = setting current Question data to Local storage

// -----How to use this in your page-----
// First: import { setQuestionRecord } from '../questionsRecord.js';
// Then: setQuestionRecord('correct', quizData.currentQuestionIndex);

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
