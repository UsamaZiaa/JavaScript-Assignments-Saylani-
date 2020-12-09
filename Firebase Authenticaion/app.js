function signin(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    // console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(success){
        location.replace("login.html")
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
}

function signOut(){
    firebase.auth().signOut().then(function() {
          location.replace("index.html")  
      }).catch(function(error) {
          console.log(error.message)
      });
}

function checkUser(){
    console.log("Login")
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.email)
        } else {
            location.replace("index.html")
        }
      });
}