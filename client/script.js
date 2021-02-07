const url = "http://localhost:3001/";
let socket = io(url);

const displayBubble = (msg,type) => {
  let chatBox = document.getElementById("chatbox");
  let chat = document.createElement("p");
  let chatType = document.createElement("div")

  if (type === "s"){
    chatType.setAttribute("dir", "rtl")
    chat.setAttribute("class", "bubble-s")
  }
  else{
    chat.setAttribute("class", "bubble-r")
  }

  chat.innerText = msg;
  chatType.appendChild(chat);
  chatBox.appendChild(chatType);
}

socket.on("connect", () => {
  console.log("connect!");
  document.getElementById("status").innerText = "connect server แล้ว! ✅";
  let nameInput = document.getElementById("nameInput");
  let msgInput = document.getElementById("msgInput");

  let sendBtn = document.getElementById("sendBtn").addEventListener("click", () => {
    let name = nameInput.value;
    let msg = msgInput.value;
    let chatMsg = `${name} : ${msg}`;

    //send chat msg to server
    socket.emit("chat", chatMsg);
    console.log(chatMsg);

    //dispaly chat bubble
    displayBubble(msg,"s")

    //clear input msg
    msgInput.value = "";
  });
});

socket.on("chat", (msg) => {
  console.log(msg);

  displayBubble(msg);
});
