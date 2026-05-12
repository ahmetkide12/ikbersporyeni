import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { cityRouter } from "./routers/city";
import { serviceRouter } from "./routers/service";
import { reviewRouter } from "./routers/review";
import { faqRouter } from "./routers/faq";
import { contactRouter } from "./routers/contact";
import { pageRouter } from "./routers/page";
import { seedRouter } from "./routers/seed";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  city: cityRouter,
  service: serviceRouter,
  review: reviewRouter,
  faq: faqRouter,
  contact: contactRouter,
  page: pageRouter,
  seed: seedRouter,
});

export type AppRouter = typeof appRouter;
