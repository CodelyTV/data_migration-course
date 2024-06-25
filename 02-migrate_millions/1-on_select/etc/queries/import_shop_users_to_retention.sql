INSERT INTO retention.users (id, email, last_activity_date, registration_date)
SELECT
	id,
	email,
	created_at AS last_activity_date,
	created_at AS registration_date
FROM shop.users
ON CONFLICT (id) DO NOTHING;

-- Ensure all is ok
SELECT
	(SELECT COUNT(*) FROM shop.users) AS shop_users_count,
	(SELECT COUNT(*) FROM retention.users) AS retention_users_count;
