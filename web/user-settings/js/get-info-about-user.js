import serverURL from "../../js/global/server-url.js";
const nameInput = document.querySelector(".personal-data__input-name");
const surnameInput = document.querySelector(".personal-data__input-surname");
const fathernameInput = document.querySelector(".personal-data__input-father-name");
const universityInput = document.querySelector(".personal-data__input-university");
const loginInput = document.querySelector(".account-data__input-login");
const emailInput = document.querySelector(".account-data__input-email");
const phoneInput = document.querySelector(".account-data__input-number");
const fileInputPhoto = document.getElementById("file-upload-photo");
const inputPhotoUserLook = document.querySelector(".actions__upload-photo-icon");
const fileInputCV = document.getElementById("file-upload-cv");
const saveChangesButton = document.querySelector(".actions__save");
const storedUserId = JSON.parse(sessionStorage.getItem("id"));
const response = await fetch(`${serverURL}/api/users/${storedUserId}/FullInfo`, {
    method: 'GET',
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
});

if (response.ok) {
    const data = await response.json();
    console.log(data)
    nameInput.value = data.name;
    surnameInput.value = data.surname;
    if (data.fathername) {
        fathernameInput.value = data.fathername;
        fathernameInput.disabled = true;
    }
    
    loginInput.value = data.username;
    emailInput.value = data.email;
    phoneInput.value = data.phone ? data.phone : "";
    inputPhotoUserLook.src = data.photo
        ? `data:image/jpeg;base64,${data.photo}`
        : "./img/user-photo.svg";
    universityInput.value = data.university ? data.university : "";
    fileInputCV.value = data.resume ? `data:image/jpeg;base64,${data.resume}` : "";

} else {
    const error = await response.text();
    alert(`Помилка: ${error}`);
}

saveChangesButton.addEventListener("click", async () => {
    const formData = new FormData();
    formData.append("ID", storedUserId);
    // formData.append("Username");
    formData.append("Phone", phoneInput && phoneInput.value ? phoneInput.value : "");
    // formData.append("Name");
    // formData.append("Surname");
    formData.append("Fathername", fathernameInput && fathernameInput.value ? fathernameInput.value : "");
    formData.append("Photo", fileInputPhoto && fileInputPhoto.files[0] ? fileInputPhoto.files[0] : "");
    formData.append("Resume", fileInputCV && fileInputCV.files[0] ? fileInputCV.files[0] : null);
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch(`${serverURL}/api/EditProfile/EditProfileInfo`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            console.log("OK: ", response.message);
        }
        else {
            const error = await response.json();
            const errorMessage = error.message;
            if (errorMessage == "FieldsToRemove is not correct")
                console.error("EROR:", errorData);
            else if (errorMessage == "Username is already taken")
                console.error("EROR:", errorMessage);
            else if (errorMessage == "Unsupported photo extension")
                console.error("EROR:", errorMessage);
            else if (errorMessage == "Unsupported resume file extension")
                console.error("EROR:", errorMessage);
            else
                console.error("EROR:", errorMessage);
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
});


