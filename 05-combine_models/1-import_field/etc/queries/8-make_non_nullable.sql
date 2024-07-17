-- Al no especificar que no sea nullable, es nullable por defecto
ALTER TABLE retention.users
	ALTER COLUMN total_reviews SET NOT NULL;
