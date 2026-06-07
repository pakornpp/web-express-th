/**
 * Shared navigation module.
 * @param {string} base   - Path to index.html from current page ("" same-page anchor, "index.html" for root pages).
 * @param {string} prefix - Path prefix to root dir ("" for root pages, "../" for one level deep).
 */
export function initNav(base = "", prefix = "") {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const homeHref = `${prefix}${base || "index.html"}`;
  const pricingHref = base ? `${prefix}${base}#pricing` : "#pricing";

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="${homeHref}" class="logo-container">
        <span class="logo-name">Web<span class="gradient-text">Express</span><sup>TH</sup></span>
      </a>
      <div class="nav-menu" id="nav-menu">
        <a href="${homeHref}" data-i18n="nav.home">Home</a>
        <a href="${pricingHref}" data-i18n="nav.pricing">Pricing</a>
        <a href="${prefix}blog.html" data-i18n="nav.blog">Blog</a>
        <a href="${prefix}contact.html" data-i18n="nav.contact">Contact</a>
        <a href="${prefix}about.html" data-i18n="nav.about">About</a>
      </div>
      <div class="lang-switcher">
        <button data-lang-btn="en" onclick="window.setLanguage('en')">EN</button>
        <button data-lang-btn="th" onclick="window.setLanguage('th')">ไทย</button>
      </div>
      <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="nav-menu"
        aria-label="Toggle navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  const toggle = nav.querySelector(".mobile-menu-toggle");
  const menu = nav.querySelector(".nav-menu");
  const mq = window.matchMedia("(max-width: 720px)");

  function closeMobileMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mq.matches) closeMobileMenu();
    });
  });

  mq.addEventListener("change", (e) => {
    if (!e.matches) closeMobileMenu();
  });
}
