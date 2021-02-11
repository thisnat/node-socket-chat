const url = "http://localhost:3001/";
let socket = io(url);

const displayBubble = (msg,type,name) => {
  let chatBox = document.getElementById("chatbox");
  let chat = document.createElement("p");
  let chatType = document.createElement("div"); //chat bubble

  if (type === "s"){
    chatType.setAttribute("dir", "rtl")
    chat.setAttribute("class", "bubble-s")
  }
  else{
    //display bubble chat name
    let chatName = document.createElement("p");
    chatName.setAttribute("class","bubble-name")
    chatName.innerText = name;
    chatType.appendChild(chatName);
    
    chat.setAttribute("class", "bubble-r")
  }

  chat.innerText = msg;
  chatType.appendChild(chat);
  chatBox.appendChild(chatType);

  chatBox.scrollTo(0, chatBox.scrollHeight);
}

socket.on("connect", () => {
  console.log("connect!");
  document.getElementById("status").innerText = "connect server แล้ว! ✅";
  let nameInput = document.getElementById("nameInput");
  let msgInput = document.getElementById("msgInput");

  let sendBtn = document.getElementById("sendBtn").addEventListener("click", () => {
    let name = nameInput.value;
    let msg = msgInput.value;

    //send chat msg to server
    socket.emit("chat",msg,name);
    console.log(`${name} says ${msg}`);

    //dispaly chat bubble
    displayBubble(msg,"s")

    //clear input msg
    msgInput.value = "";
  });
});

socket.on("chat", (pack) => {
  console.log(`${pack.name} says ${pack.msg}`);

  displayBubble(pack.msg,"r",pack.name);
});
