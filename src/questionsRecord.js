
// -----Use this method to access up-to-date Question records-----

// -----How to use this in your page-----
// first: import { getQuestionRecord } from '../questionsRecord.js';
// then: const randomValue = getQuestionRecord();
// to reach specific element you should type:  randomValue.currentIndex
const getQuestionRecord = () => {
  let questionRecord = JSON.parse(localStorage.getItem('questionRecord'));
  if(!questionRecord){
    questionRecord = {
      currentIndex : 0,
      totalCorrectAnswers: 0
    }
  }
  return questionRecord;
}

//-----Use this method to set question records-----

// it has 2 argument. 1 = status , 2 = currentQuestion
// status = 'reset' for resetting all correct answers as 0
// status = 'correct' for increase 1 correct answers
// status = '' for wrong answers. it does nothing
// currentQuestion = setting current Question data to Local storage

// -----How to use this in your page-----
// First: import { setQuestionRecord } from '../questionsRecord.js';
// Then: setQuestionRecord('correct', quizData.currentQuestionIndex);

const setQuestionRecord = (status, currentQuestion) => {
  let correctAnswers = Object.values(getQuestionRecord())[1];
  switch (status) {
    case 'reset':
      correctAnswers = 0;
      break;

      case 'correct':
      correctAnswers++;
      break;

    default:
      break;
  }

  localStorage.setItem('questionRecord', JSON.stringify({
      currentIndex: currentQuestion,
      totalCorrectAnswers: correctAnswers
    }))
}

export {getQuestionRecord}
export {setQuestionRecord}