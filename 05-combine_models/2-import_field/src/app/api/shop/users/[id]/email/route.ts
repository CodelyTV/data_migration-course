import "reflect-metadata";

import { isLeft } from "fp-ts/Either";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { NextRequest } from "next/server";

import { container } from "../../../../../../contexts/shared/infrastructure/dependency_injection/diod.config";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HttpNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HttpNextResponse";
import { UserEmailUpdater } from "../../../../../../contexts/shop/users/application/update_email/UserEmailUpdater";

const UpdateUserEmailRequest = t.type({ email: t.string });

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } },
): Promise<Response> {
	const validatedRequest = UpdateUserEmailRequest.decode(await request.json());

	if (isLeft(validatedRequest)) {
		return HttpNextResponse.badRequest(
			`Invalid request: ${PathReporter.report(validatedRequest).join("\n")}`,
		);
	}

	const body = validatedRequest.right;

	const updater = container.get(UserEmailUpdater);

	return executeWithErrorHandling(async () => {
		await updater.update(id, body.email);

		return HttpNextResponse.noContent();
	});
}
