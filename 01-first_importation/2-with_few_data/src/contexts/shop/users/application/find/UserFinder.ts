import { Primitives } from "@codelytv/primitives-type/src";
import { Service } from "diod";

import { DomainUserFinder } from "../../domain/DomainUserFinder";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

@Service()
export class UserFinder {
	private readonly finder: DomainUserFinder;

	constructor(repository: UserRepository) {
		this.finder = new DomainUserFinder(repository);
	}

	async find(id: string): Promise<Primitives<User>> {
		return (await this.finder.find(id)).toPrimitives();
	}
}
