import { useParams } from "react-router";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import { ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import {
  Phone, ChevronRight, Star, ChevronDown, ChevronUp,
  MessageCircle, CheckCircle2, Award, TrendingUp,
} from "lucide-react";
import { useState } from "react";

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

const staticFaqs = [
  { q: "Bu hizmetin yapım süresi ne kadardır?", a: "Yapım süresi projenin büyüklüğüne ve hava koşullarına göre değişmektedir. Genel olarak 15-45 gün arasında tamamlanmaktadır." },
  { q: "Garanti süresi ne kadar?", a: "Tüm projelerimizde 7 yıl yapısal garanti ve 2 yıl işçilik garantisi sunmaktayız." },
  { q: "Ödeme seçenekleri nelerdir?", a: "Nakit, kredi kartı ve banka havalesi ile ödeme imkanı sunuyoruz. Ayrıca bazı projelerde taksit imkanı da mevcuttur." },
  { q: "Keşif ücretli mi?", a: "Hayır, keşif hizmetimiz tamamen ücretsizdir. Yerinde değerlendirme sonrası detaylı teklif sunuyoruz." },
  { q: "Hangi malzemeleri kullanıyorsunuz?", a: "Tüm malzemelerimiz TSE ve CE sertifikalıdır. En kaliteli suni çim, akrilik zemin ve çelik konstrüksiyon malzemeleri kullanıyoruz." },
];

export default function ServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { data: service, isLoading: serviceLoading } = trpc.service.getBySlug.useQuery(
    { slug: serviceSlug || "" },
    { enabled: !!serviceSlug }
  );
  const { data: allCities } = trpc.city.list.useQuery();

  if (!serviceSlug) return null;

  // Loading durumunda spinner göster
  if (serviceLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  const svc = service;
  const serviceName = svc?.name || serviceSlug.replace(/-/g, " ");
  const citiesList = allCities || allCitiesList.map((name, i) => ({ id: i + 1, name, slug: name.toLowerCase().replace(/[ıİ]/g, "i").replace(/[ğ]/g, "g").replace(/[ü]/g, "u").replace(/[ş]/g, "s").replace(/[ö]/g, "o").replace(/[ç]/g, "c") }));

  const features = svc?.features || ["Profesyonel Ekip", "Kaliteli Malzeme", "7 Yıl Garanti", "Hızlı Kurulum"];

  return (
    <>
      <MetaTags
        title={`${serviceName} | İkber Spor Yapıları | 81 İl Hizmet`}
        description={`${serviceName} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. Anahtar teslim, ücretsiz keşif. Hemen arayın!`}
        keywords={`${serviceName}, spor sahası yapımı, halı saha, İkber Spor, anahtar teslim`}
      />
      <ServiceSchema serviceName={serviceName} />
      <FAQSchema faqs={staticFaqs.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/hizmetler" className="hover:text-white transition-colors">Hizmetler</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{serviceName}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {serviceName}
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            {svc?.shortDescription || `${serviceName} konusunda 30 yıllık tecrübemizle Türkiye'nin dört bir yanında profesyonel hizmet sunuyoruz.`}
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

      {/* Features & Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {serviceName} Hakkında
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {svc?.longDescription || `${serviceName} konusunda İkber Spor Yapıları olarak 1992 yılından bu yana Türkiye'nin 81 ilinde hizmet vermekteyiz. MYK belgeli uzman kadromuz, TSE ve CE sertifikalı ürünlerimizle en yüksek kalitede hizmet sunuyoruz.`}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {(features as string[]).map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>

              {svc?.priceRangeMin && svc?.priceRangeMax && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-bold text-gray-900">Fiyat Aralığı</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    m² başına <span className="font-bold text-orange-600">{svc.priceRangeMin} - {svc.priceRangeMax} TL</span> arasındadır.
                    Net fiyat için ücretsiz keşif hizmetimizden yararlanabilirsiniz.
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Neden Biz?</h3>
                <ul className="space-y-3">
                  {[
                    { icon: <Award className="w-5 h-5" />, text: "30+ Yıllık Tecrübe" },
                    { icon: <CheckCircle2 className="w-5 h-5" />, text: "MYK Belgeli Ekip" },
                    { icon: <Star className="w-5 h-5" />, text: "TSE/CE Sertifikalı" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "7 Yıl Garanti" },
                    { icon: <Phone className="w-5 h-5" />, text: "7/24 Destek" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="text-green-600">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:+905426125610"
                  className="mt-6 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Hemen Arayın
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 bg-green-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
            {serviceName} Hizmet Verdiğimiz Şehirler
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {citiesList.slice(0, 81).map((city: any) => (
              <Link
                key={city.id}
                to={`/sehir/${city.slug}/${serviceSlug}`}
                className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-500 hover:text-white transition-all"
              >
                {city.name} {serviceName.split(" ").slice(0, 2).join(" ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {serviceName} - Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-3">
            {staticFaqs.map((faq, i) => (
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {serviceName} İçin Hemen Teklif Alın
          </h2>
          <p className="text-green-100 mb-8">
            Ücretsiz keşif ve detaylı fiyat teklifi için bizi arayın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+905426125610" className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all">
              <Phone className="w-5 h-5" /> 0542 612 56 10
            </a>
            <a href="https://wa.me/905426125610" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-400 transition-all">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
