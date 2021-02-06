const url = "http://localhost:3001/";
let socket = io(url);

socket.on("connect", () => {
  console.log("connect!");
  document.getElementById("status").innerText = "connect server แล้ว!";
  let nameInput = document.getElementById("nameInput");
  let msgInput = document.getElementById("msgInput");
  
  let sendBtn = document.getElementById("sendBtn").addEventListener("click", () => {
    let chatBox = document.getElementById("chatbox");
    let chat = document.createElement("p");
    let chatType = document.createElement("div")
    let name = nameInput.value;
    let msg = msgInput.value;
    let chatMsg = `${name} : ${msg}`;

    console.log(chatMsg);

    socket.emit("chat", chatMsg);

    chat.setAttribute("class","bubble-s")
    chat.innerText = msg;
    chatType.setAttribute("dir","rtl")
    chatType.appendChild(chat);
    chatBox.appendChild(chatType);

    //clear input msg
    msgInput.value = "";
  });
});

socket.on("chat", (msg) => {
  console.log(msg);

  let chatBox = document.getElementById("chatbox");
  let chat = document.createElement("p");
  let chatType = document.createElement("div")
  chat.setAttribute("class","bubble-r")
  chat.innerText = msg;
  chatType.appendChild(chat);
  chatBox.appendChild(chatType);
});
