const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, submitButton, buttonDisabledClass) => {
  if (hasInvalidInput(inputs)) {
    submitButton.disabled = true;
    submitButton.classList.add(buttonDisabledClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(buttonDisabledClass);
  }
};
// document.querySelector(".button").addEventListener("click", () => {
// document.querySelector(".overley").classList.toggle("isOpen");
// });

const showInputError = (
  form,
  input,
  errorMessage,
  { errorClass, inputErrorClass }
) => {
  const errorElementId = `#${input.id}-error`;
  const errorElement = form.querySelector(errorElementId);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (form, input, { errorClass, inputErrorClass }) => {
  const errorElementId = `#${input.id}-error`;
  const errorElement = form.querySelector(errorElementId);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (form, input, errorClasses) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, {
      errorClass: errorClasses.errorClass,
      inputErrorClass: errorClasses.inputErrorClass,
    });
  } else {
    hideInputError(form, input, {
      errorClass: errorClasses.errorClass,
      inputErrorClass: errorClasses.inputErrorClass,
    });
  }
};

const setEventListeners = (
  form,
  { input, submitButton, buttonDisabledClass, ...rest }
) => {
  const inputs = Array.from(form.querySelectorAll(input));
  const buttonSubmit = form.querySelector(submitButton);

  toggleButtonState(inputs, buttonSubmit, buttonDisabledClass);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(form, inputElement, rest);
      toggleButtonState(inputs, buttonSubmit, buttonDisabledClass);
    });
  });
};

const enableValidation = ({ form, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(form));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

const validateProfilePopup = {
  form: ".popup__form-title",
  input: ".popup__form-input",
  submitButton: ".button",
  buttonDisabledClass: "button__disabled",
  errorClass: "popup__span-error",
  inputErrorClass: "popup__form-input-invalid",
};

enableValidation(validateProfilePopup);
