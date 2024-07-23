-- Vemos si hay diferencias. En esta query se podría añadir una alarma.
SELECT
	CASE
		WHEN EXISTS (
			SELECT 1 FROM shop.users
			FULL JOIN retention.users ON shop.users.id = retention.users.id
			WHERE shop.users.id IS NULL OR retention.users.id IS NULL
		) THEN 'No'
		ELSE 'Sí'
		END AS contienen_los_mismos_registros;


-- Query para ver qué diferencias hay. Lo normal es que la tabla que aparezca siempre sea la fuente.
SELECT
	CASE
		WHEN shop.users.id IS NOT NULL THEN 'shop'
		ELSE 'retention'
		END AS tabla_que_contiene_id,
	COALESCE(shop.users.id, retention.users.id) AS id_no_coincidente
FROM shop.users
		 FULL JOIN retention.users ON shop.users.id = retention.users.id
WHERE shop.users.id IS NULL OR retention.users.id IS NULL;
