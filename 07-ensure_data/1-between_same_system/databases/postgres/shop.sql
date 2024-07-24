CREATE SCHEMA shop;

CREATE TABLE shop.users (
	id UUID PRIMARY KEY NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	profile_picture VARCHAR(255) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE shop.products (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	price_amount NUMERIC NOT NULL,
	price_currency VARCHAR NOT NULL,
	image_urls TEXT[] NOT NULL,
	latest_top_reviews JSONB
);

CREATE TABLE shop.product_reviews (
	id UUID PRIMARY KEY,
	user_id UUID REFERENCES shop.users(id) NOT NULL,
	product_id UUID REFERENCES shop.products(id) NOT NULL,
	rating FLOAT NOT NULL,
	comment VARCHAR(500)
);

-- Import data
COPY shop.users(id, name, email, profile_picture, created_at)
	FROM '/docker-entrypoint-initdb.d/data/users.csv' DELIMITER ';' CSV;
COPY shop.products(id, name, price_amount, price_currency, image_urls, latest_top_reviews)
	FROM '/docker-entrypoint-initdb.d/data/products.csv' DELIMITER ';' CSV;
