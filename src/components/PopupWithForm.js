import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitFormCallback, popupSelector) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__form-title");
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll(".popup__form-input");

    const values = {};

    inputs.forEach((input) => (values[input.name] = input.value));

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = this._getInputValues();
      this._submitFormCallback(values);
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
