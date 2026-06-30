import "./portfolio-ribbon.css";

/**
 * Shared portfolio ribbon module.
 * Injects the showcase ribbon content into a container element.
 * @param {HTMLElement} el - The ribbon container element.
 */
export function initPortfolioRibbon(el) {
  if (!el) return;
  el.innerHTML =
    "<span>Portfolio showcase by</span>" +
    '<a href="/" class="portfolio-ribbon__link">WebExpressTH</a>' +
    '<span class="portfolio-ribbon__sep">\u00b7</span>' +
    '<a href="/#contact" class="portfolio-ribbon__cta">Build yours \u2192</a>';
}
