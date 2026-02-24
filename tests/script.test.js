const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

function loadApp(html = "") {
    const dom = new JSDOM(`<!doctype html><html><body>${html}</body></html>`, {
        url: "http://localhost",
    });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;
    global.FormData = dom.window.FormData;

    delete require.cache[require.resolve("../script.js")];
    return require("../script.js");
}

test("setActiveNavLink active uniquement le lien ciblé", () => {
    const app = loadApp(`
        <a class="nav-link" href="#home">Accueil</a>
        <a class="nav-link" href="#skills">Compétences</a>
        <a class="nav-link" href="#projects">Projets</a>
    `);

    app.setActiveNavLink("skills");

    const links = document.querySelectorAll(".nav-link");
    assert.equal(links[0].classList.contains("is-active"), false);
    assert.equal(links[1].classList.contains("is-active"), true);
    assert.equal(links[2].classList.contains("is-active"), false);
});

test("setCurrentYear met à jour le footer", () => {
    const app = loadApp(`<span id="year"></span>`);

    app.setCurrentYear();

    const currentYear = String(new Date().getFullYear());
    assert.equal(document.getElementById("year").textContent, currentYear);
});

test("setupThemeToggle restaure puis bascule le thème", () => {
    const app = loadApp(`<button id="themeToggleBtn" type="button">Thème</button>`);

    localStorage.setItem("portfolioTheme", "light");
    app.setupThemeToggle();

    assert.equal(document.body.classList.contains("theme-light"), true);

    document.getElementById("themeToggleBtn").click();
    assert.equal(document.body.classList.contains("theme-light"), false);
    assert.equal(localStorage.getItem("portfolioTheme"), "dark");
});

test("setupMobileMenu ouvre/ferme le menu et le ferme sur resize desktop", () => {
    const app = loadApp(`
        <button id="burgerBtn" type="button">☰</button>
        <div id="mobileMenu" class="mobile-menu" aria-hidden="true">
            <a class="mobile-menu__link" href="#home">Accueil</a>
        </div>
    `);

    app.setupMobileMenu();

    const burger = document.getElementById("burgerBtn");
    const menu = document.getElementById("mobileMenu");

    burger.click();
    assert.equal(menu.style.display, "block");
    assert.equal(menu.getAttribute("aria-hidden"), "false");

    burger.click();
    assert.equal(menu.style.display, "none");
    assert.equal(menu.getAttribute("aria-hidden"), "true");

    burger.click();
    Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 1024,
    });
    window.dispatchEvent(new window.Event("resize"));

    assert.equal(menu.style.display, "none");
    assert.equal(menu.getAttribute("aria-hidden"), "true");
});
