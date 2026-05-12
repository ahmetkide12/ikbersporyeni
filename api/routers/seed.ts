import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { cities, services, reviews, faqs, servicePages } from "@db/schema";

// ─── 81 Turkish Cities with FULL districts ───
const allCities = [
  { name: "Adana", slug: "adana", region: "Akdeniz", population: 2263373, areaCode: "0322", lat: "36.9914", lng: "35.3308", districts: ["Seyhan","Çukurova","Yüreğir","Sarıçam","Karaisalı","Kozan","Ceyhan","Yumurtalık","Feke","Saimbeyli","Tufanbeylı","Aladağ","İmamoğlu","Karataş","Pozantı"] },
  { name: "Adıyaman", slug: "adiyaman", region: "Güneydoğu Anadolu", population: 635169, areaCode: "0416", lat: "37.7648", lng: "38.2786", districts: ["Merkez","Besni","Çelikhan","Gerger","Gölbaşı","Kahta","Samsat","Sincik","Tut"] },
  { name: "Afyonkarahisar", slug: "afyonkarahisar", region: "Ege", population: 736912, areaCode: "0272", lat: "38.7638", lng: "30.5400", districts: ["Merkez","Başmakçı","Bayat","Bolvadin","Çay","Çobanlar","Dazkırı","Dinar","Emirdağ","Evciler","Hocalar","İhsaniye","İscehisar","Kızılören","Sandıklı","Sinanpaşa","Şuhut","Sultandağı"] },
  { name: "Ağrı", slug: "agri", region: "Doğu Anadolu", population: 536199, areaCode: "0472", lat: "39.7191", lng: "43.0503", districts: ["Merkez","Diyadin","Doğubayazıt","Eleşkirt","Hamur","Patnos","Taşlıçay","Tutak"] },
  { name: "Amasya", slug: "amasya", region: "Karadeniz", population: 335331, areaCode: "0358", lat: "40.6499", lng: "35.8353", districts: ["Merkez","Göynücek","Gümüşhacıköy","Hamamözü","Merzifon","Suluova","Taşova"] },
  { name: "Ankara", slug: "ankara", region: "İç Anadolu", population: 5663322, areaCode: "0312", lat: "39.9334", lng: "32.8597", districts: ["Akyurt","Altındağ","Ayaş","Bala","Beypazarı","Çamlıdere","Çankaya","Çubuk","Elmadağ","Etimesgut","Evren","Gölbaşı","Güdül","Haymana","Kalecik","Kahramankazan","Keçiören","Kızılcahamam","Mamak","Nallıhan","Polatlı","Pursaklar","Sincan","Şereflikoçhisar","Yenimahalle"] },
  { name: "Antalya", slug: "antalya", region: "Akdeniz", population: 2619832, areaCode: "0242", lat: "36.8969", lng: "30.7133", districts: ["Akseki","Alanya","Demre","Döşemealtı","Elmalı","Finike","Gazipaşa","Gündoğmuş","İbradı","Kaş","Kemer","Kepez","Konyaaltı","Korkuteli","Kumluca","Manavgat","Muratpaşa","Serik"] },
  { name: "Artvin", slug: "artvin", region: "Karadeniz", population: 169543, areaCode: "0466", lat: "41.1828", lng: "41.8185", districts: ["Merkez","Ardanuç","Arhavi","Borçka","Hopa","Murgul","Şavşat","Yusufeli"] },
  { name: "Aydın", slug: "aydin", region: "Ege", population: 1134031, areaCode: "0256", lat: "37.8560", lng: "27.8416", districts: ["Bozdoğan","Buharkent","Çine","Didim","Efeler","Germencik","İncirliova","Karacasu","Karpuzlu","Koçarlı","Köşk","Kuşadası","Kuyucak","Nazilli","Söke","Sultanhisar","Yenipazar"] },
  { name: "Balıkesir", slug: "balikesir", region: "Marmara", population: 1250610, areaCode: "0266", lat: "39.6484", lng: "27.8826", districts: ["Altıeylül","Ayvalık","Balya","Bandırma","Bigadiç","Burhaniye","Dursunbey","Edremit","Erdek","Gömeç","Gönen","Havran","İvrindi","Karesi","Kepsut","Manyas","Marmara","Savaştepe","Sındırgı","Susurluk"] },
  { name: "Bilecik", slug: "bilecik", region: "Marmara", population: 228334, areaCode: "0228", lat: "40.0567", lng: "30.0665", districts: ["Merkez","Bozüyük","Gölpazarı","İnhisar","Osmaneli","Pazaryeri","Söğüt","Yenipazar"] },
  { name: "Bingöl", slug: "bingol", region: "Doğu Anadolu", population: 283132, areaCode: "0426", lat: "39.0626", lng: "40.7696", districts: ["Merkez","Adaklı","Genç","Karlıova","Kiğı","Solhan","Yayladere","Yedisu"] },
  { name: "Bitlis", slug: "bitlis", region: "Doğu Anadolu", population: 351825, areaCode: "0434", lat: "38.4006", lng: "42.1095", districts: ["Merkez","Adilcevaz","Ahlat","Güroymak","Hizan","Mutki","Tatvan"] },
  { name: "Bolu", slug: "bolu", region: "Karadeniz", population: 320558, areaCode: "0374", lat: "40.5760", lng: "31.5788", districts: ["Merkez","Dörtdivan","Gerede","Göynük","Kıbrıscık","Mengen","Mudurnu","Seben","Yeniçağa"] },
  { name: "Burdur", slug: "burdur", region: "Akdeniz", population: 273799, areaCode: "0248", lat: "37.4613", lng: "30.0665", districts: ["Merkez","Ağlasun","Altınyayla","Bucak","Çavdır","Çeltikçi","Gölhisar","Karamanlı","Kemer","Tefenni","Yeşilova"] },
  { name: "Bursa", slug: "bursa", region: "Marmara", population: 3147818, areaCode: "0224", lat: "40.1826", lng: "29.0665", districts: ["Büyükorhan","Gemlik","Gürsu","Harmancık","İnegöl","İznik","Karacabey","Keles","Kestel","Mudanya","Mustafakemalpaşa","Nilüfer","Orhaneli","Orhangazi","Osmangazi","Yenişehir","Yıldırım"] },
  { name: "Çanakkale", slug: "canakkale", region: "Marmara", population: 557276, areaCode: "0286", lat: "40.1553", lng: "26.4142", districts: ["Ayvacık","Bayramiç","Biga","Çan","Eceabat","Ezine","Gelibolu","Gökçeada","Lapseki","Merkez","Yenice"] },
  { name: "Çankırı", slug: "cankiri", region: "İç Anadolu", population: 195800, areaCode: "0376", lat: "40.6013", lng: "33.6134", districts: ["Merkez","Atkaracalar","Bayramören","Çerkeş","Eldivan","Ilgaz","Kızılırmak","Korgun","Kurşunlu","Orta","Şabanözü","Yapraklı"] },
  { name: "Çorum", slug: "corum", region: "Karadeniz", population: 528422, areaCode: "0364", lat: "40.5506", lng: "34.9556", districts: ["Merkez","Alaca","Bayat","Boğazkale","Dodurga","İskilip","Kargı","Laçin","Mecitözü","Oğuzlar","Ortaköy","Osmancık","Sungurlu","Uğurludağ"] },
  { name: "Denizli", slug: "denizli", region: "Ege", population: 1046297, areaCode: "0258", lat: "37.7765", lng: "29.0864", districts: ["Acıpayam","Babadağ","Baklan","Bekilli","Beyağaç","Bozkurt","Buldan","Çal","Çameli","Çardak","Çivril","Güney","Honaz","Kale","Merkezefendi","Pamukkale","Sarayköy","Serinhisar","Tavas"] },
  { name: "Diyarbakır", slug: "diyarbakir", region: "Güneydoğu Anadolu", population: 1822106, areaCode: "0412", lat: "37.9143", lng: "40.2306", districts: ["Bağlar","Bismil","Çermik","Çınar","Çüngüş","Dicle","Eğil","Ergani","Hani","Hazro","Kayapınar","Kocaköy","Kulp","Lice","Silvan","Sur","Yenişehir"] },
  { name: "Edirne", slug: "edirne", region: "Marmara", population: 412115, areaCode: "0284", lat: "41.6771", lng: "26.5557", districts: ["Merkez","Enez","Havsa","İpsala","Keşan","Lalapaşa","Meriç","Süloğlu","Uzunköprü"] },
  { name: "Elazığ", slug: "elazig", region: "Doğu Anadolu", population: 595670, areaCode: "0424", lat: "38.6748", lng: "39.2225", districts: ["Merkez","Ağın","Alacakaya","Arıcak","Baskil","Karakoçan","Keban","Kovancılar","Maden","Palu","Sivrice"] },
  { name: "Erzincan", slug: "erzincan", region: "Doğu Anadolu", population: 237351, areaCode: "0446", lat: "39.7500", lng: "39.5000", districts: ["Merkez","Çayırlı","İliç","Kemah","Kemaliye","Otlukbeli","Refahiye","Tercan","Üzümlü"] },
  { name: "Erzurum", slug: "erzurum", region: "Doğu Anadolu", population: 767848, areaCode: "0442", lat: "39.9000", lng: "41.2700", districts: ["Aziziye","Aşkale","Çat","Hınıs","Horasan","İspir","Karaçoban","Karayazı","Köprüköy","Narman","Oltu","Olur","Palandöken","Pasinler","Pazaryolu","Şenkaya","Tekman","Tortum","Uzundere","Yakutiye"] },
  { name: "Eskişehir", slug: "eskisehir", region: "İç Anadolu", population: 898556, areaCode: "0222", lat: "39.7767", lng: "30.5206", districts: ["Alpu","Beylikova","Çifteler","Günyüzü","Han","İnönü","Mahmudiye","Mihalgazi","Mihalıççık","Odunpazarı","Sarıcakaya","Seyitgazi","Sivrihisar","Tepebaşı"] },
  { name: "Gaziantep", slug: "gaziantep", region: "Güneydoğu Anadolu", population: 2101157, areaCode: "0342", lat: "37.0662", lng: "37.3833", districts: ["Araban","İslahiye","Karkamış","Nizip","Nurdağı","Oğuzeli","Şahinbey","Şehitkamil","Yavuzeli"] },
  { name: "Giresun", slug: "giresun", region: "Karadeniz", population: 450154, areaCode: "0454", lat: "40.9128", lng: "38.3895", districts: ["Merkez","Alucra","Bulancak","Çamoluk","Çanakçı","Dereli","Doğankent","Espiye","Eynesil","Görele","Güce","Keşap","Piraziz","Şebinkarahisar","Tirebolu","Yağlıdere"] },
  { name: "Gümüşhane", slug: "gumushane", region: "Karadeniz", population: 150119, areaCode: "0456", lat: "40.4608", lng: "39.4817", districts: ["Merkez","Kelkit","Köse","Kürtün","Şiran","Torul"] },
  { name: "Hakkari", slug: "hakkari", region: "Doğu Anadolu", population: 280991, areaCode: "0438", lat: "37.5833", lng: "43.7333", districts: ["Merkez","Çukurca","Derecik","Şemdinli","Yüksekova"] },
  { name: "Hatay", slug: "hatay", region: "Akdeniz", population: 1677196, areaCode: "0326", lat: "36.4018", lng: "36.3498", districts: ["Altınözü","Antakya","Arsuz","Belen","Defne","Dörtyol","Erzin","Hassa","İskenderun","Kırıkhan","Kumlu","Payas","Reyhanlı","Samandağ","Yayladağı"] },
  { name: "Isparta", slug: "isparta", region: "Akdeniz", population: 444914, areaCode: "0246", lat: "37.7648", lng: "30.5566", districts: ["Merkez","Aksu","Atabey","Eğirdir","Gelendost","Gönen","Keçiborlu","Şarkikaraağaç","Senirkent","Sütçüler","Uluborlu","Yalvaç","Yenişarbademli"] },
  { name: "Mersin", slug: "mersin", region: "Akdeniz", population: 1888657, areaCode: "0324", lat: "36.8000", lng: "34.6333", districts: ["Akdeniz","Anamur","Aydıncık","Bozyazı","Çamlıyayla","Erdemli","Gülnar","Mezitli","Mut","Silifke","Tarsus","Toroslar","Yenişehir"] },
  { name: "İstanbul", slug: "istanbul", region: "Marmara", population: 15729224, areaCode: "0212", lat: "41.0082", lng: "28.9784", districts: ["Adalar","Arnavutköy","Ataşehir","Avcılar","Bağcılar","Bahçelievler","Bakırköy","Başakşehir","Bayrampaşa","Beşiktaş","Beykoz","Beylikdüzü","Beyoğlu","Büyükçekmece","Çatalca","Çekmeköy","Esenler","Esenyurt","Eyüpsultan","Fatih","Gaziosmanpaşa","Güngören","Kadıköy","Kağıthane","Kartal","Küçükçekmece","Maltepe","Pendik","Sancaktepe","Sarıyer","Silivri","Sultanbeyli","Sultangazi","Şile","Şişli","Tuzla","Ümraniye","Üsküdar","Zeytinburnu"] },
  { name: "İzmir", slug: "izmir", region: "Ege", population: 4384607, areaCode: "0232", lat: "38.4237", lng: "27.1428", districts: ["Aliağa","Balçova","Bayındır","Bayraklı","Bergama","Beydağ","Bornova","Buca","Çeşme","Çiğli","Dikili","Foça","Gaziemir","Güzelbahçe","Karabağlar","Karaburun","Karşıyaka","Kemalpaşa","Kınık","Kiraz","Konak","Menderes","Menemen","Narlıdere","Ödemiş","Seferihisar","Selçuk","Tire","Torbalı","Urla"] },
  { name: "Kars", slug: "kars", region: "Doğu Anadolu", population: 284150, areaCode: "0474", lat: "40.6013", lng: "43.0975", districts: ["Merkez","Akyaka","Arpaçay","Digor","Kağızman","Sarıkamış","Selim","Susuz"] },
  { name: "Kastamonu", slug: "kastamonu", region: "Karadeniz", population: 376377, areaCode: "0366", lat: "41.3887", lng: "33.7827", districts: ["Merkez","Abana","Ağlı","Araç","Azdavay","Bozkurt","Cide","Çatalzeytin","Daday","Devrekani","Doğanyurt","Hanönü","İhsangazi","İnebolu","Küre","Pınarbaşı","Seydiler","Şenpazar","Taşköprü","Tosya"] },
  { name: "Kayseri", slug: "kayseri", region: "İç Anadolu", population: 1422144, areaCode: "0352", lat: "38.7205", lng: "35.4826", districts: ["Akkışla","Bünyan","Develi","Felahiye","Hacılar","İncesu","Kocasinan","Melikgazi","Özvatan","Pınarbaşı","Sarıoğlan","Sarız","Talas","Tomarza","Yahyalı","Yeşilhisar"] },
  { name: "Kırklareli", slug: "kirklareli", region: "Marmara", population: 369864, areaCode: "0288", lat: "41.7333", lng: "27.2167", districts: ["Merkez","Babaeski","Demirköy","Kofçaz","Lüleburgaz","Pehlivanköy","Pınarhisar","Vize"] },
  { name: "Kırşehir", slug: "kirsehir", region: "İç Anadolu", population: 246958, areaCode: "0386", lat: "39.1425", lng: "34.1709", districts: ["Merkez","Akçakent","Akpınar","Boztepe","Çiçekdağı","Kaman","Mucur"] },
  { name: "Kocaeli", slug: "kocaeli", region: "Marmara", population: 2033441, areaCode: "0262", lat: "40.8533", lng: "29.8815", districts: ["Başiskele","Çayırova","Darıca","Derince","Dilovası","Gebze","Gölcük","İzmit","Kandıra","Karamürsel","Kartepe","Körfez"] },
  { name: "Konya", slug: "konya", region: "İç Anadolu", population: 2252000, areaCode: "0332", lat: "37.8667", lng: "32.4833", districts: ["Ahırlı","Akören","Akşehir","Altınekin","Beyşehir","Bozkır","Cihanbeyli","Çeltik","Çumra","Derbent","Derebucak","Doğanhisar","Emirgazi","Ereğli","Güneysınır","Hadim","Halkapınar","Hüyük","Ilgın","Kadınhanı","Karapınar","Karatay","Kulu","Meram","Sarayönü","Selçuklu","Seydişehir","Taşkent","Tuzlukçu","Yalıhüyük","Yunak"] },
  { name: "Kütahya", slug: "kutahya", region: "Ege", population: 578789, areaCode: "0274", lat: "39.4167", lng: "29.9833", districts: ["Merkez","Altıntaş","Aslanapa","Çavdarhisar","Domaniç","Dumlupınar","Emet","Gediz","Hisarcık","Pazarlar","Simav","Şaphane","Tavşanlı"] },
  { name: "Malatya", slug: "malatya", region: "Doğu Anadolu", population: 808692, areaCode: "0422", lat: "38.3554", lng: "38.3337", districts: ["Akçadağ","Arapgir","Arguvan","Battalgazi","Darende","Doğanşehir","Doğanyol","Hekimhan","Kale","Kuluncak","Pütürge","Yazıhan","Yeşilyurt"] },
  { name: "Manisa", slug: "manisa", region: "Ege", population: 1466609, areaCode: "0236", lat: "38.6191", lng: "27.4289", districts: ["Ahmetli","Akhisar","Alaşehir","Demirci","Gölmarmara","Gördes","Kırkağaç","Köprübaşı","Kula","Salihli","Sarıgöl","Saruhanlı","Selendi","Soma","Şehzadeler","Turgutlu","Yunusemre"] },
  { name: "Kahramanmaraş", slug: "kahramanmaras", region: "Akdeniz", population: 1166745, areaCode: "0344", lat: "37.5833", lng: "36.9333", districts: ["Afşin","Andırın","Çağlayancerit","Dulkadiroğlu","Ekinözü","Elbistan","Göksun","Nurhak","Onikişubat","Pazarcık","Türkoğlu"] },
  { name: "Mardin", slug: "mardin", region: "Güneydoğu Anadolu", population: 870374, areaCode: "0482", lat: "37.3212", lng: "40.7245", districts: ["Artuklu","Dargeçit","Derik","Kızıltepe","Mazıdağı","Midyat","Nusaybin","Ömerli","Savur","Yeşilli"] },
  { name: "Muğla", slug: "mugla", region: "Ege", population: 1021164, areaCode: "0252", lat: "37.2154", lng: "28.3636", districts: ["Bodrum","Dalaman","Datça","Fethiye","Kavaklıdere","Köyceğiz","Marmaris","Menteşe","Milas","Ortaca","Seydikemer","Ula","Yatağan"] },
  { name: "Muş", slug: "mus", region: "Doğu Anadolu", population: 399656, areaCode: "0436", lat: "38.9462", lng: "41.7539", districts: ["Merkez","Bulanık","Hasköy","Korkut","Malazgirt","Varto"] },
  { name: "Nevşehir", slug: "nevsehir", region: "İç Anadolu", population: 303010, areaCode: "0384", lat: "38.6939", lng: "34.6857", districts: ["Merkez","Acıgöl","Avanos","Derinkuyu","Gülşehir","Hacıbektaş","Kozaklı","Ürgüp"] },
  { name: "Niğde", slug: "nigde", region: "İç Anadolu", population: 365419, areaCode: "0388", lat: "37.9667", lng: "34.6833", districts: ["Merkez","Altunhisar","Bor","Çamardı","Çiftlik","Ulukışla"] },
  { name: "Ordu", slug: "ordu", region: "Karadeniz", population: 754198, areaCode: "0452", lat: "40.9833", lng: "37.8833", districts: ["Akkuş","Altınordu","Aybastı","Çamaş","Çatalpınar","Çaybaşı","Fatsa","Gölköy","Gülyalı","Gürgentepe","İkizce","Kabadüz","Kabataş","Korgan","Kumru","Mesudiye","Perşembe","Ulubey","Ünye"] },
  { name: "Rize", slug: "rize", region: "Karadeniz", population: 344359, areaCode: "0464", lat: "41.0201", lng: "40.5234", districts: ["Merkez","Ardeşen","Çamlıhemşin","Çayeli","Derepazarı","Fındıklı","Güneysu","Hemşin","İkizdere","İyidere","Kalkandere","Pazar"] },
  { name: "Sakarya", slug: "sakarya", region: "Marmara", population: 1060876, areaCode: "0264", lat: "40.7569", lng: "30.3788", districts: ["Adapazarı","Akyazı","Arifiye","Erenler","Ferizli","Geyve","Hendek","Karapürçek","Karasu","Kaynarca","Kocaali","Pamukova","Sapanca","Serdivan","Söğütlü","Taraklı"] },
  { name: "Samsun", slug: "samsun", region: "Karadeniz", population: 1356079, areaCode: "0362", lat: "41.2867", lng: "36.3300", districts: ["Alaçam","Asarcık","Atakum","Ayvacık","Bafra","Canik","Çarşamba","Havza","İlkadım","Kavak","Ladik","Salıpazarı","Tekkeköy","Terme","Vezirköprü","Yakakent"] },
  { name: "Siirt", slug: "siirt", region: "Güneydoğu Anadolu", population: 331311, areaCode: "0484", lat: "37.9274", lng: "41.9420", districts: ["Merkez","Baykan","Eruh","Kurtalan","Pervari","Şirvan","Tillo"] },
  { name: "Sinop", slug: "sinop", region: "Karadeniz", population: 218408, areaCode: "0368", lat: "42.0231", lng: "35.1531", districts: ["Merkez","Ayancık","Boyabat","Dikmen","Durağan","Erfelek","Gerze","Saraydüzü","Türkeli"] },
  { name: "Sivas", slug: "sivas", region: "İç Anadolu", population: 635889, areaCode: "0346", lat: "39.7477", lng: "37.0179", districts: ["Merkez","Akıncılar","Altınyayla","Divriği","Doğanşar","Gemerek","Gölova","Gürün","Hafik","İmranlı","Kangal","Koyulhisar","Suşehri","Şarkışla","Ulaş","Yıldızeli","Zara"] },
  { name: "Tekirdağ", slug: "tekirdag", region: "Marmara", population: 1127830, areaCode: "0282", lat: "40.9781", lng: "27.5112", districts: ["Çerkezköy","Çorlu","Ergene","Hayrabolu","Kapaklı","Malkara","Marmaraereğlisi","Muratlı","Saray","Süleymanpaşa","Şarköy"] },
  { name: "Tokat", slug: "tokat", region: "Karadeniz", population: 597920, areaCode: "0356", lat: "40.3167", lng: "36.5500", districts: ["Merkez","Almus","Artova","Başçiftlik","Erbaa","Niksar","Pazar","Reşadiye","Sulusaray","Turhal","Yeşilyurt","Zile"] },
  { name: "Trabzon", slug: "trabzon", region: "Karadeniz", population: 816684, areaCode: "0462", lat: "41.0015", lng: "39.7178", districts: ["Akçaabat","Araklı","Arsin","Beşikdüzü","Çarşıbaşı","Çaykara","Dernekpazarı","Düzköy","Hayrat","Köprübaşı","Maçka","Of","Ortahisar","Sürmene","Şalpazarı","Tonya","Vakfıkebir","Yomra"] },
  { name: "Tunceli", slug: "tunceli", region: "Doğu Anadolu", population: 83402, areaCode: "0428", lat: "39.3074", lng: "39.4388", districts: ["Merkez","Çemişgezek","Hozat","Mazgirt","Nazımiye","Ovacık","Pertek","Pülümür"] },
  { name: "Şanlıurfa", slug: "sanliurfa", region: "Güneydoğu Anadolu", population: 2160671, areaCode: "0414", lat: "37.1591", lng: "38.7969", districts: ["Akçakale","Birecik","Bozova","Ceylanpınar","Eyyübiye","Halfeti","Haliliye","Harran","Hilvan","Karaköprü","Siverek","Suruç","Viranşehir"] },
  { name: "Uşak", slug: "usak", region: "Ege", population: 375454, areaCode: "0276", lat: "38.6823", lng: "29.4082", districts: ["Merkez","Banaz","Eşme","Karahallı","Sivaslı","Ulubey"] },
  { name: "Van", slug: "van", region: "Doğu Anadolu", population: 1142000, areaCode: "0432", lat: "38.4891", lng: "43.4089", districts: ["Bahçesaray","Başkale","Çaldıran","Çatak","Edremit","Erciş","Gevaş","Gürpınar","İpekyolu","Muradiye","Özalp","Saray","Tuşba"] },
  { name: "Yozgat", slug: "yozgat", region: "İç Anadolu", population: 418442, areaCode: "0354", lat: "39.8181", lng: "34.8147", districts: ["Merkez","Akdağmadeni","Aydıncık","Boğazlıyan","Çandır","Çayıralan","Çekerek","Kadışehri","Saraykent","Sarıkaya","Sorgun","Şefaatli","Yenifakılı","Yerköy"] },
  { name: "Zonguldak", slug: "zonguldak", region: "Karadeniz", population: 588510, areaCode: "0372", lat: "41.4564", lng: "31.7987", districts: ["Merkez","Alaplı","Çaycuma","Devrek","Ereğli","Gökçebey","Kilimli","Kozlu"] },
  { name: "Aksaray", slug: "aksaray", region: "İç Anadolu", population: 429069, areaCode: "0382", lat: "38.3687", lng: "34.0370", districts: ["Merkez","Ağaçören","Eskil","Gülağaç","Güzelyurt","Ortaköy","Sarıyahşi"] },
  { name: "Bayburt", slug: "bayburt", region: "Karadeniz", population: 84982, areaCode: "0458", lat: "40.2589", lng: "40.2280", districts: ["Merkez","Aydıntepe","Demirözü"] },
  { name: "Karaman", slug: "karaman", region: "İç Anadolu", population: 256852, areaCode: "0338", lat: "37.1811", lng: "33.2150", districts: ["Merkez","Ayrancı","Başyayla","Ermenek","Kazımkarabekir","Sarıveliler"] },
  { name: "Kırıkkale", slug: "kirikkale", region: "İç Anadolu", population: 278703, areaCode: "0318", lat: "39.8468", lng: "33.5153", districts: ["Merkez","Bahşili","Balışeyh","Çelebi","Delice","Karakeçili","Keskin","Sulakyurt","Yahşihan"] },
  { name: "Batman", slug: "batman", region: "Güneydoğu Anadolu", population: 641886, areaCode: "0488", lat: "37.8812", lng: "41.1351", districts: ["Merkez","Beşiri","Gercüş","Hasankeyf","Kozluk","Sason"] },
  { name: "Şırnak", slug: "sirnak", region: "Güneydoğu Anadolu", population: 557605, areaCode: "0486", lat: "37.4187", lng: "42.4908", districts: ["Merkez","Beytüşşebap","Cizre","Güçlükonak","İdil","Silopi","Uludere"] },
  { name: "Bartın", slug: "bartin", region: "Karadeniz", population: 201635, areaCode: "0378", lat: "41.5811", lng: "32.4610", districts: ["Merkez","Amasra","Kurucaşile","Ulus"] },
  { name: "Ardahan", slug: "ardahan", region: "Doğu Anadolu", population: 94932, areaCode: "0478", lat: "41.1105", lng: "42.7022", districts: ["Merkez","Çıldır","Göle","Hanak","Posof"] },
  { name: "Iğdır", slug: "igdir", region: "Doğu Anadolu", population: 203808, areaCode: "0476", lat: "39.9167", lng: "44.0333", districts: ["Merkez","Aralık","Karakoyunlu","Tuzluca"] },
  { name: "Yalova", slug: "yalova", region: "Marmara", population: 291302, areaCode: "0226", lat: "40.6500", lng: "29.2667", districts: ["Merkez","Altınova","Armutlu","Çiftlikköy","Çınarcık","Termal"] },
  { name: "Karabük", slug: "karabuk", region: "Karadeniz", population: 243614, areaCode: "0370", lat: "41.2061", lng: "32.6204", districts: ["Merkez","Eflani","Eskipazar","Ovacık","Safranbolu","Yenice"] },
  { name: "Kilis", slug: "kilis", region: "Güneydoğu Anadolu", population: 147543, areaCode: "0348", lat: "36.7184", lng: "37.1212", districts: ["Merkez","Elbeyli","Musabeyli","Polateli"] },
  { name: "Osmaniye", slug: "osmaniye", region: "Akdeniz", population: 557666, areaCode: "0328", lat: "37.0745", lng: "36.2474", districts: ["Merkez","Bahçe","Düziçi","Hasanbeyli","Kadirli","Sumbas","Toprakkale"] },
  { name: "Düzce", slug: "duzce", region: "Karadeniz", population: 400173, areaCode: "0380", lat: "40.8438", lng: "31.1565", districts: ["Merkez","Akçakoca","Cumayeri","Çilimli","Gölyaka","Gümüşova","Kaynaşlı","Yığılca"] },
];

// ─── 55+ Services ───
const allServices = [
  { name: "Halı Saha Yapımı", slug: "hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel halı saha yapımı. FIFA standartlarında 55mm suni çim, çelik konstrüksiyon, LED aydınlatma.", features: ["55mm Suni Çim","FIFA Standartları","Çelik Konstrüksiyon","LED Aydınlatma","7 Yıl Garanti"], priceMin: "450", priceMax: "750" },
  { name: "Kapalı Halı Saha Yapımı", slug: "kapali-hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Branda veya sandwich panel kapalı halı saha yapımı. 4 mevsim kullanım imkanı.", features: ["Branda/Sandwich Panel","Kapalı Sistem","Isı Yalıtımı","Ses Yalıtımı","4 Mevsim Kullanım"], priceMin: "1200", priceMax: "1800" },
  { name: "Açık Halı Saha Yapımı", slug: "acik-hali-saha-yapimi", category: "saha-yapimi", shortDescription: "Açık halı saha yapımı. Ekonomik ve hızlı çözüm. 20x40m, 25x45m, 30x50m ölçüler.", features: ["Ekonomik Çözüm","Hızlı Kurulum","PVC Tel Örgü","Üst Kapama Ağı","Suni Çim Zemin"], priceMin: "350", priceMax: "650" },
  { name: "Basketbol Sahası Yapımı", slug: "basketbol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel basketbol sahası yapımı. Akrilik zemin, TBF standartlarında pota sistemleri.", features: ["Akrilik Zemin","TBF Standartları","Profesyonel Pota","Çizgi Boyama","3x3 ve 5x5"], priceMin: "350", priceMax: "600" },
  { name: "Tenis Kortu Yapımı", slug: "tenis-kortu-yapimi", category: "saha-yapimi", shortDescription: "Akrilik ve çim tenis kortu yapımı. ITF standartlarında, profesyonel zemin kaplama.", features: ["Akrilik Zemin","ITF Standartları","Çelik Direk","Profesyonel File","Çizgi Boyama"], priceMin: "400", priceMax: "700" },
  { name: "Voleybol Sahası Yapımı", slug: "voleybol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Profesyonel voleybol sahası yapımı. FIVB standartlarında zemin ve direk sistemleri.", features: ["Akrilik/EPDM Zemin","FIVB Standartları","Teleskopik Direk","Profesyonel File","Saha Çizgileri"], priceMin: "300", priceMax: "550" },
  { name: "Çok Amaçlı Saha Yapımı", slug: "cok-amacli-saha-yapimi", category: "saha-yapimi", shortDescription: "Basketbol, voleybol ve tenis için çok amaçlı spor sahası yapımı.", features: ["Çoklu Spor","Ayarlanabilir Direk","Akrilik Zemin","Çizgi Sistemi","Esnek Kullanım"], priceMin: "400", priceMax: "650" },
  { name: "Nizami Futbol Sahası Yapımı", slug: "nizami-futbol-sahasi-yapimi", category: "saha-yapimi", shortDescription: "Nizami futbol sahası ve tribün yapımı. FIFA standartlarında, 100x70m ölçüler.", features: ["FIFA Standartları","Suni/Doğal Çim","Profesyonel Tribün","Var Sistemi","Skorbord"], priceMin: "800", priceMax: "1500" },
  { name: "Çelik Konstrüksiyon", slug: "celik-konstruksiyon", category: "yapi", shortDescription: "Kapalı saha, hangar ve depo çelik konstrüksiyon yapımı. Dayanıklı ve ekonomik.", features: ["Hafif Çelik","Hızlı Montaj","Dayanıklı","Deprem Güvenli","Uzun Ömür"], priceMin: "600", priceMax: "1200" },
  { name: "Akrilik Zemin Kaplama", slug: "akrilik-zemin-kaplama", category: "zemin", shortDescription: "Akrilik zemin kaplama uygulaması. Basketbol, tenis ve voleybol sahaları için ideal.", features: ["Kaymaz Yüzey","UV Dayanımı","Renk Seçenekleri","Hızlı Kurulum","Ekonomik"], priceMin: "150", priceMax: "300" },
  { name: "Halı Saha Branda", slug: "hali-saha-branda", category: "yapi", shortDescription: "Halı saha branda kaplama ve tamiri. 650gr/m2 PVC branda, UV dayanımlı.", features: ["650gr/m2 PVC","UV Dayanımlı","Su Geçirmez","Alev Almaz","5-10 Yıl Ömür"], priceMin: "180", priceMax: "350" },
  { name: "Suni Çim Saha Kaplama", slug: "suni-cim-saha-kaplama", category: "zemin", shortDescription: "55mm sentetik suni çim saha kaplama. FIFA onaylı, 7 yıl garanti.", features: ["55mm Hav Boyu","FIFA Onaylı","7 Yıl Garanti","Silis Kum + Granül","Jeotekstil Keçe"], priceMin: "180", priceMax: "350" },
  { name: "Halı Saha Halısı Satışı", slug: "hali-saha-halisi", category: "urun", shortDescription: "55mm suni çim halı saha halısı satışı. Ten Cate, FIFA standartlarında.", features: ["55mm Suni Çim","FIFA Standartları","UV Dayanımlı","7 Yıl Garanti","Renk Seçenekleri"], priceMin: "180", priceMax: "350" },
  { name: "55mm Sentetik Suni Çim Fiyatı", slug: "55mm-suni-cim-fiyati", category: "urun", shortDescription: "55mm sentetik suni çim m2 fiyatları. En kaliteli ürünler, uygun fiyatlar.", features: ["55mm Hav Boyu","10.800 D-Tex","UV Dayanımlı","Su Geçirgen","Uzun Ömür"], priceMin: "180", priceMax: "350" },
  { name: "Suni Çim Satan Firmalar", slug: "suni-cim-satan-firmalar", category: "urun", shortDescription: "Suni çim satan firmalar arasında en kaliteli ürünleri en uygun fiyata sunuyoruz.", features: ["Toptan Fiyat","Perakende Satış","Montaj Dahil","Keşif Ücretsiz","Garanti"], priceMin: "150", priceMax: "300" },
  { name: "Yapay Çim Satan Yerler", slug: "yapay-cim-satan-yerler", category: "urun", shortDescription: "Yapay çim satan yerler arasında en kaliteli ürün ve hizmet garantisi.", features: ["Geniş Ürün Yelpazesi","Uygun Fiyat","Profesyonel Danışmanlık","Montaj Hizmeti","Garanti"], priceMin: "150", priceMax: "300" },
  { name: "Halı Saha Yapım Maliyeti", slug: "hali-saha-maliyeti", category: "bilgi", shortDescription: "2026 güncel halı saha yapım maliyeti. m2 başına fiyatlar ve maliyet hesaplama.", features: ["Güncel Fiyatlar","Ücretsiz Keşif","Detaylı Teklif","Taksit İmkanı","Gizli Maliyet Yok"], priceMin: "350", priceMax: "750" },
  { name: "Açık Halı Saha Maliyeti", slug: "acik-hali-saha-maliyeti", category: "bilgi", shortDescription: "Açık halı saha yapım maliyeti. Ölçüye göre detaylı fiyatlandırma.", features: ["20x40m Fiyat","25x45m Fiyat","30x50m Fiyat","Maliyet Hesaplama","Ücretsiz Teklif"], priceMin: "300", priceMax: "600" },
  { name: "Kapalı Halı Saha Maliyeti", slug: "kapali-hali-saha-maliyeti", category: "bilgi", shortDescription: "Kapalı halı saha yapım maliyeti. Branda ve sandwich panel seçenekleri.", features: ["Branda Kapalı Fiyat","Sandwich Panel Fiyat","Isıtma Sistemi","Maliyet Analizi","Detaylı Teklif"], priceMin: "1000", priceMax: "1800" },
  { name: "Halı Saha Yapan Firmalar", slug: "hali-saha-yapan-firmalar", category: "firma", shortDescription: "Halı saha yapan firmalar arasında 30 yıllık tecrübemizle öne çıkıyoruz.", features: ["30 Yıl Tecrübe","MYK Belgeli","TSE/CE Sertifikalı","81 İl Hizmet","Garanti"], priceMin: "350", priceMax: "750" },
  { name: "Kapalı Halı Saha Yapan Firmalar", slug: "kapali-hali-saha-yapan-firmalar", category: "firma", shortDescription: "Kapalı halı saha yapan firmalar arasında lider konumdayız.", features: ["Özel Tasarım","Hızlı Kurulum","Garantili İşçilik","Uygun Fiyat","Referanslar"], priceMin: "1000", priceMax: "1800" },
  { name: "Açık Halı Saha Yapan Firmalar", slug: "acik-hali-saha-yapan-firmalar", category: "firma", shortDescription: "Açık halı saha yapan firmalar arasında en kaliteli hizmeti sunuyoruz.", features: ["Ekonomik Çözümler","Hızlı Teslimat","Kaliteli Malzeme","Garanti","81 İl"], priceMin: "300", priceMax: "650" },
  { name: "Çok Amaçlı Saha Yapan Firmalar", slug: "cok-amacli-saha-yapan-firmalar", category: "firma", shortDescription: "Çok amaçlı saha yapan firmalar arasında profesyonel çözümler.", features: ["Basketbol","Voleybol","Tenis","Badminton","Hepsi Bir Arada"], priceMin: "400", priceMax: "650" },
  { name: "Voleybol Sahası Yapan Firmalar", slug: "voleybol-sahasi-yapan-firmalar", category: "firma", shortDescription: "Voleybol sahası yapan firmalar arasında FIVB standartlarında hizmet.", features: ["FIVB Standartları","Profesyonel Zemin","Teleskopik Direk","File Sistemi","Garanti"], priceMin: "300", priceMax: "550" },
  { name: "Tenis Kortu Yapan Firmalar", slug: "tenis-kortu-yapan-firmalar", category: "firma", shortDescription: "Tenis kortu yapan firmalar arasında ITF standartlarında kalite.", features: ["ITF Standartları","Akrilik Zemin","Çelik Direk","File Sistemi","Garanti"], priceMin: "400", priceMax: "700" },
  { name: "Balon Saha Yapan Firmalar", slug: "balon-saha-yapan-firmalar", category: "firma", shortDescription: "Balon saha yapan firmalar arasında hızlı ve ekonomik çözümler.", features: ["Hava Destekli","Hızlı Kurulum","Taşınabilir","Ekonomik","Garanti"], priceMin: "500", priceMax: "900" },
  { name: "Nizami Saha Yapan Firmalar", slug: "nizami-saha-yapan-firmalar", category: "firma", shortDescription: "Nizami futbol sahası yapan firmalar arasında FIFA standartlarında hizmet.", features: ["FIFA Standartları","Tribün Sistemi","Skorbord","Var Sistemi","Garanti"], priceMin: "800", priceMax: "1500" },
  { name: "Halı Saha Granül Satan Firmalar", slug: "hali-saha-granul-satan-firmalar", category: "urun", shortDescription: "SBR ve EPDM granül satışı. Halı saha zemin dolgu malzemesi.", features: ["SBR Granül","EPDM Granül","Renk Seçenekleri","Toptan Fiyat","Hızlı Teslimat"], priceMin: "15", priceMax: "45" },
  { name: "Granül Satan Firmalar", slug: "granul-satan-firmalar", category: "urun", shortDescription: "EPDM ve SBR kauçuk granül satan firmalar. Spor sahaları için ideal.", features: ["EPDM Granül","SBR Granül","Farklı Renkler","Toptan Fiyat","Stoktan Teslim"], priceMin: "15", priceMax: "45" },
  { name: "Halı Saha Tavan Filesi", slug: "hali-saha-tavan-filesi", category: "urun", shortDescription: "Halı saha tavan filesi m2 fiyatları. Paraşüt ipi, UV dayanımlı.", features: ["Paraşüt İpi","UV Dayanımlı","Farklı Kalınlıklar","Profesyonel Montaj","Garanti"], priceMin: "25", priceMax: "60" },
  { name: "Halı Saha Filesi Satan Firmalar", slug: "hali-saha-filesi-satan-firmalar", category: "urun", shortDescription: "Halı saha filesi satan firmalar. Tavan, yan ve kale filesi.", features: ["Tavan Filesi","Yan Filesi","Kale Filesi","Paraşüt İpi","Montaj Dahil"], priceMin: "25", priceMax: "60" },
  { name: "Halı Saha Tamiri", slug: "hali-saha-tamiri", category: "hizmet", shortDescription: "Halı saha tamiri ve bakım hizmetleri. Zemin düzeltme, çim yenileme.", features: ["Zemin Düzeltme","Çim Yenileme","Granül Değişimi","Çizgi Boyama","Bakım Paketi"], priceMin: "50", priceMax: "200" },
  { name: "Halı Saha Branda Tamiri", slug: "hali-saha-branda-tamiri", category: "hizmet", shortDescription: "Halı saha branda tamiri ve değişimi. Yırtık tespiti ve onarım.", features: ["Yırtık Onarımı","Komple Değişim","UV Dayanımlı","Su Geçirmez","Garanti"], priceMin: "100", priceMax: "400" },
  { name: "Suni Çim Tamiri", slug: "suni-cim-tamiri", category: "hizmet", shortDescription: "Suni çim tamiri ve yenileme hizmetleri. Yıpranmış çim değişimi.", features: ["Çim Değişimi","Ek Yerleri","Granül Tazeleme","Çizgi Yenileme","Bakım"], priceMin: "80", priceMax: "250" },
  { name: "Halı Saha Tel Örgü", slug: "hali-saha-tel-orgu", category: "urun", shortDescription: "Halı saha tel örgü satan firmalar. Galvanizli PVC kaplı tel örgü.", features: ["Galvanizli","PVC Kaplı","Farklı Yükseklikler","Hızlı Montaj","Garanti"], priceMin: "40", priceMax: "100" },
  { name: "Pota Satan Firmalar", slug: "pota-satan-firmalar", category: "urun", shortDescription: "Basketbol potası satan firmalar. TBF onaylı, paslanmaz çelik.", features: ["TBF Onaylı","Paslanmaz Çelik","Masa/Duvar Monte","Hareketli Pota","Garanti"], priceMin: "1500", priceMax: "15000" },
  { name: "Tartan Zemin Kaplama", slug: "tartan-zemin-kaplama", category: "zemin", shortDescription: "Tartan zemin kaplama yapan firmalar. EPDM kaplamalı spor zeminleri.", features: ["EPDM Kaplama","Esnek Zemin","Darbe Emici","Renk Seçenekleri","Uzun Ömür"], priceMin: "200", priceMax: "400" },
  { name: "Padel Kortu Yapımı", slug: "padel-kortu-yapimi", category: "saha-yapimi", shortDescription: "Padel kortu yapımı. Cam duvar sistemli, profesyonel padel sahaları.", features: ["Cam Duvar","Sentetik Çim","Profesyonel File","LED Aydınlatma","FIP Standartları"], priceMin: "800", priceMax: "1500" },
  { name: "Atletizm Pisti Yapımı", slug: "atletizm-pisti-yapimi", category: "saha-yapimi", shortDescription: "Atletizm pisti yapımı. IAAF standartlarında, tartan zemin.", features: ["IAAF Standartları","Tartan Zemin","8 Kulvar","Profesyonel"], priceMin: "350", priceMax: "600" },
  { name: "Havuz Yapımı", slug: "havuz-yapimi", category: "saha-yapimi", shortDescription: "Olimpik yüzme havuzu yapımı. Betonarme ve prefabrik seçenekler.", features: ["Olimpik Boyutlar","Filtrasyon Sistemi","Isıtma Sistemi","Prefabrik/Betonarme","Garanti"], priceMin: "2500", priceMax: "5000" },
  { name: "Hibrit Çim Saha Yapımı", slug: "hibrit-cim-saha-yapimi", category: "saha-yapimi", shortDescription: "Hibrit çim saha yapımı. Doğal çim + suni çim karışımı. FIFA standartlarında.", features: ["FIFA Standartları","Doğal + Suni Çim","Drenaj Sistemi","Uzun Ömür","Profesyonel"], priceMin: "600", priceMax: "1200" },
  { name: "Yedek Kulübesi", slug: "yedek-kulubesi", category: "urun", shortDescription: "Spor sahası yedek kulübesi. Polikarbonat ve akrilik malzeme.", features: ["Polikarbonat","Akrilik","4-8 Kişilik","Dayanıklı","Kolay Montaj"], priceMin: "500", priceMax: "2500" },
  { name: "Spor Zemin Kaplama", slug: "spor-zemin-kaplama", category: "zemin", shortDescription: "Profesyonel spor zemin kaplama hizmetleri. Her türlü spor için.", features: ["Akrilik","EPDM","Tartan","Poliüretan","Farklı Sporlar"], priceMin: "150", priceMax: "500" },
  { name: "Basketbol Potaları", slug: "basketbol-potalari", category: "urun", shortDescription: "Profesyonel basketbol potası. TBF onaylı, paslanmaz çelik.", features: ["TBF Onaylı","Paslanmaz Çelik","Hareketli/Sabit","Cam Pano","Garanti"], priceMin: "2000", priceMax: "20000" },
  { name: "Voleybol ve Tenis Direkleri", slug: "voleybol-tenis-direkleri", category: "urun", shortDescription: "Voleybol ve tenis direkleri. Çelik direk, profesyonel file sistemi.", features: ["Çelik Direk","Paslanmaz","Teleskopik","File Dahil","FIVB/ITF"], priceMin: "1500", priceMax: "8000" },
  { name: "Futbol Kaleleri", slug: "futbol-kaleleri", category: "urun", shortDescription: "Futbol kalesi ve filesi. Profesyonel standartlarda.", features: ["Çelik Konstrüksiyon","File Dahil","Farklı Boyutlar","Taşınabilir","Garanti"], priceMin: "800", priceMax: "5000" },
  { name: "Tribün Koltukları", slug: "tribun-koltuklari", category: "urun", shortDescription: "Plastik tribün koltuğu. Dayanıklı, ergonomik, renk seçenekleri.", features: ["Plastik","Ergonomik","Renk Seçenekleri","Kolay Montaj","Dayanıklı"], priceMin: "50", priceMax: "200" },
  { name: "Halı Saha Skorbord", slug: "hali-saha-skorbord", category: "urun", shortDescription: "Halı saha elektronik skorbord. LED ekran, kumandalı.", features: ["LED Ekran","Kumandalı","Süre/Sayaç","Dış Mekan","Garanti"], priceMin: "3000", priceMax: "15000" },
  { name: "Halı Saha Aydınlatma", slug: "hali-saha-aydinlatma", category: "urun", shortDescription: "Halı saha LED aydınlatma sistemi. 200W projektör, homojen ışık.", features: ["200W LED","Homojen Işık","Enerji Tasarruflu","Uzun Ömür","Montaj Dahil"], priceMin: "250", priceMax: "600" },
  { name: "Prefabrik Konteyner", slug: "prefabrik-konteyner", category: "yapi", shortDescription: "Prefabrik konteyner ve çelik ev yapımı. Hızlı kurulum, ekonomik.", features: ["Hızlı Kurulum","Ekonomik","Dayanıklı","Taşınabilir","İzoleli"], priceMin: "500", priceMax: "2000" },
];

// ─── 14-17 realistic Turkish reviews per city ───
const reviewNames = [
  "Mehmet Yılmaz", "Ahmet Kaya", "Fatma Demir", "Ali Şahin", "Ayşe Çelik",
  "Mustafa Özdemir", "Zeynep Arslan", "İbrahim Koç", "Elif Yıldız", "Hakan Aydın",
  "Selin Korkmaz", "Burak Yılmaz", "Deniz Karaca", "Ceren Bulut", "Emre Taş",
  "Gizem Toprak", "Kemal Usta"
];

const reviewServiceTypes = [
  "hali-saha-yapimi", "kapali-hali-saha-yapimi", "acik-hali-saha-yapimi",
  "basketbol-sahasi-yapimi", "tenis-kortu-yapimi", "voleybol-sahasi-yapimi",
  "cok-amacli-saha-yapimi", "nizami-futbol-sahasi-yapimi", "celik-konstruksiyon",
  "akrilik-zemin-kaplama", "hali-saha-branda", "suni-cim-saha-kaplama",
  "padel-kortu-yapimi", "atletizm-pisti-yapimi", "havuz-yapimi",
  "tartan-zemin-kaplama", "hibrit-cim-saha-yapimi"
];

const reviewTemplates = [
  (c: string, d: string) => `${c} ${d} semtinde halı saha yapımı projemizi çok profesyonel bir şekilde tamamladılar. 30 günlük sürede anahtar teslim teslim aldık. MYK belgeli ekibin işçiliği gerçekten çok kaliteli. ${c} halı saha yapan firmalar arasında en iyileri İkber Spor.`,
  (c: string, d: string) => `${c} ${d} bölgesinde kapalı halı saha yapımı yaptırdık. Branda kaplama mükemmel, içerideki ısı yalıtımı çok iyi. Kışın bile sorunsuz kullanıyoruz. ${c} kapalı halı saha yapan firmalar arasında fiyat/performans olarak en iyisi.`,
  (c: string, d: string) => `Eşimle birlikte ${c} ${d} mahallesinde açık halı saha projemizi İkber Spor'a emanet ettik. Çok hızlı ve temiz bir iş çıkardılar. 15 günde teslim ettiler. ${c} açık halı saha yapan firmalar arasında en güvenilirleri.`,
  (c: string, d: string) => `${c} ${d} semtinde basketbol sahası yapımı projemizde akrilik zemin çok kaliteli oldu. TBF standartlarında pota montajı yapan ender firmalardan biri. Kesinlikle tavsiye ederim.`,
  (c: string, d: string) => `Okulumuz için ${c} ${d} bölgesinde tenis kortu yaptırdık. ITF standartlarında, çok profesyonel bir iş çıktı. ${c} tenis kortu yapan firmalar arasında en iyileri İkber Spor Yapıları.`,
  (c: string, d: string) => `${c} ${d} semtinde voleybol sahası yapımı projemiz çok başarılı geçti. FIVB standartlarında zemin ve direk sistemi. ${c} voleybol sahası yapan firmalar arasında lider konumdalar.`,
  (c: string, d: string) => `${c} ${d} bölgesinde çok amaçlı saha yapımı projemizde basketbol ve voleybol bir arada. Çok fonksiyonel ve kaliteli bir saha oldu. ${c} çok amaçlı saha yapan firmalar arasında en iyisi.`,
  (c: string, d: string) => `Spor tesisimiz için ${c} ${d} semtinde nizami futbol sahası ve tribün yapımı yaptırdık. FIFA standartlarında, çok profesyonel bir iş. ${c} nizami saha yapan firmalar içinde en tecrübelileri.`,
  (c: string, d: string) => `${c} ${d} bölgesinde çelik konstrüksiyon yapan firmalar aradık. Paslanmaz çelik proje mükemmeldi. İkber Spor'u herkese tavsiye ederim. Çok profesyonel bir ekip.`,
  (c: string, d: string) => `${c} ${d} semtinde akrilik zemin yapan firmalar arasında en kaliteli işçilik İkber Spor'da. Basketbol sahamızın zemini çok güzel oldu. Herkese tavsiye ederim.`,
  (c: string, d: string) => `${c} ${d} bölgesinde halı saha branda satan firmalar arasında en uygun fiyatı İkber Spor verdi. 650gr/m2 PVC branda kaliteli ve montaj çok profesyoneldi.`,
  (c: string, d: string) => `${c} ${d} semtinde suni çim satan firmalar arayışındaydık. Ten Cate marka suni çimi çok uygun fiyata aldık. Montaj dahil hizmet çok iyiydi.`,
  (c: string, d: string) => `${c} ${d} bölgesinde granül satan firmalar arasında EPDM granül için en iyi fiyatı burada bulduk. Teslimat çok hızlıydı, teşekkürler İkber Spor.`,
  (c: string, d: string) => `Halı sahamızın tamiri için ${c} ${d} semtinde halı saha tamiri hizmeti aldık. Zemin düzeltme ve granül değişimi çok profesyonel yapıldı. Teşekkürler.`,
  (c: string, d: string) => `${c} ${d} bölgesinde halı saha filesi satan firmalar arasında en kaliteli ürünü İkber Spor'da bulduk. Paraşüt ipi tavan filesi çok sağlam. Montaj dahil hizmet süper.`,
  (c: string, d: string) => `${c} ${d} semtinde pota satan firmalar arasında TBF onaylı basketbol potasını İkber Spor'dan aldık. Paslanmaz çelik, çok kaliteli. Montaj dahil fiyat çok iyiydi.`,
  (c: string, d: string) => `${c} ${d} bölgesinde halı saha yapım firmaları arasında 30 yıllık tecrübesiyle İkber Spor'u seçtik. Çok doğru bir karar vermişiz. Teşekkürler.`,
];

// ─── 15-20 district-specific FAQs per city ───
const faqServiceNames = [
  "halı saha yapımı", "kapalı halı saha yapımı", "açık halı saha yapımı",
  "basketbol sahası yapımı", "tenis kortu yapımı", "voleybol sahası yapımı",
  "çok amaçlı saha yapımı", "nizami futbol sahası yapımı", "çelik konstrüksiyon",
  "akrilik zemin kaplama", "branda kaplama", "suni çim kaplama",
  "padel kortu yapımı", "atletizm pisti yapımı", "tartan zemin kaplama",
  "havuz yapımı", "hibrit çim saha yapımı", "pota montajı", "tel örgü",
  "LED aydınlatma"
];

const faqTemplates = [
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ne kadar sürer?`, a: `${c} ${d} bölgesinde ${svc} projeleri ortalama 15-45 gün içinde tamamlanmaktadır. Hava koşulları ve zemin durumuna göre bu süre değişebilir.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} maliyeti ne kadar?`, a: `${c} ${d} semtinde ${svc} maliyeti, projenin ölçülerine ve kullanılacak malzemelere göre değişmektedir. Ücretsiz keşif hizmetimizle net fiyat alabilirsiniz.`, cat: "pricing" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için ne tibi malzeme kullanıyorsunuz?`, a: `${c} ${d} bölgesindeki projelerimizde TSE ve CE sertifikalı, en kaliteli malzemeleri kullanıyoruz. Tüm ürünlerimiz 7 yıl garantilidir.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} yapan firmalar arasında neden sizi seçmeliyim?`, a: `İkber Spor Yapıları olarak ${c} ${d} semtinde 30+ yıllık tecrübemiz, MYK belgeli ekibimiz ve referanslarımızla en güvenilir seçeneğiz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için ücretsiz keşif yapıyor musunuz?`, a: `Evet, ${c} ${d} bölgesinde ${svc} için ücretsiz keşif hizmeti sunuyoruz. Yerinde değerlendirme sonrası detaylı teklif hazırlıyoruz.`, cat: "service" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} garantisi var mı?`, a: `Evet, ${c} ${d} semtinde yaptığımız tüm ${svc} projelerinde 7 yıl yapısal garanti ve 2 yıl işçilik garantisi sunuyoruz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ödemesi nasıl yapılıyor?`, a: `${c} ${d} bölgesinde ${svc} projelerinde nakit, kredi kartı ve banka havalesi ile ödeme imkanı sunuyoruz. Bazı projelerde taksit seçeneği de mevcuttur.`, cat: "pricing" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ruhsat işlemlerinde yardımcı oluyor musunuz?`, a: `Evet, ${c} ${d} belediyesinden gerekli ruhsatların alınması sürecinde size danışmanlık hizmeti sunuyoruz.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için referans projeniz var mı?`, a: `Evet, ${c} ${d} semtinde ve çevre ilçelerde ${svc} konusunda birçok başarılı projemiz bulunmaktadır. İsterseniz referanslarımızı paylaşabiliriz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} kışın da yapılabilir mi?`, a: `${c} ${d} iklim koşulları göz önünde bulundurularak ${svc} projeleri genellikle ilkbahar ve sonbahar aylarında yapılmaktadır. Ancak kapalı saha projeleri için kış aylarında da çalışabiliyoruz.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} sonrası bakım hizmeti veriyor musunuz?`, a: `Evet, ${c} ${d} bölgesinde ${svc} sonrası periyodik bakım, onarım ve yedek parça hizmetleri sunuyoruz.`, cat: "service" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için arazi büyüklüğü ne olmalı?`, a: `${c} ${d} semtinde ${svc} için minimum arazi büyüklüğü ve zemin koşulları ücretsiz keşif sırasında değerlendirilerek size özel çözüm sunulmaktadır.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} fiyat teklifi nasıl alabilirim?`, a: `${c} ${d} bölgesinde ${svc} için 0542 612 56 10 numaralı telefondan veya WhatsApp üzerinden bize ulaşarak ücretsiz fiyat teklifi alabilirsiniz.`, cat: "pricing" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ekibiniz kaç kişi çalışıyor?`, a: `${c} ${d} semtinde ${svc} projelerimizde MYK belgeli, en az 4-6 kişilik profesyonel ekipler görev almaktadır.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} projesiyle ilgili sözleşme yapılıyor mu?`, a: `Evet, ${c} ${d} bölgesindeki tüm ${svc} projelerimizde sözleşme yapılmaktadır. Sözleşmede malzeme, işçilik, teslim süresi ve garanti koşulları açıkça belirtilir.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için kredi kartı geçerli mi?`, a: `Evet, ${c} ${d} semtinde ${svc} projelerimizde kredi kartı ve taksit imkanı sunuyoruz.`, cat: "pricing" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} sonrası çim ne zaman kullanıma hazır olur?`, a: `${c} ${d} bölgesinde ${svc} tamamlandıktan sonra suni çim ve zemin en geç 24-48 saat içinde kullanıma hazır hale gelmektedir.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ile ilgili referanslarınızı görebilir miyim?`, a: `Tabii ki, ${c} ${d} semtinde yaptığımız ${svc} projelerinin fotoğraflarını ve müşteri yorumlarını web sitemizden inceleyebilirsiniz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için keşif randevusu nasıl alırım?`, a: `${c} ${d} bölgesinde ${svc} için 0542 612 56 10 numaralı telefondan veya WhatsApp üzerinden keşif randevusu alabilirsiniz.`, cat: "service" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} hakkında daha fazla bilgi almak istiyorum.`, a: `${c} ${d} semtinde ${svc} hakkında detaylı bilgi almak için bizi 0542 612 56 10 numaralı telefondan arayabilir veya WhatsApp üzerinden yazabilirsiniz.`, cat: "general" }),
];

export const seedRouter = createRouter({
  run: publicQuery.mutation(async () => {
    const db = getDb();

    // 1. Insert cities in batches
    for (let i = 0; i < allCities.length; i += 10) {
      const batch = allCities.slice(i, i + 10);
      await db.insert(cities).values(
        batch.map((c) => ({
          name: c.name,
          slug: c.slug,
          region: c.region,
          population: c.population,
          areaCode: c.areaCode,
          latitude: c.lat,
          longitude: c.lng,
          districts: c.districts,
          description: `${c.name} ilinde profesyonel spor sahası yapım hizmetleri. Halı saha, basketbol sahası, tenis kortu, voleybol sahası ve çok amaçlı spor sahaları yapımında 30 yıllık tecrübe.`,
          metaTitle: `${c.name} Halı Saha Yapımı | İkber Spor Yapıları | 0542 612 56 10`,
          metaDescription: `${c.name} ve tüm ilçelerinde halı saha, kapalı halı saha, basketbol sahası, tenis kortu yapımı. Anahtar teslim, MYK belgeli ekip, TSE/CE sertifikalı malzeme. Ücretsiz keşif!`,
          isActive: true,
        }))
      );
    }

    // 2. Insert services
    for (let i = 0; i < allServices.length; i += 10) {
      const batch = allServices.slice(i, i + 10);
      await db.insert(services).values(
        batch.map((s) => ({
          name: s.name,
          slug: s.slug,
          category: s.category,
          shortDescription: s.shortDescription,
          longDescription: s.shortDescription + ` ${s.name} konusunda 30 yıllık tecrübemizle en kaliteli hizmeti sunuyoruz.`,
          features: s.features,
          priceRangeMin: s.priceMin,
          priceRangeMax: s.priceMax,
          icon: "Activity",
          metaTitle: `${s.name} | İkber Spor Yapıları | 81 İl Hizmet`,
          metaDescription: `${s.shortDescription} Anahtar teslim, MYK belgeli ekip, garantili işçilik. Ücretsiz keşif ve fiyat teklifi için hemen arayın!`,
          sortOrder: 0,
          isActive: true,
        }))
      );
    }

    // 3. Get inserted data
    const insertedCities = await db.select().from(cities);
    const insertedServices = await db.select().from(services);

    // 4. Insert reviews (14-17 per city = ~1.458 reviews)
    let totalReviews = 0;
    for (const city of insertedCities) {
      const cityDistricts = city.districts as string[] | null;
      const numReviews = 14 + Math.floor(Math.random() * 4); // 14-17
      const batch = [];
      for (let i = 0; i < numReviews; i++) {
        const district = cityDistricts?.[i % (cityDistricts?.length || 1)] || "Merkez";
        batch.push({
          cityId: city.id,
          customerName: reviewNames[i % reviewNames.length],
          customerLocation: city.name,
          district,
          rating: 5,
          reviewText: reviewTemplates[i % reviewTemplates.length](city.name, district),
          serviceType: reviewServiceTypes[i % reviewServiceTypes.length],
          isApproved: true,
        });
      }
      await db.insert(reviews).values(batch);
      totalReviews += numReviews;
    }

    // 5. Insert FAQs (15-20 per city = ~1.620 FAQs)
    let totalFaqs = 0;
    for (const city of insertedCities) {
      const cityDistricts = city.districts as string[] | null;
      const numFaqs = 15 + Math.floor(Math.random() * 6); // 15-20
      const batch = [];
      for (let i = 0; i < numFaqs; i++) {
        const district = cityDistricts?.[i % (cityDistricts?.length || 1)] || "Merkez";
        const serviceName = faqServiceNames[i % faqServiceNames.length];
        const tmpl = faqTemplates[i % faqTemplates.length](city.name, district, serviceName);
        batch.push({
          cityId: city.id,
          question: tmpl.q,
          answer: tmpl.a,
          category: tmpl.cat,
          sortOrder: i,
          isActive: true,
        });
      }
      await db.insert(faqs).values(batch);
      totalFaqs += numFaqs;
    }

    // 6. Generate service pages for all cities × all services
    let totalPages = 0;
    for (const city of insertedCities) {
      const batch = insertedServices.map((svc) => ({
        cityId: city.id,
        serviceId: svc.id,
        slug: `${city.slug}-${svc.slug}`,
        pageTitle: `${city.name} ${svc.name} | İkber Spor Yapıları`,
        metaTitle: `${city.name} ${svc.name} | İkber Spor Yapıları | 0542 612 56 10`,
        metaDescription: `${city.name} ${svc.name} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. ${city.name} ve tüm ilçelerinde anahtar teslim hizmet.`,
        metaKeywords: `${city.name} ${svc.name}, ${city.name} ${svc.slug}, ${svc.name} ${city.name}, İkber Spor`,
        content: `${city.name} ${svc.name} konusunda İkber Spor Yapıları olarak 30 yılı aşkın tecrübemizle hizmet vermekteyiz. ${city.name} ve tüm ilçelerinde profesyonel ekiplerimizle anahtar teslim ${svc.name} projeleri gerçekleştiriyoruz.`,
        localDescription: `${city.name} bölgesi için özel ${svc.name} çözümleri. ${city.name} iklim koşullarına uygun malzeme seçimi ve uzman kadro.`,
        localPriceNote: `${city.name} ${svc.name} fiyatları için ücretsiz keşif ve teklif alabilirsiniz.`,
        localAddress: `${city.name} Merkez`,
        localPhone: "0542 612 56 10",
        canonicalUrl: `https://ikberspor.com/sehir/${city.slug}/${svc.slug}`,
        isActive: true,
      }));
      for (let i = 0; i < batch.length; i += 20) {
        await db.insert(servicePages).values(batch.slice(i, i + 20));
      }
      totalPages += batch.length;
    }

    return {
      cities: insertedCities.length,
      services: insertedServices.length,
      reviews: totalReviews,
      faqs: totalFaqs,
      pages: totalPages,
    };
  }),
});
