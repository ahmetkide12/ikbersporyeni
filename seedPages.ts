import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { cities, services, servicePages } from "./db/schema";

const pool = mysql.createPool(process.env.DATABASE_URL!);
const db = drizzle(pool, { mode: "planetscale" });

const BATCH_SIZE = 5; // 5 cities at a time

async function seedPages(startIdx: number) {
  const cityList = await db.select().from(cities);
  const svcList = await db.select().from(services);

  const batch = cityList.slice(startIdx, startIdx + BATCH_SIZE);
  if (batch.length === 0) {
    console.log("✅ ALL DONE!");
    return false;
  }

  console.log(`📄 Processing cities ${startIdx + 1}-${startIdx + batch.length} of ${cityList.length}...`);

  for (const city of batch) {
    const pages = svcList.map((svc) => ({
      cityId: city.id,
      serviceId: svc.id,
      slug: `${city.slug}-${svc.slug}`,
      pageTitle: `${city.name} ${svc.name} | İkber Spor Yapıları`,
      metaTitle: `${city.name} ${svc.name} | İkber Spor Yapıları | 0542 612 56 10`,
      metaDescription: `${city.name} ${svc.name} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. ${city.name} ve tüm ilçelerinde anahtar teslim hizmet.`,
      metaKeywords: `${city.name} ${svc.name}, ${city.name} ${svc.slug}, ${svc.name} ${city.name}, İkber Spor`,
      content: `${city.name} ${svc.name} konusunda İkber Spor Yapıları olarak 30 yılı aşkın tecrübemizle hizmet vermekteyiz. ${city.name} ve tüm ilçelerinde profesyonel ekiplerimizle anahtar teslim ${svc.name} projeleri gerçekleştiriyoruz.`,
      localDescription: `${city.name} bölgesi için özel ${svc.name} çözümleri. ${city.name} iklim koşullarına uygun malzeme seçimi ve uzman kadro.`,
      localPriceNote: `${city.name} ${svc.name} fiyatları için ücretsiz keşif ve teklif alabilirsiniz.`,
      localAddress: `${city.name} Merkez`,
      localPhone: "0542 612 56 10",
      isActive: true,
    }));

    for (let i = 0; i < pages.length; i += 10) {
      await db.insert(servicePages).values(pages.slice(i, i + 10));
    }
  }

  console.log(`   ✅ ${batch.length * svcList.length} pages inserted`);
  return true;
}

async function run() {
  const startIdx = parseInt(process.argv[2] || "0");
  console.log(`Starting from city index ${startIdx}...`);
  const hasMore = await seedPages(startIdx);

  if (hasMore) {
    const nextIdx = startIdx + BATCH_SIZE;
    console.log(`\n➡️ Next batch: npx tsx seedPages.ts ${nextIdx}`);
  }

  await pool.end();
}

run().catch((e) => { console.error(e); process.exit(1); });
