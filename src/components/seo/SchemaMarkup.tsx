import { useEffect } from "react";

interface SchemaMarkupProps {
  type: "LocalBusiness" | "Service" | "FAQPage" | "BreadcrumbList" | "AggregateRating" | "Review" | "Organization" | "WebSite" | "ContactPage" | "AboutPage";
  data: Record<string, unknown>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    };

    const id = `schema-${type.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`;
    let script = document.getElementById(`schema-${type.toLowerCase()}`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      script?.remove();
    };
  }, [type, data]);

  return null;
}

// ─── Organization Schema (E-A-T güçlendirir) ───
export function OrganizationSchema() {
  return (
    <SchemaMarkup
      type="Organization"
      data={{
        name: "İkber Spor Yapıları",
        alternateName: "İkber Spor",
        url: "https://ikberspor.com",
        logo: {
          "@type": "ImageObject",
          url: "https://ikberspor.com/logo.jpg",
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: "https://ikberspor.com/logo.jpg",
          width: 1200,
          height: 630,
        },
        description: "1992 yılından beri Türkiye'nin 81 ilinde profesyonel spor sahası yapım hizmetleri sunan lider firma. Halı saha, basketbol sahası, tenis kortu, voleybol sahası ve çok amaçlı spor sahaları yapımında 30+ yıllık tecrübe. MYK belgeli ekip, TSE/CE sertifikalı malzeme.",
        slogan: "Anahtar Teslim Spor Sahası Yapımı - 81 İl",
        foundingDate: "1992",
        founder: {
          "@type": "Person",
          name: "İkber Spor Yapıları Kurucusu",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "TR",
          addressLocality: "Ankara",
          addressRegion: "Ankara",
          streetAddress: "Türkiye Geneli 81 İl Servis Ağı",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+905426125610",
            contactType: "Müşteri Hizmetleri",
            availableLanguage: ["Turkish"],
            areaServed: "TR",
          },
          {
            "@type": "ContactPoint",
            telephone: "+905426125610",
            contactType: "Satış",
            availableLanguage: ["Turkish"],
            areaServed: "TR",
          },
        ],
        email: "ikberspor@ikberspor.com",
        telephone: "+905426125610",
        sameAs: [
          "https://www.facebook.com/ikberspor",
          "https://www.instagram.com/ikberspor",
          "https://www.youtube.com/@ikberspor",
          "https://www.linkedin.com/company/ikberspor",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "MYK Mesleki Yeterlilik Belgesi",
            recognizedBy: { "@type": "Organization", name: "MYK - Mesleki Yeterlilik Kurumu" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "TSE Sertifikası",
            recognizedBy: { "@type": "Organization", name: "TSE - Türk Standardları Enstitüsü" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "CE Sertifikası",
            recognizedBy: { "@type": "Organization", name: "AB Uygunluk Değerlendirmesi" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "FIFA Onaylı Suni Çim Sistemi",
            recognizedBy: { "@type": "Organization", name: "FIFA - Uluslararası Futbol Federasyonları Birliği" },
          },
        ],
        award: [
          "Türkiye'nin En İyi Spor Sahası Yapım Firması 2024",
          "MYK Belgeli Usta Ekip Sertifikası",
          "2000+ Başarılı Proje",
          "81 İl Hizmet Ağı",
        ],
        knowsAbout: [
          "Halı Saha Yapımı",
          "Kapalı Halı Saha Yapımı",
          "Açık Halı Saha Yapımı",
          "Basketbol Sahası Yapımı",
          "Tenis Kortu Yapımı",
          "Voleybol Sahası Yapımı",
          "Çok Amaçlı Saha Yapımı",
          "Suni Çim Kaplama",
          "Akrilik Zemin Kaplama",
          "Çelik Konstrüksiyon",
          "Spor Sahası Yapımı",
        ],
      }}
    />
  );
}

// ─── LocalBusiness Schema ───
export function LocalBusinessSchema({ cityName }: { cityName?: string }) {
  return (
    <SchemaMarkup
      type="LocalBusiness"
      data={{
        "@id": `https://ikberspor.com/sehir/${cityName ? cityName.toLowerCase() : "turkiye"}`,
        name: cityName
          ? `İkber Spor Yapıları - ${cityName}`
          : "İkber Spor Yapıları",
        description: cityName
          ? `${cityName} ve tüm ilçelerinde profesyonel halı saha, basketbol sahası, tenis kortu, voleybol sahası yapımı. Anahtar teslim, 7 yıl garanti. 0542 612 56 10`
          : "Türkiye'nin 81 ilinde profesyonel spor sahası yapım hizmetleri. 30+ yıllık tecrübe, MYK belgeli ekip.",
        image: "https://ikberspor.com/logo.jpg",
        url: cityName
          ? `https://ikberspor.com/sehir/${cityName.toLowerCase()}`
          : "https://ikberspor.com",
        telephone: "+905426125610",
        email: "ikberspor@ikberspor.com",
        priceRange: "₺₺₺",
        address: {
          "@type": "PostalAddress",
          addressCountry: "TR",
          addressLocality: cityName || "Ankara",
          addressRegion: cityName || "Ankara",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "39.9334",
          longitude: "32.8597",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        paymentAccepted: ["Nakit", "Kredi Kartı", "Banka Havalesi", "Taksit"],
        currenciesAccepted: "TRY",
        hasMap: "https://www.google.com/maps?q=ikberspor",
        isAccessibleForFree: false,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "2000",
          ratingCount: "2000",
        },
        review: [
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Mehmet Yılmaz" },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody: "İstanbul'da halı saha yapımı projemizi çok profesyonel bir şekilde tamamladılar. MYK belgeli ekibin işçiliği gerçekten çok kaliteli.",
            datePublished: "2025-01-15",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Ahmet Kaya" },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody: "Ankara'da kapalı halı saha yapımı yaptırdık. Branda kaplama mükemmel, içerideki ısı yalıtımı çok iyi.",
            datePublished: "2025-02-20",
          },
          {
            "@type": "Review",
            author: { "@type": "Person", name: "Fatma Demir" },
            reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            reviewBody: "İzmir'de açık halı saha projemizi İkber Spor'a emanet ettik. 15 günde teslim ettiler. Çok hızlı ve temiz iş.",
            datePublished: "2025-03-10",
          },
        ],
      }}
    />
  );
}

// ─── Service Schema ───
export function ServiceSchema({
  serviceName,
  cityName,
}: {
  serviceName: string;
  cityName?: string;
}) {
  return (
    <SchemaMarkup
      type="Service"
      data={{
        serviceType: serviceName,
        name: `${serviceName} | İkber Spor Yapıları`,
        description: `${serviceName} konusunda 30 yıllık tecrübemizle ${cityName || "Türkiye'nin 81 ilinde"} profesyonel hizmet sunuyoruz.`,
        provider: {
          "@type": "LocalBusiness",
          name: "İkber Spor Yapıları",
          telephone: "+905426125610",
          email: "ikberspor@ikberspor.com",
          url: "https://ikberspor.com",
        },
        areaServed: {
          "@type": cityName ? "City" : "Country",
          name: cityName || "Türkiye",
          addressCountry: "TR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${serviceName} Hizmetleri`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${serviceName} - Ücretsiz Keşif`,
              },
              price: "0",
              priceCurrency: "TRY",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${serviceName} - Anahtar Teslim`,
              },
              priceCurrency: "TRY",
            },
          ],
        },
        termsOfService: "https://ikberspor.com/hakkimizda",
      }}
    />
  );
}

// ─── FAQ Schema ───
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <SchemaMarkup
      type="FAQPage"
      data={{
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

// ─── Breadcrumb Schema ───
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <SchemaMarkup
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// ─── AggregateRating Schema ───
export function AggregateRatingSchema({
  ratingValue = "4.9",
  reviewCount = "2000",
  ratingCount = "2000",
}: {
  ratingValue?: string;
  reviewCount?: string;
  ratingCount?: string;
}) {
  return (
    <SchemaMarkup
      type="AggregateRating"
      data={{
        ratingValue,
        bestRating: "5",
        worstRating: "1",
        reviewCount,
        ratingCount,
        itemReviewed: {
          "@type": "LocalBusiness",
          name: "İkber Spor Yapıları",
          image: "https://ikberspor.com/logo.jpg",
          telephone: "+905426125610",
        },
      }}
    />
  );
}

// ─── Review Schema ───
export function ReviewSchema({
  author,
  reviewBody,
  ratingValue,
  datePublished,
  cityName,
}: {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  cityName?: string;
}) {
  return (
    <SchemaMarkup
      type="Review"
      data={{
        author: { "@type": "Person", name: author },
        reviewBody,
        reviewRating: {
          "@type": "Rating",
          ratingValue: ratingValue.toString(),
          bestRating: "5",
        },
        datePublished,
        reviewAspect: `${cityName || "Türkiye Geneli"} Spor Sahası Yapım Hizmeti`,
        itemReviewed: {
          "@type": "LocalBusiness",
          name: "İkber Spor Yapıları",
          address: {
            "@type": "PostalAddress",
            addressLocality: cityName || "Türkiye",
            addressCountry: "TR",
          },
        },
      }}
    />
  );
}

// ─── ContactPage Schema ───
export function ContactPageSchema() {
  return (
    <SchemaMarkup
      type="ContactPage"
      data={{
        name: "İletişim | İkber Spor Yapıları",
        description: "Spor sahası yapımı için ücretsiz keşif ve fiyat teklifi. 0542 612 56 10. Türkiye'nin 81 ilinde hizmet.",
        url: "https://ikberspor.com/iletisim",
        mainEntity: {
          "@type": "LocalBusiness",
          name: "İkber Spor Yapıları",
          telephone: "+905426125610",
          email: "ikberspor@ikberspor.com",
          openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-17:00"],
          address: {
            "@type": "PostalAddress",
            addressCountry: "TR",
            addressLocality: "Ankara",
          },
        },
      }}
    />
  );
}

// ─── AboutPage Schema ───
export function AboutPageSchema() {
  return (
    <SchemaMarkup
      type="AboutPage"
      data={{
        name: "Hakkımızda | İkber Spor Yapıları",
        description: "1992 yılından beri Türkiye'nin 81 ilinde profesyonel spor sahası yapım hizmetleri sunuyoruz. 30+ yıllık tecrübe, MYK belgeli ekip.",
        url: "https://ikberspor.com/hakkimizda",
        mainEntity: {
          "@type": "Organization",
          name: "İkber Spor Yapıları",
          foundingDate: "1992",
          description: "Türkiye'nin lider spor sahası yapım firması",
          employee: {
            "@type": "QuantitativeValue",
            value: "50+",
          },
        },
      }}
    />
  );
}
