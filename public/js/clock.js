setInterval(() => {
    var h_hand = document.querySelector(".h-hand");
    var m_hand = document.querySelector(".m-hand");
    var s_hand = document.querySelector(".s-hand");
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    h_hand.style.transform = "rotate(" + h * 30 + "deg)";
    m_hand.style.transform = "rotate(" + m * 6 + "deg)";
    s_hand.style.transform = "rotate(" + s * 6 + "deg)";
}, 1000);
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var tomorrow = new Date();
tomorrow.setTime(tomorrow.getTime() + 1000 * 3600 * 24);
document.getElementById("spanDate").innerHTML =
    months[tomorrow.getMonth()] +
    " " +
    (tomorrow.getDate() - 1) +
    ", " +
    tomorrow.getFullYear();