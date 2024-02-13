-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `blogs` (
	`date_modified` datetime DEFAULT 'current_timestamp()',
	`date_added` datetime DEFAULT 'current_timestamp()',
	`title` varchar(255) DEFAULT 'NULL',
	`data` longblob DEFAULT 'NULL',
	`path` varchar(100) DEFAULT 'NULL',
	`mime` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `path` UNIQUE(`path`)
);

*/