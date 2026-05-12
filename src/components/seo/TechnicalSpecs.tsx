import { Ruler, Droplets, Shield, Zap, Hammer, Layers, CheckCircle2 } from "lucide-react";

interface TechnicalSpecsProps {
  cityName: string;
  serviceName?: string;
}

export default function TechnicalSpecs({ cityName, serviceName = "Spor Sahası" }: TechnicalSpecsProps) {
  const baseService = serviceName.replace(`${cityName} `, "").trim();

  return (
    <section className="py-12 bg-white" aria-label="Teknik Detaylar">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Ruler className="w-7 h-7 text-green-600" />
          {cityName} {baseService} Teknik Şartname ve Yapım Aşamaları
        </h2>

        {/* Standart Hatıl Kutusu */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-8 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-green-400" />
            Standart Betonarme Temel Özellikleri
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Temel Boyutu", value: "50 cm × 50 cm", desc: "Kare kesitli sürekli temel" },
              { label: "Donatı Çapı", value: "Ø 12 mm", desc: "B500C ribalı çelik donatı" },
              { label: "Beton Sınıfı", value: "C30 / 37", desc: "TS EN 206 standartına uygun" },
              { label: "Ankraj", value: "Paslanmaz Çelik", desc: "AISI 304 kalite ankraj cıvata" },
              { label: "Kömür Levha", value: "10 mm EPS", desc: "Isı yalıtımlı köpük levha" },
              { label: "Su Yalıtımı", value: "2 kat Membran", desc: "Bitümlü su yalıtım örtüsü" },
              { label: "Sıkıştırma", value: "%95 Proctor", desc: "Zemin sıkıştırma oranı" },
              { label: "Eğim", value: "%1 - %1,5", desc: "Drenaja uygun yüzey eğimi" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-xs text-green-300 mb-1">{item.label}</div>
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Yapım Aşamaları Detaylı */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Aşama 1: Zemin Hazırlık */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Zemin Hazırlık ve İnşaat
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Arazi tesviyesi ve kotlama (lazer nivo ile)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Toprak sıkıştırma (%95 Proctor deneyi)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>15 cm stabilize tabaka (0-40 mm malzeme)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>10 cm mıcır tabaka (0-25 mm)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Çift kat drenaj sistemi (Ø110 PVC boru)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>20 cm C30/37 betonarme zemin</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Polyethylen buhar bariyeri (200 mikron)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Çift kat şok uygulama (vibrasyonla sıkıştırma)</span>
              </li>
            </ul>
          </div>

          {/* Aşama 2: Çelik Konstrüksiyon */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Çelik Konstrüksiyon
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>St37 kalite çelik profil karkas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>100×100×4 mm kare profil direkler</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Galvaniz kaplama (80 mikron, hot-dip)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Paslanmaz çelik ankraj cıvataları (M16×250)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Kaynak işlemleri MIG/MAG metodu ile</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Köşebent takviyesi ve çapraz bağlantılar</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Statik hesap ve rüzgar yükü analizi</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0 mt-0.5" />
                <span>Epoxy astar + son kat boya (RAL renk seçenekleri)</span>
              </li>
            </ul>
          </div>

          {/* Aşama 3: Zemin Kaplama */}
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Zemin Kaplama Sistemi
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Suni Çim:</strong> 55mm hav boyu, FIFA onaylı, 10.800 D-Tex</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Akrilik Zemin:</strong> 5 mm kaplama, 15 mm astar, ITF Classified</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Granül:</strong> EPDM veya SBR, 4-6 kg/m² dolgu</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Silis Kum:</strong> 25-40 kg/m² stabilizasyon katmanı</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Jeotekstil Keçe:</strong> 300 gr/m² ayırma tabakası</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Çizgi Boyası:</strong> Su bazlı, UV dayanımlı akrilik boya</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>Nem Dayanımı:</strong> Çift kat drenaj ile %100 su tahliye</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>UV Stabilizatör:</strong> 8+ yıl solmazlık garantisi</span>
              </li>
            </ul>
          </div>

          {/* Aşama 4: Aydınlatma ve Elektrik */}
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Aydınlatma ve Elektrik
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>200W LED projektör (meanwell sürücü)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>8 adet direk (8-12 metre yükseklik)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>500 lux ortalama aydınlatma şiddeti</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Homojen ışık dağılımı (Emin/Emax ≥ 0.7)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Topraklama sistemi (≤ 2 Ohm)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Otomatik kontrol paneli (zamanlayıcılı)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>Trafo ve jeneratör bağlantı hazırlığı</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>IP65 dış mekan koruma sınıfı</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Teknik ikonlar bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: <Droplets className="w-6 h-6" />, title: "Çift Kat Drenaj", desc: "%100 su tahliyesi" },
            { icon: <Shield className="w-6 h-6" />, title: "Nem Dayanımlı Çim", desc: "Mantar ve küf önleyici" },
            { icon: <Zap className="w-6 h-6" />, title: "LED Aydınlatma", desc: "500 lux homojen ışık" },
            { icon: <Layers className="w-6 h-6" />, title: "FIFA Çim Sistemi", desc: "Quality Pro onaylı" },
            { icon: <Ruler className="w-6 h-6" />, title: "Betonarme Zemin", desc: "C30/37 kalite" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <div className="text-green-600 flex justify-center mb-2">{item.icon}</div>
              <div className="font-semibold text-sm text-gray-800">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
