import { useState, useEffect } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import {
  LocalBusinessSchema,
  FAQSchema,
} from "@/components/seo/SchemaMarkup";
import {
  Phone,
  MapPin,
  Mail,
  Award,
  Users,
  Shield,
  Globe,
  Star,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  TrendingUp,
  Wrench,
  Zap,
  MessageCircle,
  Calendar,
} from "lucide-react";

// Static data
const mainServices = [
  { name: "Halı Saha Yapımı", slug: "hali-saha-yapimi", desc: "FIFA standartlarında 55mm suni çim, çelik konstrüksiyon ve profesyonel LED aydınlatma sistemi ile anahtar teslim halı saha yapımı.", icon: "⚽", color: "from-green-500 to-green-600" },
  { name: "Kapalı Halı Saha", slug: "kapali-hali-saha-yapimi", desc: "Branda veya sandwich panel kaplama ile 4 mevsim kullanılabilir kapalı halı saha yapımı. Isı ve ses yalıtımlı.", icon: "🏟️", color: "from-blue-500 to-blue-600" },
  { name: "Açık Halı Saha", slug: "acik-hali-saha-yapimi", desc: "Ekonomik ve hızlı çözüm. 20x40m, 25x45m, 30x50m ölçülerde açık halı saha yapımı.", icon: "🌿", color: "from-emerald-500 to-emerald-600" },
  { name: "Basketbol Sahası", slug: "basketbol-sahasi-yapimi", desc: "Akrilik zemin, TBF standartlarında pota sistemleri ile profesyonel basketbol sahası yapımı.", icon: "🏀", color: "from-orange-500 to-orange-600" },
  { name: "Tenis Kortu", slug: "tenis-kortu-yapimi", desc: "ITF standartlarında akrilik zemin, çelik direk ve profesyonel file sistemi ile tenis kortu yapımı.", icon: "🎾", color: "from-yellow-500 to-yellow-600" },
  { name: "Voleybol Sahası", slug: "voleybol-sahasi-yapimi", desc: "FIVB standartlarında zemin, teleskopik direk ve profesyonel file sistemi ile voleybol sahası yapımı.", icon: "🏐", color: "from-cyan-500 to-cyan-600" },
  { name: "Çok Amaçlı Saha", slug: "cok-amacli-saha-yapimi", desc: "Basketbol, voleybol ve tenis için tek saha'da çoklu spor imkanı sunan çok amaçlı saha yapımı.", icon: "🎯", color: "from-purple-500 to-purple-600" },
  { name: "Nizami Futbol Sahası", slug: "nizami-futbol-sahasi-yapimi", desc: "FIFA standartlarında 100x70m ölçülerde profesyonel tribün ve skorbord sistemi ile nizami futbol sahası.", icon: "🏆", color: "from-red-500 to-red-600" },
  { name: "Çelik Konstrüksiyon", slug: "celik-konstruksiyon", desc: "Kapalı saha, hangar ve depo yapımı için hafif çelik konstrüksiyon çözümleri.", icon: "🏗️", color: "from-gray-500 to-gray-600" },
  { name: "Akrilik Zemin", slug: "akrilik-zemin-kaplama", desc: "Kaymaz yüzey, UV dayanımlı, renk seçenekleri ile akrilik zemin kaplama uygulaması.", icon: "🎨", color: "from-pink-500 to-pink-600" },
  { name: "Halı Saha Branda", slug: "hali-saha-branda", desc: "650gr/m2 PVC branda kaplama ve tamiri. Su geçirmez, UV dayanımlı, alev almaz.", icon: "⛺", color: "from-indigo-500 to-indigo-600" },
  { name: "Suni Çim Kaplama", slug: "suni-cim-saha-kaplama", desc: "55mm sentetik suni çim, FIFA onaylı, 7 yıl garantili profesyonel saha kaplama.", icon: "🌱", color: "from-teal-500 to-teal-600" },
];

const allCitiesList = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce",
];

const reviews = [
  { name: "Mehmet Yılmaz", city: "İstanbul", district: "Kadıköy", rating: 5, text: "İstanbul'da halı saha yapımı projemizi çok profesyonel bir şekilde tamamladılar. 30 günlük sürede anahtar teslim aldık. MYK belgeli ekibin işçiliği gerçekten çok kaliteli." },
  { name: "Ahmet Kaya", city: "Ankara", district: "Çankaya", rating: 5, text: "Ankara'da kapalı halı saha yapımı yaptırdık. Branda kaplama mükemmel, içerideki ısı yalıtımı çok iyi. Kışın bile sorunsuz kullanıyoruz." },
  { name: "Fatma Demir", city: "İzmir", district: "Konak", rating: 5, text: "Eşimle birlikte İzmir'de açık halı saha projemizi İkber Spor'a emanet ettik. Çok hızlı ve temiz bir iş çıkardılar. 15 günde teslim ettiler." },
  { name: "Ali Şahin", city: "Antalya", district: "Muratpaşa", rating: 5, text: "Antalya'da basketbol sahası yapımı projemizde akrilik zemin çok kaliteli oldu. TBF standartlarında pota montajı yapan ender firmalardan biri." },
  { name: "Ayşe Çelik", city: "Bursa", district: "Nilüfer", rating: 5, text: "Okulumuz için Bursa'da tenis kortu yaptırdık. ITF standartlarında, çok profesyonel bir iş çıktı. Kesinlikle tavsiye ediyorum." },
  { name: "Mustafa Özdemir", city: "Adana", district: "Seyhan", rating: 5, text: "Adana'da voleybol sahası yapımı projemiz çok başarılı geçti. FIVB standartlarında zemin ve direk sistemi. Fiyat/performans olarak en iyisi." },
];

const faqData = [
  { q: "Halı saha yapım maliyeti 2026 yılı için ne kadar?", a: "Halı saha yapım maliyeti sahanın ölçülerine, kullanılacak malzemelere ve zemin durumuna göre değişmektedir. Genel olarak açık halı saha yapımı m² başına 350-750 TL arasındadır. Kapalı halı saha maliyeti ise 1000-1800 TL/m² arasındadır. Detaylı fiyat teklifi için ücretsiz keşif hizmetimizden yararlanabilirsiniz." },
  { q: "Kapalı halı saha yapımı için ruhsat gerekli mi?", a: "Evet, kapalı halı saha inşası için bağlı bulunduğunuz belediyeden yapı ruhsatı alınması şarttır. İkber Spor Yapıları olarak mimari, statik proje hazırlama ve ruhsat süreçlerinde yatırımcılarımıza tam danışmanlık sağlıyoruz." },
  { q: "Spor tesisinin yapım süresi ne kadardır?", a: "Hava ve zemin koşullarına bağlı olmakla birlikte, açık halı sahaların yapımı ortalama 15-30 gün, kapalı halı sahaların yapımı ise 30-60 gün sürmektedir." },
  { q: "Suni çim ömrü ne kadardır?", a: "55mm Ten Cate suni çim kullanım ömrü 7-10 yıldır. Düzenli bakım yapıldığında bu süre uzayabilir. Tüm suni çim ürünlerimizde 7 yıl garanti sunuyoruz." },
  { q: "Basketbol sahası için en uygun zemin kaplama nedir?", a: "Basketbol sahası için en uygun zemin akrilik kaplamadır. Kaymaz yüzeye sahiptir, top sekisi standartlara uygundur ve uzun ömürlüdür. TBF standartlarında profesyonel basketbol sahası yapımı hizmeti sunuyoruz." },
  { q: "Tenis kortu yapımı maliyeti nedir?", a: "Tenis kortu yapımı maliyeti zemin tipine göre değişir. Akrilik zemin tenis kortu m² başına 400-700 TL arasındadır. Komple bir tenis kortu (zemin, direk, file, çizgi) ortalama 80.000-200.000 TL arasındadır." },
  { q: "Çok amaçlı saha ne işe yarar?", a: "Çok amaçlı saha, basketbol, voleybol, tenis ve badminton gibi farklı spor dallarının aynı sahada oynanabilmesini sağlar. Ayarlanabilir direk sistemi ve esnek çizgi uygulaması ile bir sahada birden fazla spor yapılabilir." },
  { q: "Voleybol sahası standart ölçüleri nelerdir?", a: "Voleybol sahası standart ölçüleri: 18m x 9m oyun alanı, 3m serbest bölge, minimum 7m tavan yüksekliğidir. Plaj voleybolu için 16m x 8m ölçüler kullanılmaktadır." },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  // Seed data on first load if needed
  const seedMutation = trpc.seed.run.useMutation();
  const { data: cityCount } = trpc.city.getStats.useQuery();
  const { data: serviceList } = trpc.service.list.useQuery();
  const { data: cityList } = trpc.city.list.useQuery();

  useEffect(() => {
    if (cityCount !== undefined && cityCount.total === 0) {
      seedMutation.mutate();
    }
  }, [cityCount]);

  const displayedCities = cityList && cityList.length > 0 ? cityList : allCitiesList.map((name, i) => ({
    id: i + 1,
    name,
    slug: name.toLowerCase().replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c").replace(/İ/g, "i"),
    region: "Türkiye",
    population: 0,
  }));

  return (
    <>
      <MetaTags
        title="İkber Spor Yapıları | Halı Saha Yapımı | 81 İl Profesyonel Spor Sahası"
        description="Türkiye'nin her yerinde anahtar teslim halı saha, basketbol sahası, tenis kortu ve çok amaçlı spor sahaları yapımı. 30+ yıl tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme."
        keywords="halı saha yapımı, kapalı halı saha, açık halı saha, basketbol sahası, tenis kortu, voleybol sahası, çok amaçlı saha, spor sahası yapımı, suni çim, İkber Spor"
      />
      <LocalBusinessSchema />
      <FAQSchema faqs={faqData.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,222,128,0.15)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" /> 1992'den Beri Güvenle
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                Türkiye'nin Her Yerinde{" "}
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Profesyonel
                </span>{" "}
                Spor Sahası Yapımı
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                1992'den beri <strong className="text-gray-800">81 ilde</strong> anahtar teslim halı saha, basketbol sahası, tenis kortu ve çok amaçlı spor sahaları yapımı. MYK belgeli ekibimizle <strong className="text-gray-800">%100 müşteri memnuniyeti</strong>.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="tel:+905426125610"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Phone className="w-5 h-5" /> 0542 612 56 10
                </a>
                <a
                  href="https://wa.me/905426125610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                {[
                  { icon: <Clock className="w-6 h-6" />, label: "30+ Yıl", sub: "Deneyim" },
                  { icon: <Users className="w-6 h-6" />, label: "MYK", sub: "Belgeli Ekip" },
                  { icon: <Shield className="w-6 h-6" />, label: "TSE/CE", sub: "Sertifikalı" },
                  { icon: <Globe className="w-6 h-6" />, label: "81 İl", sub: "Hizmet Ağı" },
                ].map((b) => (
                  <div key={b.label} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="text-green-600">{b.icon}</div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">{b.label}</div>
                      <div className="text-xs text-gray-500">{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
              <div className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">⚽</div>
                  <h3 className="text-2xl font-bold">Halı Saha Yapımı</h3>
                  <p className="text-green-100 mt-2">FIFA Standartlarında</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "2000+", l: "Tamamlanan Proje" },
                    { v: "81", l: "İl" },
                    { v: "30+", l: "Yıllık Tecrübe" },
                    { v: "%100", l: "Memnuniyet" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                      <div className="text-xl font-bold">{s.v}</div>
                      <div className="text-xs text-green-100">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Müşteri</div>
                    <div className="text-sm font-bold">Memnuniyeti</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Anahtar</div>
                    <div className="text-sm font-bold">Teslim</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Spor Sahası Yapım <span className="text-green-600">Hizmetlerimiz</span>
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Anahtar teslim spor tesisleri yapımında Türkiye'nin lider firması
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(serviceList && serviceList.length > 0 ? serviceList : mainServices).map((svc: any) => (
              <Link
                key={svc.slug || svc.id}
                to={`/hizmet/${svc.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className={`h-28 bg-gradient-to-br ${svc.color || "from-green-500 to-green-600"} flex items-center justify-center text-4xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="relative z-10 text-3xl">{svc.icon || "⚽"}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {svc.shortDescription || svc.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-medium">
                    Detaylı Bilgi <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Tüm Hizmetleri Gör <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="py-20 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              <span className="text-green-600">81 İlde</span> Hizmetinizdeyiz
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-4">
              Türkiye'nin dört bir yanında profesyonel spor sahası yapım hizmeti
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3">
            {(displayedCities as any[]).map((city) => (
              <Link
                key={city.id}
                to={`/sehir/${city.slug}`}
                className="flex items-center justify-center px-3 py-2.5 bg-white border border-green-200 rounded-full text-sm font-medium text-green-700 hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                <MapPin className="w-3 h-3 mr-1 shrink-0" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Neden <span className="text-green-600">İkber Spor Yapıları?</span>
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: <Clock className="w-6 h-6" />, title: "30+ Yıllık Deneyim", desc: "1992'den beri sektörün öncüsü, binlerce başarılı proje." },
                { icon: <Users className="w-6 h-6" />, title: "MYK Belgeli Uzman Kadro", desc: "Tüm personel mesleki yeterlilik belgeli, işinde uzman." },
                { icon: <Shield className="w-6 h-6" />, title: "TSE ve CE Sertifikalı Ürünler", desc: "Kaliteli malzeme garantisi, uluslararası standartlar." },
                { icon: <Award className="w-6 h-6" />, title: "FIFA Standartlarında", desc: "Uluslararası standartlarda projeler, 7 yıl garanti." },
                { icon: <Zap className="w-6 h-6" />, title: "Anahtar Teslim Çözümler", desc: "Projeden teslime kadar tam hizmet, tek nokta çözüm." },
                { icon: <Globe className="w-6 h-6" />, title: "81 İl Servis Ağı", desc: "Türkiye'nin her yerinde hızlı ve güvenilir hizmet." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6">
                30 Yıllık Tecrübe, <br />
                <span className="text-green-200">Binlerce Mutlu Müşteri</span>
              </h3>
              <div className="space-y-4">
                {[
                  { v: "2000+", l: "Başarılı Proje" },
                  { v: "50,000+", l: "m2 Saha Kaplama" },
                  { v: "81", l: "İl Hizmet Ağı" },
                  { v: "%99", l: "Müşteri Memnuniyeti" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                    <span className="font-bold text-lg">{s.v}</span>
                    <span className="text-green-100 text-sm">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Müşterilerimiz <span className="text-green-600">Ne Diyor?</span>
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, visibleReviews).map((review, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  <Calendar className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed mb-5">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.name}</div>
                    <div className="text-xs text-green-600">
                      {review.district} / {review.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleReviews(reviews.length)}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-green-300 text-gray-600 hover:text-green-600 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Daha Fazla Yorum <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Sıkça <span className="text-green-600">Sorulan Sorular</span>
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-green-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Projenizi Hayata Geçirelim
          </h2>
          <p className="text-green-100 mb-10 max-w-xl mx-auto">
            Ücretsiz keşif ve fiyat teklifi için hemen bize ulaşın. 30 yıllık tecrübemizle yanınızdayız.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="tel:+905426125610"
              className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5" /> 0542 612 56 10
            </a>
            <a
              href="https://wa.me/905426125610"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition-all"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: <Phone className="w-6 h-6" />, label: "Telefon", value: "0542 612 56 10" },
              { icon: <Mail className="w-6 h-6" />, label: "E-posta", value: "ikberspor@ikberspor.com" },
              { icon: <Globe className="w-6 h-6" />, label: "Web", value: "www.ikberspor.com" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-green-300 mb-2 flex justify-center">{item.icon}</div>
                <div className="text-green-200 text-xs">{item.label}</div>
                <div className="text-white font-semibold text-sm mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
