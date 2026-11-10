# SPECTER: адвокатская практика

Демонстрационный сайт вымышленного адвоката Харви Спектра.  Имя, услуги, контакты и офис используются как демонстрационные данные. Фотографии изображают стоковых моделей.

## Стек

- Astro 7 со статической генерацией HTML.
- TypeScript со строгой проверкой типов.
- Tailwind CSS 4 через официальный Vite-плагин.
- React через `@astrojs/react`; фильтр услуг в `PracticeAreas.tsx` показывает использование React island с `client:visible`.
- Montserrat Variable из локального npm-пакета; Google Fonts в браузере не используется.
- `@astrojs/sitemap` для карты сайта после задания домена.

Готовый UI-набор не используется. Компоненты и оформление находятся в проекте.

## Запуск

Нужен Node.js 24 или новее.

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Локальный адрес: http://127.0.0.1:4321.

```bash
npm run check
npm run build
npm run check:build
npm run preview -- --host 127.0.0.1
```

Готовый статический сайт находится в `dist/`. Его можно разместить на статическом хостинге. Сервер Node.js для опубликованного сайта не требуется. Для неизвестных адресов хостинг должен возвращать `404.html` со статусом 404.

## GitHub Pages

Настроен адрес проекта: `https://marselburdo.github.io/law-ltd/`.

Workflow `.github/workflows/pages.yml` выполняет `npm ci`, проверку типов, сборку и проверку ссылок, якорей, изображений, шрифтов и других локальных ресурсов. Pull request в `main` запускает проверки без публикации. Push в `main`, включая merge, запускает публикацию через GitHub Actions. Ручной запуск workflow публикует сайт только при выборе ветки `main`.

Перед первой публикацией:

1. Откройте [Settings → Pages](https://github.com/MarselBurdo/law-ltd/settings/pages).
2. В разделе Build and deployment выберите Source: **GitHub Actions**.
3. Отправьте эту ветку на GitHub и выполните merge в `main`.
4. Дождитесь успешного выполнения workflow **GitHub Pages** на вкладке Actions.

Отдельный токен или deploy-ключ не нужен: workflow использует встроенный `GITHUB_TOKEN`. GitHub Pages должен быть доступен для репозитория в рамках вашего тарифа. Сборка и публикация используют Node.js 24 и содержимое `dist/`.

Для локальной проверки адресов GitHub Pages:

```bash
SITE_URL=https://marselburdo.github.io BASE_PATH=/law-ltd/ npm run build
SITE_URL=https://marselburdo.github.io BASE_PATH=/law-ltd/ npm run check:build
SITE_URL=https://marselburdo.github.io BASE_PATH=/law-ltd/ npm run preview -- --host 127.0.0.1
```

Откройте `http://127.0.0.1:4321/law-ltd/`. Если порт занят локальным сервером, Astro выведет другой свободный порт.

`SITE_URL` задаёт домен, `BASE_PATH` задаёт подпапку сайта. В workflow они уже настроены для этого репозитория. Без `BASE_PATH` локальная сборка использует `/`. При смене домена или имени репозитория обновите эти значения в workflow. Все ссылки внутри проекта формируются через `src/lib/paths.ts`.

## Структура

```text
src/
  assets/                 # Исходники стоковых фото
  components/             # Шапка, контакты, подвал, React-фильтр
  data/site.ts            # Контакты, услуги, навигация, FAQ
  layouts/BaseLayout.astro # Общий HTML и метаданные
  lib/paths.ts            # Ссылки с учётом подпапки GitHub Pages
  pages/index.astro       # Главная страница
  pages/practice/[slug].astro # Шесть страниц услуг
  pages/robots.txt.ts     # Правила индексации
  pages/404.astro         # Страница ошибки
  styles/global.css      # Tailwind и оформление
.codex/                   # Заметки для Codex
.github/workflows/        # Проверки и публикация GitHub Pages
scripts/check-build.mjs   # Проверка ссылок и ресурсов сборки
```

## SEO и реальные данные

Основные тексты и все направления услуг присутствуют в исходном HTML. Для страниц услуг заданы отдельные title и description. Шаблон поддерживает canonical и Open Graph при наличии домена. Изображения на главной преобразуются в WebP с адаптивным `srcset`.

По умолчанию демоверсия закрыта от индексации через `robots.txt` и `meta robots`. Перед запуском реального сайта:

1. Замените имя, описание, контакты, услуги и демонстрационные фотографии.
2. В `src/data/site.ts` установите `isDemo: false` после замены данных.
3. Соберите с реальным доменом:

```bash
SITE_URL=https://your-domain.example npm run build
```

`SITE_URL` читается из окружения команды сборки. В production укажите настоящий домен. Тогда появятся canonical, Open Graph URL и sitemap. При сохранённом `isDemo: true` метатег `noindex` останется на всех страницах независимо от домена, в том числе после публикации на GitHub Pages.

Ссылки на телефон и почту используют вымышленные данные. Серверной формы, CRM и отправки заявок в проекте нет.

## Источники фотографий

Фотографии загружены локально с Unsplash. Условия: [Unsplash License](https://unsplash.com/license).

- [Портрет](https://images.unsplash.com/photo-1560250097-0b93528c311a): `src/assets/harvey-specter.jpg`.
- [Команда](https://images.unsplash.com/photo-1521737711867-e3b97375f902): `src/assets/team.jpg`.
- [Деловой квартал](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab): `public/images/new-york.jpg`.

Лицензия репозитория не заменяет условия использования сторонних фотографий и шрифта. Эти изображения служат иллюстрациями вымышленной практики.
