/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
    const element = document.createElement('li');
    element.classList.add('quiz-answer');
    element.innerHTML = String.raw `
    ${key}: ${answerText};
  `;
    return element;
};