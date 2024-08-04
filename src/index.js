// Importação de módulos (assumindo que esses módulos exportem classes)
// import "./index.css";
import Card from "./components/Cards.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWhitForm from "./components/PopupWithForm.js";
import PopupWhitImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

// Seleciona o popup e adiciona um evento para fechá-lo ao clicar na área de sobreposição
const popup = document.querySelector(".popup");
popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popup.classList.remove("popup__open");
  }
});

// Seleciona os botões de fechar dos popups
const closeButton = document.querySelector(".popup__button-close");
const addCardButtonClose = document.querySelector(
  ".popup__add-card-button-close"
);

// Seleciona o botão de editar perfil
const edtButton = document.querySelector(".profile__edit-button");

// Seleciona os elementos de texto do perfil
const profileTitle = document.querySelector(".profile__title");
const profileExplorar = document.querySelector(".profile__explorar");

// Seleciona todos os botões de curtir e de deletar cartões
const likeButtons = document.querySelectorAll(".elements__heart");

// Seleciona o popup de adicionar cartão e adiciona um evento para fechá-lo ao clicar na área de sobreposição
const popupAdd = document.querySelector(".popup-add");
popupAdd.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupAdd.classList.remove("popup__open");
  }
});

// Seleciona o botão de adicionar cartão
const addButton = document.querySelector(".profile__add-button");

// Seleciona o popup de imagem e adiciona um evento para fechá-lo ao clicar na área de sobreposição
const popupImage = document.querySelector(".popup-image");
popupImage.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupImage.classList.remove("popup__open");
  }
});

const imageCloseButton = document.querySelector(".popup__image-button-close");

// Array inicial de cartões com nome e link de imagem
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

// Cria e renderiza os cartões iniciais
initialCards.forEach((card) => {
  const cardElement = new Card(card.name, card.link, "#cards").generateCard();
  const section = new Section(
    {
      items: [cardElement],
      renderer: (cardParams) => {
        section.addItem(cardParams);
      },
    },
    ".elements"
  );
  section.renderer();
});

const handleSubmitProfileForm = ({ name, about }) => {
  profileTitle.textContent = name;
  profileExplorar.textContent = about;
};

// Cria e renderiza o popup de edição de perfil
const popupEditProfile = new PopupWhitForm(
  handleSubmitProfileForm,
  ".popup-edit-profile"
);
popupEditProfile.setEventListeners();

// Evento para abrir o popup de edição de perfil e preencher os campos com os valores atuais
edtButton.addEventListener("click", () => {
  popupEditProfile.open();
});

// Evento para fechar o popup de edição de perfil
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup__open");
});

// Evento para fechar o popup de imagem
imageCloseButton.addEventListener("click", () => {
  popupImage.classList.remove("popup__open");
});

// Evento para fechar o popup de adicionar cartão
addCardButtonClose.addEventListener("click", () => {
  popupAdd.classList.remove("popup__open");
});

// Adiciona eventos de curtir nos botões de curtir dos cartões
likeButtons.forEach((buttonLike) => {
  buttonLike.addEventListener("click", (e) => {
    const likeButton = e.target;
    if (likeButton.getAttribute("src") === "images/blackheart.svg") {
      return likeButton.setAttribute("src", "images/heart.svg");
    }
    return likeButton.setAttribute("src", "images/blackheart.svg");
  });
});

const handleAddCard = ({ title, link }) => {
  cardtitle = title;
  image = link;

  const cardElement = new Card(title, image, "#cards").generateCard();
  const section = new Section(
    {
      items: [cardElement],
      renderer: (card) => {
        section.addOneItem(card);
      },
    },
    ".elements"
  );
  section.renderer();
};
const popupAddCard = new PopupWithForm(handleAddCard, ".popup-add");

popupAddCard.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__explorar");

// Evento para abrir o popup de adicionar cartão
addButton.addEventListener("click", () => {
  popupAdd.classList.add("popup__open");
});

// Evento para fechar popups ao pressionar a tecla Escape
document.onkeydown = function (event) {
  if (event.key === "Escape") {
    popup.classList.remove("popup__open");
    popupAdd.classList.remove("popup__open");
    popupImage.classList.remove("popup__open");
  }
};

// Seleciona os formulários e configurações de validação
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

// Cria e habilita os validadores de formulário
const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorAdd = new FormValidator(config, formElementAdd);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();
