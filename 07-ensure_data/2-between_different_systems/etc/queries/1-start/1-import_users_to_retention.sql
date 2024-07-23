INSERT INTO retention.users (id, email, total_reviews, last_activity_date, registration_date)
SELECT
	id,
	email,
	0 AS total_reviews,
	created_at AS last_activity_date,
	created_at AS registration_date
FROM shop.users
ON CONFLICT (id) DO NOTHING;
