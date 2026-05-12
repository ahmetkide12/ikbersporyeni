import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import MetaTags from "@/components/seo/MetaTags";
import { MapPin, ChevronRight, Users } from "lucide-react";

export default function CitiesList() {
  const { data: cityList } = trpc.city.list.useQuery();
  const { data: stats } = trpc.city.getStats.useQuery();

  const regions = [
    { name: "Akdeniz", cities: ["Adana", "Antalya", "Burdur", "Hatay", "Isparta", "Kahramanmaraş", "Mersin", "Osmaniye"] },
    { name: "Doğu Anadolu", cities: ["Ağrı", "Ardahan", "Bingöl", "Bitlis", "Elazığ", "Erzincan", "Erzurum", "Hakkari", "Iğdır", "Kars", "Malatya", "Muş", "Şırnak", "Tunceli", "Van"] },
    { name: "Ege", cities: ["Afyonkarahisar", "Aydın", "Denizli", "İzmir", "Kütahya", "Manisa", "Muğla", "Uşak"] },
    { name: "Güneydoğu Anadolu", cities: ["Adıyaman", "Batman", "Diyarbakır", "Gaziantep", "Mardin", "Siirt", "Şanlıurfa", "Kilis"] },
    { name: "İç Anadolu", cities: ["Aksaray", "Ankara", "Çankırı", "Eskişehir", "Karaman", "Kayseri", "Kırıkkale", "Kırşehir", "Konya", "Nevşehir", "Niğde", "Sivas", "Yozgat"] },
    { name: "Karadeniz", cities: ["Amasya", "Artvin", "Bartın", "Bayburt", "Bolu", "Çorum", "Düzce", "Giresun", "Gümüşhane", "Karabük", "Kastamonu", "Ordu", "Rize", "Samsun", "Sinop", "Tokat", "Trabzon", "Zonguldak"] },
    { name: "Marmara", cities: ["Balıkesir", "Bilecik", "Bursa", "Çanakkale", "Edirne", "İstanbul", "Kırklareli", "Kocaeli", "Sakarya", "Tekirdağ", "Yalova"] },
  ];

  // Statik fallback şehir listesi (DB boşsa veya yüklenmediyse)
  const staticCities = [
    { id: 1, name: "Adana", slug: "adana" }, { id: 2, name: "Adıyaman", slug: "adiyaman" },
    { id: 3, name: "Afyonkarahisar", slug: "afyonkarahisar" }, { id: 4, name: "Ağrı", slug: "agri" },
    { id: 5, name: "Amasya", slug: "amasya" }, { id: 6, name: "Ankara", slug: "ankara" },
    { id: 7, name: "Antalya", slug: "antalya" }, { id: 8, name: "Artvin", slug: "artvin" },
    { id: 9, name: "Aydın", slug: "aydin" }, { id: 10, name: "Balıkesir", slug: "balikesir" },
    { id: 11, name: "Bilecik", slug: "bilecik" }, { id: 12, name: "Bingöl", slug: "bingol" },
    { id: 13, name: "Bitlis", slug: "bitlis" }, { id: 14, name: "Bolu", slug: "bolu" },
    { id: 15, name: "Burdur", slug: "burdur" }, { id: 16, name: "Bursa", slug: "bursa" },
    { id: 17, name: "Çanakkale", slug: "canakkale" }, { id: 18, name: "Çankırı", slug: "cankiri" },
    { id: 19, name: "Çorum", slug: "corum" }, { id: 20, name: "Denizli", slug: "denizli" },
    { id: 21, name: "Diyarbakır", slug: "diyarbakir" }, { id: 22, name: "Edirne", slug: "edirne" },
    { id: 23, name: "Elazığ", slug: "elazig" }, { id: 24, name: "Erzincan", slug: "erzincan" },
    { id: 25, name: "Erzurum", slug: "erzurum" }, { id: 26, name: "Eskişehir", slug: "eskisehir" },
    { id: 27, name: "Gaziantep", slug: "gaziantep" }, { id: 28, name: "Giresun", slug: "giresun" },
    { id: 29, name: "Gümüşhane", slug: "gumushane" }, { id: 30, name: "Hakkari", slug: "hakkari" },
    { id: 31, name: "Hatay", slug: "hatay" }, { id: 32, name: "Isparta", slug: "isparta" },
    { id: 33, name: "Mersin", slug: "mersin" }, { id: 34, name: "İstanbul", slug: "istanbul" },
    { id: 35, name: "İzmir", slug: "izmir" }, { id: 36, name: "Kars", slug: "kars" },
    { id: 37, name: "Kastamonu", slug: "kastamonu" }, { id: 38, name: "Kayseri", slug: "kayseri" },
    { id: 39, name: "Kırklareli", slug: "kirklareli" }, { id: 40, name: "Kırşehir", slug: "kirsehir" },
    { id: 41, name: "Kocaeli", slug: "kocaeli" }, { id: 42, name: "Konya", slug: "konya" },
    { id: 43, name: "Kütahya", slug: "kutahya" }, { id: 44, name: "Malatya", slug: "malatya" },
    { id: 45, name: "Manisa", slug: "manisa" }, { id: 46, name: "Kahramanmaraş", slug: "kahramanmaras" },
    { id: 47, name: "Mardin", slug: "mardin" }, { id: 48, name: "Muğla", slug: "mugla" },
    { id: 49, name: "Muş", slug: "mus" }, { id: 50, name: "Nevşehir", slug: "nevsehir" },
    { id: 51, name: "Niğde", slug: "nigde" }, { id: 52, name: "Ordu", slug: "ordu" },
    { id: 53, name: "Rize", slug: "rize" }, { id: 54, name: "Sakarya", slug: "sakarya" },
    { id: 55, name: "Samsun", slug: "samsun" }, { id: 56, name: "Siirt", slug: "siirt" },
    { id: 57, name: "Sinop", slug: "sinop" }, { id: 58, name: "Sivas", slug: "sivas" },
    { id: 59, name: "Tekirdağ", slug: "tekirdag" }, { id: 60, name: "Tokat", slug: "tokat" },
    { id: 61, name: "Trabzon", slug: "trabzon" }, { id: 62, name: "Tunceli", slug: "tunceli" },
    { id: 63, name: "Şanlıurfa", slug: "sanliurfa" }, { id: 64, name: "Uşak", slug: "usak" },
    { id: 65, name: "Van", slug: "van" }, { id: 66, name: "Yozgat", slug: "yozgat" },
    { id: 67, name: "Zonguldak", slug: "zonguldak" }, { id: 68, name: "Aksaray", slug: "aksaray" },
    { id: 69, name: "Bayburt", slug: "bayburt" }, { id: 70, name: "Karaman", slug: "karaman" },
    { id: 71, name: "Kırıkkale", slug: "kirikkale" }, { id: 72, name: "Batman", slug: "batman" },
    { id: 73, name: "Şırnak", slug: "sirnak" }, { id: 74, name: "Bartın", slug: "bartin" },
    { id: 75, name: "Ardahan", slug: "ardahan" }, { id: 76, name: "Iğdır", slug: "igdir" },
    { id: 77, name: "Yalova", slug: "yalova" }, { id: 78, name: "Karabük", slug: "karabuk" },
    { id: 79, name: "Kilis", slug: "kilis" }, { id: 80, name: "Osmaniye", slug: "osmaniye" },
    { id: 81, name: "Düzce", slug: "duzce" },
  ];

  const cities = cityList && cityList.length > 0 ? cityList : staticCities;

  return (
    <>
      <MetaTags
        title="81 İl Spor Sahası Yapımı | İkber Spor Yapıları"
        description="Türkiye'nin 81 ilinde halı saha, basketbol sahası, tenis kortu yapımı. Her şehir için özel sayfalar ve güncel fiyat bilgileri."
      />

      <section className="bg-gradient-to-br from-green-700 to-green-800 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            81 İlde <span className="text-green-200">Hizmetinizdeyiz</span>
          </h1>
          <p className="text-green-100 text-lg max-w-2xl">
            Türkiye'nin dört bir yanında profesyonel spor sahası yapım hizmeti. 
            Şehrinize özel sayfalar ve güncel bilgiler.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-white text-sm">
              <Users className="w-4 h-4 inline mr-2" />
              {stats?.total || 81} İl
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {regions.map((region) => {
            const regionCities = cities.filter((c) => region.cities.includes(c.name));
            if (regionCities.length === 0) return null;
            return (
              <div key={region.name} className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" /> {region.name} Bölgesi
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {regionCities.map((city) => (
                    <Link
                      key={city.id}
                      to={`/sehir/${city.slug}`}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl px-4 py-3 transition-all group"
                    >
                      <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 truncate">
                        {city.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-green-500 ml-auto shrink-0" />
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
