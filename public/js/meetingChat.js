
// chat
let text = $("input.room-chat");
$("html").keydown((e) => {
    if (e.which == 13 && text.val().length !== 0) {
  
       const messagewriter=logedInUser.innerText;
        socket.emit("message", text.val(),messagewriter);
        text.val("");
    }
});

socket.on("createMessage", (message,messagewriter) => {
    $("#chat").append(
        `<li class = "message"><b>${messagewriter} : </b>${message}</li>`
    );
});

