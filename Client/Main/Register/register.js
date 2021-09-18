import { apiLink } from "../../Share/constValue.js";
//#region Declare variable and CONST
let btnSubmit = document
  .getElementById("btnSubmit")
  .addEventListener("click", validate);
const EMAIL_REGEX = new RegExp("^\\S+@\\S+\\.\\S+$");
const USER_REGISTER_URL = apiLink.value + "users" + "/register";
const USER_API_URL = apiLink.value + "users" ;
const MOBILE_REGEX = new RegExp("^([0-9]){10}");
let userExist = [];
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
//#endregion

function validate() {
  isSubmited = true;
  //#region call Validate
  validateSubmitEmail();
  validateSubmitPassword();
  validateSubmitName();
  validateSubmitConfirmPassword();
  validateSubmitMobile();
  //#endregion

  //#region If Validate passed
  if (isValid) {
    console.log(USER_API_URL);

    $.ajax({
      type: "post",
      url: USER_REGISTER_URL,
      data: JSON.stringify({
        Email: emailInput.value,
        Password: passwordInput.value,
        ConfirmPassword: confirmPassowrdInput.value,
        Name: nameInput.value,
        Mobile: mobileInput.value,
      }),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        console.log("done");
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  //#endregion
}
//#region Validate
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
  else if(checkUserExist(emailInput.value)){
    validateFormInput(emailInput, emailErrorMessage, "Email is exist");
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
    validateFormInput(mobileInput, mobileErrorMessage, "Mobile is required");
    toggleValidateControl(true, mobileErrorMessage, mobileInput);
    isValid = false;
  } else if (!MOBILE_REGEX.test(mobileInput.value)) {
    validateFormInput(
      mobileInput,
      mobileErrorMessage,
      "Mobile is invalid must 10 number "
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

mobileInput.addEventListener("change", () => {
  if (!MOBILE_REGEX.test(mobileInput.value)) {
    validateFormInput(
      mobileInput,
      mobileErrorMessage,
      "Mobile is invalid must 10 number "
    );
    toggleValidateControl(true, mobileErrorMessage, mobileInput);
    isValid = false;
  } else if (isSubmited && mobileInput.value != "") {
    toggleValidateControl(false, mobileErrorMessage, mobileInput);
    isValid = true;
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
  } 
  else if(checkUserExist(emailInput.value)){
    validateFormInput(emailInput, emailErrorMessage, "Email is exist");
    toggleValidateControl(true, emailErrorMessage, emailInput);
    isValid = false;
  }else if (isSubmited && emailInput.value != "") {
    emailInput.classList.remove("invalid");
    emailErrorMessage.classList.add("text-muted");
    emailErrorMessage.innerText =
      "We'll never share your email with anyone else.";
    isValid = true;
  }
});
//#endregion

//#region Validate new user register
function getUsersExist(){
  $.ajax({
    type: "get",
    url: USER_API_URL ,
    data: "data",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(data){
        pushUsersIntoMemory(data);
    }
})};
function pushUsersIntoMemory(data){
  for (let index = 0; index < data.length; index++) {
    userExist.push( data[index].email);
  }
}
function checkUserExist(email) {
  for (let index = 0; index < userExist.length; index++) {
    if (userExist[index] == email) {
      return true;
    }
  }
  return false;
}
//#endregion

getUsersExist();