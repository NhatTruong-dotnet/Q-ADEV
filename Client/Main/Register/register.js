let btnSubmit = document
  .getElementById("btnSubmit")
  .addEventListener("click", validate);
const EMAIL_REGEX = new RegExp("^\\S+@\\S+\\.\\S+$");
let isSubmited = false;
let isValid = true;
let emailInput = document.getElementById("Email");
let passwordInput = document.getElementById("Password");
let confirmPassowrdInput = document.getElementById("ConfirmPassword");
let nameInput = document.getElementById("Name");
let emailErrorMessage = document.getElementById("emailErrorMessage");
let passwordErrorMessage = document.getElementById("passwordErrorMessage");
let confirmPasswordErrorMessage = document.getElementById(
  "confirmPasswordErrorMessage"
);
let nameErrorMessage = document.getElementById("nameErrorMessage");

function validate() {
  isSubmited = true;
  validateSubmitEmail();
  validateSubmitPassword();
  validateSubmitName();
  validateSubmitConfirmPassword();
  if (isValid) {
    console.log("submit");
  }
}

function validateFormInput(
  controlInput,
  errorMessageControl,
  textErrorMessage
) {
  errorMessageControl.classList.add("invalid");
  errorMessageControl.classList.remove("text-muted");
  errorMessageControl.innerText = textErrorMessage;
}

function toggleValidateControl(valueToggle, controlErrorMessage, controlInput) {
  if (valueToggle) {
    controlInput.classList.add("invalid");
    controlErrorMessage.removeAttribute("hidden");
    controlErrorMessage.style.visibility = "visible";
  } else {
    controlInput.classList.remove("invalid");
    controlErrorMessage.removeAttribute("visible");
    controlErrorMessage.style.visibility = "hidden";
  }
}

function validateSubmitEmail() {
  if (emailInput.value == "") {
    validateFormInput(emailInput, emailErrorMessage, "Email is required");
    toggleValidateControl(true, emailErrorMessage, emailInput);
    isValid = false;
  } else if (!EMAIL_REGEX.test(emailInput.value)) {
    validateFormInput(emailInput, emailErrorMessage, "Email is invalid");
    toggleValidateControl(true, emailErrorMessage, emailInput);
    isValid = false;
  }
}

function validateSubmitName() {
  if (nameInput.value == "") {
    validateFormInput(nameInput, nameErrorMessage, "Name is required");
    toggleValidateControl(true, nameErrorMessage, nameInput);
    isValid = false;
  }
}

function validateSubmitPassword() {
  if (passwordInput.value == "") {
    validateFormInput(
      passwordInput,
      passwordErrorMessage,
      "Password is required"
    );
    toggleValidateControl(true, passwordErrorMessage, passwordInput);
    isValid = false;
  }
}

function validateSubmitConfirmPassword() {
  if (confirmPassowrdInput.value == "") {
    validateFormInput(
      confirmPassowrdInput,
      confirmPasswordErrorMessage,
      "Confirm Password is required"
    );
    toggleValidateControl(
      true,
      confirmPasswordErrorMessage,
      confirmPassowrdInput
    );
    isValid = false;
  } else if (confirmPassowrdInput.value != passwordInput.value) {
    validateFormInput(
      confirmPassowrdInput,
      confirmPasswordErrorMessage,
      "Confirm Password is not match"
    );
    toggleValidateControl(
      true,
      confirmPasswordErrorMessage,
      confirmPassowrdInput
    );
    isValid = false;
  }
}

passwordInput.addEventListener("change", () => {
  if (isSubmited && passwordInput.value != "") {
    toggleValidateControl(false, passwordErrorMessage, passwordInput);
    isValid = true;
  } else if (isSubmited && passwordInput.value == "") {
    validateFormInput(
      passwordInput,
      passwordErrorMessage,
      "Password is required"
    );
    toggleValidateControl(true, passwordErrorMessage, passwordInput);
  }
  isValid = false;
});

confirmPassowrdInput.addEventListener("change", () => {
  if (confirmPassowrdInput.value != passwordInput.value) {
    validateFormInput(
      confirmPassowrdInput,
      confirmPasswordErrorMessage,
      "Confirm Password is not match"
    );
    toggleValidateControl(
      true,
      confirmPasswordErrorMessage,
      confirmPassowrdInput
    );
    isValid = false;
  } else if (isSubmited && confirmPassowrdInput.value != "") {
    toggleValidateControl(
      false,
      confirmPasswordErrorMessage,
      confirmPassowrdInput
    );
    isValid = true;
  } 
});

nameInput.addEventListener("change", () => {
  if (isSubmited && nameInput.value != "") {
    toggleValidateControl(false, nameErrorMessage, nameInput);
    isValid = true;
  } else if (isSubmited && nameInput.value == "") {
    toggleValidateControl(true, nameErrorMessage, nameInput);
    validateFormInput(nameInput, nameErrorMessage, "Name is required");
    isValid = false;
  }
});

emailInput.addEventListener("change", () => {
  if (isSubmited && emailInput.value == "") {
    validateFormInput(emailInput, emailErrorMessage, "Email is required");
    toggleValidateControl(true, emailErrorMessage, emailInput);
    isValid = false;
  } else if (isSubmited && !EMAIL_REGEX.test(emailInput.value)) {
    validateFormInput(emailInput, emailErrorMessage, "Email is invalid");
    toggleValidateControl(true, emailErrorMessage, emailInput);
    isValid = false;
  } else if (isSubmited && emailInput.value != "") {
    emailInput.classList.remove("invalid");
    emailErrorMessage.classList.add("text-muted");
    emailErrorMessage.innerText =
      "We'll never share your email with anyone else.";
    isValid = true;
  }
});
