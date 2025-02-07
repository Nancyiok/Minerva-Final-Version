document.querySelectorAll(".accordion__button").forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        document.querySelectorAll(".accordion__button.active").forEach((activeButton) => {
            if (activeButton !== button) {
                activeButton.classList.remove("active");
                const activeContent = activeButton.nextElementSibling;
                activeContent.style.maxHeight = null;
            }
        });

        button.classList.toggle("active");
        content.style.maxHeight = button.classList.contains("active") 
            ? `${content.scrollHeight}px`
            : null;
    });
});
