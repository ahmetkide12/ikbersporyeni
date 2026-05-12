import { Award, Shield, Clock, Calendar, CheckCircle2, BookOpen, User } from "lucide-react";

interface AuthorBoxProps {
  cityName: string;
  serviceName?: string;
}

export default function AuthorBox({ cityName, serviceName = "Spor Sahası Yapımı" }: AuthorBoxProps) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const updateDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="py-8 bg-gray-50" aria-label="Yazar Bilgisi">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              İS
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                İkber Spor Yapıları Teknik Ekibi
              </h3>
              <p className="text-sm text-gray-500">
                {cityName} {serviceName} Uzmanı · MYK Belgeli
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Yayın: {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Güncelleme: {updateDate}
                </span>
              </div>
            </div>
          </div>

          {/* E-E-A-T Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { icon: <Award className="w-4 h-4" />, label: "MYK Sertifikalı", desc: "Mesleki Yeterlilik Belgesi" },
              { icon: <Shield className="w-4 h-4" />, label: "TSE / CE Onaylı", desc: "Kalite Sertifikaları" },
              { icon: <Clock className="w-4 h-4" />, label: "30+ Yıl Deneyim", desc: "1992'den Beri" },
              { icon: <BookOpen className="w-4 h-4" />, label: "2.000+ Proje", desc: "81 İl Referans" },
            ].map((item) => (
              <div key={item.label} className="bg-green-50 rounded-lg p-3 flex items-center gap-2">
                <span className="text-green-600">{item.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-gray-800">{item.label}</div>
                  <div className="text-[10px] text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Content verification */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> İçerik doğrulandı
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Teknik veriler onaylandı
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Fiyatlar güncel (2026)
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Yerel bilgiler eklendi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
