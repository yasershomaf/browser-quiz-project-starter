/**
 * Create a full question element
 * @returns {Element}
 */
export const createStatusElement = (status) => {
  //Status has up-to-date question status
  const element = document.createElement('div');
  element.classList.add('status');
  //We put status information into h1 >> into element: which is div, created above
  element.innerHTML = String.raw`
    <h2>${status.totalCorrectAnswers} / ${status.currentIndex + 1}</h2> 
    <h1>${status.currentIndex + 1}</h1>
    <h2>time</h2>
  `; // +1 in the end because index start from 0

  return element;
};
