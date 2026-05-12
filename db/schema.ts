import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  decimal,
  json,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// Users table (for OAuth authentication)
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Cities table — 81 Turkish provinces
export const cities = mysqlTable(
  "cities",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    slug: varchar("slug", { length: 50 }).notNull().unique(),
    region: varchar("region", { length: 50 }),
    population: int("population"),
    areaCode: varchar("area_code", { length: 10 }),
    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),
    description: text("description"),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    districts: json("districts").$type<string[]>(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("cities_slug_idx").on(table.slug),
    index("cities_region_idx").on(table.region),
  ]
);

export type City = typeof cities.$inferSelect;
export type InsertCity = typeof cities.$inferInsert;

// Services table — 100+ sport services
export const services = mysqlTable(
  "services",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    category: varchar("category", { length: 50 }),
    shortDescription: varchar("short_description", { length: 500 }),
    longDescription: text("long_description"),
    features: json("features").$type<string[]>(),
    priceRangeMin: decimal("price_range_min", { precision: 10, scale: 2 }),
    priceRangeMax: decimal("price_range_max", { precision: 10, scale: 2 }),
    imageUrl: varchar("image_url", { length: 255 }),
    icon: varchar("icon", { length: 50 }),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    faqSchema: json("faq_schema"),
    isActive: boolean("is_active").default(true).notNull(),
    sortOrder: int("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("services_slug_idx").on(table.slug),
    index("services_category_idx").on(table.category),
  ]
);

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Service pages — city + service combination pages (the core SEO pages)
export const servicePages = mysqlTable(
  "service_pages",
  {
    id: serial("id").primaryKey(),
    cityId: bigint("city_id", { mode: "number", unsigned: true }).references(
      () => cities.id
    ),
    serviceId: bigint("service_id", {
      mode: "number",
      unsigned: true,
    }).references(() => services.id),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    pageTitle: varchar("page_title", { length: 200 }),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    metaKeywords: varchar("meta_keywords", { length: 500 }),
    content: text("content"),
    localDescription: text("local_description"),
    localPriceNote: varchar("local_price_note", { length: 500 }),
    localAddress: varchar("local_address", { length: 300 }),
    localPhone: varchar("local_phone", { length: 20 }),
    faqSchema: json("faq_schema"),
    reviewSchema: json("review_schema"),
    breadcrumbSchema: json("breadcrumb_schema"),
    canonicalUrl: varchar("canonical_url", { length: 300 }),
    ogImage: varchar("og_image", { length: 255 }),
    isActive: boolean("is_active").default(true).notNull(),
    viewCount: int("view_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("service_pages_city_service_idx").on(
      table.cityId,
      table.serviceId
    ),
    index("service_pages_slug_idx").on(table.slug),
    index("service_pages_city_idx").on(table.cityId),
    index("service_pages_service_idx").on(table.serviceId),
  ]
);

export type ServicePage = typeof servicePages.$inferSelect;
export type InsertServicePage = typeof servicePages.$inferInsert;

// Reviews — customer reviews for each city/service
export const reviews = mysqlTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    servicePageId: bigint("service_page_id", {
      mode: "number",
      unsigned: true,
    }).references(() => servicePages.id),
    cityId: bigint("city_id", { mode: "number", unsigned: true }).references(
      () => cities.id
    ),
    serviceId: bigint("service_id", {
      mode: "number",
      unsigned: true,
    }).references(() => services.id),
    customerName: varchar("customer_name", { length: 100 }).notNull(),
    customerLocation: varchar("customer_location", { length: 100 }),
    district: varchar("district", { length: 50 }),
    rating: int("rating").notNull(),
    reviewText: text("review_text"),
    serviceType: varchar("service_type", { length: 50 }),
    isApproved: boolean("is_approved").default(false).notNull(),
    schemaMarkup: json("schema_markup"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("reviews_city_idx").on(table.cityId),
    index("reviews_service_idx").on(table.serviceId),
    index("reviews_page_idx").on(table.servicePageId),
  ]
);

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

// FAQs — frequently asked questions for each city/service/page
export const faqs = mysqlTable(
  "faqs",
  {
    id: serial("id").primaryKey(),
    servicePageId: bigint("service_page_id", {
      mode: "number",
      unsigned: true,
    }).references(() => servicePages.id),
    cityId: bigint("city_id", { mode: "number", unsigned: true }).references(
      () => cities.id
    ),
    serviceId: bigint("service_id", {
      mode: "number",
      unsigned: true,
    }).references(() => services.id),
    question: varchar("question", { length: 500 }).notNull(),
    answer: text("answer").notNull(),
    category: varchar("category", { length: 50 }),
    sortOrder: int("sort_order").default(0),
    schemaMarkup: json("schema_markup"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("faqs_city_idx").on(table.cityId),
    index("faqs_service_idx").on(table.serviceId),
    index("faqs_page_idx").on(table.servicePageId),
  ]
);

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = typeof faqs.$inferInsert;

// Contacts — contact form submissions
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 50 }),
  serviceInterest: varchar("service_interest", { length: 100 }),
  message: text("message"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

// Site settings — general website settings
export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 50 }).notNull().unique(),
  value: text("value"),
  type: mysqlEnum("type", ["string", "json", "number", "boolean"]).default(
    "string"
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
