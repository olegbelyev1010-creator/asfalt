# asfaltmoscow - Сайт асфальтирования

Сайт-визитка компании по асфальтированию в Москве.

## Установка и запуск

### Требования
- Node.js 18+ (рекомендуется 20+)
- npm или yarn

### Шаги установки

```bash
# 1. Перейти в папку frontend
cd frontend

# 2. Установить зависимости (используйте один из вариантов)
yarn install
# или
npm install

# 3. Запустить проект
yarn start
# или
npm start
```

Сайт откроется на http://localhost:3000

### Сборка для продакшена

```bash
cd frontend
yarn build
# или
npm run build
```

Готовые файлы будут в папке `frontend/build/`

## Структура проекта

```
frontend/
├── public/
│   ├── index.html          # Основной HTML с SEO мета-тегами
│   ├── robots.txt          # Файл для поисковых роботов
│   └── sitemap.xml         # Карта сайта
├── src/
│   ├── components/         # Компоненты React
│   │   ├── Header.jsx      # Шапка сайта с навигацией
│   │   ├── Hero.jsx        # Главный баннер
│   │   ├── Services.jsx    # Раздел услуг (6 видов)
│   │   ├── Advantages.jsx  # Преимущества компании
│   │   ├── Portfolio.jsx   # Портфолио (До/После)
│   │   ├── Calculator.jsx  # Калькулятор стоимости
│   │   ├── Testimonials.jsx# Отзывы клиентов
│   │   ├── ContactForm.jsx # Форма обратной связи
│   │   ├── Footer.jsx      # Подвал сайта
│   │   ├── FloatingButtons.jsx # Плавающие кнопки связи
│   │   ├── Logo.jsx        # SVG логотип
│   │   ├── SEO.jsx         # JSON-LD разметка для поисковиков
│   │   └── ui/             # UI компоненты (shadcn)
│   ├── data/
│   │   └── mock.js         # Данные сайта (контакты, услуги, портфолио)
│   ├── App.js              # Главный компонент
│   ├── App.css             # Стили приложения
│   ├── index.js            # Точка входа
│   └── index.css           # Глобальные стили + Tailwind
├── package.json            # Зависимости проекта
├── tailwind.config.js      # Настройки Tailwind CSS
├── craco.config.js         # Настройки сборки
└── postcss.config.js       # Настройки PostCSS
```

## Технологии

- **React 19** — UI фреймворк
- **Tailwind CSS 3** — стилизация
- **shadcn/ui** — UI компоненты
- **Framer Motion** — анимации
- **Lucide React** — иконки
- **AOS** — анимации при скролле

## Контакты на сайте

- Телефон: +7 (977) 992-84-55
- Email: asfaltkamen@gmail.com
- WhatsApp: 79779928455
- Telegram: +79779928455

## Изменение данных

Все данные сайта находятся в файле `frontend/src/data/mock.js`:
- Контакты компании
- Услуги и цены
- Портфолио (фото до/после)
- Отзывы клиентов
- Цены для калькулятора
