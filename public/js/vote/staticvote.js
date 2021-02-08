

const votingBlock = document.getElementById('votingBlock')
const votingButton = document.getElementById("votingButton"),
addNewVote = document.getElementById('addNewVote')

//voting window
votingButton.addEventListener("click", () => {
    if (votingBlock.classList.contains("disp")) {
        votingBlock.classList.add("hide");
        votingBlock.classList.remove("disp");
    } else {
        votingBlock.classList.remove("hide");
        votingBlock.classList.add("disp");
    }
});

// vote section

const question = document.getElementById("question"),
    saveVote = document.getElementById("saveVote"),
    voteResult = document.getElementById("voteResult"),
    inputGroupSelections = document.getElementById("inputGroupSelections"),
    showFinalResult = document.getElementById('showFinalResult'),
    resultQuestion = document.getElementById("resultQuestion"),
    option1 = document.getElementById('option1'),
    option2 = document.getElementById('option2'),
    option3 = document.getElementById('option3')


saveVote.addEventListener("click", () => {

    socket.emit('newVote', question.value, inputGroupSelections.value, option1.value, option2.value, option3.value)
})

socket.on('startVoting', (question, gender, option1, option2, option3) => {
    if (gender === 'single') {
        voteResult.innerHTML = ``;
        resultQuestion.innerHTML = ``;
        resultQuestion.innerText = `${question}`;
        voteResult.innerHTML += `<div class="form-check">
            <label class="form-check-label ">
            <input type="radio" class="form-check-input single-option-event" name="option"
            value="${option1}" id="oop1">${option1}
            </label>
            </div>
            <div class="form-check">
            <label class="form-check-label ">
            <input type="radio" class="form-check-input single-option-event" name="option"
            value="${option2}" id="oop2">${option2}
            </label>
            </div>
            <div class="form-check">
            <label class="form-check-label ">
            <input type="radio" class="form-check-input single-option-event" name="option"
            value="${option3}" id="oop3" >${option3}
            </label>
            </div>
            <Button class="btn btn-primary "
            id="singleSubmit">submit</Button>`;
        const singleSubmit = document.getElementById('singleSubmit')
        singleSubmit.addEventListener('click', () => {
            const multiChoices = []
            console.log('clicked');
            const oop1 = document.getElementById('oop1'),
                oop2 = document.getElementById('oop2'),
                oop3 = document.getElementById('oop3')
            if (oop1.checked) {
                multiChoices.push(oop1.value)
                console.log(oop1.value);
            }
            if (oop2.checked) {
                multiChoices.push(oop2.value)
                console.log(oop2.value);
            }
            if (oop3.checked) {
                multiChoices.push(oop3.value)
                console.log(oop3.value);
            }
            socket.emit('votting', multiChoices)
            console.log('new votting was emmited');
        })
    } else {
        voteResult.innerHTML = ``;
        resultQuestion.innerHTML = ``;
        resultQuestion.innerText = `${question}`;
        voteResult.innerHTML += `<div class="form-check">
            <label class="form-check-label ">
            <input type="checkbox" class="form-check-input single-option-event" name="option"
            value="${option1}" id="oop1">${option1}
            </label>
            </div>
            <div class="form-check">
            <label class="form-check-label ">
            <input type="checkbox" class="form-check-input single-option-event" name="option"
            value="${option2}" id="oop2" >${option2}
            </label>
            </div>
            <div class="form-check">
            <label class="form-check-label ">
            <input type="checkbox" class="form-check-input single-option-event" name="option"
            value="${option3}" id="oop3">${option3}
            </label>
            </div>
            <Button class="btn btn-primary "
            id="multiSubmit">submit</Button>`;
        const multiSubmit = document.getElementById('multiSubmit')
        multiSubmit.addEventListener('click', () => {
            const multiChoices = []
            console.log('clicked');
            const oop1 = document.getElementById('oop1'),
                oop2 = document.getElementById('oop2'),
                oop3 = document.getElementById('oop3')
            if (oop1.checked) {
                multiChoices.push(oop1.value)
                console.log(oop1.value);
            }
            if (oop2.checked) {
                multiChoices.push(oop2.value)
                console.log(oop2.value);
            }
            if (oop3.checked) {
                multiChoices.push(oop3.value)
                console.log(oop3.value);
            }
            socket.emit('votting', multiChoices)
        })
    }
    socket.on('result', (q,v1, v2, v3) => {
        // TODO last vote mission render the results
        var voteSum = v1.value+v2.value+v3.value
        resultQuestion.innerHTML = ``;
        voteResult.innerHTML = ``;
        resultQuestion.innerText = `${q}`;
        voteResult.innerHTML = `<p>total votes: ${voteSum}</p>`;
            voteResult.innerHTML += `  <label for="">${v1.key}
                                        votes :${v1.value}</label>
                                        <div class="progress-bar progress-bar-striped 
                                        progress-bar-animated" style=
                                        "width:${(v1.value/voteSum)*100}%">${(v1.value/voteSum)*100}%</div>

                                        <label for="">${v2.key}
                                        votes :${v2.value}</label>
                                        <div class="progress-bar progress-bar-striped 
                                        progress-bar-animated" style=
                                        "width:${(v2.value/voteSum)*100}%">${(v2.value/voteSum)*100}%</div>

                                        <label for="">${v3.key}
                                        votes :${v3.value}</label>
                                        <div class="progress-bar progress-bar-striped 
                                        progress-bar-animated" style=
                                        "width:${(v3.value/voteSum)*100}%">${(v3.value/voteSum)*100}%</div>`;
    })
})