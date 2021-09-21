let currentEnvURL = "http://127.0.0.1:5500/Client/Main/"

const NAVIGATE_LOGOUT = currentEnvURL + "Home/HomeLayout.html";
const NAVIGATE_CHANGEPROFILE = currentEnvURL + "ChangeProfile/ChangeProfile.html";
const NAVIGATE_CHANGEPASSWORD = currentEnvURL + "ChangePassword/ChangePassword.html";
function isUserExists() {
    let currentUserLogin = localStorage.getItem("CurrentUserName");
    let container = $("#collapsibleNavBar .navbar-nav");
   
    if (currentUserLogin == null) {
        $(container).append(
            '<li class="nav-item"><a class="nav-link" href="../Login/Login.html">Login</a></li><li class="nav-item"><a class="nav-link" href="../Register/Register.html ">Register</a></li>'
        );
    } else {
        $(container).append(
            '<li class="nav-item">' +
                '<a class="nav-link" href="../Categories/Categories.html">Categories</a>' +
            "</li>" +
            '<li class="nav-item">' +
                '<a class="nav-link" href="../Questions/QuestionsIndex.html">Questions</a>' +
            " </li>" +
            '<li class="nav-item dropdown">' +
                '<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">' +
                    '<img src="../../Images/user.png " width="20px" />' +
                    localStorage.getItem("CurrentUserName") +
                "</a>" +
                '<div class="dropdown-menu bg-info">' +
                    '<a class="dropdown-item" onclick="logout()">Logout</a>' +
                    '<a class="dropdown-item"  onclick="changeProfile()">Change Profile</a>' +
                    '<a class="dropdown-item"  onclick="changePassword()">Change Password</a>' +
                "</div>" +
            "</li>"
        );
    }
}
$(document).ready(function () {
    isUserExists();
});
function logout(){
    localStorage.removeItem("CurrentUserName");
    localStorage.removeItem("CurrentUserID");
    window.location.href = NAVIGATE_LOGOUT;
}

function changeProfile(){
    
    window.location.href = NAVIGATE_CHANGEPROFILE;
}

function changePassword(){
   
    window.location.href = NAVIGATE_CHANGEPASSWORD;
}