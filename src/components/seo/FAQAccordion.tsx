import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQSchema } from "./SchemaMarkup";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  cityName: string;
  serviceName?: string;
  additionalFaqs?: FAQItem[];
}

export default function FAQAccordion({ cityName, serviceName = "spor sahası", additionalFaqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: FAQItem[] = [
    {
      question: `${cityName}'de ${serviceName} yapımı ne kadar sürer?`,
      answer: `${cityName}'de ${serviceName} yapım süresi, projenin ölçeğine ve türüne göre değişmektedir. Açık halı saha projeleri ortalama 15-25 gün, kapalı halı saha projeleri 30-45 gün, basketbol ve tenis kortu projeleri ise 10-20 gün içinde tamamlanmaktadır. Kış aylarında hava koşulları nedeniyle süreç biraz uzayabilir. MYK belgeli ekibimiz ve organize iş planlamamız sayesinde tüm projelerimizi taahhüt ettiğimiz sürede teslim ediyoruz.`,
      category: "süreç",
    },
    {
      question: `${cityName}'de ${serviceName} yapım maliyeti ne kadar? (2026 güncel)`,
      answer: `2026 yılı ${cityName} fiyatları şu şekildedir: Açık halı saha (20x40m) 280.000₺ - 480.000₺, Kapalı halı saha (25x45m) 1.350.000₺ - 1.825.000₺, Basketbol sahası 126.000₺ - 216.000₺, Tenis kortu (akrilik) 256.000₺ - 448.000₺, Voleybol sahası 97.200₺ - 178.200₺, Çok amaçlı saha 360.000₺ - 585.000₺ arasındadır. Fiyatlar m² birim fiyatı üzerinden hesaplanır ve toprak durumu, zemin hazırlığı, ulaşım koşulları gibi faktörlere göre değişebilir. Net fiyat için ücretsiz keşif hizmetimizden yararlanabilirsiniz.`,
      category: "fiyat",
    },
    {
      question: `${cityName}'de ${serviceName} yapımı için ruhsat gerekli mi?`,
      answer: `Evet, ${cityName}'de ${serviceName} yapımı için ${cityName} Belediyesi'nden yapı ruhsatı alınması zorunludur. Ayrıca imar durumu belgesi, çevre düzenleme izni ve elektrik/su bağlantı onayları da gerekebilir. İkber Spor Yapıları olarak tüm bu süreçlerde ücretsiz danışmanlık sağlıyoruz. Mimari proje, statik hesap ve ruhsat başvuruları dahil tüm evrak işlemlerinde sizin adınıza takip yapıyoruz.`,
      category: "izin",
    },
    {
      question: `${cityName}'de ${serviceName} için hangi malzemeleri kullanıyorsunuz?`,
      answer: `Tüm malzemelerimiz TSE ve CE sertifikalıdır. Suni çim için FIFA onaylı 55mm hav boyu, 10.800 D-Tex monofilament iplik kullanıyoruz. Zemin kaplama için ITF Classified akrilik sistem uyguluyoruz. Çelik konstrüksiyonda St37 kalite galvanizli profil (80 mikron hot-dip), betonarme zeminde C30/37 kalite beton ve B500C ribalı çelik donatı kullanıyoruz. Aydınlatmada 200W LED Meanwell sürücülü projektörler ile 500 lux homojen aydınlatma sağlıyoruz.`,
      category: "malzeme",
    },
    {
      question: `${cityName}'de ${serviceName} yapan firmalar arasında neden İkber Spor?`,
      answer: `İkber Spor Yapıları olarak 1992 yılından beri ${cityName}'de ve Türkiye'nin 81 ilinde hizmet veriyoruz. MYK belgeli ustalarımız, TSE/CE sertifikalı malzemelerimiz ve 2.000'den fazla başarılı projemizle sektörde öncü konumdayız. 7 yıl yapısal garanti, 2 yıl işçilik garantisi ve ömür boyu teknik destek sunuyoruz. Ayrıca ücretsiz keşif, ücretsiz proje çizimi ve ruhsat danışmanlığı gibi ek hizmetlerimizle müşterilerimize değer katıyoruz.`,
      category: "neden",
    },
    {
      question: `${cityName}'de ${serviceName} için ücretsiz keşif yapıyor musunuz?`,
      answer: `Evet, ${cityName}'in tüm ilçelerinde ücretsiz keşif hizmeti sunuyoruz. Keşif ekibimiz yerinde ölçüm yapar, toprak durumunu analiz eder, en uygun proje konseptini belirler ve 48 saat içinde detaylı bir teklif sunar. Keşif sırasında malzeme numuneleri gösterilir, referans projelerimizin fotoğrafları paylaşılır ve tüm teknik sorularınız uzman mühendislerimiz tarafından yanıtlanır. Keşif randevusu için 0542 612 56 10 numaralı telefondan bize ulaşabilirsiniz.`,
      category: "hizmet",
    },
    {
      question: `${cityName}'de yapılan ${serviceName} garantisi ne kadar?`,
      answer: `${cityName}'de yaptığımız tüm ${serviceName} projelerinde 7 yıl yapısal garanti ve 2 yıl işçilik garantisi sunuyoruz. Bu garanti kapsamında; zemin çökmesi, çelik konstrüksiyon deformasyonu, boya dökülmesi, LED arızaları ve çim dökülmesi gibi yapısal sorunlar ücretsiz olarak giderilir. Garanti süresi boyunca yılda 2 kez ücretsiz bakım ziyareti yapıyoruz. Garanti belgesi, proje teslimi sırasında noter onaylı sözleşme ile birlikte teslim edilir.`,
      category: "garanti",
    },
    {
      question: `${cityName}'de ${serviceName} ödemesi nasıl yapılıyor?`,
      answer: `${cityName}'de ${serviceName} projelerimizde esnek ödeme seçenekleri sunuyoruz. Peşin ödemede %5 indirim uyguluyoruz. Taksitli ödemelerde proje başlangıcında %40 kapora, zemin hazırlığı tamamlandığında %30, proje tesliminde %30 şeklinde 3 taksit imkanı bulunmaktadır. Ayrıca 12 aya varan banka kredisi seçenekleri (Akbank, Garanti, İş Bankası) ve Esnaf Kredi desteği konusunda danışmanlık sağlıyoruz.`,
      category: "fiyat",
    },
    {
      question: `${cityName}'de ${serviceName} için minimum arazi boyutu ne olmalı?`,
      answer: `${cityName}'de ${serviceName} projeleri için minimum arazi boyutları şöyledir: Açık halı saha için 25m × 45m (1.125 m²), Basketbol için 17m × 30m (510 m²), Tenis kortu için 20m × 40m (800 m²), Voleybol için 20m × 35m (700 m²). Daha küçük araziler için özel tasarım çözümleri üretebiliriz. Keşif sırasında arazinizin uygunluğunu ve en verimli kullanım planını ücretsiz olarak sunuyoruz.`,
      category: "teknik",
    },
    {
      question: `${cityName}'de kışın ${serviceName} yapımı mümkün mü?`,
      answer: `${cityName}'in iklim koşulları göz önünde bulundurulduğunda, kış aylarında kapalı saha ve çelik konstrüksiyon projelerine devam edebiliyoruz. Açık saha projelerinde ise hava durumuna bağlı olarak çalışma programı oluşturuyoruz. Nem dayanımlı çim kaplama ve çift kat drenaj sistemimiz sayesinde yağışlı dönemlerde de zemin kalitesini koruyoruz. Genel olarak en ideal yapım dönemi Mart-Mayıs ve Eylül-Kasım aylarıdır.`,
      category: "teknik",
    },
    {
      question: `${cityName}'de ${serviceName} yaptırdım, bakım hizmeti veriyor musunuz?`,
      answer: `Evet, ${cityName}'de ${serviceName} projesi sonrası kapsamlı bakım hizmetleri sunuyoruz. Yıllık bakım paketimiz içinde; çim tarama ve granül tazeleme, çizgi boyama, çelik konstrüksiyon kontrolü, LED aydınlatma testi, drenaj temizliği ve genel kontrol bulunmaktadır. Ayrıca suni çim değişimi, branda tamiri, zemin düzeltme ve genişletme gibi tadilat işlemlerini de uygun fiyatlarla gerçekleştiriyoruz.`,
      category: "hizmet",
    },
    {
      question: `${cityName}'de ${serviceName} referanslarınızı görebilir miyim?`,
      answer: `Tabii ki! ${cityName}'de ve ilçelerinde gerçekleştirdiğimiz birçok projemiz bulunmaktadır. Referanslarımız arasında; belediyeler, okullar, özel spor kulüpleri, oteller, fabrikalar ve site yönetimleri yer almaktadır. İstediğiniz taktirde ${cityName}'deki tamamlanan projelerimizin fotoğraflarını, videolarını ve müşteri iletişim bilgilerini paylaşabiliriz. Ayrıca proje öncesi referans ziyareti de organize edebiliriz.`,
      category: "referans",
    },
    {
      question: `${cityName}'de ${serviceName} için kredi kartı geçerli mi?`,
      answer: `Evet, ${cityName}'deki tüm ${serviceName} projelerimizde kredi kartı ile ödeme imkanı sunuyoruz. Visa, Mastercard ve American Express kartlarını kabul ediyoruz. 12 aya varan taksit seçenekleri mevcuttur. Ayrıca bazı bankaların anlaşmalı olduğumuz için özel faiz oranları ve vade seçenekleri de bulunmaktadır. Esnaf kredisi, KOSGEB desteği ve belediye hibe programları hakkında da bilgi veriyoruz.`,
      category: "fiyat",
    },
    {
      question: `${cityName}'de ${serviceName} projesiyle ilgili sözleşme yapılıyor mu?`,
      answer: `Evet, ${cityName}'deki tüm projelerimizde noter onaylı sözleşme yapılmaktadır. Sözleşmede; proje tanımı, kullanılacak malzemelerin marka ve modelleri, teslim tarihi, ödeme planı, garanti koşulları ve cezai şartlar açıkça belirtilir. Sözleşme öncesi tüm maddeler müşterimizle birlikte incelenir ve onaylanır. Şeffaf ve güvenilir iş anlayışımızın bir gereği olarak sözleşme yapmadan proje başlatmıyoruz.`,
      category: "hukuki",
    },
    {
      question: `${cityName}'de ${serviceName} için keşif randevusu nasıl alırım?`,
      answer: `${cityName}'de ${serviceName} için keşif randevusu almak çok kolay! 0542 612 56 10 numaralı telefondan bizi arayabilir, WhatsApp hattımıza yazabilir veya ikberspor@ikberspor.com adresine e-posta gönderebilirsiniz. Keşif talebinizi aldıktan sonra 24-48 saat içinde size dönüş yapıyor ve sizin için uygun bir tarihte randevu oluşturuyoruz. Acil durumlarda aynı gün keşif imkanı da sunuyoruz.`,
      category: "iletişim",
    },
  ];

  const faqs = additionalFaqs && additionalFaqs.length > 0 ? [...additionalFaqs, ...defaultFaqs] : defaultFaqs;
  const slicedFaqs = faqs.slice(0, 15);

  return (
    <section className="py-12 bg-white" aria-label="Sıkça Sorulan Sorular">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
          <HelpCircle className="w-7 h-7 text-green-600" />
          {cityName} {serviceName} Yapımı — Sıkça Sorulan Sorular
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {cityName}'de {serviceName} yapımı hakkında en çok sorulan 15 soru ve detaylı yanıtları.
        </p>

        {/* Schema.org FAQPage */}
        <FAQSchema faqs={slicedFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />

        <div className="space-y-3">
          {slicedFaqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all ${
                openIndex === index
                  ? "border-green-300 bg-green-50/30 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 text-sm pr-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed pt-3 pl-8">
                    {faq.answer}
                  </p>
                  {faq.category && (
                    <span className="ml-8 mt-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
                      {faq.category}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
