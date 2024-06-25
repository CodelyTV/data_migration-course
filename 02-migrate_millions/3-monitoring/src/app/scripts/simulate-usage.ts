/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return */
// noinspection InfiniteLoopJS

import { UserEmailMother } from "../../../tests/contexts/shop/users/domain/UserEmailMother";
import { UserMother } from "../../../tests/contexts/shop/users/domain/UserMother";
import { PostgresConnection } from "../../contexts/shared/infrastructure/persistence/PostgresConnection";

const connection = new PostgresConnection();

async function registerUser(): Promise<void> {
	const user = UserMother.create().toPrimitives();

	await fetch(`http://localhost:3000/api/shop/users/${user.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: user.name,
			email: user.email,
			profilePicture: user.profilePicture,
		}),
	});
}

async function updateUserEmail(): Promise<void> {
	const existingUser = await connection.searchOne<{ id: string }>(
		"SELECT * FROM shop.users ORDER BY RANDOM() LIMIT 1",
	);

	if (existingUser === null) {
		return;
	}

	await fetch(`http://localhost:3000/api/shop/users/${existingUser.id}/email`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: UserEmailMother.create().value,
		}),
	});
}

async function main(): Promise<void> {
	while (true) {
		if (Math.random() < 0.5) {
			await registerUser();
		} else {
			await updateUserEmail();
		}

		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
}

main().catch(console.error);
