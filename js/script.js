/* ==========================================================================
   Ahmed Sayed Amroon - Portfolio Script
   One init function per feature, all started at the bottom.
   ========================================================================== */
(function () {
  "use strict";

  /* Helpers ---------------------------------------------------------------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* localStorage wrapper that never throws (private mode, blocked storage) */
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
    }
  };

  /* Theme: dark by default, light toggle, remembered ----------------------- */
  function initTheme() {
    const root = document.documentElement;
    const button = $("#themeToggle");
    const icon = $("#themeIcon use");

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      icon.setAttribute("href", theme === "dark" ? "#i-sun" : "#i-moon");
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    apply(storage.get("theme") === "light" ? "light" : "dark");

    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      storage.set("theme", next);
    });
  }

  /* Loader ----------------------------------------------------------------- */
  function initLoader() {
    const loader = $("#loader");
    const hide = () => loader.classList.add("is-hidden");
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
    setTimeout(hide, 3000); // safety net
  }

  /* Mobile menu ------------------------------------------------------------ */
  function initMobileMenu() {
    const button = $("#menuBtn");
    const nav = $("#nav");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      button.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    button.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    $$(".nav__link").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* Navbar blur, progress bar, back-to-top --------------------------------- */
  function initScrollEffects() {
    const header = $("#header");
    const progress = $("#progress");
    const toTop = $("#toTop");
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", y > 20);
      toTop.classList.toggle("is-visible", y > 600);
      progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });

    update();
  }

  /* Active navigation link ------------------------------------------------- */
  function initActiveNav() {
    const links = $$(".nav__link");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    $$("[data-section]").forEach((section) => observer.observe(section));
  }

  /* Scroll reveal ---------------------------------------------------------- */
  function initReveal() {
    if (!("IntersectionObserver" in window) || reducedMotion) return;
    document.documentElement.classList.add("js");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    $$(".reveal").forEach((item, i) => {
      item.style.transitionDelay = (i % 4) * 80 + "ms"; // small stagger
      observer.observe(item);
    });
  }

  /* Typing effect ---------------------------------------------------------- */
  function initTyping() {
    if (reducedMotion) return;
    const target = $("#typing");
    const roles = ["Junior Data Analyst", "Excel and Power Query", "Dashboard Builder", "Power BI Learner"];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    function tick() {
      const role = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      target.textContent = role.slice(0, charIndex);

      let delay = deleting ? 40 : 85;
      if (!deleting && charIndex === role.length) { deleting = true; delay = 1800; }
      else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }

    setTimeout(tick, 2200);
  }

  /* Footer year ------------------------------------------------------------ */
  function initYear() {
    $("#year").textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLoader();
    initMobileMenu();
    initScrollEffects();
    initActiveNav();
    initReveal();
    initTyping();
    initYear();
  });
})();
