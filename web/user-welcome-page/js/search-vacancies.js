import serverURL from "../../js/global/server-url.js";

const searchContainer = document.querySelector(".search-job__card-container");
const searchInput = document.querySelector(".search-box__input");
let initialVacancies = [];

async function getInfoAboutArticles() {
    try {
        const response = await fetch(`${serverURL}/api/Vacancy/AllVacancies`, {
            method: "GET",
            headers: { "ngrok-skip-browser-warning": "true" },
        });

        if (!response.ok) throw new Error("Помилка отримання вакансій");

        const data = await response.json();
        initialVacancies = Object.values(data);
        renderVacancies(initialVacancies);
    } catch (err) {
        console.error("Помилка запиту:", err);
    }
}

function renderVacancies(vacancies) {
    searchContainer.innerHTML = "";
    if (vacancies.length === 0) {
        searchContainer.innerHTML = `<p>Вакансії не знайдено</p>`;
        return;
    }
    vacancies.forEach(vacancy => createCard(vacancy, searchContainer));
}

async function searchVacancies(query) {
    if (!query) {
        renderVacancies(initialVacancies);
        return;
    }

    try {
        const response = await fetch(`${serverURL}/api/Vacancy/${query}/SearchVacancies`, {
            method: "GET",
            headers: { "ngrok-skip-browser-warning": "true" },
        });

        if (!response.ok) throw new Error("Вакансії не знайдено");

        const data = await response.json();
        renderVacancies(Object.values(data));
    } catch (error) {
        console.error("Помилка при отриманні вакансії:", error);
        searchContainer.innerHTML = `<p>Вакансії не знайдено</p>`;
    }
}

searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.trim();
    // if (!searchValue) {
    //     renderVacancies(initialVacancies);
    //     return;
    // }
    searchVacancies(searchValue);
});

async function loadImage(url, imgElement) {
    try {
        const response = await fetch(url, {
            headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!response.ok) throw new Error("Помилка завантаження зображення");
        const blob = await response.blob();
        imgElement.src = URL.createObjectURL(blob);
    } catch (error) {
        console.error("Помилка завантаження:", error);
        imgElement.src = "default-image.jpg";
    }
}

function createCard(data, container) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = "card" + data.id;

    const cardIcon = document.createElement("div");
    cardIcon.classList.add("card__icon");

    const img = document.createElement("img");
    img.alt = data.title || "Назва вакансії";
    cardIcon.appendChild(img);

    const imageUrl = data.photo ? `${serverURL}${data.photo}` : "./img/photo-before-download.svg";
    loadImage(imageUrl, img);

    const cardText = document.createElement("div");
    cardText.classList.add("card__text");

    const h3 = document.createElement("h3");
    h3.classList.add("card__title");
    h3.innerText =data.title || "Без назви";
    const p = document.createElement("p");
    p.classList.add("card__description");
    p.innerText = data.description.length > 70 ? data.description.slice(0, 70) + "..." : data.description || "Опис відсутній";
    cardText.appendChild(h3);
    cardText.appendChild(p);

    const a = document.createElement("a");
    a.href = `../job-article-page/job-page-article.html?id=${data.id}`;
    a.classList.add("card__button");
    a.innerText = "Переглянути";
    a.addEventListener("click", () => {
        sessionStorage.setItem("vacancyId", JSON.stringify(data.id));
    });

    cardDiv.appendChild(cardIcon);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(a);
    container.appendChild(cardDiv);
}

getInfoAboutArticles();
