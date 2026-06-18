/* =========================================================
   Matchroom Brentwood Half — prototype interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Nav: shrink on scroll + mobile toggle ---------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    // progress bar
    const h = document.documentElement;
    const scrolled = (h.scrollTop || document.body.scrollTop);
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = pct + "%";
  };
  const progress = document.getElementById("scrollProgress");

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  // close mobile menu on link click
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Countdown ---------- */
  // Race day: 22 March 2026, 10:00. If that's already passed (e.g. viewing
  // later in the year), roll the countdown forward to the next edition so the
  // prototype always shows a live, positive countdown.
  function nextRaceDate() {
    const now = new Date();
    let year = 2026;
    let target = new Date(year, 2, 22, 10, 0, 0); // month is 0-indexed → 2 = March
    while (target.getTime() < now.getTime()) {
      year += 1;
      target = new Date(year, 2, 22, 10, 0, 0);
    }
    return target;
  }
  const raceDate = nextRaceDate();
  const cd = {
    days: document.querySelector('[data-cd="days"]'),
    hours: document.querySelector('[data-cd="hours"]'),
    mins: document.querySelector('[data-cd="mins"]'),
    secs: document.querySelector('[data-cd="secs"]'),
  };
  const pad = (n, len) => String(Math.max(0, n)).padStart(len, "0");

  function tickCountdown() {
    const diff = raceDate.getTime() - Date.now();
    if (diff <= 0) {
      cd.days.textContent = "000";
      cd.hours.textContent = cd.mins.textContent = cd.secs.textContent = "00";
      return;
    }
    const s = Math.floor(diff / 1000);
    cd.days.textContent = pad(Math.floor(s / 86400), 3);
    cd.hours.textContent = pad(Math.floor((s % 86400) / 3600), 2);
    cd.mins.textContent = pad(Math.floor((s % 3600) / 60), 2);
    cd.secs.textContent = pad(s % 60, 2);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = target * eased;
      el.textContent = prefix + val.toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveal + triggers ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Tag sections/cards for reveal
  const revealEls = document.querySelectorAll(
    ".section__head, .course__panel, .course__route li, .story__media, .story__copy, .gtile, .ccard, .tier, .ac, .finalcta .container"
  );
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 80 + "ms";
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");

          // stat counters
          if (e.target.matches(".stat__num")) animateCount(e.target);
          // elevation draw
          if (e.target.matches(".elevation")) e.target.classList.add("in");

          obs.unobserve(e.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => io.observe(el));
    document.querySelectorAll(".stat__num").forEach((el) => io.observe(el));
    document.querySelectorAll(".elevation").forEach((el) => io.observe(el));
  } else {
    // reduced motion / no IO: show everything, set final values
    revealEls.forEach((el) => el.classList.add("in"));
    document.querySelectorAll(".elevation").forEach((el) => el.classList.add("in"));
    document.querySelectorAll(".stat__num").forEach((el) => {
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      el.textContent =
        (el.dataset.prefix || "") +
        parseFloat(el.dataset.count).toFixed(decimals) +
        (el.dataset.suffix || "");
    });
  }

  /* ---------- Scrollspy: highlight active nav link ---------- */
  const sections = ["course", "story", "gallery", "charities", "faq"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const linkFor = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const link = linkFor[e.target.id];
          if (!link) return;
          if (e.isIntersecting) {
            Object.values(linkFor).forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Floating CTA: show after hero ---------- */
  const floatCta = document.getElementById("floatCta");
  const heroEl = document.getElementById("top");
  if ("IntersectionObserver" in window && floatCta && heroEl) {
    const ctaObs = new IntersectionObserver(
      (entries) => {
        // show the CTA once the hero is mostly out of view, hide again over the footer/enter
        floatCta.classList.toggle("show", !entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    );
    ctaObs.observe(heroEl);
  }

  /* ---------- Lightbox gallery ---------- */
  const tiles = Array.from(document.querySelectorAll(".gtile"));
  const lb = document.getElementById("lightbox");
  if (tiles.length && lb) {
    const lbImg = document.getElementById("lbImg");
    const lbCap = document.getElementById("lbCap");
    let current = 0;

    const show = (i) => {
      current = (i + tiles.length) % tiles.length;
      const img = tiles[current].querySelector("img");
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbCap.textContent = tiles[current].dataset.cap || "";
    };
    const open = (i) => { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };

    tiles.forEach((t, i) => t.addEventListener("click", () => open(i)));
    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", () => show(current - 1));
    document.getElementById("lbNext").addEventListener("click", () => show(current + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".ac__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const panel = item.querySelector(".ac__a");
      const isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : null;
    });
  });
})();
