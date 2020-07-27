var table = document.getElementById("table");

function addItem(){
    var todo_item = document.getElementById("item")

    if(todo_item.value.replace(/\s/g,"") == ""){
        alert("Please enter your task to Add")
    }

    else{
        var tasktd = document.createElement("td")
        var edittd = document.createElement("td")
        var deltd = document.createElement("td")
        var editBtn = document.createElement("button")
        var delBtn = document.createElement("button")
    
        tasktd.setAttribute("class","firstTd")
        edittd.setAttribute("class","secondTd")
        deltd.setAttribute("class","thirdTd")
    
        var taskText = document.createTextNode(todo_item.value)
        var editText = document.createTextNode("Edit")
        var delText = document.createTextNode("Delete")
    
        editBtn.appendChild(editText)
        delBtn.appendChild(delText)
    
        editBtn.setAttribute("class","editBtn")
        editBtn.setAttribute("onclick","editItem(this)")
        delBtn.setAttribute("class","delBtn")
        delBtn.setAttribute("onclick","delItem(this)")
    
        tasktd.appendChild(taskText)
        edittd.appendChild(editBtn)
        deltd.appendChild(delBtn)
    
        var row = document.createElement("tr")
        row.appendChild(tasktd)
        row.appendChild(edittd)
        row.appendChild(deltd)
    
        table.appendChild(row)
    
        todo_item.value = ""
    }
}

function deleteAll(){
    table.innerHTML = ""
}

function editItem(e){
    var val = e.parentNode.parentNode.firstChild.innerText;
    var newVal = prompt("Enter new value",val)
    if(newVal.replace(/\s/g,"") == ""){
        alert("Empty Input, Changes not saved")
    }
    else{
        e.parentNode.parentNode.firstChild.innerText = newVal
    }
}

function delItem(e){
    e.parentNode.parentNode.remove()
}