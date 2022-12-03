import { TIME_ID } from '../constants.js';
export const createTimerElement = () => {
  const element = document.createElement('div');
  element.setAttribute('id', TIME_ID);
  return element;
};
