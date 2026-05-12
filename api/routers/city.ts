import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { cities } from "@db/schema";
import { eq, like, and } from "drizzle-orm";

export const cityRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(cities).where(eq(cities.isActive, true)).orderBy(cities.name);
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(cities)
        .where(and(eq(cities.slug, input.slug), eq(cities.isActive, true)))
        .limit(1);
      return results[0] || null;
    }),

  search: publicQuery
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(cities)
        .where(
          and(
            like(cities.name, `%${input.query}%`),
            eq(cities.isActive, true)
          )
        )
        .limit(10);
    }),

  getStats: publicQuery.query(async () => {
    const db = getDb();
    const allCities = await db.select().from(cities).where(eq(cities.isActive, true));
    return {
      total: allCities.length,
      byRegion: allCities.reduce((acc, city) => {
        acc[city.region || "Bilinmiyor"] = (acc[city.region || "Bilinmiyor"] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }),
});
