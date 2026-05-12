import { useParams } from "react-router";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import { LocalBusinessSchema, ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import {
  Phone, MapPin, Users, ChevronRight, Star, ChevronDown, ChevronUp,
  MessageCircle, Award, Clock, Shield,
} from "lucide-react";
import { useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

export default function CityDetail() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  // Loading durumunda spinner göster
  if (cityLoading || servicesLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  // Statik hizmet fallback'i (DB boşsa bile tüm hizmetleri göster)
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

  const cityName = city?.name || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  const servicesList = (allServices && allServices.length > 0) ? allServices : staticServices;
  const reviews = cityReviews && cityReviews.length > 0 ? cityReviews : [];
  const faqs = cityFaqs && cityFaqs.length > 0 ? cityFaqs : [];

  return (
    <>
      <MetaTags
        title={`${cityName} Halı Saha Yapımı | İkber Spor Yapıları | 0542 612 56 10`}
        description={`${cityName} ve tüm ilçelerinde halı saha, kapalı halı saha, basketbol sahası, tenis kortu yapımı. 30 yıllık tecrübe, MYK belgeli ekip. Ücretsiz keşif!`}
        keywords={`${cityName} halı saha yapımı, ${cityName} kapalı halı saha, ${cityName} basketbol sahası, ${cityName} tenis kortu, ${cityName} voleybol sahası, ${cityName} spor sahası yapımı`}
      />
      <LocalBusinessSchema cityName={cityName} />
      <ServiceSchema serviceName="Spor Sahası Yapımı" cityName={cityName} />
      {faqs.length > 0 && (
        <FAQSchema faqs={faqs.slice(0, 10).map((f) => ({ question: f.question, answer: f.answer }))} />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/sehirler" className="hover:text-white transition-colors">Şehirler</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{cityName}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {cityName} Spor Sahası Yapımı
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            {cityName} ve tüm ilçelerinde profesyonel spor sahası yapım hizmetleri. 
            Halı saha, basketbol, tenis, voleybol ve çok amaçlı saha yapımında 30+ yıllık tecrübe.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="tel:+905426125610" className="inline-flex items-center gap-2 bg-white text-green-800 px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all">
              <Phone className="w-4 h-4" /> 0542 612 56 10
            </a>
            <a href="https://wa.me/905426125610" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-400 transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Nüfus", value: city?.population ? city.population.toLocaleString("tr-TR") : "Bilinmiyor" },
              { icon: <MapPin className="w-5 h-5" />, label: "Bölge", value: city?.region || "Türkiye" },
              { icon: <Award className="w-5 h-5" />, label: "İlçe Sayısı", value: `${(city?.districts as string[] | null)?.length || 0}` },
              { icon: <Clock className="w-5 h-5" />, label: "Alan Kodu", value: city?.areaCode || "-" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <div className="text-green-600">{s.icon}</div>
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="font-bold text-gray-800 text-sm">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in City */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            {cityName} Hizmetlerimiz
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicesList.map((svc) => (
              <Link
                key={svc.id}
                to={`/sehir/${citySlug}/${svc.slug}`}
                className="group flex items-center gap-4 bg-gray-50 hover:bg-green-50 rounded-xl px-5 py-4 transition-all border border-gray-100 hover:border-green-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors text-sm">
                    {cityName} {svc.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{svc.shortDescription}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Districts */}
      {city?.districts && (city.districts as string[]).length > 0 && (
        <section className="py-16 bg-green-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              {cityName} İlçelerinde Hizmet Veriyoruz
            </h2>
            <div className="flex flex-wrap gap-2">
              {(city.districts as string[]).map((d) => (
                <Link
                  key={d}
                  to={`/sehir/${citySlug}`}
                  className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-500 hover:text-white transition-all"
                >
                  {d}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              {cityName} Müşteri Yorumları
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 9).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <StarRating rating={review.rating} />
                  <p className="text-gray-600 text-sm mt-3 italic leading-relaxed">
                    "{review.reviewText}"
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                    <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{review.customerName}</div>
                      <div className="text-xs text-green-600">{review.district} / {review.customerLocation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              {cityName} Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-3">
              {faqs.slice(0, 10).map((faq, i) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {cityName} için Hemen Teklif Alın
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            {cityName} ve çevresinde profesyonel spor sahası yapımı için bizi arayın. Ücretsiz keşif ve fiyat teklifi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+905426125610" className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all">
              <Phone className="w-5 h-5" /> 0542 612 56 10
            </a>
            <a href="https://wa.me/905426125610" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-400 transition-all">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
          <div className="mt-6 text-green-200 text-sm">
            {cityName} Merkez | Tel: 0542 612 56 10 | ikberspor@ikberspor.com
          </div>
        </div>
      </section>
    </>
  );
}
