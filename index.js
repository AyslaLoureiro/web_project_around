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

const popupAdd = document.querySelector(".popup_add");
popupAdd.addEventListener("click", (event) => {
  if (event.target.classList.contains("overlay")) {
    popupAdd.classList.remove("popup__open");
  }
});

const addButton = document.querySelector(".profile__add-button");

const cardsContainer = document.querySelector(".elements");

const popupImage = document.querySelector(".popup_image");
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
  const cardElement = addCard({ image: card.link, title: card.name });
  cardsContainer.append(cardElement);
});

function addCard({ image, title }) {
  const cardsTemplate = document.querySelector("#cards").content;
  const cardElement = cardsTemplate
    .querySelector(".elements__item")
    .cloneNode(true);

  cardElement.querySelector(".elements__image").src = image;
  cardElement.querySelector(".elements__image").alt = `imagem do ${title}`;
  cardElement.querySelector(".elements__title").textContent = title;

  cardElement
    .querySelector(".elements__heart")
    .addEventListener("click", (e) => {
      const likeButton = e.target;
      if (likeButton.getAttribute("src") === "images/blackheart.svg") {
        return likeButton.setAttribute("src", "images/heart.svg");
      }

      return likeButton.setAttribute("src", "images/blackheart.svg");
    });

  // faça isso aparecer na página
  // cardsContainer.append(cardElement);
  cardElement
    .querySelector(".elements__trash-button")
    .addEventListener("click", (e) => {
      const card = e.target.closest(".elements__item");

      card.remove();
    });

  cardElement
    .querySelector(".elements__image")
    .addEventListener("click", (e) => {
      imagePopup.src = image;
      imageTitle.textContent = title;
      popupImage.classList.add("popup__open");
    });

  return cardElement;
}

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
  // primeiro precisamos pegar os valores digitados nos inputs de name e about me
  // agora eu preciso adicionar esses valores no profile title e no profile explorar
  // por fim eu preciso fechar o popup
  // resetar vaçores do form
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
  // quando o form for enviado eu preciso pegar o valor que os usuarios colocou nos inputs
  // chamr a função add card passando os valores que o usuario colocou no input
  // receber oretorno da função addcard em uma variavel
  // adicionar essa variavel a cessao de cards com o metodo prepend

  const cardElement = addCard({ image, title });
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
