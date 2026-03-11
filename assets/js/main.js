(function () {
  const state = {
    lang: "ru",
    lastScrollY: window.scrollY,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isTouch: window.matchMedia("(hover: none), (pointer: coarse)").matches
  };

  const refs = {
    html: document.documentElement,
    preloader: document.getElementById("preloader"),
    header: document.getElementById("site-header"),
    progressBar: document.getElementById("scroll-progress-bar"),
    burger: document.getElementById("burger"),
    mobileMenu: document.getElementById("mobile-menu"),
    langButtons: Array.from(document.querySelectorAll("[data-lang-btn]")),
    filterButtons: Array.from(document.querySelectorAll(".project-filters__btn")),
    projectGrid: document.getElementById("projects-grid"),
    projectCards: Array.from(document.querySelectorAll(".project-card")),
    cursor: document.getElementById("cursor"),
    heroMockup: document.getElementById("hero-mockup")
  };

  function runPreloader() {
    if (!refs.preloader) return;

    if (sessionStorage.getItem("preloader-seen") === "1" || state.reducedMotion) {
      refs.preloader.hidden = true;
      return;
    }

    refs.preloader.classList.add("is-running");
    setTimeout(() => {
      refs.preloader.classList.add("is-done");
      sessionStorage.setItem("preloader-seen", "1");
      setTimeout(() => {
        refs.preloader.hidden = true;
      }, 900);
    }, 900);
  }

  function updateMeta(langPack) {
    const title = document.getElementById("meta-title");
    const description = document.getElementById("meta-description");
    const ogTitle = document.getElementById("meta-og-title");
    const ogDescription = document.getElementById("meta-og-description");
    const ogLocale = document.getElementById("meta-og-locale");

    if (title) {
      title.textContent = langPack.meta_title;
      document.title = langPack.meta_title;
    }

    if (description) description.setAttribute("content", langPack.meta_description);
    if (ogTitle) ogTitle.setAttribute("content", langPack.meta_og_title);
    if (ogDescription) ogDescription.setAttribute("content", langPack.meta_og_description);
    if (ogLocale) ogLocale.setAttribute("content", langPack.meta_og_locale);
  }

  function applyLanguage(lang) {
    const translations = window.PORTFOLIO_TRANSLATIONS || {};
    const langPack = translations[lang];
    if (!langPack) return;

    state.lang = lang;
    refs.html.lang = lang;
    refs.html.dataset.lang = lang;
    localStorage.setItem("portfolio-lang", lang);

    refs.langButtons.forEach((button) => {
      const isActive = button.dataset.langBtn === lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key || !(key in langPack)) return;
      node.textContent = langPack[key];
    });

    updateMeta(langPack);
  }

  function setupLanguage() {
    const saved = localStorage.getItem("portfolio-lang");
    const initial = saved && ["ru", "en"].includes(saved) ? saved : "ru";

    refs.langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const next = button.dataset.langBtn;
        if (!next || next === state.lang) return;
        applyLanguage(next);
      });
    });

    applyLanguage(initial);
  }

  function toggleMenu(forceState) {
    if (!refs.mobileMenu || !refs.burger) return;

    const willOpen = typeof forceState === "boolean" ? forceState : refs.mobileMenu.hidden;
    refs.mobileMenu.hidden = !willOpen;
    refs.burger.setAttribute("aria-expanded", String(willOpen));
    document.body.classList.toggle("menu-open", willOpen);
  }

  function setupMenu() {
    if (!refs.burger || !refs.mobileMenu) return;

    refs.burger.addEventListener("click", () => {
      toggleMenu();
    });

    refs.mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });
  }

  function setupHeaderOnScroll() {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const isDown = currentY > state.lastScrollY;

        if (currentY > 120 && isDown) {
          refs.header?.classList.add("is-hidden");
        } else {
          refs.header?.classList.remove("is-hidden");
        }

        state.lastScrollY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupScrollProgress() {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight <= 0 ? 0 : (scrollTop / docHeight) * 100;
      if (refs.progressBar) refs.progressBar.style.width = `${percent}%`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function setupCursor() {
    if (!refs.cursor || state.isTouch) return;

    const interactive = "a, button, input, textarea, select, [role='button']";

    window.addEventListener("mousemove", (event) => {
      refs.cursor.style.left = `${event.clientX}px`;
      refs.cursor.style.top = `${event.clientY}px`;
      refs.cursor.classList.add("is-active");
    });

    document.querySelectorAll(interactive).forEach((node) => {
      node.addEventListener("mouseenter", () => refs.cursor.classList.add("is-hover"));
      node.addEventListener("mouseleave", () => refs.cursor.classList.remove("is-hover"));
    });
  }

  function setupButtonsRipple() {
    document.querySelectorAll(".button, .project-filters__btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        button.style.setProperty("--ripple-x", `${x}px`);
        button.style.setProperty("--ripple-y", `${y}px`);
        button.classList.remove("is-ripple");
        void button.offsetWidth;
        button.classList.add("is-ripple");
      });
    });
  }

  function setupCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const animate = (node) => {
      const target = Number(node.dataset.counter || "0");
      if (!target) return;
      const duration = state.reducedMotion ? 200 : 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        node.textContent = String(value);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          node.textContent = String(target);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.55 }
    );

    counters.forEach((node) => observer.observe(node));
  }

  function setupSimpleReveals() {
    const nodes = document.querySelectorAll(
      ".section-label, .section-title, .service-card, .step, .principle, .project-card, .contact__line, .contact__socials, .contact__channel"
    );

    nodes.forEach((node) => node.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  function setupGSAP() {
    if (typeof window.gsap === "undefined") return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if (!state.reducedMotion) {
      gsap.from("#hero h1, #hero .hero__subtitle", {
        y: 34,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12
      });

      gsap.from(".button--order", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
        ease: "power2.out"
      });

      gsap.to(".button--order", {
        scale: 1.02,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 82%"
          }
        });
      });

      gsap.from(".project-card", {
        opacity: 0,
        y: 18,
        rotateY: 15,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#projects-grid",
          start: "top 80%"
        }
      });
    }
  }

  function setupHeroParallax() {
    if (!refs.heroMockup) return;

    if (window.VanillaTilt && !state.reducedMotion) {
      window.VanillaTilt.init(refs.heroMockup, {
        max: 5,
        speed: 450,
        glare: false,
        reverse: true,
        scale: 1.01
      });
    }

    if (state.isTouch || state.reducedMotion) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const animate = () => {
      tx += (x - tx) * 0.08;
      ty += (y - ty) * 0.08;
      refs.heroMockup.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", (event) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x = ((event.clientX - cx) / cx) * 20;
      y = ((event.clientY - cy) / cy) * 14;
    });

    animate();
  }

  function setupPortfolioFilter() {
    if (!refs.filterButtons.length || !refs.projectCards.length) return;

    const hasGSAPFlip = Boolean(window.gsap && window.Flip);
    if (hasGSAPFlip) window.gsap.registerPlugin(window.Flip);

    refs.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        if (!filter) return;

        refs.filterButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));

        const flipState = hasGSAPFlip ? window.Flip.getState(refs.projectCards) : null;

        refs.projectCards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");
          const show = filter === "all" || categories.includes(filter);
          card.classList.toggle("is-hidden", !show);
        });

        if (hasGSAPFlip) {
          window.Flip.from(flipState, {
            duration: 0.45,
            ease: "power1.out",
            absolute: true,
            stagger: 0.03
          });
        }
      });
    });
  }

  function init() {
    runPreloader();
    setupLanguage();
    setupMenu();
    setupHeaderOnScroll();
    setupScrollProgress();
    setupCursor();
    setupButtonsRipple();
    setupCounters();
    setupSimpleReveals();
    setupGSAP();
    setupHeroParallax();
    setupPortfolioFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
