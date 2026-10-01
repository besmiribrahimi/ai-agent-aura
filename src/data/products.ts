export interface Product {
  id: string;
  name: string;
  category: 'laptops' | 'audio' | 'phones' | 'accessories';
  price: number;
  originalPrice?: number;
  monthlyInstallment12: number; // 0% with partner banks
  monthlyInstallment24: number; // 0% with TEB / NLB
  image: string;
  tagline: string;
  specs: string[];
  warrantyMonths: number;
  inStock: boolean;
  boxCondition: 'Fabrikisht e mbyllur (Original Sealed)';
  courierDeliveryDays: '2-4 ditë pune';
  description: string;
  featured?: boolean;
}

export const KOSOVA_PRODUCTS: Product[] = [
  {
    id: 'prod-laptop-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    category: 'laptops',
    price: 1499,
    originalPrice: 1699,
    monthlyInstallment12: 124.91,
    monthlyInstallment24: 62.45,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    tagline: 'Intel Core i7-1365U, 16GB RAM, 512GB NVMe, 14" WUXGA IPS',
    specs: [
      'Procesori: Intel Core i7-1365U vPro (10 bërthama)',
      'RAM: 16GB LPDDR5 6400MHz',
      'Kujtesa: 512GB SSD PCIe Gen 4',
      'Ekrani: 14" WUXGA (1920x1200) Anti-glare 400 nits',
      'Pesha: 1.12 kg me fibër karboni',
      'Portet: 2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.0b',
    ],
    warrantyMonths: 24,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Laptopi elitar për biznes dhe programim. Shitet vetëm me paketim origjinal të vulosur me garancion zyrtar të autorizuar në Kosovë. Mbështet blerjen me 0% këste përmes kartelave TEB Starcard, NLB, BKT dhe Raiffeisen.',
    featured: true,
  },
  {
    id: 'prod-headphones-xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling',
    category: 'audio',
    price: 369,
    originalPrice: 419,
    monthlyInstallment12: 30.75,
    monthlyInstallment24: 15.37,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    tagline: 'Izolimi më i mirë i zhurmës, 30 orë bateri, Hi-Res Audio Wireless',
    specs: [
      'Procesori: Auto NC Optimizer me dy procesorë V1 & QN1',
      'Mikrofonët: 8 mikrofona për izolim zëri dhe thirrje të pastra',
      'Bateria: 30 orë me NC aktiv (3 min karkim = 3 orë dëgjim)',
      'Lidhja: Bluetooth 5.2 me Multipoint (dy pajisje njëkohësisht)',
      'Pesha: 250 gram me lëkurë sintetike ultra të butë',
    ],
    warrantyMonths: 24,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Kufjet lider në botë për izolimin e zhurmës. Vijnë me vulë origjinale fabrike. E drejta e kthimit pranohet rreptësisht brenda 30 ditësh vetëm nëse kutia mbetet e pahapur.',
    featured: true,
  },
  {
    id: 'prod-phone-iphone15',
    name: 'Apple iPhone 15 Pro Max 256GB',
    category: 'phones',
    price: 1299,
    originalPrice: 1399,
    monthlyInstallment12: 108.25,
    monthlyInstallment24: 54.12,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    tagline: 'Titanium Natyral, Çipi A17 Pro, Kamera 48MP me 5x Telephoto',
    specs: [
      'Çipi: A17 Pro me 6-Core GPU për gaming dhe efikasitet',
      'Kamera: 48MP kryesore + 12MP Ultra-wide + 12MP 5x Telephoto',
      'Ekrani: 6.7" Super Retina XDR OLED me ProMotion 120Hz',
      'Konektori: USB-C me shpejtësi USB 3 deri 10Gbps',
      'Materiali: Kornizë titani me xham mat Ceramic Shield',
    ],
    warrantyMonths: 12,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Telefoni flamurtar i Apple me kornizë titani të lehtë dhe çipin A17 Pro. Dërgesa e sigurt me korrier kudo në Kosovë brenda 2-4 ditë pune.',
    featured: true,
  },
  {
    id: 'prod-macbook-pro',
    name: 'Apple MacBook Pro 14" M3 Pro',
    category: 'laptops',
    price: 2199,
    originalPrice: 2349,
    monthlyInstallment12: 183.25,
    monthlyInstallment24: 91.62,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    tagline: '18GB Unified Memory, 512GB SSD, Liquid Retina XDR, Space Black',
    specs: [
      'Çipi: Apple M3 Pro (11-Core CPU, 14-Core GPU)',
      'RAM: 18GB memorie e bashkuar me bandë 150GB/s',
      'Ekrani: 14.2" Liquid Retina XDR me 1600 nits peak HDR',
      'Bateria: Deri në 18 orë punë intensive pa u karikuar',
      'Pesha: 1.61 kg me shasi alumini të ricikluar',
    ],
    warrantyMonths: 24,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Për profesionistët që kërkojnë performancë pa kompromis. E disponueshme me 0% këste në dyqanin tonë në Prishtinë dhe online.',
  },
  {
    id: 'prod-airpods-pro2',
    name: 'Apple AirPods Pro (Gjenerata e 2-të) USB-C',
    category: 'audio',
    price: 249,
    originalPrice: 279,
    monthlyInstallment12: 20.75,
    monthlyInstallment24: 10.37,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    tagline: 'Çipi H2, Izolim aktiv zhurme 2x më i fuqishëm, USB-C MagSafe',
    specs: [
      'Procesori: Çipi Apple H2 me Audio Hapësinore të Personalizuar',
      'Izolimi: Active Noise Cancellation + Adaptive Audio & Transparency',
      'Kutia: MagSafe me altoparlant dhe grep për varëse (IP54)',
      'Bateria: 6 orë dëgjim me një karikim, 30 orë me kuti',
    ],
    warrantyMonths: 12,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Kufjet me të kërkuara në treg. Kutia me port USB-C dhe mbrojtje nga pluhuri dhe djersa.',
  },
  {
    id: 'prod-watch-ultra2',
    name: 'Apple Watch Ultra 2 Titanium 49mm',
    category: 'accessories',
    price: 849,
    originalPrice: 919,
    monthlyInstallment12: 70.75,
    monthlyInstallment24: 35.37,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    tagline: 'Kornizë Titani 49mm, Ekrani 3000 nits, Çipi S9 SiP me Double Tap',
    specs: [
      'Shasia: Titan i shkallës aerohapësinore me buzë të ngritura mbrojtëse',
      'Ekrani: Safir kristal me shkëlqim ekstrem 3000 nits',
      'GPS: Frekuencë e dyfishtë precize L1 dhe L5',
      'Rezistenca: Zhytje deri në 100 metra dhe certifikim MIL-STD 810H',
      'Bateria: 36 orë përdorim normal, deri 72 orë në Low Power',
    ],
    warrantyMonths: 24,
    inStock: true,
    boxCondition: 'Fabrikisht e mbyllur (Original Sealed)',
    courierDeliveryDays: '2-4 ditë pune',
    description:
      'Ora më e qëndrueshme dhe e fuqishme e krijuar ndonjëherë për sporte ekstreme dhe përditshmëri.',
  },
];

export interface StoreOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  items: { productName: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentMethod: 'Këste me TEB Starcard (0%)' | 'Para në dorë te korrieri' | 'Kartelë Bankare';
  orderDate: string;
  courierStatus: 'Në Tranzit (Vonuar)' | 'Dorëzuar' | 'Në Përgatitje';
  daysElapsed: number;
  carrierName: string;
  trackingNotes: string;
}

export const SAMPLE_ORDERS: Record<string, StoreOrder> = {
  '#1048': {
    orderNumber: '#1048',
    customerName: 'Bleron Gashi',
    phone: '+383 49 123 456',
    city: 'Prizren',
    items: [
      { productName: 'Lenovo ThinkPad X1 Carbon Gen 11', quantity: 1, price: 1499 },
    ],
    totalAmount: 1499,
    paymentMethod: 'Këste me TEB Starcard (0%)',
    orderDate: '25 Shtator 2026',
    courierStatus: 'Në Tranzit (Vonuar)',
    daysElapsed: 6,
    carrierName: 'Posta Shqiptare / Korrier Privat',
    trackingNotes: 'Pakoja ka kaluar afatin standard 2-4 ditor. Tiketë logjistike aktive #LOG-1048.',
  },
  '#1031': {
    orderNumber: '#1031',
    customerName: 'Arben Krasniqi',
    phone: '+383 44 555 777',
    city: 'Prishtinë',
    items: [
      { productName: 'Sony WH-1000XM5 Wireless', quantity: 1, price: 369 },
    ],
    totalAmount: 369,
    paymentMethod: 'Kartelë Bankare',
    orderDate: '28 Shtator 2026',
    courierStatus: 'Në Tranzit (Vonuar)',
    daysElapsed: 3,
    carrierName: 'Korrier i Shpejtë Kosovë',
    trackingNotes: 'Në shpërndarje. Të dhënat e adresës janë të mbrojtura me Zero-Trust PII.',
  },
};
