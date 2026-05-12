import { useParams } from "react-router";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import { LocalBusinessSchema, ServiceSchema, FAQSchema } from "@/components/seo/SchemaMarkup";
import {
  Phone, ChevronRight, ChevronDown, ChevronUp,
  MessageCircle, Award, TrendingUp, Clock,
  Shield, Users, Zap,
} from "lucide-react";
import { useState } from "react";

const staticFaqs = [
  (city: string, service: string) => ({ q: `${city} ${service} yapım maliyeti ne kadar?`, a: `${city} bölgesinde ${service} yapım maliyeti projenin ölçülerine ve zemin koşullarına göre değişmektedir. Ücretsiz keşif ile net fiyat alabilirsiniz.` }),
  (city: string, service: string) => ({ q: `${city} ${service} yapım süresi ne kadardır?`, a: `${city} şartlarında ${service} projeleri ortalama 15-45 gün içinde tamamlanmaktadır.` }),
  (city: string, service: string) => ({ q: `${city} ${service} için ruhsat gerekli mi?`, a: `Evet, bazı projeler için belediye ruhsatı gerekebilir. ${city} belediyesinden detaylı bilgi alabilir veya bizden danışmanlık hizmeti alabilirsiniz.` }),
  (city: string) => ({ q: `${city} için ücretsiz keşif yapıyor musunuz?`, a: `Evet, ${city} ve çevresinde ücretsiz keşif hizmeti sunuyoruz. Yerinde değerlendirme sonrası detaylı teklif hazırlıyoruz.` }),
  (city: string) => ({ q: `${city} bölgesinde referans projeniz var mı?`, a: `Evet, ${city} ve çevre ilçelerinde birçok başarılı projemiz bulunmaktadır. İsterseniz referanslarımızı paylaşabiliriz.` }),
];

export default function ComboPage() {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { data: comboData } = trpc.page.generateSeoContent.useQuery(
    { citySlug: citySlug || "", serviceSlug: serviceSlug || "" },
    { enabled: !!citySlug && !!serviceSlug }
  );

  const cityName = comboData?.city?.name || (citySlug ? citySlug.charAt(0).toUpperCase() + citySlug.slice(1) : "");
  const serviceName = comboData?.service?.name || (serviceSlug ? serviceSlug.replace(/-/g, " ") : "");
  const faqs = staticFaqs.map((fn) => fn(cityName, serviceName));

  return (
    <>
      <MetaTags
        title={`${cityName} ${serviceName} | İkber Spor Yapıları | 0542 612 56 10`}
        description={`${cityName} ${serviceName} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. ${cityName} ve tüm ilçelerinde anahtar teslim hizmet. Ücretsiz keşif!`}
        keywords={`${cityName} ${serviceName}, ${cityName} ${serviceSlug}, ${serviceName} ${cityName}, spor sahası yapımı ${cityName}`}
      />
      <LocalBusinessSchema cityName={cityName} />
      <ServiceSchema serviceName={serviceName} cityName={cityName} />
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/sehir/${citySlug}`} className="hover:text-white transition-colors">{cityName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{serviceName}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {cityName} {serviceName}
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            {cityName} ve tüm ilçelerinde {serviceName.toLowerCase()} hizmeti. 
            30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme ile anahtar teslim çözümler.
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

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {cityName} {serviceName}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {comboData?.content || `${cityName} ${serviceName} konusunda İkber Spor Yapıları olarak 30 yılı aşkın tecrübemizle hizmet vermekteyiz. ${cityName} ve tüm ilçelerinde profesyonel ekiplerimizle anahtar teslim ${serviceName.toLowerCase()} projeleri gerçekleştiriyoruz.`}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Neden {cityName}'de Bizi Tercih Etmelisiniz?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: <Award className="w-5 h-5" />, text: "30+ Yıllık Tecrübe" },
                    { icon: <Users className="w-5 h-5" />, text: "MYK Belgeli Ekip" },
                    { icon: <Shield className="w-5 h-5" />, text: "TSE/CE Sertifikalı Malzeme" },
                    { icon: <Zap className="w-5 h-5" />, text: "Anahtar Teslim Hizmet" },
                    { icon: <Clock className="w-5 h-5" />, text: "Zamanında Teslim" },
                    { icon: <TrendingUp className="w-5 h-5" />, text: "7 Yıl Garanti" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                      <span className="text-green-600">{item.icon}</span>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {comboData?.service?.priceRangeMin && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" /> {cityName} {serviceName} Fiyatları
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cityName} bölgesinde {serviceName.toLowerCase()} m² başına
                    {" "}<span className="font-bold text-orange-600">{comboData.service.priceRangeMin} - {comboData.service.priceRangeMax} TL</span> arasındadır.
                    Net fiyat için ücretsiz keşif hizmetimizden yararlanabilirsiniz.
                  </p>
                </div>
              )}

              {/* Steps */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Çalışma Sürecimiz</h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  {[
                    { step: "1", title: "Keşif", desc: "Ücretsiz yerinde keşif" },
                    { step: "2", title: "Teklif", desc: "Detaylı fiyat teklifi" },
                    { step: "3", title: "Üretim", desc: "Profesyonel yapım süreci" },
                    { step: "4", title: "Teslim", desc: "Anahtar teslim" },
                  ].map((s) => (
                    <div key={s.step} className="text-center">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                        {s.step}
                      </div>
                      <div className="font-semibold text-sm text-gray-900">{s.title}</div>
                      <div className="text-xs text-gray-500">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">İletişim Bilgileri</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-green-600 shrink-0" />
                    <a href="tel:+905426125610" className="hover:text-green-600">0542 612 56 10</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-green-600 shrink-0" />
                    <span>Hafta içi 08:00 - 18:00</span>
                  </li>
                </ul>
                <a href="tel:+905426125610" className="mt-4 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
                  <Phone className="w-4 h-4" /> Hemen Arayın
                </a>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">%100 Memnuniyet Garantisi</h3>
                <p className="text-green-100 text-sm">
                  Tüm projelerimizde müşteri memnuniyeti önceliğimizdir. 
                  Kaliteli malzeme ve profesyonel işçilik garantisi sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {cityName} {serviceName} - SSS
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
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
            {cityName} {serviceName} İçin Teklif Alın
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            {cityName} bölgesinde {serviceName.toLowerCase()} hizmeti almak için bizi arayın. Ücretsiz keşif ve fiyat teklifi.
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
            {cityName} Merkez | İkber Spor Yapıları | Tel: 0542 612 56 10
          </div>
        </div>
      </section>
    </>
  );
}
