import { START_QUIZ_BUTTON_ID } from '../constants.js';

export const createResults = ( )=> {
    const element = document.createElement('div');
    element.innerHTML = String.raw`
    <h1>You are finished</h1>
    <button id="${START_QUIZ_BUTTON_ID}">Restart The Quiz</button>
    
    `
    return element

}