const cardsContainer = document.querySelector(".news-page-all__articles");
import serverURL from "../../js/global/server-url.js";
import checkSections from "../../js/global/lazy-loading.js";
const buttonAll = document.querySelector('button[data-filter="all"]');
const buttonNews = document.querySelector('button[data-filter="news"]');
const buttonTips = document.querySelector('button[data-filter="tips"]');
const buttonFacts = document.querySelector('button[data-filter="facts"]');


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
    console.log(data);
    Object.keys(data).forEach(key => {
        const card = document.createElement("div");
        card.classList.add("news-card-all");
        card.id = key;
        card.setAttribute("data-rubric", data[key].idRubric);
        const img = document.createElement("img");
        img.classList.add("news-card-all__img");
        loadImage(`${serverURL}${data[key].photo}`, img);
        card.appendChild(img);
        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("news-card-all__title");
        cardTitle.innerText = data[key].title.length > 50 ? data[key].title.slice(0, 50) + "..." : data[key].title;
        // img.alt = data[key].title;
        card.appendChild(cardTitle);
        const cardDescription = document.createElement("p");
        cardDescription.classList.add("news-card-all__description");
        cardDescription.innerText = data[key].first_paragraph.length > 70 ? data[key].first_paragraph.slice(0, 70) + "..." : data[key].first_paragraph;
        console.log(data[key].first_paragraph.length);
        card.appendChild(cardDescription);
        const cardButton = document.createElement("button");
        cardButton.classList.add("news-card-all__button");
        cardButton.innerText = "Читати";
        card.appendChild(cardButton);
        container.appendChild(card);
        cardButton.addEventListener("click", function () {
            sessionStorage.setItem("newsArticleId", card.id);
            window.location.href = ".././article-page/article.html"
        })
    })
    addEventListenersToButtons();
}

function addEventListenersToButtons() {
    buttonNews.addEventListener("click", function () {
        filterCards(0);
        addActiveClassToButton(buttonNews);
    });

    buttonTips.addEventListener("click", function () {
        filterCards(1);
        addActiveClassToButton(buttonTips);
    });

    buttonFacts.addEventListener("click", function () {
        filterCards(2);
        addActiveClassToButton(buttonFacts);
    });

    buttonAll.addEventListener("click", function () {
        const cards = cardsContainer.querySelectorAll(".news-card-all");
        cards.forEach(card => {
            card.style.display = "flex";
        });
        addActiveClassToButton(buttonAll);
    })
}


function filterCards(rubric) {
    const cards = cardsContainer.querySelectorAll(".news-card-all");
    cards.forEach(card => {
        if (card.getAttribute("data-rubric") == rubric) {
            card.style.display = "flex";
            card.classList.add("active");
        } else {
            card.style.display = "none";
        }
    });
}

function addActiveClassToButton(button) {
    const filterPanel = document.querySelector(".filter-buttons");
    const activeButton = filterPanel.querySelector(".active");
    if (activeButton) {
        activeButton.classList.remove("active");
    }
    button.classList.add("active");
}


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
window.addEventListener('scroll', checkSections);


