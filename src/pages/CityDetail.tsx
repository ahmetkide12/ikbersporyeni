import { useParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  MapPin, Phone, Globe, ArrowLeft, Star, ChevronRight,
  Award, Shield, Clock,
  Building,
} from "lucide-react";
import MetaTags from "@/components/seo/MetaTags";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { OrganizationSchema, LocalBusinessSchema, ServiceSchema } from "@/components/seo/SchemaMarkup";
import Breadcrumb from "@/components/seo/Breadcrumb";
import AIOoverview from "@/components/seo/AIOoverview";
import AuthorBox from "@/components/seo/AuthorBox";
import TechnicalSpecs from "@/components/seo/TechnicalSpecs";
import PriceTable from "@/components/seo/PriceTable";
import DistrictContent from "@/components/seo/DistrictContent";
import FAQAccordion from "@/components/seo/FAQAccordion";
import ReviewSlider from "@/components/seo/ReviewSlider";

const staticServices = [
  { id: 1, name: "Halı Saha Yapımı", slug: "hali-saha-yapimi", shortDescription: "Profesyonel halı saha yapımı. FIFA standartlarında 55mm suni çim, çelik konstrüksiyon, LED aydınlatma." },
  { id: 2, name: "Kapalı Halı Saha Yapımı", slug: "kapali-hali-saha-yapimi", shortDescription: "Branda veya sandwich panel kapalı halı saha yapımı. 4 mevsim kullanım imkanı." },
  { id: 3, name: "Açık Halı Saha Yapımı", slug: "acik-hali-saha-yapimi", shortDescription: "Açık halı saha yapımı. Ekonomik ve hızlı çözüm. 20x40m, 25x45m, 30x50m ölçüler." },
  { id: 4, name: "Basketbol Sahası Yapımı", slug: "basketbol-sahasi-yapimi", shortDescription: "Profesyonel basketbol sahası yapımı. Akrilik zemin, TBF standartlarında pota sistemleri." },
  { id: 5, name: "Tenis Kortu Yapımı", slug: "tenis-kortu-yapimi", shortDescription: "Akrilik ve çim tenis kortu yapımı. ITF standartlarında, profesyonel zemin kaplama." },
  { id: 6, name: "Voleybol Sahası Yapımı", slug: "voleybol-sahasi-yapimi", shortDescription: "Profesyonel voleybol sahası yapımı. FIVB standartlarında zemin ve direk sistemleri." },
  { id: 7, name: "Çok Amaçlı Saha Yapımı", slug: "cok-amacli-saha-yapimi", shortDescription: "Basketbol, voleybol ve tenis için çok amaçlı spor sahası yapımı." },
  { id: 8, name: "Nizami Futbol Sahası Yapımı", slug: "nizami-futbol-sahasi-yapimi", shortDescription: "Nizami futbol sahası ve tribün yapımı. FIFA standartlarında, 100x70m ölçüler." },
  { id: 9, name: "Çelik Konstrüksiyon", slug: "celik-konstruksiyon", shortDescription: "Kapalı saha, hangar ve depo çelik konstrüksiyon yapımı. Dayanıklı ve ekonomik." },
  { id: 10, name: "Akrilik Zemin Kaplama", slug: "akrilik-zemin-kaplama", shortDescription: "Akrilik zemin kaplama uygulaması. Basketbol, tenis ve voleybol sahaları için ideal." },
  { id: 11, name: "Halı Saha Branda", slug: "hali-saha-branda", shortDescription: "Halı saha branda kaplama ve tamiri. 650gr/m2 PVC branda, UV dayanımlı." },
  { id: 12, name: "Suni Çim Saha Kaplama", slug: "suni-cim-saha-kaplama", shortDescription: "55mm sentetik suni çim saha kaplama. FIFA onaylı, 7 yıl garanti." },
  { id: 13, name: "Halı Saha Halısı Satışı", slug: "hali-saha-halisi", shortDescription: "55mm suni çim halı saha halısı satışı. Ten Cate, FIFA standartlarında." },
  { id: 14, name: "55mm Sentetik Suni Çim Fiyatı", slug: "55mm-suni-cim-fiyati", shortDescription: "55mm sentetik suni çim m2 fiyatları. En kaliteli ürünler, uygun fiyatlar." },
  { id: 15, name: "Suni Çim Satan Firmalar", slug: "suni-cim-satan-firmalar", shortDescription: "Suni çim satan firmalar arasında en kaliteli ürünleri en uygun fiyata sunuyoruz." },
  { id: 16, name: "Yapay Çim Satan Yerler", slug: "yapay-cim-satan-yerler", shortDescription: "Yapay çim satan yerler arasında en kaliteli ürün ve hizmet garantisi." },
  { id: 17, name: "Halı Saha Yapım Maliyeti", slug: "hali-saha-maliyeti", shortDescription: "2026 güncel halı saha yapım maliyeti. m2 başına fiyatlar ve maliyet hesaplama." },
  { id: 18, name: "Açık Halı Saha Maliyeti", slug: "acik-hali-saha-maliyeti", shortDescription: "Açık halı saha yapım maliyeti. Ölçüye göre detaylı fiyatlandırma." },
  { id: 19, name: "Kapalı Halı Saha Maliyeti", slug: "kapali-hali-saha-maliyeti", shortDescription: "Kapalı halı saha yapım maliyeti. Branda ve sandwich panel seçenekleri." },
  { id: 20, name: "Halı Saha Yapan Firmalar", slug: "hali-saha-yapan-firmalar", shortDescription: "Halı saha yapan firmalar arasında 30 yıllık tecrübemizle öne çıkıyoruz." },
  { id: 21, name: "Kapalı Halı Saha Yapan Firmalar", slug: "kapali-hali-saha-yapan-firmalar", shortDescription: "Kapalı halı saha yapan firmalar arasında lider konumdayız." },
  { id: 22, name: "Açık Halı Saha Yapan Firmalar", slug: "acik-hali-saha-yapan-firmalar", shortDescription: "Açık halı saha yapan firmalar arasında en kaliteli hizmeti sunuyoruz." },
  { id: 23, name: "Çok Amaçlı Saha Yapan Firmalar", slug: "cok-amacli-saha-yapan-firmalar", shortDescription: "Çok amaçlı saha yapan firmalar arasında profesyonel çözümler." },
  { id: 24, name: "Voleybol Sahası Yapan Firmalar", slug: "voleybol-sahasi-yapan-firmalar", shortDescription: "Voleybol sahası yapan firmalar arasında FIVB standartlarında hizmet." },
  { id: 25, name: "Tenis Kortu Yapan Firmalar", slug: "tenis-kortu-yapan-firmalar", shortDescription: "Tenis kortu yapan firmalar arasında ITF standartlarında kalite." },
  { id: 26, name: "Balon Saha Yapan Firmalar", slug: "balon-saha-yapan-firmalar", shortDescription: "Balon saha yapan firmalar arasında hızlı ve ekonomik çözümler." },
  { id: 27, name: "Nizami Saha Yapan Firmalar", slug: "nizami-saha-yapan-firmalar", shortDescription: "Nizami futbol sahası yapan firmalar arasında FIFA standartlarında hizmet." },
  { id: 28, name: "Halı Saha Granül Satan Firmalar", slug: "hali-saha-granul-satan-firmalar", shortDescription: "SBR ve EPDM granül satışı. Halı saha zemin dolgu malzemesi." },
  { id: 29, name: "Granül Satan Firmalar", slug: "granul-satan-firmalar", shortDescription: "EPDM ve SBR kauçuk granül satan firmalar. Spor sahaları için ideal." },
  { id: 30, name: "Halı Saha Tavan Filesi", slug: "hali-saha-tavan-filesi", shortDescription: "Halı saha tavan filesi m2 fiyatları. Paraşüt ipi, UV dayanımlı." },
  { id: 31, name: "Halı Saha Filesi Satan Firmalar", slug: "hali-saha-filesi-satan-firmalar", shortDescription: "Halı saha filesi satan firmalar. Tavan, yan ve kale filesi." },
  { id: 32, name: "Halı Saha Tamiri", slug: "hali-saha-tamiri", shortDescription: "Halı saha tamiri ve bakım hizmetleri. Zemin düzeltme, çim yenileme." },
  { id: 33, name: "Halı Saha Branda Tamiri", slug: "hali-saha-branda-tamiri", shortDescription: "Halı saha branda tamiri ve değişimi. Yırtık tespiti ve onarım." },
  { id: 34, name: "Suni Çim Tamiri", slug: "suni-cim-tamiri", shortDescription: "Suni çim tamiri ve yenileme hizmetleri. Yıpranmış çim değişimi." },
  { id: 35, name: "Halı Saha Tel Örgü", slug: "hali-saha-tel-orgu", shortDescription: "Halı saha tel örgü satan firmalar. Galvanizli PVC kaplı tel örgü." },
  { id: 36, name: "Pota Satan Firmalar", slug: "pota-satan-firmalar", shortDescription: "Basketbol potası satan firmalar. TBF onaylı, paslanmaz çelik." },
  { id: 37, name: "Tartan Zemin Kaplama", slug: "tartan-zemin-kaplama", shortDescription: "Tartan zemin kaplama yapan firmalar. EPDM kaplamalı spor zeminleri." },
  { id: 38, name: "Padel Kortu Yapımı", slug: "padel-kortu-yapimi", shortDescription: "Padel kortu yapımı. Cam duvar sistemli, profesyonel padel sahaları." },
  { id: 39, name: "Atletizm Pisti Yapımı", slug: "atletizm-pisti-yapimi", shortDescription: "Atletizm pisti yapımı. IAAF standartlarında, tartan zemin." },
  { id: 40, name: "Havuz Yapımı", slug: "havuz-yapimi", shortDescription: "Olimpik yüzme havuzu yapımı. Betonarme ve prefabrik seçenekler." },
  { id: 41, name: "Hibrit Çim Saha Yapımı", slug: "hibrit-cim-saha-yapimi", shortDescription: "Hibrit çim saha yapımı. Doğal çim + suni çim karışımı. FIFA standartlarında." },
  { id: 42, name: "Yedek Kulübesi", slug: "yedek-kulubesi", shortDescription: "Spor sahası yedek kulübesi. Polikarbonat ve akrilik malzeme." },
  { id: 43, name: "Spor Zemin Kaplama", slug: "spor-zemin-kaplama", shortDescription: "Profesyonel spor zemin kaplama hizmetleri. Her türlü spor için." },
  { id: 44, name: "Basketbol Potaları", slug: "basketbol-potalari", shortDescription: "Profesyonel basketbol potası. TBF onaylı, paslanmaz çelik." },
  { id: 45, name: "Voleybol ve Tenis Direkleri", slug: "voleybol-tenis-direkleri", shortDescription: "Voleybol ve tenis direkleri. Çelik direk, profesyonel file sistemi." },
  { id: 46, name: "Futbol Kaleleri", slug: "futbol-kaleleri", shortDescription: "Futbol kalesi ve filesi. Profesyonel standartlarda." },
  { id: 47, name: "Tribün Koltukları", slug: "tribun-koltuklari", shortDescription: "Plastik tribün koltuğu. Dayanıklı, ergonomik, renk seçenekleri." },
  { id: 48, name: "Halı Saha Skorbord", slug: "hali-saha-skorbord", shortDescription: "Halı saha elektronik skorbord. LED ekran, kumandalı." },
  { id: 49, name: "Halı Saha Aydınlatma", slug: "hali-saha-aydinlatma", shortDescription: "Halı saha LED aydınlatma sistemi. 200W projektör, homojen ışık." },
  { id: 50, name: "Prefabrik Konteyner", slug: "prefabrik-konteyner", shortDescription: "Prefabrik konteyner ve çelik ev yapımı. Hızlı kurulum, ekonomik." },
];

export default function CityDetail() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { data: city, isLoading: cityLoading } = trpc.city.getBySlug.useQuery(
    { slug: citySlug || "" },
    { enabled: !!citySlug }
  );
  const { data: allServices, isLoading: servicesLoading } = trpc.service.list.useQuery();
  const { data: cityReviews } = trpc.review.getByCity.useQuery(
    { cityId: city?.id || 0 },
    { enabled: !!city?.id }
  );
  const { data: cityFaqs } = trpc.faq.getByCity.useQuery(
    { cityId: city?.id || 0 },
    { enabled: !!city?.id }
  );

  if (!citySlug) return null;

  if (cityLoading || servicesLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  const cityName = city?.name || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  const servicesList = (allServices && allServices.length > 0) ? allServices : staticServices;
  const reviews = cityReviews && cityReviews.length > 0 ? cityReviews : [];
  const faqs = cityFaqs && cityFaqs.length > 0 ? cityFaqs : [];
  const districts = (city?.districts as string[] | null) || [];

  const rating = reviews.length > 0
    ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  const pageTitle = `${cityName} Halı Saha ve Spor Sahası Yapımı | İkber Spor 2026`;
  const pageDescription = `${cityName} ve ilçelerinde halı saha, basketbol sahası, tenis kortu, voleybol sahası yapımı. 30 yıllık tecrübe, MYK belgeli ekip, 7 yıl garanti. Ücretsiz keşif: 0542 612 56 10`;
  const canonicalUrl = `https://ikberspor.com/sehir/${citySlug}`;

  // FAQ for schema
  const schemaFaqs = faqs.slice(0, 15).map((f: any) => ({
    question: f.question,
    answer: f.answer,
  }));

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Şehirler", url: "/sehirler" },
    { name: cityName, url: `/sehir/${citySlug}` },
  ];

  // Nearby cities for internal linking
  const nearbyCities: Record<string, string[]> = {
    istanbul: ["kocaeli", "bursa", "edirne", "kirklareli", "canakkale", "sakarya", "tekirdag"],
    kocaeli: ["istanbul", "sakarya", "bursa", "bolu", "ankara"],
    bursa: ["istanbul", "kocaeli", "balikesir", "canakkale", "izmir"],
    edirne: ["kirklareli", "istanbul", "canakkale", "tekirdag"],
    kirklareli: ["edirne", "istanbul", "tekirdag", "canakkale"],
    canakkale: ["edirne", "kirklareli", "balikesir", "bursa", "izmir"],
    adana: ["mersin", "osmaniye", "hatay", "gaziantep", "kahramanmaras"],
    ankara: ["konya", "eskisehir", "bolu", "kayseri", "kirsehir"],
    izmir: ["aydin", "manisa", "balikesir", "mugla", "denizli"],
    antalya: ["mersin", "adana", "mugla", "burdur", "konya"],
    gaziantep: ["adana", "kahramanmaras", "sanliurfa", "hatay", "osmaniye"],
    default: ["istanbul", "ankara", "izmir", "antalya", "bursa", "adana"],
  };
  const nearby = nearbyCities[citySlug || ""] || nearbyCities.default;

  // Nearby city names mapping
  const nearbyCityNames: Record<string, string> = {
    istanbul: "İstanbul", kocaeli: "Kocaeli", bursa: "Bursa", edirne: "Edirne",
    kirklareli: "Kırklareli", canakkale: "Çanakkale", sakarya: "Sakarya",
    tekirdag: "Tekirdağ", balikesir: "Balıkesir", izmir: "İzmir", bolu: "Bolu",
    ankara: "Ankara", mersin: "Mersin", osmaniye: "Osmaniye", hatay: "Hatay",
    kahramanmaras: "Kahramanmaraş", konya: "Konya", eskisehir: "Eskişehir",
    kayseri: "Kayseri", kirsehir: "Kırşehir", aydin: "Aydın", manisa: "Manisa",
    mugla: "Muğla", denizli: "Denizli", burdur: "Burdur", sanliurfa: "Şanlıurfa",
    adana: "Adana", antalya: "Antalya",
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      <MetaTags title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <OrganizationSchema />
      <LocalBusinessSchema cityName={cityName} />
      <ServiceSchema serviceName={`${cityName} Spor Sahası Yapımı`} cityName={cityName} />
      {schemaFaqs.length > 0 && (
        <SchemaMarkup type="FAQPage" data={{ mainEntity: schemaFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })) }} />
      )}
      <SchemaMarkup type="BreadcrumbList" data={{
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ikberspor.com/" },
          { "@type": "ListItem", position: 2, name: "Şehirler", item: "https://ikberspor.com/sehirler" },
          { "@type": "ListItem", position: 3, name: cityName, item: canonicalUrl },
        ],
      }} />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-green-700 to-green-800 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <Link to="/sehirler" className="inline-flex items-center gap-2 text-green-100 mb-6 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Tüm Şehirler
          </Link>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">
            {cityName} Spor Sahası Yapımı
          </h1>
          <p className="text-green-100 text-lg lg:text-xl max-w-2xl mb-6 leading-relaxed">
            {cityName} ve tüm ilçelerinde halı saha, basketbol sahası, tenis kortu, 
            voleybol sahası ve çok amaçlı spor sahası yapımı. 
            <strong className="text-white"> 30 yıllık tecrübe</strong>, MYK belgeli ekip.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" /> {rating}/5 ({reviews.length || 15}+ yorum)
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Award className="w-4 h-4" /> 7 Yıl Garanti
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Shield className="w-4 h-4" /> MYK / TSE / CE
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4" /> 15-30 Gün Teslim
            </span>
          </div>
        </div>
      </section>

      {/* ─── AI OVERVIEW (3 Kolon) ─── */}
      <AIOoverview cityName={cityName} serviceName="Spor Sahası" />

      {/* ─── E-E-A-T AUTHOR BOX ─── */}
      <AuthorBox cityName={cityName} serviceName="Spor Sahası Yapımı" />

      {/* ─── SERVICES (50+) ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <Building className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {cityName}'de Sunduğumuz Hizmetler ({servicesList.length}+)
            </h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            {cityName} ve tüm ilçelerinde profesyonel spor sahası yapım hizmetleri. 
            Her türlü spor sahası için anahtar teslim çözümler. 
            Hizmete tıklayarak detaylı bilgi alabilirsiniz.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesList.map((svc: any) => (
              <Link
                key={svc.id}
                to={`/sehir/${citySlug}/${svc.slug}`}
                className="group bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition-all flex items-start gap-3"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <ChevronRight className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors text-sm">
                    {cityName} {svc.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {svc.shortDescription || svc.description || `${cityName} bölgesinde ${svc.name} hizmeti.`}
                  </p>
                  <span className="text-xs text-green-600 font-medium mt-1.5 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detaylı Bilgi <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNICAL SPECS ─── */}
      <TechnicalSpecs cityName={cityName} />

      {/* ─── PRICE TABLE ─── */}
      <PriceTable cityName={cityName} />

      {/* ─── DISTRICT CONTENT ─── */}
      {districts.length > 0 && (
        <DistrictContent cityName={cityName} districts={districts} />
      )}

      {/* ─── FAQ ACCORDION (15) ─── */}
      <FAQAccordion cityName={cityName} />

      {/* ─── REVIEW SLIDER (15) ─── */}
      <ReviewSlider cityName={cityName} />

      {/* ─── NEARBY CITIES (İç Link Grid) ─── */}
      <section className="py-12 bg-white" aria-label="Yakın Şehirler">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-green-600" />
            {cityName} Yakınındaki Şehirlerde Spor Sahası Yapımı
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            {cityName} civarındaki illerde de profesyonel spor sahası yapım hizmeti sunuyoruz. 
            Tüm bu şehirlerde ücretsiz keşif ve fiyat teklifi imkanı mevcuttur.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearby.map((slug) => (
              <Link
                key={slug}
                to={`/sehir/${slug}`}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition-all flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 text-sm">
                    {nearbyCityNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)} Spor Sahası
                  </h3>
                  <span className="text-xs text-gray-500">Halı Saha · Basketbol · Tenis</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {cityName}'de Spor Sahası Projeleriniz İçin Hemen Arayın
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz keşif ve fiyat teklifi için 7/24 WhatsApp ve telefon hattımızdan bize ulaşabilirsiniz. 
            {cityName}'deki projeleriniz için özel çözümler sunuyoruz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+905426125610"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5" /> 0542 612 56 10
            </a>
            <a
              href="https://wa.me/905426125610"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition-all"
            >
              <Globe className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER SEO TEXT ─── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {cityName} Spor Sahası Yapımı — Detaylı Bilgi
          </h2>
          <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
            <p>
              <strong className="text-gray-900">{cityName} halı saha yapımı</strong> konusunda 1992 yılından 
              beri hizmet veren İkber Spor Yapıları, {cityName} ve ilçelerinde profesyonel spor sahası 
              yapımında lider konumdadır. <strong>MYK belgeli ustalarımız</strong>, TSE ve CE sertifikalı 
              malzemelerimiz ile anahtar teslim spor sahası projeleri üretmektedir.
            </p>
            <p>
              <strong className="text-gray-900">{cityName} basketbol sahası yapımı</strong> ve 
              <strong> {cityName} tenis kortu yapımı</strong> projelerimizde akrilik zemin kaplama, 
              ITF Classified onaylı malzeme ve profesyonel pota/direk sistemleri kullanmaktayız. 
              Tüm projelerimizde <strong>7 yıl yapısal garanti</strong> ve ömür boyu teknik destek sunmaktayız.
            </p>
            <p>
              {cityName} bölgesindeki projelerimizde kullandığımız <strong>standart betonarme temel</strong>; 
              50cm × 50cm kare kesitli, Ø12mm B500C donatılı, C30/37 beton sınıfında ve paslanmaz çelik 
              ankraj sistemi ile inşa edilmektedir. Çift kat drenaj, nem dayanımlı FIFA çim sistemi ve 
              200W LED aydınlatma ile profesyonel standartlarda sahalar teslim ediyoruz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
