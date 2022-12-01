import { quizData } from "../data.js";

export const createQuestionNumberElement = () => {
    const element = document.createElement('div');
    element.innerHTML = String.raw `
      Question № ${quizData.currentQuestionIndex+1};
    `;
    return element;
};