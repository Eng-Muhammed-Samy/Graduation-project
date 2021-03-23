const recordScreen = document.getElementById('recordScreen')

recordScreen.addEventListener('click', () => {
    if (isRecording === true) {
        var recorder = connection.recorder;
        if (!recorder) return alert('No recorder found.');
        recorder.stopRecording(() => {
            var blob = recorder.getBlob();
            invokeSaveAsDialog(blob,'*.webm');

            connection.recorder = null;
        })
        isRecording = false
    }else{
        startRecording()
    }

})
