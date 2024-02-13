import { mysqlTable, mysqlSchema, AnyMySqlColumn, unique, datetime, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const blogs = mysqlTable("blogs", {
	dateModified: datetime("date_modified", { mode: 'string'}).default('current_timestamp()'),
	dateAdded: datetime("date_added", { mode: 'string'}).default('current_timestamp()'),
	title: varchar("title", { length: 255 }).default('NULL'),
	// Warning: Can't parse longblob from database
	// longblobType: longblob("data"),
	path: varchar("path", { length: 100 }).default('NULL'),
	mime: varchar("mime", { length: 255 }).default('NULL'),
},
(table) => {
	return {
		path: unique("path").on(table.path),
	}
});