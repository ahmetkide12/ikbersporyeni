import { TrendingUp, Phone, CheckCircle2, AlertCircle } from "lucide-react";

interface PriceTableProps {
  cityName: string;
}

interface PriceRow {
  service: string;
  slug: string;
  size: string;
  unitPrice: string;
  totalMin: string;
  totalMax: string;
  color: string;
  gradient: string;
  badge?: string;
}

export default function PriceTable({ cityName }: PriceTableProps) {
  const prices: PriceRow[] = [
    {
      service: "Açık Halı Saha",
      slug: "acik-hali-saha-yapimi",
      size: "20m × 40m (800 m²)",
      unitPrice: "350₺ - 600₺/m²",
      totalMin: "280.000₺",
      totalMax: "480.000₺",
      color: "text-green-700",
      gradient: "from-green-50 to-emerald-50 border-green-200",
      badge: "En Popüler",
    },
    {
      service: "Kapalı Halı Saha",
      slug: "kapali-hali-saha-yapimi",
      size: "25m × 45m (1.125 m²)",
      unitPrice: "1.200₺ - 1.800₺/m²",
      totalMin: "1.350.000₺",
      totalMax: "1.825.000₺",
      color: "text-blue-700",
      gradient: "from-blue-50 to-indigo-50 border-blue-200",
      badge: "Premium",
    },
    {
      service: "Basketbol Sahası",
      slug: "basketbol-sahasi-yapimi",
      size: "15m × 28m (420 m²)",
      unitPrice: "300₺ - 550₺/m²",
      totalMin: "126.000₺",
      totalMax: "216.000₺",
      color: "text-orange-700",
      gradient: "from-orange-50 to-amber-50 border-orange-200",
    },
    {
      service: "Tenis Kortu (Akrilik)",
      slug: "tenis-kortu-yapimi",
      size: "18m × 37m (666 m²)",
      unitPrice: "400₺ - 700₺/m²",
      totalMin: "256.000₺",
      totalMax: "448.000₺",
      color: "text-yellow-700",
      gradient: "from-yellow-50 to-orange-50 border-yellow-200",
    },
    {
      service: "Tenis Kortu (Çim)",
      slug: "tenis-kortu-yapimi",
      size: "18m × 37m (666 m²)",
      unitPrice: "550₺ - 850₺/m²",
      totalMin: "366.000₺",
      totalMax: "566.000₺",
      color: "text-emerald-700",
      gradient: "from-emerald-50 to-green-50 border-emerald-200",
    },
    {
      service: "Voleybol Sahası",
      slug: "voleybol-sahasi-yapimi",
      size: "18m × 36m (648 m²)",
      unitPrice: "150₺ - 300₺/m²",
      totalMin: "97.200₺",
      totalMax: "178.200₺",
      color: "text-cyan-700",
      gradient: "from-cyan-50 to-sky-50 border-cyan-200",
    },
    {
      service: "Çok Amaçlı Spor Saha",
      slug: "cok-amacli-saha-yapimi",
      size: "20m × 40m (800 m²)",
      unitPrice: "450₺ - 750₺/m²",
      totalMin: "360.000₺",
      totalMax: "585.000₺",
      color: "text-purple-700",
      gradient: "from-purple-50 to-violet-50 border-purple-200",
      badge: "Çok Talep",
    },
    {
      service: "Nizami Futbol Sahası",
      slug: "nizami-futbol-sahasi-yapimi",
      size: "70m × 100m (7.000 m²)",
      unitPrice: "800₺ - 1.500₺/m²",
      totalMin: "5.600.000₺",
      totalMax: "10.500.000₺",
      color: "text-red-700",
      gradient: "from-red-50 to-rose-50 border-red-200",
      badge: "Lüks",
    },
    {
      service: "Padel Kortu",
      slug: "padel-kortu-yapimi",
      size: "10m × 20m (200 m²)",
      unitPrice: "800₺ - 1.500₺/m²",
      totalMin: "160.000₺",
      totalMax: "300.000₺",
      color: "text-pink-700",
      gradient: "from-pink-50 to-rose-50 border-pink-200",
    },
    {
      service: "Atletizm Pisti",
      slug: "atletizm-pisti-yapimi",
      size: "400m 8-kulvar (4.500 m²)",
      unitPrice: "350₺ - 600₺/m²",
      totalMin: "1.575.000₺",
      totalMax: "2.700.000₺",
      color: "text-teal-700",
      gradient: "from-teal-50 to-cyan-50 border-teal-200",
    },
    {
      service: "Spor Zemin Kaplama (Suni Çim)",
      slug: "suni-cim-saha-kaplama",
      size: "m² bazlı",
      unitPrice: "180₺ - 350₺/m²",
      totalMin: "180₺",
      totalMax: "350₺",
      color: "text-green-700",
      gradient: "from-green-50 to-lime-50 border-green-200",
    },
    {
      service: "Akrilik Zemin Kaplama",
      slug: "akrilik-zemin-kaplama",
      size: "m² bazlı",
      unitPrice: "150₺ - 300₺/m²",
      totalMin: "150₺",
      totalMax: "300₺",
      color: "text-amber-700",
      gradient: "from-amber-50 to-yellow-50 border-amber-200",
    },
    {
      service: "Çelik Konstrüksiyon (Saha Çatısı)",
      slug: "celik-konstruksiyon",
      size: "m² bazlı",
      unitPrice: "600₺ - 1.200₺/m²",
      totalMin: "600₺",
      totalMax: "1.200₺",
      color: "text-slate-700",
      gradient: "from-slate-50 to-gray-50 border-slate-200",
    },
    {
      service: "Havuz Yapımı (Olimpik)",
      slug: "havuz-yapimi",
      size: "25m × 50m (1.250 m²)",
      unitPrice: "2.500₺ - 5.000₺/m²",
      totalMin: "3.125.000₺",
      totalMax: "6.250.000₺",
      color: "text-sky-700",
      gradient: "from-sky-50 to-blue-50 border-sky-200",
    },
    {
      service: "Hibrit Çim Saha (FIFA)",
      slug: "hibrit-cim-saha-yapimi",
      size: "70m × 100m (7.000 m²)",
      unitPrice: "600₺ - 1.200₺/m²",
      totalMin: "4.200.000₺",
      totalMax: "8.400.000₺",
      color: "text-emerald-700",
      gradient: "from-emerald-50 to-green-50 border-emerald-200",
      badge: "FIFA Onaylı",
    },
  ];

  return (
    <section className="py-12 bg-gray-50" aria-label="Fiyat Listesi">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-green-600" />
          {cityName} Spor Sahası Yapım Fiyatları (2026)
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          {cityName} ve çevre illerdeki güncel spor sahası yapım maliyetleri. 
          Aşağıdaki tablo 2026 yılı ortalama fiyatlarıdır. Net fiyat için ücretsiz keşif talep edebilirsiniz.
        </p>

        {/* Tablo Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-900 text-white rounded-t-xl text-sm font-semibold">
          <div className="col-span-3">Hizmet</div>
          <div className="col-span-3">Ölçü</div>
          <div className="col-span-2">m² Fiyatı</div>
          <div className="col-span-2">Toplam Fiyat</div>
          <div className="col-span-2 text-right">İşlem</div>
        </div>

        {/* Tablo Satırları */}
        <div className="space-y-0">
          {prices.map((row, i) => (
            <div
              key={row.slug}
              className={`grid lg:grid-cols-12 gap-2 lg:gap-4 p-4 bg-gradient-to-r ${row.gradient} border-b ${i === prices.length - 1 ? "rounded-b-xl" : ""} ${i === 0 ? "lg:rounded-t-none rounded-t-xl" : ""} items-center hover:shadow-md transition-shadow`}
            >
              {/* Hizmet Adı */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${row.color}`}>{row.service}</span>
                  {row.badge && (
                    <span className="px-2 py-0.5 bg-white/80 rounded-full text-[10px] font-bold text-gray-700 border border-gray-200">
                      {row.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Ölçü */}
              <div className="lg:col-span-3 text-sm text-gray-600">{row.size}</div>

              {/* m² Fiyatı */}
              <div className="lg:col-span-2 text-sm font-semibold text-gray-700">{row.unitPrice}</div>

              {/* Toplam Fiyat */}
              <div className="lg:col-span-2">
                <span className="font-bold text-gray-900">{row.totalMin} - {row.totalMax}</span>
              </div>

              {/* İşlem */}
              <div className="lg:col-span-2 text-right">
                <a
                  href="tel:+905426125610"
                  className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3 h-3" /> Teklif Al
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Notlar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>Fiyatlara KDV dahil değildir. Nakit ödemede %5 indirim uygulanır.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>12 aya varan taksit imkanı mevcuttur (Akbank, Garanti, İş Bankası kredi kartlarına).</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <span>Fiyatlar malzeme piyasasına göre değişebilir. Net teklif için ücretsiz keşif yapıyoruz.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
