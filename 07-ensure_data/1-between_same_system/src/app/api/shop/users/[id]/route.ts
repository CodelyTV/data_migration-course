import "reflect-metadata";

import { Primitives } from "@codelytv/primitives-type";
import { isLeft } from "fp-ts/Either";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { NextRequest, NextResponse } from "next/server";

import { container } from "../../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { UserFinder } from "../../../../../contexts/shop/users/application/find/UserFinder";
import { UserRegistrar } from "../../../../../contexts/shop/users/application/registrar/UserRegistrar";
import { User } from "../../../../../contexts/shop/users/domain/User";
import { UserDoesNotExistError } from "../../../../../contexts/shop/users/domain/UserDoesNotExistError";

const CreateUserRequest = t.type({ name: t.string, email: t.string, profilePicture: t.string });

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const validatedRequest = CreateUserRequest.decode(await request.json());

	if (isLeft(validatedRequest)) {
		return HttpNextResponse.badRequest(
			`Invalid request: ${PathReporter.report(validatedRequest).join("\n")}`,
		);
	}

	const body = validatedRequest.right;

	const registrar = container.get(UserRegistrar);

	return executeWithErrorHandling(async () => {
		await registrar.registrar(id, body.name, body.email, body.profilePicture);

		return HttpNextResponse.created();
	});
}

export async function GET(
	_request: Request,
	{ params: { id } }: { params: { id: string } },
): Promise<NextResponse<Primitives<User>> | Response> {
	const finder = container.get(UserFinder);

	return executeWithErrorHandling(
		async () => {
			const user = await finder.find(id);

			return HttpNextResponse.json(user);
		},
		(error: UserDoesNotExistError) => {
			return HttpNextResponse.domainError(error, 404);
		},
	);
}
