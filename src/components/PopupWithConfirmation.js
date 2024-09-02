import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteCardCallback) {
    super(popupSelector);
    this._deleteCardCallback = deleteCardCallback;
    this._confirmationButton = document.querySelector(".popup__delete-submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._deleteCardCallback(this._card, this._cardId).then(() => {
        this.close();
      });
    });
  }

  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
  }
}
