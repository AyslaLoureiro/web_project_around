import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image-zoom");
    this._captionElement = this._popup.querySelector(".popup__image-text");
  }

  open(imageSrc, imageText) {
    super.open();
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageText;
    this._captionElement.textContent = imageText;
  }
}
