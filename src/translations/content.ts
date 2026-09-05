import type { ClientProject, CityData, Neighborhood } from '../types';

export const CITIES_DATA: CityData[] = [
  {
    id: 'danang',
    name: { en: 'Da Nang', ru: 'Дананг' },
    tagline: {
      en: 'The ideal balance of pristine coastlines, modern infrastructure, and vibrant remote work community.',
      ru: 'Идеальный баланс чистого побережья, современной инфраструктуры и активного комьюнити удаленщиков.'
    },
    lifestyle: {
      en: 'Relaxed coastal lifestyle with surf beaches, clean air, high quality coffee shops, and low noise levels near My Khe.',
      ru: 'Расслабленный прибрежный стиль жизни с пляжами для сёрфинга, чистым воздухом, отличными кофейнями и тишиной около пляжа Ми Кхе.'
    },
    budgetRange: { en: '$1,100 – $1,800 / month', ru: '$1,100 – $1,800 / мес' },
    remoteWorkSetup: {
      en: 'Excellent fiber optics (100-300 Mbps), spacious laptop-friendly cafes, high-tech coworking hubs.',
      ru: 'Превосходный оптоволоконный интернет (100-300 Мбит/с), просторные кофейни для работы, современные коворкинги.'
    },
    beachAccess: { en: 'Immediate (5-10 min walk or ride)', ru: 'Прямой доступ (5-10 минут пешком или на байке)' },
    socialLife: {
      en: 'Welcoming active digital nomad groups, weekly meetups, sports & yoga communities.',
      ru: 'Дружелюбные сообщества цифровых кочевников, еженедельные встречи, спорт и йога.'
    },
    heroImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'hoian',
    name: { en: 'Hoi An', ru: 'Хойан' },
    tagline: {
      en: 'Charming UNESCO ancient town surrounded by lush paddy fields and serene An Bang beach.',
      ru: 'Атмосферный древний город ЮНЕСКО среди рисовых полей и спокойного пляжа Ан Банг.'
    },
    lifestyle: {
      en: 'Slow-paced, serene, bicycle-centric living focused on nature, artisan food, and heritage atmosphere.',
      ru: 'Спокойный, размеренный темп жизни, велосипедные прогулки, природа, ремесленная кухня и исторический колорит.'
    },
    budgetRange: { en: '$1,000 – $1,600 / month', ru: '$1,000 – $1,600 / мес' },
    remoteWorkSetup: {
      en: 'Reliable fiber internet in villas & cafes; peaceful environment for high-focus deep work.',
      ru: 'Надёжный интернет на виллах и в кафе; тишина для глубокой фокусировки и творческой работы.'
    },
    beachAccess: { en: 'An Bang & Ha My Beaches (10 min ride)', ru: 'Пляжи Ан Банг и Ха Мы (10 минут на байке)' },
    socialLife: {
      en: 'Intimate expat community, wellness workshops, organic food markets.',
      ru: 'Камерное сообщество экспатов, велнес-воркшопы, рынки органических продуктов.'
    },
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'saigon',
    name: { en: 'Ho Chi Minh City (Saigon)', ru: 'Хошимин (Сайгон)' },
    tagline: {
      en: 'Vietnam’s energetic economic capital featuring world-class dining, rooftop bars, and tech hubs.',
      ru: 'Динамичный мегаполис Вьетнама с ресторанами мирового уровня, руфтопами и технологическими хабами.'
    },
    lifestyle: {
      en: 'Fast-paced, vibrant, cosmopolitan experience with endless gastronomy and nightlife options.',
      ru: 'Высокий ритм, яркая космополитичная атмосфера, бесконечный выбор гастрономии и ночной жизни.'
    },
    budgetRange: { en: '$1,300 – $2,300 / month', ru: '$1,300 – $2,300 / мес' },
    remoteWorkSetup: {
      en: 'Tier-1 international infrastructure, 24/7 cafes, premium coworking networks.',
      ru: 'Инфраструктура мирового уровня, круглосуточные кафе, сети премиальных коворкингов.'
    },
    beachAccess: { en: 'None (2.5 hr drive to Vung Tau)', ru: 'Отсутствует (2.5 часа езды до Вунгтау)' },
    socialLife: {
      en: 'Massive international tech, startup, and creative founder networking scene.',
      ru: 'Огромное международное сообщество предпринимателей, стартаперов и IT-специалистов.'
    },
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'hanoi',
    name: { en: 'Hanoi', ru: 'Ханой' },
    tagline: {
      en: 'Cultural & political capital known for lakes, traditional alleyways, coffee culture, and seasonal weather.',
      ru: 'Культурная столица с озёрами, узкими улочками, уникальной кофейной культурой и 4 сезонами.'
    },
    lifestyle: {
      en: 'Authentic Vietnamese heritage lifestyle around West Lake (Tay Ho), rich arts and culinary traditions.',
      ru: 'Аутентичная культура вокруг Западного озера (Тай Хо), богатая история, искусство и кулинария.'
    },
    budgetRange: { en: '$1,100 – $1,900 / month', ru: '$1,100 – $1,900 / мес' },
    remoteWorkSetup: {
      en: 'Abundant specialty coffee shops with high-speed Wi-Fi, established expat hubs.',
      ru: 'Множество спешелти-кофеен с быстрым Wi-Fi, сложившиеся экспатские хабы.'
    },
    beachAccess: { en: 'None (2 hr drive to Halong Coast)', ru: 'Отсутствует (2 часа до побережья Халонг)' },
    socialLife: {
      en: 'Diverse creative expat groups, language exchanges, music & literary events.',
      ru: 'Разнообразные творческие сообщества, языковые клубы, музыкальные и культурные события.'
    },
    heroImage: 'https://images.unsplash.com/photo-1509030450996-93f2e3d84074?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'nhatrang',
    name: { en: 'Nha Trang', ru: 'Нячанг' },
    tagline: {
      en: 'Sun-drenched coastal bay featuring 6 km city beach, vibrant promenade, and affordable oceanfront living.',
      ru: 'Солнечный курортный город с 6-километровым пляжем, набережной и доступной арендой у моря.'
    },
    lifestyle: {
      en: 'Laid-back seaside living with year-round warmth, fresh seafood markets, diving spots, and seaside boardwalks.',
      ru: 'Размеренная жизнь у моря, тепло круглый год, рынки морепродуктов, дайвинг и прогулки по набережной.'
    },
    budgetRange: { en: '$850 – $1,500 / month', ru: '$850 – $1,500 / мес' },
    remoteWorkSetup: {
      en: 'Fiber internet standard in high-rise towers, growing collection of laptop-friendly cafes along Tran Phu.',
      ru: 'Оптоволоконный интернет в высотных кондоминиумах, сеть уютных кофеен для работы вдоль улицы Чан Фу.'
    },
    beachAccess: { en: 'Direct 2–5 min walk to Tran Phu city beach', ru: 'Прямой выход к пляжу Чан Фу (2–5 минут пешком)' },
    socialLife: {
      en: 'Active international and Russian expat community, watersports clubs, fitness and yoga centers.',
      ru: 'Активное международное и русскоязычное сообщество экспатов, водный спорт, фитнес и йога.'
    },
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80'
  }
];

export const NEIGHBORHOODS_DATA: Neighborhood[] = [
  {
    id: 'an_thuong',
    cityId: 'danang',
    name: 'An Thuong (My An)',
    tagline: {
      en: 'The primary digital nomad & expat beach neighborhood in Da Nang.',
      ru: 'Главный пляжный район для цифровых кочевников и экспатов в Дананге.'
    },
    description: {
      en: 'Highly walkable grid of streets filled with Western & local cafes, coworking spaces, gym facilities, and beach access within 3 minutes.',
      ru: 'Удобный для пеших прогулок район с европейскими и вьетнамскими кафе, коворкингами, спортзалами и пляжем в 3 минутах.'
    },
    scores: { budget: 3, beach: 5, quiet: 2, social: 5, remoteWork: 5 },
    highlights: {
      en: ['3-minute walk to My Khe Beach', 'Dense network of remote-work cafes', 'Walkable international community'],
      ru: ['3 минуты до пляжа Ми Кхе', 'Огромный выбор кофеен для работы', 'Развитое международное комьюнити']
    },
    founderNote: {
      en: 'An Thuong is my top recommended starting location if you want instant social connections, easy daily routines, and walkability to the beach without needing a scooter immediately.',
      ru: 'Ан Тхыонг — моя главная рекомендация для старта, если вам важны быстрые знакомства, пляж в пешей доступности и удобство без необходимости сразу брать байк.'
    }
  },
  {
    id: 'son_tra',
    cityId: 'danang',
    name: 'Son Tra (Man Thai / Phuoc My)',
    tagline: {
      en: 'Scenic, quieter coastal area closer to Son Tra Peninsula nature reserve.',
      ru: 'Живописный, более тихий прибрежный район рядом с заповедником Сон Тра.'
    },
    description: {
      en: 'Offers brand-new apartment buildings with ocean views, quieter nights, fresh seafood markets, and quick access to Monkey Mountain.',
      ru: 'Новые апартаменты с видом на океан, тихие вечера, рынки свежих морепродуктов и близость к Обезьяньей горе.'
    },
    scores: { budget: 2, beach: 4, quiet: 4, social: 3, remoteWork: 4 },
    highlights: {
      en: ['Modern high-rise apartments', 'Quieter atmosphere & mountain breeze', 'Great value for ocean views'],
      ru: ['Современные высотные апартаменты', 'Тихая атмосфера и горный бриз', 'Отличное соотношение цены и вида на море']
    },
    founderNote: {
      en: 'Son Tra is ideal if you value tranquility, scenic views, and slightly lower apartment rates while staying 5 minutes away from An Thuong.',
      ru: 'Сон Тра идеально подходит, если вы цените тишину, виды на океан и более доступную аренду в 5 минутах от тусовочного центра.'
    }
  },
  {
    id: 'an_bang',
    cityId: 'hoian',
    name: 'An Bang Beach Village',
    tagline: {
      en: 'Laid-back beach village vibe with boutique homestays and oceanfront cafes.',
      ru: 'Расслабленный пляжный посёлок с бутик-гестхаусами и кафе у самой воды.'
    },
    description: {
      en: 'Narrow village lanes lined with tropical villas, sunset bars, and organic eateries, located 15 minutes north of Hoi An Ancient Town.',
      ru: 'Узкие деревенские улочки с тропическими виллами, закатными барами и кафе органической кухни в 15 минутах от старого города.'
    },
    scores: { budget: 3, beach: 5, quiet: 4, social: 3, remoteWork: 3 },
    highlights: {
      en: ['Direct beachfront living', 'Sunset beach bars & sound of waves', 'Close-knit expat village feel'],
      ru: ['Проживание прямо у пляжа', 'Закатные бары у воды', 'Уютная атмосфера экспатской деревни']
    },
    founderNote: {
      en: 'An Bang is magical for creative work phases. Make sure to choose accommodation with dedicated indoor workspace for humid afternoons.',
      ru: 'Ан Банг идеален для творческих периодов работы. Обратите внимание на наличие удобного рабочего стола в помещении с кондиционером.'
    }
  },
  {
    id: 'thao_dien',
    cityId: 'saigon',
    name: 'Thao Dien (District 2, Saigon)',
    tagline: {
      en: 'The premier international green enclave of Ho Chi Minh City along the Saigon River.',
      ru: 'Премиальный зеленый международный район Хошимина вдоль реки Сайгон.'
    },
    description: {
      en: 'Luxurious leafy enclave filled with international bakeries, specialty coffee, craft breweries, art galleries, and high-end serviced apartments.',
      ru: 'Престижный зеленый район с международными пекарнями, спешелти-кофе, крафтовыми пивоварнями и апартаментами.'
    },
    scores: { budget: 5, beach: 1, quiet: 3, social: 5, remoteWork: 5 },
    highlights: {
      en: ['World-class dining & coworking', 'Green, pedestrian-friendly pockets', 'Vibrant global tech community'],
      ru: ['Рестораны и коворкинги мирового уровня', 'Зелёные пешеходные улицы', 'Активное международное IT-сообщество']
    },
    founderNote: {
      en: 'Thao Dien offers the absolute highest standard of international living in Vietnam, though budget expectations need to align with premium rates.',
      ru: 'Тао Диен предлагает высочайший уровень комфорта в Вьетнаме, однако бюджет на жильё здесь выше среднего по стране.'
    }
  },
  {
    id: 'tay_ho',
    cityId: 'hanoi',
    name: 'Tay Ho (West Lake, Hanoi)',
    tagline: {
      en: 'Scenic lakeside expat district renowned for coffee culture, art hubs, and dining.',
      ru: 'Живописный район вокруг Западного озера, известный своей кофейной культурой и искусством.'
    },
    description: {
      en: 'Surrounds Hanoi’s largest lake, offering lakefront cafes, rooftop views, cycling routes, and historic pagodas mixed with modern living.',
      ru: 'Расположен вокруг крупнейшего озера Ханоя: кафе у воды, виды с крыш, веломаршруты и пагоды рядом с современными домами.'
    },
    scores: { budget: 3, beach: 1, quiet: 3, social: 4, remoteWork: 4 },
    highlights: {
      en: ['Lakeside walks & cycling', 'Rich artisanal & cultural coffee scene', 'Established international community'],
      ru: ['Прогулки и велопрогулки у озера', 'Богатая культура кофеен', 'Сложившееся международное комьюнити']
    },
    founderNote: {
      en: 'Tay Ho is the clear choice for Hanoi relocations due to cleaner air near the lake and abundant remote-work cafes.',
      ru: 'Тай Хо — лучший выбор в Ханое благодаря более чистому воздуху у озера и огромному выбору кофеен для работы.'
    }
  }
];

export const DEMO_CLIENT_PROJECT: ClientProject = {
  id: 'proj_anna_2026',
  clientName: 'Anna S.',
  email: 'anna.remote@example.com',
  serviceName: {
    en: 'Vietnam Relocation Planning',
    ru: 'Планирование релокации во Вьетнам'
  },
  status: 'research_in_progress',
  progressPercent: 35,
  questionnaire: {
    name: 'Anna S.',
    email: 'anna.remote@example.com',
    country: 'Germany / Remote Worker',
    travelDates: 'October 15, 2026',
    duration: '6 months',
    travelersCount: 1,
    monthlyBudgetUSD: 1450,
    workSituation: 'Senior UX Designer (US Remote Clients)',
    preferredCities: ['Da Nang', 'Hoi An'],
    environmentPreference: 'beach',
    accommodationType: 'Modern 1BR serviced apartment with ocean view or balcony',
    remoteWorkNeeds: 'High-speed fiber Wi-Fi (100+ Mbps), quiet call environment',
    coworkingNeeds: 'Occasional flex desk access 2 days/week',
    transportationPreference: 'Grab rides & electric scooter rent',
    climatePreference: 'Warm, ocean breeze, low humidity if possible',
    longTermGoals: 'Test digital nomad life in SE Asia for 6-12 months',
    priorities: 'Beach proximity, high-speed Wi-Fi, safe neighborhood, active nomad community',
    concerns: 'Finding reliable internet, navigating local rental lease terms, currency conversion',
    additionalInfo: 'Prefers quiet evenings but wants easy access to cafes and workout spots.'
  },
  recommendedCityId: 'danang',
  recommendedCityWhy: {
    en: 'Based on your priority for beach access, high-speed internet for design work, and an active nomad community, Da Nang (specifically An Thuong & Son Tra) offers the best infrastructure, air quality, and price-to-quality ratio in Vietnam.',
    ru: 'Учитывая ваши приоритеты (близость к пляжу, высокоскоростной интернет для работы в UX/UI и активное сообщество кочевников), Дананг (районы Ан Тхыонг и Сон Тра) предлагает лучшую инфраструктуру и баланс цены и качества во Вьетнаме.'
  },
  recommendedNeighborhoodIds: ['an_thuong', 'son_tra'],
  recommendedStartingBudget: {
    accommodation: 500,
    food: 300,
    coworking: 100,
    transportation: 100,
    entertainment: 450
  },
  userCurrentBudget: {
    accommodation: 500,
    food: 300,
    coworking: 100,
    transportation: 100,
    entertainment: 450
  },
  roadmapTasks: [
    {
      id: 't1',
      phase: 'before_arrival',
      title: {
        en: 'Research accommodation options online',
        ru: 'Изучить варианты жилья онлайн'
      },
      description: {
        en: 'Review vetted housing platforms (Zalo groups, local portals, expat forums) using our Accommodation Guidance.',
        ru: 'Ознакомиться с проверенными онлайн-каналами поиска жилья на основе нашего гайда по жилью.'
      },
      completed: true,
      founderComment: {
        en: 'Look for listings in An Thuong or Phuoc My. Do not send deposits to unverified individual accounts.',
        ru: 'Обратите внимание на варианты в Ан Тхыонг или Фуок Ми. Не переводите задаток на личные счета без проверки.'
      }
    },
    {
      id: 't2',
      phase: 'before_arrival',
      title: {
        en: 'Prepare digital documentation & health insurance',
        ru: 'Подготовить цифровые документы и медицинскую страховку'
      },
      description: {
        en: 'Organize digital passport scans, international health insurance policy, and remote work credentials.',
        ru: 'Собрать цифровые копии паспорта, международную страховку и подтверждения удаленной работы.'
      },
      completed: true,
      founderComment: {
        en: 'Ensure your travel insurance covers SE Asia remote work duration.',
        ru: 'Убедитесь, что ваш полис покрывает весь период пребывания в ЮВА.'
      }
    },
    {
      id: 't3',
      phase: 'before_arrival',
      title: {
        en: 'Select preferred neighborhood & short-term base',
        ru: 'Выбрать приоритетный район и стартовое жильё'
      },
      description: {
        en: 'Book 3-5 days in a rated serviced hotel/apartment to serve as your base upon landing.',
        ru: 'Забронировать апарт-отель на первые 3-5 дней для комфортной адаптации по прилёту.'
      },
      completed: true
    },
    {
      id: 't4',
      phase: 'before_arrival',
      title: {
        en: 'Plan mobile SIM / eSIM connectivity setup',
        ru: 'Запланировать подключение SIM / eSIM'
      },
      description: {
        en: 'Compare Viettel & Vinaphone tourist/data packages for instant connectivity upon landing.',
        ru: 'Сделать выбор между дата-пакетами Viettel и Vinaphone для связи сразу в аэропорту.'
      },
      completed: false,
      founderComment: {
        en: 'I recommend ordering a Viettel eSIM online 48h prior to departure for seamless 4G data.',
        ru: 'Рекомендую оформить eSIM Viettel за 48 часов до вылета для стабильного 4G сразу по прибытии.'
      }
    },
    {
      id: 't5',
      phase: 'before_arrival',
      title: {
        en: 'Review remote airport transport options',
        ru: 'Изучить варианты вызова трансфера по прилёту'
      },
      description: {
        en: 'Download Grab app and configure international card for easy ride-hailing from Da Nang Airport.',
        ru: 'Установить приложение Grab и привязать карту для быстрого вызова такси из аэропорта.'
      },
      completed: false
    },
    {
      id: 't6',
      phase: 'week_of_arrival',
      title: {
        en: 'Activate high-speed mobile data & test local speed',
        ru: 'Активировать мобильный интернет и проверить скорость'
      },
      description: {
        en: 'Confirm 4G/5G signal in your neighborhood and set up mobile hotspot fallback.',
        ru: 'Проверить скорость 4G/5G в вашем районе и настроить резервную точку доступа.'
      },
      completed: false
    },
    {
      id: 't7',
      phase: 'week_of_arrival',
      title: {
        en: 'Explore neighborhood cafes & remote workspaces',
        ru: 'Изучить рабочие кофейни и коворкинги района'
      },
      description: {
        en: 'Visit 2-3 recommended cafes in An Thuong to test Wi-Fi speeds, noise levels, and seating ergonomics.',
        ru: 'Посетить 2-3 рекомендуемые кофейни в Ан Тхыонге для проверки Wi-Fi и удобства работы.'
      },
      completed: false,
      founderComment: {
        en: 'Try "Enouvo Space" or "Dng.Coffee" in An Thuong for solid Wi-Fi and power outlets.',
        ru: 'Попробуйте Enouvo Space или Dng.Coffee в Ан Тхыонге — там отличный Wi-Fi и розетки.'
      }
    },
    {
      id: 't8',
      phase: 'week_of_arrival',
      title: {
        en: 'Conduct online housing research for 1-6 month stay',
        ru: 'Провести онлайн-поиск варианта жилья на 1-6 месяцев'
      },
      description: {
        en: 'Apply our Accommodation Guidance checklist when messaging property managers online.',
        ru: 'Использовать чек-лист по жилью при переписке с управляющими объектов.'
      },
      completed: false
    },
    {
      id: 't9',
      phase: 'first_month',
      title: {
        en: 'Establish daily remote work & wellness routine',
        ru: 'Выстроить ежедневный рабочий и спортивный график'
      },
      description: {
        en: 'Set up your ergonomic home workspace, local grocery routine, and gym/yoga membership.',
        ru: 'Обустроить удобное рабочее место дома, найти рынки/супермаркеты и абонемент в спортзал.'
      },
      completed: false
    },
    {
      id: 't10',
      phase: 'first_month',
      title: {
        en: 'Review monthly actual budget vs initial model',
        ru: 'Сравнить фактические расходы с плановым бюджетом'
      },
      description: {
        en: 'Adjust your interactive budget sliders in this dashboard based on your first 3 weeks of real expenses.',
        ru: 'Скорректировать слайдеры бюджета в личном кабинете на основе расходов за первые 3 недели.'
      },
      completed: false
    }
  ],
  resources: [
    {
      id: 'res_zalo',
      title: { en: 'Zalo App (Official Local Messenger)', ru: 'Zalo App (Главный мессенджер Вьетнама)' },
      description: {
        en: 'Essential app used in Vietnam for communicating with apartment managers, local services, and shops.',
        ru: 'Основное приложение Вьетнама для связи с управляющими жилья, сервисами и доставкой.'
      },
      url: 'https://zalo.me',
      category: 'accommodation',
      founderNote: {
        en: 'Install before arrival. Local landlords communicate almost exclusively on Zalo rather than email.',
        ru: 'Установите до вылета. Владельцы объектов общаются преимущественно через Zalo.'
      }
    },
    {
      id: 'res_grab',
      title: { en: 'Grab Superapp (Rides & Food)', ru: 'Приложение Grab (Такси и Еда)' },
      description: {
        en: 'Primary ride-hailing (car/motorbike) and food delivery platform across major Vietnamese cities.',
        ru: 'Главный сервис заказа такси (авто/байк) и доставки еды во всех городах Вьетнама.'
      },
      url: 'https://www.grab.com/vn/',
      category: 'transport',
      founderNote: {
        en: 'Link your credit card before departing so you can book rides instantly at Da Nang airport.',
        ru: 'Привяжите карту до вылета для вызова такси сразу по прилёту в аэропорт.'
      }
    },
    {
      id: 'res_batdongsan',
      title: { en: 'Batdongsan Housing Portal', ru: 'Портал недвижимости Batdongsan' },
      description: {
        en: 'Vietnam’s largest real estate listing directory for accommodation research and price reference.',
        ru: 'Крупнейший портал объявлений недвижимости во Вьетнаме для анализа цен и вариантов.'
      },
      url: 'https://batdongsan.com.vn',
      category: 'accommodation',
      founderNote: {
        en: 'Use Chrome auto-translate to benchmark fair market monthly rental rates.',
        ru: 'Используйте переводчик в браузере для ориентира по рыночным ценам на аренду.'
      }
    },
    {
      id: 'res_esim',
      title: { en: 'Viettel Official Mobile & eSIM', ru: 'Официальный сайт Viettel (SIM / eSIM)' },
      description: {
        en: 'Vietnam’s largest telecommunications provider with nationwide 4G/5G coverage.',
        ru: 'Крупнейший провайдер связи во Вьетнаме с наилучшим покрытием 4G/5G.'
      },
      url: 'https://viettel.vn',
      category: 'internet',
      founderNote: {
        en: 'Viettel offers the most reliable connectivity in coastal areas and islands.',
        ru: 'Viettel обеспечивает самую стабильную связь на побережье и островах.'
      }
    }
  ],
  overallFounderNote: {
    en: 'Based on what you shared in your questionnaire about wanting a balance between beach access, quiet focus hours, and an active nomad community, Da Nang is the clear top match. I recommend focusing your accommodation research on An Thuong and Son Tra. Let’s connect on WhatsApp if you have questions while exploring your roadmap!',
    ru: 'На основе вашей анкеты (баланс между пляжем, тишиной для работы в UX и международным сообществом) Дананг — идеальный выбор. Рекомендую сосредоточить поиск жилья на районах Ан Тхыонг и Сон Тра. Пишите мне в WhatsApp/Telegram по любым вопросам!'
  },
  updatedAt: '2026-09-02'
};

export const UI_STRINGS = {
  en: {
    siteTitle: 'Vietnam Remote Travel & Relocation Concierge',
    siteSubtitle: '100% Remote Travel & Relocation Planning Workspace',
    badgeRemote: '100% Remote Advisory',
    navHome: 'Home',
    navWhyUs: 'Why Us',
    navPricing: 'Packages',
    navPreview: 'Dashboard Preview',
    navFAQ: 'FAQ',
    navQuestionnaire: 'Start Questionnaire',
    navDashboard: 'Client Workspace',
    navAdmin: 'Founder Admin',
    navConsultation: 'Consultation',
    navLogin: 'Log In',
    navWhatsApp: 'WhatsApp Founder',
    navTelegram: 'Telegram Founder',
    
    // Hero & Title Refinements
    heroTagline: 'Structure your relocation or long travel stay with remote human expertise.',
    heroHeadline: 'Relocate or Travel to Vietnam',
    heroSubhead: 'Get personalized city recommendations, remote accommodation guidance, interactive cost modeling, and step-by-step roadmaps inside your private workspace.',
    heroCtaPrimary: 'Book Consultation (60 Min • $50) →',
    heroCtaSecondary: 'Explore Client Workspace Demo',
    promoOfferBanner: '60-Minute Strategic Video Call in Zoom / Google Meet • $50',
    pricingRemoteNotice: '100% Remote Advisory Notice: All plans are delivered digitally into your client workspace. No physical meetups or real estate brokerage.',
    
    // Why Choose Us
    whyTitle: 'Why Choose Our Remote Concierge Service?',
    whySubhead: 'We replace weeks of chaotic web searches with structured human expertise and an interactive client workspace.',
    why1Title: 'Bespoke Human Expertise',
    why1Desc: 'No autogenerated AI templates. Every city matrix, budget scenario, and neighborhood match is researched directly by the founder for your specific situation.',
    why2Title: 'Interactive Client Workspace',
    why2Desc: 'Access a private dashboard with dynamic budget scenario sliders, customized relocation roadmaps with completion checkboxes, and founder notes.',
    why3Title: '100% Remote Efficiency',
    why3Desc: 'We guide your online accommodation research, landlord questions, contract red flags, and SIM/tech workflow setup before you even board your flight.',
    why4Title: 'Direct Founder Communication',
    why4Desc: 'Stay directly connected via WhatsApp or Telegram with the founder throughout your preparation and arrival phases.',

    // Pricing Tiers ($50 express tier 1)
    pricingTitle: 'Choose your relocation package',
    pricingSubhead: 'Bespoke planning created personally by the founder, delivered straight into your client dashboard.',
    tier1Title: 'Consultation: Should I Move to Vietnam?',
    tier1Price: '$50',
    tier1Badge: 'Strategy Call',
    tier1Desc: '60-minute strategic consultation: evaluate whether moving to Vietnam fits your goals, city selection, answers to key questions.',
    tier1Feat1: '60 minutes 1-on-1 personal video call',
    tier1Feat2: 'Relocation feasibility assessment tailored to your goals',
    tier1Feat3: 'Overview of suitable cities and seasons',
    tier1Feat4: 'Summary of recommendations following the call',
    tier1Feat5: 'Discount on Trip or Relocation package if purchased within 7 days',

    tier2Title: 'Personal Trip Planning',
    tier2Price: '$290',
    tier2Badge: '1–30 Day Route',
    tier2Desc: 'Personalized 1-30 day itinerary tailored to your dates and interests — without the risk of bad weather or wasting time.',
    tier2Feat1: 'Itinerary tailored to your dates and budget',
    tier2Feat2: 'City selection matched to your interests',
    tier2Feat3: 'SIM/eSIM recommendations & store locations',
    tier2Feat4: 'Direct WhatsApp support with us throughout your trip',
    tier2Feat5: '1 complimentary revision + emergency contacts list',
    tier2Feat6: 'Emergency contacts list (embassy, ambulance, 911 equivalent)',

    tier3Title: 'Vietnam Relocation Planning',
    tier3Price: '$490',
    tier3Badge: 'Recommended Choice',
    tier3Desc: 'Step-by-step relocation plan tailored to your budget and profile — instead of weeks of searching forums and groups.',
    tier3BonusPack: '🎁 $150 Bonus Pack: 2 contract audits + banking/crypto guide + coworking match included',
    tier3Feat1: 'Interactive budget calculator in your client dashboard',
    tier3Feat2: 'Real accommodation options from a verified local partner-realtor',
    tier3Feat3: 'Personalized checklist: documents, visas, timelines',
    tier3Feat4: 'Neighborhood & lifestyle infrastructure matching',
    tier3Feat5: 'Chat-based guidance & support — 1 month',
    tier3Feat6: 'Sanitary mold inspection & family balcony safety filter',

    tier4Title: 'VIP Relocation Concierge',
    tier4Price: '$890',
    tier4Badge: 'VIP Concierge',
    tier4Desc: 'Full support from initial preparation through your first month in Vietnam — you are never left alone during the most unstable period.',
    tier4Feat1: 'Everything included in the Relocation Planning package',
    tier4Feat2: 'Priority WhatsApp/Telegram communication',
    tier4Feat3: 'Personal housing viewing accompaniment via our partner-realtor',
    tier4Feat4: '1 month of budget & adaptation support after arrival',
    tier4Feat5: 'Assistance with urgent daily setup upon arrival',

    pricingRelocationDisclaimer: 'We advise on general visa workflow logic and are not immigration lawyers; final decisions on accommodation and lease contracts are made independently by the client.',
    pricingCTA: 'Select',

    // Dashboard Preview Section on Landing Page (Sentence Case Title!)
    previewTitle: 'Inside your personal client workspace',
    previewSubhead: 'See what you get after purchasing: an interactive dashboard created specifically for your transition.',
    previewBoxTitle: 'Client Workspace Demo (Anna S. • Da Nang, Vietnam)',
    previewStatusText: 'Personalized Plan Published',
    previewTab1: 'Relocation Roadmap',
    previewTab2: 'Budget Modeler',
    previewTab3: 'Neighborhood Matcher',
    previewTab4: 'Founder Notes',
    previewRoadmapTitle: 'Interactive Relocation Roadmap',
    previewRoadmapSubhead: 'Live checklist tailored to your arrival date, with specific founder advisory notes.',
    previewBtnOpen: 'Open Full Client Workspace Demo',

    // Process & Safety Shield Section (Replacing Housing Guidance)
    housingTitle: 'How to Find Suitable Housing Remotely in Vietnam',
    housingSubhead: 'Essential remote research strategies, key landlord questions, contract red flags, and deposit standards.',
    processBadge: 'Transparent Process & Due Diligence',
    processTitle: 'From Intake to Keys in Hand: 4-Step Process & Due Diligence Protocol',
    processSubhead: 'Searching for housing on your own in Asia frequently ends up costing $700–$1,500 more due to unreturned deposits, utility markups, and monsoon leases. We make every step transparent and every dollar invested pay for itself.',
    processStep1Badge: 'Day 1',
    processStep1Title: 'Deep Profile Audit & Season Selection',
    processStep1Desc: 'The founder personally analyzes your goals, budget, work format, and party size. We filter out non-season regions (typhoons in Central Vietnam or damp cold up north) and pinpoint the exact city and neighborhood.',
    processStep1Result: 'Access to private dashboard with bespoke roadmap & neighborhood matching.',
    processStep1Risk: 'Eliminates: wrong weather season & wasted flight/hotel tickets',
    processStep2Badge: 'Day 2–3',
    processStep2Title: 'Interactive Budget & Vetted Database',
    processStep2Desc: 'We model your monthly expense breakdown down to $50. We connect you with our verified local partner-realtor featuring real listings without tourist markups.',
    processStep2Result: 'Live budget model with dynamic sliders + shortlist of 3–5 vetted apartments with real video walk-throughs.',
    processStep2Risk: 'Eliminates: fake bait-and-switch listings and 20–30% tourist premiums',
    processStep3Badge: 'Day 4–5',
    processStep3Title: 'Technical, Sanitary & Contract Audit',
    processStep3Desc: 'We verify peak-hour Wi-Fi Speedtest, inspect premises for hidden black mold and construction noise within 100m, verify child balcony safety, and lock official EVN rates with deposit credit in the contract.',
    processStep3Result: 'Vetted bilingual contract template (VN/EN) with final-month rent deposit credit.',
    processStep3Risk: 'Mitigates: toxic mold, 6:30 AM jackhammers, and deposit forfeiture ($400–$900)',
    processStep4Badge: 'Arrival Day',
    processStep4Title: 'Check-in & 30-Day Soft Landing',
    processStep4Desc: 'We conduct a check-in inventory with photo documentation, provide vetted scooter rentals without passport retention, assist with police registration, and stay with you in chat.',
    processStep4Result: 'Keys in hand, lawful police registration, reliable Wi-Fi, and 30 days of founder concierge support in WhatsApp.',
    processStep4Risk: 'Eliminates: immigration fines, landlord disputes, and initial settling stress',
    shieldBadge: 'Due Diligence Protocol & Standards',
    shieldTitle: 'The Real Cost of Moving Solo: Cost of Mistakes vs Due Diligence',
    shieldIntro: 'Statistics show most expats lose between $800 and $1,800 on their first independent lease due to lack of local oversight. Our verified protocol mitigates up to 95% of these risks.',
    shieldRisk1Title: 'Deposit Forfeiture by Landlord',
    shieldRisk1Cost: '-$400 ... -$900',
    shieldRisk1Desc: 'Landlords retain security deposits claiming normal wear-and-tear or early move-out without clear protective clauses.',
    shieldRisk1Shield: 'Bilingual lease (VN/EN) with deposit credited towards the final month of rent.',
    shieldRisk2Title: 'Electricity Tariff Markups (EVN)',
    shieldRisk2Cost: '-$250 ... -$300 / 6 mo',
    shieldRisk2Desc: 'Landlords charge 4,500–5,000 VND/kWh instead of official EVN ~2,800 VND rates. Constant AC doubles this markup.',
    shieldRisk2Shield: 'Verified baseline meter readings and locked official rates in contract.',
    shieldRisk3Title: 'Hidden Construction, Mold or Monsoon',
    shieldRisk3Cost: '-$400 ... -$800',
    shieldRisk3Desc: 'Jackhammers at 6:30 AM or black mold in typhoon season. Forced sudden relocation and lost initial deposit.',
    shieldRisk3Shield: 'Acoustic neighborhood audit, sanitary mold inspection, and safe location matching.',
    shieldRisk4Title: 'Tourist Markup on Transport & Tech',
    shieldRisk4Cost: '-$150 ... -$250',
    shieldRisk4Desc: 'Inflated scooter rentals ($100/mo vs $55), expiring tourist SIMs, and costly e-visa MRZ string mistakes.',
    shieldRisk4Shield: 'Vetted rentals without passport holding & direct carrier SIM packages.',
    shieldSummaryLabel: 'FINAL FINANCIAL SAFETY BALANCE',
    shieldTotalRisk: 'Average total solo risk exposure: $1,200 – $2,250',
    shieldPackageCost: 'Investment in Relocation Plan: $490',
    shieldNetSavings: 'Net cash saved: $710 to $1,760 + stress eliminated',
    shieldCTA: 'Lock in Relocation ($490) →',
    shieldCallPrompt: 'Or start with a 60-min Strategy Call ($50) — fully credited towards the plan within 7 days',

    // Questionnaire
    qTitle: 'Client Relocation Intake Questionnaire',
    qSubhead: 'Tell us about your goals, timeline, work setup, and preferences so the founder can craft your personalized plan.',
    qName: 'Your Full Name',
    qEmail: 'Email Address',
    qPassword: 'Password for Client Workspace',
    qCountry: 'Current Country / Residency',
    qDates: 'Target Travel / Relocation Date',
    qDuration: 'Intended Stay Duration',
    qTravelers: 'Number of Travelers',
    qBudget: 'Target Monthly Living Budget (USD)',
    qWork: 'Remote Work Situation / Occupation',
    qCities: 'Preferred Vietnamese Cities',
    qEnvironment: 'Preferred Environment Vibe',
    qAccommodation: 'Accommodation Preferences & Must-Haves',
    qRemoteNeeds: 'Remote Work & Wi-Fi Requirements',
    qCoworking: 'Coworking Space Preferences',
    qTransport: 'Transportation Preference (Scooter / Grab / Walk)',
    qClimate: 'Climate & Weather Preferences',
    qGoals: 'Long-term Goals & Expectations',
    qPriorities: 'Top Priorities for Your Stay',
    qConcerns: 'Main Questions or Concerns',
    qAdditional: 'Additional Notes for the Founder',
    qSubmit: 'Submit Intake & Access Workspace',

    // Dashboard UI Overview Widgets
    dashWelcome: 'Welcome',
    dashStatusLabel: 'Project Status',
    dashProgressLabel: 'Completion Progress',
    dashTabOverview: 'Overview',
    dashTabCity: 'Recommended City',
    dashTabNeighborhoods: 'Neighborhoods',
    dashTabBudget: 'Your Monthly Budget',
    dashTabRoadmap: 'Relocation Roadmap',
    dashTabHousing: 'Accommodation Guidance',
    dashTabResources: 'Curated Resources',
    dashFounderNoteHeader: 'Founder’s Personal Note',
    dashContactFounder: 'Direct Contact with Founder',
    dashWorkspaceBadge: 'Personal Relocation Workspace',
    dashTargetArrival: 'Target Arrival',
    dashWhatsAppFounder: 'WhatsApp Founder',
    dashTelegramFounder: 'Telegram Founder',

    // Dashboard Overview Widgets
    widgetDestTitle: 'Destination Match',
    widgetDestDesc: 'Ideal balance of beach, remote cafes, and active nomad community.',
    widgetDestBtn: 'View City Details',

    widgetBudgetTitle: 'Monthly Budget Model',
    widgetBudgetRent: 'Rent',
    widgetBudgetFood: 'Food',
    widgetBudgetWork: 'Work',
    widgetBudgetBtn: 'Adjust Budget Sliders',

    widgetRoadmapTitle: 'Relocation Roadmap',
    widgetRoadmapTasks: 'Tasks',
    widgetRoadmapPhase1: 'Phase 1 (30 days before):',
    widgetRoadmapCompleted: 'completed',
    widgetRoadmapBtn: 'Open Roadmap Checklist',

    // Dashboard City View
    cityTopMatchBadge: 'Founder’s Top Match for You',
    cityBudgetLabel: 'Budget',
    cityBeachLabel: 'Beach',

    // Dashboard Budget View
    budgetBaselineBadge: 'Founder Baseline Recommendation',
    budgetBaselineTitle: 'Your Recommended Starting Budget',
    budgetBaselineSubhead: 'Based on your intake questionnaire for Da Nang / Hoi An remote living.',
    budgetPerMonth: 'month',
    budgetExploreTitle: 'Explore Different Budget Scenarios',
    budgetExploreSubhead: 'Adjust sliders to explore how your monthly expenses change if you upgrade housing or add coworking.',
    budgetResetBtn: 'Reset to Founder Baseline',
    budgetCurrentTotal: 'Current Modeled Monthly Total',
    budgetVndEquivalent: 'Estimated VND Equivalent',
    budgetSliderAccTitle: 'Accommodation (Rent & Utilities)',
    budgetSliderAccDesc: 'Serviced studio vs 1BR ocean view apartment',
    budgetSliderAccLow: '$400 (Cozy Studio)',
    budgetSliderAccMid: '$800 (1BR Ocean Front)',
    budgetSliderAccHigh: '$1,200 (Luxury Condo)',
    budgetSliderFoodTitle: 'Food & Dining Out',
    budgetSliderFoodDesc: 'Local Vietnamese cuisine vs Western cafes',
    budgetSliderWorkTitle: 'Coworking Membership',
    budgetSliderWorkDesc: 'Flex desk pass vs home office cafe working',
    budgetSliderTransTitle: 'Transportation',
    budgetSliderTransDesc: 'Scooter monthly rental + fuel or Grab rides',
    budgetSliderEntTitle: 'Entertainment, Gym & Misc',
    budgetSliderEntDesc: 'Gym/yoga membership, weekend trips, surfing',

    // Dashboard Roadmap View
    roadmapBadge: 'Founder Structured Plan',
    roadmapTitle: 'Your Relocation Roadmap',
    roadmapSubhead: 'Track your preparation steps below. Click checkboxes to update your completion status.',
    roadmapCompletedCounter: 'Tasks Completed',
    roadmapPhase1Title: 'Phase 1: 30 Days Before Arrival',
    roadmapPhase2Title: 'Phase 2: Week of Arrival',
    roadmapPhase3Title: 'Phase 3: First Month in Vietnam',
    roadmapTasksCompletedOf: 'of',
    roadmapTasksCompletedWord: 'Completed',

    // Dashboard Resources View
    resourcesBadge: 'Founder-Curated Resources & Links',
    resourcesTitle: 'Curated Resources & Essential Links',
    resourcesSubhead: 'Founder-recommended apps, portals, and tools specifically useful for Vietnam remote stays.',
    resourcesVisit: 'Visit',
    resourcesFounderTip: 'Founder Tip',
    resourcesCatAcc: 'Accommodation Guidance & Portals',
    resourcesCatTrans: 'Transportation & Mobility',
    resourcesCatInternet: 'SIM & High-Speed Internet',
    resourcesCatWork: 'Remote Work & Cafes',

    // City Comparison Matrix Labels
    cityWhyLabel: 'WHY THIS FITS YOUR QUESTIONNAIRE:',
    cityMatrixTitle: 'Vietnam Destinations Comparative Matrix',
    cityMatrixSubhead: 'Verified qualitative criteria curated directly by the founder to guide your decision.',
    cityBadgeFounder: 'Founder Controlled',
    colDestination: 'Destination',
    colLifestyle: 'Lifestyle & Environment',
    colBudget: 'Est. Monthly Budget',
    colRemoteWork: 'Remote Work Infrastructure',
    colBeach: 'Beach Access',
    colSocial: 'Social Scene',

    // Neighborhood View Labels
    neighRecTitle: 'Recommended Neighborhoods for You',
    badgeFounderMatched: 'Founder Matched',
    lblBeach: 'Beach',
    lblQuiet: 'Quiet',
    lblRemoteWork: 'Remote Work',
    lblFounderNote: 'Founder Note',
    explorerTitle: 'Interactive Neighborhood Explorer',
    explorerSubhead: 'Adjust parameters below to filter curated neighborhoods in Vietnam.',
    badgeCurated: 'Founder-Curated Dataset',
    sliderBeach: 'Min Beach Access',
    sliderQuiet: 'Min Quiet Vibe',
    sliderSocial: 'Min Social Scene',
    sliderWork: 'Min Remote Work',

    // Status Labels
    statusNew: 'New Order Received',
    statusQuestionnaireCompleted: 'Questionnaire Completed',
    statusResearchInProgress: 'Founder Research In Progress',
    statusPlanReady: 'Personalized Plan Published',
    statusInProgress: 'Plan In Progress & Interactive',
    statusCompleted: 'Relocation Completed',

    // Disclaimers
    disclaimerBudget: 'Estimated figures are for planning purposes only and may vary depending on location, lifestyle, season, and individual choices.',
    disclaimerHousing: 'All accommodation research and guidance is strictly advisory for online self-search. The founder does not physically inspect, verify, or act as an agent for any property.',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Is this an automated AI plan generator?',
    faq1A: 'No. Every plan is researched and structured personally by the founder following your questionnaire and communications. Automations are only used inside your dashboard to make your personalized roadmap interactive.',
    faq2Q: 'Does the founder physically check apartments or accompany my move?',
    faq2A: 'No. This is a 100% remote travel & relocation planning business. We provide online guidance, neighborhood research, contract checklists, and platform strategies. We do not conduct physical apartment viewings, property visits, or physical move accompaniment.',
    faq3Q: 'How do we communicate after booking?',
    faq3A: 'Primary communication takes place directly via WhatsApp or Telegram with the founder, combined with your personal interactive Client Dashboard.',
    faq4Q: 'Which cities in Vietnam do you cover?',
    faq4A: 'We specialize in Da Nang, Hoi An, Ho Chi Minh City (Saigon), Hanoi, and surrounding coastal remote worker destinations.',
    faq5Q: 'I purchased "Trip Planning" ($290) but decided to move permanently. Can I upgrade to Relocation?',
    faq5A: 'Yes. You only pay the difference up to $490 with a discount credited for the stage already completed. Contact us and we will calculate it individually.',
    faq6Q: 'My 1-month guidance under "Relocation Planning" is ending. Can I extend it?',
    faq6A: 'Yes, +1 month can be added with a separate payment (discounted compared to the initial package). Please contact us before your current month ends to avoid any interruption.',
    faq7Q: 'My 1-month VIP concierge following relocation has concluded. What next?',
    faq7A: 'You can extend VIP concierge support for another month with a separate payment — same logic: budget monitoring, priority chat support, and housing assistance continue.',
    faqDisclaimer: 'The client makes the final decision on accommodation and lease agreements independently — we provide expert guidance and recommendations, not a guarantee.',

    // Additional Services (Visible to everyone)
    servicesTitle: 'Additional Services',
    servicesSubhead: 'Modular standalone services available to everyone — with or without a full package purchase.',
    service1Title: 'Rental Listing & Contract Review',
    service1Price: '$10',
    service1Desc: 'Found an apartment yourself and want to verify terms before signing? Send us the listing or lease contract — we will point out key nuances and red flags.',
    service2Title: 'Schools & Kindergartens Consultation',
    service2Price: '$50–80',
    service2Desc: 'For families with children: overview of international schools in your chosen city, enrollment requirements, and tuition costs.',
    service3Title: 'Coworking & Neighborhood Match for Remote Work',
    service3Price: '$30–50',
    service3Desc: 'For remote workers and entrepreneurs: neighborhood and coworking matching your needs — stable fiber, quiet focus, and community.',
    service4Title: 'Banking, Cards & Crypto Guide',
    service4Price: '$20–30',
    service4Desc: 'Which banks work with foreigners, required documents; opening crypto wallets and cards, operational steps — based on personal experience, without legal or financial guarantees.',
    service5Title: 'Basic Vietnamese Survival Mini-Guide',
    service5Price: '$10–15',
    service5Desc: 'Key phrases and cultural etiquette for everyday situations — concise PDF guide.',
    serviceOrderBtn: 'Request Service',

    // Admin Panel Translations
    adminHeaderBadge: 'Founder Control Panel',
    adminHeaderTitle: 'Founder Admin Management Console',
    adminHeaderSubhead: 'Review client intake questionnaires, update project statuses, and publish custom recommendations.',
    adminProfileTitle: 'Client Profile & Intake Review',
    adminClientName: 'Client Name:',
    adminCurrentLoc: 'Current Location:',
    adminTargetDates: 'Target Dates & Stay:',
    adminMonthlyBudget: 'Target Monthly Budget:',
    adminWorkSituation: 'Work Situation:',
    adminPriorities: 'Priorities:',
    adminConcerns: 'Concerns:',
    adminEditTitle: 'Edit & Publish Plan Updates',
    adminStatusLabel: 'Project Status',
    adminCityLabel: 'Recommended Destination',
    adminRationaleLabel: 'City Rationale',
    adminNoteLabel: 'Overall Founder Note for Client',
    adminPublishBtn: 'Publish Plan Updates to Client',
    adminSuccessMsg: 'Plan Published to Client Workspace!',

    // Footer Translations
    footerBrandDesc: '100% Remote Travel & Relocation Concierge + Personal Client Workspace for Digital Nomads and Expats in Vietnam.',
    footerNavTitle: 'Quick Navigation',
    footerRuleTitle: 'Business Model Rule',
    footerRuleText: 'THIS IS A 100% REMOTE TRAVEL & RELOCATION PLANNING BUSINESS. We provide online guidance, neighborhood recommendations, accommodation research, and remote coordination. We do not physically meet clients, inspect apartments, visit properties, record apartment videos, physically accompany moves, act as realtors, or issue visas.',
    footerRights: 'All rights reserved.',
    footerAesthetics: 'Designed with Premium Editorial Aesthetics & Zero False Promises.',

    // Founder Auth & Access
    founderLoginTitle: 'Founder Management Console',
    founderLoginDesc: 'Enter founder credentials to access client management and plan publishing.',
    founderUsername: 'Login / Username',
    founderPassword: 'Password',
    founderLoginBtn: 'Sign In to Console',
    founderLogoutBtn: 'Sign Out',
    founderAuthError: 'Incorrect login or password. Please try again.',
    founderFooterLink: 'Founder Access',
    founderLoggedInBadge: 'Founder Online',
    clientWorkspaceUnlockedBadge: 'Client Access Active',

    // Express Booking ($50)
    expressFormTitle: 'Book 60-Minute Strategic Consultation ($50)',
    expressFormSubhead: 'Personal 1-on-1 video consultation with the founder. Register your client account to choose your time slot and access your workspace.',
    expressNameLabel: 'Full Name',
    expressMessengerLabel: 'WhatsApp or Telegram handle',
    expressEmailLabel: 'Email address (for meeting link & account login)',
    expressPasswordLabel: 'Create a password for your client workspace',
    expressTopicLabel: 'Inquiry details / What would you like to discuss?',
    expressTopicPlaceholder: 'e.g. Assess whether Vietnam is right for me, questions regarding cost of living, visa options, vacation vs long-term move, Da Nang vs Nha Trang...',
    expressDateLabel: 'Select Consultation Date',
    expressTimeLabel: 'Select Time Slot',
    expressPlatformNote: 'The video call will take place on Zoom or Google Meet. Meeting link and confirmation will be sent to your email, messenger, and saved in your personal client workspace.',
    expressSubmitBtn: 'Register & Book Consultation ($50)',
    expressConsultationBookedTitle: 'Your 60-Minute Consultation is Booked!',
    expressMeetingPlatformLabel: 'Video Call Platform',
    expressScheduledFor: 'Scheduled For',
    expressStatusConfirmed: 'Confirmed & Calendar Linked',

    // Client Authentication
    clientLoginTitle: 'Client Workspace Login',
    clientLoginDesc: 'Log in with your registered email and password to access your personalized consultation notes, budget models, and relocation roadmap.',
    clientEmail: 'Email Address',
    clientPassword: 'Password',
    clientLoginBtn: 'Log In to Workspace',
    clientLogoutBtn: 'Sign Out',
    clientAuthError: 'Invalid email or password. Please verify your details.',
    clientNoAccount: "Don't have an account yet? Book a consultation or choose a plan."
  },
  ru: {
    siteTitle: 'Vietnam Remote Travel & Relocation Concierge',
    siteSubtitle: '100% Удалённый Сервис Планирования Переезда и Путешествий во Вьетнам',
    badgeRemote: '100% Удалённый Консалтинг',
    navHome: 'Главная',
    navWhyUs: 'Чем мы лучше',
    navPricing: 'Тарифы',
    navPreview: 'Личный кабинет',
    navFAQ: 'Частые вопросы',
    navQuestionnaire: 'Заполнить анкету',
    navDashboard: 'Личный кабинет',
    navAdmin: 'Панель основателя',
    navConsultation: 'Консультация',
    navLogin: 'Войти',
    navWhatsApp: 'Написать в WhatsApp',
    navTelegram: 'Написать в Telegram',

    // Hero & Title Refinements
    heroTagline: 'Организуйте ваш переезд или путешествие с поддержкой реального эксперта.',
    heroHeadline: 'Переезд или путешествие во Вьетнам',
    heroSubhead: 'Получите персональные рекомендации по городам и районам, гайд по удаленному поиску жилья, интерактивный бюджет и пошаговый план прямо в вашем личном кабинете.',
    heroCtaPrimary: 'Записаться на консультацию (60 мин • $50) →',
    heroCtaSecondary: 'Посмотреть личный кабинет',
    promoOfferBanner: '60-минутная экспресс-встреча в Zoom / Google Meet • $50',
    pricingRemoteNotice: '100% Удалённый консалтинг: Все материалы и планы публикуются онлайн в вашем личном кабинете. Без физических встреч и риелторских услуг.',

    // Why Choose Us
    whyTitle: 'Чем наш сервис лучше обычных гайдов?',
    whySubhead: 'Мы заменяем недели хаотичного поиска структурированной экспертизой основателя и интерактивным кабинетом.',
    why1Title: 'Персональная экспертиза основателя',
    why1Desc: 'Никаких шаблонных ИИ-текстов. Каждое сравнение городов, бюджетный сценарий и район подбираются основателем лично под вашу ситуацию.',
    why2Title: 'Интерактивный личный кабинет',
    why2Desc: 'Вы получаете удобный кабинет с динамическими слайдерами бюджета, пошаговым чек-листом релокации и заметками эксперта.',
    why3Title: '100% Удаленная эффективность',
    why3Desc: 'Мы даем гайд по онлайн-поиску жилья, вопросам владельцам, красным флагам в договорах и настройке интернета до вашего вылета.',
    why4Title: 'Прямая связь с основателем',
    why4Desc: 'Вы общаетесь напрямую с основателем в WhatsApp или Telegram на протяжении всей подготовки и адаптации.',

    // Pricing Tiers (Sentence Case Title + Package Names Translated + 'Выбрать' Button)
    pricingTitle: 'Выберите тариф планирования',
    pricingSubhead: 'Персональная работа основателя, оформленная в удобном интерактивном кабинете.',
    tier1Title: 'Консультация «Стоит ли переезжать во Вьетнам»',
    tier1Price: '$50',
    tier1Badge: 'Стратегический звонок',
    tier1Desc: '60-минутная стратегическая консультация: оценка целесообразности переезда под ваши цели, выбор городов, ответы на главные вопросы.',
    tier1Feat1: '60 минут личной видео-встречи',
    tier1Feat2: 'Оценка целесообразности переезда под ваши цели',
    tier1Feat3: 'Обзор подходящих городов и сезонов',
    tier1Feat4: 'Резюме рекомендаций после звонка',
    tier1Feat5: 'Скидка на пакет планирования поездки или релокации при покупке за 7 дней',

    tier2Title: 'Персональное планирование поездки',
    tier2Price: '$290',
    tier2Badge: 'Маршрут 1–30 дней',
    tier2Desc: 'Персональный маршрут на 1-30 дней под ваши даты и интересы — без риска попасть не в сезон или потерять время на месте.',
    tier2Feat1: 'Маршрут под ваши даты и бюджет',
    tier2Feat2: 'Подбор городов под ваши интересы',
    tier2Feat3: 'Рекомендации по SIM/eSIM и адреса точек продажи',
    tier2Feat4: 'Связь с нами в WhatsApp на время поездки',
    tier2Feat5: '1 бесплатная корректировка маршрута и список экстренных служб',
    tier2Feat6: 'Список экстренных контактов (посольство, скорая, аналог 911)',

    tier3Title: 'Планирование релокации во Вьетнам',
    tier3Price: '$490',
    tier3Badge: 'Рекомендованный выбор',
    tier3Desc: 'Пошаговый план переезда под ваш бюджет и профиль — вместо недель самостоятельного поиска по чатам и форумам.',
    tier3BonusPack: '🎁 Бонус-пак на $150: аудит 2 договоров + гайд по банкам/крипте + подбор коворкингов',
    tier3Feat1: 'Интерактивный калькулятор бюджета в личном кабинете',
    tier3Feat2: 'Реальные варианты жилья от проверенного местного риелтора-партнёра',
    tier3Feat3: 'Персональный чек-лист: документы, визы, сроки',
    tier3Feat4: 'Подбор районов и инфраструктуры под ваш образ жизни',
    tier3Feat5: 'Поддержка и консультации в чате — 1 месяц',
    tier3Feat6: 'Санитарная проверка на плесень и детский фильтр безопасности',

    tier4Title: 'VIP-сопровождение релокации',
    tier4Price: '$890',
    tier4Badge: 'VIP-сопровождение',
    tier4Desc: 'Полное сопровождение от подготовки до первого месяца жизни во Вьетнаме — вы не остаётесь одни в самый нестабильный период.',
    tier4Feat1: 'Всё, что входит в пакет «Планирование релокации»',
    tier4Feat2: 'Приоритетная связь в WhatsApp и Telegram',
    tier4Feat3: 'Личное сопровождение показов жилья через нашего партнёра-риелтора',
    tier4Feat4: '1 месяц сопровождения по бюджету и адаптации после прилёта',
    tier4Feat5: 'Помощь в решении срочных бытовых вопросов по прилёту',

    pricingRelocationDisclaimer: 'Мы консультируем по общей логике визового процесса и не являемся визовыми юристами; решение по жилью и договору аренды принимает клиент самостоятельно.',
    pricingCTA: 'Выбрать',

    // Dashboard Preview Section on Landing Page (Sentence Case Title!)
    previewTitle: 'Как выглядит ваш личный кабинет',
    previewSubhead: 'Посмотрите, что получает клиент после оплаты: удобная интерактивная система, созданная лично под ваш переезд.',
    previewBoxTitle: 'Демонстрация личного кабинета (Анна С. • Дананг, Вьетнам)',
    previewStatusText: 'Персональный план опубликован',
    previewTab1: 'Дорожная карта',
    previewTab2: 'Слайдеры бюджета',
    previewTab3: 'Подбор районов',
    previewTab4: 'Заметки основателя',
    previewRoadmapTitle: 'Интерактивная дорожная карта переезда',
    previewRoadmapSubhead: 'Пошаговый чек-лист под дату вашего приезда с комментариями и советами основателя.',
    previewBtnOpen: 'Открыть демонстрацию личного кабинета',

    // Process & Safety Shield Section (Replacing Housing Guidance)
    housingTitle: 'Как найти подходящее жильё удалённо во Вьетнаме',
    housingSubhead: 'Стратегии онлайн-поиска, ключевые вопросы владельцам, красные флаги в договорах и стандарты депозитов.',
    processBadge: 'Прозрачный процесс и стандарты Due Diligence',
    processTitle: 'От первой анкеты до заселения: 4 шага работы и защита от скрытых расходов',
    processSubhead: 'Самостоятельный поиск жилья в Азии часто обходится на $700–$1,500 дороже из-за невозвратных депозитов, накруток на свет и аренды в сезон дождей. Мы сделали процесс прозрачным, а каждую вложенную сумму — окупаемой.',
    processStep1Badge: 'День 1',
    processStep1Title: 'Глубокий аудит и выбор сезона',
    processStep1Desc: 'Основатель лично разбирает ваши цели, бюджет, формат удаленки и состав семьи. Отсекаем несезонные регионы (сезон тайфунов в Дананге или сырой холод на севере) и выбираем точный город и район.',
    processStep1Result: 'Доступ в личный кабинет с персональной дорожной картой и анализом районов.',
    processStep1Risk: 'Исключает: ошибку с сезоном дождей и потерей билетов',
    processStep2Badge: 'День 2–3',
    processStep2Title: 'Интерактивный бюджет и база партнеров',
    processStep2Desc: 'Моделируем ежемесячную смету с точностью до $50. Подключаем проверенного местного риелтора-партнера с реальными объектами без накрутки «для туристов».',
    processStep2Result: 'Расчет бюджета со слайдерами + шорт-лист из 3–5 проверенных квартир с честным видео.',
    processStep2Risk: 'Исключает: фейковые объявления-приманки в соцсетях',
    processStep3Badge: 'День 4–5',
    processStep3Title: 'Технический, санитарный и юридический аудит',
    processStep3Desc: 'Замеряем Speedtest Wi-Fi в часы пик, инспектируем жилье на скрытую черную плесень и шум строек в радиусе 100 м, проверяем детскую безопасность балконов и фиксируем в договоре государственные тарифы EVN и зачет залога.',
    processStep3Result: 'Выверенный шаблон двуязычного контракта (VN/EN) с зачетом залога в последний месяц.',
    processStep3Risk: 'Предотвращает: скрытую плесень, шум строек в 6:30 и удержание депозита ($400–$900)',
    processStep4Badge: 'День прилёта',
    processStep4Title: 'Заселение и 30 дней поддержки',
    processStep4Desc: 'Инспектируем жилье по чек-листу при заезде, фиксируем состояние мебели, выдаем проверенные контакты байков без залога паспорта, помогаем с регистрацией в полиции и остаемся на связи в чате.',
    processStep4Result: 'Ключи на руках, легальная регистрация, надежный интернет и личный консьерж в WhatsApp.',
    processStep4Risk: 'Исключает: штрафы миграционной службы и бытовой стресс',
    shieldBadge: 'Протокол Due Diligence и стандарты безопасности',
    shieldTitle: 'Сколько стоит самостоятельный переезд: цена ошибок vs Сопровождение',
    shieldIntro: 'По статистике большинство экспатов при первой самостоятельной аренде во Вьетнаме теряют от $800 до $1,800 из-за отсутствия местного контроля. Наш регламент проверки снижает эти риски на 95%.',
    shieldRisk1Title: 'Невозврат депозита лендлордом',
    shieldRisk1Cost: '-$400 ... -$900',
    shieldRisk1Desc: 'Лендлорды удерживают залог за естественный износ или досрочный выезд, если в договоре нет правильного защитного пункта.',
    shieldRisk1Shield: 'Двуязычный договор (VN/EN) с фиксацией депозита в счет последнего месяца аренды.',
    shieldRisk2Title: 'Накрутка на электроэнергию (EVN)',
    shieldRisk2Cost: '-$250 ... -$300 / полгода',
    shieldRisk2Desc: 'Арендаторам выставляют 4,500–5,000 VND/кВт вместо официальных ~2,800 VND по шкале EVN. Кондиционер удваивает переплату.',
    shieldRisk2Shield: 'Фиксация показаний счетчика и государственного тарифа в договоре.',
    shieldRisk3Title: 'Шум стройки, черная плесень или сезон дождей',
    shieldRisk3Cost: '-$400 ... -$800',
    shieldRisk3Desc: 'Шум стройки с 6:30 утра или сырость в сезон тайфунов. Вынужденный съезд, бронь отеля и потеря первого депозита.',
    shieldRisk3Shield: 'Акустический аудит окружения, санитарная инспекция на плесень и подбор районов под сезон.',
    shieldRisk4Title: '«Налог новичка» на аренде и связи',
    shieldRisk4Cost: '-$150 ... -$250',
    shieldRisk4Desc: 'Завышенные цены на байки ($100/мес вместо $55), сгорающие сим-карты и ошибки при заполнении e-visa.',
    shieldRisk4Shield: 'Проверенные контакты без залога паспорта и официальные сим-карты.',
    shieldSummaryLabel: 'ИТОГОВЫЙ БАЛАНС ВАШЕЙ БЕЗОПАСНОСТИ',
    shieldTotalRisk: 'Суммарный средний риск ошибок соло: $1,200 – $2,250',
    shieldPackageCost: 'Стоимость тарифа «Планирование релокации»: $490',
    shieldNetSavings: 'Чистая финансовая экономия: от $710 до $1,760 + сохраненные нервы',
    shieldCTA: 'Зафиксировать сопровождение ($490) →',
    shieldCallPrompt: 'Или начните со стратегического созвона на 60 мин ($50) — зачтем сумму в стоимость пакета',

    // Questionnaire
    qTitle: 'Анкета клиента для планирования переезда',
    qSubhead: 'Расскажите о ваших целях, сроках, формате работы и пожеланиях, чтобы основатель сформировал ваш план.',
    qName: 'Ваше имя и фамилия',
    qEmail: 'Электронная почта',
    qPassword: 'Придумайте пароль для входа в кабинет',
    qCountry: 'Страна проживания / гражданство',
    qDates: 'Планируемая дата приезда',
    qDuration: 'Планируемая длительность пребывания',
    qTravelers: 'Количество путешественников',
    qBudget: 'Желаемый ежемесячный бюджет ($ USD)',
    qWork: 'Формат работы / специализация',
    qCities: 'Предпочитаемые города Вьетнама',
    qEnvironment: 'Предпочитаемая атмосфера (пляж / город / тишина)',
    qAccommodation: 'Пожелания по жилью и важные критерии',
    qRemoteNeeds: 'Требования к скорости интернета и рабочему месту',
    qCoworking: 'Нужен ли коворкинг',
    qTransport: 'Предпочитаемый транспорт (байк / такси Grab / пешком)',
    qClimate: 'Пожелания к климату',
    qGoals: 'Долгосрочные цели поездки',
    qPriorities: 'Главные приоритеты',
    qConcerns: 'Вопросы и беспокойства',
    qAdditional: 'Дополнительная информация для основателя',
    qSubmit: 'Отправить анкету и открыть кабинет',

    // Dashboard UI Overview Widgets
    dashWelcome: 'Добро пожаловать',
    dashStatusLabel: 'Статус проекта',
    dashProgressLabel: 'Прогресс подготовки',
    dashTabOverview: 'Обзор',
    dashTabCity: 'Рекомендованный город',
    dashTabNeighborhoods: 'Районы',
    dashTabBudget: 'Ваш бюджет',
    dashTabRoadmap: 'Дорожная карта',
    dashTabHousing: 'Гайд по поиску жилья',
    dashTabResources: 'Полезные ресурсы',
    dashFounderNoteHeader: 'Заметка основателя',
    dashContactFounder: 'Связаться с основателем',
    dashWorkspaceBadge: 'Личный кабинет релокации',
    dashTargetArrival: 'Планируемый приезд',
    dashWhatsAppFounder: 'Написать в WhatsApp',
    dashTelegramFounder: 'Написать в Telegram',

    // Dashboard Overview Widgets
    widgetDestTitle: 'Рекомендованный город',
    widgetDestDesc: 'Идеальный баланс пляжа, кофеен для работы и активного комьюнити.',
    widgetDestBtn: 'Детали города',

    widgetBudgetTitle: 'Модель ежемесячного бюджета',
    widgetBudgetRent: 'Аренда',
    widgetBudgetFood: 'Еда',
    widgetBudgetWork: 'Работа',
    widgetBudgetBtn: 'Настроить слайдеры',

    widgetRoadmapTitle: 'Дорожная карта релокации',
    widgetRoadmapTasks: 'Задач',
    widgetRoadmapPhase1: 'Этап 1 (за 30 дней):',
    widgetRoadmapCompleted: 'выполнено',
    widgetRoadmapBtn: 'Открыть карту',

    // Dashboard City View
    cityTopMatchBadge: 'Главная рекомендация основателя для вас',
    cityBudgetLabel: 'Бюджет',
    cityBeachLabel: 'Пляж',

    // Dashboard Budget View
    budgetBaselineBadge: 'Базовый ориентир основателя',
    budgetBaselineTitle: 'Рекомендованный стартовый бюджет',
    budgetBaselineSubhead: 'Рассчитан на основе вашей анкеты для удалённой жизни в Дананге и Хойане.',
    budgetPerMonth: 'мес',
    budgetExploreTitle: 'Сравнение сценариев бюджета',
    budgetExploreSubhead: 'Меняйте слайдеры, чтобы увидеть, как изменятся расходы при аренде виллы или выборе коворкинга.',
    budgetResetBtn: 'Сбросить к оценке основателя',
    budgetCurrentTotal: 'Текущий расчетный итог в месяц',
    budgetVndEquivalent: 'Эквивалент во вьетнамских донгах',
    budgetSliderAccTitle: 'Жильё (аренда и коммунальные)',
    budgetSliderAccDesc: 'Студия с сервисом или апартаменты 1BR с видом на море',
    budgetSliderAccLow: '$400 (Уютная студия)',
    budgetSliderAccMid: '$800 (1BR у пляжа)',
    budgetSliderAccHigh: '$1,200 (Премиум кондо)',
    budgetSliderFoodTitle: 'Питание и кафе',
    budgetSliderFoodDesc: 'Вьетнамская кухня и европейские кафе',
    budgetSliderWorkTitle: 'Коворкинг и рабочее место',
    budgetSliderWorkDesc: 'Абонемент в коворкинг или работа из дома и кофеен',
    budgetSliderTransTitle: 'Транспорт и передвижение',
    budgetSliderTransDesc: 'Аренда скутера + бензин или поездки на такси Grab',
    budgetSliderEntTitle: 'Развлечения, спорт и прочее',
    budgetSliderEntDesc: 'Абонемент в спортзал/йогу, поездки на выходные, сёрфинг',

    // Dashboard Roadmap View
    roadmapBadge: 'Персональный план основателя',
    roadmapTitle: 'Дорожная карта релокации',
    roadmapSubhead: 'Отслеживайте шаги подготовки. Отмечайте чек-боксы по мере выполнения задач.',
    roadmapCompletedCounter: 'Задач выполнено',
    roadmapPhase1Title: 'Этап 1: За 30 дней до приезда',
    roadmapPhase2Title: 'Этап 2: Неделя приезда',
    roadmapPhase3Title: 'Этап 3: Первый месяц во Вьетнаме',
    roadmapTasksCompletedOf: 'из',
    roadmapTasksCompletedWord: 'Выполнено',

    // Dashboard Resources View
    resourcesBadge: 'Проверенные ресурсы и ссылки',
    resourcesTitle: 'Полезные ресурсы и ссылки',
    resourcesSubhead: 'Рекомендованные основателем приложения, порталы и сервисы для удалёнщиков во Вьетнаме.',
    resourcesVisit: 'Открыть',
    resourcesFounderTip: 'Совет основателя',
    resourcesCatAcc: 'Поиск жилья и аренда',
    resourcesCatTrans: 'Транспорт и такси',
    resourcesCatInternet: 'Связь и скоростной интернет',
    resourcesCatWork: 'Коворкинги и кофейни для работы',

    // City Comparison Matrix Labels
    cityWhyLabel: 'ПОЧЕМУ ЭТО ПОДХОДИТ ПОД ВАШУ АНКЕТУ:',
    cityMatrixTitle: 'Сравнительная матрица городов Вьетнама',
    cityMatrixSubhead: 'Проверенные критерии, сформированные основателем под вашу поездку.',
    cityBadgeFounder: 'Экспертный анализ',
    colDestination: 'Город',
    colLifestyle: 'Атмосфера и стиль жизни',
    colBudget: 'Ориентир бюджета',
    colRemoteWork: 'Инфраструктура для работы',
    colBeach: 'Доступ к пляжу',
    colSocial: 'Комьюнити',

    // Neighborhood View Labels
    neighRecTitle: 'Рекомендованные районы для вас',
    badgeFounderMatched: 'Подбор основателя',
    lblBeach: 'Пляж',
    lblQuiet: 'Тишина',
    lblRemoteWork: 'Работа',
    lblFounderNote: 'Заметка основателя',
    explorerTitle: 'Интерактивный навигатор по районам',
    explorerSubhead: 'Настройте параметры ниже для фильтрации районов Вьетнама. Данные подготовлены основателем.',
    badgeCurated: 'База данных основателя',
    sliderBeach: 'Мин. доступ к пляжу',
    sliderQuiet: 'Мин. тишина',
    sliderSocial: 'Мин. общение',
    sliderWork: 'Мин. услов. работы',

    // Status Labels
    statusNew: 'Заказ получен',
    statusQuestionnaireCompleted: 'Анкета заполнена',
    statusResearchInProgress: 'Основатель проводит анализ',
    statusPlanReady: 'Персональный план опубликован',
    statusInProgress: 'План активен и изучается',
    statusCompleted: 'Проект завершён',

    // Disclaimers
    disclaimerBudget: 'Ориентировочные цифры приведены исключительно в целях планирования и могут варьироваться в зависимости от локации, сезона и личных предпочтений.',
    disclaimerHousing: 'Вся информация по жилью является исключительно консультационной для самостоятельного онлайн-поиска. Основатель не проводит очных просмотров, проверок и не выступает риелтором.',

    // FAQ
    faqTitle: 'Часто задаваемые вопросы',
    faq1Q: 'Это автоматический генератор от ИИ?',
    faq1A: 'Нет. Каждый план исследуется и составляется лично основателем на основе вашей анкеты и общения. Интерактивные элементы в кабинете предназначены для вашего удобства.',
    faq2Q: 'Проверяет ли основатель квартиры лично и встречается ли на месте?',
    faq2A: 'Нет. Это на 100% удалённый консалтинговый сервис. Мы предоставляем онлайн-стратегии, рекомендации по районам, чек-листы договоров и проверенные каналы поиска. Мы не проводим физических просмотров, видеосъемок объектов и не сопровождаем переезд очно.',
    faq3Q: 'Как проходит общение после оплаты?',
    faq3A: 'Основное общение происходит напрямую через WhatsApp или Telegram с основателем, плюс вся информация структурируется в вашем личном кабинете.',
    faq4Q: 'Какие города Вьетнама вы охватываете?',
    faq4A: 'Мы специализируемся на Дананге, Хойане, Хошимине (Сайгоне), Ханое и прибрежных локациях для удалёнщиков.',
    faq5Q: 'Я купил пакет "Планирование поездки" ($290), но решил переехать. Можно перейти на пакет релокации?',
    faq5A: 'Да. Доплачиваете разницу до $490 со скидкой за уже пройденный этап. Напишите нам — пересчитаем индивидуально.',
    faq6Q: 'Заканчивается месяц сопровождения по пакету "Планирование релокации". Можно продлить?',
    faq6A: 'Да, +1 месяц отдельной оплатой (дешевле изначального пакета). Пишите до окончания текущего месяца, чтобы не было перерыва.',
    faq7Q: 'Закончился месяц VIP-сопровождения после переезда. Что дальше?',
    faq7A: 'Можно продлить VIP-сопровождение ещё на месяц отдельной оплатой — та же логика: бюджет, приоритетная связь, помощь по жилью продолжаются.',
    faqDisclaimer: 'Итоговое решение по жилью и договору аренды принимает клиент самостоятельно — мы даём рекомендации, а не гарантию.',

    // Additional Services (Visible to everyone)
    servicesTitle: 'Дополнительные услуги',
    servicesSubhead: 'Отдельные точечные услуги, доступные всем — как с пакетом, так и без покупки основных тарифов.',
    service1Title: 'Разбор варианта жилья',
    service1Price: '$10',
    service1Desc: 'Нашли квартиру сами и хотите проверить условия перед подписанием? Присылаете договор/объявление — даём рекомендации, на что обратить внимание.',
    service2Title: 'Консультация по школам и садам',
    service2Price: '$50–80',
    service2Desc: 'Для семей с детьми: какие международные школы есть в выбранном городе, требования к зачислению, стоимость обучения.',
    service3Title: 'Подбор коворкинга/района под удалённую работу',
    service3Price: '$30–50',
    service3Desc: 'Для удалённых работников и предпринимателей: район и коворкинг под ваши требования — интернет, тишина, сообщество.',
    service4Title: 'Гид по банковскому счёту/карте и криптокошельку',
    service4Price: '$20–30',
    service4Desc: 'Какие банки работают с иностранцами, что нужно из документов; как открыть криптокошелёк и карту в нём, как пользоваться и совершать операции — на основе личного опыта, без юридических и финансовых гарантий.',
    service5Title: 'Мини-гайд по базовому вьетнамскому',
    service5Price: '$10–15',
    service5Desc: 'Ключевые фразы и этикет для повседневных ситуаций — короткий PDF-гайд.',
    serviceOrderBtn: 'Заказать услугу',

    // Admin Panel Translations
    adminHeaderBadge: 'Панель основателя',
    adminHeaderTitle: 'Панель управления проектами',
    adminHeaderSubhead: 'Анализ анкет клиентов, обновление статусов и публикация персональных планов.',
    adminProfileTitle: 'Анкета и профиль клиента',
    adminClientName: 'Имя клиента:',
    adminCurrentLoc: 'Локация:',
    adminTargetDates: 'Даты и срок:',
    adminMonthlyBudget: 'Бюджет в месяц:',
    adminWorkSituation: 'Формат работы:',
    adminPriorities: 'Приоритеты:',
    adminConcerns: 'Вопросы/Опасения:',
    adminEditTitle: 'Редактирование и публикация',
    adminStatusLabel: 'Статус проекта',
    adminCityLabel: 'Рекомендованный город',
    adminRationaleLabel: 'Обоснование выбора города',
    adminNoteLabel: 'Общая заметка основателя',
    adminPublishBtn: 'Опубликовать обновления клиенту',
    adminSuccessMsg: 'План опубликован в кабинете клиента!',

    // Footer Translations
    footerBrandDesc: '100% Удалённый консьерж-сервис планирования переезда и личный кабинет клиента во Вьетнаме.',
    footerNavTitle: 'Быстрая навигация',
    footerRuleTitle: 'Формат работы',
    footerRuleText: 'ЭТО НА 100% УДАЛЁННЫЙ КОНСАЛЬТИНГОВЫЙ СЕРВИС. Мы предоставляем онлайн-стратегии, рекомендации по районам, исследования рынка жилья и координацию. Мы не встречаем очно, не проводим физических проверок объектов, съемки квартир, не сопровождаем переезд очно, не выступаем риелторами и не выдаем визы.',
    footerRights: 'Все права защищены.',
    footerAesthetics: 'Разработано в премиальном стиле с абсолютной прозрачностью.',

    // Founder Auth & Access
    founderLoginTitle: 'Панель управления основателя',
    founderLoginDesc: 'Введите учетные данные для доступа к управлению проектами и публикации планов.',
    founderUsername: 'Логин',
    founderPassword: 'Пароль',
    founderLoginBtn: 'Войти в панель',
    founderLogoutBtn: 'Выйти',
    founderAuthError: 'Неверный логин или пароль. Попробуйте снова.',
    founderFooterLink: 'Вход для основателя',
    founderLoggedInBadge: 'Основатель онлайн',
    clientWorkspaceUnlockedBadge: 'Кабинет активен',

    // Express Booking ($50)
    expressFormTitle: 'Запись на 60-минутную экспресс-консультацию ($50)',
    expressFormSubhead: 'Личный звонок 1-на-1 с основателем. Зарегистрируйтесь, чтобы выбрать удобную дату, время и получить доступ в личный кабинет.',
    expressNameLabel: 'Имя и Фамилия',
    expressMessengerLabel: 'WhatsApp или Telegram (@ник / номер)',
    expressEmailLabel: 'Email (для ссылки на видеозвонок и входа в аккаунт)',
    expressPasswordLabel: 'Придумайте пароль для входа в личный кабинет',
    expressTopicLabel: 'Суть обращения / Что хотите обсудить?',
    expressTopicPlaceholder: 'Например: хочу понять, стоит ли переезжать во Вьетнам, вопросы по реальному бюджету, отпуск или зимовка, выбор между Данангом и Нячангом, визы...',
    expressDateLabel: 'Выберите удобную дату',
    expressTimeLabel: 'Выберите удобное время',
    expressPlatformNote: 'Звонок будет совершен в Zoom или Google Meet. Ссылка на видеовстречу и подтверждение придут на вашу почту, в мессенджер и сохранятся в вашем личном кабинете.',
    expressSubmitBtn: 'Зарегистрироваться на консультацию ($50)',
    expressConsultationBookedTitle: 'Ваша 60-минутная консультация запланирована!',
    expressMeetingPlatformLabel: 'Платформа видеосвязи',
    expressScheduledFor: 'Дата и время встречи',
    expressStatusConfirmed: 'Подтверждено и забронировано',

    // Client Authentication
    clientLoginTitle: 'Вход в личный кабинет',
    clientLoginDesc: 'Введите ваш email и пароль для доступа к деталям консультации, интерактивному бюджету и дорожной карте.',
    clientEmail: 'Email',
    clientPassword: 'Пароль',
    clientLoginBtn: 'Войти в кабинет',
    clientLogoutBtn: 'Выйти',
    clientAuthError: 'Неверный email или пароль. Пожалуйста, проверьте данные.',
    clientNoAccount: 'Еще нет аккаунта? Запишитесь на консультацию или выберите тариф.'
  }
};
