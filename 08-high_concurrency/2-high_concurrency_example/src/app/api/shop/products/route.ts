import "reflect-metadata";

import { NextResponse } from "next/server";

import { container } from "../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/persistence/PostgresConnection";
import { AllProductsSearcher } from "../../../../contexts/shop/products/application/search_all/AllProductsSearcher";
import { ProductPrimitives } from "../../../../contexts/shop/products/domain/Product";
import { PostgresProductRepository } from "../../../../contexts/shop/products/infrastructure/PostgresProductRepository";

export async function GET(): Promise<NextResponse<ProductPrimitives[]> | Response> {
	const postgresConnection = container.get(PostgresConnection);

	const searcher = new AllProductsSearcher(new PostgresProductRepository(postgresConnection));

	const products = await searcher.search();

	return NextResponse.json(products);
}
