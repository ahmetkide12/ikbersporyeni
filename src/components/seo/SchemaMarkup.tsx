import { useEffect } from "react";

interface SchemaMarkupProps {
  type: "LocalBusiness" | "Service" | "FAQPage" | "BreadcrumbList" | "AggregateRating" | "Review";
  data: Record<string, unknown>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    };

    const id = `schema-${type.toLowerCase()}`;
    let script = document.getElementById(id) as HTMLScriptElement;
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

// Pre-built schemas
export function LocalBusinessSchema({ cityName }: { cityName?: string }) {
  return (
    <SchemaMarkup
      type="LocalBusiness"
      data={{
        name: cityName
          ? `İkber Spor Yapıları - ${cityName}`
          : "İkber Spor Yapıları",
        image: "https://ikberspor.com/logo.jpg",
        url: "https://ikberspor.com",
        telephone: "+905426125610",
        email: "ikberspor@ikberspor.com",
        priceRange: "₺₺₺",
        address: {
          "@type": "PostalAddress",
          addressCountry: "TR",
          addressLocality: cityName || "Türkiye",
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          reviewCount: "2000",
        },
      }}
    />
  );
}

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
        provider: {
          "@type": "LocalBusiness",
          name: "İkber Spor Yapıları",
          telephone: "+905426125610",
        },
        areaServed: {
          "@type": "City",
          name: cityName || "Türkiye",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Spor Sahası Yapım Hizmetleri",
        },
      }}
    />
  );
}

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
