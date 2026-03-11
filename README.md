# MaxTall Portfolio Landing

Одностраничный лендинг-портфолио по ТЗ `ТЗ_Лендинг_MaxTall_v1.5_fixed.docx`.

## Что реализовано

- Семантическая структура: `header`, `main`, секции, `footer`
- 7 обязательных секций + блок принципов
- Фиксированный header с поведением hide/show при скролле
- Мобильное fullscreen-меню (гамбургер)
- RU/EN переключение через `assets/js/translations.js`
- Хранение выбранного языка в `localStorage`
- Preloader (первый визит через `sessionStorage`)
- Scroll progress bar
- Фильтр портфолио без перезагрузки
- Поддержка GSAP/ScrollTrigger/Flip (через CDN)
- Параллакс hero-объекта (vanilla-tilt + mousemove)
- Базовые SEO-файлы: `robots.txt`, `sitemap.xml`, meta/OG

## Структура

- `D:\CodexProjects\MaxTall-Portfolio\index.html`
- `D:\CodexProjects\MaxTall-Portfolio\assets\css\style.css`
- `D:\CodexProjects\MaxTall-Portfolio\assets\js\main.js`
- `D:\CodexProjects\MaxTall-Portfolio\assets\js\translations.js`
- `D:\CodexProjects\MaxTall-Portfolio\assets\img\logo-mt.svg`
- `D:\CodexProjects\MaxTall-Portfolio\assets\img\project-1.svg` ... `project-6.svg`
- `D:\CodexProjects\MaxTall-Portfolio\robots.txt`
- `D:\CodexProjects\MaxTall-Portfolio\sitemap.xml`

## Локальный запуск

Откройте `index.html` в браузере.

## Как обновлять контент

1. Основные тексты RU/EN: `assets/js/translations.js`
2. Статические ссылки (соцсети/почта): `index.html`
3. Логотип: заменить `assets/img/logo-mt.svg`
4. Превью проектов: заменить `assets/img/project-*.svg` на реальные изображения

## Деплой

Подходит для Netlify, Vercel, GitHub Pages или статического хостинга.

- Корень публикации: `D:\CodexProjects\MaxTall-Portfolio`
- Точка входа: `index.html`
