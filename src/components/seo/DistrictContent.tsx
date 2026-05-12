import { MapPin, Trees, Waves, Building2, Mountain, Anchor, Leaf } from "lucide-react";

interface DistrictContentProps {
  cityName: string;
  districts: string[];
}

// İlçe bazlı özgün tanıtım metinleri - her ilçe için yerel özellikler
type DistrictTheme = "osb" | "sahil" | "dag" | "tarim" | "tarih" | "univ" | "default";

function getDistrictTheme(districtName: string, cityName: string): { theme: DistrictTheme; keywords: string; feature: string } {
  const d = districtName.toLowerCase();
  const c = cityName.toLowerCase();

  // OSB / Sanayi bölgesi
  if (d.includes("osb") || d.includes("sanayi") || d.includes("organize")) {
    return { theme: "osb", keywords: "OSB, sanayi bölgesi, fabrika spor sahası, işletme", feature: "Organize Sanayi Bölgesi içinde" };
  }
  // Sahil / Kıyı
  if (d.includes("sahil") || d.includes("kıyı") || d.includes("liman") || d.includes("deniz")) {
    return { theme: "sahil", keywords: "sahil, kıyı, deniz manzaralı, yaz sezonu", feature: "Sahil bandında" };
  }
  // Dağ / Yayla
  if (d.includes("dağ") || d.includes("yayla") || d.includes("tepe") || d.includes("bel")) {
    return { theme: "dag", keywords: "dağ, yayla, yüksek rakım, serin iklim", feature: "Yüksek rakımlı bölge" };
  }
  // Tarım / Bağ
  if (d.includes("tarım") || d.includes("bağ") || d.includes("bahçe") || d.includes("zeytin")) {
    return { theme: "tarim", keywords: "tarım, bağ, zeytinlik, kırsal", feature: "Tarımsal bölgede" };
  }
  // Tarih / Kale
  if (d.includes("tarih") || d.includes("kale") || d.includes("antik") || d.includes("hisar")) {
    return { theme: "tarih", keywords: "tarihi, turistik, kültürel, miras", feature: "Tarihi dokuda" };
  }
  // Üniversite
  if (d.includes("üniv") || d.includes("kampüs") || d.includes("eğitim")) {
    return { theme: "univ", keywords: "üniversite, kampüs, öğrenci, eğitim", feature: "Üniversite yakınında" };
  }

  // Şehre özel karakteristik ilçeler
  if (c === "istanbul") {
    if (["kadıköy", "beşiktaş", "şişli", "bakırköy"].includes(d)) return { theme: "default", keywords: "merkezi, yoğun nüfus, metrobüs", feature: "Merkezi konumda" };
    if (["tuzla", "pendik", "kartal", "maltepe"].includes(d)) return { theme: "sahil", keywords: "sahil, marina, deniz ulaşımı", feature: "Anadolu Yakası sahil hattında" };
    if (["arnavutköy", "çatalca", "silivri", "beylikdüzü"].includes(d)) return { theme: "tarim", keywords: "geniş arazi, villa, site", feature: "Geniş arazi imkanı" };
  }
  if (c === "ankara") {
    if (["çankaya", "keçiören", "yenimahalle"].includes(d)) return { theme: "default", keywords: "başkent, kamu, memur", feature: "Merkez ilçe" };
    if (["mamak", "sincan", "etimesgut"].includes(d)) return { theme: "default", keywords: "gençlik, spor kompleksi", feature: "Yeni gelişen bölge" };
  }
  if (c === "izmir") {
    if (["konak", "karşıyaka", "bornova"].includes(d)) return { theme: "sahil", keywords: "kordon, kıyı, turizm", feature: "Ege sahilinde" };
    if (["urla", "çeşme", "foça", "karaburun"].includes(d)) return { theme: "sahil", keywords: "turizm, yazlık, plaj", feature: "Ege kıyı şeridinde" };
  }
  if (c === "antalya") {
    if (["muratpaşa", "konyaaltı", "kepez"].includes(d)) return { theme: "sahil", keywords: "turizm, otel, tatil", feature: "Turizm merkezinde" };
    if (["alanya", "kemer", "kaş", "belek"].includes(d)) return { theme: "sahil", keywords: "turizm cenneti, otel, golf", feature: "Dünya turizm merkezi" };
  }
  if (c === "bursa") {
    if (["nilüfer", "osmangazi"].includes(d)) return { theme: "osb", keywords: "sanayi, fabrika, üretim", feature: "Sanayi ve ticaret bölgesi" };
    if (["mudanya"].includes(d)) return { theme: "sahil", keywords: "deniz otobüsü, sahil, yazlık", feature: "Marmara sahilinde" };
  }
  if (c === "adana") {
    if (["seyhan", "çukurova"].includes(d)) return { theme: "tarim", keywords: "çukurova, tarım, verimli toprak", feature: "Çukurova Ovası'nda" };
    if (["yumurtalık", "karataş"].includes(d)) return { theme: "sahil", keywords: "sahil, balıkçılık, liman", feature: "Akdeniz kıyısında" };
  }

  return { theme: "default", keywords: "konut, site, okul, semt", feature: "Yerleşim bölgesinde" };
}

function getDistrictIcon(theme: DistrictTheme) {
  switch (theme) {
    case "osb": return <Building2 className="w-5 h-5" />;
    case "sahil": return <Waves className="w-5 h-5" />;
    case "dag": return <Mountain className="w-5 h-5" />;
    case "tarim": return <Leaf className="w-5 h-5" />;
    case "tarih": return <Anchor className="w-5 h-5" />;
    case "univ": return <Trees className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
}

function generateDistrictDescription(district: string, cityName: string, theme: DistrictTheme, _keywords: string, feature: string): string {
  const templates = {
    osb: `${cityName} ${district} ${feature}'nde spor sahası yapımı için özel çözümler sunuyoruz. ${district} bölgesindeki fabrikalar, işletmeler ve OSB çalışanları için kapalı halı saha, açık basketbol sahası ve tenis kortu projelerinde uzmanız. Geniş otopark imkanı ve yüksek tonajlı araç erişimi avantajıyla ${district}'deki kurumsal spor kompleksi projelerinizi anahtar teslim teslim ediyoruz.`,

    sahil: `${cityName} ${district}, ${feature}'nde deniz manzaralı spor sahası yapımının en güzel adresi. ${district}'de yaz sezonu yoğunluğunda kullanıma uygun, neme dayanıklı FIFA onaylı suni çim ile kaplı profesyonel saha projeleri üretiyoruz. ${district} sahilindeki otel, pansiyon ve tatil köyleri için çok amaçlı spor sahaları, açık halı saha ve voleybol sahası yapımında ${cityName}'nin lider firmasıyız.`,

    dag: `${cityName} ${district}, ${feature}'nde özel iklim koşullarına uygun spor sahası yapımı. ${district}'nin serin havası ve doğal güzellikleri arasında, çift kat drenaj sistemi ve nem dayanımlı çim kaplama ile uzun ömürlü spor sahaları inşa ediyoruz. ${district} yaylasında veya dağ eteklerinde doğa ile iç içe bir spor kompleksi için özel projelendirme yapıyoruz.`,

    tarim: `${cityName} ${district}, ${feature}'nde kırsal yaşama uygun spor sahası çözümleri. ${district}'deki tarım arazileri, bağ ve bahçe arsaları arasında geniş alanlarda açık halı saha, basketbol ve voleybol sahası yapımı yapıyoruz. ${district} bölgesindeki köyler ve beldeler için ekonomik spor sahası paketleri ile gençlerin spora erişimini kolaylaştırıyoruz.`,

    tarih: `${cityName} ${district}, ${feature}'nde turistik spor sahası projeleri. ${district}'in tarihi dokusu ve ziyaretçi yoğunluğu göz önünde bulundurularak estetik ve fonksiyonel spor sahaları tasarlıyoruz. ${district} bölgesindeki butik otel, restoran ve turizm işletmeleri için özel tasarımlı tenis kortu, basketbol sahası ve çok amaçlı saha yapımı hizmeti veriyoruz.`,

    univ: `${cityName} ${district}, ${feature}'nda eğitim kurumlarına özel spor sahası çözümleri. Üniversite kampüsleri, kolejler ve eğitim merkezleri için FIFA standartlarında halı saha, TBF standartlarında basketbol sahası ve ITF standartlarında tenis kortu yapımı yapıyoruz. ${district}'deki genç ve dinamik nüfusa hitap eden modern spor kompleksi projelerinde uzmanız.`,

    default: `${cityName} ${district} semtinde profesyonel spor sahası yapım hizmetleri. ${district}, ${cityName}'nin gelişen ve değerlenen bölgelerinden biri olup, konut siteleri, okullar ve özel işletmeler için spor sahası talebi her geçen gün artıyor. ${district}'deki projelerinizde açık halı saha, kapalı halı saha, basketbol sahası, tenis kortu ve çok amaçlı saha yapımında deneyimli ekibimizle hizmetinizdeyiz.`,
  };

  return templates[theme] || templates.default;
}

export default function DistrictContent({ cityName, districts }: DistrictContentProps) {
  if (!districts || districts.length === 0) return null;

  // 12 ilçeyi göster, fazlası "ve diğerleri" şeklinde
  const displayDistricts = districts.slice(0, 12);

  return (
    <section className="py-12 bg-white" aria-label="İlçe Bazlı Hizmetler">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <MapPin className="w-7 h-7 text-green-600" />
          {cityName} İlçelerinde Spor Sahası Yapımı
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          {cityName}'nin {districts.length} ilçesinde ve mahallelerinde profesyonel spor sahası 
          yapım hizmeti sunuyoruz. Her ilçenin coğrafi ve iklimsel özelliklerine uygun 
          özel çözümler ile anahtar teslim projeler üretiyoruz.
        </p>

        <div className="space-y-6">
          {displayDistricts.map((district) => {
            const { theme, keywords: kwStr, feature } = getDistrictTheme(district, cityName);
            const description = generateDistrictDescription(district, cityName, theme, kwStr, feature);

            return (
              <article
                key={district}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">{getDistrictIcon(theme)}</span>
                  {cityName} {district}'de Spor Sahası Yapımı
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {kwStr.split(", ").map((kw: string) => (
                    <span key={kw} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {districts.length > 12 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            +{districts.length - 12} ilçe daha... Tüm {cityName} ilçelerinde hizmet veriyoruz.
          </p>
        )}
      </div>
    </section>
  );
}
