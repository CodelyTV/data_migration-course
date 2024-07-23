/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return,no-unmodified-loop-condition */
// noinspection InfiniteLoopJS
import "reflect-metadata";

import { container } from "../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/persistence/PostgresConnection";

const connection = container.get(PostgresConnection);

async function searchShopUsers(date: Date): Promise<number> {
	const result = await connection.searchAll<{ total: number }>(
		`SELECT count(*) as total FROM shop.users WHERE DATE(created_at) = '${date.toISOString().split("T")[0]}'`,
	);

	return result[0].total;
}

async function searchRetentionUsers(date: Date): Promise<number> {
	const result = await connection.searchAll<{ total: number }>(
		`SELECT count(*) as total FROM retention.users WHERE DATE(registration_date) = '${date.toISOString().split("T")[0]}'`,
	);

	return result[0].total;
}

async function main(): Promise<void> {
	console.log(process.argv);
	const startDate = new Date(process.argv[2]);
	const endDate = new Date(process.argv[3]);

	const currentDate = new Date(startDate);
	let hasOccurredAnError = false;

	while (currentDate <= endDate) {
		const totalShopUsers = await searchShopUsers(currentDate);
		const totalRetentionUsers = await searchRetentionUsers(currentDate);

		if (totalShopUsers === totalRetentionUsers) {
			console.log(`✅ ${currentDate.toISOString().split("T")[0]}: ${totalShopUsers} users`);
		} else {
			hasOccurredAnError = true;

			console.log(
				`❌ ${currentDate.toISOString().split("T")[0]}: Shop users: ${totalShopUsers}, Retention users: ${totalRetentionUsers}`,
			);
		}

		currentDate.setDate(currentDate.getDate() + 1);
	}

	if (hasOccurredAnError) {
		console.error("\n🔥🔥🔥 Some dates have different number of users");
	}

	process.exit(hasOccurredAnError ? 1 : 0);
}

main().catch(console.error);
