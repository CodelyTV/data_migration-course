import * as fs from "node:fs";

import { faker } from "@faker-js/faker";

import { UserMother } from "../../../tests/contexts/shop/users/domain/UserMother";

async function csvGenerator(
	csvPath: string,
	totalToGenerate: number,
	batchSize: number,
	lineGenerator: () => string,
): Promise<void> {
	let batchData = "";

	fs.writeFileSync(csvPath, "");

	for (let i = 0; i < totalToGenerate + 1; i++) {
		const line = lineGenerator();
		batchData += `${line}\n`;

		if ((i + 1) % batchSize === 0 || i === totalToGenerate - 1) {
			fs.appendFileSync(csvPath, batchData);
			batchData = "";

			const completedPercentage = Math.round(((i + 1) / totalToGenerate) * 100);
			console.log(`${completedPercentage}% ${csvPath} completed`);
		}
	}
}

async function main(): Promise<void> {
	const csvDelimiter = ";";

	// await csvGenerator("databases/data/products.csv", 10_000, 1000, () => {
	// 	const product = ProductMother.create().toPrimitives();
	//
	// 	return `${product.id}${csvDelimiter}${product.name}${csvDelimiter}${product.price.amount}${csvDelimiter}${product.price.currency}${csvDelimiter}{${product.imageUrls.map((image) => `"${image}"`).join(",")}}${csvDelimiter}`;
	// });

	await csvGenerator("databases/data/users.csv", 1_000_000, 10_000, () => {
		const user = UserMother.create().toPrimitives();
		const createdAt = faker.date.between({ from: "2020-01-01", to: "2025-12-31" }).toISOString();

		return `${user.id}${csvDelimiter}${user.name}${csvDelimiter}${user.email}${csvDelimiter}${user.profilePicture}${csvDelimiter}${createdAt}`;
	});
}

main().catch(console.error);
