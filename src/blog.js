import "./styles.css";
import { initLanguage, setLanguage } from "./i18n.js";
import { initNav } from "./nav.js";
import { initFooter } from "./footer.js";
import { initCtaBanner } from "./cta-banner.js";

window.setLanguage = setLanguage;

initNav("");
initFooter("");
initCtaBanner();
initLanguage().then(() => {
  const loader = document.getElementById("page-loader");
  loader.classList.add("is-hidden");
  loader.addEventListener("transitionend", () => loader.remove(), { once: true });
});

// Load all post metadata files from blog_posts/ and render cards sorted by date (newest first).
const metaCtx = import.meta.webpackContext("./blog_posts", {
  recursive: false,
  regExp: /\.json$/,
});

const posts = metaCtx
  .keys()
  .map((key) => {
    const slug = key.replace(/^\.\//, "").replace(/\.json$/, "");
    return { slug, ...metaCtx(key) };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const grid = document.getElementById("blog-grid");
if (grid) {
  grid.innerHTML = posts
    .map(
      (post) => `
    <article class="blog-card">
      <div class="blog-card-meta">
        <span class="blog-card-category">${post.category}</span>
        <time class="blog-card-date" datetime="${post.date}">${post.dateDisplay}</time>
      </div>
      <h2 class="blog-card-title">
        <a href="blog_posts/${post.slug}.html">${post.title}</a>
      </h2>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <a class="blog-card-link" href="blog_posts/${post.slug}.html">Read more →</a>
    </article>`
    )
    .join("");
}
