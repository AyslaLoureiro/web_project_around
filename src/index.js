// Importação de módulos (assumindo que esses módulos exportem classes)
import "./pages/index.css";
import Card from "./components/Cards.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWhitForm from "./components/PopupWithForm.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage";

// Seleciona o popup e adiciona um evento para fechá-lo ao clicar na área de sobreposição
const popup = document.querySelector(".popup");
popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popup.classList.remove("popup__open");
  }
});

// Seleciona o botão de editar perfil
const edtButton = document.querySelector(".profile__edit-button");

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

const popupWithImage = new PopupWithImage(".popup-image");
const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

popupWithImage.setEventListeners();

// Cria e renderiza os cartões iniciais
initialCards.forEach((card) => {
  const cardElement = new Card(
    card.name,
    card.link,
    "#cards",
    handleCardClick
  ).generateCard();
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

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__explorar",
});
const handleSubmitProfileForm = ({ name, about }) => {
  userInfo.setUserInfo({ name, job: about });
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

const handleAddCard = ({ title, link }) => {
  const cardElement = new Card(
    title,
    link,
    "#cards",
    handleCardClick
  ).generateCard();
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
