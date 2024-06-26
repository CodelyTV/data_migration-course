import { Primitives } from "@codelytv/primitives-type/src";
import { Service } from "diod";

import { UserId } from "../../../../shop/users/domain/UserId";
import { RetentionUser } from "../../domain/RetentionUser";
import { RetentionUserDoesNotExistError } from "../../domain/RetentionUserDoesNotExistError";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

@Service()
export class RetentionUserFinder {
	constructor(private readonly repository: RetentionUserRepository) {}

	async find(id: string): Promise<Primitives<RetentionUser>> {
		const user = await this.repository.search(new UserId(id));

		if (user === null) {
			throw new RetentionUserDoesNotExistError(id);
		}

		return user.toPrimitives();
	}
}
