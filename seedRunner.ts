import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { cities, services, reviews, faqs, servicePages } from "./db/schema";

const pool = mysql.createPool(process.env.DATABASE_URL!);
const db = drizzle(pool, { mode: "planetscale" });

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

const reviewTexts = [
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} yaptırdık. İkber Spor ekibi çok profesyonel çalıştı. 30 günde teslim aldık. MYK belgeli ekip gerçekten kaliteli iş çıkardı. ${c} spor sahası yapan firmalar arasında en iyileri.`,
  (c: string, d: string, s: string) => `${c} ${d} semtinde ${s} projemiz tamamlandı. İşçilik mükemmel, kullanılan malzemeler TSE sertifikalı. Fiyat/performans olarak çok memnun kaldık. Tavsiye ederim.`,
  (c: string, d: string, s: string) => `Eşimle birlikte ${c} ${d} mahallesinde ${s} projemizi İkber Spor'a emanet ettik. Çok hızlı ve temiz bir iş çıkardılar. 15 günde teslim ettiler.`,
  (c: string, d: string, s: string) => `Okulumuz için ${c} ${d} bölgesinde ${s} yaptırdık. Standartlara uygun, çok profesyonel bir iş çıktı. Tüm öğrencilerimiz çok beğendi.`,
  (c: string, d: string, s: string) => `${c} ${d} semtindeki spor kompleksimiz için ${s} hizmeti aldık. FIFA standartlarında, mükemmel zemin kalitesi. Herkese tavsiye ediyoruz.`,
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} yaptırdık. Akrilik zemin çok kaliteli oldu. Profesyonel çizgi boyama ve direk sistemi. İkber Spor'a teşekkürler.`,
  (c: string, d: string, s: string) => `${c} ${d} semtinde ${s} projemiz çok başarılı geçti. 4 mevsim kullanılabilir kapalı sistem. Isı yalıtımı mükemmel.`,
  (c: string, d: string, s: string) => `Spor kulübümüz için ${c} ${d} bölgesinde ${s} yaptırdık. Çok fonksiyonel ve kaliteli bir saha oldu. ${c} spor sahası yapımı denince akla gelen ilk firma.`,
  (c: string, d: string, s: string) => `${c} ${d} semtinde ${s} için çelik konstrüksiyon yaptırdık. Dayanıklı ve estetik bir yapı oldu. Mühendislik harikası.`,
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} ile zemin kaplama yaptırdık. Kaymaz yüzey, UV dayanımlı. Çok ekonomik ve uzun ömürlü oldu.`,
  (c: string, d: string, s: string) => `${c} ${d} semtinde ${s} için branda kaplama yaptırdık. 650gr/m2 PVC branda çok kaliteli. Su geçirmez ve UV dayanımlı.`,
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} için suni çim döşedik. 55mm Ten Cate çim, FIFA standartlarında. 7 yıl garanti çok güven verici.`,
  (c: string, d: string, s: string) => `${c} ${d} semtindeki halı sahamızın tamiri için İkber Spor'u aradık. Zemin düzeltme, granül değişimi çok profesyonel yapıldı.`,
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} için tavan filesi yaptırdık. Paraşüt ipi, çok sağlam. Montaj dahil hizmet süper.`,
  (c: string, d: string, s: string) => `${c} ${d} semtinde ${s} için pota montajı yaptırdık. TBF onaylı, paslanmaz çelik. Çok kaliteli ürün ve hizmet.`,
  (c: string, d: string, s: string) => `${c} ${d} bölgesinde ${s} yaptırdık. 30 yıllık tecrübe gerçekten hissediliyor. Anahtar teslim, hiç sorun yaşamadık.`,
  (c: string, d: string, s: string) => `${c} ${d} semtindeki tesisimiz için ${s} hizmeti aldık. Çelik konstrüksiyon, profesyonel zemin ve aydınlatma. Her şey mükemmel.`,
];

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
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için ne tür malzeme kullanıyorsunuz?`, a: `${c} ${d} bölgesindeki projelerimizde TSE ve CE sertifikalı, en kaliteli malzemeleri kullanıyoruz. Tüm ürünlerimiz 7 yıl garantilidir.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} yapan firmalar arasında neden sizi seçmeliyim?`, a: `İkber Spor Yapıları olarak ${c} ${d} semtinde 30+ yıllık tecrübemiz, MYK belgeli ekibimiz ve referanslarımızla en güvenilir seçeneğiz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için ücretsiz keşif yapıyor musunuz?`, a: `Evet, ${c} ${d} bölgesinde ${svc} için ücretsiz keşif hizmeti sunuyoruz. Yerinde değerlendirme sonrası detaylı teklif hazırlıyoruz.`, cat: "service" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} garantisi var mı?`, a: `Evet, ${c} ${d} semtinde yaptığımız tüm ${svc} projelerinde 7 yıl yapısal garanti ve 2 yıl işçilik garantisi sunuyoruz.`, cat: "general" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ödemesi nasıl yapılıyor?`, a: `${c} ${d} bölgesinde ${svc} projelerinde nakit, kredi kartı ve banka havalesi ile ödeme imkanı sunuyoruz. Bazı projelerde taksit seçeneği de mevcuttur.`, cat: "pricing" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} ruhsat işlemlerinde yardımcı oluyor musunuz?`, a: `Evet, ${c} ${d} belediyesinden gerekli ruhsatların alınması sürecinde size danışmanlık hizmeti sunuyoruz.`, cat: "technical" }),
  (c: string, d: string, svc: string) => ({ q: `${c} ${d} ${svc} için referans projeniz var mı?`, a: `Evet, ${c} ${d} semtinde ve çevre ilçelerde ${svc} konusunda birçok başarılı projemiz bulunmaktadır.`, cat: "general" }),
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

async function runSeed() {
  console.log("🌱 Seed starting...");

  const cityList = await db.select().from(cities);
  const svcList = await db.select().from(services);
  console.log(`Found ${cityList.length} cities, ${svcList.length} services`);

  // Insert reviews (14-17 per city)
  console.log("⭐ Inserting reviews (14-17 per city)...");
  let totalReviews = 0;
  for (let ci = 0; ci < cityList.length; ci++) {
    const city = cityList[ci];
    const cityDistricts = city.districts as string[] | null;
    const numReviews = 14 + (ci % 4); // 14-17
    const batch = [];
    for (let i = 0; i < numReviews; i++) {
      const district = cityDistricts?.[i % (cityDistricts?.length || 1)] || "Merkez";
      const svcType = reviewServiceTypes[i % reviewServiceTypes.length];
      batch.push({
        cityId: city.id,
        customerName: reviewNames[i % reviewNames.length],
        customerLocation: city.name,
        district,
        rating: 5,
        reviewText: reviewTexts[i % reviewTexts.length](city.name, district, svcType),
        serviceType: svcType,
        isApproved: true,
      });
    }
    await db.insert(reviews).values(batch);
    totalReviews += numReviews;
    if ((ci + 1) % 10 === 0) console.log(`   ${ci + 1}/${cityList.length} cities done, ${totalReviews} reviews`);
  }
  console.log(`   ✅ ${totalReviews} reviews inserted`);

  // Insert FAQs (15-20 per city)
  console.log("❓ Inserting FAQs (15-20 per city)...");
  let totalFaqs = 0;
  for (let ci = 0; ci < cityList.length; ci++) {
    const city = cityList[ci];
    const cityDistricts = city.districts as string[] | null;
    const numFaqs = 15 + (ci % 6); // 15-20
    const batch = [];
    for (let i = 0; i < numFaqs; i++) {
      const district = cityDistricts?.[i % (cityDistricts?.length || 1)] || "Merkez";
      const svcName = faqServiceNames[i % faqServiceNames.length];
      const tmpl = faqTemplates[i % faqTemplates.length](city.name, district, svcName);
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
    if ((ci + 1) % 10 === 0) console.log(`   ${ci + 1}/${cityList.length} cities done, ${totalFaqs} FAQs`);
  }
  console.log(`   ✅ ${totalFaqs} FAQs inserted`);

  console.log("\n🎉 SEED COMPLETE!");
  console.log(`   Reviews: ${totalReviews}`);
  console.log(`   FAQs: ${totalFaqs}`);

  await pool.end();
}

runSeed().catch((e) => { console.error(e); process.exit(1); });
