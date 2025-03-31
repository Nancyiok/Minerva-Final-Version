function init() {
    import("../../js/global/header.js");
    import("./navigation-interview.js");
    import("../../js/global/lazy-loading.js")
    import("./calendar.js");
}
const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});
