export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    // Essa função adiciona um cartão
    this._container.append(card);
  }

  addOneItem(card) {
    this._container.prepend(card);
  }

  renderer() {
    // Essa função renderiza um cartão
    this._items.forEach((item) => {
      // Esse metodo forEach está percorrendo a lista de cartões
      this._renderer(item);
    });
  }
}
