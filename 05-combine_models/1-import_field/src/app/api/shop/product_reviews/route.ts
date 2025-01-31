import "reflect-metadata";

import { NextRequest, NextResponse } from "next/server";

import { container } from "../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { HttpNextResponse } from "../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/persistence/PostgresConnection";
import { ProductReviewsByProductSearcher } from "../../../../contexts/shop/product_reviews/application/search_by_product_id/ProductReviewsByProductSearcher";
import { PostgresProductReviewRepository } from "../../../../contexts/shop/product_reviews/infrastructure/PostgresProductReviewRepository";
import { ProductPrimitives } from "../../../../contexts/shop/products/domain/Product";

export async function GET(
	request: NextRequest,
): Promise<NextResponse<ProductPrimitives[]> | Response> {
	const postgresConnection = container.get(PostgresConnection);

	const searcher = new ProductReviewsByProductSearcher(
		new PostgresProductReviewRepository(postgresConnection),
	);

	const id = new URL(request.url).searchParams.get("product_id");

	if (!id) {
		return HttpNextResponse.badRequest("product_id is required");
	}

	const products = await searcher.search(id);

	return HttpNextResponse.json(products.map((product) => product));
}
