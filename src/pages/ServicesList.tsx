import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import {
  ChevronRight, Award, Settings, Package, HelpCircle,
  Building2, Layers,
} from "lucide-react";

export default function ServicesList() {
  const { data: serviceList } = trpc.service.list.useQuery();
  const { data: categories } = trpc.service.getCategories.useQuery();

  const services = serviceList || [];
  const cats = categories || [];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "saha-yapimi": return <Award className="w-5 h-5" />;
      case "zemin": return <Layers className="w-5 h-5" />;
      case "yapi": return <Building2 className="w-5 h-5" />;
      case "urun": return <Package className="w-5 h-5" />;
      case "hizmet": return <Settings className="w-5 h-5" />;
      case "bilgi": return <HelpCircle className="w-5 h-5" />;
      case "firma": return <Building2 className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "saha-yapimi": return "Saha Yapımı";
      case "zemin": return "Zemin Kaplama";
      case "yapi": return "Yapı İşleri";
      case "urun": return "Ürün Satışı";
      case "hizmet": return "Bakım & Onarım";
      case "bilgi": return "Bilgi & Fiyat";
      case "firma": return "Firma Hizmetleri";
      default: return cat;
    }
  };

  return (
    <>
      <MetaTags
        title="Spor Sahası Yapım Hizmetlerimiz | İkber Spor Yapıları"
        description="Halı saha, basketbol sahası, tenis kortu, voleybol sahası ve çok amaçlı spor sahaları yapımı. 30 yıllık tecrübe, anahtar teslim hizmet."
      />

      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Anahtar teslim spor tesisleri yapımında Türkiye'nin lider firması. 
            Tüm hizmetlerimizi keşfedin.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {cats.filter((c): c is string => c !== null).map((cat) => {
            const catServices = services.filter((s) => s.category === cat);
            if (catServices.length === 0) return null;
            return (
              <div key={cat} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-600">{getCategoryIcon(cat)}</span>
                  {getCategoryLabel(cat)}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catServices.map((svc) => (
                    <Link
                      key={svc.id}
                      to={`/hizmet/${svc.slug}`}
                      className="group flex items-start gap-4 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl px-5 py-4 transition-all"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors text-sm">
                          {svc.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {svc.shortDescription}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
