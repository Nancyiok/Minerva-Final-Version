const fileInputCV = document.querySelector("#file-upload-cv");
const labelForCV = document.querySelector(".cv-chat-message-for-user");
const sendCVButton = document.querySelector(".cv-send__btn");
const messageContainer = document.querySelector(".cv-chat__messages");
const sendButtonImg = document.querySelector(".cv-send__btn--img");
const aiMessage1 = document.querySelector(".cv-chat--left-message1");
console.log(aiMessage1);
let userCV = '';


sendCVButton.addEventListener("click", sendCVToServer);


fileInputCV.addEventListener("change", async function () {
    userCV = this.files[0];
    labelForCV.innerHTML = "Файл: " + `${userCV.name.length > 10 ? userCV.name.slice(0, 10) + "..." : userCV.name}`;
    sendButtonImg.src = "./img/send-cv.svg";
});


function sendCVToServer() {
    aiMessage1.classList.add("active");
    document.querySelector(".cv-chat--left-message2").classList.remove("active");
    setTimeout(() => {
        aiMessage1.classList.remove("active");
        document.querySelector(".cv-chat--left-message2").classList.add("active");
    }, 5000);

    sendButtonImg.src = "./img/prohibit-sending.svg";
    labelForCV.innerHTML = "Прикріпіть ваше CV";
}

