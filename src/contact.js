import "./styles.css";
import { initLanguage, setLanguage } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFooter } from "./footer.js";

// Expose setLanguage globally for lang-switcher button onclick handlers
window.setLanguage = setLanguage;

initNav();
initFooter();
initLanguage().then(() => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("is-hidden");
  loader.addEventListener("transitionend", () => loader.remove(), { once: true });
});

// ── Contact form ──────────────────────────────────────────
// Replace YOUR_FORM_ID with the ID from your Formspree dashboard.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvzqoje";

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const contact = form.querySelector('[name="contact"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !contact || !message) return;

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.querySelector(".contact-form-success").hidden = false;
        form.reset();
      } else {
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.disabled = false;
    }
  });
}
