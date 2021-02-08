const attendence = document.getElementById('attendence')
const raiseHand_btn = document.getElementById("raiseHand_btn");

var raiseHandFlag = false

attendence.addEventListener('click', () => {
    var allUsers = []
    let par = connection.getAllParticipants()
    for (let i = 0; i < par.length; i++) {
        var username = connection.getExtraData(par[i]);
        allUsers.push(username.username)
    }
    var myBlob = new Blob(["Attendence: \n" + allUsers], { type: 'text/plain' });
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "attendance.txt";
    anchor.click();
    window.URL.revokeObjectURL(url);
})

raiseHand_btn.addEventListener('click', () => {
    if(raiseHandFlag===false){
        raiseHandFlag = true
    }else{
        raiseHandFlag = false
    }
    connection.extra.raiseHand = raiseHandFlag
    connection.updateExtraData();
    renderUsers()
})
connection.onExtraDataUpdated = function(event) {
    renderUsers()
};

const renderUsers = () => {
    console.log('renderingusers');
    let par = connection.getAllParticipants()
    usersList.innerHTML = `<div class="userdesign row justify-content-around align-items-center m-0 my-2 w-100">
    <div class="col-3 ">
    <img class="pic "
        src="https://jizaladv.com/catalog/view/theme/default/image/avatar.jpg "
        width="50px " />
    </div>
    <div class="col ">${logedInUser.innerText} <!--raise hand--> <i style="display:${connection.extra.raiseHand? "" : "none"}" id="raiseHand" class="fas fa-hand-paper"></i></div>
    </div>`
    for (let i = 0; i < par.length; i++) {
        var user = connection.getExtraData(par[i]);
        user.raiseHand
        console.log(user.raiseHand)
        usersList.innerHTML += `<div class="userdesign row justify-content-around align-items-center m-0 my-2 w-100">
        <div class="col-3 ">
            <img class="pic "
                src="https://jizaladv.com/catalog/view/theme/default/image/avatar.jpg "
                width="50px " />
        </div>
        <div class="col ">${user.username} <i style="display:${user.raiseHand ? "" : "none"}" id="raiseHand" class="fas fa-hand-paper"></i></div>
        </div>`
    }
}



