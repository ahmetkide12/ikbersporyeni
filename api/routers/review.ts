import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { reviews } from "@db/schema";
import { eq, and, desc } from "drizzle-orm";

export const reviewRouter = createRouter({
  list: publicQuery
    .input(z.object({ cityId: z.number().optional(), serviceId: z.number().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      let query = db.select().from(reviews).where(eq(reviews.isApproved, true)).orderBy(desc(reviews.createdAt));
      
      if (input?.cityId) {
        query = db.select().from(reviews).where(
          and(eq(reviews.cityId, input.cityId), eq(reviews.isApproved, true))
        ).orderBy(desc(reviews.createdAt));
      }
      
      return query.limit(50);
    }),

  getByCity: publicQuery
    .input(z.object({ cityId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(reviews)
        .where(and(eq(reviews.cityId, input.cityId), eq(reviews.isApproved, true)))
        .orderBy(desc(reviews.createdAt))
        .limit(20);
    }),

  create: publicQuery
    .input(
      z.object({
        cityId: z.number(),
        customerName: z.string().min(2),
        customerLocation: z.string().optional(),
        district: z.string().optional(),
        rating: z.number().min(1).max(5),
        reviewText: z.string().min(10),
        serviceType: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      return db.insert(reviews).values({
        ...input,
        isApproved: false,
      });
    }),
});
