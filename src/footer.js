/**
 * Shared footer module.
 * @param {string} prefix - Path prefix to root dir ("" for root pages, "../" for one level deep).
 */
export function initFooter(prefix = "") {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const year = new Date().getFullYear();
  const homeHref = `${prefix}index.html`;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="${homeHref}" class="footer-logo-link">
          <span class="logo-name">Web<span class="gradient-text">Express</span><sup>TH</sup></span>
        </a>
        <p class="footer-tagline" data-i18n="footer.tagline">ยกระดับธุรกิจของคุณบน โลกออนไลน์</p>
      </div>
      <p class="footer-copy">&copy; ${year} WebExpressTH. All rights reserved.</p>
    </div>
  `;
}
