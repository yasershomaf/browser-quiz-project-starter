
//Use this method to access recent Question records
const getQuestionRecord = () => {
  let questionRecord = JSON.parse(localStorage.getItem('questionRecord'));
  if (!questionRecord) {
    questionRecord = {
      currentIndex: 0,
      totalCorrectAnswers: 0
    }
    
  }
  return questionRecord
}

//Use this method to set question records
const setQuestionRecord = (questionRecord) => {
  localStorage.setItem('questionRecord', JSON.stringify(questionRecord))
}

export {getQuestionRecord}
export {setQuestionRecord}