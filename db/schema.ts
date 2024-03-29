import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  unique,
  datetime,
  customType,
  mysqlEnum,
  boolean,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { sql } from "drizzle-orm";

const longblob = customType<{ data: string }>({
  dataType() {
    return "longblob";
  },
});

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    id: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const blogs = mysqlTable(
  "blogs",
  {
    dateModified: datetime("date_modified", { mode: "string" }).default(sql`CURRENT_TIMESTAMP()`),
    dateAdded: datetime("date_added", { mode: "string" }).default(sql`CURRENT_TIMESTAMP()`),
    title: varchar("title", { length: 255 }).default("NULL"),
    longblobType: longblob("data"),
    path: varchar("path", { length: 100 }).notNull(),
    mime: varchar("mime", { length: 255 }).default("NULL"),
    publish_state: mysqlEnum("publish_state", ["main", "pre-publish"]).default("main"),
  },
  (table) => {
    return {
      path: unique("path").on(table.path),
    };
  },
);
