import { apiLink } from "../../Share/constValue.js";
//#region Declare variable and CONST
let btnSubmit = document
  .getElementById("btnSubmit")
  .addEventListener("click", validate);
const NAVIGATE_HOME = currentEnvURL + "Home/HomeLayout.html";
const USER_UPDATE_URL = apiLink.value + "users" + "/update";
const USER_API_URL = apiLink.value + "users/" ;
const MOBILE_REGEX = new RegExp("^([0-9]){10}");
let userExist = [];
let isSubmited = false;
let isValid = true;
let emailInput = document.getElementById("Email");
let nameInput = document.getElementById("Name");
let mobileInput = document.getElementById("Mobile");
let mobileErrorMessage = document.getElementById("mobileErrorMessage");
let nameErrorMessage = document.getElementById("nameErrorMessage");
//#endregion

function validate() {
  isSubmited = true;
  //#region call Validate
  validateSubmitName();

  validateSubmitMobile();
  //#endregion

  //#region If Validate passed
  if (isValid) {
    $.ajax({
      type: "post",
      url: USER_UPDATE_URL +`/${emailInput.value}`+`/${nameInput.value}`+`/${mobileInput.value}`,
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    }).done(
        alertify.success("Update profile success"),
        localStorage.removeItem("CurrentUserName"),
        localStorage.setItem("CurrentUserName", nameInput.value),
        //setTimeout( window.location.href = NAVIGATE_HOME,20000000)
    );
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

function validateSubmitName() {
  if (nameInput.value == "") {
    validateFormInput(nameInput, nameErrorMessage, "Name is required");
    toggleValidateControl(true, nameErrorMessage, nameInput);
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

function bindValue(){
    $.ajax({
        type: "get",
        url: USER_API_URL + localStorage.getItem("CurrentUserID") ,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            emailInput.value = data.email
            nameInput.value = data.name
            mobileInput.value = data.mobile
        }
    })
}
bindValue()
