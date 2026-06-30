import "../../styles.css";
import { initLanguage, setLanguage } from "../../i18n.js";
import { initNav } from "../../nav.js";
import { initFooter } from "../../footer.js";
import { initCtaBanner } from "../../cta-banner.js";

window.setLanguage = setLanguage;

initNav();
initCtaBanner();
initFooter();
initLanguage().then(() => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("is-hidden");
  loader.addEventListener("transitionend", () => loader.remove(), { once: true });
});
