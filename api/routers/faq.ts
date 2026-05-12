import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { faqs } from "@db/schema";
import { eq, and, asc } from "drizzle-orm";

export const faqRouter = createRouter({
  list: publicQuery
    .input(z.object({ cityId: z.number().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      if (input?.cityId) {
        return db
          .select()
          .from(faqs)
          .where(and(eq(faqs.cityId, input.cityId), eq(faqs.isActive, true)))
          .orderBy(asc(faqs.sortOrder))
          .limit(50);
      }
      return db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(asc(faqs.sortOrder)).limit(50);
    }),

  getByCity: publicQuery
    .input(z.object({ cityId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(faqs)
        .where(and(eq(faqs.cityId, input.cityId), eq(faqs.isActive, true)))
        .orderBy(asc(faqs.sortOrder))
        .limit(20);
    }),
});
