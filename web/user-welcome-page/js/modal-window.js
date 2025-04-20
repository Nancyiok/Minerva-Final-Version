const modal = document.querySelector('.welcome-window');
if (!sessionStorage.getItem("firstVisit")) {
    modal.classList.add('active');
    if (sessionStorage.getItem("login")) {
        document.querySelector(".welcome-window__title").innerText = `Привіт, ${sessionStorage.getItem("login").replaceAll('"', "")}`;
    }
    else {
        document.querySelector(".welcome-window__title").innerText = `Привіт`;
    }

    setTimeout(() => {
        modal.classList.remove('active');
    }, 2000);
}

else {
    console.log("second visit");
}