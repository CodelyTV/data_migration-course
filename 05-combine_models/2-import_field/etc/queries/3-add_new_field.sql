-- Al no especificar que no sea nullable, es nullable por defecto
ALTER TABLE retention.users
	ADD COLUMN total_reviews INTEGER;
