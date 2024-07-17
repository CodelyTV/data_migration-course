/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return */
// noinspection InfiniteLoopJS

import { faker } from "@faker-js/faker";

import { PostgresConnection } from "../../contexts/shared/infrastructure/persistence/PostgresConnection";

const connection = new PostgresConnection();

async function reviewProduct(): Promise<void> {
	const existingUser = await connection.searchOne<{ id: string }>(
		"SELECT * FROM shop.users ORDER BY RANDOM() LIMIT 1",
	);

	if (existingUser === null) {
		return;
	}

	const existingProduct = await connection.searchOne<{ id: string }>(
		"SELECT * FROM shop.products ORDER BY RANDOM() LIMIT 1",
	);

	if (existingProduct === null) {
		return;
	}

	await fetch(`http://localhost:3000/api/shop/product_reviews/${faker.string.uuid()}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userId: existingUser.id,
			productId: existingProduct.id,
			rating: faker.number.int({ min: 1, max: 5 }),
			comment: faker.lorem.sentence({ min: 5, max: 10 }),
		}),
	});
}

async function main(): Promise<void> {
	while (true) {
		await reviewProduct();

		await new Promise((resolve) => setTimeout(resolve, 500));
	}
}

main().catch(console.error);
