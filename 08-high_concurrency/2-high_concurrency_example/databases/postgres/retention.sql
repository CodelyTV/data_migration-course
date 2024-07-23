CREATE SCHEMA retention;

CREATE TABLE retention.users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	total_reviews INTEGER,
	last_activity_date TIMESTAMP WITH TIME ZONE NOT NULL,
	registration_date TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx__retention_users__registration_date__date_search
	ON retention.users USING btree (registration_date);
