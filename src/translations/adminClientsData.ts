import type { AdminClientRecord } from '../types';
import {
  DEFAULT_TRAVEL_DAYS,
  DEFAULT_TRAVEL_TRANSIT_LEGS,
  DEFAULT_TRAVEL_REVISION,
  DEFAULT_TRAVEL_SIM_GUIDE,
  DEFAULT_TRAVEL_HOSPITALS
} from './defaultTravelData';

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
    verifiedHousing: [],
    roadmapTasks: [
      {
        id: 't-mikhail-1',
        phase: 'before_arrival',
        title: { en: 'Apply for 90-day Vietnam e-Visa', ru: 'Оформить e-Visa во Вьетнам на 90 дней' },
        description: { en: 'Submit through official immigration portal.', ru: 'Подать через официальный портал иммиграции.' },
        completed: false
      }
    ],
    travelDays: DEFAULT_TRAVEL_DAYS,
    travelTransitLegs: DEFAULT_TRAVEL_TRANSIT_LEGS,
    travelRevision: DEFAULT_TRAVEL_REVISION,
    travelSimGuide: DEFAULT_TRAVEL_SIM_GUIDE,
    travelEmergencyHospitals: DEFAULT_TRAVEL_HOSPITALS,
    hasUnpublishedChanges: true,
    createdAt: '2026-09-03',
    updatedAt: '2026-09-03'
  },
  {
    id: 'client-travel-2',
    clientName: 'Дмитрий и Ольга Кузнецовы',
    email: 'kuznetsov.travel@gmail.com',
    password: 'pass123',
    category: 'active',
    tierId: 'tier2',
    serviceName: {
      en: 'Personal Travel Planning ($290)',
      ru: 'Персональное планирование поездки ($290)'
    },
    priceUSD: 290,
    status: 'plan_ready',
    questionnaire: {
      name: 'Дмитрий и Ольга Кузнецовы',
      email: 'kuznetsov.travel@gmail.com',
      password: 'pass123',
      country: 'Казахстан, Алматы',
      travelDates: '12–26 октября 2026',
      duration: '14 дней',
      travelersCount: 2,
      monthlyBudgetUSD: 2500,
      workSituation: 'Туристический отпуск (14 дней)',
      preferredCities: ['hanoi', 'danang', 'hoian'],
      environmentPreference: 'balanced',
      accommodationType: 'Бутик-отели 4* с бассейном и хорошим завтраком',
      remoteWorkNeeds: 'Не требуется, едем отдыхать',
      coworkingNeeds: 'Не требуется',
      transportationPreference: 'Grab, внутренний перелет и лимузин-трансфер',
      climatePreference: 'Тепло, комфортно для прогулок и купания',
      longTermGoals: 'Увидеть аутентичный Вьетнам, природу Ниньбиня и отдохнуть на море в Хойане/Дананге',
      priorities: 'Вкусная еда, безопасность, красивые фотолокации, понятная логистика',
      concerns: 'Языковой барьер и боязнь заблудиться',
      additionalInfo: 'Обожаем кофе, морепродукты и древнюю архитектуру'
    },
    recommendedCityId: 'danang',
    recommendedCityWhy: {
      en: 'Perfect combination of Northern cultural heritage (Hanoi/Ninh Binh) and Central Vietnam beaches (Da Nang/Hoi An).',
      ru: 'Идеальное сочетание культурного наследия Севера (Ханой/Ниньбинь) и пляжного отдыха в Центре (Дананг/Хойан).'
    },
    overallFounderNote: {
      en: 'Dmitry & Olga, your 14-day travel roadmap is published! Follow the Morning/Afternoon/Evening tips for the best experience.',
      ru: 'Дмитрий и Ольга, ваш авторский маршрут на 14 дней готов и опубликован! Следуйте подсказкам по блокам Утро/День/Вечер — это сэкономит вам время и избавит от очередей. Я на связи в WhatsApp на все 14 дней вашей поездки!'
    },
    userCurrentBudget: {
      accommodation: 800,
      food: 600,
      coworking: 0,
      transportation: 350,
      entertainment: 500
    },
    verifiedHousing: [],
    roadmapTasks: [],
    travelDays: DEFAULT_TRAVEL_DAYS,
    travelTransitLegs: DEFAULT_TRAVEL_TRANSIT_LEGS,
    travelRevision: {
      requested: false,
      usedCount: 0,
      maxCount: 1,
      status: 'none'
    },
    travelSimGuide: DEFAULT_TRAVEL_SIM_GUIDE,
    travelEmergencyHospitals: DEFAULT_TRAVEL_HOSPITALS,
    hasUnpublishedChanges: false,
    lastPublishedAt: '2026-09-08T12:00:00Z',
    createdAt: '2026-09-05',
    updatedAt: '2026-09-08'
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
    paidAt: '2026-08-28 14:32:00 UTC',
    paymentMethod: 'card_ru',
    hasUnpublishedChanges: false,
    lastPublishedAt: '2026-09-02 11:15:00 UTC',
    verifiedHousing: [
      {
        id: 'house-danang-1',
        condoName: 'Hiyori Garden Tower',
        cityId: 'danang',
        district: 'Son Tra / My Khe Border',
        addressSnippet: 'Vo Van Kiet, Son Tra, Da Nang (450m from beach)',
        monthlyPriceUSD: 520,
        monthlyPriceVND: 13000000,
        evnTariffVNDPerKwh: 2800,
        isDirectEvnMeter: true,
        depositTerms: {
          amountUSD: 520,
          months: 1,
          refundConditions: {
            en: '1-month refundable deposit upon 30-day departure notice. Checked against property pink book.',
            ru: '1 месяц залога с гарантией возврата при предупреждении за 30 дней. Проверен по sổ đỏ.'
          }
        },
        realtorContact: {
          name: 'Linh Nguyen (Verified Partner)',
          phoneOrZalo: '+84 905 123 456 (Zalo)',
          verifiedPartner: true
        },
        noiseAudit: {
          status: 'verified_quiet',
          inspectedAt: '2026-09-01',
          notes: {
            en: 'Inspected on site: Zero construction within 200m radius. Courtyard-facing quiet 14th floor.',
            ru: 'Проверено на месте: строек в радиусе 200м нет. Тихий 14-й этаж с окнами во внутренний двор.'
          }
        },
        fiberInternetSpeedMbps: {
          download: 165,
          upload: 140,
          provider: 'Viettel'
        },
        childFriendlyFeatures: ['Elevator with keycard', 'Gated pool & play zone', 'Quiet inverter AC'],
        photoUrls: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
        ],
        videoTourUrl: 'https://youtube.com',
        founderReview: {
          en: 'Japanese quality standard condominium. Very rare to find official EVN rates and true soundproofing in Da Nang.',
          ru: 'ЖК японского стандарта качества. Редкий случай прямого государственного тарифа EVN и настоящей шумоизоляции в Дананге.'
        },
        contractAudited: true,
        isTopPick: true,
        publishedToClient: true,
        createdAt: '2026-08-30'
      },
      {
        id: 'house-danang-2',
        condoName: 'The Monarchy (Block B)',
        cityId: 'danang',
        district: 'An Trung / Han River',
        addressSnippet: 'Tran Hung Dao, An Hai Tay, Da Nang',
        monthlyPriceUSD: 460,
        monthlyPriceVND: 11500000,
        evnTariffVNDPerKwh: 3000,
        isDirectEvnMeter: true,
        depositTerms: {
          amountUSD: 460,
          months: 1,
          refundConditions: {
            en: '1-month refundable deposit, written clause on inspection handover.',
            ru: '1 месяц возвратного залога с письменным актом приема-передачи.'
          }
        },
        realtorContact: {
          name: 'Tran Minh Real Estate',
          phoneOrZalo: '+84 912 345 678 (Zalo)',
          verifiedPartner: true
        },
        noiseAudit: {
          status: 'acceptable_minor_traffic',
          inspectedAt: '2026-08-31',
          notes: {
            en: 'River view side is very peaceful. Avoid street-facing units on lower floors.',
            ru: 'Сторона с видом на реку очень спокойная. Избегать юнитов с окнами на дорогу на нижних этажах.'
          }
        },
        fiberInternetSpeedMbps: {
          download: 120,
          upload: 110,
          provider: 'FPT Telecom'
        },
        childFriendlyFeatures: ['Gated complex', 'Large landscaped podium', '24/7 security reception'],
        photoUrls: [
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
        ],
        founderReview: {
          en: 'High demand building near Dragon Bridge. Excellent for sunset river walks.',
          ru: 'Популярный жилой комплекс у Драконьего моста. Прекрасен для вечерних прогулок по набережной.'
        },
        contractAudited: true,
        isTopPick: false,
        publishedToClient: true,
        createdAt: '2026-08-31'
      }
    ],
    roadmapTasks: [
      {
        id: 't-anna-1',
        phase: 'before_arrival',
        title: { en: 'Vietnam e-Visa approved for 90 days', ru: 'Одобрена e-Visa во Вьетнам на 90 дней' },
        description: { en: 'Visa issued and downloaded to PDF.', ru: 'Виза выпущена и сохранена в PDF.' },
        completed: true
      },
      {
        id: 't-anna-2',
        phase: 'week_of_arrival',
        title: { en: 'Inspect Hiyori Tower unit #1402', ru: 'Очный осмотр квартиры в Hiyori Tower №1402' },
        description: { en: 'Check water pressure and Wi-Fi speed.', ru: 'Проверка напора воды и скорости Wi-Fi.' },
        completed: false
      }
    ],
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
    paidAt: '2026-08-25 09:12:00 UTC',
    paymentMethod: 'crypto_usdt',
    hasUnpublishedChanges: true,
    lastPublishedAt: '2026-08-29 16:00:00 UTC',
    verifiedHousing: [
      {
        id: 'house-nhatrang-1',
        condoName: 'Gold Coast Nha Trang (Tower South)',
        cityId: 'nhatrang',
        district: 'Loc Tho / Central Beach',
        addressSnippet: '01 Tran Hung Dao, Loc Tho, Nha Trang',
        monthlyPriceUSD: 680,
        monthlyPriceVND: 17000000,
        evnTariffVNDPerKwh: 3100,
        isDirectEvnMeter: true,
        depositTerms: {
          amountUSD: 680,
          months: 1,
          refundConditions: {
            en: '1-month refundable security deposit with bilingual notarized contract.',
            ru: '1 месяц возвратного залога по двуязычному договору с описью техники.'
          }
        },
        realtorContact: {
          name: 'Nha Trang Home Agency (Bao)',
          phoneOrZalo: '+84 935 889 911 (Zalo)',
          verifiedPartner: true
        },
        noiseAudit: {
          status: 'verified_quiet',
          inspectedAt: '2026-08-28',
          notes: {
            en: 'Double glazed soundproof windows installed. High floor facing bay.',
            ru: 'Двойные стеклопакеты с улучшенной шумоизоляцией. Высокий этаж с видом на залив.'
          }
        },
        fiberInternetSpeedMbps: {
          download: 200,
          upload: 180,
          provider: 'VNPT'
        },
        childFriendlyFeatures: ['Modern shopping mall on floors 1-4', 'Rooftop pool', 'Card-access elevators'],
        photoUrls: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        founderReview: {
          en: 'Top choice in central Nha Trang. Direct shopping mall access downstairs, 3 min walk to the beach.',
          ru: 'Флагманский комплекс в центре Нячанга. Внизу ТЦ, море через дорогу, отличная шумоизоляция.'
        },
        contractAudited: true,
        isTopPick: true,
        publishedToClient: true,
        createdAt: '2026-08-28'
      }
    ],
    roadmapTasks: [
      {
        id: 't-dmitry-1',
        phase: 'before_arrival',
        title: { en: 'Draft bilingual 12-month lease contract', ru: 'Составить двуязычный договор аренды на 12 месяцев' },
        description: { en: 'Lock fixed EVN rates and deposit return protocol.', ru: 'Зафиксировать тариф EVN и возврат залога.' },
        completed: true
      }
    ],
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
    paidAt: '2026-04-15 10:00:00 UTC',
    paymentMethod: 'card_intl',
    hasUnpublishedChanges: false,
    lastPublishedAt: '2026-05-20 12:00:00 UTC',
    verifiedHousing: [
      {
        id: 'house-danang-studio-1',
        condoName: 'An Thuong Studio Residence',
        cityId: 'danang',
        district: 'An Thuong Expat Quarter',
        addressSnippet: 'An Thuong 4, My An, Ngu Hanh Son, Da Nang',
        monthlyPriceUSD: 380,
        monthlyPriceVND: 9500000,
        evnTariffVNDPerKwh: 3000,
        isDirectEvnMeter: true,
        depositTerms: {
          amountUSD: 380,
          months: 1,
          refundConditions: {
            en: '1-month refundable deposit, fully returned upon checkout.',
            ru: '1 месяц залога, возвращен в полном объеме при выезде.'
          }
        },
        realtorContact: {
          name: 'Da Nang Expat Stays',
          phoneOrZalo: '+84 905 999 111 (Zalo)',
          verifiedPartner: true
        },
        noiseAudit: {
          status: 'verified_quiet',
          inspectedAt: '2026-04-18',
          notes: {
            en: 'Quiet side street, walking distance to cafes and beach.',
            ru: 'Тихая улица, 3 минуты пешком до пляжа и Enouvo коворкинга.'
          }
        },
        fiberInternetSpeedMbps: {
          download: 140,
          upload: 120,
          provider: 'Viettel'
        },
        childFriendlyFeatures: [],
        photoUrls: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
        ],
        founderReview: {
          en: 'Super cozy studio for a single remote engineer. 100% deposit returned.',
          ru: 'Уютная студия для соло-разработчика. Залог возвращен в день выезда без задержек.'
        },
        contractAudited: true,
        isTopPick: true,
        publishedToClient: true,
        createdAt: '2026-04-18'
      }
    ],
    roadmapTasks: [
      {
        id: 't-sergey-1',
        phase: 'week_of_arrival',
        title: { en: 'Sign lease contract & move in', ru: 'Подписать договор аренды и заселиться' },
        description: { en: 'Lease executed with landlord.', ru: 'Договор подписан, ключи получены.' },
        completed: true
      }
    ],
    createdAt: '2026-04-15',
    updatedAt: '2026-05-20'
  }
];
