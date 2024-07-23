CREATE SCHEMA retention;

CREATE TABLE retention.users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	total_reviews INTEGER NOT NULL,
	last_activity_date TIMESTAMP WITH TIME ZONE NOT NULL,
	registration_date TIMESTAMP WITH TIME ZONE NOT NULL
);
