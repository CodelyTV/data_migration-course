CREATE VIEW shop.retention__users AS
SELECT
	id,
	email,
	created_at AS last_activity_date,
	created_at AS registration_date
FROM
	shop.users;
