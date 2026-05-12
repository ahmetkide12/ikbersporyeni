import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { servicePages, cities, services } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const pageRouter = createRouter({
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(servicePages)
        .where(and(eq(servicePages.slug, input.slug), eq(servicePages.isActive, true)))
        .limit(1);
      return results[0] || null;
    }),

  getByCityAndService: publicQuery
    .input(z.object({ citySlug: z.string(), serviceSlug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const cityRows = await db.select().from(cities).where(eq(cities.slug, input.citySlug)).limit(1);
      const serviceRows = await db.select().from(services).where(eq(services.slug, input.serviceSlug)).limit(1);
      
      if (!cityRows[0] || !serviceRows[0]) return null;
      
      const pages = await db
        .select()
        .from(servicePages)
        .where(
          and(
            eq(servicePages.cityId, cityRows[0].id),
            eq(servicePages.serviceId, serviceRows[0].id),
            eq(servicePages.isActive, true)
          )
        )
        .limit(1);
      
      return {
        page: pages[0] || null,
        city: cityRows[0],
        service: serviceRows[0],
      };
    }),

  generateSeoContent: publicQuery
    .input(z.object({ citySlug: z.string(), serviceSlug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const cityRows = await db.select().from(cities).where(eq(cities.slug, input.citySlug)).limit(1);
      const serviceRows = await db.select().from(services).where(eq(services.slug, input.serviceSlug)).limit(1);
      
      if (!cityRows[0] || !serviceRows[0]) return null;
      
      const city = cityRows[0];
      const service = serviceRows[0];
      
      return {
        title: `${city.name} ${service.name} | İkber Spor Yapıları`,
        metaTitle: `${city.name} ${service.name} | İkber Spor Yapıları | 0542 612 56 10`,
        metaDescription: `${city.name} ${service.name} hizmeti. 30 yıllık tecrübe, MYK belgeli ekip, TSE/CE sertifikalı malzeme. ${city.name} ve tüm ilçelerinde anahtar teslim hizmet.`,
        content: `${city.name} ${service.name} konusunda İkber Spor Yapıları olarak 1992 yılından bu yana 30+ yıllık tecrübemizle hizmet vermekteyiz.`,
        localAddress: `${city.name} Merkez`,
        localPhone: "0542 612 56 10",
        city,
        service,
      };
    }),
});
