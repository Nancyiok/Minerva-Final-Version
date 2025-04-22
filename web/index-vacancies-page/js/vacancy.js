import serverURL from "../../js/global/server-url.js";

const cardsContainer = document.querySelector(".job__card-container");

async function getInfoAboutArticles() {
    try {
        const response = await fetch(`${serverURL}/api/Vacancy/AllVacancies`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        });

        if (!response.ok) {
            const error = await response.text();
            console.log(error);
            return;
        }

        const data = await response.json();
        const vacancies = Object.values(data);
        cardsContainer.innerHTML = ""; 
        vacancies.forEach(vacancy => createCard(vacancy, cardsContainer));
    } catch (err) {
        console.error("Помилка запиту:", err);
    }
}

getInfoAboutArticles();

async function createCard(data, container) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = "card" + data.id;
    const cardIcon = document.createElement("div");
    cardIcon.classList.add("card__icon");
    const img = document.createElement("img");
    img.src = "../../web/vacancies-page/img/image-before-download.svg";
    const cardPhoto = await loadImage(`${serverURL}${data.photo}`);
    img.src = "../../web/vacancies-page/img/image-before-download.svg";
    img.src = cardPhoto || "../../web/vacancies-page/img/image-before-download.svg";
    cardIcon.appendChild(img);
    img.alt = data.title || "Назва вакансії";
    const cardText = document.createElement("div");
    cardText.classList.add("card__text");
    const h3 = document.createElement("h3");
    h3.classList.add("card__title");
    h3.innerText = data.title || "Без назви";
    const p = document.createElement("p");
    p.classList.add("card__description");
    p.innerText = data.description.length > 70 ? data.description.slice(0, 70) + "..." : data.description || "Опис відсутній";
    cardText.appendChild(h3);
    cardText.appendChild(p);
    const a = document.createElement("a");
    const url = `../../web/sign-up-page/sign-up-page.html`
    console.log(url);
    a.href = url;
    a.classList.add("card__button");
    a.innerText = "Переглянути";
    a.addEventListener("click", () => {
        sessionStorage.setItem("vacancyId", JSON.stringify(data.id));
    });
    cardDiv.appendChild(cardIcon);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(a);
    container.appendChild(cardDiv);
    return container;
}

async function loadImage(url) {
    try {
        const response = await fetch(url, {
            headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!response.ok) throw new Error("Помилка завантаження зображення");
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Помилка завантаження:", error);
    }
}
