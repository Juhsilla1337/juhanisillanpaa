// ==========================================================
// SIVUSTON JAVASCRIPT
// Juhani Sillanpää
// ==========================================================


// ==========================================================
// SIVUSTON JUURI
// ==========================================================

const SITE_ROOT = (() => {
  const path = window.location.pathname;
  if (path.includes("/juhanisillanpaa/")) {
    return "/juhanisillanpaa/";
  }
  return "/";
})();


// ==========================================================
// KOMPONENTTIEN LATAUS
// ==========================================================

async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const url = SITE_ROOT + file;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${url}`);
    }

    const html = await res.text();
    el.innerHTML = html;

    el.querySelectorAll("[href], [src]").forEach((element) => {
      const attribute = element.hasAttribute("href") ? "href" : "src";
      const value = element.getAttribute(attribute);

      if (!value) return;

      if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("//") ||
        value.startsWith("#") ||
        value.startsWith("mailto:") ||
        value.startsWith("tel:") ||
        value.startsWith("/")
      ) {
        return;
      }

      element.setAttribute(attribute, SITE_ROOT + value);
    });

  } catch (err) {
    console.error(`Komponentin lataus epäonnistui (${file}):`, err);
  }
}


// ==========================================================
// KOMPONENTTIEN ALUSTUS
// ==========================================================

async function initComponents() {

  await loadComponent("#header-placeholder", "components/header.html");
  await loadComponent("#hero-placeholder",   "components/hero.html");
  await loadComponent("#footer-placeholder", "components/footer.html");

  initNav();
  initHero();
  initYear();
  initLisaaNapit();
}


// ==========================================================
// NAVIGAATIO
// ==========================================================

function initNav() {

  const btn   = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  if (!btn || !links) return;

  // ── Hampurilaisvalikko ──────────────────────────────────
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // ── Sulje valikko linkkiä klikattaessa ──────────────────
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // ── Sulje valikko navin ulkopuolelta ─────────────────────
  const siteNav = document.getElementById("site-nav");
  if (siteNav) {
    document.addEventListener("click", (e) => {
      if (!siteNav.contains(e.target)) {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Aktiivinen sivu ─────────────────────────────────────
  const current =
    location.pathname.split("/").filter(Boolean).pop() || "index.html";

  links.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").filter(Boolean).pop();
    if (linkPage === current) {
      a.classList.add("active");
    }
  });
}


// ==========================================================
// HERO
// ==========================================================

function initHero() {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  const random = Math.floor(Math.random() * slides.length);
  slides[random].style.display = "flex";
}


// ==========================================================
// LUE LISÄÄ -NAPIT
// ==========================================================

function initLisaaNapit() {
  document.querySelectorAll(".lisaa-nappi").forEach((nappi) => {
    nappi.addEventListener("click", () => {
      const teksti = nappi.previousElementSibling;
      if (!teksti) return;
      const piilotettu = teksti.classList.toggle("lisaa-teksti--piilotettu");
      nappi.textContent = piilotettu ? "Lue lisää..." : "Näytä vähemmän";
    });
  });
}


// ==========================================================
// VUOSILUKU
// ==========================================================

function initYear() {
  const el = document.getElementById("current-year");
  if (!el) return;
  el.textContent = new Date().getFullYear();
}


// ==========================================================
// KÄYNNISTYS
// ==========================================================

initComponents();