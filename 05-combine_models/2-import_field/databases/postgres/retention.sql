CREATE SCHEMA retention;

CREATE TABLE retention.users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	last_activity_date TIMESTAMP WITH TIME ZONE NOT NULL,
	registration_date TIMESTAMP WITH TIME ZONE NOT NULL
);

COPY shop.users(id, name, email, profile_picture)
	FROM '/docker-entrypoint-initdb.d/data/users.csv' DELIMITER ';' CSV HEADER;
