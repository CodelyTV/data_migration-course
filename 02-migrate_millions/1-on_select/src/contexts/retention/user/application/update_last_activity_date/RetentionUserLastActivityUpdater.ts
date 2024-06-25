import { Service } from "diod";

import { RetentionDomainUserFinder } from "../../domain/RetentionDomainUserFinder";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

@Service()
export class RetentionUserLastActivityUpdater {
	private readonly finder: RetentionDomainUserFinder;

	constructor(private readonly repository: RetentionUserRepository) {
		this.finder = new RetentionDomainUserFinder(repository);
	}

	async update(id: string, occurredOn: Date): Promise<void> {
		const user = await this.finder.find(id);

		if (user.lastActivityDateIsOlderThan(occurredOn)) {
			user.updateLastActivityDate(occurredOn);

			await this.repository.save(user);
		}
	}
}
