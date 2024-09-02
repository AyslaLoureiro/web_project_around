import blackHeart from "../images/blackheart.svg";
import heart from "../images/heart.svg";

export default class Card {
  constructor(
    title,
    link,
    cardTemplate,
    handleCardClick,
    cardData,
    ownerId,
    handleAddLike,
    handleRemoveLike,
    openPopupConfirmation
  ) {
    this._title = title;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._cardData = cardData;
    this._cardId = cardData._id;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this.cardElement = this._getTemplate();
    this._countLike = this.cardElement.querySelector(".elements__count-like");
    this._cardOwnerId = this._cardData.owner._id;
    this._userId = ownerId;
    this._likeButtonElement =
      this.cardElement.querySelector(".elements__heart");
    this._openPopupConfirmation = openPopupConfirmation;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplate).content;
    const cardElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this.cardElement.querySelector(".elements__image").src = this._link;
    this.cardElement.querySelector(
      ".elements__image"
    ).alt = `imagem do ${this._title}`;
    this.cardElement.querySelector(".elements__title").textContent =
      this._title;

    this._countLike.textContent = this._cardData.likes.length;

    this._cardData.likes.forEach((likeObj) => {
      if (this._userId === likeObj._id) {
        return this._likeButtonElement.setAttribute("src", blackHeart);
      } else {
        return this._likeButtonElement.setAttribute("src", heart);
      }
    });

    if (this._userId === this._cardOwnerId) {
      this.cardElement.querySelector(".elements__trash-button").style.display =
        "block";
    } else {
      this.cardElement.querySelector(".elements__trash-button").style.display =
        "none";
    }

    return this.cardElement;
  }

  _likeButton() {
    this.cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", (e) => {
        const likeButton = e.target;
        if (likeButton.getAttribute("src") === blackHeart) {
          const response = this._handleRemoveLike(this._cardId);
          response.then((card) => {
            this._countLike.textContent = card.likes.length;
          });
          return likeButton.setAttribute("src", heart);
        }
        const response = this._handleAddLike(this._cardId);
        response.then((card) => {
          this._countLike.textContent = card.likes.length;
        });
        return likeButton.setAttribute("src", blackHeart);
      });
  }

  _trashButton() {
    this.cardElement
      .querySelector(".elements__trash-button")
      .addEventListener("click", () => {
        this._openPopupConfirmation();
      });
  }

  _imageButton() {
    this.cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._title);
      });
  }

  _setEventListeners() {
    this._likeButton();
    this._trashButton();
    this._imageButton();
  }
}
