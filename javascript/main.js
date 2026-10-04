// ==========================================================
// SIVUSTON JAVASCRIPT
// Juhani Sillanpää
// ==========================================================

// ==========================================================
// KOMPONENTTIEN LATAUS
// ==========================================================

async function loadComponent(selector, file) {
  const el = document.querySelector(selector);

  if (!el) return;

  try {
    const res = await fetch(file);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${file}`);
    }

    const html = await res.text();

    el.innerHTML = html;
  } catch (err) {
    console.error(`Komponentin lataus epäonnistui (${file}):`, err);
  }
}

// ==========================================================
// KOMPONENTTIEN ALUSTUS
// ==========================================================

async function initComponents() {
  await loadComponent("#header-placeholder", "/components/header.html");

  await loadComponent("#hero-placeholder", "/components/hero.html");

  await loadComponent("#footer-placeholder", "/components/footer.html");

  initNav();
  initHero();
  initYear();
}

// ==========================================================
// NAVIGAATIO
// ==========================================================

function initNav() {
  const btn = document.querySelector(".nav-toggle");

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

  // ── Sulje valikko navin ulkopuolelta klikattaessa ───────

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

  // Näytä satunnaisesti yksi hero-slide

  const random = Math.floor(Math.random() * slides.length);

  slides[random].style.display = "flex";
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
