import { quizData } from "../data.js";
import { COUNTER_ELEMENT } from "../constants.js";

export const createCounterElement = () => {
    const element = document.createElement('div');
    element.setAttribute('id', COUNTER_ELEMENT);
    const amountOfCorrectAnswers = quizData.questions.reduce((sum, question) => {
        if ('abcd'.includes(question.selected)) return ++sum;
        else return sum;
    }, 0);

    element.innerHTML = String.raw `
      ${amountOfCorrectAnswers} / ${quizData.questions.length};
    `;
    return element;
};