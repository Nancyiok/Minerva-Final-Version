const slides = [
    `<li class="proposals-carousel__slide">
    <h4>Перевірка CV</h4>
    <p>На нашому сайті ви зможете додати до свого акаунту CV, а ми його перевіримо. Це дасть змогу уникнути відсіювання у HR-спеціалістів на першому етапі перегляду. Також ми надамо поради:</p>
    <p>— що можна додати,<br>
    — яку інформацію краще залишити,<br>
    — а що прибрати взагалі.</p>
    <p>Ми турбуємося про ваше майбутнє — гарне CV це перший крок до омріяного життя.</p>
  </li>`,

    `<li class="proposals-carousel__slide">
    <h4>Пробні інтерв’ю</h4>
    <p>Наші ментори — це професійні HR-фахівці, які колись теж були новачками. Вони з радістю допоможуть вам покращити навички проходження співбесід.</p>
    <p>Ви зможете обрати зручну дату, час та спеціаліста. Ваш розвиток — наш пріоритет. Приєднуйтеся та ставайте кращими разом із нами!</p>
  </li>`,

    `<li class="proposals-carousel__slide">
    <h4>Тести</h4>
    <p>Хвилюєтеся перед інтерв’ю та хочете перевірити свої знання? Ми створили систему навчальних тестів, яка допоможе вам підготуватися і зменшити стрес.</p>
    <p>Будьте готові на всі 100%!</p>
  </li>`,

    `<li class="proposals-carousel__slide">
    <h4>Поради від експертів</h4>
    <p>Minerva прагне, щоб студенти були оточені світом IT. Наші експерти з різних галузей допоможуть вам краще розібратися в темах та дадуть корисні поради.</p>
    <p>Ми віримо у ваш успіх!</p>
  </li>`,

    `<li class="proposals-carousel__slide">
    <h4>Актуальні вакансії</h4>
    <p>Ми хочемо, щоб ви якнайшвидше отримали роботу завдяки вашим знанням. Ми перевіряємо всіх роботодавців, тому вакансії на нашому сайті — легальні та безпечні.</p>
    <p>Наші роботодавці зацікавлені у вас!</p>
  </li>`,

    `<li class="proposals-carousel__slide">
    <h4>Можливість знайти однодумців</h4>
    <p>Minerva — це велике ком’юніті студентів, університетів та бізнесу. Мільйони людей по всьому світу прагнуть до розвитку — і серед них ви точно знайдете тіммейтів, колег або навіть друзів.</p>
    <p>Станьте частиною спільноти інновацій!</p>
  </li>`
];



const myDialogProposals = document.getElementById("myDialog-proposals");
const closeButtonProposals = document.querySelector(".proposals-carousel__button--close");

const activateCarousel = document.querySelectorAll(".proposals__item-link");

let currentIndex = 0;

function renderCarousel(slides) {
    const track = document.querySelector(".proposals-carousel__track");
    track.innerHTML = "";
    const slidesToShow = calculateSlidesToShow();
    for (let i = 0; i < slidesToShow; i++) {
        const slideIndex = (currentIndex + i) % slides.length;
        track.innerHTML += slides[slideIndex];
    }

    updateIndicators();
}

function calculateSlidesToShow() {
    return 1;
}


function updateIndicators() {
    const indicators = document.querySelectorAll(".proposals-carousel__indicator");
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle(
            "proposals-carousel__indicator--active",
            index === currentIndex
        );
    });
}

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    renderCarousel(slides);
}

function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderCarousel(slides);
}

const nextButton = document.querySelector(".proposals-carousel__button--right");
const prevButton = document.querySelector(".proposals-carousel__button--left");
const indicators = document.querySelectorAll(".proposals-carousel__indicator");

nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showPrevSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentIndex = index;
        renderCarousel(slides);
    });
});

renderCarousel(slides);

window.addEventListener("resize", () => renderCarousel(slides));



activateCarousel.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const slideIndex = parseInt(item.getAttribute("data-slide-index"), 10);
        currentIndex = slideIndex;
        renderCarousel(slides);
        myDialogProposals.showModal();
        document.body.style.overflow = "hidden";

    });
});

// proposals__item - link


closeButtonProposals.addEventListener("click", () => {
    myDialogProposals.close();
    document.body.style.overflow = "auto";
});