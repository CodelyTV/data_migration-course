/* eslint-disable no-constant-condition,no-await-in-loop,no-promise-executor-return */
// noinspection InfiniteLoopJS

import { UserMother } from "../../../tests/contexts/shop/users/domain/UserMother";

let insertCount = 0;
let startTime = Date.now();

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

	insertCount++;
}

function printInsertRate() {
	const currentTime = Date.now();
	const elapsedSeconds = (currentTime - startTime) / 1000;
	const insertsPerSecond = insertCount / elapsedSeconds;

	console.log(`Users/s: ${insertsPerSecond.toFixed(2)}`);

	insertCount = 0;
	startTime = currentTime;
}

async function main(): Promise<void> {
	setInterval(printInsertRate, 5000);

	while (true) {
		await registerUser();
	}
}

main().catch(console.error);
