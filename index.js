const popup = document.querySelector(".popup");

const closeButton = document.querySelector(".popup__button-close");

const edtButton = document.querySelector(".profile__edit-button");

const form = document.querySelector(".popup__form");

const nameInput = document.querySelector("#name");

const aboutMeInput = document.querySelector("#aboutme");

const profileTitle = document.querySelector(".profile__title");

const profileExplorar = document.querySelector(".profile__explorar");

const likeButtons = document.querySelectorAll(".elements__heart");

edtButton.addEventListener("click", () => {
  popup.classList.add("popup__open");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup__open");
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

form.addEventListener("submit", (e) => {
  // primeiro precisamos pegar os valores digitados nos inputs de name e about me
  // agora eu preciso adicionar esses valores no profile title e no profile explorar
  // por fim eu preciso fechar o popup
  // resetar vaçores do form
  e.preventDefault();

  const name = nameInput.value;
  const aboutMe = aboutMeInput.value;

  console.log("asdasd", nameInput.value, aboutMeInput.value);

  profileTitle.textContent = name;
  profileExplorar.textContent = aboutMe;

  popup.classList.remove("popup__open");
  form.reset();
});
