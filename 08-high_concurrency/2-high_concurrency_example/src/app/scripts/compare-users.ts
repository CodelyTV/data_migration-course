/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return,no-unmodified-loop-condition */
// noinspection InfiniteLoopJS
import "reflect-metadata";

import { container } from "../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { PostgresConnection } from "../../contexts/shared/infrastructure/persistence/PostgresConnection";

const connection = container.get(PostgresConnection);

async function searchPostgresUsers(date: Date): Promise<number> {
	const result = await connection.searchAll<{ total: string }>(
		`SELECT count(*) as total 
FROM shop.users 
WHERE created_at >= '${date.toISOString().split("T")[0]}'::date 
  AND created_at < ('${date.toISOString().split("T")[0]}'::date + interval '1 day')`,
	);

	return parseInt(result[0].total, 10);
}

async function searchElasticUsers(date: Date): Promise<number> {
	const startOfDay = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0),
	);
	const endOfDay = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999),
	);

	try {
		const response = await fetch("http://localhost:9200/users/_count", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: {
					range: {
						created_at: {
							gte: startOfDay,
							lt: endOfDay,
						},
					},
				},
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data.count as number;
	} catch (error) {
		console.error("Error fetching from Elasticsearch:", error);

		return 0;
	}
}

async function main(): Promise<void> {
	const startDate = new Date(process.argv[2]);
	const endDate = new Date(process.argv[3]);

	const currentDate = new Date(startDate);
	let hasOccurredAnError = false;

	while (currentDate <= endDate) {
		const totalPostgresUsers = await searchPostgresUsers(currentDate);
		const totalElasticUsers = await searchElasticUsers(currentDate);

		if (totalPostgresUsers === totalElasticUsers) {
			console.log(`✅ ${currentDate.toISOString().split("T")[0]}: ${totalPostgresUsers} users`);
		} else {
			hasOccurredAnError = true;

			console.log(
				`❌ ${currentDate.toISOString().split("T")[0]}: Shop users: ${totalPostgresUsers}, Retention users: ${totalElasticUsers}`,
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
