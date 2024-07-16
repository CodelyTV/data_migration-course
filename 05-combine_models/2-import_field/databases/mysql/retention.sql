CREATE TABLE retention__users (
	id CHAR(36) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	last_activity_date TIMESTAMP NOT NULL,
	registration_date TIMESTAMP NOT NULL
);
