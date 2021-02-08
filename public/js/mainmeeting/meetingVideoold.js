const videoGrid = document.getElementById("video-grid");
const userGrid = document.getElementById("user-video-grid");

const myPeer = new Peer();

const myVideo = document.createElement("video");
myVideo.muted = true;

const peers = {};
let myVideoStream;
navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {
        myVideoStream = stream;
        addMyVideoSream(myVideo, stream);

        myPeer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                if (myPeer) addVideoSream(video, userVideoStream);
            });
        });

        socket.on("user-connected", (userid) => {
            connectToNewUser(userid, stream);
        });
    });

socket.on("user-disconnected", (userid) => {
    if (peers[userid]) peers[userid].close();
});

myPeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userid, straem) {
    const call = myPeer.call(userid, straem);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
        addVideoSream(video, userVideoStream);
    });
    call.on("close", () => {
        video.remove();
    });
    peers[userid] = call;
}

function addVideoSream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    userGrid.append(video);
}

function addMyVideoSream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}


// mute our video
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
};

const mute = document.getElementById("mute");
const stop = document.getElementById("stop");

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    `;
    document.querySelector(".main__mute_button").innerHTML = html;
    mute.classList.remove("btn-outline-danger");
    mute.classList.add("btn-outline-light");


};

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    `;
    document.querySelector(".main__mute_button").innerHTML = html;
    mute.classList.remove("btn-outline-light");
    mute.classList.add("btn-outline-danger");
};

const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
};

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
    stop.classList.remove("btn-outline-danger");
    stop.classList.add("btn-outline-light");
};

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
    `;
    document.querySelector(".main__video_button").innerHTML = html;
    stop.classList.remove("btn-outline-light");
    stop.classList.add("btn-outline-danger");
};