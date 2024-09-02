// Importação de módulos (assumindo que esses módulos exportem classes)
import "./pages/index.css";
import Card from "./components/Cards.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage";
import Api from "./components/Api.js";
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: "7c4842cf-8417-4f42-a788-66302b6ea108",
    "Content-Type": "application/json",
  },
});

// Seleciona os formulários e configurações de validação
const formElement = document.querySelector(".popup__form-title");
const formElementAdd = document.querySelector(".popup__add-card-form");
const formElementAvatar = document.querySelector(".popup__form-photo-edit");
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
const formValidatorAvatar = new FormValidator(config, formElementAvatar);
formValidatorProfile.enableValidation();
formValidatorAdd.enableValidation();
formValidatorAvatar.enableValidation();

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

const editAvatar = document.querySelector(".profile__edit-icon");
const popupAvatar = document.querySelector(".popup-avatar-edit");
popupAvatar.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupAvatar.classList.remove("popup__open");
  }
});
const popupConfirmation = new PopupWithConfirmation(
  ".popup-delete",
  (card, cardId) => {
    return api.deleteCard(cardId).then(() => {
      card.remove();
    });
  }
);
popupConfirmation.setEventListeners();

const initialCards = api.getInitialCards();

const popupWithImage = new PopupWithImage(".popup-image");
const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

popupWithImage.setEventListeners();

const renderNewCard = (card) => {
  const cardElement = new Card(
    card.name,
    card.link,
    "#cards",
    handleCardClick,
    card,
    userData._id,
    api.addLike.bind(api),
    api.removeLike.bind(api),
    () => {
      popupConfirmation.open(cardElement, card._id);
    }
  ).generateCard();

  return cardElement;
};

initialCards.then((cards) => {
  const section = new Section(
    {
      items: cards,
      renderer: (cardParams) => {
        section.addItem(renderNewCard(cardParams));
      },
    },
    ".elements"
  );
  section.renderer();
});

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__explorar",
  userAvatar: ".profile__image",
});

let userData = {};

api.getUserInfo().then((userInformation) => {
  userData = userInformation;
  userInfo.setUserInfo({
    name: userInformation.name,
    job: userInformation.about,
    avatar: userInformation.avatar,
  });
});

const handleSubmitProfileForm = ({ name, about }, buttonSubmit) => {
  buttonSubmit.textContent = "Salvando...";
  api.editUserInfo({ name, about }).then(() => {
    buttonSubmit.textContent = "Salvar";
    formValidatorProfile.enableValidation();
  });
  userInfo.setUserInfo({ name, job: about, avatar: userData.avatar });
};

// Cria e renderiza o popup de edição de perfil
const popupEditProfile = new PopupWithForm(
  handleSubmitProfileForm,
  ".popup-edit-profile"
);
popupEditProfile.setEventListeners();

// Evento para abrir o popup de edição de perfil e preencher os campos com os valores atuais
edtButton.addEventListener("click", () => {
  popupEditProfile.open();
});

const handleSubmitAvatarForm = ({ avatar }, buttonSubmit) => {
  buttonSubmit.textContent = "Salvando...";
  api.editUserPhoto({ avatar }).then(() => {
    buttonSubmit.textContent = "Salvar";
    formValidatorAvatar.enableValidation();
  });
  userInfo.setUserInfo({ name: userData.name, job: userData.about, avatar });
};

const popupEditAvatar = new PopupWithForm(
  handleSubmitAvatarForm,
  ".popup-avatar-edit"
);
popupEditAvatar.setEventListeners();

editAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

const handleAddCard = ({ title, link }, buttonSubmit) => {
  buttonSubmit.textContent = "Criando...";
  api.addNewCard({ name: title, link }).then((card) => {
    const cardElement = new Card(
      title,
      link,
      "#cards",
      handleCardClick,
      card,
      userData._id,
      api.addLike.bind(api),
      api.removeLike.bind(api),
      () => {
        popupConfirmation.open(cardElement, card._id);
      }
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

    buttonSubmit.textContent = "Criar";
    formValidatorAdd.enableValidation();
  });
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
