function init() {
    import("../../js/global/lazy-loading.js")
    import("./modal-window.js");
    import("../../js/global/header.js");
    import("./search-vacancies.js");
    import("../../../dist/drag-windows.js");
}
const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});