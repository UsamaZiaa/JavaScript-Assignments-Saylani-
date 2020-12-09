// Getting elements from html file ========================>
var email = document.getElementById("email");
var password = document.getElementById("password");
var error = document.getElementById("error");
var success = document.getElementById("success");

// Sign up Functionality ===============================>
function onSingup() {
    error.innerHTML = "";
    success.innerHTML = "";

    if (!email.value || !password.value) {
        return error.innerHTML = "Please Enter Email and Password Properly";
    }

    var getUsersFromStorage = localStorage.getItem("users");
    var users = JSON.parse(getUsersFromStorage)
    if (!users) {
        users = []
    }
    // set a flag
    var isEmailExist = false;
    for (let i = 0; i < users.length; i++) {
        var user = users[i];
        // checking email exist or not
        if (user.email === email.value) {
            // email exist
            isEmailExist = true;
            break;
        }
    }
    if (isEmailExist) {
        error.innerHTML = email.value + " Already exist";
    } else {
        users.push({
            email: email.value,
            password: password.value,
        });
        localStorage.setItem("users", JSON.stringify(users));
        success.innerHTML = "Account create successfully";
    }
    email.value = ""
    password.value = ""
}

// Login Functionality ===============================
function onSignin() {
    error.innerHTML = "";
    success.innerHTML = "";
    var getUsersFromStorage = localStorage.getItem("users");
    var users = JSON.parse(getUsersFromStorage)
    //set a flag
    var userLogin = false;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == email.value && users[i].password == password.value) {
            //Checking User Login
            userLogin = true;
        }
    }
    if (userLogin === true) {
        success.innerHTML = "User Login Successfully";
    } else {
        error.innerHTML = "Incorrect Email Or Password";
    }
    email.value = ""
    password.value = ""
}

// Forget Password Functionality
function forgetPassword() {
    error.innerHTML = "";
    success.innerHTML = "";

    if (!email.value) {
        return;
    }

    var getUsersFromStorage = localStorage.getItem("users");
    var users = JSON.parse(getUsersFromStorage)
    //set a flag
    var emailFound = false
    var userIndex;
    for (i = 0; i < users.length; i++) {
        if (users[i].email == email.value) {
            //Checking email and save current index in variable "userIndex"
            emailFound = true
            userIndex = i
            break
        }
    }
    if (emailFound === true) {
        var newPassword = prompt("Enter New Password")
        //Changing Element Locally 
        users[userIndex].password = newPassword
        //Set updated values in Local Storage
        localStorage.setItem("users", JSON.stringify(users));
        success.innerHTML = "Password Updated";
    } else {
        error.innerHTML = "Email Not Found";
    }
}