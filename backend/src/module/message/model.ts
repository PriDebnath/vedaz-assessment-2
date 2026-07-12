import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean,
    index,
    serial,
} from "drizzle-orm/pg-core";

import { users } from "../user/model";
import { integer } from "drizzle-orm/pg-core";

export const messages = pgTable(
    "messages",
    {
        id: serial().primaryKey(),
        senderId: integer().notNull().references(() => users.id, { onDelete: "cascade" }),
        receiverId: integer().notNull().references(() => users.id, { onDelete: "cascade" }),
        text: text().notNull(),

        createdAt: timestamp("created_at", { withTimezone: true, }).defaultNow().notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true, }).defaultNow().$onUpdate(() => new Date()),
        isDeleted: boolean().default(false).notNull(),

        deliveredAt: timestamp({ withTimezone: true, }),
        readAt: timestamp("read_at", { withTimezone: true, }),
    },
);