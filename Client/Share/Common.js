
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
                '<a class="nav-link" href="/home/contact">Categories</a>' +
            "</li>" +
            '<li class="nav-item">' +
                '<a class="nav-link" href="../Main/Questions/QuestionsIndex.html">Questions</a>' +
            " </li>" +
            '<li class="nav-item dropdown">' +
                '<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">' +
                    '<img src="./../Images/user.png" width="20px" />' +
                    localStorage.getItem("CurrentUserName") +
                "</a>" +
                '<div class="dropdown-menu bg-info">' +
                    '<a class="dropdown-item" href="/account/logout">Logout</a>' +
                    '<a class="dropdown-item" href="/account/changeprofile">Change Profile</a>' +
                    '<a class="dropdown-item" href="/account/changepassword">Change Password</a>' +
                "</div>" +
            "</li>"
        );
    }
}
$(document).ready(function () {
    isUserExists();
});
