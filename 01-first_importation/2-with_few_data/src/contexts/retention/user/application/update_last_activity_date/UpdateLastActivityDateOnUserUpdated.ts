import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UserUpdatedDomainEvent } from "../../../../shop/users/domain/UserUpdatedDomainEvent";
import { RetentionUserLastActivityUpdater } from "./RetentionUserLastActivityUpdater";

@Service()
export class UpdateLastActivityDateOnUserUpdated
	implements DomainEventSubscriber<UserUpdatedDomainEvent>
{
	constructor(private readonly updater: RetentionUserLastActivityUpdater) {}

	async on(event: UserUpdatedDomainEvent): Promise<void> {
		await this.updater.update(event.id, event.occurredOn);
	}

	subscribedTo(): DomainEventClass[] {
		return [UserUpdatedDomainEvent];
	}

	name(): string {
		return "codely.retention.update_last_activity_date_on_user_updated";
	}
}
