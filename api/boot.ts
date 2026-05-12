import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";

const app = new Hono<{ Bindings: HttpBindings }>();

// ─── robots.txt ───
app.get("/robots.txt", (c) => {
  const baseUrl = "https://ikberspor.com";
  const robots = `User-agent: *
Allow: /
Disallow: /login
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay: 1

User-agent: Googlebot
Allow: /
Disallow: /login

User-agent: Bingbot
Allow: /
Disallow: /login
`;
  return c.text(robots, 200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=86400",
  });
});

// ─── sitemap.xml ───
app.get("/sitemap.xml", async (c) => {
  const baseUrl = "https://ikberspor.com";
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/hakkimizda", priority: "0.8", changefreq: "weekly" },
    { url: "/hizmetler", priority: "0.9", changefreq: "weekly" },
    { url: "/sehirler", priority: "0.9", changefreq: "weekly" },
    { url: "/iletisim", priority: "0.8", changefreq: "monthly" },
  ];

  // Services (55+)
  const serviceSlugs = [
    "hali-saha-yapimi", "kapali-hali-saha-yapimi", "acik-hali-saha-yapimi",
    "basketbol-sahasi-yapimi", "tenis-kortu-yapimi", "voleybol-sahasi-yapimi",
    "cok-amacli-saha-yapimi", "nizami-futbol-sahasi-yapimi", "celik-konstruksiyon",
    "akrilik-zemin-kaplama", "hali-saha-branda", "suni-cim-saha-kaplama",
    "hali-saha-halisi", "55mm-suni-cim-fiyati", "suni-cim-satan-firmalar",
    "yapay-cim-satan-yerler", "hali-saha-maliyeti", "acik-hali-saha-maliyeti",
    "kapali-hali-saha-maliyeti", "hali-saha-yapan-firmalar",
    "kapali-hali-saha-yapan-firmalar", "acik-hali-saha-yapan-firmalar",
    "cok-amacli-saha-yapan-firmalar", "voleybol-sahasi-yapan-firmalar",
    "tenis-kortu-yapan-firmalar", "balon-saha-yapan-firmalar",
    "nizami-saha-yapan-firmalar", "hali-saha-granul-satan-firmalar",
    "granul-satan-firmalar", "hali-saha-tavan-filesi",
    "hali-saha-filesi-satan-firmalar", "hali-saha-tamiri",
    "hali-saha-branda-tamiri", "suni-cim-tamiri", "hali-saha-tel-orgu",
    "pota-satan-firmalar", "tartan-zemin-kaplama", "padel-kortu-yapimi",
    "atletizm-pisti-yapimi", "havuz-yapimi", "hibrit-cim-saha-yapimi",
    "yedek-kulubesi", "spor-zemin-kaplama", "basketbol-potalari",
    "voleybol-tenis-direkleri", "futbol-kaleleri", "tribun-koltuklari",
    "hali-saha-skorbord", "hali-saha-aydinlatma", "prefabrik-konteyner",
  ];

  // Cities (81)
  const citySlugs = [
    "adana", "adiyaman", "afyonkarahisar", "agri", "amasya", "ankara", "antalya",
    "artvin", "aydin", "balikesir", "bilecik", "bingol", "bitlis", "bolu", "burdur",
    "bursa", "canakkale", "cankiri", "corum", "denizli", "diyarbakir", "edirne",
    "elazig", "erzincan", "erzurum", "eskisehir", "gaziantep", "giresun",
    "gumushane", "hakkari", "hatay", "isparta", "mersin", "istanbul", "izmir",
    "kars", "kastamonu", "kayseri", "kirklareli", "kirsehir", "kocaeli", "konya",
    "kutahya", "malatya", "manisa", "kahramanmaras", "mardin", "mugla", "mus",
    "nevsehir", "nigde", "ordu", "rize", "sakarya", "samsun", "siirt", "sinop",
    "sivas", "tekirdag", "tokat", "trabzon", "tunceli", "sanliurfa", "usak",
    "van", "yozgat", "zonguldak", "aksaray", "bayburt", "karaman", "kirikkale",
    "batman", "sirnak", "bartin", "ardahan", "igdir", "yalova", "karabuk",
    "kilis", "osmaniye", "duzce",
  ];

  let urls = "";

  // Static pages
  for (const p of staticPages) {
    urls += `  <url>\n    <loc>${baseUrl}${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
  }

  // Service pages
  for (const slug of serviceSlugs) {
    urls += `  <url>\n    <loc>${baseUrl}/hizmet/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  // City pages
  for (const slug of citySlugs) {
    urls += `  <url>\n    <loc>${baseUrl}/sehir/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;

    // City + Service combo pages (top 8 services per city)
    for (const svcSlug of serviceSlugs.slice(0, 8)) {
      urls += `  <url>\n    <loc>${baseUrl}/sehir/${slug}/${svcSlug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>`;

  return c.text(xml, 200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
});

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.get(Paths.oauthCallback, createOAuthCallbackHandler());
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
