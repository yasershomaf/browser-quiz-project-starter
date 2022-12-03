export const createUsefulLinkElement = (link) => {
  const element = document.createElement('li');
  element.innerHTML = String.raw`
      <a href=${link.href}>${link.text}</a>
    `;
  console.log(element);
  return element;
};
