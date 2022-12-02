import { quizData } from "../data.js";
import { COUNTER_ELEMENT } from "../constants.js";

export const createCounterElement = () => {
    const element = document.createElement('div');
    element.setAttribute('id', COUNTER_ELEMENT);
    const amountOfCorrectAnswers = quizData.questions.filter(question => question.selected === question.correct).length

    element.innerHTML = String.raw `
      ${amountOfCorrectAnswers} / ${quizData.questions.length}
    `;
    return element;
};