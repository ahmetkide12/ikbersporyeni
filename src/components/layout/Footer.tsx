import { Link } from "react-router";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowUp,
  Facebook,
  Instagram,
  Youtube,
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
    { name: "Basketbol Sahası", href: "/hizmet/basketbol-sahasi-yapimi" },
    { name: "Tenis Kortu", href: "/hizmet/tenis-kortu-yapimi" },
    { name: "Voleybol Sahası", href: "/hizmet/voleybol-sahasi-yapimi" },
    { name: "Çok Amaçlı Saha", href: "/hizmet/cok-amacli-saha-yapimi" },
  ];

  const _cities = [
    { name: "İstanbul", href: "/sehir/istanbul" },
    { name: "Ankara", href: "/sehir/ankara" },
    { name: "İzmir", href: "/sehir/izmir" },
    { name: "Bursa", href: "/sehir/bursa" },
    { name: "Antalya", href: "/sehir/antalya" },
    { name: "Adana", href: "/sehir/adana" },
  ];
  void _cities;

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Projenizi Hayata Geçirelim
            </h3>
            <p className="text-green-100 mt-1">
              Ücretsiz keşif ve fiyat teklifi için hemen bize ulaşın
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
              WhatsApp
            </a>
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
              1992 yılından bu yana Türkiye'nin 81 ilinde profesyonel spor
              sahası yapım hizmetleri sunuyoruz. Anahtar teslim, MYK belgeli
              ekip, TSE/CE sertifikalı malzeme.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
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
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    to={s.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold mb-4 text-green-400">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <a href="tel:+905426125610" className="hover:text-white">
                  0542 612 56 10
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href="mailto:ikberspor@ikberspor.com"
                  className="hover:text-white"
                >
                  ikberspor@ikberspor.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Globe className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href="https://www.ikberspor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  www.ikberspor.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>81 İl - Türkiye Geneli Hizmet</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 İkber Spor Yapıları. Tüm Hakları Saklıdır.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
