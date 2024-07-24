CREATE INDEX idx__retention__users__registration_date__date_search
	ON retention.users USING btree (registration_date);

CREATE INDEX idx__shop__users__created_at__date_search
	ON shop.users USING btree (created_at);
