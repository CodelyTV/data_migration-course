import "reflect-metadata";

import { Primitives } from "@codelytv/primitives-type";
import { NextResponse } from "next/server";

import { RetentionUserFinder } from "../../../../../contexts/retention/user/application/find/RetentionUserFinder";
import { RetentionUserDoesNotExistError } from "../../../../../contexts/retention/user/domain/RetentionUserDoesNotExistError";
import { container } from "../../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { User } from "../../../../../contexts/shop/users/domain/User";

export async function GET(
	_request: Request,
	{ params: { id } }: { params: { id: string } },
): Promise<NextResponse<Primitives<User>> | Response> {
	const finder = container.get(RetentionUserFinder);

	return executeWithErrorHandling(
		async () => {
			const user = await finder.find(id);

			return HttpNextResponse.json(user);
		},
		(error: RetentionUserDoesNotExistError) => {
			return HttpNextResponse.domainError(error, 404);
		},
	);
}
