let users = [];
let messages = [];
var i = 0;

function createUser(){
    let user = {
        code:   i,
        name:   "@" + document.getElementById("newUser").value,
        color:  document.getElementById("newUserColor").value,
    }
    users[i] = user;
    updateUsersList(i);
    i++;
}

function updateUsersList(index){
    let update = {
        list :   document.getElementById("userList"),
        select : document.getElementById("user"),
        option : document.createElement("option"),
        item :   document.createElement("li"),
        user:    document.createTextNode(users[index]["name"]),
        color:   users[index]["color"],
    }
    //active users
    update.item.appendChild(update.user);
    update.item.style.color = update.color;
    update.list.appendChild(update.item);
    //select options
    update.option.text = users[index]["name"];
    update.option.setAttribute("value",users[index]["name"])
    update.select.add(update.option);
}

function sendMessage(){
    let message = {
        name:       document.getElementById("user").value,
        text:       document.getElementById("message").value,
        colorName:  null,
    }
    message.colorName = colorFinder(message.name);
    writeMessage(message.name, message.text, message.colorName);
}

function colorFinder(name){
    let color;
    for(i=0;i<users.length;i++){
        if ( users[i]["name"] = name){
            color = users[i]["color"];
        }
    }
    return color
}

function writeMessage(name, text, color){
    let elements = {
        article:    document.createElement("article"),
        span:       document.createElement("span"),
        textArea:  document.createElement("textarea"),
        board:      document.getElementById("board"),
    }
    elements.article.classList.add("messageContainer");
    elements.textArea.classList.add("messageText");
    elements.textArea.setAttribute("resize","none");
    
    elements.textArea.setAttribute("rows","5");
    elements.textArea.setAttribute("readonly","true");
    elements.textArea.innerText = text;
    elements.span.innerText = name;
    elements.span.style.color = color;
    elements.article.appendChild(elements.textArea);
    elements.article.appendChild(elements.span);
    elements.board.appendChild(elements.article);
}