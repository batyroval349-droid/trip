import type { AdminClientRecord } from '../types';

export const INITIAL_ADMIN_CLIENTS: AdminClientRecord[] = [
  {
    id: 'client-new-1',
    clientName: 'Михаил Тарасов',
    email: 'mikhail.travel@gmail.com',
    password: 'pass123',
    category: 'new',
    tierId: 'tier2',
    serviceName: {
      en: 'Personal Travel Planning ($290)',
      ru: 'Персональное планирование поездки ($290)'
    },
    priceUSD: 290,
    status: 'questionnaire_completed',
    questionnaire: {
      name: 'Михаил Тарасов',
      email: 'mikhail.travel@gmail.com',
      password: 'pass123',
      country: 'Казахстан, Алматы',
      travelDates: '10 ноября 2026',
      duration: '25 дней',
      travelersCount: 1,
      monthlyBudgetUSD: 1400,
      workSituation: 'Product Manager (B2B SaaS, Remote)',
      preferredCities: ['danang', 'nhatrang'],
      environmentPreference: 'beach',
      accommodationType: 'Апартаменты с 1 спальней у моря, современный ремонт, балкон',
      remoteWorkNeeds: 'Стабильный оптоволоконный интернет 100+ Мбит/с для Zoom звонков',
      coworkingNeeds: 'Да, нужен тихий коворкинг в шаговой доступности',
      transportationPreference: 'Аренда байка (Honda Air Blade) или такси Grab',
      climatePreference: 'Тепло, солнечно, близость к океану',
      longTermGoals: 'Тест-драйв жизни во Вьетнаме на 1 месяц перед долгосрочной зимовкой',
      priorities: 'Чистый пляж, коворкинг с генератором, безопасный район',
      concerns: 'Качество интернета при отключениях и сезон дождей в ноябре',
      additionalInfo: 'Люблю серфинг и утренний кофе с видом на море'
    },
    recommendedCityId: 'danang',
    recommendedCityWhy: {
      en: 'Da Nang offers the perfect balance of surf beach, reliable fiber Wi-Fi, and active nomad community.',
      ru: 'Дананг предлагает идеальный баланс между серф-пляжем Ми Кхе, надежным интернетом и дружелюбным комьюнити.'
    },
    overallFounderNote: {
      en: 'Mikhail, your travel plan is ready. Focus on An Thuong area for easy coworking and beach access.',
      ru: 'Михаил, подготовил для вас маршрут и подборку жилья в районе Ан Тхыонг. Коворкинги Enouvo и DNC идеально подходят для созвонов.'
    },
    userCurrentBudget: {
      accommodation: 450,
      food: 350,
      coworking: 110,
      transportation: 80,
      entertainment: 200
    },
    createdAt: '2026-09-03',
    updatedAt: '2026-09-03'
  },
  {
    id: 'client-active-1',
    clientName: 'Анна Соколова',
    email: 'anna.remote@example.com',
    password: 'pass123',
    category: 'active',
    tierId: 'tier3',
    serviceName: {
      en: 'Vietnam Relocation Planning ($490)',
      ru: 'Планирование релокации во Вьетнам ($490)'
    },
    priceUSD: 490,
    status: 'plan_ready',
    questionnaire: {
      name: 'Анна Соколова',
      email: 'anna.remote@example.com',
      password: 'pass123',
      country: 'Грузия, Тбилиси',
      travelDates: '15 октября 2026',
      duration: '6 месяцев',
      travelersCount: 2,
      monthlyBudgetUSD: 1800,
      workSituation: 'Senior UX Designer (US Remote Clients)',
      preferredCities: ['danang', 'hoian'],
      environmentPreference: 'beach',
      accommodationType: 'Modern 1BR or 2BR serviced apartment with ocean view or balcony',
      remoteWorkNeeds: 'High-speed fiber Wi-Fi, quiet work desk, backup 4G router',
      coworkingNeeds: 'Периодически, для смены обстановки 2-3 раза в неделю',
      transportationPreference: 'Пешком и такси Grab, байк водить не планирую',
      climatePreference: 'Мягкий морской климат, умеренная влажность',
      longTermGoals: 'Комфортная релокация на полгода для спокойной удаленной работы',
      priorities: 'Пешая доступность пляжа, безопасность района, развитая инфраструктура',
      concerns: 'Оформление долгосрочной аренды, депозит и банковские переводы',
      additionalInfo: 'Еду с мужем, он тоже работает удаленно'
    },
    recommendedCityId: 'danang',
    recommendedCityWhy: {
      en: 'Da Nang offers world-class beaches, modern serviced apartments, and reliable fiber infrastructure.',
      ru: 'Дананг идеально сочетает чистый пляж Ми Кхе, быстрый оптоволоконный интернет и развитую инфраструктуру для удаленной работы.'
    },
    overallFounderNote: {
      en: 'Anna, your relocation workspace is fully updated. We prioritized the My An district for walkable beach lifestyle.',
      ru: 'Анна, я обновил ваш персональный план релокации. Фокус сделан на районе Ми Ан — все в пешей доступности, тихие кофейни и пляж в 5 минутах.'
    },
    userCurrentBudget: {
      accommodation: 620,
      food: 480,
      coworking: 140,
      transportation: 90,
      entertainment: 250
    },
    createdAt: '2026-08-28',
    updatedAt: '2026-09-02'
  },
  {
    id: 'client-active-2',
    clientName: 'Дмитрий и Елена',
    email: 'dmitry.reloc@gmail.com',
    password: 'pass123',
    category: 'active',
    tierId: 'tier4',
    serviceName: {
      en: 'Relocation Concierge ($890)',
      ru: 'Консьерж-сопровождение релокации ($890)'
    },
    priceUSD: 890,
    status: 'research_in_progress',
    questionnaire: {
      name: 'Дмитрий и Елена',
      email: 'dmitry.reloc@gmail.com',
      password: 'pass123',
      country: 'Россия, Санкт-Петербург',
      travelDates: '1 декабря 2026',
      duration: '12 месяцев',
      travelersCount: 2,
      monthlyBudgetUSD: 2400,
      workSituation: 'IT Архитектор & Маркетинг-директор',
      preferredCities: ['nhatrang', 'danang'],
      environmentPreference: 'balanced',
      accommodationType: 'Просторные 2BR апартаменты в современном ЖК с бассейном и спортзалом',
      remoteWorkNeeds: 'Два независимых рабочих места, высокоскоростной интернет',
      coworkingNeeds: 'Нет, работаем в основном из апартаментов',
      transportationPreference: 'Аренда нового максискутера и Grab',
      climatePreference: 'Солнечно, тепло круглый год, развитый город',
      longTermGoals: 'Полноценный переезд на год с возможностью продления',
      priorities: 'Комфортное премиум-жилье, качественная медицина, европейские продукты',
      concerns: 'Визовые правила после 90 дней, поиск надежного риелтора без комиссии',
      additionalInfo: 'Требуется полное сопровождение основателя 1-на-1'
    },
    recommendedCityId: 'nhatrang',
    recommendedCityWhy: {
      en: 'Nha Trang provides year-round warm sea, top modern high-rises, and great expat infrastructure.',
      ru: 'Нячанг обеспечивает теплое море круглый год, отличные современные кондоминиумы и развитую инфраструктуру.'
    },
    overallFounderNote: {
      en: 'Dmitry & Elena, currently evaluating 3 premium residences along Tran Phu promenade.',
      ru: 'Дмитрий и Елена, сейчас провожу удаленный аудит 3 жилых комплексов вдоль Чан Фу. Добавил заметки по интернету и депозитам.'
    },
    userCurrentBudget: {
      accommodation: 850,
      food: 650,
      coworking: 0,
      transportation: 150,
      entertainment: 400
    },
    createdAt: '2026-08-25',
    updatedAt: '2026-09-01'
  },
  {
    id: 'client-completed-1',
    clientName: 'Сергей Ковалев',
    email: 'sergey.vietnam@gmail.com',
    password: 'pass123',
    category: 'completed',
    tierId: 'tier3',
    serviceName: {
      en: 'Vietnam Relocation Planning ($490)',
      ru: 'Планирование релокации во Вьетнам ($490)'
    },
    priceUSD: 490,
    status: 'completed',
    questionnaire: {
      name: 'Сергей Ковалев',
      email: 'sergey.vietnam@gmail.com',
      country: 'Армения, Ереван',
      travelDates: '1 мая 2026',
      duration: '4 месяца',
      travelersCount: 1,
      monthlyBudgetUSD: 1200,
      workSituation: 'Full-stack Developer',
      preferredCities: ['danang'],
      environmentPreference: 'beach',
      accommodationType: 'Студия в пешей доступности от моря',
      remoteWorkNeeds: '100 Мбит/с интернет, тишина',
      coworkingNeeds: 'Да',
      transportationPreference: 'Байк',
      climatePreference: 'Лето, море',
      longTermGoals: 'Удаленная работа у океана',
      priorities: 'Бюджет до $1200, коворкинг, пляж',
      concerns: 'Языковой барьер',
      additionalInfo: 'Все прошло отлично, живу в Дананге!'
    },
    recommendedCityId: 'danang',
    recommendedCityWhy: {
      en: 'Client successfully relocated to My An, Da Nang in May 2026.',
      ru: 'Клиент успешно релоцировался в район Ми Ан, Дананг в мае 2026 года.'
    },
    overallFounderNote: {
      en: 'Project successfully completed. Client settled in Da Nang.',
      ru: 'Проект успешно завершен. Сергей обустроился в Дананге, подключил оптоволокно и взял скутер в аренду.'
    },
    userCurrentBudget: {
      accommodation: 400,
      food: 350,
      coworking: 100,
      transportation: 70,
      entertainment: 150
    },
    createdAt: '2026-04-15',
    updatedAt: '2026-05-20'
  }
];
