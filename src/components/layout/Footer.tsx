import { Link } from "react-router";
import {
  Phone, Mail, MapPin, Globe, ArrowUp, Shield, Award, Clock, Users,
  Facebook, Instagram, Youtube, Linkedin, CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetlerimiz", href: "/hizmetler" },
    { name: "Şehirler", href: "/sehirler" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const services = [
    { name: "Halı Saha Yapımı", href: "/hizmet/hali-saha-yapimi" },
    { name: "Kapalı Halı Saha", href: "/hizmet/kapali-hali-saha-yapimi" },
    { name: "Açık Halı Saha", href: "/hizmet/acik-hali-saha-yapimi" },
    { name: "Basketbol Sahası", href: "/hizmet/basketbol-sahasi-yapimi" },
    { name: "Tenis Kortu", href: "/hizmet/tenis-kortu-yapimi" },
    { name: "Voleybol Sahası", href: "/hizmet/voleybol-sahasi-yapimi" },
    { name: "Çok Amaçlı Saha", href: "/hizmet/cok-amacli-saha-yapimi" },
    { name: "Nizami Futbol Sahası", href: "/hizmet/nizami-futbol-sahasi-yapimi" },
    { name: "Çelik Konstrüksiyon", href: "/hizmet/celik-konstruksiyon" },
    { name: "Suni Çim Kaplama", href: "/hizmet/suni-cim-saha-kaplama" },
    { name: "Akrilik Zemin", href: "/hizmet/akrilik-zemin-kaplama" },
    { name: "Padel Kortu", href: "/hizmet/padel-kortu-yapimi" },
  ];

  return (
    <footer className="bg-gray-900 text-white" itemScope itemType="https://schema.org/LocalBusiness">
      {/* Hidden Schema.org NAP data for E-A-T */}
      <meta itemProp="name" content="İkber Spor Yapıları" />
      <meta itemProp="telephone" content="+905426125610" />
      <meta itemProp="email" content="ikberspor@ikberspor.com" />
      <meta itemProp="url" content="https://ikberspor.com" />
      <meta itemProp="priceRange" content="₺₺₺" />
      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
        <meta itemProp="addressCountry" content="TR" />
        <meta itemProp="addressLocality" content="Ankara" />
        <meta itemProp="addressRegion" content="Ankara" />
      </div>
      <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" className="hidden">
        <meta itemProp="ratingValue" content="4.9" />
        <meta itemProp="bestRating" content="5" />
        <meta itemProp="reviewCount" content="2000" />
      </div>

      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Projenizi Hayata Geçirelim
            </h3>
            <p className="text-green-100 mt-1">
              Ücretsiz keşif ve fiyat teklifi için hemen bize ulaşın — 7/24 WhatsApp hattı
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+905426125610"
              className="flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5" /> 0542 612 56 10
            </a>
            <a
              href="https://wa.me/905426125610"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-400 transition-all"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Trust / E-A-T Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Shield className="w-6 h-6" />, label: "MYK Belgeli Ekip", sub: "Mesleki Yeterlilik Belgesi" },
              { icon: <Award className="w-6 h-6" />, label: "TSE/CE Sertifikalı", sub: "Kaliteli Malzeme Garantisi" },
              { icon: <Clock className="w-6 h-6" />, label: "30+ Yıllık Tecrübe", sub: "1992'den Beri Güvenle" },
              { icon: <Users className="w-6 h-6" />, label: "2.000+ Mutlu Müşteri", sub: "81 İlde Hizmet Ağı" },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <div className="text-green-400">{t.icon}</div>
                <div>
                  <div className="font-semibold text-sm text-white">{t.label}</div>
                  <div className="text-xs text-gray-500">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold mb-4">
              <span className="text-green-400">İKBER</span>
              <span className="text-orange-400">SPOR</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              <strong className="text-white">1992 yılından bu yana</strong> Türkiye'nin 81 ilinde profesyonel spor
              sahası yapım hizmetleri sunuyoruz. Anahtar teslim, MYK belgeli
              ekip, TSE/CE sertifikalı malzeme.
            </p>
            {/* Sertifikalar */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["MYK", "TSE", "CE", "FIFA"].map((cert) => (
                <span key={cert} className="px-2 py-1 bg-green-900/50 border border-green-700 rounded text-xs text-green-300 font-medium">
                  <CheckCircle2 className="w-3 h-3 inline mr-1" />{cert}
                </span>
              ))}
            </div>
            {/* Sosyal Medya */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/ikberspor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ikberspor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@ikberspor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ikberspor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-green-400">
              Hızlı Linkler
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-bold mb-4 text-green-400">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-2">
              {services.slice(0, 8).map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/hizmetler" className="text-green-400 text-sm font-medium hover:text-green-300">
                  +12 Daha Fazla →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact — NAP Tutarlılığı */}
          <div>
            <h4 className="text-base font-bold mb-4 text-green-400">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <a href="tel:+905426125610" className="hover:text-white font-semibold" itemProp="telephone">
                  0542 612 56 10
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <a href="https://wa.me/905426125610" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp: 0542 612 56 10
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <a href="mailto:ikberspor@ikberspor.com" className="hover:text-white" itemProp="email">
                  ikberspor@ikberspor.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Globe className="w-4 h-4 text-green-400 shrink-0" />
                <a href="https://www.ikberspor.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  www.ikberspor.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">81 İl</strong> — Türkiye Geneli Hizmet<br />
                  <span className="text-xs text-gray-500">Ana ofis: Ankara / Merkez</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Pzt-Cum:</strong> 08:00 - 18:00<br />
                  <strong className="text-white">Cmt:</strong> 09:00 - 17:00
                </span>
              </li>
            </ul>

            {/* Ödeme */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-2">Ödeme Seçenekleri</p>
              <div className="flex flex-wrap gap-1.5">
                {["Nakit", "Kredi Kartı", "Havale", "Taksit"].map((p) => (
                  <span key={p} className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 1992-2026 İkber Spor Yapıları. Tüm Hakları Saklıdır. |
            <Link to="/hakkimizda" className="hover:text-gray-300 ml-1">Hakkımızda</Link> |
            <Link to="/iletisim" className="hover:text-gray-300 ml-1">İletişim</Link> |
            <span className="ml-1">Türkiye'nin Lider Spor Sahası Yapım Firması</span>
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
            aria-label="Yukarı Çık"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
