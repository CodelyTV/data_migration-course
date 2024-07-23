SELECT
	(SELECT COUNT(*) FROM shop.users) AS shop_users_count,
	(SELECT COUNT(*) FROM retention.users) AS retention_users_count;
