import { Primitives } from "@codelytv/primitives-type";
import { NextResponse } from "next/server";

import { RetentionUserFinder } from "../../../../../contexts/retention/user/application/find/RetentionUserFinder";
import { RetentionUserDoesNotExistError } from "../../../../../contexts/retention/user/domain/RetentionUserDoesNotExistError";
import { PostgresRetentionUserRepository } from "../../../../../contexts/retention/user/infrastructure/PostgresRetentionUserRepository";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/persistence/PostgresConnection";
import { User } from "../../../../../contexts/shop/users/domain/User";

export async function GET(
	_request: Request,
	{ params: { id } }: { params: { id: string } },
): Promise<NextResponse<Primitives<User>> | Response> {
	const finder = new RetentionUserFinder(
		new PostgresRetentionUserRepository(new PostgresConnection()),
	);

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
