/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return */
// noinspection InfiniteLoopJS
import "reflect-metadata";

import { container } from "../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/persistence/PostgresConnection";

const connection = container.get(PostgresConnection);
const replicaConnection = new PostgresConnection(5433);

async function searchUsersWithoutTotalReviews(batchSize: number): Promise<{ id: string }[]> {
	return await connection.searchAll<{ id: string }>(`
		SELECT id FROM retention.users WHERE total_reviews IS NULL LIMIT ${batchSize}
	`);
}

async function main(): Promise<void> {
	const batchSize = 1000;

	let totalToProcess = (
		(await connection.searchOne<{ total: number }>(`
		SELECT COUNT(*) AS total FROM retention.users WHERE total_reviews IS NULL
	`)) ?? { total: 0 }
	).total;

	console.log(`Total users to process: ${totalToProcess}`);

	let users = await searchUsersWithoutTotalReviews(batchSize);

	while (users.length > 0) {
		for (const user of users) {
			const totalReviews = await replicaConnection.searchOne<{ total: number }>(`
				SELECT COUNT(*) AS total FROM shop.product_reviews WHERE user_id = '${user.id}'
			`);

			if (!totalReviews) {
				continue;
			}

			await connection.execute`
				UPDATE retention.users SET total_reviews = ${totalReviews.total} WHERE id = ${user.id}
			`;
		}

		totalToProcess -= users.length;

		console.log(` → Remaining: ${totalToProcess}`);

		users = await searchUsersWithoutTotalReviews(batchSize);
	}
}

main().catch(console.error);
