// ===== Helpers =====
function selectAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function setActiveNavLink(activeId) {
    selectAll(".nav-link").forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = href === `#${activeId}`;
        link.classList.toggle("is-active", isActive);
    });
}

// ===== Navbar active on scroll =====
function setupActiveSectionObserver() {
    const sections = selectAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            // On prend la section la plus visible
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;
            setActiveNavLink(visible.target.id);
        },
        { root: null, threshold: [0.25, 0.4, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
}

// ===== Reveal animation =====
function setupRevealOnScroll() {
    const elements = selectAll(".reveal");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.15 },
    );

    elements.forEach((el) => observer.observe(el));
}

// ===== Year footer =====
function setCurrentYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// ===== Mobile menu =====
function setupMobileMenu() {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!burgerBtn || !mobileMenu) return;

    function toggleMenu() {
        const isOpen = mobileMenu.style.display === "block";
        mobileMenu.style.display = isOpen ? "none" : "block";
        mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
    }

    burgerBtn.addEventListener("click", toggleMenu);

    // Ferme le menu au clic sur un lien
    selectAll(".mobile-menu__link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.style.display = "none";
            mobileMenu.setAttribute("aria-hidden", "true");
        });
    });

    // Ferme si on resize en desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 920) {
            mobileMenu.style.display = "none";
            mobileMenu.setAttribute("aria-hidden", "true");
        }
    });
}

// ===== Theme toggle (optionnel) =====
function setupThemeToggle() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;

    // Restaure le thème
    const savedTheme = localStorage.getItem("portfolioTheme");
    if (savedTheme === "light") document.body.classList.add("theme-light");

    function toggleTheme() {
        document.body.classList.toggle("theme-light");
        const isLight = document.body.classList.contains("theme-light");
        localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
    }

    btn.addEventListener("click", toggleTheme);
}

// ===== Contact form =====
function setupContactForm() {
    const form = document.getElementById("contactForm");
    const hint = document.getElementById("formHint");
    if (!form || !hint) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const endpoint = form.getAttribute("action");
        if (!endpoint || endpoint.includes("TON_ENDPOINT")) {
            hint.className = "form-hint is-error";
            hint.textContent =
                "Ajoute ton endpoint Formspree dans le formulaire pour activer l’envoi.";
            return;
        }

        hint.className = "form-hint";
        hint.textContent = "Envoi en cours...";

        const subjectInput = form.querySelector('input[name="_subject"]');
        const userSubject = subjectInput?.value.trim();

        const finalSubject = userSubject
            ? userSubject
            : "Nouveau message depuis le portfolio";

        const formData = new FormData(form);
        formData.set("_subject", finalSubject);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error("Formspree request failed");
            }

            hint.className = "form-hint is-success";
            hint.textContent =
                "Prise de contact envoyée ✅ Je vous répondrai dans les plus brefs délais.";
            form.reset();
        } catch (error) {
            hint.className = "form-hint is-error";
            hint.textContent =
                "Échec de l’envoi. Réessaie dans quelques instants.";
        }

        setTimeout(() => {
            hint.className = "form-hint";
            hint.textContent = "";
        }, 4500);
    });
}

function initApp() {
    setCurrentYear();
    setupActiveSectionObserver();
    setupRevealOnScroll();
    setupMobileMenu();
    setupThemeToggle();
    setupContactForm();
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", initApp);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        selectAll,
        setActiveNavLink,
        setupActiveSectionObserver,
        setupRevealOnScroll,
        setCurrentYear,
        setupMobileMenu,
        setupThemeToggle,
        setupContactForm,
        initApp,
    };
}
