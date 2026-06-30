/**
 * Shared footer module.
 * Links are root-absolute, so the same markup works from any page depth.
 */
export function initFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const year = new Date().getFullYear();
  const homeHref = "/";

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
