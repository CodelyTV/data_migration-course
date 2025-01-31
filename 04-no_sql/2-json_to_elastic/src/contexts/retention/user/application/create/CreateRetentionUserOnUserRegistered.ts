import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UserRegisteredDomainEvent } from "../../../../shop/users/domain/UserRegisteredDomainEvent";
import { RetentionUserCreator } from "./RetentionUserCreator";

@Service()
export class CreateRetentionUserOnUserRegistered
	implements DomainEventSubscriber<UserRegisteredDomainEvent>
{
	constructor(private readonly creator: RetentionUserCreator) {}

	async on(event: UserRegisteredDomainEvent): Promise<void> {
		await this.creator.create(event.id, event.email, event.occurredOn);
	}

	subscribedTo(): DomainEventClass[] {
		return [UserRegisteredDomainEvent];
	}

	name(): string {
		return "codely.retention.create_retention_user_on_user_registered";
	}
}
