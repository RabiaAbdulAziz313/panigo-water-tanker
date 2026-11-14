export const RAW = {
  South: [["Saddar","صدر",5],["Clifton","کلفٹن",8],["DHA Defence","ڈیفنس (ڈی ایچ اے)",12],["Kharadar","کھارادر",6],["Lyari","لیاری",7],["Boat Basin","بوٹ بیسن",8],["Gizri","گزری",10]],
  East: [["Gulshan-e-Iqbal","گلشنِ اقبال",6],["Gulistan-e-Jauhar","گلستانِ جوہر",7],["PECHS","پی ای سی ایچ ایس",6],["Bahadurabad","بہادر آباد",6],["Tariq Road","طارق روڈ",6],["Karachi University","کراچی یونیورسٹی",8],["Safoora Goth","سفورا گوٹھ",10]],
  Central: [["North Nazimabad","نارتھ ناظم آباد",9],["Nazimabad","ناظم آباد",8],["Liaquatabad","لیاقت آباد",7],["Federal B Area","فیڈرل بی ایریا",8],["Gulberg","گلبرگ",8],["New Karachi","نیو کراچی",12],["North Karachi","نارتھ کراچی",13],["Buffer Zone","بفر زون",12]],
  West: [["Orangi Town","اورنگی ٹاؤن",13],["SITE Area","سائٹ ایریا",11],["Baldia Town","بلدیہ ٹاؤن",14],["Surjani Town","سرجانی ٹاؤن",18],["Qasba Colony","قصبہ کالونی",12],["Mangopir","منگھو پیر",16]],
  Malir: [["Malir","ملیر",16],["Model Colony","ماڈل کالونی",14],["Gulshan-e-Hadeed","گلشنِ حدید",9],["Quaidabad","قائد آباد",14],["Gulshan-e-Maymar","گلشنِ معمار",14],["Scheme 33","اسکیم 33",14],["Bin Qasim","بن قاسم",15]],
  Korangi: [["Korangi","کورنگی",14],["Landhi","لانڈھی",15],["Korangi Industrial Area","کورنگی انڈسٹریل ایریا",15],["Shah Faisal Colony","شاہ فیصل کالونی",12],["Zaman Town","زمان ٹاؤن",13]],
  Keamari: [["Keamari","کیماڑی",10],["Mauripur","ماری پور",10],["Sultanabad","سلطان آباد",10],["Hawksbay","ہاکس بے",20],["Manora","منوڑا",18]]
};
export const AREAS = { Other: { en: "Other area", ur: "دوسرا علاقہ", km: 10 } };
export const DISTRICTS = {}, AREA_KM = {};
Object.entries(RAW).forEach(([d, list]) => { DISTRICTS[d] = list.map(([en, ur, km]) => { AREAS[en] = { en, ur, km }; return en; }); });
Object.keys(AREAS).forEach(k => { AREA_KM[k] = AREAS[k].km; });
// Google Maps link: uses the pinned location if available, else searches the written address
export const mapUrl = b => "https://www.google.com/maps/search/?api=1&query=" + (b.pin ? b.pin.lat + "," + b.pin.lng : encodeURIComponent(b.address + ", " + (AREAS[b.area] ? AREAS[b.area].en : "") + ", Karachi, Pakistan"));
export const SLOTS = { Morning: ["🌅", "8-12"], Afternoon: ["☀️", "12-4"], Evening: ["🌙", "4-8"] };
