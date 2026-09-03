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
    navConsultation: 'Book Consultation ($50)',
    navLogin: 'Log In',
    navWhatsApp: 'WhatsApp Founder',
    navTelegram: 'Telegram Founder',
    
    // Hero & Title Refinements
    heroTagline: 'Structure your relocation or long travel stay with remote human expertise.',
    heroHeadline: 'Relocate or Travel to Vietnam',
    heroSubhead: 'Get personalized city recommendations, remote accommodation guidance, interactive cost modeling, and step-by-step roadmaps inside your private workspace.',
    heroCtaPrimary: 'Book Consultation (40 Min • $50) →',
    heroCtaSecondary: 'Explore Client Workspace Demo',
    promoOfferBanner: '40-Minute Strategic Video Call in Zoom / Google Meet • $50',
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
    tier1Title: 'Should I Move to Vietnam? (40 Min)',
    tier1Price: '$50',
    tier1Badge: 'Express Strategy',
    tier1Desc: '40-minute strategic video consultation: assess whether moving or traveling to Vietnam fits your budget and lifestyle.',
    tier1Feat1: '40-minute 1-on-1 strategic video call',
    tier1Feat2: 'Initial fit assessment for your goals',
    tier1Feat3: 'Key city & seasonal overview',
    tier1Feat4: 'Summary recommendation notes',

    tier2Title: 'Personal Travel Planning',
    tier2Price: '$290',
    tier2Badge: null,
    tier2Desc: 'Bespoke 1-30 day travel itinerary, client workspace, essential country guides, and WhatsApp founder support.',
    tier2Feat1: 'Personal Client Workspace access',
    tier2Feat2: 'Custom 1-30 day travel itinerary',
    tier2Feat3: 'Essential Vietnam regional & seasonal overview',
    tier2Feat4: 'SIM/eSIM & Grab transport workflow setup',
    tier2Feat5: 'WhatsApp direct founder consultation',

    tier3Title: 'Vietnam Relocation Planning',
    tier3Price: '$490',
    tier3Badge: 'Most Popular',
    tier3Desc: 'Full 100% Remote Relocation Package: custom client dashboard, neighborhood research, budget modeling, and interactive roadmap.',
    tier3Feat1: 'Bespoke Interactive Client Dashboard',
    tier3Feat2: 'Personalized City & Neighborhood Matching',
    tier3Feat3: 'Interactive Cost of Living & Budget Modeler',
    tier3Feat4: 'Personalized Relocation Roadmap with Checklist',
    tier3Feat5: 'Curated Accommodation Research & Resources',
    tier3Feat6: 'Founder Notes & Strategic Advisory',

    tier4Title: 'Relocation Concierge',
    tier4Price: '$890',
    tier4Badge: 'VIP Concierge',
    tier4Desc: 'VIP 1-on-1 remote concierge support prior to departure & throughout your first month in Vietnam.',
    tier4Feat1: 'Everything in Relocation Planning Package',
    tier4Feat2: 'Priority 1-on-1 WhatsApp/Telegram Concierge',
    tier4Feat3: 'Unlimited online housing search reviews prior to arrival',
    tier4Feat4: 'First-month local adjustment support & budget checks',

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

    // Housing Guidance Section
    housingTitle: 'How to Find Suitable Housing Remotely in Vietnam',
    housingSubhead: 'Essential remote research strategies, key landlord questions, contract red flags, and deposit standards.',

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
    expressFormTitle: 'Book 40-Minute Strategic Consultation ($50)',
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
    expressConsultationBookedTitle: 'Your 40-Minute Consultation is Booked!',
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
    navConsultation: 'Консультация ($50)',
    navLogin: 'Войти',
    navWhatsApp: 'Написать в WhatsApp',
    navTelegram: 'Написать в Telegram',

    // Hero & Title Refinements
    heroTagline: 'Организуйте ваш переезд или путешествие с поддержкой реального эксперта.',
    heroHeadline: 'Переезд или путешествие во Вьетнам',
    heroSubhead: 'Получите персональные рекомендации по городам и районам, гайд по удаленному поиску жилья, интерактивный бюджет и пошаговый план прямо в вашем личном кабинете.',
    heroCtaPrimary: 'Записаться на консультацию (40 мин • $50) →',
    heroCtaSecondary: 'Посмотреть личный кабинет',
    promoOfferBanner: '40-минутная экспресс-встреча в Zoom / Google Meet • $50',
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
    tier1Title: 'Стоит ли переезжать во Вьетнам? (40 мин)',
    tier1Price: '$50',
    tier1Badge: 'Экспресс-стратегия',
    tier1Desc: '40-мин стратегическая видео-консультация: детальная оценка целесообразности переезда, выбор городов и ответы на главные вопросы.',
    tier1Feat1: '40 минут личной стратегической видео-встречи',
    tier1Feat2: 'Оценка целесообразности переезда под ваши цели',
    tier1Feat3: 'Обзор подходящих городов и сезонов',
    tier1Feat4: 'Резюме рекомендаций после звонка',

    tier2Title: 'Персональное планирование поездки',
    tier2Price: '$290',
    tier2Badge: null,
    tier2Desc: 'Персональный маршрут поездки (1-30 дней), личный кабинет, базовые гайды по Вьетнаму и поддержка основателя.',
    tier2Feat1: 'Интерактивный личный кабинет клиента',
    tier2Feat2: 'Персональный маршрут поездки (1-30 дней)',
    tier2Feat3: 'Базовая информация по городам и сезонам Вьетнама',
    tier2Feat4: 'Настройка SIM/eSIM и службы такси Grab',
    tier2Feat5: 'Прямые консультации в WhatsApp с основателем',

    tier3Title: 'Планирование релокации во Вьетнам',
    tier3Price: '$490',
    tier3Badge: 'Самый Популярный',
    tier3Desc: 'Полный комплект удаленной релокации: личный кабинет, подбор районов, бюджетная модель и дорожная карта.',
    tier3Feat1: 'Персональный интерактивный личный кабинет',
    tier3Feat2: 'Индивидуальный подбор городов и районов',
    tier3Feat3: 'Интерактивный калькулятор бюджета и сценариев',
    tier3Feat4: 'Пошаговая дорожная карта с чек-листом',
    tier3Feat5: 'База проверенных ресурсов и гайд по жилью',
    tier3Feat6: 'Персональные заметки и сопровождение основателя',

    tier4Title: 'Консьерж-сопровождение релокации',
    tier4Price: '$890',
    tier4Badge: 'VIP Консьерж',
    tier4Desc: 'VIP онлайн-сопровождение основателем до вылета и в течение первого месяца пребывания во Вьетнаме.',
    tier4Feat1: 'Всё, что входит в пакет релокации во Вьетнам',
    tier4Feat2: 'Приоритетная связь в WhatsApp/Telegram 1-на-1',
    tier4Feat3: 'Неограниченный онлайн-разбор найденных вариантов жилья',
    tier4Feat4: 'Поддержка и сверка бюджета в первый месяц во Вьетнаме',

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

    // Housing Guidance Section
    housingTitle: 'Как найти подходящее жильё удалённо во Вьетнаме',
    housingSubhead: 'Стратегии онлайн-поиска, ключевые вопросы владельцам, красные флаги в договорах и стандарты депозитов.',

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
    expressFormTitle: 'Запись на 40-минутную экспресс-консультацию ($50)',
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
    expressConsultationBookedTitle: 'Ваша 40-минутная консультация запланирована!',
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
