import MetaTags from "@/components/seo/MetaTags";
import { LocalBusinessSchema } from "@/components/seo/SchemaMarkup";
import {
  Phone, Award, Users, Shield, Clock, Globe, CheckCircle2,
  TrendingUp, Zap, MessageCircle,
} from "lucide-react";

const milestones = [
  { year: "1992", text: "İkber Spor Yapıları'nın kuruluşu" },
  { year: "1995", text: "İlk kapalı halı saha projesi" },
  { year: "2000", text: "81 ilde hizmet ağı" },
  { year: "2005", text: "MYK belgeli uzman kadro" },
  { year: "2010", text: "1000. proje tamamlama" },
  { year: "2015", text: "TSE ve CE sertifikasyonu" },
  { year: "2020", text: "2000. proje tamamlama" },
  { year: "2026", text: "Yapay zeka destekli SEO sistemi" },
];

export default function About() {
  return (
    <>
      <MetaTags
        title="Hakkımızda | İkber Spor Yapıları | 30+ Yıllık Tecrübe"
        description="1992'den beri Türkiye'nin 81 ilinde profesyonel spor sahası yapım hizmetleri. MYK belgeli ekip, TSE/CE sertifikalı malzeme. 30+ yıl, 2000+ proje."
      />
      <LocalBusinessSchema />

      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Hakkımızda</h1>
          <p className="text-green-100 text-lg max-w-2xl">
            1992'den beri Türkiye'nin en güvenilir spor sahası yapım firması.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Türkiye'nin <span className="text-green-600">Lider</span> Spor Sahası Yapım Firması
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  İkber Spor Yapıları, 1992 yılından bu yana Türkiye'nin dört bir yanında profesyonel spor sahası yapım hizmetleri sunmaktadır. 
                  30 yılı aşkın tecrübemizle halı saha, basketbol sahası, tenis kortu, voleybol sahası ve çok amaçlı spor sahaları yapımında 
                  sektörün öncü firmasıyız.
                </p>
                <p>
                  MYK (Mesleki Yeterlilik Kurumu) belgeli uzman kadromuz, TSE ve CE sertifikalı ürünlerimizle en yüksek kalitede hizmet sunuyoruz. 
                  Anahtar teslim projelerimizde %100 müşteri memnuniyeti ilkesiyle çalışıyoruz.
                </p>
                <p>
                  81 ilde hizmet veren firmamız, 2000'den fazla başarılı projeye imza atmıştır. 
                  FIFA, TBF, ITF ve FIVB standartlarında spor tesisleri inşa ediyoruz.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: <Award className="w-5 h-5" />, v: "30+", l: "Yıl Tecrübe" },
                  { icon: <Users className="w-5 h-5" />, v: "2000+", l: "Proje" },
                  { icon: <Shield className="w-5 h-5" />, v: "MYK", l: "Belgeli Ekip" },
                  { icon: <Globe className="w-5 h-5" />, v: "81", l: "İl Hizmet" },
                ].map((s) => (
                  <div key={s.l} className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="text-green-600">{s.icon}</div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{s.v}</div>
                      <div className="text-xs text-gray-500">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Neden Bizi Tercih Etmelisiniz?</h3>
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, t: "Kaliteli Malzeme", d: "TSE ve CE sertifikalı ürünler" },
                  { icon: <Users className="w-5 h-5" />, t: "Uzman Ekip", d: "MYK belgeli personel" },
                  { icon: <Clock className="w-5 h-5" />, t: "Zamanında Teslim", d: "Söz verdiğimiz tarihte" },
                  { icon: <Shield className="w-5 h-5" />, t: "7 Yıl Garanti", d: "Tüm projelerimizde" },
                  { icon: <Zap className="w-5 h-5" />, t: "Anahtar Teslim", d: "Tek noktadan çözüm" },
                  { icon: <TrendingUp className="w-5 h-5" />, t: "Uygun Fiyat", d: "Kaliteden ödün vermeden" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <div className="text-green-300">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm">{item.t}</div>
                      <div className="text-green-200 text-xs">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            <span className="text-green-600">Tarihçemiz</span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} gap-4`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 inline-block">
                      <div className="text-green-600 font-bold text-lg">{m.year}</div>
                      <div className="text-sm text-gray-600">{m.text}</div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Profesyonel Ekibimizle Tanışın
          </h2>
          <p className="text-green-100 mb-8">
            30 yıllık tecrübemizle projenizi hayata geçirelim.
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
