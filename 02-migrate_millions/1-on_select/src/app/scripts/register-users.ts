/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return */
// noinspection InfiniteLoopJS

import { UserMother } from "../../../tests/contexts/shop/users/domain/UserMother";

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

async function main(): Promise<void> {
	while (true) {
		await registerUser();
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
}

main().catch(console.error);
