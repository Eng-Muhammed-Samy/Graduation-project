const videoGrid = document.getElementById("video-grid");
const userGrid = document.getElementById("user-video-grid");
const shareScreen = document.getElementById('shareScreen')
const logedInUser = document.getElementById('logedInUser')
const usersList = document.getElementById('usersList')
const mainVideo = document.getElementById('mainVideo')

var connection = new RTCMultiConnection()
connection.socketURL = '/'
connection.session = {
    Audio: true,
    video: true,
    // screen:true
}
connection.sdpConstraints.mandatory = {
    OfferToRecieveAudio: true,
    OfferToRecieveVideo: true
}

connection.extra = {
    username: logedInUser.innerText,
    raiseHand: false
}
socket.emit('join-room', ROOM_ID)

socket.on('user-connected', (data) => {
})
var isRecording = false
var startRecording
let myVideoStream;


connection.onstream = (event) => {
    myVideoStream = event.stream
    startRecording = () => {
        var recorder = connection.recorder;
        if (!recorder) {
            recorder = RecordRTC([event.stream], {
                type: 'video/webm;codecs=vp9'
            });
            recorder.startRecording();
            connection.recorder = recorder;
        }
        else {
            recorder.getInternalRecorder().addStreams([event.stream]);
        }

        if (!connection.recorder.streams) {
            connection.recorder.streams = [];
        }
        connection.recorder.streams.push(myVideoStream);
        isRecording = true
    }

    var video = event.mediaElement
    video.removeAttribute('controls')
    // video.addAttribute({
    //     title:'video',
    //     buttons:['full-screen']
    // })
    userGrid.appendChild(video)
    video.addEventListener('click', (e) => {
        console.log('clicked');
        mainVideo.srcObject = e.target.srcObject
        // userGrid.removeChild(e.target)
    })
}
connection.checkPresence(ROOM_ID, (isRoomExist, ROOM_ID) => {
    if (isRoomExist === true) {
        connection.join(ROOM_ID);
    } else {
        connection.open(ROOM_ID);
    }

});

shareScreen.addEventListener('click', () => {
    connection.addStream({
        screen: true,
        oneway: true
    });
})

// socket.on('update',()=>{
//     renderUsers()
// })



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



