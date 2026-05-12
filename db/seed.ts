import { getDb } from "../api/queries/connection";
import { cities, services, reviews, faqs, servicePages } from "./schema";

// ── 81 Turkish Cities ───────────────────────────────────────────
const allCities = [
  { name: "Adana", slug: "adana", region: "Akdeniz", population: 2263373, areaCode: "0322", lat: "36.9914", lng: "35.3308", districts: ["Seyhan", "Çukurova", "Yüreğir", "Sarıçam", "Karaisalı", "Kozan", "Ceyhan", "Yumurtalık", "Feke", "Saimbeyli", "Tufanbeylı", "Aladağ", "İmamoğlu", "Karataş", "Pozantı"] },
  { name: "Adıyaman", slug: "adiyaman", region: "Güneydoğu Anadolu", population: 635169, areaCode: "0416", lat: "37.7648", lng: "38.2786", districts: ["Merkez", "Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Samsat", "Sincik", "Tut"] },
  { name: "Afyonkarahisar", slug: "afyonkarahisar", region: "Ege", population: 736912, areaCode: "0272", lat: "38.7638", lng: "30.5400", districts: ["Merkez", "Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Sandıklı", "Sinanpaşa", "Şuhut", "Sultandağı"] },
  { name: "Ağrı", slug: "agri", region: "Doğu Anadolu", population: 536199, areaCode: "0472", lat: "39.7191", lng: "43.0503", districts: ["Merkez", "Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Patnos", "Taşlıçay", "Tutak"] },
  { name: "Amasya", slug: "amasya", region: "Karadeniz", population: 335331, areaCode: "0358", lat: "40.6499", lng: "35.8353", districts: ["Merkez", "Göynücek", "Gümüşhacıköy", "Hamamözü", "Merzifon", "Suluova", "Taşova"] },
  { name: "Ankara", slug: "ankara", region: "İç Anadolu", population: 5663322, areaCode: "0312", lat: "39.9334", lng: "32.8597", districts: ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kalecik", "Kahramankazan", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"] },
  { name: "Antalya", slug: "antalya", region: "Akdeniz", population: 2619832, areaCode: "0242", lat: "36.8969", lng: "30.7133", districts: ["Akseki", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"] },
  { name: "Artvin", slug: "artvin", region: "Karadeniz", population: 169543, areaCode: "0466", lat: "41.1828", lng: "41.8185", districts: ["Merkez", "Ardanuç", "Arhavi", "Borçka", "Hopa", "Murgul", "Şavşat", "Yusufeli"] },
  { name: "Aydın", slug: "aydin", region: "Ege", population: 1134031, areaCode: "0256", lat: "37.8560", lng: "27.8416", districts: ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"] },
  { name: "Balıkesir", slug: "balikesir", region: "Marmara", population: 1250610, areaCode: "0266", lat: "39.6484", lng: "27.8826", districts: ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"] },
  { name: "Bilecik", slug: "bilecik", region: "Marmara", population: 228334, areaCode: "0228", lat: "40.0567", lng: "30.0665", districts: ["Merkez", "Bozüyük", "Gölpazarı", "İnhisar", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"] },
  { name: "Bingöl", slug: "bingol", region: "Doğu Anadolu", population: 283132, areaCode: "0426", lat: "39.0626", lng: "40.7696", districts: ["Merkez", "Adaklı", "Genç", "Karlıova", "Kiğı", "Solhan", "Yayladere", "Yedisu"] },
  { name: "Bitlis", slug: "bitlis", region: "Doğu Anadolu", population: 351825, areaCode: "0434", lat: "38.4006", lng: "42.1095", districts: ["Merkez", "Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Mutki", "Tatvan"] },
  { name: "Bolu", slug: "bolu", region: "Karadeniz", population: 320558, areaCode: "0374", lat: "40.5760", lng: "31.5788", districts: ["Merkez", "Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Mudurnu", "Seben", "Yeniçağa"] },
  { name: "Burdur", slug: "burdur", region: "Akdeniz", population: 273799, areaCode: "0248", lat: "37.4613", lng: "30.0665", districts: ["Merkez", "Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Tefenni", "Yeşilova"] },
  { name: "Bursa", slug: "bursa", region: "Marmara", population: 3147818, areaCode: "0224", lat: "40.1826", lng: "29.0665", districts: ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"] },
  { name: "Çanakkale", slug: "canakkale", region: "Marmara", population: 557276, areaCode: "0286", lat: "40.1553", lng: "26.4142", districts: ["Ayvacık", "Bayramiç", "Biga", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"] },
  { name: "Çankırı", slug: "cankiri", region: "İç Anadolu", population: 195800, areaCode: "0376", lat: "40.6013", lng: "33.6134", districts: ["Merkez", "Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Orta", "Şabanözü", "Yapraklı"] },
  { name: "Çorum", slug: "corum", region: "Karadeniz", population: 528422, areaCode: "0364", lat: "40.5506", lng: "34.9556", districts: ["Merkez", "Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"] },
  { name: "Denizli", slug: "denizli", region: "Ege", population: 1046297, areaCode: "0258", lat: "37.7765", lng: "29.0864", districts: ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"] },
  { name: "Diyarbakır", slug: "diyarbakir", region: "Güneydoğu Anadolu", population: 1822106, areaCode: "0412", lat: "37.9143", lng: "40.2306", districts: ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"] },
  { name: "Edirne", slug: "edirne", region: "Marmara", population: 412115, areaCode: "0284", lat: "41.6771", lng: "26.5557", districts: ["Merkez", "Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Süloğlu", "Uzunköprü"] },
  { name: "Elazığ", slug: "elazig", region: "Doğu Anadolu", population: 595670, areaCode: "0424", lat: "38.6748", lng: "39.2225", districts: ["Merkez", "Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Palu", "Sivrice"] },
  { name: "Erzincan", slug: "erzincan", region: "Doğu Anadolu", population: 237351, areaCode: "0446", lat: "39.7500", lng: "39.5000", districts: ["Merkez", "Çayırlı", "İliç", "Kemah", "Kemaliye", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"] },
  { name: "Erzurum", slug: "erzurum", region: "Doğu Anadolu", population: 767848, areaCode: "0442", lat: "39.9000", lng: "41.2700", districts: ["Aziziye", "Aşkale", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"] },
  { name: "Eskişehir", slug: "eskisehir", region: "İç Anadolu", population: 898556, areaCode: "0222", lat: "39.7767", lng: "30.5206", districts: ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"] },
  { name: "Gaziantep", slug: "gaziantep", region: "Güneydoğu Anadolu", population: 2101157, areaCode: "0342", lat: "37.0662", lng: "37.3833", districts: ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"] },
  { name: "Giresun", slug: "giresun", region: "Karadeniz", population: 450154, areaCode: "0454", lat: "40.9128", lng: "38.3895", districts: ["Merkez", "Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"] },
  { name: "Gümüşhane", slug: "gumushane", region: "Karadeniz", population: 150119, areaCode: "0456", lat: "40.4608", lng: "39.4817", districts: ["Merkez", "Kelkit", "Köse", "Kürtün", "Şiran", "Torul"] },
  { name: "Hakkari", slug: "hakkari", region: "Doğu Anadolu", population: 280991, areaCode: "0438", lat: "37.5833", lng: "43.7333", districts: ["Merkez", "Çukurca", "Derecik", "Şemdinli", "Yüksekova"] },
  { name: "Hatay", slug: "hatay", region: "Akdeniz", population: 1677196, areaCode: "0326", lat: "36.4018", lng: "36.3498", districts: ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"] },
  { name: "Isparta", slug: "isparta", region: "Akdeniz", population: 444914, areaCode: "0246", lat: "37.7648", lng: "30.5566", districts: ["Merkez", "Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Şarkikaraağaç", "Senirkent", "Sütçüler", "Uluborlu", "Yalvaç", "Yenişarbademli"] },
  { name: "Mersin", slug: "mersin", region: "Akdeniz", population: 1888657, areaCode: "0324", lat: "36.8000", lng: "34.6333", districts: ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"] },
  { name: "İstanbul", slug: "istanbul", region: "Marmara", population: 15729224, areaCode: "0212", lat: "41.0082", lng: "28.9784", districts: ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"] },
  { name: "İzmir", slug: "izmir", region: "Ege", population: 4384607, areaCode: "0232", lat: "38.4237", lng: "27.1428", districts: ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"] },
  { name: "Kars", slug: "kars", region: "Doğu Anadolu", population: 284150, areaCode: "0474", lat: "40.6013", lng: "43.0975", districts: ["Merkez", "Akyaka", "Arpaçay", "Digor", "Kağızman", "Sarıkamış", "Selim", "Susuz"] },
  { name: "Kastamonu", slug: "kastamonu", region: "Karadeniz", population: 376377, areaCode: "0366", lat: "41.3887", lng: "33.7827", districts: ["Merkez", "Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Küre", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"] },
  { name: "Kayseri", slug: "kayseri", region: "İç Anadolu", population: 1422144, areaCode: "0352", lat: "38.7205", lng: "35.4826", districts: ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"] },
  { name: "Kırklareli", slug: "kirklareli", region: "Marmara", population: 369864, areaCode: "0288", lat: "41.7333", lng: "27.2167", districts: ["Merkez", "Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Pehlivanköy", "Pınarhisar", "Vize"] },
  { name: "Kırşehir", slug: "kirsehir", region: "İç Anadolu", population: 246958, areaCode: "0386", lat: "39.1425", lng: "34.1709", districts: ["Merkez", "Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Mucur"] },
  { name: "Kocaeli", slug: "kocaeli", region: "Marmara", population: 2033441, areaCode: "0262", lat: "40.8533", lng: "29.8815", districts: ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"] },
  { name: "Konya", slug: "konya", region: "İç Anadolu", population: 2252000, areaCode: "0332", lat: "37.8667", lng: "32.4833", districts: ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"] },
  { name: "Kütahya", slug: "kutahya", region: "Ege", population: 578789, areaCode: "0274", lat: "39.4167", lng: "29.9833", districts: ["Merkez", "Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Pazarlar", "Simav", "Şaphane", "Tavşanlı"] },
  { name: "Malatya", slug: "malatya", region: "Doğu Anadolu", population: 808692, areaCode: "0422", lat: "38.3554", lng: "38.3337", districts: ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"] },
  { name: "Manisa", slug: "manisa", region: "Ege", population: 1466609, areaCode: "0236", lat: "38.6191", lng: "27.4289", districts: ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"] },
  { name: "Kahramanmaraş", slug: "kahramanmaras", region: "Akdeniz", population: 1166745, areaCode: "0344", lat: "37.5833", lng: "36.9333", districts: ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"] },
  { name: "Mardin", slug: "mardin", region: "Güneydoğu Anadolu", population: 870374, areaCode: "0482", lat: "37.3212", lng: "40.7245", districts: ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"] },
  { name: "Muğla", slug: "mugla", region: "Ege", population: 1021164, areaCode: "0252", lat: "37.2154", lng: "28.3636", districts: ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"] },
  { name: "Muş", slug: "mus", region: "Doğu Anadolu", population: 399656, areaCode: "0436", lat: "38.9462", lng: "41.7539", districts: ["Merkez", "Bulanık", "Hasköy", "Korkut", "Malazgirt", "Varto"] },
  { name: "Nevşehir", slug: "nevsehir", region: "İç Anadolu", population: 303010, areaCode: "0384", lat: "38.6939", lng: "34.6857", districts: ["Merkez", "Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Ürgüp"] },
  { name: "Niğde", slug: "nigde", region: "İç Anadolu", population: 365419, areaCode: "0388", lat: "37.9667", lng: "34.6833", districts: ["Merkez", "Altunhisar", "Bor", "Çamardı", "Çiftlik", "Ulukışla"] },
  { name: "Ordu", slug: "ordu", region: "Karadeniz", population: 754198, areaCode: "0452", lat: "40.9833", lng: "37.8833", districts: ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"] },
  { name: "Rize", slug: "rize", region: "Karadeniz", population: 344359, areaCode: "0464", lat: "41.0201", lng: "40.5234", districts: ["Merkez", "Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Pazar"] },
  { name: "Sakarya", slug: "sakarya", region: "Marmara", population: 1060876, areaCode: "0264", lat: "40.7569", lng: "30.3788", districts: ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"] },
  { name: "Samsun", slug: "samsun", region: "Karadeniz", population: 1356079, areaCode: "0362", lat: "41.2867", lng: "36.3300", districts: ["Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"] },
  { name: "Siirt", slug: "siirt", region: "Güneydoğu Anadolu", population: 331311, areaCode: "0484", lat: "37.9274", lng: "41.9420", districts: ["Merkez", "Baykan", "Eruh", "Kurtalan", "Pervari", "Şirvan", "Tillo"] },
  { name: "Sinop", slug: "sinop", region: "Karadeniz", population: 218408, areaCode: "0368", lat: "42.0231", lng: "35.1531", districts: ["Merkez", "Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Saraydüzü", "Türkeli"] },
  { name: "Sivas", slug: "sivas", region: "İç Anadolu", population: 635889, areaCode: "0346", lat: "39.7477", lng: "37.0179", districts: ["Merkez", "Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Gürün", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"] },
  { name: "Tekirdağ", slug: "tekirdag", region: "Marmara", population: 1127830, areaCode: "0282", lat: "40.9781", lng: "27.5112", districts: ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"] },
  { name: "Tokat", slug: "tokat", region: "Karadeniz", population: 597920, areaCode: "0356", lat: "40.3167", lng: "36.5500", districts: ["Merkez", "Almus", "Artova", "Başçiftlik", "Erbaa", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"] },
  { name: "Trabzon", slug: "trabzon", region: "Karadeniz", population: 816684, areaCode: "0462", lat: "41.0015", lng: "39.7178", districts: ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"] },
  { name: "Tunceli", slug: "tunceli", region: "Doğu Anadolu", population: 83402, areaCode: "0428", lat: "39.3074", lng: "39.4388", districts: ["Merkez", "Çemişgezek", "Hozat", "Mazgirt", "Nazımiye", "Ovacık", "Pertek", "Pülümür"] },
  { name: "Şanlıurfa", slug: "sanliurfa", region: "Güneydoğu Anadolu", population: 2160671, areaCode: "0414", lat: "37.1591", lng: "38.7969", districts: ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"] },
  { name: "Uşak", slug: "usak", region: "Ege", population: 375454, areaCode: "0276", lat: "38.6823", lng: "29.4082", districts: ["Merkez", "Banaz", "Eşme", "Karahallı", "Sivaslı", "Ulubey"] },
  { name: "Van", slug: "van", region: "Doğu Anadolu", population: 1142000, areaCode: "0432", lat: "38.4891", lng: "43.4089", districts: ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"] },
  { name: "Yozgat", slug: "yozgat", region: "İç Anadolu", population: 418442, areaCode: "0354", lat: "39.8181", lng: "34.8147", districts: ["Merkez", "Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"] },
  { name: "Zonguldak", slug: "zonguldak", region: "Karadeniz", population: 588510, areaCode: "0372", lat: "41.4564", lng: "31.7987", districts: ["Merkez", "Alaplı", "Çaycuma", "Devrek", "Ereğli", "Gökçebey", "Kilimli", "Kozlu"] },
  { name: "Aksaray", slug: "aksaray", region: "İç Anadolu", population: 429069, areaCode: "0382", lat: "38.3687", lng: "34.0370", districts: ["Merkez", "Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Ortaköy", "Sarıyahşi"] },
  { name: "Bayburt", slug: "bayburt", region: "Karadeniz", population: 84982, areaCode: "0458", lat: "40.2589", lng: "40.2280", districts: ["Merkez", "Aydıntepe", "Demirözü"] },
  { name: "Karaman", slug: "karaman", region: "İç Anadolu", population: 256852, areaCode: "0338", lat: "37.1811", lng: "33.2150", districts: ["Merkez", "Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Sarıveliler"] },
  { name: "Kırıkkale", slug: "kirikkale", region: "İç Anadolu", population: 278703, areaCode: "0318", lat: "39.8468", lng: "33.5153", districts: ["Merkez", "Bahşili", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Sulakyurt", "Yahşihan"] },
  { name: "Batman", slug: "batman", region: "Güneydoğu Anadolu", population: 641886, areaCode: "0488", lat: "37.8812", lng: "41.1351", districts: ["Merkez", "Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Sason"] },
  { name: "Şırnak", slug: "sirnak", region: "Güneydoğu Anadolu", population: 557605, areaCode: "0486", lat: "37.4187", lng: "42.4908", districts: ["Merkez", "Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Silopi", "Uludere"] },
  { name: "Bartın", slug: "bartin", region: "Karadeniz", population: 201635, areaCode: "0378", lat: "41.5811", lng: "32.4610", districts: ["Merkez", "Amasra", "Kurucaşile", "Ulus"] },
  { name: "Ardahan", slug: "ardahan", region: "Doğu Anadolu", population: 94932, areaCode: "0478", lat: "41.1105", lng: "42.7022", districts: ["Merkez", "Çıldır", "Göle", "Hanak", "Posof"] },
  { name: "Iğdır", slug: "igdir", region: "Doğu Anadolu", population: 203808, areaCode: "0476", lat: "39.9167", lng: "44.0333", districts: ["Merkez", "Aralık", "Karakoyunlu", "Tuzluca"] },
  { name: "Yalova", slug: "yalova", region: "Marmara", population: 291302, areaCode: "0226", lat: "40.6500", lng: "29.2667", districts: ["Merkez", "Altınova", "Armutlu", "Çiftlikköy", "Çınarcık", "Termal"] },
  { name: "Karabük", slug: "karabuk", region: "Karadeniz", population: 243614, areaCode: "0370", lat: "41.2061", lng: "32.6204", districts: ["Merkez", "Eflani", "Eskipazar", "Ovacık", "Safranbolu", "Yenice"] },
  { name: "Kilis", slug: "kilis", region: "Güneydoğu Anadolu", population: 147543, areaCode: "0348", lat: "36.7184", lng: "37.1212", districts: ["Merkez", "Elbeyli", "Musabeyli", "Polateli"] },
  { name: "Osmaniye", slug: "osmaniye", region: "Akdeniz", population: 557666, areaCode: "0328", lat: "37.0745", lng: "36.2474", districts: ["Merkez", "Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Sumbas", "Toprakkale"] },
  { name: "Düzce", slug: "duzce", region: "Karadeniz", population: 400173, areaCode: "0380", lat: "40.8438", lng: "31.1565", districts: ["Merkez", "Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Yığılca"] },
];

const allServices = [
  { name: "Halı Saha Yapımı", slug: "hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel halı saha yapımı. FIFA standartlarında 55mm suni çim, çelik konstrüksiyon, LED aydınlatma.", features: ["55mm Suni Çim", "FIFA Standartları", "Çelik Konstrüksiyon", "LED Aydınlatma", "7 Yıl Garanti"], priceMin: "450", priceMax: "750" },
  { name: "Kapalı Halı Saha Yapımı", slug: "kapali-hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Branda veya sandwich panel kapalı halı saha yapımı. 4 mevsim kullanım imkanı.", features: ["Branda/Sandwich Panel", "Kapalı Sistem", "Isı Yalıtımı", "Ses Yalıtımı", "4 Mevsim Kullanım"], priceMin: "1200", priceMax: "1800" },
  { name: "Açık Halı Saha Yapımı", slug: "acik-hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Açık halı saha yapımı. Ekonomik ve hızlı çözüm. 20x40m, 25x45m, 30x50m ölçüler.", features: ["Ekonomik Çözüm", "Hızlı Kurulum", "PVC Tel Örgü", "Üst Kapama Ağı", "Suni Çim Zemin"], priceMin: "350", priceMax: "650" },
  { name: "Basketbol Sahası Yapımı", slug: "basketbol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel basketbol sahası yapımı. Akrilik zemin, TBF standartlarında pota sistemleri.", features: ["Akrilik Zemin", "TBF Standartları", "Profesyonel Pota", "Çizgi Boyama", "3x3 ve 5x5"], priceMin: "350", priceMax: "600" },
  { name: "Tenis Kortu Yapımı", slug: "tenis-kortu-yapimi", category: "saha-yapimi", shortDescription: "Akrilik ve çim tenis kortu yapımı. ITF standartlarında, profesyonel zemin kaplama.", features: ["Akrilik Zemin", "ITF Standartları", "Çelik Direk", "Profesyonel File", "Çizgi Boyama"], priceMin: "400", priceMax: "700" },
  { name: "Voleybol Sahası Yapımı", slug: "voleybol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel voleybol sahası yapımı. FIVB standartlarında zemin ve direk sistemleri.", features: ["Akrilik/EPDM Zemin", "FIVB Standartları", "Teleskopik Direk", "Profesyonel File", "Saha Çizgileri"], priceMin: "300", priceMax: "550" },
  { name: "Çok Amaçlı Saha Yapımı", slug: "cok-amacli-saha-yapimi", category: "saha-yapimi", shortDescription: "Basketbol, voleybol ve tenis için çok amaçlı spor sahası yapımı.", features: ["Çoklu Spor", "Ayarlanabilir Direk", "Akrilik Zemin", "Çizgi Sistemi", "Esnek Kullanım"], priceMin: "400", priceMax: "650" },
  { name: "Nizami Futbol Sahası Yapımı", slug: "nizami-futbol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Nizami futbol sahası ve tribün yapımı. FIFA standartlarında, 100x70m ölçüler.", features: ["FIFA Standartları", "Suni/Doğal Çim", "Profesyonel Tribün", "Var Sistemi", "Skorbord"], priceMin: "800", priceMax: "1500" },
  { name: "Çelik Konstrüksiyon", slug: "celik-konstruksiyon", category: "yapi", shortDescription: "Kapalı saha, hangar ve depo çelik konstrüksiyon yapımı. Dayanıklı ve ekonomik.", features: ["Hafif Çelik", "Hızlı Montaj", "Dayanıklı", "Deprem Güvenli", "Uzun Ömür"], priceMin: "600", priceMax: "1200" },
  { name: "Akrilik Zemin Kaplama", slug: "akrilik-zemin-kaplama", category: "zemin", shortDescription: "Akrilik zemin kaplama uygulaması. Basketbol, tenis ve voleybol sahaları için ideal.", features: ["Kaymaz Yüzey", "UV Dayanımı", "Renk Seçenekleri", "Hızlı Kurulum", "Ekonomik"], priceMin: "150", priceMax: "300" },
  { name: "Halı Saha Branda", slug: "hali-saha-branda", category: "yapi", shortDescription: "Halı saha branda kaplama ve tamiri. 650gr/m2 PVC branda, UV dayanımlı.", features: ["650gr/m2 PVC", "UV Dayanımlı", "Su Geçirmez", "Alev Almaz", "5-10 Yıl Ömür"], priceMin: "180", priceMax: "350" },
  { name: "Suni Çim Saha Kaplama", slug: "suni-cim-saha-kaplama", category: "zemin", shortDescription: "55mm sentetik suni çim saha kaplama. FIFA onaylı, 7 yıl garanti.", features: ["55mm Hav Boyu", "FIFA Onaylı", "7 Yıl Garanti", "Silis Kum + Granül", "Jeotekstil Keçe"], priceMin: "180", priceMax: "350" },
  { name: "Halı Saha Halısı Satışı", slug: "hali-saha-halisi", category: "urun", shortDescription: "55mm suni çim halı saha halısı satışı. Ten Cate, FIFA standartlarında.", features: ["55mm Suni Çim", "FIFA Standartları", "UV Dayanımlı", "7 Yıl Garanti", "Renk Seçenekleri"], priceMin: "180", priceMax: "350" },
  { name: "55mm Sentetik Suni Çim Fiyatı", slug: "55mm-suni-cim-fiyati", category: "urun", shortDescription: "55mm sentetik suni çim m2 fiyatları. En kaliteli ürünler, uygun fiyatlar.", features: ["55mm Hav Boyu", "10.800 D-Tex", "UV Dayanımlı", "Su Geçirgen", "Uzun Ömür"], priceMin: "180", priceMax: "350" },
  { name: "Suni Çim Satan Firmalar", slug: "suni-cim-satan-firmalar", category: "urun", shortDescription: "Suni çim satan firmalar arasında en kaliteli ürünleri en uygun fiyata sunuyoruz.", features: ["Toptan Fiyat", "Perakende Satış", "Montaj Dahil", "Keşif Ücretsiz", "Garanti"], priceMin: "150", priceMax: "300" },
  { name: "Yapay Çim Satan Yerler", slug: "yapay-cim-satan-yerler", category: "urun", shortDescription: "Yapay çim satan yerler arasında en kaliteli ürün ve hizmet garantisi.", features: ["Geniş Ürün Yelpazesi", "Uygun Fiyat", "Profesyonel Danışmanlık", "Montaj Hizmeti", "Garanti"], priceMin: "150", priceMax: "300" },
  { name: "Halı Saha Yapım Maliyeti", slug: "hali-saha-maliyeti", category: "bilgi", shortDescription: "2026 güncel halı saha yapım maliyeti. m2 başına fiyatlar ve maliyet hesaplama.", features: ["Güncel Fiyatlar", "Ücretsiz Keşif", "Detaylı Teklif", "Taksit İmkanı", "Gizli Maliyet Yok"], priceMin: "350", priceMax: "750" },
  { name: "Açık Halı Saha Maliyeti", slug: "acik-hali-saha-maliyeti", category: "bilgi", shortDescription: "Açık halı saha yapım maliyeti. Ölçüye göre detaylı fiyatlandırma.", features: ["20x40m Fiyat", "25x45m Fiyat", "30x50m Fiyat", "Maliyet Hesaplama", "Ücretsiz Teklif"], priceMin: "300", priceMax: "600" },
  { name: "Kapalı Halı Saha Maliyeti", slug: "kapali-hali-saha-maliyeti", category: "bilgi", shortDescription: "Kapalı halı saha yapım maliyeti. Branda ve sandwich panel seçenekleri.", features: ["Branda Kapalı Fiyat", "Sandwich Panel Fiyat", "Isıtma Sistemi", "Maliyet Analizi", "Detaylı Teklif"], priceMin: "1000", priceMax: "1800" },
  { name: "Halı Saha Yapan Firmalar", slug: "hali-saha-yapan-firmalar", category: "firma", shortDescription: "Halı saha yapan firmalar arasında 30 yıllık tecrübemizle öne çıkıyoruz.", features: ["30 Yıl Tecrübe", "MYK Belgeli", "TSE/CE Sertifikalı", "81 İl Hizmet", "Garanti"], priceMin: "350", priceMax: "750" },
  { name: "Kapalı Halı Saha Yapan Firmalar", slug: "kapali-hali-saha-yapan-firmalar", category: "firma", shortDescription: "Kapalı halı saha yapan firmalar arasında lider konumdayız.", features: ["Özel Tasarım", "Hızlı Kurulum", "Garantili İşçilik", "Uygun Fiyat", "Referanslar"], priceMin: "1000", priceMax: "1800" },
  { name: "Açık Halı Saha Yapan Firmalar", slug: "acik-hali-saha-yapan-firmalar", category: "firma", shortDescription: "Açık halı saha yapan firmalar arasında en kaliteli hizmeti sunuyoruz.", features: ["Ekonomik Çözümler", "Hızlı Teslimat", "Kaliteli Malzeme", "Garanti", "81 İl"], priceMin: "300", priceMax: "650" },
  { name: "Çok Amaçlı Saha Yapan Firmalar", slug: "cok-amacli-saha-yapan-firmalar", category: "firma", shortDescription: "Çok amaçlı saha yapan firmalar arasında profesyonel çözümler.", features: ["Basketbol", "Voleybol", "Tenis", "Badminton", "Hepsi Bir Arada"], priceMin: "400", priceMax: "650" },
  { name: "Voleybol Sahası Yapan Firmalar", slug: "voleybol-sahasi-yapan-firmalar", category: "firma", shortDescription: "Voleybol sahası yapan firmalar arasında FIVB standartlarında hizmet.", features: ["FIVB Standartları", "Profesyonel Zemin", "Teleskopik Direk", "File Sistemi", "Garanti"], priceMin: "300", priceMax: "550" },
  { name: "Tenis Kortu Yapan Firmalar", slug: "tenis-kortu-yapan-firmalar", category: "firma", shortDescription: "Tenis kortu yapan firmalar arasında ITF standartlarında kalite.", features: ["ITF Standartları", "Akrilik Zemin", "Çelik Direk", "File Sistemi", "Garanti"], priceMin: "400", priceMax: "700" },
  { name: "Balon Saha Yapan Firmalar", slug: "balon-saha-yapan-firmalar", category: "firma", shortDescription: "Balon saha yapan firmalar arasında hızlı ve ekonomik çözümler.", features: ["Hava Destekli", "Hızlı Kurulum", "Taşınabilir", "Ekonomik", "Garanti"], priceMin: "500", priceMax: "900" },
  { name: "Nizami Saha Yapan Firmalar", slug: "nizami-saha-yapan-firmalar", category: "firma", shortDescription: "Nizami futbol sahası yapan firmalar arasında FIFA standartlarında hizmet.", features: ["FIFA Standartları", "Tribün Sistemi", "Skorbord", "Var Sistemi", "Garanti"], priceMin: "800", priceMax: "1500" },
  { name: "Halı Saha Granül Satan Firmalar", slug: "hali-saha-granul-satan-firmalar", category: "urun", shortDescription: "SBR ve EPDM granül satışı. Halı saha zemin dolgu malzemesi.", features: ["SBR Granül", "EPDM Granül", "Renk Seçenekleri", "Toptan Fiyat", "Hızlı Teslimat"], priceMin: "15", priceMax: "45" },
  { name: "Granül Satan Firmalar", slug: "granul-satan-firmalar", category: "urun", shortDescription: "EPDM ve SBR kauçuk granül satan firmalar. Spor sahaları için ideal.", features: ["EPDM Granül", "SBR Granül", "Farklı Renkler", "Toptan Fiyat", "Stoktan Teslim"], priceMin: "15", priceMax: "45" },
  { name: "Halı Saha Tavan Filesi", slug: "hali-saha-tavan-filesi", category: "urun", shortDescription: "Halı saha tavan filesi m2 fiyatları. Paraşüt ipi, UV dayanımlı.", features: ["Paraşüt İpi", "UV Dayanımlı", "Farklı Kalınlıklar", "Profesyonel Montaj", "Garanti"], priceMin: "25", priceMax: "60" },
  { name: "Halı Saha Filesi Satan Firmalar", slug: "hali-saha-filesi-satan-firmalar", category: "urun", shortDescription: "Halı saha filesi satan firmalar. Tavan, yan ve kale filesi.", features: ["Tavan Filesi", "Yan Filesi", "Kale Filesi", "Paraşüt İpi", "Montaj Dahil"], priceMin: "25", priceMax: "60" },
  { name: "Halı Saha Tamiri", slug: "hali-saha-tamiri", category: "hizmet", shortDescription: "Halı saha tamiri ve bakım hizmetleri. Zemin düzeltme, çim yenileme.", features: ["Zemin Düzeltme", "Çim Yenileme", "Granül Değişimi", "Çizgi Boyama", "Bakım Paketi"], priceMin: "50", priceMax: "200" },
  { name: "Halı Saha Branda Tamiri", slug: "hali-saha-branda-tamiri", category: "hizmet", shortDescription: "Halı saha branda tamiri ve değişimi. Yırtık tespiti ve onarım.", features: ["Yırtık Onarımı", "Komple Değişim", "UV Dayanımlı", "Su Geçirmez", "Garanti"], priceMin: "100", priceMax: "400" },
  { name: "Suni Çim Tamiri", slug: "suni-cim-tamiri", category: "hizmet", shortDescription: "Suni çim tamiri ve yenileme hizmetleri. Yıpranmış çim değişimi.", features: ["Çim Değişimi", "Ek Yerleri", "Granül Tazeleme", "Çizgi Yenileme", "Bakım"], priceMin: "80", priceMax: "250" },
  { name: "Halı Saha Tel Örgü", slug: "hali-saha-tel-orgu", category: "urun", shortDescription: "Halı saha tel örgü satan firmalar. Galvanizli PVC kaplı tel örgü.", features: ["Galvanizli", "PVC Kaplı", "Farklı Yükseklikler", "Hızlı Montaj", "Garanti"], priceMin: "40", priceMax: "100" },
  { name: "Pota Satan Firmalar", slug: "pota-satan-firmalar", category: "urun", shortDescription: "Basketbol potası satan firmalar. TBF onaylı, paslanmaz çelik.", features: ["TBF Onaylı", "Paslanmaz Çelik", "Masa/Duvar Monte", "Hareketli Pota", "Garanti"], priceMin: "1500", priceMax: "15000" },
  { name: "Tartan Zemin Kaplama", slug: "tartan-zemin-kaplama", category: "zemin", shortDescription: "Tartan zemin kaplama yapan firmalar. EPDM kaplamalı spor zeminleri.", features: ["EPDM Kaplama", "Esnek Zemin", "Darbe Emici", "Renk Seçenekleri", "Uzun Ömür"], priceMin: "200", priceMax: "400" },
  { name: "Padel Kortu Yapımı", slug: "padel-kortu-yapimi", category: "saha-yapimi", shortDescription: "Padel kortu yapımı. Cam duvar sistemli, profesyonel padel sahaları.", features: ["Cam Duvar", "Sentetik Çim", "Profesyonel File", "LED Aydınlatma", "FIP Standartları"], priceMin: "800", priceMax: "1500" },
  { name: "Atletizm Pisti Yapımı", slug: "atletizm-pisti-yapimi", category: "saha-yapimi", shortDescription: "Atletizm pisti yapımı. IAAF standartlarında, tartan zemin.", features: ["IAAF Standartları", "Tartan Zemin", "8 Kulvar", "Uzun Atlama", "Profesyonel"], priceMin: "350", priceMax: "600" },
  { name: "Havuz Yapımı", slug: "havuz-yapimi", category: "saha-yapimi", shortDescription: "Olimpik yüzme havuzu yapımı. Betonarme ve prefabrik seçenekler.", features: ["Olimpik Boyutlar", "Filtrasyon Sistemi", "Isıtma Sistemi", "Prefabrik/Betonarme", "Garanti"], priceMin: "2500", priceMax: "5000" },
  { name: "Hibrit Çim Saha Yapımı", slug: "hibrit-cim-saha-yapimi", category: "saha-yapimi", shortDescription: "Hibrit çim saha yapımı. Doğal çim + suni çim karışımı. FIFA standartlarında.", features: ["FIFA Standartları", "Doğal + Suni Çim", "Drenaj Sistemi", "Uzun Ömür", "Profesyonel"], priceMin: "600", priceMax: "1200" },
  { name: "Yedek Kulübesi", slug: "yedek-kulubesi", category: "urun", shortDescription: "Spor sahası yedek kulübesi. Polikarbonat ve akrilik malzeme.", features: ["Polikarbonat", "Akrilik", "4-8 Kişilik", "Dayanıklı", "Kolay Montaj"], priceMin: "500", priceMax: "2500" },
  { name: "Spor Zemin Kaplama", slug: "spor-zemin-kaplama", category: "zemin", shortDescription: "Profesyonel spor zemin kaplama hizmetleri. Her türlü spor için.", features: ["Akrilik", "EPDM", "Tartan", "Poliüretan", "Farklı Sporlar"], priceMin: "150", priceMax: "500" },
  { name: "Basketbol Potaları", slug: "basketbol-potalari", category: "urun", shortDescription: "Profesyonel basketbol potası. TBF onaylı, paslanmaz çelik.", features: ["TBF Onaylı", "Paslanmaz Çelik", "Hareketli/Sabit", "Cam Pano", "Garanti"], priceMin: "2000", priceMax: "20000" },
  { name: "Voleybol ve Tenis Direkleri", slug: "voleybol-tenis-direkleri", category: "urun", shortDescription: "Voleybol ve tenis direkleri. Çelik direk, profesyonel file sistemi.", features: ["Çelik Direk", "Paslanmaz", "Teleskopik", "File Dahil", "FIVB/ITF"], priceMin: "1500", priceMax: "8000" },
  { name: "Futbol Kaleleri", slug: "futbol-kaleleri", category: "urun", shortDescription: "Futbol kalesi ve filesi. Profesyonel standartlarda.", features: ["Çelik Konstrüksiyon", "File Dahil", "Farklı Boyutlar", "Taşınabilir", "Garanti"], priceMin: "800", priceMax: "5000" },
  { name: "Tribün Koltukları", slug: "tribun-koltuklari", category: "urun", shortDescription: "Plastik tribün koltuğu. Dayanıklı, ergonomik, renk seçenekleri.", features: ["Plastik", "Ergonomik", "Renk Seçenekleri", "Kolay Montaj", "Dayanıklı"], priceMin: "50", priceMax: "200" },
  { name: "Halı Saha Skorbord", slug: "hali-saha-skorbord", category: "urun", shortDescription: "Halı saha elektronik skorbord. LED ekran, kumandalı.", features: ["LED Ekran", "Kumandalı", "Süre/Sayaç", "Dış Mekan", "Garanti"], priceMin: "3000", priceMax: "15000" },
  { name: "Halı Saha Aydınlatma", slug: "hali-saha-aydinlatma", category: "urun", shortDescription: "Halı saha LED aydınlatma sistemi. 200W projektör, homojen ışık.", features: ["200W LED", "Homojen Işık", "Enerji Tasarruflu", "Uzun Ömür", "Montaj Dahil"], priceMin: "250", priceMax: "600" },
  { name: "Prefabrik Konteyner", slug: "prefabrik-konteyner", category: "yapi", shortDescription: "Prefabrik konteyner ve çelik ev yapımı. Hızlı kurulum, ekonomik.", features: ["Hızlı Kurulum", "Ekonomik", "Dayanıklı", "Taşınabilir", "İzoleli"], priceMin: "500", priceMax: "2000" },
];

export async function seed() {
  const db = getDb();
  console.log("🌱 Starting seed...");

  // 1. Batch insert all cities at once
  console.log(`🏙️ Inserting ${allCities.length} cities...`);
  const cityValues = allCities.map((city) => ({
    name: city.name,
    slug: city.slug,
    region: city.region,
    population: city.population,
    areaCode: city.areaCode,
    latitude: city.lat,
    longitude: city.lng,
    districts: city.districts,
    description: `${city.name} ilinde profesyonel spor sahası yapım hizmetleri. Halı saha, basketbol sahası, tenis kortu, voleybol sahası ve çok amaçlı spor sahaları yapımında 30 yıllık tecrübe.`,
    metaTitle: `${city.name} Halı Saha Yapımı | İkber Spor Yapıları | 0542 612 56 10`,
    metaDescription: `${city.name} ve tüm ilçelerinde halı saha, kapalı halı saha, basketbol sahası, tenis kortu yapımı. Anahtar teslim, MYK belgeli ekip, TSE/CE sertifikalı malzeme. Ücretsiz keşif!`,
    isActive: true,
  }));

  for (let i = 0; i < cityValues.length; i += 20) {
    await db.insert(cities).values(cityValues.slice(i, i + 20));
  }
  console.log("   ✅ Cities inserted");

  // 2. Batch insert all services
  console.log(`⚽ Inserting ${allServices.length} services...`);
  const serviceValues = allServices.map((svc) => ({
    name: svc.name,
    slug: svc.slug,
    category: svc.category,
    shortDescription: svc.shortDescription,
    longDescription: svc.shortDescription + ` ${svc.name} konusunda 30 yıllık tecrübemizle en kaliteli hizmeti sunuyoruz.`,
    features: svc.features,
    priceRangeMin: svc.priceMin,
    priceRangeMax: svc.priceMax,
    icon: "Activity",
    metaTitle: `${svc.name} | İkber Spor Yapıları | 81 İl Hizmet`,
    metaDescription: `${svc.shortDescription} Anahtar teslim, MYK belgeli ekip, garantili işçilik. Ücretsiz keşif ve fiyat teklifi için hemen arayın!`,
    sortOrder: 0,
    isActive: true,
  }));

  for (let i = 0; i < serviceValues.length; i += 20) {
    await db.insert(services).values(serviceValues.slice(i, i + 20));
  }
  console.log("   ✅ Services inserted");

  // 3. Get inserted cities to use their IDs
  const insertedCities = await db.select().from(cities);
  const cityMap = new Map(insertedCities.map((c) => [c.slug, c]));

  // 4. Batch insert reviews (17 per city = ~1377 reviews)
  console.log("⭐ Inserting reviews...");
  const reviewNames = ["Mehmet Yılmaz", "Ahmet Kaya", "Fatma Demir", "Ali Şahin", "Ayşe Çelik", "Mustafa Özdemir", "Zeynep Arslan", "İbrahim Koç", "Elif Yıldız", "Hakan Aydın", "Selin Korkmaz", "Burak Yılmaz", "Deniz Karaca", "Ceren Bulut", "Emre Taş", "Gizem Toprak", "Kemal Usta"];
  const reviewTexts = [
    (c: string) => `${c} halı saha yapımı projemizi çok profesyonel bir şekilde tamamladılar. 30 günlük sürede anahtar teslim teslim aldık. MYK belgeli ekibin işçiliği gerçekten çok kaliteli. ${c} halı saha yapan firmalar arasında en iyileri.`,
    (c: string) => `${c} kapalı halı saha yapımı yaptırdık. Branda kaplama mükemmel, içerideki ısı yalıtımı çok iyi. ${c} kapalı halı saha yapan firmalar arasında fiyat/performans olarak en iyisi İkber Spor.`,
    (c: string) => `${c} açık halı saha projemizi İkber Spor'a emanet ettik. Çok hızlı ve temiz bir iş çıkardılar. ${c} açık halı saha yapan firmalar arasında en güvenilirleri.`,
    (c: string) => `${c} basketbol sahası yapımı projemizde akrilik zemin çok kaliteli oldu. ${c} basketbol sahası yapan firmalar arasında kesinlikle tavsiye ederim.`,
    (c: string) => `Okulumuz için ${c} tenis kortu yaptırdık. ITF standartlarında, çok profesyonel bir iş çıktı. ${c} tenis kortu yapan firmalar arasında en iyileri.`,
    (c: string) => `${c} voleybol sahası yapımı projemiz çok başarılı geçti. FIVB standartlarında zemin ve direk sistemi.`,
    (c: string) => `${c} çok amaçlı saha yapımı projemizde basketbol ve voleybol bir arada. Çok fonksiyonel ve kaliteli bir saha oldu.`,
    (c: string) => `${c} nizami futbol sahası ve tribün yapımı yaptırdık. FIFA standartlarında, çok profesyonel bir iş.`,
    (c: string) => `${c} çelik konstrüksiyon yapan firmalar aradık. Paslanmaz çelik proje mükemmeldi. İkber Spor'u herkese tavsiye ederim.`,
    (c: string) => `${c} akrilik zemin yapan firmalar arasında en kaliteli işçilik İkber Spor'da. Basketbol sahamızın zemini çok güzel oldu.`,
    (c: string) => `${c} halı saha branda satan firmalar arasında en uygun fiyatı İkber Spor verdi. Montaj çok profesyoneldi.`,
    (c: string) => `${c} suni çim satan firmalar arayışındaydık. Ten Cate marka suni çimi çok uygun fiyata aldık.`,
    (c: string) => `${c} granül satan firmalar arasında EPDM granül için en iyi fiyatı burada bulduk. Teslimat çok hızlıydı.`,
    (c: string) => `Halı sahamızın tamiri için ${c} halı saha tamiri hizmeti aldık. Zemin düzeltme çok profesyonel yapıldı.`,
    (c: string) => `${c} halı saha filesi satan firmalar arasında en kaliteli ürünü İkber Spor'da bulduk. Montaj dahil hizmet süper.`,
    (c: string) => `${c} pota satan firmalar arasında TBF onaylı basketbol potasını İkber Spor'dan aldık. Montaj dahil fiyat çok iyiydi.`,
    (c: string) => `${c} halı saha yapım firmaları arasında 30 yıllık tecrübesiyle İkber Spor'u seçtik. Çok doğru bir karar.`,
  ];
  const serviceTypes = ["hali-saha-yapimi", "kapali-hali-saha-yapimi", "acik-hali-saha-yapimi", "basketbol-sahasi-yapimi", "tenis-kortu-yapimi", "voleybol-sahasi-yapimi", "cok-amacli-saha-yapimi", "nizami-futbol-sahasi-yapimi"];

  const allReviews = [];
  for (const city of insertedCities) {
    for (let i = 0; i < reviewNames.length; i++) {
      allReviews.push({
        cityId: city.id,
        customerName: reviewNames[i],
        customerLocation: city.name,
        district: city.districts?.[i % (city.districts?.length || 1)] || "Merkez",
        rating: 5,
        reviewText: reviewTexts[i](city.name),
        serviceType: serviceTypes[i % serviceTypes.length],
        isApproved: true,
      });
    }
  }
  for (let i = 0; i < allReviews.length; i += 100) {
    await db.insert(reviews).values(allReviews.slice(i, i + 100));
  }
  console.log(`   ✅ ${allReviews.length} reviews inserted`);

  // 5. Batch insert FAQs (16 per city = ~1296 FAQs)
  console.log("❓ Inserting FAQs...");
  const faqTemplates = [
    (c: string) => ({ q: `${c} halı saha yapım maliyeti ne kadar?`, a: `${c} halı saha yapım maliyeti sahanın ölçülerine göre değişir. Açık halı saha m² başına 350-750 TL, kapalı halı saha 1000-1800 TL/m² arasındadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} halı saha yapan firmalar arasında neden İkber Spor'u seçmeliyim?`, a: `30+ yıllık tecrübemiz, MYK belgeli kadromuz, TSE/CE sertifikalı ürünlerimiz ve ${c} referanslarımızla en güvenilir seçenekiz.`, cat: "general" }),
    (c: string) => ({ q: `${c} kapalı halı saha yapımı kaç günde tamamlanır?`, a: `${c} kapalı halı saha yapımı ortalama 30-60 gün içinde tamamlanmaktadır.`, cat: "technical" }),
    (c: string) => ({ q: `${c} açık halı saha yapımı için arazi gereksinimleri nelerdir?`, a: `${c} açık halı saha için minimum 800m² düz arazi yeterlidir.`, cat: "technical" }),
    (c: string) => ({ q: `${c} basketbol sahası yapımı maliyeti nedir?`, a: `${c} basketbol sahası m² başına 350-600 TL arasındadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} tenis kortu yapımı için hangi zemin en uygundur?`, a: `Akrilik zemin en ideal seçenektir. ITF standartlarına uygundur.`, cat: "technical" }),
    (c: string) => ({ q: `${c} voleybol sahası yapımı standart ölçüleri nelerdir?`, a: `18m x 9m oyun alanı, 3m serbest bölgedir. FIVB standartlarındadır.`, cat: "technical" }),
    (c: string) => ({ q: `${c} çok amaçlı saha yapımı ne kadara mal olur?`, a: `${c} çok amaçlı saha m² başına 400-650 TL arasındadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} halı saha tamiri hizmeti veriyor musunuz?`, a: `Evet, ${c} ve tüm ilçelerinde halı saha tamiri hizmeti vermekteyiz.`, cat: "service" }),
    (c: string) => ({ q: `${c} suni çim satan firmalar arasında en kaliteli ürünü nereden alabilirim?`, a: `İkber Spor Yapıları, Ten Cate 55mm suni çim ile en kaliteli ürünü sunmaktadır.`, cat: "general" }),
    (c: string) => ({ q: `${c} granül satan firmalar arasında EPDM granül fiyatları ne kadar?`, a: `EPDM granül m² başına 15-45 TL arasındadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} halı saha branda fiyatları ne kadar?`, a: `650gr/m² PVC branda m² başına 180-350 TL arasındadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} çelik konstrüksiyon yapan firmalar arasında en güvenlisi hangisi?`, a: `30 yıllık tecrübemiz ve MYK belgeli ekibimizle İkber Spor en güvenilir seçenektir.`, cat: "general" }),
    (c: string) => ({ q: `${c} akrilik zemin yapan firmalar arasında en iyi fiyat kimde?`, a: `İkber Spor Yapıları en iyi fiyat-garanti dengesini sunmaktadır.`, cat: "pricing" }),
    (c: string) => ({ q: `${c} halı saha yaptırmak için ruhsat gerekli mi?`, a: `${c} belediyesinden basit bir yapı ruhsatı alınması yeterlidir.`, cat: "technical" }),
    (c: string) => ({ q: `${c} spor sahası yapımı için kredi ile ödeme imkanı var mı?`, a: `Evet, kredi kartına taksit ve düşük faizli kredi imkanları sunuyoruz.`, cat: "service" }),
  ];

  const allFaqs = [];
  for (const city of insertedCities) {
    for (let i = 0; i < faqTemplates.length; i++) {
      const tmpl = faqTemplates[i](city.name);
      allFaqs.push({
        cityId: city.id,
        question: tmpl.q,
        answer: tmpl.a,
        category: tmpl.cat,
        sortOrder: i,
        isActive: true,
      });
    }
  }
  for (let i = 0; i < allFaqs.length; i += 100) {
    await db.insert(faqs).values(allFaqs.slice(i, i + 100));
  }
  console.log(`   ✅ ${allFaqs.length} FAQs inserted`);

  // 6. Generate service pages for top 10 cities × all services
  console.log("📄 Generating service pages...");
  const topCities = insertedCities.slice(0, 10);
  const insertedServices = await db.select().from(services);
  const allPages = [];

  for (const city of topCities) {
    for (const svc of insertedServices) {
      allPages.push({
        cityId: city.id,
        serviceId: svc.id,
        slug: `${city.slug}-${svc.slug}`,
        pageTitle: `${city.name} ${svc.name} | İkber Spor Yapıları`,
        metaTitle: `${city.name} ${svc.name} | İkber Spor Yapıları | 0542 612 56 10`,
        metaDescription: `${city.name} ${svc.name} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. ${city.name} ve tüm ilçelerinde anahtar teslim hizmet.`,
        metaKeywords: `${city.name} ${svc.name}, ${city.name} ${svc.slug}, ${svc.name} ${city.name}, İkber Spor`,
        content: `${city.name} ${svc.name} konusunda İkber Spor Yapıları olarak 30 yılı aşkın tecrübemizle hizmet vermekteyiz.`,
        localDescription: `${city.name} bölgesi için özel ${svc.name} çözümleri.`,
        localPriceNote: `${city.name} ${svc.name} fiyatları için ücretsiz keşif.`,
        localAddress: `${city.name} Merkez`,
        localPhone: "0542 612 56 10",
        canonicalUrl: `https://ikberspor.com/sehir/${city.slug}/${svc.slug}`,
        isActive: true,
      });
    }
  }
  for (let i = 0; i < allPages.length; i += 100) {
    await db.insert(servicePages).values(allPages.slice(i, i + 100));
  }
  console.log(`   ✅ ${allPages.length} service pages generated`);

  console.log("✅ Seed complete!");
}

seed().catch(console.error);
