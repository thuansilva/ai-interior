import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(3).notNull(),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  roomType: varchar({ length: 255 }).notNull(),
  designType: varchar({ length: 255 }).notNull(),
  orgImage: varchar({ length: 255 }).notNull(),
  aiImage: varchar({ length: 255 }).notNull(),
  userEmail: varchar({ length: 255 }).notNull(),
});
