import serverURL from "../../js/global/server-url.js";
const fileInputPhoto = document.getElementById("file-upload-photo");
const fileInputCV = document.getElementById("file-upload-cv");
const userPhoto = document.querySelector(".actions__upload-photo-icon");
const cvPhoto = document.querySelector(".actions__upload-cv-icon");
const labelForPhoto = document.querySelector(".custom-file-upload-photo");
const labelForCV = document.querySelector(".custom-file-upload-cv");
const fathernameInput = document.querySelector(".personal-data__input-father-name");
const universityInput = document.querySelector(".personal-data__input-university");
const phoneInput = document.querySelector(".account-data__input-number");
const deleteButton = document.getElementById("deleteAccountBtn");
const resetButton = document.querySelector(".actions__reset");

fileInputPhoto.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        userPhoto.src = URL.createObjectURL(file);
        userPhoto.classList.add("add");
        labelForPhoto.textContent = "Змінити фото";
    }
});

fileInputCV.addEventListener("change", function () {
    const file = this.files[0];
    cvPhoto.src = "./img/cv-photo-download.svg"
    labelForCV.textContent = "Файл: " + file.name;
});

resetButton.addEventListener("click", async function () {
    fileInputPhoto.value = "";
    fileInputCV.value = "";
    userPhoto.src = "./img/user-photo.svg";
    userPhoto.classList.remove("add");
    cvPhoto.src = "./img/upload-files.svg";
    labelForPhoto.textContent = "Завантажити фото";
    labelForCV.textContent = "Завантажити резюме";
    fathernameInput.value = "";
    universityInput.value = "";
    phoneInput.value = "";
    const user = JSON.parse(storedUser);
    const formData = new FormData();
    formData.append("ID", user.id);
    formData.append("FieldsToRemove", JSON.stringify([true, false, false, true, true, true]));
    try {
        const responseDelete = await fetch(`${serverURL}/api/EditProfile/EditProfileInfo`, {
            method: "POST",
            body: formData,
        });

        if (responseDelete.ok) {
            console.log("OK: ", responseDelete.message);
        }
    }
    catch (e) {
        console.error("EROR:", e);
    }
});

deleteButton.addEventListener("click", async function () {
    const formData = new FormData();
    formData.append("FieldsToRemove", JSON.stringify([true, true, true, true, true, true]));
    try {
        const responseDelete = await fetch(`${serverURL}/api/EditProfile/EditProfileInfo`, {
            method: "POST",
            body: formData,
        });

        if (responseDelete.ok) {
            console.log("OK: ");
            location.href = "../../index.html";
        }
    }
    catch (e) {
        console.error("EROR:", e);
    }
}
);
