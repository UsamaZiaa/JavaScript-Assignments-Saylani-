//Start of Sign Up =============================================================>
function signup() {
    var emailField = document.getElementById("email").value;
    var passwordField = document.getElementById("password");
    var emailError = document.getElementById("emailError");
    emailError.innerHTML = "";
    if (!emailField || !passwordField.value) {
        return emailError.innerHTML = "Please Enter Email and Password Properly";
    }

    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('users').once('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
            var check = checkData(data)
            console.log("Check =>", check)
            addUser(check)
        })

        .catch(function (error) {
            // console.log(error)
            pushData()
        })
}

function checkData(d) {
    let emailFound = false
    var userData = d
    var emailField = document.getElementById("email").value;
    // console.log("My Data =>",userData)
    var userId = [];
    for (var key in userData) {
        // console.log(key)
        userId.push(key)
    }
    for (var i = 0; i < userId.length; i++) {
        // console.log(userData)
        // console.log(userData[userId[i]].email)
        if (userData[userId[i]].email == emailField) {
            emailFound = true
            break
        }
    }
    return emailFound
}

function addUser(c) {
    var emailField = document.getElementById("email").value;
    var passwordField = document.getElementById("password");
    var emailError = document.getElementById("emailError");
    if (c) {
        return emailError.innerHTML = "Email Already Register";
    } else {
        let database = firebase.database().ref('users');
        let key = database.push().key;
        let user = {
            email: emailField,
            password: passwordField.value,
            userId: key
        }
        database.child(key).set(user)
        document.getElementById("email").value = ""
        passwordField.value = ""
        location.replace("login.html")
    }
}

function pushData() {
    var emailField = document.getElementById("email").value;
    var passwordField = document.getElementById("password");
    let database = firebase.database().ref('users');
    let key = database.push().key;
    let user = {
        email: emailField,
        password: passwordField.value,
        userId: key
    }
    database.child(key).set(user)
    document.getElementById("email").value = ""
    passwordField.value = ""
    location.replace("login.html")
}
//End of Sign Up =============================================================>


//Start of Login =============================================================>
function login() {
    var emailField = document.getElementById("email").value;
    var passwordField = document.getElementById("password");
    var error = document.getElementById("error");
    error.innerHTML = "";
    if (!emailField || !passwordField.value) {
        return error.innerHTML = "Please Enter Email and Password Properly";
    }

    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('users').once('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
            var login = authentication(data)
            // console.log("Login",login)
            allowAccess(login)
        })

        .catch(function (error) {
            console.log(error)
        })
}

function authentication(d) {
    let login = false
    var userData = d
    var emailField = document.getElementById("email").value;
    var passwordField = document.getElementById("password").value;
    var userId = [];
    for (var key in userData) {
        userId.push(key)
    }
    for (var i = 0; i < userId.length; i++) {
        // console.log(userData[userId[i]].email)
        if (userData[userId[i]].email == emailField && userData[userId[i]].password == passwordField) {
            login = true
            localStorage.setItem("currentUser", userId[i]);
            break
        }
    }
    return login
}

function allowAccess(login) {
    if (login) {
        location.replace("loginUser/index.html")
    } else {
        return error.innerHTML = "Incorrect Email or Password";
    }
}

//End of Login =============================================================>


// Start of Add Product ===============================================>
function addProduct() {
    var logUser = localStorage.getItem("currentUser");
    var proName = document.getElementById('proName').value
    var proDes = document.getElementById('proDes').value
    var proPrice = document.getElementById('proPrice').value
    var proCateg = document.getElementById('proCateg')
    var proCity = document.getElementById('proCity')
    var img = document.getElementById('proImg').files[0];
    var productError = document.getElementById('productError')
    productError.innerHTML = ""
    if (!proName || !proDes || !proPrice || proCateg.selectedIndex === 0 || proCity.selectedIndex === 0 || !img) {
        return productError.innerHTML = "Please Fill Form Properly"
    }

    uploadImage(logUser, proName, proDes, proPrice, proCateg, proCity, img)
}

function uploadImage(logUser, proName, proDes, proPrice, proCateg, proCity, img) {
    var imageName = img.name;
    var storageRef = firebase.storage().ref('images/' + imageName);
    var uploadTask = storageRef.put(img)

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " done")
    }, function (error) {
        console.log(error.message)
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            var imgURL = downloadURL
            uploadProduct(imgURL, logUser, proName, proDes, proPrice, proCateg, proCity)
            resetValues()
        })
    })
}

function uploadProduct(imgURL, logUser, proName, proDes, proPrice, proCateg, proCity) {
    // console.log("Hello")
    let database = firebase.database().ref('posts');
    let key = database.push().key;
    let post = {
        imgURL: imgURL,
        userId: logUser,
        proName: proName,
        proDes: proDes,
        proPrice: proPrice,
        proCateg: proCateg.value,
        proCity: proCity.value,
        postId: key,        
    }
    database.child(key).set(post)
    alert("Post Created Successfully")
    // location.replace("../loginUser/my ads.html")
}

function resetValues(){
    document.getElementById('proName').value = ""
    document.getElementById('proDes').value = ""
    document.getElementById('proPrice').value = ""
    document.getElementById('proCateg').selectedIndex = 0
    document.getElementById('proCity').selectedIndex = 0
    document.getElementById('proImg') = ""   
}

// End of Add Product ===============================================>


// Start of Show Index Products ===============================================>
function showIndexProducts(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareData(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareData(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < 8; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        renderPost(price, description, location, image, pid)
    }
}

function renderPost(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show Index Data =============================================>    


// Start of Show All Categories ===============================================>

function showAllCategories(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareAllCategories(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareAllCategories(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        renderAllCategories(price, description, location, image, pid)
    }
}

function renderAllCategories(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show All Categories =============================================>    


// Start of Show Mobiles ===============================================>
function showMobiles(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareMobiles(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareMobiles(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Mobile Phones"){
            renderMobiles(price, description, location, image, pid)
        }
    }
}

function renderMobiles(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show All Categories =============================================>   

// Start of Show Cars ===============================================>
function showCars(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareCars(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareCars(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Cars"){
            renderCars(price, description, location, image, pid)
        }
    }
}

function renderCars(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show All Categories =============================================>   

// Start of Show Motorcycles ===============================================>
function showMotorcycles(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareMotorcycles(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareMotorcycles(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Motorcycles"){
            renderMotorcycles(price, description, location, image, pid)
        }
    }
}

function renderMotorcycles(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show Motorcycles =============================================>   

// Start of Show Houses ===============================================>
function showHouses(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareHouses(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareHouses(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Houses"){
            renderHouses(price, description, location, image, pid)
        }
    }
}

function renderHouses(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show Houses =============================================>   

// Start of Show TV-Video-Audio ===============================================>
function showTV(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareTV(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareTV(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "TV-Video-Audio"){
            renderTV(price, description, location, image, pid)
        }
    }
}

function renderTV(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show TV =============================================>   

// Start of Show Tablets ===============================================>
function showTablets(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareTablets(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareTablets(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Tablets"){
            renderTablets(price, description, location, image, pid)
        }
    }
}

function renderTablets(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show Tablets =============================================>   

// Start of Show Land ===============================================>
function showLand(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        prepareLand(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareLand(d) {
    var userPosts = d
    var postId = [];
    for (var key in userPosts) {
        // console.log(key)
        // postId.push(key)
        postId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < postId.length; i++) {
        var price = userPosts[postId[i]].proPrice
        var description = userPosts[postId[i]].proDes
        var location = userPosts[postId[i]].proCity
        var image = userPosts[postId[i]].imgURL
        var pid = userPosts[postId[i]].postId
        if(userPosts[postId[i]].proCateg == "Land & Plot"){
            renderLand(price, description, location, image, pid)
        }
    }
}

function renderLand(price, description, location, image, pid){
    var productContainer = document.getElementById('productContainer')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text" id="pid" style="visibility:hidden">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
            </div>
          </div>
        </div>`
        productContainer.innerHTML += product
    } 
// End of Show Land =============================================>   

// Start of My Products ===============================================>
function myProducts(){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref('posts').on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        // console.log(data)
        // alert("Hello")
        prepareProducts(data)
            // console.log("Check =>", check)
            // addUser(check)
        })

        .catch(function (error) {
            console.log(error)
            // pushData()
        })    
}

function prepareProducts(d) {
    var Products = d
    var productId = [];
    var logUser = localStorage.getItem("currentUser");
    for (var key in Products) {
        // console.log(key)
        // postId.push(key)
        productId.splice(0,0,key)
    }
    // console.log(postId)
    for (var i = 0; i < productId.length; i++) {
        // console.log(Products[productId[i]].userId == logUser)
        var price = Products[productId[i]].proPrice
        var description = Products[productId[i]].proDes
        var location = Products[productId[i]].proCity
        var image = Products[productId[i]].imgURL
        var pid = Products[productId[i]].postId
        if(Products[productId[i]].userId == logUser){
            renderProducts(price, description, location, image, pid)
        }
    }
}

function renderProducts(price, description, location, image, pid){
    var myProducts = document.getElementById('myProducts')
    var product = `<div class="col-3 my-3">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top product_image" src=${image}>
            <div class="card-body">
              <h5 class="card-title">Rs ${price}</h5>
              <small class="card-text">${pid}</small>
              <p class="card-text">${description}</p>
              <p class="card-text">${location}</p>
              <button type="button" class="btn btn-success btn-sm" onclick="editProduct(this)">Edit</button>
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteProduct(this)">Delete</button>
            </div>
          </div>
        </div>`
        myProducts.innerHTML += product
    } 
// End of My Product =============================================>   

// Start of Edit Product ===============================================>
function editProduct(e){
    var editKey = e.parentNode.childNodes[3].innerHTML
    // console.log(editKey)
    localStorage.setItem("editProduct", editKey);
    location.assign("../loginUser/edit product.html")
    // editProductData()
}

function editProductData(){
    var editKey = localStorage.getItem("editProduct");
    // console.log(editKey)
    fetchProduct(editKey)
}

function fetchProduct(e){
    let promise = new Promise(function (resolve, reject) {
        firebase.database().ref(`posts/${e}`).on('value', function (data) {
            if (data.val()) {
                resolve(data.val())
            } else {
                reject("Something went wrong")
            }
        })
    })

    promise.then(function (data) {
        fillData(data)
        })

        .catch(function (error) {
            console.log(error)
        })    
}
function fillData({imgURL,postId,proCateg,proCity,proDes,proName,proPrice}){
    // console.log(imgURL)
    var pName = document.getElementById("proName").value = proName
    var pDes = document.getElementById("proDes").value = proDes
    var pPrice = document.getElementById("proPrice").value = proPrice
    var pCateg = document.getElementById("proCateg").value = proCateg
    var pCity = document.getElementById("proCity").value = proCity
    // var pImg = document.getElementById("proImg")
    localStorage.setItem("imgURL", imgURL);
}

function onUpdate(){
    var pName = document.getElementById("proName").value
    var pDes = document.getElementById("proDes").value
    var pPrice = document.getElementById("proPrice").value
    var pCateg = document.getElementById("proCateg")
    var pCity = document.getElementById("proCity")
    var pImg = document.getElementById("proImg").files[0]
    var editKey = localStorage.getItem("editProduct");
    if (!pName || !pDes || !pPrice || pCateg.selectedIndex === 0 || pCity.selectedIndex === 0) {
        return productError.innerHTML = "Please Fill Form Properly"
    }

    if(!pImg){
        // console.log(pName, pDes, pPrice, pCateg.value, pCity.value,editKey)
        var imgURL = localStorage.getItem("imgURL")
        updateDatabase(pName, pDes, pPrice, pCateg.value, pCity.value, editKey, imgURL)
    }
    else{
        uploadImg(pImg,pName, pDes, pPrice, pCateg.value, pCity.value,editKey)        
        // console.log(pName, pDes, pPrice, pCateg.value, pCity.value, pImg.name ,editKey)
    }
    // var pImg = document.getElementById("proImg")
    // console.log(pImg.files[0].name)    
}
function uploadImg(img, pName, pDes, pPrice, pCateg, pCity, editKey) {
    var imageName = img.name;
    var storageRef = firebase.storage().ref('images/' + imageName);
    var uploadTask = storageRef.put(img)

    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " done")
    }, function (error) {
        console.log(error.message)
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            var imgURL = downloadURL
            updateDatabase(pName, pDes, pPrice, pCateg, pCity, editKey, imgURL)
            // return imgURL
        })
    })
}

function updateDatabase(pName, pDes, pPrice, pCateg, pCity, editKey, imgURL){
        var post = {
            proName: pName,
            proDes: pDes,
            proPrice: pPrice,
            proCateg: pCateg,
            proCity: pCity,
            postId: editKey,
            imgURL: imgURL,
            userId: localStorage.getItem("currentUser")
        }
        firebase.database().ref('posts').child(editKey).set(post)
        location.replace('../loginUser/my ads.html')
    }
// End of Edit Product ===============================================>

// Start of Delete Product ===============================================>
function deleteProduct(e){
    var deleteKey = e.parentNode.childNodes[3].innerHTML
    firebase.database().ref('posts').child(deleteKey).remove()
    location.reload();
    // myProducts()
    // console.log(deleteKey)
}
// End of Delete Product ===============================================>

// Start of Detail Product 

// End of Detail Product 