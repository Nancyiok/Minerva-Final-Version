import serverURL from "../../js/global/server-url.js";
const fileInputCV = document.querySelector("#file-upload-cv");
const labelForCV = document.querySelector(".cv-chat-message-for-user");
const sendCVButton = document.querySelector(".cv-send__btn");
const messageContainer = document.querySelector(".cv-chat__messages");
const sendButtonImg = document.querySelector(".cv-send__btn--img");
let userCV = '';
let loadingSpinnerMessage = "";
if (!sessionStorage.getItem("id")) {
    window.location.href = "../../web/relogin-page/relogin-page.html"
}

function base64ToBlob(base64, mimeType = "application/pdf") {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}


async function makeRestrictForRequest() {
    if (sessionStorage.getItem("cvChecked")) {
        sendCVButton.removeEventListener("click", sendCVToServer);
        console.log("cvChecked")
        labelForCV.innerHTML = "Ваше резюме вже перевірено";
        fileInputCV.disabled = true;
        fileInputCV.style.pointerEvents = "none";
    }
    else {
        sendCVButton.addEventListener("click", sendCVToServer);
        userCV = await checkResumeExistense();
    }
}

makeRestrictForRequest();

async function checkResumeExistense() {
    const storedUserId = JSON.parse(sessionStorage.getItem("id"));
    const response = await fetch(`${serverURL}/api/users/${storedUserId}/FullInfo`, {
        method: 'GET',
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        labelForCV.innerHTML = "Маємо файл вашого резюме";
        sendButtonImg.src = "./img/send-cv.svg";
        return base64ToBlob(data.resume);

    } else {
        const error = await response.text();
        alert(`Помилка: ${error}`);
        return false;
    }
}



fileInputCV.addEventListener("change", async function () {
    userCV = this.files[0];
    labelForCV.innerHTML = "Файл: " + `${userCV.name.length > 10 ? userCV.name.slice(0, 10) + "..." : userCV.name}`;
    sendButtonImg.src = "./img/send-cv.svg";
});


async function sendCVToServer() {
    sendCVMessage();
    responseLoading();
    try {
        const formData = new FormData();
        console.log(userCV)
        if (!userCV) {
            return;
        }
        formData.append("File", userCV);
        console.log(userCV)
        const response = await fetch(`${serverURL}/api/Articles/TestAI`, {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            console.log("OK: ", response.message);
            loadingSpinnerMessage.style.display = "none";
            const answer = await response.text();
            resposeFromAi(answer);
            makeRestrictForRequest();
        }
    }
    catch (e) {
        console.error("Error:", e);
    }

    sessionStorage.setItem("cvChecked", "yes");
}


function resposeFromAi(feedback) {
    const message = document.createElement("div");
    message.classList.add("cv-chat--left-message");
    const messageText = document.createElement("p");
    messageText.innerText = feedback;
    message.appendChild(messageText);
    messageContainer.appendChild(message);
}

function responseLoading() {
    const message = document.createElement("div");
    message.classList.add("cv-chat--left-message");
    message.classList.add("cv-chat--left-message--loading");
    const messageText = document.createElement("p");
    messageText.innerHTML = `<div class="window-loading__spinner"></div>`;
    message.appendChild(messageText);
    messageContainer.appendChild(message);
    loadingSpinnerMessage = document.querySelector(".cv-chat--left-message--loading");
}

function sendCVMessage() {
    const message = document.createElement("div");
    message.classList.add("cv-chat--right-message");
    const messageText = document.createElement("p");
    messageText.innerHTML = `<svg width="123" height="123" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.8945 12.9473H59.5577L79.3024 31.3973L97.1051 48.8762L99.0472 111.347H25.8945V12.9473Z" fill="white"/>
<path d="M85.2578 78.293C85.2578 78.6115 85.3844 78.9171 85.6096 79.1423C85.8349 79.3676 86.1404 79.4941 86.459 79.4941C86.7776 79.4941 87.0831 79.3676 87.3083 79.1423C87.5336 78.9171 87.6602 78.6115 87.6602 78.293C87.6602 77.9744 87.5336 77.6689 87.3083 77.4436C87.0831 77.2184 86.7776 77.0918 86.459 77.0918C86.1404 77.0918 85.8349 77.2184 85.6096 77.4436C85.3844 77.6689 85.2578 77.9744 85.2578 78.293Z" fill="#4AA4B0"/>
<path d="M61.512 7.6875H20.6602V115.312H102.34V46.3172L61.512 7.6875ZM95.0007 46.6415H61.3679V14.8104L95.0007 46.6415ZM97.0547 110.027H25.9453V12.9727H59.41L59.434 12.9967V48.5754H97.0187L97.0427 48.5994V110.027H97.0547Z" fill="#1F545B"/>
<path d="M33.6914 63.6621H72.8376V65.584H33.6914V63.6621Z" fill="#1F545B"/>
<path d="M76.8164 63.6621H87.651V65.584H76.8164V63.6621Z" fill="#4AA4B0"/>
<path d="M48.4688 77.0918H81.7412V79.0137H48.4688V77.0918Z" fill="#1F545B"/>
<path d="M33.7031 77.0918H44.6578V79.0137H33.7031V77.0918Z" fill="#4AA4B0"/>
<path d="M33.6211 90.5332H72.8394V92.4551H33.6211V90.5332Z" fill="#1F545B"/>
<path d="M78.7734 90.5332H87.6501V92.4551H78.7734V90.5332Z" fill="#4AA4B0"/>
</svg>
`;
    message.appendChild(messageText);
    messageContainer.appendChild(message);
}

