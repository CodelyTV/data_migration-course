import { Service } from "diod";

import { UserId } from "../../../shop/users/domain/UserId";
import { RetentionUser } from "./RetentionUser";
import { RetentionUserDoesNotExistError } from "./RetentionUserDoesNotExistError";
import { RetentionUserRepository } from "./RetentionUserRepository";

@Service()
export class RetentionDomainUserFinder {
	constructor(private readonly repository: RetentionUserRepository) {}

	async find(id: string): Promise<RetentionUser> {
		const user = await this.repository.search(new UserId(id));

		if (user === null) {
			throw new RetentionUserDoesNotExistError(id);
		}

		return user;
	}
}
