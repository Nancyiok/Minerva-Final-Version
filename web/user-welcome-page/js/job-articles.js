import serverURL from "../../js/global/server-url.js";

const cardsContainer = document.querySelector(".search-job__card-container");

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
        vacancies.forEach(vacancy => createCard(vacancy, cardsContainer));
    } catch (err) {
        console.error("Помилка запиту:", err);
    }
}

getInfoAboutArticles();

function createCard(data, container) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.id = "card" + data.id;

    const cardIcon = document.createElement("div");
    cardIcon.classList.add("card__icon");

    const img = document.createElement("img");
    img.src = data.photo || "default-image.jpg";
    img.alt = data.title || "Назва вакансії";
    cardIcon.appendChild(img);

    const cardText = document.createElement("div");
    cardText.classList.add("card__text");

    const h3 = document.createElement("h3");
    h3.classList.add("card__title");
    h3.innerText = data.title || "Без назви";

    const p = document.createElement("p");
    p.classList.add("card__description");
    p.innerText = data.description || "Опис відсутній";

    cardText.appendChild(h3);
    cardText.appendChild(p);

    const a = document.createElement("a");
    // let url = new URL("../job-article-page/job-page-article.html", window.location.href); // Base URL added
    // console.log(url.href)
    // url.searchParams.set('id', `${data.id}`);
    const url = `../job-article-page/job-page-article.html?id=${data.id}` 
    console.log(url);
    a.href = url; 
    a.classList.add("card__button");
    a.innerText = "Переглянути";

    cardDiv.appendChild(cardIcon);
    cardDiv.appendChild(cardText);
    cardDiv.appendChild(a);
    container.appendChild(cardDiv);
    return container;
}
