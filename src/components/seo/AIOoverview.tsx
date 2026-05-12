import { Calculator, FileCheck, Construction, Ruler } from "lucide-react";

interface AIOoverviewProps {
  cityName: string;
  serviceName?: string;
}

export default function AIOoverview({ cityName, serviceName = "Spor Sahası" }: AIOoverviewProps) {
  const baseService = serviceName.replace(`${cityName} `, "").trim();

  return (
    <section className="py-12 bg-white" aria-label="AI Overview">
      <div className="max-w-7xl mx-auto px-4">
        {/* AI Overview Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {cityName} {baseService} Yapımı — Genel Bakış
            </h2>
            <p className="text-sm text-gray-500">
              2026 güncel bilgiler · MYK belgeli ekip · TSE/CE sertifikalı
            </p>
          </div>
        </div>

        {/* 3 Kolon Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Kolon 1: Maliyet */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Maliyet (2026)</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Açık Halı Saha (20x40m)</span>
                <span className="font-bold text-green-700">280.000₺ - 480.000₺</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Kapalı Halı Saha (25x45m)</span>
                <span className="font-bold text-green-700">1.350.000₺ - 1.825.000₺</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Basketbol Sahası</span>
                <span className="font-bold text-green-700">126.000₺ - 216.000₺</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Tenis Kortu (akrilik)</span>
                <span className="font-bold text-green-700">256.000₺ - 448.000₺</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Voleybol Sahası</span>
                <span className="font-bold text-green-700">97.200₺ - 178.200₺</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-green-200/60">
                <span className="text-gray-700">Çok Amaçlı Saha</span>
                <span className="font-bold text-green-700">360.000₺ - 585.000₺</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span className="text-gray-700">Nizami Futbol (100x70m)</span>
                <span className="font-bold text-green-700">5.600.000₺ - 10.500.000₺</span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3 italic">
              * Net fiyat için ücretsiz keşif. Taksit imkanı mevcut.
            </p>
          </div>

          {/* Kolon 2: İzin & Yasal */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Gerekli İzinler</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-gray-800">Belediye Yapı Ruhsatı</strong>
                  <p className="text-gray-600">{cityName} Belediyesi'nden alınır. İkber Spor danışmanlık yapar.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-gray-800">İmar Durumu Belgesi</strong>
                  <p className="text-gray-600">Tapu ve Kadastro'dan alınır. Spor tesisleri için özel imar izni.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-gray-800">Çevre Düzenleme İzni</strong>
                  <p className="text-gray-600">Yeşil alan kullanımı ve çevre etki değerlendirmesi gerekebilir.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-gray-800">Elektrik & Su Bağlantısı</strong>
                  <p className="text-gray-600">TEDAŞ ve belediyeden altyapı bağlantı onayı.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
                <div>
                  <strong className="text-gray-800">Yangın Güvenlik Raporu</strong>
                  <p className="text-gray-600">Kapalı sahalarda zorunlu. İtfaiye müdürlüğü onayı.</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-100/50 rounded-lg">
              <p className="text-xs text-blue-700 font-medium">
                <FileCheck className="w-3 h-3 inline mr-1" />
                İkber Spor Yapıları olarak tüm ruhsat süreçlerinde ücretsiz danışmanlık sağlıyoruz.
              </p>
            </div>
          </div>

          {/* Kolon 3: Yapım Aşamaları + Teknik Şartname */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center gap-2 mb-4">
              <Construction className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">Yapım Aşamaları</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-gray-800">Ücretsiz Keşif (Gün 1-2)</strong>
                  <p className="text-gray-600">{cityName}'da yerinde inceleme, ölçüm ve toprak analizi.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-gray-800">Proje & Teklif (Gün 3-5)</strong>
                  <p className="text-gray-600">Mimari proje, statik hesap ve maliyet analizi.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-gray-800">Zemin Hazırlık (Gün 6-12)</strong>
                  <p className="text-gray-600">Tesviye, sıkıştırma, drenaj, betonarme zemin (C30/37).</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-gray-800">Kaplama & Montaj (Gün 13-25)</strong>
                  <p className="text-gray-600">Suni çim / akrilik zemin, direk, file, aydınlatma montajı.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
                <div>
                  <strong className="text-gray-800">Test & Teslim (Gün 26-30)</strong>
                  <p className="text-gray-600">FIFA/TBF/ITF testleri, son kontrol, anahtar teslim.</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-orange-100/50 rounded-lg">
              <p className="text-xs text-orange-700 font-medium">
                <Ruler className="w-3 h-3 inline mr-1" />
                Süreç toplam 15-30 gün. Hava koşullarına göre değişebilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
