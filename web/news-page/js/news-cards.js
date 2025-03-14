const cardsContainer = document.querySelector(".news-page-all__articles");
import serverURL from "../../js/global/server-url.js";

(async function () {
    try {
        const request = await fetch(`${serverURL}/api/Articles/AllArticles`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        }
        );
        if (request.ok) {
            const data = await request.json();
            console.log(data);
            renderArticles(data, cardsContainer);
        } else {
            console.error("Помилка запиту:", request.status, request.statusText);
        }
    } catch (e) {
        console.log("Виникла проблема з сервером", e);
    }
})();

function renderArticles(data, container) {
    Object.keys(data).forEach(key => {
        const card = document.createElement("div");
        card.classList.add("news-card-all");
        card.id = key;
        const img = document.createElement("img");
        img.classList.add("news-card-all__img");
        img.src = data[key].src;
        card.appendChild(img);
        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("news-card-all__title");
        cardTitle.innerText = data[key].title;
        img.alt = data[key].title + "jjejjejejennndd";
        card.appendChild(cardTitle);
        const cardDescription = document.createElement("p");
        cardDescription.classList.add("news-card-all__description");
        cardDescription.innerText = data[key].first_paragraph;
        card.appendChild(cardDescription);
        const cardButton = document.createElement("button");
        cardButton.classList.add("news-card-all__button");
        cardButton.innerText = "Читати";
        card.appendChild(cardButton);
        container.appendChild(card);
        sessionStorage.setItem("newsArticleId", card.id);
        cardButton.addEventListener("click", function () {
            sessionStorage.setItem("newsArticleId", this.parentElement.id);
            window.location.href = ".././article-page/article.html"
        })
    })
}
