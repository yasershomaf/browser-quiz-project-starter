/**
 * Create a full question element
 * @returns {Element}
 */
export const createStatusElement = (currentQuestion, sumCorrect) => {
  const element = document.createElement('div');
  element.classList.add('status');
  //We will put status information(currentQuestion, sumCorrect)>> into element: which is div, created above
  //sumCorrect has 3 value:  [sum, totalAnsweredQuestions, lastOne]
  element.innerHTML = String.raw`
    <h2>${sumCorrect[0]} / ${sumCorrect[1]}</h2> 
    <h1>${currentQuestion + 1}</h1>
    <h2>time</h2>
  `; // +1 in the end of -currentQuestion-: because index start from 0

  return element;
};
