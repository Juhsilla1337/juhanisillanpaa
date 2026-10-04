// ── KOMPONENTTIEN LATAUS ──────────────────────────────────────
async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res  = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error(`Komponentin lataus epäonnistui (${file}):`, err);
  }
}

async function initComponents() {
await loadComponent('#header-placeholder', 'components/header.html');
await loadComponent('#hero-placeholder',   'components/hero.html');
await loadComponent('#footer-placeholder', 'components/footer.html');
  initNav();
  initHero();
  initYear();
}

// ── NAVIGAATIO ────────────────────────────────────────────────
function initNav() {
  const btn   = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  // Hampurilaisvalikko
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Sulje kun linkkiä klikataan
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );

  // Sulje kun klikataan navin ulkopuolelle
  document.addEventListener('click', (e) => {
    if (!document.getElementById('site-nav').contains(e.target)) {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Aktiivinen sivu
  const current = location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

// ── HERO ──────────────────────────────────────────────────────
function initHero() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  // Näytä satunnainen slide
  const random = Math.floor(Math.random() * slides.length);
  slides[random].style.display = 'flex';
}

// ── VUOSILUKU ─────────────────────────────────────────────────
function initYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── KÄYNNISTYS ────────────────────────────────────────────────
initComponents();