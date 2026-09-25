import type { TravelDayItem } from '../types';

export const DEFAULT_RELOCATION_14_DAYS: TravelDayItem[] = [
  {
    dayNumber: 1,
    date: 'День 1 • Прибытие, первый вдох и связь',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Прилёт, заселение во временное жильё и подключение стабильной связи 4G/5G',
      en: 'Arrival, temporary base check-in & official 4G/5G SIM card setup'
    },
    logisticsTip: 'Используйте приложение Grab для заказа такси из аэропорта (~120 000 – 150 000 ₫). Не садитесь к частным зазывалам в зале прилёта.',
    activities: [
      {
        id: 'reloc-act-1-1',
        timeSlot: 'morning',
        title: 'Встреча в аэропорту и заселение во временный апарт-отель',
        description: 'Прибытие, комфортный трансфер, заселение в апартаменты на первые дни. Распаковка багажа, душ и отдых после перелёта.',
        googleMapsUrl: 'https://maps.google.com/?q=Da+Nang+International+Airport',
        estimatedCostVND: '140 000 ₫ (такси GrabCar)',
        proTip: 'Сохраните адрес вашего отеля на вьетнамском языке в заметках телефона на случай отсутствия связи.'
      },
      {
        id: 'reloc-act-1-2',
        timeSlot: 'afternoon',
        title: 'Оформление официальной физической SIM / eSIM в салоне Viettel',
        description: 'Посещение официального центра связи Viettel или Vinaphone: оформление SIM-карты с безлимитным пакетом интернета на паспорт.',
        googleMapsUrl: 'https://maps.google.com/?q=Viettel+Store+Da+Nang',
        estimatedCostVND: '250 000 ₫ (безлимитный пакет на месяц)',
        proTip: 'Обязательно проверяйте регистрацию номера на ваше имя (отправьте SMS «TTTB» на номер 1414).'
      },
      {
        id: 'reloc-act-1-3',
        timeSlot: 'evening',
        title: 'Первый ужин у океана и акклиматизация',
        description: 'Неспешный ужин со свежими морепродуктами и манговым смузи в уютном ресторане на набережной Ми Кхе под шум прибоя.',
        googleMapsUrl: 'https://maps.google.com/?q=My+Khe+Beach+Da+Nang',
        estimatedCostVND: '180 000 ₫ / чел',
        proTip: 'Закажите кокосовую воду (Nước dừa) — это лучший природный изотоник для быстрой акклиматизации.'
      }
    ]
  },
  {
    dayNumber: 2,
    date: 'День 2 • Разведка района и запуск мобильности',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Аренда проверенного скутера, обмен валюты и первые закупки',
      en: 'Reliable bike rental, currency exchange & initial home essentials'
    },
    logisticsTip: 'При получении байка проверьте тормоза, фары и протектор шин. Сфотографируйте имеющиеся царапины на видео.',
    activities: [
      {
        id: 'reloc-act-2-1',
        timeSlot: 'morning',
        title: 'Аренда байка у проверенного партнёра с договором',
        description: 'Подбор комфортного скутера (Honda Air Blade / Lead) с двумя качественными шлемами и техподдержкой от проверенного прокатчика.',
        googleMapsUrl: 'https://maps.google.com/?q=Motorbike+Rental+Da+Nang',
        estimatedCostVND: '1 400 000 ₫ / мес (~$55)',
        proTip: 'Для комфортной езды попросите шлем с защитным визором от ветра и пыли.'
      },
      {
        id: 'reloc-act-2-2',
        timeSlot: 'afternoon',
        title: 'Обмен валюты в проверенных ювелирных лавках по максимальному курсу',
        description: 'Визит в квартал ювелирных магазинов у рынка Хан, где меняют доллары и евро по максимальному рыночному курсу без скрытых комиссий.',
        googleMapsUrl: 'https://maps.google.com/?q=Cho+Han+Jewelry+Exchange+Da+Nang',
        estimatedCostVND: 'Без комиссии (по лучшему курсу)',
        proTip: 'Купюры $100 нового образца (синяя полоса) без надрывов и штампов меняют по самому высокому курсу.'
      },
      {
        id: 'reloc-act-2-3',
        timeSlot: 'evening',
        title: 'Закупка базовых продуктов и бытовой химии в Lotte Mart',
        description: 'Поездка в гипермаркет Lotte Mart или Co.opmart: фильтрованная питьевая вода (бутыли 5–19л), натуральные фрукты, кофе, средства гигиены.',
        googleMapsUrl: 'https://maps.google.com/?q=Lotte+Mart+Da+Nang',
        estimatedCostVND: '450 000 ₫',
        proTip: 'Оформите бонусную карту Lotte Mart на кассе по номеру телефона — получите мгновенную скидку на европейские сыры и выпечку.'
      }
    ]
  },
  {
    dayNumber: 3,
    date: 'День 3 • Разведка микрорайонов и стиля жизни',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Пешая прогулка по экспатским кварталам: ритм, шум, кафе и набережная',
      en: 'Walking tour through expat enclaves: rhythm, noise, cafes & beach line'
    },
    logisticsTip: 'Пройдитесь по улочкам пешком во второй половине дня, чтобы услышать фоновый шум и оценить плотность трафика.',
    activities: [
      {
        id: 'reloc-act-3-1',
        timeSlot: 'morning',
        title: 'Пешая прогулка по туристическо-экспатскому кварталу Ан Тхыонг (An Thuong)',
        description: 'Изучение инфраструктуры: плотность спешелти-кофеен, пекарен, аптек, магазинов здорового питания и близость к первой линии моря.',
        googleMapsUrl: 'https://maps.google.com/?q=An+Thuong+Da+Nang',
        estimatedCostVND: '65 000 ₫ (кофе и свежий круассан)',
        proTip: 'Обратите внимание на тихие переулки (Ngõ) в 100 метрах от центральных баров — там тихо и комфортно для долгой жизни.'
      },
      {
        id: 'reloc-act-3-2',
        timeSlot: 'afternoon',
        title: 'Инспекция чистоты пляжа и спортивной инфраструктуры',
        description: 'Оценка пляжной полосы Ми Кхе: зоны для плавания со спасателями, сетки для пляжного волейбола, открытые воркаут-площадки.',
        googleMapsUrl: 'https://maps.google.com/?q=My+Khe+Beach+Promenade',
        estimatedCostVND: 'Бесплатно',
        proTip: 'В Дананге лучшие часы для купания без палящего солнца — с 6:00 до 7:30 утра и с 16:30 до 18:00.'
      },
      {
        id: 'reloc-act-3-3',
        timeSlot: 'evening',
        title: 'Закат в панорамном руфтопе Brilliant Top Bar',
        description: 'Видовой коктейль или чай с панорамой на освещенный Драконий мост (Dragon Bridge) и реку Хан. Отличный способ охватить взглядом всю географию города.',
        googleMapsUrl: 'https://maps.google.com/?q=Brilliant+Top+Bar+Da+Nang',
        estimatedCostVND: '120 000 ₫',
        proTip: 'По субботам и воскресеньям в 21:00 Драконий мост извергает огонь и воду — захватывающее зрелище!'
      }
    ]
  },
  {
    dayNumber: 4,
    date: 'День 4 • Рабочая среда: коворкинги и Wi-Fi',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Тест оптоволоконного интернета, спешелти-кофе и коворкингов для удалёнки',
      en: 'Testing fiber internet, specialty coffee hubs & coworking spaces'
    },
    logisticsTip: 'В большинстве кофеен Вьетнама розетки установлены у каждого столика, а заказ напитка дает право комфортно работать 3-4 часа.',
    activities: [
      {
        id: 'reloc-act-4-1',
        timeSlot: 'morning',
        title: 'Тест-драйв коворкинга Enouvo Space / DNC Hub',
        description: 'Знакомство с топовым коворкинг-пространством города: эргономичные кресла Herman Miller, приватные зум-будки, резервный генератор электропитания.',
        googleMapsUrl: 'https://maps.google.com/?q=Enouvo+Space+Da+Nang',
        estimatedCostVND: '120 000 ₫ (Day pass)',
        proTip: 'Проверьте пинг до ваших серверов и замерьте реальную скорость спидтестом (обычно 150–250 Мбит/с).'
      },
      {
        id: 'reloc-act-4-2',
        timeSlot: 'afternoon',
        title: 'Обед и рабочий спринт в 43 Factory Coffee Roaster',
        description: 'Ультрасовременная обжарочная спешелти-кофе третьей волны с панорамными стеклянными стенами и прудом с японскими карпами кои.',
        googleMapsUrl: 'https://maps.google.com/?q=43+Factory+Coffee+Roaster+Da+Nang',
        estimatedCostVND: '90 000 ₫ (фильтр-кофе спешелти)',
        proTip: 'Попробуйте зерно местной арабики анаэробной ферментации из региона Далат.'
      },
      {
        id: 'reloc-act-4-3',
        timeSlot: 'evening',
        title: 'Вечерний променад по набережной Бать Данг (Bach Dang)',
        description: 'Широкая европейская набережная вдоль реки Хан, уличные музыканты, приятный бриз и современная городская скульптура.',
        googleMapsUrl: 'https://maps.google.com/?q=Bach+Dang+Street+Da+Nang',
        estimatedCostVND: 'Бесплатно',
        proTip: 'Здесь приятно совершать вечерние пробежки или кататься на электросамокате.'
      }
    ]
  },
  {
    dayNumber: 5,
    date: 'День 5 • Первая волна просмотров квартир с риелтором',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Живые просмотры отобранных жилых комплексов вместе с проверенным риелтором',
      en: 'In-person viewings of vetted condominiums with partner realtor'
    },
    logisticsTip: 'Обязательно откройте окна настежь и прислушайтесь: нет ли поблизости стройки, петухов или уличного караоке.',
    activities: [
      {
        id: 'reloc-act-5-1',
        timeSlot: 'morning',
        title: 'Встреча с риелтором и просмотр первых 2-3 кондоминиумов из шорт-листа',
        description: 'Просмотр вариантов (например, Hiyori Garden Tower, The Monarchy или новостройки Сон Тра). Проверка напора воды, кондиционеров и вида из окон.',
        googleMapsUrl: 'https://maps.google.com/?q=Hiyori+Garden+Tower+Da+Nang',
        estimatedCostVND: 'Бесплатно (комиссию платит собственник)',
        proTip: 'Включите кондиционер на минимальную температуру на 5 минут: проверьте, нет ли запаха плесени и не гудит ли наружный блок.'
      },
      {
        id: 'reloc-act-5-2',
        timeSlot: 'afternoon',
        title: 'Оценка придомовой территории, паркинга и охраны комплекса',
        description: 'Инспекция бассейна, тренажерного зала, крытой парковки для байка, системы электронных ключ-карт на лифтах и работы консьержа.',
        googleMapsUrl: 'https://maps.google.com/?q=The+Monarchy+Da+Nang',
        estimatedCostVND: 'Бесплатно',
        proTip: 'Уточните у риелтора стоимость ежемесячного менеджмент-фи (quản lý) — входит ли она в стоимость аренды.'
      },
      {
        id: 'reloc-act-5-3',
        timeSlot: 'evening',
        title: 'Заполнение чек-листа впечатлений и сравнение тарифов EVN',
        description: 'Обсуждение вариантов в спокойной обстановке: проверка условий депозита, наличия прямого государственного тарифа за свет (EVN) и интернета.',
        googleMapsUrl: 'https://maps.google.com/?q=The+Cups+Coffee+Da+Nang',
        estimatedCostVND: '55 000 ₫ (чай)',
        proTip: 'Фиксируйте тариф EVN в договоре: официальная цена ~2 500 – 3 000 ₫/кВтч против завышенных частных 4 000 – 5 000 ₫.'
      }
    ]
  },
  {
    dayNumber: 6,
    date: 'День 6 • Свежие морепродукты и гастрономия рынков',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Аутентичный рынок морепродуктов, экзотические фрукты и национальная кухня',
      en: 'Fresh seafood docks, exotic tropical fruits & national culinary highlights'
    },
    logisticsTip: 'На рыбных рынках выбирайте живых креветок и рыбу из аквариумов — вам приготовят их на гриле прямо на месте за небольшую доплату.',
    activities: [
      {
        id: 'reloc-act-6-1',
        timeSlot: 'morning',
        title: 'Утренний визит на колоритный рынок Chợ Cồn / Chợ Hàn',
        description: 'Покупка свежайших тропических фруктов у местных фермеров: спелое манго, маракуйя, питахайя (драгонфрут), рамбутан и папайя.',
        googleMapsUrl: 'https://maps.google.com/?q=Cho+Con+Da+Nang',
        estimatedCostVND: '120 000 ₫ (корзина фруктов 3-4 кг)',
        proTip: 'Фрукты на утреннем рынке в 2 раза дешевле супермаркета, а продавцы с улыбкой нарежут манго прямо при вас.'
      },
      {
        id: 'reloc-act-6-2',
        timeSlot: 'afternoon',
        title: 'Обед в прибрежном рыбном ресторане Hải Sản Bé Mặn',
        description: 'Знаменитый культовый ресторан свежих морепродуктов на первой линии: гигантские креветки, гребешки с зеленым луком и кальмары на пару с лемонграссом.',
        googleMapsUrl: 'https://maps.google.com/?q=Hai+San+Be+Man+Da+Nang',
        estimatedCostVND: '300 000 ₫ / чел',
        proTip: 'Обязательно попросите фирменный соус muối tiêu chanh (соль, перец и сок лайма) — он идеален к гребешкам.'
      },
      {
        id: 'reloc-act-6-3',
        timeSlot: 'evening',
        title: 'Дегустация хрустящих блинчиков Bánh Xèo Bà Dưỡng',
        description: 'Легендарное заведение в аутентичном переулке: золотистые хрустящие рисовые блинчики с креветками и ростками сои, завернутые в рисовую бумагу с травами.',
        googleMapsUrl: 'https://maps.google.com/?q=Banh+Xeo+Ba+Duong+Da+Nang',
        estimatedCostVND: '95 000 ₫',
        proTip: 'Секрет вкуса здесь в фирменном густом орехово-печеночном соусе — макайте рулетики щедро!'
      }
    ]
  },
  {
    dayNumber: 7,
    date: 'День 7 • Экспатское комьюнити и нетворкинг',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Знакомство с русскоязычным и международным комьюнити, спорт и связи',
      en: 'Networking with expat founders, remote nomads, sports & social hub'
    },
    logisticsTip: 'В экспатских сообществах Дананга и Нячанга легко найти компанию для паделя, совместных поездок, серфинга и настолок.',
    activities: [
      {
        id: 'reloc-act-7-1',
        timeSlot: 'morning',
        title: 'Утренний серфинг или сап-бординг на рассвете в My Khe Surf Club',
        description: 'Аренда серф-доски или SUP-борда. Теплые мягкие волны, профессиональные инструкторы и активное спортивное комьюнити на берегу.',
        googleMapsUrl: 'https://maps.google.com/?q=Da+Nang+Surf+School',
        estimatedCostVND: '150 000 ₫ (аренда доски на 2 часа)',
        proTip: 'Утренний океан в 06:30 идеален по прозрачности и температуре воды.'
      },
      {
        id: 'reloc-act-7-2',
        timeSlot: 'afternoon',
        title: 'Нетворкинг-ланч в экспатском бистро Roots Plant-Based Cafe',
        description: 'Популярное место встреч IT-предпринимателей, маркетологов и дизайнеров. Свежие смузи-боулы, полезные ланчи и приятные знакомства.',
        googleMapsUrl: 'https://maps.google.com/?q=Roots+Plant-Based+Cafe+Da+Nang',
        estimatedCostVND: '140 000 ₫',
        proTip: 'Посмотрите на доску объявлений у входа: там часто вывешивают анонсы митапов, языковых обменов и хайкингов.'
      },
      {
        id: 'reloc-act-7-3',
        timeSlot: 'evening',
        title: 'Вечер настольных игр или крафтового пива в 7 Bridges Brewing Co.',
        description: 'Награжденная азиатская крафтовая пивоварня на набережной с панорамной крышей и видом на огни мостов. Знакомство с экспатами-старожилами.',
        googleMapsUrl: 'https://maps.google.com/?q=7+Bridges+Brewing+Company+Da+Nang',
        estimatedCostVND: '160 000 ₫',
        proTip: 'Попробуйте дегустационный сет из 4 сортов крафта, включая фирменный IPA с драгонфрутом.'
      }
    ]
  },
  {
    dayNumber: 8,
    date: 'День 8 • Выездной уикенд и перезагрузка в Хойане',
    cityId: 'hoian',
    cityName: { ru: 'Хойан', en: 'Hoi An' },
    title: {
      ru: 'Однодневное путешествие в древний Хойан: рисовые поля, фонарики и релакс',
      en: 'Day trip to ancient Hoi An: emerald rice fields, silk lanterns & peace'
    },
    logisticsTip: 'Дорога от Дананга до Хойана занимает всего 30 минут на байке по живописной прибрежной трассе или 40 минут на такси Grab (~250 000 ₫).',
    activities: [
      {
        id: 'reloc-act-8-1',
        timeSlot: 'morning',
        title: 'Велосипедная прогулка сквозь изумрудные рисовые поля к пляжу Ан Банг',
        description: 'Аренда велосипеда, тихие дорожки между рисовыми чеками, где пасутся водяные буйволы, и выход на белоснежный пляж Ан Банг (An Bang Beach).',
        googleMapsUrl: 'https://maps.google.com/?q=An+Bang+Beach+Hoi+An',
        estimatedCostVND: '50 000 ₫ (аренда велосипеда)',
        proTip: 'Остановитесь на кофе в кофейне прямо посреди рисового поля — это визитная карточка релакса в Хойане.'
      },
      {
        id: 'reloc-act-8-2',
        timeSlot: 'afternoon',
        title: 'Аутентичный обед: као лау (Cao Lầu) и белые розы (Bánh bao vạc)',
        description: 'Традиционные хойанские специалитеты в историческом ресторанчике Morning Glory или Ba Le Well. Уникальная лапша на воде из древнего колодца Ба Ле.',
        googleMapsUrl: 'https://maps.google.com/?q=Morning+Glory+Original+Hoi+An',
        estimatedCostVND: '130 000 ₫',
        proTip: 'Блюдо као лау готовят только в Хойане — повторить его рецепт в других городах невозможно из-за особой колодезной воды.'
      },
      {
        id: 'reloc-act-8-3',
        timeSlot: 'evening',
        title: 'Магия Старого города: вечерняя лодочка с плавающими фонариками',
        description: 'Желтые французско-китайские колониальные особняки, тысячи зажженных шелковых фонариков, традиционная деревянная лодка по реке Тху Бон.',
        googleMapsUrl: 'https://maps.google.com/?q=Hoi+An+Ancient+Town',
        estimatedCostVND: '100 000 ₫ (лодочка с фонариком)',
        proTip: 'Загадайте желание, опуская горящий бумажный фонарик на зеркальную гладь реки — старинная добрая традиция.'
      }
    ]
  },
  {
    dayNumber: 9,
    date: 'День 9 • Здоровье, медицина и аптеки',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Разведка международных госпиталей, страховка и базовая аптечка',
      en: 'Locating international hospitals, medical insurance & pharmacy essentials'
    },
    logisticsTip: 'Сохраните адреса госпиталей с англоязычным круглосуточным отделением (ER) и номера страхового ассистанса в телефон.',
    activities: [
      {
        id: 'reloc-act-9-1',
        timeSlot: 'morning',
        title: 'Локация международного медицинского центра Vinmec / Family Hospital',
        description: 'Визит в современный международный госпиталь JCI стандарта: проверка работы страхового отдела (Direct Billing), наличие англоязычных терапевтов.',
        googleMapsUrl: 'https://maps.google.com/?q=Vinmec+International+Hospital+Da+Nang',
        estimatedCostVND: 'Бесплатно (ознакомление с клиникой)',
        proTip: 'Большинство международных полисов (Allianz, SafetyWing, Genki) покрывают экстренные случаи и стационар в Vinmec напрямую.'
      },
      {
        id: 'reloc-act-9-2',
        timeSlot: 'afternoon',
        title: 'Сбор базовой аптечки в сетевой аптеке Pharmacity или Long Châu',
        description: 'Покупка качественных солнцезащитных кремов SPF 50+, спреев от москитов (Soffell), электролитов (Oresol), активированного угля и антигистаминных.',
        googleMapsUrl: 'https://maps.google.com/?q=Pharmacity+Da+Nang',
        estimatedCostVND: '220 000 ₫',
        proTip: 'В сетевых аптеках Long Châu и Pharmacity цены строго фиксированы государством, а на чеке печатают срок годности.'
      },
      {
        id: 'reloc-act-9-3',
        timeSlot: 'evening',
        title: 'Традиционный вьетнамский травяной спа-массаж в Herbal Spa',
        description: 'Сеанс восстановительного массажа с горячими минеральными камнями и компрессами из целебных трав для полного расслабления тела.',
        googleMapsUrl: 'https://maps.google.com/?q=Herbal+Spa+Da+Nang',
        estimatedCostVND: '350 000 ₫ (сеанс 60 мин)',
        proTip: 'Перед массажем вам предложат целебный травяной чай и свежие фрукты — отличная церемония заботы о себе.'
      }
    ]
  },
  {
    dayNumber: 10,
    date: 'День 10 • Бытовые сервисы и цифровые экосистемы',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Освоение доставок GrabFood и Shopee, прачечные и местный быт',
      en: 'Mastering GrabFood delivery, Shopee orders, laundries & local living'
    },
    logisticsTip: 'Привяжите банковскую карту к Grab и Shopee. Доставка блюд из ресторанов или свежих продуктов приезжает за 15–25 минут.',
    activities: [
      {
        id: 'reloc-act-10-1',
        timeSlot: 'morning',
        title: 'Тест экспресс-доставки фермерских продуктов и еды через GrabFood',
        description: 'Учимся заказывать любимый утренний фо бо, свежие багеты баньми и органический кофе прямо к порогу через приложение.',
        googleMapsUrl: 'https://maps.google.com/?q=Grab+Food+Da+Nang',
        estimatedCostVND: '75 000 ₫ (завтрак с доставкой)',
        proTip: 'Используйте промокоды из вкладки «Offers» в Grab — они дают скидку от 20% до 50% на каждый заказ.'
      },
      {
        id: 'reloc-act-10-2',
        timeSlot: 'afternoon',
        title: 'Разведка качественной прачечной (Giặt ủi) самообслуживания или сервиса',
        description: 'Поиск проверенной прачечной в шаговой доступности: стирка, сушка и глажка вещей по цене от 20 000 ₫ за килограмм с выдачей в тот же день.',
        googleMapsUrl: 'https://maps.google.com/?q=Laundry+Service+Da+Nang',
        estimatedCostVND: '50 000 ₫ (стирка 2-3 кг одежды)',
        proTip: 'Всегда просите режим бережной сушки при невысокой температуре для хлопковых и мембранных вещей.'
      },
      {
        id: 'reloc-act-10-3',
        timeSlot: 'evening',
        title: 'Ужин в уютном домашнем бистро домашней кухни Cơm Niêu Nhà Đỏ',
        description: 'Традиционный вьетнамский рис в глиняных горшочках, карамелизированная рыба в соусе tộ, тушеные баклажаны и суп с водяным шпинатом.',
        googleMapsUrl: 'https://maps.google.com/?q=Com+Nieu+Nha+Do+Da+Nang',
        estimatedCostVND: '150 000 ₫ / чел',
        proTip: 'Разбивание крышки глиняного горшочка при подаче — традиционное праздничное шоу официантов!'
      }
    ]
  },
  {
    dayNumber: 11,
    date: 'День 11 • Вторая волна просмотров и выбор финалиста',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Финальные просмотры лучшей квартиры, проверка договора и переговоры',
      en: 'Final apartment inspection, lease draft review & price negotiation'
    },
    logisticsTip: 'Используйте модуль «Аудит договора» в личном кабинете VietReloc! Основатель проверит условия возврата депозита и фиксацию EVN.',
    activities: [
      {
        id: 'reloc-act-11-1',
        timeSlot: 'morning',
        title: 'Повторный визит в понравившийся комплекс в дневное время',
        description: 'Финальная проверка квартиры-фаворита: естественное освещение рабочей зоны, вид на море или зелень, отсутствие шума строек в полдень.',
        googleMapsUrl: 'https://maps.google.com/?q=Hiyori+Garden+Tower+Da+Nang',
        estimatedCostVND: 'Бесплатно',
        proTip: 'Проверьте матрас и диван: если они слишком жесткие, собственники во Вьетнаме легко докупают мягкий топпер за свой счет.'
      },
      {
        id: 'reloc-act-11-2',
        timeSlot: 'afternoon',
        title: 'Переговоры с собственником: скидка на долгосрок и мебель под запрос',
        description: 'Согласование контракта на 6 или 12 месяцев, фиксация арендной ставки в донгах или долларах, обсуждение дополнительного рабочего стола.',
        googleMapsUrl: 'https://maps.google.com/?q=My+An+Da+Nang',
        estimatedCostVND: 'Экономия $30–$70/мес при грамотном торге',
        proTip: 'При заключении договора на 1 год просите скидку 5-10% либо бесплатную парковку байка и уборку 1 раз в неделю.'
      },
      {
        id: 'reloc-act-11-3',
        timeSlot: 'evening',
        title: 'Отправка проекта договора на экспресс-аудит основателю VietReloc',
        description: 'Загрузка договора в кабинет: проверка юридической чистоты, пунктов об удержании залога, форс-мажоров и регистрации в полиции.',
        googleMapsUrl: 'https://maps.google.com/?q=VietReloc+Portal',
        estimatedCostVND: 'Включено в ваш тариф релокации',
        proTip: 'Основатель проверяет договор по 5 критическим критериям безопасности в течение 2-4 часов.'
      }
    ]
  },
  {
    dayNumber: 12,
    date: 'День 12 • Подписание договора, депозит и регистрация Tạm Trú',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Безопасная сделка: опись имущества, фото счётчиков EVN и полиция',
      en: 'Safe contract signing, deposit transfer, EVN meter photos & police check'
    },
    logisticsTip: 'Сфотографируйте показания электрического и водяного счётчиков вместе с владельцем на телефон перед передачей ключей.',
    activities: [
      {
        id: 'reloc-act-12-1',
        timeSlot: 'morning',
        title: 'Подписание двуязычного договора аренды и внесение депозита',
        description: 'Подписание проверенного договора (вьетнамский + английский/русский), получение расписки о получении возвратного депозита (1 месяц).',
        googleMapsUrl: 'https://maps.google.com/?q=My+An+Real+Estate+Da+Nang',
        estimatedCostVND: 'Сумма 1 месяца аренды (депозит)',
        proTip: 'Убедитесь, что арендодатель является реальным собственником квартиры по «розовой книге» (Sổ hồng).'
      },
      {
        id: 'reloc-act-12-2',
        timeSlot: 'afternoon',
        title: 'Передача паспортов лендлорду для онлайн-регистрации tạm trú',
        description: 'Официальная регистрация временного пребывания в местной полиции района (khai báo tạm trú). Это гарантия вашей визовой безопасности.',
        googleMapsUrl: 'https://maps.google.com/?q=Cong+An+Phuong+My+An',
        estimatedCostVND: 'Бесплатно (обязанность хозяина)',
        proTip: 'Попросите скриншот или бумажный бланк подтверждения регистрации tạm trú — он потребуется для продления визы.'
      },
      {
        id: 'reloc-act-12-3',
        timeSlot: 'evening',
        title: 'Торжественный переезд в вашу постоянную квартиру!',
        description: 'Перевоз багажа из временного отеля на такси Grab, получение электронных ключ-карт от лифта и жилого комплекса, первый вечер в новом доме.',
        googleMapsUrl: 'https://maps.google.com/?q=New+Home+Da+Nang',
        estimatedCostVND: '80 000 ₫ (такси)',
        proTip: 'Закажите доставку свежих питьевых бутылей воды 19 литров через консьержа или чат дома.'
      }
    ]
  },
  {
    dayNumber: 13,
    date: 'День 13 • Обустройство дома и рабочего места мечты',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Закупка уюта, настройка оптоволокна и создание идеальной рабочей зоны',
      en: 'Home styling, high-speed fiber setup & ergonomic workspace creation'
    },
    logisticsTip: 'В магазинах JYSK, Mega Market или на Shopee можно заказать качественное постельное белье, настольную лампу и подставку под ноутбук.',
    activities: [
      {
        id: 'reloc-act-13-1',
        timeSlot: 'morning',
        title: 'Покупка предметов уюта и текстиля в JYSK / Mega Market',
        description: 'Выбор приятного хлопкового белья, мягких подушек, комнатных тропических растений в глиняных кашпо, посуды и кухонной утвари.',
        googleMapsUrl: 'https://maps.google.com/?q=Mega+Market+Da+Nang',
        estimatedCostVND: '850 000 ₫',
        proTip: 'Комнатные растения (монстера, фикус) отлично очищают воздух и создают тропический уют на балконе.'
      },
      {
        id: 'reloc-act-13-2',
        timeSlot: 'afternoon',
        title: 'Организация домашней рабочей станции и тест оптоволокна',
        description: 'Настройка рабочего места у окна: подключение ноутбука, проверка скорости домашнего роутера (150–300 Мбит/с), эргономика рабочего пространства.',
        googleMapsUrl: 'https://maps.google.com/?q=Home+Workspace+Da+Nang',
        estimatedCostVND: 'Бесплатно (интернет включен в аренду)',
        proTip: 'Если роутер стоит далеко от стола, проложите патч-корд витой пары — проводной интернет дает 0% потерь пакетов на созвонах.'
      },
      {
        id: 'reloc-act-13-3',
        timeSlot: 'evening',
        title: 'Первый домашний ужин на балконе с панорамой заката',
        description: 'Приготовление легкого ужина из свежих рыночных продуктов или доставка любимых блюд, бокал вина и вид на вечерний океан или реку.',
        googleMapsUrl: 'https://maps.google.com/?q=Balcony+Sunset+Da+Nang',
        estimatedCostVND: '200 000 ₫',
        proTip: 'Включите теплый свет гирлянды на балконе — тропический вечер станет по-настоящему кинематографичным.'
      }
    ]
  },
  {
    dayNumber: 14,
    date: 'День 14 • Полная адаптация: новая глава жизни в тропиках',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Празднование новоселья, первый продуктивный рабочий день и новый баланс',
      en: 'Celebrating your new life chapter, full remote productivity & tropical balance'
    },
    logisticsTip: 'Вы дома! У вас налажен быт, есть байк, море в 5 минутах пешком, скоростной интернет и персональная поддержка VietReloc.',
    activities: [
      {
        id: 'reloc-act-14-1',
        timeSlot: 'morning',
        title: 'Рассветный заплыв в океане и кофе со свежей выпечкой',
        description: 'Бодрящее плавание в теплом море на восходе солнца, утренний кокос на пляже и чашка ароматного кофе в любимой кофейне района.',
        googleMapsUrl: 'https://maps.google.com/?q=My+Khe+Sunrise+Da+Nang',
        estimatedCostVND: '60 000 ₫',
        proTip: 'Рассветное купание дарит заряд энергии на весь продуктивный рабочий день.'
      },
      {
        id: 'reloc-act-14-2',
        timeSlot: 'afternoon',
        title: 'Глубокий рабочий спринт в своей новой квартире с видом на пальмы',
        description: 'Первый полноценный рабочий день в статусе постоянного жителя Вьетнама: идеальная концентрация, высокая скорость интернета и комфорт.',
        googleMapsUrl: 'https://maps.google.com/?q=Remote+Work+Da+Nang',
        estimatedCostVND: 'Бесплатно',
        proTip: 'Делайте короткие 5-минутные паузы на балконе, любуясь зеленью пальм и горами на горизонте.'
      },
      {
        id: 'reloc-act-14-3',
        timeSlot: 'evening',
        title: 'Праздничный ужин с бокалом вина в ресторане на берегу океана',
        description: 'Празднование успешной релокации и начала новой главы жизни во Вьетнаме в ресторане The Dawn или Esco Beach под шум волн.',
        googleMapsUrl: 'https://maps.google.com/?q=The+Dawn+Beach+Bar+Da+Nang',
        estimatedCostVND: '350 000 ₫',
        proTip: 'Вы сделали это! Релокация прошла гладко, безопасно и без переплат.'
      }
    ]
  }
];
