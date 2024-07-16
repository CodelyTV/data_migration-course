import { Service } from "diod";

import { RetentionDomainUserFinder } from "../../domain/RetentionDomainUserFinder";
import { RetentionUserRepository } from "../../domain/RetentionUserRepository";

@Service()
export class RetentionUserTotalReviewsIncrementer {
	private readonly finder: RetentionDomainUserFinder;

	constructor(private readonly repository: RetentionUserRepository) {
		this.finder = new RetentionDomainUserFinder(repository);
	}

	async increment(id: string): Promise<void> {
		const user = await this.finder.find(id);

		if (!user.toPrimitives().totalReviews) {
			throw new Error("User total reviews is null, we'll retry later");
		}

		user.incrementTotalReviews();

		await this.repository.save(user);
	}
}
