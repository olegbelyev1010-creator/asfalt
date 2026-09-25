// Mock data for asfaltmoskov website

export const companyInfo = {
  name: "asfaltmoscow",
  phone: "+7 (977) 992-84-55",
  phoneRaw: "79779928455",
  email: "asfaltkamen@gmail.com",
  address: "Москва, ул. Примерная, д. 1",
  workingHours: "Пн-Вс: 8:00 - 20:00",
  whatsapp: "79779928455",
  telegram: "+79779928455"
};

export const services = [
  {
    id: 1,
    title: "Асфальтирование дворов",
    description: "Качественное покрытие придомовых территорий с гарантией до 5 лет",
    price: "от 800 руб/м²",
    icon: "Home",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/vw1sujwx_IMG-20250904-WA0011.jpg",
    features: ["Подготовка основания", "Укладка асфальта", "Разметка парковки", "Гарантия качества"]
  },
  {
    id: 2,
    title: "Асфальтирование дорог",
    description: "Строительство и ремонт дорожных покрытий любой сложности",
    price: "от 1200 руб/м²",
    icon: "Route",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/769goo3l_Doroga5-BLcm6YR0.jpg",
    features: ["Выравнивание грунта", "Укладка подушки", "Асфальтирование", "Дорожная разметка"]
  },
  {
    id: 3,
    title: "Асфальтирование территорий",
    description: "Благоустройство промышленных и коммерческих площадок",
    price: "от 900 руб/м²",
    icon: "Building2",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/wgv22j72_Doroga14-N9BjTuoI.jpg",
    features: ["Проектирование", "Земляные работы", "Укладка покрытия", "Установка бордюров"]
  },
  {
    id: 4,
    title: "Ямочный ремонт",
    description: "Оперативное устранение дефектов дорожного покрытия",
    price: "от 500 руб/м²",
    icon: "Wrench",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/sef5ocq9_IMG-20250801-WA0028.jpg",
    features: ["Быстрый выезд", "Качественные материалы", "Аккуратная работа", "Доступные цены"]
  },
  {
    id: 5,
    title: "Укладка тротуарной плитки",
    description: "Красивые и долговечные пешеходные дорожки",
    price: "от 1500 руб/м²",
    icon: "Grid3x3",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/8i6ov6nf_UkladkaNew5-DYD59wmq.jpg",
    features: ["Дизайн-проект", "Подготовка основы", "Укладка плитки", "Герметизация швов"]
  },
  {
    id: 6,
    title: "Установка бордюров",
    description: "Монтаж дорожных и тротуарных бордюров",
    price: "от 350 руб/пог.м",
    icon: "Minus",
    image: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/s5790vmk_20250919_104422.jpg",
    features: ["Разметка территории", "Подготовка траншеи", "Установка на бетон", "Финишная отделка"]
  }
];

export const portfolio = [
  {
    id: 1,
    title: "Асфальтирование двора с тротуарной плиткой",
    location: "Москва",
    area: "150 м²",
    duration: "3 дня",
    beforeImage: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/w2pv8c2l_20250828_110634%282%29.jpg",
    afterImage: "https://customer-assets.emergentagent.com/job_paving-service/artifacts/wxjw7yyi_IMG-20250903-WA0011.jpg",
    year: "2024"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Алексей Петров",
    company: "ЖК Солнечный",
    rating: 5,
    text: "Отличная работа! Двор преобразился полностью. Работали быстро и качественно, убрали за собой весь мусор. Рекомендую!",
    date: "Декабрь 2024"
  },
  {
    id: 2,
    name: "Марина Сидорова",
    company: "ТЦ Мега",
    rating: 5,
    text: "Заказывали асфальтирование парковки. Все сделали в срок, цена соответствовала договору. Профессиональная команда.",
    date: "Ноябрь 2024"
  },
  {
    id: 3,
    name: "Дмитрий Иванов",
    company: "Промышленная компания",
    rating: 5,
    text: "Сотрудничаем уже второй год. Всегда выполняют работы качественно и в срок. Цены адекватные, материалы хорошие.",
    date: "Октябрь 2024"
  },
  {
    id: 4,
    name: "Ольга Николаева",
    company: "Частный сектор",
    rating: 5,
    text: "Делали подъезд к дому. Очень довольны результатом! Теперь никакой грязи и луж. Спасибо большое!",
    date: "Сентябрь 2024"
  }
];

export const calculatorPrices = {
  courtyard: 800,
  road: 1200,
  territory: 900,
  repair: 500,
  tiles: 1500,
  curbs: 350
};

export const advantages = [
  {
    id: 1,
    icon: "Shield",
    title: "Гарантия качества",
    description: "Официальная гарантия на все виды работ до 5 лет"
  },
  {
    id: 2,
    icon: "Clock",
    title: "Точные сроки",
    description: "Выполняем работы строго в оговоренные сроки"
  },
  {
    id: 3,
    icon: "Award",
    title: "Опыт 15 лет",
    description: "Более 500 успешно реализованных проектов"
  },
  {
    id: 4,
    icon: "Truck",
    title: "Своя техника",
    description: "Современное оборудование и спецтехника"
  },
  {
    id: 5,
    icon: "Users",
    title: "Опытная бригада",
    description: "Квалифицированные специалисты с опытом"
  },
  {
    id: 6,
    icon: "Calculator",
    title: "Прозрачные цены",
    description: "Точный расчет стоимости без скрытых платежей"
  }
];
