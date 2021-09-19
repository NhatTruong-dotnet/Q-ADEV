import { apiLink } from "../../Share/constValue.js";
//#region Declare variable and CONST
let btnSubmit = document
  .getElementById("btnSubmit")
  .addEventListener("click", validate);
const USER_API_URL = apiLink.value + "users";
let isSubmited = false;
let isValid = true;
let currentPasswordInput = document.getElementById("CurrentPassword");
let newPasswordInput = document.getElementById("NewPassword");
let confirmPassowrdInput = document.getElementById("ConfirmPassword");
let currentPasswordErrorMessage = document.getElementById(
  "currentPasswordErrorMessage"
);
let newPasswordErrorMessage = document.getElementById(
  "newPasswordErrorMessage"
);

let confirmPasswordErrorMessage = document.getElementById(
  "confirmPasswordErrorMessage"
);
//#endregion

function validate() {
  isSubmited = true;
  //#region call Validate
  validateCurrentPassword();
  validateNewPassword();
  validateSubmitConfirmPassword();
  //#endregion

  //#region If Validate passed
  if (isValid) {
    getUsersInfo();
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

function validateNewPassword() {
  if (newPasswordInput.value == "") {
    validateFormInput(
      newPasswordInput,
      newPasswordErrorMessage,
      "New Password is required"
    );
    toggleValidateControl(true, newPasswordErrorMessage, newPasswordInput);
    isValid = false;
  }
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

function validateCurrentPassword() {
  if (currentPasswordInput.value == "") {
    validateFormInput(
      currentPasswordInput,
      currentPasswordErrorMessage,
      "Password is required"
    );
    toggleValidateControl(
      true,
      currentPasswordErrorMessage,
      currentPasswordInput
    );
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
  } else if (confirmPassowrdInput.value != newPasswordInput.value) {
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

confirmPassowrdInput.addEventListener("change", () => {
  if (confirmPassowrdInput.value != newPasswordInput.value) {
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
currentPasswordInput.addEventListener("change", () => {
  if (isSubmited && currentPasswordInput.value != "") {
    toggleValidateControl(
      false,
      currentPasswordErrorMessage,
      currentPasswordInput
    );
    isValid = true;
  } else if (isSubmited && currentPasswordInput.value == "") {
    validateFormInput(
      currentPasswordInput,
      currentPasswordErrorMessage,
      "Password is required"
    );
    toggleValidateControl(
      true,
      currentPasswordErrorMessage,
      currentPasswordInput
    );
    isValid = false;
  }
});
newPasswordInput.addEventListener("change", () => {
  if (isSubmited && newPasswordInput.value != "") {
    toggleValidateControl(false, newPasswordErrorMessage, newPasswordInput);
    isValid = true;
  } else if (isSubmited && newPasswordInput.value == "") {
    validateFormInput(
      newPasswordInput,
      newPasswordErrorMessage,
      "New Password is required"
    );
    toggleValidateControl(true, newPasswordErrorMessage, newPasswordInput);
    isValid = false;
  }
});
//#endregion

//#region Validate new user register
function getUsersInfo() {
  $.ajax({
    type: "get",
    url: USER_API_URL + `/${localStorage.getItem("CurrentUserID")}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
           isUserExists(data.email, currentPasswordInput.value);
    },
  });
}
function isUserExists(email, password) {
  $.ajax({
    type: "get",
    url: USER_API_URL + `/${email}` + `/${password}`,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      if (data && currentPasswordInput.value != newPasswordInput.value) {
          $.ajax({
            type: "post",
            url: USER_API_URL + `/update/${newPasswordInput.value}` +`/${email}`,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
               alertify.success("Update password success")
            },
            error: function (error) {
               alertify.success("Update password success")
            },
          });
      } else if (currentPasswordInput.value == newPasswordInput.value) {
        alertify.error("New password should not same current password");
      }
      else{
        alertify.error("Your current password not correct");
      }
    }
  });
}
//#endregion
