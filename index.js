import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";

const popup = document.querySelector(".popup");
popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popup.classList.remove("popup__open");
  }
});

const closeButton = document.querySelector(".popup__button-close");

const addCardButtonClose = document.querySelector(
  ".popup__add-card-button-close"
);

const edtButton = document.querySelector(".profile__edit-button");

const form = document.querySelector(".popup__form-title");

const formAdd = document.querySelector(".popup__add-card-form");

const nameInput = document.querySelector(".popup__form-name");

const aboutMeInput = document.querySelector(".popup__form-job");

const profileTitle = document.querySelector(".profile__title");

const profileExplorar = document.querySelector(".profile__explorar");

const likeButtons = document.querySelectorAll(".elements__heart");

const trashButtons = document.querySelectorAll(".elements__trash-button");

const popupAdd = document.querySelector(".popup-add");
popupAdd.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupAdd.classList.remove("popup__open");
  }
});

const addButton = document.querySelector(".profile__add-button");

const cardsContainer = document.querySelector(".elements");

const popupImage = document.querySelector(".popup-image");
popupImage.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupImage.classList.remove("popup__open");
  }
});

const imagePopup = document.querySelector(".popup__image-zoom");

const imageTitle = document.querySelector(".popup__image-text");

const imageCloseButton = document.querySelector(".popup__image-button-close");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => {
  const cardElement = new Card(card.name, card.link, "#cards").generateCard();
  cardsContainer.append(cardElement);
});

edtButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  aboutMeInput.value = profileExplorar.textContent;
  popup.classList.add("popup__open");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup__open");
});

imageCloseButton.addEventListener("click", () => {
  popupImage.classList.remove("popup__open");
});

addCardButtonClose.addEventListener("click", () => {
  popupAdd.classList.remove("popup__open");
});

likeButtons.forEach((buttonLike) => {
  buttonLike.addEventListener("click", (e) => {
    const likeButton = e.target;
    if (likeButton.getAttribute("src") === "images/blackheart.svg") {
      return likeButton.setAttribute("src", "images/heart.svg");
    }

    return likeButton.setAttribute("src", "images/blackheart.svg");
  });
});

addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup__open");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileExplorar.textContent = aboutMeInput.value;

  popup.classList.remove("popup__open");
  form.reset();
});

const inputTitle = document.querySelector(".popup__add-form-name");
const inputImage = document.querySelector(".popup__add-form-image");
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = inputTitle.value;
  const image = inputImage.value;

  const cardElement = new Card(title, image, "#cards").generateCard();
  cardsContainer.prepend(cardElement);
  popupAdd.classList.remove("popup__open");
  formAdd.reset();
});

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    popup.classList.remove("popup__open");
    popupAdd.classList.remove("popup__open");
    popupImage.classList.remove("popup__open");
  }
};

const formElement = document.querySelector(".popup__form-title");
const formElementAdd = document.querySelector(".popup__add-card-form");
const config = {
  form: ".popup__form-title",
  input: ".popup__form-input",
  submitButton: ".button",
  buttonDisabledClass: "button__disabled",
  errorClass: "popup__span-error",
  inputErrorClass: "popup__form-input-invalid",
};

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();
