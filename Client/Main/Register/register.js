import { apiLink } from '../../Share/constValue.js';

let btnSubmit = document
  .getElementById("btnSubmit")
  .addEventListener("click", validate);
const EMAIL_REGEX = new RegExp("^\\S+@\\S+\\.\\S+$");
const USER_API_URL = apiLink.value + 'users'+'/register';
let isSubmited = false;
let isValid = true;
let emailInput = document.getElementById("Email");
let passwordInput = document.getElementById("Password");
let confirmPassowrdInput = document.getElementById("ConfirmPassword");
let nameInput = document.getElementById("Name");
let mobileInput = document.getElementById("Mobile");
let emailErrorMessage = document.getElementById("emailErrorMessage");
let passwordErrorMessage = document.getElementById("passwordErrorMessage");
let mobileErrorMessage = document.getElementById("mobileErrorMessage");
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
  validateSubmitMobile();
  console.log(isValid)
  if (isValid) {
      console.log(USER_API_URL)

    $.ajax({
        type: "post",
        url: USER_API_URL ,
        data: JSON.stringify({
            "Email": emailInput.value,
            "Password":passwordInput.value,
            "ConfirmPassword": confirmPassowrdInput.value,
            "Name": nameInput.value,
            "Mobile":  mobileInput.value
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            console.log("done")
        },
        error: function(error){
            console.log(error)
        }
    });
  }
}

function validateFormInput(
  controlInput,
  errorMessageControl,
  textErrorMessage
) {
    controlInput.classList.add("invalid");
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

function validateSubmitMobile() {
    if (mobileInput.value == "") {
      validateFormInput(
        mobileInput,
        mobileErrorMessage,
        "Mobile is required"
      );
      toggleValidateControl(true, mobileErrorMessage, mobileInput);
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
    isValid = false;
  }
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