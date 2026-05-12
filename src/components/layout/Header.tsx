import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { trpc } from "@/providers/trpc";
import {
  Menu,
  Phone,
  ChevronDown,
  Search,
  X,
  MapPin,
  Settings,
  Star,
} from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const { data: cityResults } = trpc.city.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length >= 2 }
  );
  const { data: serviceResults } = trpc.service.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length >= 2 }
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainServices = [
    { name: "Halı Saha Yapımı", slug: "hali-saha-yapimi" },
    { name: "Kapalı Halı Saha", slug: "kapali-hali-saha-yapimi" },
    { name: "Açık Halı Saha", slug: "acik-hali-saha-yapimi" },
    { name: "Basketbol Sahası", slug: "basketbol-sahasi-yapimi" },
    { name: "Tenis Kortu", slug: "tenis-kortu-yapimi" },
    { name: "Voleybol Sahası", slug: "voleybol-sahasi-yapimi" },
    { name: "Çok Amaçlı Saha", slug: "cok-amacli-saha-yapimi" },
    { name: "Nizami Futbol Sahası", slug: "nizami-futbol-sahasi-yapimi" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100"
          : "bg-white shadow-sm"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> 0542 612 56 10
            </span>
            <span className="hidden sm:inline">ikberspor@ikberspor.com</span>
          </div>
          <span className="hidden md:inline">
            30+ Yıllık Tecrübe | 81 İl Hizmet | MYK Belgeli Ekip
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <div className="text-xl lg:text-2xl font-extrabold tracking-tight">
              <span className="text-green-600">İKBER</span>
              <span className="text-orange-500">SPOR</span>
            </div>
            <span className="text-[10px] lg:text-xs text-gray-500 font-medium hidden sm:block -mt-3 ml-1">
              YAPILARI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50">
              Ana Sayfa
            </Link>
            <Link to="/hakkimizda" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50">
              Hakkımızda
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50 flex items-center gap-1">
                Hizmetlerimiz <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {mainServices.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/hizmet/${s.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link to="/hizmetler" className="block px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg">
                      Tüm Hizmetler →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/sehirler" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Şehirler
            </Link>
            <Link to="/iletisim" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-md hover:bg-green-50">
              İletişim
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {showSearch ? (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Şehir veya hizmet ara..."
                  className="w-48 lg:w-64 px-4 py-2 text-sm border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                  autoFocus
                />
                <button
                  onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
                {(cityResults?.length || serviceResults?.length) ? (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-xl border border-gray-100 w-72 z-50">
                    {cityResults?.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { navigate(`/sehir/${c.slug}`); setShowSearch(false); setSearchQuery(""); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-green-500" /> {c.name}
                      </button>
                    ))}
                    {serviceResults?.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { navigate(`/hizmet/${s.slug}`); setShowSearch(false); setSearchQuery(""); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4 text-orange-500" /> {s.name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* CTA */}
            <a
              href="tel:+905426125610"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              <Phone className="w-4 h-4" /> 0542 612 56 10
            </a>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="flex flex-col gap-1 mt-6">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    Ana Sayfa
                  </Link>
                  <Link to="/hakkimizda" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    Hakkımızda
                  </Link>
                  <Link to="/hizmetler" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    Tüm Hizmetler
                  </Link>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Popüler Hizmetler</div>
                  {mainServices.map((s) => (
                    <Link key={s.slug} to={`/hizmet/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-orange-400" /> {s.name}
                    </Link>
                  ))}
                  <Link to="/sehirler" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    <MapPin className="w-4 h-4 inline mr-2" /> 81 İl
                  </Link>
                  <Link to="/iletisim" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
                    İletişim
                  </Link>
                  <a href="tel:+905426125610" className="mt-4 mx-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full font-semibold">
                    <Phone className="w-4 h-4" /> Bizi Arayın
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
