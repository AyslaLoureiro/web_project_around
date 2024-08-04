export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup__open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    const overlay = document.querySelector(".overlay");
    overlay.addEventListener("click", () => {
      this.close();
    });
    const closeButton = this._popup.querySelector(".popup__button-close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
