var table = document.getElementById("table");

firebase.database().ref('todos').on('child_added', function (data) {
    var tasktd = document.createElement("td")
    var edittd = document.createElement("td")
    var deltd = document.createElement("td")
    var editBtn = document.createElement("button")
    var delBtn = document.createElement("button")

    tasktd.setAttribute("class", "firstTd")
    edittd.setAttribute("class", "secondTd")
    deltd.setAttribute("class", "thirdTd")

    var taskText = document.createTextNode(data.val().value)
    var editText = document.createTextNode("Edit")
    var delText = document.createTextNode("Delete")

    editBtn.appendChild(editText)
    delBtn.appendChild(delText)

    editBtn.setAttribute("class", "editBtn")
    editBtn.setAttribute("id",data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")
    delBtn.setAttribute("class", "delBtn")
    delBtn.setAttribute("id",data.val().key)
    delBtn.setAttribute("onclick", "delItem(this)")

    tasktd.appendChild(taskText)
    edittd.appendChild(editBtn)
    deltd.appendChild(delBtn)

    var row = document.createElement("tr")
    row.appendChild(tasktd)
    row.appendChild(edittd)
    row.appendChild(deltd)

    table.appendChild(row)
})

function addItem() {
    var todo_item = document.getElementById("item")
    if (todo_item.value.replace(/\s/g, "") == "") {
        alert("Please enter your task to Add")
    } else {
        var database = firebase.database().ref('todos');
        var key = database.push().key;
        var todo = {
            value: todo_item.value,
            key: key
        }
        database.child(key).set(todo)
    }
    todo_item.value = ""
}

function deleteAll() {
    firebase.database().ref('todos').remove()
    table.innerHTML = ""
}

function editItem(e) {
    var val = e.parentNode.parentNode.firstChild.innerText;
    var newVal = prompt("Enter new value", val)
    var editTodo = {
        value: newVal,
        key: e.id
    }
    if (newVal.replace(/\s/g, "") == "") {
        alert("Empty Input, Changes not saved")
    } else {
        firebase.database().ref('todos').child(e.id).set(editTodo)
        e.parentNode.parentNode.firstChild.innerText = newVal
    }
}

function delItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.parentNode.remove()
}