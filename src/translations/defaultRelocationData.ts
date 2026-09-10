import type {
  RoadmapTask,
  PartnerRealtorAssignment,
  LeaseContractAudit,
  VipConciergePerks
} from '../types';

export const DEFAULT_RELOCATION_ROADMAP_TASKS: RoadmapTask[] = [
  // Phase 1: Before Arrival (До прилёта)
  {
    id: 'reloc-task-1',
    phase: 'before_arrival',
    title: {
      ru: 'Оформление 90-дневной электронной визы (e-Visa)',
      en: 'Apply for 90-day Vietnam e-Visa'
    },
    description: {
      ru: 'Подача на официальном госпортале иммиграции Вьетнама (evisa.xuatnhapcanh.gov.vn). Проверка КПП въезда (Дананг DAD, Камрань CXR, Сайгон SGN).',
      en: 'Apply via the official immigration portal. Verify entry checkpoint matching your arrival flight.'
    },
    completed: true,
    founderComment: {
      ru: 'Не пользуйтесь сайтами-посредниками с комиссией $50+. Госпошлина составляет строго $25 за однократную или $50 за мульти-визу.',
      en: 'Avoid agency markups. Official state fee is strictly $25 for single entry or $50 for multiple entry.'
    }
  },
  {
    id: 'reloc-task-2',
    phase: 'before_arrival',
    title: {
      ru: 'Бронь временного жилья на первые 3–5 дней',
      en: 'Book 3-5 days temporary hotel/Airbnb'
    },
    description: {
      ru: 'Бронирование отеля или студии у моря для комфортного отдыха после перелета, пока вы будете выезжать на показы постоянных квартир.',
      en: 'Comfortable base near the beach while you inspect long-term condos with our partner-realtor.'
    },
    completed: true,
    founderComment: {
      ru: 'Никогда не арендуйте квартиру на долгий срок вслепую через интернет до личного осмотра района и оценки шума вокруг.',
      en: 'Never sign a 6-12 month lease remotely without on-site neighborhood noise inspection.'
    }
  },
  {
    id: 'reloc-task-3',
    phase: 'before_arrival',
    title: {
      ru: 'Подготовка финансов, наличных и P2P-крипты',
      en: 'Financial preparation: USD cash & P2P setup'
    },
    description: {
      ru: 'Подготовка новых стодолларовых купюр (серия 2013+ без штампов и надрывов) + настройка P2P в Bybit/Bitget для получения донгов.',
      en: 'Crisp $100 bills (series 2013+) plus P2P crypto wallet setup for convenient cash withdrawal.'
    },
    completed: false,
    founderComment: {
      ru: 'Во Вьетнаме за идеальные купюры $100 в ювелирных лавках дают максимальный курс. Потертые или мелкие купюры меняют с дисконтом.',
      en: 'Gold shops give the highest exchange rate for pristine $100 bills.'
    }
  },
  {
    id: 'reloc-task-4',
    phase: 'before_arrival',
    title: {
      ru: 'Оформление экспатской медстраховки с байком и Денге',
      en: 'Expat travel health insurance (Dengue & Scooter)'
    },
    description: {
      ru: 'Полис с покрытием амбулаторного лечения в международных клиниках (Vinmec, Family Hospital) и эвакуации.',
      en: 'Policy covering outpatient visits at international hospitals and scooter accidents.'
    },
    completed: false,
    founderComment: {
      ru: 'Убедитесь, что полис покрывает езду на байке и нет франшизы на визиты к врачу при лихорадке Денге.',
      en: 'Verify scooter coverage and hospital direct-billing without deductibles.'
    }
  },

  // Phase 2: Week of Arrival (Первые 7 дней)
  {
    id: 'reloc-task-5',
    phase: 'week_of_arrival',
    title: {
      ru: 'Покупка местной SIM / eSIM Viettel 4G/5G',
      en: 'Activate local Viettel 4G/5G SIM/eSIM'
    },
    description: {
      ru: 'Подключение официального безлимитного тарифа (~150 000 – 200 000 ₫/мес) в фирменном магазине по паспорту.',
      en: 'Direct official registration at a flagship telecom store for 5-8 GB/day data.'
    },
    completed: false,
    founderComment: {
      ru: 'Viettel имеет лучшее покрытие по всей стране, включая острова и горы. Не покупайте анонимные симки в ларьках — их блокируют.',
      en: 'Always register Viettel with your passport to prevent SIM deactivation.'
    }
  },
  {
    id: 'reloc-task-6',
    phase: 'week_of_arrival',
    title: {
      ru: 'Живые показы квартир с проверенным партнером-риелтором',
      en: 'On-site condo viewings with vetted realtor'
    },
    description: {
      ru: 'Выезд на 3–5 отобранных объектов в Telegram-чате. Оценка шумоизоляции, проверка роутера и напора горячей воды.',
      en: 'Inspect top picks sent to your Telegram chat. Test AC, water pressure, and daytime noise.'
    },
    completed: false,
    founderComment: {
      ru: 'Включайте кондиционеры во всех комнатах на максимум прямо при входе, чтобы проверить отсутствие запаха плесени.',
      en: 'Turn on all AC units immediately upon entering to check for mildew odors and compressor noise.'
    }
  },
  {
    id: 'reloc-task-7',
    phase: 'week_of_arrival',
    title: {
      ru: 'Дистанционный аудит договора аренды основателем',
      en: 'Lease agreement legal audit by founder'
    },
    description: {
      ru: 'Отправка проекта договора основателю в личный кабинет перед подписанием и передачей залога.',
      en: 'Upload draft contract to founder workspace for EVN tariff, deposit return, and police registration review.'
    },
    completed: false,
    founderComment: {
      ru: 'Я лично проверю договор за 2–4 часа: зафиксируем прозрачный тариф за электричество (до 4500 ₫/кВт), возврат депозита и временную регистрацию.',
      en: 'I will audit the draft within 2-4 hours to confirm standard electric rates, deposit safety, and police registration.'
    }
  },
  {
    id: 'reloc-task-8',
    phase: 'week_of_arrival',
    title: {
      ru: 'Подписание договора, фотофиксация счетчиков и заселение',
      en: 'Sign lease, meter photo checklist & move-in'
    },
    description: {
      ru: 'Подписание двуязычного договора, подробная фотофиксация всех показаний счетчиков и имеющихся дефектов мебели.',
      en: 'Bilingual contract signing, photographic record of EVN/water meters and furniture condition.'
    },
    completed: false
  },

  // Phase 3: First Month (Обустройство и быт)
  {
    id: 'reloc-task-9',
    phase: 'first_month',
    title: {
      ru: 'Обязательная регистрация в полиции (tạm trú) через лендлорда',
      en: 'Police temporary residence registration (tạm trú)'
    },
    description: {
      ru: 'Хозяин квартиры обязан подать данные вашего паспорта в миграционную систему в течение 24 часов после заезда.',
      en: 'Landlord must register your stay in the provincial police portal within 24 hours.'
    },
    completed: false,
    founderComment: {
      ru: 'Скриншот или бланк tạm trú потребуется вам при продлении визы, открытии счета в банке и покупке байка.',
      en: 'Keep a digital screenshot of your tạm trú confirmation for visa runs and banking.'
    }
  },
  {
    id: 'reloc-task-10',
    phase: 'first_month',
    title: {
      ru: 'Аренда скутера без оставления паспорта в залог',
      en: 'Rent reliable scooter without passport deposit'
    },
    description: {
      ru: 'Аренда проверенного байка (Honda Vision/Air Blade/NVX) по копии паспорта и небольшому денежному залогу ($50–$100).',
      en: 'Rent modern scooter with passport copy and small refundable cash deposit.'
    },
    completed: false
  },
  {
    id: 'reloc-task-11',
    phase: 'first_month',
    title: {
      ru: 'Настройка местных оплат через VietQR и открытие счета',
      en: 'VietQR payment setup & local expat banking'
    },
    description: {
      ru: 'Оплата по QR-кодам во всех кофейнях, магазинах и аптеках через партнерские сервисы или цифровую карту.',
      en: 'Scan-and-pay via VietQR in 95% of stores, cafes, and supermarkets across Vietnam.'
    },
    completed: false
  },
  {
    id: 'reloc-task-12',
    phase: 'first_month',
    title: {
      ru: 'Стратегия визового продления и первый бордер-ран',
      en: 'Visa extension & border run strategy'
    },
    description: {
      ru: 'Выбор маршрута обновления визы на 90 дней (Лаос через сухопутную границу Lao Bao или лоукостер AirAsia в Бангкок/Куала-Лумпур).',
      en: 'Plan your 90-day reset via land border to Laos or quick AirAsia flight to Kuala Lumpur/Bangkok.'
    },
    completed: false
  },
  {
    id: 'reloc-task-13',
    phase: 'first_month',
    title: {
      ru: 'Персональное сопровождение на 30 дней с основателем в Telegram',
      en: '30-Day Personal Accompaniment with Founder in Telegram'
    },
    description: {
      ru: 'Прямой контакт 1-на-1 с основателем (@Likqwerty) в Telegram для оперативного решения бытовых, визовых и локальных вопросов в первый месяц.',
      en: 'Direct 1-on-1 contact with the founder (@Likqwerty) in Telegram for lifestyle, visa, and local guidance in month 1.'
    },
    completed: true,
    founderComment: {
      ru: 'Я на связи с вами в личном чате Telegram @Likqwerty на протяжении всех первых 30 дней после переезда.',
      en: 'I stay in direct touch with you on Telegram @Likqwerty throughout your first 30 days.'
    }
  }
];

export const DEFAULT_PARTNER_REALTOR_DANANG: PartnerRealtorAssignment = {
  id: 'realtor-danang-linh',
  realtorName: 'Linh Nguyen',
  agencyOrTitle: 'Danang Sea Realty • Проверенный партнер VietReloc',
  photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  phoneOrZalo: '+84 905 123 456',
  telegramUsername: 'linh_danang_realty',
  whatsappNumber: '+84 905 123 456',
  citiesCovered: ['Дананг', 'Хойан'],
  languages: ['RU', 'EN', 'VI'],
  specialization: 'Современные кондоминиумы и апартаменты у моря (Сон Тра, Ми Ан, Ан Тхыонг). Бюджет $350 – $1400/мес.',
  status: 'chat_created',
  founderNoteToClient: {
    ru: 'Линь — наш ключевой партнер в Дананге. Отлично говорит по-русски, лично отсеивает варианты с шумными стройками и всегда фиксирует прозрачные условия аренды и адекватный тариф за свет (до 4000–4500 ₫/кВт). Напишите ей в Telegram с кодовым словом «VietReloc».',
    en: 'Linh is our trusted partner in Da Nang. Fluent in English and Russian, screens out noisy construction sites and secures transparent lease terms with normal electric rates (up to 4000-4500 ₫/kWh).'
  },
  directChatUrl: 'https://t.me/linh_danang_realty'
};

export const DEFAULT_PARTNER_REALTOR_NHATRANG: PartnerRealtorAssignment = {
  id: 'realtor-nhatrang-minh',
  realtorName: 'Trần Minh (Тран Минь)',
  agencyOrTitle: 'Nha Trang Bay Homes • Проверенный партнер VietReloc',
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  phoneOrZalo: '+84 912 345 678',
  telegramUsername: 'tranminh_nhatrang_rent',
  whatsappNumber: '+84 912 345 678',
  citiesCovered: ['Нячанг'],
  languages: ['RU', 'EN', 'VI'],
  specialization: 'ЖК бизнес-класса с видом на море (Gold Coast, Muong Thanh Luxury, The Costa, Scenia Bay). $400 – $2000/мес.',
  status: 'viewings_scheduled',
  founderNoteToClient: {
    ru: 'Тран Минь работает с экспатами более 7 лет. Предоставляет живые видеотуры прямо в Telegram и лично сопровождает на показах на автомобиле. Знает всех добросовестных арендодателей Нячанга.',
    en: 'Tran Minh has 7+ years assisting expats in Nha Trang. Sends video tours directly in Telegram and provides car transport for viewings.'
  },
  directChatUrl: 'https://t.me/tranminh_nhatrang_rent'
};

export const DEFAULT_LEASE_AUDIT: LeaseContractAudit = {
  status: 'approved_with_notes',
  contractDraftTitle: 'Hợp Đồng Thuê Căn Hộ (Hiyori Garden Tower / Gold Coast)',
  contractFileOrUrl: 'https://vietreloc.com/contracts/sample-audit.pdf',
  draftReceivedAt: '2026-09-02T10:00:00Z',
  auditedAt: '2026-09-02T14:30:00Z',
  checks: {
    depositRefundSafety: {
      status: 'pass',
      comment: 'Залог строго 1 месяц. Четко прописан возврат в день выезда в валюте внесения при уведомлении за 30 дней. Формулировка естественного износа защищена.'
    },
    evnElectricityTariff: {
      status: 'pass',
      tariffVND: 4200,
      comment: 'Тариф зафиксирован на нормальном рыночном уровне (4200 ₫/кВт, норма для кондоминиумов — до 4500 ₫/кВт). Скрытых сезонных наценок и плавающих коэффициентов в договоре нет.'
    },
    waterAndInternetSpeed: {
      status: 'pass',
      comment: 'Оптоволоконный кабель 150 Мбит/с Viettel закреплен за квартирой и включен в аренду. Вода по счетчику 25 000 ₫/м³.'
    },
    policeRegistrationTamTru: {
      status: 'pass',
      comment: 'Пункт 4.3 обязывает арендодателя подать паспорт арендатора на портал миграционной службы (tạm trú) в течение 24 часов.'
    },
    earlyTerminationClause: {
      status: 'warning',
      comment: 'Рекомендуется добавить пункт о возврате остатка залога при изменении визовых правил или форс-мажоре со стороны государства.'
    }
  },
  overallVerdict: {
    ru: 'Договор проверен основателем. Условия прозрачны и соответствуют стандартам безопасной аренды. Тариф за электричество зафиксирован на адекватном рыночном уровне 4200 ₫/кВт. Можно подписывать с учетом 1 точечной правки по форс-мажору.',
    en: 'The lease agreement has been audited by the founder. Terms are transparent and safe. Electric rate is locked at standard 4200 ₫/kWh. Approved for signing with 1 minor force-majeure clause addition.'
  },
  recommendedAmendments: [
    'Bổ sung điều khoản: Trong trường hợp bất khả kháng hoặc thay đổi chính sách thị thực Việt Nam, bên thuê được quyền chấm dứt hợp đồng và nhận lại 100% tiền đặt cọc sau khi báo trước 30 ngày.',
    'Chủ nhà cam kết hoàn thành đăng ký tạm trú trực tuyến cho khách thuê trong vòng 24 giờ sau khi nhận phòng.'
  ]
};

export const DEFAULT_VIP_PERKS: VipConciergePerks = {
  psychologistSession: {
    status: 'included_not_booked',
    specialistName: 'Егорова Мария',
    specialistTitle: 'Дипломированный психолог, клинический специалист, сексолог (4 года практики)',
    specialistPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    telegramContact: '@mur_mur_mari',
    whatsappContact: '+84 039 458 3217',
    secondSessionPromoCode: 'VIETRELOC-VIP20',
    notes: {
      ru: 'Индивидуальная онлайн-сессия (50 минут): бережная психологическая поддержка во время переезда, преодоление кризиса адаптации, работа со стрессом и сохранение гармонии в паре. 1-я сессия бесплатно по вашему VIP-тарифу, на 2-ю сессию действует скидка 20% по промокоду.',
      en: 'Individual online session (50 min): emotional support during relocation, cultural adaptation, stress management, and couple harmony. First session is included free with VIP package; 20% off on 2nd session.'
    }
  },
  founderTelegramAccompaniment: {
    status: 'active',
    daysTotal: 30,
    daysRemaining: 28,
    telegramUsername: 'Likqwerty',
    startDate: '2026-10-15',
    notes: {
      ru: 'Персональный закрытый диалог с основателем VietReloc 1-на-1 в Telegram (@Likqwerty). Быстрые ответы и содействие на протяжении первого месяца.',
      en: 'Personal 1-on-1 Telegram concierge line with the founder (@Likqwerty). Direct assistance throughout the first 30 days.'
    }
  },
  priorityDirectLine: {
    status: 'active',
    channel: 'telegram',
    contact: '@Likqwerty'
  },
  realtorAccompaniment: {
    status: 'coordinated',
    assignedEscort: 'Личное сопровождение консьержа на 3 очных показах жилья вместе с риелтором'
  }
};
