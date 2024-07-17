CREATE SCHEMA retention;

CREATE TABLE retention.users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	last_activity_date TIMESTAMP WITH TIME ZONE NOT NULL,
	registration_date TIMESTAMP WITH TIME ZONE NOT NULL,
	total_reviews INTEGER
);

INSERT INTO retention.users (id, email, last_activity_date, registration_date)
SELECT
	id,
	email,
	created_at AS last_activity_date,
	created_at AS registration_date
FROM shop.users
ON CONFLICT (id) DO NOTHING;
