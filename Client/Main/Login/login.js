import { apiLink } from "../../Share/constValue.js";

// #region Declare variable and CONST 
let isValid = true;
let isSubmited = false;
let btnLogin = document.getElementById("btnLogin");
let emailInput = document.getElementById("Email");
let passwordInput = document.getElementById("Password");
let form = document.getElementById("loginForm");
let loader = document.getElementById("loader");
const EMAIL_REGEX = new RegExp("^\\S+@\\S+\\.\\S+$");
const GET_USER_URL = apiLink.value + "users";
const NAVIGATE_SUCCESS_LOGIN = "http://127.0.0.1:5500/Client/Main/Home/HomeLayout.html";
let emailErrorMessage = document.getElementById("emailErrorMessage");
let passwordErrorMessage = document.getElementById("passwordErrorMessage");
//#endregion

btnLogin.addEventListener("click", validate);

function validate() {
  isSubmited = true;
  validateSubmitEmail();
  validateSubmitPassword();
  if (isValid ) {
     checkUsersExist();
  }

}
// #region Validate 
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
//#endregion

//#region Call API to get user from user input email and password
function checkUsersExist(emailUser, passwordUser){
    $.ajax({
      type: "get",
      url: GET_USER_URL +`/${emailInput.value}`+`/${passwordInput.value}` ,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(data){
          console.log(data)
          if (data) {
           loginSuccess(data);
           loader.removeAttribute("hidden");
           loader.style.visibility = "visible";
           form.style.visibility ="hidden";
           setTimeout(window.location.href = NAVIGATE_SUCCESS_LOGIN, 1000000)
           
        }
          else{
            alertify.error('Incorrect email or password');
        }

        },
  })};

//#endregion

//#region Login success
function loginSuccess(data){
    localStorage.setItem("CurrentUserName", data.name);
    localStorage.setItem("CurrentUserID", data.userID);
}
//#endregion