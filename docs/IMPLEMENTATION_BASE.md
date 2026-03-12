# Implementation Base (from TZ v1.5)

Этот файл фиксирует, как требования ТЗ отражены в кодовой базе.

## 1) Структура страницы

- Header/Nav: `index.html` (`.site-header`)
- Hero: `index.html` (`#hero`)
- About: `index.html` (`#about`)
- Services: `index.html` (`#services`)
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
- Portfolio grid animations: `assets/js/main.js` (`setupGSAP`)
- Preloader + sessionStorage: `assets/js/main.js` (`runPreloader`)
- Counters, reveal, ripple, cursor: `assets/js/main.js`

## 4) SEO и служебные файлы

- Meta / OG tags: `index.html`
- Schema.org Person: `index.html`
- `robots.txt`: `robots.txt`
- `sitemap.xml`: `sitemap.xml`

## 5) Ассеты

- Логотип: `assets/img/logo-mt.svg` (из `Union.svg`)
- Превью проектов: `assets/img/cases/case-unidraft.jpg`, `assets/img/cases/case-yoola.jpg`, `assets/img/cases/case-sobran.jpg`, `assets/img/cases/case-ff15.jpg`
- Заголовочный шрифт: `assets/fonts/BKANT.TTF`

## 6) Что заменить на следующем шаге

1. При необходимости сконвертировать `case-*.jpg` в `WebP` и добавить fallback.
2. Уточнить финальные тексты RU/EN для Hero/About/Services/Projects.
3. При необходимости усилить анимации GSAP под референс.
