import * as fs from "node:fs";

import { ProductMother } from "../../../tests/contexts/shop/products/domain/ProductMother";

async function main(): Promise<void> {
	const csvPath = "databases/data/products.csv";
	const totalProductsToGenerate = 1_000_000;
	const batchSize = 10_000;
	let batchData = "";

	fs.writeFileSync(csvPath, "");

	for (let i = 0; i < totalProductsToGenerate; i++) {
		const product = ProductMother.create().toPrimitives();
		const line = `${product.id},${product.name},${product.price.amount},${product.price.currency}\n`;
		batchData += line;

		if ((i + 1) % batchSize === 0 || i === totalProductsToGenerate - 1) {
			fs.appendFileSync(csvPath, batchData);
			batchData = "";

			const completedPercentage = Math.round(((i + 1) / totalProductsToGenerate) * 100);
			console.log(`${completedPercentage}% completed`);
		}
	}
}

main().catch(console.error);
