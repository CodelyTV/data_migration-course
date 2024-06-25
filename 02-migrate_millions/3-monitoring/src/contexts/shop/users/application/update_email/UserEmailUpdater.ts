import { EventBus } from "../../../../shared/domain/event/EventBus";
import { DomainUserFinder } from "../../domain/DomainUserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserEmailUpdater {
	constructor(
		private readonly repository: UserRepository,
		private readonly finder: DomainUserFinder,
		private readonly eventBus: EventBus,
	) {}

	async update(id: string, email: string): Promise<void> {
		const user = await this.finder.find(id);

		user.updateEmail(email);

		await this.repository.save(user);
		await this.eventBus.publish(user.pullDomainEvents());
	}
}
