CREATE SCHEMA retention;

CREATE TABLE retention.users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	last_activity_date TIMESTAMP
);
