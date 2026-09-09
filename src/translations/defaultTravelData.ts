import type {
  TravelDayItem,
  TravelTransitLeg,
  TravelRevisionState,
  TravelSimGuideItem,
  TravelEmergencyHospital
} from '../types';

export const DEFAULT_TRAVEL_DAYS: TravelDayItem[] = [
  {
    dayNumber: 1,
    date: 'День 1 • Прибытие',
    cityId: 'hanoi',
    cityName: { ru: 'Ханой', en: 'Hanoi' },
    title: {
      ru: 'Атмосфера Старого Квартала, озеро Хоан Кием и легендарный яичный кофе',
      en: 'Old Quarter Vibe, Hoan Kiem Lake & Authentic Egg Coffee'
    },
    logisticsTip: 'Из аэропорта Нойбай возьмите Grab (~280 000 ₫). Не садитесь к частным зазывалам в зале прилета.',
    activities: [
      {
        id: 'act-1-1',
        timeSlot: 'morning',
        title: 'Заселение в отель и акклиматизация',
        description: 'Отдых после перелета, обмен первой валюты в проверенных ювелирных лавках на улице Ha Trung (лучший курс в Ханое).',
        googleMapsUrl: 'https://maps.google.com/?q=Ha+Trung+Hanoi',
        estimatedCostVND: '150 000 ₫ (кофе и снеки)',
        proTip: 'Обменивайте крупные купюры $100 нового образца без заломов — курс будет максимальным.'
      },
      {
        id: 'act-1-2',
        timeSlot: 'afternoon',
        title: 'Озеро Хоан Кием и легендарный Cafe Giảng',
        description: 'Неспешная прогулка вокруг озера и дегустация оригинального яичного кофе (Cà phê trứng), рецепт которого придумали здесь в 1946 году.',
        googleMapsUrl: 'https://maps.google.com/?q=Cafe+Giang+39+Nguyen+Huu+Huan',
        estimatedCostVND: '35 000 ₫ за чашку',
        proTip: 'Садитесь на втором этаже во внутреннем дворике — там самая аутентичная атмосфера.'
      },
      {
        id: 'act-1-3',
        timeSlot: 'evening',
        title: 'Уличный гастротур: Bun Cha Ta Hanoi',
        description: 'Ужин с легендарным вьетнамским блюдом бун ча (жареная свинина в ароматном бульоне с рисовой лапшой и зеленью).',
        googleMapsUrl: 'https://maps.google.com/?q=Bun+Cha+Ta+Hanoi+21+Nguyen+Huu+Huan',
        estimatedCostVND: '110 000 ₫ / чел',
        proTip: 'Обязательно закажите хрустящие блинчики нем (Nem cua bể) с крабом.'
      }
    ]
  },
  {
    dayNumber: 2,
    date: 'День 2 • История и панорамы',
    cityId: 'hanoi',
    cityName: { ru: 'Ханой', en: 'Hanoi' },
    title: {
      ru: 'Храм Литературы, Западное озеро и закат на Train Street',
      en: 'Temple of Literature, West Lake & Sunset at Hanoi Train Street'
    },
    logisticsTip: 'Передвигайтесь между точками на такси GrabCar или GrabBike — поездки по центру стоят 30 000 – 50 000 ₫.',
    activities: [
      {
        id: 'act-2-1',
        timeSlot: 'morning',
        title: 'Храм Литературы (Văn Miếu)',
        description: 'Первый университет Вьетнама, основанный в 1070 году. Спокойные старинные сады, черепахи со стелами ученых и классическая архитектура.',
        googleMapsUrl: 'https://maps.google.com/?q=Temple+of+Literature+Hanoi',
        estimatedCostVND: '70 000 ₫ (входной билет)',
        proTip: 'Приходите к открытию к 8:00 утра, чтобы сделать фотографии без туристических групп.'
      },
      {
        id: 'act-2-2',
        timeSlot: 'afternoon',
        title: 'Пагода Чан Куок и Западное озеро (Tây Hồ)',
        description: 'Самая древняя пагода Ханоя на насыпном острове посреди огромного озера. Прохладный ветерок и стильные спешелти-кофейни вокруг.',
        googleMapsUrl: 'https://maps.google.com/?q=Tran+Quoc+Pagoda+Hanoi',
        estimatedCostVND: 'Бесплатно (вход)',
        proTip: 'Форма одежды: закрытые плечи и колени для входа на территорию храма.'
      },
      {
        id: 'act-2-3',
        timeSlot: 'evening',
        title: 'Train Street: поезд в метре от столика',
        description: 'Узкая улочка, сквозь которую проходит настоящий железнодорожный экспресс. Кофе или коктейль в уютном баре прямо у рельсов.',
        googleMapsUrl: 'https://maps.google.com/?q=Hanoi+Train+Street',
        estimatedCostVND: '50 000 – 80 000 ₫ (напиток)',
        proTip: 'Поезда проходят строго по расписанию (около 19:30 и 21:00). Приходите за 30 минут, чтобы занять лучший столик на террасе.'
      }
    ]
  },
  {
    dayNumber: 3,
    date: 'День 3 • Чудо природы',
    cityId: 'ninhbinh',
    cityName: { ru: 'Ниньбинь', en: 'Ninh Binh' },
    title: {
      ru: '«Халонг на суше»: лодки в гротах Чанг Ан и смотровая Ханг Муа',
      en: 'Trang An River Grottos & Panoramic Hike at Hang Mua'
    },
    logisticsTip: 'Комфортабельный лимузин-минивен забирает прямо из отеля в Ханое в 07:30 (1.5 часа в пути).',
    activities: [
      {
        id: 'act-3-1',
        timeSlot: 'morning',
        title: 'Лодочный маршрут по карстовым пещерам Чанг Ан',
        description: '3 часа медитативного сплава на лодке среди отвесных скал и проплывов через подземные гроты с прозрачной водой.',
        googleMapsUrl: 'https://maps.google.com/?q=Trang+An+Departure+Boat+Station',
        estimatedCostVND: '250 000 ₫ (билет на лодку)',
        proTip: 'Выбирайте Маршрут №2 — в нем оптимальный баланс сталактитовых пещер и храмов на воде.'
      },
      {
        id: 'act-3-2',
        timeSlot: 'afternoon',
        title: 'Обед в аутентичном ресторане с видом на рисовые чеки',
        description: 'Знакомство с локальным специалитетом Ниньбиня — козье мясо с травами (Dê núi) и хрустящий рис Cơm cháy.',
        googleMapsUrl: 'https://maps.google.com/?q=Nha+Hang+Trung+Tuyet+Ninh+Binh',
        estimatedCostVND: '180 000 ₫ / чел',
        proTip: 'Обязательно попробуйте соус tương bần к хрустящему рису.'
      },
      {
        id: 'act-3-3',
        timeSlot: 'evening',
        title: 'Подъем на вершину Дракона в Ханг Муа (Mua Caves)',
        description: '500 ступеней на вершину утеса с открывающейся панорамой на долину Там Кок и реку на закате.',
        googleMapsUrl: 'https://maps.google.com/?q=Hang+Mua+Ninh+Binh',
        estimatedCostVND: '100 000 ₫',
        proTip: 'Наденьте удобную спортивную обувь с цепкой подошвой, камни на подъеме отполированы.'
      }
    ]
  },
  {
    dayNumber: 4,
    date: 'День 4 • Перелет к морю',
    cityId: 'danang',
    cityName: { ru: 'Дананг', en: 'Da Nang' },
    title: {
      ru: 'Перелет в Дананг, заселение у пляжа Ми Кхе и шоу Моста Дракона',
      en: 'Flight to Da Nang, Beach Check-in & Dragon Bridge Fire Show'
    },
    logisticsTip: 'Внутренний рейс Vietnam Airlines / VietJet (1 час 20 минут). В Дананге аэропорт находится прямо в черте города — до пляжа 15 минут на Grab.',
    activities: [
      {
        id: 'act-4-1',
        timeSlot: 'morning',
        title: 'Трансфер в аэропорт Нойбай и перелет в Дананг',
        description: 'Быстрый перелет из северного Ханоя на солнечное побережье Центрального Вьетнама.',
        googleMapsUrl: 'https://maps.google.com/?q=Da+Nang+International+Airport',
        estimatedCostVND: 'Билет на самолет ~$45–60',
        proTip: 'Садитесь у иллюминатора слева по ходу самолета — при заходе на посадку в Дананге открывается потрясающий вид на полуостров Сон Тра и океан.'
      },
      {
        id: 'act-4-2',
        timeSlot: 'afternoon',
        title: 'Пляж Ми Кхе и смузи-боул в Ан Тхыонге',
        description: 'Первое купание в теплом Южно-Китайском море, белоснежный песок и прогулка по европейскому экспатскому кварталу.',
        googleMapsUrl: 'https://maps.google.com/?q=My+Khe+Beach+Da+Nang',
        estimatedCostVND: '65 000 ₫ (кокос или манго-шейк)',
        proTip: 'Аренда шезлонга под зонтом на пляже стоит фиксированные 40 000 ₫ на весь день.'
      },
      {
        id: 'act-4-3',
        timeSlot: 'evening',
        title: 'Шоу огня и воды на Мосту Дракона',
        description: 'Огромный мост в форме дракона, который извергает пламя и струи воды в выходные дни ровно в 21:00.',
        googleMapsUrl: 'https://maps.google.com/?q=Dragon+Bridge+Da+Nang',
        estimatedCostVND: 'Бесплатно',
        proTip: 'Не стойте на голове дракона с наветренной стороны, чтобы не промокнуть до нитки от водяной пушки.'
      }
    ]
  },
  {
    dayNumber: 5,
    date: 'День 5 • Магия фонарей',
    cityId: 'hoian',
    cityName: { ru: 'Хойан', en: 'Hoi An' },
    title: {
      ru: 'Мраморные горы, переезд в древний Хойан и лодочки с желаниями',
      en: 'Marble Mountains, Ancient Hoi An & River Lantern Boat'
    },
    logisticsTip: 'Из Дананга в Хойан 35 минут на такси (около 250 000 ₫ / $10). Сделайте остановку у Мраморных гор по дороге.',
    activities: [
      {
        id: 'act-5-1',
        timeSlot: 'morning',
        title: 'Мраморные горы (Ngũ Hành Sơn)',
        description: 'Пять известняковых холмов с природными гротами, буддийскими алтарями и лучами света, пробивающимися сквозь своды пещеры Huyen Khong.',
        googleMapsUrl: 'https://maps.google.com/?q=Marble+Mountains+Da+Nang',
        estimatedCostVND: '40 000 ₫ (вход)',
        proTip: 'Возьмите лифт наверх (15 000 ₫), а спускайтесь пешком через пещеры — это сбережет силы.'
      },
      {
        id: 'act-5-2',
        timeSlot: 'afternoon',
        title: 'Прогулка по Старому городу ЮНЕСКО без мопедов',
        description: 'Желтые колониальные домики, цветущие бугенвиллии, старинный Японский крытый мост и чайные дворики.',
        googleMapsUrl: 'https://maps.google.com/?q=Hoi+An+Ancient+Town',
        estimatedCostVND: '120 000 ₫ (единый билет в музеи)',
        proTip: 'Зайдите в тихий чайный дом Reaching Out Teahouse — его обслуживают слабослышащие мастера, там царит абсолютный покой.'
      },
      {
        id: 'act-5-3',
        timeSlot: 'evening',
        title: 'Деревянная лодка по реке Хоай и пуск светящихся фонариков',
        description: 'Когда наступает вечер, в городе гасят электрический свет и зажигают тысячи шелковых фонарей. Река наполняется плавающими огоньками.',
        googleMapsUrl: 'https://maps.google.com/?q=Hoai+River+Boat+Station+Hoi+An',
        estimatedCostVND: '150 000 ₫ за лодку на 20 минут',
        proTip: 'Покупайте фонарик из цветной бумаги прямо у лодочника за 10 000 ₫.'
      }
    ]
  }
];

export const DEFAULT_TRAVEL_TRANSIT_LEGS: TravelTransitLeg[] = [
  {
    id: 'leg-1',
    fromCity: 'Ханой',
    toCity: 'Ниньбинь',
    transportMode: 'private_car',
    duration: '1 ч 30 мин',
    bookingTip: 'VIP Limousine 9 мест с откидными креслами. Забирает от лобби отеля в Старом Квартале. Бронируется за 1 день.',
    bookingUrl: 'https://12go.asia'
  },
  {
    id: 'leg-2',
    fromCity: 'Ханой',
    toCity: 'Дананг',
    transportMode: 'flight',
    duration: '1 ч 20 мин',
    bookingTip: 'Рекомендуем Vietnam Airlines (рейсы вылетают без задержек, включен багаж 23 кг).',
    bookingUrl: 'https://www.vietnamairlines.com'
  },
  {
    id: 'leg-3',
    fromCity: 'Дананг',
    toCity: 'Хойан',
    transportMode: 'private_car',
    duration: '35 мин',
    bookingTip: 'Удобнее всего вызвать GrabCar 4-местный (~250 000 ₫). Оплата списывается с карты или наличными водителю.'
  }
];

export const DEFAULT_TRAVEL_REVISION: TravelRevisionState = {
  requested: false,
  usedCount: 0,
  maxCount: 1,
  status: 'none'
};

export const DEFAULT_TRAVEL_SIM_GUIDE: TravelSimGuideItem[] = [
  {
    provider: 'Viettel',
    type: 'eSIM',
    dataPackage: '4–5 GB/день (60–150 GB в месяц)',
    priceUSD: 12,
    officialStoreAddress: 'Официальный салон: Viettel Store (Ханой: 53 Lương Văn Can; Дананг: 95 Nguyễn Văn Linh)',
    googleMapsUrl: 'https://maps.google.com/?q=Viettel+Store+Da+Nang',
    warningNote: 'Не покупайте безымянные SIM у водителей такси или на лотках без паспорта — их блокируют через 3 дня.'
  },
  {
    provider: 'Airalo / Maya Mobile',
    type: 'eSIM',
    dataPackage: '10–20 GB на 15–30 дней',
    priceUSD: 15,
    officialStoreAddress: 'Покупается онлайн до вылета, QR-код сканируется в настройках смартфона за 2 минуты',
    warningNote: 'Идеально для интернета сразу по прилету в аэропорт без очередей. Работает через сеть Vinaphone 4G/5G.'
  },
  {
    provider: 'Vinaphone',
    type: 'physical',
    dataPackage: '4 GB в день + звонки',
    priceUSD: 10,
    officialStoreAddress: 'Официальный салон в аэропорту Дананга (выход из зала прилета, официальная стойка VNPT)',
    warningNote: 'Обязательно предъявляйте оригинальный загранпаспорт для внесения в единый государственный реестр связи Вьетнама.'
  }
];

export const DEFAULT_TRAVEL_HOSPITALS: TravelEmergencyHospital[] = [
  {
    city: 'Дананг',
    name: 'Vinmec Danang International Hospital',
    address: 'Đường 30 Tháng 4, Khu dân cư số 4 Nguyễn Tri Phương, Hải Châu, Đà Nẵng',
    phone: '+84 236 3711 111',
    hasEnglish: true,
    type: 'international'
  },
  {
    city: 'Дананг',
    name: 'Family Medical Practice Danang',
    address: '96–98 Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng',
    phone: '+84 236 3582 699',
    hasEnglish: true,
    type: 'international'
  },
  {
    city: 'Ханой',
    name: 'Vinmec Times City International Hospital',
    address: '458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội',
    phone: '+84 24 3974 3556',
    hasEnglish: true,
    type: 'international'
  },
  {
    city: 'Хошимин',
    name: 'FV Hospital (Franco-Vietnamese)',
    address: '6 Nguyễn Lương Bằng, Tân Phú, Quận 7, TP. Hồ Chí Minh',
    phone: '+84 28 5411 3333',
    hasEnglish: true,
    type: 'international'
  }
];
