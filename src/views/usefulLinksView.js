export const createUsefulLinkElement = (link) => {
    const element = document.createElement('li');
    element.innerHTML = String.raw `
      <a href=${link.href}>${link.text}</a>
    `;

    return element;
};
