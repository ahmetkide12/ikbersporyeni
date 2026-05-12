import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { services } from "@db/schema";
import { eq, and, like } from "drizzle-orm";

export const serviceRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).where(eq(services.isActive, true)).orderBy(services.name);
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(services)
        .where(and(eq(services.slug, input.slug), eq(services.isActive, true)))
        .limit(1);
      return results[0] || null;
    }),

  getByCategory: publicQuery
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(services)
        .where(
          and(
            eq(services.category, input.category),
            eq(services.isActive, true)
          )
        )
        .orderBy(services.name);
    }),

  search: publicQuery
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(services)
        .where(
          and(
            like(services.name, `%${input.query}%`),
            eq(services.isActive, true)
          )
        )
        .limit(10);
    }),

  getCategories: publicQuery.query(async () => {
    const db = getDb();
    const allServices = await db.select().from(services).where(eq(services.isActive, true));
    const categories = [...new Set(allServices.map((s) => s.category).filter(Boolean))];
    return categories;
  }),
});
