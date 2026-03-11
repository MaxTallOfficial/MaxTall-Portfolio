# Implementation Base (from TZ v1.5)

Этот файл фиксирует, как требования ТЗ отражены в кодовой базе.

## 1) Структура страницы

- Header/Nav: `index.html` (`.site-header`)
- Hero: `index.html` (`#hero`)
- About: `index.html` (`#about`)
- Services + Steps: `index.html` (`#services`)
- Principles: `index.html` (`#principles`)
- Portfolio: `index.html` (`#projects`)
- Contact CTA + socials + TG channel: `index.html` (`#contact`)
- Footer: `index.html` (`.site-footer`)

## 2) Дизайн-система

- Токены цветов и отступов: `assets/css/style.css` (`:root`)
- Типографика Inter, размеры H1/H2/body: `assets/css/style.css`
- Состояния кнопок (default/hover/active/focus): `assets/css/style.css`

## 3) JS-функции

- RU/EN переводы: `assets/js/translations.js`
- Применение переводов + localStorage: `assets/js/main.js` (`applyLanguage`)
- Header hide/show on scroll: `assets/js/main.js` (`setupHeaderOnScroll`)
- Mobile fullscreen menu: `assets/js/main.js` (`setupMenu`)
- Scroll progress bar: `assets/js/main.js` (`setupScrollProgress`)
- Portfolio filter (with GSAP Flip fallback): `assets/js/main.js` (`setupPortfolioFilter`)
- Preloader + sessionStorage: `assets/js/main.js` (`runPreloader`)
- Counters, reveal, ripple, cursor: `assets/js/main.js`

## 4) SEO и служебные файлы

- Meta / OG tags: `index.html`
- Schema.org Person: `index.html`
- `robots.txt`: `robots.txt`
- `sitemap.xml`: `sitemap.xml`

## 5) Ассеты

- Логотип: `assets/img/logo-mt.svg` (из `Union.svg`)
- Превью проектов: `assets/img/project-1.svg` ... `project-6.svg` (временные заглушки)

## 6) Что заменить на следующем шаге

1. Подставить реальные превью проектов (WebP + PNG fallback) вместо SVG-заглушек.
2. Уточнить финальные тексты RU/EN для Hero/About/Services.
3. Подставить финальные ссылки на конкретные кейсы Behance.
4. При необходимости усилить анимации GSAP под референс.
