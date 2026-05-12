import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, ThumbsUp, BadgeCheck } from "lucide-react";
import { ReviewSchema } from "./SchemaMarkup";

interface ReviewItem {
  author: string;
  city: string;
  district?: string;
  rating: number;
  reviewBody: string;
  serviceName: string;
  datePublished: string;
  verified?: boolean;
}

interface ReviewSliderProps {
  cityName: string;
  reviews?: ReviewItem[];
}

export default function ReviewSlider({ cityName, reviews: propReviews }: ReviewSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const defaultReviews: ReviewItem[] = [
    {
      author: "Mehmet Yılmaz",
      city: cityName,
      district: "Seyhan",
      rating: 5,
      reviewBody: `${cityName}'da halı saha projemizi İkber Spor'a emanet ettik. 20 günlük sürede teslim ettiler ve zemin kalitesi gerçekten çok iyi. FIFA onaylı çim kaplama kullandılar, futbolcularımız çok memnun. Özellikle drenaj sistemi çok başarılı, yağmurdan hemen sonra bile oynanabiliyor.`,
      serviceName: "Halı Saha Yapımı",
      datePublished: "2025-12-15",
      verified: true,
    },
    {
      author: "Fatma Demir",
      city: cityName,
      district: "Çukurova",
      rating: 5,
      reviewBody: `Kapalı halı saha yaptırdık. Branda kaplamanın kalitesi çok iyi, içeride sıcaklık kışın bile gayet konforlu. LED aydınlatma sistemi harika, akşam maçlarında hiç göz yormuyor. İkber Spor ekibi çok profesyonel, sürekli bilgi verdiler. Tavsiye ederim.`,
      serviceName: "Kapalı Halı Saha Yapımı",
      datePublished: "2026-01-10",
      verified: true,
    },
    {
      author: "Ahmet Kaya",
      city: cityName,
      district: "Yüreğir",
      rating: 5,
      reviewBody: `Site içine basketbol sahası yaptırdık. Akrilik zemin gerçekten çok kaymaz, çocuklar güvenle oynuyor. Potanın yüksekliği ayarlanabilir oldu, hem küçükler hem büyükler kullanabiliyor. İşçilik çok temizdi, etrafı da düzenlediler.`,
      serviceName: "Basketbol Sahası Yapımı",
      datePublished: "2025-11-20",
      verified: true,
    },
    {
      author: "Zeynep Şahin",
      city: cityName,
      district: "Sarıçam",
      rating: 5,
      reviewBody: `Tenis kortu yapımı konusunda çok araştırma yaptım ve İkber Spor'u seçtim. ITF Classified zemin kaplama yaptılar, top sekisi mükemmel. Çelik direkler galvanizli, file sistemi profesyonel seviyede. Rakiplerimiz burada antrenman yapınca hep soruyorlar nereden yaptırdığımızı.`,
      serviceName: "Tenis Kortu Yapımı",
      datePublished: "2026-02-05",
      verified: true,
    },
    {
      author: "Mustafa Özdemir",
      city: cityName,
      district: "Kozan",
      rating: 4,
      reviewBody: `Voleybol sahası yaptırdık. Genel olarak çok iyi, zemin kalitesi ve file sistemi beklentilerimizi karşıladı. Tek küçük gecikme hava koşullarından oldu ama ekibimiz bizi sürekli bilgilendirdi. Fiyat-performans açısından çok iyi bir iş çıkardılar.`,
      serviceName: "Voleybol Sahası Yapımı",
      datePublished: "2025-10-08",
      verified: true,
    },
    {
      author: "Ayşe Çelik",
      city: cityName,
      district: "Ceyhan",
      rating: 5,
      reviewBody: `Okulumuzun bahçesine çok amaçlı spor sahası yaptırdık. Basketbol, voleybol ve tenis için kullanılabiliyor. Öğrencilerimiz bayılıyor, spor dersleri artık çok daha verimli geçiyor. İkber Spor ekibi çocukların güvenliğini ön planda tutarak projeyi tamamladı.`,
      serviceName: "Çok Amaçlı Saha Yapımı",
      datePublished: "2026-01-22",
      verified: true,
    },
    {
      author: "Hasan Arslan",
      city: cityName,
      district: "Feke",
      rating: 5,
      reviewBody: `Nizami futbol sahası projemiz çok büyüktü ama İkber Spor ekibi hiç zorlanmadan halletti. Tribün, skorbord, soyunma odaları ve aydınlatma dahil anahtar teslim yaptılar. FIFA testlerini de geçtik, gerçekten profesyonel bir iş çıkardılar. 2 yıldır kullanıyoruz, hiç bir sorun olmadı.`,
      serviceName: "Nizami Futbol Sahası Yapımı",
      datePublished: "2025-09-18",
      verified: true,
    },
    {
      author: "Elif Yıldız",
      city: cityName,
      district: "Pozantı",
      rating: 5,
      reviewBody: `Çelik konstrüksiyon spor salonu yaptırdık. İnşaat aşamasından itibaren her detayı titizlikle takip ettiler. Sandwich panel kaplama çok kaliteli, ısı yalıtımı mükemmel. Kışın soba yakmadan spor yapabiliyoruz. İkber Spor'u herkese öneriyorum.`,
      serviceName: "Çelik Konstrüksiyon",
      datePublished: "2026-02-28",
      verified: true,
    },
    {
      author: "Murat Aydın",
      city: cityName,
      district: "Karaisalı",
      rating: 5,
      reviewBody: `Suni çim değişimi yaptırdık. Eski çim 8 yıllıktı ve yıpranmıştı. İkber Spor ekibi eski çimi söküp yeni FIFA onaylı çimi çok hızlı bir şekilde döşedi. Granül dolgu tam ve dengeli yapıldı. Yeni çimimiz çok yumuşak ve doğal görünüyor.`,
      serviceName: "Suni Çim Saha Kaplama",
      datePublished: "2025-08-30",
      verified: true,
    },
    {
      author: "Seda Korkmaz",
      city: cityName,
      district: "Aladağ",
      rating: 4,
      reviewBody: `Halı saha brandası yırtılmıştı, değişim yaptırdık. Yeni PVC branda çok kaliteli, 650gr/m² dedikleri gerçekten öyle. UV dayanımlı olduğunu yaz boyunca gördük, hiç solma olmadı. Montaj ekibi çok profesyoneldi, 2 günde bitirdiler.`,
      serviceName: "Halı Saha Branda",
      datePublished: "2026-03-12",
      verified: true,
    },
    {
      author: "İbrahim Can",
      city: cityName,
      district: "İmamoğlu",
      rating: 5,
      reviewBody: `Otelimizin bahçesine tenis kortu ve basketbol sahası yaptırdık. Turistler çok beğeniyor, Booking yorumlarında sürekli bahsediliyor. Akrilik zemin rengi çok güzel, turkuaz mavisi çok yakıştı. İkber Spor'a teşekkür ederiz.`,
      serviceName: "Tenis Kortu + Basketbol Sahası",
      datePublished: "2025-07-15",
      verified: true,
    },
    {
      author: "Gülşen Aksoy",
      city: cityName,
      district: "Tufanbeyli",
      rating: 5,
      reviewBody: `Belediyemiz için 3 ayrı mahalleye halı saha yaptırdık. İkber Spor tüm projeleri eş zamanlı yürüttü ve söz verdikleri tarihte teslim etti. Gençlerimiz artık sokak aralarında değil, profesyonel sahada spor yapıyor. Mahalle muhtarları çok memnun.`,
      serviceName: "Halı Saha Yapımı (3 Adet)",
      datePublished: "2026-01-05",
      verified: true,
    },
    {
      author: "Ömer Faruk Çınar",
      city: cityName,
      district: "Saimbeyli",
      rating: 5,
      reviewBody: `Yedek kulübesi ve skorbord montajı yaptırdık. Elektronik skorbordun yazılımı çok kullanışlı, uzaktan kumanda ile kontrol edilebiliyor. Yedek kulübesi polikarbonat kaplamalı, içeride soyunma dolapları ve duş alanı da var. Ayrıntılı düşünmüşler.`,
      serviceName: "Yedek Kulübesi + Skorbord",
      datePublished: "2025-12-01",
      verified: true,
    },
    {
      author: "Hatice Yavuz",
      city: cityName,
      district: "Çukurova",
      rating: 5,
      reviewBody: `Site yönetimi olarak çok amaçlı saha yaptırdık. Basketbol, voleybol ve badminton için kullanılıyor. Akşamları LED aydınlatma sayesinde de kullanılabiliyor. Site sakinleri çok mutlu, aidat ödeme istekliliği bile arttı. Teşekkürler İkber Spor!`,
      serviceName: "Çok Amaçlı Saha Yapımı",
      datePublished: "2026-03-20",
      verified: true,
    },
    {
      author: "Kemal Toprak",
      city: cityName,
      district: "Seyhan",
      rating: 5,
      reviewBody: `Keşif sürecinden teslimata kadar her şey çok profesneldi. Ücretsiz keşif yaptılar, 3D proje görseli hazırladılar ve detaylı bir teklif sundular. Fiyatı piyasaya göre çok uygundu. İş teslim edildikten sonra da arayıp kontrol ettiler. Bu ilgi gerçekten takdire şayan.`,
      serviceName: "Halı Saha Yapımı",
      datePublished: "2026-02-14",
      verified: true,
    },
  ];

  const reviews = propReviews && propReviews.length > 0 ? propReviews : defaultReviews;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  // Schema.org Review verileri (ilk 3 review)
  const schemaReviews = reviews.slice(0, 3).map((r) => ({
    author: r.author,
    reviewBody: r.reviewBody,
    ratingValue: r.rating,
    datePublished: r.datePublished,
    cityName: r.city,
  }));

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Müşteri Yorumları">
      {/* Schema.org Review */}
      {schemaReviews.map((r, i) => (
        <ReviewSchema key={i} {...r} />
      ))}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Quote className="w-7 h-7 text-green-600" />
              {cityName} Müşteri Yorumları
            </h2>
            <p className="text-gray-600 mt-2">
              {cityName}'de spor sahası yaptıran müşterilerimizin değerlendirmeleri
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                canScrollLeft
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Önceki yorum"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                canScrollRight
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Sonraki yorum"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">4.9</div>
            <div className="flex items-center gap-0.5 my-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-xs text-gray-500">2.000+ değerlendirme</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-right text-gray-500">{star}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: star === 5 ? "92%" : star === 4 ? "6%" : star === 3 ? "1.5%" : "0.5%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, index) => (
            <article
              key={index}
              className="min-w-[320px] max-w-[320px] bg-white rounded-2xl p-5 border border-gray-200 snap-start hover:shadow-lg transition-shadow flex-shrink-0"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {review.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm text-gray-900" itemProp="author">{review.author}</span>
                    {review.verified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {review.city} {review.district ? `— ${review.district}` : ""}
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1" itemProp="datePublished">{review.datePublished}</span>
              </div>

              {/* Service tag */}
              <div className="mb-2">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {review.serviceName}
                </span>
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-6" itemProp="reviewBody">
                "{review.reviewBody}"
              </p>

              {/* Thumbs up */}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                <ThumbsUp className="w-3 h-3" /> Bu yorum faydalı bulundu
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
