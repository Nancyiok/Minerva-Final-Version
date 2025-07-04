function init() {
    import("../global/lazy-loading.js");
    import("../global/header.js");
    import("./faq.js");
    import("./partners.js");
    import("./team-section-form-validation.js");   
    import("./proposals-modal.js")
}
const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});