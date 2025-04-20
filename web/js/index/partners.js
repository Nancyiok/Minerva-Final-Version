const slides = [
    '<li class="clients-carousel__slide"><img src="https://th.bing.com/th/id/OIP.b00TmkZcVl6GdyzvF0vBkwHaD4?rs=1&pid=ImgDetMain" alt="Slide 1" class="carousel__image"></li>',
    '<li class="clients-carousel__slide"><img src="https://th.bing.com/th/id/OIP.8uyUaYDx31cmvH8e-pv12wHaHa?rs=1&pid=ImgDetMain" alt="Slide 2" class="carousel__image"></li>',
];

let currentIndex = 0;

function renderCarousel(slides) {
    const track = document.querySelector(".clients-carousel__track");
    track.innerHTML = "";
    const slidesToShow = calculateSlidesToShow();
    for (let i = 0; i < slidesToShow; i++) {
        const slideIndex = (currentIndex + i) % slides.length;
        track.innerHTML += slides[slideIndex];
    }

    updateIndicators();
}

function calculateSlidesToShow() {
    if (window.matchMedia("(min-width:580px)").matches) {
        return 2;
    } else {
        return 1;
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll(".clients-carousel__indicator");
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle(
            "clients-carousel__indicator--active",
            index === currentIndex
        );
    });
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    renderCarousel(slides);
}


const nextButton = document.querySelector(".clients-carousel__button--right");
const prevButton = document.querySelector(".clients-carousel__button--left");
const indicators = document.querySelectorAll(".clients-carousel__indicator");

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentIndex = index;
        renderCarousel(slides);
    });
});

renderCarousel(slides);

window.addEventListener("resize", () => renderCarousel(slides));
setInterval(showNextSlide, 1000);