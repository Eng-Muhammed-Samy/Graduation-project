const chat = document.getElementById("qurtChat");
const users = document.getElementById("qurtUsers");
const chatBlock = document.getElementById("chatBlok");
const usersBlock = document.getElementById("usersBlock");
// const info =document.getElementsByClassName('meetinginfo')[0];

// open / close chat window
chat.addEventListener("click", () => {
    if (chatBlock.classList.contains("disp")) {
        chatBlock.classList.add("hide");
        chatBlock.classList.remove("disp");
    } else {
        chatBlock.classList.remove("hide");
        chatBlock.classList.add("disp");
    }
    if (usersBlock.classList.contains("disp")) {
        usersBlock.classList.add("hide");
        usersBlock.classList.remove("disp");
    }
});


// open /close users window
users.addEventListener("click", () => {
    renderUsers()
    if (usersBlock.classList.contains("disp")) {
        usersBlock.classList.add("hide");
        usersBlock.classList.remove("disp");
    } else {
        usersBlock.classList.remove("hide");
        usersBlock.classList.add("disp");
    }
    if (chatBlock.classList.contains("disp")) {
        chatBlock.classList.add("hide");
        chatBlock.classList.remove("disp");
    }
});

// The (chat window, users window) are closes when the width of window is less than 650
window.addEventListener("resize", () => {
    if (window.innerWidth <= "650") {
        if (usersBlock.classList.contains("disp")) {
            usersBlock.classList.add("hide");
            usersBlock.classList.remove("disp");
        }
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth <= "650") {
        if (chatBlock.classList.contains("disp")) {
            chatBlock.classList.add("hide");
            chatBlock.classList.remove("disp");
        }
    }
});

document.getElementById("dotted").onclick = () => {
    const option = document.getElementById("options");
    option.classList.toggle("d-none");
    // option.classList.toggle('op')
};

